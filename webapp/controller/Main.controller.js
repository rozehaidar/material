sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/Device',
    'sap/f/library',
    '../util/SortAndFilterHelper',
    'sap/ui/export/Spreadsheet',
    'sap/ui/export/library'
], function (Controller, Device, fioriLibrary, SortAndFilterHelper, Spreadsheet, exportLibrary) {
    "use strict";

    return Controller.extend("ap.material.controller.Main", {
        onInit: function () {
            this._mViewSettingsDialogs = {};
        },

        onListItemPress: function (oEvent) {
            let sMaterialPath = oEvent.getSource().getBindingContext().getPath(),
                oSelectedMaterial = sMaterialPath.split("'")[1];

            // Ensure Fiori library is loaded and available
            this.getOwnerComponent().getRouter().navTo("detail", {
                layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
                material: oSelectedMaterial
            });
        },

        handleSortButtonPressed: function () {
            SortAndFilterHelper.handleSortButtonPressed(this, "ap.material.fragments.sortDialog");
        },

        handleSortDialogConfirm: function (oEvent) {
            SortAndFilterHelper.handleSortDialogConfirm(oEvent, this, "MaterialTable");
        },

        handleFilterGo: function () {
            SortAndFilterHelper.handleFilterBarGo(this, 'MaterialTable');
        },

        onExport: function () {
            let aCols, oRowBinding, oSettings, oSheet, oTable;

            oTable = this.getView().byId("MaterialTable");
            oRowBinding = oTable.getBinding('items');
            aCols = this.createColumnConfig();

            oSettings = {
                workbook: {
                    columns: aCols,
                    hierarchyLevel: 'Level'
                },
                dataSource: oRowBinding,
                fileName: 'Table export sample.xlsx',
                worker: false
            };

            oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function () {
                oSheet.destroy();
            });
        },

        createColumnConfig: function () {
            let aCols = [];
            let EdmType = exportLibrary.EdmType;

            aCols.push({
                label: 'Id',
                property: ['Matnr'],
                type: EdmType.String,
                template: '{0}'
            });

            aCols.push({
                label: 'Name',
                type: EdmType.String,
                property: 'Name',
                scale: 0
            });

            aCols.push({
                property: 'MatDescription',
                type: EdmType.String
            });
            aCols.push({
                property: 'Matkl',
                type: EdmType.String
            });
            aCols.push({
                property: 'Mtart',
                type: EdmType.String
            });
            aCols.push({
                property: 'Mbrsh',
                type: EdmType.String
            });
            aCols.push({
                property: 'Meins',
                type: EdmType.String
            });

            return aCols;
        }
    });
});
