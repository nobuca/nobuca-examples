import NobucaAppModel from "../../nobuca-core/app/NobucaAppModel.js";
import NobucaPanelModel from "../../nobuca-core/panel/NobucaPanelModel.js";
import BlenderTopbarModel  from "./window-system/topbar/BlenderTopbarModel.js";
import BlenderWorkspaceModel  from "./window-system/workspace/BlenderWorkspaceModel.js";
import Blender3dViewportEditorModel  from "./window-system/editor/Blender3dViewportEditorModel.js";
import BlenderOutlinerEditorModel  from "./window-system/editor/BlenderOutlinerEditorModel.js";
import BlenderPropertiesEditorModel  from "./window-system/editor/BlenderPropertiesEditorModel.js";
import BlenderTimelineEditorModel  from "./window-system/editor/BlenderTimelineEditorModel.js";
import BlenderAreaEditorModel  from "./window-system/area/BlenderAreaEditorModel.js";

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
        
        var workspaceLayout = new BlenderWorkspaceModel();
        this.workspaces.push(workspaceLayout);
        workspaceLayout.setId("layout");
        workspaceLayout.setTitle("Layout");
        workspaceLayout.addArea(new BlenderAreaEditorModel(new Blender3dViewportEditorModel()));
        workspaceLayout.addArea(new BlenderAreaEditorModel(new BlenderOutlinerEditorModel()));
        workspaceLayout.addArea(new BlenderAreaEditorModel(new BlenderPropertiesEditorModel()));
        workspaceLayout.addArea(new BlenderAreaEditorModel(new BlenderTimelineEditorModel()));

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
        this.getAreasPanel().addChild(workspace);
    }
}