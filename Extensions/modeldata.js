
// Model data in format for charts
class ModelData {
    constructor(viewer) {
        this._modelData = {};
        this._viewer = viewer;
    }

    init(callback) {
        let _this = this;

        _this.getAllLeafComponents(function (dbIds) {
            let count = dbIds.length;
            dbIds.forEach(function (dbId) {
               viewer.getProperties(dbId, function (props) {
                    props.properties.forEach(function (prop) {
                        if (!isNaN(prop.displayValue)) return; // let's not categorize properties that store numbers

                        // some adjustments for revit:
                        prop.displayValue = prop.displayValue.replace('Revit ', ''); // remove this Revit prefix
                        if (prop.displayValue.indexOf('<') == 0) return; // skip categories that start with <

                        // ok, now let's organize the data into this hash table
                        if (_this._modelData[prop.displayName] == null) _this._modelData[prop.displayName] = {};
                        if (_this._modelData[prop.displayName][prop.displayValue] == null) _this._modelData[prop.displayName][prop.displayValue] = [];
                        _this._modelData[prop.displayName][prop.displayValue].push(dbId);
                    })
                    if ((--count) == 0) callback();
                });
            })
        })
    }

    getAllLeafComponents(callback) {

        // from https://learnforge.autodesk.io/#/viewer/extensions/panel?id=enumerate-leaf-nodes
        // fix https://stackoverflow.com/questions/41558468/how-to-get-the-model-object-tree-of-2d-drawing
        // let instanceTree = _viewer.model.getData().instanceTree;
            // console.log(this._viewer)
        var instanceTree = viewer.model.getData().instanceTree;
        var allLeafComponents = [];
        instanceTree.enumNodeChildren(instanceTree.getRootId(), function (dbId) {
            if (instanceTree.getChildCount(dbId) === 0) {
                allLeafComponents.push(dbId);
            }
        }, true);
        callback(allLeafComponents);
        // console.log("instance tree",instanceTree);
        // viewer.getObjectTree(function (tree) {
        //     var leaves = [];
        //     tree.enumNodeChildren(tree.getRootId(), function (dbId) {
        //         if (tree.getChildCount(dbId) === 0) {
        //             leaves.push(dbId);
        //         }
        //     }, true);
        //     callback(leaves);
        // });
    }

}
