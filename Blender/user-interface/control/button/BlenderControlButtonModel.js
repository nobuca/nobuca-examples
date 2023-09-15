import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js";

export default class BlenderControlButtonModel extends NobucaComponentModel {

    constructor(imageSrc) {
        super();
        this.imageSrc = imageSrc;
    }

    getClassName() {
        return "BlenderControlButtonModel";
    }

    setImageSrc(imageSrc) {
        this.imageSrc = imageSrc;
    }

    getImageSrc() {
        return this.imageSrc;
    }


}