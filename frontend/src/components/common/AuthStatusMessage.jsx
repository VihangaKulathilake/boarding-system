import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const styles = {
  error: {
    wrapper:
      "rounded-2xl border border-red-200/80 bg-red-50/80 text-red-800 shadow-sm shadow-red-100/70 backdrop-blur-sm",
    icon: "text-red-600",
  },
  success: {
    wrapper:
      "rounded-2xl border border-emerald-200/80 bg-emerald-50/80 text-emerald-800 shadow-sm shadow-emerald-100/70 backdrop-blur-sm",
    icon: "text-emerald-600",
  },
};

export default function AuthStatusMessage({ type = "error", message }) {
  if (!message) return null;

  const tone = styles[type] || styles.error;
  const Icon = type === "success" ? CheckCircle2 : AlertCircle;

  return (
    <div className={`${tone.wrapper} flex items-start gap-3 p-4`} role="alert" aria-live="polite">
      <Icon className={`${tone.icon} mt-0.5 h-5 w-5 shrink-0`} />
      <p className="text-sm font-semibold leading-5">{message}</p>
    </div>
  );
}
