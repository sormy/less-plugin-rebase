var RebaseCssProcessor = require('./rebase-css-processor');

function LessPluginRebase(options) {
    this.options = options;
};

LessPluginRebase.prototype = {
    install: function(less, pluginManager) {
        pluginManager.addPostProcessor(new RebaseCssProcessor(this.options));
    },
    minVersion: [1, 0, 0]
};

module.exports = LessPluginRebase;
