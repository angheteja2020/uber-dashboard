# App Color Scheme Reference

This document captures the Tailwind-based palette currently used in `src/App.tsx` so future redesigns can stay aligned with the existing look & feel.

| Token / Class | Hex (approx.) | Usage notes |
| --- | --- | --- |
| `bg-slate-950` | `#020817` | Page background wrapper; creates the deep navy canvas. |
| `text-slate-100` | `#f1f5f9` | Default body text on the dark background. |
| `bg-slate-900/60` – `bg-slate-900/70` | `#0f172a` @ 60–70% opacity | Card backgrounds behind logos, counter, and chart. |
| `border-slate-800/80` | `#1e293b` @ 80% opacity | Subtle card border framing on dark surfaces. |
| `text-slate-200` | `#e2e8f0` | Card headings (`Interactive counter`, `Weekly activity`). |
| `text-slate-400` | `#94a3b8` | Secondary descriptions, supporting text. |
| `text-slate-500` | `#64748b` | Uppercase label and footer caption. |
| `shadow-indigo-500/20` | `#6366f1` @ 20% opacity | Accent shadow under the Vite logo tile. |
| `shadow-sky-500/20` | `#0ea5e9` @ 20% opacity | Accent shadow under the React logo tile. |
| `bg-emerald-500` | `#34d399` | Counter button background, brings vibrant contrast. |
| `text-emerald-950` | `#022c22` | Button label color for legibility on emerald background. |
| `hover:bg-emerald-400` | `#34d399` lighten | Button hover state for interactive feedback. |
| `focus:ring-emerald-500/40` | `#10b981` @ 40% opacity | Button focus halo for accessibility. |
| `bg-emerald-500/10` + `text-emerald-400` | `#34d399` @10% / `#34d399` | Badge showing the live counter total in the chart card. |
| `stroke="#34d399"` | `#34d399` | Line color in the Recharts `LineChart`. |
| `CartesianGrid stroke="#1f2937"` | `#1f2937` | Gridlines that blend with the dark theme. |
| `Tooltip backgroundColor="#0f172a"` | `#0f172a` | Tooltip backdrop matching card surfaces. |
| `Tooltip borderColor="#1e293b"` | `#1e293b` | Tooltip border harmonizing with card borders. |
| `Tooltip color="#e2e8f0"` | `#e2e8f0` | Tooltip text color for readability. |

## Design Notes
- The palette is centered on the Slate family for backgrounds and typography, producing a low-contrast, dark UI.
- Emerald accents are used for interactive elements and data highlights; Indigo/Sky add subtle brand cues for the logos.
- Maintain opacity-based variants (`/60`, `/70`, `/80`, `/20`, `/10`) to keep depth and layering consistent.

Update this file whenever new primary/secondary colors are introduced so the scheme stays documented.
