import NobucaComponentView from "../../../../../nobuca-core/component/NobucaComponentView.js";

export default class BlenderDataBlockMenuView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderDataBlockMenu";
        this.setNativeElement(div);
        this.createExpandButton();
        this.createSeparator();
        this.createNameTextInput();
        this.createSeparator();
        this.createNewButton();
        this.createSeparator();
        this.createDeleteButton();
    }

    getImageForType() {
        if (this.getModel().getType() == "scene")
            return "./window-system/icons/menu-item-icon-data-block-scene.svg"
        if (this.getModel().getType() == "viewLayer")
            return "./window-system/icons/menu-item-icon-data-block-view-layer.svg"
        return null;
    }

    createExpandButton() {
        var div = document.createElement("div");
        div.className = "BlenderDataBlockMenuPart";
        this.getNativeElement().appendChild(div);

        var imgType = document.createElement("img");
        imgType.className = "BlenderDataBlockMenuExpandButtonTypeIcon";
        imgType.src = this.getImageForType();
        div.appendChild(imgType);

        var imgDown = document.createElement("img");
        imgDown.className = "BlenderDataBlockMenuExpandButtonDownIcon";
        imgDown.src = "./window-system/icons/menu-item-icon-chevron-down.svg";
        div.appendChild(imgDown);
    }

    createSeparator() {
        var div = document.createElement("div");
        div.className = "BlenderDataBlockMenuSeparator";
        this.getNativeElement().appendChild(div);
    }

    createNameTextInput() {
        var div = document.createElement("div");
        div.className = "BlenderDataBlockMenuName";
        this.getNativeElement().appendChild(div);

        var input = document.createElement("input");
        input.className = "BlenderDataBlockMenuNameInput";
        div.appendChild(input);

        var imgPin = document.createElement("img");
        imgPin.className = "BlenderDataBlockMenuNamePin";
        imgPin.src = "./window-system/icons/menu-item-icon-pin.svg";
        div.appendChild(imgPin);
    }

    createNewButton() {
        var div = document.createElement("div");
        div.className = "BlenderDataBlockMenuPart";
        this.getNativeElement().appendChild(div);

        var imgNew = document.createElement("img");
        imgNew.className = "BlenderDataBlockMenuNewButtonIcon";
        imgNew.src = "./window-system/icons/menu-item-icon-copy.svg";
        div.appendChild(imgNew);
    }

    createDeleteButton() {
        var div = document.createElement("div");
        div.className = "BlenderDataBlockMenuPart disabled";
        this.getNativeElement().appendChild(div);

        var imgDelete = document.createElement("img");
        imgDelete.className = "BlenderDataBlockMenuDeleteButtonIcon";
        imgDelete.src = "./window-system/icons/menu-item-icon-cross.svg";
        div.appendChild(imgDelete);
    }

}