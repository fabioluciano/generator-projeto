(function() {
  'use strict';

  module.exports = (function(){
    return (function() {
      var asset = function() {
        return 'asset/';
      },
      controller = function () {
        return 'controller/';
      },
      data = function () {
          return 'data/';
      },
      directive = function () {
         return 'directive/';
      },
      filter = function () {
          return 'filter/';
      },
      i18n = function () {
          return 'i18n/';
      },
      view = function () {
          return 'view/';
      },
      providers = function () {
          return 'providers/';
      },
      constant = function () {
          return providers() + 'constant/';
      },
      value = function () {
          return providers() + 'value/';
      },
      factory = function () {
          return providers() + 'factory/';
      },
      decorator = function () {
          return providers() + 'decorator/';
      },
      service = function () {
          return providers() + 'service/';
      },
      provider = function () {
          return providers() + 'provider/';
      };

      return {
        asset : asset(),
        controller: controller(),
        data: data(),
        directive: directive(),
        filter: filter(),
        i18n: i18n(),
        view: view(),
        providers: providers(),
        constant: constant(),
        value: value(),
        factory:factory(),
        decorator: decorator(),
        service: service(),
        provider: provider()
      };
    })();
  }());
}());
