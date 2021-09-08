import * as U from "./util.ts"
import * as V from "./vector.ts"
import * as M from "./matrix.ts"

const step = 0.01

// n 次微分 : 參考 https://en.wikipedia.org/wiki/Finite_difference
export function diffn(f, n, x = null, h = step) {
    U.be(n >= 0)
    if (n === 0) return f(x)
    h = h / 2 // 讓 1, 2, .... n 次微分的最大距離都一樣
    var x1 = (x == null) ? null : x + h
    var x_1 = (x == null) ? null : x - h
    return (diffn(f, n - 1, x1) - diffn(f, n - 1, x_1)) / (2 * h)
}

export function diff(f, x, h = step) {
    return diffn(f, 1, x, h)
}

// n 階偏導數
export function pdiffn(f, i, n, v, h = step) {
    if (n === 0) return f(v)
    h = h / 2 // 讓 1, 2, .... n 次微分的最大距離都一樣
    let d = function (f, i, n, v) {
        let v1 = null, v_1 = null
        if (v != null) {
            v1 = v.slice(0); v1[i] += h
            v_1 = v.slice(0); v_1[i] -= h
        }
        return (pdiffn(f, i, n - 1, v1) - pdiffn(f, i, n - 1, v_1)) / (2 * h)
    }
    return (v == null) ? d : d(f, i, n, v)
}

export function pdiff(f, i, x, h = step) { return pdiffn(f, i, 1, x, h) }

// 梯度 gradient : grad(f,x)=[pdiff(f,x,0), .., pdiff(f,x,n)]
export function grad(f, v, h = step) {
    let len = (typeof v == 'number') ? v : v.length
    let vt = (typeof v == 'number') ? null : v
    let g = new Array(len)
    for (let i = 0; i < len; i++) {
        g[i] = pdiff(f, i, vt) // 對第 i 個變數取偏導數後，放入梯度向量 g 中
    }
    return g
}

// 散度 divergence : div(fv,x) = sum(pdiff(fv[i],v,i))
// 說明： fv=[f1,f2,...,fn] 可微分向量函數
export function divergence(fv, v) {
    console.log('div:fv=', fv)
    let len = v.length, d = new Array(len)
    for (var i = 0; i < len; i++) {
        d[i] = pdiff(fv[i], i, v)
    }
    return V.sum(d)
}

// divergence = div

export function is3D(fv, v) {
    if (fv.length !== 3 || v.length !== 3) throw Error('curl(fv, v): dimension should be 3')
}

// 旋度 curl : curl(fv, x) = [pf32-pf23,pf13-pf31,pf21-pf12]
export function curl(fv, v) {
    is3D(fv, v);
    let pf = function (i, j) { return pdiff(fv[i], j) }
    return [pf(2, 1)(v) - pf(1, 2)(v),
    pf(0, 2)(v) - pf(2, 0)(v),
    pf(1, 0)(v) - pf(0, 1)(v)]
}

// 拉普拉斯算子 : df2(x) + df2(y) + ....
export function laplaceOperator(f, v) {
    let len = v.length, df2 = new Array(len)
    for (let i = 0; i < len; i++) {
        df2[i] = pdiffn(f, i, 2, v)
    }
    return V.sum(df2)
}

export function jocobian(fv, v) {
    let len = fv.length
    let J = M.new(len, len)
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            J[i][j] = pdiff(fv[i], j, v)
        }
    }
    return J
}

// ============================ 積分 ================================
// 積分 integral calculus
export function integral(f, a, b, h = step) {
    var area = 0.0
    for (var x = a; x < b; x = x + h) {
        area = area + f(x) * h
    }
    return area
}

// 線積分： int F●dr = int F(r(t))●r'(t) dt
export function vintegral(F, r, a, b, dt = step) {
    var sum = 0
    for (var t = a; t < b; t += dt) {
        sum += V.dot(F(r(t)) * diff(r, t, dt))
    }
    return sum
}

// 多重積分 -- multidimensional integral calculus
// f=[f1,f2,....] , a=[a1,a2,...] , b=[b1,b2,....]
export function pintegral(f, a, b) {
}

// ============================== 定理 ==============================

// 定理: 梯度的散度 = 拉普拉斯算子
// 注意：這裡用數值微分只取到一階，無法反映《引力場的拉普拉斯應該為 0》 的特性。若用自動微分應該就會是 0。
export function theoremDivGradEqLaplace(f, v) {
    let len = v.length
    let divGrad = divergence(grad(f, len), v)
    let laplace = laplaceOperator(f, v)
    console.log('div(grad(f,v))=', divGrad, ' laplace=', laplace)
    uu6.near(divGrad, laplace)
}

// 定理：梯度的旋度 = 零
export function theoremCurlGradZero(f, v) {
    let len = v.length
    let r = curl(grad(f, len), v)
    console.log('curl(grad(f,v))=', r)
    uu6.near(r, V.array(len, 0))
}

// 定理：旋度的散度 = 零
export function theoremDivCurlZero(f, v) {
    let len = v.length
    let r = div(curl(f, len), v)
    console.log('div(curl(f,v))=', r)
    uu6.near(r, V.array(len, 0))
}