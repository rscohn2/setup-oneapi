const core = require('@actions/core');
const github = require('@actions/github');

packages = {
    'tbb': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19041/l_tbb_oneapi_p_2021.7.1.15005_offline.sh',
    'dpl': 'https://registrationcenter-download.intel.com/akdlm/irc_nas/19046/l_oneDPL_p_2021.7.2.15007_offline.sh'
}

function install(component) {
    console.log(`Installing ${component} from ${packages[component]}`)
}

function install_list(components) {
    console.log(`Installing ${components}`)
    for (const component of components) {
        install(component)
    }
}

try {
    install_list(core.getMultilineInput('components'));
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
} catch (error) {
    core.setFailed(error.message);
}
