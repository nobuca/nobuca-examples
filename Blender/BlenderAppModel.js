import NobucaAppModel from "../../nobuca-core/app/NobucaAppModel.js";
import NobucaPanelModel from "../../nobuca-core/panel/NobucaPanelModel.js";
import BlenderTopbarModel  from "./window-system/topbar/BlenderTopbarModel.js";
import BlenderWorkspaceModel  from "./window-system/workspace/BlenderWorkspaceModel.js";
import NobucaPanelSplitLeftRightModel from "../../nobuca-core/panel-split/NobucaPanelSplitLeftRightModel.js";
import NobucaPanelSplitTopBottomModel from "../../nobuca-core/panel-split/NobucaPanelSplitTopBottomModel.js";
import BlenderEditorContainerModel  from "./window-system/editor/BlenderEditorContainerModel.js";
import BlenderStatusbarModel from "./window-system/statusbar/BlenderStatusbarModel.js";

export default class BlenderAppModel extends NobucaAppModel {

    constructor() {
        super();
        this.setTitle("Blender");
        this.createWorkspaces();
        this.createTopbar();
        this.createAreas();
        this.createStatusbar();
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
        areaColumnLeftTop.addChild(new BlenderEditorContainerModel("3dViewport"));

        var areaColumnLeftBottom = new NobucaPanelModel();
        areaColumnLeftBottom.setId("areaColumnLeftBottom");
        areaColumnLeftBottom.addChild(new BlenderEditorContainerModel("timeline"));

        var splitColumnLeftTopBottom = new NobucaPanelSplitTopBottomModel(areaColumnLeftTop, areaColumnLeftBottom, .7);
        areaColumnLeft.addChild(splitColumnLeftTopBottom);

        var areaColumnRightTop = new NobucaPanelModel();
        areaColumnRightTop.setId("areaColumnLeftTop");
        areaColumnRightTop.addChild(new BlenderEditorContainerModel("outliner"));

        var areaColumnRightBottom = new NobucaPanelModel();
        areaColumnRightBottom.setId("areaColumnRightBottom");
        areaColumnRightBottom.addChild(new BlenderEditorContainerModel("properties"));

        var splitColumnRightTopBottom = new NobucaPanelSplitTopBottomModel(areaColumnRightTop, areaColumnRightBottom, .6);
        areaColumnRight.addChild(splitColumnRightTopBottom);
   }

    getWorkspaces() {
        return this.workspaces;
    }

    createTopbar() {
        this.topbar = new BlenderTopbarModel();

        this.getWorkspaces().forEach(workspace => {
            this.topbar.addWorkspace(workspace); 
        });
    }

    getTopbar() {
        return this.topbar;
    }

    createAreas() {
        this.areas = new NobucaPanelModel();
        this.areas.setId("areasPanel");
    }

    getAreas() {
        return this.areas;
    }

    createStatusbar() {
        this.statusbar = new BlenderStatusbarModel();
    }

    getStatusbar() {
        return this.statusbar;
    }

    getWorkspace(workspaceId) {
        return this.getWorkspaces().find(workspace => workspace.getId() == workspaceId);
    }

    activateWorkspace(workspaceId) {
        this.getTopbar().activateWorkspace(workspaceId);
        var workspace = this.getWorkspace(workspaceId);
        this.getAreas().clear();
        this.getAreas().addChild(workspace);
    }
}