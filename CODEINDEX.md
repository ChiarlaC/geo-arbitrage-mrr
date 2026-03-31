# CODEINDEX — AI Quick Reference

> Read this file first. It tells you exactly where to look before opening any code file.
> Last updated: 2026-03-31

> ⚠️ **AI 工具使用前必读：** 本项目有非常规的两层静态文件架构。`sitemap.xml` 和 `robots.txt` **不在 main 分支提供服务**，而是通过 `render.yaml` rewrite 代理到 `gh-pages` 分支。在修改任何 SEO / 静态文件相关内容前，先读"静态文件托管架构"章节，否则极易破坏 GSC 可读性。

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
| `page_generator.py` | Generates 42 pSEO pages + automated sitemap.xml | `build_sitemap()` auto-scans `pages/` for manual guides/reviews now. |
| `config.py` | Affiliate links + site constants | `NORDVPN_URL`, `G2A_URL`, `SITE_URL` |

---

## Components

| File | Purpose | Key exports |
|------|---------|-------------|
| `components/guide_base.py` | Shared CSS + helpers for all guide pages | `guide_page_setup(title, description=None)` handles meta tags. |
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
| Update sitemap | Re-run `page_generator.py`，然后 push 到 `gh-pages` 分支 |
| Update robots.txt | 编辑 `gh-pages` 分支上的 `robots.txt` |

---

## 静态文件托管架构 (sitemap.xml / robots.txt)

> ⚠️ **这是本项目最容易被 AI 工具破坏的部分，已有多次前例。修改前务必理解完整架构。**

### 为什么这样设计

Streamlit 是纯应用框架，**无法直接在根路径托管静态文件**。访问 `/sitemap.xml` 默认返回 Streamlit 404。解决方案是两层架构：

```
用户/爬虫访问 subpricing.com/sitemap.xml
        ↓
  Render 平台拦截（render.yaml rewrite 规则）
        ↓
  透明代理到 GitHub Pages（gh-pages 分支）
        ↓
  返回真实的 sitemap.xml 内容
```

### render.yaml 规则（不可改动）

```yaml
routes:
  - type: rewrite          # ← 必须是 rewrite，不能是 redirect
    source: /sitemap.xml
    destination: https://chiarlaC.github.io/geo-arbitrage-mrr/sitemap.xml
  - type: rewrite          # ← 必须是 rewrite，不能是 redirect
    source: /robots.txt
    destination: https://chiarlaC.github.io/geo-arbitrage-mrr/robots.txt
```

**`rewrite` vs `redirect` 的区别：**
- `rewrite`：服务端透明代理，爬虫看到 200，内容直接返回 ✅
- `redirect`：返回 302 跳转，Googlebot 可能拒绝跟随，导致 GSC 读取失败 ❌

### 文件实际位置

| 文件 | 实际存放 | 对外 URL |
|------|---------|---------|
| `sitemap.xml` | `gh-pages` 分支根目录 | `subpricing.com/sitemap.xml` |
| `robots.txt` | `gh-pages` 分支根目录 | `subpricing.com/robots.txt` |
| `sitemap.xml`（main） | `main` 分支根目录 | **不对外服务**，仅作为生成源 |

### 正确更新流程

**更新 sitemap（跑完 page_generator.py 之后）：**
```bash
git checkout gh-pages
git checkout main -- sitemap.xml
git commit -m "chore: sync sitemap from main"
git push origin gh-pages
git checkout main
```

**更新 robots.txt：**
```bash
git checkout gh-pages
# 直接编辑 robots.txt
git add robots.txt && git commit -m "chore: update robots.txt"
git push origin gh-pages
git checkout main
```

### robots.txt 当前内容（正确状态）

```
User-agent: *
Allow: /
Sitemap: https://subpricing.com/sitemap.xml
```

### ⚠️ 已发生的破坏案例

| 时间 | 工具 | 破坏内容 | 影响 |
|------|------|---------|------|
| 2026-03-31 | antigravity | 将 `render.yaml` 中 `robots.txt` 的 `rewrite` 改为 `redirect` | robots.txt 对爬虫可能不可读 |
| 2026-03-31 | antigravity | 删除了 `main` 分支上的 `sitemap.xml` | page_generator.py 输出丢失 |

---

## GitHub Actions — Known Issues & Fix History

