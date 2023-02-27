const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'uploads');

fs.readdir(directoryPath, function(err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 

  let images = [];

  files.forEach(function(file) {
    const filePath = path.join(directoryPath, file);

    if (fs.statSync(filePath).isFile()) {
      const image = fs.readFileSync(filePath, { encoding: 'base64' });
      images.push({ 
        name: file,
        data: `data:image/${path.extname(file).substring(1)};base64,${image}`
      });
    }
  });

  fs.writeFile('result.json', JSON.stringify(images), function(err) {
    if (err) {
      return console.log('Error writing file: ' + err);
    }

    console.log('Images converted and saved to result.json');
  });
});