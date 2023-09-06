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
        var parentHeight = parent.offsetHeight;
        var parentWidth = parent.offsetWidth;
        this.getNativeElement().style.height = parentHeight + "px";
        this.getNativeElement().style.width = parentWidth + "px";
        this.getDivRegionMain().style.height = parentHeight + "px";
        this.getDivRegionMain().style.width = parentWidth + "px";
        this.getDivRegionsOtherThanMain().style.height = parentHeight + "px";
        this.getDivRegionsOtherThanMain().style.width = parentWidth + "px";
        this.getDivRegionHeader().style.width = parentWidth + "px";
        this.getDivRegionToolSettings().style.top = (this.getDivRegionHeader().offsetTop + this.getDivRegionHeader().offsetHeight) + "px"; 
        this.getDivRegionToolSettings().style.width = parentWidth + "px";
        this.getDivRegionToolbar().style.top = (this.getDivRegionToolSettings().offsetTop + this.getDivRegionToolSettings().offsetHeight) + "px"; 
        
        var toolbarTop = parentHeight;
        toolbarTop -= this.getDivRegionHeader().offsetHeight;
        toolbarTop -= this.getDivRegionToolSettings().offsetHeight;
        toolbarTop -= this.getDivRegionAdjustLastOperation().offsetHeight;

        
        this.getDivRegionToolbar().style.height = toolbarTop + "px"; 

        var adjutLastOperationLeft = this.getDivRegionToolbar().offsetLeft;
        adjutLastOperationLeft += this.getDivRegionToolbar().offsetWidth;

        console.log("adjutLastOperationLeft", adjutLastOperationLeft);

        this.getDivRegionAdjustLastOperation().style.left = adjutLastOperationLeft + "px"; 

        var sidebarHeight = parentHeight;
        sidebarHeight -= this.getDivRegionHeader().offsetHeight;
        sidebarHeight -= this.getDivRegionToolSettings().offsetHeight;

        this.getDivRegionSidebar().style.top = this.getDivRegionToolbar().offsetTop + "px";
        this.getDivRegionSidebar().style.height = sidebarHeight + "px";
    }
}