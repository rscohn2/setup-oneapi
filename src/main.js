const path = require('path')

const cache = require('@actions/cache')
const core = require('@actions/core')
const exec = require('@actions/exec')
const io = require('@actions/io')
const tc = require('@actions/tool-cache')

const componentUrls = {
  ccl: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19029/l_oneapi_ccl_p_2021.7.1.16948_offline.sh',
  dal: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19032/l_daal_oneapi_p_2021.7.1.16996_offline.sh',
  dnn: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19035/l_onednn_p_2022.2.1.16994_offline.sh',
  dpl: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19046/l_oneDPL_p_2021.7.2.15007_offline.sh',
  icx: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19030/l_dpcpp-cpp-compiler_p_2022.2.1.16991_offline.sh',
  ifx: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18998/l_fortran-compiler_p_2022.2.1.16992_offline.sh',
  impi: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19010/l_mpi_oneapi_p_2021.7.1.16815_offline.sh',
  ipp: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19007/l_ipp_oneapi_p_2021.6.2.16995_offline.sh',
  ippcp: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18999/l_ippcp_oneapi_p_2021.6.2.15006_offline.sh',
  mkl: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19035/l_onednn_p_2022.2.1.16994_offline.sh',
  tbb: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19041/l_tbb_oneapi_p_2021.7.1.15005_offline.sh',
  vpl: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19044/l_oneVPL_p_2022.2.5.17121_offline.sh'
}

async function restoreCache (components) {
  const useCache = core.getInput('cache')
  if (!useCache) return false

  let key = ''
  for (const component of components) {
    const url = componentUrls[component]
    if (!url) {
      core.error(`Unknown oneapi component: ${component}`)
    }
    key = key + ':' + path.parse(url).base
  }
  key = key.substring(1)
  console.log(`Key ${key}`)

  console.log('Restoring from cache')
  const restoreKey = await cache.restoreCache(['/opt/intel/oneapi'], key)

  if (restoreKey) {
    console.log(`Restore succeeded: ${restoreKey}`)
    core.saveState('key', '')
    return true
  } else {
    console.log(`Restore failed: ${restoreKey}`)
    core.saveState('key', key)
    return false
  }
}

async function cleanupInstall () {
  if (!core.getInput('fast')) { return }

  const dirs = ['/opt/intel/oneapi/compiler/latest/linux/compiler/lib/ia32_lin',
    '/opt/intel/oneapi/compiler/latest/linux/bin/ia32',
    '/opt/intel/oneapi/compiler/latest/linux/lib/emu',
    '/opt/intel/oneapi/compiler/latest/linux/lib/oclfpga']

  for (const dir in dirs) {
    await io.rmRF(dir)
  }
}

async function install (component) {
  const url = componentUrls[component]
  console.log(`Installing ${component} from ${url}`)
  const installerPath = await tc.downloadTool(url)
  await exec.exec('sudo', ['bash', installerPath, '-s', '-a', '-s', '--action', 'install', '--eula', 'accept'])
  await io.rmRF(installerPath)
  cleanupInstall()
}

async function installList (components) {
  console.log(`Installing ${components}`)

  for (const component of components) {
    await install(component)
  }
}

function list () {
  if (!core.getInput('list')) { return }
  console.log('Available components:')
  for (const component in componentUrls) {
    console.log(`  ${component}: ${componentUrls[component]}`)
  }
}

async function run () {
  try {
    list()
    const components = core.getMultilineInput('components')
    if (await restoreCache(components)) {
      return
    }
    await installList(components)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
