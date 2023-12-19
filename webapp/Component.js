sap.ui.define([
    "sap/ui/core/UIComponent",
    "ap/material/model/models",
    "sap/f/library",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, models, fioriLibrary, JSONModel) {
    "use strict";

    return UIComponent.extend("ap.material.Component", {
        metadata: {
            manifest: "json"
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // enable routing
            this.getRouter().initialize();
            this.getRouter().attachBeforeRouteMatched(this._onBeforeRouteMatched, this);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // initialize the settings model if not done elsewhere
            if (!this.getModel("settings")) {
                this.setModel(new JSONModel(), "settings");
            }
        },

        _onBeforeRouteMatched: function (oEvent) {
            var oModel = this.getModel("settings"),
                sLayout = oEvent.getParameters().arguments.layout;

            // If there is no layout parameter, set a default layout (normally OneColumn)
            if (!sLayout) {
                sLayout = fioriLibrary.LayoutType.OneColumn;
            }

            oModel.setProperty("/layout", sLayout);
        }
    });
});