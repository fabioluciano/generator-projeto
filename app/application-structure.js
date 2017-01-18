(function() {
  'use strict';

  module.exports = (function(){
    return (function() {
      var gulp = function() {
        return 'gulp/';
      },
      source = function () {
          return 'source/';
      },
      application = function() {
        return source() + 'application/'
      },
      modules = function() {
        return application() + 'modules/'
      },
      configuration = function() {
        return application() + 'configuration/'
      },
      asset = function() {
        return source() + 'asset/'
      },
      image = function() {
        return asset() + 'image/'
      },
      stylesheet = function() {
        return asset() + 'stylesheet/'
      },
      template = function() {
        return asset() + 'template/'
      }

      return {
        gulp : gulp(),
        source: source(),
        application: application(),
        modules: modules(),
        configuration: configuration(),
        asset: asset(),
        image: image(),
        stylesheet: stylesheet(),
        template: template(),
      };
    })();
  }());
}());
