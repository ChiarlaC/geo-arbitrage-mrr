# Subpricing.com Streamlit → Next.js 14 Migration Roadmap

## Executive Summary
**Project:** subpricing.com migration from Python Streamlit to Next.js 14 App Router  
**Architecture:** React Server Components, Tailwind CSS, shadcn/ui, Recharts  
**Visual Aesthetic:** Strict Minimalism (Black/White/Grey palette, Courier New typography)  
**Timeline:** 8 phases over approximately 8 days  

---

## Phase 0: Data Pipeline (DeepSeek Handoff) - **Day 0**

### Task 0.1: CSV to JSON Preprocessing Script
- **Type:** Logic Handoff
- **Claude's Action:** Define data structure and processing requirements
- **DeepSeek Handoff:**
  - `Input:` `data.csv` (27 rows), `ai_api_data.csv` (20 rows)
  - `Output Interface:` 
    ```typescript
    interface PricingData {
      service: string;
      country: string;
      plan: string;
      local_price: string;
      usd_price: number;
      savings_vs_us: number;
    }
    interface AiModelData {
      model_id: string;
      model_name: string;
      category: string;
      input_cost: number;
      output_cost: number;
      context_length: string;
      modality: string;
    }
    ```
  - `Instruction for DeepSeek:` Write Node.js script using `csv-parser` to:
    1. Calculate USD prices using exchange rates
    2. Compute savings percentages vs US baseline
    3. Generate deterministic related links using seedrandom
    4. Output `public/data.json` and `public/ai-data.json`

### Task 0.2: Data Validation Script
- **Type:** Logic Handoff
- **Claude's Action:** Define validation rules
- **DeepSeek Handoff:**
  - `Input:` Generated JSON files
  - `Output Interface:` Validation report object
  - `Instruction for DeepSeek:` Create validation script checking:
    1. All 49 pSEO combinations present (6 services × 7 countries + US)
    2. No duplicate service-country pairs
    3. Savings percentages within valid range (0-95%)
    4. USD prices correctly formatted

---

## Phase 1: Project Initialization & Config - **Day 1** ✅ COMPLETED

### Task 1.1: Next.js 14 Project Setup ✅
- **Type:** Config
- **Claude's Action:** 
  - Initialize Next.js 14 App Router project with TypeScript
  - Configure Tailwind CSS with monochrome color palette
  - Set up shadcn/ui component framework
  - Install core dependencies: React Table, Radix UI, Recharts

### Task 1.2: Visual System Configuration ✅
- **Type:** Config
- **Claude's Action:**
  - Tailwind config with Courier New font family
  - Black/White/Grey color system (no high-saturation colors)
  - Global CSS with minimal typography defaults
  - Container and spacing system matching Streamlit proportions

### Task 1.3: SEO & URL Parity Configuration ✅
- **Type:** Config
- **Claude's Action:**
  - `next.config.js` 301 redirects for all legacy URLs
  - Metadata API configuration for dynamic SEO
  - Canonical URL patterns preserving Streamlit structure

---

## Phase 2: Data Loading Infrastructure - **Day 1** ✅ COMPLETED

### Task 2.1: TypeScript Interface Definitions ✅
- **Type:** Config
- **Claude's Action:**
  - Define `PricingData`, `AiModelData`, `ServiceCountryParams` interfaces
  - Create comprehensive type system for data flow
  - Generate Zod schemas for runtime validation

### Task 2.2: Data Loading Layer ✅
- **Type:** Logic Handoff
- **Claude's Action:** Architecture design
- **DeepSeek Handoff:**
  - `Input:` JSON data files, service/country parameters
  - `Output Interface:` `loadPricingData()`, `loadAiModelData()`, `getPrice()` functions
  - `Instruction for DeepSeek:` Implement server-side data loading with:
    1. Static JSON file reading
    2. Error handling with fallback to sample data
    3. Slug-based parameter matching
    4. Async/await patterns for RSC compatibility

---

## Phase 3: Root Layout & Navigation - **Day 2** ✅ COMPLETED

### Task 3.1: Global Layout Component ✅
- **Type:** UI Component
- **Claude's Action:**
  - Create `app/layout.tsx` with monospace typography
  - Implement container-based responsive grid
  - Add NordVPN affiliate link tracking
  - Configure Google Site Verification meta

