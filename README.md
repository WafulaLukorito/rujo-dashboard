# 🎵 Rujo Music Group Dashboard

A high-fidelity, premium prototype of a modern music publishing administration and catalog tracking system. This platform is tailored specifically for the **East African music industry**, featuring localized metrics, currencies, payment integration methods, and regional artist profiles.

---

## 🚀 Concept & Localization

**Rujo Music Group Dashboard** serves as the central administrative hub for music publishers managing catalog metadata, split sheets, royalty collections, and payout distributions in East Africa.

### Key Localizations
* **Currency**: Localized in Kenyan Shillings (**KSh**).
* **Payout Integration**: Configured for regional payment methods including **M-Pesa Mobile Money** and local bank transfers.
* **Artists**: Programmed with fictional regional artists modeled after the East African music scene (e.g., Bantu Collective, Nyota Groove, Dhahabu Vibes, Neema Zuhura, and Kipepeo Project).

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
* **Library**: [React 19](https://react.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Language**: TypeScript

---

## 💎 Features & Pages

### 1. Mock Authentication (`/`)
* A sleek, responsive login view featuring email/password fields alongside mock SSO integration buttons (**Google**, **Spotify**, and **Facebook**).
* Any interaction on this page instantly logs the administrator into the system and routes to the main dashboard.
* Uses a custom `SidebarWrapper` to conditionally hide navigation bars during the authentication phase.

### 2. Main Overview (`/dashboard`)
* A dark-themed workspace presenting key publishing performance indicators.
* **Interactive Artist Selector**: Swaps context between different artists to simulate multi-tenant dashboard administration.
* **Key Metrics**: Dynamic revenue calculations, active catalog tracking, and breakdown of major streaming sources (specifically highlighting **Spotify** and **YouTube** revenue streams).
* **Dynamic Loading**: On refresh, fetches random combinations of simulated earnings and statistics across 5 different artist profiles.

### 3. Activity Feed / "Central Nervous System" (`/activity`)
* Tracks the complete lifecycle of a song and the money it generates in real-time.
* **Financial Triggers**: Logs royalty drops (mechanical, performance) with source details, alerts when recoupment milestones are reached, and flags streaming velocity anomalies (viral spikes).
* **Catalog & Metadata Events**: Digital split-sheet sign-offs, global PRO registration statuses (e.g., MCSK, KAMP, PRISK, ASCAP), and metadata overlapping ownership warnings.
* **Actionable Prompts**: Admin-specific actions like "Review & Sign" and "Resolve Conflict".
* **Categorized Filters**: Timeline filterable by All, Financial, Catalog, and Sync.

### 4. Settings (`/settings`)
* Configured tabs for **Profile Details**, **Payout Methods** (featuring M-Pesa setup with phone validation), **Connected Services** (Spotify, YouTube, Soundcloud), and **Security Settings**.

---

## 📂 Project Structure

```bash
rujo-dashboard/
├── scripts/
│   └── generate_db.js      # Populates and seeds the mock data
├── src/
│   ├── app/
│   │   ├── activity/       # Central Nervous System Activity Feed page
│   │   ├── api/            # API endpoints simulating database fetching
│   │   ├── dashboard/      # Main overview dashboard page
│   │   ├── settings/       # Settings page (Profile, Payout, Connections)
│   │   ├── layout.tsx      # Main layout incorporating the theme & sidebar wrapper
│   │   └── page.tsx        # Mock login screen (root entry point)
│   ├── components/         # Reusable UI components (Sidebar, Card widgets)
│   └── data/
│       └── mockDb.json     # Local JSON file serving as the mock DB
```

---

## 💻 Running Locally

### 1. Install Dependencies
Run the following command to install the required packages:
```bash
npm install
```

### 2. Run the Development Server
Launch the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the application.

### 3. Build for Production
To build and optimize the application for production deployment:
```bash
npm run build
```
And start the production server:
```bash
npm run start
```
