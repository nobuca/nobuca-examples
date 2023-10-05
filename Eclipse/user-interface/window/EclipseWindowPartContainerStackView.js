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
        this.createHeaderSpacer();
        this.createCommonButtonbarNormal();
    }

    createHeaderSpacer() {
        this.divHeaderSpacer = document.createElement("div");
        this.getDivHeader().appendChild(this.divHeaderSpacer);
        this.divHeaderSpacer.className = "EclipseWindowPartContainerStackHeaderSpacer";
    }

    getDivHeaderSpacer() {
        return this.divHeaderSpacer;
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

    createCommonButtonbarNormal() {
        this.divCommonButtonbar = document.createElement("div");
        this.getDivHeader().appendChild(this.divCommonButtonbar);
        this.divCommonButtonbar.className = "EclipseWindowPartContainerStackCommonButtonbar";
        this.normalButtonbarView = NobucaFactory.createNewViewForModel(this.getModel().getButtonbarNormal());
        this.maximizedButtonbarView = NobucaFactory.createNewViewForModel(this.getModel().getButtonbarMaximized());
        this.showCommonButtonbarNormal();
    }

    getNormalButtonbarView() {
        return this.normalButtonbarView;
    }

    getMaximizedButtonbarView() {
        return this.maximizedButtonbarView;
    }

    showCommonButtonbarNormal() {
        this.removeChildren(this.getDivCommonButtonbar());
        this.getDivCommonButtonbar().appendChild(this.getNormalButtonbarView().getNativeElement());
    }

    showCommonButtonbarMaximized() {
        this.removeChildren(this.getDivCommonButtonbar());
        this.getDivCommonButtonbar().appendChild(this.getMaximizedButtonbarView().getNativeElement());
    }

    getDivCommonButtonbar() {
        return this.divCommonButtonbar;
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
        this.getModel().getTabsHeader().getActiveTabChangedEventEmitter().subscribe(tabHeaderModel => {
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

        if(this.getModel().getStateNormal()) {
            this.showCommonButtonbarNormal();
        } else if(this.getModel().getStateMaximized()) {
            this.showCommonButtonbarMaximized();
        }

        var borderWidth = 1;

        var tabHeaderViewHeight = 30;
        this.getTabsHeaderView().getNativeElement().style.height = tabHeaderViewHeight + "px"

        var contentHeight = this.getNativeElement().offsetHeight - tabHeaderViewHeight - borderWidth * 2;
        var contentWidth = this.getNativeElement().offsetWidth - borderWidth * 2;

        this.getDivContent().style.height = contentHeight + "px";
        this.getDivContent().style.width = contentWidth + "px";

        if (this.getActivePartView() != null) {

            var neededHeaderWidth = this.getTabsHeaderView().getNativeElement().offsetWidth;
            neededHeaderWidth += this.getActivePartView().getDivSpecificButtonbar().offsetWidth;
            neededHeaderWidth += this.getDivCommonButtonbar().offsetWidth;

            if (neededHeaderWidth <= this.getNativeElement().offsetWidth) {
                this.moveSpecificButtonbarBesidesCommonButtonbar();
            } else {
                this.moveSpecificButtonbarUnderTabsHeader();
            }
        }
    }

    moveSpecificButtonbarBesidesCommonButtonbar() {
        this.removeChildren(this.getDivHeader());
        this.getDivHeader().appendChild(this.getTabsHeaderView().getNativeElement());
        this.getDivHeader().appendChild(this.getDivHeaderSpacer());
        var divSpecificButtonbar = this.getActivePartView().getDivSpecificButtonbar();
        this.getDivHeader().appendChild(divSpecificButtonbar);
        this.getDivHeader().appendChild(this.getDivCommonButtonbar());

        var partHeight = this.getDivContent().offsetHeight;

        this.getActivePartView().getNativeElement().style.height = partHeight + "px";

        this.getActivePartView().updateContentsPositionAndSize();
    }

    moveSpecificButtonbarUnderTabsHeader() {
        this.removeChildren(this.getDivHeader());
        this.getDivHeader().appendChild(this.getTabsHeaderView().getNativeElement());
        this.getDivHeader().appendChild(this.getDivHeaderSpacer());
        this.getDivHeader().appendChild(this.getDivCommonButtonbar());
        var divSpecificButtonbar = this.getActivePartView().getDivSpecificButtonbar();
        this.getDivContent().appendChild(divSpecificButtonbar);
        this.getDivContent().appendChild(this.getActivePartView().getNativeElement());

        var partHeight = this.getDivContent().offsetHeight;
        partHeight -= divSpecificButtonbar.offsetHeight;

        this.getActivePartView().getNativeElement().style.height = partHeight + "px";

        this.getActivePartView().updateContentsPositionAndSize();
    }
}