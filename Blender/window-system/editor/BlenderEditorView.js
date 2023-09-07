import NobucaComponentView from "../../../../nobuca-core/component/NobucaComponentView.js";

export default class BlenderEditorView extends NobucaComponentView {

    getClassName() {
        return "BlenderEditor";
    }

    createNativeElement() {
        var div = document.createElement("div");
        div.className = this.getClassName();
        this.setNativeElement(div);
        this.createRegions();
    }

    createRegions() {
        this.createRegionMain();
        this.createRegionsOtherThanMain();
    }


    createRegionMain() {
        this.divRegionMain = document.createElement("div");
        this.divRegionMain.className = "BlenderEditorRegionMain";
        this.getNativeElement().appendChild(this.divRegionMain);
    }

    getDivRegionMain() {
        return this.divRegionMain;
    }

    createRegionsOtherThanMain() {
        this.divRegionsOtherThanMain = document.createElement("div");
        this.divRegionsOtherThanMain.className = "BlenderEditorRegionsOtherThanMain";
        this.getNativeElement().appendChild(this.divRegionsOtherThanMain);
        this.createRegionHeader();
        this.createRegionToolSettings();
        this.createRegionToolbar();
        this.createRegionSidebar();
        this.createRegionAdjustLastOperation();
    }

    getDivRegionsOtherThanMain() {
        return this.divRegionsOtherThanMain;
    }

    createRegionHeader() {
        this.divRegionHeader = document.createElement("div");
        this.divRegionHeader.className = "BlenderEditorRegionHeader";
        this.getDivRegionsOtherThanMain().appendChild(this.divRegionHeader);

        this.regionHeaderView = this.createNewViewForModel(this.getModel().getRegionHeader());
        this.divRegionHeader.appendChild(this.regionHeaderView.getNativeElement());
    }

    getDivRegionHeader() {
        return this.divRegionHeader;
    }

    createRegionToolbar() {
        this.divRegionToolbar = document.createElement("div");
        this.divRegionToolbar.className = "BlenderEditorRegionToolbar";
        this.getDivRegionsOtherThanMain().appendChild(this.divRegionToolbar);
    }

    getDivRegionToolbar() {
        return this.divRegionToolbar;
    }

    createRegionToolSettings() {
        this.divRegionToolSettings = document.createElement("div");
        this.divRegionToolSettings.className = "BlenderEditorRegionToolSettings";
        this.getDivRegionsOtherThanMain().appendChild(this.divRegionToolSettings);
    }

    getDivRegionToolSettings() {
        return this.divRegionToolSettings;
    }

    createRegionSidebar() {
        this.divRegionSidebar = document.createElement("div");
        this.divRegionSidebar.className = "BlenderEditorRegionSidebar";
        this.getDivRegionsOtherThanMain().appendChild(this.divRegionSidebar);
    }

    getDivRegionSidebar() {
        return this.divRegionSidebar;
    }

    createRegionAdjustLastOperation() {
        this.divRegsionAdjustLastOperation = document.createElement("div");
        this.divRegsionAdjustLastOperation.className = "BlenderEditorRegionAdjustLastOperation";
        this.getDivRegionsOtherThanMain().appendChild(this.divRegsionAdjustLastOperation);
    }

    getDivRegionAdjustLastOperation() {
        return this.divRegsionAdjustLastOperation;
    }

    updateContentsPositionAndSize() {
        var parent = this.getNativeElement().parentNode;
        var margin = 4;
        var editorHeight = parent.offsetHeight - margin*2;
        var editorWidth = parent.offsetWidth - margin*2;
        this.getNativeElement().style.top = margin + "px";
        this.getNativeElement().style.left = margin + "px";
        this.getNativeElement().style.height = editorHeight + "px";
        this.getNativeElement().style.width = editorWidth + "px";
        this.getDivRegionMain().style.height = editorHeight + "px";
        this.getDivRegionMain().style.width = editorWidth + "px";
        this.getDivRegionsOtherThanMain().style.height = editorHeight + "px";
        this.getDivRegionsOtherThanMain().style.width = editorWidth + "px";
        
        this.getDivRegionHeader().style.left = margin;
        this.getDivRegionHeader().style.width = editorWidth + "px";

        var toolSettingsTop = this.getDivRegionHeader().offsetTop;
        toolSettingsTop += this.getDivRegionHeader().offsetHeight;
        toolSettingsTop += margin;

        this.getDivRegionToolSettings().style.top = toolSettingsTop + "px"; 
        this.getDivRegionToolSettings().style.width = editorWidth + "px";
        this.getDivRegionToolbar().style.top = (this.getDivRegionToolSettings().offsetTop + this.getDivRegionToolSettings().offsetHeight) + "px"; 
        
        var toolbarTop = this.getDivRegionToolSettings().offsetTop;
        toolbarTop += this.getDivRegionToolSettings().offsetHeight;
        toolbarTop += margin;
        var toolbarHeight = editorHeight;
        toolbarHeight -= this.getDivRegionHeader().offsetHeight;
        toolbarHeight -= this.getDivRegionToolSettings().offsetHeight;
        toolbarHeight -= this.getDivRegionAdjustLastOperation().offsetHeight;
        toolbarHeight -= margin * 3;

        this.getDivRegionToolbar().style.top = toolbarTop + "px"; 
        this.getDivRegionToolbar().style.left = margin + "px"; 
        this.getDivRegionToolbar().style.height = toolbarHeight + "px"; 

        var adjutLastOperationTop = editorHeight;
        adjutLastOperationTop -= margin;
        adjutLastOperationTop -= this.getDivRegionAdjustLastOperation().offsetHeight;

        var adjutLastOperationLeft = this.getDivRegionToolbar().offsetLeft;
        adjutLastOperationLeft += this.getDivRegionToolbar().offsetWidth;

        this.getDivRegionAdjustLastOperation().style.top = adjutLastOperationTop + "px"; 
        this.getDivRegionAdjustLastOperation().style.left = adjutLastOperationLeft + "px"; 

        var sidebarTop = this.getDivRegionToolbar().offsetTop;
        var sidebarHeight = editorHeight;
        sidebarHeight -= this.getDivRegionHeader().offsetHeight;
        sidebarHeight -= this.getDivRegionToolSettings().offsetHeight;
        sidebarHeight -= margin*2;

        this.getDivRegionSidebar().style.top = sidebarTop + "px";
        this.getDivRegionSidebar().style.right = margin + "px";
        this.getDivRegionSidebar().style.height = sidebarHeight + "px";
    }
}