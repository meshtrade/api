# Maven Central Deployment Guide

This guide explains how to publish the Meshtrade API Java SDK to Maven Central using the Central Publishing Portal API and the `central-publishing-maven-plugin`.

## Prerequisites

### 1. Sonatype Account & User Token
1. Create an account at https://central.sonatype.com/ if you don't have one
2. Generate a user token (preferred for CI/CD):
   - Log into https://central.sonatype.com/
   - Go to your [Account page](https://central.sonatype.com/account)
   - Click "Generate User Token"
   - Save the generated **username** and **password** securely
   - **Important**: The token generates a username/password pair, not a single token string

### 2. GPG Key Setup
You need a GPG key to sign your artifacts:

```bash
# Generate a new GPG key (if you don't have one)
gpg --gen-key

# List your keys to get the key ID
gpg --list-secret-keys --keyid-format LONG

# Export your public key
gpg --armor --export your-email@example.com > public-key.asc

# Upload your public key to a key server
gpg --keyserver keyserver.ubuntu.com --send-keys YOUR_KEY_ID
# Alternative servers: keys.openpgp.org, pgp.mit.edu
```

### 3. Configure Maven Settings

Update the `maven-settings.xml` file with your user token credentials:

```xml
<server>
  <id>central</id>
  <username>YOUR_GENERATED_TOKEN_USERNAME</username>
  <password>YOUR_GENERATED_TOKEN_PASSWORD</password>
</server>
```

And optionally add your GPG passphrase:
```xml
<gpg.passphrase>YOUR_GPG_PASSPHRASE</gpg.passphrase>
```

## Deployment Steps

### 1. Generate Java Code
Ensure all protobuf code is generated:
```bash
./dev/tool.sh generate --targets=java
```

### 2. Run Tests
Verify all tests pass:
```bash
./dev/test/java.sh
```

### 3. Deploy to Maven Central Portal

Deploy using the release profile with your custom settings:
```bash
cd /Users/bernardbussy/Projects/github.com/mesh-extend-api/projects/api
mvn clean deploy -Prelease --settings maven-settings.xml
```

Or if you prefer to provide the GPG passphrase at runtime:
```bash
mvn clean deploy -Prelease --settings maven-settings.xml -Dgpg.passphrase="YOUR_PASSPHRASE"
```

### 4. Publish via Central Portal

The `central-publishing-maven-plugin` is configured with `autoPublish=false`, which means your artifacts will be uploaded but not automatically published. You have two options:

**Option A: Manual Publishing (default)**
1. Log into https://central.sonatype.com/
2. Navigate to "Publishing" → "Deployments"
3. Find your deployment (it will be in "VALIDATED" state)
4. Review the deployment details
5. Click "Publish" to release to Maven Central

**Option B: Automatic Publishing (for CI/CD)**
Update the plugin configuration in `pom.xml` for automated publishing:
```xml
<plugin>
  <groupId>org.sonatype.central</groupId>
  <artifactId>central-publishing-maven-plugin</artifactId>
  <version>0.8.0</version>
  <extensions>true</extensions>
  <configuration>
    <publishingServerId>central</publishingServerId>
    <autoPublish>true</autoPublish>
    <waitUntil>published</waitUntil>
  </configuration>
</plugin>
```

With `autoPublish=true`, the artifacts will automatically be published after successful validation.

## Verify Publication

After publishing, your artifacts will be available at:
- **Maven Central**: https://repo1.maven.org/maven2/co/meshtrade/api/
- **Search**: https://search.maven.org/artifact/co.meshtrade/api

Note: It may take 10-30 minutes for artifacts to appear in search results.

## Using the Published SDK

Once published, users can add the dependency to their projects:

### Maven
```xml
<dependency>
    <groupId>co.meshtrade</groupId>
    <artifactId>api</artifactId>
    <version>0.0.8</version>
</dependency>
```

### Gradle
```gradle
implementation 'co.meshtrade:api:0.0.8'
```

## Version Management

To release a new version:
1. Update version in parent pom.xml: `<version>0.0.9</version>`
2. Update version in java/pom.xml parent reference
3. Update version in tool/protoc-gen-meshjava/pom.xml parent reference
4. Commit changes: `git commit -m "Bump version to 0.0.9"`
5. Tag the release: `git tag v0.0.9`
6. Push: `git push && git push --tags`
7. Follow deployment steps above

## Troubleshooting

### GPG Signing Issues
- Ensure GPG agent is running: `gpg-agent --daemon`
- Test signing: `echo "test" | gpg --clearsign`
- For macOS: `brew install gnupg pinentry-mac`
- Set GPG TTY: `export GPG_TTY=$(tty)`

### Authentication Failures
- Verify token is correctly set in maven-settings.xml
- Token format should be: username is a generated token name, password is the token value
- Test authentication at https://central.sonatype.com/

### Validation Errors
- Ensure all required metadata is present (already configured in pom.xml)
- Javadoc and sources JARs must be included (handled by release profile)
- All artifacts must be signed (handled by GPG plugin in release profile)

## CI/CD Integration

### Environment Variables and Secrets

For GitHub Actions or other CI systems, set these secrets:
- `MAVEN_CENTRAL_USERNAME`: Your generated token username
- `MAVEN_CENTRAL_PASSWORD`: Your generated token password  
- `GPG_PRIVATE_KEY`: Base64 encoded GPG private key
- `GPG_PASSPHRASE`: Your GPG passphrase

### GitHub Actions Example

```yaml
name: Deploy to Maven Central

on:
  push:
    tags: ['v*']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up JDK 21
      uses: actions/setup-java@v4
      with:
        java-version: '21'
        distribution: 'temurin'
    
    - name: Import GPG key
      env:
        GPG_PRIVATE_KEY: ${{ secrets.GPG_PRIVATE_KEY }}
        GPG_PASSPHRASE: ${{ secrets.GPG_PASSPHRASE }}
      run: |
        echo "$GPG_PRIVATE_KEY" | base64 -d | gpg --batch --import
        gpg --list-secret-keys --keyid-format LONG
    
    - name: Generate Java code
      run: ./dev/tool.sh generate --targets=java
    
    - name: Create Maven settings
      run: |
        mkdir -p ~/.m2
        cat > ~/.m2/settings.xml << EOF
        <settings>
          <servers>
            <server>
              <id>central</id>
              <username>${{ secrets.MAVEN_CENTRAL_USERNAME }}</username>
              <password>${{ secrets.MAVEN_CENTRAL_PASSWORD }}</password>
            </server>
          </servers>
        </settings>
        EOF
    
    - name: Deploy to Maven Central
      env:
        GPG_PASSPHRASE: ${{ secrets.GPG_PASSPHRASE }}
      run: |
        mvn clean deploy -Prelease \
          -Dgpg.passphrase="$GPG_PASSPHRASE" \
          -Dautomatic.publishing=true
```


## Additional Resources
- [Central Publishing Documentation](https://central.sonatype.org/publish/publish-portal-maven/)
- [Central Portal API](https://central.sonatype.org/publish/publish-portal-api/)
- [Requirements](https://central.sonatype.org/publish/requirements/)