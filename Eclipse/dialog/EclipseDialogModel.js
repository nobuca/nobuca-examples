import NobucaDialogModel from "../../../nobuca-core/dialog/NobucaDialogModel.js"


export default class EclipseDialogModel extends NobucaDialogModel {

    constructor(width, height, title, iconSrc) {
        super(width, height, title, iconSrc);
        this.createSubheader();
    }

    setSubheader(subheader) {
        this.subheader = subheader;
    }

    getSubheader() {
        return this.subheader;
    }
}