# To-Do List

A lightweight to-do list web app built with **vanilla HTML, CSS and JavaScript** — no framework, no build step, no dependencies. Tasks are saved in the browser, so they are still there when you reload the page.

![To-Do List app screenshot](docs/screenshot.png)

## Features

- **Add tasks** with the *Add* button or the <kbd>Enter</kbd> key
- **Input validation**: empty tasks are rejected with an error message
- **Mark tasks as done** by ticking the checkbox or clicking the task text
- **Delete tasks** individually
- **Filter** the list: *All*, *Active* or *Completed*
- **Persistence** with `localStorage`: tasks survive page reloads
- **Responsive** layout that adapts to small screens
- **Accessible**: ARIA labels on controls and an `aria-live` region for error messages

## Tech stack

| Layer | Technology |
| --- | --- |
| Structure | HTML5 (semantic tags: `main`, `header`, `ul`) |
| Styling | CSS3 (custom properties, Flexbox, keyframe animation, media queries) |
| Logic | Vanilla JavaScript (ES6+) |
| Storage | Web Storage API (`localStorage`) |

## Getting started

No installation needed.

```bash
git clone https://github.com/BYoYo03/todolist.git
cd todolist
```

Then open `index.html` in your browser — that's it.

## Project structure

```
todolist/
├── index.html   # Page structure: input, filters, task list
├── style.css    # Styling, theme variables, animations, responsive rules
└── script.js    # App state, event handling, rendering, persistence
```

## How it works

The app follows a simple **state → render** pattern:

1. All tasks live in a single `tasks` array of objects: `{ id, text, completed }`.
2. Every action (add, toggle, delete) updates that array, then calls `saveAndRender()`.
3. `saveAndRender()` writes the array to `localStorage` and rebuilds the list from scratch, applying the current filter.

Because the UI is always rebuilt from the state, the display can never drift out of sync with the data. Task text is inserted with `textContent` rather than `innerHTML`, which prevents HTML injection from user input.

## Possible improvements

- Edit an existing task (e.g. double-click to rename)
- "Clear completed" button and a counter of remaining tasks
- Drag-and-drop to reorder tasks
- Due dates and priorities
- Dark mode, using the existing CSS variables

## Author

**Bahir Boudouma Lambarki** — [LinkedIn](https://www.linkedin.com/in/bahir-boudouma-lambarki)
