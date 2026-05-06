import { CodeBlock } from "@/components/CodeBlock";
import { LightboxImage } from "@/components/LightboxImage";
import { RequestFlowDiagram } from "@/components/RequestFlowDiagram";
import { Section } from "@/components/Section";

import uiScreenshot from "@/docs/image.png";
import db1 from "@/docs/image-1.png";
import db2 from "@/docs/image-2.png";
import db3 from "@/docs/image-3.png";

const collectedContextCode = `
export interface CollectedContext {
  projectIdentity: ProjectIdentity;
  targetBusinessContext: TargetBusinessContext;
  branding: Branding;
  functionalRequirements: FunctionalRequirements;
  constraints: Constraints;
  otherInfo: string[];
}
`.trim();

const planCode = `
export type PlanTask = {
  task_id: string;
  task_type: "ui_task" | "be_task" | "db_task";
  intent:
    | "add_page"
    | "add_section"
    | "modify_section"
    | "modify_text_content"
    | "modify_styling";
  task: string;
  description: string;
};

export type Plan = {
  id: string;
  tasks: PlanTask[];
  status: "pending" | "updated" | "implementing" | "implemented";
  messageId?: string;
};
`.trim();

export default function HomePage() {
  return (
    <div className="grid-fade min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070A12]/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-500/15 ring-1 ring-indigo-400/25 shadow-glow" />
            <div>
              <div className="text-sm font-semibold text-slate-50">Qwintly</div>
              <div className="text-xs text-slate-400">System architecture </div>
            </div>
          </div>
          <nav className="hidden items-center gap-5 text-sm text-slate-300 md:flex">
            <a className="hover:text-slate-50" href="#overview">
              Overview
            </a>
            <a className="hover:text-slate-50" href="#request-flow">
              Request flow
            </a>
            <a className="hover:text-slate-50" href="#data">
              Data
            </a>
            <a className="hover:text-slate-50" href="#infra">
              Infra
            </a>
            <a className="hover:text-slate-50" href="#repos">
              Repos
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 shadow-glow">
          <div className="absolute inset-0 opacity-80 [mask-image:radial-gradient(600px_circle_at_30%_10%,black,transparent_70%)]">
            <div className="h-full w-full bg-[radial-gradient(circle_at_20%_15%,rgba(99,102,241,0.35),transparent_40%),radial-gradient(circle_at_70%_40%,rgba(16,185,129,0.25),transparent_45%),radial-gradient(circle_at_50%_120%,rgba(236,72,153,0.2),transparent_40%)]" />
          </div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Architecture overview
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
              Qwintly website-generation system, explained
            </h1>
            <p className="prose-lite mt-3 max-w-3xl text-sm md:text-base">
              This is a documentation dicusses the architecture for qwintly, a BYOK website generator.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs font-semibold text-slate-200">Product</div>
                <div className="mt-1 text-sm text-slate-300">AI website generator (BYOK)</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs font-semibold text-slate-200">Front-end</div>
                <div className="mt-1 text-sm text-slate-300">Next.js chat + preview experience</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs font-semibold text-slate-200">Back-end</div>
                <div className="mt-1 text-sm text-slate-300">GCP Pub/Sub + Cloud Run worker/jobs</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6">
          <Section id="overview" eyebrow="01 — What it is" title="Overview">
            <div className="prose-lite space-y-3 text-sm md:text-base">
              <p>
                Qwintly is a website generator (similar to Webflow-style generation) currently focused
                on <strong>UI-only websites</strong>, with plans to add backend capabilities.
              </p>
              <p>
                It is <strong>BYOK</strong> (Bring Your Own Key): users provide their own model API key(s).
                As described in the architecture doc, keys are encrypted using <strong>GCP KMS</strong> before
                storage. The product is targeted at non-technical users who want to generate sites with AI.
              </p>
            </div>
          </Section>

          <Section id="request-flow" eyebrow="02 — End-to-end" title="Request flow (from chat → deployed site)">
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="prose-lite space-y-3 text-sm md:text-base">
                <p>
                  Users chat in <strong>qwintly.com</strong> (Next.js). The agent can ask clarifying questions
                  (via an <code>ask_questions</code> tool) and produces a <strong>product-level plan</strong>.
                </p>
                <p>
                  After plan approval (<code>/generate/approve-plan</code>), a signed message is published to a
                  GCP Pub/Sub topic. A push-based worker triggers the builder job, which generates and validates
                  code, persists snapshots to GCS, and finally deploys with retries.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs font-semibold text-slate-200">Rate limiting</div>
                  <div className="mt-1 text-sm text-slate-300">
                    Max <strong>50 messages/day</strong> per user (abuse prevention).
                  </div>
                </div>
              </div>
              <RequestFlowDiagram />
            </div>
          </Section>

          <Section eyebrow="03 — Context & planning" title="How the agent keeps state">
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="prose-lite space-y-3 text-sm md:text-base">
                <p>
                  The chat builds an ever-expanding <strong>collected context</strong> object. A lightweight model
                  updates it on every user message (previous context + new prompt → updated context).
                </p>
                <p>
                  Plans are <strong>product-level</strong> (not deeply technical). Users can approve or suggest edits
                  before generation begins.
                </p>
              </div>
              <div className="space-y-4">
                <CodeBlock title="CollectedContext (shape)" code={collectedContextCode} />
                <CodeBlock title="Plan (shape)" code={planCode} />
              </div>
            </div>
          </Section>

          <Section id="data" eyebrow="04 — Storage" title="Data model & observability">
            <div className="grid gap-4">
              <div className="prose-lite text-sm md:text-base">
                Messages, Q&A, plans, and tool-call traces are persisted to support continuity and transparency.
                Generation logs are persisted and streamed to the UI (SSE) while runs are in progress.
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {[
                  { src: db1, alt: "Database diagram 1" },
                  { src: db2, alt: "Database diagram 2" },
                  { src: db3, alt: "Database diagram 3" },
                ].map(
                  (img) => (
                    <LightboxImage
                      key={img.alt}
                      src={img.src}
                      alt={img.alt}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                  )
                )}
              </div>
            </div>
          </Section>

          <Section eyebrow="05 — UI" title="User interface (chat + preview)">
            <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
              <div className="prose-lite space-y-3 text-sm md:text-base">
                <p>
                  The UI uses a split layout: AI chat on the left, website preview on the right. Users can see the
                  plan, implementation progress, and live status updates.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs font-semibold text-slate-200">Transparency</div>
                  <div className="mt-1 text-sm text-slate-300">
                    Users see the exact steps the agent performed while implementing the plan.
                  </div>
                </div>
              </div>
              <LightboxImage
                src={uiScreenshot}
                alt="Qwintly UI screenshot"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>
          </Section>

          <Section id="infra" eyebrow="06 — Infra" title="Infrastructure & deployments">
            <div className="prose-lite space-y-3 text-sm md:text-base">
              <p>
                Infrastructure is managed with <strong>Terraform</strong> + <strong>Supabase migrations</strong> to reduce drift between
                dev and prod environments, and deployments are managed with GitHub workflows (branch-based).
              </p>
              <p>
                Generated websites are deployed to subdomains like <code>{"{chatId}-projects.qwintly.com"}</code>. Routing is handled via
                Cloudflare Workers acting as a reverse proxy.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs font-semibold text-slate-200">Validation</div>
                  <div className="mt-1 text-sm text-slate-300">
                    schema + Next.js rules + ESLint + TS checks
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs font-semibold text-slate-200">Retries</div>
                  <div className="mt-1 text-sm text-slate-300">max 3 deploy fix cycles</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs font-semibold text-slate-200">Observability</div>
                  <div className="mt-1 text-sm text-slate-300">events persisted + streamed</div>
                </div>
              </div>
            </div>
          </Section>

          <Section id="repos" eyebrow="07 — Codebases" title="Related repositories">
            <div className="prose-lite text-sm md:text-base">
              <ul className="list-inside list-disc space-y-2">
                <li>
                  <a href="https://github.com/vedangiitb/qwintly" target="_blank" rel="noreferrer">
                    vedangiitb/qwintly
                  </a>
                </li>
                <li>
                  <a href="https://github.com/vedangiitb/qwintly-wg-worker" target="_blank" rel="noreferrer">
                    vedangiitb/qwintly-wg-worker
                  </a>
                </li>
                <li>
                  <a href="https://github.com/vedangiitb/qwintly-deployer" target="_blank" rel="noreferrer">
                    vedangiitb/qwintly-deployer
                  </a>
                </li>
                <li>
                  <a href="https://github.com/vedangiitb/qwintly-builder" target="_blank" rel="noreferrer">
                    vedangiitb/qwintly-builder
                  </a>
                </li>
                <li>
                  <a href="https://github.com/vedangiitb/qwintly-infra" target="_blank" rel="noreferrer">
                    vedangiitb/qwintly-infra
                  </a>
                </li>
                <li>
                  <a href="https://github.com/vedangiitb/qwintly-core" target="_blank" rel="noreferrer">
                    vedangiitb/qwintly-core
                  </a>
                </li>
                <li>
                  <a href="https://github.com/vedangiitb/qwintly-boilerplate" target="_blank" rel="noreferrer">
                    vedangiitb/qwintly-boilerplate
                  </a>
                </li>
              </ul>
            </div>
          </Section>
        </div>

        <footer className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-400">
          Built as a read-only documentation UI.
        </footer>
      </main>
    </div>
  );
}
