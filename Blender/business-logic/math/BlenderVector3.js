

export default class BlenderVector3 {

    constructor() {
        this.values = new Float32Array(3);
    }

    getValues() {
        return this.values;
    }

    setXYZ(x, y, z) {
        if (x !== undefined) {
            this.values[0] = x;
            if (y !== undefined) {
                this.values[1] = y;
                if (z !== undefined) {
                    this.values[2] = z;
                }
            }
        }
        return this;
    }

    setX(x) {
        this.values[0] = x;
        return this;
    }

    getX(x) {
        return this.values[0];
    }

    setY(y) {
        this.values[1] = y;
        return this;
    }

    getY(y) {
        return this.values[1];
    }

    setZ(z) {
        this.values[2] = z;
        return this;
    }

    getZ(z) {
        return this.values[2];
    }

    setValues(values) {
        this.values = values;
        return this;
    }

    cross(a, b) {

        const t1 = a.values[2] * b.values[0] - a.values[0] * b.values[2];
        const t2 = a.values[0] * b.values[1] - a.values[1] * b.values[0];
        this.values[0] = a.values[1] * b.values[2] - a.values[2] * b.values[1];
        this.values[1] = t1;
        this.values[2] = t2;

        return this;
    }

    copyFrom(v) {
        this.values[0] = v.values[0];
        this.values[1] = v.values[1];
        this.values[2] = v.values[2];
        return this;
    }

    setXYZ(x, y, z) {
        const dst = new Float32Array(3);
        if (x !== undefined) {
            this.values[0] = x;
            if (y !== undefined) {
                this.values[1] = y;
                if (z !== undefined) {
                    this.values[2] = z;
                }
            }
        }
        return this;
    }

    length() {
        const v0 = this.values[0];
        const v1 = this.values[1];
        const v2 = this.values[2];
        return Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
    }

    normalize() {

        const v0 = this.values[0];
        const v1 = this.values[1];
        const v2 = this.values[2];
        const len = Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);

        if (len > 0.00001) {
            this.values[0] = v0 / len;
            this.values[1] = v1 / len;
            this.values[2] = v2 / len;
        } else {
            this.values[0] = 0;
            this.values[1] = 0;
            this.values[2] = 0;
        }

        return this;
    }

    addScaled(b, scale) {

        this.values[0] = this.values[0] + b.values[0] * scale;
        this.values[1] = this.values[1] + b.values[1] * scale;
        this.values[2] = this.values[2] + b.values[2] * scale;

        return this;
    }

    scale(k) {

        this.values[0] = this.values[0] * k;
        this.values[1] = this.values[1] * k;
        this.values[2] = this.values[2] * k;

        return this;
    }

    transformMat4Upper3x3(m) {

        const v0 = this.values[0];
        const v1 = this.values[1];
        const v2 = this.values[2];

        this.values[0] = v0 * m.values[0 * 4 + 0] + v1 * m.values[1 * 4 + 0] + v2 * m.values[2 * 4 + 0];
        this.values[1] = v0 * m.values[0 * 4 + 1] + v1 * m.values[1 * 4 + 1] + v2 * m.values[2 * 4 + 1];
        this.values[2] = v0 * m.values[0 * 4 + 2] + v1 * m.values[1 * 4 + 2] + v2 * m.values[2 * 4 + 2];

        return this;
    }
}