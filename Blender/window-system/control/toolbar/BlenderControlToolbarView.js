import NobucaComponentView from "../../../../../nobuca-core/component/NobucaComponentView.js";

export default class BlenderControlToolbarView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderControlToolbar";
        this.setNativeElement(div);
        this.createMenuItems();
    }

    createMenuItems() {
        this.getModel()
        .getMenuItems()
        .forEach((menuItemModel) => {
            this.createMenuItem(menuItemModel);
        });
    }

    createMenuItem(menuItemModel) {
        var divItem = document.createElement("div");
        divItem.className = "BlenderControlToolbarItem";
        this.getNativeElement().appendChild(divItem);

        var imgItemImage = document.createElement("img");
        imgItemImage.className = "BlenderControlToolbarItemImage";
        imgItemImage.src = menuItemModel.getIconImageSrc();
        divItem.appendChild(imgItemImage);
    }
}