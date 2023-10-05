import NobucaComponentView from "/nobuca-core/component/NobucaComponentView.js";
import NobucaFactory from "/nobuca-core/factory/NobucaFactory.js";

export default class EclipseWindowView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "EclipseWindow";
        this.setNativeElement(div);
        this.createLeftMinimizedPartContainerStacks();
        this.createPartContainer();
        this.createRightMinimizedPartContainerStacks();
    }

    createLeftMinimizedPartContainerStacks() {
        this.divLeftMinimizedPartContainerStacks = document.createElement("div");
        this.divLeftMinimizedPartContainerStacks.className = "EclipseWindowLeftMinimizedPartContainerStacks";
        this.getNativeElement().appendChild(this.divLeftMinimizedPartContainerStacks);
    }

    getDivLeftMinimzedPartContainerStacks() {
        return this.divLeftMinimizedPartContainerStacks;
    }

    createRightMinimizedPartContainerStacks() {
        this.divRightMinimizedContainerStacks = document.createElement("div");
        this.divRightMinimizedContainerStacks.className = "EclipseWindowRightMinimizedPartContainerStacks";
        this.getNativeElement().appendChild(this.divRightMinimizedContainerStacks);
    }

    getDivRightMinimizedPartContainerStacks() {
        return this.divRightMinimizedContainerStacks;
    }

    createPartContainer() {
        if (this.getModel().getPartContainer() == null) return;
        this.partContainerView = NobucaFactory.createNewViewForModel(this.getModel().getPartContainer());
        this.getNativeElement().appendChild(this.getPartContainerView().getNativeElement());
    }

    getPartContainerView() {
        return this.partContainerView;
    }

    updateContentsPositionAndSize() {

        var windowHeight = this.getNativeElement().offsetHeight;
        var windowWidth = this.getNativeElement().offsetWidth;

        var leftMinimizedPartContainerStackWidth = 28;
        if(this.getModel().getLeftMinimizedPartContainerStacks()==0) {
            leftMinimizedPartContainerStackWidth = 0;
        }
        
        var rightMinimizedPartContainerStackWidth = 28;
        if(this.getModel().getRightMinimizedPartContainerStacks()==0) {
            rightMinimizedPartContainerStackWidth = 0;
        }

        this.getDivLeftMinimzedPartContainerStacks().style.height = windowHeight + "px";
        this.getDivLeftMinimzedPartContainerStacks().style.width = leftMinimizedPartContainerStackWidth + "px";

        this.getDivRightMinimizedPartContainerStacks().style.height = windowHeight + "px";
        this.getDivRightMinimizedPartContainerStacks().style.width = rightMinimizedPartContainerStackWidth + "px";

        var partContainerHeight = windowHeight;
        var partContainerWidth = windowWidth;
        partContainerWidth -= leftMinimizedPartContainerStackWidth;
        partContainerWidth -= rightMinimizedPartContainerStackWidth;

        this.getPartContainerView().getNativeElement().style.height = partContainerHeight + "px";
        this.getPartContainerView().getNativeElement().style.width = partContainerWidth + "px";

        this.getPartContainerView().updateContentsPositionAndSize();
    }

    listenModel() {
        this.getModel().getMinimizedPartContainerStacksChangedEventEmitter().subscribe(() => {
            this.refreshLeftMinimizedPartContainerStacks();
            this.refreshRightMinimizedPartContainerStacks();
            this.updateContentsPositionAndSize();
        });
    }

    refreshLeftMinimizedPartContainerStacks() {
        this.removeChildren(this.getDivLeftMinimzedPartContainerStacks());
        this.getModel().getLeftMinimizedPartContainerStacks().forEach(partContainerStack => {
            this.createLeftPartContainerStackButtonbar(partContainerStack);
        });
    }

    refreshRightMinimizedPartContainerStacks() {
        this.removeChildren(this.getDivRightMinimizedPartContainerStacks());
        this.getModel().getRightMinimizedPartContainerStacks().forEach(partContainerStack => {
            this.createRightPartContainerStackButtonbar(partContainerStack);
        });
    }

    createLeftPartContainerStackButtonbar(partContainerStack) {
        var divButtonbar = document.createElement("div");
        divButtonbar.className = "EclipseWindowLeftMinimizedPartContainerStackButtonbar";
        this.createDragHandle(divButtonbar);
        this.createRestoreButton(divButtonbar, partContainerStack);
        this.getDivLeftMinimzedPartContainerStacks().appendChild(divButtonbar);
        this.addPartsToPartContainerStackButtonbar(partContainerStack, divButtonbar);
    }

    createRightPartContainerStackButtonbar(partContainerStack) {
        var divButtonbar = document.createElement("div");
        divButtonbar.className = "EclipseWindowRighttMinimizedPartContainerStackButtonbar";
        this.createDragHandle(divButtonbar);
        this.createRestoreButton(divButtonbar, partContainerStack);
        this.getDivRightMinimizedPartContainerStacks().appendChild(divButtonbar);
        this.addPartsToPartContainerStackButtonbar(partContainerStack, divButtonbar);
    }

    createDragHandle(divButtonbar) {
        var img = document.createElement("img");
        img.className = "EclipseWindowMinimizedPartContainerStackButtonbarDragHandle";
        img.src = "/nobuca-core/buttonbar/buttonbar-handle-horizontal.svg";
        divButtonbar.appendChild(img);
        return img;
    }

    createRestoreButton(divButtonbar, partContainerStack) {
        var img = document.createElement("img");
        img.className = "EclipseWindowMinimizedPartContainerStackButtonbarButton";
        img.src = "./user-interface/icons/thin_restore_view.svg";
        divButtonbar.appendChild(img);
        img.addEventListener("mousedown", () => {
            this.getModel().removeLeftMinimizedPartContainerStack(partContainerStack);
            this.getModel().removeRightMinimizedPartContainerStack(partContainerStack);
            this.getModel().getMinimizedPartContainerStacksChangedEventEmitter().emit();
            partContainerStack.setStateNormal();
            this.updateContentsPositionAndSize();
        });
        return img;
    }

    addPartsToPartContainerStackButtonbar(partContainerStack, divButtonbar) {
        partContainerStack.getParts().forEach(part => {
            this.addPartToPartContainerStackButtonbar(part, divButtonbar);
        });
    }

    addPartToPartContainerStackButtonbar(part, divButtonbar) {
        var img = document.createElement("img");
        img.className = "EclipseWindowMinimizedPartContainerStackButtonbarButton";
        img.src = part.getImageSrc();
        this.setTooltip(img, part.getTitle())
        divButtonbar.append(img);
    }
}