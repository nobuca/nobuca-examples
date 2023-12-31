import NobucaAppModel from "../../nobuca-core/app/NobucaAppModel.js";
import NobucaButtonbarItemModel from "../../nobuca-core/buttonbar/NobucaButtonbarItemModel.js";
import NobucaButtonbarModel from "../../nobuca-core/buttonbar/NobucaButtonbarModel.js";
import NobucaDialogModel from "../../nobuca-core/dialog/NobucaDialogModel.js";
import NobucaMenuItemModel from "../../nobuca-core/menu/NobucaMenuItemModel.js";
import NobucaMenuItemSeparatorModel from "../../nobuca-core/menu/NobucaMenuItemSeparatorModel.js";
import NobucaMenubarModel from "../../nobuca-core/menubar/NobucaMenubarModel.js";
import NobucaPanelModel from "../../nobuca-core/panel/NobucaPanelModel.js";
import EclipseWorkspace from "./buiness-logic/EclipseWorkspace.js";
import EclipseDialogSelectWorkspaceModel from "./user-interface/dialog/select-workspace/EclipseDialogSelectWorkspaceModel.js";
import EclipseOutlineModel from "./user-interface/view/outline/EclipseOutlineModel.js";
import EclipseProjectExplorerModel from "./user-interface/view/project-explorer/EclipseProjectExplorerModel.js";
import EclipseTextEditorModel from "./user-interface/view/text-editor/EclipseTextEditorModel.js";
import EclipsePartContainerSashLeftRightModel from "./user-interface/window/EclipsePartContainerSashLeftRightModel.js";
import EclipsePartContainerSashTopBottomModel from "./user-interface/window/EclipsePartContainerSashTopBottomModel.js";
import EclipseWindowModel from "./user-interface/window/EclipseWindowModel.js";
import EclipseWindowPartContainerStackModel from "./user-interface/window/EclipseWindowPartContainerStackModel.js";
import EclipseWindowPartViewModel from "./user-interface/window/EclipseWindowPartViewModel.js";

export default class EclipseAppModel extends NobucaAppModel {

    constructor() {
        super();
        this.setTitle("Eclipse");
        this.configureDefaultDialogIcon();
        this.getLayout().setDirectionColumn();
        this.createMenubar();
        this.createButtonbarContainer();
        this.createWindow();
        this.showDialogSelectWorkspace();
    }

    getClassName() {
        return "EclipseAppModel";
    }

    configureDefaultDialogIcon() {
        NobucaDialogModel.setDefaultIconSrc("./user-interface/icons/eclipse-icon.svg");
    }

    createMenubar() {
        this.menubar = new NobucaMenubarModel();
        var fileMenuItem = this.getMenubar().addMenuItem(new NobucaMenuItemModel("file", "File"));
        var fileNewMenuItem = fileMenuItem.addMenuItem(new NobucaMenuItemModel("fileNew", "New", "Alt+Shift+N"));
        fileNewMenuItem.addMenuItem(new NobucaMenuItemModel("fileNewProject", "Project"));
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("fileOpenFile", "Open File..."));
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("fileOpenProjectFromFilesystem", "Open Project from Filesystem..."));
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("fileOpenRecentFiles", "Recent Files"));
        fileMenuItem.addMenuItem(new NobucaMenuItemSeparatorModel());
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("fileCloseEditor", "Close Editor"));
        fileMenuItem.addMenuItem(new NobucaMenuItemModel("fileOpenRecentFiles", "Close All Editors"));
        fileMenuItem.addMenuItem(new NobucaMenuItemSeparatorModel());
        var fileSwitchWorkspace = fileMenuItem.addMenuItem(new NobucaMenuItemModel("fileSwitchWorkspace", "Switch Workspace..."));
        this.getMenubar().addMenuItem(new NobucaMenuItemModel("Edit", "Edit"));
        this.getMenubar().addMenuItem(new NobucaMenuItemModel("source", "Source"));
        this.getMenubar().addMenuItem(new NobucaMenuItemModel("refactor", "Refactor"));
        this.getMenubar().addMenuItem(new NobucaMenuItemModel("navigate", "Navigate"));
        this.getMenubar().addMenuItem(new NobucaMenuItemModel("search", "Search"));
        this.getMenubar().addMenuItem(new NobucaMenuItemModel("project", "Project"));
        this.getMenubar().addMenuItem(new NobucaMenuItemModel("Run", "Run"));
        this.getMenubar().addMenuItem(new NobucaMenuItemModel("Window", "Window"));
        this.getMenubar().addMenuItem(new NobucaMenuItemModel("help", "Help"));
        this.getMenubar().getMenuItemClickedEventEmitter().subscribe(menuItem => {
            if (menuItem.getId() == "fileSwitchWorkspace") {
                this.showDialogSelectWorkspace();
            }
        });
    }

    getMenubar() {
        return this.menubar;
    }

    createButtonbarContainer() {
        this.buttonbarContainer = new NobucaPanelModel();
        var buttonbarFile = this.buttonbarContainer.addChild(new NobucaButtonbarModel());
        buttonbarFile.setMoveable(true);
        buttonbarFile.addItem(new NobucaButtonbarItemModel("./user-interface/icons/new_wiz.svg"));
        buttonbarFile.addItem(new NobucaButtonbarItemModel("./user-interface/icons/save_edit.svg"));
        buttonbarFile.addItem(new NobucaButtonbarItemModel("./user-interface/icons/saveall_edit.svg"));
        var buttonbarSearch = this.buttonbarContainer.addChild(new NobucaButtonbarModel());
        buttonbarSearch.setMoveable(true);
        buttonbarSearch.addItem(new NobucaButtonbarItemModel("./user-interface/icons/search.svg"));
    }

    getButtonbarContainer() {
        return this.buttonbarContainer;
    }

    createWindow() {
        this.window = new EclipseWindowModel();

        var left = new EclipseWindowPartContainerStackModel();
        left.addPart(new EclipseProjectExplorerModel());

        var rightLeftTop = new EclipseWindowPartContainerStackModel();
        rightLeftTop.addPart((new EclipseTextEditorModel()).setTitle("Top 1"));
        rightLeftTop.addPart((new EclipseWindowPartViewModel()).setTitle("Top 2"));
        rightLeftTop.addPart((new EclipseWindowPartViewModel()).setTitle("Top 3"));
        rightLeftTop.addPart((new EclipseWindowPartViewModel()).setTitle("Top 4"));

        var rightLeftBottom = new EclipseWindowPartContainerStackModel();
        rightLeftBottom.addPart((new EclipseTextEditorModel()).setTitle("Bottom 1"));
        rightLeftBottom.addPart((new EclipseWindowPartViewModel()).setTitle("Bottom 2"));
        rightLeftBottom.addPart((new EclipseWindowPartViewModel()).setTitle("Bottom 3"));
        rightLeftBottom.addPart((new EclipseWindowPartViewModel()).setTitle("Bottom 4"));

        var rightLeft = new EclipsePartContainerSashTopBottomModel(rightLeftTop, rightLeftBottom, .7);

        var rightRight = new EclipseWindowPartContainerStackModel();
        rightRight.addPart(new EclipseOutlineModel());

        var right = new EclipsePartContainerSashLeftRightModel(rightLeft, rightRight, .7);

        this.getWindow().setPartContainer(new EclipsePartContainerSashLeftRightModel(left, right, .3));
    }

    getWindow() {
        return this.window;
    }

    showDialogSelectWorkspace() {
        new EclipseDialogSelectWorkspaceModel();
    }
}