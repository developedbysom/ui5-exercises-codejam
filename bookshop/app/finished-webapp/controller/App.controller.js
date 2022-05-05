sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";
    return Controller.extend("sap.codejam.controller.App", {
        onInit: function () {

        },
        onSelect: function (oEvent) {
            let form = this.getView().byId("bookdetails"),
                contextPath = oEvent.getSource().getBindingContextPath();
            form.bindElement(contextPath);
            this.getView().byId("orderBtn").setEnabled(true);
        },
        onSubmitOrder: function (oEvent) {
            let selectedBookID = oEvent.getSource().getParent().getParent().getBindingContext().getObject().ID,
                quantity = this.getView().byId("stepInput").getValue();
            let oAction = oEvent.getSource().getParent().getObjectBinding();
            oAction.setParameter("book", selectedBookID);
            oAction.setParameter("quantity", quantity);
            
            oAction.execute().then(oResult => {
                console.log(oResult)
            })
        },
        onSearch: function (oEvent) {
            var aFilter = [];
            var sQuery = oEvent.getParameter("newValue");
            if (sQuery) {
                aFilter.push(new Filter("title", FilterOperator.Contains, sQuery));
            }
            var oList = this.byId("booksTable");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);

            let oModel = this.getView().getModel("userSelection")
            oModel.setProperty("/selectedItemPath", {})
            oModel.setProperty("/selectedItemData", {})
            this.getView().byId("orderStatus").setText("")
            oModel.setProperty("/itemSelected", false)
        }
    });
});