
let viewer = null;
function loadModel(urn) {
    options = {
        useADP: false,
        env: "Local",
        isAEC: true,

    };
    // var config3d = {
    //     extensions: ['MyAwesomeExtension'],
    // };
    var forgeViewer = document.getElementById('forgeViewer');
    // let viewer = new Autodesk.Viewing.GuiViewer3D(forgeViewer,config3d);
    viewer = new Autodesk.Viewing.GuiViewer3D(forgeViewer);
    Autodesk.Viewing.Initializer(options);
    viewer.start(urn, options, () => {
        console.log('Viewer started')
    });
    viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.selectionOnChange);
    viewer.loadExtension('ToolbarExtension').then(function() {
        console.log('ToolBar Dev loaded');
    });
}

// EVENT SELECTION CHANGE
function selectionOnChange(event) {
    let bbox = this.model.myData.bbox;
    console.log('Bounding box: ', bbox);
    // get object id
    let dbId = event.dbIdArray[0];
    // get object id
    console.log("Object Id: ", dbId);
    // get properties by object id
    getProperty(this.model, dbId);
}



loadModel('svfs/3D View/08f99ae5-b8be-4f8d-881b-128675723c10/Project Completion/Project Completion.svf');

