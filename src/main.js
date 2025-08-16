const core = require('@actions/core')
const exec = require('@actions/exec')
const installer = require('./installer')

const version = '1.0.6'

async function run () {
	try {
		const inputs = {
			project: core.getInput('project'),
			location: core.getInput('location'),
			name: core.getInput('name'),
			image: core.getInput('image'),
			port: core.getInput('port'),
			type: core.getInput('type'),
			minReplicas: core.getInput('minReplicas'),
			maxReplicas: core.getInput('maxReplicas')
		}
        const env = {
            version: process.env.DEPLOYS_CLI_VERSION || version,
        }

		const deploys = await installer.install(env.version)
		core.info('Deploys CLI installed sucessfully')

		core.info('Deploying...')

		let cmd = `${deploys} deployment deploy`
		cmd += ` -location=${inputs.location}`
		cmd += ` -project=${inputs.project}`
		cmd += ` -name=${inputs.name}`
		cmd += ` -image=${inputs.image}`
		if (!!inputs.port) cmd += ` -port=${inputs.port}`
		if (!!inputs.type) cmd += ` -type=${inputs.type}`
		if (!!inputs.minReplicas) cmd += ` -minReplicas=${inputs.minReplicas}`
		if (!!inputs.maxReplicas) cmd += ` -maxReplicas=${inputs.maxReplicas}`

		await exec.exec(cmd)
	} catch (error) {
		core.setFailed(error.message)
	}
}

run()
