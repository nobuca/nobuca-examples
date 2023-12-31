import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";
import NobucaMenubarModel from "../../../../nobuca-core/menubar/NobucaMenubarModel.js";
import NobucaMenuItemModel from "../../../../nobuca-core/menu/NobucaMenuItemModel.js";
import NobucaMenuItemSeparatorModel from "../../../../nobuca-core/menu/NobucaMenuItemSeparatorModel.js";
import NobucaTabsHeaderModel from "../../../../nobuca-core/tabs/NobucaTabsHeaderModel.js";
import NobucaTabHeaderModel from "../../../../nobuca-core/tabs/NobucaTabHeaderModel.js";
import BlenderDataBlockMenuModel from "../control/data-block-menu/BlenderDataBlockMenuModel.js";

export default class BlenderTopbarModel extends NobucaPanelModel {

    constructor() {
        super();
        this.setId("topbarPanel");
        this.createMenubar();
        this.createWorkspaces();
        this.createScenesAndLayers();
        this.createWorkspaceChangeRequestedEventEmitter();
    }

    getClassName() {
        return "BlenderTopbarModel";
    }

    createWorkspaceChangeRequestedEventEmitter() {
        this.workspaceChangeRequestedEventEmitter = this.createEventEmitter();
    }

    getWorkspaceChangeRequestedEventEmitter() {
        return this.workspaceChangeRequestedEventEmitter;
    }

