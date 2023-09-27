import NobucaComponentView from "../../../nobuca-core/component/NobucaComponentView.js";
import NobucaFactory from "../../../nobuca-core/factory/NobucaFactory.js";

export default class EclipseWindowView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "EclipseWindow";
        this.setNativeElement(div);
        this.createPartContainer();
    }

    createPartContainer() {
        if (this.getModel().getPartContainer() == null) return;
        this.partContainerView = NobucaFactory.createNewViewForModel(this.getModel().getPartContainer());
        this.getNativeElement().appendChild(this.getPartContainerView().getNativeElement());
    }
    
    getPartContainerView() {
        return this.partContainerView;
    }

    updateContentsPositionAndSize() {
        this.getPartContainerView().getNativeElement().style.height =  this.getNativeElement().offsetHeight + "px";
        this.getPartContainerView().getNativeElement().style.width =  this.getNativeElement().offsetWidth + "px";
        this.getPartContainerView().updateContentsPositionAndSize();
    }
}