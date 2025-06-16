# Source for the Docs Site of Mesh API
This is the root of the docs site for the Mesh API.

## Developer Guide
This guide is for developers contributing to the docs files under this directory.

### 1. Prerequisites (Mac OS with zsh)
A few prerequisites are required to develop the site locally.

#### 1.1 Jekyl (Ruby Tool)
While macOS comes preinstalled with Ruby, it is notrecommended to use that version to install Jekyll.

First setup a separate newer version of Ruby using the chruby version manager and then install jekyl.
```
# Install chruby and ruby-install with Homebrew:
brew install chruby ruby-install
ruby-install ruby 3.4.1

# configure your shell to automatically use chruby:
echo "source $(brew --prefix)/opt/chruby/share/chruby/chruby.sh" >> ~/.zshrc
echo "source $(brew --prefix)/opt/chruby/share/chruby/auto.sh" >> ~/.zshrc
echo "chruby ruby-3.4.1" >> ~/.zshrc

# Apply the changes to the CURRENT terminal session
source ~/.zshrc

# install jekyl
gem install jekyll
```

### 2. Install dependencies
Install dependencies for the static site using bundle:
```
cd docs
bundle install
```

### 3. Run local webserver
Run local webserver.
```
bundle exec jekyll serve
```