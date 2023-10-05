import NobucaComponentModel from "../../../../nobuca-core/component/NobucaComponentModel.js";
import NobucaPanelSplitTopBottomModel from "../../../../nobuca-core/panel-split/NobucaPanelSplitTopBottomModel.js";

export default class EclipsePartContainerSashTopBottomModel extends NobucaComponentModel {

    constructor(topPanel, bottomPanel, weight) {
        super();
        this.createSplit(topPanel, bottomPanel, weight);
        topPanel.setSash(this);
        bottomPanel.setSash(this);
        this.listenTopPart();
        this.listenBottomPart();
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

    getClassName() {
        return "EclipsePartContainerSashTopBottomModel";
    }

    createSplit(topPanel, bottomPanel, weight) {
        this.split = new NobucaPanelSplitTopBottomModel(topPanel, bottomPanel, weight);
    }

    getSplit() {
        return this.split;
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

    listenTopPart() {
        if (this.getSplit().getTopPanel().getPartContainerStackMinimizedEventEmitter == null) return;
        this.getSplit().getTopPanel().getPartContainerStackMinimizedEventEmitter().subscribe(partContainerStack => {
            this.getPartContainerStackMinimizedEventEmitter().emit(partContainerStack);
        });
        this.getSplit().getTopPanel().getPartContainerStackMaximizedEventEmitter().subscribe(partContainerStack => {
            this.getPartContainerStackMaximizedEventEmitter().emit(partContainerStack);
        });
        this.getSplit().getTopPanel().getPartContainerStackRestoredEventEmitter().subscribe(partContainerStack => {
            this.getPartContainerStackRestoredEventEmitter().emit(partContainerStack);
        });
    }

    listenBottomPart() {
        if (this.getSplit().getBottomPanel().getPartContainerStackMinimizedEventEmitter == null) return;
        this.getSplit().getBottomPanel().getPartContainerStackMinimizedEventEmitter().subscribe(partContainerStack => {
            this.getPartContainerStackMinimizedEventEmitter().emit(partContainerStack);
        });
        this.getSplit().getBottomPanel().getPartContainerStackMaximizedEventEmitter().subscribe(partContainerStack => {
            this.getPartContainerStackMaximizedEventEmitter().emit(partContainerStack);
        });
        this.getSplit().getBottomPanel().getPartContainerStackRestoredEventEmitter().subscribe(partContainerStack => {
            this.getPartContainerStackRestoredEventEmitter().emit(partContainerStack);
        });
    }

    getStateMinimized() {
        var topSideMinimized = this.getSplit().getTopPanel().getStateMinimized();
        var bottomSideMinimized = this.getSplit().getBottomPanel().getStateMinimized();
        return topSideMinimized && bottomSideMinimized;
    }

    collectLeftPartContainerStacks() {
        return this.collectPartContainerStacks();
    }

    collectRightPartContainerStacks() {
        return this.collectPartContainerStacks();
    }

    collectPartContainerStacks() {
        var partContainerStacks = [];
        if (this.getSplit().getTopPanel().getParts != null) {
            partContainerStacks.push(this.getSplit().getTopPanel());
        } else {
            this.getSplit().getTopPanel().collectLeftPartContainerStacks().forEach(partContainerStack => {
                partContainerStacks.push(partContainerStack);
            });
        }
        if (this.getSplit().getBottomPanel().getParts != null) {
            partContainerStacks.push(this.getSplit().getBottomPanel());
        } else {
            this.getSplit().getBottomPanel().collectLeftPartContainerStacks().forEach(partContainerStack => {
                partContainerStacks.push(partContainerStack);
            });
        }
        return partContainerStacks;
    }
}
