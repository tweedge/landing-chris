/**
 * Copy of https://static.cloudflareinsights.com/beacon.js - ret. 29/09/20
 * A low-bandwidth, privacy-respecting performance reporter.
 * 
 * I use this data to ensure my site is loading quickly worldwide.
 * Cloudflare does not collect or sell user information.
 * 
 * A slight change has been made from lines 272-275 to limit the reporting
 * this script does - only 1 in 10 beacons will be uploaded.
 */

!function(e) {
    function t(r) {
        if (n[r])
            return n[r].exports;
        var i = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, t),
        i.l = !0,
        i.exports
    }
    var n = {};
    t.m = e,
    t.c = n,
    t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }
    ,
    t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return t.d(n, "a", n),
        n
    }
    ,
    t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    t.p = "",
    t(t.s = 0)
}([function(e, t, n) {
    "use strict";
    function r(e) {
        return Object.keys(e).forEach(function(t) {
            "number" == typeof e[t] && (e[t] = String(e[t]))
        }),
        e
    }
    function i(e, t, n, i) {
        var f = e.timing
          , d = e.memory
          , p = "";
        p = window.location.origin ? window.location.origin : window.location.protocol + "://" + window.location.host;
        var l = window.location.pathname;
        l && l.length > 0 && (p += l);
        var v = {
            abTestId: n ? n.abTestId : "",
            memory: {},
            timings: {},
            resources: [],
            tempResources: [],
            redirectCount: void 0,
            referrer: document.referrer || "",
            documentWriteIntervention: !1,
            errorCount: 0,
            eventType: u.EventType.Load,
            firstPaint: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: -1,
            firstInputDelay: -1,
            cumulativeLayoutShift: -1,
            si: n ? n.si : 0,
            startTime: e.timeOrigin || (f ? f.navigationStart : 0),
            versions: {
                fl: n ? n.version : "",
                js: "2020.9.2",
                timings: 1
            },
            pageloadId: t,
            location: p
        };
        if ("function" == typeof e.getEntriesByType) {
            var m = e.getEntriesByType("navigation");
            if (m && Array.isArray(m) && m.length > 0) {
                v.timingsV2 = {},
                v.versions.timings = 2,
                delete v.timings;
                c(m[0], v.timingsV2)
            }
        }
        if (1 === v.versions.timings) {
            c(f, v.timings)
        }
        if (c(d, v.memory),
        v.redirectCount = e.navigation && e.navigation.redirectCount,
        v.documentWriteIntervention = a(),
        v.firstPaint = o("first-paint"),
        v.firstContentfulPaint = o("first-contentful-paint"),
        v.errorCount = window.__cfErrCount || 0,
        i && (v.largestContentfulPaint = void 0 !== i.lcp ? i.lcp : -1,
        v.firstInputDelay = void 0 !== i.fid ? i.fid : -1,
        v.cumulativeLayoutShift = void 0 !== i.cls ? i.cls : -1),
        "function" == typeof e.getEntriesByType) {
            var y = e.getEntriesByType("resource")
              , g = 0
              , w = 0;
            y.forEach(function(e) {
                var t = {
                    n: e.name,
                    s: s(e.startTime),
                    d: s(e.duration),
                    i: e.initiatorType,
                    p: e.nextHopProtocol,
                    rs: s(e.redirectStart),
                    re: s(e.redirectEnd),
                    fs: s(e.fetchStart),
                    ds: s(e.domainLookupStart),
                    de: s(e.domainLookupEnd),
                    cs: s(e.connectStart),
                    ce: s(e.connectEnd),
                    qs: s(e.requestStart),
                    ps: s(e.responseStart),
                    pe: s(e.responseEnd),
                    ws: s(e.workerStart),
                    ss: s(e.secureConnectionStart),
                    ts: e.transferSize,
                    ec: e.encodedBodySize,
                    dc: e.decodedBodySize
                };
                window.__cfBeaconCustomTag && (("object" != typeof window.__cfBeaconCustomTag || Array.isArray(window.__cfBeaconCustomTag)) && console.warn('Invalid custom tag format. Please use the following format: { "first_key": "first_value", "second_key": "second_value" }'),
                t.ct = r(window.__cfBeaconCustomTag)),
                v.tempResources && void 0 === v.tempResources[w] && (v.tempResources[w] = []);
                var n = JSON.stringify(t).length;
                g + n < 62e3 && v.tempResources ? (g += n,
                v.tempResources[w].push(t)) : (w++,
                g = 0)
            })
        }
        return JSON.stringify(v).length >= 64e3 && (v.resources = []),
        v
    }
    function o(e) {
        if ("function" == typeof performance.getEntriesByType) {
            var t = performance.getEntriesByType("paint").filter(function(t) {
                return t.name === e
            })[0];
            return t ? t.startTime : 0
        }
        return 0
    }
    function a() {
        var e = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
        if (!e)
            return !1;
        var t = parseInt(e[2], 10)
          , n = navigator.connection;
        return t >= 55 && !!n && "cellular" === n.type && n.downlinkMax <= .115
    }
    function s(e) {
        return null == e ? void 0 : Math.round(1e3 * e) / 1e3
    }
    function c(e, t) {
        for (var n in e) {
            var r = e[n];
            void 0 === t || "number" != typeof r && "string" != typeof r || (t[n] = r)
        }
    }
    t.__esModule = !0;
    var u = n(1)
      , f = n(2)
      , d = n(3)
      , p = n(4);
    !function() {
        var e = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance
          , t = "function" == typeof document.querySelector ? document.querySelector("script[data-cf-beacon]") : void 0
          , n = p()
          , r = window.__cfBeacon
          , o = !1
          , a = !1;
        document.addEventListener("visibilitychange", function() {
            "hidden" === document.visibilityState && !o && a && (o = !0,
            m())
        });
        var s = {
            lcp: void 0,
            cls: void 0,
            fid: void 0
        }
          , c = function(e) {
            "CLS" === e.name ? s.cls = e.value : "FID" === e.name ? s.fid = e.value : "LCP" === e.name && (s.lcp = e.value)
        };
        if ("function" == typeof PerformanceObserver && (d.getLCP(c),
        d.getFID(c),
        PerformanceObserver.supportedEntryTypes && PerformanceObserver.supportedEntryTypes.includes("layout-shift") && d.getCLS(c)),
        t) {
            var l = t.getAttribute("data-cf-beacon");
            if (l)
                try {
                    r = JSON.parse(l)
                } catch (e) {}
        }
        if (e && r && r.rayId) {
            var v = function() {
                var t = i(e, n, r);
                if (t && r) {
                    var o = "req_id=" + r.rayId
                      , a = t.tempResources;
                    if (delete t.tempResources,
                    !a)
                        return;
                    a.forEach(function(e, n) {
                        t.resources = e,
                        0 != n && (t.bypassTiming = !0),
                        r && (1 === r.r && (t.resources = []),
                        f.sendObjectBeacon(o, t),
                        void 0 !== r.forward && void 0 !== r.forward.url && f.sendObjectBeacon(o, t, function() {}, !1, r.forward.url))
                    })
                }
            }
              , m = function() {
                var t = i(e, n, r, s);
                t.resources = [],
                delete t.tempResources,
                t.eventType = u.EventType.Additional,
                r && f.sendObjectBeacon("req_id=" + r.rayId, t, function() {}, !0)
            }
              , y = function() {
                a = !0;
                var e = window.__cfRl && window.__cfRl.done || window.__cfQR && window.__cfQR.done;
                e ? e.then(v) : v()
            };
            "complete" === window.document.readyState ? y() : window.addEventListener("load", function() {
                window.setTimeout(y)
            })
        }
    }()
}
, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    !function(e) {
        e[e.Load = 1] = "Load",
        e[e.Additional = 2] = "Additional"
    }(t.EventType || (t.EventType = {}))
}
, function(e, t, n) {
    "use strict";
    function r(e, t, n, r, i) {
        void 0 === r && (r = !1),
        void 0 === i && (i = null);
        var o = i || "/cdn-cgi/beacon/performance";
        o += "?" + e;
        var a = !0;
        if (navigator && "string" == typeof navigator.userAgent)
            try {
                var s = navigator.userAgent.match(/Chrome\/([0-9]+)/);
                s && s[0].toLowerCase().indexOf("chrome") > -1 && parseInt(s[1]) < 81 && (a = !1)
            } catch (e) {}
        var rand = Math.random();
        if (rand > 0.1) {
            return
        }
        if (navigator && "function" == typeof navigator.sendBeacon && a && r) {
            t.st = 1;
            var c = JSON.stringify(t)
              , u = {
                type: "application/json"
            };
            navigator.sendBeacon(o, new Blob([c],u))
        } else {
            t.st = 2;
            var c = JSON.stringify(t)
              , f = new XMLHttpRequest;
            n && (f.onreadystatechange = function() {
                4 == this.readyState && 204 == this.status && n()
            }
            ),
            f.open("POST", o),
            f.setRequestHeader("content-type", "application/json"),
            f.send(c)
        }
    }
    t.__esModule = !0,
    t.sendObjectBeacon = r
}
, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r, i, o = function() {
        return "".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12)
    }, a = function(e) {
        return {
            name: e,
            value: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1,
            delta: 0,
            entries: [],
            id: o(),
            isFinal: !1
        }
    }, s = function(e, t) {
        try {
            if (PerformanceObserver.supportedEntryTypes.includes(e)) {
                var n = new PerformanceObserver(function(e) {
                    return e.getEntries().map(t)
                }
                );
                return n.observe({
                    type: e,
                    buffered: !0
                }),
                n
            }
        } catch (e) {}
    }, c = !1, u = !1, f = function(e) {
        c = !e.persisted
    }, d = function() {
        addEventListener("pagehide", f),
        addEventListener("beforeunload", function() {})
    }, p = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        u || (d(),
        u = !0),
        addEventListener("visibilitychange", function(t) {
            var n = t.timeStamp;
            "hidden" === document.visibilityState && e({
                timeStamp: n,
                isUnloading: c
            })
        }, {
            capture: !0,
            once: t
        })
    }, l = function(e, t, n, r) {
        var i;
        return function() {
            n && t.isFinal && n.disconnect(),
            t.value >= 0 && (r || t.isFinal || "hidden" === document.visibilityState) && (t.delta = t.value - (i || 0),
            (t.delta || t.isFinal || void 0 === i) && (e(t),
            i = t.value))
        }
    }, v = function(e) {
        var t, n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r = a("CLS", 0), i = function(e) {
            e.hadRecentInput || (r.value += e.value,
            r.entries.push(e),
            t())
        }, o = s("layout-shift", i);
        o && (t = l(e, r, o, n),
        p(function(e) {
            var n = e.isUnloading;
            o.takeRecords().map(i),
            n && (r.isFinal = !0),
            t()
        }))
    }, m = function() {
        return void 0 === r && (r = "hidden" === document.visibilityState ? 0 : 1 / 0,
        p(function(e) {
            var t = e.timeStamp;
            return r = t
        }, !0)),
        {
            get timeStamp() {
                return r
            }
        }
    }, y = function(e) {
        var t, n = a("FCP"), r = m(), i = s("paint", function(e) {
            "first-contentful-paint" === e.name && e.startTime < r.timeStamp && (n.value = e.startTime,
            n.isFinal = !0,
            n.entries.push(e),
            t())
        });
        i && (t = l(e, n, i))
    }, g = function(e) {
        var t = a("FID")
          , n = m()
          , r = function(e) {
            e.startTime < n.timeStamp && (t.value = e.processingStart - e.startTime,
            t.entries.push(e),
            t.isFinal = !0,
            o())
        }
          , i = s("first-input", r)
          , o = l(e, t, i);
        i ? p(function() {
            i.takeRecords().map(r),
            i.disconnect()
        }, !0) : window.perfMetrics && window.perfMetrics.onFirstInputDelay && window.perfMetrics.onFirstInputDelay(function(e, r) {
            r.timeStamp < n.timeStamp && (t.value = e,
            t.isFinal = !0,
            t.entries = [{
                entryType: "first-input",
                name: r.type,
                target: r.target,
                cancelable: r.cancelable,
                startTime: r.timeStamp,
                processingStart: r.timeStamp + e
            }],
            o())
        })
    }, w = function() {
        return i || (i = new Promise(function(e) {
            return ["scroll", "keydown", "pointerdown"].map(function(t) {
                addEventListener(t, e, {
                    once: !0,
                    passive: !0,
                    capture: !0
                })
            })
        }
        )),
        i
    }, h = function(e) {
        var t, n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r = a("LCP"), i = m(), o = function(e) {
            var n = e.startTime;
            n < i.timeStamp ? (r.value = n,
            r.entries.push(e)) : r.isFinal = !0,
            t()
        }, c = s("largest-contentful-paint", o);
        if (c) {
            t = l(e, r, c, n);
            var u = function() {
                r.isFinal || (c.takeRecords().map(o),
                r.isFinal = !0,
                t())
            };
            w().then(u),
            p(u, !0)
        }
    }, S = function(e) {
        var t, n = a("TTFB");
        t = function() {
            try {
                var t = performance.getEntriesByType("navigation")[0] || function() {
                    var e = performance.timing
                      , t = {
                        entryType: "navigation",
                        startTime: 0
                    };
                    for (var n in e)
                        "navigationStart" !== n && "toJSON" !== n && (t[n] = Math.max(e[n] - e.navigationStart, 0));
                    return t
                }();
                n.value = n.delta = t.responseStart,
                n.entries = [t],
                n.isFinal = !0,
                e(n)
            } catch (e) {}
        }
        ,
        "complete" === document.readyState ? setTimeout(t, 0) : addEventListener("pageshow", t)
    };
    t.getCLS = v,
    t.getFCP = y,
    t.getFID = g,
    t.getLCP = h,
    t.getTTFB = S
}
, function(e, t, n) {
    "use strict";
    function r(e, t, n) {
        var r = t && n || 0;
        "string" == typeof e && (t = "binary" === e ? new Array(16) : null,
        e = null),
        e = e || {};
        var a = e.random || (e.rng || i)();
        if (a[6] = 15 & a[6] | 64,
        a[8] = 63 & a[8] | 128,
        t)
            for (var s = 0; s < 16; ++s)
                t[r + s] = a[s];
        return t || o(a)
    }
    var i = n(5)
      , o = n(6);
    e.exports = r
}
, function(e, t, n) {
    "use strict";
    var r = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
    if (r) {
        var i = new Uint8Array(16);
        e.exports = function() {
            return r(i),
            i
        }
    } else {
        var o = new Array(16);
        e.exports = function() {
            for (var e, t = 0; t < 16; t++)
                0 == (3 & t) && (e = 4294967296 * Math.random()),
                o[t] = e >>> ((3 & t) << 3) & 255;
            return o
        }
    }
}
, function(e, t, n) {
    "use strict";
    function r(e, t) {
        var n = t || 0
          , r = i;
        return [r[e[n++]], r[e[n++]], r[e[n++]], r[e[n++]], "-", r[e[n++]], r[e[n++]], "-", r[e[n++]], r[e[n++]], "-", r[e[n++]], r[e[n++]], "-", r[e[n++]], r[e[n++]], r[e[n++]], r[e[n++]], r[e[n++]], r[e[n++]]].join("")
    }
    for (var i = [], o = 0; o < 256; ++o)
        i[o] = (o + 256).toString(16).substr(1);
    e.exports = r
}
]);