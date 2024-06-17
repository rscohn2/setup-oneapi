const cache = require('@actions/cache')
const core = require('@actions/core')
const path = require('path')

function oneapiPrefix () {
  // Tool cache persists between jobs
  return path.join(process.env.RUNNER_TOOL_CACHE, 'setup-oneapi')
}

async function saveCache () {
  const useCache = core.getInput('cache')
  const key = core.getState('key')

  if (!useCache || key === '') return

  console.log(`Saving install with key ${key}`)
  await cache.saveCache([oneapiPrefix()], key)
}

try {
  saveCache()
} catch (error) {
  core.setFailed(error.message)
}
