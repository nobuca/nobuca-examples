import NobucaComponentModel from "../../../../nobuca-core/component/NobucaComponentModel.js";
import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";
import BlenderEditorRegionHeaderModel from "./BlenderEditorRegionHeaderModel.js";

export default class BlenderEditorModel extends NobucaComponentModel {

    constructor() {
        super();
        this.createRegionMain();
        this.createRegionHeader();
        this.createRegionToolSettings();
        this.createRegionToolbar();
        this.createRegionSidebar();
        this.createRegionAdjustLastOperation();
    }

    getClassName() {
        return "BlenderEditorModel";
    }

    createRegionMain() {
        this.regionMain = new NobucaPanelModel();
    }

    createRegionHeader() {
        this.regionHeader = new BlenderEditorRegionHeaderModel();
        this.createRegionHeaderControls();
    }

    createRegionHeaderControls() {
        
    }

    getRegionHeader() {
        return this.regionHeader;
    }

    createRegionToolbar() {
        this.regionToolbar = new NobucaPanelModel();
        this.createRegionToolbarControls();
    }

    createRegionToolbarControls() {
        
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