import NobucaMenuModel from "../../../../../nobuca-core/menu/NobucaMenuModel.js";

export default class BlenderControlToolbarModel extends NobucaMenuModel {

    getClassName() {
        return "BlenderControlToolbarModel";
    }

    setImageSrc(imageSrc) {
        this.imageSrc = imageSrc;
    }

    getImageSrc() {
        return this.imageSrc;
    }


}