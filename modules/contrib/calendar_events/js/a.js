/*
 0BSD
*/
(function (F, y) { "function" === typeof define && define.amd ? define(y) : "object" === typeof exports ? module.exports = y() : F.pickmeup = y() })(this, function () {
    function F(a, c, b) { b = b || []; if (a instanceof Element) c.apply(c, [a].concat(b)); else { var d; var e = a.length; for (d = 0; d < e; ++d)c.apply(c, [a[d]].concat(b)) } } function y(a) { F(a, function (a) { a.parentElement.removeChild(a) }) } function J(a, c) { do a = a.parentElement; while (a && !B(a, c)); return a } function B(a, c) {
        return (a.matches || a.webkitMatchesSelector || a.msMatchesSelector).call(a,
            c)
    } function k(a, c) { return a && a.classList.contains(c) } function l(a, c) { a.classList.add(c) } function q(a, c, b, d) { if (-1 !== b.indexOf(" ")) { b = b.split(" "); var e = b.length, h; for (h = 0; h < e; ++h)q(a, c, b[h], d) } else a.__pickmeup.events.push([c, b, d]), c.addEventListener(b, d) } function z(a, c, b, d) {
        var e; if (b && -1 !== b.indexOf(" ")) { var h = b.split(" "); var l = h.length; for (e = 0; e < l; ++e)z(a, c, h[e], d) } else for (h = a.__pickmeup.events, l = h.length, e = 0; e < l; ++e)c && c !== h[e][0] || b && b !== h[e][1] || d && d !== h[e][2] || h[e][0].removeEventListener(h[e][1],
            h[e][2])
    } function M(a) { a = a.getBoundingClientRect(); return { top: a.top + window.pageYOffset - document.documentElement.clientTop, left: a.left + window.pageXOffset - document.documentElement.clientLeft } } function C(a, c, b) { var d = document.createEvent("Event"); b && (d.detail = b); d.initEvent("pickmeup-" + c, !1, !0); return a.dispatchEvent(d) } function K(a) { a = new Date(a); for (var c = 28, b = a.getMonth(); a.getMonth() === b;)++c, a.setDate(c); return c - 1 } function A(a, c) { a.setDate(a.getDate() + c) } function p(a, c) {
        var b = a.getDate(); a.setDate(1);
        a.setMonth(a.getMonth() + c); a.setDate(Math.min(b, K(a)))
    } function u(a, c) { var b = a.getDate(); a.setDate(1); a.setFullYear(a.getFullYear() + c); a.setDate(Math.min(b, K(a))) } function N(a) {
        var c = a.__pickmeup.element, b = a.__pickmeup.options, d = Math.floor(b.calendars / 2), e = b.date, h = b.current, m = b.min ? new Date(b.min) : null, v = b.max ? new Date(b.max) : null; m && (m.setDate(1), p(m, 1), A(m, -1)); v && (v.setDate(1), p(v, 1), A(v, -1)); y(Array.prototype.slice.call(c.querySelectorAll(".pmu-instance > :not(nav)"))); for (var w = 0; w < b.calendars; w++) {
            var f =
                new Date(h); x(f); var n = Array.prototype.slice.call(c.querySelectorAll(".pmu-instance"))[w]; if (k(c, "pmu-view-years")) { u(f, 12 * (w - d)); var G = f.getFullYear() - 6 + " - " + (f.getFullYear() + 5) } else k(c, "pmu-view-months") ? (u(f, w - d), G = f.getFullYear()) : k(c, "pmu-view-days") && (p(f, w - d), G = "function" === typeof b.title_format ? b.title_format(f, b.locales[b.locale]) : D(f, b.title_format, b.locales[b.locale])); if (!r && v) {
                    var r = new Date(f); b.select_day ? p(r, b.calendars - 1) : b.select_month ? u(r, b.calendars - 1) : u(r, 12 * (b.calendars - 1));
                    if (r > v) { --w; p(h, -1); r = void 0; continue }
                } r = new Date(f); if (!g) { var g = new Date(f); g.setDate(1); p(g, 1); A(g, -1); if (m && m > g) { --w; p(h, 1); g = void 0; continue } } n.querySelector(".pmu-month").innerHTML = G; var q = function (a) { return "range" === b.mode && a >= (new Date(e[0])).getFullYear() && a <= (new Date(e[1])).getFullYear() || "multiple" === b.mode && -1 !== e.reduce(function (a, b) { a.push((new Date(b)).getFullYear()); return a }, []).indexOf(a) || (new Date(e)).getFullYear() === a }, t = function (a, c) {
                    var d = (new Date(e[0])).getFullYear(), f = (new Date(e[1])).getFullYear(),
                        h = (new Date(e[0])).getMonth(), g = (new Date(e[1])).getMonth(); return "range" === b.mode && (a > d && a < f || a > d && a === f && c <= g || a === d && a < f && c >= h || a === d && a === f && c >= h && c <= g) || "multiple" === b.mode && -1 !== e.reduce(function (a, b) { b = new Date(b); a.push(b.getFullYear() + "-" + b.getMonth()); return a }, []).indexOf(a + "-" + c) || (new Date(e)).getFullYear() === a && (new Date(e)).getMonth() === c
                }; (function () {
                    var a = [], c = f.getFullYear() - 6, d = (new Date(b.min)).getFullYear(), e = (new Date(b.max)).getFullYear(), h; for (h = 0; 12 > h; ++h) {
                        var g = c + h; var m =
                            document.createElement("div"); m.textContent = g; m.__pickmeup_year = g; b.min && g < d || b.max && g > e ? l(m, "pmu-disabled") : q(g) && l(m, "pmu-selected"); a.push(m)
                    } n.appendChild(b.instance_content_template(a, "pmu-years"))
                })(); (function () {
                    var a = [], c = f.getFullYear(), d = (new Date(b.min)).getFullYear(), e = (new Date(b.min)).getMonth(), g = (new Date(b.max)).getFullYear(), h = (new Date(b.max)).getMonth(), m; for (m = 0; 12 > m; ++m) {
                        var k = document.createElement("div"); k.textContent = b.locales[b.locale].monthsShort[m]; k.__pickmeup_month = m;
                        k.__pickmeup_year = c; b.min && (c < d || m < e && c === d) || b.max && (c > g || m > h && c >= g) ? l(k, "pmu-disabled") : t(c, m) && l(k, "pmu-selected"); a.push(k)
                    } n.appendChild(b.instance_content_template(a, "pmu-months"))
                })(); (function () {
                    var a = [], c = f.getMonth(), d = x(new Date).valueOf(), e; (function () { f.setDate(1); var a = (f.getDay() - b.first_day) % 7; A(f, -(a + (0 > a ? 7 : 0))) })(); for (e = 0; 42 > e; ++e) {
                        var g = document.createElement("div"); g.textContent = f.getDate(); g.__pickmeup_day = f.getDate(); g.__pickmeup_month = f.getMonth(); g.__pickmeup_year = f.getFullYear();
                        c !== f.getMonth() && l(g, "pmu-not-in-month"); 0 === f.getDay() ? l(g, "pmu-sunday") : 6 === f.getDay() && l(g, "pmu-saturday"); var h = b.render(new Date(f)) || {}; var m = x(new Date(f)).valueOf(); var k = b.min && b.min > f || b.max && b.max < f; var v = b.date.valueOf() === m || b.date instanceof Array && b.date.reduce(function (a, b) { return a || m === b.valueOf() }, !1) || "range" === b.mode && m >= b.date[0] && m <= b.date[1]; h.disabled || !("disabled" in h) && k ? l(g, "pmu-disabled") : (h.selected || !("selected" in h) && v) && l(g, "pmu-selected"); m === d && l(g, "pmu-today");
                        h.class_name && h.class_name.split(" ").forEach(l.bind(g, g)); a.push(g); A(f, 1)
                    } n.appendChild(b.instance_content_template(a, "pmu-days"))
                })()
        } g.setDate(1); r.setDate(1); p(r, 1); A(r, -1); d = c.querySelector(".pmu-prev"); c = c.querySelector(".pmu-next"); d && (d.style.visibility = b.min && b.min >= g ? "hidden" : "visible"); c && (c.style.visibility = b.max && b.max <= r ? "hidden" : "visible"); C(a, "fill")
    } function t(a, c) {
        var b = c.format, d = c.separator, e = c.locales[c.locale]; if (a instanceof Date || "number" === typeof a) return x(new Date(a));
        if (!a) return x(new Date); if (a instanceof Array) { a = a.slice(); for (b = 0; b < a.length; ++b)a[b] = t(a[b], c); return a } d = a.split(d); if (1 < d.length) return d.forEach(function (a, b, d) { d[b] = t(a.trim(), c) }), d; d = [].concat(e.daysShort, e.daysMin, e.days, e.monthsShort, e.months); d = d.map(function (a) { return "(" + a + ")" }); d = new RegExp("[^0-9a-zA-Z" + d.join("") + "]+"); a = a.split(d); d = b.split(d); var h = new Date; for (b = 0; b < a.length; b++)switch (d[b]) {
            case "b": var m = e.monthsShort.indexOf(a[b]); break; case "B": m = e.months.indexOf(a[b]); break;
            case "d": case "e": var l = parseInt(a[b], 10); break; case "m": m = parseInt(a[b], 10) - 1; break; case "Y": case "y": var k = parseInt(a[b], 10); k += 100 < k ? 0 : 29 > k ? 2E3 : 1900; break; case "H": case "I": case "k": case "l": var f = parseInt(a[b], 10); break; case "P": case "p": /pm/i.test(a[b]) && 12 > f ? f += 12 : /am/i.test(a[b]) && 12 <= f && (f -= 12); break; case "M": var n = parseInt(a[b], 10)
        }e = new Date(void 0 === k ? h.getFullYear() : k, void 0 === m ? h.getMonth() : m, void 0 === l ? h.getDate() : l, void 0 === f ? h.getHours() : f, void 0 === n ? h.getMinutes() : n, 0); isNaN(1 * e) &&
            (e = new Date); return x(e)
    } function x(a) { a.setHours(0, 0, 0, 0); return a } function D(a, c, b) {
        var d = a.getMonth(), e = a.getDate(), h = a.getFullYear(), m = a.getDay(), k = a.getHours(), l = 12 <= k, f = l ? k - 12 : k; var n = new Date(a.getFullYear(), a.getMonth(), a.getDate(), 0, 0, 0); var p = new Date(a.getFullYear(), 0, 0, 0, 0, 0); n = Math.floor((n - p) / 864E5); 0 === f && (f = 12); p = a.getMinutes(); var r = a.getSeconds(); c = c.split(""); for (var g, q = 0; q < c.length; q++) {
            g = c[q]; switch (g) {
                case "a": g = b.daysShort[m]; break; case "A": g = b.days[m]; break; case "b": g = b.monthsShort[d];
                    break; case "B": g = b.months[d]; break; case "C": g = 1 + Math.floor(h / 100); break; case "d": g = 10 > e ? "0" + e : e; break; case "e": g = e; break; case "H": g = 10 > k ? "0" + k : k; break; case "I": g = 10 > f ? "0" + f : f; break; case "j": g = 100 > n ? 10 > n ? "00" + n : "0" + n : n; break; case "k": g = k; break; case "l": g = f; break; case "m": g = 9 > d ? "0" + (1 + d) : 1 + d; break; case "M": g = 10 > p ? "0" + p : p; break; case "p": case "P": g = l ? "PM" : "AM"; break; case "s": g = Math.floor(a.getTime() / 1E3); break; case "S": g = 10 > r ? "0" + r : r; break; case "u": g = m + 1; break; case "w": g = m; break; case "y": g = ("" + h).substr(2,
                        2); break; case "Y": g = h
            }c[q] = g
        } return c.join("")
    } function O(a, c) {
        var b = a.__pickmeup.options, d; x(c); a: switch (b.mode) { case "multiple": var e = c.valueOf(); for (d = 0; d < b.date.length; ++d)if (b.date[d].valueOf() === e) { b.date.splice(d, 1); break a } b.date.push(c); break; case "range": b.lastSel || (b.date[0] = c); c <= b.date[0] ? (b.date[1] = b.date[0], b.date[0] = c) : b.date[1] = c; b.lastSel = !b.lastSel; break; default: b.date = c.valueOf() }c = H(b); B(a, "input") && (a.value = "single" === b.mode ? c.formatted_date : c.formatted_date.join(b.separator));
        C(a, "change", c); b.flat || !b.hide_on_select || "range" === b.mode && b.lastSel || b.bound.hide()
    } function P(a, c) {
        var b = c.target; k(b, "pmu-button") || (b = J(b, ".pmu-button")); if (!k(b, "pmu-button") || k(b, "pmu-disabled")) return !1; c.preventDefault(); c.stopPropagation(); a = a.__pickmeup.options; var d = J(b, ".pmu-instance"); c = d.parentElement; d = Array.prototype.slice.call(c.querySelectorAll(".pmu-instance")).indexOf(d); B(b.parentElement, "nav") ? k(b, "pmu-month") ? (p(a.current, d - Math.floor(a.calendars / 2)), k(c, "pmu-view-years") ?
            (a.current = "single" !== a.mode ? new Date(a.date[a.date.length - 1]) : new Date(a.date), a.select_day ? (c.classList.remove("pmu-view-years"), l(c, "pmu-view-days")) : a.select_month && (c.classList.remove("pmu-view-years"), l(c, "pmu-view-months"))) : k(c, "pmu-view-months") ? a.select_year ? (c.classList.remove("pmu-view-months"), l(c, "pmu-view-years")) : a.select_day && (c.classList.remove("pmu-view-months"), l(c, "pmu-view-days")) : k(c, "pmu-view-days") && (a.select_month ? (c.classList.remove("pmu-view-days"), l(c, "pmu-view-months")) :
                a.select_year && (c.classList.remove("pmu-view-days"), l(c, "pmu-view-years")))) : k(b, "pmu-prev") ? a.bound.prev(!1) : a.bound.next(!1) : k(c, "pmu-view-years") ? (a.current.setFullYear(b.__pickmeup_year), a.select_month ? (c.classList.remove("pmu-view-years"), l(c, "pmu-view-months")) : a.select_day ? (c.classList.remove("pmu-view-years"), l(c, "pmu-view-days")) : a.bound.update_date(a.current)) : k(c, "pmu-view-months") ? (a.current.setMonth(b.__pickmeup_month), a.current.setFullYear(b.__pickmeup_year), a.select_day ? (c.classList.remove("pmu-view-months"),
                    l(c, "pmu-view-days")) : a.bound.update_date(a.current), p(a.current, Math.floor(a.calendars / 2) - d)) : (c = new Date(a.current), c.setYear(b.__pickmeup_year), c.setMonth(b.__pickmeup_month), c.setDate(b.__pickmeup_day), a.bound.update_date(c)); a.bound.fill(); return !0
    } function H(a) {
        if ("single" === a.mode) { var c = new Date(a.date); return { formatted_date: D(c, a.format, a.locales[a.locale]), date: c } } c = { formatted_date: [], date: [] }; a.date.forEach(function (b) {
            b = new Date(b); c.formatted_date.push(D(b, a.format, a.locales[a.locale]));
            c.date.push(b)
        }); return c
    } function I(a, c) {
        var b = a.__pickmeup.element; if (c || k(b, "pmu-hidden")) {
            var d = a.__pickmeup.options, e = M(a), h = window.pageXOffset, m = window.pageYOffset, l = document.documentElement.clientWidth, p = document.documentElement.clientHeight, f = e.top, n = e.left; d.bound.fill(); B(a, "input") && ((c = a.value) && d.bound.set_date(c), q(a, a, "keydown", function (a) { 9 === a.which && d.bound.hide() }), d.lastSel = !1); if (C(a, "show") && !d.flat) {
                b.classList.remove("pmu-hidden"); if (d.position instanceof Function) e = d.position.call(a),
                    n = e.left, f = e.top; else { switch (d.position) { case "top": f -= b.offsetHeight; break; case "left": n -= b.offsetWidth; break; case "right": n += a.offsetWidth; break; case "bottom": f += a.offsetHeight }f + b.offsetHeight > m + p && (f = e.top - b.offsetHeight); f < m && (f = e.top + a.offsetHeight); n + b.offsetWidth > h + l && (n = e.left - b.offsetWidth); n < h && (n = e.left + a.offsetWidth); n += "px"; f += "px" } b.style.left = n; b.style.top = f; setTimeout(function () { q(a, document.documentElement, "click", d.bound.hide); q(a, window, "resize", d.bound.forced_show) })
            }
        }
    } function Q(a,
        c) { var b = a.__pickmeup.element, d = a.__pickmeup.options; c && c.target && (c.target === a || b.compareDocumentPosition(c.target) & 16) || !C(a, "hide") || (l(b, "pmu-hidden"), z(a, document.documentElement, "click", d.bound.hide), z(a, window, "resize", d.bound.forced_show), d.lastSel = !1) } function R(a) { var c = a.__pickmeup.options; z(a, document.documentElement, "click", c.bound.hide); z(a, window, "resize", c.bound.forced_show); c.bound.forced_show() } function S(a) { a = a.__pickmeup.options; "single" !== a.mode && (a.date = [], a.lastSel = !1, a.bound.fill()) }
    function T(a, c) { "undefined" == typeof c && (c = !0); var b = a.__pickmeup.element; a = a.__pickmeup.options; k(b, "pmu-view-years") ? u(a.current, -12) : k(b, "pmu-view-months") ? u(a.current, -1) : k(b, "pmu-view-days") && p(a.current, -1); c && a.bound.fill() } function U(a, c) { "undefined" == typeof c && (c = !0); var b = a.__pickmeup.element; a = a.__pickmeup.options; k(b, "pmu-view-years") ? u(a.current, 12) : k(b, "pmu-view-months") ? u(a.current, 1) : k(b, "pmu-view-days") && p(a.current, 1); c && a.bound.fill() } function V(a, c) {
        var b = a.__pickmeup.options; a =
            H(b); return "string" === typeof c ? (a = a.date, a instanceof Date ? D(a, c, b.locales[b.locale]) : a.map(function (a) { return D(a, c, b.locales[b.locale]) })) : a[c ? "formatted_date" : "date"]
    } function W(a, c, b) {
        var d = a.__pickmeup.options; if (!(c instanceof Array) || 0 < c.length) if (d.date = t(c, d), "single" !== d.mode) for (d.date instanceof Array ? (d.date[0] = d.date[0] || t(new Date, d), "range" === d.mode && (d.date[1] = d.date[1] || t(d.date[0], d))) : (d.date = [d.date], "range" === d.mode && d.date.push(t(d.date[0], d))), c = 0; c < d.date.length; ++c)d.date[c] =
            L(d.date[c], d.min, d.max); else d.date instanceof Array && (d.date = d.date[0]), d.date = L(d.date, d.min, d.max); else d.date = []; if (!d.select_day) if (d.date instanceof Array) for (c = 0; c < d.date.length; ++c)d.date[c].setDate(1); else d.date.setDate(1); if ("multiple" === d.mode) for (c = 0; c < d.date.length; ++c)d.date.indexOf(d.date[c]) !== c && (d.date.splice(c, 1), --c); b ? d.current = t(b, d) : (b = "single" === d.mode ? d.date : d.date[d.date.length - 1], d.current = b ? new Date(b) : new Date); d.current.setDate(1); d.bound.fill(); B(a, "input") && !1 !==
                d.default_date && (b = H(d), c = a.value, d = "single" === d.mode ? b.formatted_date : b.formatted_date.join(d.separator), c || C(a, "change", b), c !== d && (a.value = d))
    } function X(a) { var c = a.__pickmeup.element; z(a); y(c); delete a.__pickmeup } function L(a, c, b) { return c && c > a ? new Date(c) : b && b < a ? new Date(b) : a } function E(a, c) {
        "string" == typeof a && (a = document.querySelector(a)); if (!a) return null; if (!a.__pickmeup) {
            var b, d = {}; c = c || {}; for (b in E.defaults) d[b] = b in c ? c[b] : E.defaults[b]; for (b in d) c = a.getAttribute("data-pmu-" + b), null !==
                c && (d[b] = c); "days" !== d.view || d.select_day || (d.view = "months"); "months" !== d.view || d.select_month || (d.view = "years"); "years" !== d.view || d.select_year || (d.view = "days"); "days" !== d.view || d.select_day || (d.view = "months"); d.calendars = Math.max(1, parseInt(d.calendars, 10) || 1); d.mode = /single|multiple|range/.test(d.mode) ? d.mode : "single"; d.min && (d.min = t(d.min, d), d.select_day || d.min.setDate(1)); d.max && (d.max = t(d.max, d), d.select_day || d.max.setDate(1)); c = document.createElement("div"); a.__pickmeup = {
                    options: d, events: [],
                    element: c
                }; c.__pickmeup_target = a; l(c, "pickmeup"); d.class_name && l(c, d.class_name); d.bound = { fill: N.bind(a, a), update_date: O.bind(a, a), click: P.bind(a, a), show: I.bind(a, a), forced_show: I.bind(a, a, !0), hide: Q.bind(a, a), update: R.bind(a, a), clear: S.bind(a, a), prev: T.bind(a, a), next: U.bind(a, a), get_date: V.bind(a, a), set_date: W.bind(a, a), destroy: X.bind(a, a) }; l(c, "pmu-view-" + d.view); var e = d.instance_template(d), h = ""; for (b = 0; b < d.calendars; ++b)h += e; c.innerHTML = h; q(a, c, "click", d.bound.click); q(a, c, "onselectstart" in Element.prototype ?
                    "selectstart" : "mousedown", function (a) { a.preventDefault() }); d.flat ? (l(c, "pmu-flat"), a.appendChild(c)) : (l(c, "pmu-hidden"), document.body.appendChild(c), q(a, a, "click", I.bind(a, a, !1)), q(a, a, "input", d.bound.update), q(a, a, "change", d.bound.update)); d.bound.set_date(d.date, d.current)
        } d = a.__pickmeup.options; return { hide: d.bound.hide, show: d.bound.show, clear: d.bound.clear, update: d.bound.update, prev: d.bound.prev, next: d.bound.next, get_date: d.bound.get_date, set_date: d.bound.set_date, destroy: d.bound.destroy }
    } E.defaults =
    {
        current: null, date: new Date, default_date: new Date, flat: !1, first_day: 1, prev: "&#9664;", next: "&#9654;", mode: "single", select_year: !0, select_month: !0, select_day: !0, view: "days", calendars: 1, format: "d-m-Y", title_format: "B, Y", position: "bottom", class_name: "", separator: " - ", hide_on_select: !1, min: null, max: null, render: function () { }, locale: "en", locales: {
            en: {
                days: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), daysShort: "Sun Mon Tue Wed Thu Fri Sat".split(" "), daysMin: "Su Mo Tu We Th Fr Sa".split(" "),
                months: "January February March April May June July August September October November December".split(" "), monthsShort: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")
            }
        }, instance_template: function (a) {
            var c = a.locales[a.locale].daysMin.slice(); a.first_day && c.push(c.shift()); return '<div class="pmu-instance"><nav><div class="pmu-prev pmu-button">' + a.prev + '</div><div class="pmu-month pmu-button"></div><div class="pmu-next pmu-button">' + a.next + '</div></nav><nav class="pmu-day-of-week"><div>' +
                c.join("</div><div>") + "</div></nav></div>"
        }, instance_content_template: function (a, c) { var b = document.createElement("div"); l(b, c); for (c = 0; c < a.length; ++c)l(a[c], "pmu-button"), b.appendChild(a[c]); return b }
    }; return E
});
