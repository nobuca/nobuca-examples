
import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js";
import BlenderControlEditorSelectorColumnEntryModel from "./BlenderControlEditorSelectorPopoverColumnEntryModel.js";

export default class BlenderControlEditorSelectorPopoverColumnModel extends NobucaComponentModel {

    constructor(name) {
        super();
        this.name = name;
        this.entries = [];
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getEntries() {
        return this.entries;
    }

    addEntry(id, imgSrc, name, shortcut) {
        var entry = new BlenderControlEditorSelectorColumnEntryModel(id, imgSrc, name, shortcut);
        this.getEntries().push(entry);
    }



}
