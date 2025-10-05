# Comparative Analysis and Process Design using PM Standards

Frontend-only Next.js prototype (plain CSS) to explore, compare, and extract insights from three project management standards: PMBOK 7, PRINCE2, and ISO 21500.

## Folder Structure

```
project-root/
├─ public/
│  └─ pdfs/
│     ├─ PRINCE2.pdf
│     ├─ Project-Management-Institute-A-Guide-to-the-Project-Management-Body-of-Knowledge-PMBOK-R-Guide-PMBOK®️-Guide-Project-Management-Institute-2021.pdf
│     └─ ISO 21500-2021_ Project, programme and portfolio management - Context and concepts.pdf
├─ data/
│  ├─ comparisonData.json
│  ├─ similarities.json
│  ├─ differences.json
│  └─ uniquePoints.json
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ library/page.tsx
│  ├─ compare/page.tsx
│  ├─ insights/page.tsx
│  ├─ scenarios/page.tsx
│  └─ about/page.tsx
├─ components/
│  ├─ Navbar.tsx
│  ├─ Footer.tsx
│  ├─ PdfViewer.tsx
│  ├─ ComparisonTable.tsx
│  ├─ InsightsCard.tsx
│  ├─ SearchBar.tsx
│  └─ TopicSelector.tsx
├─ styles/globals.css
└─ postcss.config.js
```

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open the app at:

```bash
http://localhost:3000
```

- PDFs are served locally from `public/pdfs`. The Library page renders them using the browser's native PDF viewer via `<iframe>`.
- This is a frontend-only prototype. No backend or database.

## Notes

- The Compare page reads static JSON under `/data` to render side-by-side summaries per topic with quick links to open the relevant PDF in the Library view (with optional page number).
- The Insights page summarizes similarities, differences, and unique points (static JSON in `/data`).
- Educational purposes only; content is summarized and not exhaustive.
