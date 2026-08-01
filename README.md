# Monastery360

**SIH25061 · Digitize and Showcase Monasteries of Sikkim for Tourism and Cultural Preservation**
Government of Sikkim · Software · Travel & Tourism

A zero-cost, static web platform: virtual tours, a digital heritage archive, an interactive geo-map with honest permit flags, a transparent hash-chained preservation ledger, digital fingerprinting for artifact provenance, and more. No backend server, no paid APIs.

## File structure

```
monastery360-project/
├── index.html          # all page markup — every section has a stable id
├── style.css            # full design system (tokens, layout, components)
├── script.js             # all interactivity: data, map, chatbot, ledger, fingerprinting
├── manifest.json         # PWA manifest (installable, offline-ready)
├── service-worker.js      # caches the app shell for offline use
├── assets/               # put icon-192.png / icon-512.png here for the PWA manifest
└── README.md
```

## Run it locally

Service workers require a real server (not `file://`), so use one of:

```bash
# Python 3
python3 -m http.server 8000

# or VS Code: right-click index.html → "Open with Live Server"
```

Then open `http://localhost:8000`.

## Deploy (matches the Team Role Guide, Samrat's steps)

1. Push this folder to a GitHub repo named `monastery360`.
2. Log into [vercel.com](https://vercel.com) with GitHub, **Add New Project**, import the repo.
3. Framework preset: **Other** (plain static site) — no build command needed.
4. Deploy. Live URL appears in ~30–60 seconds.

## What's real vs. placeholder (read this before the demo)

Being upfront about this is a strength in the pitch, not a weakness — see the roadmap badge on the live site.

| Feature | Status |
|---|---|
| Monastery archive, search, map, calendar | **Real data** — sourced from Wikipedia / Sikkim Tourism history for 5 monasteries |
| 360° viewer | **Real Pannellum engine**, placeholder demo panoramas (not actual monastery interiors) |
| 3D model | **Real Sketchfab embed**, illustrative reference model, not a photogrammetry scan of an actual site |
| Adopt-a-Artifact ledger | **Fully functional** — real SHA-256 hash chain via Web Crypto, verifiable |
| Digital fingerprinting | **Fully functional** — real SHA-256 hash of uploaded image bytes, computed client-side |
| Decay reporting | **Fully functional**, stored to `localStorage` |
| Chatbot | **Fully functional** keyword matcher, honestly labeled as not a live AI model |
| Sound archive | **2 real licensed audio clips** (Wikimedia Commons), rest marked pending |
| Homestay directory | **Sample/illustrative listings**, clearly tagged, pending real partnerships |
| Offline/PWA | Service worker caches the **app shell** (HTML/CSS/JS) for offline load; images/map tiles are network-only |
| Labrang & Ralang | **No photos shown on purpose** — marked "Pending On-Ground Digitization" |

## Team ownership (unchanged from the original Team Role Guide)

| Section in `index.html` | Owner |
|---|---|
| Nav, hero, roadmap badge, `manifest.json` + `service-worker.js` | Samrat |
| `#tour` (360° + 3D) | Shivman |
| `#archive` (monastery cards) | Shivman |
| `#calendar`, `#economy`, sound archive | Palak |
| Search filter, crowd alert logic (in `script.js`) | Yatharth |
| `#preserve` (adopt ledger, decay form, fingerprinting) | Shreyansh |
| `#chatbot` | Shreyansh |
| Content accuracy, cross-device testing | Anshuman |

Each function in `script.js` is self-contained (`renderCards`, `renderLedger`, `renderDecay`, `renderFP`, chatbot handlers, map init) so branches should merge with minimal conflicts — same workflow as your original plan: `git checkout -b <name>-<feature>`, open a PR, merge into `main`.

## Before the live demo

- Add real `icon-192.png` and `icon-512.png` to `assets/` (referenced by `manifest.json`) — any square PNG works for the demo.
- Swap the two Pannellum placeholder panoramas for real on-site captures if you get access before the deadline.
- Re-test the chatbot, both forms, and the fingerprinting tool on the **live** Vercel URL — `localStorage` will be fresh there, not carried over from local testing.
