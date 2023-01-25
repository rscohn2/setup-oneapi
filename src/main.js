const path = require('path')
const process = require('process')

const cache = require('@actions/cache')
const core = require('@actions/core')
const exec = require('@actions/exec')
const io = require('@actions/io')
const tc = require('@actions/tool-cache')

let key = 'v0'

const componentUrls = {
  ccl: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19029/l_oneapi_ccl_p_2021.7.1.16948_offline.sh',
  'ccl@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19029/l_oneapi_ccl_p_2021.7.1.16948_offline.sh',

  dal: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19032/l_daal_oneapi_p_2021.7.1.16996_offline.sh',
  'dal@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19032/l_daal_oneapi_p_2021.7.1.16996_offline.sh',

  dnn: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19035/l_onednn_p_2022.2.1.16994_offline.sh',
  'dnn@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19035/l_onednn_p_2022.2.1.16994_offline.sh',

  dpl: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19046/l_oneDPL_p_2021.7.2.15007_offline.sh',
  'dpl@2021.7.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19046/l_oneDPL_p_2021.7.2.15007_offline.sh',

  icx: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19030/l_dpcpp-cpp-compiler_p_2022.2.1.16991_offline.sh',
  'icx@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19030/l_dpcpp-cpp-compiler_p_2022.2.1.16991_offline.sh',

  ifx: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18998/l_fortran-compiler_p_2022.2.1.16992_offline.sh',
  'ifx@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18998/l_fortran-compiler_p_2022.2.1.16992_offline.sh',

  impi: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19010/l_mpi_oneapi_p_2021.7.1.16815_offline.sh',
  'impi@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19010/l_mpi_oneapi_p_2021.7.1.16815_offline.sh',

  ipp: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19007/l_ipp_oneapi_p_2021.6.2.16995_offline.sh',
  'ipp@2021.6.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19007/l_ipp_oneapi_p_2021.6.2.16995_offline.sh',

  ippcp: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18999/l_ippcp_oneapi_p_2021.6.2.15006_offline.sh',
  'ippcp@2021.6.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18999/l_ippcp_oneapi_p_2021.6.2.15006_offline.sh',

    mkl: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19038/l_onemkl_p_2022.2.1.16993_offline.sh',
  'mkl@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19038/l_onemkl_p_2022.2.1.16993_offline.sh',

  tbb: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19041/l_tbb_oneapi_p_2021.7.1.15005_offline.sh',
  'tbb@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19041/l_tbb_oneapi_p_2021.7.1.15005_offline.sh',

  vpl: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19044/l_oneVPL_p_2022.2.5.17121_offline.sh',
  'vpl@2022.2.5': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19044/l_oneVPL_p_2022.2.5.17121_offline.sh'
}

async function restoreCache (components) {
  const useCache = core.getBooleanInput('cache')
  if (!useCache) return false

  for (const component of components) {
    const url = componentUrls[component]
    if (!url) {
      core.error(`Unknown oneapi component: ${component}`)
      process.exit(1)
    }
    key = key + ':' + path.parse(url).base
  }
  console.log(`Key ${key}`)

  console.log('Restoring from cache')
  const restoreKey = await cache.restoreCache(['/opt/intel/oneapi'], key)

  if (restoreKey) {
    console.log(`Restore succeeded: ${restoreKey}`)
    // clear key so we will not try to save
    key = ''
    return true
  } else {
    console.log(`Restore failed: ${restoreKey}`)
    return false
  }
}

async function prune () {
  if (!core.getBooleanInput('prune')) { return }

  const dirs = ['/opt/intel/oneapi/compiler/latest/linux/compiler/lib/ia32_lin',
                '/opt/intel/oneapi/compiler/latest/linux/bin/ia32',
                '/opt/intel/oneapi/compiler/latest/linux/lib/emu',
                '/opt/intel/oneapi/compiler/latest/linux/lib/oclfpga',
                '/opt/intel/oneapi/mkl/latest/lib/intel64/*.a']

  console.log('Pruning oneapi install')
  await exec.exec('du', ['-sh', '/opt/intel/oneapi'])
  // rmRF does not have root permission
  await exec.exec('sudo', ['rm', '-rf'].concat(dirs))
  await exec.exec('du', ['-sh', '/opt/intel/oneapi'])
}

async function install (component) {
  const url = componentUrls[component]
  console.log(`Installing ${component} from ${url}`)
  const installerPath = await tc.downloadTool(url)
  await exec.exec('sudo', ['bash', installerPath, '-s', '-a', '-s', '--action', 'install', '--eula', 'accept'])
  await io.rmRF(installerPath)
  await prune()
}

async function installList (components) {
  for (const component of components) {
    await install(component)
  }
}

function list () {
  if (!core.getBooleanInput('list')) { return }
  console.log('Available components:')
  for (const component in componentUrls) {
    console.log(`  ${component}: ${componentUrls[component]}`)
  }
}

function updateEnv () {
    // setvars.sh does not set CMAKE_PREFIX_PATH for MKL. It relies on
    // root install that puts links in /usr/local/lib/cmake?
    const var = 'CMAKE_PREFIX_PATH'
    val = '/opt/intel/oneapi/mkl/latest/lib/cmake/mkl'
    if (process.env[var]) {
        val = val + ':' + process.env[var]
    }
    core.exportVariable(var, val)
}

async function run () {
  try {
    list()
    updateEnv()
    const components = core.getMultilineInput('components')
    if (await restoreCache(components)) {
      return
    }
    await installList(components)
  } catch (error) {
    key = ''
    core.setFailed(error.message)
  }
  core.saveState('key', key)
}

run()
