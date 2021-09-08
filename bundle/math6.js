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
function be1(cond, ...args) {
    if (!cond) {
        throw Error(args.toString());
    }
}
export { near1 as near };
export { clone1 as clone };
export { be1 as be };
function random1(min = 0, max = 1) {
    return min + Math.random() * (max - min);
}
function randomInt1(min, max) {
    return Math.floor(random1(min, max));
}
function randomChoose1(a) {
    return a[randomInt1(0, a.length)];
}
function samples1(a, n) {
    let s = new Array(n);
    for(let i = 0; i < n; i++){
        s[i] = randomChoose1(a);
    }
    return s;
}
export { random1 as random };
export { randomInt1 as randomInt };
export { randomChoose1 as randomChoose };
export { samples1 as samples };
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
}
export { Complex1 as Complex };
function map11(a5, f) {
    if (a5 instanceof Array) {
        var fa = new Array(a5.length);
        for(var i = 0; i < a5.length; i++){
            fa[i] = map11(a5[i], f);
        }
        return fa;
    } else {
        return f(a5);
    }
}
function map21(a5, b5, f) {
    if (a5 instanceof Array) {
        var fa = new Array(a5.length);
        var isArrayB = b5 instanceof Array;
        for(var i = 0; i < a5.length; i++){
            var bi = isArrayB ? b5[i] : b5;
            fa[i] = map21(a5[i], bi, f);
        }
        return fa;
    } else {
        return f(a5, b5);
    }
}
function reduce1(a5, f, init) {
    var result = init;
    if (a5 instanceof Array) {
        for(var i in a5){
            result = f(result, reduce1(a5[i], f, init));
        }
    } else {
        result = f(result, a5);
    }
    return result;
}
export { map11 as map1 };
export { map21 as map2 };
export { reduce1 as reduce };
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
    var i, z, yi, res, sum, ysq;
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
    for(let i1 = 0; i1 < 8; ++i1){
        xnum = (xnum + p[i1]) * z;
        xden = xden * z + q[i1];
    }
    res = xnum / xden + 1;
    if (yi < y) {
        res /= yi;
    } else if (yi > y) {
        for(let i2 = 0; i2 < n; ++i2){
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
    var sum = 1 / a5;
    var del = sum;
    var b5 = x + 1 - a5;
    var c = 1 / 0.000000000000000000000000000001;
    var d = 1 / b5;
    var h = d;
    var i = 1;
    var ITMAX = -~(Math.log(a5 >= 1 ? a5 : 1 / a5) * 8.5 + a5 * 0.4 + 17);
    var an, endval;
    if (x < 0 || a5 <= 0) {
        return NaN;
    } else if (x < a5 + 1) {
        for(; i <= ITMAX; i++){
            sum += del *= x / ++ap;
        }
        return sum * Math.exp(-x + a5 * Math.log(x) - aln);
    }
    for(; i <= ITMAX; i++){
        an = -i * (i - a5);
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
    if (x <= 0 || y <= 0) return undefined;
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
class Distribution {
    pdf(arg) {
    }
    cdf(arg) {
    }
    inv(arg) {
        let { p  } = arg;
        be1(p >= 0 && p <= 1);
    }
    mean(arg) {
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
    variance(arg) {
    }
    sd(arg) {
        return Math.sqrt(this.variance(arg));
    }
}
class Uniform extends Distribution {
    pdf(arg) {
        let { x , min , max  } = arg;
        return x < min || x > max ? 0 : 1 / (max - min);
    }
    cdf(arg) {
        let { x , min , max  } = arg;
        if (x < min) return 0;
        else if (x < max) return (x - min) / (max - min);
        return 1;
    }
    inv(arg) {
        let { p , min , max  } = arg;
        return min + p * (max - min);
    }
    mean(arg) {
        let { min , max  } = arg;
        return 0.5 * (min + max);
    }
    mode(arg) {
        throw new Error('Uniform has no mode() !');
    }
    variance(arg) {
        let { min , max  } = arg;
        return pow(max - min, 2) / 12;
    }
}
class Exp extends Distribution {
    pdf(arg) {
        let { x , rate  } = arg;
        return x < 0 ? 0 : rate * exp1(-rate * x);
    }
    cdf(arg) {
        let { x , rate  } = arg;
        return x < 0 ? 0 : 1 - exp1(-rate * x);
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
    mode(arg) {
        return 0;
    }
    variance(arg) {
        let { rate  } = arg;
        return 1 / (rate * rate);
    }
}
class Normal extends Distribution {
    pdf(arg) {
        let { x , mu , sd  } = arg;
        let d = x - mu;
        return 1 / (sqrt(2 * PI) * sd) * exp1(-(d * d) / (2 * sd * sd));
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
class Beta extends Distribution {
    pdf(arg) {
        let { x , alpha , beta  } = arg;
        if (x > 1 || x < 0) return 0;
        if (alpha == 1 && beta == 1) return 1;
        if (alpha < 512 && beta < 512) {
            return pow(x, alpha - 1) * pow(1 - x, beta - 1) / betafn1(alpha, beta);
        } else {
            return exp1((alpha - 1) * log(x) + (beta - 1) * log(1 - x) - betaln1(alpha, beta));
        }
    }
    cdf(arg) {
        let { x , alpha , beta  } = arg;
        return x > 1 || x < 0 ? (x > 1) * 1 : ibeta1(x, alpha, beta);
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
class F extends Distribution {
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
        return f * binomial.pdf({
            k: (df1 - 2) / 2,
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
        return df2 > 2 ? df2 / (df2 - 2) : undefined;
    }
    variance(arg) {
        let { df1 , df2  } = arg;
        if (df2 <= 4) return undefined;
        return 2 * df2 * df2 * (df1 + df2 - 2) / (df1 * (df2 - 2) * (df2 - 2) * (df2 - 4));
    }
}
class Cauchy extends Distribution {
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
class ChiSquare extends Distribution {
    pdf(arg) {
        let { x , dof  } = arg;
        if (x < 0) return 0;
        return x === 0 && dof === 2 ? 0.5 : exp1((dof / 2 - 1) * log(x) - x / 2 - dof / 2 * log(2) - gammaln1(dof / 2));
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
class Gamma extends Distribution {
    pdf(arg) {
        let { x , shape , scale  } = arg;
        if (x < 0) return 0;
        return x === 0 && shape === 1 ? 1 / scale : exp1((shape - 1) * log(x) - x / scale - gammaln1(shape) - shape * log(scale));
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
        return undefined;
    }
    variance(arg) {
        let { shape , scale  } = arg;
        return shape * scale * scale;
    }
}
class InvGamma extends Distribution {
    pdf(arg) {
        let { x , shape , scale  } = arg;
        if (x <= 0) return 0;
        return exp1(-(shape + 1) * log(x) - scale / x - gammaln1(shape) + shape * log(scale));
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
        return shape > 1 ? scale / (shape - 1) : undefined;
    }
    mode(arg) {
        let { shape , scale  } = arg;
        return scale / (shape + 1);
    }
    variance(arg) {
        let { shape , scale  } = arg;
        if (shape <= 2) return undefined;
        return scale * scale / ((shape - 1) * (shape - 1) * (shape - 2));
    }
}
class T extends Distribution {
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
        var x = ibetainv1(2 * min(p, 1 - p), 0.5 * dof, 0.5);
        x = sqrt(dof * (1 - x) / x);
        return p > 0.5 ? x : -x;
    }
    mean(arg) {
        let { dof  } = arg;
        return dof > 1 ? 0 : undefined;
    }
    median(arg) {
        return 0;
    }
    mode(arg) {
        return 0;
    }
    variance(arg) {
        let { dof  } = arg;
        return dof > 2 ? dof / (dof - 2) : dof > 1 ? Infinity : undefined;
    }
}
class Weibull extends Distribution {
    pdf(arg) {
        let { x , scale , shape  } = arg;
        if (x < 0 || scale < 0 || shape < 0) return 0;
        return shape / scale * pow(x / scale, shape - 1) * exp1(-pow(x / scale, shape));
    }
    cdf(arg) {
        let { x , scale , shape  } = arg;
        return x < 0 ? 0 : 1 - exp1(-pow(x / scale, shape));
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
        return scale * scale * gammafn1(1 + 2 / shape) - pow(weibull.mean(scale, shape), 2);
    }
}
class Binomial extends Distribution {
    pdf(arg) {
        let { k , p , n  } = arg;
        return p === 0 || p === 1 ? n * p === k ? 1 : 0 : combination1(n, k) * pow(p, k) * pow(1 - p, n - k);
    }
    cdf(arg) {
        let { x , p , n  } = arg;
        if (x < 0) return 0;
        if (x < n) {
            let binomarr = [];
            for(let k = 0; k <= x; k++){
                binomarr[k] = this.pdf({
                    k,
                    p,
                    n
                });
            }
            return V.sum(binomarr);
        }
        return 1;
    }
}
class NegBinomial extends Distribution {
    pdf(arg) {
        let { k , p , r  } = arg;
        if (k !== k >>> 0) return false;
        if (k < 0) return 0;
        return combination1(k + r - 1, r - 1) * pow(1 - p, k) * pow(p, r);
    }
    cdf(arg) {
        let { x , p , r  } = arg;
        if (x < 0) return 0;
        let sum = 0;
        for(let k = 0; k <= x; k++){
            sum += negBinomial.pdf({
                k,
                r,
                p
            });
        }
        return sum;
    }
}
class Poisson extends Distribution {
    pdf(arg) {
        let { k , l  } = arg;
        if (l < 0 || k % 1 !== 0 || k < 0) return 0;
        return pow(l, k) * exp1(-l) / factorial1(k);
    }
    cdf(arg) {
        let { x , l  } = arg;
        var sumarr = [], k = 0;
        if (x < 0) return 0;
        for(; k <= x; k++){
            sumarr.push(poisson.pdf({
                k,
                l
            }));
        }
        return V.sum(sumarr);
    }
    mean(arg) {
        return 1;
    }
    variance(arg) {
        return 1;
    }
}
const uniform1 = new Uniform();
const exp1 = new Exp();
const normal1 = new Normal();
const beta1 = new Beta();
const f1 = new F();
const chiSquare1 = new ChiSquare();
const cauchy1 = new Cauchy();
const gamma1 = new Gamma();
const invGamma1 = new InvGamma();
const t1 = new T();
const weibull1 = new Weibull();
const binomial1 = new Binomial();
const negBinomial1 = new NegBinomial();
const poisson1 = new Poisson();
export { uniform1 as uniform };
export { exp1 as exp };
export { normal1 as normal };
export { beta1 as beta };
export { f1 as f };
export { chiSquare1 as chiSquare };
export { cauchy1 as cauchy };
export { gamma1 as gamma };
export { invGamma1 as invGamma };
export { t1 as t };
export { weibull1 as weibull };
export { binomial1 as binomial };
export { negBinomial1 as negBinomial };
export { poisson1 as poisson };
function vector(n, value = 0) {
    let a5 = new Array(n);
    return a5.fill(value);
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
var mod = op2('ai%bi');
var dot = function(a5, b5) {
    let len = a5.length;
    let r = 0;
    for(let i = 0; i < len; i++){
        r += a5[i] * b5[i];
    }
    return r;
};
function clone2(m) {
    return JSON.parse(JSON.stringify(m));
}
function matrix(rows, cols) {
    let r = new Array(rows);
    for(let i = 0; i < rows; i++){
        r[i] = vector(cols, 0);
    }
    return r;
}
function flatten(m) {
    let rows = m.length, cols = m[0].length;
    let r = new Array();
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++)r[i * cols + j] = m[i][j];
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
    for(let i = 0; i < rows; i++){
        r[i][i] = v[i];
    }
    return r;
}
function transpose(m) {
    let r = [];
    let rows = m.length;
    let cols = m[0].length;
    for(let j = 0; j < cols; j++){
        let rj = r[j] = [];
        for(let i = 0; i < rows; i++){
            rj[i] = m[i][j];
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
    for(let i = 0; i < arows; i++){
        let ri = r[i] = [];
        for(let j = 0; j < bcols; j++){
            ri.push(dot(a5[i], bt[j]));
        }
    }
    return r;
}
function inv(m0) {
    let m = m0.length, n = m0[0].length, abs = Math.abs;
    let A = clone2(m0), Ai, Aj;
    let I = identity(m), Ii, Ij;
    let i, j, k, x, i0, v0;
    for(j = 0; j < n; ++j){
        i0 = -1;
        v0 = -1;
        for(i = j; i !== m; ++i){
            k = abs(A[i][j]);
            if (k > v0) {
                i0 = i;
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
        for(i = m - 1; i !== -1; --i){
            if (i !== j) {
                Ai = A[i];
                Ii = I[i];
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
    let n = x.length, ret = 1, i, j, k, A = clone2(x), Aj, Ai, alpha, temp, k1;
    for(j = 0; j < n - 1; j++){
        k = j;
        for(i = j + 1; i < n; i++){
            if (abs(A[i][j]) > abs(A[k][j])) {
                k = i;
            }
        }
        if (k !== j) {
            temp = A[k];
            A[k] = A[j];
            A[j] = temp;
            ret *= -1;
        }
        Aj = A[j];
        for(i = j + 1; i < n; i++){
            Ai = A[i];
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
    var i, j, k, absAjk, Akk, Ak, Pk, Ai;
    var max;
    var n = A.length, n1 = n - 1;
    var P = new Array(n);
    A = clone2(A);
    for(k = 0; k < n; ++k){
        Pk = k;
        Ak = A[k];
        max = abs(Ak[k]);
        for(j = k + 1; j < n; ++j){
            absAjk = abs(A[j][k]);
            if (max < absAjk) {
                max = absAjk;
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
        for(i = k + 1; i < n; ++i){
            A[i][k] /= Akk;
        }
        for(i = k + 1; i < n; ++i){
            Ai = A[i];
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
    var i, j;
    var LU = LUP.LU;
    var n = LU.length;
    var x = clone1(b5);
    var P = LUP.P;
    var Pi, LUi, LUii, tmp;
    for(i = n - 1; i !== -1; --i)x[i] = b5[i];
    for(i = 0; i < n; ++i){
        Pi = P[i];
        if (P[i] !== i) {
            tmp = x[i];
            x[i] = x[Pi];
            x[Pi] = tmp;
        }
        LUi = LU[i];
        for(j = 0; j < i; ++j){
            x[i] -= x[j] * LUi[j];
        }
    }
    for(i = n - 1; i >= 0; --i){
        LUi = LU[i];
        for(j = i + 1; j < n; ++j){
            x[i] -= x[j] * LUi[j];
        }
        x[i] /= LUi[i];
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
    var i = 0;
    var j = 0;
    var k = 0;
    var l = 0;
    var u = clone2(A);
    var m = u.length;
    var n = u[0].length;
    if (m < n) throw "Need more rows than columns";
    var e = new Array(n);
    var q = new Array(n);
    for(i = 0; i < n; i++)e[i] = q[i] = 0;
    var v = matrix(n, n);
    function pythag(a5, b5) {
        a5 = Math.abs(a5);
        b5 = Math.abs(b5);
        if (a5 > b5) return a5 * Math.sqrt(1 + b5 * b5 / a5 / a5);
        else if (b5 == 0) return a5;
        return b5 * Math.sqrt(1 + a5 * a5 / b5 / b5);
    }
    var f2 = 0;
    var g = 0;
    var h = 0;
    var x = 0;
    var y = 0;
    var z = 0;
    var s = 0;
    for(i = 0; i < n; i++){
        e[i] = g;
        s = 0;
        l = i + 1;
        for(j = i; j < m; j++)s += u[j][i] * u[j][i];
        if (s <= tolerance) g = 0;
        else {
            f2 = u[i][i];
            g = Math.sqrt(s);
            if (f2 >= 0) g = -g;
            h = f2 * g - s;
            u[i][i] = f2 - g;
            for(j = l; j < n; j++){
                s = 0;
                for(k = i; k < m; k++)s += u[k][i] * u[k][j];
                f2 = s / h;
                for(k = i; k < m; k++)u[k][j] += f2 * u[k][i];
            }
        }
        q[i] = g;
        s = 0;
        for(j = l; j < n; j++)s = s + u[i][j] * u[i][j];
        if (s <= tolerance) g = 0;
        else {
            f2 = u[i][i + 1];
            g = Math.sqrt(s);
            if (f2 >= 0) g = -g;
            h = f2 * g - s;
            u[i][i + 1] = f2 - g;
            for(j = l; j < n; j++)e[j] = u[i][j] / h;
            for(j = l; j < m; j++){
                s = 0;
                for(k = l; k < n; k++)s += u[j][k] * u[i][k];
                for(k = l; k < n; k++)u[j][k] += s * e[k];
            }
        }
        y = Math.abs(q[i]) + Math.abs(e[i]);
        if (y > x) x = y;
    }
    for(i = n - 1; i != -1; i += -1){
        if (g != 0) {
            h = g * u[i][i + 1];
            for(j = l; j < n; j++)v[j][i] = u[i][j] / h;
            for(j = l; j < n; j++){
                s = 0;
                for(k = l; k < n; k++)s += u[i][k] * v[k][j];
                for(k = l; k < n; k++)v[k][j] += s * v[k][i];
            }
        }
        for(j = l; j < n; j++){
            v[i][j] = 0;
            v[j][i] = 0;
        }
        v[i][i] = 1;
        g = e[i];
        l = i;
    }
    for(i = n - 1; i != -1; i += -1){
        l = i + 1;
        g = q[i];
        for(j = l; j < n; j++)u[i][j] = 0;
        if (g != 0) {
            h = u[i][i] * g;
            for(j = l; j < n; j++){
                s = 0;
                for(k = l; k < m; k++)s += u[k][i] * u[k][j];
                f2 = s / h;
                for(k = i; k < m; k++)u[k][j] += f2 * u[k][i];
            }
            for(j = i; j < m; j++)u[j][i] = u[j][i] / g;
        } else for(j = i; j < m; j++)u[j][i] = 0;
        u[i][i] += 1;
    }
    prec = prec * x;
    for(k = n - 1; k != -1; k += -1){
        for(var iteration = 0; iteration < itmax; iteration++){
            var test_convergence = false;
            for(l = k; l != -1; l += -1){
                if (Math.abs(e[l]) <= prec) {
                    test_convergence = true;
                    break;
                }
                if (Math.abs(q[l - 1]) <= prec) break;
            }
            if (!test_convergence) {
                c = 0;
                s = 1;
                var l1 = l - 1;
                for(i = l; i < k + 1; i++){
                    f2 = s * e[i];
                    e[i] = c * e[i];
                    if (Math.abs(f2) <= prec) break;
                    g = q[i];
                    h = pythag(f2, g);
                    q[i] = h;
                    c = g / h;
                    s = -f2 / h;
                    for(j = 0; j < m; j++){
                        y = u[j][l1];
                        z = u[j][i];
                        u[j][l1] = y * c + z * s;
                        u[j][i] = -y * s + z * c;
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
            g = e[k - 1];
            h = e[k];
            f2 = ((y - z) * (y + z) + (g - h) * (g + h)) / (2 * h * y);
            g = pythag(f2, 1);
            if (f2 < 0) f2 = ((x - z) * (x + z) + h * (y / (f2 - g) - h)) / x;
            else f2 = ((x - z) * (x + z) + h * (y / (f2 + g) - h)) / x;
            c = 1;
            s = 1;
            for(i = l + 1; i < k + 1; i++){
                g = e[i];
                y = q[i];
                h = s * g;
                g = c * g;
                z = pythag(f2, h);
                e[i - 1] = z;
                c = f2 / z;
                s = h / z;
                f2 = x * c + g * s;
                g = -x * s + g * c;
                h = y * s;
                y = y * c;
                for(j = 0; j < n; j++){
                    x = v[j][i - 1];
                    z = v[j][i];
                    v[j][i - 1] = x * c + z * s;
                    v[j][i] = -x * s + z * c;
                }
                z = pythag(f2, h);
                q[i - 1] = z;
                c = f2 / z;
                s = h / z;
                f2 = c * g + s * y;
                x = -s * g + c * y;
                for(j = 0; j < m; j++){
                    y = u[j][i - 1];
                    z = u[j][i];
                    u[j][i - 1] = y * c + z * s;
                    u[j][i] = -y * s + z * c;
                }
            }
            e[l] = 0;
            e[k] = f2;
            q[k] = x;
        }
    }
    for(i = 0; i < q.length; i++)if (q[i] < prec) q[i] = 0;
    for(i = 0; i < n; i++){
        for(j = i - 1; j >= 0; j--){
            if (q[j] < q[i]) {
                c = q[j];
                q[j] = q[i];
                q[i] = c;
                for(k = 0; k < u.length; k++){
                    temp = u[k][i];
                    u[k][i] = u[k][j];
                    u[k][j] = temp;
                }
                for(k = 0; k < v.length; k++){
                    temp = v[k][i];
                    v[k][i] = v[k][j];
                    v[k][j] = temp;
                }
                i = j;
            }
        }
    }
    return {
        U: u,
        S: q,
        V: v
    };
}
const mod1 = function() {
    return {
        clone: clone2,
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
function rdist(name) {
    return eval(`
      let f=function (arg) { 
        let {n} = arg, v = new Array(n)
        for (let i=0; i<n; i++) v[i] = P.${name}.sample(arg)
        return v
      }; f
    `);
}
const dunif = (arg)=>uniform1.pdf(arg)
;
const punif = (arg)=>uniform1.cdf(arg)
;
const qunif = (arg)=>uniform1.inv(arg)
;
const runif = rdist('uniform');
const dexp = (arg)=>exp1.pdf(arg)
;
const pexp = (arg)=>exp1.cdf(arg)
;
const qexp = (arg)=>exp1.inv(arg)
;
const rexp = rdist('exp');
const dnorm = (arg)=>normal1.pdf(arg)
;
const pnorm = (arg)=>normal1.cdf(arg)
;
const qnorm = (arg)=>normal1.inv(arg)
;
const rnorm = rdist('norm');
const dbeta = (arg)=>beta1.pdf(arg)
;
const pbeta = (arg)=>beta1.cdf(arg)
;
const qbeta = (arg)=>beta1.inv(arg)
;
const rbeta = rdist('beta');
const df = (arg)=>f1.pdf(arg)
;
const pf = (arg)=>f1.cdf(arg)
;
const qf = (arg)=>f1.inv(arg)
;
const rf = rdist('f');
const dcauchy = (arg)=>cauchy1.pdf(arg)
;
const pcauchy = (arg)=>cauchy1.cdf(arg)
;
const qcauchy = (arg)=>cauchy1.inv(arg)
;
const rcauchy = rdist('cauchy');
const dchisq = (arg)=>chiSquare1.pdf(arg)
;
const pchisq = (arg)=>chiSquare1.cdf(arg)
;
const qchisq = (arg)=>chiSquare1.inv(arg)
;
const rchisq = rdist('chisq');
const dgamma = (arg)=>gamma1.pdf(arg)
;
const pgamma = (arg)=>gamma1.cdf(arg)
;
const qgamma = (arg)=>gamma1.inv(arg)
;
const rgamma = rdist('gamma');
const dinvgamma = (arg)=>invGamma1.pdf(arg)
;
const pinvgamma = (arg)=>invGamma1.cdf(arg)
;
const qinvgamma = (arg)=>invGamma1.inv(arg)
;
const rinvgamma = rdist('invgamma');
const dt = (arg)=>t1.pdf(arg)
;
const pt = (arg)=>t1.cdf(arg)
;
const qt = (arg)=>t1.inv(arg)
;
const rt = rdist('t');
const dweibull = (arg)=>weibull1.pdf(arg)
;
const pweibull = (arg)=>weibull1.cdf(arg)
;
const qweibull = (arg)=>weibull1.inv(arg)
;
const rweibull = rdist('weibull');
const mod2 = function() {
    return {
        dunif: dunif,
        punif: punif,
        qunif: qunif,
        runif: runif,
        dexp: dexp,
        pexp: pexp,
        qexp: qexp,
        rexp: rexp,
        dnorm: dnorm,
        pnorm: pnorm,
        qnorm: qnorm,
        rnorm: rnorm,
        dbeta: dbeta,
        pbeta: pbeta,
        qbeta: qbeta,
        rbeta: rbeta,
        df: df,
        pf: pf,
        qf: qf,
        rf: rf,
        dcauchy: dcauchy,
        pcauchy: pcauchy,
        qcauchy: qcauchy,
        rcauchy: rcauchy,
        dchisq: dchisq,
        pchisq: pchisq,
        qchisq: qchisq,
        rchisq: rchisq,
        dgamma: dgamma,
        pgamma: pgamma,
        qgamma: qgamma,
        rgamma: rgamma,
        dinvgamma: dinvgamma,
        pinvgamma: pinvgamma,
        qinvgamma: qinvgamma,
        rinvgamma: rinvgamma,
        dt: dt,
        pt: pt,
        qt: qt,
        rt: rt,
        dweibull: dweibull,
        pweibull: pweibull,
        qweibull: qweibull,
        rweibull: rweibull
    };
}();
export { mod as V };
export { mod1 as M };
export { mod2 as R };
