import NobucaComponentView from "../../../../nobuca-core/component/NobucaComponentView.js";
import NobucaFactory from "../../../../nobuca-core/factory/NobucaFactory.js";

export default class EclipsePartContainerSashTopBottomView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.createSplit();
    }

    getClassName() {
        return "EclipsePartContainerSashTopBottom";
    }

    createSplit() {
        this.splitView = NobucaFactory.createNewViewForModel(this.getModel().getSplit());
        this.getNativeElement().appendChild(this.splitView.getNativeElement());
    }

    getSplitView() {
        return this.splitView;
    }

    updateContentsPositionAndSize() {

        var topSideMinimized = this.getModel().getSplit().getTopPanel().getStateMinimized();
        var bottomSideMinimized = this.getModel().getSplit().getBottomPanel().getStateMinimized();

        if (topSideMinimized && !bottomSideMinimized) {

            this.removeChildren(this.getNativeElement());
            this.getNativeElement().appendChild(this.getSplitView().getBottomPanelView().getNativeElement());
            this.getSplitView().getBottomPanelView().getNativeElement().style.width = this.getNativeElement().offsetWidth + "px";
            this.getSplitView().getBottomPanelView().getNativeElement().style.height = this.getNativeElement().offsetHeight + "px";
            this.getSplitView().getBottomPanelView().updateContentsPositionAndSize();

        } else if (!topSideMinimized && bottomSideMinimized) {

            this.removeChildren(this.getNativeElement());
            this.getNativeElement().appendChild(this.getSplitView().getTopPanelView().getNativeElement());
            this.getSplitView().getTopPanelView().getNativeElement().style.width = this.getNativeElement().offsetWidth + "px";
            this.getSplitView().getTopPanelView().getNativeElement().style.height = this.getNativeElement().offsetHeight + "px";
            this.getSplitView().getTopPanelView().updateContentsPositionAndSize();

        } else if (topSideMinimized&& bottomSideMinimized) {

            this.removeChildren(this.getNativeElement());

        } else {
            this.removeChildren(this.getNativeElement());
            this.getNativeElement().appendChild(this.getSplitView().getNativeElement());
            this.getSplitView().composeContents();
            this.getSplitView().getNativeElement().style.width = this.getNativeElement().offsetWidth + "px";
            this.getSplitView().getNativeElement().style.height = this.getNativeElement().offsetHeight + "px";
            this.getSplitView().updateContentsPositionAndSize();
        }
    }

    listenModel() {
        this.getModel().getPartContainerStackMinimizedEventEmitter().subscribe(() => {
            this.updateContentsPositionAndSize();
        });
        this.getModel().getPartContainerStackRestoredEventEmitter().subscribe(() => {
            this.updateContentsPositionAndSize();
        });
    }


}
