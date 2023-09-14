import NobucaComponentView from "../../../../nobuca-core/component/NobucaComponentView.js";

export default class BlenderStatusbarView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderStatusbar";
        this.setNativeElement(div);

        var divMouseLeftButton = document.createElement("div");
        divMouseLeftButton.className = "BlenderStatusbarMouseLeftButton";
        this.getNativeElement().appendChild(divMouseLeftButton);

        var divMouseLeftButtonImg = document.createElement("img");
        divMouseLeftButtonImg.className = "BlenderStatusbarMouseLeftButtonImg";
        divMouseLeftButtonImg.src = "./window-system/icons/icon-mouse-left-button.svg";
        divMouseLeftButton.appendChild(divMouseLeftButtonImg);

        var divMouseLeftButtonLabel = document.createElement("div");
        divMouseLeftButtonLabel.className = "BlenderStatusbarMouseLeftButtonLabel";
        divMouseLeftButtonLabel.innerHTML = "Select";
        divMouseLeftButton.appendChild(divMouseLeftButtonLabel);

        var divMouseMiddleButton = document.createElement("div");
        divMouseMiddleButton.className = "BlenderStatusbarMouseMiddleButton";
        this.getNativeElement().appendChild(divMouseMiddleButton);

        var divMouseMiddleButtonImg = document.createElement("img");
        divMouseMiddleButtonImg.className = "BlenderStatusbarMouseMiddleButtonImg";
        divMouseMiddleButtonImg.src = "./window-system/icons/icon-mouse-middle-button.svg";
        divMouseMiddleButton.appendChild(divMouseMiddleButtonImg);

        var divMouseMiddleButtonLabel = document.createElement("div");
        divMouseMiddleButtonLabel.className = "BlenderStatusbarMouseMiddleButtonLabel";
        divMouseMiddleButtonLabel.innerHTML = "Rotate View";
        divMouseMiddleButton.appendChild(divMouseMiddleButtonLabel);

        var divMouseRightButton = document.createElement("div");
        divMouseRightButton.className = "BlenderStatusbarMouseRightButton";
        this.getNativeElement().appendChild(divMouseRightButton);

        var divMouseRightButtonImg = document.createElement("img");
        divMouseRightButtonImg.className = "BlenderStatusbarMouseRightButtonImg";
        divMouseRightButtonImg.src = "./window-system/icons/icon-mouse-right-button.svg";
        divMouseRightButton.appendChild(divMouseRightButtonImg);

        var divMouseRightButtonLabel = document.createElement("div");
        divMouseRightButtonLabel.className = "BlenderStatusbarMouseRightButtonLabel";
        divMouseRightButtonLabel.innerHTML = "Object Cotnext Menu";
        divMouseRightButton.appendChild(divMouseRightButtonLabel);

        var divVersion = document.createElement("div");
        divVersion.className = "BlenderStatusbarVersion";
        divVersion.innerHTML = "3.6.2"
        this.getNativeElement().appendChild(divVersion);
    }

}