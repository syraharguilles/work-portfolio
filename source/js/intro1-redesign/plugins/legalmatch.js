const $ = require('jquery');

legalmatchPlugin.PLUGINS = {
	location: require('./location'),
	locationBem: require('./location-bem')
};

function legalmatchPlugin(component, options) {

	var plugin = legalmatchPlugin.PLUGINS[component];

	if(plugin) {
		return plugin.call(this, options);
	}

	throw new Error('Legalmatch Plugin Not Found');

}

module.exports = $.fn.legalmatch = legalmatchPlugin;
