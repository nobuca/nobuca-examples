import NobucaComponentView from "/nobuca-core/component/NobucaComponentView.js";
import NobucaFactory from "/nobuca-core/factory/NobucaFactory.js";

export default class EclipseWindowView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "EclipseWindow";
        this.setNativeElement(div);
        this.createComponents();
        this.composeComponents();
    }

    createComponents() {
        this.createLeftMinimizedPartContainerStacks();
        this.createPartContainer();
        this.createRightMinimizedPartContainerStacks();
    }

    createLeftMinimizedPartContainerStacks() {
        this.divLeftMinimizedPartContainerStacks = document.createElement("div");
        this.divLeftMinimizedPartContainerStacks.className = "EclipseWindowLeftMinimizedPartContainerStacks";
    }

    getDivLeftMinimzedPartContainerStacks() {
        return this.divLeftMinimizedPartContainerStacks;
    }

    createRightMinimizedPartContainerStacks() {
        this.divRightMinimizedContainerStacks = document.createElement("div");
        this.divRightMinimizedContainerStacks.className = "EclipseWindowRightMinimizedPartContainerStacks";
    }

    getDivRightMinimizedPartContainerStacks() {
        return this.divRightMinimizedContainerStacks;
    }

    createPartContainer() {
        if (this.getModel().getPartContainer() == null) return;
        this.partContainerView = NobucaFactory.createNewViewForModel(this.getModel().getPartContainer());
    }

    getPartContainerView() {
        return this.partContainerView;
    }

    composeComponents() {
        this.getNativeElement().appendChild(this.divLeftMinimizedPartContainerStacks);
        this.getNativeElement().appendChild(this.getPartContainerView().getNativeElement());
        this.getNativeElement().appendChild(this.divRightMinimizedContainerStacks);
    }

    updateContentsPositionAndSize() {

        var windowHeight = this.getNativeElement().offsetHeight;
        var windowWidth = this.getNativeElement().offsetWidth;

        var leftMinimizedPartContainerStackWidth = 28;
        if (this.getDivLeftMinimzedPartContainerStacks().childNodes.length == 0) {
            leftMinimizedPartContainerStackWidth = 0;
        }

        var rightMinimizedPartContainerStackWidth = 28;
        if (this.getDivRightMinimizedPartContainerStacks().childNodes.length == 0) {
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

        this.removeChildren(this.getNativeElement());
        this.getNativeElement().appendChild(this.divLeftMinimizedPartContainerStacks);
        if (this.getModel().getMaximizedPartContainerStack() != null) {
            var maximizedPartContainerStackView = this.getModel().getMaximizedPartContainerStack().getView();
            this.getNativeElement().appendChild(maximizedPartContainerStackView.getNativeElement());
            maximizedPartContainerStackView.getNativeElement().style.height = partContainerHeight + "px";
            maximizedPartContainerStackView.getNativeElement().style.width = partContainerWidth + "px";
            maximizedPartContainerStackView.updateContentsPositionAndSize();
        } else {
            this.getNativeElement().appendChild(this.getPartContainerView().getNativeElement());
            this.getPartContainerView().getNativeElement().style.height = partContainerHeight + "px";
            this.getPartContainerView().getNativeElement().style.width = partContainerWidth + "px";
            this.getPartContainerView().updateContentsPositionAndSize();
        }
        this.getNativeElement().appendChild(this.divRightMinimizedContainerStacks);
    }

    listenModel() {
        this.getModel().getPartContainerStackMinimizedEventEmitter().subscribe(() => {
            this.refreshLeftMinimizedPartContainerStacks();
            this.refreshRightMinimizedPartContainerStacks();
            this.updateContentsPositionAndSize();
        });
        this.getModel().getPartContainerStackMaximizedEventEmitter().subscribe(() => {
            this.addNonMaximizedPartContainerStacksToLeftAndRight();
            this.updateContentsPositionAndSize();
        });
        this.getModel().getPartContainerStackRestoredEventEmitter().subscribe(() => {
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

    addNonMaximizedPartContainerStacksToLeftAndRight() {
        this.removeChildren(this.getDivLeftMinimzedPartContainerStacks());
        this.removeChildren(this.getDivRightMinimizedPartContainerStacks());
        var leftPartContainerStacks = this.getModel().collectLeftPartContainerStacks();
        leftPartContainerStacks.forEach(partContainerStack => {
            if (partContainerStack != this.getModel().getMaximizedPartContainerStack()) {
                this.createLeftPartContainerStackButtonbar(partContainerStack);
            }
        });
        var rightPartContainerStacks = this.getModel().collectRightPartContainerStacks();
        rightPartContainerStacks.forEach(partContainerStack => {
            if (partContainerStack != this.getModel().getMaximizedPartContainerStack()) {
                this.createRightPartContainerStackButtonbar(partContainerStack);
            }
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
            this.getModel().setMaximizedPartContainerStack(null);
            this.getModel().removeLeftMinimizedPartContainerStack(partContainerStack);
            this.getModel().removeRightMinimizedPartContainerStack(partContainerStack);
            this.getModel().getPartContainerStackMinimizedEventEmitter().emit();
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