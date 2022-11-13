const path = require('path')

const cache = require('@actions/cache')
const core = require('@actions/core')
const exec = require('@actions/exec')
const io = require('@actions/io')
const tc = require('@actions/tool-cache')

const componentUrls = {
  tbb: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19041/l_tbb_oneapi_p_2021.7.1.15005_offline.sh',
  dpl: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19046/l_oneDPL_p_2021.7.2.15007_offline.sh'
}

async function restoreCache (components) {
  const useCache = core.getInput('cache')
  if (!useCache) return false

  let key = ''
  for (const component of components) {
    const url = componentUrls[component]
    key = key + ':' + path.parse(url).base
  }
  key = key.substring(1)
  console.log(`Key ${key}`)
  core.saveState('key', key)

  console.log('Restoring from cache')
  return await cache.restoreCache(['/opt/intel/oneapi'], key, [key])
}

async function install (component) {
  const url = componentUrls[component]
  console.log(`Installing ${component} from ${url}`)
  const installerPath = await tc.downloadTool(url)
  await exec.exec('sudo', ['bash', installerPath, '-s', '-a', '-s', '--action', 'install', '--eula', 'accept'])
  await io.rmRF(installerPath)
}

async function installList (key, components) {
  console.log(`Installing ${components}`)

  for (const component of components) {
    await install(component)
  }
}

function run () {
  try {
    const components = core.getMultilineInput('components')
    if (restoreCache(components)) {
      return
    }
    installList(components)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
