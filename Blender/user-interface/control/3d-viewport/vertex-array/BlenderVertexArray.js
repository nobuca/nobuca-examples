

export default class BlenderVertexArray {

    setNumberOfFloat32PerVertex(numberOfFloat32PerVertex) {
        this.numberOfFloat32PerVertex = numberOfFloat32PerVertex;
    }

    getNumberOfFloat32PerVertex() {
        return this.numberOfFloat32PerVertex;
    }

    getNumberOfBytesPerVertex() {
        return this.getNumberOfFloat32PerVertex() * 4;
    }

    getPositionOffset() {
        return this.possitionOffset;
    }

    setPositionOffset(possitionOffset) {
        this.possitionOffset = possitionOffset;
    }

    getColorOffset() {
        return this.colorOffset;
    }

    setColorOffset(colorOffset) {
        this.colorOffset = colorOffset;
    }

    getUvOffset() {
        return this.uvOffset;
    }

    setUvOffset(uvOffset) {
        this.uvOffset = uvOffset;
    }

    getVertexCount() {
        return this.vertexCount;
    }

    setVertexCount(vertexCount) {
        this.vertexCount = vertexCount;
    }

    getVertexArray() {
        return this.vertexArray;
    }

    setVertexArray(vertexArray) {
        this.vertexArray = vertexArray;
    }
}