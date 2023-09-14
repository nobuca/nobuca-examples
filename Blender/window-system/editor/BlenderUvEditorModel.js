import BlenderEditorModel from "./BlenderEditorModel.js";
import NobucaMenubarModel from "../../../../nobuca-core/menubar/NobucaMenubarModel.js";
import NobucaMenuItemModel from "../../../../nobuca-core/menu/NobucaMenuItemModel.js";
import BlenderControlButtonDropDownModel from "../control/button-drop-down/BlenderControlButtonDropDownModel.js"
import BlenderControlButtonToggleItemModel from "../control/button-toggle/BlenderControlButtonToggleItemModel.js";
import BlenderControlButtonToggleModel from "../control/button-toggle/BlenderControlButtonToggleModel.js";
import NobucaMenuModel from "../../../../nobuca-core/menu/NobucaMenuModel.js";
import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";

export default class BlenderUvEditorModel extends BlenderEditorModel {

    getEditorIconImageSrc() {
        return "./window-system/icons/icon-editor-uv.svg"
    }

    createRegionHeaderControls() {
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
        this.createRegionToolSettingsOptions();
    }   

    createRegionHeaderModeSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./window-system/icons/icon-mode-object.svg");
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
        control.setImageSrc("./window-system/icons/icon-orientation-global.svg");
        control.setTitle("Global");
        this.getRegionHeader().getCenterSide().addChild(control);
    }

    createRegionHeaderPivotSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./window-system/icons/icon-transform-median-point.svg");
        this.getRegionHeader().getCenterSide().addChild(control);
    }

    createRegionHeaderSnappingSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setEnabledDisabledBehaviour(true);
        control.setEnabledImageSrc("./window-system/icons/icon-snapping-enabled.svg");
        control.setDisabledImageSrc("./window-system/icons/icon-snapping-disabled.svg");
        control.setImageSrc("./window-system/icons/icon-snapping-increment.svg");
        this.getRegionHeader().getCenterSide().addChild(control);
    }

    createRegionHeaderProportionalEditingSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setEnabledDisabledBehaviour(true);
        control.setEnabledImageSrc("./window-system/icons/icon-proportional-editing-enabled.svg");
        control.setDisabledImageSrc("./window-system/icons/icon-proportional-editing-disabled.svg");
        control.setImageSrc("./window-system/icons/icon-proportional-editing-sphere.svg");
        this.getRegionHeader().getCenterSide().addChild(control);
    }

    createRegionHeaderVisibilitySelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setImageSrc("./window-system/icons/icon-visibility-all.svg");
        this.getRegionHeader().getRightSide().addChild(control);
    }

    createRegionHeaderGizmosSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setEnabledDisabledBehaviour(true);
        control.setEnabled(true);
        control.setPreventDropDownWhenDisabled(true);
        control.setEnabledImageSrc("./window-system/icons/icon-gizmos.svg");
        control.setDisabledImageSrc("./window-system/icons/icon-gizmos.svg");
        this.getRegionHeader().getRightSide().addChild(control);
    }

    createRegionHeaderOverlaysSelector() {
        var control = new BlenderControlButtonDropDownModel();
        control.setEnabledDisabledBehaviour(true);
        control.setEnabled(true);
        control.setPreventDropDownWhenDisabled(true);
        control.setEnabledImageSrc("./window-system/icons/icon-overlays.svg");
        control.setDisabledImageSrc("./window-system/icons/icon-overlays.svg");
        this.getRegionHeader().getRightSide().addChild(control);
    }

    createRegionHeaderXRayToggle() {
        var toggle = new BlenderControlButtonToggleModel();
        var toogleItem = new BlenderControlButtonToggleItemModel();
        toogleItem.setImageSrc("./window-system/icons/icon-x-ray.svg");
        toggle.addItem(toogleItem);
        this.getRegionHeader().getRightSide().addChild(toggle);
    }

    createRegionHeaderShaddingSelector() {
        var toggle = new BlenderControlButtonToggleModel();

        var toogleItemWireframe = new BlenderControlButtonToggleItemModel();
        toogleItemWireframe.setImageSrc("./window-system/icons/icon-shading-wireframe.svg");
        toggle.addItem(toogleItemWireframe);

        var toogleItemSolid = new BlenderControlButtonToggleItemModel();
        toogleItemSolid.setImageSrc("./window-system/icons/icon-shading-solid.svg");
        toogleItemSolid.setToggled(true);
        toggle.addItem(toogleItemSolid);

        var toogleItemMaterial = new BlenderControlButtonToggleItemModel();
        toogleItemMaterial.setImageSrc("./window-system/icons/icon-shading-material.svg");
        toggle.addItem(toogleItemMaterial);

        var toogleItemRender = new BlenderControlButtonToggleItemModel();
        toogleItemRender.setImageSrc("./window-system/icons/icon-shading-render.svg");
        toggle.addItem(toogleItemRender);

        toggle.setDropDown(true);

        this.getRegionHeader().getRightSide().addChild(toggle);
    }

    createRegionToolSettingsSelectionModeSelector() {
        var toggle = new BlenderControlButtonToggleModel();

        var toogleItemNew = new BlenderControlButtonToggleItemModel();
        toogleItemNew.setImageSrc("./window-system/icons/icon-selection-mode-new.svg");
        toogleItemNew.setToggled(true);
        toggle.addItem(toogleItemNew);

        var toogleItemExtend = new BlenderControlButtonToggleItemModel();
        toogleItemExtend.setImageSrc("./window-system/icons/icon-selection-mode-extend.svg");
        toggle.addItem(toogleItemExtend);

        var toogleItemSubtract = new BlenderControlButtonToggleItemModel();
        toogleItemSubtract.setImageSrc("./window-system/icons/icon-selection-mode-subtract.svg");
        toggle.addItem(toogleItemSubtract);

        var toogleItemIntersect = new BlenderControlButtonToggleItemModel();
        toogleItemIntersect.setImageSrc("./window-system/icons/icon-selection-mode-invert.svg");
        toggle.addItem(toogleItemIntersect);

        var toogleItemIntersect = new BlenderControlButtonToggleItemModel();
        toogleItemIntersect.setImageSrc("./window-system/icons/icon-selection-mode-intersect.svg");
        toggle.addItem(toogleItemIntersect);

        this.getRegionToolSettings().addChild(toggle);
    }

    createRegionToolSettingsOptions() {
        var control = new BlenderControlButtonDropDownModel();
        control.setTitle("Options");
        this.getRegionToolSettings().addChild(control);
    }
   
    createRegionToolbarMenus() {
        this.createRegionToolbarMenuSelectAndCursor();
        this.createRegionToolbarMenuTransform();
        this.createRegionToolbarMenuAnnotateAndMeasure();
        this.createRegionToolbarMenuAddMesh();
    }

    createRegionToolbarMenuSelectAndCursor() {
        var menu = new NobucaMenuModel();
        this.getRegionToolbar().addMenu(menu);

        var menuItemSelectBox = menu.addMenuItem(new NobucaMenuItemModel("selectBox", "<u>S</u>elect Box"));
        menuItemSelectBox.setIconImageSrc("./window-system/icons/toolbar-icon-select-box.png");

        var menuItemTweak = menuItemSelectBox.addMenuItem(new NobucaMenuItemModel("tweak", "<u>T</u>weak"))
        menuItemTweak.setIconImageSrc("./window-system/icons/toolbar-icon-tweak.png");
        
        var menuItemSelectBox2 = menuItemSelectBox.addMenuItem(new NobucaMenuItemModel("selectBox", "<u>S</u>elect Box"))
        menuItemSelectBox2.setIconImageSrc("./window-system/icons/toolbar-icon-select-box.png");
        
        var menuItemSelectCircle = menuItemSelectBox.addMenuItem(new NobucaMenuItemModel("selectCircle", "Select <u>C</u>ircle"))
        menuItemSelectCircle.setIconImageSrc("./window-system/icons/toolbar-icon-select-circle.png");

        var menuItemSelectLasso = menuItemSelectBox.addMenuItem(new NobucaMenuItemModel("selectCircle", "Select <u>L</u>asso"))
        menuItemSelectLasso.setIconImageSrc("./window-system/icons/toolbar-icon-select-lasso.png");

        var menuItemCursor = menu.addMenuItem(new NobucaMenuItemModel("cursor", "Cursor"));
        menuItemCursor.setIconImageSrc("./window-system/icons/toolbar-icon-cursor.png");
    }

    createRegionToolbarMenuTransform() {
        var menu = new NobucaMenuModel();
        this.getRegionToolbar().addMenu(menu);

        var menuItemMove = menu.addMenuItem(new NobucaMenuItemModel("move", "Move"));
        menuItemMove.setIconImageSrc("./window-system/icons/toolbar-icon-move.png");
        
        var menuItemRotate = menu.addMenuItem(new NobucaMenuItemModel("rotate", "Rotate"));
        menuItemRotate.setIconImageSrc("./window-system/icons/toolbar-icon-rotate.png");
                
        var menuItemScale = menu.addMenuItem(new NobucaMenuItemModel("scale", "Scale"));
        menuItemScale.setIconImageSrc("./window-system/icons/toolbar-icon-scale.png");

        var menuItemScale2 = menuItemScale.addMenuItem(new NobucaMenuItemModel("scale", "<u>S</u>cale"));
        menuItemScale2.setIconImageSrc("./window-system/icons/toolbar-icon-scale.png");
   
        var menuItemScaleCage = menuItemScale.addMenuItem(new NobucaMenuItemModel("scaleCage", "Scale <u>C</u>age"));
        menuItemScaleCage.setIconImageSrc("./window-system/icons/toolbar-icon-scale-cage.png");
               
        var menuItemTransform = menu.addMenuItem(new NobucaMenuItemModel("transform", "Tranform"));
        menuItemTransform.setIconImageSrc("./window-system/icons/toolbar-icon-transform.png");
    }
 
    createRegionToolbarMenuAnnotateAndMeasure() {
        var menu = new NobucaMenuModel();
        this.getRegionToolbar().addMenu(menu);

        var menuItemAnnotate = menu.addMenuItem(new NobucaMenuItemModel("annotate", "Annotate"));
        menuItemAnnotate.setIconImageSrc("./window-system/icons/toolbar-icon-annotate.png");
        
        var menuItemMeasure = menu.addMenuItem(new NobucaMenuItemModel("measure", "Meassure"));
        menuItemMeasure.setIconImageSrc("./window-system/icons/toolbar-icon-measure.png");
    }

    createRegionToolbarMenuAddMesh() {
        var menu = new NobucaMenuModel();
        this.getRegionToolbar().addMenu(menu);

        var menuItemAddCube = menu.addMenuItem(new NobucaMenuItemModel("annotate"));
        menuItemAddCube.setIconImageSrc("./window-system/icons/toolbar-icon-add-mesh-cube.png");
    
    }

    createRegionMainControl() {
        var control = new NobucaPanelModel();
        this.setRegionMainControl(control);
    }
}