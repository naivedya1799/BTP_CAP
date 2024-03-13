

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/Table",
    "sap/m/Column",
    "sap/m/Text",

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


            onFileUpload: function (event) {
                var file = event.getParameter("files")[0];
                var reader = new FileReader();
                var that = this;

                reader.onload = function (e) {
                    var csvData = e.target.result;
                    that.onParseCSV(csvData);
                };

                reader.readAsText(file);
            },

            onParseCSV: function (csvData) {
                var rows = csvData.split('\n');
                console.log("CSV rows:", rows);

                var headers = rows[0].split(',');
                console.log("CSV headers:", headers);

                var columnIndex = headers.findIndex(header => header.trim() === 'columnHeader');
                console.log("Column index:", columnIndex);

                // if (columnIndex === -1) {
                //     sap.m.MessageToast.show("Column not found.");
                //     return;
                // }

                var columnData = [];
                for (var i = 1; i < rows.length; i++) {
                    var row = rows[i].split(',');
                    // if (row.length > columnIndex) {
                    //     columnData.push(row[columnIndex]);
                    // }
                    columnData.push(row)

                }
                console.log("Column data:", columnData);

            }
        });
    });
