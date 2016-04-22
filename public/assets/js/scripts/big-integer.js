/**
 * Created by ns on 16/04/16.
 */
var bigInt = function (E) {
    function k(a, b) {
        if ("undefined" === typeof a)return k[0];
        if ("undefined" !== typeof b) {
            var c;
            if (10 === +b)c = l(a); else {
                c = b;
                var n = k[0], f = k[1], d = a.length;
                if (2 <= c && 36 >= c && d <= ga / Math.log(c))c = new e(parseInt(a, c)); else {
                    c = l(c);
                    var d = [], g, h = "-" === a[0];
                    for (g = h ? 1 : 0; g < a.length; g++) {
                        var q = a[g].toLowerCase(), u = q.charCodeAt(0);
                        if (48 <= u && 57 >= u)d.push(l(q)); else if (97 <= u && 122 >= u)d.push(l(q.charCodeAt(0) - 87)); else if ("<" === q) {
                            q = g;
                            do g++; while (">" !== a[g]);
                            d.push(l(a.slice(q + 1, g)))
                        } else throw Error(q +
                            " is not a valid character");
                    }
                    d.reverse();
                    for (g = 0; g < d.length; g++)n = n.add(d[g].times(f)), f = f.times(c);
                    c = h ? n.negate() : n
                }
            }
            return c
        }
        return l(a)
    }

    function d(a, b) {
        this.value = a;
        this.sign = b;
        this.isSmall = !1
    }

    function e(a) {
        this.value = a;
        this.sign = 0 > a;
        this.isSmall = !0
    }

    function w(a) {
        return -9007199254740992 < a && 9007199254740992 > a
    }

    function z(a) {
        return 1E7 > a ? [a] : 1E14 > a ? [a % 1E7, Math.floor(a / 1E7)] : [a % 1E7, Math.floor(a / 1E7) % 1E7, Math.floor(a / 1E14)]
    }

    function y(a) {
        D(a);
        var b = a.length;
        if (4 > b && 0 > A(a, P))switch (b) {
            case 0:
                return 0;
            case 1:
                return a[0];
            case 2:
                return a[0] + 1E7 * a[1];
            default:
                return a[0] + 1E7 * (a[1] + 1E7 * a[2])
        }
        return a
    }

    function D(a) {
        for (var b = a.length; 0 === a[--b];);
        a.length = b + 1
    }

    function K(a) {
        for (var b = Array(a), c = -1; ++c < a;)b[c] = 0;
        return b
    }

    function B(a) {
        return 0 < a ? Math.floor(a) : Math.ceil(a)
    }

    function S(a, b) {
        var c = a.length, d = b.length, f = Array(c), m = 0, g, e;
        for (e = 0; e < d; e++)g = a[e] + b[e] + m, m = 1E7 <= g ? 1 : 0, f[e] = g - 1E7 * m;
        for (; e < c;)g = a[e] + m, m = 1E7 === g ? 1 : 0, f[e++] = g - 1E7 * m;
        0 < m && f.push(m);
        return f
    }

    function F(a, b) {
        return a.length >= b.length ? S(a,
            b) : S(b, a)
    }

    function L(a, b) {
        var c = a.length, d = Array(c), f, e;
        for (e = 0; e < c; e++)f = a[e] - 1E7 + b, b = Math.floor(f / 1E7), d[e] = f - 1E7 * b, b += 1;
        for (; 0 < b;)d[e++] = b % 1E7, b = Math.floor(b / 1E7);
        return d
    }

    function G(a, b) {
        var c = a.length, d = b.length, f = Array(c), e = 0, g, h;
        for (g = 0; g < d; g++)h = a[g] - e - b[g], 0 > h ? (h += 1E7, e = 1) : e = 0, f[g] = h;
        for (g = d; g < c; g++) {
            h = a[g] - e;
            if (0 > h)h += 1E7; else {
                f[g++] = h;
                break
            }
            f[g] = h
        }
        for (; g < c; g++)f[g] = a[g];
        D(f);
        return f
    }

    function M(a, b, c) {
        var n = a.length, f = Array(n);
        b = -b;
        var m, g;
        for (m = 0; m < n; m++)g = a[m] + b, b = Math.floor(g / 1E7), g %=
            1E7, f[m] = 0 > g ? g + 1E7 : g;
        f = y(f);
        return "number" === typeof f ? (c && (f = -f), new e(f)) : new d(f, c)
    }

    function Q(a, b) {
        var c = a.length, d = b.length, f = K(c + d), e, g, h, k;
        for (h = 0; h < c; ++h) {
            k = a[h];
            for (var l = 0; l < d; ++l)e = b[l], e = k * e + f[h + l], g = Math.floor(e / 1E7), f[h + l] = e - 1E7 * g, f[h + l + 1] += g
        }
        D(f);
        return f
    }

    function H(a, b) {
        var c = a.length, d = Array(c), f = 0, e, g;
        for (g = 0; g < c; g++)e = a[g] * b + f, f = Math.floor(e / 1E7), d[g] = e - 1E7 * f;
        for (; 0 < f;)d[g++] = f % 1E7, f = Math.floor(f / 1E7);
        return d
    }

    function T(a, b) {
        for (var c = []; 0 < b--;)c.push(0);
        return c.concat(a)
    }

    function N(a,
               b) {
        var c = Math.max(a.length, b.length);
        if (30 >= c)return Q(a, b);
        var c = Math.ceil(c / 2), d = a.slice(c), f = a.slice(0, c), e = b.slice(c), g = b.slice(0, c), h = N(f, g), k = N(d, e), d = N(F(f, d), F(g, e)), c = F(F(h, T(G(G(d, h), k), c)), T(k, 2 * c));
        D(c);
        return c
    }

    function U(a, b, c) {
        return 1E7 > a ? new d(H(b, a), c) : new d(Q(b, z(a)), c)
    }

    function V(a) {
        var b = a.length, c = K(b + b), d, f, e, g;
        for (e = 0; e < b; e++) {
            g = a[e];
            for (var h = 0; h < b; h++)d = a[h], d = g * d + c[e + h], f = Math.floor(d / 1E7), c[e + h] = d - 1E7 * f, c[e + h + 1] += f
        }
        D(c);
        return c
    }

    function W(a, b) {
        var c = a.length, d = K(c), f,
            e;
        e = 0;
        for (--c; 0 <= c; --c)e = 1E7 * e + a[c], f = B(e / b), e -= f * b, d[c] = f | 0;
        return [d, e | 0]
    }

    function I(a, b) {
        var c, n = l(b), f = a.value;
        c = n.value;
        if (0 === c)throw Error("Cannot divide by zero");
        if (a.isSmall)return n.isSmall ? [new e(B(f / c)), new e(f % c)] : [k[0], a];
        if (n.isSmall) {
            if (1 === c)return [a, k[0]];
            if (-1 == c)return [a.negate(), k[0]];
            c = Math.abs(c);
            if (1E7 > c)return c = W(f, c), f = y(c[0]), c = c[1], a.sign && (c = -c), "number" === typeof f ? (a.sign !== n.sign && (f = -f), [new e(f), new e(c)]) : [new d(f, a.sign !== n.sign), new e(c)];
            c = z(c)
        }
        var m = A(f, c);
        if (-1 ===
            m)return [k[0], a];
        if (0 === m)return [k[a.sign === n.sign ? 1 : -1], k[0]];
        if (200 >= f.length + c.length) {
            var g = c, h = f.length;
            c = g.length;
            var m = K(g.length), q = g[c - 1], u = Math.ceil(1E7 / (2 * q)), f = H(f, u), g = H(g, u), p, r, x, t, v, w;
            f.length <= h && f.push(0);
            g.push(0);
            q = g[c - 1];
            for (p = h - c; 0 <= p; p--) {
                h = 9999999;
                f[p + c] !== q && (h = Math.floor((1E7 * f[p + c] + f[p + c - 1]) / q));
                x = r = 0;
                v = g.length;
                for (t = 0; t < v; t++)r += h * g[t], w = Math.floor(r / 1E7), x += f[p + t] - (r - 1E7 * w), r = w, 0 > x ? (f[p + t] = x + 1E7, x = -1) : (f[p + t] = x, x = 0);
                for (; 0 !== x;) {
                    --h;
                    for (t = r = 0; t < v; t++)r += f[p + t] - 1E7 + g[t],
                        0 > r ? (f[p + t] = r + 1E7, r = 0) : (f[p + t] = r, r = 1);
                    x += r
                }
                m[p] = h
            }
            f = W(f, u)[0];
            c = [y(m), y(f)]
        } else {
            m = f.length;
            q = c.length;
            u = [];
            for (g = []; m;)if (g.unshift(f[--m]), 0 > A(g, c))u.push(0); else {
                h = g.length;
                p = 1E7 * g[h - 1] + g[h - 2];
                r = 1E7 * c[q - 1] + c[q - 2];
                h > q && (p = 1E7 * (p + 1));
                h = Math.ceil(p / r);
                do {
                    p = H(c, h);
                    if (0 >= A(p, g))break;
                    h--
                } while (h);
                u.push(h);
                g = G(g, p)
            }
            u.reverse();
            c = [y(u), y(g)]
        }
        f = c[0];
        n = a.sign !== n.sign;
        c = c[1];
        m = a.sign;
        "number" === typeof f ? (n && (f = -f), f = new e(f)) : f = new d(f, n);
        "number" === typeof c ? (m && (c = -c), c = new e(c)) : c = new d(c, m);
        return [f,
            c]
    }

    function A(a, b) {
        if (a.length !== b.length)return a.length > b.length ? 1 : -1;
        for (var c = a.length - 1; 0 <= c; c--)if (a[c] !== b[c])return a[c] > b[c] ? 1 : -1;
        return 0
    }

    function X(a) {
        a = a.abs();
        if (a.isUnit())return !1;
        if (a.equals(2) || a.equals(3) || a.equals(5))return !0;
        if (a.isEven() || a.isDivisibleBy(3) || a.isDivisibleBy(5))return !1;
        if (a.lesser(25))return !0
    }

    function Y(a) {
        return ("number" === typeof a || "string" === typeof a) && 1E7 >= +Math.abs(a) || a instanceof d && 1 >= a.value.length
    }

    function R(a, b, c) {
        b = l(b);
        var d = a.isNegative(), e = b.isNegative(),
            m = d ? a.not() : a, g = e ? b.not() : b;
        b = [];
        a = [];
        for (var h = !1, k = !1; !h || !k;)m.isZero() ? (h = !0, b.push(d ? 1 : 0)) : d ? b.push(m.isEven() ? 1 : 0) : b.push(m.isEven() ? 0 : 1), g.isZero() ? (k = !0, a.push(e ? 1 : 0)) : e ? a.push(g.isEven() ? 1 : 0) : a.push(g.isEven() ? 0 : 1), m = m.over(2), g = g.over(2);
        d = [];
        for (e = 0; e < b.length; e++)d.push(c(b[e], a[e]));
        for (c = bigInt(d.pop()).negate().times(bigInt(2).pow(d.length)); d.length;)c = c.add(bigInt(d.pop()).times(bigInt(2).pow(d.length)));
        return c
    }

    function O(a) {
        a = a.value;
        a = "number" === typeof a ? a | 1073741824 : a[0] + 1E7 *
        a[1] | 1073758208;
        return a & -a
    }

    function Z(a, b) {
        a = l(a);
        b = l(b);
        return a.greater(b) ? a : b
    }

    function aa(a, b) {
        a = l(a);
        b = l(b);
        return a.lesser(b) ? a : b
    }

    function ba(a, b) {
        a = l(a).abs();
        b = l(b).abs();
        if (a.equals(b))return a;
        if (a.isZero())return b;
        if (b.isZero())return a;
        for (var c = k[1], d; a.isEven() && b.isEven();)d = Math.min(O(a), O(b)), a = a.divide(d), b = b.divide(d), c = c.multiply(d);
        for (; a.isEven();)a = a.divide(O(a));
        do {
            for (; b.isEven();)b = b.divide(O(b));
            a.greater(b) && (d = b, b = a, a = d);
            b = b.subtract(a)
        } while (!b.isZero());
        return c.isUnit() ?
            a : a.multiply(c)
    }

    function ca(a) {
        a = a.value;
        "number" === typeof a && (a = [a]);
        return 1 === a.length && 35 >= a[0] ? "0123456789abcdefghijklmnopqrstuvwxyz".charAt(a[0]) : "<" + a + ">"
    }

    function da(a, b) {
        b = bigInt(b);
        if (b.isZero()) {
            if (a.isZero())return "0";
            throw Error("Cannot convert nonzero numbers to base 0.");
        }
        if (b.equals(-1))return a.isZero() ? "0" : a.isNegative() ? Array(1 - a).join("10") : "1" + Array(+a).join("01");
        var c = "";
        a.isNegative() && b.isPositive() && (c = "-", a = a.abs());
        if (b.equals(1))return a.isZero() ? "0" : c + Array(+a + 1).join(1);
        for (var d = [], e = a, k; e.isNegative() || 0 <= e.compareAbs(b);)k = e.divmod(b), e = k.quotient, k = k.remainder, k.isNegative() && (k = b.minus(k).abs(), e = e.next()), d.push(ca(k));
        d.push(ca(e));
        return c + d.reverse().join("")
    }

    function ea(a) {
        if (w(+a)) {
            var b = +a;
            if (b === B(b))return new e(b);
            throw"Invalid integer: " + a;
        }
        (b = "-" === a[0]) && (a = a.slice(1));
        var c = a.split(/e/i);
        if (2 < c.length)throw Error("Invalid integer: " + c.join("e"));
        if (2 === c.length) {
            a = c[1];
            "+" === a[0] && (a = a.slice(1));
            a = +a;
            if (a !== B(a) || !w(a))throw Error("Invalid integer: " +
                a + " is not a valid exponent.");
            var c = c[0], n = c.indexOf(".");
            0 <= n && (a -= c.length - n - 1, c = c.slice(0, n) + c.slice(n + 1));
            if (0 > a)throw Error("Cannot include negative exponent part for integers");
            a = c += Array(a + 1).join("0")
        }
        if (!/^([0-9][0-9]*)$/.test(a))throw Error("Invalid integer: " + a);
        for (var c = [], n = a.length, f = n - 7; 0 < n;)c.push(+a.slice(f, n)), f -= 7, 0 > f && (f = 0), n -= 7;
        D(c);
        return new d(c, b)
    }

    function l(a) {
        if ("number" === typeof a) {
            if (w(a)) {
                if (a !== B(a))throw Error(a + " is not an integer.");
                a = new e(a)
            } else a = ea(a.toString());
            return a
        }
        return "string" === typeof a ? ea(a) : a
    }

    var P = z(9007199254740992), ga = Math.log(9007199254740992);
    d.prototype = Object.create(k.prototype);
    e.prototype = Object.create(k.prototype);
    d.prototype.add = function (a) {
        a = l(a);
        if (this.sign !== a.sign)return this.subtract(a.negate());
        var b = this.value, c = a.value;
        return a.isSmall ? new d(L(b, Math.abs(c)), this.sign) : new d(F(b, c), this.sign)
    };
    d.prototype.plus = d.prototype.add;
    e.prototype.add = function (a) {
        a = l(a);
        var b = this.value;
        if (0 > b !== a.sign)return this.subtract(a.negate());
        var c = a.value;
        if (a.isSmall) {
            if (w(b + c))return new e(b + c);
            c = z(Math.abs(c))
        }
        return new d(L(c, Math.abs(b)), 0 > b)
    };
    e.prototype.plus = e.prototype.add;
    d.prototype.subtract = function (a) {
        var b = l(a);
        if (this.sign !== b.sign)return this.add(b.negate());
        a = this.value;
        var c = b.value;
        if (b.isSmall)return M(a, Math.abs(c), this.sign);
        b = this.sign;
        0 <= A(a, c) ? a = G(a, c) : (a = G(c, a), b = !b);
        a = y(a);
        "number" === typeof a ? (b && (a = -a), a = new e(a)) : a = new d(a, b);
        return a
    };
    d.prototype.minus = d.prototype.subtract;
    e.prototype.subtract = function (a) {
        a =
            l(a);
        var b = this.value;
        if (0 > b !== a.sign)return this.add(a.negate());
        var c = a.value;
        return a.isSmall ? new e(b - c) : M(c, Math.abs(b), 0 <= b)
    };
    e.prototype.minus = e.prototype.subtract;
    d.prototype.negate = function () {
        return new d(this.value, !this.sign)
    };
    e.prototype.negate = function () {
        var a = this.sign, b = new e(-this.value);
        b.sign = !a;
        return b
    };
    d.prototype.abs = function () {
        return new d(this.value, !1)
    };
    e.prototype.abs = function () {
        return new e(Math.abs(this.value))
    };
    d.prototype.multiply = function (a) {
        var b = l(a);
        a = this.value;
        var c =
            b.value, e = this.sign !== b.sign;
        if (b.isSmall) {
            if (0 === c)return k[0];
            if (1 === c)return this;
            if (-1 === c)return this.negate();
            c = Math.abs(c);
            if (1E7 > c)return new d(H(a, c), e);
            c = z(c)
        }
        var b = a.length, f = c.length;
        return 0 < -.012 * b - .012 * f + 1.5E-5 * b * f ? new d(N(a, c), e) : new d(Q(a, c), e)
    };
    d.prototype.times = d.prototype.multiply;
    e.prototype._multiplyBySmall = function (a) {
        return w(a.value * this.value) ? new e(a.value * this.value) : U(Math.abs(a.value), z(Math.abs(this.value)), this.sign !== a.sign)
    };
    d.prototype._multiplyBySmall = function (a) {
        return 0 ===
        a.value ? k[0] : 1 === a.value ? this : -1 === a.value ? this.negate() : U(Math.abs(a.value), this.value, this.sign !== a.sign)
    };
    e.prototype.multiply = function (a) {
        return l(a)._multiplyBySmall(this)
    };
    e.prototype.times = e.prototype.multiply;
    d.prototype.square = function () {
        return new d(V(this.value), !1)
    };
    e.prototype.square = function () {
        var a = this.value * this.value;
        return w(a) ? new e(a) : new d(V(z(Math.abs(this.value))), !1)
    };
    d.prototype.divmod = function (a) {
        a = I(this, a);
        return {quotient: a[0], remainder: a[1]}
    };
    e.prototype.divmod = d.prototype.divmod;
    d.prototype.divide = function (a) {
        return I(this, a)[0]
    };
    e.prototype.over = e.prototype.divide = d.prototype.over = d.prototype.divide;
    d.prototype.mod = function (a) {
        return I(this, a)[1]
    };
    e.prototype.remainder = e.prototype.mod = d.prototype.remainder = d.prototype.mod;
    d.prototype.pow = function (a) {
        var b = l(a), c = this.value;
        a = b.value;
        var d;
        if (0 === a)return k[1];
        if (0 === c)return k[0];
        if (1 === c)return k[1];
        if (-1 === c)return b.isEven() ? k[1] : k[-1];
        if (b.sign)return k[0];
        if (!b.isSmall)throw Error("The exponent " + b.toString() + " is too large.");
        if (this.isSmall && w(d = Math.pow(c, a)))return new e(B(d));
        d = this;
        for (b = k[1]; ;) {
            a & 1 && (b = b.times(d), --a);
            if (0 === a)break;
            a /= 2;
            d = d.square()
        }
        return b
    };
    e.prototype.pow = d.prototype.pow;
    d.prototype.modPow = function (a, b) {
        a = l(a);
        b = l(b);
        if (b.isZero())throw Error("Cannot take modPow with modulus 0");
        for (var c = k[1], d = this.mod(b); a.isPositive();) {
            if (d.isZero())return k[0];
            a.isOdd() && (c = c.multiply(d).mod(b));
            a = a.divide(2);
            d = d.square().mod(b)
        }
        return c
    };
    e.prototype.modPow = d.prototype.modPow;
    d.prototype.compareAbs = function (a) {
        a =
            l(a);
        return a.isSmall ? 1 : A(this.value, a.value)
    };
    e.prototype.compareAbs = function (a) {
        a = l(a);
        var b = Math.abs(this.value), c = a.value;
        return a.isSmall ? (c = Math.abs(c), b === c ? 0 : b > c ? 1 : -1) : -1
    };
    d.prototype.compare = function (a) {
        if (Infinity === a)return -1;
        if (-Infinity === a)return 1;
        a = l(a);
        return this.sign !== a.sign ? a.sign ? 1 : -1 : a.isSmall ? this.sign ? -1 : 1 : A(this.value, a.value) * (this.sign ? -1 : 1)
    };
    d.prototype.compareTo = d.prototype.compare;
    e.prototype.compare = function (a) {
        if (Infinity === a)return -1;
        if (-Infinity === a)return 1;
        a = l(a);
        var b = this.value, c = a.value;
        return a.isSmall ? b == c ? 0 : b > c ? 1 : -1 : 0 > b !== a.sign ? 0 > b ? -1 : 1 : 0 > b ? 1 : -1
    };
    e.prototype.compareTo = e.prototype.compare;
    d.prototype.equals = function (a) {
        return 0 === this.compare(a)
    };
    e.prototype.eq = e.prototype.equals = d.prototype.eq = d.prototype.equals;
    d.prototype.notEquals = function (a) {
        return 0 !== this.compare(a)
    };
    e.prototype.neq = e.prototype.notEquals = d.prototype.neq = d.prototype.notEquals;
    d.prototype.greater = function (a) {
        return 0 < this.compare(a)
    };
    e.prototype.gt = e.prototype.greater = d.prototype.gt =
        d.prototype.greater;
    d.prototype.lesser = function (a) {
        return 0 > this.compare(a)
    };
    e.prototype.lt = e.prototype.lesser = d.prototype.lt = d.prototype.lesser;
    d.prototype.greaterOrEquals = function (a) {
        return 0 <= this.compare(a)
    };
    e.prototype.geq = e.prototype.greaterOrEquals = d.prototype.geq = d.prototype.greaterOrEquals;
    d.prototype.lesserOrEquals = function (a) {
        return 0 >= this.compare(a)
    };
    e.prototype.leq = e.prototype.lesserOrEquals = d.prototype.leq = d.prototype.lesserOrEquals;
    d.prototype.isEven = function () {
        return 0 === (this.value[0] &
            1)
    };
    e.prototype.isEven = function () {
        return 0 === (this.value & 1)
    };
    d.prototype.isOdd = function () {
        return 1 === (this.value[0] & 1)
    };
    e.prototype.isOdd = function () {
        return 1 === (this.value & 1)
    };
    d.prototype.isPositive = function () {
        return !this.sign
    };
    e.prototype.isPositive = function () {
        return 0 < this.value
    };
    d.prototype.isNegative = function () {
        return this.sign
    };
    e.prototype.isNegative = function () {
        return 0 > this.value
    };
    d.prototype.isUnit = function () {
        return !1
    };
    e.prototype.isUnit = function () {
        return 1 === Math.abs(this.value)
    };
    d.prototype.isZero =
        function () {
            return !1
        };
    e.prototype.isZero = function () {
        return 0 === this.value
    };
    d.prototype.isDivisibleBy = function (a) {
        a = l(a);
        var b = a.value;
        return 0 === b ? !1 : 1 === b ? !0 : 2 === b ? this.isEven() : this.mod(a).equals(k[0])
    };
    e.prototype.isDivisibleBy = d.prototype.isDivisibleBy;
    d.prototype.isPrime = function () {
        var a = X(this);
        if (a !== E)return a;
        for (var a = this.abs(), b = a.prev(), c = [2, 3, 5, 7, 11, 13, 17, 19], d = b, e, l, g, h; d.isEven();)d = d.divide(2);
        for (g = 0; g < c.length; g++)if (h = bigInt(c[g]).modPow(d, a), !h.equals(k[1]) && !h.equals(b)) {
            l = !0;
            for (e = d; l && e.lesser(b); e = e.multiply(2))h = h.square().mod(a), h.equals(b) && (l = !1);
            if (l)return !1
        }
        return !0
    };
    e.prototype.isPrime = d.prototype.isPrime;
    d.prototype.isProbablePrime = function (a) {
        var b = X(this);
        if (b !== E)return b;
        b = this.abs();
        a = a === E ? 5 : a;
        for (var c = 0; c < a; c++)if (!bigInt.randBetween(2, b.minus(2)).modPow(b.prev(), b).isUnit())return !1;
        return !0
    };
    e.prototype.isProbablePrime = d.prototype.isProbablePrime;
    d.prototype.next = function () {
        var a = this.value;
        return this.sign ? M(a, 1, this.sign) : new d(L(a, 1), this.sign)
    };
    e.prototype.next = function () {
        var a = this.value;
        return 9007199254740992 > a + 1 ? new e(a + 1) : new d(P, !1)
    };
    d.prototype.prev = function () {
        var a = this.value;
        return this.sign ? new d(L(a, 1), !0) : M(a, 1, this.sign)
    };
    e.prototype.prev = function () {
        var a = this.value;
        return -9007199254740992 < a - 1 ? new e(a - 1) : new d(P, !0)
    };
    for (var v = [1]; 1E7 >= v[v.length - 1];)v.push(2 * v[v.length - 1]);
    var J = v.length, fa = v[J - 1];
    d.prototype.shiftLeft = function (a) {
        if (!Y(a))throw Error(String(a) + " is too large for shifting.");
        a = +a;
        if (0 > a)return this.shiftRight(-a);
        for (var b = this; a >= J;)b = b.multiply(fa), a -= J - 1;
        return b.multiply(v[a])
    };
    e.prototype.shiftLeft = d.prototype.shiftLeft;
    d.prototype.shiftRight = function (a) {
        var b;
        if (!Y(a))throw Error(String(a) + " is too large for shifting.");
        a = +a;
        if (0 > a)return this.shiftLeft(-a);
        for (b = this; a >= J;) {
            if (b.isZero())return b;
            b = I(b, fa);
            b = b[1].isNegative() ? b[0].prev() : b[0];
            a -= J - 1
        }
        b = I(b, v[a]);
        return b[1].isNegative() ? b[0].prev() : b[0]
    };
    e.prototype.shiftRight = d.prototype.shiftRight;
    d.prototype.not = function () {
        return this.negate().prev()
    };
    e.prototype.not = d.prototype.not;
    d.prototype.and = function (a) {
        return R(this, a, function (a, c) {
            return a & c
        })
    };
    e.prototype.and = d.prototype.and;
    d.prototype.or = function (a) {
        return R(this, a, function (a, c) {
            return a | c
        })
    };
    e.prototype.or = d.prototype.or;
    d.prototype.xor = function (a) {
        return R(this, a, function (a, c) {
            return a ^ c
        })
    };
    e.prototype.xor = d.prototype.xor;
    d.prototype.toString = function (a) {
        a === E && (a = 10);
        if (10 !== a)return da(this, a);
        a = this.value;
        for (var b = a.length, c = String(a[--b]), d; 0 <= --b;)d = String(a[b]), c += "0000000".slice(d.length) +
            d;
        return (this.sign ? "-" : "") + c
    };
    e.prototype.toString = function (a) {
        a === E && (a = 10);
        return 10 != a ? da(this, a) : String(this.value)
    };
    d.prototype.valueOf = function () {
        return +this.toString()
    };
    d.prototype.toJSNumber = d.prototype.valueOf;
    e.prototype.valueOf = function () {
        return this.value
    };
    e.prototype.toJSNumber = e.prototype.valueOf;
    for (var C = 0; 1E3 > C; C++)k[C] = new e(C), 0 < C && (k[-C] = new e(-C));
    k.one = k[1];
    k.zero = k[0];
    k.minusOne = k[-1];
    k.max = Z;
    k.min = aa;
    k.gcd = ba;
    k.lcm = function (a, b) {
        a = l(a).abs();
        b = l(b).abs();
        return a.divide(ba(a,
            b)).multiply(b)
    };
    k.isInstance = function (a) {
        return a instanceof d || a instanceof e
    };
    k.randBetween = function (a, b) {
        a = l(a);
        b = l(b);
        var c = aa(a, b), k = Z(a, b).subtract(c);
        if (k.isSmall)return c.add(Math.round(Math.random() * k));
        for (var f = [], m = !0, g = k.value.length - 1; 0 <= g; g--) {
            var h = m ? k.value[g] : 1E7, q = B(Math.random() * h);
            f.unshift(q);
            q < h && (m = !1)
        }
        f = y(f);
        return c.add("number" === typeof f ? new e(f) : new d(f, !1))
    };
    return k
}();
"undefined" !== typeof module && module.hasOwnProperty("exports") && (module.exports = bigInt);