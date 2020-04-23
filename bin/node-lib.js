#!/usr/bin/env node


const path = require('path')
const program = require('commander')
const { version } = require('../package.json')

const initPkg = require('../scripts/initPkg')


program.version(version, '-v, --version', 'output the current version')

program.on('--help', () => {
    console.warn('')
    console.warn('Example call:')
    console.warn('$ node-lib build')
    console.warn('$ node-lib dev')
    console.warn('$ node-lib test')
})

program
    .option('--browser', 'develop env is browser', false)
    .option('--umd', 'enable dist umd lib', false)

program
    .command('init <pkgName>')
    .description('init node-lib project')
    .action((pkgName) => {
        const { browser, umd } = program
        initPkg({ pkgName, browser, umd })
    })


program
    .command('build')
    .description('deploy lib')
    .action(() => {
        console.log('build command called')
    })


program.parse()


// https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md#commands
