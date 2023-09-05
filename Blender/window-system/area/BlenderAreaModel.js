import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";

export default class BlenderAreaModel extends NobucaPanelModel {

    setEditor(editor) {
        this.editor = editor;
    }

    getEditor() {
        return this.editor;
    }
}