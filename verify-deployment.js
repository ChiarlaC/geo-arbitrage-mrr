// 部署验证脚本 - 测试线上网站所有关键页面
const https = require('https');

const DOMAIN = 'https://subpricing.com';
const PAGES_TO_TEST = [
  '/',
  '/ai-pricing',
  '/country/turkey',
  '/country/argentina',
  '/guide/netflix',
  '/guide/spotify',
  '/about',
  '/privacy',
  '/terms',
  '/sitemap.xml',
  '/robots.txt'
];

async function testPage(url) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    https.get(url, (res) => {
      const loadTime = Date.now() - startTime;
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const isNextJs = data.includes('__NEXT_DATA__') || data.includes('_next/');
        const isOldSite = data.includes('streamlit') || data.includes('stApp');

        resolve({
          url,
          status: res.statusCode,
          loadTime: `${loadTime}ms`,
          isNextJs,
          isOldSite,
          success: res.statusCode === 200 && isNextJs && !isOldSite
        });
      });
    }).on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        error: err.message,
        success: false
      });
    });
  });
}

async function runTests() {
  console.log('🚀 开始验证部署...\n');
  console.log(`测试域名: ${DOMAIN}`);
  console.log(`测试页面数: ${PAGES_TO_TEST.length}\n`);
  console.log('='.repeat(80));

  const results = [];

  for (const page of PAGES_TO_TEST) {
    const url = `${DOMAIN}${page}`;
    process.stdout.write(`测试: ${page.padEnd(30)} ... `);

    const result = await testPage(url);
    results.push(result);

    if (result.success) {
      console.log(`✅ 成功 (${result.loadTime})`);
    } else if (result.error) {
      console.log(`❌ 错误: ${result.error}`);
    } else if (result.isOldSite) {
      console.log(`⚠️  警告: 仍然是旧网站! (${result.status})`);
    } else if (!result.isNextJs) {
      console.log(`⚠️  警告: 不是Next.js页面 (${result.status})`);
    } else {
      console.log(`❌ 失败 (${result.status})`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 测试摘要:');

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const oldSiteDetected = results.some(r => r.isOldSite);

  console.log(`✅ 成功: ${successful}/${PAGES_TO_TEST.length}`);
  console.log(`❌ 失败: ${failed}/${PAGES_TO_TEST.length}`);

  if (oldSiteDetected) {
    console.log('\n⚠️  检测到旧网站内容!');
    console.log('   建议操作:');
    console.log('   1. 清除Cloudflare缓存');
    console.log('   2. 清除浏览器缓存或使用无痕模式');
    console.log('   3. 等待5-10分钟让DNS完全传播');
  } else if (successful === PAGES_TO_TEST.length) {
    console.log('\n🎉 所有页面测试通过! 新网站部署成功!');
    console.log('\n📋 后续任务:');
    console.log('   1. 在Google Search Console提交sitemap');
    console.log('   2. 请求Google重新抓取关键页面');
    console.log('   3. 删除旧的Render服务(如果不再需要)');
    console.log('   4. 监控接下来几天的流量和SEO表现');
  }

  console.log('\n');
}

runTests().catch(console.error);
