(function() {
    'use strict';

    module.exports = (function () {
        return (function () {
            var source = (function () {
                var root = 'src/',
                    assets = function () {
                        return root + 'asset/';
                    }, javascript = function () {
                        return assets() + 'javascript/';
                    }, stylesheet = function () {
                        return assets() + 'stylesheet/';
                    }, markup = function () {
                        return root + 'view/';
                    }, vendor = function () {
                        return assets() + 'library/';
                    };

                return {
                    root       : root,
                    assets     : assets(),
                    javascript : javascript(),
                    stylesheet : stylesheet(),
                    markup     : markup(),
                    vendor     : vendor()
                };
            }()),
                angular = (function () {
                    var root = source.javascript + 'application/',
                        module = (function() {
                            var controller = function () {
                                return 'controller/';
                            }, service = function () {
                                return 'service/';
                            }, directive = function () {
                                return 'directive/';
                            }, filter = function () {
                                return 'filter/';
                            }, view = function () {
                                return 'view/';
                            }, constant = function () {
                                return service() + 'constant/';
                            }, value = function () {
                                return service() + 'value/';
                            }, factory = function () {
                                return service();
                            }, decorator = function () {
                                return service();
                            }, provider = function () {
                                return service();
                            };

                            return {
                                controller : controller(),
                                service    : service(),
                                directive  : directive(),
                                filter     : filter(),
                                view       : view(),
                                constant   : constant(),
                                value      : value(),
                                factory    : factory(),
                                decorator  : decorator(),
                                provider   : provider()
                            };
                        })();

                    return {
                        root : root,
                        module : module
                    };
                })();

            return {
                source : source,
                angular : angular,
            };
        }());
    }());
}());
