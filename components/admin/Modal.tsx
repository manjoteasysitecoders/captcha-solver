"use client";

import { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
  submitLabel?: string;
};

export default function Modal({
  open,
  title,
  loading = false,
  onClose,
  onSubmit,
  children,
  submitLabel = "Save",
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card rounded-2xl border-2 border-primary p-6 w-full max-w-lg shadow-lg space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold">{title}</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {children}

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-foreground/10 px-4 py-2 hover:opacity-90"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground hover:opacity-90"
            >
              {loading ? "Saving..." : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
