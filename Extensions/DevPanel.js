// *******************************************
// Dev (Docking) Panel
// *******************************************
let guid = null;

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
    // set style to docking panel, search field and button on top
    div.style.margin = '10px';
    div.style.marginBottom = '20px';
    // div.style.margin = '100px';
    // div.innerText = "My content here";
    // create a search box and button to execute search
    var field = document.createElement('input');
    field.setAttribute("type", "text");
    field.setAttribute("id", "search-field");
    field.setAttribute("placeholder", "Search...");
    field.setAttribute("name", "search-field");
    field.setAttribute("value", "");
    field.setAttribute("class", "search-field");
    field.style.marginRight = '10px';
    div.appendChild(field);
    var searchButton = document.createElement('button');
    searchButton.setAttribute("type", "button");
    searchButton.setAttribute("id", "btn-search");
    searchButton.setAttribute("class", "btn-search");
    searchButton.innerText = "Search";
    searchButton.style.justifyContent = 'center';
    searchButton.style.alignItems = 'center';
    // set text color to white
    searchButton.style.color = 'white';
    // set tooltip
    searchButton.setAttribute("title", "Search Properties");
    div.appendChild(searchButton);

    // add search results to the panel
    var results = document.createElement('div');
    results.setAttribute("id", "search-results");
    results.setAttribute("class", "search-results");
    div.appendChild(results);
    // add event listener to the search button
    searchButton.addEventListener('click', function () {
        searchItems(viewer);
    });
    // add event enter key to the search field
    field.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            searchButton.click();
        }
    });
    this.container.appendChild(div);
    // and may also append child elements...

}

DevPanel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
DevPanel.prototype.constructor = DevPanel;


// search model properties by filters
function searchItems(viewer) {

    if (document.getElementById("search-field").value === "") {
        viewer.fitToView();
        return;
    }
    // if user input dbId or guid, allow console information of object properties
    if (document.getElementById("search-field").value.match(/^[0-9]+$/) != null) {
        // get select by object id
        let dbId = parseInt(document.getElementById("search-field").value);
        // find object id in model
        if (viewer.model.getData().instanceTree.nodeAccess.dbIdToIndex[dbId] != null) {
            zoomAndIsoObject(viewer, dbId);
            getProperty(viewer.model, dbId);
            return;
        }
    }
    // if user input match 45 characters include string and number, allow console information of object properties
    // example : 5bb069ca-e4fe-4e63-be31-f8ac44e80d30-0004718e
    if (document.getElementById("search-field").value.match(/^[a-z0-9]{8}(-[a-z0-9]{4}){3}-[a-z0-9]{12}-[a-z0-9]{8}$/) != null) {
        // get select by guid
        guid = document.getElementById("search-field").value;
        // find external id in model : https://aps.autodesk.com/blog/get-dbid-externalid
        console.log("externalId: ", guid);
        viewer.model.getExternalIdMapping(function (mapping) {
            mappingAndIsolate(mapping, viewer);
        });
        return;
    }
    viewer.search(
        document.getElementById("search-field").value,
        function (dbIDs) {
            viewer.isolate(dbIDs);
            viewer.fitToView(dbIDs);
            // set color to object
            //viewer.setThemingColor(dbIDs, new THREE.Vector4(0, 1, 0, 1));
        }
    );
}

function mappingAndIsolate(mapping, viewer) {
    // get dbId by guid
    let dbId = mapping[guid];
    zoomAndIsoObject(viewer, dbId);
    // print properties by object id
    getProperty(viewer.model, dbId);
    // print type of object
    console.log("Object Id: ", dbId);
}

function zoomAndIsoObject(viewer, dbId) {
    console.log('Zoom Iso Object: ', dbId);
    viewer.isolate(dbId);
    viewer.fitToView(dbId);
}
