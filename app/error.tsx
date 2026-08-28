"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold">Something went wrong.</h1>
        <p className="text-center mb-4">{error.message}</p>
      </div>
      <Button className="bg-blue-500 hover:bg-blue-700 cursor-pointer" onClick={() => reset()}>Try again</Button>
    </div>
  );
}