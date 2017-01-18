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
                desc: 'O módulo onde a view residirá'
            });

            that.argument('name', {
                required: false,
                type: String,
                desc: 'O nome da view'
            });

            that.option('skip');
        },

        prompting : function() {
            var questions  = [],
                that       = this,
                done       = that.async();

            if(that.module === undefined) {
                questions.push({
                    type: "list",
                    name: "module",
                    message: "A view deverá ser criado em qual módulo?",
                    choices: that.avaliableModules
                });
            }

            if (that.name === undefined || that.name.length < 3) {
                questions.push({
                    type: 'input',
                    name: 'name',
                    message: 'Qual será o nome da view?',
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
        },

        writting: function() {
            var that = this;

            that.name       = that.name;
            that.filePath   = applicationStructure.modules + that.module + '/' + moduleStructure.view;

            if (that.confirm) {
                that.template('template.pug', that.filePath + that.name.toLowerCase() + '.pug');
            }

            return false;
        }
    });
}());
