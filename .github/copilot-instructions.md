## Quick orientation for AI coding agents

This repository, `ai-playground`, is a small multi-language playground for experimenting with AI code generation. The instructions below are focused, actionable, and specific to the files and patterns present in this workspace.

Keep changes small and verifiable. Prefer adding tests or simple run scripts when modifying code.

### Big picture
- Purpose: experiments and example code for different AI models and prompts (see the repository `README.md`).
- Layout: top-level language folders under the repo root (for example: `python/`, `javascript/`, `powershell/`, `html/`). Each folder contains small example projects or scripts. See `GEMINI.md` for examples of using the Gemini API.

### When you modify code
- Make minimal, focused edits. Run the example or small test in the same language folder to verify behavior.
- Document the prompt and expected AI output when changing generated examples (store prompt/analysis next to the sample in a brief markdown note).

### Project-specific patterns and examples
- Python: simple scripts live in `python/` (examples: `chessboard.py`, `chess_board.py`). Changes to these files should be runnable with the system Python; include a one-line usage comment at the top of the file if you add CLI args.
- JavaScript: small apps exist under `javascript/` (example: `warframe-bless-app/`). If you add Node/Express code, follow small-app patterns (single-file servers or minimal route modules) already present.
- PowerShell: tiny scripts like `powershell/hello-world.ps1` are present — avoid introducing heavy module dependencies.
- HTML: example sites/mini apps under `html/` (example: `gym/`). Keep changes self-contained.

### Build/test/debug workflows (how devs run things)
- Python: run scripts directly with `python path/to/script.py`. If you add dependencies, update a `requirements.txt` in that folder.
- JavaScript: inspect package.json inside the `javascript/*` folder before running `npm install` or `npm run` commands. Use local dev scripts where present.
- PowerShell: run `powershell -File .\powershell\hello-world.ps1` or open file in PowerShell ISE.

### Integration points & external dependencies
- This repo stores example code that may call external APIs (see `GEMINI.md` for Gemini/Google Generative API usage). Do not hardcode secrets — use environment variables (the GEMINI example expects `GOOGLE_API_KEY`).
- When adding an external dependency, document it in the folder readme and provide the minimal install command.

### Conventions to follow
- Keep experiments isolated: add a small folder under the appropriate language folder (e.g., `python/my-experiment/`) containing code, a README, and any prompts used.
- Prefer minimal reproducible examples: a single script or a small module + README describing how to run.
- If an experiment is interactive (chat, API calls), include an example .env file template and a short usage snippet.

### Files to consult when working in this repo
- Root `README.md` — repo purpose and high-level layout.
- `GEMINI.md` — API examples and environment setup for the Google generative API.
- `python/chessboard.py` and `python/chess_board.py` — simple Python examples showing script style used in the repo.
- `javascript/warframe-bless-app/` — example small web app structure.
- `powershell/hello-world.ps1` — minimal PowerShell example.
- `html/gym/` — small static site example.

### Examples of actionable tasks an agent can do
- Add a new experiment: create `python/my-experiment/` with one script, `README.md`, and prompt log.
- Fix a bug in `python/chessboard.py`: run it locally, add a short unit test or usage example in README.
- Add Gemini usage example: follow `GEMINI.md` style and keep API key loading via env var.

If anything in this file is unclear or you want additional examples (testing harnesses, CI hooks, or run scripts), tell me which language folder or sample you want improved and I will extend these instructions.
