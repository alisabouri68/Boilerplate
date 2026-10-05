// lib/design-system/font-storage.ts
"use client";

const DB_NAME = "typography-fonts";
const DB_VERSION = 1;
const STORE_NAME = "fonts";

export type StoredFont = {
  id: string;
  fileName: string;
  mime: string;
  blob: Blob;
  savedAt: number;
};

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveFont(font: StoredFont): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(font);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

export async function getAllFonts(): Promise<StoredFont[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).getAll();
    req.onsuccess = () => {
      db.close();
      resolve(req.result ?? []);
    };
    req.onerror = () => {
      db.close();
      reject(req.error);
    };
  });
}

export async function deleteFont(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

export async function clearAllFonts(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).clear();
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

export function injectFontFace(id: string, blob: Blob): void {
  const styleId = `uploaded-font-${id}`;
  const existing = document.getElementById(styleId);
  if (existing) existing.remove();

  const url = URL.createObjectURL(blob);

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `@font-face {
    font-family: "${id}";
    src: url("${url}");
    font-display: swap;
  }`;
  document.head.appendChild(style);
}

export function removeFontFace(id: string): void {
  const style = document.getElementById(`uploaded-font-${id}`);
  if (style) {
    const match = style.textContent?.match(/url\("([^"]+)"\)/);
    if (match?.[1]?.startsWith("blob:")) {
      URL.revokeObjectURL(match[1]);
    }
    style.remove();
  }
}

export async function getStorageUsage(): Promise<{
  count: number;
  bytes: number;
  formatted: string;
}> {
  const fonts = await getAllFonts();
  const bytes = fonts.reduce((sum, f) => sum + f.blob.size, 0);
  return {
    count: fonts.length,
    bytes,
    formatted:
      bytes < 1024
        ? `${bytes} B`
        : bytes < 1024 * 1024
        ? `${(bytes / 1024).toFixed(1)} KB`
        : `${(bytes / 1024 / 1024).toFixed(2)} MB`,
  };
}