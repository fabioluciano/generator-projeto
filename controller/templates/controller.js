;(function() {
  'use strict';

  angular
    .module('application.<%= module %>.controller')
      .controller('<%= name %>Controller', <%= name %>Controller);

    function <%= name %>Controller() {

    }
}());
