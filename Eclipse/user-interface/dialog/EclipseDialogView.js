import NobucaDialogView from "../../../../nobuca-core/dialog/NobucaDialogView.js";


export default class EclipseDialogView extends NobucaDialogView {

    createDivHeader() {
        super.createDivHeader();
        this.createDivSubheader();
    }

    createDivSubheader() {
        let divDialogSubheader = document.createElement("div");
        this.getDivDialog().appendChild(divDialogSubheader);
        divDialogSubheader.className = "NobucaDialogSubheader";
        this.divDialogSubheader = divDialogSubheader;
        var subheaderView = NobucaFactory.createNewViewForModel(this.getModel().getSubheader());
        divDialogSubheader.appendChild(subheaderView.getNativeElement());
        return divDialogSubheader;
    }
}