import NobucaComponentView from "../../../../../nobuca-core/component/NobucaComponentView.js";

export default class BlenderControlSearchView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderControlSearch";
        this.setNativeElement(div);

        var imgMagnifierIcon = document.createElement("img");
        imgMagnifierIcon.className = "BlenderControlSearchMagnifierIcon";
        imgMagnifierIcon.src = "./user-interface/icons/icon-search.svg";
        this.getNativeElement().appendChild(imgMagnifierIcon);

        var inputText = document.createElement("input");
        inputText.className = "BlenderControlSearchText";
        inputText.value = this.getModel().getText();
        this.getNativeElement().appendChild(inputText);

        this.imgClearIcon = document.createElement("img");
        this.imgClearIcon.className = "BlenderControlSearchClearIcon";
        this.imgClearIcon.src = "./user-interface/icons/icon-cross.svg";
        this.getNativeElement().appendChild(this.imgClearIcon);

        inputText.addEventListener("keyup", () => {
            this.getModel().setText(inputText.value);
            this.updateView();
        });

        inputText.addEventListener("change", () => {
            this.getModel().setText(inputText.value);
            this.updateView();
        });

        this.imgClearIcon.addEventListener("click", () => {
            inputText.value = "";
            this.getModel().setText("");
            this.updateView();
        });

        this.updateView();
    }

    getImgClearIcon() {
        return this.imgClearIcon;
    }

    updateView() {
        if (this.getModel().getText() == "") {
            this.getImgClearIcon().classList.add("disabled");
        } else {
            this.getImgClearIcon().classList.remove("disabled");
        }
    }
}