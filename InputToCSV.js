import fs from "fs";
// SampleArtistData.txt

// The input data you provided (you can also read this from a file)
const inp_data = fs.readFileSync('./artist', 'utf8', (err, data) => { 
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
});
const data = inp_data.trim(); // Note: I trimmed spaces

// Split the data into lines
const lines = data.split('\n');

// Convert each line by replacing tab \t with comma ,
const csvLines = lines.map(line => {
  return line
    .split('\t')
    .map(field => field === '\\N' ? '' : `"${field.replace(/"/g, '""')}"`) // Handle missing values and escape quotes
    .join(',');
});

// Create the final CSV text
const csvContent = csvLines.join('\n');

// Write the CSV content to a file
fs.writeFileSync('output.csv', csvContent, 'utf8');

console.log('CSV file created: output.csv');
