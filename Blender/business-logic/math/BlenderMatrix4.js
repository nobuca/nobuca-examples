
export default class BlenderMatrix4 {

    constructor() {
        this.values = new Float32Array(16);
    }

    getValues() {
        return this.values;
    }

    identity() {
        this.values[0] = 1; this.values[1] = 0; this.values[2] = 0; this.values[3] = 0;
        this.values[4] = 0; this.values[5] = 1; this.values[6] = 0; this.values[7] = 0;
        this.values[8] = 0; this.values[9] = 0; this.values[10] = 1; this.values[11] = 0;
        this.values[12] = 0; this.values[13] = 0; this.values[14] = 0; this.values[15] = 1;
        return this;
    }

    copyFrom(m) {

        this.values[0] = m.values[0];
        this.values[1] = m.values[1];
        this.values[2] = m.values[2];
        this.values[3] = m.values[3];
        this.values[4] = m.values[4];
        this.values[5] = m.values[5];
        this.values[6] = m.values[6];
        this.values[7] = m.values[7];
        this.values[8] = m.values[8];
        this.values[9] = m.values[9];
        this.values[10] = m.values[10];
        this.values[11] = m.values[11];
        this.values[12] = m.values[12];
        this.values[13] = m.values[13];
        this.values[14] = m.values[14];
        this.values[15] = m.values[15];

        return this;
    }

    perspective(fieldOfViewYInRadians, aspect, zNear, zFar) {

        const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);

        this.values[0] = f / aspect;
        this.values[1] = 0;
        this.values[2] = 0;
        this.values[3] = 0;

        this.values[4] = 0;
        this.values[5] = f;
        this.values[6] = 0;
        this.values[7] = 0;

        this.values[8] = 0;
        this.values[9] = 0;
        this.values[11] = -1;

        this.values[12] = 0;
        this.values[13] = 0;
        this.values[15] = 0;

