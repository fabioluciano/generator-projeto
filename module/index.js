( function() {
    'use strict';

    var yeoman     = require('yeoman-generator'),
        directory  = require('../app/directory.js').angular,
        filesystem = require('fs');

    module.exports = yeoman.generators.Base.extend({
        initializing: function () {
            var that = this;
                that.moduleFile = directory.root + 'modules.json';

            filesystem.exists(that.moduleFile, function(exists) {
                if (exists) {
                    that.avaliableModules = that.dest.readJSON(that.moduleFile);
                } else {
                    console.log('O arquivo com a definição de módulos não existe! Abortando.');
                }
            });

            that.argument('module', {
                required: false,
                type: String,
                desc: 'O nome do módulo pai'
            });

            that.argument('name', {
                required: false,
                type: String,
                desc: 'O nome do módulo'
            });

            that.option('skip');
        },

        prompting : function() {
            var questions  = [],
                that       = this,
                done       = that.async();

            filesystem.exists(that.moduleFile, function(exists) {
                if (exists) {
                    if(that.module === undefined) {
                        questions.push({
                            type: "list",
                            name: "module",
                            message: "O submódulo será criado abaixo de que módulo?",
                            choices: that.avaliableModules
                        });
                    }


                    if (that.name === undefined || that.name.length < 3) {
                        questions.push({
                            type: 'input',
                            name: 'name',
                            message: 'Qual será o nome do módulo?',
                            required: true,
                            validate: function(input) {
                                if (input.length < 3) {
                                    return 'O nome do módulo deve ter no mínimo 3 caracteres!';
                                }

                                if (input === undefined || input.length === 0) {
                                    return 'O nome do módulo deverá ser definido';
                                }

                                return true;
                            }
                        });
                    }

                    if( ! that.options.skip) {
                        questions.push({
                            type: 'confirm',
                            name: 'confirmCreation',
                            message : 'Confirma a criação do módulo?',
                            required: true,
                            default: true
                        });
                    }

                } else {
                    console.log('O arquivo com as definições de módulos não está presente!');
                    done(false);
                }

                that.prompt(questions, function (props) {

                    if('name' in props) {
                        that.name = props.name.toLowerCase();
                    }

                    if('module' in props) {
                        that.module = props.module.toLowerCase();
                    }

                    that.confirmCreation = props.confirmCreation;

                    done();
                }.bind(that));
            });
        },

        writting: function() {
            var that       = this,
                done       = this.async,
                modulePath = directory.root + this.name + '/';

            filesystem.exists(that.moduleFile, function(exists) {
                if (exists) {

                    if (that.confirmCreation || that.options.skip) {
                        that.moduleNode = that.module + '.' + that.name;

                        filesystem.exists(that.moduleFile, function(exists) {
                            if (exists) {
                                that.mkdir(modulePath);

                                if(that.template('application.js', (modulePath + 'application.js'))) {
                                    that.avaliableModules.push(that.moduleNode);
                                    that.fs.writeJSON(directory.root + 'modules.json', that.avaliableModules);
                                }

                                Object.keys(directory.module).forEach(function(folder) {
                                    var folder = directory.module[folder];
                                        that.mkdir(modulePath + folder);
                                });
                            } else {
                                console.log('O módulo ' +  that.name + ' já existe!');
                                done(false);
                            }
                        });
                    }
                } else {
                    console.log('O arquivo com a definição de módulos não existe! Abortando.');
                }
            });

            return false;
        }
    });
}());
