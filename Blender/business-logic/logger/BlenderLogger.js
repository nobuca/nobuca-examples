
import NobucaEvetEmitter from "../../../../nobuca-core/event/NobucaEventEmitter.js";
import BlenderControlConsoleEntryModel from "../../user-interface/control/console/BlenderControlConsoleEntryModel.js";

export default class BlenderLogger {

    static logAddedEventEmitter = new NobucaEvetEmitter();

    static getLogAddedEventEmitter() {
        return BlenderLogger.logAddedEventEmitter;
    }

    static info(text) {
        BlenderLogger.log("info", text);
    }

    static debug(text) {
        BlenderLogger.log("debug", text);
    }

    static warn(text) {
        BlenderLogger.log("warn", text);
    }

    static error(text) {
        BlenderLogger.log("error", text);
    }

    static log(severity, text) {
        var entry = new BlenderControlConsoleEntryModel(new Date(), severity, text);
        BlenderLogger.getLogAddedEventEmitter().emit(entry);
    }
}