function ToolbarExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
}

ToolbarExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
ToolbarExtension.prototype.constructor = ToolbarExtension;

ToolbarExtension.prototype.load = function() {
    // Set background environment to "Infinity Pool"
    // and make sure the environment background texture is visible
    // this.viewer.setLightPreset(1);
    this.viewer.setEnvMapBackground(true);

    // Ensure the model is centered
    this.viewer.fitToView();

    return true;
};

ToolbarExtension.prototype.unload = function() {
    // nothing yet
};
ToolbarExtension.prototype.onToolbarCreated = function(toolbar) {

};
ToolbarExtension.prototype.onToolbarCreated = function(toolbar) {

    var viewer = this.viewer;

    // button export metadata from object selection
    var exportButton = new Autodesk.Viewing.UI.Button('export-metadata-button');
    exportButton.onClick = function(e) {
        savePropertyTxt(viewer.model, viewer.getSelection()[0]);
    };
    exportButton.addClass('export-metadata-button');
    exportButton.setToolTip('Export Properties Selection');

    // button dev feature
    var devButton = new Autodesk.Viewing.UI.Button('dev-button');
    devButton.onClick = function(e) {
        // TODO: dev feature
    };
    devButton.addClass('dev-button');
    devButton.setToolTip('Show Dev Feature');

    // SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('dev-toolbar');
    this.subToolbar.addControl(exportButton);
    this.subToolbar.addControl(devButton);
    toolbar.addControl(this.subToolbar);
};

ToolbarExtension.prototype.unload = function() {
    if (this.subToolbar) {
        this.viewer.toolbar.removeControl(this.subToolbar);
        this.subToolbar = null;
    }
};
Autodesk.Viewing.theExtensionManager.registerExtension('ToolbarExtension', ToolbarExtension);
