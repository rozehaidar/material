sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("ap.material.controller.MaterialDetail", {
        onInit: function () {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("master").attachPatternMatched(this._onMaterialMatched, this);
            oRouter.getRoute("detail").attachPatternMatched(this._onMaterialMatched, this);
        },

        _onMaterialMatched: function (oEvent) {
            var sMaterialID = oEvent.getParameter("arguments").material || "0";
            var sMaterialPath = `/MaterialSet('${sMaterialID}')`;

            this.getView().bindElement({
                path: sMaterialPath
            });

            var oTable = this.getView().byId("MaterialTable");
            oTable.bindItems({
                path: sMaterialPath + "/MaterialSet",
                template: oTable.getBindingInfo("items").template,
                
                error: function (oError) {
                    // Handle the error
                    console.error("Error reading Material details:", oError);
                }
            });
        },

    });
});
