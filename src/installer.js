const path = require('path')
const os = require('os')
const core = require('@actions/core')
const tc = require('@actions/tool-cache')

const osPlat = os.platform()
const osArch = os.arch()

const version = '1.0.1'

export async function install () {
	const downloadUrl = `https://github.com/deploys-app/deploys/releases/download/v${version}/${getFilename(version)}`
	core.info(`Downloading ${downloadUrl}...`)
	const downloadedPath = await tc.downloadTool(downloadUrl)
	core.debug(`Downloaded to ${downloadedPath}`)

	core.info('Extracting Deploys CLI...')
	const extPath = await tc.extractTar(downloadedPath)
	core.debug(`Extracted to ${extPath}`)

	const cachePath = await tc.cacheDir(extPath, 'deploys-action', version)
	core.debug(`Cached to ${cachePath}`)

	const exePath = path.join(cachePath, 'deploys')
	core.debug(`Exe path is ${exePath}`)

	return exePath
}

function getFilename (version) {
	const platform = 'linux'
	const arch = 'amd64'
	const ext = 'tar.gz'
	return `deploys_${version}_${platform}_${arch}.${ext}`
}
