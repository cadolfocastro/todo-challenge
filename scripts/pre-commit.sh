#!/bin/sh
# Pre-commit hook: blocks commits that contain secret patterns.
# Covers: Google/Firebase API keys, private keys, service account JSON files.

RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

FAILED=0

# ── Patterns that must never appear in staged files ──────────────────────────
PATTERNS="AIzaSy[0-9A-Za-z_-]{33}|-----BEGIN (RSA |EC )?PRIVATE KEY-----|\"private_key\"\s*:\s*\"-----BEGIN|serviceAccountKey\.json|AAAA[0-9A-Za-z+/]{40,}|ghp_[0-9A-Za-z]{36}|xox[baprs]-[0-9A-Za-z]{10,}"

# ── Files that must never be committed ───────────────────────────────────────
BLOCKED_FILES="serviceAccountKey\.json|\.env$|\.env\.local$|environment\.prod\.ts$"

echo "🔍 Scanning staged files for secrets..."

# Check for blocked filenames
STAGED_FILES=$(git diff --cached --name-only)
for FILE in $STAGED_FILES; do
  if echo "$FILE" | grep -qE "$BLOCKED_FILES"; then
    echo ""
    printf "${RED}❌ BLOCKED FILE: '$FILE' must not be committed.${NC}\n"
    echo "   This file may contain credentials. Add it to .gitignore."
    FAILED=1
  fi
done

# Check file contents for secret patterns
MATCHES=$(git diff --cached -U0 | grep "^+" | grep -v "^+++" | grep -E "$PATTERNS")
if [ -n "$MATCHES" ]; then
  echo ""
  printf "${RED}❌ POSSIBLE SECRET DETECTED in staged changes:${NC}\n"
  echo "$MATCHES" | head -5
  echo ""
  printf "${YELLOW}  If this is a false positive, use: git commit --no-verify${NC}\n"
  FAILED=1
fi

if [ "$FAILED" -eq 1 ]; then
  echo ""
  echo "  Commit ABORTED. Remove the secret and try again."
  echo "  Use environment.example.ts as a template and keep real values local."
  exit 1
fi

echo "✅ No secrets detected."
exit 0
