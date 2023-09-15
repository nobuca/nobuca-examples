import BlenderWorkspaceModel from "./BlenderWorkspaceModel.js";
import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";
import NobucaPanelSplitLeftRightModel from "../../../../nobuca-core/panel-split/NobucaPanelSplitLeftRightModel.js";
import NobucaPanelSplitTopBottomModel from "../../../../nobuca-core/panel-split/NobucaPanelSplitTopBottomModel.js";
import BlenderEditorContainerModel from "../editor/BlenderEditorContainerModel.js";

export default class BlenderWorkspaceTexturePaintingModel extends BlenderWorkspaceModel {

    constructor() {
        super();

        this.setId("texturePainting");
        this.setTitle("Texture Painting");

        var uvEditor = new NobucaPanelModel();
        uvEditor.setId("uvEditor");
        uvEditor.addChild(new NobucaPanelModel());

        var threeDViewportEditor = new NobucaPanelModel();
        threeDViewportEditor.setId("3dViewport");
        threeDViewportEditor.addChild(new BlenderEditorContainerModel("3dViewport"));

        var outlinerAndProperties = new NobucaPanelModel();
        outlinerAndProperties.setId("outlinerAndProperties");
        outlinerAndProperties.addChild(new NobucaPanelModel());

        var outliner = new NobucaPanelModel();
        outliner.setId("areaColumnRightTop");
        outliner.addChild(new BlenderEditorContainerModel("outliner"));

        var properties = new NobucaPanelModel();
        properties.setId("areaColumnRightBottom");
        properties.addChild(new BlenderEditorContainerModel("properties"));

        var splitOultineAndProperties = new NobucaPanelSplitTopBottomModel(outliner, properties, .35);

        var split1 = new NobucaPanelSplitLeftRightModel(threeDViewportEditor, splitOultineAndProperties, .7);

        var split2 = new NobucaPanelSplitLeftRightModel(uvEditor, split1, .45);
        this.addChild(split2);
    }
}