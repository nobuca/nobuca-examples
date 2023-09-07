import NobucaComponentView from "../../../../../nobuca-core/component/NobucaComponentView.js";

export default class BlenderControlButtonDropDownView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderControlButtonDropDown";
        this.setNativeElement(div);

        if (this.getModel().getEnabledDisabledBehaviour()) {

            this.divImageEnabled = document.createElement("div");
            this.divImageEnabled.className = "BlenderControlButtonDropDownImageEnabled";
            this.divImageEnabled.style.display = "none";
            this.getNativeElement().appendChild(this.divImageEnabled);

            var imgImageEnabled = document.createElement("img");
            imgImageEnabled.src = this.getModel().getEnabledImageSrc();
            this.divImageEnabled.appendChild(imgImageEnabled);

            this.divImageDisabled = document.createElement("div");
            this.divImageDisabled.className = "BlenderControlButtonDropDownImageDisabled";
            this.divImageDisabled.style.display = "none";
            this.getNativeElement().appendChild(this.divImageDisabled);

            var imgImageDisabled = document.createElement("img");
            imgImageDisabled.src = this.getModel().getDisabledImageSrc();
            this.divImageDisabled.appendChild(imgImageDisabled);

            this.divImageEnabled.addEventListener("click", () => {
                this.getModel().setEnabled(false);
                this.updateView();
            });

            this.divImageDisabled.addEventListener("click", () => {
                this.getModel().setEnabled(true);
                this.updateView();
            });

        }

        var divContents = document.createElement("div");
        divContents.className = "BlenderControlButtonDropDownContents";
        this.getNativeElement().appendChild(divContents);

        if (this.getModel().getImageSrc() != null) {
            var imgImage = document.createElement("img");
            imgImage.className = "BlenderControlButtonDropDownImage";
            imgImage.src = this.getModel().getImageSrc();
            divContents.appendChild(imgImage);
        }

        if (this.getModel().getTitle() != null) {
            var divTitle = document.createElement("div");
            divTitle.className = "BlenderControlButtonDropDownTitle";
            divTitle.innerHTML = this.getModel().getTitle();
            divContents.appendChild(divTitle);
        }

        this.imgChevron = document.createElement("img");
        this.imgChevron.className = "BlenderControlButtonDropDownChevron";
        this.imgChevron.src = "./window-system/icons/menu-item-icon-chevron-down.svg";
        divContents.appendChild(this.imgChevron);

        this.updateView();
    }

    getDivImageEnabled() {
        return this.divImageEnabled;
    }

    getDivImageDisabled() {
        return this.divImageDisabled;
    }

    getImgChevron() {
        return this.imgChevron;
    }

    updateView() {

        if (!this.getModel().getEnabledDisabledBehaviour()) return;

        if (this.getModel().getEnabled()) {
            this.getDivImageEnabled().style.display = "";
            this.getDivImageDisabled().style.display = "none";
        } else {
            this.getDivImageEnabled().style.display = "none";
            this.getDivImageDisabled().style.display = "";
        }

        if (this.getModel().getPreventDropDownWhenDisabled()) {
            if (!this.getModel().getEnabled()) {
                this.getImgChevron().classList.add("disabled");
            } else {
                this.getImgChevron().classList.remove("disabled");
            }
        }
    }

}