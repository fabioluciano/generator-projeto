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
            });

            that.argument('module', {
                required: false,
                type: String,
                desc: 'Módulo onde a constante residirá'
            });

            that.argument('name', {
                required: false,
                type: String,
                desc: 'O nome da constante'
            });

            that.argument('value', {
                required: false,
                type: String,
                desc: 'O valor da constante'
            });

            that.option('skip');
        },

        prompting : function() {
            var questions = [],
                that      = this,
                done      = that.async();

            filesystem.exists(that.moduleFile, function(exists) {
                if (exists) {
                    if (that.module === undefined) {
                        questions.push({
                            type: "list",
                            name: "module",
                            message: "A constante residirá em que módulo?",
                            choices: that.listOfModules
                        });
                    }

                    if (that.name === undefined || that.name.length < 3) {
                        questions.push({
                            type: 'input',
                            name: 'name',
                            message: 'Qual será o nome da constante?',
                            required: true,
                            validate: function(input) {
                                if (input.length < 3) {
                                    return 'O nome da constante deve ter no mínimo 3 caracteres!';
                                }

                                if (input === undefined || input.length === 0) {
                                    return 'O nome da constante deverá ser definido';
                                }

                                return true;
                            }
                        });

                        if(that.value === undefined || that.value.length < 3) {
                            questions.push({
                                type: 'input',
                                name: 'value',
                                message: 'Qual será o valor do constant?',
                                required: true,
                                validate: function(input) {

                                    if (input.length < 3) {
                                        return 'O valor da constant deve ter no mínimo 3 caracteres!';
                                    }

                                    if (input === undefined || input.length === 0) {
                                        return 'O valor da constant deverá ser definido';
                                    }

                                    return true;
                                }
                            });
                        }
                    }

                    if ( ! that.options.skip) {
                        questions.push({
                            type: 'confirm',
                            name: 'confirm',
                            message : 'Confirma a criação?',
                            required: true,
                            default: true
                        });
                    }
                }

                that.prompt(questions, function (props) {
                    if ('module' in props) {
                        that.module = props.module.toLowerCase();
                    }

                    if ('name' in props) {
                        that.name = props.name.toLowerCase();
                    }

                    if ('value'  in props) {
                        that.value = props.value;
                    }

                    that.confirm = props.confirm;

                    done();
                }.bind(that));
            });
        },

        writting: function() {
            var moduleFile      = directory.root + 'modules.json',
                that            = this;

            that.name       = that.name.toUpperCase();
            that.modulePart = that.module.split('.').slice(-1).pop();
            that.modulePath = directory.root + that.modulePart + '/';
            that.filePath   = that.modulePath + directory.module.constant;

            console.log(that.filePath);

            filesystem.exists(moduleFile, function(exists) {
                if (exists) {
                    if(that.modulePart === 'application') {
                        that.modulePath = directory.root;
                    }

                    if (that.confirm) {
                        that.template('constant.js', that.filePath + that.name.toLowerCase() + '.js');
                    }
                } else {
                    console.log('O arquivo com a definição de módulos não existe! Abortando.');
                }
            });

            return false;
        }
    });
}());
