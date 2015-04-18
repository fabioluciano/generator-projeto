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
                    that.listOfModules = that.avaliableModules;
                    that.listOfModules.shift();
                }
            });-

            that.argument('module', {
                required: false,
                type: String,
                desc: 'O módulo onde o filter residirá'
            });

            that.argument('name', {
                required: false,
                type: String,
                desc: 'O nome do filter'
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
                            message: "O filter deverá ser criado em qual módulo?",
                            choices: that.listOfModules
                        });
                    }

                    if (that.name === undefined || that.name.length < 3) {
                        questions.push({
                            type: 'input',
                            name: 'name',
                            message: 'Qual será o nome do filter?',
                            required: true,
                            validate: function(input) {
                                if(input.length < 3) {
                                    return 'O nome deve ter no mínimo 3 caracteres!'
                                }

                                if (input === undefined || input.length === 0) {
                                    return 'O nome deve ser definido';
                                }

                                return true;
                            }
                        });
                    }

                    if( ! that.options.skip) {
                        questions.push({
                            type: 'confirm',
                            name: 'confirm',
                            message : 'Confirma a criação?',
                            required: true,
                            default: true
                        });
                    }

                    that.prompt(questions, function (props) {
                        if('name' in props) {
                            that.name = that._.capitalize(props.name);
                        }

                        if('module' in props) {
                            that.module = props.module.toLowerCase();
                        }

                        that.confirm = props.confirm;

                        done();
                    }.bind(that));
                }
            });
        },

        writting: function() {
            var that            = this;

            that.name           = that._.capitalize(that.name);
            that.modulePart     = that.module.split('.').slice(-1).pop();
            that.modulePath     = directory.root + that.modulePart + '/';
            that.filterPath     = that.modulePath + directory.module.filter;

            if (that.confirm || that.options.skip) {
                filesystem.exists(that.moduleFile, function(exists) {
                    if (exists) {
                        if (that.confirm || that.options.skip) {

                            if(that.modulePart === 'application') {
                                that.modulePath = directory.root;
                            }

                            that.template('filter.js', that.filterPath + that.name + '.js');
                        }
                    } else {
                        console.log('O arquivo com a definição de módulos não existe! Abortando.');
                    }
                });
            }

            return false;
        }
    });
}());
