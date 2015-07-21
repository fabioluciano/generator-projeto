;(function(application) {

    'use strict';

    application.module('<%= module %>').provider('<%= name %>Provider', function () {

        var saldacao = 'Olá';

        function Saldador() {
            this.saldar = function () {
                return saldacao;
            };
        }

        this.setSaldacao = function (s) {
            saldacao = s;
        };

        this.$get = function () {
            return new Saldador();
        };
    });

}(application));
