import NobucaComponentModel from "../../../../nobuca-core/component/NobucaComponentModel.js";
import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";
import BlenderEditorRegionHeaderModel from "./BlenderEditorRegionHeaderModel.js";

export default class BlenderEditorModel extends NobucaComponentModel {

    constructor() {
        super();
        this.createRegionMainPanel();
        this.createRegionHeader();
        this.createRegionToolSettingsPanel();
        this.createRegionToolbarPanel();
        this.createRegionSidebarPanel();
        this.createRegionAdjustLastOperationPanel();
    }

    getClassName() {
        return "BlenderEditorModel";
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
    
    createRegionMainPanel() {
        this.regionMainPanel = new NobucaPanelModel();
    }

    getRegionMainPanel() {
        return this.regionMainPanel;
    }

    createRegionToolbarPanel() {
        this.regionToolbarPanel = new NobucaPanelModel();
    }
    
    getRegionToolbarPanel() {
        return this.regionToolbarPanel;
    }

    createRegionToolSettingsPanel() {
        this.regionToolSettingsPanel = new NobucaPanelModel();
    }
    
    getRegionToolSettingsPanel() {
        return this.regionToolSettingsPanel;
    }

    createRegionSidebarPanel() {
        this.regionSidebarPanel = new NobucaPanelModel();
    }

    getRegionSidebarPanel() {
        return this.regionSidebarPanel;
    }

    createRegionAdjustLastOperationPanel() {
        this.regionAdjustLastOperationPanel = new NobucaPanelModel();
    }

    getRegionAdjustLastOperationPanel() {
        return this.regionAdjustLastOperationPanel;
    }
}