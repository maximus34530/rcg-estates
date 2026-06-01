"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { supabase, LeadInsert } from "@/lib/supabaseClient";

const STORAGE_KEY = "rcg_contact_form";

type FormState = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
};

const INITIAL: FormState = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  message: "",
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

/* ── Floating-label field ────────────────────────────────────────────────── */
function FloatingField({
  id, name, label, type = "text", placeholder, value, onChange, required, autoComplete, glass,
}: {
  id: string; name: string; label: string; type?: string;
  placeholder: string; value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; autoComplete?: string; glass?: boolean;
}) {
  const base = glass
    ? "w-full bg-transparent border-b border-white/15 focus:border-[#1D52D4] text-white placeholder-transparent pt-6 pb-2 text-sm outline-none transition-colors duration-200 peer"
    : "w-full bg-transparent border-b-2 border-gray-200 focus:border-[#1D52D4] text-gray-900 placeholder-transparent pt-6 pb-2 text-sm outline-none transition-colors duration-200 peer";
  const labelBase = glass
    ? "absolute left-0 top-6 text-white/35 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:tracking-widest peer-not-placeholder-shown:text-[#6B93D6] peer-focus:top-0 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:text-[#6B93D6] uppercase"
    : "absolute left-0 top-6 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:tracking-widest peer-not-placeholder-shown:text-[#1D52D4] peer-focus:top-0 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:text-[#1D52D4] uppercase";
  return (
    <div className="relative">
      <input id={id} name={name} type={type} value={value} onChange={onChange}
        placeholder={placeholder} required={required} autoComplete={autoComplete}
        className={base} />
      <label htmlFor={id} className={labelBase}>{label}</label>
    </div>
  );
}

function FloatingTextarea({
  id, name, label, placeholder, value, onChange, required, rows = 4, glass,
}: {
  id: string; name: string; label: string; placeholder: string;
  value: string; onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean; rows?: number; glass?: boolean;
}) {
  const base = glass
    ? "w-full bg-transparent border-b border-white/15 focus:border-[#1D52D4] text-white placeholder-transparent pt-6 pb-2 text-sm outline-none transition-colors duration-200 peer resize-none"
    : "w-full bg-transparent border-b-2 border-gray-200 focus:border-[#1D52D4] text-gray-900 placeholder-transparent pt-6 pb-2 text-sm outline-none transition-colors duration-200 peer resize-none";
  const labelBase = glass
    ? "absolute left-0 top-0 text-white/35 text-[10px] tracking-widest uppercase transition-all duration-200 pointer-events-none peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-placeholder-shown:text-white/35 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:tracking-widest peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:text-[#6B93D6] peer-focus:top-0 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-[#6B93D6]"
    : "absolute left-0 top-0 text-gray-400 text-[10px] tracking-widest uppercase transition-all duration-200 pointer-events-none peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-placeholder-shown:text-gray-400 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:tracking-widest peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:text-[#1D52D4] peer-focus:top-0 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-[#1D52D4]";
  return (
    <div className="relative">
      <textarea id={id} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required} rows={rows}
        className={base} />
      <label htmlFor={id} className={labelBase}>{label}</label>
    </div>
  );
}

/* ── Main form ───────────────────────────────────────────────────────────── */
export default function ContactForm({ glass = false }: { glass?: boolean }) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setForm(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const payload: LeadInsert = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    };

    try {
      const webhookUrl =
        process.env.WEBHOOK_CONTACT_URL ||
        "https://neuronex-n8n.com/webhook-test/806ce233-411b-4843-a211-19615d3af0a6";

      const [supabaseResult, webhookResult] = await Promise.allSettled([
        supabase.from("leads").insert([payload]),
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
      ]);

      if (
        supabaseResult.status === "rejected" ||
        (supabaseResult.status === "fulfilled" && supabaseResult.value.error)
      ) {
        const msg =
          supabaseResult.status === "fulfilled"
            ? supabaseResult.value.error?.message
            : (supabaseResult.reason as Error)?.message;
        throw new Error(msg || "Database error. Please try again.");
      }

      if (webhookResult.status === "rejected") {
        console.warn("Webhook delivery failed:", webhookResult.reason);
      }

      localStorage.removeItem(STORAGE_KEY);
      setForm(INITIAL);
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or call us directly."
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-10 text-center ${glass
          ? "border border-white/10 bg-white/5"
          : "bg-green-50 border border-green-200"}`}
      >
        <CheckCircle className={`w-12 h-12 mx-auto mb-4 ${glass ? "text-[#6B93D6]" : "text-green-500"}`} />
        <h3 className={`text-xl font-bold mb-2 ${glass ? "text-white" : "text-gray-900"}`}>
          Message Received!
        </h3>
        <p className={`text-sm leading-relaxed ${glass ? "text-white/60" : "text-gray-600"}`}>
          Thank you for reaching out. We'll be in touch within one business day.
          If your project is urgent, call us at{" "}
          <a href="tel:+19564087136" className="text-[#1D52D4] font-medium hover:underline">
            (956) 408-7136
          </a>.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className={`mt-6 text-sm underline transition-colors ${glass ? "text-white/40 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <FloatingField id="first_name" name="first_name" label="First Name"
          placeholder="Maria" value={form.first_name} onChange={handleChange}
          required autoComplete="given-name" glass={glass} />
        <FloatingField id="last_name" name="last_name" label="Last Name"
          placeholder="Garcia" value={form.last_name} onChange={handleChange}
          required autoComplete="family-name" glass={glass} />
      </div>

      <FloatingField id="email" name="email" type="email" label="Email Address"
        placeholder="maria@example.com" value={form.email} onChange={handleChange}
        required autoComplete="email" glass={glass} />

      <FloatingField id="phone" name="phone" type="tel" label="Phone Number"
        placeholder="(956) 555-0100" value={form.phone} onChange={handleChange}
        autoComplete="tel" glass={glass} />

      <FloatingTextarea id="message" name="message" label="Tell Us About Your Project"
        placeholder="I'm looking to build a 4-bedroom custom home in Mission, TX..."
        value={form.message} onChange={handleChange} required rows={4} glass={glass} />

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`flex items-start gap-3 p-4 border text-sm ${glass
              ? "bg-red-500/10 border-red-500/20 text-red-300"
              : "bg-red-50 border-red-200 text-red-700"}`}
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-2">
        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileHover={{ scale: status === "loading" ? 1 : 1.015 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#1D52D4] hover:bg-[#1848C0] text-white font-bold text-sm tracking-wide transition-colors shadow-[0_0_30px_rgba(29,82,212,0.30)] hover:shadow-[0_0_45px_rgba(29,82,212,0.45)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>

        <p className={`text-xs text-center mt-4 ${glass ? "text-white/25" : "text-gray-400"}`}>
          Your information is kept private and never shared with third parties.
        </p>
      </div>
    </form>
  );
}
