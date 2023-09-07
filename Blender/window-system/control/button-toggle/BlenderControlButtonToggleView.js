import NobucaComponentView from "../../../../../nobuca-core/component/NobucaComponentView.js";

export default class BlenderControlButtonToggleView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderControlButtonToggle";
        this.setNativeElement(div);

        this.createItems();

        this.createDropDown();

        this.updateView();
    }

    getDivItems() {
        return this.divItems;
    }

    createItems() {
        this.divItems = document.createElement("div");
        this.divItems.className = "BlenderControlButtonToggleItems";
        this.divItemList = [];
        this.getNativeElement().appendChild(this.divItems);
        this.getModel().getItems().forEach(itemModel => {
            this.createItem(itemModel);
        });
    }

    getDivItemList() {
        return this.divItemList;
    }

    createItem(itemModel) {

        var divItem = document.createElement("div");
        divItem.className = "BlenderControlButtonToggleItem";
        this.getDivItems().appendChild(divItem);
        divItem.itemModel = itemModel;
        this.divItemList.push(divItem);

        var imgImage = document.createElement("img");
        imgImage.className = "BlenderControlButtonToggleItemImage";
        imgImage.src = itemModel.getImageSrc();
        divItem.appendChild(imgImage);

        divItem.addEventListener("click", () => {
            itemModel.setToggled(!itemModel.getToggled());
            this.updateView();
        });

    }

    updateView() {
        this.getModel().getItems().forEach(itemModel => {
            this.updateItemView(itemModel);
        });
    }

    getDivItemByItemModel(itemModel) {
        return this.getDivItemList().filter(divItem => divItem.itemModel == itemModel)[0];
    }

    updateItemView(itemModel) {
        var divItem = this.getDivItemByItemModel(itemModel);
        if (itemModel.getToggled()) {
            divItem.classList.add("toggled");
        } else {
            divItem.classList.remove("toggled");
        }
    }

    createDropDown() {
        if(this.getModel().getDropDown()) {
            var divDropDown = document.createElement("div");
            divDropDown.className = "BlenderControlButtonToggleDropDown";
            this.getDivItems().appendChild(divDropDown);
    
            var imgChevron = document.createElement("img");
            imgChevron.className = "BlenderControlButtonToggleDropDownChevron";
            imgChevron.src = "./window-system/icons/menu-item-icon-chevron-down.svg";
            divDropDown.appendChild(imgChevron);
        }
    }

}