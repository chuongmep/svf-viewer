
let viewer = null;

/// load model local
function loadModel(urn) {
    options = {
        useADP: false,
        env: "Local",
        isAEC: true,

    };
    // var config3d = {
    //     extensions: ['ToolbarExtension'],
    // };
    let forgeViewer = document.getElementById('forgeViewer');
    // viewer = new Autodesk.Viewing.GuiViewer3D(forgeViewer,config3d);
    viewer = new Autodesk.Viewing.GuiViewer3D(forgeViewer);
    Autodesk.Viewing.Initializer(options);
    viewer.start(urn, options, () => {
        console.log('Viewer started')
    });
    viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.selectionOnChange);
    viewer.loadExtension('ToolbarExtension').then(function() {
        console.log('ToolbarExtension loaded');
    });
    // viewer.loadExtension('Autodesk.Sample.CustomPropertyPanelExtension').then(function() {
    //     console.log('CustomPropertyPanelExtension loaded');
    // });
}

// load model from aps
function loadModelIOnline(urn,token) {

    var options = {
        env: 'AutodeskProduction2',
        api: 'streamingV2', // for models uploadeded to EMEA change this option to 'streamingV2_EU'
        getAccessToken: function(onTokenReady) {
            var timeInSeconds = 3600; // Use value provided by Authentication (OAuth) API
            onTokenReady(token, timeInSeconds);
        }
    }
    <!-- This is called when the page is loaded-->
    Autodesk.Viewing.Initializer(options, function() {

        let forgeViewer = document.getElementById('forgeViewer');
        viewer = new Autodesk.Viewing.GuiViewer3D(forgeViewer);
        let startedCode = viewer.start();

        if (startedCode > 0) {
            console.error('Failed to create a Viewer: WebGL not supported.');
            return;
        }
        console.log('Initialization complete, loading a model next...');

    });
    let documentId = 'urn:' + urn; // Add the string 'urn:' to the actual URN value

    function onDocumentLoadFailure() {
        console.error('Failed to load model');
    }

    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure)
    // viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.selectionOnChange);
    // viewer.loadExtension('ToolbarExtension').then(function() {
    //     console.log('ToolBar Dev loaded');
    // });
}
function onDocumentLoadSuccess(viewerDocument) {

    let viewerapp = viewerDocument.getRoot();

    let md_ViewerDocument=viewerDocument; // Hold the viewerDocument in a global variable so that we can access it within SelectViewable()
    let md_viewables = viewerapp.search({'type':'geometry'});

    if (md_viewables.length === 0) {
        console.error('Document contains no viewables.');
        return;
    }

    // // populate the Choose viewables drop down with the viewable name
    // var sel = document.getElementById('viewables');
    // console.log(sel);
    // for(var i = 0; i < md_viewables.length; i++) {
    //     var opt = document.createElement('option');
    //     opt.innerHTML = md_viewables[i].data.name;
    //     opt.value =  md_viewables[i].data.name;
    //
    //     sel.appendChild(opt);
    // }

    viewer.loadDocumentNode(viewerDocument, md_viewables[0]);
    viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.selectionOnChange);
    viewer.loadExtension('ToolbarExtension').then(function() {
        console.log('ToolbarExtension loaded');
    });
    <!-- Make the Choose viewable drop-down visible, if and only if only there are more than one viewables to display-->


    // if (md_viewables.length > 1) {
    //     var viewablesDIV= document.getElementById("viewables_dropdown");
    //     viewablesDIV.style.display = "block";
    //
    // }

}



loadModel('svfs/3D View/08f99ae5-b8be-4f8d-881b-128675723c10/Project Completion/Project Completion.svf');
