import NobucaComponentModel from "../../../../nobuca-core/component/NobucaComponentModel.js";
import NobucaPanelSplitLeftRightModel from "../../../../nobuca-core/panel-split/NobucaPanelSplitLeftRightModel.js";

export default class EclipsePartContainerSashLeftRightModel extends NobucaComponentModel {

    constructor(leftPanel, rightPanel, weight) {
        super();
        this.createSplit(leftPanel, rightPanel, weight);
        leftPanel.setSash(this);
        rightPanel.setSash(this);
        this.listenLeftPart();
        this.listenRightPart();
        this.partContainerStackLeftMinimizedEventEmitter = this.createEventEmitter();
        this.partContainerStackRightMinimizedEventEmitter = this.createEventEmitter();
        this.partContainerStackRestoredEventEmitter = this.createEventEmitter();
    }

    setSash(sash) {
        this.sash = sash;
    }
    
    getSash() {
        return this.sash;
    }

    getClassName() {
        return "EclipsePartContainerSashLeftRightModel";
    }

    createSplit(leftPanel, rightPanel, weight) {
        this.split = new NobucaPanelSplitLeftRightModel(leftPanel, rightPanel, weight);
    }

    getSplit() {
        return this.split;
    }

    getPartContainerStackLeftMinimizedEventEmitter() {
        return this.partContainerStackLeftMinimizedEventEmitter;
    }

    getPartContainerStackRightMinimizedEventEmitter() {
        return this.partContainerStackRightMinimizedEventEmitter;
    }

    getPartContainerStackRestoredEventEmitter() {
        return this.partContainerStackRestoredEventEmitter;
    }

    listenLeftPart() {
        if (this.getSplit().getLeftPanel().getPartContainerStackMinimizedEventEmitter == null) return;
        this.getSplit().getLeftPanel().getPartContainerStackMinimizedEventEmitter().subscribe(partContainerStack => {
            this.getPartContainerStackLeftMinimizedEventEmitter().emit(partContainerStack);
        });
    }

    listenRightPart() {
        if (this.getSplit().getRightPanel().getPartContainerStackMinimizedEventEmitter == null) return;
        this.getSplit().getRightPanel().getPartContainerStackMinimizedEventEmitter().subscribe(partContainerStack => {
            this.getPartContainerStackRightMinimizedEventEmitter().emit(partContainerStack);
        });
    }
}
