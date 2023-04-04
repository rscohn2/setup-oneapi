const path = require('path')
const process = require('process')

const cache = require('@actions/cache')
const core = require('@actions/core')
const exec = require('@actions/exec')
const io = require('@actions/io')
const tc = require('@actions/tool-cache')

const glob = require('glob')

let key = 'v1'

const configs = {
  linux: {
    urls: {
      ccl: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/44e093fc-663b-4ae5-9c08-24a55211aca3/l_oneapi_ccl_p_2021.9.0.43543_offline.sh',
      'ccl@2021.9.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/44e093fc-663b-4ae5-9c08-24a55211aca3/l_oneapi_ccl_p_2021.9.0.43543_offline.sh',
      'ccl@2021.8.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19135/l_oneapi_ccl_p_2021.8.0.25371_offline.sh',
      'ccl@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19029/l_oneapi_ccl_p_2021.7.1.16948_offline.sh',

      dal: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/c209d29f-3d06-45fb-8f04-7b2f47b93a7c/l_daal_oneapi_p_2023.1.0.46349_offline.sh',
      'dal@2023.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/c209d29f-3d06-45fb-8f04-7b2f47b93a7c/l_daal_oneapi_p_2023.1.0.46349_offline.sh',
      'dal@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19122/l_daal_oneapi_p_2023.0.0.25395_offline.sh',
      'dal@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19032/l_daal_oneapi_p_2021.7.1.16996_offline.sh',

      dnn: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/df0fd85e-f52a-437a-8d49-be12b560607c/l_onednn_p_2023.1.0.46343_offline.sh',
      'dnn@2023.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/df0fd85e-f52a-437a-8d49-be12b560607c/l_onednn_p_2023.1.0.46343_offline.sh',
      'dnn@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19137/l_onednn_p_2023.0.0.25399_offline.sh',
      'dnn@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19035/l_onednn_p_2022.2.1.16994_offline.sh',

      dpl: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/64075e93-4134-4d18-8941-827b71b7d8b9/l_oneDPL_p_2022.1.0.43490_offline.sh',
      'dpl@2022.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/64075e93-4134-4d18-8941-827b71b7d8b9/l_oneDPL_p_2022.1.0.43490_offline.sh',
      'dpl@2022.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19133/l_oneDPL_p_2022.0.0.25335_offline.sh',
      'dpl@2021.7.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19046/l_oneDPL_p_2021.7.2.15007_offline.sh',

      icx: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/89283df8-c667-47b0-b7e1-c4573e37bd3e/l_dpcpp-cpp-compiler_p_2023.1.0.46347_offline.sh',
      'icx@2023.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/89283df8-c667-47b0-b7e1-c4573e37bd3e/l_dpcpp-cpp-compiler_p_2023.1.0.46347_offline.sh',
      'icx@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19123/l_dpcpp-cpp-compiler_p_2023.0.0.25393_offline.sh',
      'icx@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19030/l_dpcpp-cpp-compiler_p_2022.2.1.16991_offline.sh',

      ifx: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/150e0430-63df-48a0-8469-ecebff0a1858/l_fortran-compiler_p_2023.1.0.46348_offline.sh',
      'ifx@2023.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/150e0430-63df-48a0-8469-ecebff0a1858/l_fortran-compiler_p_2023.1.0.46348_offline.sh',
      'ifx@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19105/l_fortran-compiler_p_2023.0.0.25394_offline.sh',
      'ifx@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18998/l_fortran-compiler_p_2022.2.1.16992_offline.sh',

      impi: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/718d6f8f-2546-4b36-b97b-bc58d5482ebf/l_mpi_oneapi_p_2021.9.0.43482_offline.sh',
      'impi@2021.9.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/718d6f8f-2546-4b36-b97b-bc58d5482ebf/l_mpi_oneapi_p_2021.9.0.43482_offline.sh',
      'impi@2021.8.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19131/l_mpi_oneapi_p_2021.8.0.25329_offline.sh',
      'impi@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19010/l_mpi_oneapi_p_2021.7.1.16815_offline.sh',

      ipp: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/732392fa-41b3-4a92-935e-6a2b823162a7/l_ipp_oneapi_p_2021.8.0.46345_offline.sh',
      'ipp@2021.8.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/732392fa-41b3-4a92-935e-6a2b823162a7/l_ipp_oneapi_p_2021.8.0.46345_offline.sh',
      'ipp@2021.7.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19126/l_ipp_oneapi_p_2021.7.0.25396_offline.sh',
      'ipp@2021.6.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19007/l_ipp_oneapi_p_2021.6.2.16995_offline.sh',

      ippcp: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/3697d9d0-907f-40d4-a2a7-7d83c45b72cb/l_ippcp_oneapi_p_2021.7.0.43492_offline.sh',
      'ippcp@2021.7.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/3697d9d0-907f-40d4-a2a7-7d83c45b72cb/l_ippcp_oneapi_p_2021.7.0.43492_offline.sh',
      'ippcp@2021.6.3': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19108/l_ippcp_oneapi_p_2021.6.3.25343_offline.sh',
      'ippcp@2021.6.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18999/l_ippcp_oneapi_p_2021.6.2.15006_offline.sh',

      mkl: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/cd17b7fe-500e-4305-a89b-bd5b42bfd9f8/l_onemkl_p_2023.1.0.46342_offline.sh',
      'mkl@2023.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/cd17b7fe-500e-4305-a89b-bd5b42bfd9f8/l_onemkl_p_2023.1.0.46342_offline.sh',
      'mkl@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19138/l_onemkl_p_2023.0.0.25398_offline.sh',
      'mkl@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19038/l_onemkl_p_2022.2.1.16993_offline.sh',

      tbb: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/7dcd261b-12fa-418a-b61b-b3dd4d597466/l_tbb_oneapi_p_2021.9.0.43484_offline.sh',
      'tbb@2021.9.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/7dcd261b-12fa-418a-b61b-b3dd4d597466/l_tbb_oneapi_p_2021.9.0.43484_offline.sh',
      'tbb@2021.8.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19143/l_tbb_oneapi_p_2021.8.0.25334_offline.sh',
      'tbb@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19041/l_tbb_oneapi_p_2021.7.1.15005_offline.sh',

      vpl: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/e2f5aca0-c787-4e1d-a233-92a6b3c0c3f2/l_oneVPL_p_2023.1.0.43488_offline.sh',
      'vpl@2023.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/e2f5aca0-c787-4e1d-a233-92a6b3c0c3f2/l_oneVPL_p_2023.1.0.43488_offline.sh',
      'vpl@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19134/l_oneVPL_p_2023.0.0.25332_offline.sh',
      'vpl@2022.2.5': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19044/l_oneVPL_p_2022.2.5.17121_offline.sh'
    }
  }
}

