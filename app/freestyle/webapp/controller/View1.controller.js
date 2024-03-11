sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("freestyle.controller.View1", {
            onInit: function () {

            },
            onPostdata: function () {
                var Field1 = this.byId("Field1").getValue();
                var Field2 = this.byId("Field2").getValue();
                var Field3 = this.byId("Field3").getValue();
                var oData = {
                    contents: Field1,
                    mediaType: Field2,
                    base64: Field3
                }
                var oAjaxOptions = jQuery.ajax({
                    url: "/odata/v4/attachments/Files",
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(oData),
                    success: function (data) {
                        console.log(data)
                        MessageBox.success("Data posted successfully!");
                    },
                    error: function (data) {
                        console.log(data)
                        MessageBox.error("Error posting data!");
                    },
                });

                // Send AJAX request
                jQuery.ajax(oAjaxOptions);
            }
        });
    });
