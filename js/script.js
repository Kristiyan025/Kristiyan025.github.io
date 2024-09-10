const fs = require('fs');
const srcPath = '../images';
const resPath = './db-diplomas.js';

const populate = folder => {
  let content = `let ${folder} = {\n`;
  let i = 1;
  const dirs = fs.readdirSync(srcPath + '/' + folder);
  dirs.forEach(dir => {
    let path = srcPath + '/' + folder + '/' + dir;
    content += `  '${dir}' : [\n`;
    const files = fs.readdirSync(path);
    let j = 1;
    files.forEach(file => {
      //let newName = file.replaceAll('#', ' Sharp');
      //fs.renameSync(path + '/' + file, path + '/' + newName);
      content += `    \`${file/*newName*/}\`${(j++ != files.length ? ',' : '')}\n`;
    });
    content += `  ]${(i++ != dirs.length ? ',' : '')}\n`;
  });
  content += `};\n\n`;
  return content;
};

const writeContent = async () => {
  const fileContent = await populate('achievements') +  await populate('education');
  fs.writeFile(resPath, fileContent, err => {
    if (err) {
      console.error(err)
      return
    }});
}

writeContent();
