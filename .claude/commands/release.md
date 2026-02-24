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

### Step 2: Create and Push All Git Tags

Create all 8 tags locally, then push them all at once:

```bash
git tag proto/v$1
git tag go/v$1
git tag py/v$1
git tag java/v$1
git tag ts-node/v$1
git tag ts-web/v$1
git tag ts-old/v$1
git tag docs/v$1

git push origin proto/v$1 go/v$1 py/v$1 java/v$1 ts-node/v$1 ts-web/v$1 ts-old/v$1 docs/v$1
```

### Step 3: Create the Go Release

Go has no deploy workflow, so create its release now. It won't be overwritten.

```bash
gh release create go/v$1 --title "Go SDK v$1" --notes "..."
```

Use good release notes based on the changes found in Step 1.

### Step 4: Trigger All Deploy Workflows via Tag Re-push

Re-push each tag (except Go) to trigger the deploy workflows. Each re-push MUST be done individually to ensure GitHub fires a push event for each:

```bash
git push origin :refs/tags/proto/v$1 && git push origin proto/v$1
git push origin :refs/tags/py/v$1 && git push origin py/v$1
git push origin :refs/tags/java/v$1 && git push origin java/v$1
git push origin :refs/tags/ts-node/v$1 && git push origin ts-node/v$1
git push origin :refs/tags/ts-web/v$1 && git push origin ts-web/v$1
git push origin :refs/tags/ts-old/v$1 && git push origin ts-old/v$1
git push origin :refs/tags/docs/v$1 && git push origin docs/v$1
```

Run these in parallel (all at once).

Then verify all 7 workflows appear with `gh run list --limit 15`. All should show the tag and `push` event type:
- Push Protobuf to Buf Registry (proto/v$1)
- Deploy Python SDK to PyPI (py/v$1)
- Deploy Java SDK to Maven Central (java/v$1)
- Deploy TypeScript SDK Node/Web/Legacy (ts-*/v$1)
- Deploy Docs Site (docs/v$1)

### Step 5: Monitor Until All Workflows Complete

Run `gh run list --limit 15` periodically until all v$1 workflows show `completed success`.

Expected completion times:
- Push Protobuf to Buf Registry (~15s)
- Deploy Python SDK to PyPI (~1-2min)
- Deploy Java SDK to Maven Central (~6-7min)
- Deploy TypeScript SDK (Node/Web/Legacy) (~1-2min each)
- Deploy Docs Site (~3-4min)

If any workflow fails, check logs with `gh run view <run-id> --log-failed` and fix.

### Step 6: Publish All Releases (CRITICAL)

**WHY**: The deploy workflows create/update releases as **drafts**, overwriting any previously published release. This step is MANDATORY — without it, releases will remain as drafts.

Edit each release (except Go, which is already published) with proper release notes and publish:

```bash
gh release edit proto/v$1 --draft=false --title "Protobuf v$1" --notes "..."
gh release edit py/v$1 --draft=false --title "Python SDK v$1" --notes "..."
gh release edit java/v$1 --draft=false --title "Java SDK v$1" --notes "..."
gh release edit ts-node/v$1 --draft=false --title "TypeScript SDK (Node) v$1" --notes "..."
gh release edit ts-web/v$1 --draft=false --title "TypeScript SDK (Web) v$1" --notes "..."
gh release edit ts-old/v$1 --draft=false --title "TypeScript SDK (Legacy) v$1" --notes "..."
gh release edit docs/v$1 --draft=false --title "Documentation v$1" --notes "..."
```

Use HEREDOC for notes. Write good release notes based on changes from Step 1.

**Release note patterns:**
- `proto/v$1` - List proto changes, breaking changes, "aligns with SDK releases v$1"
- `py/v$1` - What's Changed, Migration, `pip install meshtrade==$1`
- `java/v$1` - What's Changed, Migration, Maven dependency XML
- `ts-node/v$1` - What's Changed, Migration, `npm install @meshtrade/api-node@$1`
- `ts-web/v$1` - Same but `@meshtrade/api-web@$1`
- `ts-old/v$1` - Same but `@meshtrade/api@$1`
- `docs/v$1` - Doc updates, link to https://meshtrade.github.io/api/

**After editing, immediately verify zero drafts remain:**
```bash
gh release list --limit 10 | grep -i draft
```
If ANY drafts exist, re-run `gh release edit <tag> --draft=false` for each.

### Step 7: Merge Auto-Generated Version PRs

After all workflows complete successfully, 5 auto-generated PRs will exist that bump version files back into master. Merge all of them:

**Expected PRs (by branch name):**
- `chore/pypi-version-update-$1` — updates `pyproject.toml`
- `chore/maven-version-update-$1` — updates `java/pom.xml`
- `chore/npm-ts-node-version-update-$1` — updates `ts-node/package.json`
- `chore/npm-ts-web-version-update-$1` — updates `ts-web/package.json`
- `chore/npm-ts-old-version-update-$1` — updates `ts-old/package.json`

1. List PRs to confirm they all exist: `gh pr list --limit 10`
2. Merge each PR and delete its branch:
```bash
gh pr merge chore/pypi-version-update-$1 --squash --delete-branch --admin
gh pr merge chore/maven-version-update-$1 --squash --delete-branch --admin
gh pr merge chore/npm-ts-node-version-update-$1 --squash --delete-branch --admin
gh pr merge chore/npm-ts-web-version-update-$1 --squash --delete-branch --admin
gh pr merge chore/npm-ts-old-version-update-$1 --squash --delete-branch --admin
```
**Note:** `--admin` is required to bypass branch protection rules on master. Always use `--squash` for a clean commit history.
3. If any PR is missing, the corresponding workflow may still be running or may have failed — check `gh run list --limit 15`

### Step 8: Final Verification and Report

1. Run `gh release list --limit 10 | grep -i draft` — must return NOTHING
2. Run `git pull origin master` to sync version-bump merges

Show the user:
1. All 8 releases with links — confirm NONE are drafts
2. All workflow statuses (success/failure) — verify all triggered via `push` event
3. All 5 version-bump PRs merged successfully

---

## WHY NO MANUAL WORKFLOW DISPATCH

**NEVER use `gh workflow run` for these workflows:**

1. **Protobuf (buf-registry-push)**: Manual dispatch pushes to Buf registry WITHOUT the version label. Only tag push events extract the version and apply `--label "v$1"`.

2. **Python (pypi-deploy)**: Manual dispatch fails entirely with "version must be set manually" because the workflow only extracts version from tag on push events.

3. **Java (maven-central-deploy)**: Same as Python - fails on manual dispatch.

4. **TypeScript**: While these CAN accept version input on manual dispatch, we use tag push for consistency and to avoid mistakes.

5. **Docs**: Can work with manual dispatch, but tag push is preferred for consistency.

**The ONLY way to trigger workflows is via tag push. Period.**

## WHY RELEASES MUST BE PUBLISHED AFTER WORKFLOWS

Deploy workflows use GitHub Actions that create/update releases as **drafts**. This means:
- Any tag push that triggers a workflow will overwrite the release status to draft
- Even if you create a published release first, the workflow will convert it back to draft
- The ONLY safe time to publish is AFTER all workflows have completed
- Go is the exception — it has no deploy workflow, so its release is created once and stays published
