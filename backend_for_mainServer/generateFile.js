const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname, 'codes');

if(!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
};


const generateFile = (format, code) => {
    const jobId = uuid();
    const filename = `${jobId}.${format}`;
    const filepath = path.join(dirCodes, filename);
    
    return new Promise((resolve, reject) => {
      console.log("INSIDE GENERATED FILE");
      // console.log(`${filepath} + " This is a generated file " + ${code}`);
      fs.writeFile(filepath, code, 'utf-8', (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          // console.log("Success");
          resolve(filepath);
        }
      });
    });
};

module.exports = {
    generateFile
}