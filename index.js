#!/usr/bin/env node
'use strict'
const util = require('util')
const fs = require('fs')
const debug = require('debug')('npm-readme-viewer')
const globalPrefix = require('global-prefix')
const marked = require('marked')
const TerminalRenderer = require('marked-terminal')


const stat = util.promisify(fs.stat)

marked.setOptions({
  renderer: new TerminalRenderer()
})

const pArgv = process.argv
const packageName = pArgv.length <= 2 ? process.cwd().split('/').pop() : pArgv[2]
 const mdFileName = 'README.md'

debug(packageName)
debug(process.cwd())
const readFile = async (fullPath) => {
  try {
    let fileStats = await stat(fullPath)
    if (fileStats.isFile()) {
      console.log(marked(fs.readFileSync(fullPath).toString()))
    }
    return fileStats.isFile()
  } catch (e) {
    debug('An error occurred while reading file: ', e)
    return false
  }
}

const exec = async () => {
    try {
      const paths = pArgv <= 2 ? [`${process.cwd()}/${mdFileName}`] :
                [`${process.cwd()}/node_modules/${packageName}/${mdFileName}`]
                .concat([`${globalPrefix}/node_modules/${packageName}/${mdFileName}`])

      debug(paths)
      let res = await Promise.all(paths.map(path => readFile(path)))
      if (res.every(res => !res)) {
        console.log(`Could not find readme file`)
      }
  } catch (e) {
    console.log(e)
  }
}

exec()
