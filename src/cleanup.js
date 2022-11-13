const cache = require('@actions/cache')
const core = require('@actions/core')

async function saveCache () {
  const key = core.getState('key')
  console.log(`Saving install with key ${key}`)
  await cache.saveCache(['/opt/intel/oneapi'], key)
}

try {
  const cache = core.getInput('cache')
  if (cache) {
    saveCache()
  }
} catch (error) {
  core.setFailed(error.message)
}
