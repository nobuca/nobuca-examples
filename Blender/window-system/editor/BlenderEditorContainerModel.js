import NobucaComponentModel from "../../../../nobuca-core/component/NobucaComponentModel.js";
import Blender3dViewportEditorModel from "./Blender3dViewportEditorModel.js";
import BlenderOutlinerEditorModel  from "./BlenderOutlinerEditorModel.js";
import BlenderPropertiesEditorModel  from "./BlenderPropertiesEditorModel.js";
import BlenderTimelineEditorModel  from "./BlenderTimelineEditorModel.js";

export default class BlenderEditorContainerModel extends NobucaComponentModel {

    constructor(type) {
        super();
        this.activeEditorChangedEventEmitter = this.createEventEmitter();
        this.setActiveEditor(this.creteEditor(type));
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
        this.activeEditor = activeEditor;
    }

    creteEditor(type) {
        if (type == "3dViewport") return new Blender3dViewportEditorModel();
        if (type == "outliner") return new BlenderOutlinerEditorModel();
        if (type == "properties") return new BlenderPropertiesEditorModel();
        if (type == "timeline") return new BlenderTimelineEditorModel();
        return null;
    }

    
}