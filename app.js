
function loadModel(urn) {
    options = {
        useADP: false,
        env: "Local",
        isAEC: true,
    };
    let viewer = new Autodesk.Viewing.Private.GuiViewer3D(document.getElementById('forgeViewer'));
    Autodesk.Viewing.Initializer(options);
    viewer.start(urn, options, ()=>{
        initPlanogramView();    
    });    
}


loadModel('svfs/3D View/08f99ae5-b8be-4f8d-881b-128675723c10/Project Completion/Project Completion.svf');

