export function CodeBlock({
  title,
  code,
}: {
  title?: string;
  code: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B1020] shadow-glow">
      {title ? (
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2">
          <div className="text-xs font-semibold text-slate-200">{title}</div>
          <div className="text-[11px] text-slate-400">TypeScript</div>
        </div>
      ) : null}
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-200">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}

