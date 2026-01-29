import { ToolInvocation } from "ai";
import { Loader2 } from "lucide-react";

function getFilename(path: string): string {
  const parts = path.split("/");
  return parts[parts.length - 1] || path;
}

function getLabel(toolInvocation: ToolInvocation): string {
  const args = toolInvocation.args as Record<string, unknown>;
  const command = args?.command as string | undefined;
  const path = args?.path as string | undefined;
  const filename = path ? getFilename(path) : "";
  const done = toolInvocation.state === "result";

  if (toolInvocation.toolName === "str_replace_editor") {
    switch (command) {
      case "create":
        return done ? `Created ${filename}` : `Creating ${filename}`;
      case "str_replace":
      case "insert":
        return done ? `Edited ${filename}` : `Editing ${filename}`;
      case "view":
        return done ? `Viewed ${filename}` : `Viewing ${filename}`;
    }
  }

  if (toolInvocation.toolName === "file_manager") {
    switch (command) {
      case "rename":
        return done ? `Renamed ${filename}` : `Renaming ${filename}`;
      case "delete":
        return done ? `Deleted ${filename}` : `Deleting ${filename}`;
    }
  }

  return toolInvocation.toolName;
}

interface ToolInvocationBadgeProps {
  toolInvocation: ToolInvocation;
}

export function ToolInvocationBadge({ toolInvocation }: ToolInvocationBadgeProps) {
  const label = getLabel(toolInvocation);
  const isDone = toolInvocation.state === "result" && toolInvocation.result;

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {isDone ? (
        <>
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span className="text-neutral-700">{label}</span>
        </>
      ) : (
        <>
          <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
          <span className="text-neutral-700">{label}</span>
        </>
      )}
    </div>
  );
}
