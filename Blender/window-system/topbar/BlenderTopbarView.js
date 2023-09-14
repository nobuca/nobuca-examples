import NobucaPanelView from "../../../../nobuca-core/panel/NobucaPanelView.js";

export default class BlenderTopbarView extends NobucaPanelView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderTopbar";
        this.setNativeElement(div);
        this.createMenusAndWorkspaces();
        this.createScenesAndLayers();
    }

    createMenusAndWorkspaces() {
        this.divMenusAndWorkspaces = document.createElement("div");
        this.divMenusAndWorkspaces.className = "BlenderTopbarMenusAndWorkspaces";
        this.getNativeElement().appendChild(this.divMenusAndWorkspaces);

        var menubarView = this.createNewViewForModel(this.getModel().getMenubar())
        this.getDivMenusAndWorkspaces().appendChild(menubarView.getNativeElement());

        var workspacesView = this.createNewViewForModel(this.getModel().getWorkspaces())
        this.getDivMenusAndWorkspaces().appendChild(workspacesView.getNativeElement());

        this.divMenusAndWorkspaces.addEventListener("wheel", (event) => {
            this.divMenusAndWorkspaces.scrollLeft += event.deltaY;
        });
    }

    getDivMenusAndWorkspaces() {
        return this.divMenusAndWorkspaces;
    }

    createScenesAndLayers() {
        this.divScenesAndLayers = document.createElement("div");
        this.divScenesAndLayers.className = "BlenderTopbarScenesAndLayers";
        this.getNativeElement().appendChild(this.divScenesAndLayers);

        var scenesAndLayersView = this.createNewViewForModel(this.getModel().getScenesAndLayers())
        this.getDivScenesAndLayers().appendChild(scenesAndLayersView.getNativeElement());
    }

    getDivScenesAndLayers() {
        return this.divScenesAndLayers;
    }

    updateContentsPositionAndSize() {
        var newWMenusAndWorkspacesWidth = this.getNativeElement().offsetWidth;
        newWMenusAndWorkspacesWidth -= this.getDivScenesAndLayers().offsetWidth;
        this.getDivMenusAndWorkspaces().style.width = newWMenusAndWorkspacesWidth + "px";
    }
}