"use client";
import { Rocket } from "lucide-react";

export default function PublishPage() {
  return (
    <div className="max-w-5xl mx-auto my-6">
      <div className="text-center space-y-6">
        {/* Badge */}
        <div className="py-2 inline-block rounded-full bg-indigo-100 text-indigo-700 px-4 py-1 text-sm font-medium">
          <div className="flex gap-2">
            <Rocket /> Ready to Write
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Share Your Knowledge with the World
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          You&apos;ve created a course that can help others learn and grow.
          Write it now so you can start learning with others and gain{" "}
          <span className="font-semibold text-indigo-600">
            points & recognition.
          </span>
        </p>
      </div>

      {/* CTA */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="rounded-xl text-indigo-600 px-8 font-semibold text-2xl">
          Start Writing Now <span className="line-through">Later</span> .
        </div>
      </div>

      <p className="text-center text-gray-500">
        Your tutorial will save in draft mode until you publish it.
      </p>

      {/* Feature cards */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border p-6 text-center shadow-sm">
          <div className="text-3xl mb-3">📚</div>
          <h3 className="font-semibold text-lg">Help Others Learn</h3>
          <p className="text-sm text-gray-600 mt-2">
            Your tutorial becomes accessible to anyone when you published it.
          </p>
        </div>

        <div className="rounded-2xl border p-6 text-center shadow-sm">
          <div className="text-3xl mb-3">🏆</div>
          <h3 className="font-semibold text-lg">Earn Points</h3>
          <p className="text-sm text-gray-600 mt-2">
            Publishing tutorials will soon reward you with points and
            achievements.
          </p>
        </div>

        <div className="rounded-2xl border p-6 text-center shadow-sm">
          <div className="text-3xl mb-3">✏️</div>
          <h3 className="font-semibold text-lg">Edit Anytime</h3>
          <p className="text-sm text-gray-600 mt-2">
            Your tutorial will save in draft mode until you change.
          </p>
        </div>
      </div>
    </div>
  );
}
