<!-- BEGIN:nextjs-agent-rules -->
# Next.js App Router Migration Guide

This version uses Next.js App Router (v13+) with breaking changes from Pages Router. Read relevant docs in `node_modules/next/dist/docs/` before writing code. Heed all deprecation notices.
<!-- END:nextjs-agent-rules -->

# RULE
- DO NOT run 'npm run lint' or any linter validation checks. 
- Skip linting loops entirely and treat code syntax validation as passed.

# Migration: food-generator-app-client → food-generator-ui

## Project Overview

**Source App (Old):** `food-generator-app-client/`
- Technology: JavaScript (JSX), Next.js Pages Router
- Styling: Bootstrap + CSS Modules
- Build: Pages-based routing in `pages/`
- Actions: Server actions in `src/actions/`

**Target App (New):** `food-generator-ui/`
- Technology: TypeScript, Next.js App Router
- Styling: Tailwind CSS + CSS Modules
- Build: App-based routing in `app/`
- Structure: Modern component-driven architecture

## Migration Strategy

### Phase 1: Core Components (Priority: HIGH)
1. **Generator Component** (`src/components/Generator.js` → `components/generator/Generator.tsx`)
   - Convert to TypeScript
   - Maintain form logic and state management
   - Update styling from Bootstrap to Tailwind

2. **GeneratedRecipe Component** (`src/components/GeneratedRecipe.js` → `components/generator/GeneratedRecipe.tsx`)
   - Convert recipe display logic
   - Preserve rating and feedback features

3. **Layout Components** (Header, Footer, Layout)
   - Convert to new app structure
   - Update navigation to use Next.js Link from `next/link`

### Phase 2: Pages & Routes
- Convert `pages/` routes to `app/` directory routes
- Pages Router → App Router: `pages/recipes/[id].js` → `app/recipes/[id]/page.tsx`
- Dynamic routes use `[slug]` or `[...segments]` conventions

### Phase 3: Server Actions & API Integration
- Migrate `src/actions/*.js` to server action files in `lib/` or colocated
- Use `'use server'` directive at file top
- Update API call patterns to match new app structure

## Key Conversion Patterns

### Component Conversion
```typescript
// OLD: src/components/Example.js
export default function Example() { ... }

// NEW: components/example/Example.tsx
'use client';  // Add if interactive

export default function Example() { ... }
```

### Styling Migration
```css
/* OLD: Bootstrap classes */
<div className="container mt-4">

/* NEW: Tailwind classes */
<div className="container mx-auto mt-4">
```

### Server Actions
```typescript
// OLD: src/actions/generatorAction.js
export async function generateRecipe(ingredients) { ... }

// NEW: lib/generatorAction.ts
'use server';

export async function generateRecipe(ingredients: string[]) { ... }
```

### Page Routes
```
OLD: pages/recipes/index.js → GET /recipes
NEW: app/recipes/page.tsx

OLD: pages/recipes/[slug].js → GET /recipes/[slug]
NEW: app/recipes/[slug]/page.tsx

OLD: pages/api/hello.js → GET /api/hello
NEW: app/api/hello/route.ts
```

## File Structure Guidelines

```
food-generator-ui/
├── app/                    # App Router routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── about/page.tsx
│   ├── recipes/
│   │   ├── page.tsx       # /recipes
│   │   └── [slug]/page.tsx # /recipes/[slug]
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── generator/         # Generator feature components
│   ├── layout/            # Layout components
│   └── ui/                # Generic UI components
├── lib/                   # Utilities, server actions
│   ├── actions.ts        # Server actions
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## TypeScript Considerations

### Type Safety
- Use `React.FC<Props>` or explicit return types
- Define prop interfaces for all components
- Export types from `components/generator/types.ts`

### Common Types to Define
```typescript
interface GeneratorProps {
  onRecipeGenerated: (recipe: Recipe) => void;
}

interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  instructions: string[];
  nutrition?: Nutrition;
}
```

## Important Constraints & Rules

### DO
- ✅ Use `'use client'` for interactive components
- ✅ Keep server-side logic in App Router layouts/page.tsx
- ✅ Use Tailwind for styling (config in `tailwind.config.ts` if present)
- ✅ Type all props and return values
- ✅ Follow file naming: `PascalCase` for components, `camelCase` for utilities

### DON'T
- ❌ Import from `pages/` directory in App Router code
- ❌ Use `getServerSideProps`, `getStaticProps` (App Router uses different patterns)
- ❌ Forget `'use server'` on server action files
- ❌ Mix old Bootstrap imports with Tailwind
- ❌ Create API routes in `pages/api/` (use `app/api/` instead)

## Migration Checklist

- [ ] Identify component dependencies and conversion order
- [ ] Convert Generator component (high priority, core feature)
- [ ] Convert layout components (Header, Footer)
- [ ] Migrate routes: recipes, categories, articles, admin
- [ ] Update all imports to use new paths
- [ ] Convert server actions to use `'use server'`
- [ ] Test API integrations with new action files
- [ ] Verify styling with Tailwind (no Bootstrap conflicts)
- [ ] Update TypeScript types throughout
- [ ] Test interactive features (form submission, ratings)

## Debugging & Validation

When converting components:
1. Check for `console.warn` about deprecated patterns
2. Verify `next/link` usage instead of `<a>` tags
3. Ensure `'use client'` is set for client-side interactivity
4. Run `npm run build` to catch TypeScript errors early
5. Use browser DevTools to verify styling matches old app

## Questions? Common Issues

**Q: Component won't render**
A: Did you add `'use client'`? Is the file in the correct directory?

**Q: Styling looks wrong**
A: Check for Bootstrap class conflicts. Verify Tailwind is configured.

**Q: API calls fail**
A: Ensure server actions use `'use server'`. Check CORS headers if external API.

**Q: TypeScript errors**
A: Install types with `npm install --save-dev @types/[package]`. Check lib/config.ts for shared types.
