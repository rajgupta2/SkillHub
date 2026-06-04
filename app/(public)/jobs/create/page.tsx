"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import FormPage from "./FormPage";
import JsonPage from "./JsonPage";
type TabKey = "Form" | "JSON";
import {
  Briefcase,
} from "lucide-react";
import { Card,CardContent } from "@/components/ui/card";
/**
 * - Slug auto generation
 * - descriptionJson input (BlockNote source of truth)
 * - contentHtml preview placeholder (generated in backend)
 */

export default function AdminCreateJobPage() {
  const [tab, setTab] = useState<TabKey>("Form");
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border bg-white/70 shadow-sm backdrop-blur dark:bg-slate-900/40">
                  <Briefcase className="h-4 w-4" />
                </span>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Create Job
                </h1>
              </div>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Create jobs in <span className="font-medium">Form Mode</span> or paste a
                <span className="font-medium"> JSON array.</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
                <Button
                type="button"
                variant={tab === "Form" ? "default" : "outline"}
                onClick={() => setTab("Form")}
                className="rounded-2xl"
                >
                Form
                </Button>

                <Button
                type="button"
                variant={tab === "JSON" ? "default" : "outline"}
                onClick={() => setTab("JSON")}
                className="rounded-2xl"
                >
                JSON
                </Button>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <Card className="rounded-2xl border bg-white/70 shadow-sm backdrop-blur dark:bg-slate-900/40">
          <CardContent>
            <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>

              {/* FORM MODE */}
              <TabsContent value="Form" className="space-y-6">
                    <FormPage setMsg={(msg)=>setMsg(msg)} />
               </TabsContent>

              {/* BULK JSON MODE */}
              <TabsContent value="JSON" className="space-y-4">
                    <JsonPage setMsg={(msg)=>setMsg(msg)} />
              </TabsContent>

            </Tabs>

            {/* Message */}
            {msg && (
              <div
                className={cn(
                  "mt-6 rounded-2xl border p-4 text-sm",
                  msg.startsWith("✅")
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100"
                    : "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-100"
                )}
              >
                {msg}
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </main>
  );
}

