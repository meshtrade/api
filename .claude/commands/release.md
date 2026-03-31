---
description: Execute a full release across all SDK targets (proto, go, py, java, ts-node, ts-web, ts-old, docs)
argument-hint: <version> (e.g., 1.35.0)
---

Execute a full release for version **$1** across all 8 targets.

## Your Task

You must EXECUTE the following release process, not just describe it. Create all tags, trigger all workflows, and create all GitHub releases.

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

Go has no deploy workflow. Create its release now:

```bash
gh release create go/v$1 --title "Go SDK v$1" --notes "..."
```

Use good release notes based on the changes found in Step 1.

### Step 4: Trigger All Deploy Workflows via Tag Re-push

**WHY**: GitHub does not reliably fire individual `push` events when multiple tags are pushed in a single `git push`. Re-pushing each tag (delete + create) forces GitHub to fire a separate push event per tag, which triggers the corresponding workflow.

Re-push each tag (except Go, which has no workflow) individually. Run all 7 in parallel:

```bash
git push origin :refs/tags/proto/v$1 && git push origin proto/v$1
git push origin :refs/tags/py/v$1 && git push origin py/v$1
git push origin :refs/tags/java/v$1 && git push origin java/v$1
git push origin :refs/tags/ts-node/v$1 && git push origin ts-node/v$1
git push origin :refs/tags/ts-web/v$1 && git push origin ts-web/v$1
git push origin :refs/tags/ts-old/v$1 && git push origin ts-old/v$1
git push origin :refs/tags/docs/v$1 && git push origin docs/v$1
```

Then verify all 7 workflows appear with `gh run list --limit 15`. All should show the tag and `push` event type:
- Push Protobuf to Buf Registry (proto/v$1)
- Deploy Python SDK to PyPI (py/v$1)
- Deploy Java SDK to Maven Central (java/v$1)
- Deploy TypeScript SDK Node/Web/Legacy (ts-*/v$1)
- Deploy Docs Site (docs/v$1)

### Step 5: Monitor Until All Workflows Complete

Run `gh run list --limit 15` periodically until all v$1 workflows show `completed` (success or failure).

Expected completion times:
- Push Protobuf to Buf Registry (~15s)
- Deploy Python SDK to PyPI (~1-2min)
- Deploy Java SDK to Maven Central (~6-7min)
- Deploy TypeScript SDK (Node/Web/Legacy) (~1-2min each)
- Deploy Docs Site (~3-4min)

If any workflow fails, check logs with `gh run view <run-id> --log-failed` and report to the user. Note: Python (PyPI) has a known issue with an inactive org account — failure there is expected until resolved.

### Step 6: Create All GitHub Releases

**IMPORTANT**: The deploy workflows do NOT create GitHub releases. You must create all 7 remaining releases (Go was already created in Step 3) using `gh release create`.

Create all 7 releases in parallel:

```bash
gh release create proto/v$1 --title "Protobuf v$1" --notes "..."
gh release create py/v$1 --title "Python SDK v$1" --notes "..."
gh release create java/v$1 --title "Java SDK v$1" --notes "..."
gh release create ts-node/v$1 --title "TypeScript SDK (Node) v$1" --notes "..."
gh release create ts-web/v$1 --title "TypeScript SDK (Web) v$1" --notes "..."
gh release create ts-old/v$1 --title "TypeScript SDK (Legacy) v$1" --notes "..."
gh release create docs/v$1 --title "Documentation v$1" --notes "..."
```

Use HEREDOC for notes. Write good release notes based on changes from Step 1.

**Release note patterns:**
- `proto/v$1` - List proto changes, breaking changes, "aligns with SDK releases v$1"
- `py/v$1` - What's Changed, note if PyPI upload failed, `pip install meshtrade==$1`
- `java/v$1` - What's Changed, Maven dependency XML
- `ts-node/v$1` - What's Changed, `npm install @meshtrade/api-node@$1`
- `ts-web/v$1` - What's Changed, `npm install @meshtrade/api-web@$1`
- `ts-old/v$1` - What's Changed, `npm install @meshtrade/api@$1`
- `docs/v$1` - Doc updates, link to https://meshtrade.github.io/api/

**After creating, immediately verify zero drafts remain:**
```bash
gh release list --limit 10 | grep -i draft
```
If ANY drafts exist, publish them with `gh release edit <tag> --draft=false`.

### Step 7: Merge Auto-Generated Version PRs

After all workflows complete, up to 5 auto-generated PRs will exist that bump version files back into master.

**Expected PRs (by branch name):**
- `chore/pypi-version-update-$1` — updates `pyproject.toml` (only if Python deploy succeeded)
- `chore/maven-version-update-$1` — updates `java/pom.xml`
- `chore/npm-ts-node-version-update-$1` — updates `ts-node/package.json`
- `chore/npm-ts-web-version-update-$1` — updates `ts-web/package.json`
- `chore/npm-ts-old-version-update-$1` — updates `ts-old/package.json`

