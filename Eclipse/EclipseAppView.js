import NobucaAppView from "../../nobuca-core/app/NobucaAppView.js";
import NobucaFactory from "../../nobuca-core/factory/NobucaFactory.js";
import EclipseOutlineView from "./view/outline/EclipseOutlineView.js";
import EclipseProjectExplorerView from "./view/project-explorer/EclipseProjectExplorerView.js";
import EclipseWindowPartContainerStackView from "./window/EclipseWindowPartContainerStackView.js";
import EclipseWindowView from "./window/EclipseWindowView.js";

export default class EclipseAppView extends NobucaAppView {

    constructor(model) {
        super(model);
        this.createMenubar();
        this.createButtonbarContainer();
        this.createWindow();
        this.updateContentsPositionAndSize();
    }

    registerCustomViewConstructors() {
        this.registerViewConstructorForModelClassName("EclipseWindowModel",
            function (model) { return new EclipseWindowView(model); });
        this.registerViewConstructorForModelClassName("EclipseWindowPartContainerStackModel",
            function (model) { return new EclipseWindowPartContainerStackView(model); });
        this.registerViewConstructorForModelClassName("EclipseWindowPartContainerStackModel",
            function (model) { return new EclipseWindowPartContainerStackView(model); });
        this.registerViewConstructorForModelClassName("EclipseProjectExplorerModel",
            function (model) { return new EclipseProjectExplorerView(model); });
            this.registerViewConstructorForModelClassName("EclipseOutlineModel",
            function (model) { return new EclipseOutlineView(model); });
    }

    getClassName() {
        return "EclipseApp";
    }

    createMenubar() {
        this.menubarView = NobucaFactory.createNewViewForModel(this.getModel().getMenubar());
        this.getNativeElement().appendChild(this.getMenubarView().getNativeElement());
    }

    getMenubarView() {
        return this.menubarView;
    }

    createButtonbarContainer() {
        this.buttonbarContainerView = NobucaFactory.createNewViewForModel(this.getModel().getButtonbarContainer());
        this.getNativeElement().appendChild(this.getButtonbarContainerView().getNativeElement());
    }

    getButtonbarContainerView() {
        return this.buttonbarContainerView;
    }

    createWindow() {
        this.windowView = NobucaFactory.createNewViewForModel(this.getModel().getWindow());
        this.getNativeElement().appendChild(this.getWindowView().getNativeElement());
    }

    getWindowView() {
        return this.windowView;
    }

    updateContentsPositionAndSize() {

        super.updateContentsPositionAndSize();

        var parentHeight = window.innerHeight;
        var parentWidth = window.innerWidth;

        this.getNativeElement().style.height = parentHeight + "px";
        this.getNativeElement().style.width = parentWidth + "px";

        if (this.getWindowView() == null) return;

        var menubarHeight = 24;
        var menubarWidth = parentWidth;

        this.getMenubarView().getNativeElement().style.height = menubarHeight + "px";
        this.getMenubarView().getNativeElement().style.width = menubarWidth + "px";

        var buttonbarContainerHeight = 30;
        var buttonbarContainerWidth = parentWidth;

        this.getButtonbarContainerView().getNativeElement().style.height = buttonbarContainerHeight + "px";
        this.getButtonbarContainerView().getNativeElement().style.width = buttonbarContainerWidth + "px";

        var windowWidth = parentWidth;
        var windowHeight = parentHeight - menubarHeight - buttonbarContainerHeight;

        this.getWindowView().getNativeElement().style.height = windowHeight + "px";
        this.getWindowView().getNativeElement().style.width = windowWidth + "px";

        this.getWindowView().updateContentsPositionAndSize();
    }
}