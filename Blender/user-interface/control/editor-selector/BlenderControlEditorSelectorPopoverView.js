import NobucaPopoverView from "../../../../../nobuca-core/popover/NobucaPopoverView.js";

export default class BlenderControlEditorSelectorPopoverView extends NobucaPopoverView {

    constructor(model) {
        super(model);
        this.createColumns();
    }

    createColumns() {
        this.divColumns = document.createElement("div");
        this.divColumns.className = "BlenderControlEditorSelectorPopoverColumns";
        this.getNativeElement().appendChild(this.divColumns);
        this.getModel().getColumns().forEach(columnModel => this.createColumn(columnModel));
    }

    getDivColumns() {
        return this.divColumns;
    }

    createColumn(columnModel) {
        var divColumn = document.createElement("div");
        divColumn.className = "BlenderControlEditorSelectorPopoverColumn";
        this.getDivColumns().appendChild(divColumn);

        var divColumnName = document.createElement("div");
        divColumn.appendChild(divColumnName);
        divColumnName.className = "BlenderControlEditorSelectorPopoverColumnName";
        divColumnName.innerHTML = columnModel.getName();

        this.createColumnEntries(divColumn, columnModel);
    }

    createColumnEntries(divColumn, columnModel) {
        var divColumnEntries = document.createElement("div");
        divColumnEntries.className = "BlenderControlEditorSelectorPopoverColumnEntries";
        divColumn.appendChild(divColumnEntries);
        columnModel.getEntries().forEach(entryModel => this.createColumnEntry(divColumnEntries, entryModel));
    }

    createColumnEntry(divColumnEntries, entryModel) {
        var divColumnEntry = document.createElement("div");
        divColumnEntry.className = "BlenderControlEditorSelectorPopoverColumnEntry";
        divColumnEntries.appendChild(divColumnEntry);

        var imgColumnEntryIcon = document.createElement("img");
        divColumnEntry.appendChild(imgColumnEntryIcon);
        imgColumnEntryIcon.className = "BlenderControlEditorSelectorPopoverColumnEntryIcon";
        imgColumnEntryIcon.src = entryModel.getImgSrc();

        var divColumnEntryName = document.createElement("div");
        divColumnEntry.appendChild(divColumnEntryName);
        divColumnEntryName.className = "BlenderControlEditorSelectorPopoverColumnEntryName";
        divColumnEntryName.innerHTML = entryModel.getName();

        var divColumnEntryShortcut = document.createElement("div");
        divColumnEntry.appendChild(divColumnEntryShortcut);
        divColumnEntryShortcut.className = "BlenderControlEditorSelectorPopoverColumnEntryShortcut";
        divColumnEntryShortcut.innerHTML = entryModel.getShortcut();

        divColumnEntry.addEventListener("click", event => {
            this.destroyPopover();
            this.getModel().getEntryClickedEventEmitter().emit(entryModel.getId());
        });
    }

}
