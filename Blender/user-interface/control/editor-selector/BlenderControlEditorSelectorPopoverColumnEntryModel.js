import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js";

export default class BlenderControlEditorSelectorPopoverColumnEntryModel extends NobucaComponentModel {

    constructor(id, imgSrc, name, shortcut) {
        super();
        this.id = id;
        this.imgSrc = imgSrc;
        this.name = name;
        this.shortcut = shortcut;
    }

    getImgSrc() {
        return this.imgSrc;
    }

    getName() {
        return this.name;
    }

    getShortcut() {
        return this.shortcut;
    }

}
