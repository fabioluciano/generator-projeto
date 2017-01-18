;(function() {
  'use strict';

  angular
    .module('application.<%= module %>.filter')
      .filter('<%= name %>Filter', function () {
        return function (input) {
            return '<%= name %> filter: ' + input;
        };
      });

}());
