// create a mew autodesk forge panel to load viewables, input is urn,token,viewables

function DownloadPanel(viewer, container, id, title, options){
    this.viewer = viewer;
    Autodesk.Viewing.UI.DockingPanel.call(this, container, id, title, options);
    // use this built-in style to support Themes on Viewer 4+
    this.container.classList.add('docking-panel-container-solid-color-a');
    this.container.style.top = "10px";
    this.container.style.left = "10px";
    this.container.style.width = "auto";
    this.container.style.height = "auto";
    this.container.style.resize = "auto";
    // this is where we should place the content of our panel
    let div = document.createElement('div');
    // set style to docking panel, search field and button on top
    div.style.width = '230px';
    div.style.height = '160px';
    div.style.margin = '10px';

    // Main Content Design
    let checkboxSQL = document.createElement('input');
    checkboxSQL.setAttribute("type", "checkbox");
    checkboxSQL.setAttribute("id", "checkboxSQL");
    checkboxSQL.setAttribute("name", "checkboxSQL");
    checkboxSQL.setAttribute("value", "sql");
    checkboxSQL.setAttribute("class", "checkboxSQL");
    checkboxSQL.style.margin = '10px';
    checkboxSQL.style.width = 'auto';
    checkboxSQL.style.height = 'auto';
    div.appendChild(checkboxSQL);
    let labelSql = document.createElement('label');
    labelSql.setAttribute("for", "radioSql");
    labelSql.innerText = "SQLite Database";
    labelSql.style.margin = '10px';
    labelSql.style.width = 'auto';
    labelSql.style.height = 'auto';
    div.appendChild(labelSql);

    // add a line break
    let br = document.createElement('br');
    div.appendChild(br);
    // add new radio button for gzip viewer
    let checkboxGzip = document.createElement('input');
    checkboxGzip.setAttribute("type", "checkbox");
    checkboxGzip.setAttribute("id", "checkboxGzip");
    checkboxGzip.setAttribute("name", "checkboxGzip");
    checkboxGzip.setAttribute("value", "gzip");
    checkboxGzip.setAttribute("class", "checkboxGzip");
    checkboxGzip.style.margin = '10px';
    checkboxGzip.style.width = 'auto';
    checkboxGzip.style.height = 'auto';
    // set check uncheck
    div.appendChild(checkboxGzip);
    let labelGzip = document.createElement('label');
    labelGzip.setAttribute("for", "radioGzip");
    labelGzip.innerText = "Magic SQL Viewer";
    labelGzip.style.margin = '10px';
    labelGzip.style.width = 'auto';
    labelGzip.style.height = 'auto';
    div.appendChild(labelGzip);
    // a button download selected
    let downloadButton = document.createElement('button');
    downloadButton.setAttribute("type", "button");
    downloadButton.setAttribute("id", "btn-download");
    downloadButton.setAttribute("class", "btn-download");
    downloadButton.innerText = "Download";
    downloadButton.style.margin = '10px';
    downloadButton.style.width = '100px';
    downloadButton.style.height = '30px';
    downloadButton.style.justifyContent = 'center';
    downloadButton.style.alignItems = 'center';
    downloadButton.style.display = 'flex';
    downloadButton.style.color = 'white';
    // event click download button
    downloadButton.addEventListener('click', function () {
        // check if urn online alert not support now
        if(!viewer.model.getData().urn.startsWith('svfs')){
            alert("not support now with online model");
            return;
        }

         let checkboxSQL = document.getElementById("checkboxSQL").checked;
            let checkboxGzip = document.getElementById("checkboxGzip").checked;
            if (checkboxSQL === false && checkboxGzip === false) {
                alert("Please select one option");
                return;
            }
            if (checkboxSQL === true) {
                downloadDatabaseLocal();
            }
            if (checkboxGzip === true) {
                downloadGzipLocal();
            }
    });
    div.appendChild(downloadButton);

    this.container.appendChild(div);
}

DownloadPanel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
DownloadPanel.prototype.constructor = DownloadPanel;

// download file db from autodesk forge
function downloadDatabaseLocal(){
    // getcookie with name sqlPath
    let sqlPath = getCookie("sqlPath");
    // download file
    let link = document.createElement('a');
    link.href = sqlPath;
    link.download = sqlPath.substr(sqlPath.lastIndexOf('/') + 1);
    link.dispatchEvent(new MouseEvent('click'));
}
function downloadGzipLocal() {
    // download 4 files form cookie: attrsPath, avsPath, idsPath, offsetsPath
    let attrsPath = getCookie("attrsPath");
    let avsPath = getCookie("avsPath");
    let idsPath = getCookie("idsPath");
    let offsetsPath = getCookie("offsetsPath");

    // Helper function to trigger download for a file
    function downloadFile(url, filename) {
        let link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none'; // Hide the link
        document.body.appendChild(link);

        link.click(); // Trigger the click event
        document.body.removeChild(link); // Remove the link from the document
    }
    // Download each file
    downloadFile(attrsPath, attrsPath.substr(attrsPath.lastIndexOf('/') + 1));
    downloadFile(avsPath, avsPath.substr(avsPath.lastIndexOf('/') + 1));
    downloadFile(idsPath, idsPath.substr(idsPath.lastIndexOf('/') + 1));
    downloadFile(offsetsPath, offsetsPath.substr(offsetsPath.lastIndexOf('/') + 1));
}