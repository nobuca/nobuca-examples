
export default class BlenderMatrix4 {

    constructor() {
        this.values =  new Float32Array(16);
    }

    getValues() {
        return this.values;
    }

    identity() {
        this.getValues()[0] = 1; this.getValues()[1] = 0; this.getValues()[2] = 0; this.getValues()[3] = 0;
        this.getValues()[4] = 0; this.getValues()[5] = 1; this.getValues()[6] = 0; this.getValues()[7] = 0;
        this.getValues()[8] = 0; this.getValues()[9] = 0; this.getValues()[10] = 1; this.getValues()[11] = 0;
        this.getValues()[12] = 0; this.getValues()[13] = 0; this.getValues()[14] = 0; this.getValues()[15] = 1;
        return this;
    }

    perspective(fieldOfViewYInRadians, aspect, zNear, zFar) {

        const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);

        this.getValues()[0] = f / aspect;
        this.getValues()[1] = 0;
        this.getValues()[2] = 0;
        this.getValues()[3] = 0;

        this.getValues()[4] = 0;
        this.getValues()[5] = f;
        this.getValues()[6] = 0;
        this.getValues()[7] = 0;

        this.getValues()[8] = 0;
        this.getValues()[9] = 0;
        this.getValues()[11] = -1;

        this.getValues()[12] = 0;
        this.getValues()[13] = 0;
        this.getValues()[15] = 0;

        if (zFar === Infinity) {
            this.getValues()[10] = -1;
            this.getValues()[14] = -zNear;
        } else {
            const rangeInv = 1 / (zNear - zFar);
            this.getValues()[10] = zFar * rangeInv;
            this.getValues()[14] = zFar * zNear * rangeInv;
        }
        return this;
    }

    rotate(axis, angleInRadians) {

        let x = axis[0];
        let y = axis[1];
        let z = axis[2];
        const n = Math.sqrt(x * x + y * y + z * z);
        x /= n;
        y /= n;
        z /= n;
        const xx = x * x;
        const yy = y * y;
        const zz = z * z;
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        const oneMinusCosine = 1 - c;

        const r00 = xx + (1 - xx) * c;
        const r01 = x * y * oneMinusCosine + z * s;
        const r02 = x * z * oneMinusCosine - y * s;
        const r10 = x * y * oneMinusCosine - z * s;
        const r11 = yy + (1 - yy) * c;
        const r12 = y * z * oneMinusCosine + x * s;
        const r20 = x * z * oneMinusCosine + y * s;
        const r21 = y * z * oneMinusCosine - x * s;
        const r22 = zz + (1 - zz) * c;

        const m00 = this.getValues()[0];
        const m01 = this.getValues()[1];
        const m02 = this.getValues()[2];
        const m03 = this.getValues()[3];
        const m10 = this.getValues()[4];
        const m11 = this.getValues()[5];
        const m12 = this.getValues()[6];
        const m13 = this.getValues()[7];
        const m20 = this.getValues()[8];
        const m21 = this.getValues()[9];
        const m22 = this.getValues()[10];
        const m23 = this.getValues()[11];

        this.getValues()[0] = r00 * m00 + r01 * m10 + r02 * m20;
        this.getValues()[1] = r00 * m01 + r01 * m11 + r02 * m21;
        this.getValues()[2] = r00 * m02 + r01 * m12 + r02 * m22;
        this.getValues()[3] = r00 * m03 + r01 * m13 + r02 * m23;
        this.getValues()[4] = r10 * m00 + r11 * m10 + r12 * m20;
        this.getValues()[5] = r10 * m01 + r11 * m11 + r12 * m21;
        this.getValues()[6] = r10 * m02 + r11 * m12 + r12 * m22;
        this.getValues()[7] = r10 * m03 + r11 * m13 + r12 * m23;
        this.getValues()[8] = r20 * m00 + r21 * m10 + r22 * m20;
        this.getValues()[9] = r20 * m01 + r21 * m11 + r22 * m21;
        this.getValues()[10] = r20 * m02 + r21 * m12 + r22 * m22;
        this.getValues()[11] = r20 * m03 + r21 * m13 + r22 * m23;
    }

    translate(v) {

        const v0 = v[0];
        const v1 = v[1];
        const v2 = v[2];
        const m00 = this.getValues()[0];
        const m01 = this.getValues()[1];
        const m02 = this.getValues()[2];
        const m03 = this.getValues()[3];
        const m10 = this.getValues()[1 * 4 + 0];
        const m11 = this.getValues()[1 * 4 + 1];
        const m12 = this.getValues()[1 * 4 + 2];
        const m13 = this.getValues()[1 * 4 + 3];
        const m20 = this.getValues()[2 * 4 + 0];
        const m21 = this.getValues()[2 * 4 + 1];
        const m22 = this.getValues()[2 * 4 + 2];
        const m23 = this.getValues()[2 * 4 + 3];
        const m30 = this.getValues()[3 * 4 + 0];
        const m31 = this.getValues()[3 * 4 + 1];
        const m32 = this.getValues()[3 * 4 + 2];
        const m33 = this.getValues()[3 * 4 + 3];

        this.getValues()[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
        this.getValues()[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
        this.getValues()[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
        this.getValues()[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;

        return this;
    }

    multiply(a, b) {

        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a03 = a[3];
        const a10 = a[4 + 0];
        const a11 = a[4 + 1];
        const a12 = a[4 + 2];
        const a13 = a[4 + 3];
        const a20 = a[8 + 0];
        const a21 = a[8 + 1];
        const a22 = a[8 + 2];
        const a23 = a[8 + 3];
        const a30 = a[12 + 0];
        const a31 = a[12 + 1];
        const a32 = a[12 + 2];
        const a33 = a[12 + 3];
        const b00 = b[0];
        const b01 = b[1];
        const b02 = b[2];
        const b03 = b[3];
        const b10 = b[4 + 0];
        const b11 = b[4 + 1];
        const b12 = b[4 + 2];
        const b13 = b[4 + 3];
        const b20 = b[8 + 0];
        const b21 = b[8 + 1];
        const b22 = b[8 + 2];
        const b23 = b[8 + 3];
        const b30 = b[12 + 0];
        const b31 = b[12 + 1];
        const b32 = b[12 + 2];
        const b33 = b[12 + 3];

        this.getValues()[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
        this.getValues()[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
        this.getValues()[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
        this.getValues()[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
        this.getValues()[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
        this.getValues()[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
        this.getValues()[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
        this.getValues()[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
        this.getValues()[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
        this.getValues()[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
        this.getValues()[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
        this.getValues()[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
        this.getValues()[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
        this.getValues()[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
        this.getValues()[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
        this.getValues()[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;

        return this;
    }
}