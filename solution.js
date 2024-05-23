const fs = require('fs');
const path = require('path');

function createInfoFile(dir) {
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${dir}:`, err);
            return;
        }

        let folderCount = 0;
        let fileCount = 0;

        files.forEach(file => {
            if (file.isDirectory()) {
                folderCount++;
                createInfoFile(path.join(dir, file.name));
            } else {
                fileCount++;
            }
        });

        const info = {
            fullPath: path.resolve(dir),
            folderCount: folderCount,
            fileCount: fileCount
        };

        fs.writeFile(path.join(dir, 'info.json'), JSON.stringify(info, null, 2), (err) => {
            if (err) {
                console.error(`Error writing info.json in ${dir}:`, err);
            } else {
                console.log(`info.json created in ${dir}`);
            }
        });
    });
}

const startDir = './test1';

createInfoFile(startDir);