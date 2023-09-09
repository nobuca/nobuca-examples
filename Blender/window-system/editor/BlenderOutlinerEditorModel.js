import BlenderEditorModel from "./BlenderEditorModel.js";
import BlenderControlButtonDropDownModel from "../control/button-drop-down/BlenderControlButtonDropDownModel.js"
import BlenderControlSearchModel from "../control/search/BlenderControlSearchModel.js"
import BlenderControlButtonModel from "../control/button/BlenderControlButtonModel.js"
import BlenderControlOutlinerModel from "../control/outliner/BlenderControlOutlinerModel.js"
import NobucaTreeNodeModel from "../../../../nobuca-core/tree/NobucaTreeNodeModel.js";
import NobucaTreeNodeIconModel from "../../../../nobuca-core/tree/NobucaTreeNodeIconModel.js";
import NobucaTreeNodeTextModel from "../../../../nobuca-core/tree/NobucaTreeNodeTextModel.js";

export default class BlenderOutlinerEditorModel extends BlenderEditorModel {

    createRegionHeaderControls() {
        this.createRegionHeaderEditorSelector();
        this.createRegionHeaderDisplayModeSelector();
        this.createRegionHeaderSearch();
        this.createRegionHeaderFilterSelector();
        this.createRegionHeaderNewCollection();
    }

    createRegionHeaderEditorSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./window-system/icons/icon-editor-outliner.svg");
        this.getRegionHeader().getLeftSide().addChild(control);
    }

    createRegionHeaderDisplayModeSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./window-system/icons/icon-data-block-view-layer.svg");
        this.getRegionHeader().getLeftSide().addChild(control);
    }

    createRegionHeaderSearch() {
        var search = new BlenderControlSearchModel();
        this.getRegionHeader().getCenterSide().addChild(search);
    }

    createRegionHeaderFilterSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./window-system/icons/icon-filter.svg");
        this.getRegionHeader().getRightSide().addChild(control);
    }

    createRegionHeaderNewCollection() {
        var control = new BlenderControlButtonModel();
        control.setImageSrc("./window-system/icons/icon-new-collection.svg");
        this.getRegionHeader().getRightSide().addChild(control);
    }

    createRegionMainControls() {
        var outliner = new BlenderControlOutlinerModel();
        this.getRegionMain().addChild(outliner);

        outliner.setExpandButtonIconSrc("./window-system/icons/icon-tree-node-expand.svg");
        outliner.setCollapseButtonIconSrc("./window-system/icons/icon-tree-node-collapse.svg");

        var nodeSceneCollection = outliner.addNode(new NobucaTreeNodeModel("Scene Collection"));
        nodeSceneCollection.addRightSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-collection.svg"));
        nodeSceneCollection.addRightSideComponent(new NobucaTreeNodeTextModel("Scene Collection"));
        nodeSceneCollection.expand();

        var nodeCollection = nodeSceneCollection.addNode(new NobucaTreeNodeModel());
        nodeCollection.addRightSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-collection.svg"));
        nodeCollection.addRightSideComponent(new NobucaTreeNodeTextModel("Collection"));
        nodeCollection.addLeftSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-checked.svg"));
        nodeCollection.addLeftSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-eye-opened.svg"));
        nodeCollection.addLeftSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-small-camera.svg"));
        nodeCollection.expand();

        var nodeCameraObject = nodeCollection.addNode(new NobucaTreeNodeModel());
        nodeCameraObject.addRightSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-big-camera-orange.svg"));
        nodeCameraObject.addRightSideComponent(new NobucaTreeNodeTextModel("Camera"));
        nodeCameraObject.addLeftSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-eye-opened.svg"));
        nodeCameraObject.addLeftSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-small-camera.svg"));
        nodeCameraObject.expand();

        var nodeCameraData = nodeCameraObject.addNode(new NobucaTreeNodeModel());
        nodeCameraData.addRightSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-big-camera-green.svg"));
        nodeCameraData.addRightSideComponent(new NobucaTreeNodeTextModel("Camera"));

        var nodeMeshObject = nodeCollection.addNode(new NobucaTreeNodeModel());
        nodeMeshObject.addRightSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-mesh-orange.svg"));
        nodeMeshObject.addRightSideComponent(new NobucaTreeNodeTextModel("Cube"));
        nodeMeshObject.addLeftSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-eye-opened.svg"));
        nodeMeshObject.addLeftSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-small-camera.svg"));
        nodeMeshObject.expand();

        var nodeMeshData = nodeMeshObject.addNode(new NobucaTreeNodeModel());
        nodeMeshData.addRightSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-mesh-green.svg"));
        nodeMeshData.addRightSideComponent(new NobucaTreeNodeTextModel("Cube"));
        nodeMeshData.expand();

        var nodeMaterialData = nodeMeshData.addNode(new NobucaTreeNodeModel());
        nodeMaterialData.addRightSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-material-red.svg"));
        nodeMaterialData.addRightSideComponent(new NobucaTreeNodeTextModel("Material"));

        var nodeLight = nodeCollection.addNode(new NobucaTreeNodeModel());
        nodeLight.addRightSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-light-bulb-orange.svg"));
        nodeLight.addRightSideComponent(new NobucaTreeNodeTextModel("Light"));
        nodeLight.addLeftSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-eye-opened.svg"));
        nodeLight.addLeftSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-small-camera.svg"));
        nodeLight.expand();

        var nodeLightDataPoint = nodeLight.addNode(new NobucaTreeNodeModel("Light"));
        nodeLightDataPoint.addRightSideComponent(new NobucaTreeNodeIconModel("./window-system/icons/icon-light-point-green.svg"));
        nodeLightDataPoint.addRightSideComponent(new NobucaTreeNodeTextModel("Light"));
    }
}