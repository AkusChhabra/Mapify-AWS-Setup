import fs from "fs";
import path from "path";
import "./checkFileExists.js"

const convert2Csv = (input_file) => {

  if (!fs.existsSync(input_file)) {
    console.log("Input file does not exist.\n");
    return;
  }

  let output_file = input_file.split('.')[0];

  var ver_id = 1;
  while (fs.existsSync(`${output_file}.csv`)) {
    if (input_file === output_file) {
      output_file = `${input_file}_${ver_id}`;
      ver_id += 1
      continue
    } else {
      const pos = output_file.lastIndexOf("_")
      ver_id = Number(output_file.slice(pos+1)) + 1
      output_file = `${input_file}_${ver_id}`;
      ver_id += 1
    }
  }

  const inp_data = fs.readFileSync(input_file, 'utf8', (err, data) => { 
      if (err) {
        console.error(err);
        return;
      }
  });
  const data = inp_data.trim();
  const lines = data.split('\n');

  const csvLines = lines.map(line => {
    return line
      .split('\t')
      .map(char => char === '\\N' ? '' : `"${char.replace(/"/g, '""')}"`)
      .join(',');
  });

  const csvContent = csvLines.join('\n');

  fs.writeFileSync(`${output_file}.csv`, csvContent, 'utf8');

  console.log(`CSV file created: ${output_file}.csv`);
}

const findDiff = (str1, str2) => {
  if (str1.length === 0 || str2.length === 0) return "";
  return str2[[...str1].findIndex((e, index) => e !== str2[index])];
}

const input_file = convert2Csv('iso_3166_3');