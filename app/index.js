(function () {
    'use strict';

    var yeoman    = require('yeoman-generator'),
        chalk     = require('chalk'),
        applicationStruture = require ('./application-structure.js'),
        moduleStructure = require ('./angular-structure.js');

    module.exports = yeoman.generators.Base.extend({
        initializing: function () {
            this.pkg = require('../package.json');
        },

        writing: {
            directory : function() {
                var that = this;

                Object.keys(applicationStruture).forEach(function(key) {
                    if(that.mkdir(applicationStruture[key])) {
                        console.log('Criando diretório: ' + chalk.yellow(applicationStruture[key]));
                    }
                });
            },
            application: function () {
                this.copy('_package.json', 'package.json');
                this.copy('_bower.json', 'bower.json');
                this.copy('_gitignore', '.gitignore');
                this.copy('_gulpfile.js', 'gulpfile.js');
                this.copy('_jshintrc', '.jshintrc');
                this.copy('_npmrc', '.npmrc');
                this.copy('_package.json', 'package.json');
                this.copy('_pug-lintrc', '.pug-lintrc');
            }
        },
        install: function () {
            this.composeWith('projeto:common');
            this.installDependencies({
                skipInstall: this.options['skip-install']
            });
        },
    });
}());
