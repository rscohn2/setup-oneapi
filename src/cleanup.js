const cache = require('@actions/cache')
const core = require('@actions/core')

async function saveCache () {
  const useCache = core.getInput('cache')
  const key = core.getState('key')

  if (!useCache || key === '') return

  console.log(`Saving install with key ${key}`)
  await cache.saveCache(['/opt/intel/oneapi'], key)
}

try {
  saveCache()
} catch (error) {
  core.setFailed(error.message)
}
