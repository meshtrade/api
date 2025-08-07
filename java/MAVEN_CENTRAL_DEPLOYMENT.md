# Maven Central Deployment Guide

This is a step-by-step guide for deploying the Meshtrade API Java SDK to Maven Central using the modern Central Publishing Portal (2024 approach).

## Prerequisites Setup

### Step 1: Create Central Portal Account
1. Go to [Central Portal](https://central.sonatype.com/)
2. Click "Sign Up" and create an account
3. Verify your email address
4. Your namespace `co.meshtrade.api` is already verified ✅

### Step 2: Generate User Token
1. Login to [Central Portal](https://central.sonatype.com/)
2. Click on your username (top right) → "View Account"
3. Click "Generate User Token"
4. **IMPORTANT**: Save both the username and password shown - you won't see them again!

### Step 3: Configure Maven Settings
1. Open or create `~/.m2/settings.xml`
2. Add your Central Portal credentials:

```xml
<settings>
  <servers>
    <server>
      <id>central</id>
      <username>YOUR_TOKEN_USERNAME</username>
      <password>YOUR_TOKEN_PASSWORD</password>
    </server>
  </servers>
</settings>
```

### Step 4: Setup GPG Signing
1. Check if you have a GPG key:
   ```bash
   gpg --list-secret-keys --keyid-format=long
   ```

2. If no key exists, generate one:
   ```bash
   gpg --gen-key
   # Choose: RSA and RSA, 4096 bits, no expiration
   # Enter your name and email
   ```

3. Get your key ID:
   ```bash
   gpg --list-secret-keys --keyid-format=long
   # Look for line like: sec   rsa4096/ABCD1234EFGH5678
   # Your key ID is: ABCD1234EFGH5678
   ```

4. Export your public key:
   ```bash
   gpg --armor --export YOUR_KEY_ID > public.gpg
   ```

5. Upload public key to Central Portal:
   - Go to [Central Portal](https://central.sonatype.com/)
   - Click username → "View Account" → "Public Keys"
   - Click "Add"
   - Paste contents of `public.gpg` file
   - Click "Save"

## Deployment Process

### Step 1: Pre-Deployment Checklist
1. Ensure all changes are committed:
   ```bash
   git status
   ```

2. Verify version in `pom.xml`:
   ```bash
   grep "<version>" pom.xml | head -1
   # Should show: <version>0.0.8</version>
   ```

3. Run tests to ensure everything works:
   ```bash
   mvn clean test
   ```

### Step 2: Deploy to Central Portal

#### Option A: Using the Deployment Script (Recommended)
```bash
./java/deploy-to-maven-central.sh 0.0.8
```

#### Option B: Manual Deployment
```bash
# Build and deploy with release profile
mvn clean deploy -P release
```

You'll see output like:
```
[INFO] central-publishing-maven-plugin:0.8.0:publish: Published - https://central.sonatype.com/publishing/deployments/[DEPLOYMENT_ID]
```

### Step 3: Publish Your Deployment
1. Go to [Central Portal Deployments](https://central.sonatype.com/publishing/deployments)
2. Find your deployment (status should be "VALIDATED")
3. Click on the deployment to review:
   - Check all components are present
   - Verify version is correct
   - Ensure all artifacts are signed
4. Click the "Publish" button
5. Confirm publication

### Step 4: Verify Publication
After clicking "Publish", your artifacts will be immediately available:

1. **Central Portal**: https://central.sonatype.com/artifact/co.meshtrade/api
2. **Maven Central**: https://repo1.maven.apache.org/maven2/co/meshtrade/api/

Note: It may take 10-30 minutes for the artifacts to be fully synchronized across all Maven Central mirrors.

## Troubleshooting

### GPG Signing Issues

**Problem**: "gpg: signing failed: Inappropriate ioctl for device"
```bash
export GPG_TTY=$(tty)
echo "export GPG_TTY=\$(tty)" >> ~/.bashrc
```

**Problem**: "gpg: signing failed: No secret key"
```bash
# List your keys
gpg --list-secret-keys
# Make sure Maven uses the right key
mvn clean deploy -P release -Dgpg.keyname=YOUR_KEY_ID
```

### Authentication Issues

**Problem**: "401 Unauthorized"
- Double-check your `~/.m2/settings.xml`
- Ensure server id is `central` (not `ossrh`)
- Regenerate token if needed

### Deployment Validation Failures

**Problem**: "Missing required metadata"
- Ensure all these are in your pom.xml:
  - `<name>`
  - `<description>`
  - `<url>`
  - `<licenses>`
  - `<developers>`
  - `<scm>`

**Problem**: "Missing signature files"
- Ensure GPG plugin is in release profile
- Check GPG is properly configured

## Post-Deployment Steps

1. **Update Version for Next Release**:
   ```bash
   # Update to next SNAPSHOT version
   mvn versions:set -DnewVersion=0.0.9-SNAPSHOT
   ```

2. **Create GitHub Release**:
   ```bash
   git tag v0.0.8
   git push origin v0.0.8
   ```

3. **Update Documentation**:
   - Update README with new version
   - Update any installation instructions

## Quick Reference

### Commands Summary
```bash
# Full deployment process
mvn clean deploy -P release

# Just build artifacts without deploying
mvn clean verify -P release

# Check what will be deployed
mvn clean package -P release
ls -la java/target/
```

### Required Files for Deployment
After running `mvn package -P release`, you should have:
- `api-0.0.8.jar` - Main artifact
- `api-0.0.8-sources.jar` - Source code
- `api-0.0.8-javadoc.jar` - Documentation
- `*.asc` files - GPG signatures for each

### Central Portal Links
- Account Management: https://central.sonatype.com/account
- Deployments: https://central.sonatype.com/publishing/deployments
- Published Artifacts: https://central.sonatype.com/artifact/co.meshtrade/api

## Security Best Practices

1. **Never commit credentials**:
   - Keep `~/.m2/settings.xml` out of version control
   - Use environment variables in CI/CD

2. **Protect GPG keys**:
   - Backup private key securely
   - Use strong passphrase
   - Consider key expiration for additional security

3. **Token Management**:
   - Rotate Central Portal tokens periodically
   - Use different tokens for different machines/CI systems
   - Revoke unused tokens immediately