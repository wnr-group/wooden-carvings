import { STAGES } from "@/data/stages";
import { cn } from "@/lib/cn";
import { TOTAL_STAGES, type StageView } from "@/lib/status";

/** Segmented summary: one segment per milestone. */
export function ProgressSteps({ current }: { current: StageView }) {
  const finished = current.state === "completed";
  const step = current.index + 1;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span className="font-medium text-charcoal">
          {finished ? "All steps complete" : `Step ${step} of ${TOTAL_STAGES}`}
        </span>
        <span className="text-muted-strong">{current.title}</span>
      </div>
      <ol
        className="mt-3 grid grid-cols-6 gap-1.5"
        aria-label={`Progress: ${finished ? "all" : step - 1} of ${TOTAL_STAGES} steps complete`}
      >
        {STAGES.map((stage, i) => {
          const done = i < current.index || (finished && i === current.index);
          const active = i === current.index && !finished;
          return (
            <li key={stage.id} className="min-w-0">
              <span className="sr-only">
                {stage.title}: {done ? "completed" : active ? "in progress" : "upcoming"}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "block h-1 rounded-full",
                  done && "bg-forest",
                  active && "bg-walnut",
                  !done && !active && "bg-stone",
                )}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
