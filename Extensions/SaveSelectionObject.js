function getProperty(model, dbId) {
    model.getProperties(dbId, function (data) {
        console.log(data);
    });
}

function savePropertyTxt(viewer) {

    let dbId = viewer.getSelection()[0];
    // if it is isolated, get the first object
    if (dbId == null) {
        if (viewer.getAggregateIsolation()[0] != null) {
            dbId = viewer.getAggregateIsolation()[0].ids[0];
        }
    }
    // if selection >1, popup windows just support one object
    if (viewer.getSelection().length > 1) {
        alert("Please select only one object");
        return;
    }
    if(viewer.getSelection().length === 0){
        alert("Please select one object");
        return;
    }
    // popup windows save to txt file
    viewer.model.getProperties(dbId, function (data) {
        console.log(data);
        let txt = JSON.stringify(data, null, 2);
        let blob = new Blob([txt], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "properties.json");
    });
}

function saveAs(blob, fileName) {
    console.log("Saving as with filename: ", fileName);
    let url = window.URL.createObjectURL(blob);
    let anchorElem = document.createElement("a");
    anchorElem.style = "display: none";
    anchorElem.href = url;
    anchorElem.download = fileName;
    document.body.appendChild(anchorElem);
    anchorElem.click();
    document.body.removeChild(anchorElem);
    setTimeout(function () {
        window.URL.revokeObjectURL(url);
    }, 1000);
}