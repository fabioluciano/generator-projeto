(function(){
  'use strict';

  angular
    .module('application.configuration', ['ngRoute',  'application.poc']);

  angular
    .module('application', [
      'ngResource',
      'ngCookies',
      'ngSanitize',
      'ngMaterial',
      'application.configuration',
      'application.poc',
      'component.formbuilder',
      'component.buttonbar',
      'component.listreg'
    ]);

  angular
    .module('application.poc', []);

})();
