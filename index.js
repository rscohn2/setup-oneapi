const core = require('@actions/core');
const github = require('@actions/github');
const tc = require('@actions/tool-cache');
const exec = require('@actions/exec');
const io = require('@actions/io');

component_urls = {
    'tbb': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19041/l_tbb_oneapi_p_2021.7.1.15005_offline.sh',
    'dpl': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19046/l_oneDPL_p_2021.7.2.15007_offline.sh'
}

async function install(component) {
    const url = component_urls[component]
    console.log(`Installing ${component} from ${url}`)
    const installer_path = await tc.downloadTool(url)
    await exec.exec('sudo', ['bash', installer_path, '-s', '-a', '-s', '--action', 'install', '--eula', 'accept'])
    await io.rmRF(installer_path)
}

async function install_list(components) {
    console.log(`Installing ${components}`)
    for (const component of components) {
        await install(component)
    }
}

try {
    install_list(core.getMultilineInput('components'));
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
} catch (error) {
    core.setFailed(error.message);
}