    createMenubar() {
        this.menubar = new NobucaMenubarModel();

        var blenderMenuItem = this.getMenubar().addMenuItem(new NobucaMenuItemModel("blender"));
        blenderMenuItem.setIconImageSrc("./user-interface/icons/icon-blender.svg");
        blenderMenuItem.addMenuItem(new NobucaMenuItemModel("splashScreen", "<u>S</u>plash Screen"));
        blenderMenuItem.addMenuItem(new NobucaMenuItemModel("aboutBlender", "<u>A</u>bout Blender"));
        blenderMenuItem.addMenuItem(new NobucaMenuItemSeparatorModel());
        blenderMenuItem.addMenuItem(new NobucaMenuItemModel("installApplicationTemplate", "<u>I</u>ntall Application Template..."));
        blenderMenuItem.addMenuItem(new NobucaMenuItemSeparatorModel());
        blenderMenuItem.addMenuItem(new NobucaMenuItemModel("system", "System"));
        var fileMenuItem = this.getMenubar().addMenuItem(new NobucaMenuItemModel("file", "File"));
        var fileNewMenuItem = fileMenuItem.addMenuItem(new NobucaMenuItemModel("new", "<u>N</u>ew"));
        fileNewMenuItem.setIconImageSrc("./user-interface/icons/icon-file-new.svg");
        fileNewMenuItem.setShortcut("Ctrl N");
        fileNewMenuItem.addMenuItem(new NobucaMenuItemModel("fileNewGeneral", "<u>G</u>eneral"));
        fileNewMenuItem.addMenuItem(new NobucaMenuItemModel("fileNew2dAnimation", "2<u>D</u> Animation"));
        fileNewMenuItem.addMenuItem(new NobucaMenuItemModel("fileNewSculpting", "<u>S</u>culpting"));
        fileNewMenuItem.addMenuItem(new NobucaMenuItemModel("fileNewVfx", "<u>V</u>FX"));
        fileNewMenuItem.addMenuItem(new NobucaMenuItemModel("fileNewVideoEditing", "Video <u>E</u>diting"));
        var fileOpenMenuItem = fileMenuItem.addMenuItem(new NobucaMenuItemModel("open", "<u>O</u>pen..."));
        fileOpenMenuItem.setIconImageSrc("./user-interface/icons/icon-file-open.svg");
        fileOpenMenuItem.setShortcut("Ctrl O");
        var fileOpenRecentMenuItem = fileMenuItem.addMenuItem(new NobucaMenuItemModel("fileOpenRecent", "Open <u>R</u>ecent"));
        fileOpenRecentMenuItem.setShortcut("Shift Ctrl O");
        var fileRevertMenuItem = fileMenuItem.addMenuItem(new NobucaMenuItemModel("fileRevert", "Re<u>v</u>ert"));
        fileRevertMenuItem.setDisabled(true);
        var fileRecoverMenuItem = fileMenuItem.addMenuItem(new NobucaMenuItemModel("fileRecover", "Recover"));
        fileRecoverMenuItem.addMenuItem(new NobucaMenuItemModel("lastSession", "Last Session"));
        fileRecoverMenuItem.addMenuItem(new NobucaMenuItemModel("autoSave", "Auto Save"));
        fileMenuItem.addMenuItem(new NobucaMenuItemSeparatorModel());
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("save", "Save"));
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("saveAs", "Save As..."));
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("saveCopy", "Save Copy..."));
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("link", "Link..."));
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("append", "Append..."));
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("dataPreviews", "Data Previews"));
        fileMenuItem.addMenuItem(new NobucaMenuItemSeparatorModel());
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("import", "Import"));
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("export", "Export"));
        fileMenuItem.addMenuItem(new NobucaMenuItemSeparatorModel());
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("externalData", "External Data"));
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("cleanUp", "Clean Up"));
        fileMenuItem.addMenuItem(new NobucaMenuItemSeparatorModel());
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("defaults", "Defaults"));
        fileMenuItem.addMenuItem(new NobucaMenuItemSeparatorModel());
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("quit", "Quit"));
        var editMenuItem = this.getMenubar().addMenuItem(new NobucaMenuItemModel("edit", "Edit"));
        var editUndoMenuItem = editMenuItem.addMenuItem(new NobucaMenuItemModel("undo", "<u>U</u>ndo"));
        editUndoMenuItem.setShortcut("Ctrl Z");
        var editRedoMenuItem = editMenuItem.addMenuItem(new NobucaMenuItemModel("redo", "<u>R</u>edo"));
        editRedoMenuItem.setShortcut("Shift Ctrl Z");
        editRedoMenuItem.setDisabled(true);
        this.getMenubar().addMenuItem(new NobucaMenuItemModel("render", "Render"));
        var windowMenuItem = this.getMenubar().addMenuItem(new NobucaMenuItemModel("window", "Window"));
        windowMenuItem.addMenuItem(new NobucaMenuItemModel("windowNewWindow", "<u>N</u>ew Window"));
        windowMenuItem.addMenuItem(new NobucaMenuItemModel("windowNewWindow", "New <u>M</u>ain Window"));
        windowMenuItem.addMenuItem(new NobucaMenuItemSeparatorModel());
        var windowtoggleFullscreenMenuItem = windowMenuItem.addMenuItem(new NobucaMenuItemModel("windowtoggleWindowFullscreen", "<u>T</u>oggle Window Fullscreen"));
        windowtoggleFullscreenMenuItem.setIconImageSrc("./user-interface/icons/icon-window-toggle-fullscreen.svg");
        windowMenuItem.addMenuItem(new NobucaMenuItemSeparatorModel());
        windowMenuItem.addMenuItem(new NobucaMenuItemModel("windowNextWorkspace", "Next <u>W</u>workspace"));
        windowMenuItem.addMenuItem(new NobucaMenuItemModel("windowPreviousWorkspace", "<u>P</u>revious Wworkspace"));
        windowMenuItem.addMenuItem(new NobucaMenuItemSeparatorModel());
        var windowShowStatusBar = windowMenuItem.addMenuItem(new NobucaMenuItemModel("windowShowStatusBar", "Show Status Bar"));
        windowShowStatusBar.setIconImageSrc("./user-interface/icons/icon-checked.svg");
        windowMenuItem.addMenuItem(new NobucaMenuItemSeparatorModel());
        windowMenuItem.addMenuItem(new NobucaMenuItemModel("windowSaveScreenshot", "Save <u>S</u>creenshot"));
        windowMenuItem.addMenuItem(new NobucaMenuItemModel("windowSaveScreenshotEditor", "Save Screenshot (<u>E</u>ditor)"));
        windowMenuItem.addMenuItem(new NobucaMenuItemSeparatorModel());
        var windowtoggleSystemConsoleMenuItem = windowMenuItem.addMenuItem(new NobucaMenuItemModel("windowToggleSystemConsole", "Toggle System <u>C</u>console"));
        windowtoggleSystemConsoleMenuItem.setIconImageSrc("./user-interface/icons/icon-window-toggle-system-console.svg");
        this.getMenubar().addMenuItem(new NobucaMenuItemModel("help", "Help"));
    }

    getMenubar() {
        return this.menubar;
    }

    createWorkspaces() {
        this.workspaces = new NobucaTabsHeaderModel();
        this.listenWorkspaceChangeRequest();
    }

    getWorkspaces() {
        return this.workspaces;
    }

    listenWorkspaceChangeRequest() {
        this.getWorkspaces().getActiveTabChangedEventEmitter().subscribe((workspaceTab) => {
            this.getWorkspaceChangeRequestedEventEmitter().emit(workspaceTab.getId());
        })
    }

    addWorkspace(workspace) {
        this.getWorkspaces().addTab(new NobucaTabHeaderModel(workspace.getId(), workspace.getTitle()));
    }

    activateWorkspace(workspaceId) {
        this.getWorkspaces().activateTab(workspaceId);
    }

    createScenesAndLayers() {
        this.scenesAndLayers = new NobucaPanelModel();
        this.getScenesAndLayers().addChild(new BlenderDataBlockMenuModel("scene"));
        this.getScenesAndLayers().addChild(new BlenderDataBlockMenuModel("viewLayer"))
    }

    getScenesAndLayers() {
        return this.scenesAndLayers;
    }
}