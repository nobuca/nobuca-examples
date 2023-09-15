import NobucaAppView from "../../nobuca-core/app/NobucaAppView.js";
import NobucaFactory from "../../nobuca-core/factory/NobucaFactory.js";
import BlenderControlButtonDropDownView from "./user-interface/control/button-drop-down/BlenderControlButtonDropDownView.js";
import BlenderControlButtonToggleView from "./user-interface/control/button-toggle/BlenderControlButtonToggleView.js";
import BlenderDataBlockMenuView from "./user-interface/control/data-block-menu/BlenderDataBlockMenuView.js";
import BlenderControlSearchView from "./user-interface/control/search/BlenderControlSearchView.js";
import BlenderControlButtonView from "./user-interface/control/button/BlenderControlButtonView.js";
import BlenderControlToolbarView from "./user-interface/control/toolbar/BlenderControlToolbarView.js";
import BlenderControlOutlinerView from "./user-interface/control/outliner/BlenderControlOutlinerView.js";
import BlenderEditorContainerView from "./user-interface/editor/BlenderEditorContainerView.js";
import BlenderEditorView from "./user-interface/editor/BlenderEditorView.js";
import BlenderControlPropertiesView from "./user-interface/control/properties/BlenderControlPropertiesView.js";
import BlenderFieldNumberView from "./user-interface/field/number/BlenderFieldNumberView.js";
import BlenderControlTimelineView from "./user-interface/control/timeline/BlenderControlTimelineView.js";
import BlenderTopbarView from "./user-interface/topbar/BlenderTopbarView.js";
import BlenderStatusbarView from "./user-interface/statusbar/BlenderStatusbarView.js";
import BlenderControlEditorSelectorPopoverView from "./user-interface/control/editor-selector/BlenderControlEditorSelectorPopoverView.js";
import BlenderControlConsoleView from "./user-interface/control/console/BlenderControlConsoleView.js";
import BlenderControl3DViewportView from "./user-interface/control/3d-viewport/BlenderControl3DViewportView.js";

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
        this.registerViewConstructorForModelClassName("BlenderControlConsoleModel",
            function (model) { return new BlenderControlConsoleView(model); });
        this.registerViewConstructorForModelClassName("BlenderControlEditorSelectorPopoverModel",
            function (model) { return new BlenderControlEditorSelectorPopoverView(model); });
            this.registerViewConstructorForModelClassName("BlenderControl3DViewportModel",
            function (model) { return new BlenderControl3DViewportView(model); });
    }

    createNativeElement() {
        this.createRootPanelView();
    }

    createRootPanelView() {
        this.rootPanelView = this.createNewViewForModel(this.getModel().getRootPanel());
        this.addRootPanelViewToDocumentBody(this.rootPanelView);

        this.topbarView = this.createNewViewForModel(this.getModel().getTopbar());
        this.getRootPanelView().getNativeElement().appendChild(this.getTopbarView().getNativeElement());

        this.areasView = this.createNewViewForModel(this.getModel().getAreas());
        this.getRootPanelView().getNativeElement().appendChild(this.getAreasView().getNativeElement());

        this.statusbarView = this.createNewViewForModel(this.getModel().getStatusbar());
        this.getRootPanelView().getNativeElement().appendChild(this.getStatusView().getNativeElement());

        this.updateContentsPositionAndSize();

        window.addEventListener("resize", () => {
            this.updateContentsPositionAndSize();
        });
    }

    getTopbarView() {
        return this.topbarView;
    }

    getAreasView() {
        return this.areasView;
    }

    getStatusView() {
        return this.statusbarView;
    }

    getRootPanelView() {
        return this.rootPanelView;
    }

    updateContentsPositionAndSize() {

        console.log("updateContentsPositionAndSize");

        this.getRootPanelView().getNativeElement().style.height = window.innerHeight + "px";
        this.getRootPanelView().getNativeElement().style.width = window.innerWidth + "px";

        this.getTopbarView().updateContentsPositionAndSize();

        var areasHeight = this.getRootPanelView().getNativeElement().offsetHeight;
        areasHeight -= this.getTopbarView().getNativeElement().offsetHeight;
        areasHeight -= this.getStatusView().getNativeElement().offsetHeight;

        this.getAreasView().getChildViews()[0].getChildViews()[0].getNativeElement().style.height = areasHeight + "px";
        this.getAreasView().getChildViews()[0].getChildViews()[0].getNativeElement().style.width = this.getRootPanelView().getNativeElement().offsetWidth + "px";
        this.getAreasView().getChildViews()[0].getChildViews()[0].updateContentsPositionAndSize();

        this.getStatusView().updateContentsPositionAndSize();
    }

    listenModel() {
        this.getModel().getWorkspaceActivatedRequestedEventEmitter().subscribe(() => {
            console.log("workspace activated");
            this.getAreasView().getChildViews()[0].getChildViews()[0].getNativeElement().style.width = this.getRootPanelView().getNativeElement().offsetWidth + "px";
            this.getAreasView().getChildViews()[0].getChildViews()[0].updateContentsPositionAndSize();

        });
    }
}