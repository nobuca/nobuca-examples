import NobucaAppView from "../../nobuca-core/app/NobucaAppView.js";
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
import NobucaFactory from "../../nobuca-core/factory/NobucaFactory.js";

export default class BlenderAppView extends NobucaAppView {

    constructor(model) {
        super(model);
        this.createSplashTopbarAreasStatusbar();
    }

    registerCustomViewConstructors() {
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

    getClassName() {
        return "BlenderApp";
    }

    createSplashTopbarAreasStatusbar() {
        this.createSplashScreen();
        this.createTopbarView();
        this.createAreasView();
        this.createStatusbarView();
        this.updateContentsPositionAndSize();
    }

    createSplashScreen() {
        this.splashScreenView = NobucaFactory.createNewViewForModel(this.getModel().getSplashScreen());
        this.updateContentsPositionAndSize();
    }

    getSplashScreenView() {
        return this.splashScreenView;
    }

    createTopbarView() {
        this.topbarView = NobucaFactory.createNewViewForModel(this.getModel().getTopbar());
        this.getNativeElement().appendChild(this.getTopbarView().getNativeElement());
    }

    getTopbarView() {
        return this.topbarView;
    }

    createAreasView() {
        this.areasView = NobucaFactory.createNewViewForModel(this.getModel().getAreas());
        this.getNativeElement().appendChild(this.getAreasView().getNativeElement());
    }

    getAreasView() {
        return this.areasView;
    }

    createStatusbarView() {
        this.statusbarView = NobucaFactory.createNewViewForModel(this.getModel().getStatusbar());
        this.getNativeElement().appendChild(this.getStatusView().getNativeElement());
    }

    getStatusView() {
        return this.statusbarView;
    }

    updateContentsPositionAndSize() {

        this.getNativeElement().style.height = window.innerHeight + "px";
        this.getNativeElement().style.width = window.innerWidth + "px";

        if (this.getTopbarView() == null) return;

        var areasHeight = this.getNativeElement().offsetHeight;
        areasHeight -= this.getTopbarView().getNativeElement().offsetHeight;
        areasHeight -= this.getStatusView().getNativeElement().offsetHeight;

        var workspaceView = this.getAreasView().getChildViews()[0].getChildViews()[0];

        if (workspaceView.getNativeElement().offsetHeight != areasHeight ||
            workspaceView.getNativeElement().offsetWidth != this.getNativeElement().offsetWidth) {
            workspaceView.getNativeElement().style.height = areasHeight + "px";
            workspaceView.getNativeElement().style.width = this.getNativeElement().offsetWidth + "px";
            workspaceView.updateContentsPositionAndSize();
        }

        if (this.getSplashScreenView() != null) {

            var top = window.innerHeight / 2 - this.getSplashScreenView().getNativeElement().offsetHeight / 2;
            var left = window.innerWidth / 2 - this.getSplashScreenView().getNativeElement().offsetWidth / 2;

            this.getSplashScreenView().getNativeElement().style.top = top + "px";
            this.getSplashScreenView().getNativeElement().style.left = left + "px";
        }
    }

    listenModel() {
        this.getModel().getWorkspaceActivatedRequestedEventEmitter().subscribe(() => {
            this.getAreasView().getChildViews()[0].getChildViews()[0].getNativeElement().style.width = this.getNativeElement().offsetWidth + "px";
            this.getAreasView().getChildViews()[0].getChildViews()[0].updateContentsPositionAndSize();
        });
        this.getModel().getShowSplashScreenEventEmitter().subscribe(() => {
            this.createSplashScreen();
        });
    }
}