### Task 3.2: Navigation Bar Component ✅
- **Type:** UI Component
- **Claude's Action:**
  - Implement Radix UI dropdown menus for Services/Countries
  - Responsive mobile-first navigation
  - Hover states matching Streamlit CSS pseudo-classes
  - Active link tracking with URL parameters

### Task 3.3: Footer Component ✅
- **Type:** UI Component
- **Claude's Action:**
  - Legal links (Privacy Policy, Terms of Service)
  - Affiliate disclosure text
  - Copyright and data freshness notice
  - Social/contact links

---

## Phase 4: Main Dashboard Page - **Day 2** ✅ COMPLETED

### Task 4.1: Metric Cards Component ✅
- **Type:** UI Component
- **Claude's Action:**
  - 4-card grid with avg/max savings calculations
  - Real-time metrics computation using useMemo
  - Monochrome card design with subtle borders
  - Responsive breakpoints for mobile

### Task 4.2: Pricing Table Component ✅
- **Type:** UI Component
- **Claude's Action:**
  - Implement @tanstack/react-table with client-side sorting
  - Column definitions matching Streamlit dataframe
  - Sort indicator arrows (↑/↓) on header click
  - Hover states and row highlighting

### Task 4.3: Dashboard Page Layout ✅
- **Type:** Page
- **Claude's Action:**
  - Hero section with value proposition
  - How-it-works 3-step explanation
  - NordVPN CTA with affiliate tracking
  - Responsive grid for metric cards + table

---

## Phase 5: pSEO Dynamic Route (49 pages) - **Day 3** ✅ COMPLETED

### Task 5.1: Dynamic Route Structure ✅
- **Type:** Config
- **Claude's Action:**
  - Create `app/[service]/[country]/page.tsx` structure
  - Implement `generateStaticParams()` for all 49 combinations
  - Type-safe params with ServiceCountryParams interface

### Task 5.2: Dynamic SEO Metadata ✅
- **Type:** Logic Handoff
- **Claude's Action:** Define metadata template
- **DeepSeek Handoff:**
  - `Input:` Service name, country name, pricing data
  - `Output Interface:` Next.js Metadata object
  - `Instruction for DeepSeek:` Generate title/description templates:
    - Title: `{service} Price in {country} 2026 — Geo-Subs Tracker`
    - Description: `How much does {service} cost in {country}? Real-time pricing: {local_price} = ${usd_price}/mo. Save {savings}% vs US.`

### Task 5.3: Price Card Component ✅
- **Type:** UI Component
- **Claude's Action:**
  - 3-column layout (Local Price / USD Price / Savings %)
  - Currency symbol handling and formatting
  - Color-coded savings percentage (accent color)
  - Plan details section

### Task 5.4: Breadcrumbs Component ✅
- **Type:** UI Component
- **Claude's Action:**
  - Home → Service → Country navigation trail
  - Dynamic link generation with slug normalization
  - Current page highlighting in primary color

### Task 5.5: Related Links Component ✅
- **Type:** Logic Handoff
- **Claude's Action:** Define deterministic algorithm requirements
- **DeepSeek Handoff:**
  - `Input:` Current service, current country, all pricing data
  - `Output Interface:` Array of 5 related PricingData items
  - `Instruction for DeepSeek:` Implement seedrandom-based algorithm:
    1. Priority: Same service, different country
    2. Secondary: Same country, different service  
    3. Tertiary: Remaining items
    4. Deterministic shuffle using `seedrandom(service-country)`

---

## Phase 6: AI Pricing Page - **Day 4** ⬜ PENDING

### Task 6.1: Tab Navigation Component
- **Type:** UI Component
- **Claude's Action:**
  - Implement Radix UI Tabs for 6 categories
  - Active state styling with bottom border
  - Smooth transition animations
  - URL synchronization with query params

### Task 6.2: Recharts Visualization
- **Type:** UI Component
- **Claude's Action:**
  - Dual Y-axis chart (cost vs model strength)
  - Monochrome line styling with dashed strength line
  - Custom tooltip with cost breakdown
  - Responsive chart container

### Task 6.3: Model Cards Component
- **Type:** UI Component
- **Claude's Action:**
  - Grid layout for model comparison
  - Cost per 1M tokens display
  - Category badges with difficulty levels
  - "Recommended for" rationale section

