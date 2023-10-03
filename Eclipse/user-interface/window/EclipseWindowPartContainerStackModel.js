import NobucaTabsHeaderModel from "../../../../nobuca-core/tabs/NobucaTabsHeaderModel.js";
import NobucaTabModel from "../../../../nobuca-core/tabs/NobucaTabModel.js";
import EclipsePartContainerModel from "./EclipseWindowPartContainerModel.js";
import NobucaButtonbarItemModel from "../../../../nobuca-core/buttonbar/NobucaButtonbarItemModel.js";
import NobucaButtonbarModel from "../../../../nobuca-core/buttonbar/NobucaButtonbarModel.js";

export default class EclipseWindowPartContainerStackModel extends EclipsePartContainerModel {

    constructor() {
        super();
        this.parts = [];
        this.createTabsHeader();
        this.createButtonbar();
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

    createButtonbar() {
        this.buttonbar = new NobucaButtonbarModel();
        this.getButtonbar().addItem(new NobucaButtonbarItemModel("./user-interface/icons/thin_min_view.svg"));
        this.getButtonbar().addItem(new NobucaButtonbarItemModel("./user-interface/icons/thin_max_view.svg"));
    }

    getButtonbar() {
        return this.buttonbar;
    }

    getParts() {
        return this.parts;
    }

    addPart(part) {
        this.parts.push(part);
        var tab = new NobucaTabModel(part.getId(), part.getTitle());
        tab.setImageSrc(part.getImageSrc());
        tab.setCloseable(part.getCloseable());
        this.getTabsHeader().addTab(tab);
        return part;
    }
}