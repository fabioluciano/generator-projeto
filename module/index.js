( function() {
    'use strict';

    var yeoman           = require('yeoman-generator'),
        applicationStructure  = require('../app/application-structure.js'),
        moduleStructure  = require('../app/angular-structure.js'),
        filesystem       = require('fs');

    module.exports = yeoman.generators.Base.extend({
        initializing: function () {
            var that = this;

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

            that.prompt(questions, function (props) {

                if('name' in props) {
                    that.name = props.name.toLowerCase();
                }

                that.confirmCreation = props.confirmCreation;

                done();
            }.bind(that));
        },

        writting: function() {
            var that       = this,
                done       = this.async,
                modulePath = applicationStructure.modules + this.name + '/';


            if (that.confirmCreation || that.options.skip) {
                that.moduleNode = that.name;

                that.mkdir(modulePath);
                that.template('application.js', (modulePath + that.name + '-module.js'))

                Object.keys(moduleStructure).forEach(function(folder) {
                    var folder = moduleStructure[folder];
                        that.mkdir(modulePath + folder);
                });
            }

            return false;
        }
    });
}());
