import NobucaAccordionModel from "../../../../nobuca-core/accordion/NobucaAccordionModel.js";
import NobucaAccordionSectionModel from "../../../../nobuca-core/accordion/NobucaAccordionSectionModel.js";
import NobucaButtonModel from "../../../../nobuca-core/button/NobucaButtonModel.js";
import NobucaCheckboxModel from "../../../../nobuca-core/checkbox/NobucaCheckboxModel.js";
import NobucaErrorDialogModel from "../../../../nobuca-core/dialog/NobucaErrorDialogModel.js";
import NobucaImageModel from "../../../../nobuca-core/image/NobucaImageModel.js";
import NobucaLabelModel from "../../../../nobuca-core/label/NobucaLabelModel.js";
import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";
import NobucaSelectModel from "../../../../nobuca-core/select/NobucaSelectModel.js";
import NobucaWhitespaceModel from "../../../../nobuca-core/whitespace/NobucaWhitespaceModel.js";
import EclipseDialogModel from "../EclipseDialogModel.js";


export default class EclipseDialogSelectWorkspaceModel extends EclipseDialogModel {

    constructor() {
        super(600, null, "Eclipse IDE Launcher");
        this.createSubheader();
        this.createBody();
        this.createButtons();
        this.show();
        this.getButtonLaunch().focus();
    }

    createSubheader() {
        var subheader = new NobucaPanelModel();
        subheader.getLayout().setDirectionColumn();
        this.setSubheader(subheader);

        var label1 = subheader.addChild(new NobucaLabelModel("Select a directory as workspace"));
        label1.setBold(true);

        var label2 = subheader.addChild(new NobucaLabelModel("Eclipse IDE uses the workspace diretory to store its preferences and development artifacts."));
        label2.getLayout().setPaddingTop("10px").setPaddingLeft("10px");
    }

    createBody() {
        var line1 = this.addChild(new NobucaPanelModel());
        var label1 = line1.addChild(new NobucaLabelModel("Workspace:"));
        line1.addChild(new NobucaWhitespaceModel());
        var select = line1.addChild(new NobucaSelectModel());
        select.getLayout().setGrow(1);
        line1.addChild(new NobucaWhitespaceModel());
        var button = line1.addChild(new NobucaButtonModel("Browse..."));
        button.getClickedEventEmitter().subscribe(() => {
            if (window.showDirectoryPicker == null) {
                new NobucaErrorDialogModel("Open local directories is not supported by this browser. Please use Chrome or Edge.");
                return;
            }
            window.showDirectoryPicker().then(directory => {
                console.log(directory);
                select.setValue(directory.name);
                select.getValueChangedEventEmitter().emit();
            });
        });

        this.addChild(new NobucaPanelModel()).addChild(new NobucaWhitespaceModel());

        var accordion = this.addChild(new NobucaAccordionModel());
        var section1 = accordion.addSection(new NobucaAccordionSectionModel("Recent Workspaces"));
        var section2 = accordion.addSection(new NobucaAccordionSectionModel("Copy Settings"));
        section2.getLayout().setDirectionColumn().setPaddingLeft("12px");
        var section2line1 = section2.addChild(new NobucaPanelModel());
        section2line1.addChild(new NobucaCheckboxModel());
        section2line1.addChild(new NobucaLabelModel("Workbench L<u>a</u>yout"));
        var section2line2 = section2.addChild(new NobucaPanelModel());
        section2line2.addChild(new NobucaCheckboxModel());
        section2line2.addChild(new NobucaLabelModel("Working &nbsp; <u>S</u>ets"));
        var section2line3 = section2.addChild(new NobucaPanelModel());
        section2line3.addChild(new NobucaCheckboxModel());
        section2line3.addChild(new NobucaLabelModel("<u>P</u>references"));

        this.addChild(new NobucaPanelModel()).addChild(new NobucaWhitespaceModel());
    }

    createButtons() {
        var buttons = this.addChild(new NobucaPanelModel());

        var left = buttons.addChild(new NobucaPanelModel());
        left.getLayout().setJustifyContentsLeft();
        left.addChild(new NobucaImageModel("./icons/question-mark-circle-outline-icon.svg"));


        var right = buttons.addChild(new NobucaPanelModel());
        right.getLayout().setJustifyContentsRight().setGrow(1);
        this.buttonLaunch = right.addChild(new NobucaButtonModel("Launch"));
        right.addChild(new NobucaWhitespaceModel());
        var buttonCancel = right.addChild(new NobucaButtonModel("Cancel"));

        this.buttonLaunch.getClickedEventEmitter().subscribe(() => {
            this.close();
        });

        buttonCancel.getClickedEventEmitter().subscribe(() => {
            this.close();
        });
    }

    getButtonLaunch() {
        return this.buttonLaunch;
    }
}