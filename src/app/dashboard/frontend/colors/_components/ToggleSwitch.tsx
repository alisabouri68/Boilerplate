"use client";

type Props = {
  checked: boolean;
  onChange: () => void;
  size?: "sm" | "md";
  title?: string;
  disabled?: boolean;
};

export default function ToggleSwitch({ checked, onChange, size = "sm", title, disabled }: Props) {
  const w = size === "sm" ? "w-8 h-4" : "w-10 h-5";
  const dot = size === "sm" ? "h-3 w-3" : "h-4 w-4";
  const translate = size === "sm" ? "translate-x-4" : "translate-x-5";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onChange}
      title={title ?? (checked ? "غیرفعال کن" : "فعال کن")}
      className={`relative inline-flex ${w} shrink-0 cursor-pointer items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        checked ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
      }`}
    >
      <span
        className={`inline-block ${dot} transform rounded-full bg-white shadow transition-transform ${
          checked ? translate : "translate-x-0.5"
        }`}
      />
    </button>
  );
}