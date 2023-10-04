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
        this.createCommonButtonbar();
    }

    createHeaderSpacer() {
        this.divHeaderSpacer = document.createElement("div");
        this.getNativeElement().appendChild(this.divHeaderSpacer);
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

    createCommonButtonbar() {
        this.divCommonButtonbar = document.createElement("div");
        this.getDivHeader().appendChild(this.divCommonButtonbar);
        this.divCommonButtonbar.className = "EclipseWindowPartContainerStackCommonButtonbar";
        var buttonView = NobucaFactory.createNewViewForModel(this.getModel().getButtonbar());
        this.getDivCommonButtonbar().appendChild(buttonView.getNativeElement());
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
        this.getTabsHeaderView().getNativeElement().style.height = tabHeaderViewHeight + "px"

        var contentHeight = this.getNativeElement().offsetHeight - tabHeaderViewHeight - borderWidth * 2;
        var contentWidth = this.getNativeElement().offsetWidth - borderWidth * 2;

        this.getDivContent().style.height = contentHeight + "px";
        this.getDivContent().style.width = contentWidth + "px";

        if (this.getActivePartView() != null) {

            var neededHeaderWidth = this.getTabsHeaderView().getNativeElement().offsetWidth;
            neededHeaderWidth += this.getActivePartView().getDivSpecificButtonbar().offsetWidth;
            neededHeaderWidth += this.getDivCommonButtonbar().offsetWidth;

            console.log(this.getTabsHeaderView().getNativeElement().offsetWidth,
                this.getActivePartView().getDivSpecificButtonbar().offsetWidth,
                this.getDivCommonButtonbar().offsetWidth);

            console.log(neededHeaderWidth + " <= " + contentWidth);

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