// _components/PresetEditor.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useTypography, useRuntimeAPI } from "@/lib/runtime/react";  // ← تغییر
import {
  loadCustomPresets,
  saveCustomPreset,
  deleteCustomPreset,
  updateCustomPreset,
  type CustomPreset,
} from "@/lib/design-system/typography-custom-presets";
import { EmptyState } from "./ui/EmptyState";
import {
  HiPlus,
  HiTrash,
  HiPencil,
  HiCheck,
  HiX,
  HiDownload,
  HiUpload,
} from "react-icons/hi";

export default function PresetEditor() {
  const system = useTypography();
  const rt = useRuntimeAPI();

  const [presets, setPresets] = useState<CustomPreset[]>([]);
  const [creating, setCreating] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  /* ---------- load ---------- */
  useEffect(() => {
    setPresets(loadCustomPresets());
  }, []);

  const refresh = () => setPresets(loadCustomPresets());

  /* ---------- create ---------- */
  const handleCreate = () => {
    if (!newLabel.trim()) return;
    saveCustomPreset({
      label: newLabel.trim(),
      description: newDescription.trim(),
      system: rt.theme.exportTypography(),
    });
    setNewLabel("");
    setNewDescription("");
    setCreating(false);
    refresh();
  };

  /* ---------- apply ---------- */
  const handleApply = (preset: CustomPreset) => {
    rt.theme.importTypography(preset.system);
    rt.clearHistory();
  };

  /* ---------- edit ---------- */
  const startEdit = (p: CustomPreset) => {
    setEditingId(p.id);
    setEditLabel(p.label);
    setEditDescription(p.description);
  };

  const saveEdit = () => {
    if (!editingId) return;
    updateCustomPreset(editingId, {
      label: editLabel.trim() || "بدون نام",
      description: editDescription.trim(),
    });
    setEditingId(null);
    refresh();
  };

  /* ---------- delete ---------- */
  const handleDelete = (id: string) => {
    if (!confirm("این preset حذف بشه؟")) return;
    deleteCustomPreset(id);
    refresh();
  };

  /* ---------- import/export ---------- */
  const handleExport = () => {
    const json = JSON.stringify(presets, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `typography-presets-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (!Array.isArray(json)) throw new Error("invalid");
        localStorage.setItem(
          "typography-custom-presets",
          JSON.stringify(json)
        );
        refresh();
      } catch {
        alert("فایل معتبر نیست");
      }
    };
    reader.readAsText(file);
  };

  return (
    <section className="space-y-3">
      {/* ============ Header ============ */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          Preset های من
          <span className="ms-2 text-[10px] font-normal text-gray-500 dark:text-gray-400">
            {presets.length} ذخیره‌شده
          </span>
        </h3>
        <div className="flex gap-1.5">
          <button
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <HiUpload className="h-3.5 w-3.5" />
            ورود
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleImport(f);
              e.target.value = "";
            }}
          />
          {presets.length > 0 && (
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <HiDownload className="h-3.5 w-3.5" />
              خروجی
            </button>
          )}
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700"
          >
            <HiPlus className="h-3.5 w-3.5" />
            ذخیره سیستم فعلی
          </button>
        </div>
      </div>

      {/* ============ Create form ============ */}
      {creating && (
        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-3 dark:border-blue-900 dark:bg-blue-950/20">
          <input
            autoFocus
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="نام preset (مثلاً: برند X)"
            className="mb-2 w-full rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <input
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="توضیح کوتاه (اختیاری)"
            className="mb-2 w-full rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <div className="flex gap-1.5">
            <button
              onClick={handleCreate}
              disabled={!newLabel.trim()}
              className="rounded-lg bg-blue-600 px-3 py-1 text-[11px] font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              ذخیره
            </button>
            <button
              onClick={() => {
                setCreating(false);
                setNewLabel("");
                setNewDescription("");
              }}
              className="rounded-lg border border-gray-200 px-3 py-1 text-[11px] dark:border-gray-700"
            >
              لغو
            </button>
          </div>
        </div>
      )}

      {/* ============ Empty ============ */}
      {presets.length === 0 && !creating && (
        <EmptyState
          title="هنوز preset سفارشی نداری"
          description="سیستم فعلی رو ذخیره کن تا بعداً بتونی برگردی بهش."
          action={{
            label: "ذخیره سیستم فعلی",
            onClick: () => setCreating(true),
          }}
        />
      )}

      {/* ============ List ============ */}
      <div className="space-y-2">
        {presets.map((p) => {
          const isEditing = editingId === p.id;
          return (
            <div
              key={p.id}
              className="rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900"
            >
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    autoFocus
                    value={editLabel}
                    onChange={(e) => setEditLabel(e.target.value)}
                    className="w-full rounded border border-gray-200 px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />
                  <input
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full rounded border border-gray-200 px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />
                  <div className="flex gap-1">
                    <button
                      onClick={saveEdit}
                      className="rounded-lg bg-green-600 px-2 py-1 text-[10px] text-white"
                    >
                      <HiCheck className="inline h-3 w-3" /> ذخیره
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded-lg border border-gray-200 px-2 py-1 text-[10px] dark:border-gray-700"
                    >
                      <HiX className="inline h-3 w-3" /> لغو
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-2">
                  <button
                    onClick={() => handleApply(p)}
                    className="flex-1 text-right transition hover:opacity-80"
                  >
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">
                      {p.label}
                    </p>
                    {p.description && (
                      <p className="mt-0.5 text-[10px] text-gray-500 dark:text-gray-400">
                        {p.description}
                      </p>
                    )}
                    <p className="mt-1 font-mono text-[9px] text-gray-400">
                      {new Date(p.createdAt).toLocaleDateString("fa-IR")} ·{" "}
                      {p.system.textStyles?.length ?? 0} استایل
                    </p>
                  </button>

                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() => startEdit(p)}
                      className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                      title="ویرایش"
                    >
                      <HiPencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                      title="حذف"
                    >
                      <HiTrash className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}