(function() {
  'use strict';

  angular
    .module('application.<%= module %>.providers.service')
      .service('<%= name %>Service', <%= name %>Service);

  function <%= name %>Service() {

  }

}());
