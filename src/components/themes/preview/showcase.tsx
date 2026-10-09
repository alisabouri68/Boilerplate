"use client";

/**
 * نمونه‌ی کامل با استفاده از CSS Variables.
 * همه‌ی رنگ‌ها از --bg-brand، --text-brand، ... میان.
 */

export function ShowcaseFull() {
  return (
    <div className="flex flex-col gap-8 p-6">
      {/* ============== Typography ============== */}
      <section className="space-y-3">
        <h2
          className="text-2xl font-bold"
          style={{ color: "var(--title-brand, #1e3a8a)" }}
        >
          Typography Sample
        </h2>
        <p
          className="text-lg font-medium"
          style={{ color: "var(--subtitle-brand, #1d4ed8)" }}
        >
          Subtitle lorem ipsum dolor sit amet
        </p>
        <p style={{ color: "var(--text-brand, #1e40af)" }}>
          Body text with brand color. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
        </p>
        <a
          href="#"
          className="inline-block font-medium underline"
          style={{ color: "var(--link-brand, #2563eb)" }}
        >
          Link with brand color →
        </a>
      </section>

      {/* ============== Buttons ============== */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase text-muted-foreground">
          Buttons
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            className="rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
            style={{ background: "var(--surface-brand, #3b82f6)" }}
          >
            Primary
          </button>
          <button
            className="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
            style={{
              borderColor: "var(--border-brand, #bfdbfe)",
              color: "var(--text-brand, #1e40af)",
              background: "var(--bg-brand, #eff6ff)",
            }}
          >
            Secondary
          </button>
          <button
            className="rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
            style={{
              background: "var(--bg-brand, #eff6ff)",
              color: "var(--text-brand, #1e40af)",
            }}
          >
            Ghost
          </button>
        </div>
      </section>

      {/* ============== Card ============== */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase text-muted-foreground">
          Card
        </h3>
        <div
          className="rounded-lg border p-5"
          style={{
            background: "var(--bg-brand, #eff6ff)",
            borderColor: "var(--border-brand, #bfdbfe)",
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{
                background: "var(--surface-brand, #3b82f6)",
                color: "#fff",
              }}
            >
              ★
            </div>
            <div className="flex-1">
              <h4
                className="font-semibold"
                style={{ color: "var(--title-brand, #1e3a8a)" }}
              >
                Card Title
              </h4>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--text-brand, #1e40af)" }}
              >
                Card description goes here. Something brief and helpful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== Alerts ============== */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase text-muted-foreground">
          Alerts
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Alert type="success" />
          <Alert type="warning" />
          <Alert type="danger" />
          <Alert type="info" />
        </div>
      </section>

      {/* ============== Form ============== */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase text-muted-foreground">
          Form
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--subtitle-brand, #1d4ed8)" }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--border-brand, #bfdbfe)",
              }}
            />
          </div>

          <div className="space-y-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--subtitle-brand, #1d4ed8)" }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--border-brand, #bfdbfe)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ============== Badges ============== */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase text-muted-foreground">
          Badges
        </h3>
        <div className="flex flex-wrap gap-2">
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: "var(--bg-brand, #eff6ff)",
              color: "var(--text-brand, #1e40af)",
            }}
          >
            Brand
          </span>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: "var(--bg-success, #ecfdf5)",
              color: "var(--text-success, #065f46)",
            }}
          >
            Success
          </span>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: "var(--bg-warning, #fffbeb)",
              color: "var(--text-warning, #92400e)",
            }}
          >
            Warning
          </span>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: "var(--bg-danger, #fef2f2)",
              color: "var(--text-danger, #9f0712)",
            }}
          >
            Danger
          </span>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: "var(--bg-info, #f0f9ff)",
              color: "var(--text-info, #0369a1)",
            }}
          >
            Info
          </span>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: "var(--bg-neutral, #f8fafc)",
              color: "var(--text-neutral, #0f172a)",
            }}
          >
            Neutral
          </span>
        </div>
      </section>
    </div>
  );
}

/* =====================================================================
   Alert
   ===================================================================== */

function Alert({ type }: { type: "success" | "warning" | "danger" | "info" }) {
  const config = {
    success: {
      bg: "var(--bg-success, #ecfdf5)",
      border: "var(--border-success, #a7f3d0)",
      text: "var(--text-success, #065f46)",
      icon: "✓",
      title: "Success",
      body: "Everything went smoothly.",
    },
    warning: {
      bg: "var(--bg-warning, #fffbeb)",
      border: "var(--border-warning, #fee685)",
      text: "var(--text-warning, #92400e)",
      icon: "⚠",
      title: "Warning",
      body: "Please check before continuing.",
    },
    danger: {
      bg: "var(--bg-danger, #fef2f2)",
      border: "var(--border-danger, #ffc9c9)",
      text: "var(--text-danger, #9f0712)",
      icon: "✕",
      title: "Error",
      body: "Something went wrong.",
    },
    info: {
      bg: "var(--bg-info, #f0f9ff)",
      border: "var(--border-info, #bae6fd)",
      text: "var(--text-info, #0369a1)",
      icon: "ⓘ",
      title: "Info",
      body: "Here is something useful.",
    },
  }[type];

  return (
    <div
      className="rounded-lg border p-3"
      style={{ background: config.bg, borderColor: config.border }}
    >
      <div className="flex items-start gap-2">
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full text-xs"
          style={{ color: config.text }}
        >
          {config.icon}
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium" style={{ color: config.text }}>
            {config.title}
          </p>
          <p className="mt-0.5 text-xs opacity-80" style={{ color: config.text }}>
            {config.body}
          </p>
        </div>
      </div>
    </div>
  );
}