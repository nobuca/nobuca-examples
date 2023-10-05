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
        this.setStateNormal();
        this.partContainerStackMinimizedEventEmitter = this.createEventEmitter();
        this.partContainerStackMaximizedEventEmitter = this.createEventEmitter();
    }

    setSash(sash) {
        this.sash = sash;
    }
    
    getSash() {
        return this.sash;
    }

    setStateNormal() {
        this.state = "normal";
    }

    getStateNormal() {
        return this.state == "normal";
    }

    setStateMinimized() {
        this.state = "minimized";
    }

    getStateMinimized() {
        return this.state == "minimized";
    }

    setStateMaximized() {
        this.state = "maximized";
    }

    getStateMaximized() {
        return this.state == "maximized";
    }

    getPartContainerStackMinimizedEventEmitter() {
        return this.partContainerStackMinimizedEventEmitter;
    }

    getPartContainerStackMaximizedEventEmitter() {
        return this.partContainerStackMaximizedEventEmitter;
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
        var buttonMinimize = this.getButtonbar().addItem(new NobucaButtonbarItemModel("./user-interface/icons/thin_min_view.svg")).setTooltip("Minimize");
        buttonMinimize.getClickedEventEmitter().subscribe(() => {
            this.setStateMinimized();
            this.getPartContainerStackMinimizedEventEmitter().emit(this);
        });
        var buttonMaximize = this.getButtonbar().addItem(new NobucaButtonbarItemModel("./user-interface/icons/thin_max_view.svg")).setTooltip("Maximize");
        buttonMaximize.getClickedEventEmitter().subscribe(() => {
            this.setStateMaximized();
            this.getPartContainerStackMaximizedEventEmitter().emit(this);
        });
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