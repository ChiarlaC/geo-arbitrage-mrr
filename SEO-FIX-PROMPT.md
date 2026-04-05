# SEO优化任务 - Subpricing.com Next.js网站

## 项目背景

我运营一个订阅服务价格比较网站 https://subpricing.com，使用Next.js 14 App Router构建。网站对比Netflix、Spotify、YouTube Premium等服务在不同国家的价格（地理套利功能），以及AI API定价比较。

**当前SEO问题导致网站无法被正确索引和搜索到。**

---

## 🚨 需要修复的3个致命问题

### 问题1: AI Pricing页面内容不可被Google爬取

**文件位置:** `app/ai-pricing/page.tsx`

**当前问题:**
- 页面显示 "Loading AI pricing data..." 
- 使用客户端JavaScript动态加载数据
- Google爬虫看不到实际的价格和模型信息
- 无法索引 "claude api pricing"、"gpt-4 cost" 等长尾关键词

**数据来源:** `public/ai-data.json` （已存在）

**需要实现:**
1. 改为服务端渲染（SSR）或静态生成（SSG）直接加载数据
2. 添加包含长尾关键词的SEO内容段落
3. 优化Title和Meta Description包含核心关键词

**目标长尾关键词:**
- claude api pricing
- gpt-4 cost / gpt-4 api cost
- anthropic pricing
- openai api cost
- gemini api pricing
- ai model comparison
- cheapest ai api

**期望结构:**
```tsx
export default async function AiPricingPage() {
  // 在服务端加载数据
  const aiData = await loadAiData();
  
  return (
    <div>
      <h1>AI API Pricing Comparison 2026: Claude, GPT-4, Gemini</h1>
      
      {/* SEO优化的介绍内容 */}
      <section className="prose max-w-4xl mx-auto mb-8">
        <p>
          Compare <strong>Claude API pricing</strong>, <strong>GPT-4 cost</strong>, 
          and <strong>Gemini pricing</strong> across all major AI providers. Get real-time 
          <strong>AI model costs</strong> for OpenAI, Anthropic, Google, and more models.
        </p>
        
        <h2>Claude API Pricing (Anthropic)</h2>
        <p>
          Anthropic's Claude models include Claude Opus, Sonnet, and Haiku. 
          Claude Sonnet 4.6 pricing starts at $X per million tokens...
        </p>
        
        <h2>GPT-4 and OpenAI API Costs</h2>
        <p>
          OpenAI's GPT-4 Turbo costs $X per million input tokens...
        </p>
        
        <h2>Google Gemini Pricing</h2>
        <p>
          Gemini Pro pricing starts at $X per million tokens...
        </p>
      </section>

      {/* 数据表格 */}
      <AiPricingDashboard initialData={aiData} />
    </div>
  );
}

export const metadata = {
  title: 'AI API Pricing 2026: Claude, GPT-4, Gemini Cost Comparison',
  description: 'Compare Claude API pricing, GPT-4 cost, and Gemini rates. Real-time AI model pricing for OpenAI, Anthropic, Google APIs. Find the cheapest AI API.',
};
```

---

### 问题2: 国家页面缺少SEO内容段落

**文件位置:** `app/country/[country]/page.tsx`

**当前问题:**
- 页面只有标题和价格表格
- 没有包含长尾关键词的正文段落
- 无法索引 "netflix turkey price"、"spotify argentina cheap" 等搜索词
- 缺少FAQ模块（错过Featured Snippets机会）

**需要实现:**
为每个国家页面添加：
1. 包含长尾关键词的介绍段落
2. H2/H3副标题针对具体服务
3. FAQ模块（带Schema.org标记）
4. 内部链接到相关服务页面

**目标长尾关键词（以Turkey为例）:**
- netflix turkey price
- how much does netflix cost in turkey
- spotify turkey cheap / spotify turkey subscription
- youtube premium turkey
- cheapest subscription turkey
- turkey vpn subscriptions

