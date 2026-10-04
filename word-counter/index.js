import fs from 'node:fs/promises';
import path from 'node:path';

// 1. Read the filename from command line arguments
const args = process.argv.slice(2);
const filename = args[0];

// 2. Check if a filename was provided
if (!filename) {
  console.log('Error: Please provide a file path.');
  console.log('Usage: npm start <filename>');
  process.exit(1);
}

async function countStats() {
  try {
    // 3. Resolve the full path of the file
    const filePath = path.resolve(filename);

    // 4. Read file content asynchronously using fs/promises
    const content = await fs.readFile(filePath, 'utf-8');

    // 5. Calculate stats
    const lines = content.length > 0 ? content.split('\n').length : 0;
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const characters = content.length;

    // 6. Print summary
    console.log(`File: ${filename}`);
    console.log(`Lines: ${lines}`);
    console.log(`Words: ${words}`);
    console.log(`Characters: ${characters}`);

  } catch (error) {
    // Graceful error handling for missing files
    if (error.code === 'ENOENT') {
      console.error(`Error: File '${filename}' not found.`);
    } else {
      console.error(`An error occurred: ${error.message}`);
    }
  }
}

countStats();