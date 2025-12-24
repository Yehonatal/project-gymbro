# Features — GymBro Weekly Tracker

## Priority: MVP

1. **Overall Progress Tracking (First Feature)** 🔁
   - Save weekly entries (one block per week).
   - Show list of weekly entries and quick status (Strength ↑/↔️/↓, Waist ↓/↔️/↑, Weight ↓/↔️/↑).
   - Highlight progress rules: Strength + Waist trends => progress, Strength down + fast weight drop => muscle risk.
   - Compute and store optional e1RM for Leg Press, Bench, Deadlift.
   - Allow editing and deleting past entries.

2. **Weekly Entry Form (Reusable Components)** 🧩
   - Reusable fields: MeasurementField, LiftField, CheckboxGroup, Notes, DecisionCheckboxes, e1RMField.
   - Client-side validation and consistent styling.

3. **Data & Storage** 🗄️
   - Simple file-based JSON store for MVP (db/weeklyEntries.json).
   - Abstracted storage API for easy migration to a DB (Supabase/SQLite/Postgres).

4. **Trends & Insights** 📈
   - Compute week-to-week changes and 2–3 week trends.
   - Visuals: sparkline or small chart per lift and bodyweight (future).

5. **Import / Export** ⤴️⤵️
   - CSV export of weekly entries (future).

6. **Authentication & Privacy** 🔒
   - Local-first: no public sharing by default. Optional auth later.

7. **Reminders & Automation** ⏰
   - Weekly reminder (optional future feature) to fill in the template.

---

## Implementation Notes
The MVP scope focuses on items 1–3. After MVP: add charts, import/export, reminders, and optional user auth.
