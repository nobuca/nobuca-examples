import NobucaAppView from "../../nobuca-core/app/NobucaAppView.js";
import NobucaFactory from "../../nobuca-core/factory/NobucaFactory.js";
import BlenderDataBlockMenuView from "./window-system/control/data-block-menu/BlenderDataBlockMenuView.js";
import BlenderEditorContainerView from "./window-system/editor/BlenderEditorContainerView.js";
import BlenderEditorView from "./window-system/editor/BlenderEditorView.js";
import Blender3dViewportEditorView from "./window-system/editor/Blender3dViewportEditorView.js";

export default class BlenderAppView extends NobucaAppView {

    registerViewConstructors() {
        NobucaFactory.registerDefaultViewConstructors();
        this.registerViewConstructorForModelClassName("BlenderDataBlockMenuModel",
            function(model) { return new BlenderDataBlockMenuView(model); });
        this.registerViewConstructorForModelClassName("BlenderEditorContainerModel",
            function(model) { return new BlenderEditorContainerView(model); });
        this.registerViewConstructorForModelClassName("BlenderEditorModel",
            function(model) { return new BlenderEditorView(model); });
        this.registerViewConstructorForModelClassName("Blender3dViewportEditorModel",
            function(model) { return new Blender3dViewportEditorView(model); });
    }
}