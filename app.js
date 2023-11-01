
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


loadModel('svfs/3D View/MyRoom 96822/MyRoom.svf');

