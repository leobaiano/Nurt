# Contributing to Nurt 🌱

Thanks for your interest in contributing to **Nurt**!  
Contributions of any kind are welcome — code, documentation, ideas, or bug reports.

Repository:
https://github.com/leobaiano/nurt

---

## How to contribute

### 1. Fork the repository

Create your own fork of the project:
https://help.github.com/articles/fork-a-repo/

### 2. Configure your fork locally

Set up the upstream repository:
https://help.github.com/articles/configuring-a-remote-for-a-fork/

### 3. Choose an issue

Check the list of open issues and pick one that is not currently assigned:
https://github.com/leobaiano/nurt/issues

If what you want to work on is not listed, please **open a new issue first** to avoid duplicated efforts.

### 4. Create a branch

Create a branch based on the issue you are working on:

```bash
git checkout -b issue-17
```

### 5. Make your changes

Please follow the project conventions:

- Feature-based organization (Vertical Slice Architecture)
- Clear separation between domain and infrastructure
- No direct dependency between features and external services
- Small, focused commits

### 6. Commit your changes

This project **requires the use of Conventional Commits** to keep commit history clear, consistent, and easy to automate.

Please follow the Conventional Commits specification:
https://www.conventionalcommits.org/en/v1.0.0/

#### Commit message format

```text
<type>(optional scope): <description>
```

#### Common types used in this project

- `feat`: A new feature
- `fix`: A bug fix
- `refactor`: Code refactoring without behavior change
- `test`: Adding or updating tests
- `docs`: Documentation changes only
- `chore`: Maintenance tasks (configs, scripts, tooling)

#### Examples

```bash
git commit -m "feat: add search by custom fields"
```

```bash
git commit -m "fix: validate wildcard index correctly"
```

```bash
git commit -m "test: add unit tests for empty result scenario"
```

Commits that do not follow this convention may be requested to be updated during code review.

```

### 7. Push to your fork

```bash
git push origin issue-17
```

### 8. Open a Pull Request

Create a Pull Request from your branch to `main`:
https://help.github.com/articles/creating-a-pull-request/

---

## Important notes

- Keep Pull Requests small and focused.
- If applicable, add or update unit tests.
- Describe clearly **what** and **why** you changed something.
- Feel free to ask questions in the issue or Pull Request discussion.

---

Thanks for helping Nurt grow 🌱  
Your contribution makes this project better for everyone.
