import NobucaComponentModel from "../../../../nobuca-core/component/NobucaComponentModel.js";

export default class EclipseWindowModel extends NobucaComponentModel {

    constructor() {
        super();
        this.leftMinimizedPartContainerStacks = [];
        this.rightMinimizedPartContainerStacks = [];
        this.minimizedPartContainerStacksChangedEventEmitter = this.createEventEmitter();
    }

    getMinimizedPartContainerStacksChangedEventEmitter() {
        return this.minimizedPartContainerStacksChangedEventEmitter;
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
            this.addLeftMinimizedPartContainerStack(partContainerStack);
            this.getMinimizedPartContainerStacksChangedEventEmitter().emit();
        });
        this.getPartContainer().getPartContainerStackRightMinimizedEventEmitter().subscribe(partContainerStack => {
            this.addRightMinimizedPartContainerStack(partContainerStack);
            this.getMinimizedPartContainerStacksChangedEventEmitter().emit();
        });
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



}