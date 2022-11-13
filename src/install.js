const path = require('path')

const core = require('@actions/core')
const tc = require('@actions/tool-cache')
const exec = require('@actions/exec')
const io = require('@actions/io')

component_urls = {
    'tbb': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19041/l_tbb_oneapi_p_2021.7.1.15005_offline.sh',
    'dpl': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19046/l_oneDPL_p_2021.7.2.15007_offline.sh'
}

function restore_cache() {
    const cache = core.getInput('cache')
    if (!cache)
        return false
    console.log(`Restoring from cache`)
    console.log(`Cache restore failed`)
    return false
}

async function install(component) {
    const url = component_urls[component]
    console.log(`Installing ${component} from ${url}`)
    const installer_path = await tc.downloadTool(url)
    await exec.exec('sudo', ['bash', installer_path, '-s', '-a', '-s', '--action', 'install', '--eula', 'accept'])
    await io.rmRF(installer_path)
    return path.parse(installer_path).base
}

async function install_list(components) {
    console.log(`Installing ${components}`)

    key = ''
    for (const component of components) {
        key = key + ':' + await install(component)
    }
    key = key.substring(1);
    console.log(`Key ${key}`)
}

function run() {
    try {
        if (restore_cache()) {
            return
        }
        install_list(core.getMultilineInput('components'));
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()


