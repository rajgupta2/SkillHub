"use client";

import { X, Info } from "lucide-react";

export default function TutorialInfoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-2 text-blue-600">
            <Info className="w-5 h-5" />
            <h2 className="font-semibold text-lg">Tutorials Update</h2>
          </div>

          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-3 text-sm text-gray-600">
          <p>
            🚀 You can now <strong>create and edit tutorials</strong> directly.
          </p>

          <p>
            ✏️ Any <strong>edited content</strong> is stored only in your browser.
            No one else can see it.
          </p>

          <p>
            🔒 Tutorials you create remain <strong>private</strong> until you
            publish them.
          </p>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-blue-600 py-2.5 text-white
            text-sm font-medium hover:bg-blue-700 transition"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
