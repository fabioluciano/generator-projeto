(function() {
    'use strict';

    angular
    .module('application.<%= module %>.directive')
        .directive('<%= name %>', [], function () {
          return {
              template: '<div></div>',
              restrict: '<%= type %>'
          };
        });

}());
