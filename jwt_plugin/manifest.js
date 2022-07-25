module.exports = {
	version: '0.0.1',
	init : pluginContext => {
		pluginContext.registerPolicy(require('./policies/jwt_verify'))
	},
	policies: ['jwt_verify'],
	schema: {
		"$id": "jwt_plugin_manifest",
		baseUrl: {
	      	title: 'Base Url',
	      	description: 'the base url to initialize',
	      	type: 'string',
	      	required: true
	    },
	    maxRequestsPerSecond: {
	      	title: 'Max Requests per second',
	      	description: 'the max rps value',
	      	type: 'number'
	    }
	}
}