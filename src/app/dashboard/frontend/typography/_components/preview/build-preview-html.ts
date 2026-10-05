import type {
  ResolvedTextStyle,
  TypographySystem,
} from "@/lib/design-system/core/typography-types";
import type { PreviewConfig } from "./PreviewControls";

type Args = {
  system: TypographySystem;
  resolved: ResolvedTextStyle[];
  config: PreviewConfig;
  css: string;
  googleFontsHref: string;
};

/* ---------- محتوای نمونه ---------- */

const SAMPLE_TEXT_FA = {
  paragraph:
    "طراحی خوب، وقتی اتفاق می‌افتد که خواننده متوجه آن نشود. تایپوگرافی، اولین لایه‌ی ارتباط میان محتوا و مخاطب است. اگر فونت درست انتخاب شود، چشم بدون تلاش از خطی به خط دیگر می‌لغزد و معنا بی‌واسطه منتقل می‌شود.",
  long: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می‌باشد.",
  list: ["فونت مناسب برای متن", "فاصله خط بهینه", "طول خط متعادل"],
};

const SAMPLE_TEXT_EN = {
  paragraph:
    "Good typography is invisible. When the type is set well, the reader does not notice it — they simply read. Every choice about size, weight, and spacing is in service of clarity.",
  long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  list: ["Readable fonts", "Optimal line-height", "Balanced measure"],
};

/* ---------- helpers ---------- */

function styleToCss(r: ResolvedTextStyle): string {
  return [
    `font-size:${r.fontSizeRem}rem`,
    `font-weight:${r.fontWeight}`,
    `line-height:${r.lineHeight}`,
    `letter-spacing:${r.letterSpacing}`,
    r.fontFamily ? `font-family:${r.fontFamily}` : "",
  ]
    .filter(Boolean)
    .join(";");
}

function densityScale(density: PreviewConfig["density"]) {
  switch (density) {
    case "compact":
      return { gap: "0.75rem", wrap: "1.5rem" };
    case "spacious":
      return { gap: "2rem", wrap: "3rem" };
    default:
      return { gap: "1.25rem", wrap: "2rem" };
  }
}

/* ---------- samples ---------- */

function renderArticle(
  resolved: ResolvedTextStyle[],
  t: typeof SAMPLE_TEXT_FA,
  gap: string,
) {
  const get = (name: string) => resolved.find((r) => r.name === name);
  const out: string[] = [];

  const display = get("display");
  if (display) {
    out.push(
      `<div class="row" data-name="${display.name}">
        <h1 style="${styleToCss(display)}">${t.paragraph.split(".")[0]}.</h1>
      </div>`,
    );
  }

  ["h1", "h2", "h3"].forEach((n) => {
    const r = get(n);
    if (r) {
      out.push(
        `<div class="row" data-name="${r.name}">
          <h2 style="${styleToCss(r)}">عنوان ${n} — نمونه</h2>
        </div>`,
      );
    }
  });

  ["body-lg", "body", "body-sm"].forEach((n) => {
    const r = get(n);
    if (r) {
      out.push(
        `<div class="row" data-name="${r.name}">
          <p style="${styleToCss(r)}">${t.paragraph}</p>
          <p style="${styleToCss(r)}">${t.long}</p>
        </div>`,
      );
    }
  });

  const caption = get("caption");
  if (caption) {
    out.push(
      `<div class="row" data-name="${caption.name}">
        <span style="${styleToCss(caption)}">تصویر ۱ — توضیح کوتاه</span>
      </div>`,
    );
  }

  return `<div class="stack" style="gap:${gap}">${out.join("")}</div>`;
}

