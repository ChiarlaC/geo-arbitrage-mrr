# CODEINDEX — AI Quick Reference

> Read this file first. It tells you exactly where to look before opening any code file.
> Last updated: 2026-03-27

---

## Affiliate Links & Constants → `config.py`

| Constant | Value |
|----------|-------|
| `NORDVPN_URL` | NordVPN affiliate link |
| `G2A_URL` | G2A Goldmine reflink |
| `SITE_URL` | https://subpricing.com |

**To change any affiliate link: edit only `config.py`.**

---

## Core Files

| File | Purpose | Key functions / variables |
|------|---------|--------------------------|
| `app.py` | Homepage dashboard | Price table, NordVPN CTA, nav to sub-pages |
| `data_engine.py` | Price data pipeline | `get_price(service, country)`, SERVICES, COUNTRIES lists, currency mapping |
| `page_generator.py` | Generates 42 pSEO sub-pages + sitemap.xml | Run manually: `python page_generator.py` |
| `config.py` | Affiliate links + site constants | `NORDVPN_URL`, `G2A_URL`, `SITE_URL` |

---

## Components

| File | Purpose | Key exports |
|------|---------|-------------|
| `components/guide_base.py` | Shared CSS + helpers for all guide pages | `GUIDE_CSS`, `guide_page_setup()`, `render_breadcrumb()`, `render_nordvpn_banner()`, `render_nordvpn_cta(eyebrow, body, social_line)`, `render_vpn_list(best_for)`, `render_footer(disclaimer)` |
| `components/template.py` | Shared renderer for 42 auto-generated pSEO sub-pages | `render_page(service, country)` — called by every `pages/{service}_{country}.py` |

**To change pSEO sub-page layout/style: edit `components/template.py`.**
**To change guide page layout/style: edit `components/guide_base.py`.**

---

## Pages — Guide (hand-written, ~150 lines each)

| File | URL | Difficulty badge class |
|------|-----|----------------------|
| `pages/guide_netflix.py` | `/guide_netflix` | `diff-hard` |
| `pages/guide_spotify.py` | `/guide_spotify` | `diff-easy` |
| `pages/guide_youtube_premium.py` | `/guide_youtube_premium` | `diff-vhard` |

All three import from `components/guide_base.py` and `config.py`.
Structure: `guide_page_setup` → `render_breadcrumb` → content → `render_nordvpn_banner` → `render_nordvpn_cta` → FAQ → `render_footer`

---

## Pages — pSEO Sub-pages (42 files, auto-generated)

Pattern: `pages/{service}_{country}.py` → calls `render_page(service, country)`

Services: `netflix`, `youtube_premium`, `spotify`, `disney_plus`, `tidal`, `canva_pro`
Countries: `turkey`, `argentina`, `nigeria`, `egypt`, `pakistan`, `philippines`, `india`

**Do not edit these files manually.** Re-run `page_generator.py` to regenerate.

---

## Pages — Other

| File | URL | Notes |
|------|-----|-------|
| `pages/nordvpn_review.py` | `/nordvpn_review` | NordVPN review page, has its own inline CSS (not yet using guide_base) |
| `pages/privacy_policy.py` | `/privacy_policy` | Static policy page |

---

## CSS — Where to Edit

| What you want to change | Where to edit |
|------------------------|---------------|
| Guide page fonts, colors, step layout | `components/guide_base.py` → `GUIDE_CSS` string |
| pSEO sub-page styles | `components/template.py` → `_CSS` string |
| Homepage styles | `app.py` → `_CSS` string |
| NordVPN review page styles | `pages/nordvpn_review.py` → inline `_CSS` |

---

## Data Flow

```
data_engine.py (fetches prices) → data.csv
data.csv → app.py (homepage table)
data.csv → components/template.py (sub-page price cards)
GitHub Actions (.github/workflows/refresh-data.yml) → runs data_engine.py daily at 10:00 BJT
```

---

## Common Tasks → Where to Go

| Task | File(s) to edit |
|------|----------------|
| Change affiliate link | `config.py` |
| Change guide page content | `pages/guide_{service}.py` |
| Change guide page style/layout | `components/guide_base.py` |
| Change NordVPN CTA text in guides | `pages/guide_{service}.py` → `render_nordvpn_cta(eyebrow=..., body=...)` |
| Change pSEO sub-page layout | `components/template.py` |
| Add a new pSEO sub-page | Edit SERVICES/COUNTRIES in `page_generator.py`, re-run it |
| Add a new guide page | Copy a guide page, import from `guide_base`, follow same structure |
| Update sitemap | Re-run `page_generator.py` |
