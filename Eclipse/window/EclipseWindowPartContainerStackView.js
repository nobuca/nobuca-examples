import NobucaComponentView from "../../../nobuca-core/component/NobucaComponentView.js";
import NobucaFactory from "../../../nobuca-core/factory/NobucaFactory.js";

export default class EclipseWindowPartContainerStackView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.createTabsHeaderView();
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

    createTabsHeaderView() {
        this.tabsHeaderView = NobucaFactory.createNewViewForModel(this.getModel().getTabsHeader());
        this.getNativeElement().appendChild(this.getTabsHeaderView().getNativeElement());
    }

    getTabsHeaderView() {
        return this.tabsHeaderView;
    }

    createPartViews() {

        this.divContent = document.createElement("div");
        this.divContent.className = "EclipseWindowPartContainerStackContent";
        this.getNativeElement().appendChild(this.divContent);

        this.partViews = [];
        this.getModel().getParts().forEach(partModel => {
            var partView = NobucaFactory.createNewViewForModel(partModel);
            this.partViews.push(partView);
        });
    }


    getPartViewAtIndex(index) {
        return this.partViews[index];
    }

    listenModel() {
        this.getModel().getTabsHeader().getActiveTabChangeEventEmitter().subscribe(tabHeaderModel => {
            this.activePartView = this.getPartViewAtIndex(tabHeaderModel.getIndex());
            this.clearDivContent();
            this.getDivContent().appendChild(this.getActivePartView().getNativeElement());
            this.updateContentsPositionAndSize();
        });
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

        var tabHeaderViewHeight = 32;
        var tabHeaderViewWidth = this.getNativeElement().offsetWidth - borderWidth * 2;
        this.getTabsHeaderView().getNativeElement().style.height = tabHeaderViewHeight + "px"
        this.getTabsHeaderView().getNativeElement().style.width = tabHeaderViewWidth + "px"

        var contentHeight = this.getNativeElement().offsetHeight - tabHeaderViewHeight - borderWidth * 2;
        var contentWidth = this.getNativeElement().offsetWidth - borderWidth * 2;

        this.getDivContent().style.height = contentHeight + "px";
        this.getDivContent().style.width = contentWidth + "px";

        if (this.getActivePartView() != null) {
            this.getActivePartView().getNativeElement().style.height = contentHeight + "px";
            this.getActivePartView().updateContentsPositionAndSize();
        }
    }
}