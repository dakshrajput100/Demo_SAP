/*global QUnit*/

sap.ui.define([
	"demo/app/demofiori/controller/Worklistview.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Worklistview Controller");

	QUnit.test("I should test the Worklistview controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
