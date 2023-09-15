import BlenderEditorModel from "./BlenderEditorModel.js";
import NobucaMenubarModel from "../../../../nobuca-core/menubar/NobucaMenubarModel.js";
import NobucaMenuItemModel from "../../../../nobuca-core/menu/NobucaMenuItemModel.js";
import BlenderControlConsoleModel from "../control/console/BlenderControlConsoleModel.js";

export default class BlenderEditorConsoleModel extends BlenderEditorModel {

    getEditorIconImageSrc() {
        return "./user-interface/icons/icon-editor-console.svg"
    }

    createRegionHeaderControls() {
        this.createRegionHeaderMenubar();
    }

    createRegionHeaderMenubar() {
        var menubar = new NobucaMenubarModel();
        menubar.addMenuItem(new NobucaMenuItemModel("view", "View"));
        menubar.addMenuItem(new NobucaMenuItemModel("console", "Console"));
        this.getRegionHeader().getLeftSide().addChild(menubar);
    }

    createRegionMainControl() {
        var control = new BlenderControlConsoleModel();
        this.setRegionMainControl(control);
    }
}