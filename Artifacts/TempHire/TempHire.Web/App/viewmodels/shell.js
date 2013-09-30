define(['durandal/system', 'plugins/router', 'services/logger', 'services/entitymanagerprovider', 'model/modelBuilder', 'services/errorhandler'],
    function (system, router, logger, entitymanagerprovider, modelBuilder, errorhandler) {

        entitymanagerprovider.modelBuilder = modelBuilder.extendMetadata;

        var shell = {
            activate: activate,
            router: router
        };

        errorhandler.includeIn(shell);
        
        return shell;

        //#region Internal Methods
        function activate() {
            return entitymanagerprovider.prepare()
                .then(bootPrivate)
                .then(function() {
                    log('TempHire Loaded!', null, true);
                })
                .fail(function (e) {
                    if (e.status === 401) {
                        return bootPublic();
                    } else {
                        shell.handleError(e);
                        return false;
                    }
                });
        }

        function bootPrivate() {
            //.makeRelative({ moduleId: 'viewmodels' })
            router.map({ route: '', moduleId: 'viewmodels/home', title: 'home', nav: true, hash: '' })
            router.map({ route: 'resourcemgt', moduleId: 'viewmodels/resourcemgt', title: 'Resource Management', nav: true });
            router.mapUnknownRoutes('home', 'not-found');
            router.buildNavigationModel();

            return router.activate();
        }
        
        function bootPublic() {
            return router.map([
                { route: '', moduleId: 'viewModels/login', title: 'login', nav: true }
            ]).activate();
        }

        function log(msg, data, showToast) {
            logger.log(msg, data, system.getModuleId(shell), showToast);
        }
        //#endregion
    });