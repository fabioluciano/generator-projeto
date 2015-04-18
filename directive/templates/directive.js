(function(application) {

    'use strict';

    application.module('<%= module %>').directive('<%= name %>', [], function () {
        return {
            template: '<div></div>',
            restrict: '<%= type %>'
        };
    });

}(application));
