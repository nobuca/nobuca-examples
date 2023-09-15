import NobucaAppModel from "../../nobuca-core/app/NobucaAppModel.js";
import NobucaPanelModel from "../../nobuca-core/panel/NobucaPanelModel.js";
import BlenderTopbarModel from "./user-interface/topbar/BlenderTopbarModel.js";
import BlenderWorkspaceModel from "./user-interface/workspace/BlenderWorkspaceModel.js";
import NobucaPanelSplitLeftRightModel from "../../nobuca-core/panel-split/NobucaPanelSplitLeftRightModel.js";
import NobucaPanelSplitTopBottomModel from "../../nobuca-core/panel-split/NobucaPanelSplitTopBottomModel.js";
import BlenderEditorContainerModel from "./user-interface/editor/BlenderEditorContainerModel.js";
import BlenderStatusbarModel from "./user-interface/statusbar/BlenderStatusbarModel.js";
import BlenderWorkspaceLayoutModel from "./user-interface/workspace/BlenderWorkspaceLayoutModel.js";
import BlenderWorkspaceModelingModel from "./user-interface/workspace/BlenderWorkspaceModelingModel.js";
import BlenderWorkspaceSculptingModel from "./user-interface/workspace/BlenderWorkspaceSculptingModel.js";
import BlenderWorkspaceUvEditingModel from "./user-interface/workspace/BlenderWorkspaceUvEditingModel.js";
import BlenderWorkspaceTexturePaintingModel from "./user-interface/workspace/BlenderWorkspaceTexturePaintingModel.js";

export default class BlenderAppModel extends NobucaAppModel {

    constructor() {
        super();
        this.setTitle("Blender");
        this.createWorkspaces();
        this.createTopbar();
        this.createAreas();
        this.createStatusbar();
        this.createWorkspaceActivatedEventEmitter();
        this.activateWorkspace("layout");
    }

    getClassName() {
        return "BlenderAppModel";
    }

    createWorkspaces() {
        this.workspaces = [];

        this.getWorkspaces().push(new BlenderWorkspaceLayoutModel());
        this.getWorkspaces().push(new BlenderWorkspaceModelingModel());
        this.getWorkspaces().push(new BlenderWorkspaceSculptingModel());
        this.getWorkspaces().push(new BlenderWorkspaceUvEditingModel());
        this.getWorkspaces().push(new BlenderWorkspaceTexturePaintingModel());

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

    createTopbar() {
        this.topbar = new BlenderTopbarModel();

        this.getWorkspaces().forEach(workspace => {
            this.topbar.addWorkspace(workspace);
        });

        this.listenTopbar();
    }

    listenTopbar() {
        this.getTopbar().getWorkspaceChangeRequestedEventEmitter().subscribe(workspaceId => {
            this.activateWorkspace(workspaceId);
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
        this.getWorkspaceActivatedRequestedEventEmitter().emit(workspace);
    }

    createWorkspaceActivatedEventEmitter() {
        this.workspaceActivatedEventEmitter = this.createEventEmitter();
    }

    getWorkspaceActivatedRequestedEventEmitter() {
        return this.workspaceActivatedEventEmitter;
    }
}