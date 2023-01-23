const os = require('os');
const path = require('path')
const process = require('process')

const cache = require('@actions/cache')
const core = require('@actions/core')
const exec = require('@actions/exec')
const github = require('@actions/github')
const io = require('@actions/io')
const tc = require('@actions/tool-cache')
const {isFeatureAvailable, ValidationError} = require("@actions/cache");


let key = 'v0'

const componentUrls = {
    linux: {
        ccl: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19029/l_oneapi_ccl_p_2021.7.1.16948_offline.sh',
        "ccl@2021.7.1": 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19029/l_oneapi_ccl_p_2021.7.1.16948_offline.sh',

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
        'ifx@2022.2.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18909/l_fortran-compiler_p_2022.2.0.8773_offline.sh',
        'ifx@2022.1.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18703/l_fortran-compiler_p_2022.1.0.134_offline.sh',
        'ifx@2022.0.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18481/l_fortran-compiler_p_2022.0.2.83_offline.sh',
        'ifx@2022.0.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18436/l_fortran-compiler_p_2022.0.1.70_offline.sh',
        'ifx@2021.4.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18210/l_fortran-compiler_p_2021.4.0.3224_offline.sh',
        'ifx@2021.3.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/17959/l_fortran-compiler_p_2021.3.0.3168_offline.sh',
        'ifx@2021.2.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/17756/l_fortran-compiler_p_2021.2.0.136_offline.sh',
        'ifx@2021.1.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/17508/l_fortran-compiler_p_2021.1.2.62_offline.sh',

        impi: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19010/l_mpi_oneapi_p_2021.7.1.16815_offline.sh',
        'impi@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19010/l_mpi_oneapi_p_2021.7.1.16815_offline.sh',

        ipp: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19007/l_ipp_oneapi_p_2021.6.2.16995_offline.sh',
        'ipp@2021.6.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19007/l_ipp_oneapi_p_2021.6.2.16995_offline.sh',

        ippcp: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18999/l_ippcp_oneapi_p_2021.6.2.15006_offline.sh',
        'ippcp@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19049/l_dpcpp-cpp-compiler_p_2022.2.1.16991_offline.sh',
        'ippcp@2022.2.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18849/l_dpcpp-cpp-compiler_p_2022.2.0.8772_offline.sh',
        'ippcp@2022.1.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18717/l_dpcpp-cpp-compiler_p_2022.1.0.137_offline.sh',
        'ippcp@2022.0.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18478/l_dpcpp-cpp-compiler_p_2022.0.2.84_offline.sh',
        'ippcp@2022.0.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18435/l_dpcpp-cpp-compiler_p_2022.0.1.71_offline.sh',
        'ippcp@2021.4.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18209/l_dpcpp-cpp-compiler_p_2021.4.0.3201_offline.sh',
        'ippcp@2021.3.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/17928/l_dpcpp-cpp-compiler_p_2021.3.0.3168_offline.sh',
        'ippcp@2021.6.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18999/l_ippcp_oneapi_p_2021.6.2.15006_offline.sh',
        'ippcp@2021.2.0': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/17749/l_dpcpp-cpp-compiler_p_2021.2.0.118_offline.sh',
        'ippcp@2021.1.2': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/17513/l_dpcpp-cpp-compiler_p_2021.1.2.63_offline.sh',

        mkl: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19035/l_onednn_p_2022.2.1.16994_offline.sh',
        'mkl@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19035/l_onednn_p_2022.2.1.16994_offline.sh',

        tbb: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19041/l_tbb_oneapi_p_2021.7.1.15005_offline.sh',
        'tbb@2021.7.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19041/l_tbb_oneapi_p_2021.7.1.15005_offline.sh',

        vpl: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19044/l_oneVPL_p_2022.2.5.17121_offline.sh',
        'vpl@2022.2.5': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19044/l_oneVPL_p_2022.2.5.17121_offline.sh'
    },
    mac: {
        ifx: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18997/m_fortran-compiler-classic_p_2022.2.1.16314.dmg',
        'ifx@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18997/m_fortran-compiler-classic_p_2022.2.1.16314.dmg',

        ippcp: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18988/m_cpp-compiler-classic_p_2022.2.1.16313_offline.dmg',
        'ippcp@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18988/m_cpp-compiler-classic_p_2022.2.1.16313_offline.dmg'
    },
    windows: {
        ifx: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/18996/w_fortran-compiler_p_2022.2.1.19749.exe',
        'ifx@2022.2.1': "https://registrationcenter-download.intel.com/akdlm/irc_nas/18996/w_fortran-compiler_p_2022.2.1.19749.exe",

        ippcp: 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19031/w_dpcpp-cpp-compiler_p_2022.2.1.19748.exe',
        'ippcp@2022.2.1': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19031/w_dpcpp-cpp-compiler_p_2022.2.1.19748.exe'
    }
}

