export function RequestFlowDiagram() {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs font-semibold text-slate-200">Request flow (simplified)</div>
        <div className="text-[11px] text-slate-400">UI → Orchestration → Build → Deploy</div>
      </div>
      <svg
        viewBox="0 0 1100 210"
        className="h-auto w-full"
        role="img"
        aria-label="Qwintly request flow diagram"
      >
        <defs>
          <linearGradient id="box" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(99,102,241,0.22)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0.12)" />
          </linearGradient>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="10"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(226,232,240,0.7)" />
          </marker>
        </defs>

        <rect x="20" y="52" width="195" height="92" rx="18" fill="url(#box)" stroke="rgba(255,255,255,0.14)" />
        <text x="118" y="92" textAnchor="middle" fontSize="14" fill="rgba(226,232,240,0.95)" fontWeight="600">
          Next.js App
        </text>
        <text x="118" y="114" textAnchor="middle" fontSize="12" fill="rgba(148,163,184,0.95)">
          chat + plan approval
        </text>

        <rect x="250" y="52" width="220" height="92" rx="18" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" />
        <text x="360" y="92" textAnchor="middle" fontSize="14" fill="rgba(226,232,240,0.95)" fontWeight="600">
          Pub/Sub Topic
        </text>
        <text x="360" y="114" textAnchor="middle" fontSize="12" fill="rgba(148,163,184,0.95)">
          website-generation (push)
        </text>

        <rect x="505" y="52" width="200" height="92" rx="18" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" />
        <text x="605" y="92" textAnchor="middle" fontSize="14" fill="rgba(226,232,240,0.95)" fontWeight="600">
          WG Worker
        </text>
        <text x="605" y="114" textAnchor="middle" fontSize="12" fill="rgba(148,163,184,0.95)">
          Cloud Run service
        </text>

        <rect x="735" y="32" width="165" height="68" rx="18" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" />
        <text x="817.5" y="70" textAnchor="middle" fontSize="13" fill="rgba(226,232,240,0.95)" fontWeight="600">
          Builder Job
        </text>
        <text x="817.5" y="88" textAnchor="middle" fontSize="11.5" fill="rgba(148,163,184,0.95)">
          codegen + validation
        </text>

        <rect x="735" y="110" width="165" height="68" rx="18" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" />
        <text x="817.5" y="148" textAnchor="middle" fontSize="13" fill="rgba(226,232,240,0.95)" fontWeight="600">
          Deployer Job
        </text>
        <text x="817.5" y="166" textAnchor="middle" fontSize="11.5" fill="rgba(148,163,184,0.95)">
          build + retries
        </text>

        <rect x="925" y="52" width="155" height="92" rx="18" fill="rgba(236,72,153,0.07)" stroke="rgba(255,255,255,0.14)" />
        <text x="1002.5" y="92" textAnchor="middle" fontSize="14" fill="rgba(226,232,240,0.95)" fontWeight="600">
          Project URL
        </text>
        <text x="1002.5" y="114" textAnchor="middle" fontSize="12" fill="rgba(148,163,184,0.95)">
          {`{chatId}-projects`}
        </text>

        <line x1="215" y1="98" x2="250" y2="98" stroke="rgba(226,232,240,0.6)" strokeWidth="2.5" markerEnd="url(#arrow)" />
        <line x1="470" y1="98" x2="505" y2="98" stroke="rgba(226,232,240,0.6)" strokeWidth="2.5" markerEnd="url(#arrow)" />
        <line x1="705" y1="98" x2="735" y2="66" stroke="rgba(226,232,240,0.5)" strokeWidth="2.5" markerEnd="url(#arrow)" />
        <line x1="705" y1="98" x2="735" y2="144" stroke="rgba(226,232,240,0.5)" strokeWidth="2.5" markerEnd="url(#arrow)" />
        <line x1="900" y1="98" x2="925" y2="98" stroke="rgba(226,232,240,0.6)" strokeWidth="2.5" markerEnd="url(#arrow)" />

        <text x="360" y="40" textAnchor="middle" fontSize="11" fill="rgba(148,163,184,0.95)">
          signed payload (JWT)
        </text>
        <text x="817.5" y="196" textAnchor="middle" fontSize="11" fill="rgba(148,163,184,0.95)">
          snapshots in GCS + status via SSE
        </text>
      </svg>
    </div>
  );
}

