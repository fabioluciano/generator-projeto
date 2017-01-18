(function(){
  angular.module('application.<%= moduleNode %>.configuration', []);
  angular.module('application.<%= moduleNode %>.controller', []);
  angular.module('application.<%= moduleNode %>.application', []);
  angular.module('application.<%= moduleNode %>.directive', []);
  angular.module('application.<%= moduleNode %>.filter', []);
  angular.module('application.<%= moduleNode %>.providers', []);
  angular.module('application.<%= moduleNode %>.providers.constant', []);
  angular.module('application.<%= moduleNode %>.providers.decorator', []);
  angular.module('application.<%= moduleNode %>.providers.factory', []);
  angular.module('application.<%= moduleNode %>.providers.provider', []);
  angular.module('application.<%= moduleNode %>.providers.service', []);
  angular.module('application.<%= moduleNode %>.providers.value', []);
  angular.module('application.<%= moduleNode %>.providers.route', []);

  angular
    .module('application.<%= moduleNode %>', [
      'application.<%= moduleNode %>.configuration',
      'application.<%= moduleNode %>.controller',
      'application.<%= moduleNode %>.application',
      'application.<%= moduleNode %>.directive',
      'application.<%= moduleNode %>.filter',
      'application.<%= moduleNode %>.providers',
      'application.<%= moduleNode %>.providers.constant',
      'application.<%= moduleNode %>.providers.decorator',
      'application.<%= moduleNode %>.providers.factory',
      'application.<%= moduleNode %>.providers.provider',
      'application.<%= moduleNode %>.providers.service',
      'application.<%= moduleNode %>.providers.value',
      'application.<%= moduleNode %>.providers.route'
    ]);
})();
