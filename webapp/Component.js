sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "ap/material/model/models",
    'sap/f/library',
    'sap/ui/model/json/JSONModel'
], function (UIComponent, models, fioriLibrary, JSONModel) {
    "use strict";

    return UIComponent.extend("ap.material.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);

            
            this.getRouter().initialize();
            this.getRouter().attachBeforeRouteMatched(this._onBeforeRouteMatched, this);

            this.setModel(models.createDeviceModel(), "device");

            if (!this.getModel("settings")) {
                this.setModel(new JSONModel(), "settings");
            }
        },

        _onBeforeRouteMatched: function (oEvent) {
            var oModel = this.getModel("settings"),
                sLayout = oEvent.getParameters().arguments.layout;

            if (!sLayout) {
                sLayout = fioriLibrary.LayoutType.OneColumn;
            }

            oModel.setProperty("/layout", sLayout);
        }
    });
});
