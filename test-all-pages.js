const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = promisify(exec);

// List of pages to test
const pages = [
  '/',
  '/ai-pricing',
  '/about',
  '/privacy',
  '/terms',
  '/guide/netflix',
  '/guide/spotify',
  '/guide/youtube-premium',
  '/guide/disney-plus',
  '/guide/canva-pro',
  '/guide/tidal',
  '/netflix/argentina',
  '/netflix/egypt',
  '/netflix/india',
  '/netflix/nigeria',
  '/netflix/pakistan',
  '/netflix/philippines',
  '/netflix/turkey',
  '/spotify/argentina',
  '/spotify/egypt',
  '/spotify/india',
  '/spotify/nigeria',
  '/spotify/pakistan',
  '/spotify/philippines',
  '/spotify/turkey',
  '/youtube-premium/argentina',
  '/youtube-premium/egypt',
  '/youtube-premium/india',
  '/youtube-premium/nigeria',
  '/youtube-premium/pakistan',
  '/youtube-premium/philippines',
  '/youtube-premium/turkey',
  '/disney-plus/argentina',
  '/disney-plus/egypt',
  '/disney-plus/india',
  '/disney-plus/nigeria',
  '/disney-plus/pakistan',
  '/disney-plus/philippines',
  '/disney-plus/turkey',
  '/canva-pro/argentina',
  '/canva-pro/egypt',
  '/canva-pro/india',
  '/canva-pro/nigeria',
  '/canva-pro/pakistan',
  '/canva-pro/philippines',
  '/canva-pro/turkey',
  '/tidal/argentina',
  '/tidal/egypt',
  '/tidal/india',
  '/tidal/nigeria',
  '/tidal/pakistan',
  '/tidal/philippines',
  '/tidal/turkey'
];

async function testPage(url) {
  try {
    const { stdout, stderr } = await execAsync(`curl -s -o /dev/null -w "%{http_code}" http://localhost:3000${url}`);
    const statusCode = stdout.trim();
    
    if (statusCode === '200') {
      console.log(`✓ ${url} - HTTP ${statusCode}`);
      return { url, status: 'success', statusCode };
    } else {
      console.log(`✗ ${url} - HTTP ${statusCode}`);
      return { url, status: 'error', statusCode };
    }
  } catch (error) {
    console.log(`✗ ${url} - Error: ${error.message}`);
    return { url, status: 'error', error: error.message };
  }
}

async function runAllTests() {
  console.log('Starting page tests...');
  console.log('='.repeat(50));
  
  const results = [];
  let successCount = 0;
  let errorCount = 0;
  
  // Test each page
  for (const page of pages) {
    const result = await testPage(page);
    results.push(result);
    
    if (result.status === 'success') {
      successCount++;
    } else {
      errorCount++;
    }
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('='.repeat(50));
  console.log(`Test Summary:`);
  console.log(`Total pages tested: ${pages.length}`);
  console.log(`Successful: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    totalPages: pages.length,
    successCount,
    errorCount,
    results
  };
  
  // Write report to file
  const reportFile = path.join(__dirname, 'test-report.json');
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  console.log(`\nDetailed report saved to: ${reportFile}`);
  
  // Exit with appropriate code
  if (errorCount > 0) {
    console.log('\n❌ Some tests failed. Check the report for details.');
    process.exit(1);
  } else {
    console.log('\n✅ All tests passed!');
    process.exit(0);
  }
}

// Check if server is running
async function checkServer() {
  try {
    await execAsync('netstat -ano | findstr :3000');
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log('❌ Server not running on port 3000. Please start the server first.');
    console.log('Run: cd subpricing-nextjs && npm run dev');
    process.exit(1);
  }
  
  await runAllTests();
}

if (require.main === module) {
  main().catch(error => {
    console.error('Test runner error:', error);
    process.exit(1);
  });
}

module.exports = { testPage, runAllTests };
