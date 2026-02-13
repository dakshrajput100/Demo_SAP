sap.ui.define([
    "sap/ui/core/UIComponent",
    "demo/app/demofiori/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("demo.app.demofiori.Component", {
        metadata: {
            manifest: "json", // Use JSON manifest for configuration
			config: {
				fullWidth: true // Set component to full width
			}
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
        }
    });
});