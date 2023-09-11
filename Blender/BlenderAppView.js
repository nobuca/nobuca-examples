import NobucaAppView from "../../nobuca-core/app/NobucaAppView.js";
import NobucaFactory from "../../nobuca-core/factory/NobucaFactory.js";
import BlenderControlButtonDropDownView from "./window-system/control/button-drop-down/BlenderControlButtonDropDownView.js";
import BlenderControlButtonToggleView from "./window-system/control/button-toggle/BlenderControlButtonToggleView.js";
import BlenderDataBlockMenuView from "./window-system/control/data-block-menu/BlenderDataBlockMenuView.js";
import BlenderControlSearchView from "./window-system/control/search/BlenderControlSearchView.js";
import BlenderControlButtonView from "./window-system/control/button/BlenderControlButtonView.js";
import BlenderControlToolbarView from "./window-system/control/toolbar/BlenderControlToolbarView.js";
import BlenderControlOutlinerView from "./window-system/control/outliner/BlenderControlOutlinerView.js";
import BlenderEditorContainerView from "./window-system/editor/BlenderEditorContainerView.js";
import BlenderEditorView from "./window-system/editor/BlenderEditorView.js";
import BlenderControlPropertiesView from "./window-system/control/properties/BlenderControlPropertiesView.js";

export default class BlenderAppView extends NobucaAppView {

    registerViewConstructors() {
        NobucaFactory.registerDefaultViewConstructors();
        this.registerViewConstructorForModelClassName("BlenderDataBlockMenuModel",
            function(model) { return new BlenderDataBlockMenuView(model); });
        this.registerViewConstructorForModelClassName("BlenderEditorContainerModel",
            function(model) { return new BlenderEditorContainerView(model); });
        this.registerViewConstructorForModelClassName("BlenderEditorModel",
            function(model) { return new BlenderEditorView(model); });
        this.registerViewConstructorForModelClassName("BlenderControlButtonDropDownModel",
            function(model) { return new BlenderControlButtonDropDownView(model); });
        this.registerViewConstructorForModelClassName("BlenderControlButtonToggleModel",
            function(model) { return new BlenderControlButtonToggleView(model); });
        this.registerViewConstructorForModelClassName("BlenderControlSearchModel",
            function(model) { return new BlenderControlSearchView(model); });
        this.registerViewConstructorForModelClassName("BlenderControlButtonModel",
            function(model) { return new BlenderControlButtonView(model); });
        this.registerViewConstructorForModelClassName("BlenderControlToolbarModel",
            function(model) { return new BlenderControlToolbarView(model); });
        this.registerViewConstructorForModelClassName("BlenderControlOutlinerModel",
            function(model) { return new BlenderControlOutlinerView(model); });
        this.registerViewConstructorForModelClassName("BlenderControlPropertiesModel",
            function(model) { return new BlenderControlPropertiesView(model); });
    }
}