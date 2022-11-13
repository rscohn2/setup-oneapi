const core = require('@actions/core')

function saveCache () {
  const key = core.getState('key')
  console.log(`Saving install with key ${key}`)
}

try {
  const cache = core.getInput('cache')
  if (cache) {
    saveCache()
  }
} catch (error) {
  core.setFailed(error.message)
}
