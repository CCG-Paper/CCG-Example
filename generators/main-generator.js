const fs = require('fs-extra');
const path = require('path');

(async () => {
    // Copy prototype example excluding ccg variant files
    const sourceDir = path.join(__dirname, '..', 'prototype');
    const targetDir = path.join(__dirname, '..', 'output');
    const exclusions = ['app.js', 'index.html'];
    await copyFolderRecursive(sourceDir, targetDir, exclusions).catch((error) => console.error('Error copying files:', error));
    console.log('Copy complete!');

    // Use ccg generators
    const indexGenerator = await import('./index.html-generator.mjs');
    let indexContent = indexGenerator._ecdd3e8b04456adecef80ce61119ca3eTemplate.generate(
        "Week Planner",
        [
            {
                _960f87f2e0933ce77d85adf041ffae82: '"todoapp todoapp-monday"',
                _b94d822d6867a13bfde12ea2ad7669a6: 'Monday'
            },
            {
                _960f87f2e0933ce77d85adf041ffae82: '"todoapp todoapp-tuesday"',
                _b94d822d6867a13bfde12ea2ad7669a6: 'Tuesday'
            },
            {
                _960f87f2e0933ce77d85adf041ffae82: '"todoapp todoapp-wednesday"',
                _b94d822d6867a13bfde12ea2ad7669a6: 'Wednesday'
            },
            {
                _960f87f2e0933ce77d85adf041ffae82: '"todoapp todoapp-thursday"',
                _b94d822d6867a13bfde12ea2ad7669a6: 'Thursday'
            },
            {
                _960f87f2e0933ce77d85adf041ffae82: '"todoapp todoapp-friday"',
                _b94d822d6867a13bfde12ea2ad7669a6: 'Friday'
            },
        ],
        "powered by ccg"
    );
    indexContent = indexContent.replaceAll("&quot;", '"');
    let indexFilePath = path.join(targetDir, 'index.html');
    await fs.writeFile(indexFilePath, indexContent);
    // Temporary workaround for a problem with script tags
    await insertLines(indexFilePath, [
        {line: 9, content: '<script defer="defer" src="app.js"></script>'},
        {line: 10, content: '<script defer="defer" src="app-addition.js"></script>'}
    ]);

    const appGenerator = await import('./app.js-generator.mjs');
    let appContent = appGenerator._35b94c16d8f13843499ef55764dfdd35Template.generate(
        [
            {_af2f32cfa01f0ac24c752ba369ecd803: 'todoMonday'},
            {_af2f32cfa01f0ac24c752ba369ecd803: 'todoTuesday'},
            {_af2f32cfa01f0ac24c752ba369ecd803: 'todoWednesday'},
            {_af2f32cfa01f0ac24c752ba369ecd803: 'todoThursday'},
            {_af2f32cfa01f0ac24c752ba369ecd803: 'todoFriday'}
        ],
        [
            {_e50555a2e165c4ac7aaa2f6d70214c5b: 'todoMonday'},
            {_e50555a2e165c4ac7aaa2f6d70214c5b: 'todoTuesday'},
            {_e50555a2e165c4ac7aaa2f6d70214c5b: 'todoWednesday'},
            {_e50555a2e165c4ac7aaa2f6d70214c5b: 'todoThursday'},
            {_e50555a2e165c4ac7aaa2f6d70214c5b: 'todoFriday'},
        ],
        [
            {
                _2fdb85f41fa76a36df3201543ad2ac66: 'todoMonday',
                _af87a10181ec47d62a8cd3edba4bf1eb: '"monday"',
                _1b48d0b79e9f717997b92abdaa02e9e2: '"todoapp-monday"'
            },
            {
                _2fdb85f41fa76a36df3201543ad2ac66: 'todoTuesday',
                _af87a10181ec47d62a8cd3edba4bf1eb: '"tuesday"',
                _1b48d0b79e9f717997b92abdaa02e9e2: '"todoapp-tuesday"'
            },
            {
                _2fdb85f41fa76a36df3201543ad2ac66: 'todoWednesday',
                _af87a10181ec47d62a8cd3edba4bf1eb: '"wednesday"',
                _1b48d0b79e9f717997b92abdaa02e9e2: '"todoapp-wednesday"'
            },
            {
                _2fdb85f41fa76a36df3201543ad2ac66: 'todoThursday',
                _af87a10181ec47d62a8cd3edba4bf1eb: '"thursday"',
                _1b48d0b79e9f717997b92abdaa02e9e2: '"todoapp-thursday"'
            },
            {
                _2fdb85f41fa76a36df3201543ad2ac66: 'todoFriday',
                _af87a10181ec47d62a8cd3edba4bf1eb: '"friday"',
                _1b48d0b79e9f717997b92abdaa02e9e2: '"todoapp-friday"'
            },
        ]
    );
    appContent = appContent.replaceAll("&quot;", '"');
    await fs.writeFile(path.join(targetDir, 'app.js'), appContent);
    console.log("File generation complete!");
})();

// BEGIN UTIL FUNCTIONS
async function copyFolderRecursive(source, target, exclusions = []) {
    await fs.ensureDir(target);
    const items = await fs.readdir(source);

    for (let item of items) {
        const sourcePath = path.join(source, item);
        const targetPath = path.join(target, item);

        if (exclusions.includes(item) || exclusions.includes(sourcePath)) {
            continue; // Skip excluded items
        }

        const stat = await fs.stat(sourcePath);
        if (stat.isDirectory()) {
            // Handle dirs
            await copyFolderRecursive(sourcePath, targetPath, exclusions);
        } else {
            await fs.copy(sourcePath, targetPath);
        }
    }
}

async function insertLines(filePath, replace) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err}`);
        return;
      }
      const lines = data.split('\n');

      for(const replaceObj of replace) {
        lines.splice(replaceObj.line, 0, replaceObj.content);
      }
  
      fs.writeFile(filePath, lines.join('\n'), (err) => {
        if (err) {
          console.error(`Error writing file: ${err}`);
          return;
        }
      });
    });
  }
// END UTIL FUNCTIONS