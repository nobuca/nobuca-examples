import NobucaComponentView from "../../../../../nobuca-core/component/NobucaComponentView.js";


export default class BlenderControlPropertiesView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderControlProperties";
        this.setNativeElement(div);
        this.createTabHandles();
        this.createTabBodies();
        this.createTabs();
        this.updateView();
    }

    createTabHandles() {
        this.divTabHandles = document.createElement("div");
        this.divTabHandles.className = "BlenderControlPropertiesTabHandles";
        this.getNativeElement().appendChild(this.divTabHandles);
    }

    getDivTabHandles() {
        return this.divTabHandles;
    }

    createTabBodies() {
        this.divTabBodies = document.createElement("div");
        this.divTabBodies.className = "BlenderControlPropertiesTabBodies";
        this.getNativeElement().appendChild(this.divTabBodies);
    }

    getDivTabBodies() {
        return this.divTabBodies;
    }

    createTabs() {
        this.getModel().getTabs().forEach(tabModel => this.createTab(tabModel));
    }

    createTab(tabModel) {
        var divTabHandle = document.createElement("div");
        divTabHandle.className = "BlenderControlPropertiesTabHandle";
        this.getDivTabHandles().appendChild(divTabHandle);

        var imgTabHandle = document.createElement("img");
        imgTabHandle.className = "BlenderControlPropertiesTabHandleImg";
        imgTabHandle.src = tabModel.getIconSrc()
        divTabHandle.appendChild(imgTabHandle);

        tabModel.divTabHandle = divTabHandle;

        divTabHandle.addEventListener("click", () => {
            this.activateTab(tabModel);
            this.updateView();
        })

        var divTabBody = document.createElement("div");
        divTabBody.className = "BlenderControlPropertiesTabBody";
        divTabBody.style.display = "none";
        this.getDivTabBodies().appendChild(divTabBody);

        var tabBodyView = this.createNewViewForModel(tabModel);
        divTabBody.appendChild(tabBodyView.getNativeElement());

        tabModel.divTabBody = divTabBody;
    }

    activateTab(tabModel) {
        if (tabModel.getActive()) return;
        this.getModel().getTabs().forEach(tabModel => tabModel.setActive(false));
        tabModel.setActive(true);
        this.updateView();
    }

    updateView() {
        this.getModel().getTabs().forEach(tabModel => {
            if (tabModel.getActive()) {
                tabModel.divTabHandle.classList.add("active");
                tabModel.divTabBody.style.display = "";
            } else {
                tabModel.divTabHandle.classList.remove("active");
                tabModel.divTabBody.style.display = "none";
            }
        });
    }

    updateContentsPositionAndSize() {
        this.getDivTabHandles().style.height = this.getNativeElement().offsetHeight + "px";
        //this.getDivTabBodies().style.height = this.getNativeElement().offsetHeight + "px";
    }

}