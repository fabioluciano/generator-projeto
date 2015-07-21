;(function(application) {

    'use strict';

    application.module('<%= module %>').filter('<%= name %>Filter', function () {
        return function (input) {
            return '<%= name %> filter: ' + input;
        };
    });

}(application));
