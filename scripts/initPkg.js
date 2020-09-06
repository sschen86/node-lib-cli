const path = require('path')
const fs = require('fs')
const vfs = require('vinyl-fs')
const through = require('through2')
const chalk = require('chalk')

const cwd = process.cwd()

module.exports = function ({ pkgName, browser, umd }) {
  if (!/^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(pkgName)) {
    return console.warn(chalk.red('init failure: pkgName not allowed!'))
  }

  let dirName
  let orgName

  if (pkgName.includes('@')) {
    ([ , orgName, dirName ] = pkgName.match(/^@(.+?)\/(.+)$/))
  } else {
    dirName = pkgName
  }

  const projectPath = path.join(cwd, dirName)

  if (fs.existsSync(projectPath)) {
    return console.warn(chalk.red('init failure: project has exists!'))
  }

  vfs.src([ '**/*', '!node_modules/**/*' ], { cwd: path.join(__dirname, '..', 'template'), cwdbase: true, dot: true })
    .pipe(through.obj(function (file, enc, next) {
      if (file.stat.isFile()) {
        // if (/\\package\.json$/.test(file.path)) {
        //   file.contents = Buffer.from(file.contents.toString().replace(/__packageName__/g, pkgName))
        // }
        this.push(file)
      }
      next()
    }))
    .pipe(vfs.dest(projectPath))
    .on('end', () => {
      const pkgcPath = path.join(projectPath, 'package.json')

      const pkgc = require(pkgcPath)
      pkgc.name = pkgName
      pkgc.repository = orgName
        ? `https://github.com/${orgName.replace(/\./g, '-')}/${dirName}.git`
        : `https://github.com/sschen86/${dirName}.git`
      pkgc.files = [
        'dist/',
        'README.md',
        'CHANGELOG.md',
        'LICENSE',
      ]
      if (browser) {
        // pkgc.scripts.dev = ''
      } else {
        // pkgc.scripts.dev = 'nodemon --exec babel-node ./example/main '
        // pkgc.devDependencies.nodemon = '^2.0.2'
      }

      fs.writeFileSync(pkgcPath, JSON.stringify(pkgc, null, 2))
      console.warn(chalk.green('init success!'))
    })
    .resume()
}
