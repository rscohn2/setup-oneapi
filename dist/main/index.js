/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 695:
/***/ ((module) => {

module.exports = eval("require")("@actions/cache");


/***/ }),

/***/ 272:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 163:
/***/ ((module) => {

module.exports = eval("require")("@actions/exec");


/***/ }),

/***/ 561:
/***/ ((module) => {

module.exports = eval("require")("@actions/io");


/***/ }),

/***/ 470:
/***/ ((module) => {

module.exports = eval("require")("@actions/tool-cache");


/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 282:
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const path = __nccwpck_require__(17)
const process = __nccwpck_require__(282)

const cache = __nccwpck_require__(695)
const core = __nccwpck_require__(272)
const exec = __nccwpck_require__(163)
const io = __nccwpck_require__(561)
const tc = __nccwpck_require__(470)

let key = 'v0'

const componentUrls = {
  ccl: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19135/l_oneapi_ccl_p_2021.8.0.25371_offline.sh',
  'ccl@2021.8.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19135/l_oneapi_ccl_p_2021.8.0.25371_offline.sh',
  'ccl@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19029/l_oneapi_ccl_p_2021.7.1.16948_offline.sh',

  dal: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19122/l_daal_oneapi_p_2023.0.0.25395_offline.sh',
  'dal@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19122/l_daal_oneapi_p_2023.0.0.25395_offline.sh',
  'dal@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19032/l_daal_oneapi_p_2021.7.1.16996_offline.sh',

  dnn: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19137/l_onednn_p_2023.0.0.25399_offline.sh',
  'dnn@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19137/l_onednn_p_2023.0.0.25399_offline.sh',
  'dnn@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19035/l_onednn_p_2022.2.1.16994_offline.sh',

  dpl: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19133/l_oneDPL_p_2022.0.0.25335_offline.sh',
  'dpl@2022.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19133/l_oneDPL_p_2022.0.0.25335_offline.sh',
  'dpl@2021.7.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19046/l_oneDPL_p_2021.7.2.15007_offline.sh',

  icx: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19123/l_dpcpp-cpp-compiler_p_2023.0.0.25393_offline.sh',
  'icx@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19123/l_dpcpp-cpp-compiler_p_2023.0.0.25393_offline.sh',
  'icx@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19030/l_dpcpp-cpp-compiler_p_2022.2.1.16991_offline.sh',

  ifx: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19105/l_fortran-compiler_p_2023.0.0.25394_offline.sh',
  'ifx@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19105/l_fortran-compiler_p_2023.0.0.25394_offline.sh',
  'ifx@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18998/l_fortran-compiler_p_2022.2.1.16992_offline.sh',

  impi: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19131/l_mpi_oneapi_p_2021.8.0.25329_offline.sh',
  'impi@2021.8.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19131/l_mpi_oneapi_p_2021.8.0.25329_offline.sh',
  'impi@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19010/l_mpi_oneapi_p_2021.7.1.16815_offline.sh',

  ipp: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19126/l_ipp_oneapi_p_2021.7.0.25396_offline.sh',
  'ipp@2021.7.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19126/l_ipp_oneapi_p_2021.7.0.25396_offline.sh',
  'ipp@2021.6.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19007/l_ipp_oneapi_p_2021.6.2.16995_offline.sh',

  ippcp: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19108/l_ippcp_oneapi_p_2021.6.3.25343_offline.sh',
  'ippcp@2021.6.3': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19108/l_ippcp_oneapi_p_2021.6.3.25343_offline.sh',
  'ippcp@2021.6.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18999/l_ippcp_oneapi_p_2021.6.2.15006_offline.sh',

  mkl: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19138/l_onemkl_p_2023.0.0.25398_offline.sh',
  'mkl@2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19138/l_onemkl_p_2023.0.0.25398_offline.sh',
  'mkl@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19038/l_onemkl_p_2022.2.1.16993_offline.sh',

  tbb: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19143/l_tbb_oneapi_p_2021.8.0.25334_offline.sh',
  'tbb@2021.8.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19143/l_tbb_oneapi_p_2021.8.0.25334_offline.sh',
  'tbb@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19041/l_tbb_oneapi_p_2021.7.1.15005_offline.sh',

  vpl: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19134/l_oneVPL_p_2023.0.0.25332_offline.sh',
  'vpl2023.0.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19134/l_oneVPL_p_2023.0.0.25332_offline.sh',
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

})();

module.exports = __webpack_exports__;
/******/ })()
;