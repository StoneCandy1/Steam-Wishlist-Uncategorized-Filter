# Steam Wishlist Uncategorized Filter

A tiny Tampermonkey userscript that adds one missing feature to the new Steam Wishlist categories:

> **Show only uncategorized games.**

Steam now lets you organize your Wishlist into custom categories, but there's no built-in way to view the games that haven't been categorized yet.

This script fills that small gap.

---

## Features

* 📂 Adds a **"Uncategorized"** button next to Steam's category filters.
* 🔍 Shows only Wishlist items that have **no custom category**.
* ⚡ Supports Steam's virtualized Wishlist (only filters currently loaded items).
* 🪶 Lightweight, no API calls, no network interception.
* 🧩 Doesn't modify Steam's data—only changes what you see.

---

## Installation

1. Install a userscript manager such as **Tampermonkey**.
2. Create a new userscript.
3. Copy the script into it and save.
4. Open your Steam Wishlist.

The script should automatically add an **"Uncategorized"** button to the category bar.

---

## How It Works

The Steam Wishlist page already stores category information in the DOM.

For categorized games:

```text
My Categories:
[Strategy]
```

For uncategorized games:

```text
My Categories:
```

The script simply checks whether a Wishlist item has any category buttons.

No Steam APIs are used.

---

## Known Limitations

Steam uses a **virtualized list**, meaning only a small number of Wishlist items exist in the DOM at any given time.

Because of that, this script intentionally only filters **currently loaded items**.

Recommended workflow:

1. Browse normally.
2. Click **Uncategorized** to review the currently loaded games.
3. Disable the filter.
4. Scroll further.
5. Enable it again.

This design keeps the script simple, reliable, and resilient to Steam updates.

---

## Compatibility

Tested on the current Steam Store Wishlist (July 2026).

The script avoids relying on Steam's randomly generated CSS class names whenever possible, making it relatively resistant to UI updates.

---

## Why?

Because I somehow managed to accumulate **2000+ games** in my Wishlist.

Organizing them is hard.

Finding the ones I *haven't* organized yet shouldn't be.
