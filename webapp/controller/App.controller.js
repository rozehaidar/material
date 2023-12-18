sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("ap.material.controller.App", {
      onInit: function () {
          this.getOwnerComponent().getRouter().attachRouteMatched(this.onRouteMatched, this);
      },

      onRouteMatched: function (oEvent) {
          let oSettingsModel = this.getOwnerComponent().getModel("settings");
          oSettingsModel.setProperty("/RouteName", oEvent.getParameter("name"));
          oSettingsModel.setProperty("/material", oEvent.getParameter("arguments").material || "");
      },

      onStateChanged: function (oEvent) {
          let oSettingsModel = this.getOwnerComponent().getModel("settings"),
              bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
              sLayout = oEvent.getParameter("layout");

          if (bIsNavigationArrow) {
              this.getOwnerComponent().getRouter().navTo(oSettingsModel.getProperty("/RouteName"), {
                  layout: sLayout,
                  material: oSettingsModel.getProperty("/material")
              }, true);
          }
      },

      onExit: function () {
          this.getOwnerComponent().getRouter().detachRouteMatched(this.onRouteMatched, this);
      }
  });
});
