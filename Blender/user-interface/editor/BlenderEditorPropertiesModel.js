import BlenderEditorModel from "./BlenderEditorModel.js";
import BlenderControlButtonDropDownModel from "../control/button-drop-down/BlenderControlButtonDropDownModel.js"
import BlenderControlSearchModel from "../control/search/BlenderControlSearchModel.js"
import BlenderControlPropertiesModel from "../control/properties/BlenderControlPropertiesModel.js";
import BlenderControlPropertiesTabModel from "../control/properties/BlenderControlPropertiesTabModel.js";
import NobucaImageModel from "../../../../nobuca-core/image/NobucaImageModel.js";
import NobucaLabelModel from "../../../../nobuca-core/label/NobucaLabelModel.js";
import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";
import NobucaAccordionModel from "../../../../nobuca-core/accordion/NobucaAccordionModel.js";
import NobucaAccordionSectionModel from "../../../../nobuca-core/accordion/NobucaAccordionSectionModel.js";
import NobucaCheckboxModel from "../../../../nobuca-core/checkbox/NobucaCheckboxModel.js";

export default class BlenderEditorPropertiesModel extends BlenderEditorModel {

    getEditorIconImageSrc() {
        return "./user-interface/icons/icon-editor-properties.svg"
    }

    createRegionHeaderControls() {
        this.createRegionHeaderSearch();
        this.createRegionHeaderSyncSelector();
    }

    createRegionHeaderSearch() {
        var search = new BlenderControlSearchModel();
        this.getRegionHeader().getCenterSide().addChild(search);
    }

    createRegionHeaderSyncSelector() {
        var control = new BlenderControlButtonDropDownModel();
        this.getRegionHeader().getRightSide().addChild(control);
    }

    createRegionMainControl() {
        this.regionMainProperties = new BlenderControlPropertiesModel();
        this.setRegionMainControl(this.regionMainProperties);

        this.createTabTool();
        this.createTabRender();
        this.createTabOutput();

        this.getRegionMainProperties().addTab(new BlenderControlPropertiesTabModel()).setIconSrc("./user-interface/icons/icon-picture-stack.svg");
        this.getRegionMainProperties().addTab(new BlenderControlPropertiesTabModel()).setIconSrc("./user-interface/icons/icon-data-block-scene.svg");
        this.getRegionMainProperties().addTab(new BlenderControlPropertiesTabModel()).setIconSrc("./user-interface/icons/icon-world-red.svg");
        this.getRegionMainProperties().addTab(new BlenderControlPropertiesTabModel()).setIconSrc("./user-interface/icons/icon-collection-outline.svg");
        this.getRegionMainProperties().addTab(new BlenderControlPropertiesTabModel()).setIconSrc("./user-interface/icons/icon-object-orange.svg");
        this.getRegionMainProperties().addTab(new BlenderControlPropertiesTabModel()).setIconSrc("./user-interface/icons/icon-wrench-blue.svg");
        this.getRegionMainProperties().addTab(new BlenderControlPropertiesTabModel()).setIconSrc("./user-interface/icons/icon-particles-blue.svg");
        this.getRegionMainProperties().addTab(new BlenderControlPropertiesTabModel()).setIconSrc("./user-interface/icons/icon-physics-blue.svg");
        this.getRegionMainProperties().addTab(new BlenderControlPropertiesTabModel()).setIconSrc("./user-interface/icons/icon-constrains-blue.svg");
    }

    getRegionMainProperties() {
        return this.regionMainProperties;
    }

    createTabTool() {
        var tab = this.getRegionMainProperties().addTab(new BlenderControlPropertiesTabModel());
        tab.setIconSrc("./user-interface/icons/icon-tool.svg");

        var header = tab.addChild(new NobucaPanelModel());
        header.getLayout().setAlignContentsCenter();

        var headerImageContainer = header.addChild(new NobucaPanelModel());

        var headerImage = new NobucaImageModel("./user-interface/icons/toolbar-icon-tweak.png");
        headerImageContainer.addChild(headerImage);

        var labelTweak = new NobucaLabelModel("Tweak");
        header.addChild(labelTweak);

        var sections = tab.addChild(new NobucaAccordionModel());

        var sectionOptions = sections.addSection(new NobucaAccordionSectionModel("Options"));
        sectionOptions.setExpanded(true);

        var sectionOptionsSections = sectionOptions.addChild(new NobucaAccordionModel());

        sectionOptionsSections.addSection(this.createTabToolSectionTransform());

        sections.addSection(this.createTabToolSectionWorkspace());
    }

