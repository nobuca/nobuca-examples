import NobucaTabsHeaderModel from "../../../../nobuca-core/tabs/NobucaTabsHeaderModel.js";
import NobucaTabHeaderModel from "../../../../nobuca-core/tabs/NobucaTabHeaderModel.js";
import EclipsePartContainerModel from "./EclipseWindowPartContainerModel.js";
import NobucaButtonbarItemModel from "../../../../nobuca-core/buttonbar/NobucaButtonbarItemModel.js";
import NobucaButtonbarModel from "../../../../nobuca-core/buttonbar/NobucaButtonbarModel.js";

export default class EclipseWindowPartContainerStackModel extends EclipsePartContainerModel {

    constructor() {
        super();
        this.parts = [];
        this.createTabsHeader();
        this.createButtonbarNormal();
        this.createButtonbarMaximized();
        this.setStateNormal();
        this.partContainerStackMinimizedEventEmitter = this.createEventEmitter();
        this.partContainerStackMaximizedEventEmitter = this.createEventEmitter();
        this.partContainerStackRestoredEventEmitter = this.createEventEmitter();
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

    getPartContainerStackRestoredEventEmitter() {
        return this.partContainerStackRestoredEventEmitter;
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

    createButtonbarNormal() {
        this.buttonbarNormal = new NobucaButtonbarModel();
        var buttonMinimize = this.getButtonbarNormal().addItem(new NobucaButtonbarItemModel("./user-interface/icons/thin_min_view.svg")).setTooltip("Minimize");
        buttonMinimize.getClickedEventEmitter().subscribe(() => {
            this.setStateMinimized();
            this.getPartContainerStackMinimizedEventEmitter().emit(this);
        });
        var buttonMaximize = this.getButtonbarNormal().addItem(new NobucaButtonbarItemModel("./user-interface/icons/thin_max_view.svg")).setTooltip("Maximize");
        buttonMaximize.getClickedEventEmitter().subscribe(() => {
            this.setStateMaximized();
            this.getPartContainerStackMaximizedEventEmitter().emit(this);
        });
    }

    getButtonbarNormal() {
        return this.buttonbarNormal;
    }

    createButtonbarMaximized() {
        this.buttonbarMaximized = new NobucaButtonbarModel();
        var buttonMinimize = this.getButtonbarMaximized().addItem(new NobucaButtonbarItemModel("./user-interface/icons/thin_min_view.svg")).setTooltip("Minimize");
        buttonMinimize.getClickedEventEmitter().subscribe(() => {
            this.setStateMinimized();
            this.getPartContainerStackMinimizedEventEmitter().emit(this);
        });
        var buttonRestore = this.getButtonbarMaximized().addItem(new NobucaButtonbarItemModel("./user-interface/icons/thin_restore_view.svg")).setTooltip("Restore");
        buttonRestore.getClickedEventEmitter().subscribe(() => {
            this.setStateNormal();
            this.getPartContainerStackRestoredEventEmitter().emit(this);
        });
    }

    getButtonbarMaximized() {
        return this.buttonbarMaximized;
    }

    getParts() {
        return this.parts;
    }

    addPart(part) {
        this.parts.push(part);
        var tab = new NobucaTabHeaderModel(part.getId(), part.getTitle());
        tab.setImageSrc(part.getImageSrc());
        tab.setCloseable(part.getCloseable());
        tab.getDoubleClickedEventEmitter().subscribe(() => {
            if (this.getStateMaximized()) {
                this.setStateNormal();
                this.getPartContainerStackRestoredEventEmitter().emit(this);
            } else {
                this.setStateMaximized();
                this.getPartContainerStackMaximizedEventEmitter().emit(this);
            }
        });
        this.getTabsHeader().addTab(tab);
        return part;
    }
}