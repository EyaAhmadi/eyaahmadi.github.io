# Eya Ahmadi — Portfolio

Personal portfolio website for Eya Ahmadi, AI Software Engineer.

## GitHub Copilot Setup

### Using Claude Opus in GitHub Copilot (VS Code)

**Why can't I find Claude Opus in GitHub Copilot in VS Code?**

Claude Opus is a premium model available in GitHub Copilot. If you cannot find it, here are the most common reasons and steps to resolve them:

#### 1. Subscription Requirement

Claude Opus is only available on the following GitHub Copilot plans:

| Plan | Claude Opus Available |
|------|-----------------------|
| Copilot Free | ❌ |
| Copilot Pro | ❌ |
| Copilot Pro+ | ✅ |
| Copilot Business | ✅ (admin must enable premium models) |
| Copilot Enterprise | ✅ (admin must enable premium models) |

To upgrade your plan, visit [github.com/features/copilot](https://github.com/features/copilot).

#### 2. How to Select Claude Opus in VS Code

Once you have a compatible subscription:

1. Open VS Code and make sure the **GitHub Copilot** extension is installed and up to date.
2. Open the **Copilot Chat** panel (click the chat icon in the Activity Bar or press `Ctrl+Shift+I` / `Cmd+Shift+I`).
3. Click the **model selector** dropdown (the model name shown at the top or bottom of the chat input).
4. Select **Claude Opus** from the list of available models.

#### 3. Workspace Default Model

This repository is pre-configured to use Claude Opus as the default Copilot Chat model via `.vscode/settings.json`. When you open this project in VS Code, Copilot Chat will automatically prefer Claude Opus if it is available on your account.

If you do not have access to Claude Opus, VS Code will fall back to the default model (typically GPT-4o).

#### 4. Enabling Premium Models (Business/Enterprise Admins)

If you are on a **Copilot Business** or **Copilot Enterprise** plan, a GitHub organization admin must enable access to premium models:

1. Go to your GitHub organization settings.
2. Navigate to **Copilot** → **Policies**.
3. Enable **"Allow use of models beyond the default"** or equivalent setting.
4. Members will then see Claude Opus in their model picker.

#### 5. Extension Version

Make sure you are running the latest version of the GitHub Copilot Chat extension in VS Code. Older versions may not include the model picker or support for Claude Opus.

- Open the Extensions panel (`Ctrl+Shift+X`).
- Search for **GitHub Copilot Chat**.
- Click **Update** if an update is available.
