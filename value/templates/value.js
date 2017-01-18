;(function() {
  'use strict';

  angular
    .module('application.<%= module %>.providers.value')
      .value('<%= name %>', '<%= value %>');

}());
