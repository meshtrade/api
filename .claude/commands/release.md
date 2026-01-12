---
description: Execute a full release across all SDK targets (proto, go, py, java, ts-node, ts-web, ts-old, docs)
argument-hint: <version> (e.g., 1.35.0)
---

Execute a full release for version **$1** across all 8 targets.

## Your Task

You must EXECUTE the following release process, not just describe it. Create all tags, releases, and trigger all workflows.

**CRITICAL: NEVER use `gh workflow run` to trigger workflows. ALL workflows MUST be triggered via tag push events. This ensures version labels are correctly applied.**

### Step 1: Pre-flight Checks

1. Verify version $1 doesn't already exist:
   - Check `git tag --list "*/$1"`
   - Check `gh release list | grep "$1"`
   - If version exists, STOP and inform the user

2. Find the previous release version by running `gh release list --limit 5`

3. Get changes since last release:
   - Run `git log <previous-proto-tag>..HEAD --oneline --no-merges`
   - For each feature/fix commit, get PR details with `gh pr view <number> --json title,body`
   - Check proto changes: `git diff <previous-proto-tag>..HEAD -- proto/`

### Step 2: Create All Git Tags Locally

```bash
git tag proto/v$1
git tag go/v$1
git tag py/v$1
git tag java/v$1
git tag ts-node/v$1
git tag ts-web/v$1
git tag ts-old/v$1
git tag docs/v$1
```

**IMPORTANT**: Do NOT push tags yet! They will be pushed automatically when creating releases in Step 3.

### Step 3: Create All 8 GitHub Releases

Create releases with `gh release create` using HEREDOC for notes. Write good release notes based on the changes you found in Step 1.

**CRITICAL RELEASE FLAGS**:
- Do NOT use `--draft` flag - releases must be published immediately
- The `gh release create <tag>` command will automatically push the tag AND trigger the workflow via push event
- If tags were already pushed before creating releases, workflows will NOT trigger and you must re-push tags in Step 4

**Release patterns:**
- `proto/v$1` - "Protobuf v$1" - List proto changes, breaking changes, "aligns with SDK releases v$1"
- `go/v$1` - "Go SDK v$1" - What's Changed, Migration example, Full Changelog link
- `py/v$1` - "Python SDK v$1" - What's Changed, Migration, `pip install meshtrade==$1`
- `java/v$1` - "Java SDK v$1" - What's Changed, Migration, Maven dependency XML
- `ts-node/v$1` - "TypeScript SDK (Node) v$1" - What's Changed, Migration, `npm install @meshtrade/api-node@$1`
- `ts-web/v$1` - "TypeScript SDK (Web) v$1" - Same but `@meshtrade/api-web@$1`
- `ts-old/v$1` - "TypeScript SDK (Legacy) v$1" - Same but `@meshtrade/api@$1`
- `docs/v$1` - "Documentation v$1" - Doc updates, link to https://meshtrade.github.io/api/

### Step 4: Verify Workflows Triggered

After creating releases, check `gh run list --limit 15` to verify workflows were triggered.

**Expected workflows (all should show the tag and `push` event type):**
- Push Protobuf to Buf Registry (proto/v$1)
- Deploy Python SDK to PyPI (py/v$1)
- Deploy Java SDK to Maven Central (java/v$1)
- Deploy TypeScript SDK Node/Web/Legacy (ts-*/v$1)
- Deploy Docs Site (docs/v$1)

**If any workflow did NOT trigger**, you must delete and re-push the tag to trigger it:
```bash
git push origin :refs/tags/<tag> && git push origin <tag>
```

For example, if proto workflow didn't trigger:
```bash
git push origin :refs/tags/proto/v$1 && git push origin proto/v$1
```

### Step 5: Monitor Until Complete

Run `gh run list --limit 15` periodically until all v$1 workflows show `completed success`.

Expected completion times:
- Push Protobuf to Buf Registry (~15s)
- Deploy Python SDK to PyPI (~1-2min)
- Deploy Java SDK to Maven Central (~6-7min)
- Deploy TypeScript SDK (Node/Web/Legacy) (~1-2min each)
- Deploy Docs Site (~3-4min)

If any workflow fails, check logs with `gh run view <run-id> --log-failed` and fix.

### Step 6: Report Results

Show the user:
1. All 8 releases created with links
2. All workflow statuses (success/failure) - verify all triggered via `push` event
3. List of auto-generated PRs to merge: `gh pr list --limit 10`

---

## WHY NO MANUAL WORKFLOW DISPATCH

**NEVER use `gh workflow run` for these workflows:**

1. **Protobuf (buf-registry-push)**: Manual dispatch pushes to Buf registry WITHOUT the version label. Only tag push events extract the version and apply `--label "v$1"`.

2. **Python (pypi-deploy)**: Manual dispatch fails entirely with "version must be set manually" because the workflow only extracts version from tag on push events.

3. **Java (maven-central-deploy)**: Same as Python - fails on manual dispatch.

4. **TypeScript**: While these CAN accept version input on manual dispatch, we use tag push for consistency and to avoid mistakes.

5. **Docs**: Can work with manual dispatch, but tag push is preferred for consistency.

**The ONLY way to trigger workflows is via tag push. Period.**
