const { exec } = require("child_process");

const executePy = (filePath) => {
    return new Promise((resolve, reject) => {
        console.log("INside ExecuteFILE");
        exec(`python ${filePath}`, { shell: true },
        (error, stdout, stderr) => {
         (error || stderr) ? reject({error, stderr}) : resolve({stdout});
        });
    });
}

module.exports = {
    executePy
}