# usePopcorn 🎬

A minimal React app to search movies via the **OMDb API**, view details, **rate with a custom StarRating component**, and keep a **watched list** with quick stats.

> Built with **Vite + React**, featuring proper effect cleanup, `AbortController` for in-flight request cancellation, keyboard shortcuts (Esc to close details), and a reusable `StarRating` component that supports a parent callback (`onSetRating`).

---

## Demo
- **Live:** https://usepopcorn-umek.vercel.app/
- **Repo:** https://github.com/debojit59/usepopcorn

---

## What I built (summary)

- A **two-pane movie browser**:
  - **Left**: search results from OMDb, click a movie to view details.
  - **Right**: either a details pane **or** your **watched list** with aggregate stats.
- A reusable **`<StarRating />`** input with hover preview and click-to-select, which reports the value back up via `onSetRating`.
- Robust **async UX**:
  - Won’t spam the API on short queries (`< 3` chars).
  - **Cancels** in-flight fetches when you type fast.
  - Shows **loader** and **error** states.
- **Keyboard support** and polish:
  - Press **Esc** to close the details view.
  - Sets the page title to `Movie | <Title>` while viewing and **restores** the old title on exit.
- A clean **watched list** with delete and **averages** (IMDb rating, user rating, runtime).

---

## Why this is interesting (what I practiced)

- **React Hooks:** `useState`, `useEffect` (with cleanups), parent-child communication via props.
- **State lifting & controlled inputs:** child `StarRating` pushes the chosen rating up, parent uses it to enable the “Add to list” button and store alongside IMDb data.
- **Async fetch patterns:** guarded queries, `AbortController`, and error handling to avoid race conditions and unhandled rejections.
- **Derived data:** averages calculated with a small helper (no double state).
- **Small a11y & UX considerations:** keyboard escape, clickable list items, and defensive checks for missing data.
- **Deployment flow:** GitHub → Vercel (Vite build), Node 18+ environment, case-sensitive import hygiene.

---

## Features

- 🔎 **Movie search** (OMDb) with “min 3 chars” guard and request **cancellation** on fast typing.
- 📄 **Details view**: runtime, IMDb rating, plot, cast, director.
- ⭐ **Custom StarRating**: hover preview, click to rate; supports parent callback (`onSetRating`).
- 🧾 **Watched list**: add/remove movies and see averages (IMDb, user rating, runtime).
- ⌨️ **Keyboard**: press **Esc** to close the details panel.
- 🧹 **Effect hygiene**: cleans up event listeners; restores `document.title` on unmount.

---

## Tech Stack

- **React** (Hooks)
- **Vite**
- **PropTypes** (lightweight runtime validation)
- **Vanilla CSS** (no UI framework)

> Works best on **Node.js 18+** (matches Vercel).

---

## Project structure