### Task 6.4: AI Pricing Page Layout
- **Type:** Page
- **Claude's Action:**
  - Tab-controlled content sections
  - Chart + table side-by-side on desktop
  - Model strength explanation sidebar
  - Data freshness timestamp

---

## Phase 7: Guide Pages - **Day 5** ⬜ PENDING

### Task 7.1: Guide Layout Component
- **Type:** UI Component
- **Claude's Action:**
  - Difficulty badges (Easy/Medium/Hard)
  - Step-by-step numbered instructions
  - VPN requirement indicator
  - Method comparison table

### Task 7.2: Step List Component
- **Type:** UI Component
- **Claude's Action:**
  - Numbered circles with black background
  - Title + description for each step
  - Visual separation between steps
  - Estimated time per step

### Task 7.3: Dynamic Guide Pages
- **Type:** Page
- **Claude's Action:**
  - Create `app/guide/[service]/page.tsx` structure
  - Service-specific instructions (Spotify, Netflix, etc.)
  - Payment method recommendations per country
  - Troubleshooting FAQ section

---

## Phase 8: Shared UI Components - **Day 6** ⬜ PENDING

### Task 8.1: Button System
- **Type:** UI Component
- **Claude's Action:**
  - Primary CTA button (accent color)
  - Secondary outline button
  - Text button for subtle actions
  - Consistent hover/focus states

### Task 8.2: Card Container
- **Type:** UI Component
- **Claude's Action:**
  - White background with gray border
  - Consistent padding system
  - Optional header section
  - Responsive width handling

### Task 8.3: Loading States
- **Type:** UI Component
- **Claude's Action:**
  - Skeleton screens for data tables
  - Loading spinners for async operations
  - Error boundary with retry mechanism
  - Empty state illustrations

---

## Phase 9: Legal & Static Pages - **Day 6** ⬜ PENDING

### Task 9.1: Privacy Policy Page
- **Type:** Page
- **Claude's Action:**
  - GDPR-compliant privacy notice
  - Data collection transparency
  - Cookie policy with opt-out
  - Contact information for DPO

### Task 9.2: Terms of Service
- **Type:** Page
- **Claude's Action:**
  - Affiliate disclosure requirements
  - Accuracy disclaimer for pricing data
  - User responsibilities section
  - Limitation of liability

### Task 9.3: 404 Error Page
- **Type:** Page
- **Claude's Action:**
  - Helpful navigation suggestions
  - Search functionality
  - Return to home CTA
  - Consistent with site aesthetic

---

## Phase 10: Build Optimization & SEO - **Day 7** ⬜ PENDING

### Task 10.1: Static Generation Optimization
- **Type:** Config
- **Claude's Action:**
  - Incremental Static Regeneration configuration
  - Image optimization with next/image
  - Font preloading strategy
  - Bundle analysis and code splitting

### Task 10.2: SEO Audit & Implementation
- **Type:** Logic Handoff
- **Claude's Action:** Define audit requirements
- **DeepSeek Handoff:**
  - `Input:` Built Next.js site
  - `Output Interface:` SEO audit report
  - `Instruction for DeepSeek:` Generate sitemap.xml, robots.txt, and validate:
    1. All 49 pSEO pages have unique meta tags
    2. Canonical URLs point to correct destinations
    3. Structured data markup for pricing tables
    4. Open Graph tags for social sharing

### Task 10.3: Performance Optimization
- **Type:** Logic Handoff
- **Claude's Action:** Define performance targets
- **DeepSeek Handoff:**
  - `Input:` Production build
  - `Output Interface:` Lighthouse audit results
  - `Instruction for DeepSeek:` Implement optimizations for:
    1. First Contentful Paint < 1.5s
    2. Time to Interactive < 3.5s  
    3. Cumulative Layout Shift < 0.1
    4. Accessibility score > 90

---

## Phase 11: Deployment Configuration - **Day 8** ⬜ PENDING

### Task 11.1: Vercel Deployment Setup
- **Type:** Config
- **Claude's Action:**
  - Environment variables configuration
  - Build command with pre-build CSV processing
  - Domain configuration for subpricing.com
  - Preview deployment for staging

### Task 11.2: Analytics & Monitoring
- **Type:** Config
- **Claude's Action:**
  - Google Analytics 4 integration
  - Vercel Analytics for performance monitoring
  - Error tracking with Sentry
  - UTM parameter tracking for affiliate links

