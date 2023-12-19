sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/Device',
    'sap/f/library',
    '../util/SortAndFilterHelper',
    'sap/ui/export/Spreadsheet',
    'sap/ui/export/library'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Device, fioriLibrary, SortAndFilterHelper, Spreadsheet, exportLibrary) {
        "use strict";

        return Controller.extend("ap.material.controller.Main", {
            onInit: function () {
                // Keeps reference to any of the created sap.m.ViewSettingsDialog-s in this sample
			    this._mViewSettingsDialogs = {};
                let aCountry = [{Code: "DE", Name: "Germany"}, {Code: "US", Name:"United States"}]
                this.getOwnerComponent().getModel("settings").setProperty("/CountryList", aCountry)
            },

            onListItemPress: function (oEvent) {
                let sMatrialPath = oEvent.getSource().getBindingContext().getPath(),
                oSelectedMatrial = sMatrialPath.split("'")[1]; 

			    this.getOwnerComponent().getRouter().navTo("detail", {layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, material: oSelectedMatrial});
            },

            handleSortButtonPressed: function () {
                SortAndFilterHelper.handleSortButtonPressed(this, "ap.material.fragments.sortDialog")
            },
            handleSortDialogConfirm: function (oEvent) {
                SortAndFilterHelper.handleSortDialogConfirm(oEvent, this, "MaterialTable")
            },
            handleFilterGo: function(oEvent){
                SortAndFilterHelper.handleFilterBarGo(this, 'MaterialTable')
            }, 
            onExport: function(oEvent) {
                let aCols, oRowBinding, oSettings, oSheet, oTable;
                
    
                oTable = this.getView().byId("MaterialTable")
                oRowBinding = oTable.getBinding('items')
                aCols = this.createColumnConfig()
    
                oSettings = {
                    workbook: {
                        columns: aCols,
                        hierarchyLevel: 'Level'
                    },
                    dataSource: oRowBinding,
                    fileName: 'Table export sample.xlsx',
                    worker: false // We need to disable worker because we are using a MockServer as OData Service
                };
    
                oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function() {
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