import BlenderEditorModel from "./BlenderEditorModel.js";
import BlenderControlButtonDropDownModel from "../control/button-drop-down/BlenderControlButtonDropDownModel.js"
import NobucaMenubarModel from "../../../../nobuca-core/menubar/NobucaMenubarModel.js";
import NobucaMenuItemModel from "../../../../nobuca-core/menu/NobucaMenuItemModel.js";
import NobucaButtonBarModel from "../../../../nobuca-core/button-bar/NobucaButtonBarModel.js";
import NobucaButtonBarItemModel from "../../../../nobuca-core/button-bar/NobucaButtonBarItemModel.js";
import BlenderFieldNumberModel from "../field/number/BlenderFieldNumberModel.js";
import BlenderControlButtonModel from "../control/button/BlenderControlButtonModel.js";
import BlenderControlTimelineModel from "../control/timeline/BlenderControlTimelineModel.js";

export default class BlenderEditorTimelineModel extends BlenderEditorModel {

    getEditorIconImageSrc() {
        return "./user-interface/icons/icon-editor-timeline.svg"
    }

    createRegionHeaderControls() {
        this.createRegionHeaderPlayback();
        this.createRegionHeaderKeying();
        this.createRegionHeaderMenubar();
        this.createRegionHeaderAutoKeying();
        this.createRegionHeaderTransportControls();
        this.createRegionHeaderCurrentFrame();
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

    createRegionHeaderAutoKeying() {
        var control = new BlenderControlButtonDropDownModel();
        control.setEnabledDisabledBehaviour(true);
        control.setEnabled(false);
        control.setPreventDropDownWhenDisabled(true);
        control.setEnabledImageSrc("./user-interface/icons/icon-auto-keying.svg");
        control.setDisabledImageSrc("./user-interface/icons/icon-auto-keying.svg");
        this.getRegionHeader().getCenterSide().addChild(control);
    }

    createRegionHeaderTransportControls() {
        var buttons = this.getRegionHeader().getCenterSide().addChild(new NobucaButtonBarModel());
        buttons.addItem(new NobucaButtonBarItemModel("./user-interface/icons/icon-jump-to-start.svg"));
        buttons.addItem(new NobucaButtonBarItemModel("./user-interface/icons/icon-jump-to-previous-keyframe.svg"));
        buttons.addItem(new NobucaButtonBarItemModel("./user-interface/icons/icon-rewind.svg"));
        buttons.addItem(new NobucaButtonBarItemModel("./user-interface/icons/icon-play.svg"));
        buttons.addItem(new NobucaButtonBarItemModel("./user-interface/icons/icon-jump-to-next-keyframe.svg"));
        buttons.addItem(new NobucaButtonBarItemModel("./user-interface/icons/icon-jump-to-end.svg"));
    }

    createRegionHeaderCurrentFrame() {
        this.getRegionHeader().getRightSide().addChild(new BlenderFieldNumberModel(30));
   
        var bar = this.getRegionHeader().getRightSide().addChild(new NobucaButtonBarModel());
        bar.addItem(new BlenderControlButtonModel("./user-interface/icons/icon-cronometer.svg"));
        var firstFrame = bar.addItem(new NobucaButtonBarItemModel());
        firstFrame.addChild(new BlenderFieldNumberModel(0)).setLabel("Start");
        var lastFrame = bar.addItem(new NobucaButtonBarItemModel());
        lastFrame.addChild(new BlenderFieldNumberModel(240)).setLabel("End");
    }

    createRegionMainControl() {
        var control = new BlenderControlTimelineModel();
        this.setRegionMainControl(control);
    }
}