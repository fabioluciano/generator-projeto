'use strict';
var yeoman     = require('yeoman-generator'),
    directory  = require('../app/directory.js').angular;

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.composeWith('projeto:module', {
            args: ['aplication', 'common'],
            options : { 'skip' : true }
        });
    }
});