        if (zFar === Infinity) {
            this.values[10] = -1;
            this.values[14] = -zNear;
        } else {
            const rangeInv = 1 / (zNear - zFar);
            this.values[10] = zFar * rangeInv;
            this.values[14] = zFar * zNear * rangeInv;
        }
        return this;
    }

    rotate(axis, angleInRadians) {

        let x = axis.values[0];
        let y = axis.values[1];
        let z = axis.values[2];
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

        const m00 = this.values[0];
        const m01 = this.values[1];
        const m02 = this.values[2];
        const m03 = this.values[3];
        const m10 = this.values[4];
        const m11 = this.values[5];
        const m12 = this.values[6];
        const m13 = this.values[7];
        const m20 = this.values[8];
        const m21 = this.values[9];
        const m22 = this.values[10];
        const m23 = this.values[11];

        this.values[0] = r00 * m00 + r01 * m10 + r02 * m20;
        this.values[1] = r00 * m01 + r01 * m11 + r02 * m21;
        this.values[2] = r00 * m02 + r01 * m12 + r02 * m22;
        this.values[3] = r00 * m03 + r01 * m13 + r02 * m23;
        this.values[4] = r10 * m00 + r11 * m10 + r12 * m20;
        this.values[5] = r10 * m01 + r11 * m11 + r12 * m21;
        this.values[6] = r10 * m02 + r11 * m12 + r12 * m22;
        this.values[7] = r10 * m03 + r11 * m13 + r12 * m23;
        this.values[8] = r20 * m00 + r21 * m10 + r22 * m20;
        this.values[9] = r20 * m01 + r21 * m11 + r22 * m21;
        this.values[10] = r20 * m02 + r21 * m12 + r22 * m22;
        this.values[11] = r20 * m03 + r21 * m13 + r22 * m23;
    }

    translate(x, y, z) {

        const v0 = x;
        const v1 = y;
        const v2 = z;
        const m00 = this.values[0];
        const m01 = this.values[1];
        const m02 = this.values[2];
        const m03 = this.values[3];
        const m10 = this.values[1 * 4 + 0];
        const m11 = this.values[1 * 4 + 1];
        const m12 = this.values[1 * 4 + 2];
        const m13 = this.values[1 * 4 + 3];
        const m20 = this.values[2 * 4 + 0];
        const m21 = this.values[2 * 4 + 1];
        const m22 = this.values[2 * 4 + 2];
        const m23 = this.values[2 * 4 + 3];
        const m30 = this.values[3 * 4 + 0];
        const m31 = this.values[3 * 4 + 1];
        const m32 = this.values[3 * 4 + 2];
        const m33 = this.values[3 * 4 + 3];

        this.values[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
        this.values[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
        this.values[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
        this.values[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;

        return this;
    }

    multiply(a, b) {

        const a00 = a.values[0];
        const a01 = a.values[1];
        const a02 = a.values[2];
        const a03 = a.values[3];
        const a10 = a.values[4 + 0];
        const a11 = a.values[4 + 1];
        const a12 = a.values[4 + 2];
        const a13 = a.values[4 + 3];
        const a20 = a.values[8 + 0];
        const a21 = a.values[8 + 1];
        const a22 = a.values[8 + 2];
        const a23 = a.values[8 + 3];
        const a30 = a.values[12 + 0];
        const a31 = a.values[12 + 1];
        const a32 = a.values[12 + 2];
        const a33 = a.values[12 + 3];
        const b00 = b.values[0];
        const b01 = b.values[1];
        const b02 = b.values[2];
        const b03 = b.values[3];
        const b10 = b.values[4 + 0];
        const b11 = b.values[4 + 1];
        const b12 = b.values[4 + 2];
        const b13 = b.values[4 + 3];
        const b20 = b.values[8 + 0];
        const b21 = b.values[8 + 1];
        const b22 = b.values[8 + 2];
        const b23 = b.values[8 + 3];
        const b30 = b.values[12 + 0];
        const b31 = b.values[12 + 1];
        const b32 = b.values[12 + 2];
        const b33 = b.values[12 + 3];

        this.values[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
        this.values[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
        this.values[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
        this.values[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
        this.values[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
        this.values[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
        this.values[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
        this.values[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
        this.values[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
        this.values[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
        this.values[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
        this.values[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
        this.values[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
        this.values[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
        this.values[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
        this.values[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;

        return this;
    }

    rotation(axis, angleInRadians) {

        let x = axis.values[0];
        let y = axis.values[1];
        let z = axis.values[2];
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

        this.values[0] = xx + (1 - xx) * c;
        this.values[1] = x * y * oneMinusCosine + z * s;
        this.values[2] = x * z * oneMinusCosine - y * s;
        this.values[3] = 0;
        this.values[4] = x * y * oneMinusCosine - z * s;
        this.values[5] = yy + (1 - yy) * c;
        this.values[6] = y * z * oneMinusCosine + x * s;
        this.values[7] = 0;
        this.values[8] = x * z * oneMinusCosine + y * s;
        this.values[9] = y * z * oneMinusCosine - x * s;
        this.values[10] = zz + (1 - zz) * c;
        this.values[11] = 0;
        this.values[12] = 0;
        this.values[13] = 0;
        this.values[14] = 0;
        this.values[15] = 1;

        return this;
    }

    invert() {

        const m00 = this.values[0 * 4 + 0];
        const m01 = this.values[0 * 4 + 1];
        const m02 = this.values[0 * 4 + 2];
        const m03 = this.values[0 * 4 + 3];
        const m10 = this.values[1 * 4 + 0];
        const m11 = this.values[1 * 4 + 1];
        const m12 = this.values[1 * 4 + 2];
        const m13 = this.values[1 * 4 + 3];
        const m20 = this.values[2 * 4 + 0];
        const m21 = this.values[2 * 4 + 1];
        const m22 = this.values[2 * 4 + 2];
        const m23 = this.values[2 * 4 + 3];
        const m30 = this.values[3 * 4 + 0];
        const m31 = this.values[3 * 4 + 1];
        const m32 = this.values[3 * 4 + 2];
        const m33 = this.values[3 * 4 + 3];
        const tmp0 = m22 * m33;
        const tmp1 = m32 * m23;
        const tmp2 = m12 * m33;
        const tmp3 = m32 * m13;
        const tmp4 = m12 * m23;
        const tmp5 = m22 * m13;
        const tmp6 = m02 * m33;
        const tmp7 = m32 * m03;
        const tmp8 = m02 * m23;
        const tmp9 = m22 * m03;
        const tmp10 = m02 * m13;
        const tmp11 = m12 * m03;
        const tmp12 = m20 * m31;
        const tmp13 = m30 * m21;
        const tmp14 = m10 * m31;
        const tmp15 = m30 * m11;
        const tmp16 = m10 * m21;
        const tmp17 = m20 * m11;
        const tmp18 = m00 * m31;
        const tmp19 = m30 * m01;
        const tmp20 = m00 * m21;
        const tmp21 = m20 * m01;
        const tmp22 = m00 * m11;
        const tmp23 = m10 * m01;

        const t0 = (tmp0 * m11 + tmp3 * m21 + tmp4 * m31) -
            (tmp1 * m11 + tmp2 * m21 + tmp5 * m31);
        const t1 = (tmp1 * m01 + tmp6 * m21 + tmp9 * m31) -
            (tmp0 * m01 + tmp7 * m21 + tmp8 * m31);
        const t2 = (tmp2 * m01 + tmp7 * m11 + tmp10 * m31) -
            (tmp3 * m01 + tmp6 * m11 + tmp11 * m31);
        const t3 = (tmp5 * m01 + tmp8 * m11 + tmp11 * m21) -
            (tmp4 * m01 + tmp9 * m11 + tmp10 * m21);

        const d = 1 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

        this.values[0] = d * t0;
        this.values[1] = d * t1;
        this.values[2] = d * t2;
        this.values[3] = d * t3;
        this.values[4] = d * ((tmp1 * m10 + tmp2 * m20 + tmp5 * m30) -
            (tmp0 * m10 + tmp3 * m20 + tmp4 * m30));
        this.values[5] = d * ((tmp0 * m00 + tmp7 * m20 + tmp8 * m30) -
            (tmp1 * m00 + tmp6 * m20 + tmp9 * m30));
        this.values[6] = d * ((tmp3 * m00 + tmp6 * m10 + tmp11 * m30) -
            (tmp2 * m00 + tmp7 * m10 + tmp10 * m30));
        this.values[7] = d * ((tmp4 * m00 + tmp9 * m10 + tmp10 * m20) -
            (tmp5 * m00 + tmp8 * m10 + tmp11 * m20));
        this.values[8] = d * ((tmp12 * m13 + tmp15 * m23 + tmp16 * m33) -
            (tmp13 * m13 + tmp14 * m23 + tmp17 * m33));
        this.values[9] = d * ((tmp13 * m03 + tmp18 * m23 + tmp21 * m33) -
            (tmp12 * m03 + tmp19 * m23 + tmp20 * m33));
        this.values[10] = d * ((tmp14 * m03 + tmp19 * m13 + tmp22 * m33) -
            (tmp15 * m03 + tmp18 * m13 + tmp23 * m33));
        this.values[11] = d * ((tmp17 * m03 + tmp20 * m13 + tmp23 * m23) -
            (tmp16 * m03 + tmp21 * m13 + tmp22 * m23));
        this.values[12] = d * ((tmp14 * m22 + tmp17 * m32 + tmp13 * m12) -
            (tmp16 * m32 + tmp12 * m12 + tmp15 * m22));
        this.values[13] = d * ((tmp20 * m32 + tmp12 * m02 + tmp19 * m22) -
            (tmp18 * m22 + tmp21 * m32 + tmp13 * m02));
        this.values[14] = d * ((tmp18 * m12 + tmp23 * m32 + tmp15 * m02) -
            (tmp22 * m32 + tmp14 * m02 + tmp19 * m12));
        this.values[15] = d * ((tmp22 * m22 + tmp16 * m02 + tmp21 * m12) -
            (tmp20 * m12 + tmp23 * m22 + tmp17 * m02));

        return this;
    }

    transpose() {

        let t;

        t = this.values[1];
        this.values[1] = this.values[4];
        this.values[4] = t;

        t = this.values[2];
        this.values[2] = this.values[8];
        this.values[8] = t;

        t = this.values[3];
        this.values[3] = this.values[12];
        this.values[12] = t;

        t = this.values[6];
        this.values[6] = this.values[9];
        this.values[9] = t;

        t = this.values[7];
        this.values[7] = this.values[13];
        this.values[13] = t;

        t = this.values[11];
        this.values[11] = this.values[14];
        this.values[14] = t;

        return this;
    }

}