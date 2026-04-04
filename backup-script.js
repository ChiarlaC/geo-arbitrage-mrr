const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const backupDir = path.join(__dirname, 'backups');

// Ensure backup directory exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

async function backupData() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(backupDir, `backup-${timestamp}.tar.gz`);

  // Files to backup
  const filesToBackup = [
    'public/data.json',
    'public/ai-data.json',
    'convert-csv.js',
    'lib/data.ts',
    'lib/types.ts',
    'package.json',
    'package-lock.json'
  ];

  // Filter out files that don't exist
  const existingFiles = filesToBackup.filter(file => fs.existsSync(file));

  if (existingFiles.length === 0) {
    console.log('No files to backup.');
    return;
  }

  try {
    // Create tar.gz archive
    const tarCommand = `tar -czf "${backupFile}" ${existingFiles.map(f => `"${f}"`).join(' ')}`;
    await execAsync(tarCommand, { cwd: __dirname });

    console.log(`Backup created: ${backupFile}`);
    console.log(`Files backed up: ${existingFiles.length}`);

    // Clean up old backups (keep last 7 days)
    const files = fs.readdirSync(backupDir);
    const backupFiles = files.filter(f => f.startsWith('backup-') && f.endsWith('.tar.gz'));
    
    if (backupFiles.length > 7) {
      // Sort by creation time (oldest first)
      backupFiles.sort((a, b) => {
        const aTime = fs.statSync(path.join(backupDir, a)).mtime.getTime();
        const bTime = fs.statSync(path.join(backupDir, b)).mtime.getTime();
        return aTime - bTime;
      });

      // Remove oldest backups
      const toRemove = backupFiles.slice(0, backupFiles.length - 7);
      toRemove.forEach(file => {
        fs.unlinkSync(path.join(backupDir, file));
        console.log(`Removed old backup: ${file}`);
      });
    }
  } catch (error) {
    console.error('Backup failed:', error);
  }
}

// Run backup if called directly
if (require.main === module) {
  backupData();
}

module.exports = { backupData };
