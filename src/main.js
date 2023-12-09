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
      ccl: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/07958f2f-8d95-422d-8c18-a4c7352b005c/l_oneapi_ccl_p_2021.11.1.9_offline.sh',
      'ccl@2021.11.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/07958f2f-8d95-422d-8c18-a4c7352b005c/l_oneapi_ccl_p_2021.11.1.9_offline.sh',
      'ccl@2021.10.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/3230823d-f799-4d1f-8ef3-a17f086a7719/l_oneapi_ccl_p_2021.10.0.49084_offline.sh',
      'ccl@2021.9.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/44e093fc-663b-4ae5-9c08-24a55211aca3/l_oneapi_ccl_p_2021.9.0.43543_offline.sh',
      'ccl@2021.8.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19135/l_oneapi_ccl_p_2021.8.0.25371_offline.sh',
      'ccl@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19029/l_oneapi_ccl_p_2021.7.1.16948_offline.sh',

      dal: 'https://registrationcenter-download.intel.com/akdlm//IRC_NAS/37364086-b3cd-4a54-8736-7893732c1a86/l_daal_oneapi_p_2024.0.0.49569_offline.sh',
      'dal@2024.0.0': 'https://registrationcenter-download.intel.com/akdlm//IRC_NAS/37364086-b3cd-4a54-8736-7893732c1a86/l_daal_oneapi_p_2024.0.0.49569_offline.sh',
      'dal@2023.2.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/fa218373-4b06-451f-8f4c-66b7d14b8e8b/l_daal_oneapi_p_2023.2.0.49574_offline.sh',
      'dal@2023.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/c209d29f-3d06-45fb-8f04-7b2f47b93a7c/l_daal_oneapi_p_2023.1.0.46349_offline.sh',
      'dal@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19122/l_daal_oneapi_p_2023.0.0.25395_offline.sh',
      'dal@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19032/l_daal_oneapi_p_2021.7.1.16996_offline.sh',

      dnn: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/dc309221-d210-4f3a-9406-d897df8deab8/l_onednn_p_2024.0.0.49548_offline.sh',
      'dnn@2024.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/dc309221-d210-4f3a-9406-d897df8deab8/l_onednn_p_2024.0.0.49548_offline.sh',
      'dnn@2023.2.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/2d218b97-0175-4f8c-8dba-b528cec24d55/l_onednn_p_2023.2.0.49517_offline.sh',
      'dnn@2023.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/df0fd85e-f52a-437a-8d49-be12b560607c/l_onednn_p_2023.1.0.46343_offline.sh',
      'dnn@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19137/l_onednn_p_2023.0.0.25399_offline.sh',
      'dnn@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19035/l_onednn_p_2022.2.1.16994_offline.sh',

      dpl: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/be027095-148a-4433-aff4-c6e8582da3ca/l_oneDPL_p_2022.3.0.49386_offline.sh',
      'dpl@2022.3.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/be027095-148a-4433-aff4-c6e8582da3ca/l_oneDPL_p_2022.3.0.49386_offline.sh',
      'dpl@2022.2.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/44f88a97-7526-48f0-8515-9bf1356eb7bb/l_oneDPL_p_2022.2.0.49287_offline.sh',
      'dpl@2022.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/64075e93-4134-4d18-8941-827b71b7d8b9/l_oneDPL_p_2022.1.0.43490_offline.sh',
      'dpl@2022.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19133/l_oneDPL_p_2022.0.0.25335_offline.sh',
      'dpl@2021.7.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19046/l_oneDPL_p_2021.7.2.15007_offline.sh',

      icx: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/5c8e686a-16a7-4866-b585-9cf09e97ef36/l_dpcpp-cpp-compiler_p_2024.0.0.49524_offline.sh',
      'icx@2024.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/5c8e686a-16a7-4866-b585-9cf09e97ef36/l_dpcpp-cpp-compiler_p_2024.0.0.49524_offline.sh',
      'icx@2023.2.1': 'https://registrationcenter-download.intel.com/akdlm//IRC_NAS/ebf5d9aa-17a7-46a4-b5df-ace004227c0e/l_dpcpp-cpp-compiler_p_2023.2.1.8_offline.sh',
      'icx@2023.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/89283df8-c667-47b0-b7e1-c4573e37bd3e/l_dpcpp-cpp-compiler_p_2023.1.0.46347_offline.sh',
      'icx@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19123/l_dpcpp-cpp-compiler_p_2023.0.0.25393_offline.sh',
      'icx@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19030/l_dpcpp-cpp-compiler_p_2022.2.1.16991_offline.sh',

      ifx: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/89b0fcf9-5c00-448a-93a1-5ee4078e008e/l_fortran-compiler_p_2024.0.0.49493_offline.sh',
      'ifx@2024.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/89b0fcf9-5c00-448a-93a1-5ee4078e008e/l_fortran-compiler_p_2024.0.0.49493_offline.sh',
      'ifx@2023.2.1': 'https://registrationcenter-download.intel.com/akdlm//IRC_NAS/0d65c8d4-f245-4756-80c4-6712b43cf835/l_fortran-compiler_p_2023.2.1.8_offline.sh',
      'ifx@2023.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/150e0430-63df-48a0-8469-ecebff0a1858/l_fortran-compiler_p_2023.1.0.46348_offline.sh',
      'ifx@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19105/l_fortran-compiler_p_2023.0.0.25394_offline.sh',
      'ifx@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18998/l_fortran-compiler_p_2022.2.1.16992_offline.sh',

      impi: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/2c45ede0-623c-4c8e-9e09-bed27d70fa33/l_mpi_oneapi_p_2021.11.0.49513_offline.sh',
      'impi@2021.11.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/2c45ede0-623c-4c8e-9e09-bed27d70fa33/l_mpi_oneapi_p_2021.11.0.49513_offline.sh',
      'impi@2021.10.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/4f5871da-0533-4f62-b563-905edfb2e9b7/l_mpi_oneapi_p_2021.10.0.49374_offline.sh',
      'impi@2021.9.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/718d6f8f-2546-4b36-b97b-bc58d5482ebf/l_mpi_oneapi_p_2021.9.0.43482_offline.sh',
      'impi@2021.8.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19131/l_mpi_oneapi_p_2021.8.0.25329_offline.sh',
      'impi@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19010/l_mpi_oneapi_p_2021.7.1.16815_offline.sh',

      ipp: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/2d48c7d9-e716-4c73-8fe5-77a9599a405f/l_ipp_oneapi_p_2021.10.0.670_offline.sh',
      'ipp@2021.10.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/2d48c7d9-e716-4c73-8fe5-77a9599a405f/l_ipp_oneapi_p_2021.10.0.670_offline.sh',
      'ipp@2021.9.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/616a3fba-4ab6-4317-a17b-2be4b737fc37/l_ipp_oneapi_p_2021.9.0.49454_offline.sh',
      'ipp@2021.8.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/732392fa-41b3-4a92-935e-6a2b823162a7/l_ipp_oneapi_p_2021.8.0.46345_offline.sh',
      'ipp@2021.7.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19126/l_ipp_oneapi_p_2021.7.0.25396_offline.sh',
      'ipp@2021.6.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19007/l_ipp_oneapi_p_2021.6.2.16995_offline.sh',

      ippcp: 'https://registrationcenter-download.intel.com/akdlm//IRC_NAS/76c4c136-5016-4a9e-8914-b164de007173/l_ippcp_oneapi_p_2021.9.1.9_offline.sh',
      'ippcp@2021.9.1': 'https://registrationcenter-download.intel.com/akdlm//IRC_NAS/76c4c136-5016-4a9e-8914-b164de007173/l_ippcp_oneapi_p_2021.9.1.9_offline.sh',
      'ippcp@2021.8.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/f488397a-bd8f-449f-9127-04de8426aa35/l_ippcp_oneapi_p_2021.8.0.49493_offline.sh',
      'ippcp@2021.7.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/3697d9d0-907f-40d4-a2a7-7d83c45b72cb/l_ippcp_oneapi_p_2021.7.0.43492_offline.sh',
      'ippcp@2021.6.3': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19108/l_ippcp_oneapi_p_2021.6.3.25343_offline.sh',
      'ippcp@2021.6.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18999/l_ippcp_oneapi_p_2021.6.2.15006_offline.sh',

      mkl: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/86d6a4c1-c998-4c6b-9fff-ca004e9f7455/l_onemkl_p_2024.0.0.49673_offline.sh',
      'mkl@2024.0.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/86d6a4c1-c998-4c6b-9fff-ca004e9f7455/l_onemkl_p_2024.0.0.49673_offline.sh',
      'mkl@2023.2.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/adb8a02c-4ee7-4882-97d6-a524150da358/l_onemkl_p_2023.2.0.49497_offline.sh',
      'mkl@2023.1.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/cd17b7fe-500e-4305-a89b-bd5b42bfd9f8/l_onemkl_p_2023.1.0.46342_offline.sh',
      'mkl@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19138/l_onemkl_p_2023.0.0.25398_offline.sh',
      'mkl@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19038/l_onemkl_p_2022.2.1.16993_offline.sh',

      tbb: 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/af3ad519-4c87-4534-87cb-5c7bda12754e/l_tbb_oneapi_p_2021.11.0.49527_offline.sh',
      'tbb@2021.11.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/af3ad519-4c87-4534-87cb-5c7bda12754e/l_tbb_oneapi_p_2021.11.0.49527_offline.sh',
      'tbb@2021.10.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/c95cd995-586b-4688-b7e8-2d4485a1b5bf/l_tbb_oneapi_p_2021.10.0.49543_offline.sh',
      'tbb@2021.9.0': 'https://registrationcenter-download.intel.com/akdlm/IRC_NAS/7dcd261b-12fa-418a-b61b-b3dd4d597466/l_tbb_oneapi_p_2021.9.0.43484_offline.sh',
      'tbb@2021.8.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19143/l_tbb_oneapi_p_2021.8.0.25334_offline.sh',
      'tbb@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19041/l_tbb_oneapi_p_2021.7.1.15005_offline.sh'
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

  const patterns = ['/opt/intel/oneapi/compiler/latest/opt/oclfpga',
    '/opt/intel/oneapi/mkl/latest/lib/*.a']

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
