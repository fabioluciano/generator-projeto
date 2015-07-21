;(function(application) {

    'use strict';

    application.module('<%= module %>').factory('<%= name %>Factory', function () {
        var variavelPrivada = 'valor';

        return {
            getValorPrivado: function () {
                return variavelPrivada;
            }
        };
    });

}(application));