**Workflow file:** `.github/workflows/refresh-data.yml`
**Schedule:** Daily UTC 02:00（北京时间 10:00）

### 已修复问题
| 问题 | 原因 | 修复 |
|------|------|------|
| `push rejected` | `git pull --rebase` 在 commit 之后执行 | 改为 add → commit → push |
| `cannot pull with rebase: unstaged changes` | `data_engine.py` 修改了 `data.csv` 导致 tree 为 dirty | **Sync-First 策略**：运行前先 fetch + reset --hard |
| `Sitemap missing manuals` | `page_generator.py` 以前只写 42 个组合 | 改为自动扫描 `pages/*.py` 并排除 auto-gen slugs |
| `Manual guides deleted` | `page_generator.py` 误将非组合文件判为 stale | 修正 `expected` 命名模式 (underscore) 并添加 `guide_` 白名单 |
| `robots.txt redirect 破坏` | antigravity 将 `render.yaml` 的 `rewrite` 改为 `redirect` | 改回 `rewrite`；`redirect` 会让 Googlebot 看到 302，可能拒绝读取 |
| `main 分支 sitemap.xml 丢失` | antigravity 删除了 main 上的 sitemap.xml | 重新运行 `page_generator.py` 生成并 commit |

### 当前正确执行顺序 (Sync-First Strategy)
1. **Sync (Action Prep):** `git fetch` 和 `git reset --hard origin/main` 确保 runner 环境绝对干净。
2. **Execute:** 运行 `data_engine.py` 修改 `data.csv`。
3. **Commit & Push:**
   ```bash
   git add data.csv
   git commit -m "chore: refresh pricing data [skip ci]"
   git push origin HEAD:main  # 直接 Push 至 Main，绕过 Pull/Rebase 冲突
   ```

---

## 数据现状与局限

- **数据量：** 6 服务 × 8 国家 = 48 个数据点
- **价格来源：** 爬虫全部被反爬拦截，**100% 使用 `FALLBACK_PRICES` 硬编码数据**（在 `data_engine.py` 第 69-130 行）
- **汇率：** 实时从 `open.er-api.com` 获取，有 fallback
- **致命缺陷：** 没有历史价格记录，data.csv 每次覆盖写入，无时间维度数据

---

## 未来发展规划

### 短期（1-2 周可做）
1. **建立价格历史数据库**
   - 改 `data_engine.py` 的 `export_csv()` 函数：每次运行同时 append 写入 `price_history.csv`，记录时间戳
   - GitHub Actions 已每天运行，30天后自动积累历史数据
   - 这是所有后续高价值功能的基础

2. **pSEO 页面关键词优化**
   - 现有页面标题未精确匹配长尾词（如 `spotify turkey price 2026`）
   - 目标 subreddit 来源词：r/spotify, r/NetflixByProxy, r/VPN, r/digitalnomad
   - 优先优化标题 + meta description

### 中期（积累 90 天历史数据后）
3. **MCP Server**
   - 把价格数据包装为 MCP（Model Context Protocol）Server
   - 让用户的 Claude / Cursor 直接调用 `/api/price?service=netflix&country=turkey`
   - 有历史数据后才有真正的调用价值（能回答"上个月涨价了吗"）
   - 目标：Indie Hacker 圈的 AI Agent 开发者

4. **价格变动通知（Email Alert）**
   - 用户留邮箱订阅特定服务+国家组合
   - 历史数据对比发现变动时触发 Resend 发信
   - 自然建立邮件列表，未来可对"每周价格摘要"收费 $2/月

### 长期变现路径
- **数据 API 变现：** $9/月 100次调用，$29/月无限（目标：比价类工具开发者）
- **付费 Newsletter：** 监管套利预警（政策变化 → 价格变化时间窗口），$5/月
- **联盟现有：** NordVPN（76% off 2年计划）+ G2A 礼品卡

---

## SEO 内容关键词参考

### 高价值长尾词
```
spotify cheaper country
netflix cheapest region 2026
youtube premium price by country
how to get spotify cheaper
streaming subscription price comparison
spotify turkey price 2026
netflix argentina how to subscribe
youtube premium india price
```

### 目标 Subreddits（内容调研用）
```
r/spotify, r/NetflixByProxy, r/youtube, r/DisneyPlus
r/VPN, r/frugal, r/digitalnomad
r/assholedesign（区域定价抱怨）
```
