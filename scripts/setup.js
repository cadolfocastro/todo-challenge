#!/usr/bin/env node
/**
 * Project setup script.
 * Run once after cloning: npm run setup
 *
 * Actions:
 *  1. Copies environment.example.ts → environment.ts (if not already present)
 *  2. Installs the pre-commit git hook
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// ── 1. Environment file ──────────────────────────────────────────────────────
const exampleEnv = path.join(root, 'src', 'environments', 'environment.example.ts');
const localEnv   = path.join(root, 'src', 'environments', 'environment.ts');

if (!fs.existsSync(localEnv)) {
  fs.copyFileSync(exampleEnv, localEnv);
  console.log('✅ Created src/environments/environment.ts from example.');
  console.log('   → Open that file and fill in your Firebase Web API Key.');
} else {
  console.log('ℹ️  src/environments/environment.ts already exists – skipped.');
}

// ── 2. Pre-commit hook ───────────────────────────────────────────────────────
const hookSrc  = path.join(root, 'scripts', 'pre-commit.sh');
const hookDest = path.join(root, '.git', 'hooks', 'pre-commit');

fs.copyFileSync(hookSrc, hookDest);
// chmod +x (no-op on Windows but needed for Linux/macOS)
try { fs.chmodSync(hookDest, 0o755); } catch (_) {}
console.log('✅ Pre-commit hook installed. Commits with secrets will be blocked.');
