import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js";

export default class BlenderControlButtonDropDownModel extends NobucaComponentModel {

    getClassName() {
        return "BlenderControlButtonDropDownModel";
    }

    setImageSrc(imageSrc) {
        this.imageSrc = imageSrc;
    }

    getImageSrc() {
        return this.imageSrc;
    }

    setEnabledImageSrc(imageSrc) {
        this.enabledImageSrc = imageSrc;
    }

    getEnabledImageSrc() {
        return this.enabledImageSrc;
    }

    setDisabledImageSrc(imageSrc) {
        this.disabledImageSrc = imageSrc;
    }

    getDisabledImageSrc() {
        return this.disabledImageSrc;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setEnabled(enabled) {
        this.enabled = enabled;
    }

    getEnabled() {
        return this.enabled;
    }

    setEnabledDisabledBehaviour(enabledDisabledBehaviour) {
        this.enabledDisabledBehaviour = enabledDisabledBehaviour;
    }

    getEnabledDisabledBehaviour() {
        return this.enabledDisabledBehaviour;
    }

    setPreventDropDownWhenDisabled(preventDropDownWhenDisabled) {
        this.preventDropDownWhenDisabled = preventDropDownWhenDisabled;
    }

    getPreventDropDownWhenDisabled() {
        return this.preventDropDownWhenDisabled;
    }

}