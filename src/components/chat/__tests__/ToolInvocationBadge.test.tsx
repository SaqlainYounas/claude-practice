import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { ToolInvocationBadge } from "../ToolInvocationBadge";

test("shows 'Created' for str_replace_editor create command when done", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolCallId: "1",
        toolName: "str_replace_editor",
        args: { command: "create", path: "/src/components/Card.jsx" },
        state: "result",
        result: "Success",
      }}
    />
  );
  expect(screen.getByText("Created Card.jsx")).toBeDefined();
});

test("shows 'Creating' for str_replace_editor create command in progress", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolCallId: "1",
        toolName: "str_replace_editor",
        args: { command: "create", path: "/src/components/Card.jsx" },
        state: "call",
      }}
    />
  );
  expect(screen.getByText("Creating Card.jsx")).toBeDefined();
});

test("shows 'Edited' for str_replace_editor str_replace command when done", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolCallId: "2",
        toolName: "str_replace_editor",
        args: { command: "str_replace", path: "/src/App.jsx" },
        state: "result",
        result: "Success",
      }}
    />
  );
  expect(screen.getByText("Edited App.jsx")).toBeDefined();
});

test("shows 'Editing' for str_replace_editor insert command in progress", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolCallId: "3",
        toolName: "str_replace_editor",
        args: { command: "insert", path: "/src/index.js" },
        state: "call",
      }}
    />
  );
  expect(screen.getByText("Editing index.js")).toBeDefined();
});

test("shows 'Viewed' for str_replace_editor view command when done", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolCallId: "4",
        toolName: "str_replace_editor",
        args: { command: "view", path: "/src/utils.ts" },
        state: "result",
        result: "file content",
      }}
    />
  );
  expect(screen.getByText("Viewed utils.ts")).toBeDefined();
});

test("shows 'Deleted' for file_manager delete command when done", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolCallId: "5",
        toolName: "file_manager",
        args: { command: "delete", path: "/src/old.js" },
        state: "result",
        result: "Deleted",
      }}
    />
  );
  expect(screen.getByText("Deleted old.js")).toBeDefined();
});

test("shows 'Renaming' for file_manager rename command in progress", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolCallId: "6",
        toolName: "file_manager",
        args: { command: "rename", path: "/src/foo.js", new_path: "/src/bar.js" },
        state: "call",
      }}
    />
  );
  expect(screen.getByText("Renaming foo.js")).toBeDefined();
});

test("falls back to tool name for unknown tools", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolCallId: "7",
        toolName: "unknown_tool",
        args: {},
        state: "result",
        result: "done",
      }}
    />
  );
  expect(screen.getByText("unknown_tool")).toBeDefined();
});

test("extracts basename from nested path", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolCallId: "8",
        toolName: "str_replace_editor",
        args: { command: "create", path: "/src/components/ui/Button.tsx" },
        state: "result",
        result: "Success",
      }}
    />
  );
  expect(screen.getByText("Created Button.tsx")).toBeDefined();
});
