var RebaseLessProcessor = require('./rebase-less-processor');

function LessPluginRebase(options) {
    this.options = options;
};

LessPluginRebase.prototype = {
    install: function(less, pluginManager) {
        pluginManager.addPostProcessor(new RebaseLessProcessor(this.options));
    },
    minVersion: [0, 0, 1]
};

module.exports = LessPluginRebase;