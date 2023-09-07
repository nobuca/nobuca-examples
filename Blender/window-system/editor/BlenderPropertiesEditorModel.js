import BlenderEditorModel from "./BlenderEditorModel.js";
import BlenderControlButtonDropDownModel from "../control/button-drop-down/BlenderControlButtonDropDownModel.js"

export default class BlenderPropertiesEditorModel extends BlenderEditorModel {

    createRegionHeaderControls() {
        this.createRegionHeaderEditorSelector();
        this.createRegionHeaderSearch();
        this.createRegionHeaderSyncSelector();
    }

    createRegionHeaderEditorSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./window-system/icons/menu-item-icon-editor-properties.svg");
        this.getRegionHeader().getLeftSide().addChild(control);
    }

    createRegionHeaderSearch() {

    }

    createRegionHeaderSyncSelector() {
        var control = new BlenderControlButtonDropDownModel();
        this.getRegionHeader().getRightSide().addChild(control);
    }
}