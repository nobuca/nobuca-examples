import NobucaTextModel from "../../nobuca-core/text/NobucaTextModel.js";
import NobucaLabelModel from "../../nobuca-core/label/NobucaLabelModel.js";
import NobucaAppModel from "../../nobuca-core/app/NobucaAppModel.js";

export default class HelloWorldAppModel extends NobucaAppModel {

    constructor() {
        super();
        var labelModel = new NobucaLabelModel("Hello World!");
        this.getRootPanel().addChild(labelModel);
        var textModel = new NobucaTextModel(labelModel.getText());
        this.getRootPanel().addChild(textModel);
        textModel.getValueChangedEventEmitter().subscribe(() => {
            labelModel.setText(textModel.getValue());
        });
    }
}