function getProperty(model, dbId) {
    console.log("show properties by object Id");
    model.getProperties(dbId, function (data) {
        console.log(data);
    });
}

function savePropertyTxt(model, dbId) {
    // popup windows save to txt file
    model.getProperties(dbId, function (data) {
        console.log(data);
        let txt = JSON.stringify(data);
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