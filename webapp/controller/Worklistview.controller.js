sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "../model/formatter",
], (Controller, Fragment, formatter) => {
    "use strict";

    return Controller.extend("demo.app.demofiori.controller.Worklistview", {
        onInit() {
            var oViewModel = new sap.ui.model.json.JSONModel({
                'aTotalAbscence': [{
                    'TOTAL': 0  
                }],
                'aType': [{
                    'TXVAL': 'Lost Time',
                    'SEQID': 1
                }, {
                    'TXVAL': 'Modified Duties',
                    'SEQID': 2
                }],
                'oAbscence': {}
            })

            this.getView().setModel(oViewModel, "worklistView");
            this._getMinMaxTime();
        },

        onPressAddAbscence: function (oEvent) {
            // Load or open dialog
			if (!this._oDialog) {
				Fragment.load({
					name: "demo.app.demofiori.view.fragments.AddAbscence",
					controller: this
				}).then(function (oDialog) {
					// Store dialog reference
					this._oDialog = oDialog;
					// Add dialog as dependent
					this.getView().addDependent(this._oDialog);
					// Open dialog
					this._oDialog.open();
				}.bind(this));
			} else {
				this._oDialog.open();
			}
        },
        
        onPressSubmitAbscence: function () {
            this._oDialog.close();
            this.getView().getModel("worklistView").setProperty("/oAbscence", {});
            this.getView().getModel("worklistView").setProperty("/selectedDates", []);
            sap.ui.getCore().byId('calendar').removeAllSelectedDates()
        },

        handleCalendarSelect: function (oEvent) {
			var oCalendar = oEvent.getSource(),
				aSelectedDates = oCalendar.getSelectedDates(),
				selectedDates = [],
				i,
				oDate;
 
			if (aSelectedDates.length > 0) {
				for (i = 0; i < aSelectedDates.length; i++) {
					oDate = aSelectedDates[i].getStartDate();
					selectedDates.push({
						Date: formatter.dateFormat(oDate)
					});
				}
				this.getView().getModel("worklistView").setProperty("/selectedDates", selectedDates);
			} else {
				this.getView().getModel("worklistView").setProperty("/selectedDates", []);
			}
            this.getView().getModel("worklistView").setProperty("/oAbscence/TotalHours", '');
            this.getView().getModel("worklistView").setProperty("/oAbscence/NoHours", '');
		},
		handleRemoveSelection: function () {
			sap.ui.getCore().byId("calendar").removeAllSelectedDates();
			this.getView().getModel("worklistView").setProperty("/selectedDates", []);
            this.getView().getModel("worklistView").setProperty("/oAbscence/TotalHours", '');
            this.getView().getModel("worklistView").setProperty("/oAbscence/NoHours", '');
		},

        _getMinMaxTime: function () {
			// create Date object for current location
			var date = new Date();
			// convert to milliseconds, add local time zone offset and get UTC time in milliseconds
			var utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
			// time offset for country wise
			var timeOffset = new Date().getTimezoneOffset() / -60;
			// create new Date object for a different timezone using supplied its GMT offset.
			// var sDate = new Date(utcTime + (3600000 * timeOffset));
			var sDate = new Date(utcTime + (3600000 * timeOffset)),
				dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "yyyy-MM-dd",
					UTC: false
				});
			this.getView().getModel("worklistView").setProperty('/DemoMin', new Date(sDate.getFullYear(), sDate.getMonth(), 1));
			this.getView().getModel("worklistView").setProperty('/DemoMax', new Date(sDate.getFullYear(), sDate.getMonth() + 1, 0));
		},

        onChangeTotalHours: function (oEvent) {
            var sVal = +this.getView().getModel("worklistView").getProperty('/oAbscence/NoHours'),
                noDates = this.getView().getModel("worklistView").getProperty("/selectedDates").length,
                nHrs = sVal * noDates;
            
            this.getView().getModel("worklistView").setProperty("/oAbscence/TotalHours", nHrs === 0 ? '' : nHrs);

        }
    });
});