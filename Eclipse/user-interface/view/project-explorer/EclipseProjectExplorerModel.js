import NobucaButtonbarItemModel from "../../../../../nobuca-core/buttonbar/NobucaButtonbarItemModel.js";
import NobucaTreeModel from "../../../../../nobuca-core/tree/NobucaTreeModel.js";
import NobucaTreeNodeIconModel from "../../../../../nobuca-core/tree/NobucaTreeNodeIconModel.js";
import NobucaTreeNodeModel from "../../../../../nobuca-core/tree/NobucaTreeNodeModel.js";
import NobucaTreeNodeTextModel from "../../../../../nobuca-core/tree/NobucaTreeNodeTextModel.js";
import EclipseWorkspace from "../../../buiness-logic/EclipseWorkspace.js";
import EclipseWindowPartViewModel from "../../window/EclipseWindowPartViewModel.js";

export default class EclipseProjectExplorerModel extends EclipseWindowPartViewModel {

    constructor() {
        super();
        this.setTitle("Project Explorer");
        this.setCloseable("true");
        this.setImageSrc("./user-interface/icons/filenav_nav.svg");
        this.createTree();
        this.listenWorkspace();
    }

    customizeButtonbar() {
        this.getButtonbar().addItem(new NobucaButtonbarItemModel("./user-interface/icons/e_collapseall.svg"));
        this.getButtonbar().addItem(new NobucaButtonbarItemModel("./user-interface/icons/e_auto_synch_toc.svg"));
        this.getButtonbar().addItem(new NobucaButtonbarItemModel("./user-interface/icons/filter_ps.svg"));
    }

    createTree() {
        this.tree = new NobucaTreeModel();
        EclipseWorkspace.getCurrentWorkspace().getProjects().forEach(project => {
            this.addNodeProject(project);
        });
    }

    getTree() {
        return this.tree;
    }

    getContent() {
        return this.getTree();
    }

    listenWorkspace() {
        EclipseWorkspace.getCurrentWorkspace().getProjectAddedEventEmitter().subscribe(project => {
            this.addNodeProject(project);
        });
    }

    addNodeProject(project) {
        var nodeProject = this.getTree().addNode(new NobucaTreeNodeModel());
        nodeProject.addLeftSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/prj_obj.svg"));
        nodeProject.addLeftSideComponent(new NobucaTreeNodeTextModel(project.getName()));
        nodeProject.setData(project);
        project.getEntries().forEach(entry => {
            this.createChildEntryNodeUnderParentEntryNode(nodeProject, entry);
        });
        project.getEntryAddedEventEmitter().subscribe(entry => {
            this.createChildEntryNodeUnderParentEntryNode(nodeProject, entry);
        });
    }

    createChildEntryNodeUnderParentEntryNode(parentNode, entry) {
        var nodeEntry = parentNode.addNode(new NobucaTreeNodeModel());
        nodeEntry.setData(entry);
        if (entry.isFile()) {
            nodeEntry.addLeftSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/file_obj.svg"));
        }
        if (entry.isDirectory()) {
            nodeEntry.addLeftSideComponent(new NobucaTreeNodeIconModel("./user-interface/icons/fldr_obj.svg"));
        }
        nodeEntry.addLeftSideComponent(new NobucaTreeNodeTextModel(entry.getName()));
        entry.getEntries().forEach(childEntry => {
            this.createChildEntryNodeUnderParentEntryNode(nodeEntry, childEntry);
        });
    }
}