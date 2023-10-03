import BlenderEditorModel from "./BlenderEditorModel.js";
import BlenderControlButtonDropDownModel from "../control/button-drop-down/BlenderControlButtonDropDownModel.js"
import BlenderControlSearchModel from "../control/search/BlenderControlSearchModel.js"
import BlenderControlButtonModel from "../control/button/BlenderControlButtonModel.js"
import BlenderControlOutlinerModel from "../control/outliner/BlenderControlOutlinerModel.js"
import NobucaTreeNodeModel from "../../../../nobuca-core/tree/NobucaTreeNodeModel.js";
import NobucaTreeNodeIconModel from "../../../../nobuca-core/tree/NobucaTreeNodeIconModel.js";
import NobucaTreeNodeTextModel from "../../../../nobuca-core/tree/NobucaTreeNodeTextModel.js";

export default class BlenderEditorOutlinerModel extends BlenderEditorModel {

    getEditorIconImageSrc() {
        return "./user-interface/icons/icon-editor-outliner.svg"
    }

    createRegionHeaderControls() {
        this.createRegionHeaderDisplayModeSelector();
        this.createRegionHeaderSearch();
        this.createRegionHeaderFilterSelector();
        this.createRegionHeaderNewCollection();
    }

    createRegionHeaderDisplayModeSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./user-interface/icons/icon-data-block-view-layer.svg");
        this.getRegionHeader().getLeftSide().addChild(control);
    }

    createRegionHeaderSearch() {
        var search = new BlenderControlSearchModel();
        this.getRegionHeader().getCenterSide().addChild(search);
    }

    createRegionHeaderFilterSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./user-interface/icons/icon-filter.svg");
        this.getRegionHeader().getRightSide().addChild(control);
    }

    createRegionHeaderNewCollection() {
        var control = new BlenderControlButtonModel();
        control.setImageSrc("./user-interface/icons/icon-new-collection.svg");
        this.getRegionHeader().getRightSide().addChild(control);
    }

    createRegionMainControl() {
        var outliner = new BlenderControlOutlinerModel();
        this.setRegionMainControl(outliner);

        outliner.setExpandButtonIconSrc("./user-interface/icons/icon-tree-node-expand.svg");
        outliner.setCollapseButtonIconSrc("./user-interface/icons/icon-tree-node-collapse.svg");

        var nodeSceneCollection = outliner.addNode(new NobucaTreeNodeModel("Scene Collection"));
        nodeSceneCollection.addLeftSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-collection.svg"));
        nodeSceneCollection.addLeftSideComponent(new NobucaTreeNodeTextModel("Scene Collection"));
        nodeSceneCollection.expand();

        var nodeCollection = nodeSceneCollection.addNode(new NobucaTreeNodeModel());
        nodeCollection.addLeftSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-collection.svg"));
        nodeCollection.addLeftSideComponent(new NobucaTreeNodeTextModel("Collection"));
        nodeCollection.addRightSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-checked.svg"));
        nodeCollection.addRightSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-eye-opened.svg"));
        nodeCollection.addRightSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-small-camera.svg"));
        nodeCollection.expand();

        var nodeCameraObject = nodeCollection.addNode(new NobucaTreeNodeModel());
        nodeCameraObject.addLeftSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-big-camera-orange.svg"));
        nodeCameraObject.addLeftSideComponent(new NobucaTreeNodeTextModel("Camera"));
        nodeCameraObject.addRightSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-eye-opened.svg"));
        nodeCameraObject.addRightSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-small-camera.svg"));
 
        var nodeCameraData = nodeCameraObject.addNode(new NobucaTreeNodeModel());
        nodeCameraData.addLeftSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-big-camera-green.svg"));
        nodeCameraData.addLeftSideComponent(new NobucaTreeNodeTextModel("Camera"));

        var nodeMeshObject = nodeCollection.addNode(new NobucaTreeNodeModel());
        nodeMeshObject.addLeftSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-mesh-orange.svg"));
        nodeMeshObject.addLeftSideComponent(new NobucaTreeNodeTextModel("Cube"));
        nodeMeshObject.addRightSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-eye-opened.svg"));
        nodeMeshObject.addRightSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-small-camera.svg"));

        var nodeMeshData = nodeMeshObject.addNode(new NobucaTreeNodeModel());
        nodeMeshData.addLeftSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-mesh-green.svg"));
        nodeMeshData.addLeftSideComponent(new NobucaTreeNodeTextModel("Cube"));

        var nodeMaterialData = nodeMeshData.addNode(new NobucaTreeNodeModel());
        nodeMaterialData.addLeftSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-material-red.svg"));
        nodeMaterialData.addLeftSideComponent(new NobucaTreeNodeTextModel("Material"));

        var nodeLight = nodeCollection.addNode(new NobucaTreeNodeModel());
        nodeLight.addLeftSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-light-bulb-orange.svg"));
        nodeLight.addLeftSideComponent(new NobucaTreeNodeTextModel("Light"));
        nodeLight.addRightSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-eye-opened.svg"));
        nodeLight.addRightSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-small-camera.svg"));

        var nodeLightDataPoint = nodeLight.addNode(new NobucaTreeNodeModel("Light"));
        nodeLightDataPoint.addLeftSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/icon-light-point-green.svg"));
        nodeLightDataPoint.addLeftSideComponent(new NobucaTreeNodeTextModel("Light"));
    }
}