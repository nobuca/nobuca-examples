import NobucaComponentView from "../../../../../nobuca-core/component/NobucaComponentView.js";

export default class BlenderControlToolbarView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderControlToolbar";
        this.setNativeElement(div);

        this.setExpandModeOneColumn();

        this.divFirstLevelMenus = document.createElement("div");
        this.divFirstLevelMenus.className = "BlenderControlToolbarFirstLevelMenus";
        this.getNativeElement().appendChild(this.divFirstLevelMenus);

        this.divSecondLevelMenuItemsContainer = document.createElement("div");
        this.divSecondLevelMenuItemsContainer.className = "BlenderControlToolbarSecondLevelMenuItemsContainer";
        this.getNativeElement().appendChild(this.divSecondLevelMenuItemsContainer);

        this.createFirstLevelMenus();

        this.createExtender();
    }

    isExpandModeOneColumn() {
        return this.getNativeElement().getAttribute("expandMode") == "one-column";
    }

    setExpandModeOneColumn() {
        this.getNativeElement().setAttribute("expandMode", "one-column");
    }

    isExpandModeTwoColumns() {
        return this.getNativeElement().getAttribute("expandMode") == "two-columns";
    }

    setExpandModeTwoColumns() {
        this.getNativeElement().setAttribute("expandMode", "two-columns");
    }

    isExpandModeExtended() {
        return this.getNativeElement().getAttribute("expandMode") == "extended";
    }

    setExpandModeExtended() {
        this.getNativeElement().setAttribute("expandMode", "extended");
    }

    getDivFirstLevelMenus() {
        return this.divFirstLevelMenus;
    }

    getDivSecondLevelMenuItemsContainer() {
        return this.divSecondLevelMenuItemsContainer;
    }

    createFirstLevelMenus() {
        this.getModel().getMenus().forEach((firstLevelMenuModel) => { this.createFirstLevelMenu(firstLevelMenuModel); });
    }

    createFirstLevelMenu(firstLevelMenuModel) {
        var divFirstLevelMenu = document.createElement("div");
        divFirstLevelMenu.className = "BlenderControlToolbarFirstLevelMenu";
        divFirstLevelMenu.draggable = false;
        this.getDivFirstLevelMenus().appendChild(divFirstLevelMenu);
        this.createFirstLevelMenuItems(divFirstLevelMenu, firstLevelMenuModel);
    }

    createFirstLevelMenuItems(divFirstLevelMenu, firstLevelMenuModel) {
        firstLevelMenuModel.getMenuItems().forEach((firstLevelMenuItemModel) => {
            this.createFirstLevelMenuItem(divFirstLevelMenu, firstLevelMenuItemModel);
        });
    }

    createFirstLevelMenuItem(divFirstLevelMenu, firstLevelMenuItemModel) {
        var divFirstLevelMenuItem = document.createElement("div");
        divFirstLevelMenuItem.className = "BlenderControlToolbarFirstLevelMenuItem";
        divFirstLevelMenuItem.draggable = false;
        divFirstLevelMenu.appendChild(divFirstLevelMenuItem);

        var imgItemIconImage = document.createElement("img");
        imgItemIconImage.className = "BlenderControlToolbarFirstLevelMenuItemIconImage";
        imgItemIconImage.src = firstLevelMenuItemModel.getIconImageSrc();
        imgItemIconImage.draggable = false;
        divFirstLevelMenuItem.appendChild(imgItemIconImage);

        var divFirstLevelMenuItemText = document.createElement("div");
        divFirstLevelMenuItemText.className = "BlenderControlToolbarFirstLevelMenuItemText";
        divFirstLevelMenuItemText.innerHTML = firstLevelMenuItemModel.getText();
        divFirstLevelMenuItem.appendChild(divFirstLevelMenuItemText);

        if (firstLevelMenuItemModel.getMenuItems().length > 0) {
            var imgItemImage = document.createElement("img");
            imgItemImage.className = "BlenderControlToolbarMenuItemIsGroupImage";
            imgItemImage.src = "./user-interface/icons/toolbar-icon-is-group.png";
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

    updateContentsPositionAndSize() {

        var parentNode = this.getNativeElement().parentNode;

        this.getNativeElement().style.height = parentNode.offsetHeight + "px";

        this.getDivExtender().style.height = this.getDivFirstLevelMenus().offsetHeight + "px";
    }


    createExtender() {
        this.divExtender = document.createElement("div");
        this.divExtender.className = "BlenderControlToolbarExtender";
        this.getNativeElement().appendChild(this.divExtender);

        this.divExtender.addEventListener("mousedown", (event) => {
            this.beginDrag(event.x, event.y);
        });
    }

    getDivExtender() {
        return this.divExtender;
    }

    beginDrag(x, y) {
        BlenderControlToolbarView.dragging = this;
        this.getNativeElement().classList.add("dragging");
        this.offsetX = x - this.getDivFirstLevelMenus().offsetWidth;
    }

    drag(x, y) {
        window.getSelection().removeAllRanges();

        var firstLevelMenuItemsWidth = x - this.offsetX;

        if (firstLevelMenuItemsWidth < 32) return;

        this.getDivFirstLevelMenus().style.width = firstLevelMenuItemsWidth + "px";

        if (firstLevelMenuItemsWidth <= 66) {
            this.setExpandModeOneColumn();
        } else if (firstLevelMenuItemsWidth <= 80) {
            this.setExpandModeTwoColumns();
        } else {
            this.setExpandModeExtended();
        }
    }

    endDrag(x, y) {
        this.getNativeElement().classList.remove("dragging");
        BlenderControlToolbarView.dragging = null;

        if (this.isExpandModeOneColumn()) {
            this.getDivFirstLevelMenus().style.width = 32 + "px"
        } else if (this.isExpandModeTwoColumns()) {
            this.getDivFirstLevelMenus().style.width = 66 + "px"
        }
    }

}

window.addEventListener("mousemove", (event) => {
    if (BlenderControlToolbarView.dragging != null) {
        BlenderControlToolbarView.dragging.drag(event.x, event.y);
    }
});

window.addEventListener("mouseup", (event) => {
    if (BlenderControlToolbarView.dragging != null) {
        BlenderControlToolbarView.dragging.endDrag(event.x, event.y);
    }
});