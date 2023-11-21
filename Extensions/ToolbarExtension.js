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
    var panel = this.panel;

    // button to show the docking panel
    var toolbarButtonShowDockingPanel = new Autodesk.Viewing.UI.Button('devPanel');
    toolbarButtonShowDockingPanel.onClick = function (e) {
        // if null, create it
        if (panel == null) {
            panel = new DevPanel(viewer, viewer.container,
                'devPanel', 'Search Model');
        }
        // show/hide docking panel
        panel.setVisible(!panel.isVisible());
    };
    // set image icon button in stlye.css
    // myAwesomeToolbarButton CSS class should be defined on your .css file
    // you may include icons, below is a sample class:
    /*
    .myAwesomeToolbarButton {
        background-image: url(/img/myAwesomeIcon.png);
        background-size: 24px;
        background-repeat: no-repeat;
        background-position: center;
    }*/
    toolbarButtonShowDockingPanel.addClass('search-button');
    toolbarButtonShowDockingPanel.setToolTip('Search Model');

    // button export metadata from object selection
    var exportButton = new Autodesk.Viewing.UI.Button('export-metadata-button');
    exportButton.onClick = function(e) {
        savePropertyTxt(viewer.model, viewer.getSelection()[0]);
    };
    exportButton.addClass('export-metadata-button');
    exportButton.setToolTip('Export Properties Selection');

    // button export to excel
    const fileName = "metadata";
    var exportExcelButton = new Autodesk.Viewing.UI.Button('toolbarXLS');
    exportExcelButton.onClick = function (e) {
        ApsXLS.downloadXLSX(fileName.replace(/\./g, '') + ".xlsx", statusCallback );/*Optional*/
    };
    exportExcelButton.addClass('excel-button');
    exportExcelButton.setToolTip('Export to .XLSX');

    // button dev feature
    var devButton = new Autodesk.Viewing.UI.Button('dev-button');
    devButton.onClick = function(e) {
        // TODO: dev feature
        alert("TODO: dev feature");
    };
    devButton.addClass('dev-button');
    devButton.setToolTip('Show Dev Feature');

    // SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('dev-toolbar');
    this.subToolbar.addControl(toolbarButtonShowDockingPanel);
    this.subToolbar.addControl(exportButton);
    this.subToolbar.addControl(exportExcelButton);
    this.subToolbar.addControl(devButton);
    toolbar.addControl(this.subToolbar);
};

ToolbarExtension.prototype.unload = function() {
    if (this.subToolbar) {
        this.viewer.toolbar.removeControl(this.subToolbar);
        this.subToolbar = null;
    }
};

// export excel status callback
let statusCallback = function(completed, message) {
    $.notify(message, { className: "info", position:"bottom right" });
    $('#downloadExcel').prop("disabled", !completed);
}

Autodesk.Viewing.theExtensionManager.registerExtension('ToolbarExtension', ToolbarExtension);
