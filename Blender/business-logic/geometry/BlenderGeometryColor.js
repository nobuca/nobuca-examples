
export default class BlenderGeometryColor {

    setRed(red) {
        this.red = red;
        return this;
    }

    getRed() {
        return this.red;
    }

    setGreen(green) {
        this.green = green;
        return this;
    }

    getGreen() {
        return this.green;
    }

    setBlue(blue) {
        this.blue = blue;
        return this;
    }

    getBlue() {
        return this.blue;
    }

    setAlpha() {
        this.alpha = alpha;
        return this;
    }

    getAlpha() {
        return this.alpha;
    }

    setRedGreenBlueAlpha(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
        return this;
    }
   
}