    createTabToolSectionTransform() {
        var sectionTransform = new NobucaAccordionSectionModel("Transform");
        sectionTransform.getLayout().setJustifyContentsCenter();
        sectionTransform.setExpanded(true);

        var panelLeft = sectionTransform.addChild(new NobucaPanelModel());

        var labelAffectOnly = new NobucaLabelModel("Affect Only &nbsp");
        panelLeft.addChild(labelAffectOnly);

        var panelRight = sectionTransform.addChild(new NobucaPanelModel());
        panelRight.getLayout().setDirectionColumn().setJustifyContentsRight();

        var panelOrigins = panelRight.addChild(new NobucaPanelModel());
        panelOrigins.getLayout().setAlignContentsCenter();
        panelOrigins.addChild(new NobucaCheckboxModel());
        panelOrigins.addChild(new NobucaLabelModel("Origins"));

        var panelLocations = panelRight.addChild(new NobucaPanelModel());
        panelLocations.getLayout().setAlignContentsCenter();
        panelLocations.addChild(new NobucaCheckboxModel());
        panelLocations.addChild(new NobucaLabelModel("Locations"));

        var panelParents = panelRight.addChild(new NobucaPanelModel());
        panelParents.getLayout().setAlignContentsCenter();
        panelParents.addChild(new NobucaCheckboxModel());
        panelParents.addChild(new NobucaLabelModel("Parents"));

        return sectionTransform;
    }

    createTabToolSectionWorkspace() {
        var sectionWorkspace = new NobucaAccordionSectionModel("Wokspace");
        sectionWorkspace.getLayout().setDirectionColumn().setJustifyContentsCenter();
        sectionWorkspace.setExpanded(false);

        var panelTop = sectionWorkspace.addChild(new NobucaPanelModel());
        panelTop.getLayout().setDirectionRow();

        var panelLeft = panelTop.addChild(new NobucaPanelModel());
        panelLeft.getLayout().setDirectionColumn().setJustifyContentsRight().setGrow(true);

        var labelPinScene = new NobucaLabelModel("");
        panelLeft.addChild(labelPinScene);

        var labelMode = new NobucaLabelModel("Mode &nbsp;");
        labelMode.getLayout().setJustifyContentsRight();
        panelLeft.addChild(labelMode);

        var panelRight = panelTop.addChild(new NobucaPanelModel());
        panelRight.getLayout().setDirectionColumn().setGrow(true);

        var pinScene = new NobucaPanelModel();
        pinScene.getLayout().setDirectionRow().setAlignContentsCenter();
        pinScene.addChild(new NobucaCheckboxModel());
        pinScene.addChild(new NobucaLabelModel("Pin Scene"));
        panelRight.addChild(pinScene);

        var objectMode = new BlenderControlButtonDropDownModel();
        objectMode.getLayout().setGrow(true);
        objectMode.setImageSrc("./user-interface/icons/icon-mode-object.svg");
        objectMode.setTitle("Object Mode")
        panelRight.addChild(objectMode);

        var sectionWorkspaceSections = new NobucaAccordionModel();
        sectionWorkspace.addChild(sectionWorkspaceSections);

        var sectionFilterAddOns = new NobucaAccordionSectionModel();
        sectionFilterAddOns.addHeaderComponent(new NobucaCheckboxModel());
        sectionFilterAddOns.addHeaderComponent(new NobucaLabelModel("Filter Add-ons"));
        sectionWorkspaceSections.addSection(sectionFilterAddOns);

        sectionFilterAddOns.addChild(new NobucaLabelModel("Test"));

        var sectionCustomProperties = new NobucaAccordionSectionModel("Custom properties");
        sectionWorkspaceSections.addSection(sectionCustomProperties);

        sectionCustomProperties.addChild(new NobucaLabelModel("Test"));

        return sectionWorkspace;
    }

