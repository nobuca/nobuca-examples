import NobucaComponentView from "../../../../../nobuca-core/component/NobucaComponentView.js";

export default class BlenderControlConsoleView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderControlConsole";
        this.setNativeElement(div);
    }
}