### Task 11.3: Backup & Rollback Plan
- **Type:** Config
- **Claude's Action:**
  - Database backup strategy for user data
  - Static asset versioning
  - Blue-green deployment configuration
  - Rollback triggers and procedures

---

## Dual-Model Handoff Protocol

### Claude's Domain (UI/Architecture):
- ✅ Tailwind CSS styling and visual system
- ✅ React component architecture  
- ✅ Next.js App Router configuration
- ✅ Responsive layout design
- ✅ Accessibility implementation
- ✅ TypeScript interface definitions

### DeepSeek's Domain (Logic/Data):
- ⬜ CSV to JSON data processing
- ⬜ Complex mathematical calculations
- ⬜ Deterministic random algorithms
- ⬜ Data validation and transformation
- ⬜ Performance optimization scripts
- ⬜ SEO automation scripts

---

## Risk Mitigation Checklist

### High Risk Areas:
1. **Plotly → Recharts Migration**
   - Risk: Dual Y-axis + custom annotations complexity
   - Mitigation: Early PoC, consider Visx as fallback

2. **CSS Pseudo-class Navigation → JS-Driven**
   - Risk: No-JS fallback experience degradation
   - Mitigation: Progressive enhancement with Radix UI

3. **Deterministic Random → SSR Hydration**
   - Risk: Server/client mismatch causing hydration errors
   - Mitigation: seedrandom + comprehensive testing

4. **49 pSEO Pages Build Time**
   - Risk: Build times >5 minutes
   - Mitigation: ISR with 24-hour revalidation

### SEO Critical Path:
- [ ] All 49 pSEO pages pre-rendered via `generateStaticParams()`
- [ ] Meta tags 100% match Streamlit versions
- [ ] Internal link structure preserved
- [ ] URL format unchanged (`/netflix_turkey` → `/netflix/turkey`)
- [ ] Canonical URLs correctly set
- [ ] Sitemap.xml auto-generated

### Performance Targets:
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s  
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1
- Accessibility Score: > 90

---

## Success Metrics

### Technical Success:
- [ ] Zero TypeScript errors in production build
- [ ] All 49 routes generate successfully
- [ ] No hydration warnings in console
- [ ] Lighthouse scores meet targets
- [ ] Automated tests pass

### Business Success:
- [ ] Google Search Console coverage maintained
- [ ] Core Web Vitals improved vs Streamlit
- [ ] Page load times reduced by 50%
- [ ] Mobile traffic conversion maintained
- [ ] Affiliate link tracking functional

### Migration Success:
- [ ] All Streamlit features replicated
- [ ] URL redirects working correctly
- [ ] Data accuracy maintained
- [ ] User experience improved
- [ ] Development velocity increased

---

## Implementation Status Summary

✅ **COMPLETED** (Phases 1-5):
- Next.js 14 project initialized with TypeScript
- Tailwind CSS configured with monochrome aesthetic
- Core dependencies installed (React Table, Radix UI, Recharts)
- Data loading infrastructure implemented
- Navigation and layout components built
- Main dashboard page with interactive table
- pSEO dynamic route structure for 49 pages
- Price card, breadcrumbs, related links components

⬜ **PENDING** (Phases 6-11):
- AI Pricing page with Recharts visualizations
- Guide pages with step-by-step instructions
- Legal pages (Privacy Policy, Terms of Service)
- Build optimization and SEO implementation
- Deployment configuration and monitoring

---

## Next Steps

1. **Immediate Priority:** Complete Phase 6 (AI Pricing Page)
   - Implement Recharts visualization
   - Build tab navigation system
   - Create model comparison cards

2. **Data Pipeline Handoff:** Provide CSV files to DeepSeek for:
   - JSON conversion with calculations
   - Deterministic related links algorithm
   - Data validation scripts

3. **Testing & Validation:**
   - Build and test all 49 pSEO pages
   - Verify 301 redirects work correctly
   - Validate meta tags match Streamlit

4. **Deployment:**
   - Configure Vercel deployment
   - Set up analytics and monitoring
   - Implement rollback procedures

---

**Document Version:** v1.0  
**Last Updated:** 2026-04-03  
**Architect:** Claude (Vibe Coder)  
**Project:** subpricing.com → Next.js 14 Migration
