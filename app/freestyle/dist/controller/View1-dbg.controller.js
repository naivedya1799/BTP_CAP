
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("freestyle.controller.View1", {
            onInit: function () {
                var oModel = new JSONModel();
                this.getView().setModel(oModel, "local");
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
            },

            // Content to base 64


            // onFileUpload: function (oEvent) {
            //     var oFileUploader = oEvent.getSource();
            //     var aFiles = oEvent.getParameter("files");
            //     var oFile = aFiles[0]; // Assuming only one file is uploaded
            //     if (!oFile) {
            //         MessageBox.error("Please select a valid XLSX file.");
            //         return;
            //     }
            //     var oFileReader = new FileReader();
            //     oFileReader.onload = function (e) {
            //         var data = e.target.result;
            //         // Here you can parse the XLSX file data and process it
            //         const encodedString = btoa(data);
            //         console.log(encodedString);
            //     };
            //     oFileReader.readAsBinaryString(oFile);
            // },


            handleUploadComplete: function (oEvent) {
                console.log("/////////////");
                var sResponse = oEvent.getParameter("response"),
                    aRegexResult = /\d{4}/.exec(sResponse),
                    iHttpStatusCode = aRegexResult && parseInt(aRegexResult[0]),
                    sMessage;
                console.log(sResponse);
                if (sResponse) {
                    sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
                    MessageToast.show(sMessage);
                }
            },

            handleUploadPress: function () {
                var oFileUploader = this.byId("fileUploader");
                oFileUploader.checkFileReadable().then(function () {

                    const read = oFileUploader.upload();
                    console.log(read)
                }, function (error) {
                    MessageToast.show("The file cannot be read. It may have changed.");
                }).then(function () {
                    oFileUploader.clear();
                });
            }
        });
    });
