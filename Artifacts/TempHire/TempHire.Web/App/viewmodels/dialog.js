define(['plugins/dialog', 'durandal/activator', 'durandal/system'],
    function (dialog, activator, system) {

        var Dialog = (function () {

            var ctor = function (obj, options) {
                var self = this;

                this.content = activator.create(obj);
                this.commands = ko.observableArray(options);

                this.invokeCommand = function (command) {
                    self.content.dialogResult = command;
                    // self.close(command);
                    dialog.close(self, command);
                    // self.modal.close(command);
                };
            };

            system.setModuleId(ctor, 'viewmodels/dialog');

            ctor.prototype.activate = function() {
                return this.content.activate();
            };

            ctor.prototype.canDeactivate = function (close) {
                var self = this;
                return this.content.canDeactivate(close)
                    .fin(function() { self.content().dialogResult = null; });
            };

            ctor.prototype.deactivate = function(close) {
                return this.content.deactivate(close);
            };

            return ctor;
        })();

        return {
            show: show,
            close: close
        };

        function show(obj, options) {
            var viewModel = new Dialog(obj, options);
            return dialog.show(viewModel);
        }
        function close(option) {
            return dialog.close(this, option);
        }
});