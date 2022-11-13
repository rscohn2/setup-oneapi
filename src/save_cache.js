const core = require('@actions/core')

function save_cache() {
    console.log(`Saving install`)
}

try {
    const cache = core.getInput('cache')
    if (cache) {
        save_cache()
    }
} catch (error) {
    core.setFailed(error.message);
}
