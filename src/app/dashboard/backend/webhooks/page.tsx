const webhooks = [
  {
    name: "Stripe",
    event: "payment.succeeded",
    desc: "پرداخت موفق",
    status: "فعال",
  },
  {
    name: "GitHub",
    event: "push",
    desc: "Push به مخزن",
    status: "فعال",
  },
  {
    name: "Resend",
    event: "email.delivered",
    desc: "تحویل ایمیل",
    status: "غیرفعال",
  },
];

const outgoing = [
  { name: "user.created", desc: "کاربر جدید ثبت‌نام کرد", retries: 3 },
  { name: "user.deleted", desc: "کاربر حذف شد", retries: 3 },
  { name: "order.paid", desc: "سفارش پرداخت شد", retries: 5 },
];

const codeExample = `// src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      await handlePaymentSuccess(event.data.object);
      break;
    case "customer.subscription.deleted":
      await handleCancellation(event.data.object);
      break;
  }

  return NextResponse.json({ received: true });
}`;

export default function WebhooksPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          وبهوک‌های ورودی
        </h2>
        <div className="space-y-2">
          {webhooks.map((w) => (
            <div
              key={w.name}
              className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <span className="font-semibold text-gray-900 dark:text-white">
                {w.name}
              </span>
              <code className="rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-blue-600 dark:bg-gray-800 dark:text-blue-400">
                {w.event}
              </code>
              <span className="flex-1 text-xs text-gray-500 dark:text-gray-400">
                {w.desc}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  w.status === "فعال"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                {w.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          وبهوک‌های خروجی
        </h2>
        <div className="space-y-2">
          {outgoing.map((w) => (
            <div
              key={w.name}
              className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <code className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {w.name}
              </code>
              <span className="flex-1 text-xs text-gray-500 dark:text-gray-400">
                {w.desc}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {w.retries} بار تلاش مجدد
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          نمونه پیاده‌سازی
        </h2>
        <pre className="overflow-x-auto rounded-xl bg-gray-900 p-5 text-xs leading-relaxed text-gray-100 dark:bg-black">
          <code dir="ltr" className="block text-left">
            {codeExample}
          </code>
        </pre>
      </section>

      <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-900/20 dark:text-amber-300">
        ⚠️ <strong>مهم:</strong> همیشه امضای وبهوک رو بررسی کن و درخواست‌های
        بدون امضای معتبر رو رد کن. هرگز به داده‌ی خام بدون اعتبارسنجی اعتماد
        نکن.
      </section>
    </div>
  );
}