function getPlatform() {
    platform = os.platform()
    if (platform === 'linux')
        return 'linux'
    else if (platform === 'darwin')
        return 'mac'
    else
        return 'windows'
}

async function restoreCache(installPath, components) {
    for (const component of components) {
        const url = componentUrls[component.component]
        if (!url) {
            core.setFailed(`Unknown component: ${component.component}`)
            return false
        }
        key = key + ':' + path.parse(url).base
    }

    console.log(`Restoring from cache (key: ${key}, path: ${installPath})`)

    // todo still need to hide GNU tar on Windows?
    const restoreKey = await cache.restoreCache([installPath], key)
    // todo restore GNU tar if needed

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

async function prune(installPath, components) {
    const platform = getPlatform()

    // todo support macOS/Windows and custom install location
    //  how to support custom install lcn on Windows?
    //  may be hidden dependency on a path somewhere?
    //  https://github.com/modflowpy/install-intelfortran-action#install-location

    let dirs = []
    if (platform === 'linux')
        dirs.concat([
            `/opt/intel/oneapi/compiler/latest/linux/compiler/lib/ia32_lin`,
            `/opt/intel/oneapi/compiler/latest/linux/bin/ia32`,
            `/opt/intel/oneapi/compiler/latest/linux/lib/emu`,
            `/opt/intel/oneapi/compiler/latest/linux/lib/oclfpga`
        ])

    // todo prune locations for other platforms and components?

    console.log('Pruning oneapi install')

    await exec.exec('du', ['-sh', installPath])
    await exec.exec('sudo', ['rm', '-rf'].concat(dirs))  // need root permission
    await exec.exec('du', ['-sh', installPath])
}

async function install(installPath, component) {
    // todo get current OS and select from componentUrls
    const url = componentUrls['Linux'][component.component]
    console.log(`Installing ${component.component} from ${url}`)
    const installerPath = await tc.downloadTool(url)
    // todo set install path
    await exec.exec('sudo', ['bash', installerPath, '-s', '-a', '-s', '--action', 'install', '--eula', 'accept'])
    // todo need to use pwsh or cmd to support windows install?
    await io.rmRF(installerPath)
    await prune()
    // todo missing libimf.so workaround https://github.com/modflowpy/install-intelfortran-action/blob/main/action.yml#L140
    // todo set environment variables and run setvars scripts, if enabled
    // todo hide GNU linker on Windows so MSVC is found
}

async function installList(installPath, components) {
    for (const component of components) {
        console.log(`Installing component: ${component}`)
        await install(installPath, component)
    }
}

function list(verbose) {
    let components = [];
    if (verbose)
        console.log('Available components:')

    for (let platform in componentUrls) {
        for (let component in platform) {
            if (verbose)
                console.log(`  ${platform} ${component}: ${platform[component]}`)
            components.push({
                platform: platform,
                component: component,
                version: platform[component]
            })
        }
    }

    return components
}

function setVars(installPath, components) {
    const platform = getPlatform()
    // is it safe to assume top-level setvars scripts will always exist?
    const script = platform === 'windows'
        ? path.join(installPath, 'setvars-vcvarsall.bat')
        : path.join(installPath, 'setvars.sh')
    console.log(`Running environment init script: ${script}`)
    exec.exec(script).then(exitCode => {
        if (exitCode !== 0)
            core.setFailed(`Failed to run environment init script: ${script}`)
    })

    for (let component in components) {
        // todo component-specific setvars scripts?
    }
}

function setPath(installPath, components) {
    const platform = getPlatform()
    for (const component in components) {
        if (component.component.includes('compiler')) {
            const compilerBin = path.join(installPath, 'latest', 'latest', platform, 'bin', 'intel64')
            console.log(`Adding compiler bin dir to PATH: ${compilerBin}`)
            core.addPath(compilerBin)
        }
        // todo other component-specific paths?
    }
}

async function run() {
    try {
        const cache = core.getBooleanInput('cache')
        const components = core.getMultilineInput('components')
        const installPath = getPlatform() === 'windows'
            ? core.toWin32Path(core.getInput('path'))
            : core.toPosixPath(core.getInput('path'))
        const prune = core.getBooleanInput('prune')
        const setvars = core.getBooleanInput('setvars')
        const listComponents = core.getBooleanInput('list')

        if (await restoreCache(installPath, components))
            return

        await installList(installPath, components)
    } catch (error) {
        key = ''
        core.setFailed(error.message)
    }
    core.saveState('key', key)
}

run()
