( function() {
    'use strict';

    var yeoman           = require('yeoman-generator'),
        applicationStructure  = require('../app/application-structure.js'),
        moduleStructure       = require('../app/angular-structure.js'),
        filesystem            = require('fs');

    module.exports = yeoman.generators.Base.extend({
        initializing: function () {
            var that = this;

            filesystem.readdir(applicationStructure.modules, (err, modules) => {
                that.avaliableModules = modules;
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

                if (that.module === undefined) {
                    questions.push({
                        type: "list",
                        name: "module",
                        message: "A constante residirá em que módulo?",
                        choices: that.avaliableModules
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
        },

        writting: function() {
            var that = this;

            that.name       = that.name.toUpperCase();
            that.filePath   = applicationStructure.modules + that.module + '/' + moduleStructure.constant;

            if (that.confirm) {
                that.template('constant.js', that.filePath + that.name.toLowerCase() + '-constant.js');
            }


            return false;
        }
    });
}());
