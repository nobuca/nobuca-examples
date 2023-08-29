import NobucaPanelModel from "../../nobuca-core/panel/NobucaPanelModel.js";
import NobucaMenubarModel from "../../nobuca-core/menubar/NobucaMenubarModel.js";
import NobucaMenuItemModel from "../../nobuca-core/menu-item/NobucaMenuItemModel.js";
import NobucaMenuItemSeparatorModel from "../../nobuca-core/menu-item/NobucaMenuItemSeparatorModel.js";
import NobucaTabsHeaderModel from "../../nobuca-core/tabs/NobucaTabsHeaderModel.js";
import NobucaTabModel from "../../nobuca-core/tabs/NobucaTabModel.js";

export default class BlenderTopBarPanelModel extends NobucaPanelModel {

    constructor() {
        super();
        this.setId("topBarPanel");
        this.createMenus();
        this.createWorkspaces();
        this.createScenesAndLayers();
    }

    createMenus() {
        this.menubar = new NobucaMenubarModel();
        this.addChild(this.menubar);
        var blenderMenuItem = this.menubar.addMenuItem(new NobucaMenuItemModel("blender"));
        blenderMenuItem.setIconImageSrc("./svg/menu-item-icon-blender.svg");
        blenderMenuItem.addMenuItem(new NobucaMenuItemModel("splashScreen", "Splash Screen"));
        blenderMenuItem.addMenuItem(new NobucaMenuItemModel("aboutBlender", "About Blender"));
        var fileMenuItem = this.menubar.addMenuItem(new NobucaMenuItemModel("file", "File"));
        var fileNewMenuItem = fileMenuItem.addMenuItem(new NobucaMenuItemModel("new", "New"));
        fileNewMenuItem.setIconImageSrc("./svg/menu-item-icon-file-new.svg");
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("open", "Open"));
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("openRecent", "Open Recent"));
        var recoverMenuItem = fileMenuItem.addMenuItem(new NobucaMenuItemModel("recover", "Recover"));
        recoverMenuItem.addMenuItem(new NobucaMenuItemModel("lastSession", "Last Session"));
        recoverMenuItem.addMenuItem(new NobucaMenuItemModel("autoSave", "Auto Save"));
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
        this.menubar.addMenuItem(new NobucaMenuItemModel("edit", "Edit"));
        this.menubar.addMenuItem(new NobucaMenuItemModel("render", "Render"));
        this.menubar.addMenuItem(new NobucaMenuItemModel("window", "Window"));
        this.menubar.addMenuItem(new NobucaMenuItemModel("help", "Help"));
    }
    
    createWorkspaces() {
        this.workspacesTabsHeaderModel = this.addChild(new NobucaTabsHeaderModel());
        this.workspacesTabsHeaderModel.addTab(new NobucaTabModel("layout", "Layout"));
        this.workspacesTabsHeaderModel.addTab(new NobucaTabModel("modeling", "Modeling"));
        this.workspacesTabsHeaderModel.addTab(new NobucaTabModel("sculpting", "Sculpting"));
        this.workspacesTabsHeaderModel.addTab(new NobucaTabModel("uvEditing", "UV Editing"));
        this.workspacesTabsHeaderModel.addTab(new NobucaTabModel("texturePainting", "Texture Painting"));
        this.workspacesTabsHeaderModel.addTab(new NobucaTabModel("shading", "Shading"));
        this.workspacesTabsHeaderModel.addTab(new NobucaTabModel("animation", "Animation"));
        this.workspacesTabsHeaderModel.addTab(new NobucaTabModel("rendering", "Rendering"));
        this.workspacesTabsHeaderModel.addTab(new NobucaTabModel("compositing", "Compositing"));
        this.workspacesTabsHeaderModel.addTab(new NobucaTabModel("geometryNodes", "Geometry Nodes"));
        this.workspacesTabsHeaderModel.addTab(new NobucaTabModel("scripting", "Scripting"));
        this.workspacesTabsHeaderModel.addTab(new NobucaTabModel("addWorkspace", "+"));
    }

    createScenesAndLayers() {

    }
}
