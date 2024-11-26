 d.date[d.date.length - 1], d.current = b ? new Date(b) : new Date); d.current.setDate(1); d.bound.fill(); B(a, "input") && !1 !==
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
