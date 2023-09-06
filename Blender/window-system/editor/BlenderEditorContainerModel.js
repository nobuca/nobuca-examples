import NobucaComponentModel from "../../../../nobuca-core/component/NobucaComponentModel.js";
import Blender3dViewportEditorModel from "./Blender3dViewportEditorModel.js";
import BlenderOutlinerEditorModel  from "./BlenderOutlinerEditorModel.js";
import BlenderPropertiesEditorModel  from "./BlenderPropertiesEditorModel.js";
import BlenderTimelineEditorModel  from "./BlenderTimelineEditorModel.js";

export default class BlenderEditorContainerModel extends NobucaComponentModel {

    constructor(type) {
        super();
        this.activeEditorChangedEventEmitter = this.newEventEmitter();
        this.createEditors();
        this.changeActiveEditorByType(type);
    }

    getClassName() {
        return "BlenderEditorContainerModel";
    }

    getActiveEditorChangedEventEmitter() {
        return this.activeEditorChangedEventEmitter;
    }

    createEditors() {
        this.editor3dViewport = new Blender3dViewportEditorModel();
        this.editorOutliner = new BlenderOutlinerEditorModel();
        this.editorProperties = new BlenderPropertiesEditorModel();
        this.editorTimeline = new BlenderTimelineEditorModel();
    }

    getEditor3dViewport() {
        return this.editor3dViewport;
    }

    getEditorOutliner() {
        return this.editorOutliner;
    }

    getEditorProperties() {
        return this.editorProperties;
    }

    getEditorTimeline() {
        return this.editorTimeline;
    }

    getActiveEditor() {
        return this.activeEditor;
    }

    setActiveEditor(activeEditor) {
        this.activeEditor = activeEditor;
    }

    getEditorByType(type) {
        if (type == "3dViewport") return this.getEditor3dViewport();
        if (type == "outliner") return this.getEditorOutliner();
        if (type == "properties") return this.getEditorProperties();
        if (type == "timeline") return this.getEditorTimeline();
        return null;
    }

    changeActiveEditorByType(type) {
        var editor = this.getEditorByType(type);
        if (editor == null) return;
        this.setActiveEditor(editor);
        this.getActiveEditorChangedEventEmitter().emit();
    }
}