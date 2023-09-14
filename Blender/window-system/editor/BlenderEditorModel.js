import NobucaComponentModel from "../../../../nobuca-core/component/NobucaComponentModel.js";
import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";
import BlenderControlToolbarModel from "../control/toolbar/BlenderControlToolbarModel.js";
import BlenderEditorRegionHeaderModel from "./BlenderEditorRegionHeaderModel.js";
import BlenderControlButtonDropDownModel from "../control/button-drop-down/BlenderControlButtonDropDownModel.js"

export default class BlenderEditorModel extends NobucaComponentModel {

    constructor() {
        super();
        this.createRegionMainControl();
        this.createRegionHeader();
        this.createRegionToolSettings();
        this.createRegionToolbar();
        this.createRegionSidebar();
        this.createRegionAdjustLastOperation();
    }

    getClassName() {
        return "BlenderEditorModel";
    }

    setRegionMainControl(control) {
        this.regionMainControl = control;
    }

    getRegionMainControl() {
        return this.regionMainControl;
    }

    createRegionMainControl() {
        
    }

    createRegionHeader() {
        this.regionHeader = new BlenderEditorRegionHeaderModel();
        this.createRegionHeaderEditorSelector();
        this.createRegionHeaderControls();
    }

    getEditorIconImageSrc() {
    }

    createRegionHeaderEditorSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc(this.getEditorIconImageSrc());
        this.getRegionHeader().getLeftSide().addChild(control);
    }

    createRegionHeaderControls() {
        
    }

    getRegionHeader() {
        return this.regionHeader;
    }

    createRegionToolbar() {
        this.regionToolbar = new BlenderControlToolbarModel();
        this.createRegionToolbarMenus();
    }

    createRegionToolbarMenus() {
        
    }
    
    getRegionToolbar() {
        return this.regionToolbar;
    }

    createRegionToolSettings() {
        this.regionToolSettings = new NobucaPanelModel();
        this.createRegionToolSettingsControls();
    }

    createRegionToolSettingsControls() {

    }
    
    getRegionToolSettings() {
        return this.regionToolSettings;
    }

    createRegionSidebar() {
        this.regionSidebarPanel = new NobucaPanelModel();
    }

    getRegionSidebar() {
        return this.regionSidebarPanel;
    }

    createRegionAdjustLastOperation() {
        this.regionAdjustLastOperationPanel = new NobucaPanelModel();
    }

    getRegionAdjustLastOperation() {
        return this.regionAdjustLastOperationPanel;
    }
}