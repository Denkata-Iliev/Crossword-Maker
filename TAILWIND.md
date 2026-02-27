# Tailwind CSS Basics

This project uses **Tailwind v4** with the `@tailwindcss/vite` plugin.

---

## How it works

Instead of writing CSS, you apply utility classes directly on elements:

```tsx
// Old way
<div className="toolbar">…</div>

// Tailwind way
<div className="flex items-center p-4 bg-slate-800 text-white rounded-lg">…</div>
```

---

## Common utilities

| Category    | Examples                                              |
|-------------|-------------------------------------------------------|
| Layout      | `flex`, `grid`, `block`, `hidden`                    |
| Flexbox     | `items-center`, `justify-between`, `flex-col`        |
| Spacing     | `p-4`, `px-2`, `py-6`, `m-auto`, `mt-4`, `gap-2`    |
| Sizing      | `w-full`, `h-screen`, `w-12`, `min-h-0`              |
| Colors      | `bg-slate-800`, `text-white`, `border-blue-400`      |
| Typography  | `text-sm`, `text-xl`, `font-medium`, `font-bold`     |
| Borders     | `border`, `border-2`, `rounded`, `rounded-lg`        |
| Shadows     | `shadow-sm`, `shadow-md`, `shadow-lg`                |
| Position    | `relative`, `absolute`, `fixed`, `top-0`, `right-0` |
| Transitions | `transition-colors`, `duration-200`, `ease-in-out`   |

---

## Variants (conditional styles)

Prefix any utility with a variant to apply it conditionally:

```tsx
// On hover
<div className="bg-slate-700 hover:bg-slate-600">…</div>

// Dark mode (requires .dark class on a parent — see index.css)
<div className="text-slate-800 dark:text-slate-200">…</div>

// Responsive breakpoints (sm: md: lg: xl:)
<div className="text-sm md:text-base lg:text-lg">…</div>

// Focus state
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500">…</div>
```

---

## Opacity modifier

Append `/opacity` to color utilities:

```tsx
<div className="bg-white/10">   // 10% white background
<div className="text-black/50"> // 50% opacity text
<div className="border-blue-400/30"> // 30% opacity border
```

---

## Custom values (escape hatch)

When you need a value not in Tailwind's scale, use square brackets:

```tsx
<div className="w-[73px] top-[117px] bg-[#1a2b3c]">…</div>
```

---

## Dark mode toggle (for later)

This project's dark mode is class-based. Toggle it with:

```ts
document.documentElement.classList.toggle('dark')
```

---

## Where styles are configured

| File | Purpose |
|------|---------|
| `src/index.css` | Tailwind import, `@theme` custom values, `@layer base/components` |
| `vite.config.ts` | `@tailwindcss/vite` plugin registration |
