import NobucaComponentModel from "../../../../nobuca-core/component/NobucaComponentModel.js";
import BlenderEditor3dViewportModel from "./BlenderEditor3dViewportModel.js";
import BlenderEditorConsoleModel from "./BlenderEditorConsoleModel.js";
import BlenderEditorOutlinerModel from "./BlenderEditorOutlinerModel.js";
import BlenderEditorPropertiesModel from "./BlenderEditorPropertiesModel.js";
import BlenderEditorTimelineModel from "./BlenderEditorTimelineModel.js";
import BlenderEditorUvModel from "./BlenderEditorUvModel.js";

export default class BlenderEditorContainerModel extends NobucaComponentModel {

    constructor(type) {
        super();
        this.activeEditorChangedEventEmitter = this.createEventEmitter();
        this.setActiveEditor(this.createEditor(type));
    }

    getClassName() {
        return "BlenderEditorContainerModel";
    }

    getActiveEditorChangedEventEmitter() {
        return this.activeEditorChangedEventEmitter;
    }

    getActiveEditor() {
        return this.activeEditor;
    }

    setActiveEditor(activeEditor) {

        this.unlistenActiveEditor();

        this.activeEditor = activeEditor;

        this.listenActiveEditor();
    }

    createEditor(type) {
        if (type == "3dViewport") return new BlenderEditor3dViewportModel();
        if (type == "outliner") return new BlenderEditorOutlinerModel();
        if (type == "properties") return new BlenderEditorPropertiesModel();
        if (type == "timeline") return new BlenderEditorTimelineModel();
        if (type == "uv") return new BlenderEditorUvModel();
        if (type == "console") return new BlenderEditorConsoleModel();
        return null;
    }

    unlistenActiveEditor() {
        if (this.getActiveEditor() == null) return;
        this.getActiveEditor().getEditorChangeRequestedEventEmitter().unsuscribe(this.subscription);
    }

    listenActiveEditor() {
        console.log("listenActiveEditor");
        this.subscription = this.getActiveEditor().getEditorChangeRequestedEventEmitter().subscribe((type) => {
            var editor = this.createEditor(type);
            if (editor != null) {
                this.setActiveEditor(this.createEditor(type));
                this.getActiveEditorChangedEventEmitter().emit();
            }
        });
    }

}