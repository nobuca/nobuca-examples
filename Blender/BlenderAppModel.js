import NobucaAppModel from "../../nobuca-core/app/NobucaAppModel.js";
import NobucaPanelModel from "../../nobuca-core/panel/NobucaPanelModel.js";
import BlenderTopbarModel  from "./window-system/topbar/BlenderTopbarModel.js";
import BlenderWorkspaceModel  from "./window-system/workspace/BlenderWorkspaceModel.js";
import NobucaPanelSplitLeftRightModel from "../../nobuca-core/panel-split/NobucaPanelSplitLeftRightModel.js";
import NobucaPanelSplitTopBottomModel from "../../nobuca-core/panel-split/NobucaPanelSplitTopBottomModel.js";
import Blender3dViewportEditorModel  from "./window-system/editor/Blender3dViewportEditorModel.js";
import BlenderOutlinerEditorModel  from "./window-system/editor/BlenderOutlinerEditorModel.js";
import BlenderPropertiesEditorModel  from "./window-system/editor/BlenderPropertiesEditorModel.js";
import BlenderTimelineEditorModel  from "./window-system/editor/BlenderTimelineEditorModel.js";
import BlenderAreaModel from "./window-system/area/BlenderAreaModel.js";

export default class BlenderAppModel extends NobucaAppModel {

    constructor() {
        super();
        this.setTitle("Blender");
        this.createWorkspaces();
        this.createTopbarPanel();
        this.createAreasPanel();
        this.createStatusBarPanel();
        this.activateWorkspace("layout");
    }

    getClassName() {
        return "BlenderAppModel";
    }

    createWorkspaces() {
        this.workspaces = [];

        this.createWorkspaceLayout();
 
        var workspaceModeling = new BlenderWorkspaceModel();
        this.workspaces.push(workspaceModeling);
        workspaceModeling.setId("modeling");
        workspaceModeling.setTitle("Modeling");

        var workspaceSculpting = new BlenderWorkspaceModel();
        this.workspaces.push(workspaceSculpting);
        workspaceSculpting.setId("sculpting");
        workspaceSculpting.setTitle("Sculpting");

        var workspaceUvEditing = new BlenderWorkspaceModel();
        this.workspaces.push(workspaceUvEditing);
        workspaceUvEditing.setId("UvEditing");
        workspaceUvEditing.setTitle("UV Editing");

        var workspaceTexturePainting = new BlenderWorkspaceModel();
        this.workspaces.push(workspaceTexturePainting);
        workspaceTexturePainting.setId("texturePainting");
        workspaceTexturePainting.setTitle("Texture Painting");
        
        var workspaceShading = new BlenderWorkspaceModel();
        this.workspaces.push(workspaceShading);
        workspaceShading.setId("shading");
        workspaceShading.setTitle("Shading");
        
        var workspaceAnimation = new BlenderWorkspaceModel();
        this.workspaces.push(workspaceAnimation);
        workspaceAnimation.setId("animation");
        workspaceAnimation.setTitle("Animation");
                
        var workspaceRendering = new BlenderWorkspaceModel();
        this.workspaces.push(workspaceRendering);
        workspaceRendering.setId("rendering");
        workspaceRendering.setTitle("Rendering");
                        
        var workspaceCompositing = new BlenderWorkspaceModel();
        this.workspaces.push(workspaceCompositing);
        workspaceCompositing.setId("compositing");
        workspaceCompositing.setTitle("Compositing");
                               
        var workspaceGeometryNodes = new BlenderWorkspaceModel();
        this.workspaces.push(workspaceGeometryNodes);
        workspaceGeometryNodes.setId("geometryNodes");
        workspaceGeometryNodes.setTitle("Geometry Nodes");
           
        var workspaceScripting = new BlenderWorkspaceModel();
        this.workspaces.push(workspaceScripting);
        workspaceScripting.setId("scripting");
        workspaceScripting.setTitle("Scripting");

        var workspaceAdd = new BlenderWorkspaceModel();
        this.workspaces.push(workspaceAdd);
        workspaceAdd.setId("add");
        workspaceAdd.setTitle("+");
    }

    createWorkspaceLayout() {
        var workspace = new BlenderWorkspaceModel();
        this.getWorkspaces().push(workspace);
        workspace.setId("layout");
        workspace.setTitle("Layout");

        var areaColumnLeft = new NobucaPanelModel();
        areaColumnLeft.setId("areaColumnLeft");

        var areaColumnRight = new NobucaPanelModel();
        areaColumnRight.setId("areaColumnRight");

        var splitLeftRight = new NobucaPanelSplitLeftRightModel(areaColumnLeft, areaColumnRight, .7);
        workspace.addChild(splitLeftRight);

        var areaColumnLeftTop = new NobucaPanelModel();
        areaColumnLeftTop.setId("areaColumnLeftTop");
        areaColumnLeftTop.addChild(new Blender3dViewportEditorModel());

        var areaColumnLeftBottom = new NobucaPanelModel();
        areaColumnLeftBottom.setId("areaColumnLeftBottom");
        areaColumnLeftBottom.addChild(new BlenderTimelineEditorModel());

        var splitColumnLeftTopBottom = new NobucaPanelSplitTopBottomModel(areaColumnLeftTop, areaColumnLeftBottom, .7);
        areaColumnLeft.addChild(splitColumnLeftTopBottom);

        var areaColumnRightTop = new NobucaPanelModel();
        areaColumnRightTop.setId("areaColumnLeftTop");
        areaColumnRightTop.addChild(new BlenderOutlinerEditorModel());

        var areaColumnRightBottom = new NobucaPanelModel();
        areaColumnRightBottom.setId("areaColumnRightBottom");
        areaColumnRightBottom.addChild(new BlenderPropertiesEditorModel());

        var splitColumnRightTopBottom = new NobucaPanelSplitTopBottomModel(areaColumnRightTop, areaColumnRightBottom, .6);
        areaColumnRight.addChild(splitColumnRightTopBottom);


   }

    getWorkspaces() {
        return this.workspaces;
    }

    createTopbarPanel() {
        this.topbarPanel = new BlenderTopbarModel();
        this.getRootPanel().addChild(this.topbarPanel);

        this.getWorkspaces().forEach(workspace => {
            this.topbarPanel.addWorkspace(workspace); 
        });
    }

    createAreasPanel() {
        this.areasPanel = new NobucaPanelModel();
        this.areasPanel.setId("areasPanel");
        this.getRootPanel().addChild(this.areasPanel);
    }

    getAreasPanel() {
        return this.areasPanel;
    }

    createStatusBarPanel() {
        this.statusBarPanel = new NobucaPanelModel();
        this.statusBarPanel.setId("statusBarPanel");
        this.getRootPanel().addChild(this.statusBarPanel);
    }

    getWorkspace(workspaceId) {
        return this.getWorkspaces().find(workspace => workspace.getId() == workspaceId);
    }

    activateWorkspace(workspaceId) {
        var workspace = this.getWorkspace(workspaceId);
        this.getAreasPanel().clear();
        console.log("activateWorkspace");
        this.getAreasPanel().addChild(workspace);
    }
}