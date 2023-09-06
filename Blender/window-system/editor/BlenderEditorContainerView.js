import NobucaComponentView from "../../../../nobuca-core/component/NobucaComponentView.js";

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
        var parent = this.getNativeElement().parentNode;
        var parentHeight = parent.offsetHeight;
        var parentWidth = parent.offsetWidth;
        this.getNativeElement().style.height = parentHeight + "px";
        this.getNativeElement().style.width = parentWidth + "px";
        this.getActiveEditorView().updateContentsPositionAndSize();
    }

    getActiveEditorView() {
        return this.activeEditorView;
    }

    setActiveEditorView(activeEditorView) {
        this.activeEditorView = activeEditorView;
    }

    changeActiveEditorTo(editorModel) {
        var editorView = this.createNewViewForModel(editorModel);
        if (this.getActiveEditorView() != null) {
            this.getNativeElement().removeChild(this.activeEditorView.getNativeElement());
        }
        this.setActiveEditorView(editorView);
        this.getNativeElement().appendChild(editorView.getNativeElement());
    }

    listenModel() {
        this.getModel().getActiveEditorChangedEventEmitter().subscribe(() => {
            this.changeActiveEditorTo(this.getModel().getActiveEditor());
        });
    }
}