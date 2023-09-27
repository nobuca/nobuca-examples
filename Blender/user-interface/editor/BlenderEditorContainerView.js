import NobucaComponentView from "../../../../nobuca-core/component/NobucaComponentView.js";
import NobucaFactory from "../../../../nobuca-core/factory/NobucaFactory.js";

export default class BlenderEditorContainerView extends NobucaComponentView {

    getClassName() {
        return "BlenderEditorContainer";
    }

    createNativeElement() {
        var div = document.createElement("div");
        div.className = this.getClassName();
        this.setNativeElement(div);
        this.changeActiveEditorTo(this.getModel().getActiveEditor());
    }

    updateContentsPositionAndSize() {

        var margin = 1;
      
        var editorHeight = this.getNativeElement().offsetHeight - margin*2;
        var editorWidth = this.getNativeElement().offsetWidth - margin*2;

        this.getActiveEditorView().getNativeElement().style.top = margin + "px";
        this.getActiveEditorView().getNativeElement().style.left = margin + "px";

        this.getActiveEditorView().getNativeElement().style.height = editorHeight + "px";
        this.getActiveEditorView().getNativeElement().style.width = editorWidth + "px";

        this.getActiveEditorView().updateContentsPositionAndSize();
    }

    getActiveEditorView() {
        return this.activeEditorView;
    }

    setActiveEditorView(activeEditorView) {
        this.activeEditorView = activeEditorView;
    }

    changeActiveEditorTo(editorModel) {
        var editorView = NobucaFactory.createNewViewForModel(editorModel);
        if (this.getActiveEditorView() != null) {
            this.getNativeElement().removeChild(this.activeEditorView.getNativeElement());
        }
        this.setActiveEditorView(editorView);
        this.getNativeElement().appendChild(editorView.getNativeElement());
        this.getActiveEditorView().updateContentsPositionAndSize();
    }

    listenModel() {
       this.getModel().getActiveEditorChangedEventEmitter().subscribe(() => {
            this.changeActiveEditorTo(this.getModel().getActiveEditor());
        });
    }
}