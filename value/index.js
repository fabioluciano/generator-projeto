( function() {
    'use strict';

    var yeoman           = require('yeoman-generator'),
        applicationStructure  = require('../app/application-structure.js'),
        moduleStructure  = require('../app/angular-structure.js'),
        filesystem       = require('fs');

    module.exports = yeoman.generators.Base.extend({
        initializing: function () {
          var that = this;
          filesystem.readdir(applicationStructure.modules, (err, modules) => {
              that.avaliableModules = modules;
          });

            that.argument('module', {
                required: false,
                type: String,
                desc: 'Módulo onde o value residirá'
            });

            that.argument('name', {
                required: false,
                type: String,
                desc: 'O nome do value'
            });

            that.argument('value', {
                required: false,
                type: String,
                desc: 'O valor da value'
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
                    message: "O value residirá em que módulo?",
                    choices: that.avaliableModules
                });
            }

            if (that.name === undefined || that.name.length < 3) {
                questions.push({
                    type: 'input',
                    name: 'name',
                    message: 'Qual será o nome do value?',
                    required: true,
                    validate: function(input) {

                        if (input.length < 3) {
                            return 'O nome da value deve ter no mínimo 3 caracteres!';
                        }

                        if (input === undefined || input.length === 0) {
                            return 'O nome da value deverá ser definido';
                        }

                        return true;
                    }
                });

                if(that.value === undefined || that.value.length < 3) {
                    questions.push({
                        type: 'input',
                        name: 'value',
                        message: 'Qual será o valor do value?',
                        required: true,
                        validate: function(input) {

                            if (input.length < 3) {
                                return 'O valor da value deve ter no mínimo 3 caracteres!';
                            }

                            if (input === undefined || input.length === 0) {
                                return 'O valor da value deverá ser definido';
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

            that.name       = that.name;
            that.filePath   = applicationStructure.modules + that.module + '/' + moduleStructure.value;

            if (that.confirm) {
                that.template('value.js', that.filePath + that.name.toLowerCase() + '-value.js');
            }

            return false;
        }
    });
}());
