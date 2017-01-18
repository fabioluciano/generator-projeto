'use strict';
var yeoman     = require('yeoman-generator'),
    applicationStructure  = require('../app/application-structure.js');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
      this.template('application.js', applicationStructure.application + 'application.js');
      this.composeWith('projeto:module', {
          args: ['poc'],
          options : { 'skip' : true }
      });
    }
});
