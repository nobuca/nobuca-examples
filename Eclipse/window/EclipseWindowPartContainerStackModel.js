import NobucaTabsHeaderModel from "../../../nobuca-core/tabs/NobucaTabsHeaderModel.js";
import NobucaTabModel from "../../../nobuca-core/tabs/NobucaTabModel.js";
import EclipsePartContainerModel from "./EclipseWindowPartContainerModel.js";

export default class EclipseWindowPartContainerStackModel extends EclipsePartContainerModel {

    constructor() {
        super();
        this.parts = [];
        this.createTabsHeader();
    }

    getClassName() {
        return "EclipseWindowPartContainerStackModel";
    }

    createTabsHeader() {
        this.tabsHeader = new NobucaTabsHeaderModel();
    }

    getTabsHeader() {
        return this.tabsHeader;
    }

    getParts() {
        return this.parts;
    }

    addPart(part) {
        this.parts.push(part);
        var tab = new NobucaTabModel(part.getId(), part.getTitle());
        tab.setCloseable(part.getCloseable());
        this.getTabsHeader().addTab(tab);
        return part;
    }
}