**期望结构:**
```tsx
export default function CountryPage({ params, countryData }) {
  const { country } = params;
  const countryName = formatCountryName(country); // "turkey" -> "Turkey"
  
  return (
    <div>
      <h1>Subscription Prices in {countryName} 2026</h1>
      
      {/* SEO内容段落 */}
      <section className="prose mb-8">
        <p>
          Compare <strong>Netflix {countryName} price</strong>, 
          <strong>Spotify {countryName} subscription</strong>, and other streaming services. 
          Save up to {countryData.avgSavings}% compared to US prices by accessing 
          <strong>cheap {countryName} subscriptions</strong>.
        </p>
        
        <h2>How Much Does Netflix Cost in {countryName}?</h2>
        <p>
          Netflix in {countryName} costs ${countryData.netflix.price} per month 
          for the standard plan. This is {countryData.netflix.savingsPercent}% 
          cheaper than the US price of $15.49.
        </p>
        
        <h2>Spotify {countryName} Pricing</h2>
        <p>
          Spotify Premium in {countryName} is ${countryData.spotify.price}/month, 
          making it one of the most affordable options globally.
        </p>
        
        <h2>Best Subscription Deals in {countryName}</h2>
        <ul>
          {countryData.services.map(service => (
            <li key={service.name}>
              <strong>{service.name}</strong>: ${service.price}/month 
              ({service.savingsPercent}% savings)
            </li>
          ))}
        </ul>
      </section>

      {/* 价格表格 */}
      <PricingTable data={countryData} />
      
      {/* FAQ模块带Schema */}
      <section className="mt-12" itemScope itemType="https://schema.org/FAQPage">
        <h2>Frequently Asked Questions</h2>
        
        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">Is it legal to use a VPN for cheaper subscriptions?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Using a VPN is legal, but may violate service terms. 
              Review provider policies before proceeding.
            </p>
          </div>
        </div>
        
        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What's the cheapest streaming service in {countryName}?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              {countryData.cheapest.name} is the most affordable at 
              ${countryData.cheapest.price}/month.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { country } = params;
  const countryName = formatCountryName(country);
  
  return {
    title: `${countryName} Subscription Prices 2026 — Netflix, Spotify, YouTube`,
    description: `Compare Netflix ${countryName} price, Spotify subscription, and more. Save up to 90% on streaming services in ${countryName}.`,
  };
}
```

---

### 问题3: Sitemap URL格式错误

**文件位置:** `app/sitemap.ts`

**当前问题:**
- Sitemap包含 `/netflix_turkey` 等URL（下划线格式）
- 实际路由是 `/country/turkey` 或 `/netflix/turkey`
- 导致404错误，Google无法爬取

**需要修复:**
生成正确的URL格式，匹配实际路由结构

**期望实现:**
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://subpricing.com';
  
  // 支持的国家列表
  const countries = [
    'turkey', 'argentina', 'nigeria', 'egypt', 
    'pakistan', 'philippines', 'india', 'brazil',
    'poland', 'colombia'
  ];
  
  // 支持的服务列表
  const services = [
    'netflix', 'spotify', 'youtube-premium', 
    'disney-plus', 'hbo-max', 'apple-music'
  ];
  
  // 国家页面
  const countryPages = countries.map(country => ({
    url: `${baseUrl}/country/${country}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  // 服务+国家组合页面（如果这些路由存在）
  const serviceCountryPages = services.flatMap(service =>
    countries.map(country => ({
      url: `${baseUrl}/${service}/${country}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ai-pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...countryPages,
    ...serviceCountryPages,
  ];
}
```

---

## 📋 技术要求

### 使用的技术栈
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Server Components

### 数据位置
- AI数据: `public/ai-data.json`
- 订阅服务数据: `public/data.json` 或通过 `lib/data.ts` 导入

### 代码风格
- 使用 TypeScript
- 使用 Server Components（除非必须用 Client Components）
- 遵循 Next.js 14 最佳实践
- SEO内容使用 Tailwind 的 `prose` 类样式化

---

## ✅ 期望输出

请提供以下文件的完整修改代码：

1. **`app/ai-pricing/page.tsx`** - 服务端渲染版本，包含SEO内容
2. **`app/country/[country]/page.tsx`** - 添加SEO段落和FAQ
3. **`app/sitemap.ts`** - 修复URL格式

每个文件需���：
- ✅ 完整可运行的代码（不是片段）
- ✅ 包含必要的 imports
- ✅ 包含 metadata 配置
- ✅ 包含优化的长尾关键词
- ✅ 代码注释说明关键SEO优化点

---

## 🎯 SEO目标

修复后应该能够索引这些长尾关键词：
- claude api pricing
- gpt-4 cost
- netflix turkey price
- spotify argentina cheap
- how much does netflix cost in [country]
- cheapest ai api
- save money on subscriptions

请确保所有内容：
- 对搜索引擎可见（服务端渲染）
- 包含目标关键词（自然融入，不堆砌）
- 结构化标记正确（Schema.org）
- URL可被正确爬取

---

## 附加说明

如果需要查看现有代码结构，主要文件在：
- `app/` - 页面路由
- `components/` - React组件
- `lib/` - 工具函数和数据处理
- `public/` - 静态资源和JSON数据

请优先修复这3个核心问题，其他SEO优化可以后续迭代。
