import BlenderEditorModel from "./BlenderEditorModel.js";
import BlenderControlButtonDropDownModel from "../control/button-drop-down/BlenderControlButtonDropDownModel.js"
import BlenderControlSearchModel from "../control/search/BlenderControlSearchModel.js"
import BlenderControlButtonModel from "../control/button/BlenderControlButtonModel.js"
import BlenderControlOutlinerModel from "../control/outliner/BlenderControlOutlinerModel.js"

export default class BlenderOutlinerEditorModel extends BlenderEditorModel {

    createRegionHeaderControls() {
        this.createRegionHeaderEditorSelector();
        this.createRegionHeaderDisplayModeSelector();
        this.createRegionHeaderSearch();
        this.createRegionHeaderFilterSelector();
        this.createRegionHeaderNewCollection();
    }

    createRegionHeaderEditorSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./window-system/icons/menu-item-icon-editor-outliner.svg");
        this.getRegionHeader().getLeftSide().addChild(control);
    }

    createRegionHeaderDisplayModeSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./window-system/icons/menu-item-icon-data-block-view-layer.svg");
        this.getRegionHeader().getLeftSide().addChild(control);
    }

    createRegionHeaderSearch() {
        var search = new BlenderControlSearchModel();
        this.getRegionHeader().getCenterSide().addChild(search);
    }

    createRegionHeaderFilterSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./window-system/icons/menu-item-icon-filter.svg");
        this.getRegionHeader().getRightSide().addChild(control);
    }

    createRegionHeaderNewCollection() {
        var control = new BlenderControlButtonModel();
        control.setImageSrc("./window-system/icons/menu-item-icon-new-collection.svg");
        this.getRegionHeader().getRightSide().addChild(control);
    }

    createRegionMainControls() {
        var outliner = new BlenderControlOutlinerModel();
        this.getRegionMain().addChild(outliner);
    }
}