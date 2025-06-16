---
title: Docs
layout: home
---

# Source for the Docs Site of Mesh API
This is the root of the docs site for the Mesh API.

## Developer Guide
This guide is for developers contributing to the docs files under this directory.

### 1. Prerequisites (Mac OS with zsh)
A few prerequisites are required to develop the site locally.

#### 1.1 Ruby
While macOS comes preinstalled with Ruby, it is not recommended to use that version for active development.

First setup a separate newer version of Ruby using the chruby version manager:
```
# Install chruby and ruby-install with Homebrew:
brew install chruby ruby-install
ruby-install ruby 3.4.1

# configure your shell to automatically use chruby:
echo "source $(brew --prefix)/opt/chruby/share/chruby/chruby.sh" >> ~/.zshrc
echo "source $(brew --prefix)/opt/chruby/share/chruby/auto.sh" >> ~/.zshrc
echo "chruby ruby-3.4.1" >> ~/.zshrc

# Restart the terminal to ensure above has taken effect
# then test with:
which ruby

# should print out something like: /Users/yourUser/.rubies/ruby-3.4.1/bin/ruby
```

### 2. Install dependencies
Install dependencies for the static site using bundle:
```
# from repository root
bundle install
```
Tip: if you get asked for sudo or your password then you are using the system ruby and not the one installed in step 1.

### 3. Run local webserver
Run local webserver.
```
# from repository root
bundle exec jekyll serve
```