const urls = configs.linux.urls

async function restoreCache (components) {
  const useCache = core.getBooleanInput('cache')
  if (!useCache) return false

  for (const component of components) {
    const url = urls[component]
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

  const patterns = ['/opt/intel/oneapi/compiler/latest/linux/compiler/lib/ia32_lin',
    '/opt/intel/oneapi/compiler/latest/linux/bin/ia32',
    '/opt/intel/oneapi/compiler/latest/linux/lib/emu',
    '/opt/intel/oneapi/compiler/latest/linux/lib/oclfpga',
    '/opt/intel/oneapi/mkl/latest/lib/intel64/*.a']

  console.log('Pruning oneapi install')
  await exec.exec('du', ['-sh', '/opt/intel/oneapi'])
  for (const pattern of patterns) {
    console.log(`  pattern: ${pattern}`)
    for (const path of glob.globSync(pattern)) {
      console.log(`    path: ${path}`)
      await exec.exec('sudo', ['rm', '-r', path])
    }
  }
  await exec.exec('du', ['-sh', '/opt/intel/oneapi'])
}

async function install (component) {
  const url = urls[component]
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
  for (const component in urls) {
    console.log(`  ${component}: ${urls[component]}`)
  }
}

function updateEnv () {
  // setvars.sh does not set CMAKE_PREFIX_PATH for MKL. It relies on
  // root install that puts links in /usr/local/lib/cmake?
  const name = 'CMAKE_PREFIX_PATH'
  let val = '/opt/intel/oneapi/mkl/latest/lib/cmake/mkl'
  if (name in process.env) {
    val = val + ':' + process.env[name]
  }
  core.exportVariable(name, val)
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
