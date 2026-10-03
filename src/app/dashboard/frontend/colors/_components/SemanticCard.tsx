"use client";

import { useState } from "react";
import { useSemanticActions, useUI } from "@/lib/design-system/colors-hooks";
import { useAllTokens } from "@/lib/design-system/use-all-tokens";
import type { SemanticColor } from "@/lib/design-system/types";
import {
  HiOutlineLink,
  HiPencil,
  HiTrash,
  HiDuplicate,
  HiCheck,
  HiX,
  HiEye,
  HiEyeOff,
} from "react-icons/hi";

export default function SemanticCard({
  color,
  activeTokens,
}: {
  color: SemanticColor;
  activeTokens: Record<string, string>;
}) {
  const { update, remove, duplicate, toggle } = useSemanticActions();
  const { selectedSemanticIds, toggleSelectSemantic } = useUI();
  const { all, storeToToken } = useAllTokens();

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<SemanticColor>(color);

  const isSelected = selectedSemanticIds.includes(color.id);
  const isActive = color.active;

  /* ---------------- اتصال به توکن ---------------- */
  // اول tokenRef صریح، بعد نگاشت پویا از نام
  const nameToken = storeToToken[color.name.trim().toLowerCase()];
  const tokenId = color.tokenRef ?? nameToken;

  const resolvedHex = tokenId ? activeTokens[tokenId] : undefined;
  const resolvedTextHex = activeTokens["text-inverse"];
  const isMapped = !!tokenId && !!resolvedHex;

  const isSynced =
    isMapped &&
    color.hex.toLowerCase() === resolvedHex!.toLowerCase() &&
    color.textHex.toLowerCase() === (resolvedTextHex ?? "").toLowerCase();

  const previewHex = resolvedHex ?? color.hex;
  const previewTextHex = resolvedTextHex ?? color.textHex;

  const commit = () => {
    const name = draft.name.trim();
    if (!name) return;
    update(color.id, {
      name,
      hex: draft.hex,
      textHex: draft.textHex,
      desc: draft.desc,
      tokenRef: draft.tokenRef ?? undefined,
    });
    setEditing(false);
  };

  const cancel = () => {
    setDraft(color);
    setEditing(false);
  };

  const syncThisCard = () => {
    if (!isMapped || !resolvedHex) return;
    update(color.id, {
      hex: resolvedHex,
      textHex: resolvedTextHex ?? color.textHex,
      tokenRef: tokenId,
    });
  };

  /* ---------------- گزینه‌های dropdown ---------------- */
  // توکن‌های ثابت + پویا، با علامت‌گذاری سفارشی‌ها
  const tokenOptions = [
    { id: "", label: "— بدون اتصال —" },
    ...all.map((t) => ({
      id: t.id,
      label: t.category === "custom" ? `${t.id} (سفارشی)` : t.id,
    })),
  ];

  return (
    <div
      className={`rounded-2xl border bg-white p-4 transition dark:bg-gray-900 ${
        isSelected
          ? "border-blue-500 ring-2 ring-blue-500/20"
          : "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
      } ${!isActive ? "opacity-60" : ""}`}
    >
      {/* ---------- هدر ---------- */}
      <div className="flex items-start justify-between gap-2">
        <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleSelectSemantic(color.id)}
            className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950"
          />
          <div className="min-w-0 flex-1">
            {editing ? (
              <input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commit();
                  if (e.key === "Escape") cancel();
                }}
                className="w-full rounded border border-blue-300 bg-white px-2 py-1 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-blue-700 dark:bg-gray-950 dark:text-white"
                placeholder="نام معنایی"
                autoFocus
              />
            ) : (
              <span className="block truncate text-sm font-bold text-gray-900 dark:text-white">
                {color.name}
              </span>
            )}
            <span className="mt-0.5 block font-mono text-[10px] text-gray-400 dark:text-gray-500">
              {color.id.slice(0, 8)}
            </span>
          </div>
        </label>

        <div className="flex shrink-0 items-center gap-0.5">
          {/* فعال / غیرفعال */}
          <button
            type="button"
            onClick={() => toggle(color.id)}
            className={`rounded-lg p-1.5 transition ${
              isActive
                ? "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
                : "text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
            title={isActive ? "غیرفعال کردن" : "فعال کردن"}
          >
            {isActive ? (
              <HiEye className="h-4 w-4" />
            ) : (
              <HiEyeOff className="h-4 w-4" />
            )}
          </button>

          {/* همگام‌سازی کارت */}
          {isMapped && !editing && (
            <button
              type="button"
              onClick={syncThisCard}
              disabled={isSynced}
              className="rounded-lg p-1.5 text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-gray-300 dark:text-blue-400 dark:hover:bg-blue-950 dark:disabled:text-gray-700"
              title={isSynced ? "همگام است" : "این کارت را با تم همگام کن"}
            >
              <HiOutlineLink className="h-4 w-4" />
            </button>
          )}

          {editing ? (
            <>
              <button
                type="button"
                onClick={commit}
                className="rounded-lg bg-green-600 p-1.5 text-white hover:bg-green-700"
                title="ذخیره"
              >
                <HiCheck className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={cancel}
                className="rounded-lg border border-gray-200 p-1.5 text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800"
                title="انصراف"
              >
                <HiX className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setDraft(color);
                  setEditing(true);
                }}
                className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                title="ویرایش"
              >
                <HiPencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => duplicate(color.id)}
                className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                title="کپی"
              >
                <HiDuplicate className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => remove(color.id)}
                className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                title="حذف"
              >
                <HiTrash className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* ---------- سواچ ---------- */}
      <div
        className="mt-3 flex h-20 items-center justify-center rounded-xl text-sm font-bold transition"
        style={{ background: previewHex, color: previewTextHex }}
      >
        {color.name}
      </div>

      {/* ---------- انتخاب توکن (پویا) ---------- */}
      <div className="mt-3">
        <label className="mb-1 block text-[10px] font-medium text-gray-500 dark:text-gray-400">
          اتصال به توکن تم
        </label>
        <select
          value={color.tokenRef ?? ""}
          onChange={(e) =>
            update(color.id, {
              tokenRef: e.target.value || undefined,
            })
          }
          className="w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-[11px] dark:border-gray-800 dark:bg-gray-950 dark:text-white"
        >
          {tokenOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* ---------- بدنه ---------- */}
      {editing ? (
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2">
            <label className="w-14 text-[10px] text-gray-500 dark:text-gray-400">
              رنگ
            </label>
            <input
              type="color"
              value={draft.hex}
              onChange={(e) => setDraft({ ...draft, hex: e.target.value })}
              className="h-7 w-10 cursor-pointer rounded border border-gray-200 dark:border-gray-800"
            />
            <input
              value={draft.hex}
              onChange={(e) => setDraft({ ...draft, hex: e.target.value })}
              className="min-w-0 flex-1 rounded border border-gray-200 bg-white px-2 py-1 font-mono text-[11px] dark:border-gray-800 dark:bg-gray-950 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-14 text-[10px] text-gray-500 dark:text-gray-400">
              متن
            </label>
            <input
              type="color"
              value={draft.textHex}
              onChange={(e) => setDraft({ ...draft, textHex: e.target.value })}
              className="h-7 w-10 cursor-pointer rounded border border-gray-200 dark:border-gray-800"
            />
            <input
              value={draft.textHex}
              onChange={(e) => setDraft({ ...draft, textHex: e.target.value })}
              className="min-w-0 flex-1 rounded border border-gray-200 bg-white px-2 py-1 font-mono text-[11px] dark:border-gray-800 dark:bg-gray-950 dark:text-white"
            />
          </div>

          <input
            value={draft.desc}
            onChange={(e) => setDraft({ ...draft, desc: e.target.value })}
            className="w-full rounded border border-gray-200 bg-white px-2 py-1 text-[11px] dark:border-gray-800 dark:bg-gray-950 dark:text-white"
            placeholder="توضیح"
          />
        </div>
      ) : (
        <>
          <div className="mt-3 flex items-center justify-between gap-2 font-mono text-[10px] text-gray-500 dark:text-gray-400">
            <span>{color.hex}</span>
            <span className="text-gray-400 dark:text-gray-500">
              {color.textHex}
            </span>
          </div>

          <p className="mt-1.5 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            {color.desc || "—"}
          </p>

          {isMapped ? (
            <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-[10px] dark:border-gray-800 dark:bg-gray-950">
              <span className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <HiOutlineLink className="h-3 w-3" />
                <code className="font-mono">{tokenId}</code>
              </span>
              <span
                className={`rounded-full px-1.5 py-0.5 font-medium ${
                  isSynced
                    ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                }`}
              >
                {isSynced ? "همگام" : "ناهمگام"}
              </span>
            </div>
          ) : (
            <div className="mt-3 rounded-lg border border-dashed border-gray-200 bg-gray-50 px-2.5 py-1.5 text-center text-[10px] text-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-500">
              به توکنی متصل نیست — از dropdown بالا انتخاب کن
            </div>
          )}
        </>
      )}
    </div>
  );
}