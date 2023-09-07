import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js";

export default class BlenderControlButtonToggleItemModel extends NobucaComponentModel {

    getClassName() {
        return "BlenderControlButtonToggleItemModel";
    }

    setImageSrc(imageSrc) {
        this.imageSrc = imageSrc;
    }

    getImageSrc() {
        return this.imageSrc;
    }

    getToggled() {
        return this.toggled;
    }

    setToggled(toggled) {
        this.toggled = toggled;
    }
}