import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js";

export default class BlenderFieldNumberModel extends NobucaComponentModel {

    constructor(value, units) {
        super();
        this.value = value;
        this.units = units;
    }

    getClassName() {
        return "BlenderFieldNumberModel";
    }

    setValue(value) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    setLabel(label) {
        this.label = label;
    }

    getLabel() {
        return this.label;
    }

    setUnits(units) {
        this.units = units;
    }

    getUnits() {
        return this.units;
    }
}