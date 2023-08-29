import NobucaAppModel from "../../nobuca-core/app/NobucaAppModel.js";
import NobucaPanelModel from "../../nobuca-core/panel/NobucaPanelModel.js";
import BlenderTopBarPanelModel  from "./BlenderTopBarPanelModel.js";

export default class BlenderAppModel extends NobucaAppModel {

    constructor() {
        super();
        this.setTitle("Blender");
        this.createTopBarPanel();
        this.createAreasPanel();
        this.createStatusBarPanel();
    }

    createTopBarPanel() {
        this.topBarPanel = new BlenderTopBarPanelModel();
        this.getRootPanel().addChild(this.topBarPanel);
    }

    createAreasPanel() {
        this.areasPanel = new NobucaPanelModel();
        this.areasPanel.setId("areasPanel");
        this.getRootPanel().addChild(this.areasPanel);
    }

    createStatusBarPanel() {
        this.statusBarPanel = new NobucaPanelModel();
        this.statusBarPanel.setId("statusBarPanel");
        this.getRootPanel().addChild(this.statusBarPanel);
    }
}