import NobucaPopoverModel from "../../../../nobuca-core/popover/NobucaPopoverModel.js";
import NobucaImageModel from "../../../../nobuca-core/image/NobucaImageModel.js";
import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";
import NobucaLabelModel from "../../../../nobuca-core/label/NobucaLabelModel.js";

export default class BlenderSplashScreenModel extends NobucaPopoverModel {

    constructor() {
        super();

        this.getLayout().setDirectionColumn();

        var top = this.addChild(new NobucaPanelModel());

        var image = top.addChild(new NobucaImageModel("./user-interface/splash-screen/splash-screen-image-3-6-2.jpg"));
        image.getLayout().setWidth("500px").setHeight("250px");

        var version = top.addChild(new NobucaLabelModel("3.6.2"));
        version.getLayout().setPositionAbsolute().setTop("8px").setRight("8px");

        var middle = this.addChild(new NobucaPanelModel());
        middle.getLayout().setDirectionRow().setAlignContentsTop().setPaddingTop("8px");

        var column1 = middle.addChild(new NobucaPanelModel());
        column1.getLayout().setGrow(true).setDirectionColumn().setJustifyContentsCenter();
        this.addColumnHeader(column1, "New file");
        this.addAction(column1, "General", "./user-interface/icons/icon-file-new.svg");
        this.addAction(column1, "2D Animation", "./user-interface/icons/icon-file-new.svg");
        this.addAction(column1, "Sculpting", "./user-interface/icons/icon-file-new.svg");
        this.addAction(column1, "VFX", "./user-interface/icons/icon-file-new.svg");
        this.addAction(column1, "Video Editing", "./user-interface/icons/icon-file-new.svg");

        var column2 = middle.addChild(new NobucaPanelModel());
        column2.getLayout().setGrow(true).setDirectionColumn().setJustifyContentsCenter();
        this.addColumnHeader(column2, "Getting Started");
        this.addAction(column2, "Manual", "./user-interface/icons/icon-web-link.svg");
        this.addAction(column2, "Blender Website", "./user-interface/icons/icon-web-link.svg");
        this.addAction(column2, "Credits", "./user-interface/icons/icon-web-link.svg");
  
        var bottom = this.addChild(new NobucaPanelModel());
        bottom.getLayout().setDirectionRow().setAlignContentsTop().setPaddingTop("16px").setPaddingBottom("16px");

        var column3 = bottom.addChild(new NobucaPanelModel());
        column3.getLayout().setGrow(true).setDirectionColumn().setJustifyContentsCenter();
        this.addAction(column3, "Open...", "./user-interface/icons/icon-file-open.svg");
        this.addAction(column3, "Recover Last Session", "./user-interface/icons/icon-file-recover.svg");

        var column4 = bottom.addChild(new NobucaPanelModel());
        column4.getLayout().setGrow(true).setDirectionColumn().setJustifyContentsCenter();
        this.addAction(column4, "Release Notes", "./user-interface/icons/icon-web-link.svg");
        this.addAction(column4, "Development Fund", "./user-interface/icons/icon-heart-red.svg");
    }

    addColumnHeader(parent, text) {
        var headerContainer = parent.addChild(new NobucaPanelModel());
        headerContainer.getLayout().setJustifyContentsCenter().setAlignContentsTop().setPaddingBottom("4px");
        var header = headerContainer.addChild(new NobucaPanelModel());
        header.getLayout().setWidth("190px").setPaddingTop("10px");
        header.addChild(new NobucaLabelModel(text)).getLayout().setToneDown(true);
    }

    addAction(parent, text, imgSrc) {
        var actionContainer = parent.addChild(new NobucaPanelModel());
        actionContainer.getLayout().setJustifyContentsCenter().setPaddingTop("2px");
        var action = actionContainer.addChild(new NobucaPanelModel());
        action.getLayout().setAlignContentsCenter();
        action.setClickable(true);
        action.getLayout().setWidth("190px").setPadding("3px");
        action.addChild(new NobucaImageModel(imgSrc));
        action.addChild(new NobucaLabelModel(text)).getLayout().setPaddingLeft("10px");
        return action;
    }

}