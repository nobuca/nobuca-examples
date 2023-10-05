import NobucaComponentModel from "../../../../nobuca-core/component/NobucaComponentModel.js";

export default class EclipseWindowModel extends NobucaComponentModel {

    constructor() {
        super();
        this.leftMinimizedPartContainerStacks = [];
        this.rightMinimizedPartContainerStacks = [];
        this.partContainerStackMinimizedEventEmitter = this.createEventEmitter();
        this.partContainerStackMaximizedEventEmitter = this.createEventEmitter();
        this.partContainerStackRestoredEventEmitter = this.createEventEmitter();
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
        return "EclipseWindowModel"
    }

    setPartContainer(partContainer) {
        this.partContainer = partContainer;
        this.listenPartContainer()
        return this.partContainer;
    }

    getPartContainer() {
        return this.partContainer;
    }

    listenPartContainer() {
        this.getPartContainer().getPartContainerStackLeftMinimizedEventEmitter().subscribe(partContainerStack => {
            this.setMaximizedPartContainerStack(null);
            this.addLeftMinimizedPartContainerStack(partContainerStack);
            this.getPartContainerStackMinimizedEventEmitter().emit();
        });
        this.getPartContainer().getPartContainerStackRightMinimizedEventEmitter().subscribe(partContainerStack => {
            this.setMaximizedPartContainerStack(null);
            this.addRightMinimizedPartContainerStack(partContainerStack);
            this.getPartContainerStackMinimizedEventEmitter().emit();
        });
        this.getPartContainer().getPartContainerStackMaximizedEventEmitter().subscribe(partContainerStack => {
            this.setMaximizedPartContainerStack(partContainerStack);
            this.getPartContainerStackMaximizedEventEmitter().emit();
        });
        this.getPartContainer().getPartContainerStackRestoredEventEmitter().subscribe(partContainerStack => {
            this.setMaximizedPartContainerStack(null);
            this.getPartContainerStackRestoredEventEmitter().emit();
        });
    }

    setMaximizedPartContainerStack(partContainerStack) {
        this.maximizedPartContainerStack = partContainerStack;
    }

    getMaximizedPartContainerStack() {
        return this.maximizedPartContainerStack;
    }

    getLeftMinimizedPartContainerStacks() {
        return this.leftMinimizedPartContainerStacks;
    }

    addLeftMinimizedPartContainerStack(partContainerStack) {
        this.leftMinimizedPartContainerStacks.push(partContainerStack);
    }

    removeLeftMinimizedPartContainerStack(partContainerStack) {
        this.leftMinimizedPartContainerStacks = this.leftMinimizedPartContainerStacks.filter(pcs => pcs != partContainerStack);
    }

    getRightMinimizedPartContainerStacks() {
        return this.rightMinimizedPartContainerStacks;
    }

    addRightMinimizedPartContainerStack(partContainerStack) {
        this.rightMinimizedPartContainerStacks.push(partContainerStack);
    }

    removeRightMinimizedPartContainerStack(partContainerStack) {
        this.rightMinimizedPartContainerStacks = this.rightMinimizedPartContainerStacks.filter(pcs => pcs != partContainerStack);
    }

    collectLeftPartContainerStacks() {
        return this.getPartContainer().collectLeftPartContainerStacks();
    }

    collectRightPartContainerStacks() {
        return this.getPartContainer().collectRightPartContainerStacks();
    }

}