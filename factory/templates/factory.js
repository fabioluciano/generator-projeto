;(function() {
  'use strict';

  angular
    .module('application.<%= module %>.providers.factory')
      .factory('<%= name %>Factory', function () {
          var variavelPrivada = 'valor';

          return {
              getValorPrivado: function () {
                  return variavelPrivada;
              }
          };
      });
}());
