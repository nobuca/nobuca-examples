import NobucaEventEmitter from "../../../nobuca-core/event/NobucaEventEmitter.js";
import EclipseProject from "./EclipseProject.js";
import EclipseProjectEntry from "./EclipseProjectEntry.js";

export default class EclipseWorkspace {

    static currentWorkspace = new EclipseWorkspace();

    constructor() {
        this.projects = [];
        this.nameChangedEventEmitter = new NobucaEventEmitter();
        this.projectAddedEventEmitter = new NobucaEventEmitter();

        var project = new EclipseProject();
        project.setName("test");
        this.addProject(project);
    }

    static getCurrentWorkspace() {
        return EclipseWorkspace.currentWorkspace;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setDirectory(directory) {
        this.directory = directory;
    }

    getDirectory() {
        return this.directory;
    }

    getProjects() {
        return this.projects;
    }

    addProject(project) {
        this.projects.push(project);
    }

    getNameChangedEventEmitter() {
        return this.nameChangedEventEmitter;
    }

    getProjectAddedEventEmitter() {
        return this.projectAddedEventEmitter;
    }

    async workspaceDirectorySelected(directory) {
        this.setName(directory.name);
        this.setDirectory(directory);
        for await (const [key, value] of directory.entries()) {
            this.addProjectFromDirectory(value);
        }
    }

    async addProjectFromDirectory(directory) {
        if (directory == null) return;
        if (directory.name == ".metadata") return;
        if (directory.kind != "directory") return;
        if (await this.directoryContainsProjectFile(directory)) {
            var project = new EclipseProject();
            project.setName(directory.name);
            project.setDirectory(directory);
            this.addProject(project);
            this.addProjectEntriesFromDirectory(project);
            this.getProjectAddedEventEmitter().emit(project);
            console.log(directory.name + " is a project dir");
        } else {
            console.log(directory.name + " isn't a project dir");
        }
    }

    async directoryContainsProjectFile(directory) {
        for await (const [key, value] of directory.entries()) {
            if (value.kind != "directory" && value.name == ".project") return true;
        }
        return false;
    }

    async addProjectEntriesFromDirectory(project) {
        for await (const [key, value] of project.getDirectory().entries()) {
            var entry = new EclipseProjectEntry();
            entry.setName(value.name);
            if (value.name != ".settings" && value.name != ".project") {
                if (value.kind == "directory") {
                    entry.setDirectory(value);
                } else {
                    entry.setFile(value);
                }
                project.addEntry(entry);
                project.getEntryAddedEventEmitter().emit(entry);
            }
        }
    }
}