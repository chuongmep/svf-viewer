// create a mew autodesk forge panel to load viewables, input is urn,token,viewables

function LoadModelPanel(viewer, container, id, title, options){
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
    div.style.width = 'auto';
    div.style.height = '200px';
    div.style.margin = '10px';
    // div.innerText = "My content here";
    // create an input token, urn and button to load model
    let token = document.createElement('input');
    token.setAttribute("type", "text");
    token.setAttribute("id", "token");
    token.setAttribute("placeholder", "Token");
    token.setAttribute("name", "token");
    token.setAttribute("value", "");
    token.setAttribute("class", "token");
    token.style.margin = '10px';
    token.style.width = '30em';
    token.style.display = 'flex';
    // set default value from cookie
    token.value = getCookie("loadtoken");
    div.appendChild(token);
    let urn = document.createElement('input');
    urn.setAttribute("type", "textarea");
    urn.setAttribute("id", "urn");
    urn.setAttribute("placeholder", "Urn");
    urn.setAttribute("name", "urn");
    urn.setAttribute("value", "");
    urn.setAttribute("class", "urn");
    urn.style.margin = '10px';
    urn.style.width = '30em';
    urn.style.height = '50px';
    urn.style.display = 'flex';
    // set default value from cookie
    urn.value = getCookie("loadurn");
    div.appendChild(urn);
    let loadButton = document.createElement('button');
    loadButton.setAttribute("type", "button");
    loadButton.setAttribute("id", "btn-load");
    loadButton.setAttribute("class", "btn-load");
    loadButton.innerText = "Load";
    loadButton.style.margin = '10px';
    loadButton.style.width = '100px';
    loadButton.style.height = '30px';
    loadButton.style.justifyContent = 'center';
    loadButton.style.alignItems = 'center';
    // set flex
    loadButton.style.display = 'flex';
    // set text color to white
    loadButton.style.color = 'white';
    // set tooltip
    loadButton.setAttribute("title", "Load Model");
    div.appendChild(loadButton);
    loadButton.addEventListener('click', function () {
        // get token
        let token = document.getElementById("token").value;
        if (token === "") {
            alert("Please input token");
            return;
        }
        let urn = document.getElementById("urn").value;
        if (urn === "") {
            alert("Please input urn");
            return;
        }
        setCooke("loadtoken",token);
        setCooke("loadurn",urn);
        loadModelIOnline(urn,token);
    });

    // new form dropdown list to select viewables
    // let sel = document.createElement('select');
    // sel.setAttribute("id", "viewables");
    // sel.setAttribute("class", "viewables");
    // sel.style.margin = '10px';
    // sel.style.width = '30em';
    // sel.style.height = '30px';
    // sel.style.display = 'flex';
    // div.appendChild(sel);
    // // add event listener to the load button
    // sel.addEventListener('click', function () {
    //
    // });
    this.container.appendChild(div);
}

LoadModelPanel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
LoadModelPanel.prototype.constructor = LoadModelPanel;

function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}
function setCooke(name,value) {
    // clear cookie
    document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // set cookie
    document.cookie = name+"="+value;
}
