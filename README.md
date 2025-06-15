# 👻 Ghost Kitchen

**Ghost Kitchen** is a haunted multiplayer fake restaurant where you can't eat anything — but you *can* leave your cursed mark in real-time.

Orders placed by one visitor are instantly visible to everyone else. It's spooky, stylish, and fully powered by a hand-written backend.

No frameworks. No copy-paste. Just handcrafted fullstack web dev with max vibes.

---

## 🧠 What This Actually Is

A **Tailwind + Vanilla JS frontend** paired with a custom **Node.js/Express backend**, built entirely from scratch. Visitors can:

- View an evolving order board updated in real time
- Leave their name and select a ghost-themed menu item
- Watch the interface come alive with haunted UI elements
- Know something’s *going on* behind the scenes — a vibe that’s only possible with a backend

---

## ✨ Core Features

- **Live Orders Feed**  
  Every order placed is visible to every user — with name, dish, and timestamp.

- **Spooky Custom API**  
  Built with Express + JSON file storage. No database, just vibes and hand-rolled endpoints.

- **Mobile-First Design**  
  The site is fully responsive and dark-mode native, so you can haunt it from anywhere.

- **No Frameworks Allowed**  
  Every line of code was written by hand. No React, no libraries, no generated boilerplate.

---

## 💾 Tech Stack

| Layer     | Stack                           |
|-----------|----------------------------------|
| Frontend  | HTML, Tailwind CSS (CDN), Vanilla JS |
| Backend   | Node.js + Express + file-based JSON storage |
| Hosting   | GitHub Pages (frontend), Replit or similar (backend) |

---

## 🧪 UX Philosophy

This project isn’t about fake functionality or simulated databases —  
it’s about making even non-coders *feel* the backend.

You see real timestamps. Real names. Real data flowing.

If you're not a dev, you'll still sense that something *more* is happening — and that's the point.

---

## 🚀 Deployment Plan

- Frontend → [GitHub Pages](https://pages.github.com/)  
- Backend → Replit / Glitch / Fly.io / custom VPS  
- API fully separated so backend can scale or evolve later

---

## 🪦 Future Enhancements (Maybe)

- “Ghost of the Day” recognition for most orders
- Cursed bot orders that appear at 3:00 AM
- Expiring orders that fade away like real ghosts
- Haunted sound effects or subtle UI jumpscares

---

## 🛠 Dev Notes

- Orders are stored in a flat JSON file (`orders.json`)  
- POST to `/order` with `{ name, item }` to add an order  
- GET `/orders` returns all orders, latest first  
- Everything lives in clean files with no build step

---