    createTabRender() {
        var tab = this.getRegionMainProperties().addTab(new BlenderControlPropertiesTabModel());
        tab.setIconSrc("./user-interface/icons/icon-small-camera2.svg");

        var header = tab.addChild(new NobucaPanelModel());
        header.getLayout().setGrow(true);
        header.getLayout().setAlignContentsCenter();

        var headerImage = new NobucaImageModel("./user-interface/icons/icon-data-block-scene.svg");
        header.addChild(headerImage);

        var headerLabel = new NobucaLabelModel("Scene");
        header.addChild(headerLabel);

        var renderEngine = tab.addChild(new NobucaPanelModel());
        renderEngine.getLayout().setAlignContentsCenter();

        var panelLeft = renderEngine.addChild(new NobucaPanelModel());
        panelLeft.getLayout().setDirectionColumn().setJustifyContentsRight().setGrow(true);

        panelLeft.addChild(new NobucaLabelModel("Render Engine &nbsp;")).getLayout().setJustifyContentsRight();

        var panelRight = renderEngine.addChild(new NobucaPanelModel());
        panelRight.getLayout().setDirectionColumn().setGrow(true);

        var objectMode = new BlenderControlButtonDropDownModel();
        objectMode.getLayout().setGrow(true);
        objectMode.setTitle("Eevee")
        panelRight.addChild(objectMode);

        var sections = tab.addChild(new NobucaAccordionModel());

        var sectionSamplings = sections.addSection(new NobucaAccordionSectionModel("Sampling"));

        var sectionAmbientOcclusion = sections.addSection(new NobucaAccordionSectionModel());
        sectionAmbientOcclusion.addHeaderComponent(new NobucaCheckboxModel());
        sectionAmbientOcclusion.addHeaderComponent(new NobucaLabelModel("Ambient Occlusion"));

        var sectionBloom = sections.addSection(new NobucaAccordionSectionModel());
        sectionBloom.addHeaderComponent(new NobucaCheckboxModel());
        sectionBloom.addHeaderComponent(new NobucaLabelModel("Bloom"));

        var sectionDepthOfField = sections.addSection(new NobucaAccordionSectionModel("Depth of Field"));

        var sectionSubsurfaceScattering = sections.addSection(new NobucaAccordionSectionModel("Subsurface Scattering"));

        var sectionScreenSpaceReflections = sections.addSection(new NobucaAccordionSectionModel());
        sectionScreenSpaceReflections.addHeaderComponent(new NobucaCheckboxModel());
        sectionScreenSpaceReflections.addHeaderComponent(new NobucaLabelModel("Screen Space Reflections"));


        var sectionMotionBlur = sections.addSection(new NobucaAccordionSectionModel());
        sectionMotionBlur.addHeaderComponent(new NobucaCheckboxModel());
        sectionMotionBlur.addHeaderComponent(new NobucaLabelModel("Motion Blur"));

        sections.addSection(new NobucaAccordionSectionModel("Volumetrics"));
        sections.addSection(new NobucaAccordionSectionModel("Performance"));
        sections.addSection(new NobucaAccordionSectionModel("Curves"));
        sections.addSection(new NobucaAccordionSectionModel("Shadors"));
        sections.addSection(new NobucaAccordionSectionModel("Indirect Lighting"));
        sections.addSection(new NobucaAccordionSectionModel("Film"));
        sections.addSection(new NobucaAccordionSectionModel("Simplify"));
        sections.addSection(new NobucaAccordionSectionModel("Grease Pencil"));
        sections.addSection(new NobucaAccordionSectionModel("Feestyle"));
        sections.addSection(new NobucaAccordionSectionModel("Color Management"));

    }

    createTabOutput() {
        var tab = this.getRegionMainProperties().addTab(new BlenderControlPropertiesTabModel());
        tab.setIconSrc("./user-interface/icons/icon-printer.svg");
        tab.setActive(true);

        var header = tab.addChild(new NobucaPanelModel());
        header.getLayout().setGrow(true);
        header.getLayout().setAlignContentsCenter();

        var headerImage = new NobucaImageModel("./user-interface/icons/icon-data-block-scene.svg");
        header.addChild(headerImage);

        var headerLabel = new NobucaLabelModel("Scene");
        header.addChild(headerLabel);

        var sections = tab.addChild(new NobucaAccordionModel());

        sections.addSection(new NobucaAccordionSectionModel("Format"));
        sections.addSection(new NobucaAccordionSectionModel("Frame Range"));

        var sectionStereoscopy = sections.addSection(new NobucaAccordionSectionModel());
        sectionStereoscopy.addHeaderComponent(new NobucaCheckboxModel());
        sectionStereoscopy.addHeaderComponent(new NobucaLabelModel("Stereoscopy"));

        sections.addSection(new NobucaAccordionSectionModel("Output"));
        sections.addSection(new NobucaAccordionSectionModel("Metadata"));
        sections.addSection(new NobucaAccordionSectionModel("Post Processing"));

    }
}