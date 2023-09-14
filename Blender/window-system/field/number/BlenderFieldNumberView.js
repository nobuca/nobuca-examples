import NobucaComponentView from "../../../../../nobuca-core/component/NobucaComponentView.js";

export default class BlenderFieldNumberView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderFieldNumber";
        this.setNativeElement(div);

        var divDecrement = document.createElement("div");
        divDecrement.className = "BlenderFieldNumberDecrement";
        divDecrement.innerHTML = "<";
        this.getNativeElement().appendChild(divDecrement);

        this.divNoEditable = document.createElement("div");
        this.divNoEditable.className = "BlenderFieldNumberNoEditable";
        this.getNativeElement().appendChild(this.divNoEditable);

        if (this.getModel().getLabel() != null) {
            this.divLabel = document.createElement("div");
            this.divNoEditable.appendChild(this.divLabel);
            this.divLabel.className = "BlenderFieldNumberLabel";
            this.divLabel.innerHTML = this.getModel().getLabel();
        }

        this.divValue = document.createElement("div");
        this.divNoEditable.appendChild(this.divValue);
        this.divValue.className = "BlenderFieldNumberValue";
        if (this.getModel().getValue() != null) {
            this.divValue.innerHTML = this.getModel().getValue();
        }

        this.input = document.createElement("input");
        this.input.className = "BlenderFieldNumberInput";
        this.input.type = "text";
        if (this.getModel().getValue() != null) {
            this.input.value = this.getModel().getValue();
        }
        this.getNativeElement().appendChild(this.input);

        this.divNoEditable.addEventListener("mouseup", () => {
            this.enterEditMode();
        });

        this.divNoEditable.addEventListener("mousedown", (event) => {
            this.beginDrag(event.x);
        });

        this.input.addEventListener("blur", () => {
            this.exitEditMode();
        });

        var divIncrement = document.createElement("div");
        divIncrement.className = "BlenderFieldNumberIncrement";
        divIncrement.innerHTML = ">";
        this.getNativeElement().appendChild(divIncrement);
    }

    getDivNoEditable() {
        return this.divNoEditable;
    }

    getDivValue() {
        return this.divValue;
    }

    getInput() {
        return this.input;
    }

    enterEditMode() {
        var currentWidth = this.getNativeElement().offsetWidth;
        this.getNativeElement().classList.add("editMode");
        this.getNativeElement().style.width = currentWidth + "px";
        this.getInput().select();
    }

    exitEditMode() {
        this.getModel().setValue(this.getInput().value);
        this.getDivValue().innerHTML = this.getModel().getValue();
        this.getNativeElement().classList.remove("editMode");
    }

    beginDrag(x) {
        BlenderFieldNumberView.dragging = this;
        BlenderFieldNumberView.firstX = x;
        BlenderFieldNumberView.initialValue = this.getModel().getValue();
        this.getNativeElement().classList.add("dragging");
    }

    endDrag() {
        this.getNativeElement().classList.remove("dragging");
    }

    updateView() {
        this.getDivValue().innerHTML = this.getModel().getValue();
        this.getInput().value = this.getModel().getValue();
    }
}

window.addEventListener("mousemove", (event) => {
    if (BlenderFieldNumberView.dragging == null) return;
    var increment = event.x - BlenderFieldNumberView.firstX;
    var newValue = BlenderFieldNumberView.initialValue + increment;
    BlenderFieldNumberView.dragging.getModel().setValue(newValue);
    BlenderFieldNumberView.dragging.updateView();
});

window.addEventListener("mouseup", (event) => {
    if (BlenderFieldNumberView.dragging == null) return;
    var increment = event.x - BlenderFieldNumberView.firstX;
    var newValue = BlenderFieldNumberView.initialValue + increment;
    BlenderFieldNumberView.dragging.getModel().setValue(newValue);
    BlenderFieldNumberView.dragging.endDrag();
    BlenderFieldNumberView.dragging.updateView();
    BlenderFieldNumberView.dragging = null;
});