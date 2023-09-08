import NobucaComponentView from "../../../../../nobuca-core/component/NobucaComponentView.js";

export default class BlenderControlToolbarView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderControlToolbar";
        this.setNativeElement(div);

        this.divFirstLevelMenuItems = document.createElement("div");
        this.divFirstLevelMenuItems.className = "BlenderControlToolbarFirstLevelMenuItems";
        this.getNativeElement().appendChild(this.divFirstLevelMenuItems);

        this.divSecondLevelMenuItemsContainer = document.createElement("div");
        this.divSecondLevelMenuItemsContainer.className = "BlenderControlToolbarSecondLevelMenuItemsContainer";
        this.getNativeElement().appendChild(this.divSecondLevelMenuItemsContainer);

        this.createFirstLevelMenuItems();
    }

    getDivFirstLevelMenuItems() {
        return this.divFirstLevelMenuItems;
    }

    getDivSecondLevelMenuItemsContainer() {
        return this.divSecondLevelMenuItemsContainer;
    }

    createFirstLevelMenuItems() {

        this.getModel()
            .getMenuItems()
            .forEach((menuItemModel) => {
                this.createFirstLevelMenuItem(menuItemModel);
            });
    }

    createFirstLevelMenuItem(firstLevelMenuItemModel) {
        var divFirstLevelMenuItem = document.createElement("div");
        divFirstLevelMenuItem.className = "BlenderControlToolbarFirstLevelMenuItem";
        divFirstLevelMenuItem.draggable = false;
        this.getDivFirstLevelMenuItems().appendChild(divFirstLevelMenuItem);

        var imgItemIconImage = document.createElement("img");
        imgItemIconImage.className = "BlenderControlToolbarMenuItemIconImage";
        imgItemIconImage.src = firstLevelMenuItemModel.getIconImageSrc();
        imgItemIconImage.draggable = false;
        divFirstLevelMenuItem.appendChild(imgItemIconImage);

        if (firstLevelMenuItemModel.getMenuItems().length > 0) {
            var imgItemImage = document.createElement("img");
            imgItemImage.className = "BlenderControlToolbarMenuItemIsGroupImage";
            imgItemImage.src = "./window-system/icons/toolbar-icon-is-group.png";
            divFirstLevelMenuItem.appendChild(imgItemImage);

            this.createSecondLevelMenuItems(divFirstLevelMenuItem, firstLevelMenuItemModel);
        }

        divFirstLevelMenuItem.addEventListener("click", () => {
            firstLevelMenuItemModel.getClickedEventEmitter().emit();
            this.hideSecondLevelMenuItem(divFirstLevelMenuItem.divSecondLevelMenuItems);
        });

        divFirstLevelMenuItem.addEventListener("mousedown", () => {
            this.startFirstLevelMenuItemMouseDownTimer(divFirstLevelMenuItem);
        });

        divFirstLevelMenuItem.addEventListener("mouseup", () => {
            this.cancelFirstLevelMenuItemMouseDownTimer();
            this.hideSecondLevelMenuItem(divFirstLevelMenuItem.divSecondLevelMenuItems);
        });

        divFirstLevelMenuItem.addEventListener("mouseout", () => {
            this.cancelFirstLevelMenuItemMouseDownTimer();
            this.startSecondLevelMenuItemMouseOutTimer(divFirstLevelMenuItem.divSecondLevelMenuItems);
        });
    }

    createSecondLevelMenuItems(divFirstLevelMenuItem, firstLevelMenuItemModel) {

        var divSecondLevelMenuItems = document.createElement("div");
        divSecondLevelMenuItems.className = "BlenderControlToolbarSecondLevelMenuItems";
        divSecondLevelMenuItems.style.display = "none";
        this.getDivSecondLevelMenuItemsContainer().appendChild(divSecondLevelMenuItems);

        divFirstLevelMenuItem.divSecondLevelMenuItems = divSecondLevelMenuItems;

        firstLevelMenuItemModel.getMenuItems().forEach(secondLevelMenuItemModel => {
            this.createSecondLevelMenuItem(divSecondLevelMenuItems, secondLevelMenuItemModel);
        })

        divSecondLevelMenuItems.addEventListener("mouseover", () => {
            this.cancelSecondLevelMenuItemMouseOutTimer();
        });

        divSecondLevelMenuItems.addEventListener("mouseup", () => {
            this.hideSecondLevelMenuItem(divSecondLevelMenuItems);
        });

        divSecondLevelMenuItems.addEventListener("mouseout", () => {
            console.log("divSecondLevelMenuItems mouse out");
            this.startSecondLevelMenuItemMouseOutTimer(divSecondLevelMenuItems);
        });
    }

    createSecondLevelMenuItem(divSecondLevelMenuItems, secondLevelMenuItemModel) {
        var divSecondLevelMenuItem = document.createElement("div");
        divSecondLevelMenuItem.className = "BlenderControlToolbarSecondLevelMenuItem";
        divSecondLevelMenuItems.appendChild(divSecondLevelMenuItem);

        var imgSecondLevelMenuItemIcon = document.createElement("img");
        imgSecondLevelMenuItemIcon.className = "BlenderControlToolbarSecondLevelMenuItemIconImage";
        imgSecondLevelMenuItemIcon.src = secondLevelMenuItemModel.getIconImageSrc();
        divSecondLevelMenuItem.appendChild(imgSecondLevelMenuItemIcon);

        var divSecondLevelMenuItemTitle = document.createElement("div");
        divSecondLevelMenuItemTitle.className = "BlenderControlToolbarSecondLevelMenuItemTitle";
        divSecondLevelMenuItemTitle.innerHTML = secondLevelMenuItemModel.getText();
        divSecondLevelMenuItem.appendChild(divSecondLevelMenuItemTitle);
    }

    getFirstLevelMenuItemMouseDownTimer() {
        return this.firstLevelMenuItemMouseDownTimer;
    }

    setFirstLevelMenuItemMouseDownTimer(menuItemMouseDownTimer) {
        this.firstLevelMenuItemMouseDownTimer = menuItemMouseDownTimer;
    }

    cancelFirstLevelMenuItemMouseDownTimer() {
        if (this.getFirstLevelMenuItemMouseDownTimer() == null) return;
        clearTimeout(this.getFirstLevelMenuItemMouseDownTimer());
        this.setFirstLevelMenuItemMouseDownTimer(null);
    }

    startFirstLevelMenuItemMouseDownTimer(divItem) {
        this.cancelFirstLevelMenuItemMouseDownTimer();
        this.setFirstLevelMenuItemMouseDownTimer(setTimeout(() => {
            this.showSecondLevelMenuItem(divItem);
        }, 500));
    }

    showSecondLevelMenuItem(divFirstLevelMenuItem) {
        if (divFirstLevelMenuItem.divSecondLevelMenuItems == null) return;
        divFirstLevelMenuItem.divSecondLevelMenuItems.style.display = "";
        var top = divFirstLevelMenuItem.offsetTop;
        divFirstLevelMenuItem.divSecondLevelMenuItems.style.top = top + "px";
    }

    hideSecondLevelMenuItem(divSecondLevelMenuItems) {
        if (divSecondLevelMenuItems == null) return;
        divSecondLevelMenuItems.style.display = "none";
    }

    setSecondLevelMenuItemMouseOutTimer(secondLevelMenuItemMouseOutTimer) {
        this.secondLevelMenuItemMouseOutTimer = secondLevelMenuItemMouseOutTimer;
    }

    getSecondLevelMenuItemMouseOutTimer() {
        return this.secondLevelMenuItemMouseOutTimer;
    }

    cancelSecondLevelMenuItemMouseOutTimer() {
        if (this.getSecondLevelMenuItemMouseOutTimer() == null) return;
        clearTimeout(this.getSecondLevelMenuItemMouseOutTimer());
        this.setSecondLevelMenuItemMouseOutTimer(null);
    }

    startSecondLevelMenuItemMouseOutTimer(secondLevelMenuItemMouseOutTimer) {
        this.cancelSecondLevelMenuItemMouseOutTimer();
        this.setSecondLevelMenuItemMouseOutTimer(setTimeout(() => {
            this.hideSecondLevelMenuItem(secondLevelMenuItemMouseOutTimer);
        }, 100));
    }
}