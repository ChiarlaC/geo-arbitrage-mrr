const fs = require('fs');
const path = require('path');

// Read CSV file
const csvPath = 'H:\\09ZeroPay\\ai_api_data.csv';
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Simple CSV parser that handles quoted fields
function parseCSV(csv) {
  const lines = csv.split('\n').filter(line => line.trim() !== '');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values = [];
    let inQuotes = false;
    let currentValue = '';
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim()); // Add last value
    
    // Ensure we have enough values
    while (values.length < headers.length) {
      values.push('');
    }
    
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    data.push(row);
  }
  
  return data;
}

const parsedData = parseCSV(csvContent);

// Transform to AiModelData format
const aiData = parsedData.map(row => ({
  model_id: row.model_id,
  model_name: row.model_name,
  category: row.category,
  input_cost: parseFloat(row.input_cost) || 0,
  output_cost: parseFloat(row.output_cost) || 0,
  context_length: row.context_length,
  modality: row.modality
}));

// Write JSON file
const outputPath = path.join(__dirname, 'public', 'ai-data.json');
fs.writeFileSync(outputPath, JSON.stringify(aiData, null, 2));
console.log(`AI data written to ${outputPath}, ${aiData.length} records`);
