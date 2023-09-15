

export default class BlenderVector3 {

    static fromValues(x, y, z) {
        const dst = new Float32Array(3);
        if (x !== undefined) {
            dst[0] = x;
            if (y !== undefined) {
                dst[1] = y;
                if (z !== undefined) {
                    dst[2] = z;
                }
            }
        }
        return dst;
    }
}