const http = require('http');
const fs = require('fs');
const path = require('path');

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

function testPage(url) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: url,
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      const statusCode = res.statusCode;
      res.on('data', () => {}); // consume response data
      res.on('end', () => {
        if (statusCode === 200) {
          console.log(`✓ ${url} - HTTP ${statusCode}`);
          resolve({ url, status: 'success', statusCode });
        } else {
          console.log(`✗ ${url} - HTTP ${statusCode}`);
          resolve({ url, status: 'error', statusCode });
        }
      });
    });

    req.on('error', (error) => {
      console.log(`✗ ${url} - Error: ${error.message}`);
      resolve({ url, status: 'error', error: error.message });
    });

    req.on('timeout', () => {
      req.destroy();
      console.log(`✗ ${url} - Timeout`);
      resolve({ url, status: 'error', error: 'timeout' });
    });

    req.end();
  });
}

async function runAllTests() {
  console.log('Starting page tests (improved version)...');
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
    await new Promise(resolve => setTimeout(resolve, 50));
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
  const reportFile = path.join(__dirname, 'test-report-improved.json');
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

// Check if server is running by attempting to connect
function checkServer() {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'HEAD',
      timeout: 3000
    }, (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        resolve(true);
      });
    });

    req.on('error', () => {
      resolve(false);
    });

    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

async function main() {
  console.log('Checking if server is running on port 3000...');
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log('❌ Server not running on port 3000. Please start the server first.');
    console.log('Run: cd subpricing-nextjs && npm run dev');
    process.exit(1);
  }
  
  console.log('Server is running. Starting tests...\n');
  await runAllTests();
}

if (require.main === module) {
  main().catch(error => {
    console.error('Test runner error:', error);
    process.exit(1);
  });
}

module.exports = { testPage, runAllTests };
