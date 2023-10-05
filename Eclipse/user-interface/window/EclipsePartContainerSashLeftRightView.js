import NobucaComponentView from "../../../../nobuca-core/component/NobucaComponentView.js";
import NobucaFactory from "../../../../nobuca-core/factory/NobucaFactory.js";

export default class EclipsePartContainerSashLeftRightView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.createSplit();
    }

    getClassName() {
        return "EclipsePartContainerSashLeftRight";
    }

    createSplit() {
        this.splitView = NobucaFactory.createNewViewForModel(this.getModel().getSplit());
        this.getNativeElement().appendChild(this.splitView.getNativeElement());
    }

    getSplitView() {
        return this.splitView;
    }

    updateContentsPositionAndSize() {

        var leftSideMinimized = this.getModel().getSplit().getLeftPanel().getStateMinimized();
        var rightSideMinimized = this.getModel().getSplit().getRightPanel().getStateMinimized();

        if (leftSideMinimized && !rightSideMinimized) {

            this.removeChildren(this.getNativeElement());
            this.getNativeElement().appendChild(this.getSplitView().getRightPanelView().getNativeElement());
            this.getSplitView().getRightPanelView().getNativeElement().style.width = this.getNativeElement().offsetWidth + "px";
            this.getSplitView().getRightPanelView().getNativeElement().style.height = this.getNativeElement().offsetHeight + "px";
            this.getSplitView().getRightPanelView().updateContentsPositionAndSize();

        } else if (!leftSideMinimized && rightSideMinimized) {

            this.removeChildren(this.getNativeElement());
            this.getNativeElement().appendChild(this.getSplitView().getLeftPanelView().getNativeElement());
            this.getSplitView().getLeftPanelView().getNativeElement().style.width = this.getNativeElement().offsetWidth + "px";
            this.getSplitView().getLeftPanelView().getNativeElement().style.height = this.getNativeElement().offsetHeight + "px";
            this.getSplitView().getLeftPanelView().updateContentsPositionAndSize();

        } else if (leftSideMinimized&& rightSideMinimized) {

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
        this.getModel().getPartContainerStackLeftMinimizedEventEmitter().subscribe(() => {
            this.updateContentsPositionAndSize();
        });
        this.getModel().getPartContainerStackRightMinimizedEventEmitter().subscribe(() => {
            this.updateContentsPositionAndSize();
        });
    }


}
