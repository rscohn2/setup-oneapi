const path = require('path')

const core = require('@actions/core')
const tc = require('@actions/tool-cache')
const exec = require('@actions/exec')
const io = require('@actions/io')

const componentUrls = {
  tbb: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19041/l_tbb_oneapi_p_2021.7.1.15005_offline.sh',
  dpl: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19046/l_oneDPL_p_2021.7.2.15007_offline.sh'
}

function restoreCache () {
  const cache = core.getInput('cache')
  if (!cache) { return false }
  console.log('Restoring from cache')
  console.log('Cache restore failed')
  return false
}

async function install (component) {
  const url = componentUrls[component]
  console.log(`Installing ${component} from ${url}`)
  const installerPath = await tc.downloadTool(url)
  await exec.exec('sudo', ['bash', installerPath, '-s', '-a', '-s', '--action', 'install', '--eula', 'accept'])
  await io.rmRF(installerPath)
  return installerPath
 //return path.parse(installerPath).base
}

async function installList (components) {
  console.log(`Installing ${components}`)

  let key = ''
  for (const component of components) {
    key = key + ':' + await install(component)
  }
  key = key.substring(1)
  console.log(`Key ${key}`)
  core.saveState('key', key)
}

function run () {
  try {
    if (restoreCache()) {
      return
    }
    installList(core.getMultilineInput('components'))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
