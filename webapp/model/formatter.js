sap.ui.define([], function () {
	"use strict";

	// Define formatter object with utility functions
	return {

		/**
		 * Rounds the number unit value to 2 digits
		 * @public
		 * @param {string} sValue the number string to be rounded
		 * @returns {string} sValue with 2 digits rounded
		 */
		numberUnit: function (sValue) {
			if (!sValue) {
				return "";
			}
			// Parse and round to 2 decimal places
			return parseFloat(sValue).toFixed(2);
		},

		/**
		 * Formatter to format date
		 * @param {string|Date} sValue Date string or Date object
		 * @returns {string} Formatted date in 'MM/dd/yyyy'
		 */
		dateFormat: function (sValue) {
			if (!sValue) return "";
			// Handle string date format with 20 characters (e.g., timestamp)
			if (typeof sValue === "string" && sValue.length === 20) {
				sValue = new Date(Number(sValue.replace(/\D/g, "")));
			}
			// Create date object and adjust for timezone
			var dateObject = new Date(sValue),
				dateObjectNew = new Date(dateObject.getTime() + dateObject.getTimezoneOffset() * 60000),
				// Define date format
				dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "MM/dd/yyyy"
				}),
				// Format date
				dateFormatted = dateFormat.format(dateObjectNew);
			return dateFormatted;
		},

		
	};
});