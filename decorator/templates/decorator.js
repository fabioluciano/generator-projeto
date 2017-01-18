;(function() {
    'use strict';

  angular
    .module('application.<%= module %>.providers.decorator')
      .config(function ($provide) {
        $provide.decorator('<%= name %>Decorator', function ($delegate) {
          return $delegate;
        });
      });

}());
