import BlenderScene from "../scene/BlenderScene.js";

export default class BlenderFileContents {

    constructor() {
        this.scenes = [];
        
        var scene = this.addScene();
        this.setActiveScene(scene);
    }

    getScenes() {
        return this.scenes;
    }

    addScene() {
        var scene = new BlenderScene();
        this.getScenes().push(scene);
        return scene;
    }

    setActiveScene(scene) {
        this.activeScene = scene;
        return this;
    }

    getActiveScene() {
        return this.activeScene;
    }


}