function renderLanding(
  resolved: ResolvedTextStyle[],
  t: typeof SAMPLE_TEXT_FA,
  gap: string,
) {
  const get = (name: string) => resolved.find((r) => r.name === name);
  const display = get("display");
  const h1 = get("h1");
  const body = get("body");

  return `
    <div class="stack" style="gap:${gap}">
      <div class="row hero" data-name="hero">
        ${display ? `<h1 style="${styleToCss(display)}">طراحی، ساده‌تر از آنچه فکر می‌کنی.</h1>` : ""}
        ${h1 ? `<p style="${styleToCss(h1)}">یک بویلرپلیت حرفه‌ای برای سیستم تایپوگرافی.</p>` : ""}
        ${body ? `<p style="${styleToCss(body)}">${t.paragraph}</p>` : ""}
      </div>
      <div class="grid">
        ${[1, 2, 3]
          .map(
            (i) => `
          <div class="card">
            ${
              get("h3")
                ? `<h3 style="${styleToCss(get("h3")!)}">ویژگی ${i}</h3>`
                : ""
            }
            ${
              get("body-sm")
                ? `<p style="${styleToCss(get("body-sm")!)}">${t.long}</p>`
                : ""
            }
          </div>`,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderForm(resolved: ResolvedTextStyle[], gap: string) {
  const get = (name: string) => resolved.find((r) => r.name === name);
  const caption = get("caption");
  const bodySm = get("body-sm");
  const body = get("body");

  return `
    <div class="stack" style="gap:${gap}">
      ${get("h2") ? `<h2 style="${styleToCss(get("h2")!)}">فرم ثبت‌نام</h2>` : ""}
      <div class="stack" style="gap:1rem">
        ${["نام", "ایمیل", "رمز عبور"]
          .map(
            (label) => `
          <label class="field">
            ${caption ? `<span style="${styleToCss(caption)}">${label}</span>` : `<span>${label}</span>`}
            <input type="text" />
          </label>`,
          )
          .join("")}
        ${
          bodySm
            ? `<p style="${styleToCss(bodySm)}">با ثبت‌نام، قوانین را می‌پذیری.</p>`
            : ""
        }
        ${
          body
            ? `<button class="btn" style="${styleToCss(body)}">ثبت‌نام</button>`
            : ""
        }
      </div>
    </div>
  `;
}

function renderTable(resolved: ResolvedTextStyle[], gap: string) {
  const get = (name: string) => resolved.find((r) => r.name === name);
  const bodySm = get("body-sm");
  const body = get("body");

  const rows = [
    ["کاربر ۱", "۱٬۲۴۰", "12,340"],
    ["کاربر ۲", "۸۹۰", "890"],
    ["کاربر ۳", "۳٬۱۰۵", "31,050"],
  ];

  return `
    <div class="stack" style="gap:${gap}">
      ${get("h2") ? `<h2 style="${styleToCss(get("h2")!)}">گزارش عملکرد</h2>` : ""}
      <table class="tbl" style="font-variant-numeric: tabular-nums">
        <thead>
          <tr>
            <th>${bodySm ? `<span style="${styleToCss(bodySm)}">نام</span>` : "نام"}</th>
            <th>${bodySm ? `<span style="${styleToCss(bodySm)}">فارسی</span>` : "فارسی"}</th>
            <th>${bodySm ? `<span style="${styleToCss(bodySm)}">لاتین</span>` : "لاتین"}</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (r) => `<tr>
                ${r
                  .map(
                    (c) =>
                      `<td>${body ? `<span style="${styleToCss(body)}">${c}</span>` : c}</td>`,
                  )
                  .join("")}
              </tr>`,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderMixed(
  resolved: ResolvedTextStyle[],
  t: typeof SAMPLE_TEXT_FA,
  gap: string,
) {
  return `
    <div class="stack" style="gap:${gap}">
      ${renderArticle(resolved, t, gap)}
      <hr />
      ${renderLanding(resolved, t, gap)}
      <hr />
      ${renderForm(resolved, gap)}
      <hr />
      ${renderTable(resolved, gap)}
    </div>
  `;
}

/* ---------- main ---------- */

export function buildPreviewHtml({
  system,
  resolved,
  config,
  css,
  googleFontsHref,
}: Args): string {
  const isRtl = config.direction === "rtl";
  const t = isRtl ? SAMPLE_TEXT_FA : SAMPLE_TEXT_EN;
  const { gap, wrap } = densityScale(config.density);

  const isDark = config.theme === "dark";
  const bg = isDark ? "#0b0b0c" : "#ffffff";
  const fg = isDark ? "#f4f4f5" : "#111827";
  const muted = isDark ? "#a1a1aa" : "#6b7280";
  const border = isDark ? "#27272a" : "#e5e7eb";
  const accent = isDark ? "#60a5fa" : "#2563eb";

  let content = "";
  switch (config.sample) {
    case "article":
      content = renderArticle(resolved, t, gap);
      break;
    case "landing":
      content = renderLanding(resolved, t, gap);
      break;
    case "form":
      content = renderForm(resolved, gap);
      break;
    case "table":
      content = renderTable(resolved, gap);
      break;
    case "mixed":
      content = renderMixed(resolved, t, gap);
      break;
  }

  const labelsCss = config.showLabels
    ? `
      .row::before {
        content: attr(data-name);
        display: block;
        font-family: ui-monospace, SFMono-Regular, monospace;
        font-size: 10px;
        color: ${muted};
        margin-bottom: 4px;
        letter-spacing: 0.05em;
      }
      .row { position: relative; }
    `
    : "";

  const guidesCss = config.showGuides
    ? `
      body {
        background-image: repeating-linear-gradient(
          to bottom,
          transparent 0,
          transparent 7px,
          ${isDark ? "rgba(96,165,250,0.08)" : "rgba(37,99,235,0.06)"} 7px,
          ${isDark ? "rgba(96,165,250,0.08)" : "rgba(37,99,235,0.06)"} 8px
        );
      }
      .row { outline: 1px dashed ${isDark ? "rgba(96,165,250,0.3)" : "rgba(37,99,235,0.2)"}; padding: 6px 0; }
    `
    : "";

  return `<!doctype html>
<html lang="${isRtl ? "fa" : "en"}" dir="${config.direction}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ${googleFontsHref ? `<link rel="preconnect" href="https://fonts.googleapis.com" />` : ""}
  ${googleFontsHref ? `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />` : ""}
  ${googleFontsHref ? `<link rel="stylesheet" href="${googleFontsHref}" />` : ""}
  <style>
    /* --- System tokens --- */
    ${css}

    /* --- Base --- */
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      background: ${bg};
      color: ${fg};
      font-family: var(--font-sans, system-ui, sans-serif);
      padding: ${wrap};
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
    h1, h2, h3, h4, h5, h6, p { margin: 0; }
    hr { border: 0; border-top: 1px solid ${border}; margin: 24px 0; }
    a { color: ${accent}; }
    code, kbd { font-family: var(--font-mono, ui-monospace, monospace); }

    /* --- Layout --- */
    .stack { display: flex; flex-direction: column; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
    .hero { text-align: center; padding: 24px 8px; }
    .card {
      border: 1px solid ${border};
      border-radius: 12px;
      padding: 16px;
      display: flex; flex-direction: column; gap: 8px;
    }

    /* --- Form --- */
    .field { display: flex; flex-direction: column; gap: 4px; }
    .field input {
      border: 1px solid ${border};
      border-radius: 8px;
      padding: 8px 10px;
      background: transparent;
      color: ${fg};
      font: inherit;
    }
    .btn {
      border: 0; border-radius: 8px;
      background: ${accent}; color: #fff;
      padding: 10px 16px; cursor: pointer;
      font: inherit;
    }

    /* --- Table --- */
    .tbl { width: 100%; border-collapse: collapse; }
    .tbl th, .tbl td {
      text-align: start;
      padding: 8px 10px;
      border-bottom: 1px solid ${border};
    }

    /* --- Extras --- */
    ${labelsCss}
    ${guidesCss}
  </style>
</head>
<body>
  ${content}
</body>
</html>`;
}
