import BlenderEditorModel from "./BlenderEditorModel.js";
import BlenderControlButtonDropDownModel from "../control/button-drop-down/BlenderControlButtonDropDownModel.js"
import NobucaMenubarModel from "../../../../nobuca-core/menubar/NobucaMenubarModel.js";
import NobucaMenuItemModel from "../../../../nobuca-core/menu/NobucaMenuItemModel.js";

export default class BlenderTimelineEditorModel extends BlenderEditorModel {

    createRegionHeaderControls() {
        this.createRegionHeaderEditorSelector();
        this.createRegionHeaderPlayback();
        this.createRegionHeaderKeying();
        this.createRegionHeaderMenubar();
    }

    createRegionHeaderEditorSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./window-system/icons/icon-editor-timeline.svg");
        this.getRegionHeader().getLeftSide().addChild(control);
    }

    createRegionHeaderPlayback() {
        var control = new BlenderControlButtonDropDownModel();
        control.setTitle("Playback");
        this.getRegionHeader().getLeftSide().addChild(control);
    }

    createRegionHeaderKeying() {
        var control = new BlenderControlButtonDropDownModel();
        control.setTitle("Keying");
        this.getRegionHeader().getLeftSide().addChild(control);
    }

    createRegionHeaderMenubar() {
        var menubar = new NobucaMenubarModel();
        menubar.addMenuItem(new NobucaMenuItemModel("view", "View"));
        menubar.addMenuItem(new NobucaMenuItemModel("marker", "Marker"));
        this.getRegionHeader().getLeftSide().addChild(menubar);
    }
}