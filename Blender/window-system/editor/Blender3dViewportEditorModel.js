import BlenderEditorModel from "./BlenderEditorModel.js";
import NobucaMenubarModel from "../../../../nobuca-core/menubar/NobucaMenubarModel.js";
import NobucaMenuItemModel from "../../../../nobuca-core/menu-item/NobucaMenuItemModel.js";
import BlenderControlButtonDropDownModel from "../control/button-drop-down/BlenderControlButtonDropDownModel.js"
import BlenderControlButtonToggleItemModel from "../control/button-toggle/BlenderControlButtonToggleItemModel.js";
import BlenderControlButtonToggleModel from "../control/button-toggle/BlenderControlButtonToggleModel.js";

export default class Blender3dViewportEditorModel extends BlenderEditorModel {

    createRegionHeaderControls() {
        this.createRegionHeaderEditorSelector();
        this.createRegionHeaderModeSelector();
        this.createRegionHeaderMenubar();
        this.createRegionHeaderOrientationSelector();
        this.createRegionHeaderPivotSelector();
        this.createRegionHeaderSnappingSelector();
        this.createRegionHeaderProportionalEditingSelector();
        this.createRegionHeaderVisibilitySelector();
        this.createRegionHeaderGizmosSelector();
        this.createRegionHeaderOverlaysSelector();
        this.createRegionHeaderXRayToggle();
        this.createRegionHeaderShaddingSelector();
    }

    createRegionHeaderEditorSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./window-system/icons/menu-item-icon-editor-3dviewport.svg");
        this.getRegionHeader().getLeftSide().addChild(control);
    }

    createRegionHeaderModeSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./window-system/icons/menu-item-icon-mode-object.svg");
        control.setTitle("Object Mode")
        this.getRegionHeader().getLeftSide().addChild(control);
    }

    createRegionHeaderMenubar() {
        var menubar = new NobucaMenubarModel();
        menubar.addMenuItem(new NobucaMenuItemModel("view", "View"));
        menubar.addMenuItem(new NobucaMenuItemModel("select", "Select"));
        menubar.addMenuItem(new NobucaMenuItemModel("add", "Add"));
        menubar.addMenuItem(new NobucaMenuItemModel("object", "Object"));
        this.getRegionHeader().getLeftSide().addChild(menubar);
    }

    createRegionHeaderOrientationSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./window-system/icons/menu-item-icon-orientation-global.svg");
        control.setTitle("Global");
        this.getRegionHeader().getCenterSide().addChild(control);
    }

    createRegionHeaderPivotSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./window-system/icons/menu-item-icon-transform-median-point.svg");
        this.getRegionHeader().getCenterSide().addChild(control);
    }

    createRegionHeaderSnappingSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setEnabledDisabledBehaviour(true);
        control.setEnabledImageSrc("./window-system/icons/menu-item-icon-snapping-enabled.svg");
        control.setDisabledImageSrc("./window-system/icons/menu-item-icon-snapping-disabled.svg");
        control.setImageSrc("./window-system/icons/menu-item-icon-snapping-increment.svg");
        this.getRegionHeader().getCenterSide().addChild(control);
    }

    createRegionHeaderProportionalEditingSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setEnabledDisabledBehaviour(true);
        control.setEnabledImageSrc("./window-system/icons/menu-item-icon-proportional-editing-enabled.svg");
        control.setDisabledImageSrc("./window-system/icons/menu-item-icon-proportional-editing-disabled.svg");
        control.setImageSrc("./window-system/icons/menu-item-icon-proportional-editing-sphere.svg");
        this.getRegionHeader().getCenterSide().addChild(control);
    }

    createRegionHeaderVisibilitySelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./window-system/icons/menu-item-icon-visibility-all.svg");
        this.getRegionHeader().getRightSide().addChild(control);
    }

    createRegionHeaderGizmosSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setEnabledDisabledBehaviour(true);
        control.setEnabled(true);
        control.setPreventDropDownWhenDisabled(true);
        control.setEnabledImageSrc("./window-system/icons/menu-item-icon-gizmos.svg");
        control.setDisabledImageSrc("./window-system/icons/menu-item-icon-gizmos.svg");
        this.getRegionHeader().getRightSide().addChild(control);
    }

    createRegionHeaderOverlaysSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setEnabledDisabledBehaviour(true);
        control.setEnabled(true);
        control.setPreventDropDownWhenDisabled(true);
        control.setEnabledImageSrc("./window-system/icons/menu-item-icon-overlays.svg");
        control.setDisabledImageSrc("./window-system/icons/menu-item-icon-overlays.svg");
        this.getRegionHeader().getRightSide().addChild(control);
    }

    createRegionHeaderXRayToggle() {
        var toggle = new BlenderControlButtonToggleModel();
        var toogleItem = new BlenderControlButtonToggleItemModel();
        toogleItem.setImageSrc("./window-system/icons/menu-item-icon-x-ray.svg");
        toggle.addItem(toogleItem);
        this.getRegionHeader().getRightSide().addChild(toggle);
    }

    createRegionHeaderShaddingSelector() {
        var toggle = new BlenderControlButtonToggleModel();
        
        var toogleItemWireframe = new BlenderControlButtonToggleItemModel();
        toogleItemWireframe.setImageSrc("./window-system/icons/menu-item-icon-shading-wireframe.svg");
        toggle.addItem(toogleItemWireframe);
        
        var toogleItemSolid = new BlenderControlButtonToggleItemModel();
        toogleItemSolid.setImageSrc("./window-system/icons/menu-item-icon-shading-solid.svg");
        toogleItemSolid.setToggled(true);
        toggle.addItem(toogleItemSolid);
        
        var toogleItemMaterial = new BlenderControlButtonToggleItemModel();
        toogleItemMaterial.setImageSrc("./window-system/icons/menu-item-icon-shading-material.svg");
        toggle.addItem(toogleItemMaterial);
        
        var toogleItemRender = new BlenderControlButtonToggleItemModel();
        toogleItemRender.setImageSrc("./window-system/icons/menu-item-icon-shading-render.svg");
        toggle.addItem(toogleItemRender);

        toggle.setDropDown(true);

        this.getRegionHeader().getRightSide().addChild(toggle);
    }
}