import NobucaComponentModel from "../../../../nobuca-core/component/NobucaComponentModel.js";
import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";

export default class BlenderEditorModel extends NobucaComponentModel {

    constructor() {
        super();
        this.createRegionHeaderPanel();
        this.createRegionMainPanel();
        this.createRegionToolbarPanel();
        this.createRegionToolSettingsPanel();
        this.createRegionSidebarPanel();
        this.createRegionAdjustLastOperationPanel();
    }

    getClassName() {
        return "BlenderEditorModel";
    }

    createRegionHeaderPanel() {
        this.regionHeaderPanel = new NobucaPanelModel();
    }

    getRegionHeaderPanel() {
        return this.regionHeaderPanel;
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