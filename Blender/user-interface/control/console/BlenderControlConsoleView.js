import NobucaComponentView from "../../../../../nobuca-core/component/NobucaComponentView.js";

export default class BlenderControlConsoleView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderControlConsole";
        this.setNativeElement(div);

        this.divEntries = document.createElement("div");
        this.divEntries.className = "BlenderControlConsoleEntries";
        this.getNativeElement().appendChild(this.divEntries);
    }

    getDivEntries() {
        return this.divEntries;
    }

    createEntry(entryModel) {
        var divEntry = document.createElement("div");
        divEntry.className = "BlenderControlConsoleEntry " + entryModel.getSeverity();;
        this.getDivEntries().appendChild(divEntry);

        var divEntryTimestamp = document.createElement("div");
        divEntryTimestamp.className = "BlenderControlConsoleEntryTimestamp";
        divEntryTimestamp.innerHTML = entryModel.getTimestamp().toLocaleDateString() + " " + entryModel.getTimestamp().toLocaleTimeString();
        divEntry.appendChild(divEntryTimestamp);

        var divEntrySeverity = document.createElement("div");
        divEntrySeverity.className = "BlenderControlConsoleEntrySeverity";
        divEntrySeverity.innerHTML = entryModel.getSeverity();
        divEntry.appendChild(divEntrySeverity);

        var divEntryText = document.createElement("div");
        divEntryText.className = "BlenderControlConsoleEntryText";
        divEntryText.innerHTML = entryModel.getText();
        divEntry.appendChild(divEntryText);

        this.getNativeElement().scrollTop = divEntry.offsetTop;
    }

    listenModel() {
        this.getModel().getEntryAddedEventEmitter().subscribe(entryModel => {
            this.createEntry(entryModel);
        });
    }
}