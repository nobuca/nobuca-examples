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
        this.partContainerStackMaximizedEventEmitter = this.createEventEmitter();
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

    getPartContainerStackMaximizedEventEmitter() {
        return this.partContainerStackMaximizedEventEmitter;
    }

    getPartContainerStackRestoredEventEmitter() {
        return this.partContainerStackRestoredEventEmitter;
    }

    listenLeftPart() {
        if (this.getSplit().getLeftPanel().getPartContainerStackMinimizedEventEmitter != null) {
            this.getSplit().getLeftPanel().getPartContainerStackMinimizedEventEmitter().subscribe(partContainerStack => {
                this.getPartContainerStackLeftMinimizedEventEmitter().emit(partContainerStack);
            });
        }
        if (this.getSplit().getLeftPanel().getPartContainerStackLeftMinimizedEventEmitter != null) {
            this.getSplit().getLeftPanel().getPartContainerStackLeftMinimizedEventEmitter().subscribe(partContainerStack => {
                this.getPartContainerStackLeftMinimizedEventEmitter().emit(partContainerStack);
            });
        }
        if (this.getSplit().getLeftPanel().getPartContainerStackRightMinimizedEventEmitter != null) {
            this.getSplit().getLeftPanel().getPartContainerStackRightMinimizedEventEmitter().subscribe(partContainerStack => {
                this.getPartContainerStackLeftMinimizedEventEmitter().emit(partContainerStack);
            });
        }
        if (this.getSplit().getLeftPanel().getPartContainerStackMaximizedEventEmitter != null) {
            this.getSplit().getLeftPanel().getPartContainerStackMaximizedEventEmitter().subscribe(partContainerStack => {
                this.getPartContainerStackMaximizedEventEmitter().emit(partContainerStack);
            });
        }
        if (this.getSplit().getLeftPanel().getPartContainerStackRestoredEventEmitter != null) {
            this.getSplit().getLeftPanel().getPartContainerStackRestoredEventEmitter().subscribe(partContainerStack => {
                this.getPartContainerStackRestoredEventEmitter().emit(partContainerStack);
            });
        }
    }

    listenRightPart() {
        if (this.getSplit().getRightPanel().getPartContainerStackMinimizedEventEmitter != null) {
            this.getSplit().getRightPanel().getPartContainerStackMinimizedEventEmitter().subscribe(partContainerStack => {
                this.getPartContainerStackRightMinimizedEventEmitter().emit(partContainerStack);
            });
        }
        if (this.getSplit().getRightPanel().getPartContainerStackLeftMinimizedEventEmitter != null) {
            this.getSplit().getRightPanel().getPartContainerStackLeftMinimizedEventEmitter().subscribe(partContainerStack => {
                this.getPartContainerStackRightMinimizedEventEmitter().emit(partContainerStack);
            });
        }
        if (this.getSplit().getRightPanel().getPartContainerStackRightMinimizedEventEmitter != null) {
            this.getSplit().getRightPanel().getPartContainerStackRightMinimizedEventEmitter().subscribe(partContainerStack => {
                this.getPartContainerStackRightMinimizedEventEmitter().emit(partContainerStack);
            });
        }
        if (this.getSplit().getRightPanel().getPartContainerStackMaximizedEventEmitter != null) {
            this.getSplit().getRightPanel().getPartContainerStackMaximizedEventEmitter().subscribe(partContainerStack => {
                this.getPartContainerStackMaximizedEventEmitter().emit(partContainerStack);
            });
        }
        if (this.getSplit().getRightPanel().getPartContainerStackRestoredEventEmitter != null) {
            this.getSplit().getRightPanel().getPartContainerStackRestoredEventEmitter().subscribe(partContainerStack => {
                this.getPartContainerStackRestoredEventEmitter().emit(partContainerStack);
            });
        }
    }

    getStateMinimized() {
        var leftSideMinimized = this.getSplit().getLeftPanel().getStateMinimized();
        var rightSideMinimized = this.getSplit().getRightPanel().getStateMinimized();
        return leftSideMinimized && rightSideMinimized;
    }

    collectLeftPartContainerStacks() {
        if (this.getSplit().getLeftPanel().getParts != null) {
            var partContainerStacks = [];
            partContainerStacks.push(this.getSplit().getLeftPanel());
            return partContainerStacks;
        }
        return this.getSplit().getLeftPanel().collectLeftPartContainerStacks();
    }

    collectRightPartContainerStacks() {
        if (this.getSplit().getRightPanel().getParts != null) {
            var partContainerStacks = [];
            partContainerStacks.push(this.getSplit().getRightPanel());
            return partContainerStacks;
        }
        return this.getSplit().getRightPanel().collectRightPartContainerStacks();
    }
}
