import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";

export default class BlenderAreaEditorModel extends NobucaPanelModel {

    constructor(editor) {
        super();
        this.editor = editor;
    }

    getEditor() {
        return this.editor;
    }

    setEditor(editor) {
        this.editor = editor;
    }

}