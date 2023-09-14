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
import BlenderFieldNumberView from "./window-system/field/number/BlenderFieldNumberView.js";
import BlenderControlTimelineView from "./window-system/control/timeline/BlenderControlTimelineView.js";
import BlenderTopbarView from "./window-system/topbar/BlenderTopbarView.js";
import BlenderStatusbarView from "./window-system/statusbar/BlenderStatusbarView.js";

export default class BlenderAppView extends NobucaAppView {

    registerViewConstructors() {
        NobucaFactory.registerDefaultViewConstructors();
        this.registerViewConstructorForModelClassName("BlenderDataBlockMenuModel",
            function (model) { return new BlenderDataBlockMenuView(model); });
        this.registerViewConstructorForModelClassName("BlenderTopbarModel",
            function (model) { return new BlenderTopbarView(model); });
        this.registerViewConstructorForModelClassName("BlenderStatusbarModel",
            function (model) { return new BlenderStatusbarView(model); });
        this.registerViewConstructorForModelClassName("BlenderEditorContainerModel",
            function (model) { return new BlenderEditorContainerView(model); });
        this.registerViewConstructorForModelClassName("BlenderEditorModel",
            function (model) { return new BlenderEditorView(model); });
        this.registerViewConstructorForModelClassName("BlenderControlButtonDropDownModel",
            function (model) { return new BlenderControlButtonDropDownView(model); });
        this.registerViewConstructorForModelClassName("BlenderControlButtonToggleModel",
            function (model) { return new BlenderControlButtonToggleView(model); });
        this.registerViewConstructorForModelClassName("BlenderControlSearchModel",
            function (model) { return new BlenderControlSearchView(model); });
        this.registerViewConstructorForModelClassName("BlenderControlButtonModel",
            function (model) { return new BlenderControlButtonView(model); });
        this.registerViewConstructorForModelClassName("BlenderControlToolbarModel",
            function (model) { return new BlenderControlToolbarView(model); });
        this.registerViewConstructorForModelClassName("BlenderControlOutlinerModel",
            function (model) { return new BlenderControlOutlinerView(model); });
        this.registerViewConstructorForModelClassName("BlenderControlPropertiesModel",
            function (model) { return new BlenderControlPropertiesView(model); });
        this.registerViewConstructorForModelClassName("BlenderFieldNumberModel",
            function (model) { return new BlenderFieldNumberView(model); });
        this.registerViewConstructorForModelClassName("BlenderControlTimelineModel",
            function (model) { return new BlenderControlTimelineView(model); });
    }

    createNativeElement() {
        this.createRootPanelView();
    }

    createRootPanelView() {
        this.rootPanelView = this.createNewViewForModel(this.getModel().getRootPanel());
        this.addRootPanelViewToDocumentBody(this.rootPanelView);

        this.topbarView = this.createNewViewForModel(this.getModel().getTopbar());
        this.getRootPanelView().getNativeElement().appendChild(this.topbarView.getNativeElement());

        this.areasView = this.createNewViewForModel(this.getModel().getAreas());
        this.getRootPanelView().getNativeElement().appendChild(this.areasView.getNativeElement());

        this.statusbarView = this.createNewViewForModel(this.getModel().getStatusbar());
        this.getRootPanelView().getNativeElement().appendChild(this.statusbarView.getNativeElement());

        this.updateContentsPositionAndSize();

        window.addEventListener("resize", () => {
            this.updateContentsPositionAndSize();
        });
    }

    getRootPanelView() {
        return this.rootPanelView;
    }

    updateContentsPositionAndSize() {
        this.topbarView.updateContentsPositionAndSize();
        this.areasView.updateContentsPositionAndSize();
        this.statusbarView.updateContentsPositionAndSize();
    }
}