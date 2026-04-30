const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'recipes.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Fix specific unescaped single quotes in single-quoted strings in the Indonesian section
const fixes = [
  // Line 6180: "component" inside single quotes -> use backticks or escape
  { from: "the main \"component\" that gives", to: "the main 'component' that gives" },
  
  // Line 6182: they'll inside single quotes
  { from: "the better they'll cook.", to: "the better they\\'ll cook." },
  
  // Line 6183: don't inside single quotes  
  { from: "ingredients don't clump", to: "ingredients don\\'t clump" },
  
  // Line 6237: won't inside single quotes
  { from: "mixture won't burn", to: "mixture won\\'t burn" },
];

for (const fix of fixes) {
  if (content.includes(fix.from)) {
    content = content.replace(fix.from, fix.to);
    console.log(`Fixed: ${fix.from} -> ${fix.to}`);
  } else {
    console.log(`NOT FOUND: ${fix.from}`);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done!');
