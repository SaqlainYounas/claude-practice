# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UIGen is an AI-powered React component generator with live preview. Users describe components in a chat interface, and Claude generates/modifies code in a virtual file system that renders in real-time.

## Commands

```bash
npm run setup      # First-time setup: install deps, generate Prisma client, run migrations
npm run dev        # Start dev server with Turbopack (http://localhost:3000)
npm run build      # Production build
npm run lint       # Run ESLint
npm test           # Run Vitest tests
npm run db:reset   # Reset database (destroys all data)
```

## Architecture

### Virtual File System
All generated code lives in memory via `VirtualFileSystem` class (`src/lib/file-system.ts`). No files are written to disk. The file system is serializable to JSON for persistence in the database.

### AI Integration
- Chat API at `/api/chat/route.ts` streams Claude responses via Vercel AI SDK
- Claude uses two tools to modify the virtual file system:
  - `str_replace_editor` (`src/lib/tools/str-replace.ts`) - modify existing files
  - `file_manager` (`src/lib/tools/file-manager.ts`) - create/delete files and directories
- System prompt in `src/lib/prompts/generation.ts`
- Falls back to `MockLanguageModel` when `ANTHROPIC_API_KEY` is not set

### State Management
- `FileSystemProvider` (`src/lib/contexts/file-system-context.tsx`) - manages virtual file system state
- `ChatProvider` (`src/lib/contexts/chat-context.tsx`) - manages chat messages and AI interaction

### Data Flow
1. User sends message → `/api/chat` endpoint
2. Claude receives system prompt + messages + current file system state
3. Claude calls tools to modify files
4. Tool results update FileSystemContext
5. PreviewFrame re-renders with new code

### Database
SQLite via Prisma. Reference `prisma/schema.prisma` to understand the data structure:
- `User` - email/password auth (bcrypt hashed)
- `Project` - stores serialized messages and VirtualFileSystem as JSON

### Authentication
JWT tokens in httpOnly cookies. Authentication is optional - anonymous users can generate components but cannot persist projects.

## Key Files

- `src/app/api/chat/route.ts` - Main AI endpoint
- `src/lib/file-system.ts` - VirtualFileSystem class
- `src/lib/provider.ts` - Language model configuration
- `src/app/main-content.tsx` - Primary UI with resizable panels
- `src/components/preview/PreviewFrame.tsx` - Live component preview

## Code Style

- No emojis in comments. Keep comments natural and straightforward.
- Use comments sparingly. Only comment complex code.

## Commit Message Format

- **Title**: Natural, concise — as short as possible.
- **Description** structured as follows:

1. **Description**
   - *Jira Item link* (if applicable)
   - *Problem Statement / Bug Statement / Feature Enhancement*
   - *Solution*
2. **Modified Files** — what was changed in each file and why.
3. **Newly Added Files** — why each file was added.

## Testing

Tests use Vitest with React Testing Library. Test files are colocated in `__tests__` directories next to their source files.

```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode
npm test -- src/lib   # Run tests in specific directory
```
