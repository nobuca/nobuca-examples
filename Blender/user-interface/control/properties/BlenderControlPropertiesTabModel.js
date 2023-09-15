import NobucaPanelModel from "../../../../../nobuca-core/panel/NobucaPanelModel.js";


export default class BlenderControlPropertiesTabModel extends NobucaPanelModel {

    constructor() {
        super();
        this.active = false;
    }

    setIconSrc(iconSrc) {
        this.iconSrc = iconSrc;
    }

    getIconSrc() {
        return this.iconSrc;
    }

    setActive(active) {
        this.active = active;
    }

    getActive() {
        return this.active;
    }
}