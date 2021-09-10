const Pi1 = Math.PI;
const E1 = Math.E;
const Epsilon1 = 0.0000000000000002220446049250313;
function range1(begin, end, step = 1) {
    let len = Math.floor((end - begin) / step);
    let a = new Array(len);
    let i = 0;
    for(let t = begin; t < end; t += step){
        a[i++] = t;
    }
    return a;
}
let steps1 = range1;
function near1(a, b, delta = 0.001) {
    return Math.abs(a - b) < delta;
}
function clone1(o) {
    if (null == o || "object" != typeof o) return o;
    if (o.constructor != Object && o.clone != null) return o.clone();
    let r = JSON.parse(JSON.stringify(o));
    if (o.constructor == Object) {
        for(var attr in o){
            if (typeof o[attr] === 'function' && o.hasOwnProperty(attr)) r[attr] = o[attr];
        }
    }
    return r;
}
function __int(x) {
    return Number.isInteger(x);
}
function be1(cond, ...args) {
    if (!cond) {
        throw Error(args.toString());
    }
}
function random1(min = 0, max = 1) {
    return min + Math.random() * (max - min);
}
function randomInt1(min, max) {
    return Math.floor(random1(min, max));
}
function randomChoose1(a) {
    return a[randomInt1(0, a.length)];
}
function map11(a, f) {
    if (a instanceof Array) {
        var fa = new Array(a.length);
        for(var i = 0; i < a.length; i++){
            fa[i] = map11(a[i], f);
        }
        return fa;
    } else {
        return f(a);
    }
}
function map21(a, b, f) {
    if (a instanceof Array) {
        var fa = new Array(a.length);
        var isArrayB = b instanceof Array;
        for(var i = 0; i < a.length; i++){
            var bi = isArrayB ? b[i] : b;
            fa[i] = map21(a[i], bi, f);
        }
        return fa;
    } else {
        return f(a, b);
    }
}
function reduce1(a, f, init) {
    var result = init;
    if (a instanceof Array) {
        for(var i in a){
            result = f(result, reduce1(a[i], f, init));
        }
    } else {
        result = f(result, a);
    }
    return result;
}
export { Pi1 as Pi };
export { E1 as E };
export { Epsilon1 as Epsilon };
export { range1 as range };
export { steps1 as steps };
export { near1 as near };
export { clone1 as clone };
export { __int as int };
export { be1 as be };
export { random1 as random };
export { randomInt1 as randomInt };
export { randomChoose1 as randomChoose };
export { map11 as map1 };
export { map21 as map2 };
export { reduce1 as reduce };
const mod = function() {
    return {
        Pi: Pi1,
        E: E1,
        Epsilon: 0.0000000000000002220446049250313,
        range: range1,
        steps: steps1,
        near: near1,
        clone: clone1,
        int: __int,
        be: be1,
        random: random1,
        randomInt: randomInt1,
        randomChoose: randomChoose1,
        map1: map11,
        map2: map21,
        reduce: reduce1
    };
}();
function array1(n, value = 0) {
    if (n <= 0) n = 1;
    let a = new Array(n);
    return a.fill(value);
}
function repeats1(n, f) {
    let r = new Array(n);
    for(let i = 0; i < n; i++){
        r[i] = f();
    }
    return r;
}
function last1(a) {
    return a[a.length - 1];
}
function push1(a, o) {
    a.push(o);
}
function pop1(a) {
    return a.unshift();
}
function enqueue1(a, o) {
    a.unshift(o);
}
function dequeue1(a) {
    return a.unshift();
}
export { array1 as array };
export { repeats1 as repeats };
export { last1 as last };
export { push1 as push };
export { pop1 as pop };
export { enqueue1 as enqueue };
export { dequeue1 as dequeue };
class Complex1 {
    a;
    b;
    constructor(a, b){
        this.a = a;
        this.b = b;
    }
    conj() {
        return new Complex1(this.a, -1 * this.b);
    }
    add(c2) {
        return new Complex1(this.a + c2.a, this.b + c2.b);
    }
    sub(c2) {
        return new Complex1(this.a - c2.a, this.b - c2.b);
    }
    mul(c2) {
        var a1 = this.a, b1 = this.b, c = c2.a, d = c2.b;
        return new Complex1(a1 * c - b1 * d, a1 * d + b1 * c);
    }
    div(c2) {
        var a2 = this.a, b2 = this.b, c = c2.a, d = c2.b;
        return new Complex1((a2 * c + b2 * d) / (c * c + d * d), (b2 * c - a2 * d) / (c * c + d * d));
    }
    toString() {
        return this.a + '+' + this.b + 'i';
    }
    ln() {
        var a3 = this.a, b3 = this.b, r = a3 * a3 + b3 * b3;
        var w = 1 / 2 * Math.log(r);
        var x = Math.acos(a3 / Math.sqrt(r));
        return new Complex1(w, x);
    }
    exp() {
        var a4 = this.a, b4 = this.b;
        var r = Math.exp(a4);
        return new Complex1(r * Math.cos(b4), r * Math.sin(b4));
    }
    static expi(x) {
        return new Complex1(Math.cos(x), Math.sin(x));
    }
}
function parseComplex1(s) {
    try {
        var m = s.match(/^([^\+]*)(\+([\d\.]*)i)?$/);
        var a5 = parseFloat(m[1]);
        var b5 = typeof m[3] === 'undefined' ? 0 : parseFloat(m[3]);
        return new Complex1(a5, b5);
    } catch (e) {
        throw new Error(`Complex:parse($s) error!`);
    }
}
function parseComplexList1(s) {
    let items = s.split(",");
    let list = [];
    for (let item of items){
        list.push(parseComplex1(item));
    }
    return list;
}
export { Complex1 as Complex };
export { parseComplex1 as parseComplex };
export { parseComplexList1 as parseComplexList };
const e = new Complex1(Math.E, 0);
const i = new Complex1(0, 1);
function DFT1(f) {
    let N = f.length;
    let F = [];
    for(let n = 0; n < N; n++)F[n] = new Complex1(0, 0);
    for(let x = 0; x < N; x++){
        for(let n1 = 0; n1 < N; n1++){
            let eix = Complex1.expi(-2 * Math.PI * x / N * n1);
            let fexp = f[x].mul(eix);
            F[n1] = F[n1].add(fexp);
        }
    }
    return F;
}
function iDFT1(F) {
    let N = F.length;
    let f = [];
    for(let x = 0; x < N; x++)f[x] = new Complex1(0, 0);
    for(let n = 0; n < N; n++){
        for(let x1 = 0; x1 < N; x1++){
            let eix = Complex1.expi(2 * Math.PI * x1 / N * n);
            let Fexp = F[n].mul(eix);
            Fexp.a /= N;
            Fexp.b /= N;
            f[x1] = f[x1].add(Fexp);
        }
    }
    return f;
}
export { DFT1 as DFT };
export { iDFT1 as iDFT };
function vector(n, value = 0) {
    let a5 = new Array(n);
    return a5.fill(value);
}
function near2(a5, b5, delta = 0.001) {
    if (a5.length != b5.length) return false;
    let len = a5.length;
    for(var i1 = 0; i1 < len; i1++){
        if (Math.abs(a5[i1] - b5[i1]) > delta) return false;
    }
    return true;
}
function op2(op) {
    let text = `
  var ai, bi, i, c
  let aA = Array.isArray(a)
  let bA = Array.isArray(b)
  let len = a.length || b.length
  if (aA && bA) {
    c = new Array(len)
    for (let i=0; i<len; i++) {
      ai=a[i]
      bi=b[i]
      c[i] = ${op}
    }
    return c
  }
  if (!aA && !bA) { ai=a; bi=b; return ${op} }
  c = new Array(len)
  for (let i=0; i<len; i++) {
    ai=(aA) ? a[i] : a
    bi=(bA) ? b[i] : b
    c[i] = ${op}
  }
  return c
  `;
    return new Function('a', 'b', text);
}
const mod1 = op2('ai%bi');
const dot = function(a5, b5) {
    let len = a5.length;
    let r = 0;
    for(let i1 = 0; i1 < len; i1++){
        r += a5[i1] * b5[i1];
    }
    return r;
};
const min = function(a5) {
    let len = a5.length, r = a5[0];
    for(let i1 = 1; i1 < len; i1++){
        if (a5[i1] < r) r = a5[i1];
    }
    return r;
};
const max = function(a5) {
    let len = a5.length, r = a5[0];
    for(let i1 = 1; i1 < len; i1++){
        if (a5[i1] > r) r = a5[i1];
    }
    return r;
};
const sum = function(a5) {
    let len = a5.length;
    let r = 0;
    for(let i1 = 0; i1 < len; i1++){
        r += a5[i1];
    }
    return r;
};
function matrix(rows, cols) {
    let r = new Array(rows);
    for(let i1 = 0; i1 < rows; i1++){
        r[i1] = vector(cols, 0);
    }
    return r;
}
function flatten(m) {
    let rows = m.length, cols = m[0].length;
    let r = new Array();
    for(let i1 = 0; i1 < rows; i1++){
        for(let j = 0; j < cols; j++)r[i1 * cols + j] = m[i1][j];
    }
    return r;
}
function identity(n) {
    let v = vector(n, 1);
    return diag(v);
}
function diag(v) {
    let rows = v.length;
    let r = matrix(rows, rows);
    for(let i1 = 0; i1 < rows; i1++){
        r[i1][i1] = v[i1];
    }
    return r;
}
function transpose(m) {
    let r = [];
    let rows = m.length;
    let cols = m[0].length;
    for(let j = 0; j < cols; j++){
        let rj = r[j] = [];
        for(let i1 = 0; i1 < rows; i1++){
            rj[i1] = m[i1][j];
        }
    }
    return r;
}
let tr = transpose;
function dot1(a5, b5) {
    let arows = a5.length;
    let bcols = b5[0].length;
    let r = [];
    let bt = tr(b5);
    for(let i1 = 0; i1 < arows; i1++){
        let ri = r[i1] = [];
        for(let j = 0; j < bcols; j++){
            ri.push(dot(a5[i1], bt[j]));
        }
    }
    return r;
}
function inv(m0) {
    let m = m0.length, n = m0[0].length, abs = Math.abs;
    let A = clone1(m0), Ai, Aj;
    let I = identity(m), Ii, Ij;
    let i1, j, k, x, i0, v0;
    for(j = 0; j < n; ++j){
        i0 = -1;
        v0 = -1;
        for(i1 = j; i1 !== m; ++i1){
            k = abs(A[i1][j]);
            if (k > v0) {
                i0 = i1;
                v0 = k;
            }
        }
        Aj = A[i0];
        A[i0] = A[j];
        A[j] = Aj;
        Ij = I[i0];
        I[i0] = I[j];
        I[j] = Ij;
        x = Aj[j];
        for(k = j; k !== n; ++k)Aj[k] /= x;
        for(k = n - 1; k !== -1; --k)Ij[k] /= x;
        for(i1 = m - 1; i1 !== -1; --i1){
            if (i1 !== j) {
                Ai = A[i1];
                Ii = I[i1];
                x = Ai[j];
                for(k = j + 1; k !== n; ++k)Ai[k] -= Aj[k] * x;
                for(k = n - 1; k > 0; --k){
                    Ii[k] -= Ij[k] * x;
                    --k;
                    Ii[k] -= Ij[k] * x;
                }
                if (k === 0) Ii[0] -= Ij[0] * x;
            }
        }
    }
    return I;
}
function det(x) {
    let abs = Math.abs;
    if (x.length !== x[0].length) {
        throw new Error('numeric: det() only works on square matrices');
    }
    let n = x.length, ret = 1, i1, j, k, A = clone1(x), Aj, Ai, alpha, temp, k1;
    for(j = 0; j < n - 1; j++){
        k = j;
        for(i1 = j + 1; i1 < n; i1++){
            if (abs(A[i1][j]) > abs(A[k][j])) {
                k = i1;
            }
        }
        if (k !== j) {
            temp = A[k];
            A[k] = A[j];
            A[j] = temp;
            ret *= -1;
        }
        Aj = A[j];
        for(i1 = j + 1; i1 < n; i1++){
            Ai = A[i1];
            alpha = Ai[j] / Aj[j];
            for(k = j + 1; k < n - 1; k += 2){
                k1 = k + 1;
                Ai[k] -= Aj[k] * alpha;
                Ai[k1] -= Aj[k1] * alpha;
            }
            if (k !== n) {
                Ai[k] -= Aj[k] * alpha;
            }
        }
        if (Aj[j] === 0) {
            return 0;
        }
        ret *= Aj[j];
    }
    return ret * A[j][j];
}
function lu(A) {
    var abs = Math.abs;
    var i1, j, k, absAjk, Akk, Ak, Pk, Ai;
    var max1;
    var n = A.length, n1 = n - 1;
    var P = new Array(n);
    A = clone1(A);
    for(k = 0; k < n; ++k){
        Pk = k;
        Ak = A[k];
        max1 = abs(Ak[k]);
        for(j = k + 1; j < n; ++j){
            absAjk = abs(A[j][k]);
            if (max1 < absAjk) {
                max1 = absAjk;
                Pk = j;
            }
        }
        P[k] = Pk;
        if (Pk != k) {
            A[k] = A[Pk];
            A[Pk] = Ak;
            Ak = A[k];
        }
        Akk = Ak[k];
        for(i1 = k + 1; i1 < n; ++i1){
            A[i1][k] /= Akk;
        }
        for(i1 = k + 1; i1 < n; ++i1){
            Ai = A[i1];
            for(j = k + 1; j < n1; ++j){
                Ai[j] -= Ai[k] * Ak[j];
                ++j;
                Ai[j] -= Ai[k] * Ak[j];
            }
            if (j === n1) Ai[j] -= Ai[k] * Ak[j];
        }
    }
    return {
        LU: A,
        P: P
    };
}
function luSolve(LUP, b5) {
    var i1, j;
    var LU = LUP.LU;
    var n = LU.length;
    var x = clone1(b5);
    var P = LUP.P;
    var Pi2, LUi, LUii, tmp;
    for(i1 = n - 1; i1 !== -1; --i1)x[i1] = b5[i1];
    for(i1 = 0; i1 < n; ++i1){
        Pi2 = P[i1];
        if (P[i1] !== i1) {
            tmp = x[i1];
            x[i1] = x[Pi2];
            x[Pi2] = tmp;
        }
        LUi = LU[i1];
        for(j = 0; j < i1; ++j){
            x[i1] -= x[j] * LUi[j];
        }
    }
    for(i1 = n - 1; i1 >= 0; --i1){
        LUi = LU[i1];
        for(j = i1 + 1; j < n; ++j){
            x[i1] -= x[j] * LUi[j];
        }
        x[i1] /= LUi[i1];
    }
    return x;
}
function solve(A, b5) {
    return luSolve(lu(A), b5);
}
function svd(A) {
    var temp;
    var prec = 0.0000000000000002220446049250313;
    var tolerance = 0.0000000000000000000000000000000000000000000000000000000000000001 / prec;
    var itmax = 50;
    var c = 0;
    var i1 = 0;
    var j = 0;
    var k = 0;
    var l = 0;
    var u = clone1(A);
    var m = u.length;
    var n = u[0].length;
    if (m < n) throw "Need more rows than columns";
    var e1 = new Array(n);
    var q = new Array(n);
    for(i1 = 0; i1 < n; i1++)e1[i1] = q[i1] = 0;
    var v = matrix(n, n);
    function pythag(a5, b5) {
        a5 = Math.abs(a5);
        b5 = Math.abs(b5);
        if (a5 > b5) return a5 * Math.sqrt(1 + b5 * b5 / a5 / a5);
        else if (b5 == 0) return a5;
        return b5 * Math.sqrt(1 + a5 * a5 / b5 / b5);
    }
    var f = 0;
    var g = 0;
    var h = 0;
    var x = 0;
    var y = 0;
    var z = 0;
    var s = 0;
    for(i1 = 0; i1 < n; i1++){
        e1[i1] = g;
        s = 0;
        l = i1 + 1;
        for(j = i1; j < m; j++)s += u[j][i1] * u[j][i1];
        if (s <= tolerance) g = 0;
        else {
            f = u[i1][i1];
            g = Math.sqrt(s);
            if (f >= 0) g = -g;
            h = f * g - s;
            u[i1][i1] = f - g;
            for(j = l; j < n; j++){
                s = 0;
                for(k = i1; k < m; k++)s += u[k][i1] * u[k][j];
                f = s / h;
                for(k = i1; k < m; k++)u[k][j] += f * u[k][i1];
            }
        }
        q[i1] = g;
        s = 0;
        for(j = l; j < n; j++)s = s + u[i1][j] * u[i1][j];
        if (s <= tolerance) g = 0;
        else {
            f = u[i1][i1 + 1];
            g = Math.sqrt(s);
            if (f >= 0) g = -g;
            h = f * g - s;
            u[i1][i1 + 1] = f - g;
            for(j = l; j < n; j++)e1[j] = u[i1][j] / h;
            for(j = l; j < m; j++){
                s = 0;
                for(k = l; k < n; k++)s += u[j][k] * u[i1][k];
                for(k = l; k < n; k++)u[j][k] += s * e1[k];
            }
        }
        y = Math.abs(q[i1]) + Math.abs(e1[i1]);
        if (y > x) x = y;
    }
    for(i1 = n - 1; i1 != -1; i1 += -1){
        if (g != 0) {
            h = g * u[i1][i1 + 1];
            for(j = l; j < n; j++)v[j][i1] = u[i1][j] / h;
            for(j = l; j < n; j++){
                s = 0;
                for(k = l; k < n; k++)s += u[i1][k] * v[k][j];
                for(k = l; k < n; k++)v[k][j] += s * v[k][i1];
            }
        }
        for(j = l; j < n; j++){
            v[i1][j] = 0;
            v[j][i1] = 0;
        }
        v[i1][i1] = 1;
        g = e1[i1];
        l = i1;
    }
    for(i1 = n - 1; i1 != -1; i1 += -1){
        l = i1 + 1;
        g = q[i1];
        for(j = l; j < n; j++)u[i1][j] = 0;
        if (g != 0) {
            h = u[i1][i1] * g;
            for(j = l; j < n; j++){
                s = 0;
                for(k = l; k < m; k++)s += u[k][i1] * u[k][j];
                f = s / h;
                for(k = i1; k < m; k++)u[k][j] += f * u[k][i1];
            }
            for(j = i1; j < m; j++)u[j][i1] = u[j][i1] / g;
        } else for(j = i1; j < m; j++)u[j][i1] = 0;
        u[i1][i1] += 1;
    }
    prec = prec * x;
    for(k = n - 1; k != -1; k += -1){
        for(var iteration = 0; iteration < itmax; iteration++){
            var test_convergence = false;
            for(l = k; l != -1; l += -1){
                if (Math.abs(e1[l]) <= prec) {
                    test_convergence = true;
                    break;
                }
                if (Math.abs(q[l - 1]) <= prec) break;
            }
            if (!test_convergence) {
                c = 0;
                s = 1;
                var l1 = l - 1;
                for(i1 = l; i1 < k + 1; i1++){
                    f = s * e1[i1];
                    e1[i1] = c * e1[i1];
                    if (Math.abs(f) <= prec) break;
                    g = q[i1];
                    h = pythag(f, g);
                    q[i1] = h;
                    c = g / h;
                    s = -f / h;
                    for(j = 0; j < m; j++){
                        y = u[j][l1];
                        z = u[j][i1];
                        u[j][l1] = y * c + z * s;
                        u[j][i1] = -y * s + z * c;
                    }
                }
            }
            z = q[k];
            if (l == k) {
                if (z < 0) {
                    q[k] = -z;
                    for(j = 0; j < n; j++)v[j][k] = -v[j][k];
                }
                break;
            }
            if (iteration >= itmax - 1) throw 'Error: no convergence.';
            x = q[l];
            y = q[k - 1];
            g = e1[k - 1];
            h = e1[k];
            f = ((y - z) * (y + z) + (g - h) * (g + h)) / (2 * h * y);
            g = pythag(f, 1);
            if (f < 0) f = ((x - z) * (x + z) + h * (y / (f - g) - h)) / x;
            else f = ((x - z) * (x + z) + h * (y / (f + g) - h)) / x;
            c = 1;
            s = 1;
            for(i1 = l + 1; i1 < k + 1; i1++){
                g = e1[i1];
                y = q[i1];
                h = s * g;
                g = c * g;
                z = pythag(f, h);
                e1[i1 - 1] = z;
                c = f / z;
                s = h / z;
                f = x * c + g * s;
                g = -x * s + g * c;
                h = y * s;
                y = y * c;
                for(j = 0; j < n; j++){
                    x = v[j][i1 - 1];
                    z = v[j][i1];
                    v[j][i1 - 1] = x * c + z * s;
                    v[j][i1] = -x * s + z * c;
                }
                z = pythag(f, h);
                q[i1 - 1] = z;
                c = f / z;
                s = h / z;
                f = c * g + s * y;
                x = -s * g + c * y;
                for(j = 0; j < m; j++){
                    y = u[j][i1 - 1];
                    z = u[j][i1];
                    u[j][i1 - 1] = y * c + z * s;
                    u[j][i1] = -y * s + z * c;
                }
            }
            e1[l] = 0;
            e1[k] = f;
            q[k] = x;
        }
    }
    for(i1 = 0; i1 < q.length; i1++)if (q[i1] < prec) q[i1] = 0;
    for(i1 = 0; i1 < n; i1++){
        for(j = i1 - 1; j >= 0; j--){
            if (q[j] < q[i1]) {
                c = q[j];
                q[j] = q[i1];
                q[i1] = c;
                for(k = 0; k < u.length; k++){
                    temp = u[k][i1];
                    u[k][i1] = u[k][j];
                    u[k][j] = temp;
                }
                for(k = 0; k < v.length; k++){
                    temp = v[k][i1];
                    v[k][i1] = v[k][j];
                    v[k][j] = temp;
                }
                i1 = j;
            }
        }
    }
    return {
        U: u,
        S: q,
        V: v
    };
}
const mod2 = function() {
    return {
        matrix: matrix,
        flatten: flatten,
        identity: identity,
        diag: diag,
        transpose: transpose,
        tr: tr,
        dot: dot1,
        inv: inv,
        det: det,
        lu: lu,
        luSolve: luSolve,
        solve: solve,
        svd: svd
    };
}();
function diffn1(f, n, x, h = 0.01) {
    be1(n >= 0);
    if (n === 0) return f(x);
    h = h / 2;
    return (diffn1(f, n - 1, x + h) - diffn1(f, n - 1, x - h)) / (2 * h);
}
function diff1(f, x, h = 0.01) {
    return diffn1(f, 1, x, h);
}
function integral1(f, a5, b5, h = 0.01) {
    var area = 0;
    for(var x = a5; x < b5; x = x + h){
        area = area + f(x) * h;
    }
    return area;
}
function pdiffn1(f, i1, n, v, h = 0.01) {
    if (n === 0) return f(v);
    h = h / 2;
    let v1 = v.slice(0);
    v1[i1] += h;
    let v_1 = v.slice(0);
    v_1[i1] -= h;
    return (pdiffn1(f, i1, n - 1, v1) - pdiffn1(f, i1, n - 1, v_1)) / (2 * h);
}
function pdiff1(f, i1, v, h = 0.01) {
    return pdiffn1(f, i1, 1, v, h);
}
function grad1(f, v, h = 0.01) {
    let len = v.length;
    let g = new Array(len);
    for(let i1 = 0; i1 < len; i1++){
        g[i1] = pdiff1(f, i1, v);
    }
    return g;
}
function divergence1(fv, v) {
    let len = v.length, d = new Array(len);
    for(var i1 = 0; i1 < len; i1++){
        d[i1] = pdiff1(fv[i1], i1, v);
    }
    return sum(d);
}
function is3D1(fv, v) {
    if (fv.length !== 3 || v.length !== 3) throw Error('curl(fv, v): dimension should be 3');
}
function curl1(fv, v) {
    is3D1(fv, v);
    let pf = (i1, j, v1)=>pdiff1(fv[i1], j, v1)
    ;
    return [
        pf(2, 1, v) - pf(1, 2, v),
        pf(0, 2, v) - pf(2, 0, v),
        pf(1, 0, v) - pf(0, 1, v)
    ];
}
function laplaceOperator1(f, v) {
    let len = v.length, df2 = new Array(len);
    for(let i1 = 0; i1 < len; i1++){
        df2[i1] = pdiffn1(f, i1, 2, v);
    }
    return sum(df2);
}
function jocobian1(fv, v) {
    let len = fv.length;
    let J = matrix(len, len);
    for(let i1 = 0; i1 < len; i1++){
        for(let j = 0; j < len; j++){
            J[i1][j] = pdiff1(fv[i1], j, v);
        }
    }
    return J;
}
function theoremDivGradEqLaplace1(f, v) {
    let len = v.length;
    let divGrad = divergence1(grad1(f, v), v);
    let laplace = laplaceOperator1(f, v);
    console.log('div(grad(f,v))=', divGrad, ' laplace=', laplace);
    near1(divGrad, laplace);
}
function theoremCurlGradZero1(f, v) {
    let len = v.length;
    let r = curl1(grad1(f, v), v);
    console.log('curl(grad(f,v))=', r);
    near2(r, vector(len, 0));
}
export { diffn1 as diffn };
export { diff1 as diff };
export { integral1 as integral };
export { pdiffn1 as pdiffn };
export { pdiff1 as pdiff };
export { grad1 as grad };
export { divergence1 as divergence };
export { is3D1 as is3D };
export { curl1 as curl };
export { laplaceOperator1 as laplaceOperator };
export { jocobian1 as jocobian };
export { theoremDivGradEqLaplace1 as theoremDivGradEqLaplace };
export { theoremCurlGradZero1 as theoremCurlGradZero };
function gammaln1(x) {
    var j = 0;
    var cof = [
        76.18009172947146,
        -86.50532032941678,
        24.01409824083091,
        -1.231739572450155,
        0.001208650973866179,
        -0.000005395239384953
    ];
    var ser = 1.000000000190015;
    var xx, y, tmp;
    tmp = (y = xx = x) + 5.5;
    tmp -= (xx + 0.5) * Math.log(tmp);
    for(; j < 6; j++)ser += cof[j] / ++y;
    return Math.log(2.5066282746310007 * ser / xx) - tmp;
}
function gammafn1(x) {
    var p = [
        -1.716185138865495,
        24.76565080557592,
        -379.80425647094563,
        629.3311553128184,
        866.9662027904133,
        -31451.272968848367,
        -36144.413418691176,
        66456.14382024054
    ];
    var q = [
        -30.8402300119739,
        315.35062697960416,
        -1015.1563674902192,
        -3107.771671572311,
        22538.11842098015,
        4755.846277527881,
        -134659.9598649693,
        -115132.2596755535
    ];
    var fact = 0;
    var n = 0;
    var xden = 0;
    var xnum = 0;
    var y = x;
    var i1, z, yi, res, sum1, ysq;
    if (y <= 0) {
        res = y % 1 + 0.00000000000000036;
        if (res) {
            fact = (!(y & 1) ? 1 : -1) * Math.PI / Math.sin(Math.PI * res);
            y = 1 - y;
        } else {
            return Infinity;
        }
    }
    yi = y;
    if (y < 1) {
        z = y++;
    } else {
        z = (y -= n = (y | 0) - 1) - 1;
    }
    for(let i2 = 0; i2 < 8; ++i2){
        xnum = (xnum + p[i2]) * z;
        xden = xden * z + q[i2];
    }
    res = xnum / xden + 1;
    if (yi < y) {
        res /= yi;
    } else if (yi > y) {
        for(let i3 = 0; i3 < n; ++i3){
            res *= y;
            y++;
        }
    }
    if (fact) {
        res = fact / res;
    }
    return res;
}
function gammap1(a5, x) {
    return lowRegGamma1(a5, x) * gammafn1(a5);
}
function lowRegGamma1(a5, x) {
    var aln = gammaln1(a5);
    var ap = a5;
    var sum1 = 1 / a5;
    var del = sum1;
    var b5 = x + 1 - a5;
    var c = 1 / 0.000000000000000000000000000001;
    var d = 1 / b5;
    var h = d;
    var i1 = 1;
    var ITMAX = -~(Math.log(a5 >= 1 ? a5 : 1 / a5) * 8.5 + a5 * 0.4 + 17);
    var an, endval;
    if (x < 0 || a5 <= 0) {
        return NaN;
    } else if (x < a5 + 1) {
        for(; i1 <= ITMAX; i1++){
            sum1 += del *= x / ++ap;
        }
        return sum1 * Math.exp(-x + a5 * Math.log(x) - aln);
    }
    for(; i1 <= ITMAX; i1++){
        an = -i1 * (i1 - a5);
        b5 += 2;
        d = an * d + b5;
        c = b5 + an / c;
        d = 1 / d;
        h *= d * c;
    }
    return 1 - h * Math.exp(-x + a5 * Math.log(x) - aln);
}
function factorialln1(n) {
    return n < 0 ? NaN : gammaln1(n + 1);
}
function factorial1(n) {
    return n < 0 ? NaN : gammafn1(n + 1);
}
function combination1(n, m) {
    return n > 170 || m > 170 ? Math.exp(combinationln1(n, m)) : factorial1(n) / factorial1(m) / factorial1(n - m);
}
function combinationln1(n, m) {
    return factorialln1(n) - factorialln1(m) - factorialln1(n - m);
}
function permutation1(n, m) {
    return factorial1(n) / factorial1(n - m);
}
function betafn1(x, y) {
    if (x <= 0 || y <= 0) throw Error(`betafn: should be (x>0,y>0), but x=${x} y=${y}`);
    return x + y > 170 ? Math.exp(betaln1(x, y)) : gammafn1(x) * gammafn1(y) / gammafn1(x + y);
}
function betaln1(x, y) {
    return gammaln1(x) + gammaln1(y) - gammaln1(x + y);
}
function betacf1(x, a5, b5) {
    var fpmin = 0.000000000000000000000000000001;
    var m = 1;
    var qab = a5 + b5;
    var qap = a5 + 1;
    var qam = a5 - 1;
    var c = 1;
    var d = 1 - qab * x / qap;
    var m2, aa, del, h;
    if (Math.abs(d) < fpmin) d = fpmin;
    d = 1 / d;
    h = d;
    for(; m <= 100; m++){
        m2 = 2 * m;
        aa = m * (b5 - m) * x / ((qam + m2) * (a5 + m2));
        d = 1 + aa * d;
        if (Math.abs(d) < fpmin) d = fpmin;
        c = 1 + aa / c;
        if (Math.abs(c) < fpmin) c = fpmin;
        d = 1 / d;
        h *= d * c;
        aa = -(a5 + m) * (qab + m) * x / ((a5 + m2) * (qap + m2));
        d = 1 + aa * d;
        if (Math.abs(d) < fpmin) d = fpmin;
        c = 1 + aa / c;
        if (Math.abs(c) < fpmin) c = fpmin;
        d = 1 / d;
        del = d * c;
        h *= del;
        if (Math.abs(del - 1) < 0.0000003) break;
    }
    return h;
}
function gammapinv1(p, a5) {
    var j = 0;
    var a11 = a5 - 1;
    var EPS = 0.00000001;
    var gln = gammaln1(a5);
    var x, err = 0, t, u, pp = 0, lna1 = 0, afac = 0;
    if (p >= 1) return Math.max(100, a5 + 100 * Math.sqrt(a5));
    if (p <= 0) return 0;
    if (a5 > 1) {
        lna1 = Math.log(a11);
        afac = Math.exp(a11 * (lna1 - 1) - gln);
        pp = p < 0.5 ? p : 1 - p;
        t = Math.sqrt(-2 * Math.log(pp));
        x = (2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t;
        if (p < 0.5) x = -x;
        x = Math.max(0.001, a5 * Math.pow(1 - 1 / (9 * a5) - x / (3 * Math.sqrt(a5)), 3));
    } else {
        t = 1 - a5 * (0.253 + a5 * 0.12);
        if (p < t) x = Math.pow(p / t, 1 / a5);
        else x = 1 - Math.log(1 - (p - t) / (1 - t));
    }
    for(; j < 12; j++){
        if (x <= 0) return 0;
        err = lowRegGamma1(a5, x) - p;
        if (a5 > 1) t = afac * Math.exp(-(x - a11) + a11 * (Math.log(x) - lna1));
        else t = Math.exp(-x + a11 * Math.log(x) - gln);
        u = err / t;
        x -= t = u / (1 - 0.5 * Math.min(1, u * ((a5 - 1) / x - 1)));
        if (x <= 0) x = 0.5 * (x + t);
        if (Math.abs(t) < EPS * x) break;
    }
    return x;
}
function erf1(x) {
    var cof = [
        -1.3026537197817094,
        0.6419697923564902,
        0.019476473204185836,
        -0.00956151478680863,
        -0.000946595344482036,
        0.000366839497852761,
        0.000042523324806907,
        -0.000020278578112534,
        -0.000001624290004647,
        0.00000130365583558,
        0.000000015626441722,
        -0.000000085238095915,
        0.000000006529054439,
        0.000000005059343495,
        -0.000000000991364156,
        -0.000000000227365122,
        0.000000000096467911,
        0.000000000002394038,
        -0.000000000006886027,
        0.000000000000894487,
        0.000000000000313092,
        -0.000000000000112708,
        0.000000000000000381,
        0.000000000000007106,
        -0.000000000000001523,
        -0.000000000000000094,
        0.000000000000000121,
        -0.000000000000000028
    ];
    var j = cof.length - 1;
    var isneg = false;
    var d = 0;
    var dd = 0;
    var t, ty, tmp, res;
    if (x < 0) {
        x = -x;
        isneg = true;
    }
    t = 2 / (2 + x);
    ty = 4 * t - 2;
    for(; j > 0; j--){
        tmp = d;
        d = ty * d - dd + cof[j];
        dd = tmp;
    }
    res = t * Math.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd);
    return isneg ? res - 1 : 1 - res;
}
function erfc1(x) {
    return 1 - erf1(x);
}
function erfcinv1(p) {
    var j = 0;
    var x, err, t, pp;
    if (p >= 2) return -100;
    if (p <= 0) return 100;
    pp = p < 1 ? p : 2 - p;
    t = Math.sqrt(-2 * Math.log(pp / 2));
    x = -0.70711 * ((2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t);
    for(; j < 2; j++){
        err = erfc1(x) - pp;
        x += err / (1.1283791670955126 * Math.exp(-x * x) - x * err);
    }
    return p < 1 ? x : -x;
}
function ibeta1(x, a5, b5) {
    var bt = x === 0 || x === 1 ? 0 : Math.exp(gammaln1(a5 + b5) - gammaln1(a5) - gammaln1(b5) + a5 * Math.log(x) + b5 * Math.log(1 - x));
    if (x < 0 || x > 1) throw Error('ibeta: x not between 0..1');
    if (x < (a5 + 1) / (a5 + b5 + 2)) return bt * betacf1(x, a5, b5) / a5;
    return 1 - bt * betacf1(1 - x, b5, a5) / b5;
}
function ibetainv1(p, a5, b5) {
    var EPS = 0.00000001;
    var a11 = a5 - 1;
    var b11 = b5 - 1;
    var j = 0;
    var lna, lnb, pp, t, u, err = 0, x = 0, al, h, w, afac;
    if (p <= 0) return 0;
    if (p >= 1) return 1;
    if (a5 >= 1 && b5 >= 1) {
        pp = p < 0.5 ? p : 1 - p;
        t = Math.sqrt(-2 * Math.log(pp));
        x = (2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t;
        if (p < 0.5) x = -x;
        al = (x * x - 3) / 6;
        h = 2 / (1 / (2 * a5 - 1) + 1 / (2 * b5 - 1));
        w = x * Math.sqrt(al + h) / h - (1 / (2 * b5 - 1) - 1 / (2 * a5 - 1)) * (al + 5 / 6 - 2 / (3 * h));
        x = a5 / (a5 + b5 * Math.exp(2 * w));
    } else {
        lna = Math.log(a5 / (a5 + b5));
        lnb = Math.log(b5 / (a5 + b5));
        t = Math.exp(a5 * lna) / a5;
        u = Math.exp(b5 * lnb) / b5;
        w = t + u;
        if (p < t / w) x = Math.pow(a5 * w * p, 1 / a5);
        else x = 1 - Math.pow(b5 * w * (1 - p), 1 / b5);
    }
    afac = -gammaln1(a5) - gammaln1(b5) + gammaln1(a5 + b5);
    for(; j < 10; j++){
        if (x === 0 || x === 1) return x;
        err = ibeta1(x, a5, b5) - p;
        t = Math.exp(a11 * Math.log(x) + b11 * Math.log(1 - x) + afac);
        u = err / t;
        x -= t = u / (1 - 0.5 * Math.min(1, u * (a11 / x - b11 / (1 - x))));
        if (x <= 0) x = 0.5 * (x + t);
        if (x >= 1) x = 0.5 * (x + t + 1);
        if (Math.abs(t) < EPS * x && j > 0) break;
    }
    return x;
}
function randn1() {
    var u, v, x, y, q;
    do {
        u = Math.random();
        v = 1.7156 * (Math.random() - 0.5);
        x = u - 0.449871;
        y = Math.abs(v) + 0.386595;
        q = x * x + y * (0.196 * y - 0.25472 * x);
    }while (q > 0.27597 && (q > 0.27846 || v * v > -4 * Math.log(u) * u * u))
    return v / u;
}
function randg1(shape = 1) {
    var oalph = shape;
    var a11, a21, u, v, x;
    if (shape < 1) shape += 1;
    a11 = shape - 1 / 3;
    a21 = 1 / Math.sqrt(9 * a11);
    do {
        do {
            x = Math.random();
            v = 1 + a21 * x;
        }while (v <= 0)
        v = v * v * v;
        u = Math.random();
    }while (u > 1 - 0.331 * Math.pow(x, 4) && Math.log(u) > 0.5 * x * x + a11 * (1 - v + Math.log(v)))
    if (shape == oalph) return a11 * v;
    do {
        u = Math.random();
    }while (u === 0)
    return Math.pow(u, 1 / oalph) * a11 * v;
}
export { gammaln1 as gammaln };
export { gammafn1 as gammafn };
export { gammap1 as gammap };
export { lowRegGamma1 as lowRegGamma };
export { factorialln1 as factorialln };
export { factorial1 as factorial };
export { combination1 as combination };
export { combinationln1 as combinationln };
export { permutation1 as permutation };
export { betafn1 as betafn };
export { betaln1 as betaln };
export { betacf1 as betacf };
export { gammapinv1 as gammapinv };
export { erf1 as erf };
export { erfc1 as erfc };
export { erfcinv1 as erfcinv };
export { ibeta1 as ibeta };
export { ibetainv1 as ibetainv };
export { randn1 as randn };
export { randg1 as randg };
const { int: __int1  } = mod;
const { log , pow , sqrt , PI , tan , atan , min: min1  } = Math;
class Distribution {
    inv(arg) {
        let { p  } = arg;
        mod.be(p >= 0 && p <= 1);
    }
    median(arg) {
        return this.mean(arg);
    }
    mode(arg) {
        return this.median(arg);
    }
    sample(arg) {
        let p = Math.random();
        return this.inv(Object.assign({
        }, arg, {
            p
        }));
    }
    mean(arg) {
        throw Error(`mean() not implemented!`);
    }
    variance(arg) {
        throw Error(`variance() not implemented!`);
    }
    sd(arg) {
        return Math.sqrt(this.variance(arg));
    }
}
class Uniform1 extends Distribution {
    pdf(arg) {
        let { x , min: min2 , max: max1  } = arg;
        return x < min2 || x > max1 ? 0 : 1 / (max1 - min2);
    }
    cdf(arg) {
        let { x , min: min2 , max: max1  } = arg;
        if (x < min2) return 0;
        else if (x < max1) return (x - min2) / (max1 - min2);
        return 1;
    }
    inv(arg) {
        let { p , min: min2 , max: max1  } = arg;
        return min2 + p * (max1 - min2);
    }
    mean(arg) {
        let { min: min2 , max: max1  } = arg;
        return 0.5 * (min2 + max1);
    }
    variance(arg) {
        let { min: min2 , max: max1  } = arg;
        return pow(max1 - min2, 2) / 12;
    }
}
class Exponential1 extends Distribution {
    pdf(arg) {
        let { x , rate  } = arg;
        return x < 0 ? 0 : rate * Math.exp(-rate * x);
    }
    cdf(arg) {
        let { x , rate  } = arg;
        return x < 0 ? 0 : 1 - Math.exp(-rate * x);
    }
    inv(arg) {
        let { p , rate  } = arg;
        return -log(1 - p) / rate;
    }
    mean(arg) {
        let { rate  } = arg;
        return 1 / rate;
    }
    medium(arg) {
        let { rate  } = arg;
        return 1 / rate * log(2);
    }
    variance(arg) {
        let { rate  } = arg;
        return 1 / (rate * rate);
    }
}
class Normal1 extends Distribution {
    pdf(arg) {
        let { x , mu , sd  } = arg;
        let d = x - mu;
        return 1 / (sqrt(2 * PI) * sd) * Math.exp(-(d * d) / (2 * sd * sd));
    }
    cdf(arg) {
        let { x , mu , sd  } = arg;
        return 0.5 * (1 + erf1((x - mu) / sqrt(2 * sd * sd)));
    }
    inv(arg) {
        let { p , mu , sd  } = arg;
        return -1.4142135623730951 * sd * erfcinv1(2 * p) + mu;
    }
    mean(arg) {
        let { mu , sd  } = arg;
        return mu;
    }
    variance(arg) {
        let { mu , sd  } = arg;
        return sd * sd;
    }
}
class Beta1 extends Distribution {
    pdf(arg) {
        let { x , alpha , beta  } = arg;
        if (x > 1 || x < 0) return 0;
        if (alpha == 1 && beta == 1) return 1;
        if (alpha < 512 && beta < 512) {
            return pow(x, alpha - 1) * pow(1 - x, beta - 1) / betafn1(alpha, beta);
        } else {
            return Math.exp((alpha - 1) * log(x) + (beta - 1) * log(1 - x) - betaln1(alpha, beta));
        }
    }
    cdf(arg) {
        let { x , alpha , beta  } = arg;
        return x > 1 ? 1 : x < 0 ? 0 : ibeta1(x, alpha, beta);
    }
    inv(arg) {
        let { p , alpha , beta  } = arg;
        return ibetainv1(p, alpha, beta);
    }
    mean(arg) {
        let { alpha , beta  } = arg;
        return alpha / (alpha + beta);
    }
    median(arg) {
        let { alpha , beta  } = arg;
        return ibetainv1(0.5, alpha, beta);
    }
    mode(arg) {
        let { alpha , beta  } = arg;
        return (alpha - 1) / (alpha + beta - 2);
    }
    variance(arg) {
        let { alpha , beta  } = arg;
        return alpha * beta / (pow(alpha + beta, 2) * (alpha + beta + 1));
    }
}
class F1 extends Distribution {
    pdf(arg) {
        let { x , df1 , df2  } = arg;
        var p, q, f;
        if (x < 0) return 0;
        if (df1 <= 2) {
            if (x === 0 && df1 < 2) return Infinity;
            if (x === 0 && df1 === 2) return 1;
            return 1 / betafn1(df1 / 2, df2 / 2) * pow(df1 / df2, df1 / 2) * pow(x, df1 / 2 - 1) * pow(1 + df1 / df2 * x, -(df1 + df2) / 2);
        }
        p = df1 * x / (df2 + x * df1);
        q = df2 / (df2 + x * df1);
        f = df1 * q / 2;
        return f * binomial1.pdf({
            x: (df1 - 2) / 2,
            n: (df1 + df2 - 2) / 2,
            p
        });
    }
    cdf(arg) {
        let { x , df1 , df2  } = arg;
        if (x < 0) return 0;
        return ibeta1(df1 * x / (df1 * x + df2), df1 / 2, df2 / 2);
    }
    inv(arg) {
        let { p , df1 , df2  } = arg;
        return df2 / (df1 * (1 / ibetainv1(p, df1 / 2, df2 / 2) - 1));
    }
    mean(arg) {
        let { df1 , df2  } = arg;
        if (df2 > 2) return df2 / (df2 - 2);
        throw Error(`F.mean() shold be df2 > 2, but df2=${df2}`);
    }
    variance(arg) {
        let { df1 , df2  } = arg;
        if (df2 <= 4) throw Error(`F.variance() shold be df2 > 4, but df2=${df2}`);
        return 2 * df2 * df2 * (df1 + df2 - 2) / (df1 * (df2 - 2) * (df2 - 2) * (df2 - 4));
    }
}
class Cauchy1 extends Distribution {
    pdf(arg) {
        let { x , local , scale  } = arg;
        if (scale < 0) return 0;
        return scale / (pow(x - local, 2) + pow(scale, 2)) / PI;
    }
    cdf(arg) {
        let { x , local , scale  } = arg;
        return atan((x - local) / scale) / PI + 0.5;
    }
    inv(arg) {
        let { p , local , scale  } = arg;
        return local + scale * tan(PI * (p - 0.5));
    }
    mean(arg) {
        let { local , scale  } = arg;
        return local;
    }
}
class ChiSquare1 extends Distribution {
    pdf(arg) {
        let { x , dof  } = arg;
        if (x < 0) return 0;
        return x === 0 && dof === 2 ? 0.5 : Math.exp((dof / 2 - 1) * log(x) - x / 2 - dof / 2 * log(2) - gammaln1(dof / 2));
    }
    cdf(arg) {
        let { x , dof  } = arg;
        if (x < 0) return 0;
        return lowRegGamma1(dof / 2, x / 2);
    }
    inv(arg) {
        let { p , dof  } = arg;
        return 2 * gammapinv1(p, 0.5 * dof);
    }
    mean(arg) {
        let { dof  } = arg;
        return dof;
    }
    median(arg) {
        let { dof  } = arg;
        return dof * pow(1 - 2 / (9 * dof), 3);
    }
    mode(arg) {
        let { dof  } = arg;
        return dof - 2 > 0 ? dof - 2 : 0;
    }
    variance(arg) {
        let { dof  } = arg;
        return 2 * dof;
    }
}
class Gamma1 extends Distribution {
    pdf(arg) {
        let { x , shape , scale  } = arg;
        if (x < 0) return 0;
        return x === 0 && shape === 1 ? 1 / scale : Math.exp((shape - 1) * log(x) - x / scale - gammaln1(shape) - shape * log(scale));
    }
    cdf(arg) {
        let { x , shape , scale  } = arg;
        if (x < 0) return 0;
        return lowRegGamma1(shape, x / scale);
    }
    inv(arg) {
        let { p , shape , scale  } = arg;
        return gammapinv1(p, shape) * scale;
    }
    mean(arg) {
        let { shape , scale  } = arg;
        return shape * scale;
    }
    mode(arg) {
        let { shape , scale  } = arg;
        if (shape > 1) return (shape - 1) * scale;
        throw Error(`Gamma.mode() should shape > 1, but shape=${shape}`);
    }
    variance(arg) {
        let { shape , scale  } = arg;
        return shape * scale * scale;
    }
}
class InvGamma1 extends Distribution {
    pdf(arg) {
        let { x , shape , scale  } = arg;
        if (x <= 0) return 0;
        return Math.exp(-(shape + 1) * log(x) - scale / x - gammaln1(shape) + shape * log(scale));
    }
    cdf(arg) {
        let { x , shape , scale  } = arg;
        if (x <= 0) return 0;
        return 1 - lowRegGamma1(shape, scale / x);
    }
    inv(arg) {
        let { p , shape , scale  } = arg;
        return scale / gammapinv1(1 - p, shape);
    }
    mean(arg) {
        let { shape , scale  } = arg;
        if (shape > 1) return scale / (shape - 1);
        throw Error(`InvGamma.mean() should be shape < 1, but shape=${shape}`);
    }
    mode(arg) {
        let { shape , scale  } = arg;
        return scale / (shape + 1);
    }
    variance(arg) {
        let { shape , scale  } = arg;
        if (shape <= 2) throw Error(`InvGamma.variance() should be shape > 2, but shape=${shape}`);
        return scale * scale / ((shape - 1) * (shape - 1) * (shape - 2));
    }
}
class T1 extends Distribution {
    pdf(arg) {
        let { x , dof  } = arg;
        dof = dof > 10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 ? 10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 : dof;
        return 1 / (sqrt(dof) * betafn1(0.5, dof / 2)) * pow(1 + x * x / dof, -((dof + 1) / 2));
    }
    cdf(arg) {
        let { x , dof  } = arg;
        var dof2 = dof / 2;
        return ibeta1((x + sqrt(x * x + dof)) / (2 * sqrt(x * x + dof)), dof2, dof2);
    }
    inv(arg) {
        let { p , dof  } = arg;
        var x = ibetainv1(2 * min1(p, 1 - p), 0.5 * dof, 0.5);
        x = sqrt(dof * (1 - x) / x);
        return p > 0.5 ? x : -x;
    }
    mean(arg) {
        let { dof  } = arg;
        if (dof > 1) return 0;
        throw Error(`T.mean() should be dof > 1, but dof=${dof}`);
    }
    median(arg) {
        return 0;
    }
    mode(arg) {
        return 0;
    }
    variance(arg) {
        let { dof  } = arg;
        if (dof > 2) return dof / (dof - 2);
        else if (dof > 1) return Infinity;
        else throw Error(`T.variance() should be dof > 1, but dof=${dof}`);
    }
}
class Weibull1 extends Distribution {
    pdf(arg) {
        let { x , scale , shape  } = arg;
        if (x < 0 || scale < 0 || shape < 0) return 0;
        return shape / scale * pow(x / scale, shape - 1) * Math.exp(-pow(x / scale, shape));
    }
    cdf(arg) {
        let { x , scale , shape  } = arg;
        return x < 0 ? 0 : 1 - Math.exp(-pow(x / scale, shape));
    }
    inv(arg) {
        let { p , scale , shape  } = arg;
        return scale * pow(-log(1 - p), 1 / shape);
    }
    mean(arg) {
        let { scale , shape  } = arg;
        return scale * gammafn1(1 + 1 / shape);
    }
    median(arg) {
        let { scale , shape  } = arg;
        return scale * pow(log(2), 1 / shape);
    }
    mode(arg) {
        let { scale , shape  } = arg;
        if (shape <= 1) return 0;
        return scale * pow((shape - 1) / shape, 1 / shape);
    }
    variance(arg) {
        let { scale , shape  } = arg;
        return scale * scale * gammafn1(1 + 2 / shape) - pow(weibull1.mean({
            scale,
            shape
        }), 2);
    }
}
class Binomial1 extends Distribution {
    pdf(arg) {
        let { x: k , p , n  } = arg;
        mod.be(__int1(k));
        return p === 0 || p === 1 ? n * p === k ? 1 : 0 : combination1(n, k) * pow(p, k) * pow(1 - p, n - k);
    }
    cdf(arg) {
        let { x , p , n  } = arg;
        if (x < 0) return 0;
        if (x < n) {
            let binomarr = [];
            for(let k = 0; k <= x; k++){
                binomarr[k] = this.pdf({
                    x: k,
                    p,
                    n
                });
            }
            return sum(binomarr);
        }
        return 1;
    }
}
class NegBinomial1 extends Distribution {
    pdf(arg) {
        let { x: k , p , r  } = arg;
        mod.be(__int1(k));
        if (k !== k >>> 0) throw Error();
        if (k < 0) return 0;
        return combination1(k + r - 1, r - 1) * pow(1 - p, k) * pow(p, r);
    }
    cdf(arg) {
        let { x , p , r  } = arg;
        if (x < 0) return 0;
        let sum1 = 0;
        for(let k = 0; k <= x; k++){
            sum1 += negBinomial1.pdf({
                x: k,
                r,
                p
            });
        }
        return sum1;
    }
}
class Poisson1 extends Distribution {
    pdf(arg) {
        let { x: k , l  } = arg;
        mod.be(__int1(k));
        if (l < 0 || k % 1 !== 0 || k < 0) return 0;
        return pow(l, k) * Math.exp(-l) / factorial1(k);
    }
    cdf(arg) {
        let { x , l  } = arg;
        var sumarr = [], k = 0;
        if (x < 0) return 0;
        for(; k <= x; k++){
            sumarr.push(poisson1.pdf({
                x: k,
                l
            }));
        }
        return sum(sumarr);
    }
    mean(arg) {
        return 1;
    }
    variance(arg) {
        return 1;
    }
}
const uniform1 = new Uniform1();
const exponential1 = new Exponential1();
const normal1 = new Normal1();
const beta1 = new Beta1();
const f1 = new F1();
const chiSquare1 = new ChiSquare1();
const cauchy1 = new Cauchy1();
const gamma1 = new Gamma1();
const invGamma1 = new InvGamma1();
const t1 = new T1();
const weibull1 = new Weibull1();
const negBinomial1 = new NegBinomial1();
const poisson1 = new Poisson1();
const binomial1 = new Binomial1();
export { Uniform1 as Uniform };
export { Exponential1 as Exponential };
export { Normal1 as Normal };
export { Beta1 as Beta };
export { F1 as F };
export { Cauchy1 as Cauchy };
export { ChiSquare1 as ChiSquare };
export { Gamma1 as Gamma };
export { InvGamma1 as InvGamma };
export { T1 as T };
export { Weibull1 as Weibull };
export { Binomial1 as Binomial };
export { NegBinomial1 as NegBinomial };
export { Poisson1 as Poisson };
export { uniform1 as uniform };
export { exponential1 as exponential };
export { normal1 as normal };
export { beta1 as beta };
export { f1 as f };
export { chiSquare1 as chiSquare };
export { cauchy1 as cauchy };
export { gamma1 as gamma };
export { invGamma1 as invGamma };
export { t1 as t };
export { weibull1 as weibull };
export { negBinomial1 as negBinomial };
export { poisson1 as poisson };
export { binomial1 as binomial };
function op1(t11, op) {
    let V1 = mod1;
    let rv = V1[op](t11.v);
    return new Tensor1(t11.shape, rv);
}
function op1n(t11, op) {
    let V1 = mod1;
    let r = V1[op](t11.v);
    return r;
}
function op21(t11, op, t2) {
    let V2 = mod1;
    be1(mod1.eq(t11.shape, t2.shape));
    let rv = V2[op](t11.v, t2.v);
    return new Tensor1(t11.shape, rv);
}
function op2n(t11, op, t2) {
    let V2 = mod1;
    be1(mod1.eq(t11.shape, t2.shape));
    let r = V2[op](t11.v, t2.v);
    return r;
}
class Tensor1 {
    shape;
    v;
    constructor(shape, v){
        this.shape = [
            ...shape
        ];
        this.v = v ? v : mod1.vector(mod1.product(shape), 0);
    }
    dim() {
        return this.shape.length;
    }
    map1(f) {
        return new Tensor1(this.shape, map11(this.v, f));
    }
    map2(t2, f) {
        return new Tensor1(this.shape, map21(this.v, t2.v, f));
    }
    add(t2) {
        return op21(this, "add", t2);
    }
    sub(t2) {
        return op21(this, "sub", t2);
    }
    mul(t2) {
        return op21(this, "mul", t2);
    }
    div(t2) {
        return op21(this, "div", t2);
    }
    mod(t2) {
        return op21(this, "mod", t2);
    }
    pow(t2) {
        return op21(this, "pow", t2);
    }
    and(t2) {
        return op21(this, "and", t2);
    }
    or(t2) {
        return op21(this, "or", t2);
    }
    xor(t2) {
        return op21(this, "xor", t2);
    }
    band(t2) {
        return op21(this, "band", t2);
    }
    bor(t2) {
        return op21(this, "bor", t2);
    }
    bxor(t2) {
        return op21(this, "bxor", t2);
    }
    eq(t2) {
        return op21(this, "eq", t2);
    }
    neq(t2) {
        return op21(this, "neq", t2);
    }
    lt(t2) {
        return op21(this, "lt", t2);
    }
    gt(t2) {
        return op21(this, "gt", t2);
    }
    leq(t2) {
        return op21(this, "leq", t2);
    }
    geq(t2) {
        return op21(this, "geq", t2);
    }
    neg() {
        return op1(this, "neg");
    }
    abs() {
        return op1(this, "abs");
    }
    log() {
        return op1(this, "log");
    }
    not() {
        return op1(this, "not");
    }
    sin() {
        return op1(this, "sin");
    }
    cos() {
        return op1(this, "cos");
    }
    tan() {
        return op1(this, "tan");
    }
    cot() {
        return op1(this, "cot");
    }
    sec() {
        return op1(this, "sec");
    }
    csc() {
        return op1(this, "csc");
    }
    asin() {
        return op1(this, "asin");
    }
    acos() {
        return op1(this, "acos");
    }
    atan() {
        return op1(this, "atan");
    }
    atan2() {
        return op1(this, "atan2");
    }
    atanh() {
        return op1(this, "atanh");
    }
    cbrt() {
        return op1(this, "cbrt");
    }
    ceil() {
        return op1(this, "ceil");
    }
    clz32() {
        return op1(this, "clz32");
    }
    cosh() {
        return op1(this, "cosh");
    }
    exp() {
        return op1(this, "exp");
    }
    expm1() {
        return op1(this, "expm1");
    }
    floor() {
        return op1(this, "floor");
    }
    fround() {
        return op1(this, "fround");
    }
    hypot() {
        return op1(this, "hypot");
    }
    log10() {
        return op1(this, "log10");
    }
    log1p() {
        return op1(this, "log1p");
    }
    log2() {
        return op1(this, "log2");
    }
    round() {
        return op1(this, "round");
    }
    sign() {
        return op1(this, "sign");
    }
    sqrt() {
        return op1(this, "sqrt");
    }
    trunc() {
        return op1(this, "trunc");
    }
    min() {
        return op1n(this, "min");
    }
    max() {
        return op1n(this, "max");
    }
    any() {
        return op1n(this, "any");
    }
    all() {
        return op1n(this, "all");
    }
    sum() {
        return op1n(this, "sum");
    }
    product() {
        return op1n(this, "product");
    }
    norm() {
        return op1n(this, "norm");
    }
    norminf() {
        return op1n(this, "norminf");
    }
    mean() {
        return op1n(this, "mean");
    }
    sd() {
        return op1n(this, "sd");
    }
    random() {
        return op1n(this, "random");
    }
    normalize() {
        return op1n(this, "normalize");
    }
    normalize2() {
        return op1n(this, "normalize2");
    }
    near(t2) {
        return op2n(this, "near", t2);
    }
    offset(idx) {
        let shape1 = this.shape;
        let dim = shape1.length;
        let offset = idx[0];
        for(let i1 = 1; i1 < dim; i1++){
            offset = offset * shape1[i1] + idx[i1];
        }
        return offset;
    }
    get(idx) {
        let j = this.offset(idx);
        return this.v[j];
    }
    set(idx, x) {
        let j = this.offset(idx);
        this.v[j] = x;
    }
    toVector() {
        return this.v;
    }
    toArray() {
        let { v: v1 , shape: shape1  } = this;
        var r;
        switch(this.dim()){
            case 1:
                r = v1;
                break;
            case 2:
                r = new Array(shape1[0]);
                for(let i1 = 0; i1 < shape1[0]; i1++){
                    r[i1] = v1.slice(i1 * shape1[1], (i1 + 1) * shape1[1]);
                }
                break;
            case 3:
                r = new Array(shape1[0]);
                for(let i2 = 0; i2 < shape1[0]; i2++){
                    r[i2] = new Array(shape1[1]);
                    for(let j = 0; j < shape1[1]; j++){
                        let start = (i2 * shape1[0] + j) * shape1[1];
                        let end = (i2 * shape1[0] + j + 1) * shape1[1];
                        r[i2][j] = v1.slice(start, end);
                    }
                }
                break;
            default:
                throw Error(`Tensor.toArray() do not support dimension>3, dim=${this.dim()}!`);
        }
        return r;
    }
}
export { Tensor1 as Tensor };
function samples1(a5, n) {
    let s = new Array(n);
    for(let i1 = 0; i1 < n; i1++){
        s[i1] = randomChoose1(a5);
    }
    return s;
}
function rsamples(distribution) {
    return eval(`
      let f=function (arg) { 
        let {n} = arg, v = new Array(n)
        for (let i=0; i<n; i++) v[i] = P.${distribution}.sample(arg)
        return v
      }; f
    `);
}
const dunif1 = (arg)=>uniform1.pdf(arg)
;
const punif1 = (arg)=>uniform1.cdf(arg)
;
const qunif1 = (arg)=>uniform1.inv(arg)
;
const runif1 = rsamples('uniform');
const dexp1 = (arg)=>exponential1.pdf(arg)
;
const pexp1 = (arg)=>exponential1.cdf(arg)
;
const qexp1 = (arg)=>exponential1.inv(arg)
;
const rexp1 = rsamples('exp');
const dnorm1 = (arg)=>normal1.pdf(arg)
;
const pnorm1 = (arg)=>normal1.cdf(arg)
;
const qnorm1 = (arg)=>normal1.inv(arg)
;
const rnorm1 = rsamples('norm');
function hist1(a5, from = Math.floor(min(a5)), to = Math.ceil(max(a5)), step = 1) {
    var n = Math.ceil((to - from + 0.00000001) / step);
    var xc = range1(from + step / 2, to, step);
    var bins = array1(n, 0);
    let len = a5.length;
    for(let i1 = 0; i1 < len; i1++){
        var slot = Math.floor((a5[i1] - from) / step);
        if (slot >= 0 && slot < n) {
            bins[slot]++;
        }
    }
    return {
        type: 'histogram',
        xc: xc,
        bins: bins,
        from: from,
        to: to,
        step: step
    };
}
export { samples1 as samples };
export { dunif1 as dunif };
export { punif1 as punif };
export { qunif1 as qunif };
export { runif1 as runif };
export { dexp1 as dexp };
export { pexp1 as pexp };
export { qexp1 as qexp };
export { rexp1 as rexp };
export { dnorm1 as dnorm };
export { pnorm1 as pnorm };
export { qnorm1 as qnorm };
export { rnorm1 as rnorm };
export { hist1 as hist };
export { mod1 as V };
export { mod2 as M };
