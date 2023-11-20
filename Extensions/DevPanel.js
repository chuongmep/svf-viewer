// *******************************************
// Dev (Docking) Panel
// *******************************************
function DevPanel(viewer, container, id, title, options) {
    this.viewer = viewer;
    Autodesk.Viewing.UI.DockingPanel.call(this, container, id, title, options);

    // the style of the docking panel
    // use this built-in style to support Themes on Viewer 4+
    this.container.classList.add('docking-panel-container-solid-color-a');
    this.container.style.top = "10px";
    this.container.style.left = "10px";
    this.container.style.width = "auto";
    this.container.style.height = "auto";
    this.container.style.resize = "auto";

    // this is where we should place the content of our panel
    var div = document.createElement('div');
    div.style.margin = '100px';
    div.innerText = "My content here";
    this.container.appendChild(div);
    // and may also append child elements...

}
DevPanel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
DevPanel.prototype.constructor = DevPanel;