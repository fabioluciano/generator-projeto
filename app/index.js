(function () {
    'use strict';

    var yeoman    = require('yeoman-generator'),
        chalk     = require('chalk'),
        directory = require ('./directory.js');

    module.exports = yeoman.generators.Base.extend({
        initializing: function () {
            this.pkg = require('../package.json');
        },

        writing: {
            directory : function() {
                var that = this;

                // Criação dos diretórios básicos
                Object.keys(directory.source).forEach(function(key) {
                    if(that.mkdir(directory.source[key])) {
                        console.log('Criando diretório: ' + chalk.yellow(directory.source[key]));
                    }
                });

                if(that.mkdir(directory.angular.root)) {
                    console.log('Criando diretório: ' + chalk.yellow(directory.angular.root));
                }
            },
            application: function () {
                this.copy('_package.json', 'package.json');
                this.copy('_bower.json', 'bower.json');
                this.copy('_bowerrc', '.bowerrc');
                this.copy('_Gruntfile.js', 'Gruntfile.js');
                this.copy('angular/modules.json', directory.angular.root +  'modules.json');
            },

            projectfiles: function () {
                this.copy('editorconfig', '.editorconfig');
                this.copy('jshintrc', '.jshintrc');
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
