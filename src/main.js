const core = require('@actions/core')
const exec = require('@actions/exec')
const installer = require('./installer')

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

		const deploys = await installer.install()
		core.info('Deploys CLI installed sucessfully')

		core.info('Deploying...')

		let cmd = `${deploys} deployment deploy`
		cmd += ` -location=${inputs.location}`
		cmd += ` -project=${inputs.project}`
		cmd += ` -name=${inputs.name}`
		cmd += ` -image=${inputs.image}`
		if (!!inputs.port) cmd += ` -port=${port}`
		if (!!inputs.type) cmd += ` -type=${type}`
		if (!!inputs.minReplicas) cmd += ` -minReplicas=${inputs.minReplicas}`
		if (!!inputs.maxReplicas) cmd += ` -maxReplicas=${inputs.maxReplicas}`

		await exec.exec(cmd)
	} catch (error) {
		core.setFailed(error.message)
	}
}

run()
