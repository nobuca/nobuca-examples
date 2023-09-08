import BlenderEditorModel from "./BlenderEditorModel.js";
import NobucaMenubarModel from "../../../../nobuca-core/menubar/NobucaMenubarModel.js";
import NobucaMenuItemModel from "../../../../nobuca-core/menu/NobucaMenuItemModel.js";
import BlenderControlButtonDropDownModel from "../control/button-drop-down/BlenderControlButtonDropDownModel.js"
import BlenderControlButtonToggleItemModel from "../control/button-toggle/BlenderControlButtonToggleItemModel.js";
import BlenderControlButtonToggleModel from "../control/button-toggle/BlenderControlButtonToggleModel.js";
import BlenderControlToolbarModel from "../control/toolbar/BlenderControlToolbarModel.js";

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

    createRegionToolSettingsControls() {
        this.createRegionToolSettingsSelectionModeSelector();
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

    createRegionToolSettingsSelectionModeSelector() {
        var toggle = new BlenderControlButtonToggleModel();

        var toogleItemNew = new BlenderControlButtonToggleItemModel();
        toogleItemNew.setImageSrc("./window-system/icons/menu-item-icon-selection-mode-new.svg");
        toogleItemNew.setToggled(true);
        toggle.addItem(toogleItemNew);

        var toogleItemExtend = new BlenderControlButtonToggleItemModel();
        toogleItemExtend.setImageSrc("./window-system/icons/menu-item-icon-selection-mode-extend.svg");
        toggle.addItem(toogleItemExtend);

        var toogleItemSubtract = new BlenderControlButtonToggleItemModel();
        toogleItemSubtract.setImageSrc("./window-system/icons/menu-item-icon-selection-mode-subtract.svg");
        toggle.addItem(toogleItemSubtract);

        var toogleItemIntersect = new BlenderControlButtonToggleItemModel();
        toogleItemIntersect.setImageSrc("./window-system/icons/menu-item-icon-selection-mode-invert.svg");
        toggle.addItem(toogleItemIntersect);

        var toogleItemIntersect = new BlenderControlButtonToggleItemModel();
        toogleItemIntersect.setImageSrc("./window-system/icons/menu-item-icon-selection-mode-intersect.svg");
        toggle.addItem(toogleItemIntersect);

        this.getRegionToolSettings().addChild(toggle);
    }
   
    createRegionToolbarControls() {
        this.createRegionToolbarSelectAndCursor();
        this.createRegionToolbarTransform();
        this.createRegionToolbarAnnotateAndMeasure();
        this.createRegionToolbarAddMesh();
    }

    createRegionToolbarSelectAndCursor() {
        var toolbar = new BlenderControlToolbarModel();
        this.getRegionToolbar().addChild(toolbar);

        var menuItemSelect = toolbar.addMenuItem(new NobucaMenuItemModel("select"));
        menuItemSelect.setIconImageSrc("./window-system/icons/toolbar-icon-select.png");
        
        var menuItemCursor = toolbar.addMenuItem(new NobucaMenuItemModel("cursor"));
        menuItemCursor.setIconImageSrc("./window-system/icons/toolbar-icon-cursor.png");
    }

    createRegionToolbarTransform() {
        var toolbar = new BlenderControlToolbarModel();
        this.getRegionToolbar().addChild(toolbar);

        var menuItemMove = toolbar.addMenuItem(new NobucaMenuItemModel("select"));
        menuItemMove.setIconImageSrc("./window-system/icons/toolbar-icon-move.png");
        
        var menuItemRotate = toolbar.addMenuItem(new NobucaMenuItemModel("cursor"));
        menuItemRotate.setIconImageSrc("./window-system/icons/toolbar-icon-rotate.png");
                
        var menuItemScale = toolbar.addMenuItem(new NobucaMenuItemModel("cursor"));
        menuItemScale.setIconImageSrc("./window-system/icons/toolbar-icon-scale.png");
                
        var menuItemTransform = toolbar.addMenuItem(new NobucaMenuItemModel("cursor"));
        menuItemTransform.setIconImageSrc("./window-system/icons/toolbar-icon-transform.png");
    }
 
    createRegionToolbarAnnotateAndMeasure() {
        var toolbar = new BlenderControlToolbarModel();
        this.getRegionToolbar().addChild(toolbar);

        var menuItemAnnotate = toolbar.addMenuItem(new NobucaMenuItemModel("annotate"));
        menuItemAnnotate.setIconImageSrc("./window-system/icons/toolbar-icon-annotate.png");
        
        var menuItemMeasure = toolbar.addMenuItem(new NobucaMenuItemModel("measure"));
        menuItemMeasure.setIconImageSrc("./window-system/icons/toolbar-icon-measure.png");
    }

    createRegionToolbarAddMesh() {
        var toolbar = new BlenderControlToolbarModel();
        this.getRegionToolbar().addChild(toolbar);

        var menuItemAddCube = toolbar.addMenuItem(new NobucaMenuItemModel("annotate"));
        menuItemAddCube.setIconImageSrc("./window-system/icons/toolbar-icon-add-mesh-cube.png");
    
    }
}