"use client";

import { useState } from "react";

/**
 * Newsletter signup component.
 * TODO: Connect to mailing service (Mailchimp, ConvertKit, etc.) or Supabase.
 */
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    // TODO: API call to subscribe
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setEmail("");
  };

  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 p-8 sm:p-10">
      <h2 className="font-serif text-2xl font-medium text-stone-900">
        Stay in the Loop
      </h2>
      <p className="mt-2 text-stone-600">
        Get updates on new releases and exclusive content.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={status === "loading" || status === "success"}
          className="flex-1 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500 disabled:opacity-60"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800 disabled:opacity-60"
        >
          {status === "loading"
            ? "Subscribing..."
            : status === "success"
              ? "Subscribed!"
              : "Subscribe"}
        </button>
      </form>
      {status === "success" && (
        <p className="mt-3 text-sm text-green-600">
          Thanks for subscribing! Check your inbox for a confirmation.
        </p>
      )}
    </div>
  );
}
