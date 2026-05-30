"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2, Send } from "lucide-react";
import { supabase, LeadInsert } from "@/lib/supabaseClient";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

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

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setForm(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage on every change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
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
      // Dual async submission — both run concurrently
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

      // Treat as success only if Supabase insert succeeded
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

      // Log webhook failure non-fatally
      if (webhookResult.status === "rejected") {
        console.warn("Webhook delivery failed:", webhookResult.reason);
      }

      // Clear localStorage only on full success
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
        className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center"
      >
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Message Received!
        </h3>
        <p className="text-gray-600 text-sm">
          Thank you for reaching out. We'll be in touch within one business day.
          If your project is urgent, call us directly at{" "}
          <a
            href="tel:+19564087136"
            className="text-[#0A3594] font-medium hover:underline"
          >
            (956) 408-7136
          </a>
          .
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-gray-500 hover:text-gray-900 underline transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          id="first_name"
          name="first_name"
          label="First Name"
          placeholder="Maria"
          value={form.first_name}
          onChange={handleChange}
          required
          autoComplete="given-name"
        />
        <Input
          id="last_name"
          name="last_name"
          label="Last Name"
          placeholder="Garcia"
          value={form.last_name}
          onChange={handleChange}
          required
          autoComplete="family-name"
        />
      </div>

      <Input
        id="email"
        name="email"
        type="email"
        label="Email Address"
        placeholder="maria@example.com"
        value={form.email}
        onChange={handleChange}
        required
        autoComplete="email"
      />

      <Input
        id="phone"
        name="phone"
        type="tel"
        label="Phone Number"
        placeholder="(956) 555-0100"
        value={form.phone}
        onChange={handleChange}
        autoComplete="tel"
      />

      <Textarea
        id="message"
        name="message"
        label="Tell Us About Your Project"
        placeholder="I'm looking to build a 4-bedroom custom home in Mission, TX. We have a lot on..."
        value={form.message}
        onChange={handleChange}
        required
        rows={5}
      />

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "loading"}
        className="w-full gap-2"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </Button>

      <p className="text-xs text-gray-400 text-center">
        Your information is kept private and never shared with third parties.
      </p>
    </form>
  );
}
