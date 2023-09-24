import BlenderScene from "../scene/BlenderScene.js";

export default class BlenderFileContents {

    constructor() {
        this.scenes = [];
    }

    getScenes() {
        return this.scenes;
    }

    addScene() {
        var scene = new BlenderScene();
        this.getScenes().push(scene);
        return this;
    }

    setActiveScene(scene) {
        this.activeScene = scene;
    }

    getActiveScene() {
        return this.activeScene;
    }


}