1. List PRs to confirm which exist: `gh pr list --limit 10`
2. **SQUASH merge** each PR and delete its branch:
```bash
gh pr merge chore/pypi-version-update-$1 --squash --delete-branch --admin
gh pr merge chore/maven-version-update-$1 --squash --delete-branch --admin
gh pr merge chore/npm-ts-node-version-update-$1 --squash --delete-branch --admin
gh pr merge chore/npm-ts-web-version-update-$1 --squash --delete-branch --admin
gh pr merge chore/npm-ts-old-version-update-$1 --squash --delete-branch --admin
```
**CRITICAL**: Always use `--squash` for a clean commit history. Never use plain merge.
**Note:** `--admin` is required to bypass branch protection rules on master.
3. If any PR is missing, the corresponding workflow may still be running or may have failed — check `gh run list --limit 15`

### Step 8: Final Verification and Report

1. Run `gh release list --limit 10 | grep -i draft` — must return NOTHING
2. Run `git pull origin master` to sync version-bump merges

Show the user:
1. All 8 releases with links — confirm NONE are drafts
2. All workflow statuses (success/failure) — verify all triggered via `push` event
3. All version-bump PRs squash-merged successfully (note any missing due to workflow failures)

---

## WHY NO MANUAL WORKFLOW DISPATCH

**NEVER use `gh workflow run` for these workflows:**

1. **Protobuf (buf-registry-push)**: Manual dispatch pushes to Buf registry WITHOUT the version label. Only tag push events extract the version and apply `--label "v$1"`.

2. **Python (pypi-deploy)**: Manual dispatch fails entirely because the workflow only extracts version from tag on push events.

3. **Java (maven-central-deploy)**: Same as Python — fails on manual dispatch.

4. **TypeScript**: While these CAN accept version input on manual dispatch, we use tag push for consistency and to avoid mistakes.

5. **Docs**: Can work with manual dispatch, but tag push is preferred for consistency.

**The ONLY way to trigger workflows is via tag push. Period.**

## KEY FACTS AND PITFALLS

These are hard-won lessons from past releases. Do not ignore them.

1. **`gh release create` requires tags on remote first.** It will error if the tag only exists locally. Always push tags before creating releases.

2. **Deploy workflows do NOT create GitHub releases.** No workflow creates a draft or published release. All 8 releases must be created manually via `gh release create`. Do NOT use `gh release edit --draft=false` — there is nothing to edit.

3. **Go has no deploy workflow.** Its release is created in Step 3 and is never overwritten. All other targets have deploy workflows triggered by tag push.

4. **Bulk tag push does not trigger workflows.** Pushing all 8 tags in one `git push` command does NOT reliably fire individual GitHub push events. The tag re-push in Step 4 (delete + push per tag) is mandatory.

5. **Version bump PRs must be SQUASH merged.** Always use `gh pr merge --squash --delete-branch --admin`. Never use plain merge or rebase. `--admin` bypasses branch protection on master.

6. **Version bump PRs only exist if the deploy succeeded.** If a workflow fails (e.g., Python/PyPI), its corresponding version bump PR will not be created. Only merge the PRs that actually exist.

7. **Python (PyPI) deploy has a known failure.** As of March 2026, the PyPI organization account is inactive. The deploy fails with "Organization account owning this project is inactive." This is expected until someone contacts `support+orgs@pypi.org` to reactivate it.

8. **Workflow trigger mapping.** Each workflow is triggered by a specific tag pattern:
   - `proto/v*.*.*` → Push Protobuf to Buf Registry (`buf-registry-push.yml`)
   - `py/v*.*.*` → Deploy Python SDK to PyPI (`pypi-deploy.yml`)
   - `java/v*.*.*` → Deploy Java SDK to Maven Central (`maven-central-deploy.yml`)
   - `ts-node/v*.*.*` → Deploy TypeScript SDK Node (`ts-node-deploy.yml`)
   - `ts-web/v*.*.*` → Deploy TypeScript SDK Web (`ts-web-deploy.yml`)
   - `ts-old/v*.*.*` → Deploy TypeScript SDK Legacy (`ts-old-deploy.yml`)
   - `docs/v*.*.*` → Deploy Docs Site (`docs-site-deploy.yml`)
   - Go has NO workflow file.

9. **Version bump PR branch naming.** The exact branch names created by workflows:
   - `chore/pypi-version-update-$VERSION` (from `pypi-deploy.yml`)
   - `chore/maven-version-update-$VERSION` (from `maven-central-deploy.yml`)
   - `chore/npm-ts-node-version-update-$VERSION` (from `ts-node-deploy.yml`)
   - `chore/npm-ts-web-version-update-$VERSION` (from `ts-web-deploy.yml`)
   - `chore/npm-ts-old-version-update-$VERSION` (from `ts-old-deploy.yml`)
   - Proto, Go, and Docs workflows do NOT create version bump PRs.
