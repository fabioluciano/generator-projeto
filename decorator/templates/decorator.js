;(function(application) {

    'use strict';

    application.module('<%= module %>').config(function ($provide) {
        $provide.decorator('<%= name %>Decorator', function ($delegate) {
            return $delegate;
        });
    });


}(application));

