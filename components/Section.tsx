import type { ReactNode } from "react";

export function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id?: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur">
        <div className="flex items-start justify-between gap-4">
          <div>
            {eyebrow ? (
              <div className="text-xs font-semibold tracking-wider text-indigo-300/90">
                {eyebrow}
              </div>
            ) : null}
            <h2 className="mt-1 text-lg font-semibold text-slate-50">{title}</h2>
          </div>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </section>
  );
}

