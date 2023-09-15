import NobucaComponentView from "../../../../../nobuca-core/component/NobucaComponentView.js";

export default class BlenderControlButtonView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderControlButton";
        this.setNativeElement(div);

        var divContents = document.createElement("div");
        divContents.className = "BlenderControlButtonContents";
        this.getNativeElement().appendChild(divContents);

        var imgImage = document.createElement("img");
        imgImage.className = "BlenderControlButtonImage";
        imgImage.src = this.getModel().getImageSrc();
        divContents.appendChild(imgImage);
    }
}