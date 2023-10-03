import NobucaComponentView from "../../../../nobuca-core/component/NobucaComponentView.js";
import NobucaFactory from "../../../../nobuca-core/factory/NobucaFactory.js";

export default class EclipseWindowPartContainerStackView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.createHeader();
        this.createPartViews();
    }

    getClassName() {
        return "EclipseWindowPartContainerStack";
    }

    createNativeElement() {
        let div = document.createElement("div");
        div.className = this.getClassName();
        this.setNativeElement(div);
    }

    getDivContent() {
        return this.divContent;
    }

    createHeader() {
        this.divHeader = document.createElement("div");
        this.getNativeElement().appendChild(this.divHeader);
        this.divHeader.className = "EclipseWindowPartContainerStackHeader";
        this.createTabsHeader();
        this.createCommonMenubar();
    }

    getDivHeader() {
        return this.divHeader;
    }

    createTabsHeader() {
        this.tabsHeaderView = NobucaFactory.createNewViewForModel(this.getModel().getTabsHeader());
        this.getDivHeader().appendChild(this.getTabsHeaderView().getNativeElement());
    }

    getTabsHeaderView() {
        return this.tabsHeaderView;
    }

    createCommonMenubar() {
        this.divCommonMenubar = document.createElement("div");
        this.getDivHeader().appendChild(this.divCommonMenubar);
        this.divCommonMenubar.className = "EclipseWindowPartContainerStackCommonButtonbar";
        var menubarView = NobucaFactory.createNewViewForModel(this.getModel().getButtonbar());
        this.getDivCommonMenubar().appendChild(menubarView.getNativeElement());
    }

    getDivCommonMenubar() {
        return this.divCommonMenubar;
    }

    createPartViews() {

        this.divContent = document.createElement("div");
        this.getNativeElement().appendChild(this.divContent);
        this.divContent.className = "EclipseWindowPartContainerStackContent";

        this.partViews = [];
        this.getModel().getParts().forEach(partModel => {
            var partView = NobucaFactory.createNewViewForModel(partModel);
            this.partViews.push(partView);
        });

        if (this.getModel().getParts().length > 0) {
            this.activatePartView(0);
        }
    }

    getPartViewAtIndex(index) {
        return this.partViews[index];
    }

    listenModel() {
        this.getModel().getTabsHeader().getActiveTabChangeEventEmitter().subscribe(tabHeaderModel => {
            this.activatePartView(tabHeaderModel.getIndex());
        });
    }

    activatePartView(partIndex) {
        this.activePartView = this.getPartViewAtIndex(partIndex);
        this.clearDivContent();
        this.getDivContent().appendChild(this.getActivePartView().getNativeElement());
        this.updateContentsPositionAndSize();
    }

    getActivePartView() {
        return this.activePartView;
    }

    clearDivContent() {
        while (this.getDivContent().children.length > 0) {
            this.getDivContent().removeChild(this.getDivContent().children[0]);
        }
    }

    updateContentsPositionAndSize() {

        var borderWidth = 1;

        var tabHeaderViewHeight = 30;
        var tabHeaderViewWidth = this.getNativeElement().offsetWidth - borderWidth * 2;
        this.getTabsHeaderView().getNativeElement().style.height = tabHeaderViewHeight + "px"
        //this.getTabsHeaderView().getNativeElement().style.width = tabHeaderViewWidth + "px"

        var contentHeight = this.getNativeElement().offsetHeight - tabHeaderViewHeight - borderWidth * 2;
        var contentWidth = this.getNativeElement().offsetWidth - borderWidth * 2;

        this.getDivContent().style.height = contentHeight + "px";
        this.getDivContent().style.width = contentWidth + "px";


        if (this.getActivePartView() != null) {

            var specificMenubarView = this.getActivePartView().getDivSpecificButtonbar();
            this.getDivHeader().insertBefore(specificMenubarView, this.getDivCommonMenubar());
    
            this.getActivePartView().getNativeElement().style.height = contentHeight + "px";
            this.getActivePartView().updateContentsPositionAndSize();
        }
    }
}