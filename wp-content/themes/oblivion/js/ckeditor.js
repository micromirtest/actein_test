﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
(function() {
    if (window.CKEDITOR && window.CKEDITOR.dom) return;
    window.CKEDITOR || (window.CKEDITOR = function() {
        var b = {
            timestamp: "D5AC",
            version: "4.1.2",
            revision: "d6f1e0e",
            rnd: Math.floor(900 * Math.random()) + 100,
            _: {
                pending: []
            },
            status: "unloaded",
            basePath: function() {
                var a = window.CKEDITOR_BASEPATH || "";
                if (!a) for (var b = document.getElementsByTagName("script"), d = 0; d < b.length; d++) {
                    var c = b[d].src.match(/(^|.*[\\\/])ckeditor(?:_basic)?(?:_source)?.js(?:\?.*)?$/i);
                    if (c) {
                        a = c[1];
                        break
                    }
                } - 1 == a.indexOf(":/") && (a = 0 === a.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + a : location.href.match(/^[^\?]*\/(?:)/)[0] + a);
                if (!a) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
                return a
            }(),
            getUrl: function(a) {
                -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a);
                this.timestamp && ("/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a)) && (a += (0 <= a.indexOf("?") ? "&" : "?") + "t=" + this.timestamp);
                return a
            },
            domReady: function() {
                function a() {
                    try {
                        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", a, !1), b()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), b())
                    } catch (d) {}
                }
                function b() {
                    for (var a; a = d.shift();) a()
                }
                var d = [];
                return function(b) {
                    d.push(b);
                    "complete" === document.readyState && setTimeout(a, 1);
                    if (1 == d.length) if (document.addEventListener) document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1);
                    else if (document.attachEvent) {
                        document.attachEvent("onreadystatechange", a);
                        window.attachEvent("onload", a);
                        b = !1;
                        try {
                            b = !window.frameElement
                        } catch (f) {}
                        if (document.documentElement.doScroll && b) {
                            var c = function() {
                                    try {
                                        document.documentElement.doScroll("left")
                                    } catch (b) {
                                        setTimeout(c, 1);
                                        return
                                    }
                                    a()
                                };
                            c()
                        }
                    }
                }
            }()
        },
            c = window.CKEDITOR_GETURL;
        if (c) {
            var a = b.getUrl;
            b.getUrl = function(e) {
                return c.call(b, e) || a.call(b, e)
            }
        }
        return b
    }());
    CKEDITOR.event || (CKEDITOR.event = function() {}, CKEDITOR.event.implementOn = function(b) {
        var c = CKEDITOR.event.prototype,
            a;
        for (a in c) b[a] == void 0 && (b[a] = c[a])
    }, CKEDITOR.event.prototype = function() {
        function b(e) {
            var b = c(this);
            return b[e] || (b[e] = new a(e))
        }
        var c = function(a) {
                a = a.getPrivate && a.getPrivate() || a._ || (a._ = {});
                return a.events || (a.events = {})
            },
            a = function(a) {
                this.name = a;
                this.listeners = []
            };
        a.prototype = {
            getListenerIndex: function(a) {
                for (var b = 0, d = this.listeners; b < d.length; b++) if (d[b].fn == a) return b;
                return -1
            }
        };
        return {
            define: function(a, f) {
                var d = b.call(this, a);
                CKEDITOR.tools.extend(d, f, true)
            },
            on: function(a, f, d, c, l) {
                function j(b, g, n, p) {
                    b = {
                        name: a,
                        sender: this,
                        editor: b,
                        data: g,
                        listenerData: c,
                        stop: n,
                        cancel: p,
                        removeListener: m
                    };
                    return f.call(d, b) === false ? false : b.data
                }
                function m() {
                    q.removeListener(a, f)
                }
                var n = b.call(this, a);
                if (n.getListenerIndex(f) < 0) {
                    n = n.listeners;
                    d || (d = this);
                    isNaN(l) && (l = 10);
                    var q = this;
                    j.fn = f;
                    j.priority = l;
                    for (var p = n.length - 1; p >= 0; p--) if (n[p].priority <= l) {
                        n.splice(p + 1, 0, j);
                        return {
                            removeListener: m
                        }
                    }
                    n.unshift(j)
                }
                return {
                    removeListener: m
                }
            },
            once: function() {
                var a = arguments[1];
                arguments[1] = function(b) {
                    b.removeListener();
                    return a.apply(this, arguments)
                };
                return this.on.apply(this, arguments)
            },
            capture: function() {
                CKEDITOR.event.useCapture = 1;
                var a = this.on.apply(this, arguments);
                CKEDITOR.event.useCapture = 0;
                return a
            },
            fire: function() {
                var a = 0,
                    b = function() {
                        a = 1
                    },
                    d = 0,
                    i = function() {
                        d = 1
                    };
                return function(l, j, m) {
                    var n = c(this)[l],
                        l = a,
                        q = d;
                    a = d = 0;
                    if (n) {
                        var p = n.listeners;
                        if (p.length) for (var p = p.slice(0), h, g = 0; g < p.length; g++) {
                            if (n.errorProof) try {
                                h = p[g].call(this, m, j, b, i)
                            } catch (u) {} else h = p[g].call(this, m, j, b, i);
                            h === false ? d = 1 : typeof h != "undefined" && (j = h);
                            if (a || d) break
                        }
                    }
                    j = d ? false : typeof j == "undefined" ? true : j;
                    a = l;
                    d = q;
                    return j
                }
            }(),
            fireOnce: function(a, b, d) {
                b = this.fire(a, b, d);
                delete c(this)[a];
                return b
            },
            removeListener: function(a, b) {
                var d = c(this)[a];
                if (d) {
                    var i = d.getListenerIndex(b);
                    i >= 0 && d.listeners.splice(i, 1)
                }
            },
            removeAllListeners: function() {
                var a = c(this),
                    b;
                for (b in a) delete a[b]
            },
            hasListeners: function(a) {
                return (a = c(this)[a]) && a.listeners.length > 0
            }
        }
    }());
    CKEDITOR.editor || (CKEDITOR.editor = function() {
        CKEDITOR._.pending.push([this, arguments]);
        CKEDITOR.event.call(this)
    }, CKEDITOR.editor.prototype.fire = function(b, c) {
        b in {
            instanceReady: 1,
            loaded: 1
        } && (this[b] = true);
        return CKEDITOR.event.prototype.fire.call(this, b, c, this)
    }, CKEDITOR.editor.prototype.fireOnce = function(b, c) {
        b in {
            instanceReady: 1,
            loaded: 1
        } && (this[b] = true);
        return CKEDITOR.event.prototype.fireOnce.call(this, b, c, this)
    }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype));
    CKEDITOR.env || (CKEDITOR.env = function() {
        var b = navigator.userAgent.toLowerCase(),
            c = window.opera,
            a = {
                ie: eval("/*@cc_on!@*/false"),
                opera: !! c && c.version,
                webkit: b.indexOf(" applewebkit/") > -1,
                air: b.indexOf(" adobeair/") > -1,
                mac: b.indexOf("macintosh") > -1,
                quirks: document.compatMode == "BackCompat",
                mobile: b.indexOf("mobile") > -1,
                iOS: /(ipad|iphone|ipod)/.test(b),
                isCustomDomain: function() {
                    if (!this.ie) return false;
                    var a = document.domain,
                        e = window.location.hostname;
                    return a != e && a != "[" + e + "]"
                },
                secure: location.protocol == "https:"
            };
        a.gecko = navigator.product == "Gecko" && !a.webkit && !a.opera;
        if (a.webkit) b.indexOf("chrome") > -1 ? a.chrome = true : a.safari = true;
        var e = 0;
        if (a.ie) {
            e = a.quirks || !document.documentMode ? parseFloat(b.match(/msie (\d+)/)[1]) : document.documentMode;
            a.ie9Compat = e == 9;
            a.ie8Compat = e == 8;
            a.ie7Compat = e == 7;
            a.ie6Compat = e < 7 || a.quirks
        }
        if (a.gecko) {
            var f = b.match(/rv:([\d\.]+)/);
            if (f) {
                f = f[1].split(".");
                e = f[0] * 1E4 + (f[1] || 0) * 100 + (f[2] || 0) * 1
            }
        }
        a.opera && (e = parseFloat(c.version()));
        a.air && (e = parseFloat(b.match(/ adobeair\/(\d+)/)[1]));
        a.webkit && (e = parseFloat(b.match(/ applewebkit\/(\d+)/)[1]));
        a.version = e;
        a.isCompatible = a.iOS && e >= 534 || !a.mobile && (a.ie && e > 6 || a.gecko && e >= 10801 || a.opera && e >= 9.5 || a.air && e >= 1 || a.webkit && e >= 522 || false);
        a.cssClass = "cke_browser_" + (a.ie ? "ie" : a.gecko ? "gecko" : a.opera ? "opera" : a.webkit ? "webkit" : "unknown");
        if (a.quirks) a.cssClass = a.cssClass + " cke_browser_quirks";
        if (a.ie) {
            a.cssClass = a.cssClass + (" cke_browser_ie" + (a.quirks || a.version < 7 ? "6" : a.version));
            if (a.quirks) a.cssClass = a.cssClass + " cke_browser_iequirks"
        }
        if (a.gecko) if (e < 10900) a.cssClass = a.cssClass + " cke_browser_gecko18";
        else if (e <= 11E3) a.cssClass = a.cssClass + " cke_browser_gecko19";
        if (a.air) a.cssClass = a.cssClass + " cke_browser_air";
        if (a.iOS) a.cssClass = a.cssClass + " cke_browser_ios";
        return a
    }());
    "unloaded" == CKEDITOR.status &&
    function() {
        CKEDITOR.event.implementOn(CKEDITOR);
        CKEDITOR.loadFullCore = function() {
            if (CKEDITOR.status != "basic_ready") CKEDITOR.loadFullCore._load = 1;
            else {
                delete CKEDITOR.loadFullCore;
                var b = document.createElement("script");
                b.type = "text/javascript";
                b.src = CKEDITOR.basePath + "ckeditor.js";
                document.getElementsByTagName("head")[0].appendChild(b)
            }
        };
        CKEDITOR.loadFullCoreTimeout = 0;
        CKEDITOR.add = function(b) {
            (this._.pending || (this._.pending = [])).push(b)
        };
        (function() {
            CKEDITOR.domReady(function() {
                var b = CKEDITOR.loadFullCore,
                    c = CKEDITOR.loadFullCoreTimeout;
                if (b) {
                    CKEDITOR.status = "basic_ready";
                    b && b._load ? b() : c && setTimeout(function() {
                        CKEDITOR.loadFullCore && CKEDITOR.loadFullCore()
                    }, c * 1E3)
                }
            })
        })();
        CKEDITOR.status = "basic_loaded"
    }();
    CKEDITOR.dom = {};
    (function() {
        var b = [],
            c = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.opera ? "-o-" : CKEDITOR.env.ie ? "-ms-" : "";
        CKEDITOR.on("reset", function() {
            b = []
        });
        CKEDITOR.tools = {
            arrayCompare: function(a, e) {
                if (!a && !e) return true;
                if (!a || !e || a.length != e.length) return false;
                for (var b = 0; b < a.length; b++) if (a[b] != e[b]) return false;
                return true
            },
            clone: function(a) {
                var e;
                if (a && a instanceof Array) {
                    e = [];
                    for (var b = 0; b < a.length; b++) e[b] = CKEDITOR.tools.clone(a[b]);
                    return e
                }
                if (a === null || typeof a != "object" || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp) return a;
                e = new a.constructor;
                for (b in a) e[b] = CKEDITOR.tools.clone(a[b]);
                return e
            },
            capitalize: function(a) {
                return a.charAt(0).toUpperCase() + a.substring(1).toLowerCase()
            },
            extend: function(a) {
                var b = arguments.length,
                    f, d;
                if (typeof(f = arguments[b - 1]) == "boolean") b--;
                else if (typeof(f = arguments[b - 2]) == "boolean") {
                    d = arguments[b - 1];
                    b = b - 2
                }
                for (var c = 1; c < b; c++) {
                    var l = arguments[c],
                        j;
                    for (j in l) if (f === true || a[j] == void 0) if (!d || j in d) a[j] = l[j]
                }
                return a
            },
            prototypedCopy: function(a) {
                var b = function() {};
                b.prototype = a;
                return new b
            },
            copy: function(a) {
                var b = {},
                    f;
                for (f in a) b[f] = a[f];
                return b
            },
            isArray: function(a) {
                return !!a && a instanceof Array
            },
            isEmpty: function(a) {
                for (var b in a) if (a.hasOwnProperty(b)) return false;
                return true
            },
            cssVendorPrefix: function(a, b, f) {
                if (f) return c + a + ":" + b + ";" + a + ":" + b;
                f = {};
                f[a] = b;
                f[c + a] = b;
                return f
            },
            cssStyleToDomStyle: function() {
                var a = document.createElement("div").style,
                    b = typeof a.cssFloat != "undefined" ? "cssFloat" : typeof a.styleFloat != "undefined" ? "styleFloat" : "float";
                return function(a) {
                    return a == "float" ? b : a.replace(/-./g, function(a) {
                        return a.substr(1).toUpperCase()
                    })
                }
            }(),
            buildStyleHtml: function(a) {
                for (var a = [].concat(a), b, f = [], d = 0; d < a.length; d++) if (b = a[d]) / @import | [{}] / .test(b) ? f.push("<style>" + b + "</style>") : f.push('<link type="text/css" rel=stylesheet href="' + b + '">');
                return f.join("")
            },
            htmlEncode: function(a) {
                return ("" + a).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;")
            },
            htmlEncodeAttr: function(a) {
                return a.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            },
            getNextNumber: function() {
                var a = 0;
                return function() {
                    return ++a
                }
            }(),
            getNextId: function() {
                return "cke_" + this.getNextNumber()
            },
            override: function(a, b) {
                var f = b(a);
                f.prototype = a.prototype;
                return f
            },
            setTimeout: function(a, b, f, d, c) {
                c || (c = window);
                f || (f = c);
                return c.setTimeout(function() {
                    d ? a.apply(f, [].concat(d)) : a.apply(f)
                }, b || 0)
            },
            trim: function() {
                var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
                return function(b) {
                    return b.replace(a, "")
                }
            }(),
            ltrim: function() {
                var a = /^[ \t\n\r]+/g;
                return function(b) {
                    return b.replace(a, "")
                }
            }(),
            rtrim: function() {
                var a = /[ \t\n\r]+$/g;
                return function(b) {
                    return b.replace(a, "")
                }
            }(),
            indexOf: function(a, b) {
                if (typeof b == "function") for (var f = 0, d = a.length; f < d; f++) {
                    if (b(a[f])) return f
                } else {
                    if (a.indexOf) return a.indexOf(b);
                    f = 0;
                    for (d = a.length; f < d; f++) if (a[f] === b) return f
                }
                return -1
            },
            search: function(a, b) {
                var f = CKEDITOR.tools.indexOf(a, b);
                return f >= 0 ? a[f] : null
            },
            bind: function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            },
            createClass: function(a) {
                var b = a.$,
                    f = a.base,
                    d = a.privates || a._,
                    c = a.proto,
                    a = a.statics;
                !b && (b = function() {
                    f && this.base.apply(this, arguments)
                });
                if (d) var l = b,
                    b = function() {
                        var a = this._ || (this._ = {}),
                            b;
                        for (b in d) {
                            var e = d[b];
                            a[b] = typeof e == "function" ? CKEDITOR.tools.bind(e, this) : e
                        }
                        l.apply(this, arguments)
                    };
                if (f) {
                    b.prototype = this.prototypedCopy(f.prototype);
                    b.prototype.constructor = b;
                    b.base = f;
                    b.baseProto = f.prototype;
                    b.prototype.base = function() {
                        this.base = f.prototype.base;
                        f.apply(this, arguments);
                        this.base = arguments.callee
                    }
                }
                c && this.extend(b.prototype, c, true);
                a && this.extend(b, a, true);
                return b
            },
            addFunction: function(a, e) {
                return b.push(function() {
                    return a.apply(e || this, arguments)
                }) - 1
            },
            removeFunction: function(a) {
                b[a] = null
            },
            callFunction: function(a) {
                var e = b[a];
                return e && e.apply(window, Array.prototype.slice.call(arguments, 1))
            },
            cssLength: function() {
                var a = /^-?\d+\.?\d*px$/,
                    b;
                return function(f) {
                    b = CKEDITOR.tools.trim(f + "") + "px";
                    return a.test(b) ? b : f || ""
                }
            }(),
            convertToPx: function() {
                var a;
                return function(b) {
                    if (!a) {
                        a = CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>', CKEDITOR.document);
                        CKEDITOR.document.getBody().append(a)
                    }
                    if (!/%$/.test(b)) {
                        a.setStyle("width", b);
                        return a.$.clientWidth
                    }
                    return b
                }
            }(),
            repeat: function(a, b) {
                return Array(b + 1).join(a)
            },
            tryThese: function() {
                for (var a, b = 0, f = arguments.length; b < f; b++) {
                    var d = arguments[b];
                    try {
                        a = d();
                        break
                    } catch (c) {}
                }
                return a
            },
            genKey: function() {
                return Array.prototype.slice.call(arguments).join("-")
            },
            defer: function(a) {
                return function() {
                    var b = arguments,
                        f = this;
                    window.setTimeout(function() {
                        a.apply(f, b)
                    }, 0)
                }
            },
            normalizeCssText: function(a, b) {
                var f = [],
                    d, c = CKEDITOR.tools.parseCssText(a, true, b);
                for (d in c) f.push(d + ":" + c[d]);
                f.sort();
                return f.length ? f.join(";") + ";" : ""
            },
            convertRgbToHex: function(a) {
                return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function(a, b, d, c) {
                    a = [b, d, c];
                    for (b = 0; b < 3; b++) a[b] = ("0" + parseInt(a[b], 10).toString(16)).slice(-2);
                    return "#" + a.join("")
                })
            },
            parseCssText: function(a, b, c) {
                var d = {};
                if (c) {
                    c = new CKEDITOR.dom.element("span");
                    c.setAttribute("style", a);
                    a = CKEDITOR.tools.convertRgbToHex(c.getAttribute("style") || "")
                }
                if (!a || a == ";") return d;
                a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(a, c, f) {
                    if (b) {
                        c = c.toLowerCase();
                        c == "font-family" && (f = f.toLowerCase().replace(/["']/g, "").replace(/\s*,\s*/g, ","));
                        f = CKEDITOR.tools.trim(f)
                    }
                    d[c] = f
                });
                return d
            },
            writeCssText: function(a, b) {
                var c, d = [];
                for (c in a) d.push(c + ":" + a[c]);
                b && d.sort();
                return d.join("; ")
            },
            objectCompare: function(a, b, c) {
                var d;
                if (!a && !b) return true;
                if (!a || !b) return false;
                for (d in a) if (a[d] != b[d]) return false;
                if (!c) for (d in b) if (a[d] != b[d]) return false;
                return true
            },
            objectKeys: function(a) {
                var b = [],
                    c;
                for (c in a) b.push(c);
                return b
            },
            convertArrayToObject: function(a, b) {
                var c = {};
                arguments.length == 1 && (b = true);
                for (var d = 0, i = a.length; d < i; ++d) c[a[d]] = b;
                return c
            },
            fixDomain: function() {
                for (var a;;) try {
                    a = window.parent.document.domain;
                    break
                } catch (b) {
                    a = a ? a.replace(/.+?(?:\.|$)/, "") : document.domain;
                    if (!a) break;
                    document.domain = a
                }
                return !!a
            }
        }
    })();
    CKEDITOR.dtd = function() {
        var b = CKEDITOR.tools.extend,
            c = function(a, b) {
                for (var e = CKEDITOR.tools.clone(a), c = 1; c < arguments.length; c++) {
                    var b = arguments[c],
                        h;
                    for (h in b) delete e[h]
                }
                return e
            },
            a = {},
            e = {},
            f = {
                address: 1,
                article: 1,
                aside: 1,
                blockquote: 1,
                details: 1,
                div: 1,
                dl: 1,
                fieldset: 1,
                figure: 1,
                footer: 1,
                form: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                header: 1,
                hgroup: 1,
                hr: 1,
                menu: 1,
                nav: 1,
                ol: 1,
                p: 1,
                pre: 1,
                section: 1,
                table: 1,
                ul: 1
            },
            d = {
                command: 1,
                link: 1,
                meta: 1,
                noscript: 1,
                script: 1,
                style: 1
            },
            i = {},
            l = {
                "#": 1
            },
            j = {
                center: 1,
                dir: 1,
                noframes: 1
            };
        b(a, {
            a: 1,
            abbr: 1,
            area: 1,
            audio: 1,
            b: 1,
            bdi: 1,
            bdo: 1,
            br: 1,
            button: 1,
            canvas: 1,
            cite: 1,
            code: 1,
            command: 1,
            datalist: 1,
            del: 1,
            dfn: 1,
            em: 1,
            embed: 1,
            i: 1,
            iframe: 1,
            img: 1,
            input: 1,
            ins: 1,
            kbd: 1,
            keygen: 1,
            label: 1,
            map: 1,
            mark: 1,
            meter: 1,
            noscript: 1,
            object: 1,
            output: 1,
            progress: 1,
            q: 1,
            ruby: 1,
            s: 1,
            samp: 1,
            script: 1,
            select: 1,
            small: 1,
            span: 1,
            strong: 1,
            sub: 1,
            sup: 1,
            textarea: 1,
            time: 1,
            u: 1,
            "var": 1,
            video: 1,
            wbr: 1
        }, l, {
            acronym: 1,
            applet: 1,
            basefont: 1,
            big: 1,
            font: 1,
            isindex: 1,
            strike: 1,
            style: 1,
            tt: 1
        });
        b(e, f, a, j);
        c = {
            a: c(a, {
                a: 1,
                button: 1
            }),
            abbr: a,
            address: e,
            area: i,
            article: b({
                style: 1
            }, e),
            aside: b({
                style: 1
            }, e),
            audio: b({
                source: 1,
                track: 1
            }, e),
            b: a,
            base: i,
            bdi: a,
            bdo: a,
            blockquote: e,
            body: e,
            br: i,
            button: c(a, {
                a: 1,
                button: 1
            }),
            canvas: a,
            caption: e,
            cite: a,
            code: a,
            col: i,
            colgroup: {
                col: 1
            },
            command: i,
            datalist: b({
                option: 1
            }, a),
            dd: e,
            del: a,
            details: b({
                summary: 1
            }, e),
            dfn: a,
            div: b({
                style: 1
            }, e),
            dl: {
                dt: 1,
                dd: 1
            },
            dt: e,
            em: a,
            embed: i,
            fieldset: b({
                legend: 1
            }, e),
            figcaption: e,
            figure: b({
                figcaption: 1
            }, e),
            footer: e,
            form: e,
            h1: a,
            h2: a,
            h3: a,
            h4: a,
            h5: a,
            h6: a,
            head: b({
                title: 1,
                base: 1
            }, d),
            header: e,
            hgroup: {
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1
            },
            hr: i,
            html: b({
                head: 1,
                body: 1
            }, e, d),
            i: a,
            iframe: l,
            img: i,
            input: i,
            ins: a,
            kbd: a,
            keygen: i,
            label: a,
            legend: a,
            li: e,
            link: i,
            map: e,
            mark: a,
            menu: b({
                li: 1
            }, e),
            meta: i,
            meter: c(a, {
                meter: 1
            }),
            nav: e,
            noscript: b({
                link: 1,
                meta: 1,
                style: 1
            }, a),
            object: b({
                param: 1
            }, a),
            ol: {
                li: 1
            },
            optgroup: {
                option: 1
            },
            option: l,
            output: a,
            p: a,
            param: i,
            pre: a,
            progress: c(a, {
                progress: 1
            }),
            q: a,
            rp: a,
            rt: a,
            ruby: b({
                rp: 1,
                rt: 1
            }, a),
            s: a,
            samp: a,
            script: l,
            section: b({
                style: 1
            }, e),
            select: {
                optgroup: 1,
                option: 1
            },
            small: a,
            source: i,
            span: a,
            strong: a,
            style: l,
            sub: a,
            summary: a,
            sup: a,
            table: {
                caption: 1,
                colgroup: 1,
                thead: 1,
                tfoot: 1,
                tbody: 1,
                tr: 1
            },
            tbody: {
                tr: 1
            },
            td: e,
            textarea: l,
            tfoot: {
                tr: 1
            },
            th: e,
            thead: {
                tr: 1
            },
            time: c(a, {
                time: 1
            }),
            title: l,
            tr: {
                th: 1,
                td: 1
            },
            track: i,
            u: a,
            ul: {
                li: 1
            },
            "var": a,
            video: b({
                source: 1,
                track: 1
            }, e),
            wbr: i,
            acronym: a,
            applet: b({
                param: 1
            }, e),
            basefont: i,
            big: a,
            center: e,
            dialog: i,
            dir: {
                li: 1
            },
            font: a,
            isindex: i,
            noframes: e,
            strike: a,
            tt: a
        };
        b(c, {
            $block: b({
                audio: 1,
                dd: 1,
                dt: 1,
                li: 1,
                video: 1
            }, f, j),
            $blockLimit: {
                article: 1,
                aside: 1,
                audio: 1,
                body: 1,
                caption: 1,
                details: 1,
                dir: 1,
                div: 1,
                dl: 1,
                fieldset: 1,
                figure: 1,
                footer: 1,
                form: 1,
                header: 1,
                hgroup: 1,
                menu: 1,
                nav: 1,
                ol: 1,
                section: 1,
                table: 1,
                td: 1,
                th: 1,
                tr: 1,
                ul: 1,
                video: 1
            },
            $cdata: {
                script: 1,
                style: 1
            },
            $editable: {
                address: 1,
                article: 1,
                aside: 1,
                blockquote: 1,
                body: 1,
                details: 1,
                div: 1,
                fieldset: 1,
                footer: 1,
                form: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                header: 1,
                hgroup: 1,
                nav: 1,
                p: 1,
                pre: 1,
                section: 1
            },
            $empty: {
                area: 1,
                base: 1,
                basefont: 1,
                br: 1,
                col: 1,
                command: 1,
                dialog: 1,
                embed: 1,
                hr: 1,
                img: 1,
                input: 1,
                isindex: 1,
                keygen: 1,
                link: 1,
                meta: 1,
                param: 1,
                source: 1,
                track: 1,
                wbr: 1
            },
            $inline: a,
            $list: {
                dl: 1,
                ol: 1,
                ul: 1
            },
            $listItem: {
                dd: 1,
                dt: 1,
                li: 1
            },
            $nonBodyContent: b({
                body: 1,
                head: 1,
                html: 1
            }, c.head),
            $nonEditable: {
                applet: 1,
                audio: 1,
                button: 1,
                embed: 1,
                iframe: 1,
                map: 1,
                object: 1,
                option: 1,
                param: 1,
                script: 1,
                textarea: 1,
                video: 1
            },
            $object: {
                applet: 1,
                audio: 1,
                button: 1,
                hr: 1,
                iframe: 1,
                img: 1,
                input: 1,
                object: 1,
                select: 1,
                table: 1,
                textarea: 1,
                video: 1
            },
            $removeEmpty: {
                abbr: 1,
                acronym: 1,
                b: 1,
                bdi: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                mark: 1,
                meter: 1,
                output: 1,
                q: 1,
                ruby: 1,
                s: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                time: 1,
                tt: 1,
                u: 1,
                "var": 1
            },
            $tabIndex: {
                a: 1,
                area: 1,
                button: 1,
                input: 1,
                object: 1,
                select: 1,
                textarea: 1
            },
            $tableContent: {
                caption: 1,
                col: 1,
                colgroup: 1,
                tbody: 1,
                td: 1,
                tfoot: 1,
                th: 1,
                thead: 1,
                tr: 1
            },
            $transparent: {
                a: 1,
                audio: 1,
                canvas: 1,
                del: 1,
                ins: 1,
                map: 1,
                noscript: 1,
                object: 1,
                video: 1
            },
            $intermediate: {
                caption: 1,
                colgroup: 1,
                dd: 1,
                dt: 1,
                figcaption: 1,
                legend: 1,
                li: 1,
                optgroup: 1,
                option: 1,
                rp: 1,
                rt: 1,
                summary: 1,
                tbody: 1,
                td: 1,
                tfoot: 1,
                th: 1,
                thead: 1,
                tr: 1
            }
        });
        return c
    }();
    CKEDITOR.dom.event = function(b) {
        this.$ = b
    };
    CKEDITOR.dom.event.prototype = {
        getKey: function() {
            return this.$.keyCode || this.$.which
        },
        getKeystroke: function() {
            var b = this.getKey();
            if (this.$.ctrlKey || this.$.metaKey) b = b + CKEDITOR.CTRL;
            this.$.shiftKey && (b = b + CKEDITOR.SHIFT);
            this.$.altKey && (b = b + CKEDITOR.ALT);
            return b
        },
        preventDefault: function(b) {
            var c = this.$;
            c.preventDefault ? c.preventDefault() : c.returnValue = false;
            b && this.stopPropagation()
        },
        stopPropagation: function() {
            var b = this.$;
            b.stopPropagation ? b.stopPropagation() : b.cancelBubble = true
        },
        getTarget: function() {
            var b = this.$.target || this.$.srcElement;
            return b ? new CKEDITOR.dom.node(b) : null
        },
        getPhase: function() {
            return this.$.eventPhase || 2
        },
        getPageOffset: function() {
            var b = this.getTarget().getDocument().$;
            return {
                x: this.$.pageX || this.$.clientX + (b.documentElement.scrollLeft || b.body.scrollLeft),
                y: this.$.pageY || this.$.clientY + (b.documentElement.scrollTop || b.body.scrollTop)
            }
        }
    };
    CKEDITOR.CTRL = 1114112;
    CKEDITOR.SHIFT = 2228224;
    CKEDITOR.ALT = 4456448;
    CKEDITOR.EVENT_PHASE_CAPTURING = 1;
    CKEDITOR.EVENT_PHASE_AT_TARGET = 2;
    CKEDITOR.EVENT_PHASE_BUBBLING = 3;
    CKEDITOR.dom.domObject = function(b) {
        if (b) this.$ = b
    };
    CKEDITOR.dom.domObject.prototype = function() {
        var b = function(b, a) {
                return function(e) {
                    typeof CKEDITOR != "undefined" && b.fire(a, new CKEDITOR.dom.event(e))
                }
            };
        return {
            getPrivate: function() {
                var b;
                if (!(b = this.getCustomData("_"))) this.setCustomData("_", b = {});
                return b
            },
            on: function(c) {
                var a = this.getCustomData("_cke_nativeListeners");
                if (!a) {
                    a = {};
                    this.setCustomData("_cke_nativeListeners", a)
                }
                if (!a[c]) {
                    a = a[c] = b(this, c);
                    this.$.addEventListener ? this.$.addEventListener(c, a, !! CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + c, a)
                }
                return CKEDITOR.event.prototype.on.apply(this, arguments)
            },
            removeListener: function(b) {
                CKEDITOR.event.prototype.removeListener.apply(this, arguments);
                if (!this.hasListeners(b)) {
                    var a = this.getCustomData("_cke_nativeListeners"),
                        e = a && a[b];
                    if (e) {
                        this.$.removeEventListener ? this.$.removeEventListener(b, e, false) : this.$.detachEvent && this.$.detachEvent("on" + b, e);
                        delete a[b]
                    }
                }
            },
            removeAllListeners: function() {
                var b = this.getCustomData("_cke_nativeListeners"),
                    a;
                for (a in b) {
                    var e = b[a];
                    this.$.detachEvent ? this.$.detachEvent("on" + a, e) : this.$.removeEventListener && this.$.removeEventListener(a, e, false);
                    delete b[a]
                }
            }
        }
    }();
    (function(b) {
        var c = {};
        CKEDITOR.on("reset", function() {
            c = {}
        });
        b.equals = function(a) {
            try {
                return a && a.$ === this.$
            } catch (b) {
                return false
            }
        };
        b.setCustomData = function(a, b) {
            var f = this.getUniqueId();
            (c[f] || (c[f] = {}))[a] = b;
            return this
        };
        b.getCustomData = function(a) {
            var b = this.$["data-cke-expando"];
            return (b = b && c[b]) && a in b ? b[a] : null
        };
        b.removeCustomData = function(a) {
            var b = this.$["data-cke-expando"],
                b = b && c[b],
                f, d;
            if (b) {
                f = b[a];
                d = a in b;
                delete b[a]
            }
            return d ? f : null
        };
        b.clearCustomData = function() {
            this.removeAllListeners();
            var a = this.$["data-cke-expando"];
            a && delete c[a]
        };
        b.getUniqueId = function() {
            return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber())
        };
        CKEDITOR.event.implementOn(b)
    })(CKEDITOR.dom.domObject.prototype);
    CKEDITOR.dom.node = function(b) {
        return b ? new CKEDITOR.dom[b.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : b.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : b.nodeType == CKEDITOR.NODE_TEXT ? "text" : b.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : b.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](b) : this
    };
    CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.NODE_ELEMENT = 1;
    CKEDITOR.NODE_DOCUMENT = 9;
    CKEDITOR.NODE_TEXT = 3;
    CKEDITOR.NODE_COMMENT = 8;
    CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11;
    CKEDITOR.POSITION_IDENTICAL = 0;
    CKEDITOR.POSITION_DISCONNECTED = 1;
    CKEDITOR.POSITION_FOLLOWING = 2;
    CKEDITOR.POSITION_PRECEDING = 4;
    CKEDITOR.POSITION_IS_CONTAINED = 8;
    CKEDITOR.POSITION_CONTAINS = 16;
    CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
        appendTo: function(b, c) {
            b.append(this, c);
            return b
        },
        clone: function(b, c) {
            var a = this.$.cloneNode(b),
                e = function(a) {
                    a["data-cke-expando"] && (a["data-cke-expando"] = false);
                    if (a.nodeType == CKEDITOR.NODE_ELEMENT) {
                        c || a.removeAttribute("id", false);
                        if (b) for (var a = a.childNodes, d = 0; d < a.length; d++) e(a[d])
                    }
                };
            e(a);
            return new CKEDITOR.dom.node(a)
        },
        hasPrevious: function() {
            return !!this.$.previousSibling
        },
        hasNext: function() {
            return !!this.$.nextSibling
        },
        insertAfter: function(b) {
            b.$.parentNode.insertBefore(this.$, b.$.nextSibling);
            return b
        },
        insertBefore: function(b) {
            b.$.parentNode.insertBefore(this.$, b.$);
            return b
        },
        insertBeforeMe: function(b) {
            this.$.parentNode.insertBefore(b.$, this.$);
            return b
        },
        getAddress: function(b) {
            for (var c = [], a = this.getDocument().$.documentElement, e = this.$; e && e != a;) {
                var f = e.parentNode;
                f && c.unshift(this.getIndex.call({
                    $: e
                }, b));
                e = f
            }
            return c
        },
        getDocument: function() {
            return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument)
        },
        getIndex: function(b) {
            var c = this.$,
                a = -1,
                e;
            if (!this.$.parentNode) return a;
            do
            if (!b || !(c != this.$ && c.nodeType == CKEDITOR.NODE_TEXT && (e || !c.nodeValue))) {
                a++;
                e = c.nodeType == CKEDITOR.NODE_TEXT
            }
            while (c = c.previousSibling);
            return a
        },
        getNextSourceNode: function(b, c, a) {
            if (a && !a.call) var e = a,
                a = function(a) {
                    return !a.equals(e)
                };
            var b = !b && this.getFirst && this.getFirst(),
                f;
            if (!b) {
                if (this.type == CKEDITOR.NODE_ELEMENT && a && a(this, true) === false) return null;
                b = this.getNext()
            }
            for (; !b && (f = (f || this).getParent());) {
                if (a && a(f, true) === false) return null;
                b = f.getNext()
            }
            return !b || a && a(b) === false ? null : c && c != b.type ? b.getNextSourceNode(false, c, a) : b
        },
        getPreviousSourceNode: function(b, c, a) {
            if (a && !a.call) var e = a,
                a = function(a) {
                    return !a.equals(e)
                };
            var b = !b && this.getLast && this.getLast(),
                f;
            if (!b) {
                if (this.type == CKEDITOR.NODE_ELEMENT && a && a(this, true) === false) return null;
                b = this.getPrevious()
            }
            for (; !b && (f = (f || this).getParent());) {
                if (a && a(f, true) === false) return null;
                b = f.getPrevious()
            }
            return !b || a && a(b) === false ? null : c && b.type != c ? b.getPreviousSourceNode(false, c, a) : b
        },
        getPrevious: function(b) {
            var c = this.$,
                a;
            do a = (c = c.previousSibling) && c.nodeType != 10 && new CKEDITOR.dom.node(c);
            while (a && b && !b(a));
            return a
        },
        getNext: function(b) {
            var c = this.$,
                a;
            do a = (c = c.nextSibling) && new CKEDITOR.dom.node(c);
            while (a && b && !b(a));
            return a
        },
        getParent: function(b) {
            var c = this.$.parentNode;
            return c && (c.nodeType == CKEDITOR.NODE_ELEMENT || b && c.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(c) : null
        },
        getParents: function(b) {
            var c = this,
                a = [];
            do a[b ? "push" : "unshift"](c);
            while (c = c.getParent());
            return a
        },
        getCommonAncestor: function(b) {
            if (b.equals(this)) return this;
            if (b.contains && b.contains(this)) return b;
            var c = this.contains ? this : this.getParent();
            do
            if (c.contains(b)) return c;
            while (c = c.getParent());
            return null
        },
        getPosition: function(b) {
            var c = this.$,
                a = b.$;
            if (c.compareDocumentPosition) return c.compareDocumentPosition(a);
            if (c == a) return CKEDITOR.POSITION_IDENTICAL;
            if (this.type == CKEDITOR.NODE_ELEMENT && b.type == CKEDITOR.NODE_ELEMENT) {
                if (c.contains) {
                    if (c.contains(a)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING;
                    if (a.contains(c)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
                }
                if ("sourceIndex" in c) return c.sourceIndex < 0 || a.sourceIndex < 0 ? CKEDITOR.POSITION_DISCONNECTED : c.sourceIndex < a.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
            }
            for (var c = this.getAddress(), b = b.getAddress(), a = Math.min(c.length, b.length), e = 0; e <= a - 1; e++) if (c[e] != b[e]) {
                if (e < a) return c[e] < b[e] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
                break
            }
            return c.length < b.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
        },
        getAscendant: function(b, c) {
            var a = this.$,
                e;
            if (!c) a = a.parentNode;
            for (; a;) {
                if (a.nodeName && (e = a.nodeName.toLowerCase(), typeof b == "string" ? e == b : e in b)) return new CKEDITOR.dom.node(a);
                try {
                    a = a.parentNode
                } catch (f) {
                    a = null
                }
            }
            return null
        },
        hasAscendant: function(b, c) {
            var a = this.$;
            if (!c) a = a.parentNode;
            for (; a;) {
                if (a.nodeName && a.nodeName.toLowerCase() == b) return true;
                a = a.parentNode
            }
            return false
        },
        move: function(b, c) {
            b.append(this.remove(), c)
        },
        remove: function(b) {
            var c = this.$,
                a = c.parentNode;
            if (a) {
                if (b) for (; b = c.firstChild;) a.insertBefore(c.removeChild(b), c);
                a.removeChild(c)
            }
            return this
        },
        replace: function(b) {
            this.insertBefore(b);
            b.remove()
        },
        trim: function() {
            this.ltrim();
            this.rtrim()
        },
        ltrim: function() {
            for (var b; this.getFirst && (b = this.getFirst());) {
                if (b.type == CKEDITOR.NODE_TEXT) {
                    var c = CKEDITOR.tools.ltrim(b.getText()),
                        a = b.getLength();
                    if (c) {
                        if (c.length < a) {
                            b.split(a - c.length);
                            this.$.removeChild(this.$.firstChild)
                        }
                    } else {
                        b.remove();
                        continue
                    }
                }
                break
            }
        },
        rtrim: function() {
            for (var b; this.getLast && (b = this.getLast());) {
                if (b.type == CKEDITOR.NODE_TEXT) {
                    var c = CKEDITOR.tools.rtrim(b.getText()),
                        a = b.getLength();
                    if (c) {
                        if (c.length < a) {
                            b.split(c.length);
                            this.$.lastChild.parentNode.removeChild(this.$.lastChild)
                        }
                    } else {
                        b.remove();
                        continue
                    }
                }
                break
            }
            if (!CKEDITOR.env.ie && !CKEDITOR.env.opera)(b = this.$.lastChild) && (b.type == 1 && b.nodeName.toLowerCase() == "br") && b.parentNode.removeChild(b)
        },
        isReadOnly: function() {
            var b = this;
            this.type != CKEDITOR.NODE_ELEMENT && (b = this.getParent());
            if (b && typeof b.$.isContentEditable != "undefined") return !(b.$.isContentEditable || b.data("cke-editable"));
            for (; b;) {
                if (b.data("cke-editable")) break;
                if (b.getAttribute("contentEditable") == "false") return true;
                if (b.getAttribute("contentEditable") == "true") break;
                b = b.getParent()
            }
            return !b
        }
    });
    CKEDITOR.dom.window = function(b) {
        CKEDITOR.dom.domObject.call(this, b)
    };
    CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
        focus: function() {
            this.$.focus()
        },
        getViewPaneSize: function() {
            var b = this.$.document,
                c = b.compatMode == "CSS1Compat";
            return {
                width: (c ? b.documentElement.clientWidth : b.body.clientWidth) || 0,
                height: (c ? b.documentElement.clientHeight : b.body.clientHeight) || 0
            }
        },
        getScrollPosition: function() {
            var b = this.$;
            if ("pageXOffset" in b) return {
                x: b.pageXOffset || 0,
                y: b.pageYOffset || 0
            };
            b = b.document;
            return {
                x: b.documentElement.scrollLeft || b.body.scrollLeft || 0,
                y: b.documentElement.scrollTop || b.body.scrollTop || 0
            }
        },
        getFrame: function() {
            var b = this.$.frameElement;
            return b ? new CKEDITOR.dom.element.get(b) : null
        }
    });
    CKEDITOR.dom.document = function(b) {
        CKEDITOR.dom.domObject.call(this, b)
    };
    CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
        type: CKEDITOR.NODE_DOCUMENT,
        appendStyleSheet: function(b) {
            if (this.$.createStyleSheet) this.$.createStyleSheet(b);
            else {
                var c = new CKEDITOR.dom.element("link");
                c.setAttributes({
                    rel: "stylesheet",
                    type: "text/css",
                    href: b
                });
                this.getHead().append(c)
            }
        },
        appendStyleText: function(b) {
            if (this.$.createStyleSheet) {
                var c = this.$.createStyleSheet("");
                c.cssText = b
            } else {
                var a = new CKEDITOR.dom.element("style", this);
                a.append(new CKEDITOR.dom.text(b, this));
                this.getHead().append(a)
            }
            return c || a.$.sheet
        },
        createElement: function(b, c) {
            var a = new CKEDITOR.dom.element(b, this);
            if (c) {
                c.attributes && a.setAttributes(c.attributes);
                c.styles && a.setStyles(c.styles)
            }
            return a
        },
        createText: function(b) {
            return new CKEDITOR.dom.text(b, this)
        },
        focus: function() {
            this.getWindow().focus()
        },
        getActive: function() {
            return new CKEDITOR.dom.element(this.$.activeElement)
        },
        getById: function(b) {
            return (b = this.$.getElementById(b)) ? new CKEDITOR.dom.element(b) : null
        },
        getByAddress: function(b, c) {
            for (var a = this.$.documentElement, e = 0; a && e < b.length; e++) {
                var f = b[e];
                if (c) for (var d = -1, i = 0; i < a.childNodes.length; i++) {
                    var l = a.childNodes[i];
                    if (!(c === true && l.nodeType == 3 && l.previousSibling && l.previousSibling.nodeType == 3)) {
                        d++;
                        if (d == f) {
                            a = l;
                            break
                        }
                    }
                } else a = a.childNodes[f]
            }
            return a ? new CKEDITOR.dom.node(a) : null
        },
        getElementsByTag: function(b, c) {
            if ((!CKEDITOR.env.ie || document.documentMode > 8) && c) b = c + ":" + b;
            return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(b))
        },
        getHead: function() {
            var b = this.$.getElementsByTagName("head")[0];
            return b = b ? new CKEDITOR.dom.element(b) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), true)
        },
        getBody: function() {
            return new CKEDITOR.dom.element(this.$.body)
        },
        getDocumentElement: function() {
            return new CKEDITOR.dom.element(this.$.documentElement)
        },
        getWindow: function() {
            return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView)
        },
        write: function(b) {
            this.$.open("text/html", "replace");
            CKEDITOR.env.ie && (b = b.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$&\n<script data-cke-temp="1">(' + CKEDITOR.tools.fixDomain + ")();<\/script>"));
            this.$.write(b);
            this.$.close()
        }
    });
    CKEDITOR.dom.nodeList = function(b) {
        this.$ = b
    };
    CKEDITOR.dom.nodeList.prototype = {
        count: function() {
            return this.$.length
        },
        getItem: function(b) {
            if (b < 0 || b >= this.$.length) return null;
            return (b = this.$[b]) ? new CKEDITOR.dom.node(b) : null
        }
    };
    CKEDITOR.dom.element = function(b, c) {
        typeof b == "string" && (b = (c ? c.$ : document).createElement(b));
        CKEDITOR.dom.domObject.call(this, b)
    };
    CKEDITOR.dom.element.get = function(b) {
        return (b = typeof b == "string" ? document.getElementById(b) || document.getElementsByName(b)[0] : b) && (b.$ ? b : new CKEDITOR.dom.element(b))
    };
    CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node;
    CKEDITOR.dom.element.createFromHtml = function(b, c) {
        var a = new CKEDITOR.dom.element("div", c);
        a.setHtml(b);
        return a.getFirst().remove()
    };
    CKEDITOR.dom.element.setMarker = function(b, c, a, e) {
        var f = c.getCustomData("list_marker_id") || c.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),
            d = c.getCustomData("list_marker_names") || c.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
        b[f] = c;
        d[a] = 1;
        return c.setCustomData(a, e)
    };
    CKEDITOR.dom.element.clearAllMarkers = function(b) {
        for (var c in b) CKEDITOR.dom.element.clearMarkers(b, b[c], 1)
    };
    CKEDITOR.dom.element.clearMarkers = function(b, c, a) {
        var e = c.getCustomData("list_marker_names"),
            f = c.getCustomData("list_marker_id"),
            d;
        for (d in e) c.removeCustomData(d);
        c.removeCustomData("list_marker_names");
        if (a) {
            c.removeCustomData("list_marker_id");
            delete b[f]
        }
    };
    (function() {
        function b(a) {
            for (var b = 0, f = 0, d = c[a].length; f < d; f++) b = b + (parseInt(this.getComputedStyle(c[a][f]) || 0, 10) || 0);
            return b
        }
        CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
            type: CKEDITOR.NODE_ELEMENT,
            addClass: function(a) {
                var b = this.$.className;
                b && (RegExp("(?:^|\\s)" + a + "(?:\\s|$)", "").test(b) || (b = b + (" " + a)));
                this.$.className = b || a
            },
            removeClass: function(a) {
                var b = this.getAttribute("class");
                if (b) {
                    a = RegExp("(?:^|\\s+)" + a + "(?=\\s|$)", "i");
                    if (a.test(b))(b = b.replace(a, "").replace(/^\s+/, "")) ? this.setAttribute("class", b) : this.removeAttribute("class")
                }
                return this
            },
            hasClass: function(a) {
                return RegExp("(?:^|\\s+)" + a + "(?=\\s|$)", "").test(this.getAttribute("class"))
            },
            append: function(a, b) {
                typeof a == "string" && (a = this.getDocument().createElement(a));
                b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$);
                return a
            },
            appendHtml: function(a) {
                if (this.$.childNodes.length) {
                    var b = new CKEDITOR.dom.element("div", this.getDocument());
                    b.setHtml(a);
                    b.moveChildren(this)
                } else this.setHtml(a)
            },
            appendText: function(a) {
                this.$.text != void 0 ? this.$.text = this.$.text + a : this.append(new CKEDITOR.dom.text(a))
            },
            appendBogus: function() {
                for (var a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());) a = a.getPrevious();
                if (!a || !a.is || !a.is("br")) {
                    a = CKEDITOR.env.opera ? this.getDocument().createText("") : this.getDocument().createElement("br");
                    CKEDITOR.env.gecko && a.setAttribute("type", "_moz");
                    this.append(a)
                }
            },
            breakParent: function(a) {
                var b = new CKEDITOR.dom.range(this.getDocument());
                b.setStartAfter(this);
                b.setEndAfter(a);
                a = b.extractContents();
                b.insertNode(this.remove());
                a.insertAfterNode(this)
            },
            contains: CKEDITOR.env.ie || CKEDITOR.env.webkit ?
            function(a) {
                var b = this.$;
                return a.type != CKEDITOR.NODE_ELEMENT ? b.contains(a.getParent().$) : b != a.$ && b.contains(a.$)
            } : function(a) {
                return !!(this.$.compareDocumentPosition(a.$) & 16)
            },
            focus: function() {
                function a() {
                    try {
                        this.$.focus()
                    } catch (a) {}
                }
                return function(b) {
                    b ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this)
                }
            }(),
            getHtml: function() {
                var a = this.$.innerHTML;
                return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a
            },
            getOuterHtml: function() {
                if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, "");
                var a = this.$.ownerDocument.createElement("div");
                a.appendChild(this.$.cloneNode(true));
                return a.innerHTML
            },
            getClientRect: function() {
                var a = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect());
                !a.width && (a.width = a.right - a.left);
                !a.height && (a.height = a.bottom - a.top);
                return a
            },
            setHtml: function() {
                var a = function(a) {
                        return this.$.innerHTML = a
                    };
                return CKEDITOR.env.ie && CKEDITOR.env.version < 9 ?
                function(a) {
                    try {
                        return this.$.innerHTML = a
                    } catch (b) {
                        this.$.innerHTML = "";
                        var c = new CKEDITOR.dom.element("body", this.getDocument());
                        c.$.innerHTML = a;
                        for (c = c.getChildren(); c.count();) this.append(c.getItem(0));
                        return a
                    }
                } : a
            }(),
            setText: function(a) {
                CKEDITOR.dom.element.prototype.setText = this.$.innerText != void 0 ?
                function(a) {
                    return this.$.innerText = a
                } : function(a) {
                    return this.$.textContent = a
                };
                return this.setText(a)
            },
            getAttribute: function() {
                var a = function(a) {
                        return this.$.getAttribute(a, 2)
                    };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ?
                function(a) {
                    switch (a) {
                    case "class":
                        a = "className";
                        break;
                    case "http-equiv":
                        a = "httpEquiv";
                        break;
                    case "name":
                        return this.$.name;
                    case "tabindex":
                        a = this.$.getAttribute(a, 2);
                        a !== 0 && this.$.tabIndex === 0 && (a = null);
                        return a;
                    case "checked":
                        a = this.$.attributes.getNamedItem(a);
                        return (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null;
                    case "hspace":
                    case "value":
                        return this.$[a];
                    case "style":
                        return this.$.style.cssText;
                    case "contenteditable":
                    case "contentEditable":
                        return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
                    }
                    return this.$.getAttribute(a, 2)
                } : a
            }(),
            getChildren: function() {
                return new CKEDITOR.dom.nodeList(this.$.childNodes)
            },
            getComputedStyle: CKEDITOR.env.ie ?
            function(a) {
                return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)]
            } : function(a) {
                var b = this.getWindow().$.getComputedStyle(this.$, null);
                return b ? b.getPropertyValue(a) : ""
            },
            getDtd: function() {
                var a = CKEDITOR.dtd[this.getName()];
                this.getDtd = function() {
                    return a
                };
                return a
            },
            getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag,
            getTabIndex: CKEDITOR.env.ie ?
            function() {
                var a = this.$.tabIndex;
                a === 0 && (!CKEDITOR.dtd.$tabIndex[this.getName()] && parseInt(this.getAttribute("tabindex"), 10) !== 0) && (a = -1);
                return a
            } : CKEDITOR.env.webkit ?
            function() {
                var a = this.$.tabIndex;
                if (a == void 0) {
                    a = parseInt(this.getAttribute("tabindex"), 10);
                    isNaN(a) && (a = -1)
                }
                return a
            } : function() {
                return this.$.tabIndex
            },
            getText: function() {
                return this.$.textContent || this.$.innerText || ""
            },
            getWindow: function() {
                return this.getDocument().getWindow()
            },
            getId: function() {
                return this.$.id || null
            },
            getNameAtt: function() {
                return this.$.name || null
            },
            getName: function() {
                var a = this.$.nodeName.toLowerCase();
                if (CKEDITOR.env.ie && !(document.documentMode > 8)) {
                    var b = this.$.scopeName;
                    b != "HTML" && (a = b.toLowerCase() + ":" + a)
                }
                return (this.getName = function() {
                    return a
                })()
            },
            getValue: function() {
                return this.$.value
            },
            getFirst: function(a) {
                var b = this.$.firstChild;
                (b = b && new CKEDITOR.dom.node(b)) && (a && !a(b)) && (b = b.getNext(a));
                return b
            },
            getLast: function(a) {
                var b = this.$.lastChild;
                (b = b && new CKEDITOR.dom.node(b)) && (a && !a(b)) && (b = b.getPrevious(a));
                return b
            },
            getStyle: function(a) {
                return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]
            },
            is: function() {
                var a = this.getName();
                if (typeof arguments[0] == "object") return !!arguments[0][a];
                for (var b = 0; b < arguments.length; b++) if (arguments[b] == a) return true;
                return false
            },
            isEditable: function(a) {
                var b = this.getName();
                if (this.isReadOnly() || this.getComputedStyle("display") == "none" || this.getComputedStyle("visibility") == "hidden" || CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount()) return false;
                if (a !== false) {
                    a = CKEDITOR.dtd[b] || CKEDITOR.dtd.span;
                    return !(!a || !a["#"])
                }
                return true
            },
            isIdentical: function(a) {
                var b = this.clone(0, 1),
                    a = a.clone(0, 1);
                b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                if (b.$.isEqualNode) {
                    b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText);
                    a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText);
                    return b.$.isEqualNode(a.$)
                }
                b = b.getOuterHtml();
                a = a.getOuterHtml();
                if (CKEDITOR.env.ie && CKEDITOR.env.version < 9 && this.is("a")) {
                    var c = this.getParent();
                    if (c.type == CKEDITOR.NODE_ELEMENT) {
                        c = c.clone();
                        c.setHtml(b);
                        b = c.getHtml();
                        c.setHtml(a);
                        a = c.getHtml()
                    }
                }
                return b == a
            },
            isVisible: function() {
                var a = (this.$.offsetHeight || this.$.offsetWidth) && this.getComputedStyle("visibility") != "hidden",
                    b, c;
                if (a && (CKEDITOR.env.webkit || CKEDITOR.env.opera)) {
                    b = this.getWindow();
                    if (!b.equals(CKEDITOR.document.getWindow()) && (c = b.$.frameElement)) a = (new CKEDITOR.dom.element(c)).isVisible()
                }
                return !!a
            },
            isEmptyInlineRemoveable: function() {
                if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return false;
                for (var a = this.getChildren(), b = 0, c = a.count(); b < c; b++) {
                    var d = a.getItem(b);
                    if (!(d.type == CKEDITOR.NODE_ELEMENT && d.data("cke-bookmark")) && (d.type == CKEDITOR.NODE_ELEMENT && !d.isEmptyInlineRemoveable() || d.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(d.getText()))) return false
                }
                return true
            },
            hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ?
            function() {
                for (var a = this.$.attributes, b = 0; b < a.length; b++) {
                    var c = a[b];
                    switch (c.nodeName) {
                    case "class":
                        if (this.getAttribute("class")) return true;
                    case "data-cke-expando":
                        continue;
                    default:
                        if (c.specified) return true
                    }
                }
                return false
            } : function() {
                var a = this.$.attributes,
                    b = a.length,
                    c = {
                        "data-cke-expando": 1,
                        _moz_dirty: 1
                    };
                return b > 0 && (b > 2 || !c[a[0].nodeName] || b == 2 && !c[a[1].nodeName])
            },
            hasAttribute: function() {
                function a(a) {
                    a = this.$.attributes.getNamedItem(a);
                    return !(!a || !a.specified)
                }
                return CKEDITOR.env.ie && CKEDITOR.env.version < 8 ?
                function(b) {
                    return b == "name" ? !! this.$.name : a.call(this, b)
                } : a
            }(),
            hide: function() {
                this.setStyle("display", "none")
            },
            moveChildren: function(a, b) {
                var c = this.$,
                    a = a.$;
                if (c != a) {
                    var d;
                    if (b) for (; d = c.lastChild;) a.insertBefore(c.removeChild(d), a.firstChild);
                    else for (; d = c.firstChild;) a.appendChild(c.removeChild(d))
                }
            },
            mergeSiblings: function() {
                function a(a, b, c) {
                    if (b && b.type == CKEDITOR.NODE_ELEMENT) {
                        for (var i = []; b.data("cke-bookmark") || b.isEmptyInlineRemoveable();) {
                            i.push(b);
                            b = c ? b.getNext() : b.getPrevious();
                            if (!b || b.type != CKEDITOR.NODE_ELEMENT) return
                        }
                        if (a.isIdentical(b)) {
                            for (var l = c ? a.getLast() : a.getFirst(); i.length;) i.shift().move(a, !c);
                            b.moveChildren(a, !c);
                            b.remove();
                            l && l.type == CKEDITOR.NODE_ELEMENT && l.mergeSiblings()
                        }
                    }
                }
                return function(b) {
                    if (b === false || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) {
                        a(this, this.getNext(), true);
                        a(this, this.getPrevious())
                    }
                }
            }(),
            show: function() {
                this.setStyles({
                    display: "",
                    visibility: ""
                })
            },
            setAttribute: function() {
                var a = function(a, b) {
                        this.$.setAttribute(a, b);
                        return this
                    };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ?
                function(b, c) {
                    b == "class" ? this.$.className = c : b == "style" ? this.$.style.cssText = c : b == "tabindex" ? this.$.tabIndex = c : b == "checked" ? this.$.checked = c : b == "contenteditable" ? a.call(this, "contentEditable", c) : a.apply(this, arguments);
                    return this
                } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ?
                function(b, c) {
                    if (b == "src" && c.match(/^http:\/\//)) try {
                        a.apply(this, arguments)
                    } catch (d) {} else a.apply(this, arguments);
                    return this
                } : a
            }(),
            setAttributes: function(a) {
                for (var b in a) this.setAttribute(b, a[b]);
                return this
            },
            setValue: function(a) {
                this.$.value = a;
                return this
            },
            removeAttribute: function() {
                var a = function(a) {
                        this.$.removeAttribute(a)
                    };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ?
                function(a) {
                    a == "class" ? a = "className" : a == "tabindex" ? a = "tabIndex" : a == "contenteditable" && (a = "contentEditable");
                    this.$.removeAttribute(a)
                } : a
            }(),
            removeAttributes: function(a) {
                if (CKEDITOR.tools.isArray(a)) for (var b = 0; b < a.length; b++) this.removeAttribute(a[b]);
                else for (b in a) a.hasOwnProperty(b) && this.removeAttribute(b)
            },
            removeStyle: function(a) {
                var b = this.$.style;
                if (!b.removeProperty && (a == "border" || a == "margin" || a == "padding")) {
                    var c = ["top", "left", "right", "bottom"],
                        d;
                    a == "border" && (d = ["color", "style", "width"]);
                    for (var b = [], i = 0; i < c.length; i++) if (d) for (var l = 0; l < d.length; l++) b.push([a, c[i], d[l]].join("-"));
                    else b.push([a, c[i]].join("-"));
                    for (a = 0; a < b.length; a++) this.removeStyle(b[a])
                } else {
                    b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a));
                    this.$.style.cssText || this.removeAttribute("style")
                }
            },
            setStyle: function(a, b) {
                this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b;
                return this
            },
            setStyles: function(a) {
                for (var b in a) this.setStyle(b, a[b]);
                return this
            },
            setOpacity: function(a) {
                if (CKEDITOR.env.ie && CKEDITOR.env.version < 9) {
                    a = Math.round(a * 100);
                    this.setStyle("filter", a >= 100 ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity=" + a + ")")
                } else this.setStyle("opacity", a)
            },
            unselectable: function() {
                this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none"));
                if (CKEDITOR.env.ie || CKEDITOR.env.opera) {
                    this.setAttribute("unselectable", "on");
                    for (var a, b = this.getElementsByTag("*"), c = 0, d = b.count(); c < d; c++) {
                        a = b.getItem(c);
                        a.setAttribute("unselectable", "on")
                    }
                }
            },
            getPositionedAncestor: function() {
                for (var a = this; a.getName() != "html";) {
                    if (a.getComputedStyle("position") != "static") return a;
                    a = a.getParent()
                }
                return null
            },
            getDocumentPosition: function(a) {
                var b = 0,
                    c = 0,
                    d = this.getDocument(),
                    i = d.getBody(),
                    l = d.$.compatMode == "BackCompat";
                if (document.documentElement.getBoundingClientRect) {
                    var j = this.$.getBoundingClientRect(),
                        m = d.$.documentElement,
                        n = m.clientTop || i.$.clientTop || 0,
                        q = m.clientLeft || i.$.clientLeft || 0,
                        p = true;
                    if (CKEDITOR.env.ie) {
                        p = d.getDocumentElement().contains(this);
                        d = d.getBody().contains(this);
                        p = l && d || !l && p
                    }
                    if (p) {
                        b = j.left + (!l && m.scrollLeft || i.$.scrollLeft);
                        b = b - q;
                        c = j.top + (!l && m.scrollTop || i.$.scrollTop);
                        c = c - n
                    }
                } else {
                    i = this;
                    for (d = null; i && !(i.getName() == "body" || i.getName() == "html");) {
                        b = b + (i.$.offsetLeft - i.$.scrollLeft);
                        c = c + (i.$.offsetTop - i.$.scrollTop);
                        if (!i.equals(this)) {
                            b = b + (i.$.clientLeft || 0);
                            c = c + (i.$.clientTop || 0)
                        }
                        for (; d && !d.equals(i);) {
                            b = b - d.$.scrollLeft;
                            c = c - d.$.scrollTop;
                            d = d.getParent()
                        }
                        d = i;
                        i = (j = i.$.offsetParent) ? new CKEDITOR.dom.element(j) : null
                    }
                }
                if (a) {
                    i = this.getWindow();
                    d = a.getWindow();
                    if (!i.equals(d) && i.$.frameElement) {
                        a = (new CKEDITOR.dom.element(i.$.frameElement)).getDocumentPosition(a);
                        b = b + a.x;
                        c = c + a.y
                    }
                }
                if (!document.documentElement.getBoundingClientRect && CKEDITOR.env.gecko && !l) {
                    b = b + (this.$.clientLeft ? 1 : 0);
                    c = c + (this.$.clientTop ? 1 : 0)
                }
                return {
                    x: b,
                    y: c
                }
            },
            scrollIntoView: function(a) {
                var b = this.getParent();
                if (b) {
                    do {
                        (b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1);
                        if (b.is("html")) {
                            var c = b.getWindow();
                            try {
                                var d = c.$.frameElement;
                                d && (b = new CKEDITOR.dom.element(d))
                            } catch (i) {}
                        }
                    } while (b = b.getParent())
                }
            },
            scrollIntoParent: function(a, b, c) {
                var d, i, l, j;
                function m(b, c) {
                    if (/body|html/.test(a.getName())) a.getWindow().$.scrollBy(b, c);
                    else {
                        a.$.scrollLeft = a.$.scrollLeft + b;
                        a.$.scrollTop = a.$.scrollTop + c
                    }
                }
                function n(a, b) {
                    var c = {
                        x: 0,
                        y: 0
                    };
                    if (!a.is(p ? "body" : "html")) {
                        var g = a.$.getBoundingClientRect();
                        c.x = g.left;
                        c.y = g.top
                    }
                    g = a.getWindow();
                    if (!g.equals(b)) {
                        g = n(CKEDITOR.dom.element.get(g.$.frameElement), b);
                        c.x = c.x + g.x;
                        c.y = c.y + g.y
                    }
                    return c
                }
                function q(a, b) {
                    return parseInt(a.getComputedStyle("margin-" + b) || 0, 10) || 0
                }!a && (a = this.getWindow());
                l = a.getDocument();
                var p = l.$.compatMode == "BackCompat";
                a instanceof CKEDITOR.dom.window && (a = p ? l.getBody() : l.getDocumentElement());
                l = a.getWindow();
                i = n(this, l);
                var h = n(a, l),
                    g = this.$.offsetHeight;
                d = this.$.offsetWidth;
                var u = a.$.clientHeight,
                    w = a.$.clientWidth;
                l = i.x - q(this, "left") - h.x || 0;
                j = i.y - q(this, "top") - h.y || 0;
                d = i.x + d + q(this, "right") - (h.x + w) || 0;
                i = i.y + g + q(this, "bottom") - (h.y + u) || 0;
                if (j < 0 || i > 0) m(0, b === true ? j : b === false ? i : j < 0 ? j : i);
                if (c && (l < 0 || d > 0)) m(l < 0 ? l : d, 0)
            },
            setState: function(a, b, c) {
                b = b || "cke";
                switch (a) {
                case CKEDITOR.TRISTATE_ON:
                    this.addClass(b + "_on");
                    this.removeClass(b + "_off");
                    this.removeClass(b + "_disabled");
                    c && this.setAttribute("aria-pressed", true);
                    c && this.removeAttribute("aria-disabled");
                    break;
                case CKEDITOR.TRISTATE_DISABLED:
                    this.addClass(b + "_disabled");
                    this.removeClass(b + "_off");
                    this.removeClass(b + "_on");
                    c && this.setAttribute("aria-disabled", true);
                    c && this.removeAttribute("aria-pressed");
                    break;
                default:
                    this.addClass(b + "_off");
                    this.removeClass(b + "_on");
                    this.removeClass(b + "_disabled");
                    c && this.removeAttribute("aria-pressed");
                    c && this.removeAttribute("aria-disabled")
                }
            },
            getFrameDocument: function() {
                var a = this.$;
                try {
                    a.contentWindow.document
                } catch (b) {
                    a.src = a.src
                }
                return a && new CKEDITOR.dom.document(a.contentWindow.document)
            },
            copyAttributes: function(a, b) {
                for (var c = this.$.attributes, b = b || {}, d = 0; d < c.length; d++) {
                    var i = c[d],
                        l = i.nodeName.toLowerCase(),
                        j;
                    if (!(l in b)) if (l == "checked" && (j = this.getAttribute(l))) a.setAttribute(l, j);
                    else if (i.specified || CKEDITOR.env.ie && i.nodeValue && l == "value") {
                        j = this.getAttribute(l);
                        if (j === null) j = i.nodeValue;
                        a.setAttribute(l, j)
                    }
                }
                if (this.$.style.cssText !== "") a.$.style.cssText = this.$.style.cssText
            },
            renameNode: function(a) {
                if (this.getName() != a) {
                    var b = this.getDocument(),
                        a = new CKEDITOR.dom.element(a, b);
                    this.copyAttributes(a);
                    this.moveChildren(a);
                    this.getParent() && this.$.parentNode.replaceChild(a.$, this.$);
                    a.$["data-cke-expando"] = this.$["data-cke-expando"];
                    this.$ = a.$
                }
            },
            getChild: function() {
                function a(a, b) {
                    var c = a.childNodes;
                    if (b >= 0 && b < c.length) return c[b]
                }
                return function(b) {
                    var c = this.$;
                    if (b.slice) for (; b.length > 0 && c;) c = a(c, b.shift());
                    else c = a(c, b);
                    return c ? new CKEDITOR.dom.node(c) : null
                }
            }(),
            getChildCount: function() {
                return this.$.childNodes.length
            },
            disableContextMenu: function() {
                this.on("contextmenu", function(a) {
                    a.data.getTarget().hasClass("cke_enable_context_menu") || a.data.preventDefault()
                })
            },
            getDirection: function(a) {
                return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir || "ltr" : this.getStyle("direction") || this.getAttribute("dir")
            },
            data: function(a, b) {
                a = "data-" + a;
                if (b === void 0) return this.getAttribute(a);
                b === false ? this.removeAttribute(a) : this.setAttribute(a, b);
                return null
            },
            getEditor: function() {
                var a = CKEDITOR.instances,
                    b, c;
                for (b in a) {
                    c = a[b];
                    if (c.element.equals(this) && c.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) return c
                }
                return null
            }
        });
        var c = {
            width: ["border-left-width", "border-right-width", "padding-left", "padding-right"],
            height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"]
        };
        CKEDITOR.dom.element.prototype.setSize = function(a, c, f) {
            if (typeof c == "number") {
                if (f && (!CKEDITOR.env.ie || !CKEDITOR.env.quirks)) c = c - b.call(this, a);
                this.setStyle(a, c + "px")
            }
        };
        CKEDITOR.dom.element.prototype.getSize = function(a, c) {
            var f = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0;
            c && (f = f - b.call(this, a));
            return f
        }
    })();
    CKEDITOR.dom.documentFragment = function(b) {
        b = b || CKEDITOR.document;
        this.$ = b.type == CKEDITOR.NODE_DOCUMENT ? b.$.createDocumentFragment() : b
    };
    CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {
        type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
        insertAfterNode: function(b) {
            b = b.$;
            b.parentNode.insertBefore(this.$, b.nextSibling)
        }
    }, !0, {
        append: 1,
        appendBogus: 1,
        getFirst: 1,
        getLast: 1,
        getParent: 1,
        getNext: 1,
        getPrevious: 1,
        appendTo: 1,
        moveChildren: 1,
        insertBefore: 1,
        insertAfterNode: 1,
        replace: 1,
        trim: 1,
        type: 1,
        ltrim: 1,
        rtrim: 1,
        getDocument: 1,
        getChildCount: 1,
        getChild: 1,
        getChildren: 1
    });
    (function() {
        function b(a, b) {
            var c = this.range;
            if (this._.end) return null;
            if (!this._.start) {
                this._.start = 1;
                if (c.collapsed) {
                    this.end();
                    return null
                }
                c.optimize()
            }
            var d, n = c.startContainer;
            d = c.endContainer;
            var q = c.startOffset,
                p = c.endOffset,
                h, g = this.guard,
                u = this.type,
                e = a ? "getPreviousSourceNode" : "getNextSourceNode";
            if (!a && !this._.guardLTR) {
                var k = d.type == CKEDITOR.NODE_ELEMENT ? d : d.getParent(),
                    f = d.type == CKEDITOR.NODE_ELEMENT ? d.getChild(p) : d.getNext();
                this._.guardLTR = function(a, b) {
                    return (!b || !k.equals(a)) && (!f || !a.equals(f)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root))
                }
            }
            if (a && !this._.guardRTL) {
                var B = n.type == CKEDITOR.NODE_ELEMENT ? n : n.getParent(),
                    z = n.type == CKEDITOR.NODE_ELEMENT ? q ? n.getChild(q - 1) : null : n.getPrevious();
                this._.guardRTL = function(a, b) {
                    return (!b || !B.equals(a)) && (!z || !a.equals(z)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root))
                }
            }
            var F = a ? this._.guardRTL : this._.guardLTR;
            h = g ?
            function(a, b) {
                return F(a, b) === false ? false : g(a, b)
            } : F;
            if (this.current) d = this.current[e](false, u, h);
            else {
                if (a) d.type == CKEDITOR.NODE_ELEMENT && (d = p > 0 ? d.getChild(p - 1) : h(d, true) === false ? null : d.getPreviousSourceNode(true, u, h));
                else {
                    d = n;
                    if (d.type == CKEDITOR.NODE_ELEMENT && !(d = d.getChild(q))) d = h(n, true) === false ? null : n.getNextSourceNode(true, u, h)
                }
                d && h(d) === false && (d = null)
            }
            for (; d && !this._.end;) {
                this.current = d;
                if (!this.evaluator || this.evaluator(d) !== false) {
                    if (!b) return d
                } else if (b && this.evaluator) return false;
                d = d[e](false, u, h)
            }
            this.end();
            return this.current = null
        }
        function c(a) {
            for (var c, d = null; c = b.call(this, a);) d = c;
            return d
        }
        CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
            $: function(a) {
                this.range = a;
                this._ = {}
            },
            proto: {
                end: function() {
                    this._.end = 1
                },
                next: function() {
                    return b.call(this)
                },
                previous: function() {
                    return b.call(this, 1)
                },
                checkForward: function() {
                    return b.call(this, 0, 1) !== false
                },
                checkBackward: function() {
                    return b.call(this, 1, 1) !== false
                },
                lastForward: function() {
                    return c.call(this)
                },
                lastBackward: function() {
                    return c.call(this, 1)
                },
                reset: function() {
                    delete this.current;
                    this._ = {}
                }
            }
        });
        var a = {
            block: 1,
            "list-item": 1,
            table: 1,
            "table-row-group": 1,
            "table-header-group": 1,
            "table-footer-group": 1,
            "table-row": 1,
            "table-column-group": 1,
            "table-column": 1,
            "table-cell": 1,
            "table-caption": 1
        };
        CKEDITOR.dom.element.prototype.isBlockBoundary = function(b) {
            b = b ? CKEDITOR.tools.extend({}, CKEDITOR.dtd.$block, b || {}) : CKEDITOR.dtd.$block;
            return this.getComputedStyle("float") == "none" && a[this.getComputedStyle("display")] || b[this.getName()]
        };
        CKEDITOR.dom.walker.blockBoundary = function(a) {
            return function(b) {
                return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a))
            }
        };
        CKEDITOR.dom.walker.listItemBoundary = function() {
            return this.blockBoundary({
                br: 1
            })
        };
        CKEDITOR.dom.walker.bookmark = function(a, b) {
            function c(a) {
                return a && a.getName && a.getName() == "span" && a.data("cke-bookmark")
            }
            return function(d) {
                var n, q;
                n = d && d.type != CKEDITOR.NODE_ELEMENT && (q = d.getParent()) && c(q);
                n = a ? n : n || c(d);
                return !!(b ^ n)
            }
        };
        CKEDITOR.dom.walker.whitespaces = function(a) {
            return function(b) {
                var c;
                b && b.type == CKEDITOR.NODE_TEXT && (c = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && b.getText() == "​");
                return !!(a ^ c)
            }
        };
        CKEDITOR.dom.walker.invisible = function(a) {
            var b = CKEDITOR.dom.walker.whitespaces();
            return function(c) {
                if (b(c)) c = 1;
                else {
                    c.type == CKEDITOR.NODE_TEXT && (c = c.getParent());
                    c = !c.$.offsetHeight
                }
                return !!(a ^ c)
            }
        };
        CKEDITOR.dom.walker.nodeType = function(a, b) {
            return function(c) {
                return !!(b ^ c.type == a)
            }
        };
        CKEDITOR.dom.walker.bogus = function(a) {
            function b(a) {
                return !f(a) && !d(a)
            }
            return function(c) {
                var d = !CKEDITOR.env.ie ? c.is && c.is("br") : c.getText && e.test(c.getText());
                if (d) {
                    d = c.getParent();
                    c = c.getNext(b);
                    d = d.isBlockBoundary() && (!c || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary())
                }
                return !!(a ^ d)
            }
        };
        var e = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
            f = CKEDITOR.dom.walker.whitespaces(),
            d = CKEDITOR.dom.walker.bookmark();
        CKEDITOR.dom.element.prototype.getBogus = function() {
            var a = this;
            do a = a.getPreviousSourceNode();
            while (d(a) || f(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty));
            return a && (!CKEDITOR.env.ie ? a.is && a.is("br") : a.getText && e.test(a.getText())) ? a : false
        }
    })();
    CKEDITOR.dom.range = function(b) {
        this.endOffset = this.endContainer = this.startOffset = this.startContainer = null;
        this.collapsed = true;
        var c = b instanceof CKEDITOR.dom.document;
        this.document = c ? b : b.getDocument();
        this.root = c ? b.getBody() : b
    };
    (function() {
        function b() {
            var a = false,
                b = CKEDITOR.dom.walker.whitespaces(),
                c = CKEDITOR.dom.walker.bookmark(true),
                h = CKEDITOR.dom.walker.bogus();
            return function(g) {
                if (c(g) || b(g)) return true;
                if (h(g) && !a) return a = true;
                return g.type == CKEDITOR.NODE_TEXT && (g.hasAscendant("pre") || CKEDITOR.tools.trim(g.getText()).length) || g.type == CKEDITOR.NODE_ELEMENT && !g.is(d) ? false : true
            }
        }
        function c(a) {
            var b = CKEDITOR.dom.walker.whitespaces(),
                c = CKEDITOR.dom.walker.bookmark(1);
            return function(h) {
                return c(h) || b(h) ? true : !a && i(h) || h.type == CKEDITOR.NODE_ELEMENT && h.is(CKEDITOR.dtd.$removeEmpty)
            }
        }
        function a(a) {
            return !l(a) && !j(a)
        }
        var e = function(a) {
                a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset
            },
            f = function(a, b, c, h) {
                a.optimizeBookmark();
                var g = a.startContainer,
                    d = a.endContainer,
                    e = a.startOffset,
                    k = a.endOffset,
                    i, f;
                if (d.type == CKEDITOR.NODE_TEXT) d = d.split(k);
                else if (d.getChildCount() > 0) if (k >= d.getChildCount()) {
                    d = d.append(a.document.createText(""));
                    f = true
                } else d = d.getChild(k);
                if (g.type == CKEDITOR.NODE_TEXT) {
                    g.split(e);
                    g.equals(d) && (d = g.getNext())
                } else if (e) if (e >= g.getChildCount()) {
                    g = g.append(a.document.createText(""));
                    i = true
                } else g = g.getChild(e).getPrevious();
                else {
                    g = g.append(a.document.createText(""), 1);
                    i = true
                }
                var e = g.getParents(),
                    k = d.getParents(),
                    l, j, s;
                for (l = 0; l < e.length; l++) {
                    j = e[l];
                    s = k[l];
                    if (!j.equals(s)) break
                }
                for (var m = c, r, A, v, o = l; o < e.length; o++) {
                    r = e[o];
                    m && !r.equals(g) && (A = m.append(r.clone()));
                    for (r = r.getNext(); r;) {
                        if (r.equals(k[o]) || r.equals(d)) break;
                        v = r.getNext();
                        if (b == 2) m.append(r.clone(true));
                        else {
                            r.remove();
                            b == 1 && m.append(r)
                        }
                        r = v
                    }
                    m && (m = A)
                }
                m = c;
                for (c = l; c < k.length; c++) {
                    r = k[c];
                    b > 0 && !r.equals(d) && (A = m.append(r.clone()));
                    if (!e[c] || r.$.parentNode != e[c].$.parentNode) for (r = r.getPrevious(); r;) {
                        if (r.equals(e[c]) || r.equals(g)) break;
                        v = r.getPrevious();
                        if (b == 2) m.$.insertBefore(r.$.cloneNode(true), m.$.firstChild);
                        else {
                            r.remove();
                            b == 1 && m.$.insertBefore(r.$, m.$.firstChild)
                        }
                        r = v
                    }
                    m && (m = A)
                }
                if (b == 2) {
                    j = a.startContainer;
                    if (j.type == CKEDITOR.NODE_TEXT) {
                        j.$.data = j.$.data + j.$.nextSibling.data;
                        j.$.parentNode.removeChild(j.$.nextSibling)
                    }
                    a = a.endContainer;
                    if (a.type == CKEDITOR.NODE_TEXT && a.$.nextSibling) {
                        a.$.data = a.$.data + a.$.nextSibling.data;
                        a.$.parentNode.removeChild(a.$.nextSibling)
                    }
                } else {
                    if (j && s && (g.$.parentNode != j.$.parentNode || d.$.parentNode != s.$.parentNode)) {
                        b = s.getIndex();
                        i && s.$.parentNode == g.$.parentNode && b--;
                        if (h && j.type == CKEDITOR.NODE_ELEMENT) {
                            h = CKEDITOR.dom.element.createFromHtml('<span data-cke-bookmark="1" style="display:none">&nbsp;</span>', a.document);
                            h.insertAfter(j);
                            j.mergeSiblings(false);
                            a.moveToBookmark({
                                startNode: h
                            })
                        } else a.setStart(s.getParent(), b)
                    }
                    a.collapse(true)
                }
                i && g.remove();
                f && d.$.parentNode && d.remove()
            },
            d = {
                abbr: 1,
                acronym: 1,
                b: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                q: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                tt: 1,
                u: 1,
                "var": 1
            },
            i = CKEDITOR.dom.walker.bogus(),
            l = new CKEDITOR.dom.walker.whitespaces,
            j = new CKEDITOR.dom.walker.bookmark,
            m = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/;
        CKEDITOR.dom.range.prototype = {
            clone: function() {
                var a = new CKEDITOR.dom.range(this.root);
                a.startContainer = this.startContainer;
                a.startOffset = this.startOffset;
                a.endContainer = this.endContainer;
                a.endOffset = this.endOffset;
                a.collapsed = this.collapsed;
                return a
            },
            collapse: function(a) {
                if (a) {
                    this.endContainer = this.startContainer;
                    this.endOffset = this.startOffset
                } else {
                    this.startContainer = this.endContainer;
                    this.startOffset = this.endOffset
                }
                this.collapsed = true
            },
            cloneContents: function() {
                var a = new CKEDITOR.dom.documentFragment(this.document);
                this.collapsed || f(this, 2, a);
                return a
            },
            deleteContents: function(a) {
                this.collapsed || f(this, 0, null, a)
            },
            extractContents: function(a) {
                var b = new CKEDITOR.dom.documentFragment(this.document);
                this.collapsed || f(this, 1, b, a);
                return b
            },
            createBookmark: function(a) {
                var b, c, h, g, d = this.collapsed;
                b = this.document.createElement("span");
                b.data("cke-bookmark", 1);
                b.setStyle("display", "none");
                b.setHtml("&nbsp;");
                if (a) {
                    h = "cke_bm_" + CKEDITOR.tools.getNextNumber();
                    b.setAttribute("id", h + (d ? "C" : "S"))
                }
                if (!d) {
                    c = b.clone();
                    c.setHtml("&nbsp;");
                    a && c.setAttribute("id", h + "E");
                    g = this.clone();
                    g.collapse();
                    g.insertNode(c)
                }
                g = this.clone();
                g.collapse(true);
                g.insertNode(b);
                if (c) {
                    this.setStartAfter(b);
                    this.setEndBefore(c)
                } else this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END);
                return {
                    startNode: a ? h + (d ? "C" : "S") : b,
                    endNode: a ? h + "E" : c,
                    serializable: a,
                    collapsed: d
                }
            },
            createBookmark2: function(a) {
                var b = this.startContainer,
                    c = this.endContainer,
                    h = this.startOffset,
                    g = this.endOffset,
                    d = this.collapsed,
                    e, k;
                if (!b || !c) return {
                    start: 0,
                    end: 0
                };
                if (a) {
                    if (b.type == CKEDITOR.NODE_ELEMENT) {
                        if ((e = b.getChild(h)) && e.type == CKEDITOR.NODE_TEXT && h > 0 && e.getPrevious().type == CKEDITOR.NODE_TEXT) {
                            b = e;
                            h = 0
                        }
                        e && e.type == CKEDITOR.NODE_ELEMENT && (h = e.getIndex(1))
                    }
                    for (; b.type == CKEDITOR.NODE_TEXT && (k = b.getPrevious()) && k.type == CKEDITOR.NODE_TEXT;) {
                        b = k;
                        h = h + k.getLength()
                    }
                    if (!d) {
                        if (c.type == CKEDITOR.NODE_ELEMENT) {
                            if ((e = c.getChild(g)) && e.type == CKEDITOR.NODE_TEXT && g > 0 && e.getPrevious().type == CKEDITOR.NODE_TEXT) {
                                c = e;
                                g = 0
                            }
                            e && e.type == CKEDITOR.NODE_ELEMENT && (g = e.getIndex(1))
                        }
                        for (; c.type == CKEDITOR.NODE_TEXT && (k = c.getPrevious()) && k.type == CKEDITOR.NODE_TEXT;) {
                            c = k;
                            g = g + k.getLength()
                        }
                    }
                }
                return {
                    start: b.getAddress(a),
                    end: d ? null : c.getAddress(a),
                    startOffset: h,
                    endOffset: g,
                    normalized: a,
                    collapsed: d,
                    is2: true
                }
            },
            moveToBookmark: function(a) {
                if (a.is2) {
                    var b = this.document.getByAddress(a.start, a.normalized),
                        c = a.startOffset,
                        h = a.end && this.document.getByAddress(a.end, a.normalized),
                        a = a.endOffset;
                    this.setStart(b, c);
                    h ? this.setEnd(h, a) : this.collapse(true)
                } else {
                    b = (c = a.serializable) ? this.document.getById(a.startNode) : a.startNode;
                    a = c ? this.document.getById(a.endNode) : a.endNode;
                    this.setStartBefore(b);
                    b.remove();
                    if (a) {
                        this.setEndBefore(a);
                        a.remove()
                    } else this.collapse(true)
                }
            },
            getBoundaryNodes: function() {
                var a = this.startContainer,
                    b = this.endContainer,
                    c = this.startOffset,
                    h = this.endOffset,
                    g;
                if (a.type == CKEDITOR.NODE_ELEMENT) {
                    g = a.getChildCount();
                    if (g > c) a = a.getChild(c);
                    else if (g < 1) a = a.getPreviousSourceNode();
                    else {
                        for (a = a.$; a.lastChild;) a = a.lastChild;
                        a = new CKEDITOR.dom.node(a);
                        a = a.getNextSourceNode() || a
                    }
                }
                if (b.type == CKEDITOR.NODE_ELEMENT) {
                    g = b.getChildCount();
                    if (g > h) b = b.getChild(h).getPreviousSourceNode(true);
                    else if (g < 1) b = b.getPreviousSourceNode();
                    else {
                        for (b = b.$; b.lastChild;) b = b.lastChild;
                        b = new CKEDITOR.dom.node(b)
                    }
                }
                a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b);
                return {
                    startNode: a,
                    endNode: b
                }
            },
            getCommonAncestor: function(a, b) {
                var c = this.startContainer,
                    h = this.endContainer,
                    c = c.equals(h) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) : c : c.getCommonAncestor(h);
                return b && !c.is ? c.getParent() : c
            },
            optimize: function() {
                var a = this.startContainer,
                    b = this.startOffset;
                a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a));
                a = this.endContainer;
                b = this.endOffset;
                a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
            },
            optimizeBookmark: function() {
                var a = this.startContainer,
                    b = this.endContainer;
                a.is && (a.is("span") && a.data("cke-bookmark")) && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START);
                b && (b.is && b.is("span") && b.data("cke-bookmark")) && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END)
            },
            trim: function(a, b) {
                var c = this.startContainer,
                    h = this.startOffset,
                    g = this.collapsed;
                if ((!a || g) && c && c.type == CKEDITOR.NODE_TEXT) {
                    if (h) if (h >= c.getLength()) {
                        h = c.getIndex() + 1;
                        c = c.getParent()
                    } else {
                        var d = c.split(h),
                            h = c.getIndex() + 1,
                            c = c.getParent();
                        if (this.startContainer.equals(this.endContainer)) this.setEnd(d, this.endOffset - this.startOffset);
                        else if (c.equals(this.endContainer)) this.endOffset = this.endOffset + 1
                    } else {
                        h = c.getIndex();
                        c = c.getParent()
                    }
                    this.setStart(c, h);
                    if (g) {
                        this.collapse(true);
                        return
                    }
                }
                c = this.endContainer;
                h = this.endOffset;
                if (!b && !g && c && c.type == CKEDITOR.NODE_TEXT) {
                    if (h) {
                        h >= c.getLength() || c.split(h);
                        h = c.getIndex() + 1
                    } else h = c.getIndex();
                    c = c.getParent();
                    this.setEnd(c, h)
                }
            },
            enlarge: function(a, b) {
                switch (a) {
                case CKEDITOR.ENLARGE_INLINE:
                    var c = 1;
                case CKEDITOR.ENLARGE_ELEMENT:
                    if (this.collapsed) break;
                    var h = this.getCommonAncestor(),
                        g = this.root,
                        d, e, k, i, f, l = false,
                        j, s;
                    j = this.startContainer;
                    s = this.startOffset;
                    if (j.type == CKEDITOR.NODE_TEXT) {
                        if (s) {
                            j = !CKEDITOR.tools.trim(j.substring(0, s)).length && j;
                            l = !! j
                        }
                        if (j && !(i = j.getPrevious())) k = j.getParent()
                    } else {
                        s && (i = j.getChild(s - 1) || j.getLast());
                        i || (k = j)
                    }
                    for (; k || i;) {
                        if (k && !i) {
                            !f && k.equals(h) && (f = true);
                            if (c ? k.isBlockBoundary() : !g.contains(k)) break;
                            if (!l || k.getComputedStyle("display") != "inline") {
                                l = false;
                                f ? d = k : this.setStartBefore(k)
                            }
                            i = k.getPrevious()
                        }
                        for (; i;) {
                            j = false;
                            if (i.type == CKEDITOR.NODE_COMMENT) i = i.getPrevious();
                            else {
                                if (i.type == CKEDITOR.NODE_TEXT) {
                                    s = i.getText();
                                    /[^\s\ufeff]/.test(s) && (i = null);
                                    j = /[\s\ufeff]$/.test(s)
                                } else if ((i.$.offsetWidth > 0 || b && i.is("br")) && !i.data("cke-bookmark")) if (l && CKEDITOR.dtd.$removeEmpty[i.getName()]) {
                                    s = i.getText();
                                    if (/[^\s\ufeff]/.test(s)) i = null;
                                    else for (var m = i.$.getElementsByTagName("*"), r = 0, A; A = m[r++];) if (!CKEDITOR.dtd.$removeEmpty[A.nodeName.toLowerCase()]) {
                                        i = null;
                                        break
                                    }
                                    i && (j = !! s.length)
                                } else i = null;
                                j && (l ? f ? d = k : k && this.setStartBefore(k) : l = true);
                                if (i) {
                                    j = i.getPrevious();
                                    if (!k && !j) {
                                        k = i;
                                        i = null;
                                        break
                                    }
                                    i = j
                                } else k = null
                            }
                        }
                        k && (k = k.getParent())
                    }
                    j = this.endContainer;
                    s = this.endOffset;
                    k = i = null;
                    f = l = false;
                    if (j.type == CKEDITOR.NODE_TEXT) {
                        j = !CKEDITOR.tools.trim(j.substring(s)).length && j;
                        l = !(j && j.getLength());
                        if (j && !(i = j.getNext())) k = j.getParent()
                    } else(i = j.getChild(s)) || (k = j);
                    for (; k || i;) {
                        if (k && !i) {
                            !f && k.equals(h) && (f = true);
                            if (c ? k.isBlockBoundary() : !g.contains(k)) break;
                            if (!l || k.getComputedStyle("display") != "inline") {
                                l = false;
                                f ? e = k : k && this.setEndAfter(k)
                            }
                            i = k.getNext()
                        }
                        for (; i;) {
                            j = false;
                            if (i.type == CKEDITOR.NODE_TEXT) {
                                s = i.getText();
                                /[^\s\ufeff]/.test(s) && (i = null);
                                j = /^[\s\ufeff]/.test(s)
                            } else if (i.type == CKEDITOR.NODE_ELEMENT) {
                                if ((i.$.offsetWidth > 0 || b && i.is("br")) && !i.data("cke-bookmark")) if (l && CKEDITOR.dtd.$removeEmpty[i.getName()]) {
                                    s = i.getText();
                                    if (/[^\s\ufeff]/.test(s)) i = null;
                                    else {
                                        m = i.$.getElementsByTagName("*");
                                        for (r = 0; A = m[r++];) if (!CKEDITOR.dtd.$removeEmpty[A.nodeName.toLowerCase()]) {
                                            i = null;
                                            break
                                        }
                                    }
                                    i && (j = !! s.length)
                                } else i = null
                            } else j = 1;
                            j && l && (f ? e = k : this.setEndAfter(k));
                            if (i) {
                                j = i.getNext();
                                if (!k && !j) {
                                    k = i;
                                    i = null;
                                    break
                                }
                                i = j
                            } else k = null
                        }
                        k && (k = k.getParent())
                    }
                    if (d && e) {
                        h = d.contains(e) ? e : d;
                        this.setStartBefore(h);
                        this.setEndAfter(h)
                    }
                    break;
                case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
                case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
                    k = new CKEDITOR.dom.range(this.root);
                    g = this.root;
                    k.setStartAt(g, CKEDITOR.POSITION_AFTER_START);
                    k.setEnd(this.startContainer, this.startOffset);
                    k = new CKEDITOR.dom.walker(k);
                    var v, o, x = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? {
                        br: 1
                    } : null),
                        I = function(a) {
                            var b = x(a);
                            b || (v = a);
                            return b
                        },
                        c = function(a) {
                            var b = I(a);
                            !b && (a.is && a.is("br")) && (o = a);
                            return b
                        };
                    k.guard = I;
                    k = k.lastBackward();
                    v = v || g;
                    this.setStartAt(v, !v.is("br") && (!k && this.checkStartOfBlock() || k && v.contains(k)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END);
                    if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
                        k = this.clone();
                        k = new CKEDITOR.dom.walker(k);
                        var G = CKEDITOR.dom.walker.whitespaces(),
                            D = CKEDITOR.dom.walker.bookmark();
                        k.evaluator = function(a) {
                            return !G(a) && !D(a)
                        };
                        if ((k = k.previous()) && k.type == CKEDITOR.NODE_ELEMENT && k.is("br")) break
                    }
                    k = this.clone();
                    k.collapse();
                    k.setEndAt(g, CKEDITOR.POSITION_BEFORE_END);
                    k = new CKEDITOR.dom.walker(k);
                    k.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? c : I;
                    v = null;
                    k = k.lastForward();
                    v = v || g;
                    this.setEndAt(v, !k && this.checkEndOfBlock() || k && v.contains(k) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START);
                    o && this.setEndAfter(o)
                }
            },
            shrink: function(a, b, c) {
                if (!this.collapsed) {
                    var a = a || CKEDITOR.SHRINK_TEXT,
                        d = this.clone(),
                        g = this.startContainer,
                        e = this.endContainer,
                        i = this.startOffset,
                        k = this.endOffset,
                        f = 1,
                        j = 1;
                    if (g && g.type == CKEDITOR.NODE_TEXT) if (i) if (i >= g.getLength()) d.setStartAfter(g);
                    else {
                        d.setStartBefore(g);
                        f = 0
                    } else d.setStartBefore(g);
                    if (e && e.type == CKEDITOR.NODE_TEXT) if (k) if (k >= e.getLength()) d.setEndAfter(e);
                    else {
                        d.setEndAfter(e);
                        j = 0
                    } else d.setEndBefore(e);
                    var d = new CKEDITOR.dom.walker(d),
                        l = CKEDITOR.dom.walker.bookmark();
                    d.evaluator = function(b) {
                        return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT)
                    };
                    var m;
                    d.guard = function(b, d) {
                        if (l(b)) return true;
                        if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || d && b.equals(m) || c === false && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary()) return false;
                        !d && b.type == CKEDITOR.NODE_ELEMENT && (m = b);
                        return true
                    };
                    if (f)(g = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(g, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START);
                    if (j) {
                        d.reset();
                        (d = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(d, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END)
                    }
                    return !(!f && !j)
                }
            },
            insertNode: function(a) {
                this.optimizeBookmark();
                this.trim(false, true);
                var b = this.startContainer,
                    c = b.getChild(this.startOffset);
                c ? a.insertBefore(c) : b.append(a);
                a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++;
                this.setStartBefore(a)
            },
            moveToPosition: function(a, b) {
                this.setStartAt(a, b);
                this.collapse(true)
            },
            moveToRange: function(a) {
                this.setStart(a.startContainer, a.startOffset);
                this.setEnd(a.endContainer, a.endOffset)
            },
            selectNodeContents: function(a) {
                this.setStart(a, 0);
                this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount())
            },
            setStart: function(a, b) {
                if (a.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[a.getName()]) {
                    b = a.getIndex();
                    a = a.getParent()
                }
                this.startContainer = a;
                this.startOffset = b;
                if (!this.endContainer) {
                    this.endContainer = a;
                    this.endOffset = b
                }
                e(this)
            },
            setEnd: function(a, b) {
                if (a.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[a.getName()]) {
                    b = a.getIndex() + 1;
                    a = a.getParent()
                }
                this.endContainer = a;
                this.endOffset = b;
                if (!this.startContainer) {
                    this.startContainer = a;
                    this.startOffset = b
                }
                e(this)
            },
            setStartAfter: function(a) {
                this.setStart(a.getParent(), a.getIndex() + 1)
            },
            setStartBefore: function(a) {
                this.setStart(a.getParent(), a.getIndex())
            },
            setEndAfter: function(a) {
                this.setEnd(a.getParent(), a.getIndex() + 1)
            },
            setEndBefore: function(a) {
                this.setEnd(a.getParent(), a.getIndex())
            },
            setStartAt: function(a, b) {
                switch (b) {
                case CKEDITOR.POSITION_AFTER_START:
                    this.setStart(a, 0);
                    break;
                case CKEDITOR.POSITION_BEFORE_END:
                    a.type == CKEDITOR.NODE_TEXT ? this.setStart(a, a.getLength()) : this.setStart(a, a.getChildCount());
                    break;
                case CKEDITOR.POSITION_BEFORE_START:
                    this.setStartBefore(a);
                    break;
                case CKEDITOR.POSITION_AFTER_END:
                    this.setStartAfter(a)
                }
                e(this)
            },
            setEndAt: function(a, b) {
                switch (b) {
                case CKEDITOR.POSITION_AFTER_START:
                    this.setEnd(a, 0);
                    break;
                case CKEDITOR.POSITION_BEFORE_END:
                    a.type == CKEDITOR.NODE_TEXT ? this.setEnd(a, a.getLength()) : this.setEnd(a, a.getChildCount());
                    break;
                case CKEDITOR.POSITION_BEFORE_START:
                    this.setEndBefore(a);
                    break;
                case CKEDITOR.POSITION_AFTER_END:
                    this.setEndAfter(a)
                }
                e(this)
            },
            fixBlock: function(a, b) {
                var c = this.createBookmark(),
                    d = this.document.createElement(b);
                this.collapse(a);
                this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                this.extractContents().appendTo(d);
                d.trim();
                CKEDITOR.env.ie || d.appendBogus();
                this.insertNode(d);
                this.moveToBookmark(c);
                return d
            },
            splitBlock: function(a) {
                var b = new CKEDITOR.dom.elementPath(this.startContainer, this.root),
                    c = new CKEDITOR.dom.elementPath(this.endContainer, this.root),
                    d = b.block,
                    g = c.block,
                    e = null;
                if (!b.blockLimit.equals(c.blockLimit)) return null;
                if (a != "br") {
                    if (!d) {
                        d = this.fixBlock(true, a);
                        g = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block
                    }
                    g || (g = this.fixBlock(false, a))
                }
                a = d && this.checkStartOfBlock();
                b = g && this.checkEndOfBlock();
                this.deleteContents();
                if (d && d.equals(g)) if (b) {
                    e = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                    this.moveToPosition(g, CKEDITOR.POSITION_AFTER_END);
                    g = null
                } else if (a) {
                    e = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                    this.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START);
                    d = null
                } else {
                    g = this.splitElement(d);
                    !CKEDITOR.env.ie && !d.is("ul", "ol") && d.appendBogus()
                }
                return {
                    previousBlock: d,
                    nextBlock: g,
                    wasStartOfBlock: a,
                    wasEndOfBlock: b,
                    elementPath: e
                }
            },
            splitElement: function(a) {
                if (!this.collapsed) return null;
                this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END);
                var b = this.extractContents(),
                    c = a.clone(false);
                b.appendTo(c);
                c.insertAfter(a);
                this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END);
                return c
            },
            removeEmptyBlocksAtEnd: function() {
                function a(d) {
                    return function(a) {
                        return b(a) || (c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable()) || d.is("table") && a.is("caption") ? false : true
                    }
                }
                var b = CKEDITOR.dom.walker.whitespaces(),
                    c = CKEDITOR.dom.walker.bookmark(false);
                return function(b) {
                    for (var c = this.createBookmark(), d = this[b ? "endPath" : "startPath"](), e = d.block || d.blockLimit, i; e && !e.equals(d.root) && !e.getFirst(a(e));) {
                        i = e.getParent();
                        this[b ? "setEndAt" : "setStartAt"](e, CKEDITOR.POSITION_AFTER_END);
                        e.remove(1);
                        e = i
                    }
                    this.moveToBookmark(c)
                }
            }(),
            startPath: function() {
                return new CKEDITOR.dom.elementPath(this.startContainer, this.root)
            },
            endPath: function() {
                return new CKEDITOR.dom.elementPath(this.endContainer, this.root)
            },
            checkBoundaryOfElement: function(a, b) {
                var d = b == CKEDITOR.START,
                    h = this.clone();
                h.collapse(d);
                h[d ? "setStartAt" : "setEndAt"](a, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END);
                h = new CKEDITOR.dom.walker(h);
                h.evaluator = c(d);
                return h[d ? "checkBackward" : "checkForward"]()
            },
            checkStartOfBlock: function() {
                var a = this.startContainer,
                    c = this.startOffset;
                if (CKEDITOR.env.ie && c && a.type == CKEDITOR.NODE_TEXT) {
                    a = CKEDITOR.tools.ltrim(a.substring(0, c));
                    m.test(a) && this.trim(0, 1)
                }
                this.trim();
                a = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                c = this.clone();
                c.collapse(true);
                c.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START);
                a = new CKEDITOR.dom.walker(c);
                a.evaluator = b();
                return a.checkBackward()
            },
            checkEndOfBlock: function() {
                var a = this.endContainer,
                    c = this.endOffset;
                if (CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT) {
                    a = CKEDITOR.tools.rtrim(a.substring(c));
                    m.test(a) && this.trim(1, 0)
                }
                this.trim();
                a = new CKEDITOR.dom.elementPath(this.endContainer, this.root);
                c = this.clone();
                c.collapse(false);
                c.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
                a = new CKEDITOR.dom.walker(c);
                a.evaluator = b();
                return a.checkForward()
            },
            getPreviousNode: function(a, b, c) {
                var d = this.clone();
                d.collapse(1);
                d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START);
                c = new CKEDITOR.dom.walker(d);
                c.evaluator = a;
                c.guard = b;
                return c.previous()
            },
            getNextNode: function(a, b, c) {
                var d = this.clone();
                d.collapse();
                d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END);
                c = new CKEDITOR.dom.walker(d);
                c.evaluator = a;
                c.guard = b;
                return c.next()
            },
            checkReadOnly: function() {
                function a(b, c) {
                    for (; b;) {
                        if (b.type == CKEDITOR.NODE_ELEMENT) {
                            if (b.getAttribute("contentEditable") == "false" && !b.data("cke-editable")) return 0;
                            if (b.is("html") || b.getAttribute("contentEditable") == "true" && (b.contains(c) || b.equals(c))) break
                        }
                        b = b.getParent()
                    }
                    return 1
                }
                return function() {
                    var b = this.startContainer,
                        c = this.endContainer;
                    return !(a(b, c) && a(c, b))
                }
            }(),
            moveToElementEditablePosition: function(b, c) {
                if (b.type == CKEDITOR.NODE_ELEMENT && !b.isEditable(false)) {
                    this.moveToPosition(b, c ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
                    return true
                }
                for (var d = 0; b;) {
                    if (b.type == CKEDITOR.NODE_TEXT) {
                        c && this.checkEndOfBlock() && m.test(b.getText()) ? this.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(b, c ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
                        d = 1;
                        break
                    }
                    if (b.type == CKEDITOR.NODE_ELEMENT) if (b.isEditable()) {
                        this.moveToPosition(b, c ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START);
                        d = 1
                    } else c && (b.is("br") && this.checkEndOfBlock()) && this.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START);
                    var h = b,
                        g = d,
                        e = void 0;
                    h.type == CKEDITOR.NODE_ELEMENT && h.isEditable(false) && (e = h[c ? "getLast" : "getFirst"](a));
                    !g && !e && (e = h[c ? "getPrevious" : "getNext"](a));
                    b = e
                }
                return !!d
            },
            moveToElementEditStart: function(a) {
                return this.moveToElementEditablePosition(a)
            },
            moveToElementEditEnd: function(a) {
                return this.moveToElementEditablePosition(a, true)
            },
            getEnclosedNode: function() {
                var a = this.clone();
                a.optimize();
                if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null;
                var a = new CKEDITOR.dom.walker(a),
                    b = CKEDITOR.dom.walker.bookmark(false, true),
                    c = CKEDITOR.dom.walker.whitespaces(true);
                a.evaluator = function(a) {
                    return c(a) && b(a)
                };
                var d = a.next();
                a.reset();
                return d && d.equals(a.previous()) ? d : null
            },
            getTouchedStartNode: function() {
                var a = this.startContainer;
                return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a
            },
            getTouchedEndNode: function() {
                var a = this.endContainer;
                return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a
            },
            scrollIntoView: function() {
                var a = new CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", this.document),
                    b, c, d, g = this.clone();
                g.optimize();
                if (d = g.startContainer.type == CKEDITOR.NODE_TEXT) {
                    c = g.startContainer.getText();
                    b = g.startContainer.split(g.startOffset);
                    a.insertAfter(g.startContainer)
                } else g.insertNode(a);
                a.scrollIntoView();
                if (d) {
                    g.startContainer.setText(c);
                    b.remove()
                }
                a.remove()
            }
        }
    })();
    CKEDITOR.POSITION_AFTER_START = 1;
    CKEDITOR.POSITION_BEFORE_END = 2;
    CKEDITOR.POSITION_BEFORE_START = 3;
    CKEDITOR.POSITION_AFTER_END = 4;
    CKEDITOR.ENLARGE_ELEMENT = 1;
    CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2;
    CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3;
    CKEDITOR.ENLARGE_INLINE = 4;
    CKEDITOR.START = 1;
    CKEDITOR.END = 2;
    CKEDITOR.SHRINK_ELEMENT = 1;
    CKEDITOR.SHRINK_TEXT = 2;
    (function() {
        function b(a) {
            if (!(arguments.length < 1)) {
                this.range = a;
                this.forceBrBreak = 0;
                this.enlargeBr = 1;
                this.enforceRealBlocks = 0;
                this._ || (this._ = {})
            }
        }
        function c(a, b, c) {
            for (a = a.getNextSourceNode(b, null, c); !e(a);) a = a.getNextSourceNode(b, null, c);
            return a
        }
        var a = /^[\r\n\t ]+$/,
            e = CKEDITOR.dom.walker.bookmark(false, true),
            f = CKEDITOR.dom.walker.whitespaces(true),
            d = function(a) {
                return e(a) && f(a)
            };
        b.prototype = {
            getNextParagraph: function(b) {
                b = b || "p";
                if (!CKEDITOR.dtd[this.range.root.getName()][b]) return null;
                var f, j, m, n, q, p;
                if (!this._.started) {
                    j = this.range.clone();
                    j.shrink(CKEDITOR.NODE_ELEMENT, true);
                    n = j.endContainer.hasAscendant("pre", true) || j.startContainer.hasAscendant("pre", true);
                    j.enlarge(this.forceBrBreak && !n || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                    if (!j.collapsed) {
                        n = new CKEDITOR.dom.walker(j.clone());
                        var h = CKEDITOR.dom.walker.bookmark(true, true);
                        n.evaluator = h;
                        this._.nextNode = n.next();
                        n = new CKEDITOR.dom.walker(j.clone());
                        n.evaluator = h;
                        n = n.previous();
                        this._.lastNode = n.getNextSourceNode(true);
                        if (this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary()) {
                            h = this.range.clone();
                            h.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END);
                            if (h.checkEndOfBlock()) {
                                h = new CKEDITOR.dom.elementPath(h.endContainer, h.root);
                                this._.lastNode = (h.block || h.blockLimit).getNextSourceNode(true)
                            }
                        }
                        if (!this._.lastNode) {
                            this._.lastNode = this._.docEndMarker = j.document.createText("");
                            this._.lastNode.insertAfter(n)
                        }
                        j = null
                    }
                    this._.started = 1
                }
                h = this._.nextNode;
                n = this._.lastNode;
                for (this._.nextNode = null; h;) {
                    var g = 0,
                        u = h.hasAscendant("pre"),
                        w = h.type != CKEDITOR.NODE_ELEMENT,
                        k = 0;
                    if (w) h.type == CKEDITOR.NODE_TEXT && a.test(h.getText()) && (w = 0);
                    else {
                        var t = h.getName();
                        if (h.isBlockBoundary(this.forceBrBreak && !u && {
                            br: 1
                        })) {
                            if (t == "br") w = 1;
                            else if (!j && !h.getChildCount() && t != "hr") {
                                f = h;
                                m = h.equals(n);
                                break
                            }
                            if (j) {
                                j.setEndAt(h, CKEDITOR.POSITION_BEFORE_START);
                                if (t != "br") this._.nextNode = h
                            }
                            g = 1
                        } else {
                            if (h.getFirst()) {
                                if (!j) {
                                    j = this.range.clone();
                                    j.setStartAt(h, CKEDITOR.POSITION_BEFORE_START)
                                }
                                h = h.getFirst();
                                continue
                            }
                            w = 1
                        }
                    }
                    if (w && !j) {
                        j = this.range.clone();
                        j.setStartAt(h, CKEDITOR.POSITION_BEFORE_START)
                    }
                    m = (!g || w) && h.equals(n);
                    if (j && !g) for (; !h.getNext(d) && !m;) {
                        t = h.getParent();
                        if (t.isBlockBoundary(this.forceBrBreak && !u && {
                            br: 1
                        })) {
                            g = 1;
                            w = 0;
                            m || t.equals(n);
                            j.setEndAt(t, CKEDITOR.POSITION_BEFORE_END);
                            break
                        }
                        h = t;
                        w = 1;
                        m = h.equals(n);
                        k = 1
                    }
                    w && j.setEndAt(h, CKEDITOR.POSITION_AFTER_END);
                    h = c(h, k, n);
                    if ((m = !h) || g && j) break
                }
                if (!f) {
                    if (!j) {
                        this._.docEndMarker && this._.docEndMarker.remove();
                        return this._.nextNode = null
                    }
                    f = new CKEDITOR.dom.elementPath(j.startContainer, j.root);
                    h = f.blockLimit;
                    g = {
                        div: 1,
                        th: 1,
                        td: 1
                    };
                    f = f.block;
                    if (!f && h && !this.enforceRealBlocks && g[h.getName()] && j.checkStartOfBlock() && j.checkEndOfBlock() && !h.equals(j.root)) f = h;
                    else if (!f || this.enforceRealBlocks && f.getName() == "li") {
                        f = this.range.document.createElement(b);
                        j.extractContents().appendTo(f);
                        f.trim();
                        j.insertNode(f);
                        q = p = true
                    } else if (f.getName() != "li") {
                        if (!j.checkStartOfBlock() || !j.checkEndOfBlock()) {
                            f = f.clone(false);
                            j.extractContents().appendTo(f);
                            f.trim();
                            p = j.splitBlock();
                            q = !p.wasStartOfBlock;
                            p = !p.wasEndOfBlock;
                            j.insertNode(f)
                        }
                    } else if (!m) this._.nextNode = f.equals(n) ? null : c(j.getBoundaryNodes().endNode, 1, n)
                }
                if (q)(j = f.getPrevious()) && j.type == CKEDITOR.NODE_ELEMENT && (j.getName() == "br" ? j.remove() : j.getLast() && j.getLast().$.nodeName.toLowerCase() == "br" && j.getLast().remove());
                if (p)(j = f.getLast()) && j.type == CKEDITOR.NODE_ELEMENT && j.getName() == "br" && (CKEDITOR.env.ie || j.getPrevious(e) || j.getNext(e)) && j.remove();
                if (!this._.nextNode) this._.nextNode = m || f.equals(n) || !n ? null : c(f, 1, n);
                return f
            }
        };
        CKEDITOR.dom.range.prototype.createIterator = function() {
            return new b(this)
        }
    })();
    CKEDITOR.command = function(b, c) {
        this.uiItems = [];
        this.exec = function(a) {
            if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) return false;
            this.editorFocus && b.focus();
            return this.fire("exec") === false ? true : c.exec.call(this, b, a) !== false
        };
        this.refresh = function(a, b) {
            if (!this.readOnly && a.readOnly) return true;
            if (this.context && !b.isContextFor(this.context)) {
                this.disable();
                return true
            }
            this.enable();
            return this.fire("refresh", {
                editor: a,
                path: b
            }) === false ? true : c.refresh && c.refresh.apply(this, arguments) !== false
        };
        var a;
        this.checkAllowed = function() {
            return typeof a == "boolean" ? a : a = b.filter.checkFeature(this)
        };
        CKEDITOR.tools.extend(this, c, {
            modes: {
                wysiwyg: 1
            },
            editorFocus: 1,
            contextSensitive: !! c.context,
            state: CKEDITOR.TRISTATE_DISABLED
        });
        CKEDITOR.event.call(this)
    };
    CKEDITOR.command.prototype = {
        enable: function() {
            this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(!this.preserveState || typeof this.previousState == "undefined" ? CKEDITOR.TRISTATE_OFF : this.previousState)
        },
        disable: function() {
            this.setState(CKEDITOR.TRISTATE_DISABLED)
        },
        setState: function(b) {
            if (this.state == b || !this.checkAllowed()) return false;
            this.previousState = this.state;
            this.state = b;
            this.fire("state");
            return true
        },
        toggleState: function() {
            this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
        }
    };
    CKEDITOR.event.implementOn(CKEDITOR.command.prototype);
    CKEDITOR.ENTER_P = 1;
    CKEDITOR.ENTER_BR = 2;
    CKEDITOR.ENTER_DIV = 3;
    CKEDITOR.config = {
        customConfig: "config.js",
        autoUpdateElement: !0,
        language: "",
        defaultLanguage: "en",
        contentsLangDirection: "",
        enterMode: CKEDITOR.ENTER_P,
        forceEnterMode: !1,
        shiftEnterMode: CKEDITOR.ENTER_BR,
        docType: "<!DOCTYPE html>",
        bodyId: "",
        bodyClass: "",
        fullPage: !1,
        height: 200,
        extraPlugins: "",
        removePlugins: "",
        protectedSource: [],
        tabIndex: 0,
        width: "",
        baseFloatZIndex: 1E4,
        blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85]
    };
    (function() {
        function b(a, b, d, g, h) {
            var e = b.name;
            if ((g || typeof a.elements != "function" || a.elements(e)) && (!a.match || a.match(b))) {
                if (g = !h) {
                    a: if (a.nothingRequired) g = true;
                    else {
                        if (h = a.requiredClasses) {
                            e = b.classes;
                            for (g = 0; g < h.length; ++g) if (CKEDITOR.tools.indexOf(e, h[g]) == -1) {
                                g = false;
                                break a
                            }
                        }
                        g = f(b.styles, a.requiredStyles) && f(b.attributes, a.requiredAttributes)
                    }
                    g = !g
                }
                if (!g) {
                    if (!a.propertiesOnly) d.valid = true;
                    if (!d.allAttributes) d.allAttributes = c(a.attributes, b.attributes, d.validAttributes);
                    if (!d.allStyles) d.allStyles = c(a.styles, b.styles, d.validStyles);
                    if (!d.allClasses) {
                        a = a.classes;
                        b = b.classes;
                        g = d.validClasses;
                        if (a) if (a === true) b = true;
                        else {
                            for (var h = 0, e = b.length, k; h < e; ++h) {
                                k = b[h];
                                g[k] || (g[k] = a(k))
                            }
                            b = false
                        } else b = false;
                        d.allClasses = b
                    }
                }
            }
        }
        function c(a, b, c) {
            if (!a) return false;
            if (a === true) return true;
            for (var d in b) c[d] || (c[d] = a(d, b[d]));
            return false
        }
        function a(a, b) {
            if (!a) return false;
            if (a === true) return a;
            if (typeof a == "string") {
                a = s(a);
                return a == "*" ? true : CKEDITOR.tools.convertArrayToObject(a.split(b))
            }
            if (CKEDITOR.tools.isArray(a)) return a.length ? CKEDITOR.tools.convertArrayToObject(a) : false;
            var c = {},
                d = 0,
                g;
            for (g in a) {
                c[g] = a[g];
                d++
            }
            return d ? c : false
        }
        function e(a) {
            if (a._.filterFunction) return a._.filterFunction;
            var c = /^cke:(object|embed|param)$/,
                d = /^(object|embed|param)$/;
            return a._.filterFunction = function(g, h, e, k, i, f, p) {
                var o = g.name,
                    q, l = false;
                if (i) g.name = o = o.replace(c, "$1");
                if (e = e && e[o]) {
                    j(g);
                    for (o = 0; o < e.length; ++o) u(a, g, e[o]);
                    m(g)
                }
                if (h) {
                    var o = g.name,
                        e = h.elements[o],
                        w = h.generic,
                        h = {
                            valid: false,
                            validAttributes: {},
                            validClasses: {},
                            validStyles: {},
                            allAttributes: false,
                            allClasses: false,
                            allStyles: false
                        };
                    if (!e && !w) {
                        k.push(g);
                        return true
                    }
                    j(g);
                    if (e) {
                        o = 0;
                        for (q = e.length; o < q; ++o) b(e[o], g, h, true, f)
                    }
                    if (w) {
                        o = 0;
                        for (q = w.length; o < q; ++o) b(w[o], g, h, false, f)
                    }
                    if (!h.valid) {
                        k.push(g);
                        return true
                    }
                    f = h.validAttributes;
                    o = h.validStyles;
                    e = h.validClasses;
                    q = g.attributes;
                    var w = g.styles,
                        s = q["class"],
                        x = q.style,
                        t, F, z = [],
                        r = [],
                        C = /^data-cke-/,
                        B = false;
                    delete q.style;
                    delete q["class"];
                    if (!h.allAttributes) for (t in q) if (!f[t]) if (C.test(t)) {
                        if (t != (F = t.replace(/^data-cke-saved-/, "")) && !f[F]) {
                            delete q[t];
                            B = true
                        }
                    } else {
                        delete q[t];
                        B = true
                    }
                    if (h.allStyles) {
                        if (x) q.style = x
                    } else {
                        for (t in w) o[t] ? z.push(t + ":" + w[t]) : B = true;
                        if (z.length) q.style = z.sort().join("; ")
                    }
                    if (h.allClasses) s && (q["class"] = s);
                    else {
                        for (t in e) e[t] && r.push(t);
                        r.length && (q["class"] = r.sort().join(" "));
                        s && r.length < s.split(/\s+/).length && (B = true)
                    }
                    B && (l = true);
                    if (!p && !n(g)) {
                        k.push(g);
                        return true
                    }
                }
                if (i) g.name = g.name.replace(d, "cke:$1");
                return l
            }
        }
        function f(a, b) {
            if (!b) return true;
            for (var c = 0; c < b.length; ++c) if (!(b[c] in a)) return false;
            return true
        }
        function d(a) {
            if (!a) return {};
            for (var a = a.split(/\s*,\s*/).sort(), b = {}; a.length;) b[a.shift()] = C;
            return b
        }
        function i(a) {
            for (var b, c, d, g, h = {}, e = 1, a = s(a); b = a.match(v);) {
                if (c = b[2]) {
                    d = l(c, "styles");
                    g = l(c, "attrs");
                    c = l(c, "classes")
                } else d = g = c = null;
                h["$" + e++] = {
                    elements: b[1],
                    classes: c,
                    styles: d,
                    attributes: g
                };
                a = a.slice(b[0].length)
            }
            return h
        }
        function l(a, b) {
            var c = a.match(o[b]);
            return c ? s(c[1]) : null
        }
        function j(a) {
            if (!a.styles) a.styles = CKEDITOR.tools.parseCssText(a.attributes.style || "", 1);
            if (!a.classes) a.classes = a.attributes["class"] ? a.attributes["class"].split(/\s+/) : []
        }
        function m(a) {
            var b = a.attributes,
                c;
            delete b.style;
            delete b["class"];
            if (c = CKEDITOR.tools.writeCssText(a.styles, true)) b.style = c;
            a.classes.length && (b["class"] = a.classes.sort().join(" "))
        }
        function n(a) {
            switch (a.name) {
            case "a":
                if (!a.children.length && !a.attributes.name) return false;
                break;
            case "img":
                if (!a.attributes.src) return false
            }
            return true
        }
        function q(a) {
            return !a ? false : a === true ? true : function(b) {
                return b in a
            }
        }
        function p() {
            return new CKEDITOR.htmlParser.element("br")
        }
        function h(a) {
            return a.type == CKEDITOR.NODE_ELEMENT && (a.name == "br" || z.$block[a.name])
        }
        function g(a, b, c) {
            var d = a.name;
            if (z.$empty[d] || !a.children.length) if (d == "hr" && b == "br") a.replaceWith(p());
            else {
                a.parent && c.push({
                    check: "it",
                    el: a.parent
                });
                a.remove()
            } else if (z.$block[d] || d == "tr") if (b == "br") {
                if (a.previous && !h(a.previous)) {
                    b = p();
                    b.insertBefore(a)
                }
                if (a.next && !h(a.next)) {
                    b = p();
                    b.insertAfter(a)
                }
                a.replaceWithChildren()
            } else {
                var d = a.children,
                    g;
                b: {
                    g = z[b];
                    for (var e = 0, k = d.length, i; e < k; ++e) {
                        i = d[e];
                        if (i.type == CKEDITOR.NODE_ELEMENT && !g[i.name]) {
                            g = false;
                            break b
                        }
                    }
                    g = true
                }
                if (g) {
                    a.name = b;
                    a.attributes = {};
                    c.push({
                        check: "parent-down",
                        el: a
                    })
                } else {
                    g = a.parent;
                    for (var e = g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || g.name == "body", f, k = d.length; k > 0;) {
                        i = d[--k];
                        if (e && (i.type == CKEDITOR.NODE_TEXT || i.type == CKEDITOR.NODE_ELEMENT && z.$inline[i.name])) {
                            if (!f) {
                                f = new CKEDITOR.htmlParser.element(b);
                                f.insertAfter(a);
                                c.push({
                                    check: "parent-down",
                                    el: f
                                })
                            }
                            f.add(i, 0)
                        } else {
                            f = null;
                            i.insertAfter(a);
                            g.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && (i.type == CKEDITOR.NODE_ELEMENT && !z[g.name][i.name]) && c.push({
                                check: "el-up",
                                el: i
                            })
                        }
                    }
                    a.remove()
                }
            } else if (d == "style") a.remove();
            else {
                a.parent && c.push({
                    check: "it",
                    el: a.parent
                });
                a.replaceWithChildren()
            }
        }
        function u(a, b, c) {
            var d, g;
            for (d = 0; d < c.length; ++d) {
                g = c[d];
                if ((!g.check || a.check(g.check, false)) && (!g.left || g.left(b))) {
                    g.right(b, x);
                    break
                }
            }
        }
        function w(a, b) {
            var c = b.getDefinition(),
                d = c.attributes,
                g = c.styles,
                h, e, k, i;
            if (a.name != c.element) return false;
            for (h in d) if (h == "class") {
                c = d[h].split(/\s+/);
                for (k = a.classes.join("|"); i = c.pop();) if (k.indexOf(i) == -1) return false
            } else if (a.attributes[h] != d[h]) return false;
            for (e in g) if (a.styles[e] != g[e]) return false;
            return true
        }
        function k(a, b) {
            var c, d;
            if (typeof a == "string") c = a;
            else if (a instanceof CKEDITOR.style) d = a;
            else {
                c = a[0];
                d = a[1]
            }
            return [{
                element: c,
                left: d,
                right: function(a, c) {
                    c.transform(a, b)
                }
            }]
        }
        function t(a) {
            return function(b) {
                return w(b, a)
            }
        }
        function B(a) {
            return function(b, c) {
                c[a](b)
            }
        }
        var z = CKEDITOR.dtd,
            F = CKEDITOR.tools.copy,
            s = CKEDITOR.tools.trim,
            C = "cke-test";
        CKEDITOR.filter = function(a) {
            this.allowedContent = [];
            this.disabled = false;
            this.editor = null;
            this.enterMode = CKEDITOR.ENTER_P;
            this._ = {
                rules: {},
                transformations: {},
                cachedTests: {}
            };
            if (a instanceof CKEDITOR.editor) {
                var b = this.editor = a;
                this.customConfig = true;
                var a = b.config.allowedContent,
                    c;
                if (a === true) this.disabled = true;
                else {
                    if (!a) this.customConfig = false;
                    this.enterMode = c = b.blockless ? CKEDITOR.ENTER_BR : b.config.enterMode;
                    this.allow("br " + (c == CKEDITOR.ENTER_P ? "p" : c == CKEDITOR.ENTER_DIV ? "div" : ""), "default", 1);
                    this.allow(a, "config", 1);
                    this.allow(b.config.extraAllowedContent, "extra", 1);
                    this._.toHtmlListener = b.on("toHtml", function(a) {
                        this.applyTo(a.data.dataValue, true, a.data.dontFilter) && b.fire("dataFiltered")
                    }, this, null, 6);
                    this._.toDataFormatListener = b.on("toDataFormat", function(a) {
                        this.applyTo(a.data.dataValue, false, true)
                    }, this, null, 11)
                }
            } else {
                this.customConfig = false;
                this.allow(a, "default", 1)
            }
        };
        CKEDITOR.filter.prototype = {
            allow: function(b, c, d) {
                if (this.disabled || this.customConfig && !d || !b) return false;
                this._.cachedChecks = {};
                var g, h;
                if (typeof b == "string") b = i(b);
                else if (b instanceof
                CKEDITOR.style) {
                    h = b.getDefinition();
                    d = {};
                    b = h.attributes;
                    d[h.element] = h = {
                        styles: h.styles,
                        requiredStyles: h.styles && CKEDITOR.tools.objectKeys(h.styles)
                    };
                    if (b) {
                        b = F(b);
                        h.classes = b["class"] ? b["class"].split(/\s+/) : null;
                        h.requiredClasses = h.classes;
                        delete b["class"];
                        h.attributes = b;
                        h.requiredAttributes = b && CKEDITOR.tools.objectKeys(b)
                    }
                    b = d
                } else if (CKEDITOR.tools.isArray(b)) {
                    for (g = 0; g < b.length; ++g) h = this.allow(b[g], c, d);
                    return h
                }
                var e, d = [];
                for (e in b) {
                    h = b[e];
                    h = typeof h == "boolean" ? {} : typeof h == "function" ? {
                        match: h
                    } : F(h);
                    if (e.charAt(0) != "$") h.elements = e;
                    if (c) h.featureName = c.toLowerCase();
                    var k = h;
                    k.elements = a(k.elements, /\s+/) || null;
                    k.propertiesOnly = k.propertiesOnly || k.elements === true;
                    var f = /\s*,\s*/,
                        u = void 0;
                    for (u in r) {
                        k[u] = a(k[u], f) || null;
                        var o = k,
                            p = A[u],
                            j = a(k[A[u]], f),
                            l = k[u],
                            w = [],
                            m = true,
                            s = void 0;
                        j ? m = false : j = {};
                        for (s in l) if (s.charAt(0) == "!") {
                            s = s.slice(1);
                            w.push(s);
                            j[s] = true;
                            m = false
                        }
                        for (; s = w.pop();) {
                            l[s] = l["!" + s];
                            delete l["!" + s]
                        }
                        o[p] = (m ? false : j) || null
                    }
                    k.match = k.match || null;
                    this.allowedContent.push(h);
                    d.push(h)
                }
                c = this._.rules;
                e = c.elements || {};
                b = c.generic || [];
                h = 0;
                for (k = d.length; h < k; ++h) {
                    f = F(d[h]);
                    u = f.classes === true || f.styles === true || f.attributes === true;
                    o = f;
                    p = void 0;
                    for (p in r) o[p] = q(o[p]);
                    j = true;
                    for (p in A) {
                        p = A[p];
                        o[p] = CKEDITOR.tools.objectKeys(o[p]);
                        o[p] && (j = false)
                    }
                    o.nothingRequired = j;
                    if (f.elements === true || f.elements === null) {
                        f.elements = q(f.elements);
                        b[u ? "unshift" : "push"](f)
                    } else {
                        o = f.elements;
                        delete f.elements;
                        for (g in o) if (e[g]) e[g][u ? "unshift" : "push"](f);
                        else e[g] = [f]
                    }
                }
                c.elements = e;
                c.generic = b.length ? b : null;
                return true
            },
            applyTo: function(a, b, c) {
                var d = [],
                    h = !c && this._.rules,
                    k = this._.transformations,
                    f = e(this),
                    i = this.editor && this.editor.config.protectedSource,
                    u = false;
                a.forEach(function(a) {
                    if (a.type == CKEDITOR.NODE_ELEMENT) {
                        if (!b || !(a.name == "span" && ~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-"))) f(a, h, k, d, b) && (u = true)
                    } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                        var c;
                        a: {
                            var g = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, ""));
                            c = [];
                            var e, o, p;
                            if (i) for (o = 0; o < i.length; ++o) if ((p = g.match(i[o])) && p[0].length == g.length) {
                                c = true;
                                break a
                            }
                            g = CKEDITOR.htmlParser.fragment.fromHtml(g);
                            g.children.length == 1 && (e = g.children[0]).type == CKEDITOR.NODE_ELEMENT && f(e, h, k, c, b);
                            c = !c.length
                        }
                        c || d.push(a)
                    }
                }, null, true);
                d.length && (u = true);
                for (var o, p, a = [], c = ["p", "br", "div"][this.enterMode - 1]; o = d.pop();) o.type == CKEDITOR.NODE_ELEMENT ? g(o, c, a) : o.remove();
                for (; p = a.pop();) {
                    o = p.el;
                    if (o.parent) switch (p.check) {
                    case "it":
                        z.$removeEmpty[o.name] && !o.children.length ? g(o, c, a) : n(o) || g(o, c, a);
                        break;
                    case "el-up":
                        o.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !z[o.parent.name][o.name] && g(o, c, a);
                        break;
                    case "parent-down":
                        o.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !z[o.parent.name][o.name] && g(o.parent, c, a)
                    }
                }
                return u
            },
            checkFeature: function(a) {
                if (this.disabled || !a) return true;
                a.toFeature && (a = a.toFeature(this.editor));
                return !a.requiredContent || this.check(a.requiredContent)
            },
            disable: function() {
                this.disabled = true;
                this._.toHtmlListener && this._.toHtmlListener.removeListener();
                this._.toDataFormatListener && this._.toDataFormatListener.removeListener()
            },
            addContentForms: function(a) {
                if (!this.disabled && a) {
                    var b, c, d = [],
                        g;
                    for (b = 0; b < a.length && !g; ++b) {
                        c = a[b];
                        if ((typeof c == "string" || c instanceof CKEDITOR.style) && this.check(c)) g = c
                    }
                    if (g) {
                        for (b = 0; b < a.length; ++b) d.push(k(a[b], g));
                        this.addTransformations(d)
                    }
                }
            },
            addFeature: function(a) {
                if (this.disabled || !a) return true;
                a.toFeature && (a = a.toFeature(this.editor));
                this.allow(a.allowedContent, a.name);
                this.addTransformations(a.contentTransformations);
                this.addContentForms(a.contentForms);
                return this.customConfig && a.requiredContent ? this.check(a.requiredContent) : true
            },
            addTransformations: function(a) {
                var b, c;
                if (!this.disabled && a) {
                    var d = this._.transformations,
                        g;
                    for (g = 0; g < a.length; ++g) {
                        b = a[g];
                        var h = void 0,
                            e = void 0,
                            k = void 0,
                            f = void 0,
                            i = void 0,
                            o = void 0;
                        c = [];
                        for (e = 0; e < b.length; ++e) {
                            k = b[e];
                            if (typeof k == "string") {
                                k = k.split(/\s*:\s*/);
                                f = k[0];
                                i = null;
                                o = k[1]
                            } else {
                                f = k.check;
                                i = k.left;
                                o = k.right
                            }
                            if (!h) {
                                h = k;
                                h = h.element ? h.element : f ? f.match(/^([a-z0-9]+)/i)[0] : h.left.getDefinition().element
                            }
                            i instanceof
                            CKEDITOR.style && (i = t(i));
                            c.push({
                                check: f == h ? null : f,
                                left: i,
                                right: typeof o == "string" ? B(o) : o
                            })
                        }
                        b = h;
                        d[b] || (d[b] = []);
                        d[b].push(c)
                    }
                }
            },
            check: function(a, b, c) {
                if (this.disabled) return true;
                if (CKEDITOR.tools.isArray(a)) {
                    for (var g = a.length; g--;) if (this.check(a[g], b, c)) return true;
                    return false
                }
                var h, k;
                if (typeof a == "string") {
                    k = a + "<" + (b === false ? "0" : "1") + (c ? "1" : "0") + ">";
                    if (k in this._.cachedChecks) return this._.cachedChecks[k];
                    g = i(a).$1;
                    h = g.styles;
                    var f = g.classes;
                    g.name = g.elements;
                    g.classes = f = f ? f.split(/\s*,\s*/) : [];
                    g.styles = d(h);
                    g.attributes = d(g.attributes);
                    g.children = [];
                    f.length && (g.attributes["class"] = f.join(" "));
                    if (h) g.attributes.style = CKEDITOR.tools.writeCssText(g.styles);
                    h = g
                } else {
                    g = a.getDefinition();
                    h = g.styles;
                    f = g.attributes || {};
                    if (h) {
                        h = F(h);
                        f.style = CKEDITOR.tools.writeCssText(h, true)
                    } else h = {};
                    h = {
                        name: g.element,
                        attributes: f,
                        classes: f["class"] ? f["class"].split(/\s+/) : [],
                        styles: h,
                        children: []
                    }
                }
                var f = CKEDITOR.tools.clone(h),
                    o = [],
                    p;
                if (b !== false && (p = this._.transformations[h.name])) {
                    for (g = 0; g < p.length; ++g) u(this, h, p[g]);
                    m(h)
                }
                e(this)(f, this._.rules, b === false ? false : this._.transformations, o, false, !c, !c);
                b = o.length > 0 ? false : CKEDITOR.tools.objectCompare(h.attributes, f.attributes, true) ? true : false;
                typeof a == "string" && (this._.cachedChecks[k] = b);
                return b
            }
        };
        var r = {
            styles: 1,
            attributes: 1,
            classes: 1
        },
            A = {
                styles: "requiredStyles",
                attributes: "requiredAttributes",
                classes: "requiredClasses"
            },
            v = /^([a-z0-9*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,
            o = {
                styles: /{([^}]+)}/,
                attrs: /\[([^\]]+)\]/,
                classes: /\(([^\)]+)\)/
            },
            x = CKEDITOR.filter.transformationsTools = {
                sizeToStyle: function(a) {
                    this.lengthToStyle(a, "width");
                    this.lengthToStyle(a, "height")
                },
                sizeToAttribute: function(a) {
                    this.lengthToAttribute(a, "width");
                    this.lengthToAttribute(a, "height")
                },
                lengthToStyle: function(a, b, c) {
                    c = c || b;
                    if (!(c in a.styles)) {
                        var d = a.attributes[b];
                        if (d) {
                            /^\d+$/.test(d) && (d = d + "px");
                            a.styles[c] = d
                        }
                    }
                    delete a.attributes[b]
                },
                lengthToAttribute: function(a, b, c) {
                    c = c || b;
                    if (!(c in a.attributes)) {
                        var d = a.styles[b],
                            g = d && d.match(/^(\d+)(?:\.\d*)?px$/);
                        g ? a.attributes[c] = g[1] : d == C && (a.attributes[c] = C)
                    }
                    delete a.styles[b]
                },
                alignmentToStyle: function(a) {
                    if (!("float" in a.styles)) {
                        var b = a.attributes.align;
                        if (b == "left" || b == "right") a.styles["float"] = b
                    }
                    delete a.attributes.align
                },
                alignmentToAttribute: function(a) {
                    if (!("align" in a.attributes)) {
                        var b = a.styles["float"];
                        if (b == "left" || b == "right") a.attributes.align = b
                    }
                    delete a.styles["float"]
                },
                matchesStyle: w,
                transform: function(a, b) {
                    if (typeof b == "string") a.name = b;
                    else {
                        var c = b.getDefinition(),
                            d = c.styles,
                            g = c.attributes,
                            h, e, k, f;
                        a.name = c.element;
                        for (h in g) if (h == "class") {
                            c = a.classes.join("|");
                            for (k = g[h].split(/\s+/); f = k.pop();) c.indexOf(f) == -1 && a.classes.push(f)
                        } else a.attributes[h] = g[h];
                        for (e in d) a.styles[e] = d[e]
                    }
                }
            }
    })();
    (function() {
        CKEDITOR.focusManager = function(b) {
            if (b.focusManager) return b.focusManager;
            this.hasFocus = false;
            this.currentActive = null;
            this._ = {
                editor: b
            };
            return this
        };
        CKEDITOR.focusManager._ = {
            blurDelay: 200
        };
        CKEDITOR.focusManager.prototype = {
            focus: function() {
                this._.timer && clearTimeout(this._.timer);
                if (!this.hasFocus && !this._.locked) {
                    var b = CKEDITOR.currentInstance;
                    b && b.focusManager.blur(1);
                    this.hasFocus = true;
                    (b = this._.editor.container) && b.addClass("cke_focus");
                    this._.editor.fire("focus")
                }
            },
            lock: function() {
                this._.locked = 1
            },
            unlock: function() {
                delete this._.locked
            },
            blur: function(b) {
                function c() {
                    if (this.hasFocus) {
                        this.hasFocus = false;
                        var a = this._.editor.container;
                        a && a.removeClass("cke_focus");
                        this._.editor.fire("blur")
                    }
                }
                if (!this._.locked) {
                    this._.timer && clearTimeout(this._.timer);
                    var a = CKEDITOR.focusManager._.blurDelay;
                    b || !a ? c.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function() {
                        delete this._.timer;
                        c.call(this)
                    }, a, this)
                }
            },
            add: function(b, c) {
                var a = b.getCustomData("focusmanager");
                if (!a || a != this) {
                    a && a.remove(b);
                    var a = "focus",
                        e = "blur";
                    if (c) if (CKEDITOR.env.ie) {
                        a = "focusin";
                        e = "focusout"
                    } else CKEDITOR.event.useCapture = 1;
                    var f = {
                        blur: function() {
                            b.equals(this.currentActive) && this.blur()
                        },
                        focus: function() {
                            this.currentActive = b;
                            this.focus()
                        }
                    };
                    b.on(a, f.focus, this);
                    b.on(e, f.blur, this);
                    if (c) CKEDITOR.event.useCapture = 0;
                    b.setCustomData("focusmanager", this);
                    b.setCustomData("focusmanager_handlers", f)
                }
            },
            remove: function(b) {
                b.removeCustomData("focusmanager");
                var c = b.removeCustomData("focusmanager_handlers");
                b.removeListener("blur", c.blur);
                b.removeListener("focus", c.focus)
            }
        }
    })();
    CKEDITOR.keystrokeHandler = function(b) {
        if (b.keystrokeHandler) return b.keystrokeHandler;
        this.keystrokes = {};
        this.blockedKeystrokes = {};
        this._ = {
            editor: b
        };
        return this
    };
    (function() {
        var b, c = function(a) {
                var a = a.data,
                    c = a.getKeystroke(),
                    d = this.keystrokes[c],
                    i = this._.editor;
                b = i.fire("key", {
                    keyCode: c
                }) === false;
                if (!b) {
                    d && (b = i.execCommand(d, {
                        from: "keystrokeHandler"
                    }) !== false);
                    b || (b = !! this.blockedKeystrokes[c])
                }
                b && a.preventDefault(true);
                return !b
            },
            a = function(a) {
                if (b) {
                    b = false;
                    a.data.preventDefault(true)
                }
            };
        CKEDITOR.keystrokeHandler.prototype = {
            attach: function(b) {
                b.on("keydown", c, this);
                if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) b.on("keypress", a, this)
            }
        }
    })();
    (function() {
        CKEDITOR.lang = {
            languages: {
                af: 1,
                ar: 1,
                bg: 1,
                bn: 1,
                bs: 1,
                ca: 1,
                cs: 1,
                cy: 1,
                da: 1,
                de: 1,
                el: 1,
                "en-au": 1,
                "en-ca": 1,
                "en-gb": 1,
                en: 1,
                eo: 1,
                es: 1,
                et: 1,
                eu: 1,
                fa: 1,
                fi: 1,
                fo: 1,
                "fr-ca": 1,
                fr: 1,
                gl: 1,
                gu: 1,
                he: 1,
                hi: 1,
                hr: 1,
                hu: 1,
                is: 1,
                it: 1,
                ja: 1,
                ka: 1,
                km: 1,
                ko: 1,
                ku: 1,
                lt: 1,
                lv: 1,
                mk: 1,
                mn: 1,
                ms: 1,
                nb: 1,
                nl: 1,
                no: 1,
                pl: 1,
                "pt-br": 1,
                pt: 1,
                ro: 1,
                ru: 1,
                si: 1,
                sk: 1,
                sl: 1,
                sq: 1,
                "sr-latn": 1,
                sr: 1,
                sv: 1,
                th: 1,
                tr: 1,
                ug: 1,
                uk: 1,
                vi: 1,
                "zh-cn": 1,
                zh: 1
            },
            load: function(b, c, a) {
                if (!b || !CKEDITOR.lang.languages[b]) b = this.detect(c, b);
                this[b] ? a(b, this[b]) : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + b + ".js"), function() {
                    a(b, this[b])
                }, this)
            },
            detect: function(b, c) {
                var a = this.languages,
                    c = c || navigator.userLanguage || navigator.language || b,
                    e = c.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),
                    f = e[1],
                    e = e[2];
                a[f + "-" + e] ? f = f + "-" + e : a[f] || (f = null);
                CKEDITOR.lang.detect = f ?
                function() {
                    return f
                } : function(a) {
                    return a
                };
                return f || b
            }
        }
    })();
    CKEDITOR.scriptLoader = function() {
        var b = {},
            c = {};
        return {
            load: function(a, e, f, d) {
                var i = typeof a == "string";
                i && (a = [a]);
                f || (f = CKEDITOR);
                var l = a.length,
                    j = [],
                    m = [],
                    n = function(a) {
                        e && (i ? e.call(f, a) : e.call(f, j, m))
                    };
                if (l === 0) n(true);
                else {
                    var q = function(a, b) {
                            (b ? j : m).push(a);
                            if (--l <= 0) {
                                d && CKEDITOR.document.getDocumentElement().removeStyle("cursor");
                                n(b)
                            }
                        },
                        p = function(a, d) {
                            b[a] = 1;
                            var g = c[a];
                            delete c[a];
                            for (var h = 0; h < g.length; h++) g[h](a, d)
                        },
                        h = function(a) {
                            if (b[a]) q(a, true);
                            else {
                                var d = c[a] || (c[a] = []);
                                d.push(q);
                                if (!(d.length > 1)) {
                                    var g = new CKEDITOR.dom.element("script");
                                    g.setAttributes({
                                        type: "text/javascript",
                                        src: a
                                    });
                                    if (e) if (CKEDITOR.env.ie) g.$.onreadystatechange = function() {
                                        if (g.$.readyState == "loaded" || g.$.readyState == "complete") {
                                            g.$.onreadystatechange = null;
                                            p(a, true)
                                        }
                                    };
                                    else {
                                        g.$.onload = function() {
                                            setTimeout(function() {
                                                p(a, true)
                                            }, 0)
                                        };
                                        g.$.onerror = function() {
                                            p(a, false)
                                        }
                                    }
                                    g.appendTo(CKEDITOR.document.getHead())
                                }
                            }
                        };
                    d && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
                    for (var g = 0; g < l; g++) h(a[g])
                }
            },
            queue: function() {
                function a() {
                    var a;
                    (a = b[0]) && this.load(a.scriptUrl, a.callback, CKEDITOR, 0)
                }
                var b = [];
                return function(c, d) {
                    var i = this;
                    b.push({
                        scriptUrl: c,
                        callback: function() {
                            d && d.apply(this, arguments);
                            b.shift();
                            a.call(i)
                        }
                    });
                    b.length == 1 && a.call(this)
                }
            }()
        }
    }();
    CKEDITOR.resourceManager = function(b, c) {
        this.basePath = b;
        this.fileName = c;
        this.registered = {};
        this.loaded = {};
        this.externals = {};
        this._ = {
            waitingList: {}
        }
    };
    CKEDITOR.resourceManager.prototype = {
        add: function(b, c) {
            if (this.registered[b]) throw '[CKEDITOR.resourceManager.add] The resource name "' + b + '" is already registered.';
            var a = this.registered[b] = c || {};
            a.name = b;
            a.path = this.getPath(b);
            CKEDITOR.fire(b + CKEDITOR.tools.capitalize(this.fileName) + "Ready", a);
            return this.get(b)
        },
        get: function(b) {
            return this.registered[b] || null
        },
        getPath: function(b) {
            var c = this.externals[b];
            return CKEDITOR.getUrl(c && c.dir || this.basePath + b + "/")
        },
        getFilePath: function(b) {
            var c = this.externals[b];
            return CKEDITOR.getUrl(this.getPath(b) + (c && typeof c.file == "string" ? c.file : this.fileName + ".js"))
        },
        addExternal: function(b, c, a) {
            for (var b = b.split(","), e = 0; e < b.length; e++) this.externals[b[e]] = {
                dir: c,
                file: a
            }
        },
        load: function(b, c, a) {
            CKEDITOR.tools.isArray(b) || (b = b ? [b] : []);
            for (var e = this.loaded, f = this.registered, d = [], i = {}, l = {}, j = 0; j < b.length; j++) {
                var m = b[j];
                if (m) if (!e[m] && !f[m]) {
                    var n = this.getFilePath(m);
                    d.push(n);
                    n in i || (i[n] = []);
                    i[n].push(m)
                } else l[m] = this.get(m)
            }
            CKEDITOR.scriptLoader.load(d, function(b, d) {
                if (d.length) throw '[CKEDITOR.resourceManager.load] Resource name "' + i[d[0]].join(",") + '" was not found at "' + d[0] + '".';
                for (var h = 0; h < b.length; h++) for (var g = i[b[h]], f = 0; f < g.length; f++) {
                    var j = g[f];
                    l[j] = this.get(j);
                    e[j] = 1
                }
                c.call(a, l)
            }, this)
        }
    };
    CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin");
    CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function(b) {
        var c = {};
        return function(a, e, f) {
            var d = {},
                i = function(a) {
                    b.call(this, a, function(a) {
                        CKEDITOR.tools.extend(d, a);
                        var b = [],
                            l;
                        for (l in a) {
                            var q = a[l],
                                p = q && q.requires;
                            if (!c[l]) {
                                if (q.icons) for (var h = q.icons.split(","), g = 0; g < h.length; g++) CKEDITOR.skin.addIcon(h[g], q.path + "icons/" + h[g] + ".png");
                                c[l] = 1
                            }
                            if (p) {
                                p.split && (p = p.split(","));
                                for (q = 0; q < p.length; q++) d[p[q]] || b.push(p[q])
                            }
                        }
                        if (b.length) i.call(this, b);
                        else {
                            for (l in d) {
                                q = d[l];
                                if (q.onLoad && !q.onLoad._called) {
                                    q.onLoad() === false && delete d[l];
                                    q.onLoad._called = 1
                                }
                            }
                            e && e.call(f || window, d)
                        }
                    }, this)
                };
            i.call(this, a)
        }
    });
    CKEDITOR.plugins.setLang = function(b, c, a) {
        var e = this.get(b),
            b = e.langEntries || (e.langEntries = {}),
            e = e.lang || (e.lang = []);
        e.split && (e = e.split(","));
        CKEDITOR.tools.indexOf(e, c) == -1 && e.push(c);
        b[c] = a
    };
    CKEDITOR.ui = function(b) {
        if (b.ui) return b.ui;
        this.items = {};
        this.instances = {};
        this.editor = b;
        this._ = {
            handlers: {}
        };
        return this
    };
    CKEDITOR.ui.prototype = {
        add: function(b, c, a) {
            a.name = b.toLowerCase();
            var e = this.items[b] = {
                type: c,
                command: a.command || null,
                args: Array.prototype.slice.call(arguments, 2)
            };
            CKEDITOR.tools.extend(e, a)
        },
        get: function(b) {
            return this.instances[b]
        },
        create: function(b) {
            var c = this.items[b],
                a = c && this._.handlers[c.type],
                e = c && c.command && this.editor.getCommand(c.command),
                a = a && a.create.apply(this, c.args);
            this.instances[b] = a;
            e && e.uiItems.push(a);
            if (a && !a.type) a.type = c.type;
            return a
        },
        addHandler: function(b, c) {
            this._.handlers[b] = c
        },
        space: function(b) {
            return CKEDITOR.document.getById(this.spaceId(b))
        },
        spaceId: function(b) {
            return this.editor.id + "_" + b
        }
    };
    CKEDITOR.event.implementOn(CKEDITOR.ui);
    (function() {
        function b(b, d, h) {
            CKEDITOR.event.call(this);
            b = b && CKEDITOR.tools.clone(b);
            if (d !== void 0) {
                if (d instanceof CKEDITOR.dom.element) {
                    if (!h) throw Error("One of the element modes must be specified.");
                } else throw Error("Expect element of type CKEDITOR.dom.element.");
                if (CKEDITOR.env.ie && CKEDITOR.env.quirks && h == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks.");
                if (h == CKEDITOR.ELEMENT_MODE_INLINE && !d.is(CKEDITOR.dtd.$editable) || h == CKEDITOR.ELEMENT_MODE_REPLACE && d.is(CKEDITOR.dtd.$nonBodyContent)) throw Error('The specified element mode is not supported on element: "' + d.getName() + '".');
                this.element = d;
                this.elementMode = h;
                this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (d.getId() || d.getNameAtt())
            } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE;
            this._ = {};
            this.commands = {};
            this.templates = {};
            this.name = this.name || c();
            this.id = CKEDITOR.tools.getNextId();
            this.status = "unloaded";
            this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config);
            this.ui = new CKEDITOR.ui(this);
            this.focusManager = new CKEDITOR.focusManager(this);
            this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this);
            this.on("readOnly", a);
            this.on("selectionChange", f);
            this.on("mode", a);
            this.on("instanceReady", function() {
                this.config.startupFocus && this.focus()
            });
            CKEDITOR.fire("instanceCreated", null, this);
            CKEDITOR.add(this);
            CKEDITOR.tools.setTimeout(function() {
                i(this, b)
            }, 0, this)
        }
        function c() {
            do
            var a = "editor" + ++p;
            while (CKEDITOR.instances[a]);
            return a
        }
        function a() {
            var a = this.commands,
                b;
            for (b in a) e(this, a[b])
        }
        function e(a, b) {
            b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]()
        }
        function f(a) {
            var b = this.commands,
                c = a.editor,
                d = a.data.path,
                h;
            for (h in b) {
                a = b[h];
                a.contextSensitive && a.refresh(c, d)
            }
        }
        function d(a) {
            var b = a.config.customConfig;
            if (!b) return false;
            var b = CKEDITOR.getUrl(b),
                c = h[b] || (h[b] = {});
            if (c.fn) {
                c.fn.call(a, a.config);
                (CKEDITOR.getUrl(a.config.customConfig) == b || !d(a)) && a.fireOnce("customConfigLoaded")
            } else CKEDITOR.scriptLoader.queue(b, function() {
                c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function() {};
                d(a)
            });
            return true
        }
        function i(a, b) {
            a.on("customConfigLoaded", function() {
                if (b) {
                    if (b.on) for (var c in b.on) a.on(c, b.on[c]);
                    CKEDITOR.tools.extend(a.config, b, true);
                    delete a.config.on
                }
                a.readOnly = !(!a.config.readOnly && !(a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && a.element.getAttribute("disabled")));
                a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !CKEDITOR.dtd[a.element.getName()].p;
                a.tabIndex = a.config.tabIndex || a.element && a.element.getAttribute("tabindex") || 0;
                if (a.config.skin) CKEDITOR.skinName = a.config.skin;
                a.fireOnce("configLoaded");
                a.dataProcessor = new CKEDITOR.htmlDataProcessor(a);
                a.filter = new CKEDITOR.filter(a);
                l(a)
            });
            if (b && b.customConfig != void 0) a.config.customConfig = b.customConfig;
            d(a) || a.fireOnce("customConfigLoaded")
        }
        function l(a) {
            CKEDITOR.skin.loadPart("editor", function() {
                j(a)
            })
        }
        function j(a) {
            CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function(b, c) {
                a.langCode = b;
                a.lang = CKEDITOR.tools.prototypedCopy(c);
                if (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 && a.lang.dir == "rtl") a.lang.dir = "ltr";
                if (!a.config.contentsLangDirection) a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir;
                a.fire("langLoaded");
                m(a)
            })
        }
        function m(a) {
            a.getStylesSet(function(b) {
                a.once("loaded", function() {
                    a.fire("stylesSet", {
                        styles: b
                    })
                }, null, null, 1);
                n(a)
            })
        }
        function n(a) {
            var b = a.config,
                c = b.plugins,
                d = b.extraPlugins,
                h = b.removePlugins;
            if (d) var e = RegExp("(?:^|,)(?:" + d.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"),
                c = c.replace(e, ""),
                c = c + ("," + d);
            if (h) var f = RegExp("(?:^|,)(?:" + h.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"),
                c = c.replace(f, "");
            CKEDITOR.env.air && (c = c + ",adobeair");
            CKEDITOR.plugins.load(c.split(","), function(c) {
                var d = [],
                    h = [],
                    e = [];
                a.plugins = c;
                for (var k in c) {
                    var i = c[k],
                        o = i.lang,
                        p = null,
                        j = i.requires,
                        q;
                    CKEDITOR.tools.isArray(j) && (j = j.join(","));
                    if (j && (q = j.match(f))) for (; j = q.pop();) CKEDITOR.tools.setTimeout(function(a, b) {
                        throw Error('Plugin "' + a.replace(",", "") + '" cannot be removed from the plugins list, because it\'s required by "' + b + '" plugin.');
                    }, 0, null, [j, k]);
                    if (o && !a.lang[k]) {
                        o.split && (o = o.split(","));
                        if (CKEDITOR.tools.indexOf(o, a.langCode) >= 0) p = a.langCode;
                        else {
                            p = a.langCode.replace(/-.*/, "");
                            p = p != a.langCode && CKEDITOR.tools.indexOf(o, p) >= 0 ? p : CKEDITOR.tools.indexOf(o, "en") >= 0 ? "en" : o[0]
                        }
                        if (!i.langEntries || !i.langEntries[p]) e.push(CKEDITOR.getUrl(i.path + "lang/" + p + ".js"));
                        else {
                            a.lang[k] = i.langEntries[p];
                            p = null
                        }
                    }
                    h.push(p);
                    d.push(i)
                }
                CKEDITOR.scriptLoader.load(e, function() {
                    for (var c = ["beforeInit", "init", "afterInit"], e = 0; e < c.length; e++) for (var f = 0; f < d.length; f++) {
                        var k = d[f];
                        e === 0 && (h[f] && k.lang && k.langEntries) && (a.lang[k.name] = k.langEntries[h[f]]);
                        if (k[c[e]]) k[c[e]](a)
                    }
                    a.fireOnce("pluginsLoaded");
                    b.keystrokes && a.setKeystroke(a.config.keystrokes);
                    for (f = 0; f < a.config.blockedKeystrokes.length; f++) a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[f]] = 1;
                    a.status = "loaded";
                    a.fireOnce("loaded");
                    CKEDITOR.fire("instanceLoaded", null, a)
                })
            })
        }
        function q() {
            var a = this.element;
            if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
                var b = this.getData();
                this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b));
                a.is("textarea") ? a.setValue(b) : a.setHtml(b);
                return true
            }
            return false
        }
        b.prototype = CKEDITOR.editor.prototype;
        CKEDITOR.editor = b;
        var p = 0,
            h = {};
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            addCommand: function(a, b) {
                b.name = a.toLowerCase();
                var c = new CKEDITOR.command(this, b);
                this.mode && e(this, c);
                return this.commands[a] = c
            },
            destroy: function(a) {
                this.fire("beforeDestroy");
                !a && q.call(this);
                this.editable(null);
                this.status = "destroyed";
                this.fire("destroy");
                this.removeAllListeners();
                CKEDITOR.remove(this);
                CKEDITOR.fire("instanceDestroyed", null, this)
            },
            elementPath: function(a) {
                return (a = a || this.getSelection().getStartElement()) ? new CKEDITOR.dom.elementPath(a, this.editable()) : null
            },
            createRange: function() {
                var a = this.editable();
                return a ? new CKEDITOR.dom.range(a) : null
            },
            execCommand: function(a, b) {
                var c = this.getCommand(a),
                    d = {
                        name: a,
                        commandData: b,
                        command: c
                    };
                if (c && c.state != CKEDITOR.TRISTATE_DISABLED && this.fire("beforeCommandExec", d) !== true) {
                    d.returnValue = c.exec(d.commandData);
                    if (!c.async && this.fire("afterCommandExec", d) !== true) return d.returnValue
                }
                return false
            },
            getCommand: function(a) {
                return this.commands[a]
            },
            getData: function(a) {
                !a && this.fire("beforeGetData");
                var b = this._.data;
                if (typeof b != "string") b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : "";
                b = {
                    dataValue: b
                };
                !a && this.fire("getData", b);
                return b.dataValue
            },
            getSnapshot: function() {
                var a = this.fire("getSnapshot");
                if (typeof a != "string") {
                    var b = this.element;
                    b && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (a = b.is("textarea") ? b.getValue() : b.getHtml())
                }
                return a
            },
            loadSnapshot: function(a) {
                this.fire("loadSnapshot", a)
            },
            setData: function(a, b, c) {
                if (b) this.on("dataReady", function(a) {
                    a.removeListener();
                    b.call(a.editor)
                });
                a = {
                    dataValue: a
                };
                !c && this.fire("setData", a);
                this._.data = a.dataValue;
                !c && this.fire("afterSetData", a)
            },
            setReadOnly: function(a) {
                a = a == void 0 || a;
                if (this.readOnly != a) {
                    this.readOnly = a;
                    this.keystrokeHandler.blockedKeystrokes[8] = +a;
                    this.editable().setReadOnly(a);
                    this.fire("readOnly")
                }
            },
            insertHtml: function(a, b) {
                this.fire("insertHtml", {
                    dataValue: a,
                    mode: b
                })
            },
            insertText: function(a) {
                this.fire("insertText", a)
            },
            insertElement: function(a) {
                this.fire("insertElement", a)
            },
            focus: function() {
                this.fire("beforeFocus")
            },
            checkDirty: function() {
                return this.status == "ready" && this._.previousValue !== this.getSnapshot()
            },
            resetDirty: function() {
                this._.previousValue = this.getSnapshot()
            },
            updateElement: function() {
                return q.call(this)
            },
            setKeystroke: function() {
                for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [
                    [].slice.call(arguments, 0)], c, d, h = b.length; h--;) {
                    c = b[h];
                    d = 0;
                    if (CKEDITOR.tools.isArray(c)) {
                        d = c[1];
                        c = c[0]
                    }
                    d ? a[c] = d : delete a[c]
                }
            },
            addFeature: function(a) {
                return this.filter.addFeature(a)
            }
        })
    })();
    CKEDITOR.ELEMENT_MODE_NONE = 0;
    CKEDITOR.ELEMENT_MODE_REPLACE = 1;
    CKEDITOR.ELEMENT_MODE_APPENDTO = 2;
    CKEDITOR.ELEMENT_MODE_INLINE = 3;
    CKEDITOR.htmlParser = function() {
        this._ = {
            htmlPartsRegex: RegExp("<(?:(?:\\/([^>]+)>)|(?:!--([\\S|\\s]*?)--\>)|(?:([^\\s>]+)\\s*((?:(?:\"[^\"]*\")|(?:'[^']*')|[^\"'>])*)\\/?>))", "g")
        }
    };
    (function() {
        var b = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
            c = {
                checked: 1,
                compact: 1,
                declare: 1,
                defer: 1,
                disabled: 1,
                ismap: 1,
                multiple: 1,
                nohref: 1,
                noresize: 1,
                noshade: 1,
                nowrap: 1,
                readonly: 1,
                selected: 1
            };
        CKEDITOR.htmlParser.prototype = {
            onTagOpen: function() {},
            onTagClose: function() {},
            onText: function() {},
            onCDATA: function() {},
            onComment: function() {},
            parse: function(a) {
                for (var e, f, d = 0, i; e = this._.htmlPartsRegex.exec(a);) {
                    f = e.index;
                    if (f > d) {
                        d = a.substring(d, f);
                        if (i) i.push(d);
                        else this.onText(d)
                    }
                    d = this._.htmlPartsRegex.lastIndex;
                    if (f = e[1]) {
                        f = f.toLowerCase();
                        if (i && CKEDITOR.dtd.$cdata[f]) {
                            this.onCDATA(i.join(""));
                            i = null
                        }
                        if (!i) {
                            this.onTagClose(f);
                            continue
                        }
                    }
                    if (i) i.push(e[0]);
                    else if (f = e[3]) {
                        f = f.toLowerCase();
                        if (!/="/.test(f)) {
                            var l = {},
                                j;
                            e = e[4];
                            var m = !! (e && e.charAt(e.length - 1) == "/");
                            if (e) for (; j = b.exec(e);) {
                                var n = j[1].toLowerCase();
                                j = j[2] || j[3] || j[4] || "";
                                l[n] = !j && c[n] ? n : j
                            }
                            this.onTagOpen(f, l, m);
                            !i && CKEDITOR.dtd.$cdata[f] && (i = [])
                        }
                    } else if (f = e[2]) this.onComment(f)
                }
                if (a.length > d) this.onText(a.substring(d, a.length))
            }
        }
    })();
    CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
        $: function() {
            this._ = {
                output: []
            }
        },
        proto: {
            openTag: function(b) {
                this._.output.push("<", b)
            },
            openTagClose: function(b, c) {
                c ? this._.output.push(" />") : this._.output.push(">")
            },
            attribute: function(b, c) {
                typeof c == "string" && (c = CKEDITOR.tools.htmlEncodeAttr(c));
                this._.output.push(" ", b, '="', c, '"')
            },
            closeTag: function(b) {
                this._.output.push("</", b, ">")
            },
            text: function(b) {
                this._.output.push(b)
            },
            comment: function(b) {
                this._.output.push("<\!--", b, "--\>")
            },
            write: function(b) {
                this._.output.push(b)
            },
            reset: function() {
                this._.output = [];
                this._.indent = false
            },
            getHtml: function(b) {
                var c = this._.output.join("");
                b && this.reset();
                return c
            }
        }
    });
    "use strict";
    (function() {
        CKEDITOR.htmlParser.node = function() {};
        CKEDITOR.htmlParser.node.prototype = {
            remove: function() {
                var b = this.parent.children,
                    c = CKEDITOR.tools.indexOf(b, this),
                    a = this.previous,
                    e = this.next;
                a && (a.next = e);
                e && (e.previous = a);
                b.splice(c, 1);
                this.parent = null
            },
            replaceWith: function(b) {
                var c = this.parent.children,
                    a = CKEDITOR.tools.indexOf(c, this),
                    e = b.previous = this.previous,
                    f = b.next = this.next;
                e && (e.next = b);
                f && (f.previous = b);
                c[a] = b;
                b.parent = this.parent;
                this.parent = null
            },
            insertAfter: function(b) {
                var c = b.parent.children,
                    a = CKEDITOR.tools.indexOf(c, b),
                    e = b.next;
                c.splice(a + 1, 0, this);
                this.next = b.next;
                this.previous = b;
                b.next = this;
                e && (e.previous = this);
                this.parent = b.parent
            },
            insertBefore: function(b) {
                var c = b.parent.children,
                    a = CKEDITOR.tools.indexOf(c, b);
                c.splice(a, 0, this);
                this.next = b;
                (this.previous = b.previous) && (b.previous.next = this);
                b.previous = this;
                this.parent = b.parent
            }
        }
    })();
    "use strict";
    CKEDITOR.htmlParser.comment = function(b) {
        this.value = b;
        this._ = {
            isBlockLike: false
        }
    };
    CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
        type: CKEDITOR.NODE_COMMENT,
        filter: function(b) {
            var c = this.value;
            if (!(c = b.onComment(c, this))) {
                this.remove();
                return false
            }
            if (typeof c != "string") {
                this.replaceWith(c);
                return false
            }
            this.value = c;
            return true
        },
        writeHtml: function(b, c) {
            c && this.filter(c);
            b.comment(this.value)
        }
    });
    "use strict";
    (function() {
        CKEDITOR.htmlParser.text = function(b) {
            this.value = b;
            this._ = {
                isBlockLike: false
            }
        };
        CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_TEXT,
            filter: function(b) {
                if (!(this.value = b.onText(this.value, this))) {
                    this.remove();
                    return false
                }
            },
            writeHtml: function(b, c) {
                c && this.filter(c);
                b.text(this.value)
            }
        })
    })();
    "use strict";
    (function() {
        CKEDITOR.htmlParser.cdata = function(b) {
            this.value = b
        };
        CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_TEXT,
            filter: function() {},
            writeHtml: function(b) {
                b.write(this.value)
            }
        })
    })();
    "use strict";
    CKEDITOR.htmlParser.fragment = function() {
        this.children = [];
        this.parent = null;
        this._ = {
            isBlockLike: true,
            hasInlineStarted: false
        }
    };
    (function() {
        function b(a) {
            return a.name == "a" && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name]
        }
        var c = CKEDITOR.tools.extend({
            table: 1,
            ul: 1,
            ol: 1,
            dl: 1
        }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl),
            a = {
                ol: 1,
                ul: 1
            },
            e = CKEDITOR.tools.extend({}, {
                html: 1
            }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {
                style: 1,
                script: 1
            });
        CKEDITOR.htmlParser.fragment.fromHtml = function(f, d, i) {
            function l(a) {
                var b;
                if (u.length > 0) for (var c = 0; c < u.length; c++) {
                    var d = u[c],
                        h = d.name,
                        g = CKEDITOR.dtd[h],
                        e = k.name && CKEDITOR.dtd[k.name];
                    if ((!e || e[h]) && (!a || !g || g[a] || !CKEDITOR.dtd[a])) {
                        if (!b) {
                            j();
                            b = 1
                        }
                        d = d.clone();
                        d.parent = k;
                        k = d;
                        u.splice(c, 1);
                        c--
                    } else if (h == k.name) {
                        n(k, k.parent, 1);
                        c--
                    }
                }
            }
            function j() {
                for (; w.length;) n(w.shift(), k)
            }
            function m(a) {
                if (a._.isBlockLike && a.name != "pre" && a.name != "textarea") {
                    var b = a.children.length,
                        c = a.children[b - 1],
                        d;
                    if (c && c.type == CKEDITOR.NODE_TEXT)(d = CKEDITOR.tools.rtrim(c.value)) ? c.value = d : a.children.length = b - 1
                }
            }
            function n(a, c, d) {
                var c = c || k || g,
                    e = k;
                if (a.previous === void 0) {
                    if (q(c, a)) {
                        k = c;
                        h.onTagOpen(i, {});
                        a.returnPoint = c = k
                    }
                    m(a);
                    (!b(a) || a.children.length) && c.add(a);
                    a.name == "pre" && (B = false);
                    a.name == "textarea" && (t = false)
                }
                if (a.returnPoint) {
                    k = a.returnPoint;
                    delete a.returnPoint
                } else k = d ? c : e
            }
            function q(a, b) {
                if ((a == g || a.name == "body") && i && (!a.name || CKEDITOR.dtd[a.name][i])) {
                    var c, d;
                    return (c = b.attributes && (d = b.attributes["data-cke-real-element-type"]) ? d : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
                }
            }
            function p(a, b) {
                return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || a == "dt" && b == "dd" || a == "dd" && b == "dt" : false
            }
            var h = new CKEDITOR.htmlParser,
                g = d instanceof CKEDITOR.htmlParser.element ? d : typeof d == "string" ? new CKEDITOR.htmlParser.element(d) : new CKEDITOR.htmlParser.fragment,
                u = [],
                w = [],
                k = g,
                t = g.name == "textarea",
                B = g.name == "pre";
            h.onTagOpen = function(d, g, f, i) {
                g = new CKEDITOR.htmlParser.element(d, g);
                if (g.isUnknown && f) g.isEmpty = true;
                g.isOptionalClose = i;
                if (b(g)) u.push(g);
                else {
                    if (d == "pre") B = true;
                    else {
                        if (d == "br" && B) {
                            k.add(new CKEDITOR.htmlParser.text("\n"));
                            return
                        }
                        d == "textarea" && (t = true)
                    }
                    if (d == "br") w.push(g);
                    else {
                        for (;;) {
                            i = (f = k.name) ? CKEDITOR.dtd[f] || (k._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : e;
                            if (!g.isUnknown && !k.isUnknown && !i[d]) if (k.isOptionalClose) h.onTagClose(f);
                            else if (d in a && f in a) {
                                f = k.children;
                                (f = f[f.length - 1]) && f.name == "li" || n(f = new CKEDITOR.htmlParser.element("li"), k);
                                !g.returnPoint && (g.returnPoint = k);
                                k = f
                            } else if (d in CKEDITOR.dtd.$listItem && !p(d, f)) h.onTagOpen(d == "li" ? "ul" : "dl", {}, 0, 1);
                            else if (f in c && !p(d, f)) {
                                !g.returnPoint && (g.returnPoint = k);
                                k = k.parent
                            } else {
                                f in CKEDITOR.dtd.$inline && u.unshift(k);
                                if (k.parent) n(k, k.parent, 1);
                                else {
                                    g.isOrphan = 1;
                                    break
                                }
                            } else break
                        }
                        l(d);
                        j();
                        g.parent = k;
                        g.isEmpty ? n(g) : k = g
                    }
                }
            };
            h.onTagClose = function(a) {
                for (var b = u.length - 1; b >= 0; b--) if (a == u[b].name) {
                    u.splice(b, 1);
                    return
                }
                for (var c = [], d = [], h = k; h != g && h.name != a;) {
                    h._.isBlockLike || d.unshift(h);
                    c.push(h);
                    h = h.returnPoint || h.parent
                }
                if (h != g) {
                    for (b = 0; b < c.length; b++) {
                        var e = c[b];
                        n(e, e.parent)
                    }
                    k = h;
                    h._.isBlockLike && j();
                    n(h, h.parent);
                    if (h == k) k = k.parent;
                    u = u.concat(d)
                }
                a == "body" && (i = false)
            };
            h.onText = function(b) {
                if ((!k._.hasInlineStarted || w.length) && !B && !t) {
                    b = CKEDITOR.tools.ltrim(b);
                    if (b.length === 0) return
                }
                var d = k.name,
                    g = d ? CKEDITOR.dtd[d] || (k._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : e;
                if (!t && !g["#"] && d in c) {
                    h.onTagOpen(d in a ? "li" : d == "dl" ? "dd" : d == "table" ? "tr" : d == "tr" ? "td" : "");
                    h.onText(b)
                } else {
                    j();
                    l();
                    !B && !t && (b = b.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " "));
                    b = new CKEDITOR.htmlParser.text(b);
                    if (q(k, b)) this.onTagOpen(i, {}, 0, 1);
                    k.add(b)
                }
            };
            h.onCDATA = function(a) {
                k.add(new CKEDITOR.htmlParser.cdata(a))
            };
            h.onComment = function(a) {
                j();
                l();
                k.add(new CKEDITOR.htmlParser.comment(a))
            };
            h.parse(f);
            for (j(!CKEDITOR.env.ie && 1); k != g;) n(k, k.parent, 1);
            m(g);
            return g
        };
        CKEDITOR.htmlParser.fragment.prototype = {
            type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
            add: function(a, b) {
                isNaN(b) && (b = this.children.length);
                var c = b > 0 ? this.children[b - 1] : null;
                if (c) {
                    if (a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT) {
                        c.value = CKEDITOR.tools.rtrim(c.value);
                        if (c.value.length === 0) {
                            this.children.pop();
                            this.add(a);
                            return
                        }
                    }
                    c.next = a
                }
                a.previous = c;
                a.parent = this;
                this.children.splice(b, 0, a);
                if (!this._.hasInlineStarted) this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike
            },
            filter: function(a) {
                a.onRoot(this);
                this.filterChildren(a)
            },
            filterChildren: function(a, b) {
                if (this.childrenFilteredBy != a.id) {
                    if (b && !this.parent) a.onRoot(this);
                    this.childrenFilteredBy = a.id;
                    for (var c = 0; c < this.children.length; c++) this.children[c].filter(a) === false && c--
                }
            },
            writeHtml: function(a, b) {
                b && this.filter(b);
                this.writeChildrenHtml(a)
            },
            writeChildrenHtml: function(a, b, c) {
                if (c && !this.parent && b) b.onRoot(this);
                b && this.filterChildren(b);
                for (var b = 0, c = this.children, e = c.length; b < e; b++) c[b].writeHtml(a)
            },
            forEach: function(a, b, c) {
                !c && (!b || this.type == b) && a(this);
                for (var c = this.children, e, j = 0, m = c.length; j < m; j++) {
                    e = c[j];
                    e.type == CKEDITOR.NODE_ELEMENT ? e.forEach(a, b) : (!b || e.type == b) && a(e)
                }
            }
        }
    })();
    (function() {
        function b(a, b) {
            for (var c = 0; a && c < b.length; c++) var e = b[c],
                a = a.replace(e[0], e[1]);
            return a
        }
        function c(a, b, c) {
            typeof b == "function" && (b = [b]);
            var e, f;
            f = a.length;
            var n = b && b.length;
            if (n) {
                for (e = 0; e < f && a[e].pri <= c; e++);
                for (f = n - 1; f >= 0; f--) if (n = b[f]) {
                    n.pri = c;
                    a.splice(e, 0, n)
                }
            }
        }
        function a(a, b, c) {
            if (b) for (var f in b) {
                var m = a[f];
                a[f] = e(m, b[f], c);
                m || a.$length++
            }
        }
        function e(a, b, e) {
            if (b) {
                b.pri = e;
                if (a) {
                    if (a.splice) c(a, b, e);
                    else {
                        a = a.pri > e ? [b, a] : [a, b];
                        a.filter = f
                    }
                    return a
                }
                return b.filter = b
            }
        }
        function f(a) {
            for (var b = a.type || a instanceof CKEDITOR.htmlParser.fragment, c = 0; c < this.length; c++) {
                if (b) var e = a.type,
                    f = a.name;
                var n = this[c].apply(window, arguments);
                if (n === false) return n;
                if (b) {
                    if (n && (n.name != f || n.type != e)) return n
                } else if (typeof n != "string") return n;
                n != void 0 && (a = n)
            }
            return a
        }
        CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
            $: function(a) {
                this.id = CKEDITOR.tools.getNextNumber();
                this._ = {
                    elementNames: [],
                    attributeNames: [],
                    elements: {
                        $length: 0
                    },
                    attributes: {
                        $length: 0
                    }
                };
                a && this.addRules(a, 10)
            },
            proto: {
                addRules: function(b, f) {
                    typeof f != "number" && (f = 10);
                    c(this._.elementNames, b.elementNames, f);
                    c(this._.attributeNames, b.attributeNames, f);
                    a(this._.elements, b.elements, f);
                    a(this._.attributes, b.attributes, f);
                    this._.text = e(this._.text, b.text, f) || this._.text;
                    this._.comment = e(this._.comment, b.comment, f) || this._.comment;
                    this._.root = e(this._.root, b.root, f) || this._.root
                },
                applyTo: function(a) {
                    a.filter(this)
                },
                onElementName: function(a) {
                    return b(a, this._.elementNames)
                },
                onAttributeName: function(a) {
                    return b(a, this._.attributeNames)
                },
                onText: function(a) {
                    var b = this._.text;
                    return b ? b.filter(a) : a
                },
                onComment: function(a, b) {
                    var c = this._.comment;
                    return c ? c.filter(a, b) : a
                },
                onRoot: function(a) {
                    var b = this._.root;
                    return b ? b.filter(a) : a
                },
                onElement: function(a) {
                    for (var b = [this._.elements["^"], this._.elements[a.name], this._.elements.$], c, e = 0; e < 3; e++) if (c = b[e]) {
                        c = c.filter(a, this);
                        if (c === false) return null;
                        if (c && c != a) return this.onNode(c);
                        if (a.parent && !a.name) break
                    }
                    return a
                },
                onNode: function(a) {
                    var b = a.type;
                    return b == CKEDITOR.NODE_ELEMENT ? this.onElement(a) : b == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a.value)) : b == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a.value)) : null
                },
                onAttribute: function(a, b, c) {
                    if (b = this._.attributes[b]) {
                        a = b.filter(c, a, this);
                        if (a === false) return false;
                        if (typeof a != "undefined") return a
                    }
                    return c
                }
            }
        })
    })();
    (function() {
        function b(b, c) {
            function h(a) {
                return a || CKEDITOR.env.ie ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", {
                    "data-cke-bogus": 1
                })
            }
            function g(b, c) {
                return function(g) {
                    if (g.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var f = [],
                            o = a(g),
                            i, q;
                        if (o) for (k(o, 1) && f.push(o); o;) {
                            if (d(o) && (i = e(o)) && k(i)) if ((q = e(i)) && !d(q)) f.push(i);
                            else {
                                var u = i,
                                    l = h(p),
                                    y = u.parent.children,
                                    m = CKEDITOR.tools.indexOf(y, u);
                                y.splice(m + 1, 0, l);
                                y = u.next;
                                u.next = l;
                                l.previous = u;
                                l.parent = u.parent;
                                l.next = y;
                                j(i)
                            }
                            o = o.previous
                        }
                        for (o = 0; o < f.length; o++) j(f[o]);
                        if (f = CKEDITOR.env.opera && !b || (typeof c == "function" ? c(g) !== false : c)) if (!p && CKEDITOR.env.ie && g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) f = false;
                        else if (!p && CKEDITOR.env.ie && (document.documentMode > 7 || g.name in CKEDITOR.dtd.tr || g.name in CKEDITOR.dtd.$listItem)) f = false;
                        else {
                            f = a(g);
                            f = !f || g.name == "form" && f.name == "input"
                        }
                        f && g.add(h(b))
                    }
                }
            }
            function k(a, b) {
                if ((!p || !CKEDITOR.env.ie) && a.type == CKEDITOR.NODE_ELEMENT && a.name == "br" && !a.attributes["data-cke-eol"]) return true;
                var c;
                if (a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(B))) {
                    if (c.index) {
                        i(a, new CKEDITOR.htmlParser.text(a.value.substring(0, c.index)));
                        a.value = c[0]
                    }
                    if (CKEDITOR.env.ie && p && (!b || a.parent.name in q)) return true;
                    if (!p) if ((c = a.previous) && c.name == "br" || !c || d(c)) return true
                }
                return false
            }
            var o = {
                elements: {}
            },
                p = c == "html",
                q = CKEDITOR.tools.extend({}, C),
                u;
            for (u in q)"#" in F[u] || delete q[u];
            for (u in q) o.elements[u] = g(p, b.config.fillEmptyBlocks !== false);
            o.root = g(p);
            o.elements.br = function(a) {
                return function(b) {
                    if (b.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var c = b.attributes;
                        if ("data-cke-bogus" in c || "data-cke-eol" in c) delete c["data-cke-bogus"];
                        else {
                            for (c = b.next; c && f(c);) c = c.next;
                            var g = e(b);
                            !c && d(b.parent) ? l(b.parent, h(a)) : d(c) && (g && !d(g)) && i(c, h(a))
                        }
                    }
                }
            }(p);
            return o
        }
        function c(a) {
            return a.enterMode != CKEDITOR.ENTER_BR && a.autoParagraph !== false ? a.enterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : false
        }
        function a(a) {
            for (a = a.children[a.children.length - 1]; a && f(a);) a = a.previous;
            return a
        }
        function e(a) {
            for (a = a.previous; a && f(a);) a = a.previous;
            return a
        }
        function f(a) {
            return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"]
        }
        function d(a) {
            return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in C || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
        }
        function i(a, b) {
            var c = a.parent.children,
                d = CKEDITOR.tools.indexOf(c, a);
            c.splice(d, 0, b);
            c = a.previous;
            a.previous = b;
            b.next = a;
            b.parent = a.parent;
            if (c) {
                b.previous = c;
                c.next = b
            }
        }
        function l(a, b) {
            var c = a.children[a.children.length - 1];
            a.children.push(b);
            b.parent = a;
            if (c) {
                c.next = b;
                b.previous = c
            }
        }
        function j(a) {
            var b = a.parent.children,
                c = CKEDITOR.tools.indexOf(b, a),
                d = a.previous,
                a = a.next;
            d && (d.next = a);
            a && (a.previous = d);
            b.splice(c, 1)
        }
        function m(a) {
            var b = a.parent;
            return b ? CKEDITOR.tools.indexOf(b.children, a) : -1
        }
        function n(a) {
            a = a.attributes;
            a.contenteditable != "false" && (a["data-cke-editable"] = a.contenteditable ? "true" : 1);
            a.contenteditable = "false"
        }
        function q(a) {
            a = a.attributes;
            switch (a["data-cke-editable"]) {
            case "true":
                a.contenteditable = "true";
                break;
            case "1":
                delete a.contenteditable
            }
        }
        function p(a) {
            return a.replace(o, function(a, b, c) {
                return "<" + b + c.replace(x, function(a, b) {
                    if (!/^on/.test(b) && c.indexOf("data-cke-saved-" + b) == -1) {
                        a = a.slice(1);
                        return " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a
                    }
                    return a
                }) + ">"
            })
        }
        function h(a, b) {
            return a.replace(b, function(a, b, c) {
                a.indexOf("<textarea") === 0 && (a = b + w(c).replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</textarea>");
                return "<cke:encoded>" + encodeURIComponent(a) + "</cke:encoded>"
            })
        }
        function g(a) {
            return a.replace(D, function(a, b) {
                return decodeURIComponent(b)
            })
        }
        function u(a) {
            return a.replace(/<\!--(?!{cke_protected})[\s\S]+?--\>/g, function(a) {
                return "<\!--" + z + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\>"
            })
        }
        function w(a) {
            return a.replace(/<\!--\{cke_protected\}\{C\}([\s\S]+?)--\>/g, function(a, b) {
                return decodeURIComponent(b)
            })
        }
        function k(a, b) {
            var c = b._.dataStore;
            return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function(a, b) {
                return decodeURIComponent(b)
            }).replace(/\{cke_protected_(\d+)\}/g, function(a, b) {
                return c && c[b] || ""
            })
        }
        function t(a, b) {
            for (var c = [], d = b.config.protectedSource, h = b._.dataStore || (b._.dataStore = {
                id: 1
            }), g = /<\!--\{cke_temp(comment)?\}(\d*?)--\>/g, d = [/<script[\s\S]*?<\/script>/gi, /<noscript[\s\S]*?<\/noscript>/gi].concat(d), a = a.replace(/<\!--[\s\S]*?--\>/g, function(a) {
                return "<\!--{cke_tempcomment}" + (c.push(a) - 1) + "--\>"
            }), e = 0; e < d.length; e++) a = a.replace(d[e], function(a) {
                a = a.replace(g, function(a, b, d) {
                    return c[d]
                });
                return /cke_temp(comment)?/.test(a) ? a : "<\!--{cke_temp}" + (c.push(a) - 1) + "--\>"
            });
            a = a.replace(g, function(a, b, d) {
                return "<\!--" + z + (b ? "{C}" : "") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "--\>"
            });
            return a.replace(/(['"]).*?\1/g, function(a) {
                return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function(a, b) {
                    h[h.id] = decodeURIComponent(b);
                    return "{cke_protected_" + h.id+++"}"
                })
            })
        }
        CKEDITOR.htmlDataProcessor = function(a) {
            var d, e, f = this;
            this.editor = a;
            this.dataFilter = d = new CKEDITOR.htmlParser.filter;
            this.htmlFilter = e = new CKEDITOR.htmlParser.filter;
            this.writer = new CKEDITOR.htmlParser.basicWriter;
            d.addRules(r);
            d.addRules(b(a, "data"));
            e.addRules(A);
            e.addRules(b(a, "html"));
            a.on("toHtml", function(b) {
                var b = b.data,
                    d = b.dataValue,
                    d = t(d, a),
                    d = h(d, G),
                    d = p(d),
                    d = h(d, I),
                    d = d.replace(Q, "$1cke:$2"),
                    d = d.replace(E, "<cke:$1$2></cke:$1>"),
                    d = CKEDITOR.env.opera ? d : d.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"),
                    e = b.context || a.editable().getName(),
                    f;
                if (CKEDITOR.env.ie && CKEDITOR.env.version < 9 && e == "pre") {
                    e = "div";
                    d = "<pre>" + d + "</pre>";
                    f = 1
                }
                e = a.document.createElement(e);
                e.setHtml("a" + d);
                d = e.getHtml().substr(1);
                d = d.replace(RegExp(" data-cke-" + CKEDITOR.rnd + "-", "ig"), " ");
                f && (d = d.replace(/^<pre>|<\/pre>$/gi, ""));
                d = d.replace(L, "$1$2");
                d = g(d);
                d = w(d);
                b.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(d, b.context, b.fixForBody === false ? false : c(a.config))
            }, null, null, 5);
            a.on("toHtml", function(a) {
                a.data.dataValue.filterChildren(f.dataFilter, true)
            }, null, null, 10);
            a.on("toHtml", function(a) {
                var a = a.data,
                    b = a.dataValue,
                    c = new CKEDITOR.htmlParser.basicWriter;
                b.writeChildrenHtml(c);
                b = c.getHtml(true);
                a.dataValue = u(b)
            }, null, null, 15);
            a.on("toDataFormat", function(b) {
                b.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(b.data.dataValue, a.editable().getName(), c(a.config))
            }, null, null, 5);
            a.on("toDataFormat", function(a) {
                a.data.dataValue.filterChildren(f.htmlFilter, true)
            }, null, null, 10);
            a.on("toDataFormat", function(b) {
                var c = b.data.dataValue,
                    d = f.writer;
                d.reset();
                c.writeChildrenHtml(d);
                c = d.getHtml(true);
                c = w(c);
                c = k(c, a);
                b.data.dataValue = c
            }, null, null, 15)
        };
        CKEDITOR.htmlDataProcessor.prototype = {
            toHtml: function(a, b, c, d) {
                var h = this.editor;
                !b && b !== null && (b = h.editable().getName());
                return h.fire("toHtml", {
                    dataValue: a,
                    context: b,
                    fixForBody: c,
                    dontFilter: !! d
                }).dataValue
            },
            toDataFormat: function(a) {
                return this.editor.fire("toDataFormat", {
                    dataValue: a
                }).dataValue
            }
        };
        var B = /(?:&nbsp;|\xa0)$/,
            z = "{cke_protected}",
            F = CKEDITOR.dtd,
            s = ["caption", "colgroup", "col", "thead", "tfoot", "tbody"],
            C = CKEDITOR.tools.extend({}, F.$blockLimit, F.$block),
            r = {
                elements: {},
                attributeNames: [
                    [/^on/, "data-cke-pa-on"]
                ]
            },
            A = {
                elementNames: [
                    [/^cke:/, ""],
                    [/^\?xml:namespace$/, ""]
                ],
                attributeNames: [
                    [/^data-cke-(saved|pa)-/, ""],
                    [/^data-cke-.*/, ""],
                    ["hidefocus", ""]
                ],
                elements: {
                    $: function(a) {
                        var b = a.attributes;
                        if (b) {
                            if (b["data-cke-temp"]) return false;
                            for (var c = ["name", "href", "src"], d, h = 0; h < c.length; h++) {
                                d = "data-cke-saved-" + c[h];
                                d in b && delete b[c[h]]
                            }
                        }
                        return a
                    },
                    table: function(a) {
                        a.children.slice(0).sort(function(a, b) {
                            var c, d;
                            if (a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type) {
                                c = CKEDITOR.tools.indexOf(s, a.name);
                                d = CKEDITOR.tools.indexOf(s, b.name)
                            }
                            if (!(c > -1 && d > -1 && c != d)) {
                                c = m(a);
                                d = m(b)
                            }
                            return c > d ? 1 : -1
                        })
                    },
                    embed: function(a) {
                        var b = a.parent;
                        if (b && b.name == "object") {
                            var c = b.attributes.width,
                                b = b.attributes.height;
                            c && (a.attributes.width = c);
                            b && (a.attributes.height = b)
                        }
                    },
                    param: function(a) {
                        a.children = [];
                        a.isEmpty = true;
                        return a
                    },
                    a: function(a) {
                        if (!a.children.length && !a.attributes.name && !a.attributes["data-cke-saved-name"]) return false
                    },
                    span: function(a) {
                        a.attributes["class"] == "Apple-style-span" && delete a.name
                    },
                    html: function(a) {
                        delete a.attributes.contenteditable;
                        delete a.attributes["class"]
                    },
                    body: function(a) {
                        delete a.attributes.spellcheck;
                        delete a.attributes.contenteditable
                    },
                    style: function(a) {
                        var b = a.children[0];
                        b && b.value && (b.value = CKEDITOR.tools.trim(b.value));
                        if (!a.attributes.type) a.attributes.type = "text/css"
                    },
                    title: function(a) {
                        var b = a.children[0];
                        !b && l(a, b = new CKEDITOR.htmlParser.text);
                        b.value = a.attributes["data-cke-title"] || ""
                    }
                },
                attributes: {
                    "class": function(a) {
                        return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || false
                    }
                }
            };
        if (CKEDITOR.env.ie) A.attributes.style = function(a) {
            return a.replace(/(^|;)([^\:]+)/g, function(a) {
                return a.toLowerCase()
            })
        };
        for (var v in {
            input: 1,
            textarea: 1
        }) {
            r.elements[v] = n;
            A.elements[v] = q
        }
        var o = /<(a|area|img|input|source)\b([^>]*)>/gi,
            x = /\s(on\w+|href|src|name)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,
            I = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
            G = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi,
            D = /<cke:encoded>([^<]*)<\/cke:encoded>/gi,
            Q = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,
            L = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,
            E = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
    })();
    "use strict";
    CKEDITOR.htmlParser.element = function(b, c) {
        this.name = b;
        this.attributes = c || {};
        this.children = [];
        var a = b || "",
            e = a.match(/^cke:(.*)/);
        e && (a = e[1]);
        a = !(!CKEDITOR.dtd.$nonBodyContent[a] && !CKEDITOR.dtd.$block[a] && !CKEDITOR.dtd.$listItem[a] && !CKEDITOR.dtd.$tableContent[a] && !(CKEDITOR.dtd.$nonEditable[a] || a == "br"));
        this.isEmpty = !! CKEDITOR.dtd.$empty[b];
        this.isUnknown = !CKEDITOR.dtd[b];
        this._ = {
            isBlockLike: a,
            hasInlineStarted: this.isEmpty || !a
        }
    };
    CKEDITOR.htmlParser.cssStyle = function(b) {
        var c = {};
        ((b instanceof CKEDITOR.htmlParser.element ? b.attributes.style : b) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(a, b, f) {
            b == "font-family" && (f = f.replace(/["']/g, ""));
            c[b.toLowerCase()] = f
        });
        return {
            rules: c,
            populate: function(a) {
                var b = this.toString();
                if (b) a instanceof CKEDITOR.dom.element ? a.setAttribute("style", b) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = b : a.style = b
            },
            toString: function() {
                var a = [],
                    b;
                for (b in c) c[b] && a.push(b, ":", c[b], ";");
                return a.join("")
            }
        }
    };
    (function() {
        var b = function(a, b) {
                a = a[0];
                b = b[0];
                return a < b ? -1 : a > b ? 1 : 0
            },
            c = CKEDITOR.htmlParser.fragment.prototype;
        CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_ELEMENT,
            add: c.add,
            clone: function() {
                return new CKEDITOR.htmlParser.element(this.name, this.attributes)
            },
            filter: function(a) {
                var b = this,
                    c, d;
                if (!b.parent) a.onRoot(b);
                for (;;) {
                    c = b.name;
                    if (!(d = a.onElementName(c))) {
                        this.remove();
                        return false
                    }
                    b.name = d;
                    if (!(b = a.onElement(b))) {
                        this.remove();
                        return false
                    }
                    if (b !== this) {
                        this.replaceWith(b);
                        return false
                    }
                    if (b.name == c) break;
                    if (b.type != CKEDITOR.NODE_ELEMENT) {
                        this.replaceWith(b);
                        return false
                    }
                    if (!b.name) {
                        this.replaceWithChildren();
                        return false
                    }
                }
                c = b.attributes;
                var i, l;
                for (i in c) {
                    l = i;
                    for (d = c[i];;) if (l = a.onAttributeName(i)) if (l != i) {
                        delete c[i];
                        i = l
                    } else break;
                    else {
                        delete c[i];
                        break
                    }
                    l && ((d = a.onAttribute(b, l, d)) === false ? delete c[l] : c[l] = d)
                }
                b.isEmpty || this.filterChildren(a);
                return true
            },
            filterChildren: c.filterChildren,
            writeHtml: function(a, c) {
                c && this.filter(c);
                var f = this.name,
                    d = [],
                    i = this.attributes,
                    l, j;
                a.openTag(f, i);
                for (l in i) d.push([l, i[l]]);
                a.sortAttributes && d.sort(b);
                l = 0;
                for (j = d.length; l < j; l++) {
                    i = d[l];
                    a.attribute(i[0], i[1])
                }
                a.openTagClose(f, this.isEmpty);
                this.writeChildrenHtml(a);
                this.isEmpty || a.closeTag(f)
            },
            writeChildrenHtml: c.writeChildrenHtml,
            replaceWithChildren: function() {
                for (var a = this.children, b = a.length; b;) a[--b].insertAfter(this);
                this.remove()
            },
            forEach: c.forEach
        })
    })();
    (function() {
        var b = {};
        CKEDITOR.template = function(c) {
            if (b[c]) this.output = b[c];
            else {
                var a = c.replace(/'/g, "\\'").replace(/{([^}]+)}/g, function(a, b) {
                    return "',data['" + b + "']==undefined?'{" + b + "}':data['" + b + "'],'"
                });
                this.output = b[c] = Function("data", "buffer", "return buffer?buffer.push('" + a + "'):['" + a + "'].join('');")
            }
        }
    })();
    delete CKEDITOR.loadFullCore;
    CKEDITOR.instances = {};
    CKEDITOR.document = new CKEDITOR.dom.document(document);
    CKEDITOR.add = function(b) {
        CKEDITOR.instances[b.name] = b;
        b.on("focus", function() {
            if (CKEDITOR.currentInstance != b) {
                CKEDITOR.currentInstance = b;
                CKEDITOR.fire("currentInstance")
            }
        });
        b.on("blur", function() {
            if (CKEDITOR.currentInstance == b) {
                CKEDITOR.currentInstance = null;
                CKEDITOR.fire("currentInstance")
            }
        });
        CKEDITOR.fire("instance", null, b)
    };
    CKEDITOR.remove = function(b) {
        delete CKEDITOR.instances[b.name]
    };
    (function() {
        var b = {};
        CKEDITOR.addTemplate = function(c, a) {
            var e = b[c];
            if (e) return e;
            e = {
                name: c,
                source: a
            };
            CKEDITOR.fire("template", e);
            return b[c] = new CKEDITOR.template(e.source)
        };
        CKEDITOR.getTemplate = function(c) {
            return b[c]
        }
    })();
    (function() {
        var b = [];
        CKEDITOR.addCss = function(c) {
            b.push(c)
        };
        CKEDITOR.getCss = function() {
            return b.join("\n")
        }
    })();
    CKEDITOR.on("instanceDestroyed", function() {
        CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset")
    });
    CKEDITOR.TRISTATE_ON = 1;
    CKEDITOR.TRISTATE_OFF = 2;
    CKEDITOR.TRISTATE_DISABLED = 0;
    (function() {
        CKEDITOR.inline = function(b, c) {
            if (!CKEDITOR.env.isCompatible) return null;
            b = CKEDITOR.dom.element.get(b);
            if (b.getEditor()) throw 'The editor instance "' + b.getEditor().name + '" is already attached to the provided element.';
            var a = new CKEDITOR.editor(c, b, CKEDITOR.ELEMENT_MODE_INLINE);
            a.setData(b.getHtml(), null, true);
            a.on("loaded", function() {
                a.fire("uiReady");
                a.editable(b);
                a.container = b;
                a.setData(a.getData(1));
                a.resetDirty();
                a.fire("contentDom");
                a.mode = "wysiwyg";
                a.fire("mode");
                a.status = "ready";
                a.fireOnce("instanceReady");
                CKEDITOR.fire("instanceReady", null, a)
            }, null, null, 1E4);
            a.on("destroy", function() {
                a.element.clearCustomData();
                delete a.element
            });
            return a
        };
        CKEDITOR.inlineAll = function() {
            var b, c, a;
            for (a in CKEDITOR.dtd.$editable) for (var e = CKEDITOR.document.getElementsByTag(a), f = 0, d = e.count(); f < d; f++) {
                b = e.getItem(f);
                if (b.getAttribute("contenteditable") == "true") {
                    c = {
                        element: b,
                        config: {}
                    };
                    CKEDITOR.fire("inline", c) !== false && CKEDITOR.inline(b, c.config)
                }
            }
        };
        CKEDITOR.domReady(function() {
            !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll()
        })
    })();
    CKEDITOR.replaceClass = "ckeditor";
    (function() {
        function b(b, f, l, j) {
            if (!CKEDITOR.env.isCompatible) return null;
            b = CKEDITOR.dom.element.get(b);
            if (b.getEditor()) throw 'The editor instance "' + b.getEditor().name + '" is already attached to the provided element.';
            var m = new CKEDITOR.editor(f, b, j);
            j == CKEDITOR.ELEMENT_MODE_REPLACE && b.setStyle("visibility", "hidden");
            l && m.setData(l, null, true);
            m.on("loaded", function() {
                a(m);
                j == CKEDITOR.ELEMENT_MODE_REPLACE && m.config.autoUpdateElement && e(m);
                m.setMode(m.config.startupMode, function() {
                    m.resetDirty();
                    m.status = "ready";
                    m.fireOnce("instanceReady");
                    CKEDITOR.fire("instanceReady", null, m)
                })
            });
            m.on("destroy", c);
            return m
        }
        function c() {
            var a = this.container,
                b = this.element;
            if (a) {
                a.clearCustomData();
                a.remove()
            }
            if (b) {
                b.clearCustomData();
                this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && b.show();
                delete this.element
            }
        }
        function a(a) {
            var b = a.name,
                c = a.element,
                e = a.elementMode,
                m = a.fire("uiSpace", {
                    space: "top",
                    html: ""
                }).html,
                n = a.fire("uiSpace", {
                    space: "bottom",
                    html: ""
                }).html;
            f || (f = CKEDITOR.addTemplate("maincontainer", '<{outerEl} id="cke_{name}" class="{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir="{langDir}" lang="{langCode}" role="application" aria-labelledby="cke_{name}_arialbl"><span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span><{outerEl} class="cke_inner cke_reset" role="presentation">{topHtml}<{outerEl} id="{contentId}" class="cke_contents cke_reset" role="presentation"></{outerEl}>{bottomHtml}</{outerEl}></{outerEl}>'));
            b = CKEDITOR.dom.element.createFromHtml(f.output({
                id: a.id,
                name: b,
                langDir: a.lang.dir,
                langCode: a.langCode,
                voiceLabel: [a.lang.editor, a.name].join(", "),
                topHtml: m ? '<span id="' + a.ui.spaceId("top") + '" class="cke_top cke_reset_all" role="presentation" style="height:auto">' + m + "</span>" : "",
                contentId: a.ui.spaceId("contents"),
                bottomHtml: n ? '<span id="' + a.ui.spaceId("bottom") + '" class="cke_bottom cke_reset_all" role="presentation">' + n + "</span>" : "",
                outerEl: CKEDITOR.env.ie ? "span" : "div"
            }));
            if (e == CKEDITOR.ELEMENT_MODE_REPLACE) {
                c.hide();
                b.insertAfter(c)
            } else c.append(b);
            a.container = b;
            m && a.ui.space("top").unselectable();
            n && a.ui.space("bottom").unselectable();
            c = a.config.width;
            e = a.config.height;
            c && b.setStyle("width", CKEDITOR.tools.cssLength(c));
            e && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(e));
            b.disableContextMenu();
            CKEDITOR.env.webkit && b.on("focus", function() {
                a.focus()
            });
            a.fireOnce("uiReady")
        }
        function e(a) {
            var b = a.element;
            if (a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && b.is("textarea")) {
                var c = b.$.form && new CKEDITOR.dom.element(b.$.form);
                if (c) {
                    var e = function() {
                            a.updateElement()
                        };
                    c.on("submit", e);
                    if (!c.$.submit.nodeName && !c.$.submit.length) c.$.submit = CKEDITOR.tools.override(c.$.submit, function(b) {
                        return function() {
                            a.updateElement();
                            b.apply ? b.apply(this, arguments) : b()
                        }
                    });
                    a.on("destroy", function() {
                        c.removeListener("submit", e)
                    })
                }
            }
        }
        CKEDITOR.replace = function(a, c) {
            return b(a, c, null, CKEDITOR.ELEMENT_MODE_REPLACE)
        };
        CKEDITOR.appendTo = function(a, c, e) {
            return b(a, c, e, CKEDITOR.ELEMENT_MODE_APPENDTO)
        };
        CKEDITOR.replaceAll = function() {
            for (var a = document.getElementsByTagName("textarea"), b = 0; b < a.length; b++) {
                var c = null,
                    e = a[b];
                if (e.name || e.id) {
                    if (typeof arguments[0] == "string") {
                        if (!RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)").test(e.className)) continue
                    } else if (typeof arguments[0] == "function") {
                        c = {};
                        if (arguments[0](e, c) === false) continue
                    }
                    this.replace(e, c)
                }
            }
        };
        CKEDITOR.editor.prototype.addMode = function(a, b) {
            (this._.modes || (this._.modes = {}))[a] = b
        };
        CKEDITOR.editor.prototype.setMode = function(a, b) {
            var c = this,
                e = this._.modes;
            if (!(a == c.mode || !e || !e[a])) {
                c.fire("beforeSetMode", a);
                if (c.mode) {
                    var f = c.checkDirty();
                    c._.previousMode = c.mode;
                    c.fire("beforeModeUnload");
                    c.editable(0);
                    c.ui.space("contents").setHtml("");
                    c.mode = ""
                }
                this._.modes[a](function() {
                    c.mode = a;
                    f !== void 0 && !f && c.resetDirty();
                    setTimeout(function() {
                        c.fire("mode");
                        b && b.call(c)
                    }, 0)
                })
            }
        };
        CKEDITOR.editor.prototype.resize = function(a, b, c, e) {
            var f = this.container,
                n = this.ui.space("contents"),
                q = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement,
                e = e ? f.getChild(1) : f;
            e.setSize("width", a, true);
            q && (q.style.width = "1%");
            n.setStyle("height", Math.max(b - (c ? 0 : (e.$.offsetHeight || 0) - (n.$.clientHeight || 0)), 0) + "px");
            q && (q.style.width = "100%");
            this.fire("resize")
        };
        CKEDITOR.editor.prototype.getResizable = function(a) {
            return a ? this.ui.space("contents") : this.container
        };
        var f;
        CKEDITOR.domReady(function() {
            CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass)
        })
    })();
    CKEDITOR.config.startupMode = "wysiwyg";
    (function() {
        function b(b) {
            var c = b.editor,
                d = c.editable(),
                g = b.data.path,
                e = g.blockLimit,
                f = b.data.selection.getRanges()[0],
                k = c.config.enterMode;
            if (CKEDITOR.env.gecko) {
                var i = g.block || g.blockLimit || g.root,
                    j = i && i.getLast(a);
                i && (i.isBlockBoundary() && (!j || !(j.type == CKEDITOR.NODE_ELEMENT && j.isBlockBoundary())) && !i.is("pre") && !i.getBogus()) && i.appendBogus()
            }
            if (c.config.autoParagraph !== false && k != CKEDITOR.ENTER_BR && f.collapsed && d.equals(e) && !g.block) {
                d = f.clone();
                d.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                g = new CKEDITOR.dom.walker(d);
                g.guard = function(b) {
                    return !a(b) || b.type == CKEDITOR.NODE_COMMENT || b.isReadOnly()
                };
                if (!g.checkForward() || d.checkStartOfBlock() && d.checkEndOfBlock()) {
                    c = f.fixBlock(true, c.config.enterMode == CKEDITOR.ENTER_DIV ? "div" : "p");
                    if (CKEDITOR.env.ie)(c = c.getFirst(a)) && (c.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(c.getText()).match(/^(?:&nbsp;|\xa0)$/)) && c.remove();
                    f.select();
                    b.cancel()
                }
            }
        }
        function c(a) {
            var b = a.data.getTarget();
            if (b.is("input")) {
                b = b.getAttribute("type");
                (b == "submit" || b == "reset") && a.data.preventDefault()
            }
        }
        function a(a) {
            return j(a) && m(a)
        }
        function e(a, b) {
            return function(c) {
                var d = CKEDITOR.dom.element.get(c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget);
                (!d || !b.equals(d) && !b.contains(d)) && a.call(this, c)
            }
        }
        function f(b) {
            var c, d = b.getRanges()[0],
                b = b.root,
                g = d.startPath(),
                e = {
                    table: 1,
                    ul: 1,
                    ol: 1,
                    dl: 1
                },
                f = CKEDITOR.dom.walker.bogus();
            if (g.contains(e)) {
                var k = d.clone();
                k.collapse(1);
                k.setStartAt(b, CKEDITOR.POSITION_AFTER_START);
                k = new CKEDITOR.dom.walker(k);
                g = function(b, d) {
                    return function(b, h) {
                        h && (b.type == CKEDITOR.NODE_ELEMENT && b.is(e)) && (c = b);
                        if (a(b) && !h && (!d || !f(b))) return false
                    }
                };
                k.guard = g(k);
                k.checkBackward();
                if (c) {
                    k = d.clone();
                    k.collapse();
                    k.setEndAt(b, CKEDITOR.POSITION_BEFORE_END);
                    k = new CKEDITOR.dom.walker(k);
                    k.guard = g(k, 1);
                    c = 0;
                    k.checkForward();
                    return c
                }
            }
            return null
        }
        function d(a) {
            a.editor.focus();
            a.editor.fire("saveSnapshot")
        }
        function i(a, b) {
            var c = a.editor;
            !b && c.getSelection().scrollIntoView();
            setTimeout(function() {
                c.fire("saveSnapshot")
            }, 0)
        }
        CKEDITOR.editable = CKEDITOR.tools.createClass({
            base: CKEDITOR.dom.element,
            $: function(a, b) {
                this.base(b.$ || b);
                this.editor = a;
                this.hasFocus = false;
                this.setup()
            },
            proto: {
                focus: function() {
                    this.$[CKEDITOR.env.ie && this.getDocument().equals(CKEDITOR.document) ? "setActive" : "focus"]();
                    CKEDITOR.env.safari && !this.isInline() && (CKEDITOR.document.getActive().equals(this.getWindow().getFrame()) || this.getWindow().focus())
                },
                on: function(a, b) {
                    var c = Array.prototype.slice.call(arguments, 0);
                    if (CKEDITOR.env.ie && /^focus|blur$/.exec(a)) {
                        a = a == "focus" ? "focusin" : "focusout";
                        b = e(b, this);
                        c[0] = a;
                        c[1] = b
                    }
                    return CKEDITOR.dom.element.prototype.on.apply(this, c)
                },
                attachListener: function(a, b, c, d, e, f) {
                    !this._.listeners && (this._.listeners = []);
                    var k = Array.prototype.slice.call(arguments, 1);
                    this._.listeners.push(a.on.apply(a, k))
                },
                clearListeners: function() {
                    var a = this._.listeners;
                    try {
                        for (; a.length;) a.pop().removeListener()
                    } catch (b) {}
                },
                restoreAttrs: function() {
                    var a = this._.attrChanges,
                        b, c;
                    for (c in a) if (a.hasOwnProperty(c)) {
                        b = a[c];
                        b !== null ? this.setAttribute(c, b) : this.removeAttribute(c)
                    }
                },
                attachClass: function(a) {
                    var b = this.getCustomData("classes");
                    if (!this.hasClass(a)) {
                        !b && (b = []);
                        b.push(a);
                        this.setCustomData("classes", b);
                        this.addClass(a)
                    }
                },
                changeAttr: function(a, b) {
                    var c = this.getAttribute(a);
                    if (b !== c) {
                        !this._.attrChanges && (this._.attrChanges = {});
                        a in this._.attrChanges || (this._.attrChanges[a] = c);
                        this.setAttribute(a, b)
                    }
                },
                insertHtml: function(a, b) {
                    d(this);
                    n(this, b || "html", a)
                },
                insertText: function(a) {
                    d(this);
                    var b = this.editor,
                        c = b.getSelection().getStartElement().hasAscendant("pre", true) ? CKEDITOR.ENTER_BR : b.config.enterMode,
                        b = c == CKEDITOR.ENTER_BR,
                        g = CKEDITOR.tools,
                        a = g.htmlEncode(a.replace(/\r\n/g, "\n")),
                        a = a.replace(/\t/g, "&nbsp;&nbsp; &nbsp;"),
                        c = c == CKEDITOR.ENTER_P ? "p" : "div";
                    if (!b) {
                        var e = /\n{2}/g;
                        if (e.test(a)) var f = "<" + c + ">",
                            k = "</" + c + ">",
                            a = f + a.replace(e, function() {
                                return k + f
                            }) + k
                    }
                    a = a.replace(/\n/g, "<br>");
                    b || (a = a.replace(RegExp("<br>(?=</" + c + ">)"), function(a) {
                        return g.repeat(a, 2)
                    }));
                    a = a.replace(/^ | $/g, "&nbsp;");
                    a = a.replace(/(>|\s) /g, function(a, b) {
                        return b + "&nbsp;"
                    }).replace(/ (?=<)/g, "&nbsp;");
                    n(this, "text", a)
                },
                insertElement: function(b) {
                    d(this);
                    for (var c = this.editor, h = c.config.enterMode, g = c.getSelection(), e = g.getRanges(), f = b.getName(), k = CKEDITOR.dtd.$block[f], j, m, n, l = e.length - 1; l >= 0; l--) {
                        j = e[l];
                        if (!j.checkReadOnly()) {
                            j.deleteContents(1);
                            m = !l && b || b.clone(1);
                            var s, C;
                            if (k) for (;
                            (s = j.getCommonAncestor(0, 1)) && (C = CKEDITOR.dtd[s.getName()]) && (!C || !C[f]);) if (s.getName() in CKEDITOR.dtd.span) j.splitElement(s);
                            else if (j.checkStartOfBlock() && j.checkEndOfBlock()) {
                                j.setStartBefore(s);
                                j.collapse(true);
                                s.remove()
                            } else j.splitBlock(h == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable());
                            j.insertNode(m);
                            n || (n = m)
                        }
                    }
                    if (n) {
                        j.moveToPosition(n, CKEDITOR.POSITION_AFTER_END);
                        if (k) if ((b = n.getNext(a)) && b.type == CKEDITOR.NODE_ELEMENT && b.is(CKEDITOR.dtd.$block)) b.getDtd()["#"] ? j.moveToElementEditStart(b) : j.moveToElementEditEnd(n);
                        else if (!b && h != CKEDITOR.ENTER_BR) {
                            b = j.fixBlock(true, h == CKEDITOR.ENTER_DIV ? "div" : "p");
                            j.moveToElementEditStart(b)
                        }
                    }
                    g.selectRanges([j]);
                    i(this, CKEDITOR.env.opera)
                },
                setData: function(a, b) {
                    !b && this.editor.dataProcessor && (a = this.editor.dataProcessor.toHtml(a));
                    this.setHtml(a);
                    this.editor.fire("dataReady")
                },
                getData: function(a) {
                    var b = this.getHtml();
                    !a && this.editor.dataProcessor && (b = this.editor.dataProcessor.toDataFormat(b));
                    return b
                },
                setReadOnly: function(a) {
                    this.setAttribute("contenteditable", !a)
                },
                detach: function() {
                    this.removeClass("cke_editable");
                    var a = this.editor;
                    this._.detach();
                    delete a.document;
                    delete a.window
                },
                isInline: function() {
                    return this.getDocument().equals(CKEDITOR.document)
                },
                setup: function() {
                    var a = this.editor;
                    this.attachListener(a, "beforeGetData", function() {
                        var b = this.getData();
                        this.is("textarea") || a.config.ignoreEmptyParagraph !== false && (b = b.replace(l, function(a, b) {
                            return b
                        }));
                        a.setData(b, null, 1)
                    }, this);
                    this.attachListener(a, "getSnapshot", function(a) {
                        a.data = this.getData(1)
                    }, this);
                    this.attachListener(a, "afterSetData", function() {
                        this.setData(a.getData(1))
                    }, this);
                    this.attachListener(a, "loadSnapshot", function(a) {
                        this.setData(a.data, 1)
                    }, this);
                    this.attachListener(a, "beforeFocus", function() {
                        var b = a.getSelection();
                        (b = b && b.getNative()) && b.type == "Control" || this.focus()
                    }, this);
                    this.attachListener(a, "insertHtml", function(a) {
                        this.insertHtml(a.data.dataValue, a.data.mode)
                    }, this);
                    this.attachListener(a, "insertElement", function(a) {
                        this.insertElement(a.data)
                    }, this);
                    this.attachListener(a, "insertText", function(a) {
                        this.insertText(a.data)
                    }, this);
                    this.setReadOnly(a.readOnly);
                    this.attachClass("cke_editable");
                    this.attachClass(a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "cke_editable_inline" : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE || a.elementMode == CKEDITOR.ELEMENT_MODE_APPENDTO ? "cke_editable_themed" : "");
                    this.attachClass("cke_contents_" + a.config.contentsLangDirection);
                    a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly;
                    a.keystrokeHandler.attach(this);
                    this.on("blur", function(a) {
                        CKEDITOR.env.opera && CKEDITOR.document.getActive().equals(this.isInline() ? this : this.getWindow().getFrame()) ? a.cancel() : this.hasFocus = false
                    }, null, null, -1);
                    this.on("focus", function() {
                        this.hasFocus = true
                    }, null, null, -1);
                    a.focusManager.add(this);
                    if (this.equals(CKEDITOR.document.getActive())) {
                        this.hasFocus = true;
                        a.once("contentDom", function() {
                            a.focusManager.focus()
                        })
                    }
                    this.isInline() && this.changeAttr("tabindex", a.tabIndex);
                    if (!this.is("textarea")) {
                        a.document = this.getDocument();
                        a.window = this.getWindow();
                        var b = a.document;
                        this.changeAttr("spellcheck", !a.config.disableNativeSpellChecker);
                        var d = a.config.contentsLangDirection;
                        this.getDirection(1) != d && this.changeAttr("dir", d);
                        var g = CKEDITOR.getCss();
                        if (g) {
                            d = b.getHead();
                            if (!d.getCustomData("stylesheet")) {
                                g = b.appendStyleText(g);
                                g = new CKEDITOR.dom.element(g.ownerNode || g.owningElement);
                                d.setCustomData("stylesheet", g);
                                g.data("cke-temp", 1)
                            }
                        }
                        d = b.getCustomData("stylesheet_ref") || 0;
                        b.setCustomData("stylesheet_ref", d + 1);
                        this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling);
                        this.attachListener(this, "click", function(a) {
                            var a = a.data,
                                b = a.getTarget();
                            b.is("a") && (a.$.button != 2 && b.isReadOnly()) && a.preventDefault()
                        });
                        this.attachListener(a, "key", function(b) {
                            if (a.readOnly) return true;
                            var c = b.data.keyCode,
                                d;
                            if (c in {
                                8: 1,
                                46: 1
                            }) {
                                var h = a.getSelection(),
                                    b = h.getRanges()[0],
                                    g = b.startPath(),
                                    e, i, p, c = c == 8;
                                if (h = f(h)) {
                                    a.fire("saveSnapshot");
                                    b.moveToPosition(h, CKEDITOR.POSITION_BEFORE_START);
                                    h.remove();
                                    b.select();
                                    a.fire("saveSnapshot");
                                    d = 1
                                } else if (b.collapsed) if ((e = g.block) && b[c ? "checkStartOfBlock" : "checkEndOfBlock"]() && (p = e[c ? "getPrevious" : "getNext"](j)) && p.is("table")) {
                                    a.fire("saveSnapshot");
                                    b[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && e.remove();
                                    b["moveToElementEdit" + (c ? "End" : "Start")](p);
                                    b.select();
                                    a.fire("saveSnapshot");
                                    d = 1
                                } else if (g.blockLimit && g.blockLimit.is("td") && (i = g.blockLimit.getAscendant("table")) && b.checkBoundaryOfElement(i, c ? CKEDITOR.START : CKEDITOR.END) && (p = i[c ? "getPrevious" : "getNext"](j))) {
                                    a.fire("saveSnapshot");
                                    b["moveToElementEdit" + (c ? "End" : "Start")](p);
                                    b.checkStartOfBlock() && b.checkEndOfBlock() ? p.remove() : b.select();
                                    a.fire("saveSnapshot");
                                    d = 1
                                } else if ((i = g.contains(["td", "th", "caption"])) && b.checkBoundaryOfElement(i, c ? CKEDITOR.START : CKEDITOR.END)) d = 1
                            }
                            return !d
                        });
                        CKEDITOR.env.ie && this.attachListener(this, "click", c);
                        !CKEDITOR.env.ie && !CKEDITOR.env.opera && this.attachListener(this, "mousedown", function(b) {
                            var c = b.data.getTarget();
                            if (c.is("img", "hr", "input", "textarea", "select")) {
                                a.getSelection().selectElement(c);
                                c.is("input", "textarea", "select") && b.data.preventDefault()
                            }
                        });
                        CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function(b) {
                            if (b.data.$.button == 2) {
                                b = b.data.getTarget();
                                if (!b.getOuterHtml().replace(l, "")) {
                                    var c = a.createRange();
                                    c.moveToElementEditStart(b);
                                    c.select(true)
                                }
                            }
                        });
                        if (CKEDITOR.env.webkit) {
                            this.attachListener(this, "click", function(a) {
                                a.data.getTarget().is("input", "select") && a.data.preventDefault()
                            });
                            this.attachListener(this, "mouseup", function(a) {
                                a.data.getTarget().is("input", "textarea") && a.data.preventDefault()
                            })
                        }
                    }
                }
            },
            _: {
                detach: function() {
                    this.editor.setData(this.editor.getData(), 0, 1);
                    this.clearListeners();
                    this.restoreAttrs();
                    var a;
                    if (a = this.removeCustomData("classes")) for (; a.length;) this.removeClass(a.pop());
                    a = this.getDocument();
                    var b = a.getHead();
                    if (b.getCustomData("stylesheet")) {
                        var c = a.getCustomData("stylesheet_ref");
                        if (--c) a.setCustomData("stylesheet_ref", c);
                        else {
                            a.removeCustomData("stylesheet_ref");
                            b.removeCustomData("stylesheet").remove()
                        }
                    }
                    delete this.editor
                }
            }
        });
        CKEDITOR.editor.prototype.editable = function(a) {
            var b = this._.editable;
            if (b && a) return 0;
            if (arguments.length) b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null);
            return b
        };
        var l = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi,
            j = CKEDITOR.dom.walker.whitespaces(true),
            m = CKEDITOR.dom.walker.bookmark(false, true);
        CKEDITOR.on("instanceLoaded", function(a) {
            var c = a.editor;
            c.on("insertElement", function(a) {
                a = a.data;
                if (a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea"))) {
                    a.getAttribute("contentEditable") != "false" && a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" : "1");
                    a.setAttribute("contentEditable", false)
                }
            });
            c.on("selectionChange", function(a) {
                if (!c.readOnly) {
                    var d = c.getSelection();
                    if (d && !d.isLocked) {
                        d = c.checkDirty();
                        c.fire("lockSnapshot");
                        b(a);
                        c.fire("unlockSnapshot");
                        !d && c.resetDirty()
                    }
                }
            })
        });
        CKEDITOR.on("instanceCreated", function(a) {
            var b = a.editor;
            b.on("mode", function() {
                var a = b.editable();
                if (a && a.isInline()) {
                    var c = this.lang.editor + ", " + this.name;
                    a.changeAttr("role", "textbox");
                    a.changeAttr("aria-label", c);
                    a.changeAttr("title", c);
                    if (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents")) {
                        var d = CKEDITOR.tools.getNextId(),
                            e = CKEDITOR.dom.element.createFromHtml('<span id="' + d + '" class="cke_voice_label">' + this.lang.common.editorHelp + "</span>");
                        c.append(e);
                        a.changeAttr("aria-describedby", d)
                    }
                }
            })
        });
        CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
        var n = function() {
                function b(a) {
                    return a.type == CKEDITOR.NODE_ELEMENT
                }
                function c(a, d) {
                    var h, g, e, f, o = [],
                        i = d.range.startContainer;
                    h = d.range.startPath();
                    for (var i = k[i.getName()], j = 0, n = a.getChildren(), m = n.count(), l = -1, u = -1, t = 0, w = h.contains(k.$list); j < m; ++j) {
                        h = n.getItem(j);
                        if (b(h)) {
                            e = h.getName();
                            if (w && e in CKEDITOR.dtd.$list) o = o.concat(c(h, d));
                            else {
                                f = !! i[e];
                                if (e == "br" && h.data("cke-eol") && (!j || j == m - 1)) {
                                    t = (g = j ? o[j - 1].node : n.getItem(j + 1)) && (!b(g) || !g.is("br"));
                                    g = g && b(g) && k.$block[g.getName()]
                                }
                                l == -1 && !f && (l = j);
                                f || (u = j);
                                o.push({
                                    isElement: 1,
                                    isLineBreak: t,
                                    isBlock: h.isBlockBoundary(),
                                    hasBlockSibling: g,
                                    node: h,
                                    name: e,
                                    allowed: f
                                });
                                g = t = 0
                            }
                        } else o.push({
                            isElement: 0,
                            node: h,
                            allowed: 1
                        })
                    }
                    if (l > -1) o[l].firstNotAllowed = 1;
                    if (u > -1) o[u].lastNotAllowed = 1;
                    return o
                }
                function d(a, c) {
                    var g = [],
                        e = a.getChildren(),
                        f = e.count(),
                        i, o = 0,
                        j = k[c],
                        p = !a.is(k.$inline) || a.is("br");
                    for (p && g.push(" "); o < f; o++) {
                        i = e.getItem(o);
                        b(i) && !i.is(j) ? g = g.concat(d(i, c)) : g.push(i)
                    }
                    p && g.push(" ");
                    return g
                }
                function g(a) {
                    return a && b(a) && (a.is(k.$removeEmpty) || a.is("a") && !a.isBlockBoundary())
                }
                function e(a, c, d, h) {
                    var g = a.clone(),
                        f, k;
                    g.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
                    if ((f = (new CKEDITOR.dom.walker(g)).next()) && b(f) && j[f.getName()] && (k = f.getPrevious()) && b(k) && !k.getParent().equals(a.startContainer) && d.contains(k) && h.contains(f) && f.isIdentical(k)) {
                        f.moveChildren(k);
                        f.remove();
                        e(a, c, d, h)
                    }
                }
                function f(a, c) {
                    function d(a, c) {
                        if (c.isBlock && c.isElement && !c.node.is("br") && b(a) && a.is("br")) {
                            a.remove();
                            return 1
                        }
                    }
                    var h = c.endContainer.getChild(c.endOffset),
                        g = c.endContainer.getChild(c.endOffset - 1);
                    h && d(h, a[a.length - 1]);
                    if (g && d(g, a[0])) {
                        c.setEnd(c.endContainer, c.endOffset - 1);
                        c.collapse()
                    }
                }
                var k = CKEDITOR.dtd,
                    j = {
                        p: 1,
                        div: 1,
                        h1: 1,
                        h2: 1,
                        h3: 1,
                        h4: 1,
                        h5: 1,
                        h6: 1,
                        ul: 1,
                        ol: 1,
                        li: 1,
                        pre: 1,
                        dl: 1,
                        blockquote: 1
                    },
                    n = {
                        p: 1,
                        div: 1,
                        h1: 1,
                        h2: 1,
                        h3: 1,
                        h4: 1,
                        h5: 1,
                        h6: 1
                    },
                    m = CKEDITOR.tools.extend({}, k.$inline);
                delete m.br;
                return function(j, l, t) {
                    var r = j.editor;
                    j.getDocument();
                    var A = r.getSelection().getRanges()[0],
                        v = false;
                    if (l == "unfiltered_html") {
                        l = "html";
                        v = true
                    }
                    if (!A.checkReadOnly()) {
                        var o = (new CKEDITOR.dom.elementPath(A.startContainer, A.root)).blockLimit || A.root,
                            l = {
                                type: l,
                                dontFilter: v,
                                editable: j,
                                editor: r,
                                range: A,
                                blockLimit: o,
                                mergeCandidates: [],
                                zombies: []
                            },
                            r = l.range,
                            v = l.mergeCandidates,
                            x, I, G, D;
                        if (l.type == "text" && r.shrink(CKEDITOR.SHRINK_ELEMENT, true, false)) {
                            x = CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", r.document);
                            r.insertNode(x);
                            r.setStartAfter(x)
                        }
                        I = new CKEDITOR.dom.elementPath(r.startContainer);
                        l.endPath = G = new CKEDITOR.dom.elementPath(r.endContainer);
                        if (!r.collapsed) {
                            var o = G.block || G.blockLimit,
                                Q = r.getCommonAncestor();
                            o && (!o.equals(Q) && !o.contains(Q) && r.checkEndOfBlock()) && l.zombies.push(o);
                            r.deleteContents()
                        }
                        for (;
                        (D = b(r.startContainer) && r.startContainer.getChild(r.startOffset - 1)) && b(D) && D.isBlockBoundary() && I.contains(D);) r.moveToPosition(D, CKEDITOR.POSITION_BEFORE_END);
                        e(r, l.blockLimit, I, G);
                        if (x) {
                            r.setEndBefore(x);
                            r.collapse();
                            x.remove()
                        }
                        x = r.startPath();
                        if (o = x.contains(g, false, 1)) {
                            r.splitElement(o);
                            l.inlineStylesRoot = o;
                            l.inlineStylesPeak = x.lastElement
                        }
                        x = r.createBookmark();
                        (o = x.startNode.getPrevious(a)) && b(o) && g(o) && v.push(o);
                        (o = x.startNode.getNext(a)) && b(o) && g(o) && v.push(o);
                        for (o = x.startNode;
                        (o = o.getParent()) && g(o);) v.push(o);
                        r.moveToBookmark(x);
                        if (x = t) {
                            x = l.range;
                            if (l.type == "text" && l.inlineStylesRoot) {
                                D = l.inlineStylesPeak;
                                r = D.getDocument().createText("{cke-peak}");
                                for (v = l.inlineStylesRoot.getParent(); !D.equals(v);) {
                                    r = r.appendTo(D.clone());
                                    D = D.getParent()
                                }
                                t = r.getOuterHtml().split("{cke-peak}").join(t)
                            }
                            D = l.blockLimit.getName();
                            if (/^\s+|\s+$/.test(t) && "span" in CKEDITOR.dtd[D]) var L = '<span data-cke-marker="1">&nbsp;</span>',
                                t = L + t + L;
                            t = l.editor.dataProcessor.toHtml(t, null, false, l.dontFilter);
                            D = x.document.createElement("body");
                            D.setHtml(t);
                            if (L) {
                                D.getFirst().remove();
                                D.getLast().remove()
                            }
                            if ((L = x.startPath().block) && !(L.getChildCount() == 1 && L.getBogus())) a: {
                                var E;
                                if (D.getChildCount() == 1 && b(E = D.getFirst()) && E.is(n)) {
                                    L = E.getElementsByTag("*");
                                    x = 0;
                                    for (v = L.count(); x < v; x++) {
                                        r = L.getItem(x);
                                        if (!r.is(m)) break a
                                    }
                                    E.moveChildren(E.getParent(1));
                                    E.remove()
                                }
                            }
                            l.dataWrapper = D;
                            x = t
                        }
                        if (x) {
                            E = l.range;
                            var L = E.document,
                                y, t = l.blockLimit;
                            x = 0;
                            var J;
                            D = [];
                            var H, N, v = r = 0,
                                K, O;
                            I = E.startContainer;
                            var o = l.endPath.elements[0],
                                P;
                            G = o.getPosition(I);
                            Q = !! o.getCommonAncestor(I) && G != CKEDITOR.POSITION_IDENTICAL && !(G & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED);
                            I = c(l.dataWrapper, l);
                            for (f(I, E); x < I.length; x++) {
                                G = I[x];
                                if (y = G.isLineBreak) {
                                    y = E;
                                    K = t;
                                    var M = void 0,
                                        R = void 0;
                                    if (G.hasBlockSibling) y = 1;
                                    else {
                                        M = y.startContainer.getAscendant(k.$block, 1);
                                        if (!M || !M.is({
                                            div: 1,
                                            p: 1
                                        })) y = 0;
                                        else {
                                            R = M.getPosition(K);
                                            if (R == CKEDITOR.POSITION_IDENTICAL || R == CKEDITOR.POSITION_CONTAINS) y = 0;
                                            else {
                                                K = y.splitElement(M);
                                                y.moveToPosition(K, CKEDITOR.POSITION_AFTER_START);
                                                y = 1
                                            }
                                        }
                                    }
                                }
                                if (y) v = x > 0;
                                else {
                                    y = E.startPath();
                                    if (!G.isBlock && (N = l.editor.config.enterMode != CKEDITOR.ENTER_BR && l.editor.config.autoParagraph !== false ? l.editor.config.enterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : false) && !y.block && y.blockLimit && y.blockLimit.equals(E.root)) {
                                        N = L.createElement(N);
                                        !CKEDITOR.env.ie && N.appendBogus();
                                        E.insertNode(N);
                                        !CKEDITOR.env.ie && (J = N.getBogus()) && J.remove();
                                        E.moveToPosition(N, CKEDITOR.POSITION_BEFORE_END)
                                    }
                                    if ((y = E.startPath().block) && !y.equals(H)) {
                                        if (J = y.getBogus()) {
                                            J.remove();
                                            D.push(y)
                                        }
                                        H = y
                                    }
                                    G.firstNotAllowed && (r = 1);
                                    if (r && G.isElement) {
                                        y = E.startContainer;
                                        for (K = null; y && !k[y.getName()][G.name];) {
                                            if (y.equals(t)) {
                                                y = null;
                                                break
                                            }
                                            K = y;
                                            y = y.getParent()
                                        }
                                        if (y) {
                                            if (K) {
                                                O = E.splitElement(K);
                                                l.zombies.push(O);
                                                l.zombies.push(K)
                                            }
                                        } else {
                                            K = t.getName();
                                            P = !x;
                                            y = x == I.length - 1;
                                            K = d(G.node, K);
                                            for (var M = [], R = K.length, T = 0, U = void 0, V = 0, W = -1; T < R; T++) {
                                                U = K[T];
                                                if (U == " ") {
                                                    if (!V && (!P || T)) {
                                                        M.push(new CKEDITOR.dom.text(" "));
                                                        W = M.length
                                                    }
                                                    V = 1
                                                } else {
                                                    M.push(U);
                                                    V = 0
                                                }
                                            }
                                            y && W == M.length && M.pop();
                                            P = M
                                        }
                                    }
                                    if (P) {
                                        for (; y = P.pop();) E.insertNode(y);
                                        P = 0
                                    } else E.insertNode(G.node);
                                    if (G.lastNotAllowed && x < I.length - 1) {
                                        (O = Q ? o : O) && E.setEndAt(O, CKEDITOR.POSITION_AFTER_START);
                                        r = 0
                                    }
                                    E.collapse()
                                }
                            }
                            l.dontMoveCaret = v;
                            l.bogusNeededBlocks = D
                        }
                        J = l.range;
                        var S;
                        O = l.bogusNeededBlocks;
                        for (P = J.createBookmark(); H = l.zombies.pop();) if (H.getParent()) {
                            N = J.clone();
                            N.moveToElementEditStart(H);
                            N.removeEmptyBlocksAtEnd()
                        }
                        if (O) for (; H = O.pop();) H.append(CKEDITOR.env.ie ? J.document.createText(" ") : J.document.createElement("br"));
                        for (; H = l.mergeCandidates.pop();) H.mergeSiblings();
                        J.moveToBookmark(P);
                        if (!l.dontMoveCaret) {
                            for (H = b(J.startContainer) && J.startContainer.getChild(J.startOffset - 1); H && b(H) && !H.is(k.$empty);) {
                                if (H.isBlockBoundary()) J.moveToPosition(H, CKEDITOR.POSITION_BEFORE_END);
                                else {
                                    if (g(H) && H.getHtml().match(/(\s|&nbsp;)$/g)) {
                                        S = null;
                                        break
                                    }
                                    S = J.clone();
                                    S.moveToPosition(H, CKEDITOR.POSITION_BEFORE_END)
                                }
                                H = H.getLast(a)
                            }
                            S && J.moveToRange(S)
                        }
                        A.select();
                        i(j)
                    }
                }
            }()
    })();
    (function() {
        function b() {
            var a = this.getSelection(1);
            if (a.getType() != CKEDITOR.SELECTION_NONE) {
                this.fire("selectionCheck", a);
                var b = this.elementPath();
                if (!b.compare(this._.selectionPreviousPath)) {
                    this._.selectionPreviousPath = b;
                    this.fire("selectionChange", {
                        selection: a,
                        path: b
                    })
                }
            }
        }
        function c() {
            j = true;
            if (!l) {
                a.call(this);
                l = CKEDITOR.tools.setTimeout(a, 200, this)
            }
        }
        function a() {
            l = null;
            if (j) {
                CKEDITOR.tools.setTimeout(b, 0, this);
                j = false
            }
        }
        function e(a) {
            function b(c, d) {
                return !c || c.type == CKEDITOR.NODE_TEXT ? false : a.clone()["moveToElementEdit" + (d ? "End" : "Start")](c)
            }
            if (!(a.root instanceof CKEDITOR.editable)) return false;
            var c = a.startContainer,
                d = a.getPreviousNode(m, null, c),
                e = a.getNextNode(m, null, c);
            return b(d) || b(e, 1) || !d && !e && !(c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? true : false
        }
        function f(a) {
            return a.getCustomData("cke-fillingChar")
        }
        function d(a, b) {
            var c = a && a.removeCustomData("cke-fillingChar");
            if (c) {
                if (b !== false) {
                    var d, e = a.getDocument().getSelection().getNative(),
                        f = e && e.type != "None" && e.getRangeAt(0);
                    if (c.getLength() > 1 && f && f.intersectsNode(c.$)) {
                        d = [e.anchorOffset, e.focusOffset];
                        f = e.focusNode == c.$ && e.focusOffset > 0;
                        e.anchorNode == c.$ && e.anchorOffset > 0 && d[0]--;
                        f && d[1]--;
                        var j;
                        f = e;
                        if (!f.isCollapsed) {
                            j = f.getRangeAt(0);
                            j.setStart(f.anchorNode, f.anchorOffset);
                            j.setEnd(f.focusNode, f.focusOffset);
                            j = j.collapsed
                        }
                        j && d.unshift(d.pop())
                    }
                }
                c.setText(i(c.getText()));
                if (d) {
                    c = e.getRangeAt(0);
                    c.setStart(c.startContainer, d[0]);
                    c.setEnd(c.startContainer, d[1]);
                    e.removeAllRanges();
                    e.addRange(c)
                }
            }
        }
        function i(a) {
            return a.replace(/\u200B( )?/g, function(a) {
                return a[1] ? " " : ""
            })
        }
        var l, j, m = CKEDITOR.dom.walker.invisible(1);
        CKEDITOR.on("instanceCreated", function(a) {
            function h() {
                var a = e.getSelection();
                a && a.removeAllRanges()
            }
            var e = a.editor;
            e.define("selectionChange", {
                errorProof: 1
            });
            e.on("contentDom", function() {
                var a = e.document,
                    h = CKEDITOR.document,
                    f = e.editable(),
                    i = a.getBody(),
                    j = a.getDocumentElement(),
                    p = f.isInline(),
                    l;
                CKEDITOR.env.gecko && f.attachListener(f, "focus", function(a) {
                    a.removeListener();
                    if (l !== 0) {
                        a = e.getSelection().getNative();
                        if (a.isCollapsed && a.anchorNode == f.$) {
                            a = e.createRange();
                            a.moveToElementEditStart(f);
                            a.select()
                        }
                    }
                }, null, null, -2);
                f.attachListener(f, "focus", function() {
                    e.unlockSelection(l);
                    l = 0
                }, null, null, -1);
                f.attachListener(f, "mousedown", function() {
                    l = 0
                });
                if (CKEDITOR.env.ie || CKEDITOR.env.opera || p) {
                    var m, q = function() {
                            m = e.getSelection(1);
                            m.lock()
                        };
                    n ? f.attachListener(f, "beforedeactivate", q, null, null, -1) : f.attachListener(e, "selectionCheck", q, null, null, -1);
                    f.attachListener(f, "blur", function() {
                        e.lockSelection(m);
                        l = 1
                    }, null, null, -1)
                }
                if (CKEDITOR.env.ie && !p) {
                    var r;
                    f.attachListener(f, "mousedown", function(a) {
                        a.data.$.button == 2 && e.document.$.selection.type == "None" && (r = e.window.getScrollPosition())
                    });
                    f.attachListener(f, "mouseup", function(a) {
                        if (a.data.$.button == 2 && r) {
                            e.document.$.documentElement.scrollLeft = r.x;
                            e.document.$.documentElement.scrollTop = r.y
                        }
                        r = null
                    });
                    if (a.$.compatMode != "BackCompat") {
                        if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) j.on("mousedown", function(a) {
                            function b(a) {
                                a = a.data.$;
                                if (d) {
                                    var c = i.$.createTextRange();
                                    try {
                                        c.moveToPoint(a.x, a.y)
                                    } catch (e) {}
                                    d.setEndPoint(f.compareEndPoints("StartToStart", c) < 0 ? "EndToEnd" : "StartToStart", c);
                                    d.select()
                                }
                            }
                            function c() {
                                j.removeListener("mousemove", b);
                                h.removeListener("mouseup", c);
                                j.removeListener("mouseup", c);
                                d.select()
                            }
                            a = a.data;
                            if (a.getTarget().is("html") && a.$.y < j.$.clientHeight && a.$.x < j.$.clientWidth) {
                                var d = i.$.createTextRange();
                                try {
                                    d.moveToPoint(a.$.x, a.$.y)
                                } catch (e) {}
                                var f = d.duplicate();
                                j.on("mousemove", b);
                                h.on("mouseup", c);
                                j.on("mouseup", c)
                            }
                        });
                        if (CKEDITOR.env.version > 7) {
                            j.on("mousedown", function(a) {
                                if (a.data.getTarget().is("html")) {
                                    h.on("mouseup", A);
                                    j.on("mouseup", A)
                                }
                            });
                            var A = function() {
                                    h.removeListener("mouseup", A);
                                    j.removeListener("mouseup", A);
                                    var b = CKEDITOR.document.$.selection,
                                        c = b.createRange();
                                    b.type != "None" && c.parentElement().ownerDocument == a.$ && c.select()
                                }
                        }
                    }
                }
                f.attachListener(f, "selectionchange", b, e);
                f.attachListener(f, "keyup", c, e);
                f.attachListener(f, "focus", function() {
                    e.forceNextSelectionCheck();
                    e.selectionChange(1)
                });
                if (p ? CKEDITOR.env.webkit || CKEDITOR.env.gecko : CKEDITOR.env.opera) {
                    var v;
                    f.attachListener(f, "mousedown", function() {
                        v = 1
                    });
                    f.attachListener(a.getDocumentElement(), "mouseup", function() {
                        v && c.call(e);
                        v = 0
                    })
                } else f.attachListener(CKEDITOR.env.ie ? f : a.getDocumentElement(), "mouseup", c, e);
                CKEDITOR.env.webkit && f.attachListener(a, "keydown", function(a) {
                    switch (a.data.getKey()) {
                    case 13:
                    case 33:
                    case 34:
                    case 35:
                    case 36:
                    case 37:
                    case 39:
                    case 8:
                    case 45:
                    case 46:
                        d(f)
                    }
                }, null, null, -1)
            });
            e.on("contentDomUnload", e.forceNextSelectionCheck, e);
            e.on("dataReady", function() {
                e.selectionChange(1)
            });
            CKEDITOR.env.ie9Compat && e.on("beforeDestroy", h, null, null, 9);
            CKEDITOR.env.webkit && e.on("setData", h);
            e.on("contentDomUnload", function() {
                e.unlockSelection()
            })
        });
        CKEDITOR.on("instanceReady", function(a) {
            var b = a.editor;
            if (CKEDITOR.env.webkit) {
                b.on("selectionChange", function() {
                    var a = b.editable(),
                        c = f(a);
                    c && (c.getCustomData("ready") ? d(a) : c.setCustomData("ready", 1))
                }, null, null, -1);
                b.on("beforeSetMode", function() {
                    d(b.editable())
                }, null, null, -1);
                var c, e, a = function() {
                        var a = b.editable();
                        if (a) if (a = f(a)) {
                            var d = b.document.$.defaultView.getSelection();
                            d.type == "Caret" && d.anchorNode == a.$ && (e = 1);
                            c = a.getText();
                            a.setText(i(c))
                        }
                    },
                    j = function() {
                        var a = b.editable();
                        if (a) if (a = f(a)) {
                            a.setText(c);
                            if (e) {
                                b.document.$.defaultView.getSelection().setPosition(a.$, a.getLength());
                                e = 0
                            }
                        }
                    };
                b.on("beforeUndoImage", a);
                b.on("afterUndoImage", j);
                b.on("beforeGetData", a, null, null, 0);
                b.on("getData", j)
            }
        });
        CKEDITOR.editor.prototype.selectionChange = function(a) {
            (a ? b : c).call(this)
        };
        CKEDITOR.editor.prototype.getSelection = function(a) {
            if (this._.savedSelection && !a) return this._.savedSelection;
            return (a = this.editable()) ? new CKEDITOR.dom.selection(a) : null
        };
        CKEDITOR.editor.prototype.lockSelection = function(a) {
            a = a || this.getSelection(1);
            if (a.getType() != CKEDITOR.SELECTION_NONE) {
                !a.isLocked && a.lock();
                this._.savedSelection = a;
                return true
            }
            return false
        };
        CKEDITOR.editor.prototype.unlockSelection = function(a) {
            var b = this._.savedSelection;
            if (b) {
                b.unlock(a);
                delete this._.savedSelection;
                return true
            }
            return false
        };
        CKEDITOR.editor.prototype.forceNextSelectionCheck = function() {
            delete this._.selectionPreviousPath
        };
        CKEDITOR.dom.document.prototype.getSelection = function() {
            return new CKEDITOR.dom.selection(this)
        };
        CKEDITOR.dom.range.prototype.select = function() {
            var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root);
            a.selectRanges([this]);
            return a
        };
        CKEDITOR.SELECTION_NONE = 1;
        CKEDITOR.SELECTION_TEXT = 2;
        CKEDITOR.SELECTION_ELEMENT = 3;
        var n = typeof window.getSelection != "function";
        CKEDITOR.dom.selection = function(a) {
            var b = a instanceof CKEDITOR.dom.element;
            this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument();
            this.root = b ? a : this.document.getBody();
            this.isLocked = 0;
            this._ = {
                cache: {}
            };
            if (CKEDITOR.env.webkit) {
                a = this.document.getWindow().$.getSelection();
                if (a.type == "None" && this.document.getActive().equals(this.root) || a.type == "Caret" && a.anchorNode.nodeType == CKEDITOR.NODE_DOCUMENT) {
                    var c = new CKEDITOR.dom.range(this.root);
                    c.moveToPosition(this.root, CKEDITOR.POSITION_AFTER_START);
                    b = this.document.$.createRange();
                    b.setStart(c.startContainer.$, c.startOffset);
                    b.collapse(1);
                    var d = this.root.on("focus", function(a) {
                        a.cancel()
                    }, null, null, -100);
                    a.addRange(b);
                    d.removeListener()
                }
            }
            var a = this.getNative(),
                e;
            if (a) if (a.getRangeAt) e = (c = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(c.commonAncestorContainer);
            else {
                try {
                    c = a.createRange()
                } catch (f) {}
                e = c && CKEDITOR.dom.element.get(c.item && c.item(0) || c.parentElement())
            }
            if (!e || !this.root.equals(e) && !this.root.contains(e)) {
                this._.cache.type = CKEDITOR.SELECTION_NONE;
                this._.cache.startElement = null;
                this._.cache.selectedElement = null;
                this._.cache.selectedText = "";
                this._.cache.ranges = new CKEDITOR.dom.rangeList
            }
            return this
        };
        var q = {
            img: 1,
            hr: 1,
            li: 1,
            table: 1,
            tr: 1,
            td: 1,
            th: 1,
            embed: 1,
            object: 1,
            ol: 1,
            ul: 1,
            a: 1,
            input: 1,
            form: 1,
            select: 1,
            textarea: 1,
            button: 1,
            fieldset: 1,
            thead: 1,
            tfoot: 1
        };
        CKEDITOR.dom.selection.prototype = {
            getNative: function() {
                return this._.cache.nativeSel !== void 0 ? this._.cache.nativeSel : this._.cache.nativeSel = n ? this.document.$.selection : this.document.getWindow().$.getSelection()
            },
            getType: n ?
            function() {
                var a = this._.cache;
                if (a.type) return a.type;
                var b = CKEDITOR.SELECTION_NONE;
                try {
                    var c = this.getNative(),
                        d = c.type;
                    if (d == "Text") b = CKEDITOR.SELECTION_TEXT;
                    if (d == "Control") b = CKEDITOR.SELECTION_ELEMENT;
                    if (c.createRange().parentElement()) b = CKEDITOR.SELECTION_TEXT
                } catch (e) {}
                return a.type = b
            } : function() {
                var a = this._.cache;
                if (a.type) return a.type;
                var b = CKEDITOR.SELECTION_TEXT,
                    c = this.getNative();
                if (!c || !c.rangeCount) b = CKEDITOR.SELECTION_NONE;
                else if (c.rangeCount == 1) {
                    var c = c.getRangeAt(0),
                        d = c.startContainer;
                    if (d == c.endContainer && d.nodeType == 1 && c.endOffset - c.startOffset == 1 && q[d.childNodes[c.startOffset].nodeName.toLowerCase()]) b = CKEDITOR.SELECTION_ELEMENT
                }
                return a.type = b
            },
            getRanges: function() {
                var a = n ?
                function() {
                    function a(b) {
                        return (new CKEDITOR.dom.node(b)).getIndex()
                    }
                    var b = function(b, c) {
                            b = b.duplicate();
                            b.collapse(c);
                            var d = b.parentElement(),
                                e = d.ownerDocument;
                            if (!d.hasChildNodes()) return {
                                container: d,
                                offset: 0
                            };
                            for (var f = d.children, g, i, j = b.duplicate(), l = 0, p = f.length - 1, m = -1, n, o; l <= p;) {
                                m = Math.floor((l + p) / 2);
                                g = f[m];
                                j.moveToElementText(g);
                                n = j.compareEndPoints("StartToStart", b);
                                if (n > 0) p = m - 1;
                                else if (n < 0) l = m + 1;
                                else {
                                    if (CKEDITOR.env.ie9Compat && g.tagName == "BR") {
                                        f = e.defaultView.getSelection();
                                        return {
                                            container: f[c ? "anchorNode" : "focusNode"],
                                            offset: f[c ? "anchorOffset" : "focusOffset"]
                                        }
                                    }
                                    return {
                                        container: d,
                                        offset: a(g)
                                    }
                                }
                            }
                            if (m == -1 || m == f.length - 1 && n < 0) {
                                j.moveToElementText(d);
                                j.setEndPoint("StartToStart", b);
                                e = j.text.replace(/(\r\n|\r)/g, "\n").length;
                                f = d.childNodes;
                                if (!e) {
                                    g = f[f.length - 1];
                                    return g.nodeType != CKEDITOR.NODE_TEXT ? {
                                        container: d,
                                        offset: f.length
                                    } : {
                                        container: g,
                                        offset: g.nodeValue.length
                                    }
                                }
                                for (d = f.length; e > 0 && d > 0;) {
                                    i = f[--d];
                                    if (i.nodeType == CKEDITOR.NODE_TEXT) {
                                        o = i;
                                        e = e - i.nodeValue.length
                                    }
                                }
                                return {
                                    container: o,
                                    offset: -e
                                }
                            }
                            j.collapse(n > 0 ? true : false);
                            j.setEndPoint(n > 0 ? "StartToStart" : "EndToStart", b);
                            e = j.text.replace(/(\r\n|\r)/g, "\n").length;
                            if (!e) return {
                                container: d,
                                offset: a(g) + (n > 0 ? 0 : 1)
                            };
                            for (; e > 0;) try {
                                i = g[n > 0 ? "previousSibling" : "nextSibling"];
                                if (i.nodeType == CKEDITOR.NODE_TEXT) {
                                    e = e - i.nodeValue.length;
                                    o = i
                                }
                                g = i
                            } catch (x) {
                                return {
                                    container: d,
                                    offset: a(g)
                                }
                            }
                            return {
                                container: o,
                                offset: n > 0 ? -e : o.nodeValue.length + e
                            }
                        };
                    return function() {
                        var a = this.getNative(),
                            c = a && a.createRange(),
                            d = this.getType();
                        if (!a) return [];
                        if (d == CKEDITOR.SELECTION_TEXT) {
                            a = new CKEDITOR.dom.range(this.root);
                            d = b(c, true);
                            a.setStart(new CKEDITOR.dom.node(d.container), d.offset);
                            d = b(c);
                            a.setEnd(new CKEDITOR.dom.node(d.container), d.offset);
                            a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse();
                            return [a]
                        }
                        if (d == CKEDITOR.SELECTION_ELEMENT) {
                            for (var d = [], e = 0; e < c.length; e++) {
                                for (var f = c.item(e), h = f.parentNode, i = 0, a = new CKEDITOR.dom.range(this.root); i < h.childNodes.length && h.childNodes[i] != f; i++);
                                a.setStart(new CKEDITOR.dom.node(h), i);
                                a.setEnd(new CKEDITOR.dom.node(h), i + 1);
                                d.push(a)
                            }
                            return d
                        }
                        return []
                    }
                }() : function() {
                    var a = [],
                        b, c = this.getNative();
                    if (!c) return a;
                    for (var d = 0; d < c.rangeCount; d++) {
                        var e = c.getRangeAt(d);
                        b = new CKEDITOR.dom.range(this.root);
                        b.setStart(new CKEDITOR.dom.node(e.startContainer), e.startOffset);
                        b.setEnd(new CKEDITOR.dom.node(e.endContainer), e.endOffset);
                        a.push(b)
                    }
                    return a
                };
                return function(b) {
                    var c = this._.cache;
                    if (c.ranges && !b) return c.ranges;
                    if (!c.ranges) c.ranges = new CKEDITOR.dom.rangeList(a.call(this));
                    if (b) for (var d = c.ranges, e = 0; e < d.length; e++) {
                        var f = d[e];
                        f.getCommonAncestor().isReadOnly() && d.splice(e, 1);
                        if (!f.collapsed) {
                            if (f.startContainer.isReadOnly()) for (var b = f.startContainer, i; b;) {
                                if ((i = b.type == CKEDITOR.NODE_ELEMENT) && b.is("body") || !b.isReadOnly()) break;
                                i && b.getAttribute("contentEditable") == "false" && f.setStartAfter(b);
                                b = b.getParent()
                            }
                            b = f.startContainer;
                            i = f.endContainer;
                            var j = f.startOffset,
                                l = f.endOffset,
                                n = f.clone();
                            b && b.type == CKEDITOR.NODE_TEXT && (j >= b.getLength() ? n.setStartAfter(b) : n.setStartBefore(b));
                            i && i.type == CKEDITOR.NODE_TEXT && (l ? n.setEndAfter(i) : n.setEndBefore(i));
                            b = new CKEDITOR.dom.walker(n);
                            b.evaluator = function(a) {
                                if (a.type == CKEDITOR.NODE_ELEMENT && a.isReadOnly()) {
                                    var b = f.clone();
                                    f.setEndBefore(a);
                                    f.collapsed && d.splice(e--, 1);
                                    if (!(a.getPosition(n.endContainer) & CKEDITOR.POSITION_CONTAINS)) {
                                        b.setStartAfter(a);
                                        b.collapsed || d.splice(e + 1, 0, b)
                                    }
                                    return true
                                }
                                return false
                            };
                            b.next()
                        }
                    }
                    return c.ranges
                }
            }(),
            getStartElement: function() {
                var a = this._.cache;
                if (a.startElement !== void 0) return a.startElement;
                var b;
                switch (this.getType()) {
                case CKEDITOR.SELECTION_ELEMENT:
                    return this.getSelectedElement();
                case CKEDITOR.SELECTION_TEXT:
                    var c = this.getRanges()[0];
                    if (c) {
                        if (c.collapsed) {
                            b = c.startContainer;
                            b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent())
                        } else {
                            for (c.optimize();;) {
                                b = c.startContainer;
                                if (c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary()) c.setStartAfter(b);
                                else break
                            }
                            b = c.startContainer;
                            if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent();
                            b = b.getChild(c.startOffset);
                            if (!b || b.type != CKEDITOR.NODE_ELEMENT) b = c.startContainer;
                            else for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;) {
                                b = c;
                                c = c.getFirst()
                            }
                        }
                        b = b.$
                    }
                }
                return a.startElement = b ? new CKEDITOR.dom.element(b) : null
            },
            getSelectedElement: function() {
                var a = this._.cache;
                if (a.selectedElement !== void 0) return a.selectedElement;
                var b = this,
                    c = CKEDITOR.tools.tryThese(function() {
                        return b.getNative().createRange().item(0)
                    }, function() {
                        for (var a = b.getRanges()[0], c, d, e = 2; e && (!(c = a.getEnclosedNode()) || !(c.type == CKEDITOR.NODE_ELEMENT && q[c.getName()] && (d = c))); e--) a.shrink(CKEDITOR.SHRINK_ELEMENT);
                        return d.$
                    });
                return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
            },
            getSelectedText: function() {
                var a = this._.cache;
                if (a.selectedText !== void 0) return a.selectedText;
                var b = this.getNative(),
                    b = n ? b.type == "Control" ? "" : b.createRange().text : b.toString();
                return a.selectedText = b
            },
            lock: function() {
                this.getRanges();
                this.getStartElement();
                this.getSelectedElement();
                this.getSelectedText();
                this._.cache.nativeSel = null;
                this.isLocked = 1
            },
            unlock: function(a) {
                if (this.isLocked) {
                    if (a) var b = this.getSelectedElement(),
                        c = !b && this.getRanges();
                    this.isLocked = 0;
                    this.reset();
                    if (a)(a = b || c[0] && c[0].getCommonAncestor()) && a.getAscendant("body", 1) && (b ? this.selectElement(b) : this.selectRanges(c))
                }
            },
            reset: function() {
                this._.cache = {}
            },
            selectElement: function(a) {
                var b = new CKEDITOR.dom.range(this.root);
                b.setStartBefore(a);
                b.setEndAfter(a);
                this.selectRanges([b])
            },
            selectRanges: function(a) {
                if (a.length) if (this.isLocked) {
                    var b = CKEDITOR.document.getActive();
                    this.unlock();
                    this.selectRanges(a);
                    this.lock();
                    !b.equals(this.root) && b.focus()
                } else {
                    if (n) {
                        var c = CKEDITOR.dom.walker.whitespaces(true),
                            f = /\ufeff|\u00a0/,
                            i = {
                                table: 1,
                                tbody: 1,
                                tr: 1
                            };
                        if (a.length > 1) {
                            b = a[a.length - 1];
                            a[0].setEnd(b.endContainer, b.endOffset)
                        }
                        var b = a[0],
                            a = b.collapsed,
                            j, l, m, z = b.getEnclosedNode();
                        if (z && z.type == CKEDITOR.NODE_ELEMENT && z.getName() in q && (!z.is("a") || !z.getText())) try {
                            m = z.$.createControlRange();
                            m.addElement(z.$);
                            m.select();
                            return
                        } catch (F) {}(b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.getName() in i || b.endContainer.type == CKEDITOR.NODE_ELEMENT && b.endContainer.getName() in i) && b.shrink(CKEDITOR.NODE_ELEMENT, true);
                        m = b.createBookmark();
                        var i = m.startNode,
                            s;
                        if (!a) s = m.endNode;
                        m = b.document.$.body.createTextRange();
                        m.moveToElementText(i.$);
                        m.moveStart("character", 1);
                        if (s) {
                            f = b.document.$.body.createTextRange();
                            f.moveToElementText(s.$);
                            m.setEndPoint("EndToEnd", f);
                            m.moveEnd("character", -1)
                        } else {
                            j = i.getNext(c);
                            l = i.hasAscendant("pre");
                            j = !(j && j.getText && j.getText().match(f)) && (l || !i.hasPrevious() || i.getPrevious().is && i.getPrevious().is("br"));
                            l = b.document.createElement("span");
                            l.setHtml("&#65279;");
                            l.insertBefore(i);
                            j && b.document.createText("﻿").insertBefore(i)
                        }
                        b.setStartBefore(i);
                        i.remove();
                        if (a) {
                            if (j) {
                                m.moveStart("character", -1);
                                m.select();
                                b.document.$.selection.clear()
                            } else m.select();
                            b.moveToPosition(l, CKEDITOR.POSITION_BEFORE_START);
                            l.remove()
                        } else {
                            b.setEndBefore(s);
                            s.remove();
                            m.select()
                        }
                    } else {
                        s = this.getNative();
                        if (!s) return;
                        if (CKEDITOR.env.opera) {
                            b = this.document.$.createRange();
                            b.selectNodeContents(this.root.$);
                            s.addRange(b)
                        }
                        this.removeAllRanges();
                        for (f = 0; f < a.length; f++) {
                            if (f < a.length - 1) {
                                b = a[f];
                                m = a[f + 1];
                                l = b.clone();
                                l.setStart(b.endContainer, b.endOffset);
                                l.setEnd(m.startContainer, m.startOffset);
                                if (!l.collapsed) {
                                    l.shrink(CKEDITOR.NODE_ELEMENT, true);
                                    j = l.getCommonAncestor();
                                    l = l.getEnclosedNode();
                                    if (j.isReadOnly() || l && l.isReadOnly()) {
                                        m.setStart(b.startContainer, b.startOffset);
                                        a.splice(f--, 1);
                                        continue
                                    }
                                }
                            }
                            b = a[f];
                            m = this.document.$.createRange();
                            j = b.startContainer;
                            if (CKEDITOR.env.opera && b.collapsed && j.type == CKEDITOR.NODE_ELEMENT) {
                                l = j.getChild(b.startOffset - 1);
                                c = j.getChild(b.startOffset);
                                if (!l && !c && j.is(CKEDITOR.dtd.$removeEmpty) || l && l.type == CKEDITOR.NODE_ELEMENT || c && c.type == CKEDITOR.NODE_ELEMENT) {
                                    b.insertNode(this.document.createText(""));
                                    b.collapse(1)
                                }
                            }
                            if (b.collapsed && CKEDITOR.env.webkit && e(b)) {
                                j = this.root;
                                d(j, false);
                                l = j.getDocument().createText("​");
                                j.setCustomData("cke-fillingChar", l);
                                b.insertNode(l);
                                if ((j = l.getNext()) && !l.getPrevious() && j.type == CKEDITOR.NODE_ELEMENT && j.getName() == "br") {
                                    d(this.root);
                                    b.moveToPosition(j, CKEDITOR.POSITION_BEFORE_START)
                                } else b.moveToPosition(l, CKEDITOR.POSITION_AFTER_END)
                            }
                            m.setStart(b.startContainer.$, b.startOffset);
                            try {
                                m.setEnd(b.endContainer.$, b.endOffset)
                            } catch (C) {
                                if (C.toString().indexOf("NS_ERROR_ILLEGAL_VALUE") >= 0) {
                                    b.collapse(1);
                                    m.setEnd(b.endContainer.$, b.endOffset)
                                } else throw C;
                            }
                            s.addRange(m)
                        }
                    }
                    this.reset();
                    this.root.fire("selectionchange")
                }
            },
            createBookmarks: function(a) {
                return this.getRanges().createBookmarks(a)
            },
            createBookmarks2: function(a) {
                return this.getRanges().createBookmarks2(a)
            },
            selectBookmarks: function(a) {
                for (var b = [], c = 0; c < a.length; c++) {
                    var d = new CKEDITOR.dom.range(this.root);
                    d.moveToBookmark(a[c]);
                    b.push(d)
                }
                this.selectRanges(b);
                return this
            },
            getCommonAncestor: function() {
                var a = this.getRanges();
                return a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer)
            },
            scrollIntoView: function() {
                this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView()
            },
            removeAllRanges: function() {
                var a = this.getNative();
                try {
                    a && a[n ? "empty" : "removeAllRanges"]()
                } catch (b) {}
                this.reset()
            }
        }
    })();
    CKEDITOR.editor.prototype.attachStyleStateChange = function(b, c) {
        var a = this._.styleStateChangeCallbacks;
        if (!a) {
            a = this._.styleStateChangeCallbacks = [];
            this.on("selectionChange", function(b) {
                for (var c = 0; c < a.length; c++) {
                    var d = a[c],
                        i = d.style.checkActive(b.data.path) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
                    d.fn.call(this, i)
                }
            })
        }
        a.push({
            style: b,
            fn: c
        })
    };
    CKEDITOR.STYLE_BLOCK = 1;
    CKEDITOR.STYLE_INLINE = 2;
    CKEDITOR.STYLE_OBJECT = 3;
    (function() {
        function b(a, b) {
            for (var c, d; a = a.getParent();) {
                if (a.equals(b)) break;
                if (a.getAttribute("data-nostyle")) c = a;
                else if (!d) {
                    var e = a.getAttribute("contentEditable");
                    e == "false" ? c = a : e == "true" && (d = 1)
                }
            }
            return c
        }
        function c(a) {
            var c = a.document;
            if (a.collapsed) {
                c = u(this, c);
                a.insertNode(c);
                a.moveToPosition(c, CKEDITOR.POSITION_BEFORE_END)
            } else {
                var d = this.element,
                    e = this._.definition,
                    f, g = e.ignoreReadonly,
                    h = g || e.includeReadonly;
                h == void 0 && (h = a.root.getCustomData("cke_includeReadonly"));
                var i = CKEDITOR.dtd[d] || (f = true, CKEDITOR.dtd.span);
                a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
                a.trim();
                var j = a.createBookmark(),
                    l = j.startNode,
                    k = j.endNode,
                    m = l,
                    n;
                if (!g) {
                    var q = a.getCommonAncestor(),
                        g = b(l, q),
                        q = b(k, q);
                    g && (m = g.getNextSourceNode(true));
                    q && (k = q)
                }
                for (m.getPosition(k) == CKEDITOR.POSITION_FOLLOWING && (m = 0); m;) {
                    g = false;
                    if (m.equals(k)) {
                        m = null;
                        g = true
                    } else {
                        var r = m.type,
                            s = r == CKEDITOR.NODE_ELEMENT ? m.getName() : null,
                            q = s && m.getAttribute("contentEditable") == "false",
                            t = s && m.getAttribute("data-nostyle");
                        if (s && m.data("cke-bookmark")) {
                            m = m.getNextSourceNode(true);
                            continue
                        }
                        if (!s || i[s] && !t && (!q || h) && (m.getPosition(k) | CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED) == CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IDENTICAL + CKEDITOR.POSITION_IS_CONTAINED && (!e.childRule || e.childRule(m))) {
                            var v = m.getParent();
                            if (v && ((v.getDtd() || CKEDITOR.dtd.span)[d] || f) && (!e.parentRule || e.parentRule(v))) {
                                if (!n && (!s || !CKEDITOR.dtd.$removeEmpty[s] || (m.getPosition(k) | CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED) == CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IDENTICAL + CKEDITOR.POSITION_IS_CONTAINED)) {
                                    n = a.clone();
                                    n.setStartBefore(m)
                                }
                                if (r == CKEDITOR.NODE_TEXT || q || r == CKEDITOR.NODE_ELEMENT && !m.getChildCount()) {
                                    for (var r = m, w;
                                    (g = !r.getNext(A)) && (w = r.getParent(), i[w.getName()]) && (w.getPosition(l) | CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED) == CKEDITOR.POSITION_FOLLOWING + CKEDITOR.POSITION_IDENTICAL + CKEDITOR.POSITION_IS_CONTAINED && (!e.childRule || e.childRule(w));) r = w;
                                    n.setEndAfter(r)
                                }
                            } else g = true
                        } else g = true;
                        m = m.getNextSourceNode(t || q && !h)
                    }
                    if (g && n && !n.collapsed) {
                        for (var g = u(this, c), q = g.hasAttributes(), t = n.getCommonAncestor(), r = {}, s = {}, v = {}, z = {}, B, C, F; g && t;) {
                            if (t.getName() == d) {
                                for (B in e.attributes) if (!z[B] && (F = t.getAttribute(C))) g.getAttribute(B) == F ? s[B] = 1 : z[B] = 1;
                                for (C in e.styles) if (!v[C] && (F = t.getStyle(C))) g.getStyle(C) == F ? r[C] = 1 : v[C] = 1
                            }
                            t = t.getParent()
                        }
                        for (B in s) g.removeAttribute(B);
                        for (C in r) g.removeStyle(C);
                        q && !g.hasAttributes() && (g = null);
                        if (g) {
                            n.extractContents().appendTo(g);
                            p.call(this, g);
                            n.insertNode(g);
                            g.mergeSiblings();
                            CKEDITOR.env.ie || g.$.normalize()
                        } else {
                            g = new CKEDITOR.dom.element("span");
                            n.extractContents().appendTo(g);
                            n.insertNode(g);
                            p.call(this, g);
                            g.remove(true)
                        }
                        n = null
                    }
                }
                a.moveToBookmark(j);
                a.shrink(CKEDITOR.SHRINK_TEXT)
            }
        }
        function a(a) {
            a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
            var b = a.createBookmark(),
                c = b.startNode;
            if (a.collapsed) {
                for (var d = new CKEDITOR.dom.elementPath(c.getParent(), a.root), e, f = 0, g; f < d.elements.length && (g = d.elements[f]); f++) {
                    if (g == d.block || g == d.blockLimit) break;
                    if (this.checkElementRemovable(g)) {
                        var i;
                        if (a.collapsed && (a.checkBoundaryOfElement(g, CKEDITOR.END) || (i = a.checkBoundaryOfElement(g, CKEDITOR.START)))) {
                            e = g;
                            e.match = i ? "start" : "end"
                        } else {
                            g.mergeSiblings();
                            g.getName() == this.element ? q.call(this, g) : h(g, t(this)[g.getName()])
                        }
                    }
                }
                if (e) {
                    g = c;
                    for (f = 0;; f++) {
                        i = d.elements[f];
                        if (i.equals(e)) break;
                        else if (i.match) continue;
                        else i = i.clone();
                        i.append(g);
                        g = i
                    }
                    g[e.match == "start" ? "insertBefore" : "insertAfter"](e)
                }
            } else {
                var j = b.endNode,
                    k = this,
                    d = function() {
                        for (var a = new CKEDITOR.dom.elementPath(c.getParent()), b = new CKEDITOR.dom.elementPath(j.getParent()), d = null, e = null, f = 0; f < a.elements.length; f++) {
                            var g = a.elements[f];
                            if (g == a.block || g == a.blockLimit) break;
                            k.checkElementRemovable(g) && (d = g)
                        }
                        for (f = 0; f < b.elements.length; f++) {
                            g = b.elements[f];
                            if (g == b.block || g == b.blockLimit) break;
                            k.checkElementRemovable(g) && (e = g)
                        }
                        e && j.breakParent(e);
                        d && c.breakParent(d)
                    };
                d();
                for (e = c; !e.equals(j);) {
                    f = e.getNextSourceNode();
                    if (e.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(e)) {
                        e.getName() == this.element ? q.call(this, e) : h(e, t(this)[e.getName()]);
                        if (f.type == CKEDITOR.NODE_ELEMENT && f.contains(c)) {
                            d();
                            f = c.getNext()
                        }
                    }
                    e = f
                }
            }
            a.moveToBookmark(b)
        }
        function e(a) {
            var b = a.getEnclosedNode() || a.getCommonAncestor(false, true);
            (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && w(a, this)
        }
        function f(a) {
            var b = a.getCommonAncestor(true, true);
            if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
                var b = this._.definition,
                    c = b.attributes;
                if (c) for (var d in c) a.removeAttribute(d, c[d]);
                if (b.styles) for (var e in b.styles) b.styles.hasOwnProperty(e) && a.removeStyle(e)
            }
        }
        function d(a) {
            var b = a.createBookmark(true),
                c = a.createIterator();
            c.enforceRealBlocks = true;
            if (this._.enterMode) c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
            for (var d, e = a.document; d = c.getNextParagraph();) if (!d.isReadOnly()) {
                var f = u(this, e, d);
                l(d, f)
            }
            a.moveToBookmark(b)
        }
        function i(a) {
            var b = a.createBookmark(1),
                c = a.createIterator();
            c.enforceRealBlocks = true;
            c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
            for (var d; d = c.getNextParagraph();) if (this.checkElementRemovable(d)) if (d.is("pre")) {
                var e = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div");
                e && d.copyAttributes(e);
                l(d, e)
            } else q.call(this, d);
            a.moveToBookmark(b)
        }
        function l(a, b) {
            var c = !b;
            if (c) {
                b = a.getDocument().createElement("div");
                a.copyAttributes(b)
            }
            var d = b && b.is("pre"),
                e = a.is("pre"),
                f = !d && e;
            if (d && !e) {
                e = b;
                (f = a.getBogus()) && f.remove();
                f = a.getHtml();
                f = m(f, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "");
                f = f.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1");
                f = f.replace(/([ \t\n\r]+|&nbsp;)/g, " ");
                f = f.replace(/<br\b[^>]*>/gi, "\n");
                if (CKEDITOR.env.ie) {
                    var h = a.getDocument().createElement("div");
                    h.append(e);
                    e.$.outerHTML = "<pre>" + f + "</pre>";
                    e.copyAttributes(h.getFirst());
                    e = h.getFirst().remove()
                } else e.setHtml(f);
                b = e
            } else f ? b = n(c ? [a.getHtml()] : j(a), b) : a.moveChildren(b);
            b.replace(a);
            if (d) {
                var c = b,
                    i;
                if ((i = c.getPrevious(v)) && i.is && i.is("pre")) {
                    d = m(i.getHtml(), /\n$/, "") + "\n\n" + m(c.getHtml(), /^\n/, "");
                    CKEDITOR.env.ie ? c.$.outerHTML = "<pre>" + d + "</pre>" : c.setHtml(d);
                    i.remove()
                }
            } else c && g(b)
        }
        function j(a) {
            a.getName();
            var b = [];
            m(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function(a, b, c) {
                return b + "</pre>" + c + "<pre>"
            }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function(a, c) {
                b.push(c)
            });
            return b
        }
        function m(a, b, c) {
            var d = "",
                e = "",
                a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function(a, b, c) {
                    b && (d = b);
                    c && (e = c);
                    return ""
                });
            return d + a.replace(b, c) + e
        }
        function n(a, b) {
            var c;
            a.length > 1 && (c = new CKEDITOR.dom.documentFragment(b.getDocument()));
            for (var d = 0; d < a.length; d++) {
                var e = a[d],
                    e = e.replace(/(\r\n|\r)/g, "\n"),
                    e = m(e, /^[ \t]*\n/, ""),
                    e = m(e, /\n$/, ""),
                    e = m(e, /^[ \t]+|[ \t]+$/g, function(a, b) {
                        return a.length == 1 ? "&nbsp;" : b ? " " + CKEDITOR.tools.repeat("&nbsp;", a.length - 1) : CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " "
                    }),
                    e = e.replace(/\n/g, "<br>"),
                    e = e.replace(/[ \t]{2,}/g, function(a) {
                        return CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " "
                    });
                if (c) {
                    var f = b.clone();
                    f.setHtml(e);
                    c.append(f)
                } else b.setHtml(e)
            }
            return c || b
        }
        function q(a) {
            var b = this._.definition,
                c = b.attributes,
                b = b.styles,
                d = t(this)[a.getName()],
                e = CKEDITOR.tools.isEmpty(c) && CKEDITOR.tools.isEmpty(b),
                f;
            for (f in c) if (!((f == "class" || this._.definition.fullMatch) && a.getAttribute(f) != B(f, c[f]))) {
                e = a.hasAttribute(f);
                a.removeAttribute(f)
            }
            for (var i in b) if (!(this._.definition.fullMatch && a.getStyle(i) != B(i, b[i], true))) {
                e = e || !! a.getStyle(i);
                a.removeStyle(i)
            }
            h(a, d, F[a.getName()]);
            e && (this._.definition.alwaysRemoveElement ? g(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? g(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
        }
        function p(a) {
            for (var b = t(this), c = a.getElementsByTag(this.element), d = c.count(); --d >= 0;) q.call(this, c.getItem(d));
            for (var e in b) if (e != this.element) {
                c = a.getElementsByTag(e);
                for (d = c.count() - 1; d >= 0; d--) {
                    var f = c.getItem(d);
                    h(f, b[e])
                }
            }
        }
        function h(a, b, c) {
            if (b = b && b.attributes) for (var d = 0; d < b.length; d++) {
                var e = b[d][0],
                    f;
                if (f = a.getAttribute(e)) {
                    var h = b[d][1];
                    (h === null || h.test && h.test(f) || typeof h == "string" && f == h) && a.removeAttribute(e)
                }
            }
            c || g(a)
        }
        function g(a, b) {
            if (!a.hasAttributes() || b) if (CKEDITOR.dtd.$block[a.getName()]) {
                var c = a.getPrevious(v),
                    d = a.getNext(v);
                c && (c.type == CKEDITOR.NODE_TEXT || !c.isBlockBoundary({
                    br: 1
                })) && a.append("br", 1);
                d && (d.type == CKEDITOR.NODE_TEXT || !d.isBlockBoundary({
                    br: 1
                })) && a.append("br");
                a.remove(true)
            } else {
                c = a.getFirst();
                d = a.getLast();
                a.remove(true);
                if (c) {
                    c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings();
                    d && (!c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT) && d.mergeSiblings()
                }
            }
        }
        function u(a, b, c) {
            var d;
            d = a.element;
            d == "*" && (d = "span");
            d = new CKEDITOR.dom.element(d, b);
            c && c.copyAttributes(d);
            d = w(d, a);
            b.getCustomData("doc_processing_style") && d.hasAttribute("id") ? d.removeAttribute("id") : b.setCustomData("doc_processing_style", 1);
            return d
        }
        function w(a, b) {
            var c = b._.definition,
                d = c.attributes,
                c = CKEDITOR.style.getStyleText(c);
            if (d) for (var e in d) a.setAttribute(e, d[e]);
            c && a.setAttribute("style", c);
            return a
        }
        function k(a, b) {
            for (var c in a) a[c] = a[c].replace(r, function(a, c) {
                return b[c]
            })
        }
        function t(a) {
            if (a._.overrides) return a._.overrides;
            var b = a._.overrides = {},
                c = a._.definition.overrides;
            if (c) {
                CKEDITOR.tools.isArray(c) || (c = [c]);
                for (var d = 0; d < c.length; d++) {
                    var e = c[d],
                        f, g;
                    if (typeof e == "string") f = e.toLowerCase();
                    else {
                        f = e.element ? e.element.toLowerCase() : a.element;
                        g = e.attributes
                    }
                    e = b[f] || (b[f] = {});
                    if (g) {
                        var e = e.attributes = e.attributes || [],
                            h;
                        for (h in g) e.push([h.toLowerCase(), g[h]])
                    }
                }
            }
            return b
        }
        function B(a, b, c) {
            var d = new CKEDITOR.dom.element("span");
            d[c ? "setStyle" : "setAttribute"](a, b);
            return d[c ? "getStyle" : "getAttribute"](a)
        }
        function z(a, b) {
            for (var c = a.document, d = a.getRanges(), e = b ? this.removeFromRange : this.applyToRange, f, g = d.createIterator(); f = g.getNextRange();) e.call(this, f);
            a.selectRanges(d);
            c.removeCustomData("doc_processing_style")
        }
        var F = {
            address: 1,
            div: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            p: 1,
            pre: 1,
            section: 1,
            header: 1,
            footer: 1,
            nav: 1,
            article: 1,
            aside: 1,
            figure: 1,
            dialog: 1,
            hgroup: 1,
            time: 1,
            meter: 1,
            menu: 1,
            command: 1,
            keygen: 1,
            output: 1,
            progress: 1,
            details: 1,
            datagrid: 1,
            datalist: 1
        },
            s = {
                a: 1,
                embed: 1,
                hr: 1,
                img: 1,
                li: 1,
                object: 1,
                ol: 1,
                table: 1,
                td: 1,
                tr: 1,
                th: 1,
                ul: 1,
                dl: 1,
                dt: 1,
                dd: 1,
                form: 1,
                audio: 1,
                video: 1
            },
            C = /\s*(?:;\s*|$)/,
            r = /#\((.+?)\)/g,
            A = CKEDITOR.dom.walker.bookmark(0, 1),
            v = CKEDITOR.dom.walker.whitespaces(1);
        CKEDITOR.style = function(a, b) {
            var c = a.attributes;
            if (c && c.style) {
                a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style));
                delete c.style
            }
            if (b) {
                a = CKEDITOR.tools.clone(a);
                k(a.attributes, b);
                k(a.styles, b)
            }
            c = this.element = a.element ? typeof a.element == "string" ? a.element.toLowerCase() : a.element : "*";
            this.type = a.type || (F[c] ? CKEDITOR.STYLE_BLOCK : s[c] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE);
            if (typeof this.element == "object") this.type = CKEDITOR.STYLE_OBJECT;
            this._ = {
                definition: a
            }
        };
        CKEDITOR.editor.prototype.applyStyle = function(a) {
            z.call(a, this.getSelection())
        };
        CKEDITOR.editor.prototype.removeStyle = function(a) {
            z.call(a, this.getSelection(), 1)
        };
        CKEDITOR.style.prototype = {
            apply: function(a) {
                z.call(this, a.getSelection())
            },
            remove: function(a) {
                z.call(this, a.getSelection(), 1)
            },
            applyToRange: function(a) {
                return (this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ? d : this.type == CKEDITOR.STYLE_OBJECT ? e : null).call(this, a)
            },
            removeFromRange: function(b) {
                return (this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? a : this.type == CKEDITOR.STYLE_BLOCK ? i : this.type == CKEDITOR.STYLE_OBJECT ? f : null).call(this, b)
            },
            applyToObject: function(a) {
                w(a, this)
            },
            checkActive: function(a) {
                switch (this.type) {
                case CKEDITOR.STYLE_BLOCK:
                    return this.checkElementRemovable(a.block || a.blockLimit, true);
                case CKEDITOR.STYLE_OBJECT:
                case CKEDITOR.STYLE_INLINE:
                    for (var b = a.elements, c = 0, d; c < b.length; c++) {
                        d = b[c];
                        if (!(this.type == CKEDITOR.STYLE_INLINE && (d == a.block || d == a.blockLimit))) {
                            if (this.type == CKEDITOR.STYLE_OBJECT) {
                                var e = d.getName();
                                if (!(typeof this.element == "string" ? e == this.element : e in this.element)) continue
                            }
                            if (this.checkElementRemovable(d, true)) return true
                        }
                    }
                }
                return false
            },
            checkApplicable: function(a) {
                switch (this.type) {
                case CKEDITOR.STYLE_OBJECT:
                    return a.contains(this.element)
                }
                return true
            },
            checkElementMatch: function(a, b) {
                var c = this._.definition;
                if (!a || !c.ignoreReadonly && a.isReadOnly()) return false;
                var d = a.getName();
                if (typeof this.element == "string" ? d == this.element : d in this.element) {
                    if (!b && !a.hasAttributes()) return true;
                    if (d = c._AC) c = d;
                    else {
                        var d = {},
                            e = 0,
                            f = c.attributes;
                        if (f) for (var g in f) {
                            e++;
                            d[g] = f[g]
                        }
                        if (g = CKEDITOR.style.getStyleText(c)) {
                            d.style || e++;
                            d.style = g
                        }
                        d._length = e;
                        c = c._AC = d
                    }
                    if (c._length) {
                        for (var h in c) if (h != "_length") {
                            e = a.getAttribute(h) || "";
                            if (h == "style") a: {
                                d = c[h];
                                typeof d == "string" && (d = CKEDITOR.tools.parseCssText(d));
                                typeof e == "string" && (e = CKEDITOR.tools.parseCssText(e, true));
                                g = void 0;
                                for (g in d) if (!(g in e && (e[g] == d[g] || d[g] == "inherit" || e[g] == "inherit"))) {
                                    d = false;
                                    break a
                                }
                                d = true
                            } else d = c[h] == e;
                            if (d) {
                                if (!b) return true
                            } else if (b) return false
                        }
                        if (b) return true
                    } else return true
                }
                return false
            },
            checkElementRemovable: function(a, b) {
                if (this.checkElementMatch(a, b)) return true;
                var c = t(this)[a.getName()];
                if (c) {
                    var d;
                    if (!(c = c.attributes)) return true;
                    for (var e = 0; e < c.length; e++) {
                        d = c[e][0];
                        if (d = a.getAttribute(d)) {
                            var f = c[e][1];
                            if (f === null || typeof f == "string" && d == f || f.test(d)) return true
                        }
                    }
                }
                return false
            },
            buildPreview: function(a) {
                var b = this._.definition,
                    c = [],
                    d = b.element;
                d == "bdo" && (d = "span");
                var c = ["<", d],
                    e = b.attributes;
                if (e) for (var f in e) c.push(" ", f, '="', e[f], '"');
                (e = CKEDITOR.style.getStyleText(b)) && c.push(' style="', e, '"');
                c.push(">", a || b.name, "</", d, ">");
                return c.join("")
            },
            getDefinition: function() {
                return this._.definition
            }
        };
        CKEDITOR.style.getStyleText = function(a) {
            var b = a._ST;
            if (b) return b;
            var b = a.styles,
                c = a.attributes && a.attributes.style || "",
                d = "";
            c.length && (c = c.replace(C, ";"));
            for (var e in b) {
                var f = b[e],
                    g = (e + ":" + f).replace(C, ";");
                f == "inherit" ? d = d + g : c = c + g
            }
            c.length && (c = CKEDITOR.tools.normalizeCssText(c, true));
            return a._ST = c + d
        }
    })();
    CKEDITOR.styleCommand = function(b, c) {
        this.requiredContent = this.allowedContent = this.style = b;
        CKEDITOR.tools.extend(this, c, true)
    };
    CKEDITOR.styleCommand.prototype.exec = function(b) {
        b.focus();
        this.state == CKEDITOR.TRISTATE_OFF ? b.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && b.removeStyle(this.style)
    };
    CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet");
    CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet);
    CKEDITOR.loadStylesSet = function(b, c, a) {
        CKEDITOR.stylesSet.addExternal(b, c, "");
        CKEDITOR.stylesSet.load(b, a)
    };
    CKEDITOR.editor.prototype.getStylesSet = function(b) {
        if (this._.stylesDefinitions) b(this._.stylesDefinitions);
        else {
            var c = this,
                a = c.config.stylesCombo_stylesSet || c.config.stylesSet;
            if (a === false) b(null);
            else if (a instanceof Array) {
                c._.stylesDefinitions = a;
                b(a)
            } else {
                a || (a = "default");
                var a = a.split(":"),
                    e = a[0];
                CKEDITOR.stylesSet.addExternal(e, a[1] ? a.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), "");
                CKEDITOR.stylesSet.load(e, function(a) {
                    c._.stylesDefinitions = a[e];
                    b(c._.stylesDefinitions)
                })
            }
        }
    };
    CKEDITOR.dom.comment = function(b, c) {
        typeof b == "string" && (b = (c ? c.$ : document).createComment(b));
        CKEDITOR.dom.domObject.call(this, b)
    };
    CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node;
    CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, {
        type: CKEDITOR.NODE_COMMENT,
        getOuterHtml: function() {
            return "<\!--" + this.$.nodeValue + "--\>"
        }
    });
    (function() {
        var b = {},
            c;
        for (c in CKEDITOR.dtd.$blockLimit) c in CKEDITOR.dtd.$list || (b[c] = 1);
        var a = {};
        for (c in CKEDITOR.dtd.$block) c in CKEDITOR.dtd.$blockLimit || c in CKEDITOR.dtd.$empty || (a[c] = 1);
        CKEDITOR.dom.elementPath = function(c, f) {
            var d = null,
                i = null,
                l = [],
                f = f || c.getDocument().getBody(),
                j = c;
            do
            if (j.type == CKEDITOR.NODE_ELEMENT) {
                l.push(j);
                if (!this.lastElement) {
                    this.lastElement = j;
                    if (j.is(CKEDITOR.dtd.$object)) continue
                }
                var m = j.getName();
                if (!i) {
                    !d && a[m] && (d = j);
                    if (b[m]) {
                        var n;
                        if (n = !d) {
                            if (m = m == "div") {
                                a: {
                                    m = j.getChildren();
                                    n = 0;
                                    for (var q = m.count(); n < q; n++) {
                                        var p = m.getItem(n);
                                        if (p.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[p.getName()]) {
                                            m = true;
                                            break a
                                        }
                                    }
                                    m = false
                                }
                                m = !m && !j.equals(f)
                            }
                            n = m
                        }
                        n ? d = j : i = j
                    }
                }
                if (j.equals(f)) break
            }
            while (j = j.getParent());
            this.block = d;
            this.blockLimit = i;
            this.root = f;
            this.elements = l
        }
    })();
    CKEDITOR.dom.elementPath.prototype = {
        compare: function(b) {
            var c = this.elements,
                b = b && b.elements;
            if (!b || c.length != b.length) return false;
            for (var a = 0; a < c.length; a++) if (!c[a].equals(b[a])) return false;
            return true
        },
        contains: function(b, c, a) {
            var e;
            typeof b == "string" && (e = function(a) {
                return a.getName() == b
            });
            b instanceof CKEDITOR.dom.element ? e = function(a) {
                return a.equals(b)
            } : CKEDITOR.tools.isArray(b) ? e = function(a) {
                return CKEDITOR.tools.indexOf(b, a.getName()) > -1
            } : typeof b == "function" ? e = b : typeof b == "object" && (e = function(a) {
                return a.getName() in b
            });
            var f = this.elements,
                d = f.length;
            c && d--;
            if (a) {
                f = Array.prototype.slice.call(f, 0);
                f.reverse()
            }
            for (c = 0; c < d; c++) if (e(f[c])) return f[c];
            return null
        },
        isContextFor: function(b) {
            var c;
            if (b in CKEDITOR.dtd.$block) {
                c = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit;
                return !!c.getDtd()[b]
            }
            return true
        },
        direction: function() {
            return (this.block || this.blockLimit || this.root).getDirection(1)
        }
    };
    CKEDITOR.dom.text = function(b, c) {
        typeof b == "string" && (b = (c ? c.$ : document).createTextNode(b));
        this.$ = b
    };
    CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node;
    CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
        type: CKEDITOR.NODE_TEXT,
        getLength: function() {
            return this.$.nodeValue.length
        },
        getText: function() {
            return this.$.nodeValue
        },
        setText: function(b) {
            this.$.nodeValue = b
        },
        split: function(b) {
            var c = this.$.parentNode,
                a = c.childNodes.length,
                e = this.getLength(),
                f = this.getDocument(),
                d = new CKEDITOR.dom.text(this.$.splitText(b), f);
            if (c.childNodes.length == a) if (b >= e) {
                d = f.createText("");
                d.insertAfter(this)
            } else {
                b = f.createText("");
                b.insertAfter(d);
                b.remove()
            }
            return d
        },
        substring: function(b, c) {
            return typeof c != "number" ? this.$.nodeValue.substr(b) : this.$.nodeValue.substring(b, c)
        }
    });
    (function() {
        function b(a, b, c) {
            var d = a.serializable,
                i = b[c ? "endContainer" : "startContainer"],
                l = c ? "endOffset" : "startOffset",
                j = d ? b.document.getById(a.startNode) : a.startNode,
                a = d ? b.document.getById(a.endNode) : a.endNode;
            if (i.equals(j.getPrevious())) {
                b.startOffset = b.startOffset - i.getLength() - a.getPrevious().getLength();
                i = a.getNext()
            } else if (i.equals(a.getPrevious())) {
                b.startOffset = b.startOffset - i.getLength();
                i = a.getNext()
            }
            i.equals(j.getParent()) && b[l]++;
            i.equals(a.getParent()) && b[l]++;
            b[c ? "endContainer" : "startContainer"] = i;
            return b
        }
        CKEDITOR.dom.rangeList = function(a) {
            if (a instanceof CKEDITOR.dom.rangeList) return a;
            a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = [];
            return CKEDITOR.tools.extend(a, c)
        };
        var c = {
            createIterator: function() {
                var a = this,
                    b = CKEDITOR.dom.walker.bookmark(),
                    c = [],
                    d;
                return {
                    getNextRange: function(i) {
                        d = d == void 0 ? 0 : d + 1;
                        var l = a[d];
                        if (l && a.length > 1) {
                            if (!d) for (var j = a.length - 1; j >= 0; j--) c.unshift(a[j].createBookmark(true));
                            if (i) for (var m = 0; a[d + m + 1];) {
                                for (var n = l.document, i = 0, j = n.getById(c[m].endNode), n = n.getById(c[m + 1].startNode);;) {
                                    j = j.getNextSourceNode(false);
                                    if (n.equals(j)) i = 1;
                                    else if (b(j) || j.type == CKEDITOR.NODE_ELEMENT && j.isBlockBoundary()) continue;
                                    break
                                }
                                if (!i) break;
                                m++
                            }
                            for (l.moveToBookmark(c.shift()); m--;) {
                                j = a[++d];
                                j.moveToBookmark(c.shift());
                                l.setEnd(j.endContainer, j.endOffset)
                            }
                        }
                        return l
                    }
                }
            },
            createBookmarks: function(a) {
                for (var c = [], f, d = 0; d < this.length; d++) {
                    c.push(f = this[d].createBookmark(a, true));
                    for (var i = d + 1; i < this.length; i++) {
                        this[i] = b(f, this[i]);
                        this[i] = b(f, this[i], true)
                    }
                }
                return c
            },
            createBookmarks2: function(a) {
                for (var b = [], c = 0; c < this.length; c++) b.push(this[c].createBookmark2(a));
                return b
            },
            moveToBookmarks: function(a) {
                for (var b = 0; b < this.length; b++) this[b].moveToBookmark(a[b])
            }
        }
    })();
    (function() {
        function b() {
            return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/")
        }
        function c(a) {
            var c = CKEDITOR.skin["ua_" + a],
                d = CKEDITOR.env;
            if (c) for (var c = c.split(",").sort(function(a, b) {
                return a > b ? -1 : 1
            }), e = 0, f; e < c.length; e++) {
                f = c[e];
                if (d.ie && (f.replace(/^ie/, "") == d.version || d.quirks && f == "iequirks")) f = "ie";
                if (d[f]) {
                    a = a + ("_" + c[e]);
                    break
                }
            }
            return CKEDITOR.getUrl(b() + a + ".css")
        }
        function a(a, b) {
            if (!d[a]) {
                CKEDITOR.document.appendStyleSheet(c(a));
                d[a] = 1
            }
            b && b()
        }
        function e(a) {
            var b = a.getById(i);
            if (!b) {
                b = a.getHead().append("style");
                b.setAttribute("id", i);
                b.setAttribute("type", "text/css")
            }
            return b
        }
        function f(a, b, c) {
            var d, e, f;
            if (CKEDITOR.env.webkit) {
                b = b.split("}").slice(0, -1);
                for (e = 0; e < b.length; e++) b[e] = b[e].split("{")
            }
            for (var i = 0; i < a.length; i++) if (CKEDITOR.env.webkit) for (e = 0; e < b.length; e++) {
                f = b[e][1];
                for (d = 0; d < c.length; d++) f = f.replace(c[d][0], c[d][1]);
                a[i].$.sheet.addRule(b[e][0], f)
            } else {
                f = b;
                for (d = 0; d < c.length; d++) f = f.replace(c[d][0], c[d][1]);
                CKEDITOR.env.ie ? a[i].$.styleSheet.cssText = a[i].$.styleSheet.cssText + f : a[i].$.innerHTML = a[i].$.innerHTML + f
            }
        }
        var d = {};
        CKEDITOR.skin = {
            path: b,
            loadPart: function(c, d) {
                CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(b() + "skin.js"), function() {
                    a(c, d)
                }) : a(c, d)
            },
            getPath: function(a) {
                return CKEDITOR.getUrl(c(a))
            },
            icons: {},
            addIcon: function(a, b, c) {
                a = a.toLowerCase();
                this.icons[a] || (this.icons[a] = {
                    path: b,
                    offset: c || 0
                })
            },
            getIconStyle: function(a, b, c, d) {
                var e;
                if (a) {
                    a = a.toLowerCase();
                    b && (e = this.icons[a + "-rtl"]);
                    e || (e = this.icons[a])
                }
                a = c || e && e.path || "";
                d = d || e && e.offset;
                return a && "background-image:url(" + CKEDITOR.getUrl(a) + ");background-position:0 " + d + "px;"
            }
        };
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            getUiColor: function() {
                return this.uiColor
            },
            setUiColor: function(a) {
                var b = e(CKEDITOR.document);
                return (this.setUiColor = function(a) {
                    var c = CKEDITOR.skin.chameleon,
                        d = [
                            [j, a]
                        ];
                    this.uiColor = a;
                    f([b], c(this, "editor"), d);
                    f(l, c(this, "panel"), d)
                }).call(this, a)
            }
        });
        var i = "cke_ui_color",
            l = [],
            j = /\$color/g;
        CKEDITOR.on("instanceLoaded", function(a) {
            if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                var b = a.editor,
                    a = function(a) {
                        a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();
                        if (!a.getById("cke_ui_color")) {
                            a = e(a);
                            l.push(a);
                            var c = b.getUiColor();
                            c && f([a], CKEDITOR.skin.chameleon(b, "panel"), [
                                [j, c]
                            ])
                        }
                    };
                b.on("panelShow", a);
                b.on("menuShow", a);
                b.config.uiColor && b.setUiColor(b.config.uiColor)
            }
        })
    })();
    (function() {
        if (CKEDITOR.env.webkit) CKEDITOR.env.hc = false;
        else {
            var b = CKEDITOR.dom.element.createFromHtml('<div style="width:0px;height:0px;position:absolute;left:-10000px;border: 1px solid;border-color: red blue;"></div>', CKEDITOR.document);
            b.appendTo(CKEDITOR.document.getHead());
            try {
                CKEDITOR.env.hc = b.getComputedStyle("border-top-color") == b.getComputedStyle("border-right-color")
            } catch (c) {
                CKEDITOR.env.hc = false
            }
            b.remove()
        }
        if (CKEDITOR.env.hc) CKEDITOR.env.cssClass = CKEDITOR.env.cssClass + " cke_hc";
        CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
        CKEDITOR.status = "loaded";
        CKEDITOR.fireOnce("loaded");
        if (b = CKEDITOR._.pending) {
            delete CKEDITOR._.pending;
            for (var a = 0; a < b.length; a++) {
                CKEDITOR.editor.prototype.constructor.apply(b[a][0], b[a][1]);
                CKEDITOR.add(b[a][0])
            }
        }
    })();
/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
*/
    CKEDITOR.skin.name = "moono";
    CKEDITOR.skin.ua_editor = "ie,iequirks,ie7,ie8,gecko";
    CKEDITOR.skin.ua_dialog = "ie,iequirks,ie7,ie8,opera";
    CKEDITOR.skin.chameleon = function() {
        var b = function() {
                return function(b, e) {
                    for (var a = b.match(/[^#]./g), c = 0; 3 > c; c++) {
                        var f = a,
                            h = c,
                            d;
                        d = parseInt(a[c], 16);
                        d = ("0" + (0 > e ? 0 | d * (1 + e) : 0 | d + (255 - d) * e).toString(16)).slice(-2);
                        f[h] = d
                    }
                    return "#" + a.join("")
                }
            }(),
            c = function() {
                var b = new CKEDITOR.template("background:#{to};background-image:-webkit-gradient(linear,lefttop,leftbottom,from({from}),to({to}));background-image:-moz-linear-gradient(top,{from},{to});background-image:-webkit-linear-gradient(top,{from},{to});background-image:-o-linear-gradient(top,{from},{to});background-image:-ms-linear-gradient(top,{from},{to});background-image:linear-gradient(top,{from},{to});filter:progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr='{from}',endColorstr='{to}');");
                return function(c, a) {
                    return b.output({
                        from: c,
                        to: a
                    })
                }
            }(),
            f = {
                editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ {defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_bottom [{defaultGradient}border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [{defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [{defaultGradient}outline-color:{defaultBorder};border-top-color:{defaultBorder};] {id} .cke_dialog_tab [{lightGradient}border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [{mediumGradient}] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} .cke_toolgroup [{lightGradient}border-color:{defaultBorder};] {id} a.cke_button_off:hover, {id} a.cke_button_off:focus, {id} a.cke_button_off:active [{mediumGradient}] {id} .cke_button_on [{ckeButtonOn}] {id} .cke_toolbar_separator [background-color: {ckeToolbarSeparator};] {id} .cke_combo_button [border-color:{defaultBorder};{lightGradient}] {id} a.cke_combo_button:hover, {id} a.cke_combo_button:focus, {id} .cke_combo_on a.cke_combo_button [border-color:{defaultBorder};{mediumGradient}] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover, {id} a.cke_path_item:focus, {id} a.cke_path_item:active [background-color:{elementsPathBg};] {id}.cke_panel [border-color:{defaultBorder};] "),
                panel: new CKEDITOR.template(".cke_panel_grouptitle [{lightGradient}border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:focus.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:focus.cke_colorauto, a:focus.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
            };
        return function(g, e) {
            var a = g.uiColor,
                a = {
                    id: "." + g.id,
                    defaultBorder: b(a, -0.1),
                    defaultGradient: c(b(a, 0.9), a),
                    lightGradient: c(b(a, 1), b(a, 0.7)),
                    mediumGradient: c(b(a, 0.8), b(a, 0.5)),
                    ckeButtonOn: c(b(a, 0.6), b(a, 0.7)),
                    ckeResizer: b(a, -0.4),
                    ckeToolbarSeparator: b(a, 0.5),
                    ckeColorauto: b(a, 0.8),
                    dialogBody: b(a, 0.7),
                    dialogTabSelected: c("#FFFFFF", "#FFFFFF"),
                    dialogTabSelectedBorder: "#FFF",
                    elementsPathColor: b(a, -0.6),
                    elementsPathBg: a,
                    menubuttonIcon: b(a, 0.5),
                    menubuttonIconHover: b(a, 0.3)
                };
            return f[e].output(a).replace(/\[/g, "{").replace(/\]/g, "}")
        }
    }();
    CKEDITOR.plugins.add("dialogui", {
        onLoad: function() {
            var i = function(b) {
                    this._ || (this._ = {});
                    this._["default"] = this._.initValue = b["default"] || "";
                    this._.required = b.required || !1;
                    for (var a = [this._], d = 1; d < arguments.length; d++) a.push(arguments[d]);
                    a.push(!0);
                    CKEDITOR.tools.extend.apply(CKEDITOR.tools, a);
                    return this._
                },
                r = {
                    build: function(b, a, d) {
                        return new CKEDITOR.ui.dialog.textInput(b, a, d)
                    }
                },
                l = {
                    build: function(b, a, d) {
                        return new CKEDITOR.ui.dialog[a.type](b, a, d)
                    }
                },
                n = {
                    isChanged: function() {
                        return this.getValue() != this.getInitValue()
                    },
                    reset: function(b) {
                        this.setValue(this.getInitValue(), b)
                    },
                    setInitValue: function() {
                        this._.initValue = this.getValue()
                    },
                    resetInitValue: function() {
                        this._.initValue = this._["default"]
                    },
                    getInitValue: function() {
                        return this._.initValue
                    }
                },
                o = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                    onChange: function(b, a) {
                        this._.domOnChangeRegistered || (b.on("load", function() {
                            this.getInputElement().on("change", function() {
                                b.parts.dialog.isVisible() && this.fire("change", {
                                    value: this.getValue()
                                })
                            }, this)
                        }, this), this._.domOnChangeRegistered = !0);
                        this.on("change", a)
                    }
                }, !0),
                s = /^on([A-Z]\w+)/,
                p = function(b) {
                    for (var a in b)(s.test(a) || "title" == a || "type" == a) && delete b[a];
                    return b
                };
            CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                labeledElement: function(b, a, d, e) {
                    if (!(4 > arguments.length)) {
                        var c = i.call(this, a);
                        c.labelId = CKEDITOR.tools.getNextId() + "_label";
                        this._.children = [];
                        CKEDITOR.ui.dialog.uiElement.call(this, b, a, d, "div", null, {
                            role: "presentation"
                        }, function() {
                            var f = [],
                                d = a.required ? " cke_required" : "";
                            "horizontal" != a.labelLayout ? f.push('<label class="cke_dialog_ui_labeled_label' + d + '" ', ' id="' + c.labelId + '"', c.inputId ? ' for="' + c.inputId + '"' : "", (a.labelStyle ? ' style="' + a.labelStyle + '"' : "") + ">", a.label, "</label>", '<div class="cke_dialog_ui_labeled_content"' + (a.controlStyle ? ' style="' + a.controlStyle + '"' : "") + ' role="presentation">', e.call(this, b, a), "</div>") : (d = {
                                type: "hbox",
                                widths: a.widths,
                                padding: 0,
                                children: [{
                                    type: "html",
                                    html: '<label class="cke_dialog_ui_labeled_label' + d + '" id="' + c.labelId + '" for="' + c.inputId + '"' + (a.labelStyle ? ' style="' + a.labelStyle + '"' : "") + ">" + CKEDITOR.tools.htmlEncode(a.label) + "</span>"
                                }, {
                                    type: "html",
                                    html: '<span class="cke_dialog_ui_labeled_content"' + (a.controlStyle ? ' style="' + a.controlStyle + '"' : "") + ">" + e.call(this, b, a) + "</span>"
                                }]
                            }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, d, f));
                            return f.join("")
                        })
                    }
                },
                textInput: function(b, a, d) {
                    if (!(3 > arguments.length)) {
                        i.call(this, a);
                        var e = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput",
                            c = {
                                "class": "cke_dialog_ui_input_" + a.type,
                                id: e,
                                type: a.type
                            };
                        a.validate && (this.validate = a.validate);
                        a.maxLength && (c.maxlength = a.maxLength);
                        a.size && (c.size = a.size);
                        a.inputStyle && (c.style = a.inputStyle);
                        var f = this,
                            h = !1;
                        b.on("load", function() {
                            f.getInputElement().on("keydown", function(a) {
                                a.data.getKeystroke() == 13 && (h = true)
                            });
                            f.getInputElement().on("keyup", function(a) {
                                if (a.data.getKeystroke() == 13 && h) {
                                    b.getButton("ok") && setTimeout(function() {
                                        b.getButton("ok").click()
                                    }, 0);
                                    h = false
                                }
                            }, null, null, 1E3)
                        });
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function() {
                            var b = ['<div class="cke_dialog_ui_input_', a.type, '" role="presentation"'];
                            a.width && b.push('style="width:' + a.width + '" ');
                            b.push("><input ");
                            c["aria-labelledby"] = this._.labelId;
                            this._.required && (c["aria-required"] = this._.required);
                            for (var d in c) b.push(d + '="' + c[d] + '" ');
                            b.push(" /></div>");
                            return b.join("")
                        })
                    }
                },
                textarea: function(b, a, d) {
                    if (!(3 > arguments.length)) {
                        i.call(this, a);
                        var e = this,
                            c = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea",
                            f = {};
                        a.validate && (this.validate = a.validate);
                        f.rows = a.rows || 5;
                        f.cols = a.cols || 20;
                        f["class"] = "cke_dialog_ui_input_textarea " + (a["class"] || "");
                        "undefined" != typeof a.inputStyle && (f.style = a.inputStyle);
                        a.dir && (f.dir = a.dir);
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function() {
                            f["aria-labelledby"] = this._.labelId;
                            this._.required && (f["aria-required"] = this._.required);
                            var a = ['<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea id="', c, '" '],
                                b;
                            for (b in f) a.push(b + '="' + CKEDITOR.tools.htmlEncode(f[b]) + '" ');
                            a.push(">", CKEDITOR.tools.htmlEncode(e._["default"]), "</textarea></div>");
                            return a.join("")
                        })
                    }
                },
                checkbox: function(b, a, d) {
                    if (!(3 > arguments.length)) {
                        var e = i.call(this, a, {
                            "default": !! a["default"]
                        });
                        a.validate && (this.validate = a.validate);
                        CKEDITOR.ui.dialog.uiElement.call(this, b, a, d, "span", null, null, function() {
                            var c = CKEDITOR.tools.extend({}, a, {
                                id: a.id ? a.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox"
                            }, true),
                                d = [],
                                h = CKEDITOR.tools.getNextId() + "_label",
                                g = {
                                    "class": "cke_dialog_ui_checkbox_input",
                                    type: "checkbox",
                                    "aria-labelledby": h
                                };
                            p(c);
                            if (a["default"]) g.checked = "checked";
                            if (typeof c.inputStyle != "undefined") c.style = c.inputStyle;
                            e.checkbox = new CKEDITOR.ui.dialog.uiElement(b, c, d, "input", null, g);
                            d.push(' <label id="', h, '" for="', g.id, '"' + (a.labelStyle ? ' style="' + a.labelStyle + '"' : "") + ">", CKEDITOR.tools.htmlEncode(a.label), "</label>");
                            return d.join("")
                        })
                    }
                },
                radio: function(b, a, d) {
                    if (!(3 > arguments.length)) {
                        i.call(this, a);
                        this._["default"] || (this._["default"] = this._.initValue = a.items[0][1]);
                        a.validate && (this.validate = a.valdiate);
                        var e = [],
                            c = this;
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function() {
                            for (var d = [], h = [], g = a.id ? a.id + "_radio" : CKEDITOR.tools.getNextId() + "_radio", k = 0; k < a.items.length; k++) {
                                var j = a.items[k],
                                    i = j[2] !== void 0 ? j[2] : j[0],
                                    l = j[1] !== void 0 ? j[1] : j[0],
                                    m = CKEDITOR.tools.getNextId() + "_radio_input",
                                    n = m + "_label",
                                    m = CKEDITOR.tools.extend({}, a, {
                                        id: m,
                                        title: null,
                                        type: null
                                    }, true),
                                    i = CKEDITOR.tools.extend({}, m, {
                                        title: i
                                    }, true),
                                    o = {
                                        type: "radio",
                                        "class": "cke_dialog_ui_radio_input",
                                        name: g,
                                        value: l,
                                        "aria-labelledby": n
                                    },
                                    q = [];
                                if (c._["default"] == l) o.checked = "checked";
                                p(m);
                                p(i);
                                if (typeof m.inputStyle != "undefined") m.style = m.inputStyle;
                                e.push(new CKEDITOR.ui.dialog.uiElement(b, m, q, "input", null, o));
                                q.push(" ");
                                new CKEDITOR.ui.dialog.uiElement(b, i, q, "label", null, {
                                    id: n,
                                    "for": o.id
                                }, j[0]);
                                d.push(q.join(""))
                            }
                            new CKEDITOR.ui.dialog.hbox(b, e, d, h);
                            return h.join("")
                        });
                        this._.children = e
                    }
                },
                button: function(b, a, d) {
                    if (arguments.length) {
                        "function" == typeof a && (a = a(b.getParentEditor()));
                        i.call(this, a, {
                            disabled: a.disabled || !1
                        });
                        CKEDITOR.event.implementOn(this);
                        var e = this;
                        b.on("load", function() {
                            var a = this.getElement();
                            (function() {
                                a.on("click", e.click, e);
                                a.on("keydown", function(a) {
                                    a.data.getKeystroke() in {
                                        32: 1
                                    } && (e.click(), a.data.preventDefault())
                                })
                            })();
                            a.unselectable()
                        }, this);
                        var c = CKEDITOR.tools.extend({}, a);
                        delete c.style;
                        var f = CKEDITOR.tools.getNextId() + "_label";
                        CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, "a", null, {
                            style: a.style,
                            href: "javascript:void(0)",
                            title: a.label,
                            hidefocus: "true",
                            "class": a["class"],
                            role: "button",
                            "aria-labelledby": f
                        }, '<span id="' + f + '" class="cke_dialog_ui_button">' + CKEDITOR.tools.htmlEncode(a.label) + "</span>")
                    }
                },
                select: function(b, a, d) {
                    if (!(3 > arguments.length)) {
                        var e = i.call(this, a);
                        a.validate && (this.validate = a.validate);
                        e.inputId = CKEDITOR.tools.getNextId() + "_select";
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function() {
                            var c = CKEDITOR.tools.extend({}, a, {
                                id: a.id ? a.id + "_select" : CKEDITOR.tools.getNextId() + "_select"
                            }, true),
                                d = [],
                                h = [],
                                g = {
                                    id: e.inputId,
                                    "class": "cke_dialog_ui_input_select",
                                    "aria-labelledby": this._.labelId
                                };
                            d.push('<div class="cke_dialog_ui_input_', a.type, '" role="presentation"');
                            a.width && d.push('style="width:' + a.width + '" ');
                            d.push(">");
                            if (a.size != void 0) g.size = a.size;
                            if (a.multiple != void 0) g.multiple = a.multiple;
                            p(c);
                            for (var k = 0, j; k < a.items.length && (j = a.items[k]); k++) h.push('<option value="', CKEDITOR.tools.htmlEncode(j[1] !== void 0 ? j[1] : j[0]).replace(/"/g, "&quot;"), '" /> ', CKEDITOR.tools.htmlEncode(j[0]));
                            if (typeof c.inputStyle != "undefined") c.style = c.inputStyle;
                            e.select = new CKEDITOR.ui.dialog.uiElement(b, c, d, "select", null, g, h.join(""));
                            d.push("</div>");
                            return d.join("")
                        })
                    }
                },
                file: function(b, a, d) {
                    if (!(3 > arguments.length)) {
                        void 0 === a["default"] && (a["default"] = "");
                        var e = CKEDITOR.tools.extend(i.call(this, a), {
                            definition: a,
                            buttons: []
                        });
                        a.validate && (this.validate = a.validate);
                        b.on("load", function() {
                            CKEDITOR.document.getById(e.frameId).getParent().addClass("cke_dialog_ui_input_file")
                        });
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function() {
                            e.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
                            var b = ['<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" role="presentation" id="', e.frameId, '" title="', a.label, '" src="javascript:void('];
                            b.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0");
                            b.push(')"></iframe>');
                            return b.join("")
                        })
                    }
                },
                fileButton: function(b, a, d) {
                    if (!(3 > arguments.length)) {
                        i.call(this, a);
                        var e = this;
                        a.validate && (this.validate = a.validate);
                        var c = CKEDITOR.tools.extend({}, a),
                            f = c.onClick;
                        c.className = (c.className ? c.className + " " : "") + "cke_dialog_ui_button";
                        c.onClick = function(c) {
                            var d = a["for"];
                            if (!f || f.call(this, c) !== false) {
                                b.getContentElement(d[0], d[1]).submit();
                                this.disable()
                            }
                        };
                        b.on("load", function() {
                            b.getContentElement(a["for"][0], a["for"][1])._.buttons.push(e)
                        });
                        CKEDITOR.ui.dialog.button.call(this, b, c, d)
                    }
                },
                html: function() {
                    var b = /^\s*<[\w:]+\s+([^>]*)?>/,
                        a = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,
                        d = /\/$/;
                    return function(e, c, f) {
                        if (!(3 > arguments.length)) {
                            var h = [],
                                g = c.html;
                            "<" != g.charAt(0) && (g = "<span>" + g + "</span>");
                            var k = c.focus;
                            if (k) {
                                var j = this.focus;
                                this.focus = function() {
                                    ("function" == typeof k ? k : j).call(this);
                                    this.fire("focus")
                                };
                                c.isFocusable && (this.isFocusable = this.isFocusable);
                                this.keyboardFocusable = !0
                            }
                            CKEDITOR.ui.dialog.uiElement.call(this, e, c, h, "span", null, null, "");
                            h = h.join("").match(b);
                            g = g.match(a) || ["", "", ""];
                            d.test(g[1]) && (g[1] = g[1].slice(0, -1), g[2] = "/" + g[2]);
                            f.push([g[1], " ", h[1] || "", g[2]].join(""))
                        }
                    }
                }(),
                fieldset: function(b, a, d, e, c) {
                    var f = c.label;
                    this._ = {
                        children: a
                    };
                    CKEDITOR.ui.dialog.uiElement.call(this, b, c, e, "fieldset", null, null, function() {
                        var a = [];
                        f && a.push("<legend" + (c.labelStyle ? ' style="' + c.labelStyle + '"' : "") + ">" + f + "</legend>");
                        for (var b = 0; b < d.length; b++) a.push(d[b]);
                        return a.join("")
                    })
                }
            }, !0);
            CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement;
            CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setLabel: function(b) {
                    var a = CKEDITOR.document.getById(this._.labelId);
                    1 > a.getChildCount() ? (new CKEDITOR.dom.text(b, CKEDITOR.document)).appendTo(a) : a.getChild(0).$.nodeValue = b;
                    return this
                },
                getLabel: function() {
                    var b = CKEDITOR.document.getById(this._.labelId);
                    return !b || 1 > b.getChildCount() ? "" : b.getChild(0).getText()
                },
                eventProcessors: o
            }, !0);
            CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                click: function() {
                    return !this._.disabled ? this.fire("click", {
                        dialog: this._.dialog
                    }) : !1
                },
                enable: function() {
                    this._.disabled = !1;
                    var b = this.getElement();
                    b && b.removeClass("cke_disabled")
                },
                disable: function() {
                    this._.disabled = !0;
                    this.getElement().addClass("cke_disabled")
                },
                isVisible: function() {
                    return this.getElement().getFirst().isVisible()
                },
                isEnabled: function() {
                    return !this._.disabled
                },
                eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                    onClick: function(b, a) {
                        this.on("click", function() {
                            a.apply(this, arguments)
                        })
                    }
                }, !0),
                accessKeyUp: function() {
                    this.click()
                },
                accessKeyDown: function() {
                    this.focus()
                },
                keyboardFocusable: !0
            }, !0);
            CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function() {
                    return CKEDITOR.document.getById(this._.inputId)
                },
                focus: function() {
                    var b = this.selectParentTab();
                    setTimeout(function() {
                        var a = b.getInputElement();
                        a && a.$.focus()
                    }, 0)
                },
                select: function() {
                    var b = this.selectParentTab();
                    setTimeout(function() {
                        var a = b.getInputElement();
                        a && (a.$.focus(), a.$.select())
                    }, 0)
                },
                accessKeyUp: function() {
                    this.select()
                },
                setValue: function(b) {
                    !b && (b = "");
                    return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments)
                },
                keyboardFocusable: !0
            }, n, !0);
            CKEDITOR.ui.dialog.textarea.prototype = new CKEDITOR.ui.dialog.textInput;
            CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function() {
                    return this._.select.getElement()
                },
                add: function(b, a, d) {
                    var e = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document),
                        c = this.getInputElement().$;
                    e.$.text = b;
                    e.$.value = void 0 === a || null === a ? b : a;
                    void 0 === d || null === d ? CKEDITOR.env.ie ? c.add(e.$) : c.add(e.$, null) : c.add(e.$, d);
                    return this
                },
                remove: function(b) {
                    this.getInputElement().$.remove(b);
                    return this
                },
                clear: function() {
                    for (var b = this.getInputElement().$; 0 < b.length;) b.remove(0);
                    return this
                },
                keyboardFocusable: !0
            }, n, !0);
            CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                getInputElement: function() {
                    return this._.checkbox.getElement()
                },
                setValue: function(b, a) {
                    this.getInputElement().$.checked = b;
                    !a && this.fire("change", {
                        value: b
                    })
                },
                getValue: function() {
                    return this.getInputElement().$.checked
                },
                accessKeyUp: function() {
                    this.setValue(!this.getValue())
                },
                eventProcessors: {
                    onChange: function(b, a) {
                        if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return o.onChange.apply(this, arguments);
                        b.on("load", function() {
                            var a = this._.checkbox.getElement();
                            a.on("propertychange", function(b) {
                                b = b.data.$;
                                "checked" == b.propertyName && this.fire("change", {
                                    value: a.$.checked
                                })
                            }, this)
                        }, this);
                        this.on("change", a);
                        return null
                    }
                },
                keyboardFocusable: !0
            }, n, !0);
            CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setValue: function(b, a) {
                    for (var d = this._.children, e, c = 0; c < d.length && (e = d[c]); c++) e.getElement().$.checked = e.getValue() == b;
                    !a && this.fire("change", {
                        value: b
                    })
                },
                getValue: function() {
                    for (var b = this._.children, a = 0; a < b.length; a++) if (b[a].getElement().$.checked) return b[a].getValue();
                    return null
                },
                accessKeyUp: function() {
                    var b = this._.children,
                        a;
                    for (a = 0; a < b.length; a++) if (b[a].getElement().$.checked) {
                        b[a].getElement().focus();
                        return
                    }
                    b[0].getElement().focus()
                },
                eventProcessors: {
                    onChange: function(b, a) {
                        if (CKEDITOR.env.ie) b.on("load", function() {
                            for (var a = this._.children, b = this, c = 0; c < a.length; c++) a[c].getElement().on("propertychange", function(a) {
                                a = a.data.$;
                                "checked" == a.propertyName && this.$.checked && b.fire("change", {
                                    value: this.getAttribute("value")
                                })
                            })
                        }, this), this.on("change", a);
                        else return o.onChange.apply(this, arguments);
                        return null
                    }
                },
                keyboardFocusable: !0
            }, n, !0);
            CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, n, {
                getInputElement: function() {
                    var b = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
                    return 0 < b.$.forms.length ? new CKEDITOR.dom.element(b.$.forms[0].elements[0]) : this.getElement()
                },
                submit: function() {
                    this.getInputElement().getParent().$.submit();
                    return this
                },
                getAction: function() {
                    return this.getInputElement().getParent().$.action
                },
                registerEvents: function(b) {
                    var a = /^on([A-Z]\w+)/,
                        d, e = function(a, b, c, d) {
                            a.on("formLoaded", function() {
                                a.getInputElement().on(c, d, a)
                            })
                        },
                        c;
                    for (c in b) if (d = c.match(a)) this.eventProcessors[c] ? this.eventProcessors[c].call(this, this._.dialog, b[c]) : e(this, this._.dialog, d[1].toLowerCase(), b[c]);
                    return this
                },
                reset: function() {
                    function b() {
                        d.$.open();
                        var b = "";
                        e.size && (b = e.size - (CKEDITOR.env.ie ? 7 : 0));
                        var i = a.frameId + "_input";
                        d.$.write(['<html dir="' + g + '" lang="' + k + '"><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">', '<form enctype="multipart/form-data" method="POST" dir="' + g + '" lang="' + k + '" action="', CKEDITOR.tools.htmlEncode(e.action), '"><label id="', a.labelId, '" for="', i, '" style="display:none">', CKEDITOR.tools.htmlEncode(e.label), '</label><input id="', i, '" aria-labelledby="', a.labelId, '" type="file" name="', CKEDITOR.tools.htmlEncode(e.id || "cke_upload"), '" size="', CKEDITOR.tools.htmlEncode(0 < b ? b : ""), '" /></form></body></html><script>', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + f + ");", "window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction(" + h + ")}", "<\/script>"].join(""));
                        d.$.close();
                        for (b = 0; b < c.length; b++) c[b].enable()
                    }
                    var a = this._,
                        d = CKEDITOR.document.getById(a.frameId).getFrameDocument(),
                        e = a.definition,
                        c = a.buttons,
                        f = this.formLoadedNumber,
                        h = this.formUnloadNumber,
                        g = a.dialog._.editor.lang.dir,
                        k = a.dialog._.editor.langCode;
                    f || (f = this.formLoadedNumber = CKEDITOR.tools.addFunction(function() {
                        this.fire("formLoaded")
                    }, this), h = this.formUnloadNumber = CKEDITOR.tools.addFunction(function() {
                        this.getInputElement().clearCustomData()
                    }, this), this.getDialog()._.editor.on("destroy", function() {
                        CKEDITOR.tools.removeFunction(f);
                        CKEDITOR.tools.removeFunction(h)
                    }));
                    CKEDITOR.env.gecko ? setTimeout(b, 500) : b()
                },
                getValue: function() {
                    return this.getInputElement().$.value || ""
                },
                setInitValue: function() {
                    this._.initValue = ""
                },
                eventProcessors: {
                    onChange: function(b, a) {
                        this._.domOnChangeRegistered || (this.on("formLoaded", function() {
                            this.getInputElement().on("change", function() {
                                this.fire("change", {
                                    value: this.getValue()
                                })
                            }, this)
                        }, this), this._.domOnChangeRegistered = !0);
                        this.on("change", a)
                    }
                },
                keyboardFocusable: !0
            }, !0);
            CKEDITOR.ui.dialog.fileButton.prototype = new CKEDITOR.ui.dialog.button;
            CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);
            CKEDITOR.dialog.addUIElement("text", r);
            CKEDITOR.dialog.addUIElement("password", r);
            CKEDITOR.dialog.addUIElement("textarea", l);
            CKEDITOR.dialog.addUIElement("checkbox", l);
            CKEDITOR.dialog.addUIElement("radio", l);
            CKEDITOR.dialog.addUIElement("button", l);
            CKEDITOR.dialog.addUIElement("select", l);
            CKEDITOR.dialog.addUIElement("file", l);
            CKEDITOR.dialog.addUIElement("fileButton", l);
            CKEDITOR.dialog.addUIElement("html", l);
            CKEDITOR.dialog.addUIElement("fieldset", {
                build: function(b, a, d) {
                    for (var e = a.children, c, f = [], h = [], g = 0; g < e.length && (c = e[g]); g++) {
                        var i = [];
                        f.push(i);
                        h.push(CKEDITOR.dialog._.uiElementBuilders[c.type].build(b, c, i))
                    }
                    return new CKEDITOR.ui.dialog[a.type](b, h, f, d, a)
                }
            })
        }
    });
    CKEDITOR.DIALOG_RESIZE_NONE = 0;
    CKEDITOR.DIALOG_RESIZE_WIDTH = 1;
    CKEDITOR.DIALOG_RESIZE_HEIGHT = 2;
    CKEDITOR.DIALOG_RESIZE_BOTH = 3;
    (function() {
        function p() {
            for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--) if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
            return null
        }
        function u() {
            for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++) if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
            return null
        }
        function q(a, b) {
            for (var c = a.$.getElementsByTagName("input"), d = 0, e = c.length; d < e; d++) {
                var g = new CKEDITOR.dom.element(c[d]);
                "text" == g.getAttribute("type").toLowerCase() && (b ? (g.setAttribute("value", g.getCustomData("fake_value") || ""), g.removeCustomData("fake_value")) : (g.setCustomData("fake_value", g.getAttribute("value")), g.setAttribute("value", "")))
            }
        }
        function P(a, b) {
            var c = this.getInputElement();
            c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", !0));
            a || (this.select ? this.select() : this.focus());
            b && alert(b);
            this.fire("validated", {
                valid: a,
                msg: b
            })
        }
        function Q() {
            var a = this.getInputElement();
            a && a.removeAttribute("aria-invalid")
        }
        function R(a) {
            var a = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", S).output({
                id: CKEDITOR.tools.getNextNumber(),
                editorId: a.id,
                langDir: a.lang.dir,
                langCode: a.langCode,
                editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog",
                closeTitle: a.lang.common.close
            })),
                b = a.getChild([0, 0, 0, 0, 0]),
                c = b.getChild(0),
                d = b.getChild(1);
            if (CKEDITOR.env.ie && !CKEDITOR.env.ie6Compat) {
                var e = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())";
                CKEDITOR.dom.element.createFromHtml('<iframe frameBorder="0" class="cke_iframe_shim" src="' + e + '" tabIndex="-1"></iframe>').appendTo(b.getParent())
            }
            c.unselectable();
            d.unselectable();
            return {
                element: a,
                parts: {
                    dialog: a.getChild(0),
                    title: c,
                    close: d,
                    tabs: b.getChild(2),
                    contents: b.getChild([3, 0, 0, 0]),
                    footer: b.getChild([3, 0, 1, 0])
                }
            }
        }
        function H(a, b, c) {
            this.element = b;
            this.focusIndex = c;
            this.tabIndex = 0;
            this.isFocusable = function() {
                return !b.getAttribute("disabled") && b.isVisible()
            };
            this.focus = function() {
                a._.currentFocusIndex = this.focusIndex;
                this.element.focus()
            };
            b.on("keydown", function(a) {
                a.data.getKeystroke() in {
                    32: 1,
                    13: 1
                } && this.fire("click")
            });
            b.on("focus", function() {
                this.fire("mouseover")
            });
            b.on("blur", function() {
                this.fire("mouseout")
            })
        }
        function T(a) {
            function b() {
                a.layout()
            }
            var c = CKEDITOR.document.getWindow();
            c.on("resize", b);
            a.on("hide", function() {
                c.removeListener("resize", b)
            })
        }
        function I(a, b) {
            this._ = {
                dialog: a
            };
            CKEDITOR.tools.extend(this, b)
        }
        function U(a) {
            function b(b) {
                var c = a.getSize(),
                    h = CKEDITOR.document.getWindow().getViewPaneSize(),
                    o = b.data.$.screenX,
                    i = b.data.$.screenY,
                    n = o - d.x,
                    l = i - d.y;
                d = {
                    x: o,
                    y: i
                };
                e.x += n;
                e.y += l;
                a.move(e.x + k[3] < f ? -k[3] : e.x - k[1] > h.width - c.width - f ? h.width - c.width + ("rtl" == g.lang.dir ? 0 : k[1]) : e.x, e.y + k[0] < f ? -k[0] : e.y - k[2] > h.height - c.height - f ? h.height - c.height + k[2] : e.y, 1);
                b.data.preventDefault()
            }
            function c() {
                CKEDITOR.document.removeListener("mousemove", b);
                CKEDITOR.document.removeListener("mouseup", c);
                if (CKEDITOR.env.ie6Compat) {
                    var a = r.getChild(0).getFrameDocument();
                    a.removeListener("mousemove", b);
                    a.removeListener("mouseup", c)
                }
            }
            var d = null,
                e = null;
            a.getElement().getFirst();
            var g = a.getParentEditor(),
                f = g.config.dialog_magnetDistance,
                k = CKEDITOR.skin.margins || [0, 0, 0, 0];
            "undefined" == typeof f && (f = 20);
            a.parts.title.on("mousedown", function(f) {
                d = {
                    x: f.data.$.screenX,
                    y: f.data.$.screenY
                };
                CKEDITOR.document.on("mousemove", b);
                CKEDITOR.document.on("mouseup", c);
                e = a.getPosition();
                if (CKEDITOR.env.ie6Compat) {
                    var j = r.getChild(0).getFrameDocument();
                    j.on("mousemove", b);
                    j.on("mouseup", c)
                }
                f.data.preventDefault()
            }, a)
        }
        function V(a) {
            var b, c;
            function d(e) {
                var d = "rtl" == k.lang.dir,
                    i = o.width,
                    D = o.height,
                    E = i + (e.data.$.screenX - b) * (d ? -1 : 1) * (a._.moved ? 1 : 2),
                    n = D + (e.data.$.screenY - c) * (a._.moved ? 1 : 2),
                    x = a._.element.getFirst(),
                    x = d && x.getComputedStyle("right"),
                    y = a.getPosition();
                y.y + n > h.height && (n = h.height - y.y);
                if ((d ? x : y.x) + E > h.width) E = h.width - (d ? x : y.x);
                if (f == CKEDITOR.DIALOG_RESIZE_WIDTH || f == CKEDITOR.DIALOG_RESIZE_BOTH) i = Math.max(g.minWidth || 0, E - m);
                if (f == CKEDITOR.DIALOG_RESIZE_HEIGHT || f == CKEDITOR.DIALOG_RESIZE_BOTH) D = Math.max(g.minHeight || 0, n - j);
                a.resize(i, D);
                a._.moved || a.layout();
                e.data.preventDefault()
            }
            function e() {
                CKEDITOR.document.removeListener("mouseup", e);
                CKEDITOR.document.removeListener("mousemove", d);
                i && (i.remove(), i = null);
                if (CKEDITOR.env.ie6Compat) {
                    var a = r.getChild(0).getFrameDocument();
                    a.removeListener("mouseup", e);
                    a.removeListener("mousemove", d)
                }
            }
            var g = a.definition,
                f = g.resizable;
            if (f != CKEDITOR.DIALOG_RESIZE_NONE) {
                var k = a.getParentEditor(),
                    m, j, h, o, i, n = CKEDITOR.tools.addFunction(function(f) {
                        o = a.getSize();
                        var g = a.parts.contents;
                        g.$.getElementsByTagName("iframe").length && (i = CKEDITOR.dom.element.createFromHtml('<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>'), g.append(i));
                        j = o.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.opera || CKEDITOR.env.ie && CKEDITOR.env.quirks));
                        m = o.width - a.parts.contents.getSize("width", 1);
                        b = f.screenX;
                        c = f.screenY;
                        h = CKEDITOR.document.getWindow().getViewPaneSize();
                        CKEDITOR.document.on("mousemove", d);
                        CKEDITOR.document.on("mouseup", e);
                        CKEDITOR.env.ie6Compat && (g = r.getChild(0).getFrameDocument(), g.on("mousemove", d), g.on("mouseup", e));
                        f.preventDefault && f.preventDefault()
                    });
                a.on("load", function() {
                    var b = "";
                    f == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : f == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical");
                    b = CKEDITOR.dom.element.createFromHtml('<div class="cke_resizer' + b + " cke_resizer_" + k.lang.dir + '" title="' + CKEDITOR.tools.htmlEncode(k.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + n + ', event )">' + ("ltr" == k.lang.dir ? "◢" : "◣") + "</div>");
                    a.parts.footer.append(b, 1)
                });
                k.on("destroy", function() {
                    CKEDITOR.tools.removeFunction(n)
                })
            }
        }
        function F(a) {
            a.data.preventDefault(1)
        }
        function J(a) {
            var b = CKEDITOR.document.getWindow(),
                c = a.config,
                d = c.dialog_backgroundCoverColor || "white",
                e = c.dialog_backgroundCoverOpacity,
                g = c.baseFloatZIndex,
                c = CKEDITOR.tools.genKey(d, e, g),
                f = w[c];
            f ? f.show() : (g = ['<div tabIndex="-1" style="position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", g, "; top: 0px; left: 0px; ", !CKEDITOR.env.ie6Compat ? "background-color: " + d : "", '" class="cke_dialog_background_cover">'], CKEDITOR.env.ie6Compat && (d = "<html><body style=\\'background-color:" + d + ";\\'></body></html>", g.push('<iframe hidefocus="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:'), g.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + d + "' );document.close();") + "})())"), g.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>')), g.push("</div>"), f = CKEDITOR.dom.element.createFromHtml(g.join("")), f.setOpacity(void 0 != e ? e : 0.5), f.on("keydown", F), f.on("keypress", F), f.on("keyup", F), f.appendTo(CKEDITOR.document.getBody()), w[c] = f);
            a.focusManager.add(f);
            r = f;
            var a = function() {
                    var a = b.getViewPaneSize();
                    f.setStyles({
                        width: a.width + "px",
                        height: a.height + "px"
                    })
                },
                k = function() {
                    var a = b.getScrollPosition(),
                        c = CKEDITOR.dialog._.currentTop;
                    f.setStyles({
                        left: a.x + "px",
                        top: a.y + "px"
                    });
                    if (c) {
                        do {
                            a = c.getPosition();
                            c.move(a.x, a.y)
                        } while (c = c._.parentDialog)
                    }
                };
            G = a;
            b.on("resize", a);
            a();
            (!CKEDITOR.env.mac || !CKEDITOR.env.webkit) && f.focus();
            if (CKEDITOR.env.ie6Compat) {
                var m = function() {
                        k();
                        arguments.callee.prevScrollHandler.apply(this, arguments)
                    };
                b.$.setTimeout(function() {
                    m.prevScrollHandler = window.onscroll ||
                    function() {};
                    window.onscroll = m
                }, 0);
                k()
            }
        }
        function K(a) {
            r && (a.focusManager.remove(r), a = CKEDITOR.document.getWindow(), r.hide(), a.removeListener("resize", G), CKEDITOR.env.ie6Compat && a.$.setTimeout(function() {
                window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null
            }, 0), G = null)
        }
        var s = CKEDITOR.tools.cssLength,
            S = '<div class="cke_reset_all {editorId} {editorDialogClass}" dir="{langDir}" lang="{langCode}" role="dialog" aria-labelledby="cke_dialog_title_{id}"><table class="cke_dialog ' + CKEDITOR.env.cssClass + ' cke_{langDir}" style="position:absolute" role="presentation"><tr><td role="presentation"><div class="cke_dialog_body" role="presentation"><div id="cke_dialog_title_{id}" class="cke_dialog_title" role="presentation"></div><a id="cke_dialog_close_button_{id}" class="cke_dialog_close_button" href="javascript:void(0)" title="{closeTitle}" role="button"><span class="cke_label">X</span></a><div id="cke_dialog_tabs_{id}" class="cke_dialog_tabs" role="tablist"></div><table class="cke_dialog_contents" role="presentation"><tr><td id="cke_dialog_contents_{id}" class="cke_dialog_contents_body" role="presentation"></td></tr><tr><td id="cke_dialog_footer_{id}" class="cke_dialog_footer" role="presentation"></td></tr></table></div></td></tr></table></div>';
        CKEDITOR.dialog = function(a, b) {
            function c() {
                var a = l._.focusList;
                a.sort(function(a, b) {
                    return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex
                });
                for (var b = a.length, c = 0; c < b; c++) a[c].focusIndex = c
            }
            function d(a) {
                var b = l._.focusList,
                    a = a || 0;
                if (!(1 > b.length)) {
                    var c = l._.currentFocusIndex;
                    try {
                        b[c].getInputElement().$.blur()
                    } catch (f) {}
                    for (var d = c = (c + a + b.length) % b.length; a && !b[d].isFocusable() && !(d = (d + a + b.length) % b.length, d == c););
                    b[d].focus();
                    "text" == b[d].type && b[d].select()
                }
            }
            function e(b) {
                if (l == CKEDITOR.dialog._.currentTop) {
                    var c = b.data.getKeystroke(),
                        f = "rtl" == a.lang.dir;
                    o = i = 0;
                    if (9 == c || c == CKEDITOR.SHIFT + 9) c = c == CKEDITOR.SHIFT + 9, l._.tabBarMode ? (c = c ? p.call(l) : u.call(l), l.selectPage(c), l._.tabs[c][0].focus()) : d(c ? -1 : 1), o = 1;
                    else if (c == CKEDITOR.ALT + 121 && !l._.tabBarMode && 1 < l.getPageCount()) l._.tabBarMode = !0, l._.tabs[l._.currentTabId][0].focus(), o = 1;
                    else if ((37 == c || 39 == c) && l._.tabBarMode) c = c == (f ? 39 : 37) ? p.call(l) : u.call(l), l.selectPage(c), l._.tabs[c][0].focus(), o = 1;
                    else if ((13 == c || 32 == c) && l._.tabBarMode) this.selectPage(this._.currentTabId), this._.tabBarMode = !1, this._.currentFocusIndex = -1, d(1), o = 1;
                    else if (13 == c) {
                        c = b.data.getTarget();
                        if (!c.is("a", "button", "select", "textarea") && (!c.is("input") || "button" != c.$.type))(c = this.getButton("ok")) && CKEDITOR.tools.setTimeout(c.click, 0, c), o = 1;
                        i = 1
                    } else if (27 == c)(c = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(c.click, 0, c) : !1 !== this.fire("cancel", {
                        hide: !0
                    }).hide && this.hide(), i = 1;
                    else return;
                    g(b)
                }
            }
            function g(a) {
                o ? a.data.preventDefault(1) : i && a.data.stopPropagation()
            }
            var f = CKEDITOR.dialog._.dialogDefinitions[b],
                k = CKEDITOR.tools.clone(W),
                m = a.config.dialog_buttonsOrder || "OS",
                j = a.lang.dir,
                h = {},
                o, i;
            ("OS" == m && CKEDITOR.env.mac || "rtl" == m && "ltr" == j || "ltr" == m && "rtl" == j) && k.buttons.reverse();
            f = CKEDITOR.tools.extend(f(a), k);
            f = CKEDITOR.tools.clone(f);
            f = new L(this, f);
            k = R(a);
            this._ = {
                editor: a,
                element: k.element,
                name: b,
                contentSize: {
                    width: 0,
                    height: 0
                },
                size: {
                    width: 0,
                    height: 0
                },
                contents: {},
                buttons: {},
                accessKeyMap: {},
                tabs: {},
                tabIdList: [],
                currentTabId: null,
                currentTabIndex: null,
                pageCount: 0,
                lastTab: null,
                tabBarMode: !1,
                focusList: [],
                currentFocusIndex: 0,
                hasFocus: !1
            };
            this.parts = k.parts;
            CKEDITOR.tools.setTimeout(function() {
                a.fire("ariaWidget", this.parts.contents)
            }, 0, this);
            k = {
                position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed",
                top: 0,
                visibility: "hidden"
            };
            k["rtl" == j ? "right" : "left"] = 0;
            this.parts.dialog.setStyles(k);
            CKEDITOR.event.call(this);
            this.definition = f = CKEDITOR.fire("dialogDefinition", {
                name: b,
                definition: f
            }, a).definition;
            if (!("removeDialogTabs" in a._) && a.config.removeDialogTabs) {
                k = a.config.removeDialogTabs.split(";");
                for (j = 0; j < k.length; j++) if (m = k[j].split(":"), 2 == m.length) {
                    var n = m[0];
                    h[n] || (h[n] = []);
                    h[n].push(m[1])
                }
                a._.removeDialogTabs = h
            }
            if (a._.removeDialogTabs && (h = a._.removeDialogTabs[b])) for (j = 0; j < h.length; j++) f.removeContents(h[j]);
            if (f.onLoad) this.on("load", f.onLoad);
            if (f.onShow) this.on("show", f.onShow);
            if (f.onHide) this.on("hide", f.onHide);
            if (f.onOk) this.on("ok", function(b) {
                a.fire("saveSnapshot");
                setTimeout(function() {
                    a.fire("saveSnapshot")
                }, 0);
                !1 === f.onOk.call(this, b) && (b.data.hide = !1)
            });
            if (f.onCancel) this.on("cancel", function(a) {
                !1 === f.onCancel.call(this, a) && (a.data.hide = !1)
            });
            var l = this,
                C = function(a) {
                    var b = l._.contents,
                        c = !1,
                        d;
                    for (d in b) for (var f in b[d]) if (c = a.call(this, b[d][f])) return
                };
            this.on("ok", function(a) {
                C(function(b) {
                    if (b.validate) {
                        var c = b.validate(this),
                            d = "string" == typeof c || !1 === c;
                        d && (a.data.hide = !1, a.stop());
                        P.call(b, !d, "string" == typeof c ? c : void 0);
                        return d
                    }
                })
            }, this, null, 0);
            this.on("cancel", function(b) {
                C(function(c) {
                    if (c.isChanged()) return confirm(a.lang.common.confirmCancel) || (b.data.hide = !1), !0
                })
            }, this, null, 0);
            this.parts.close.on("click", function(a) {
                !1 !== this.fire("cancel", {
                    hide: !0
                }).hide && this.hide();
                a.data.preventDefault()
            }, this);
            this.changeFocus = d;
            var v = this._.element;
            a.focusManager.add(v, 1);
            this.on("show", function() {
                v.on("keydown", e, this);
                if (CKEDITOR.env.opera || CKEDITOR.env.gecko) v.on("keypress", g, this)
            });
            this.on("hide", function() {
                v.removeListener("keydown", e);
                (CKEDITOR.env.opera || CKEDITOR.env.gecko) && v.removeListener("keypress", g);
                C(function(a) {
                    Q.apply(a)
                })
            });
            this.on("iframeAdded", function(a) {
                (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", e, this, null, 0)
            });
            this.on("show", function() {
                c();
                if (a.config.dialog_startupFocusTab && 1 < l._.pageCount) l._.tabBarMode = !0, l._.tabs[l._.currentTabId][0].focus();
                else if (!this._.hasFocus) if (this._.currentFocusIndex = -1, f.onFocus) {
                    var b = f.onFocus.call(this);
                    b && b.focus()
                } else d(1)
            }, this, null, 4294967295);
            if (CKEDITOR.env.ie6Compat) this.on("load", function() {
                var a = this.getElement(),
                    b = a.getFirst();
                b.remove();
                b.appendTo(a)
            }, this);
            U(this);
            V(this);
            (new CKEDITOR.dom.text(f.title, CKEDITOR.document)).appendTo(this.parts.title);
            for (j = 0; j < f.contents.length; j++)(h = f.contents[j]) && this.addPage(h);
            this.parts.tabs.on("click", function(a) {
                var b = a.data.getTarget();
                b.hasClass("cke_dialog_tab") && (b = b.$.id, this.selectPage(b.substring(4, b.lastIndexOf("_"))), this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, d(1)), a.data.preventDefault())
            }, this);
            j = [];
            h = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, {
                type: "hbox",
                className: "cke_dialog_footer_buttons",
                widths: [],
                children: f.buttons
            }, j).getChild();
            this.parts.footer.setHtml(j.join(""));
            for (j = 0; j < h.length; j++) this._.buttons[h[j].id] = h[j]
        };
        CKEDITOR.dialog.prototype = {
            destroy: function() {
                this.hide();
                this._.element.remove()
            },
            resize: function() {
                return function(a, b) {
                    if (!this._.contentSize || !(this._.contentSize.width == a && this._.contentSize.height == b)) CKEDITOR.dialog.fire("resize", {
                        dialog: this,
                        width: a,
                        height: b
                    }, this._.editor), this.fire("resize", {
                        width: a,
                        height: b
                    }, this._.editor), this.parts.contents.setStyles({
                        width: a + "px",
                        height: b + "px"
                    }), "rtl" == this._.editor.lang.dir && this._.position && (this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10)), this._.contentSize = {
                        width: a,
                        height: b
                    }
                }
            }(),
            getSize: function() {
                var a = this._.element.getFirst();
                return {
                    width: a.$.offsetWidth || 0,
                    height: a.$.offsetHeight || 0
                }
            },
            move: function(a, b, c) {
                var d = this._.element.getFirst(),
                    e = "rtl" == this._.editor.lang.dir,
                    g = "fixed" == d.getComputedStyle("position");
                CKEDITOR.env.ie && d.setStyle("zoom", "100%");
                if (!g || !this._.position || !(this._.position.x == a && this._.position.y == b)) this._.position = {
                    x: a,
                    y: b
                }, g || (g = CKEDITOR.document.getWindow().getScrollPosition(), a += g.x, b += g.y), e && (g = this.getSize(), a = CKEDITOR.document.getWindow().getViewPaneSize().width - g.width - a), b = {
                    top: (0 < b ? b : 0) + "px"
                }, b[e ? "right" : "left"] = (0 < a ? a : 0) + "px", d.setStyles(b), c && (this._.moved = 1)
            },
            getPosition: function() {
                return CKEDITOR.tools.extend({}, this._.position)
            },
            show: function() {
                var a = this._.element,
                    b = this.definition;
                !a.getParent() || !a.getParent().equals(CKEDITOR.document.getBody()) ? a.appendTo(CKEDITOR.document.getBody()) : a.setStyle("display", "block");
                if (CKEDITOR.env.gecko && 10900 > CKEDITOR.env.version) {
                    var c = this.parts.dialog;
                    c.setStyle("position", "absolute");
                    setTimeout(function() {
                        c.setStyle("position", "fixed")
                    }, 0)
                }
                this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight);
                this.reset();
                this.selectPage(this.definition.contents[0].id);
                null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex);
                this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10);
                null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, J(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2), CKEDITOR.dialog._.currentTop = this);
                a.on("keydown", M);
                a.on(CKEDITOR.env.opera ? "keypress" : "keyup", N);
                this._.hasFocus = !1;
                CKEDITOR.tools.setTimeout(function() {
                    this.layout();
                    T(this);
                    this.parts.dialog.setStyle("visibility", "");
                    this.fireOnce("load", {});
                    CKEDITOR.ui.fire("ready", this);
                    this.fire("show", {});
                    this._.editor.fire("dialogShow", this);
                    this._.parentDialog || this._.editor.focusManager.lock();
                    this.foreach(function(a) {
                        a.setInitValue && a.setInitValue()
                    })
                }, 100, this)
            },
            layout: function() {
                var a = this.parts.dialog,
                    b = this.getSize(),
                    c = CKEDITOR.document.getWindow().getViewPaneSize(),
                    d = (c.width - b.width) / 2,
                    e = (c.height - b.height) / 2;
                CKEDITOR.env.ie6Compat || (b.height + (0 < e ? e : 0) > c.height || b.width + (0 < d ? d : 0) > c.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed"));
                this.move(this._.moved ? this._.position.x : d, this._.moved ? this._.position.y : e)
            },
            foreach: function(a) {
                for (var b in this._.contents) for (var c in this._.contents[b]) a.call(this, this._.contents[b][c]);
                return this
            },
            reset: function() {
                var a = function(a) {
                        a.reset && a.reset(1)
                    };
                return function() {
                    this.foreach(a);
                    return this
                }
            }(),
            setupContent: function() {
                var a = arguments;
                this.foreach(function(b) {
                    b.setup && b.setup.apply(b, a)
                })
            },
            commitContent: function() {
                var a = arguments;
                this.foreach(function(b) {
                    CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur();
                    b.commit && b.commit.apply(b, a)
                })
            },
            hide: function() {
                if (this.parts.dialog.isVisible()) {
                    this.fire("hide", {});
                    this._.editor.fire("dialogHide", this);
                    this.selectPage(this._.tabIdList[0]);
                    var a = this._.element;
                    a.setStyle("display", "none");
                    this.parts.dialog.setStyle("visibility", "hidden");
                    for (X(this); CKEDITOR.dialog._.currentTop != this;) CKEDITOR.dialog._.currentTop.hide();
                    if (this._.parentDialog) {
                        var b = this._.parentDialog.getElement().getFirst();
                        b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2))
                    } else K(this._.editor);
                    if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -= 10;
                    else {
                        CKEDITOR.dialog._.currentZIndex = null;
                        a.removeListener("keydown", M);
                        a.removeListener(CKEDITOR.env.opera ? "keypress" : "keyup", N);
                        var c = this._.editor;
                        c.focus();
                        setTimeout(function() {
                            c.focusManager.unlock()
                        }, 0)
                    }
                    delete this._.parentDialog;
                    this.foreach(function(a) {
                        a.resetInitValue && a.resetInitValue()
                    })
                }
            },
            addPage: function(a) {
                if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
                    for (var b = [], c = a.label ? ' title="' + CKEDITOR.tools.htmlEncode(a.label) + '"' : "", d = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
                        type: "vbox",
                        className: "cke_dialog_page_contents",
                        children: a.elements,
                        expand: !! a.expand,
                        padding: a.padding,
                        style: a.style || "width: 100%;"
                    }, b), e = this._.contents[a.id] = {}, g = d.getChild(), f = 0; d = g.shift();)!d.notAllowed && ("hbox" != d.type && "vbox" != d.type) && f++, e[d.id] = d, "function" == typeof d.getChild && g.push.apply(g, d.getChild());
                    f || (a.hidden = !0);
                    b = CKEDITOR.dom.element.createFromHtml(b.join(""));
                    b.setAttribute("role", "tabpanel");
                    d = CKEDITOR.env;
                    e = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber();
                    c = CKEDITOR.dom.element.createFromHtml(['<a class="cke_dialog_tab"', 0 < this._.pageCount ? " cke_last" : "cke_first", c, a.hidden ? ' style="display:none"' : "", ' id="', e, '"', d.gecko && 10900 <= d.version && !d.hc ? "" : ' href="javascript:void(0)"', ' tabIndex="-1" hidefocus="true" role="tab">', a.label, "</a>"].join(""));
                    b.setAttribute("aria-labelledby", e);
                    this._.tabs[a.id] = [c, b];
                    this._.tabIdList.push(a.id);
                    !a.hidden && this._.pageCount++;
                    this._.lastTab = c;
                    this.updateStyle();
                    b.setAttribute("name", a.id);
                    b.appendTo(this.parts.contents);
                    c.unselectable();
                    this.parts.tabs.append(c);
                    a.accessKey && (O(this, this, "CTRL+" + a.accessKey, Y, Z), this._.accessKeyMap["CTRL+" + a.accessKey] = a.id)
                }
            },
            selectPage: function(a) {
                if (this._.currentTabId != a && !0 !== this.fire("selectPage", {
                    page: a,
                    currentPage: this._.currentTabId
                })) {
                    for (var b in this._.tabs) {
                        var c = this._.tabs[b][0],
                            d = this._.tabs[b][1];
                        b != a && (c.removeClass("cke_dialog_tab_selected"), d.hide());
                        d.setAttribute("aria-hidden", b != a)
                    }
                    var e = this._.tabs[a];
                    e[0].addClass("cke_dialog_tab_selected");
                    CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ? (q(e[1]), e[1].show(), setTimeout(function() {
                        q(e[1], 1)
                    }, 0)) : e[1].show();
                    this._.currentTabId = a;
                    this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
                }
            },
            updateStyle: function() {
                this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page")
            },
            hidePage: function(a) {
                var b = this._.tabs[a] && this._.tabs[a][0];
                b && (1 != this._.pageCount && b.isVisible()) && (a == this._.currentTabId && this.selectPage(p.call(this)), b.hide(), this._.pageCount--, this.updateStyle())
            },
            showPage: function(a) {
                if (a = this._.tabs[a] && this._.tabs[a][0]) a.show(), this._.pageCount++, this.updateStyle()
            },
            getElement: function() {
                return this._.element
            },
            getName: function() {
                return this._.name
            },
            getContentElement: function(a, b) {
                var c = this._.contents[a];
                return c && c[b]
            },
            getValueOf: function(a, b) {
                return this.getContentElement(a, b).getValue()
            },
            setValueOf: function(a, b, c) {
                return this.getContentElement(a, b).setValue(c)
            },
            getButton: function(a) {
                return this._.buttons[a]
            },
            click: function(a) {
                return this._.buttons[a].click()
            },
            disableButton: function(a) {
                return this._.buttons[a].disable()
            },
            enableButton: function(a) {
                return this._.buttons[a].enable()
            },
            getPageCount: function() {
                return this._.pageCount
            },
            getParentEditor: function() {
                return this._.editor
            },
            getSelectedElement: function() {
                return this.getParentEditor().getSelection().getSelectedElement()
            },
            addFocusable: function(a, b) {
                if ("undefined" == typeof b) b = this._.focusList.length, this._.focusList.push(new H(this, a, b));
                else {
                    this._.focusList.splice(b, 0, new H(this, a, b));
                    for (var c = b + 1; c < this._.focusList.length; c++) this._.focusList[c].focusIndex++
                }
            }
        };
        CKEDITOR.tools.extend(CKEDITOR.dialog, {
            add: function(a, b) {
                if (!this._.dialogDefinitions[a] || "function" == typeof b) this._.dialogDefinitions[a] = b
            },
            exists: function(a) {
                return !!this._.dialogDefinitions[a]
            },
            getCurrent: function() {
                return CKEDITOR.dialog._.currentTop
            },
            isTabEnabled: function(a, b, c) {
                a = a.config.removeDialogTabs;
                return !(a && a.match(RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)", "i")))
            },
            okButton: function() {
                var a = function(a, c) {
                        c = c || {};
                        return CKEDITOR.tools.extend({
                            id: "ok",
                            type: "button",
                            label: a.lang.common.ok,
                            "class": "cke_dialog_ui_button_ok",
                            onClick: function(a) {
                                a = a.data.dialog;
                                !1 !== a.fire("ok", {
                                    hide: !0
                                }).hide && a.hide()
                            }
                        }, c, !0)
                    };
                a.type = "button";
                a.override = function(b) {
                    return CKEDITOR.tools.extend(function(c) {
                        return a(c, b)
                    }, {
                        type: "button"
                    }, !0)
                };
                return a
            }(),
            cancelButton: function() {
                var a = function(a, c) {
                        c = c || {};
                        return CKEDITOR.tools.extend({
                            id: "cancel",
                            type: "button",
                            label: a.lang.common.cancel,
                            "class": "cke_dialog_ui_button_cancel",
                            onClick: function(a) {
                                a = a.data.dialog;
                                !1 !== a.fire("cancel", {
                                    hide: !0
                                }).hide && a.hide()
                            }
                        }, c, !0)
                    };
                a.type = "button";
                a.override = function(b) {
                    return CKEDITOR.tools.extend(function(c) {
                        return a(c, b)
                    }, {
                        type: "button"
                    }, !0)
                };
                return a
            }(),
            addUIElement: function(a, b) {
                this._.uiElementBuilders[a] = b
            }
        });
        CKEDITOR.dialog._ = {
            uiElementBuilders: {},
            dialogDefinitions: {},
            currentTop: null,
            currentZIndex: null
        };
        CKEDITOR.event.implementOn(CKEDITOR.dialog);
        CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
        var W = {
            resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
            minWidth: 600,
            minHeight: 400,
            buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton]
        },
            z = function(a, b, c) {
                for (var d = 0, e; e = a[d]; d++) if (e.id == b || c && e[c] && (e = z(e[c], b, c))) return e;
                return null
            },
            A = function(a, b, c, d, e) {
                if (c) {
                    for (var g = 0, f; f = a[g]; g++) {
                        if (f.id == c) return a.splice(g, 0, b), b;
                        if (d && f[d] && (f = A(f[d], b, c, d, !0))) return f
                    }
                    if (e) return null
                }
                a.push(b);
                return b
            },
            B = function(a, b, c) {
                for (var d = 0, e; e = a[d]; d++) {
                    if (e.id == b) return a.splice(d, 1);
                    if (c && e[c] && (e = B(e[c], b, c))) return e
                }
                return null
            },
            L = function(a, b) {
                this.dialog = a;
                for (var c = b.contents, d = 0, e; e = c[d]; d++) c[d] = e && new I(a, e);
                CKEDITOR.tools.extend(this, b)
            };
        L.prototype = {
            getContents: function(a) {
                return z(this.contents, a)
            },
            getButton: function(a) {
                return z(this.buttons, a)
            },
            addContents: function(a, b) {
                return A(this.contents, a, b)
            },
            addButton: function(a, b) {
                return A(this.buttons, a, b)
            },
            removeContents: function(a) {
                B(this.contents, a)
            },
            removeButton: function(a) {
                B(this.buttons, a)
            }
        };
        I.prototype = {
            get: function(a) {
                return z(this.elements, a, "children")
            },
            add: function(a, b) {
                return A(this.elements, a, b, "children")
            },
            remove: function(a) {
                B(this.elements, a, "children")
            }
        };
        var G, w = {},
            r, t = {},
            M = function(a) {
                var b = a.data.$.ctrlKey || a.data.$.metaKey,
                    c = a.data.$.altKey,
                    d = a.data.$.shiftKey,
                    e = String.fromCharCode(a.data.$.keyCode);
                if ((b = t[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + e]) && b.length) b = b[b.length - 1], b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault()
            },
            N = function(a) {
                var b = a.data.$.ctrlKey || a.data.$.metaKey,
                    c = a.data.$.altKey,
                    d = a.data.$.shiftKey,
                    e = String.fromCharCode(a.data.$.keyCode);
                if ((b = t[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + e]) && b.length) b = b[b.length - 1], b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())
            },
            O = function(a, b, c, d, e) {
                (t[c] || (t[c] = [])).push({
                    uiElement: a,
                    dialog: b,
                    key: c,
                    keyup: e || a.accessKeyUp,
                    keydown: d || a.accessKeyDown
                })
            },
            X = function(a) {
                for (var b in t) {
                    for (var c = t[b], d = c.length - 1; 0 <= d; d--)(c[d].dialog == a || c[d].uiElement == a) && c.splice(d, 1);
                    0 === c.length && delete t[b]
                }
            },
            Z = function(a, b) {
                a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b])
            },
            Y = function() {};
        (function() {
            CKEDITOR.ui.dialog = {
                uiElement: function(a, b, c, d, e, g, f) {
                    if (!(4 > arguments.length)) {
                        var k = (d.call ? d(b) : d) || "div",
                            m = ["<", k, " "],
                            j = (e && e.call ? e(b) : e) || {},
                            h = (g && g.call ? g(b) : g) || {},
                            o = (f && f.call ? f.call(this, a, b) : f) || "",
                            i = this.domId = h.id || CKEDITOR.tools.getNextId() + "_uiElement";
                        this.id = b.id;
                        b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (j.display = "none", this.notAllowed = !0);
                        h.id = i;
                        var n = {};
                        b.type && (n["cke_dialog_ui_" + b.type] = 1);
                        b.className && (n[b.className] = 1);
                        b.disabled && (n.cke_disabled = 1);
                        for (var l = h["class"] && h["class"].split ? h["class"].split(" ") : [], i = 0; i < l.length; i++) l[i] && (n[l[i]] = 1);
                        l = [];
                        for (i in n) l.push(i);
                        h["class"] = l.join(" ");
                        b.title && (h.title = b.title);
                        n = (b.style || "").split(";");
                        b.align && (l = b.align, j["margin-left"] = "left" == l ? 0 : "auto", j["margin-right"] = "right" == l ? 0 : "auto");
                        for (i in j) n.push(i + ":" + j[i]);
                        b.hidden && n.push("display:none");
                        for (i = n.length - 1; 0 <= i; i--)"" === n[i] && n.splice(i, 1);
                        0 < n.length && (h.style = (h.style ? h.style + "; " : "") + n.join("; "));
                        for (i in h) m.push(i + '="' + CKEDITOR.tools.htmlEncode(h[i]) + '" ');
                        m.push(">", o, "</", k, ">");
                        c.push(m.join(""));
                        (this._ || (this._ = {})).dialog = a;
                        "boolean" == typeof b.isChanged && (this.isChanged = function() {
                            return b.isChanged
                        });
                        "function" == typeof b.isChanged && (this.isChanged = b.isChanged);
                        "function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function(a) {
                            return function(c) {
                                a.call(this, b.setValue.call(this, c))
                            }
                        }));
                        "function" == typeof b.getValue && (this.getValue = CKEDITOR.tools.override(this.getValue, function(a) {
                            return function() {
                                return b.getValue.call(this, a.call(this))
                            }
                        }));
                        CKEDITOR.event.implementOn(this);
                        this.registerEvents(b);
                        this.accessKeyUp && (this.accessKeyDown && b.accessKey) && O(this, a, "CTRL+" + b.accessKey);
                        var p = this;
                        a.on("load", function() {
                            var b = p.getInputElement();
                            if (b) {
                                var c = p.type in {
                                    checkbox: 1,
                                    ratio: 1
                                } && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? "cke_dialog_ui_focused" : "";
                                b.on("focus", function() {
                                    a._.tabBarMode = false;
                                    a._.hasFocus = true;
                                    p.fire("focus");
                                    c && this.addClass(c)
                                });
                                b.on("blur", function() {
                                    p.fire("blur");
                                    c && this.removeClass(c)
                                })
                            }
                        });
                        this.keyboardFocusable && (this.tabIndex = b.tabIndex || 0, this.focusIndex = a._.focusList.push(this) - 1, this.on("focus", function() {
                            a._.currentFocusIndex = p.focusIndex
                        }));
                        CKEDITOR.tools.extend(this, b)
                    }
                },
                hbox: function(a, b, c, d, e) {
                    if (!(4 > arguments.length)) {
                        this._ || (this._ = {});
                        var g = this._.children = b,
                            f = e && e.widths || null,
                            k = e && e.height || null,
                            m, j = {
                                role: "presentation"
                            };
                        e && e.align && (j.align = e.align);
                        CKEDITOR.ui.dialog.uiElement.call(this, a, e || {
                            type: "hbox"
                        }, d, "table", {}, j, function() {
                            var a = ['<tbody><tr class="cke_dialog_ui_hbox">'];
                            for (m = 0; m < c.length; m++) {
                                var b = "cke_dialog_ui_hbox_child",
                                    d = [];
                                0 === m && (b = "cke_dialog_ui_hbox_first");
                                m == c.length - 1 && (b = "cke_dialog_ui_hbox_last");
                                a.push('<td class="', b, '" role="presentation" ');
                                f ? f[m] && d.push("width:" + s(f[m])) : d.push("width:" + Math.floor(100 / c.length) + "%");
                                k && d.push("height:" + s(k));
                                e && void 0 != e.padding && d.push("padding:" + s(e.padding));
                                CKEDITOR.env.ie && (CKEDITOR.env.quirks && g[m].align) && d.push("text-align:" + g[m].align);
                                0 < d.length && a.push('style="' + d.join("; ") + '" ');
                                a.push(">", c[m], "</td>")
                            }
                            a.push("</tr></tbody>");
                            return a.join("")
                        })
                    }
                },
                vbox: function(a, b, c, d, e) {
                    if (!(3 > arguments.length)) {
                        this._ || (this._ = {});
                        var g = this._.children = b,
                            f = e && e.width || null,
                            k = e && e.heights || null;
                        CKEDITOR.ui.dialog.uiElement.call(this, a, e || {
                            type: "vbox"
                        }, d, "div", null, {
                            role: "presentation"
                        }, function() {
                            var b = ['<table role="presentation" cellspacing="0" border="0" '];
                            b.push('style="');
                            e && e.expand && b.push("height:100%;");
                            b.push("width:" + s(f || "100%"), ";");
                            CKEDITOR.env.webkit && b.push("float:none;");
                            b.push('"');
                            b.push('align="', CKEDITOR.tools.htmlEncode(e && e.align || ("ltr" == a.getParentEditor().lang.dir ? "left" : "right")), '" ');
                            b.push("><tbody>");
                            for (var d = 0; d < c.length; d++) {
                                var h = [];
                                b.push('<tr><td role="presentation" ');
                                f && h.push("width:" + s(f || "100%"));
                                k ? h.push("height:" + s(k[d])) : e && e.expand && h.push("height:" + Math.floor(100 / c.length) + "%");
                                e && void 0 != e.padding && h.push("padding:" + s(e.padding));
                                CKEDITOR.env.ie && (CKEDITOR.env.quirks && g[d].align) && h.push("text-align:" + g[d].align);
                                0 < h.length && b.push('style="', h.join("; "), '" ');
                                b.push(' class="cke_dialog_ui_vbox_child">', c[d], "</td></tr>")
                            }
                            b.push("</tbody></table>");
                            return b.join("")
                        })
                    }
                }
            }
        })();
        CKEDITOR.ui.dialog.uiElement.prototype = {
            getElement: function() {
                return CKEDITOR.document.getById(this.domId)
            },
            getInputElement: function() {
                return this.getElement()
            },
            getDialog: function() {
                return this._.dialog
            },
            setValue: function(a, b) {
                this.getInputElement().setValue(a);
                !b && this.fire("change", {
                    value: a
                });
                return this
            },
            getValue: function() {
                return this.getInputElement().getValue()
            },
            isChanged: function() {
                return !1
            },
            selectParentTab: function() {
                for (var a = this.getInputElement();
                (a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents"););
                if (!a) return this;
                a = a.getAttribute("name");
                this._.dialog._.currentTabId != a && this._.dialog.selectPage(a);
                return this
            },
            focus: function() {
                this.selectParentTab().getInputElement().focus();
                return this
            },
            registerEvents: function(a) {
                var b = /^on([A-Z]\w+)/,
                    c, d = function(a, b, c, d) {
                        b.on("load", function() {
                            a.getInputElement().on(c, d, a)
                        })
                    },
                    e;
                for (e in a) if (c = e.match(b)) this.eventProcessors[e] ? this.eventProcessors[e].call(this, this._.dialog, a[e]) : d(this, this._.dialog, c[1].toLowerCase(), a[e]);
                return this
            },
            eventProcessors: {
                onLoad: function(a, b) {
                    a.on("load", b, this)
                },
                onShow: function(a, b) {
                    a.on("show", b, this)
                },
                onHide: function(a, b) {
                    a.on("hide", b, this)
                }
            },
            accessKeyDown: function() {
                this.focus()
            },
            accessKeyUp: function() {},
            disable: function() {
                var a = this.getElement();
                this.getInputElement().setAttribute("disabled", "true");
                a.addClass("cke_disabled")
            },
            enable: function() {
                var a = this.getElement();
                this.getInputElement().removeAttribute("disabled");
                a.removeClass("cke_disabled")
            },
            isEnabled: function() {
                return !this.getElement().hasClass("cke_disabled")
            },
            isVisible: function() {
                return this.getInputElement().isVisible()
            },
            isFocusable: function() {
                return !this.isEnabled() || !this.isVisible() ? !1 : !0
            }
        };
        CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
            getChild: function(a) {
                if (1 > arguments.length) return this._.children.concat();
                a.splice || (a = [a]);
                return 2 > a.length ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null
            }
        }, !0);
        CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox;
        (function() {
            var a = {
                build: function(a, c, d) {
                    for (var e = c.children, g, f = [], k = [], m = 0; m < e.length && (g = e[m]); m++) {
                        var j = [];
                        f.push(j);
                        k.push(CKEDITOR.dialog._.uiElementBuilders[g.type].build(a, g, j))
                    }
                    return new CKEDITOR.ui.dialog[c.type](a, k, f, d, c)
                }
            };
            CKEDITOR.dialog.addUIElement("hbox", a);
            CKEDITOR.dialog.addUIElement("vbox", a)
        })();
        CKEDITOR.dialogCommand = function(a, b) {
            this.dialogName = a;
            CKEDITOR.tools.extend(this, b, !0)
        };
        CKEDITOR.dialogCommand.prototype = {
            exec: function(a) {
                CKEDITOR.env.opera ? CKEDITOR.tools.setTimeout(function() {
                    a.openDialog(this.dialogName)
                }, 0, this) : a.openDialog(this.dialogName)
            },
            canUndo: !1,
            editorFocus: 1
        };
        (function() {
            var a = /^([a]|[^a])+$/,
                b = /^\d*$/,
                c = /^\d*(?:\.\d+)?$/,
                d = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,
                e = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
                g = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
            CKEDITOR.VALIDATE_OR = 1;
            CKEDITOR.VALIDATE_AND = 2;
            CKEDITOR.dialog.validate = {
                functions: function() {
                    var a = arguments;
                    return function() {
                        var b = this && this.getValue ? this.getValue() : a[0],
                            c = void 0,
                            d = CKEDITOR.VALIDATE_AND,
                            e = [],
                            g;
                        for (g = 0; g < a.length; g++) if ("function" == typeof a[g]) e.push(a[g]);
                        else break;
                        g < a.length && "string" == typeof a[g] && (c = a[g], g++);
                        g < a.length && "number" == typeof a[g] && (d = a[g]);
                        var i = d == CKEDITOR.VALIDATE_AND ? !0 : !1;
                        for (g = 0; g < e.length; g++) i = d == CKEDITOR.VALIDATE_AND ? i && e[g](b) : i || e[g](b);
                        return !i ? c : !0
                    }
                },
                regex: function(a, b) {
                    return function(c) {
                        c = this && this.getValue ? this.getValue() : c;
                        return !a.test(c) ? b : !0
                    }
                },
                notEmpty: function(b) {
                    return this.regex(a, b)
                },
                integer: function(a) {
                    return this.regex(b, a)
                },
                number: function(a) {
                    return this.regex(c, a)
                },
                cssLength: function(a) {
                    return this.functions(function(a) {
                        return e.test(CKEDITOR.tools.trim(a))
                    }, a)
                },
                htmlLength: function(a) {
                    return this.functions(function(a) {
                        return d.test(CKEDITOR.tools.trim(a))
                    }, a)
                },
                inlineStyle: function(a) {
                    return this.functions(function(a) {
                        return g.test(CKEDITOR.tools.trim(a))
                    }, a)
                },
                equals: function(a, b) {
                    return this.functions(function(b) {
                        return b == a
                    }, b)
                },
                notEqual: function(a, b) {
                    return this.functions(function(b) {
                        return b != a
                    }, b)
                }
            };
            CKEDITOR.on("instanceDestroyed", function(a) {
                if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
                    for (var b; b = CKEDITOR.dialog._.currentTop;) b.hide();
                    for (var c in w) w[c].remove();
                    w = {}
                }
                var a = a.editor._.storedDialogs,
                    d;
                for (d in a) a[d].destroy()
            })
        })();
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            openDialog: function(a, b) {
                var c = null,
                    d = CKEDITOR.dialog._.dialogDefinitions[a];
                null === CKEDITOR.dialog._.currentTop && J(this);
                if ("function" == typeof d) c = this._.storedDialogs || (this._.storedDialogs = {}), c = c[a] || (c[a] = new CKEDITOR.dialog(this, a)), b && b.call(c, c), c.show();
                else {
                    if ("failed" == d) throw K(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.');
                    "string" == typeof d && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d), function() {
                        "function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed");
                        this.openDialog(a, b)
                    }, this, 0, 1)
                }
                CKEDITOR.skin.loadPart("dialog");
                return c
            }
        })
    })();
    CKEDITOR.plugins.add("dialog", {
        requires: "dialogui",
        init: function(p) {
            p.on("contentDom", function() {
                var u = p.editable();
                u.attachListener(u, "dblclick", function(q) {
                    if (p.readOnly) return !1;
                    q = {
                        element: q.data.getTarget()
                    };
                    p.fire("doubleclick", q);
                    q.dialog && p.openDialog(q.dialog);
                    return 1
                })
            })
        }
    });
    CKEDITOR.plugins.add("about", {
        requires: "dialog",
        init: function(a) {
            var b = a.addCommand("about", new CKEDITOR.dialogCommand("about"));
            b.modes = {
                wysiwyg: 1,
                source: 1
            };
            b.canUndo = !1;
            b.readOnly = 1;
            a.ui.addButton && a.ui.addButton("About", {
                label: a.lang.about.title,
                command: "about",
                toolbar: "about"
            });
            CKEDITOR.dialog.add("about", this.path + "dialogs/about.js")
        }
    });
    CKEDITOR.plugins.add("basicstyles", {
        init: function(c) {
            var e = 0,
                d = function(g, d, b, a) {
                    if (a) {
                        var a = new CKEDITOR.style(a),
                            f = h[b];
                        f.unshift(a);
                        c.attachStyleStateChange(a, function(a) {
                            !c.readOnly && c.getCommand(b).setState(a)
                        });
                        c.addCommand(b, new CKEDITOR.styleCommand(a, {
                            contentForms: f
                        }));
                        c.ui.addButton && c.ui.addButton(g, {
                            label: d,
                            command: b,
                            toolbar: "basicstyles," + (e += 10)
                        })
                    }
                },
                h = {
                    bold: ["strong", "b", ["span", function(a) {
                        a = a.styles["font-weight"];
                        return "bold" == a || 700 <= +a
                    }]],
                    italic: ["em", "i", ["span", function(a) {
                        return "italic" == a.styles["font-style"]
                    }]],
                    underline: ["u", ["span", function(a) {
                        return "underline" == a.styles["text-decoration"]
                    }]],
                    strike: ["s", "strike", ["span", function(a) {
                        return "line-through" == a.styles["text-decoration"]
                    }]],
                    subscript: ["sub"],
                    superscript: ["sup"]
                },
                b = c.config,
                a = c.lang.basicstyles;
            d("Bold", a.bold, "bold", b.coreStyles_bold);
            d("Italic", a.italic, "italic", b.coreStyles_italic);
            d("Underline", a.underline, "underline", b.coreStyles_underline);
            d("Strike", a.strike, "strike", b.coreStyles_strike);
            d("Subscript", a.subscript, "subscript", b.coreStyles_subscript);
            d("Superscript", a.superscript, "superscript", b.coreStyles_superscript);
            c.setKeystroke([
                [CKEDITOR.CTRL + 66, "bold"],
                [CKEDITOR.CTRL + 73, "italic"],
                [CKEDITOR.CTRL + 85, "underline"]
            ])
        }
    });
    CKEDITOR.config.coreStyles_bold = {
        element: "strong",
        overrides: "b"
    };
    CKEDITOR.config.coreStyles_italic = {
        element: "em",
        overrides: "i"
    };
    CKEDITOR.config.coreStyles_underline = {
        element: "u"
    };
    CKEDITOR.config.coreStyles_strike = {
        element: "s",
        overrides: "strike"
    };
    CKEDITOR.config.coreStyles_subscript = {
        element: "sub"
    };
    CKEDITOR.config.coreStyles_superscript = {
        element: "sup"
    };
    (function() {
        function w(a) {
            function b() {
                var d = a.editable();
                d.on(q, function(a) {
                    (!CKEDITOR.env.ie || !m) && u(a)
                });
                CKEDITOR.env.ie && d.on("paste", function(d) {
                    r || (f(), d.data.preventDefault(), u(d), k("paste") || a.openDialog("paste"))
                });
                CKEDITOR.env.ie && (d.on("contextmenu", h, null, null, 0), d.on("beforepaste", function(a) {
                    a.data && !a.data.$.ctrlKey && h()
                }, null, null, 0));
                d.on("beforecut", function() {
                    !m && l(a)
                });
                var v;
                d.attachListener(CKEDITOR.env.ie ? d : a.document.getDocumentElement(), "mouseup", function() {
                    v = setTimeout(function() {
                        s()
                    }, 0)
                });
                a.on("destroy", function() {
                    clearTimeout(v)
                });
                d.on("keyup", s)
            }
            function e(d) {
                return {
                    type: d,
                    canUndo: "cut" == d,
                    startDisabled: !0,
                    exec: function() {
                        "cut" == this.type && l();
                        var d;
                        var b = this.type;
                        if (CKEDITOR.env.ie) d = k(b);
                        else try {
                            d = a.document.$.execCommand(b, !1, null)
                        } catch (c) {
                            d = !1
                        }
                        d || alert(a.lang.clipboard[this.type + "Error"]);
                        return d
                    }
                }
            }
            function c() {
                return {
                    canUndo: !1,
                    async: !0,
                    exec: function(a, b) {
                        var c = function(b, c) {
                                b && g(b.type, b.dataValue, !! c);
                                a.fire("afterCommandExec", {
                                    name: "paste",
                                    command: e,
                                    returnValue: !! b
                                })
                            },
                            e = this;
                        "string" == typeof b ? c({
                            type: "auto",
                            dataValue: b
                        }, 1) : a.getClipboardData(c)
                    }
                }
            }
            function f() {
                r = 1;
                setTimeout(function() {
                    r = 0
                }, 100)
            }
            function h() {
                m = 1;
                setTimeout(function() {
                    m = 0
                }, 10)
            }
            function k(d) {
                var b = a.document,
                    c = b.getBody(),
                    e = !1,
                    l = function() {
                        e = !0
                    };
                c.on(d, l);
                (7 < CKEDITOR.env.version ? b.$ : b.$.selection.createRange()).execCommand(d);
                c.removeListener(d, l);
                return e
            }
            function g(d, b, c) {
                d = {
                    type: d
                };
                if (c && !a.fire("beforePaste", d) || !b) return !1;
                d.dataValue = b;
                return a.fire("paste", d)
            }
            function l() {
                if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                    var d = a.getSelection(),
                        b, c, e;
                    if (d.getType() == CKEDITOR.SELECTION_ELEMENT && (b = d.getSelectedElement())) c = d.getRanges()[0], e = a.document.createText(""), e.insertBefore(b), c.setStartBefore(e), c.setEndAfter(b), d.selectRanges([c]), setTimeout(function() {
                        b.getParent() && (e.remove(), d.selectElement(b))
                    }, 0)
                }
            }
            function j(d, b) {
                var c = a.document,
                    e = a.editable(),
                    l = function(a) {
                        a.cancel()
                    },
                    j = CKEDITOR.env.gecko && 10902 >= CKEDITOR.env.version;
                if (!c.getById("cke_pastebin")) {
                    var f = a.getSelection(),
                        h = f.createBookmarks(),
                        i = new CKEDITOR.dom.element(e.is("body") && !CKEDITOR.env.ie && !CKEDITOR.env.opera ? "body" : "div", c);
                    i.setAttribute("id", "cke_pastebin");
                    CKEDITOR.env.opera && i.appendBogus();
                    var o = 0,
                        c = c.getWindow();
                    j ? (i.insertAfter(h[0].startNode), i.setStyle("display", "inline")) : (CKEDITOR.env.webkit ? (e.append(i), i.addClass("cke_editable"), o = (e.is("body") ? e : CKEDITOR.dom.element.get(i.$.offsetParent)).getDocumentPosition().y) : e.getAscendant(CKEDITOR.env.ie || CKEDITOR.env.opera ? "body" : "html", 1).append(i), i.setStyles({
                        position: "absolute",
                        top: c.getScrollPosition().y - o + 10 + "px",
                        width: "1px",
                        height: Math.max(1, c.getViewPaneSize().height - 20) + "px",
                        overflow: "hidden",
                        margin: 0,
                        padding: 0
                    }));
                    (j = i.getParent().isReadOnly()) ? (i.setOpacity(0), i.setAttribute("contenteditable", !0)) : i.setStyle("ltr" == a.config.contentsLangDirection ? "left" : "right", "-1000px");
                    a.on("selectionChange", l, null, null, 0);
                    j && i.focus();
                    j = new CKEDITOR.dom.range(i);
                    j.selectNodeContents(i);
                    var g = j.select();
                    if (CKEDITOR.env.ie) var k = e.once("blur", function() {
                        a.lockSelection(g)
                    });
                    var m = CKEDITOR.document.getWindow().getScrollPosition().y;
                    setTimeout(function() {
                        if (CKEDITOR.env.webkit || CKEDITOR.env.opera) CKEDITOR.document[CKEDITOR.env.webkit ? "getBody" : "getDocumentElement"]().$.scrollTop = m;
                        k && k.removeListener();
                        CKEDITOR.env.ie && e.focus();
                        f.selectBookmarks(h);
                        i.remove();
                        var d;
                        if (CKEDITOR.env.webkit && (d = i.getFirst()) && d.is && d.hasClass("Apple-style-span")) i = d;
                        a.removeListener("selectionChange", l);
                        b(i.getHtml())
                    }, 0)
                }
            }
            function o() {
                if (CKEDITOR.env.ie) {
                    a.focus();
                    f();
                    var d = a.focusManager;
                    d.lock();
                    if (a.editable().fire(q) && !k("paste")) return d.unlock(), !1;
                    d.unlock()
                } else try {
                    if (a.editable().fire(q) && !a.document.$.execCommand("Paste", !1, null)) throw 0;
                } catch (b) {
                    return !1
                }
                return !0
            }
            function p(d) {
                if ("wysiwyg" == a.mode) switch (d.data.keyCode) {
                case CKEDITOR.CTRL + 86:
                case CKEDITOR.SHIFT + 45:
                    d = a.editable();
                    f();
                    !CKEDITOR.env.ie && d.fire("beforepaste");
                    (CKEDITOR.env.opera || CKEDITOR.env.gecko && 10900 > CKEDITOR.env.version) && d.fire("paste");
                    break;
                case CKEDITOR.CTRL + 88:
                case CKEDITOR.SHIFT + 46:
                    a.fire("saveSnapshot"), setTimeout(function() {
                        a.fire("saveSnapshot")
                    }, 0)
                }
            }
            function u(d) {
                var b = {
                    type: "auto"
                },
                    c = a.fire("beforePaste", b);
                j(d, function(a) {
                    a = a.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, "");
                    c && g(b.type, a, 0, 1)
                })
            }
            function s() {
                if ("wysiwyg" == a.mode) {
                    var b = n("Paste");
                    a.getCommand("cut").setState(n("Cut"));
                    a.getCommand("copy").setState(n("Copy"));
                    a.getCommand("paste").setState(b);
                    a.fire("pasteState", b)
                }
            }
            function n(b) {
                var c;
                if (t && b in {
                    Paste: 1,
                    Cut: 1
                }) return CKEDITOR.TRISTATE_DISABLED;
                if ("Paste" == b) {
                    CKEDITOR.env.ie && (m = 1);
                    try {
                        c = a.document.$.queryCommandEnabled(b) || CKEDITOR.env.webkit
                    } catch (e) {}
                    m = 0
                } else b = a.getSelection(), c = b.getRanges(), c = b.getType() != CKEDITOR.SELECTION_NONE && !(1 == c.length && c[0].collapsed);
                return c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
            }
            var m = 0,
                r = 0,
                t = 0,
                q = CKEDITOR.env.ie ? "beforepaste" : "paste";
            (function() {
                a.on("key", p);
                a.on("contentDom", b);
                a.on("selectionChange", function(a) {
                    t = a.data.selection.getRanges()[0].checkReadOnly();
                    s()
                });
                a.contextMenu && a.contextMenu.addListener(function(a, b) {
                    t = b.getRanges()[0].checkReadOnly();
                    return {
                        cut: n("Cut"),
                        copy: n("Copy"),
                        paste: n("Paste")
                    }
                })
            })();
            (function() {
                function b(c, d, e, l, j) {
                    var f = a.lang.clipboard[d];
                    a.addCommand(d, e);
                    a.ui.addButton && a.ui.addButton(c, {
                        label: f,
                        command: d,
                        toolbar: "clipboard," + l
                    });
                    a.addMenuItems && a.addMenuItem(d, {
                        label: f,
                        command: d,
                        group: "clipboard",
                        order: j
                    })
                }
                b("Cut", "cut", e("cut"), 10, 1);
                b("Copy", "copy", e("copy"), 20, 4);
                b("Paste", "paste", c(), 30, 8)
            })();
            a.getClipboardData = function(b, c) {
                function e(a) {
                    a.removeListener();
                    a.cancel();
                    c(a.data)
                }
                function l(a) {
                    a.removeListener();
                    a.cancel();
                    g = !0;
                    c({
                        type: h,
                        dataValue: a.data
                    })
                }
                function j() {
                    this.customTitle = b && b.title
                }
                var f = !1,
                    h = "auto",
                    g = !1;
                c || (c = b, b = null);
                a.on("paste", e, null, null, 0);
                a.on("beforePaste", function(a) {
                    a.removeListener();
                    f = true;
                    h = a.data.type
                }, null, null, 1E3);
                !1 === o() && (a.removeListener("paste", e), f && a.fire("pasteDialog", j) ? (a.on("pasteDialogCommit", l), a.on("dialogHide", function(a) {
                    a.removeListener();
                    a.data.removeListener("pasteDialogCommit", l);
                    setTimeout(function() {
                        g || c(null)
                    }, 10)
                })) : c(null))
            }
        }
        function x(a) {
            if (CKEDITOR.env.webkit) {
                if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html"
            } else if (CKEDITOR.env.ie) {
                if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html"
            } else if (CKEDITOR.env.gecko || CKEDITOR.env.opera) {
                if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html"
            } else return "html";
            return "htmlifiedtext"
        }
        function y(a, b) {
            function e(a) {
                return CKEDITOR.tools.repeat("</p><p>", ~~ (a / 2)) + (1 == a % 2 ? "<br>" : "")
            }
            b = b.replace(/\s+/g, " ").replace(/> +</g, "><").replace(/<br ?\/>/gi, "<br>");
            b = b.replace(/<\/?[A-Z]+>/g, function(a) {
                return a.toLowerCase()
            });
            if (b.match(/^[^<]$/)) return b;
            CKEDITOR.env.webkit && -1 < b.indexOf("<div>") && (b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "<br>").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "<div></div>"), b.match(/<div>(<br>|)<\/div>/) && (b = "<p>" + b.replace(/(<div>(<br>|)<\/div>)+/g, function(a) {
                return e(a.split("</div><div>").length + 1)
            }) + "</p>"), b = b.replace(/<\/div><div>/g, "<br>"), b = b.replace(/<\/?div>/g, ""));
            if ((CKEDITOR.env.gecko || CKEDITOR.env.opera) && a.enterMode != CKEDITOR.ENTER_BR) CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "<br>")), -1 < b.indexOf("<br><br>") && (b = "<p>" + b.replace(/(<br>){2,}/g, function(a) {
                return e(a.length / 4)
            }) + "</p>");
            return p(a, b)
        }
        function z() {
            var a = new CKEDITOR.htmlParser.filter,
                b = {
                    blockquote: 1,
                    dl: 1,
                    fieldset: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1,
                    ol: 1,
                    p: 1,
                    table: 1,
                    ul: 1
                },
                e = CKEDITOR.tools.extend({
                    br: 0
                }, CKEDITOR.dtd.$inline),
                c = {
                    p: 1,
                    br: 1,
                    "cke:br": 1
                },
                f = CKEDITOR.dtd,
                h = CKEDITOR.tools.extend({
                    area: 1,
                    basefont: 1,
                    embed: 1,
                    iframe: 1,
                    map: 1,
                    object: 1,
                    param: 1
                }, CKEDITOR.dtd.$nonBodyContent, CKEDITOR.dtd.$cdata),
                k = function(a) {
                    delete a.name;
                    a.add(new CKEDITOR.htmlParser.text(" "))
                },
                g = function(a) {
                    for (var b = a, c;
                    (b = b.next) && b.name && b.name.match(/^h\d$/);) {
                        c = new CKEDITOR.htmlParser.element("cke:br");
                        c.isEmpty = !0;
                        for (a.add(c); c = b.children.shift();) a.add(c)
                    }
                };
            a.addRules({
                elements: {
                    h1: g,
                    h2: g,
                    h3: g,
                    h4: g,
                    h5: g,
                    h6: g,
                    img: function(a) {
                        var a = CKEDITOR.tools.trim(a.attributes.alt || ""),
                            b = " ";
                        a && !a.match(/(^http|\.(jpe?g|gif|png))/i) && (b = " [" + a + "] ");
                        return new CKEDITOR.htmlParser.text(b)
                    },
                    td: k,
                    th: k,
                    $: function(a) {
                        var j = a.name,
                            g;
                        if (h[j]) return !1;
                        delete a.attributes;
                        if ("br" == j) return a;
                        if (b[j]) a.name = "p";
                        else if (e[j]) delete a.name;
                        else if (f[j]) {
                            g = new CKEDITOR.htmlParser.element("cke:br");
                            g.isEmpty = !0;
                            if (CKEDITOR.dtd.$empty[j]) return g;
                            a.add(g, 0);
                            g = g.clone();
                            g.isEmpty = !0;
                            a.add(g);
                            delete a.name
                        }
                        c[a.name] || delete a.name;
                        return a
                    }
                }
            });
            return a
        }
        function A(a, b, e) {
            var b = new CKEDITOR.htmlParser.fragment.fromHtml(b),
                c = new CKEDITOR.htmlParser.basicWriter;
            b.writeHtml(c, e);
            var b = c.getHtml(),
                b = b.replace(/\s*(<\/?[a-z:]+ ?\/?>)\s*/g, "$1").replace(/(<cke:br \/>){2,}/g, "<cke:br />").replace(/(<cke:br \/>)(<\/?p>|<br \/>)/g, "$2").replace(/(<\/?p>|<br \/>)(<cke:br \/>)/g, "$1").replace(/<(cke:)?br( \/)?>/g, "<br>").replace(/<p><\/p>/g, ""),
                f = 0,
                b = b.replace(/<\/?p>/g, function(a) {
                    if ("<p>" == a) {
                        if (1 < ++f) return "</p><p>"
                    } else if (0 < --f) return "</p><p>";
                    return a
                }).replace(/<p><\/p>/g, "");
            return p(a, b)
        }
        function p(a, b) {
            a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function(a) {
                return CKEDITOR.tools.repeat("<br>", 2 * (a.length / 7))
            }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "<$1div>"));
            return b
        }
        CKEDITOR.plugins.add("clipboard", {
            requires: "dialog",
            init: function(a) {
                var b;
                w(a);
                CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js"));
                a.on("paste", function(a) {
                    var b = a.data.dataValue,
                        f = CKEDITOR.dtd.$block; - 1 < b.indexOf("Apple-") && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), "html" != a.data.type && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function(a, b) {
                        return b.replace(/\t/g, "&nbsp;&nbsp; &nbsp;")
                    })), -1 < b.indexOf('<br class="Apple-interchange-newline">') && (a.data.startsWithEOL = 1, a.data.preSniffing = "html", b = b.replace(/<br class="Apple-interchange-newline">/, "")), b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1"));
                    if (b.match(/^<[^<]+cke_(editable|contents)/i)) {
                        var h, k, g = new CKEDITOR.dom.element("div");
                        for (g.setHtml(b); 1 == g.getChildCount() && (h = g.getFirst()) && h.type == CKEDITOR.NODE_ELEMENT && (h.hasClass("cke_editable") || h.hasClass("cke_contents"));) g = k = h;
                        k && (b = k.getHtml().replace(/<br>$/i, ""))
                    }
                    CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function(b, c) {
                        if (c.toLowerCase() in f) {
                            a.data.preSniffing = "html";
                            return "<" + c
                        }
                        return b
                    }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function(b, c) {
                        if (c in f) {
                            a.data.endsWithEOL = 1;
                            return "</" + c + ">"
                        }
                        return b
                    }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1"));
                    a.data.dataValue = b
                }, null, null, 3);
                a.on("paste", function(e) {
                    var e = e.data,
                        c = e.type,
                        f = e.dataValue,
                        h, k = a.config.clipboard_defaultContentType || "html";
                    h = "html" == c || "html" == e.preSniffing ? "html" : x(f);
                    "htmlifiedtext" == h ? f = y(a.config, f) : "text" == c && "html" == h && (f = A(a.config, f, b || (b = z(a))));
                    e.startsWithEOL && (f = '<br data-cke-eol="1">' + f);
                    e.endsWithEOL && (f += '<br data-cke-eol="1">');
                    "auto" == c && (c = "html" == h || "html" == k ? "html" : "text");
                    e.type = c;
                    e.dataValue = f;
                    delete e.preSniffing;
                    delete e.startsWithEOL;
                    delete e.endsWithEOL
                }, null, null, 6);
                a.on("paste", function(b) {
                    b = b.data;
                    a.insertHtml(b.dataValue, b.type);
                    setTimeout(function() {
                        a.fire("afterPaste")
                    }, 0)
                }, null, null, 1E3);
                a.on("pasteDialog", function(b) {
                    setTimeout(function() {
                        a.openDialog("paste", b.data)
                    }, 0)
                })
            }
        })
    })();
    (function() {
        var c = '<a id="{id}" class="cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && 10900 <= CKEDITOR.env.version && !CKEDITOR.env.hc ? "" : '" href="javascript:void(\'{titleJs}\')"') + ' title="{title}" tabindex="-1" hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="{hasArrow}"';
        if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) c += ' onkeypress="return false;"';
        CKEDITOR.env.gecko && (c += ' onblur="this.style.cssText = this.style.cssText;"');
        var c = c + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);"  onmousedown="return CKEDITOR.tools.callFunction({mousedownFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span class="cke_button_icon cke_button__{iconName}_icon" style="{style}"'),
            c = c + '>&nbsp;</span><span id="{id}_label" class="cke_button_label cke_button__{name}_label">{label}</span>{arrowHtml}</a>',
            m = CKEDITOR.addTemplate("buttonArrow", '<span class="cke_button_arrow">' + (CKEDITOR.env.hc ? "&#9660;" : "") + "</span>"),
            n = CKEDITOR.addTemplate("button", c);
        CKEDITOR.plugins.add("button", {
            beforeInit: function(a) {
                a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler)
            }
        });
        CKEDITOR.UI_BUTTON = "button";
        CKEDITOR.ui.button = function(a) {
            CKEDITOR.tools.extend(this, a, {
                title: a.label,
                click: a.click ||
                function(b) {
                    b.execCommand(a.command)
                }
            });
            this._ = {}
        };
        CKEDITOR.ui.button.handler = {
            create: function(a) {
                return new CKEDITOR.ui.button(a)
            }
        };
        CKEDITOR.ui.button.prototype = {
            render: function(a, b) {
                var c = CKEDITOR.env,
                    i = this._.id = CKEDITOR.tools.getNextId(),
                    f = "",
                    e = this.command,
                    l;
                this._.editor = a;
                var d = {
                    id: i,
                    button: this,
                    editor: a,
                    focus: function() {
                        CKEDITOR.document.getById(i).focus()
                    },
                    execute: function() {
                        this.button.click(a)
                    },
                    attach: function(a) {
                        this.button.attach(a)
                    }
                },
                    o = CKEDITOR.tools.addFunction(function(a) {
                        if (d.onkey) return a = new CKEDITOR.dom.event(a), !1 !== d.onkey(d, a.getKeystroke())
                    }),
                    p = CKEDITOR.tools.addFunction(function(a) {
                        var b;
                        d.onfocus && (b = !1 !== d.onfocus(d, new CKEDITOR.dom.event(a)));
                        CKEDITOR.env.gecko && 10900 > CKEDITOR.env.version && a.preventBubble();
                        return b
                    }),
                    j = 0,
                    q = CKEDITOR.tools.addFunction(function() {
                        if (CKEDITOR.env.opera) {
                            var b = a.editable();
                            b.isInline() && b.hasFocus && (a.lockSelection(), j = 1)
                        }
                    });
                d.clickFn = l = CKEDITOR.tools.addFunction(function() {
                    j && (a.unlockSelection(1), j = 0);
                    d.execute()
                });
                if (this.modes) {
                    var k = {},
                        g = function() {
                            var b = a.mode;
                            b && (b = this.modes[b] ? void 0 != k[b] ? k[b] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, this.setState(a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : b))
                        };
                    a.on("beforeModeUnload", function() {
                        a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (k[a.mode] = this._.state)
                    }, this);
                    a.on("mode", g, this);
                    !this.readOnly && a.on("readOnly", g, this)
                } else if (e && (e = a.getCommand(e))) e.on("state", function() {
                    this.setState(e.state)
                }, this), f += e.state == CKEDITOR.TRISTATE_ON ? "on" : e.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off";
                if (this.directional) a.on("contentDirChanged", function(b) {
                    var c = CKEDITOR.document.getById(this._.id),
                        d = c.getFirst(),
                        b = b.data;
                    b != a.lang.dir ? c.addClass("cke_" + b) : c.removeClass("cke_ltr").removeClass("cke_rtl");
                    d.setAttribute("style", CKEDITOR.skin.getIconStyle(h, "rtl" == b, this.icon, this.iconOffset))
                }, this);
                e || (f += "off");
                var h = g = this.name || this.command;
                this.icon && !/\./.test(this.icon) && (h = this.icon, this.icon = null);
                c = {
                    id: i,
                    name: g,
                    iconName: h,
                    label: this.label,
                    cls: this.className || "",
                    state: f,
                    title: this.title,
                    titleJs: c.gecko && 10900 <= c.version && !c.hc ? "" : (this.title || "").replace("'", ""),
                    hasArrow: this.hasArrow ? "true" : "false",
                    keydownFn: o,
                    mousedownFn: q,
                    focusFn: p,
                    clickFn: l,
                    style: CKEDITOR.skin.getIconStyle(h, "rtl" == a.lang.dir, this.icon, this.iconOffset),
                    arrowHtml: this.hasArrow ? m.output() : ""
                };
                n.output(c, b);
                if (this.onRender) this.onRender();
                return d
            },
            setState: function(a) {
                if (this._.state == a) return !1;
                this._.state = a;
                var b = CKEDITOR.document.getById(this._.id);
                return b ? (b.setState(a, "cke_button"), a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", !0) : b.removeAttribute("aria-disabled"), a == CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", !0) : b.removeAttribute("aria-pressed"), !0) : !1
            },
            toFeature: function(a) {
                if (this._.feature) return this._.feature;
                var b = this;
                !this.allowedContent && (!this.requiredContent && this.command) && (b = a.getCommand(this.command) || b);
                return this._.feature = b
            }
        };
        CKEDITOR.ui.prototype.addButton = function(a, b) {
            this.add(a, CKEDITOR.UI_BUTTON, b)
        }
    })();
    (function() {
        function w(a) {
            function d() {
                for (var b = i(), e = CKEDITOR.tools.clone(a.config.toolbarGroups) || n(a), f = 0; f < e.length; f++) {
                    var k = e[f];
                    if ("/" != k) {
                        "string" == typeof k && (k = e[f] = {
                            name: k
                        });
                        var j, d = k.groups;
                        if (d) for (var h = 0; h < d.length; h++) j = d[h], (j = b[j]) && c(k, j);
                        (j = b[k.name]) && c(k, j)
                    }
                }
                return e
            }
            function i() {
                var b = {},
                    c, f, e;
                for (c in a.ui.items) f = a.ui.items[c], e = f.toolbar || "others", e = e.split(","), f = e[0], e = parseInt(e[1] || -1, 10), b[f] || (b[f] = []), b[f].push({
                    name: c,
                    order: e
                });
                for (f in b) b[f] = b[f].sort(function(b, a) {
                    return b.order == a.order ? 0 : 0 > a.order ? -1 : 0 > b.order ? 1 : b.order < a.order ? -1 : 1
                });
                return b
            }
            function c(c, e) {
                if (e.length) {
                    c.items ? c.items.push(a.ui.create("-")) : c.items = [];
                    for (var f; f = e.shift();) if (f = "string" == typeof f ? f : f.name, !b || -1 == CKEDITOR.tools.indexOf(b, f))(f = a.ui.create(f)) && a.addFeature(f) && c.items.push(f)
                }
            }
            function h(b) {
                var a = [],
                    e, d, h;
                for (e = 0; e < b.length; ++e) d = b[e], h = {}, "/" == d ? a.push(d) : CKEDITOR.tools.isArray(d) ? (c(h, CKEDITOR.tools.clone(d)), a.push(h)) : d.items && (c(h, CKEDITOR.tools.clone(d.items)), h.name = d.name, a.push(h));
                return a
            }
            var b = a.config.removeButtons,
                b = b && b.split(","),
                e = a.config.toolbar;
            "string" == typeof e && (e = a.config["toolbar_" + e]);
            return a.toolbar = e ? h(e) : d()
        }
        function n(a) {
            return a._.toolbarGroups || (a._.toolbarGroups = [{
                name: "document",
                groups: ["mode", "document", "doctools"]
            }, {
                name: "clipboard",
                groups: ["clipboard", "undo"]
            }, {
                name: "editing",
                groups: ["find", "selection", "spellchecker"]
            }, {
                name: "forms"
            }, "/",
            {
                name: "basicstyles",
                groups: ["basicstyles", "cleanup"]
            }, {
                name: "paragraph",
                groups: ["list", "indent", "blocks", "align"]
            }, {
                name: "links"
            }, {
                name: "insert"
            }, "/",
            {
                name: "styles"
            }, {
                name: "colors"
            }, {
                name: "tools"
            }, {
                name: "others"
            }, {
                name: "about"
            }])
        }
        var t = function() {
                this.toolbars = [];
                this.focusCommandExecuted = !1
            };
        t.prototype.focus = function() {
            for (var a = 0, d; d = this.toolbars[a++];) for (var i = 0, c; c = d.items[i++];) if (c.focus) {
                c.focus();
                return
            }
        };
        var x = {
            modes: {
                wysiwyg: 1,
                source: 1
            },
            readOnly: 1,
            exec: function(a) {
                a.toolbox && (a.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function() {
                    a.toolbox.focus()
                }, 100) : a.toolbox.focus())
            }
        };
        CKEDITOR.plugins.add("toolbar", {
            requires: "button",
            init: function(a) {
                var d, i = function(c, h) {
                        var b, e = "rtl" == a.lang.dir,
                            g = a.config.toolbarGroupCycling,
                            g = void 0 === g || g;
                        switch (h) {
                        case 9:
                        case CKEDITOR.SHIFT + 9:
                            for (; !b || !b.items.length;) if (b = 9 == h ? (b ? b.next : c.toolbar.next) || a.toolbox.toolbars[0] : (b ? b.previous : c.toolbar.previous) || a.toolbox.toolbars[a.toolbox.toolbars.length - 1], b.items.length) for (c = b.items[d ? b.items.length - 1 : 0]; c && !c.focus;)(c = d ? c.previous : c.next) || (b = 0);
                            c && c.focus();
                            return !1;
                        case e ? 37:
                            39 : case 40:
                            b = c;
                            do b = b.next, !b && g && (b = c.toolbar.items[0]);
                            while (b && !b.focus);
                            b ? b.focus() : i(c, 9);
                            return !1;
                        case e ? 39:
                            37 : case 38:
                            b = c;
                            do b = b.previous, !b && g && (b = c.toolbar.items[c.toolbar.items.length - 1]);
                            while (b && !b.focus);
                            b ? b.focus() : (d = 1, i(c, CKEDITOR.SHIFT + 9), d = 0);
                            return !1;
                        case 27:
                            return a.focus(), !1;
                        case 13:
                        case 32:
                            return c.execute(), !1
                        }
                        return !0
                    };
                a.on("uiSpace", function(c) {
                    if (c.data.space == a.config.toolbarLocation) {
                        c.removeListener();
                        a.toolbox = new t;
                        var d = CKEDITOR.tools.getNextId(),
                            b = ['<span id="', d, '" class="cke_voice_label">', a.lang.toolbar.toolbars, "</span>", '<span id="' + a.ui.spaceId("toolbox") + '" class="cke_toolbox" role="group" aria-labelledby="', d, '" onmousedown="return false;">'],
                            d = !1 !== a.config.toolbarStartupExpanded,
                            e, g;
                        a.config.toolbarCanCollapse && a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && b.push('<span class="cke_toolbox_main"' + (d ? ">" : ' style="display:none">'));
                        for (var n = a.toolbox.toolbars, f = w(a), k = 0; k < f.length; k++) {
                            var j, l = 0,
                                q, m = f[k],
                                r;
                            if (m) if (e && (b.push("</span>"), g = e = 0), "/" === m) b.push('<span class="cke_toolbar_break"></span>');
                            else {
                                r = m.items || m;
                                for (var s = 0; s < r.length; s++) {
                                    var o = r[s],
                                        u;
                                    if (o) if (o.type == CKEDITOR.UI_SEPARATOR) g = e && o;
                                    else {
                                        u = !1 !== o.canGroup;
                                        if (!l) {
                                            j = CKEDITOR.tools.getNextId();
                                            l = {
                                                id: j,
                                                items: []
                                            };
                                            q = m.name && (a.lang.toolbar.toolbarGroups[m.name] || m.name);
                                            b.push('<span id="', j, '" class="cke_toolbar"', q ? ' aria-labelledby="' + j + '_label"' : "", ' role="toolbar">');
                                            q && b.push('<span id="', j, '_label" class="cke_voice_label">', q, "</span>");
                                            b.push('<span class="cke_toolbar_start"></span>');
                                            var p = n.push(l) - 1;
                                            0 < p && (l.previous = n[p - 1], l.previous.next = l)
                                        }
                                        u ? e || (b.push('<span class="cke_toolgroup" role="presentation">'), e = 1) : e && (b.push("</span>"), e = 0);
                                        j = function(c) {
                                            c = c.render(a, b);
                                            p = l.items.push(c) - 1;
                                            if (p > 0) {
                                                c.previous = l.items[p - 1];
                                                c.previous.next = c
                                            }
                                            c.toolbar = l;
                                            c.onkey = i;
                                            c.onfocus = function() {
                                                a.toolbox.focusCommandExecuted || a.focus()
                                            }
                                        };
                                        g && (j(g), g = 0);
                                        j(o)
                                    }
                                }
                                e && (b.push("</span>"), g = e = 0);
                                l && b.push('<span class="cke_toolbar_end"></span></span>')
                            }
                        }
                        a.config.toolbarCanCollapse && b.push("</span>");
                        if (a.config.toolbarCanCollapse && a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                            var v = CKEDITOR.tools.addFunction(function() {
                                a.execCommand("toolbarCollapse")
                            });
                            a.on("destroy", function() {
                                CKEDITOR.tools.removeFunction(v)
                            });
                            a.addCommand("toolbarCollapse", {
                                readOnly: 1,
                                exec: function(b) {
                                    var a = b.ui.space("toolbar_collapser"),
                                        c = a.getPrevious(),
                                        e = b.ui.space("contents"),
                                        d = c.getParent(),
                                        f = parseInt(e.$.style.height, 10),
                                        h = d.$.offsetHeight,
                                        g = a.hasClass("cke_toolbox_collapser_min");
                                    g ? (c.show(), a.removeClass("cke_toolbox_collapser_min"), a.setAttribute("title", b.lang.toolbar.toolbarCollapse)) : (c.hide(), a.addClass("cke_toolbox_collapser_min"), a.setAttribute("title", b.lang.toolbar.toolbarExpand));
                                    a.getFirst().setText(g ? "▲" : "◀");
                                    e.setStyle("height", f - (d.$.offsetHeight - h) + "px");
                                    b.fire("resize")
                                },
                                modes: {
                                    wysiwyg: 1,
                                    source: 1
                                }
                            });
                            a.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse");
                            b.push('<a title="' + (d ? a.lang.toolbar.toolbarCollapse : a.lang.toolbar.toolbarExpand) + '" id="' + a.ui.spaceId("toolbar_collapser") + '" tabIndex="-1" class="cke_toolbox_collapser');
                            d || b.push(" cke_toolbox_collapser_min");
                            b.push('" onclick="CKEDITOR.tools.callFunction(' + v + ')">', '<span class="cke_arrow">&#9650;</span>', "</a>")
                        }
                        b.push("</span>");
                        c.data.html += b.join("")
                    }
                });
                a.on("destroy", function() {
                    if (this.toolbox) {
                        var a, d = 0,
                            b, e, g;
                        for (a = this.toolbox.toolbars; d < a.length; d++) {
                            e = a[d].items;
                            for (b = 0; b < e.length; b++) g = e[b], g.clickFn && CKEDITOR.tools.removeFunction(g.clickFn), g.keyDownFn && CKEDITOR.tools.removeFunction(g.keyDownFn)
                        }
                    }
                });
                a.on("uiReady", function() {
                    var c = a.ui.space("toolbox");
                    c && a.focusManager.add(c, 1)
                });
                a.addCommand("toolbarFocus", x);
                a.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus");
                a.ui.add("-", CKEDITOR.UI_SEPARATOR, {});
                a.ui.addHandler(CKEDITOR.UI_SEPARATOR, {
                    create: function() {
                        return {
                            render: function(a, d) {
                                d.push('<span class="cke_toolbar_separator" role="separator"></span>');
                                return {}
                            }
                        }
                    }
                })
            }
        });
        CKEDITOR.ui.prototype.addToolbarGroup = function(a, d, i) {
            var c = n(this.editor),
                h = 0 === d,
                b = {
                    name: a
                };
            if (i) {
                if (i = CKEDITOR.tools.search(c, function(a) {
                    return a.name == i
                })) {
                    !i.groups && (i.groups = []);
                    if (d && (d = CKEDITOR.tools.indexOf(i.groups, d), 0 <= d)) {
                        i.groups.splice(d + 1, 0, a);
                        return
                    }
                    h ? i.groups.splice(0, 0, a) : i.groups.push(a);
                    return
                }
                d = null
            }
            d && (d = CKEDITOR.tools.indexOf(c, function(a) {
                return a.name == d
            }));
            h ? c.splice(0, 0, a) : "number" == typeof d ? c.splice(d + 1, 0, b) : c.push(a)
        }
    })();
    CKEDITOR.UI_SEPARATOR = "separator";
    CKEDITOR.config.toolbarLocation = "top";
    (function() {
        function C(c, j, f) {
            function b(b) {
                if ((d = a[b ? "getFirst" : "getLast"]()) && (!d.is || !d.isBlockBoundary()) && (m = j.root[b ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) && (!m.is || !m.isBlockBoundary({
                    br: 1
                }))) c.document.createElement("br")[b ? "insertBefore" : "insertAfter"](d)
            }
            for (var i = CKEDITOR.plugins.list.listToArray(j.root, f), e = [], h = 0; h < j.contents.length; h++) {
                var g = j.contents[h];
                if ((g = g.getAscendant("li", !0)) && !g.getCustomData("list_item_processed")) e.push(g), CKEDITOR.dom.element.setMarker(f, g, "list_item_processed", !0)
            }
            g = null;
            for (h = 0; h < e.length; h++) g = e[h].getCustomData("listarray_index"), i[g].indent = -1;
            for (h = g + 1; h < i.length; h++) if (i[h].indent > i[h - 1].indent + 1) {
                e = i[h - 1].indent + 1 - i[h].indent;
                for (g = i[h].indent; i[h] && i[h].indent >= g;) i[h].indent += e, h++;
                h--
            }
            var a = CKEDITOR.plugins.list.arrayToList(i, f, null, c.config.enterMode, j.root.getAttribute("dir")).listNode,
                d, m;
            b(!0);
            b();
            a.replace(j.root)
        }
        function x(c, j) {
            this.name = c;
            this.context = this.type = j;
            this.allowedContent = j + " li";
            this.requiredContent = j
        }
        function y(c, j, f, b) {
            for (var i, e; i = c[b ? "getLast" : "getFirst"](D);)(e = i.getDirection(1)) !== j.getDirection(1) && i.setAttribute("dir", e), i.remove(), f ? i[b ? "insertBefore" : "insertAfter"](f) : j.append(i, b)
        }
        function A(c) {
            var j;
            (j = function(f) {
                var b = c[f ? "getPrevious" : "getNext"](q);
                b && (b.type == CKEDITOR.NODE_ELEMENT && b.is(c.getName())) && (y(c, b, null, !f), c.remove(), c = b)
            })();
            j(1)
        }
        function B(c) {
            return c.type == CKEDITOR.NODE_ELEMENT && (c.getName() in CKEDITOR.dtd.$block || c.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[c.getName()]["#"]
        }
        function v(c, j, f) {
            c.fire("saveSnapshot");
            f.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
            var b = f.extractContents();
            j.trim(!1, !0);
            var i = j.createBookmark(),
                e = new CKEDITOR.dom.elementPath(j.startContainer),
                h = e.block,
                e = e.lastElement.getAscendant("li", 1) || h,
                g = new CKEDITOR.dom.elementPath(f.startContainer),
                a = g.contains(CKEDITOR.dtd.$listItem),
                g = g.contains(CKEDITOR.dtd.$list);
            h ? (h = h.getBogus()) && h.remove() : g && (h = g.getPrevious(q)) && u(h) && h.remove();
            (h = b.getLast()) && (h.type == CKEDITOR.NODE_ELEMENT && h.is("br")) && h.remove();
            (h = j.startContainer.getChild(j.startOffset)) ? b.insertBefore(h) : j.startContainer.append(b);
            if (a && (b = w(a))) e.contains(a) ? (y(b, a.getParent(), a), b.remove()) : e.append(b);
            for (; f.checkStartOfBlock() && f.checkEndOfBlock();) g = f.startPath(), b = g.block, b.is("li") && (e = b.getParent(), b.equals(e.getLast(q)) && b.equals(e.getFirst(q)) && (b = e)), f.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START), b.remove();
            f = f.clone();
            b = c.editable();
            f.setEndAt(b, CKEDITOR.POSITION_BEFORE_END);
            f = new CKEDITOR.dom.walker(f);
            f.evaluator = function(a) {
                return q(a) && !u(a)
            };
            (f = f.next()) && (f.type == CKEDITOR.NODE_ELEMENT && f.getName() in CKEDITOR.dtd.$list) && A(f);
            j.moveToBookmark(i);
            j.select();
            c.fire("saveSnapshot")
        }
        function w(c) {
            return (c = c.getLast(q)) && c.type == CKEDITOR.NODE_ELEMENT && c.getName() in r ? c : null
        }
        var r = {
            ol: 1,
            ul: 1
        },
            E = CKEDITOR.dom.walker.whitespaces(),
            F = CKEDITOR.dom.walker.bookmark(),
            q = function(c) {
                return !(E(c) || F(c))
            },
            u = CKEDITOR.dom.walker.bogus();
        CKEDITOR.plugins.list = {
            listToArray: function(c, j, f, b, i) {
                if (!r[c.getName()]) return [];
                b || (b = 0);
                f || (f = []);
                for (var e = 0, h = c.getChildCount(); e < h; e++) {
                    var g = c.getChild(e);
                    g.type == CKEDITOR.NODE_ELEMENT && g.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(g, j, f, b + 1);
                    if ("li" == g.$.nodeName.toLowerCase()) {
                        var a = {
                            parent: c,
                            indent: b,
                            element: g,
                            contents: []
                        };
                        i ? a.grandparent = i : (a.grandparent = c.getParent(), a.grandparent && "li" == a.grandparent.$.nodeName.toLowerCase() && (a.grandparent = a.grandparent.getParent()));
                        j && CKEDITOR.dom.element.setMarker(j, g, "listarray_index", f.length);
                        f.push(a);
                        for (var d = 0, m = g.getChildCount(), k; d < m; d++) k = g.getChild(d), k.type == CKEDITOR.NODE_ELEMENT && r[k.getName()] ? CKEDITOR.plugins.list.listToArray(k, j, f, b + 1, a.grandparent) : a.contents.push(k)
                    }
                }
                return f
            },
            arrayToList: function(c, j, f, b, i) {
                f || (f = 0);
                if (!c || c.length < f + 1) return null;
                for (var e, h = c[f].parent.getDocument(), g = new CKEDITOR.dom.documentFragment(h), a = null, d = f, m = Math.max(c[f].indent, 0), k = null, n, l, p = b == CKEDITOR.ENTER_P ? "p" : "div";;) {
                    var o = c[d];
                    e = o.grandparent;
                    n = o.element.getDirection(1);
                    if (o.indent == m) {
                        if (!a || c[d].parent.getName() != a.getName()) a = c[d].parent.clone(!1, 1), i && a.setAttribute("dir", i), g.append(a);
                        k = a.append(o.element.clone(0, 1));
                        n != a.getDirection(1) && k.setAttribute("dir", n);
                        for (e = 0; e < o.contents.length; e++) k.append(o.contents[e].clone(1, 1));
                        d++
                    } else if (o.indent == Math.max(m, 0) + 1) l = c[d - 1].element.getDirection(1), d = CKEDITOR.plugins.list.arrayToList(c, null, d, b, l != n ? n : null), !k.getChildCount() && (CKEDITOR.env.ie && !(7 < h.$.documentMode)) && k.append(h.createText(" ")), k.append(d.listNode), d = d.nextIndex;
                    else if (-1 == o.indent && !f && e) {
                        r[e.getName()] ? (k = o.element.clone(!1, !0), n != e.getDirection(1) && k.setAttribute("dir", n)) : k = new CKEDITOR.dom.documentFragment(h);
                        var a = e.getDirection(1) != n,
                            s = o.element,
                            z = s.getAttribute("class"),
                            u = s.getAttribute("style"),
                            w = k.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (b != CKEDITOR.ENTER_BR || a || u || z),
                            t, x = o.contents.length;
                        for (e = 0; e < x; e++) {
                            t = o.contents[e];
                            if (t.type == CKEDITOR.NODE_ELEMENT && t.isBlockBoundary()) {
                                a && !t.getDirection() && t.setAttribute("dir", n);
                                var v = t,
                                    y = s.getAttribute("style");
                                y && v.setAttribute("style", y.replace(/([^;])$/, "$1;") + (v.getAttribute("style") || ""));
                                z && t.addClass(z)
                            } else w && (l || (l = h.createElement(p), a && l.setAttribute("dir", n)), u && l.setAttribute("style", u), z && l.setAttribute("class", z), l.append(t.clone(1, 1)));
                            k.append(l || t.clone(1, 1))
                        }
                        k.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && d != c.length - 1 && ((n = k.getLast()) && (n.type == CKEDITOR.NODE_ELEMENT && "_moz" == n.getAttribute("type")) && n.remove(), (!k.getLast(q) || !(n.type == CKEDITOR.NODE_ELEMENT && n.getName() in CKEDITOR.dtd.$block)) && k.append(h.createElement("br")));
                        n = k.$.nodeName.toLowerCase();
                        !CKEDITOR.env.ie && ("div" == n || "p" == n) && k.appendBogus();
                        g.append(k);
                        a = null;
                        d++
                    } else return null;
                    l = null;
                    if (c.length <= d || Math.max(c[d].indent, 0) < m) break
                }
                if (j) for (c = g.getFirst(); c;) {
                    if (c.type == CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(j, c), c.getName() in CKEDITOR.dtd.$listItem && (f = c, h = i = b = void 0, b = f.getDirection()))) {
                        for (i = f.getParent(); i && !(h = i.getDirection());) i = i.getParent();
                        b == h && f.removeAttribute("dir")
                    }
                    c = c.getNextSourceNode()
                }
                return {
                    listNode: g,
                    nextIndex: d
                }
            }
        };
        var G = /^h[1-6]$/,
            D = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
        x.prototype = {
            exec: function(c) {
                this.refresh(c, c.elementPath());
                var j = c.config,
                    f = c.getSelection(),
                    b = f && f.getRanges(!0);
                if (this.state == CKEDITOR.TRISTATE_OFF) {
                    var i = c.editable();
                    if (i.getFirst(q)) {
                        var e = 1 == b.length && b[0];
                        (j = e && e.getEnclosedNode()) && (j.is && this.type == j.getName()) && this.setState(CKEDITOR.TRISTATE_ON)
                    } else j.enterMode == CKEDITOR.ENTER_BR ? i.appendBogus() : b[0].fixBlock(1, j.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), f.selectRanges(b)
                }
                for (var j = f.createBookmarks(!0), i = [], h = {}, b = b.createIterator(), g = 0;
                (e = b.getNextRange()) && ++g;) {
                    var a = e.getBoundaryNodes(),
                        d = a.startNode,
                        m = a.endNode;
                    d.type == CKEDITOR.NODE_ELEMENT && "td" == d.getName() && e.setStartAt(a.startNode, CKEDITOR.POSITION_AFTER_START);
                    m.type == CKEDITOR.NODE_ELEMENT && "td" == m.getName() && e.setEndAt(a.endNode, CKEDITOR.POSITION_BEFORE_END);
                    e = e.createIterator();
                    for (e.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; a = e.getNextParagraph();) if (!a.getCustomData("list_block")) {
                        CKEDITOR.dom.element.setMarker(h, a, "list_block", 1);
                        for (var k = c.elementPath(a), d = k.elements, m = 0, k = k.blockLimit, n, l = d.length - 1; 0 <= l && (n = d[l]); l--) if (r[n.getName()] && k.contains(n)) {
                            k.removeCustomData("list_group_object_" + g);
                            (d = n.getCustomData("list_group_object")) ? d.contents.push(a) : (d = {
                                root: n,
                                contents: [a]
                            }, i.push(d), CKEDITOR.dom.element.setMarker(h, n, "list_group_object", d));
                            m = 1;
                            break
                        }
                        m || (m = k, m.getCustomData("list_group_object_" + g) ? m.getCustomData("list_group_object_" + g).contents.push(a) : (d = {
                            root: m,
                            contents: [a]
                        }, CKEDITOR.dom.element.setMarker(h, m, "list_group_object_" + g, d), i.push(d)))
                    }
                }
                for (n = []; 0 < i.length;) if (d = i.shift(), this.state == CKEDITOR.TRISTATE_OFF) if (r[d.root.getName()]) {
                    a = c;
                    b = d;
                    d = h;
                    g = n;
                    m = CKEDITOR.plugins.list.listToArray(b.root, d);
                    k = [];
                    for (e = 0; e < b.contents.length; e++) if (l = b.contents[e], (l = l.getAscendant("li", !0)) && !l.getCustomData("list_item_processed")) k.push(l), CKEDITOR.dom.element.setMarker(d, l, "list_item_processed", !0);
                    for (var l = b.root.getDocument(), p = void 0, o = void 0, e = 0; e < k.length; e++) {
                        var s = k[e].getCustomData("listarray_index"),
                            p = m[s].parent;
                        p.is(this.type) || (o = l.createElement(this.type), p.copyAttributes(o, {
                            start: 1,
                            type: 1
                        }), o.removeStyle("list-style-type"), m[s].parent = o)
                    }
                    a = CKEDITOR.plugins.list.arrayToList(m, d, null, a.config.enterMode);
                    d = void 0;
                    m = a.listNode.getChildCount();
                    for (e = 0; e < m && (d = a.listNode.getChild(e)); e++) d.getName() == this.type && g.push(d);
                    a.listNode.replace(b.root)
                } else {
                    m = c;
                    a = d;
                    e = n;
                    k = a.contents;
                    b = a.root.getDocument();
                    g = [];
                    1 == k.length && k[0].equals(a.root) && (d = b.createElement("div"), k[0].moveChildren && k[0].moveChildren(d), k[0].append(d), k[0] = d);
                    a = a.contents[0].getParent();
                    for (l = 0; l < k.length; l++) a = a.getCommonAncestor(k[l].getParent());
                    p = m.config.useComputedState;
                    m = d = void 0;
                    p = void 0 === p || p;
                    for (l = 0; l < k.length; l++) for (o = k[l]; s = o.getParent();) {
                        if (s.equals(a)) {
                            g.push(o);
                            !m && o.getDirection() && (m = 1);
                            o = o.getDirection(p);
                            null !== d && (d = d && d != o ? null : o);
                            break
                        }
                        o = s
                    }
                    if (!(1 > g.length)) {
                        k = g[g.length - 1].getNext();
                        l = b.createElement(this.type);
                        e.push(l);
                        for (p = e = void 0; g.length;) e = g.shift(), p = b.createElement("li"), e.is("pre") || G.test(e.getName()) ? e.appendTo(p) : (e.copyAttributes(p), d && e.getDirection() && (p.removeStyle("direction"), p.removeAttribute("dir")), e.moveChildren(p), e.remove()), p.appendTo(l);
                        d && m && l.setAttribute("dir", d);
                        k ? l.insertBefore(k) : l.appendTo(a)
                    }
                } else this.state == CKEDITOR.TRISTATE_ON && r[d.root.getName()] && C.call(this, c, d, h);
                for (l = 0; l < n.length; l++) A(n[l]);
                CKEDITOR.dom.element.clearAllMarkers(h);
                f.selectBookmarks(j);
                c.focus()
            },
            refresh: function(c, j) {
                var f = j.contains(r, 1),
                    b = j.blockLimit || j.root;
                f && b.contains(f) ? this.setState(f.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF)
            }
        };
        CKEDITOR.plugins.add("list", {
            requires: "indent",
            init: function(c) {
                c.blockless || (c.addCommand("numberedlist", new x("numberedlist", "ol")), c.addCommand("bulletedlist", new x("bulletedlist", "ul")), c.ui.addButton && (c.ui.addButton("NumberedList", {
                    label: c.lang.list.numberedlist,
                    command: "numberedlist",
                    directional: !0,
                    toolbar: "list,10"
                }), c.ui.addButton("BulletedList", {
                    label: c.lang.list.bulletedlist,
                    command: "bulletedlist",
                    directional: !0,
                    toolbar: "list,20"
                })), c.on("key", function(j) {
                    var f = j.data.keyCode;
                    if (c.mode == "wysiwyg" && f in {
                        8: 1,
                        46: 1
                    }) {
                        var b = c.getSelection().getRanges()[0],
                            i = b.startPath();
                        if (b.collapsed) {
                            var i = new CKEDITOR.dom.elementPath(b.startContainer),
                                e = f == 8,
                                h = c.editable(),
                                g = new CKEDITOR.dom.walker(b.clone());
                            g.evaluator = function(a) {
                                return q(a) && !u(a)
                            };
                            g.guard = function(a, b) {
                                return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table"))
                            };
                            f = b.clone();
                            if (e) {
                                var a, d;
                                if ((a = i.contains(r)) && b.checkBoundaryOfElement(a, CKEDITOR.START) && (a = a.getParent()) && a.is("li") && (a = w(a))) {
                                    d = a;
                                    a = a.getPrevious(q);
                                    f.moveToPosition(a && u(a) ? a : d, CKEDITOR.POSITION_BEFORE_START)
                                } else {
                                    g.range.setStartAt(h, CKEDITOR.POSITION_AFTER_START);
                                    g.range.setEnd(b.startContainer, b.startOffset);
                                    if ((a = g.previous()) && a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in r || a.is("li"))) {
                                        if (!a.is("li")) {
                                            g.range.selectNodeContents(a);
                                            g.reset();
                                            g.evaluator = B;
                                            a = g.previous()
                                        }
                                        d = a;
                                        f.moveToElementEditEnd(d)
                                    }
                                }
                                if (d) {
                                    v(c, f, b);
                                    j.cancel()
                                } else if ((f = i.contains(r)) && b.checkBoundaryOfElement(f, CKEDITOR.START)) {
                                    d = f.getFirst(q);
                                    if (b.checkBoundaryOfElement(d, CKEDITOR.START)) {
                                        a = f.getPrevious(q);
                                        if (w(d)) {
                                            if (a) {
                                                b.moveToElementEditEnd(a);
                                                b.select()
                                            }
                                        } else c.execCommand("outdent");
                                        j.cancel()
                                    }
                                }
                            } else if (d = i.contains("li")) {
                                g.range.setEndAt(h, CKEDITOR.POSITION_BEFORE_END);
                                h = (i = d.getLast(q)) && B(i) ? i : d;
                                d = 0;
                                if ((a = g.next()) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in r && a.equals(i)) {
                                    d = 1;
                                    a = g.next()
                                } else b.checkBoundaryOfElement(h, CKEDITOR.END) && (d = 1);
                                if (d && a) {
                                    b = b.clone();
                                    b.moveToElementEditStart(a);
                                    v(c, f, b);
                                    j.cancel()
                                }
                            } else {
                                g.range.setEndAt(h, CKEDITOR.POSITION_BEFORE_END);
                                if ((a = g.next()) && a.type == CKEDITOR.NODE_ELEMENT && a.is(r)) {
                                    a = a.getFirst(q);
                                    if (i.block && b.checkStartOfBlock() && b.checkEndOfBlock()) {
                                        i.block.remove();
                                        b.moveToElementEditStart(a);
                                        b.select()
                                    } else if (w(a)) {
                                        b.moveToElementEditStart(a);
                                        b.select()
                                    } else {
                                        b = b.clone();
                                        b.moveToElementEditStart(a);
                                        v(c, f, b)
                                    }
                                    j.cancel()
                                }
                            }
                            setTimeout(function() {
                                c.selectionChange(1)
                            })
                        }
                    }
                }))
            }
        })
    })();
    (function() {
        function p(d, i) {
            this.name = i;
            var a = this.useIndentClasses = d.config.indentClasses && 0 < d.config.indentClasses.length;
            if (a) {
                this.classNameRegex = RegExp("(?:^|\\s+)(" + d.config.indentClasses.join("|") + ")(?=$|\\s)");
                this.indentClassMap = {};
                for (var f = 0; f < d.config.indentClasses.length; f++) this.indentClassMap[d.config.indentClasses[f]] = f + 1
            }
            this.startDisabled = "outdent" == i;
            this.allowedContent = {
                "div h1 h2 h3 h4 h5 h6 ol p pre ul": {
                    propertiesOnly: !0,
                    styles: !a ? "margin-left,margin-right" : null,
                    classes: a ? d.config.indentClasses : null
                }
            };
            this.requiredContent = ["p" + (a ? "(" + d.config.indentClasses[0] + ")" : "{margin-left}"), "li"]
        }
        function r(d, i) {
            return "ltr" == (i || d.getComputedStyle("direction")) ? "margin-left" : "margin-right"
        }
        function q(d) {
            return d.type == CKEDITOR.NODE_ELEMENT && d.is("li")
        }
        var m = {
            ol: 1,
            ul: 1
        },
            t = CKEDITOR.dom.walker.whitespaces(!0),
            u = CKEDITOR.dom.walker.bookmark(!1, !0);
        p.prototype = {
            context: "p",
            refresh: function(d, i) {
                var a = i && i.contains(m),
                    f = i.block || i.blockLimit;
                a ? this.setState(CKEDITOR.TRISTATE_OFF) : !this.useIndentClasses && "indent" == this.name ? this.setState(CKEDITOR.TRISTATE_OFF) : f ? this.useIndentClasses ? (a = f.$.className.match(this.classNameRegex), f = 0, a && (a = a[1], f = this.indentClassMap[a]), "outdent" == this.name && !f || "indent" == this.name && f == d.config.indentClasses.length ? this.setState(CKEDITOR.TRISTATE_DISABLED) : this.setState(CKEDITOR.TRISTATE_OFF)) : (a = parseInt(f.getStyle(r(f)), 10), isNaN(a) && (a = 0), 0 >= a ? this.setState(CKEDITOR.TRISTATE_DISABLED) : this.setState(CKEDITOR.TRISTATE_OFF)) : this.setState(CKEDITOR.TRISTATE_DISABLED)
            },
            exec: function(d) {
                function i(n) {
                    for (var j = l.startContainer, b = l.endContainer; j && !j.getParent().equals(n);) j = j.getParent();
                    for (; b && !b.getParent().equals(n);) b = b.getParent();
                    if (j && b) {
                        for (var c = j, j = [], a = !1; !a;) c.equals(b) && (a = !0), j.push(c), c = c.getNext();
                        if (!(1 > j.length)) {
                            c = n.getParents(!0);
                            for (b = 0; b < c.length; b++) if (c[b].getName && m[c[b].getName()]) {
                                n = c[b];
                                break
                            }
                            for (var c = "indent" == e.name ? 1 : -1, b = j[0], j = j[j.length - 1], a = CKEDITOR.plugins.list.listToArray(n, o), f = a[j.getCustomData("listarray_index")].indent, b = b.getCustomData("listarray_index"); b <= j.getCustomData("listarray_index"); b++) if (a[b].indent += c, 0 < c) {
                                var k = a[b].parent;
                                a[b].parent = new CKEDITOR.dom.element(k.getName(), k.getDocument())
                            }
                            for (b = j.getCustomData("listarray_index") + 1; b < a.length && a[b].indent > f; b++) a[b].indent += c;
                            j = CKEDITOR.plugins.list.arrayToList(a, o, null, d.config.enterMode, n.getDirection());
                            if ("outdent" == e.name) {
                                var i;
                                if ((i = n.getParent()) && i.is("li")) for (var c = j.listNode.getChildren(), h = [], g, b = c.count() - 1; 0 <= b; b--)(g = c.getItem(b)) && (g.is && g.is("li")) && h.push(g)
                            }
                            j && j.listNode.replace(n);
                            if (h && h.length) for (b = 0; b < h.length; b++) {
                                for (g = n = h[b];
                                (g = g.getNext()) && g.is && g.getName() in m;) CKEDITOR.env.ie && !n.getFirst(function(b) {
                                    return t(b) && u(b)
                                }) && n.append(l.document.createText(" ")), n.append(g);
                                n.insertAfter(i)
                            }
                        }
                    }
                }
                function a() {
                    var a = l.createIterator(),
                        e = d.config.enterMode;
                    a.enforceRealBlocks = !0;
                    a.enlargeBr = e != CKEDITOR.ENTER_BR;
                    for (var b; b = a.getNextParagraph(e == CKEDITOR.ENTER_P ? "p" : "div");) f(b)
                }
                function f(a, g) {
                    if (a.getCustomData("indent_processed")) return !1;
                    if (e.useIndentClasses) {
                        var b = a.$.className.match(e.classNameRegex),
                            c = 0;
                        b && (b = b[1], c = e.indentClassMap[b]);
                        "outdent" == e.name ? c-- : c++;
                        if (0 > c) return !1;
                        c = Math.min(c, d.config.indentClasses.length);
                        c = Math.max(c, 0);
                        a.$.className = CKEDITOR.tools.ltrim(a.$.className.replace(e.classNameRegex, ""));
                        0 < c && a.addClass(d.config.indentClasses[c - 1])
                    } else {
                        b = r(a, g);
                        c = parseInt(a.getStyle(b), 10);
                        isNaN(c) && (c = 0);
                        var f = d.config.indentOffset || 40,
                            c = c + ("indent" == e.name ? 1 : -1) * f;
                        if (0 > c) return !1;
                        c = Math.max(c, 0);
                        c = Math.ceil(c / f) * f;
                        a.setStyle(b, c ? c + (d.config.indentUnit || "px") : "");
                        "" === a.getAttribute("style") && a.removeAttribute("style")
                    }
                    CKEDITOR.dom.element.setMarker(o, a, "indent_processed", 1);
                    return !0
                }
                for (var e = this, o = {}, g = d.getSelection(), v = g.createBookmarks(1), l, p = (g && g.getRanges(1)).createIterator(); l = p.getNextRange();) {
                    for (var h = l.getCommonAncestor(); h && !(h.type == CKEDITOR.NODE_ELEMENT && m[h.getName()]);) h = h.getParent();
                    if (!h) {
                        var k = l.getEnclosedNode();
                        k && (k.type == CKEDITOR.NODE_ELEMENT && k.getName() in m) && (l.setStartAt(k, CKEDITOR.POSITION_AFTER_START), l.setEndAt(k, CKEDITOR.POSITION_BEFORE_END), h = k)
                    }
                    h && (l.startContainer.type == CKEDITOR.NODE_ELEMENT && l.startContainer.getName() in m) && (k = new CKEDITOR.dom.walker(l), k.evaluator = q, l.startContainer = k.next());
                    h && (l.endContainer.type == CKEDITOR.NODE_ELEMENT && l.endContainer.getName() in m) && (k = new CKEDITOR.dom.walker(l), k.evaluator = q, l.endContainer = k.previous());
                    if (h) {
                        var k = h.getFirst(q),
                            w = !! k.getNext(q),
                            s = l.startContainer;
                        (!k.equals(s) && !k.contains(s) || !("indent" == e.name || e.useIndentClasses || parseInt(h.getStyle(r(h)), 10)) || !f(h, !w && k.getDirection())) && i(h)
                    } else a()
                }
                CKEDITOR.dom.element.clearAllMarkers(o);
                d.forceNextSelectionCheck();
                g.selectBookmarks(v)
            }
        };
        CKEDITOR.plugins.add("indent", {
            requires: "list",
            onLoad: function() {
                (CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat) && CKEDITOR.addCss(".cke_editable ul,.cke_editable ol{\tmargin-left: 0px;\tpadding-left: 40px;}")
            },
            init: function(d) {
                d.blockless || (d.addCommand("indent", new p(d, "indent")), d.addCommand("outdent", new p(d, "outdent")), d.ui.addButton && (d.ui.addButton("Indent", {
                    label: d.lang.indent.indent,
                    command: "indent",
                    directional: !0,
                    toolbar: "indent,20"
                }), d.ui.addButton("Outdent", {
                    label: d.lang.indent.outdent,
                    command: "outdent",
                    directional: !0,
                    toolbar: "indent,10"
                })), d.on("dirChanged", function(i) {
                    var a = d.createRange();
                    a.setStartBefore(i.data.node);
                    a.setEndAfter(i.data.node);
                    for (var f = new CKEDITOR.dom.walker(a), e; e = f.next();) if (e.type == CKEDITOR.NODE_ELEMENT) if (!e.equals(i.data.node) && e.getDirection()) {
                        a.setStartAfter(e);
                        f = new CKEDITOR.dom.walker(a)
                    } else {
                        var o = d.config.indentClasses;
                        if (o) for (var g = i.data.dir == "ltr" ? ["_rtl", ""] : ["", "_rtl"], m = 0; m < o.length; m++) if (e.hasClass(o[m] + g[0])) {
                            e.removeClass(o[m] + g[0]);
                            e.addClass(o[m] + g[1])
                        }
                        o = e.getStyle("margin-right");
                        g = e.getStyle("margin-left");
                        o ? e.setStyle("margin-left", o) : e.removeStyle("margin-left");
                        g ? e.setStyle("margin-right", g) : e.removeStyle("margin-right")
                    }
                }))
            }
        })
    })();
    (function() {
        function m(a, d, b) {
            b = a.config.forceEnterMode || b;
            if ("wysiwyg" != a.mode) return !1;
            d || (d = a.config.enterMode);
            a.elementPath().isContextFor("p") || (d = CKEDITOR.ENTER_BR, b = 1);
            a.fire("saveSnapshot");
            d == CKEDITOR.ENTER_BR ? n(a, d, null, b) : o(a, d, null, b);
            a.fire("saveSnapshot");
            return !0
        }
        function p(a) {
            for (var a = a.getSelection().getRanges(!0), d = a.length - 1; 0 < d; d--) a[d].deleteContents();
            return a[0]
        }
        CKEDITOR.plugins.add("enterkey", {
            requires: "indent",
            init: function(a) {
                a.addCommand("enter", {
                    modes: {
                        wysiwyg: 1
                    },
                    editorFocus: !1,
                    exec: function(a) {
                        m(a)
                    }
                });
                a.addCommand("shiftEnter", {
                    modes: {
                        wysiwyg: 1
                    },
                    editorFocus: !1,
                    exec: function(a) {
                        "wysiwyg" == a.mode && m(a, a.config.shiftEnterMode, 1)
                    }
                });
                a.setKeystroke([
                    [13, "enter"],
                    [CKEDITOR.SHIFT + 13, "shiftEnter"]
                ])
            }
        });
        var s = CKEDITOR.dom.walker.whitespaces(),
            t = CKEDITOR.dom.walker.bookmark();
        CKEDITOR.plugins.enterkey = {
            enterBlock: function(a, d, b, i) {
                if (b = b || p(a)) {
                    var f = b.document,
                        j = b.checkStartOfBlock(),
                        h = b.checkEndOfBlock(),
                        c = a.elementPath(b.startContainer).block;
                    if (j && h) {
                        if (c && (c.is("li") || c.getParent().is("li"))) {
                            a.execCommand("outdent");
                            return
                        }
                        if (c && c.getParent().is("blockquote")) {
                            c.breakParent(c.getParent());
                            c.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getPrevious().remove();
                            c.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getNext().remove();
                            b.moveToElementEditStart(c);
                            b.select();
                            return
                        }
                    } else if (c && c.is("pre") && !h) {
                        n(a, d, b, i);
                        return
                    }
                    var c = d == CKEDITOR.ENTER_DIV ? "div" : "p",
                        l = b.splitBlock(c);
                    if (l) {
                        var d = l.previousBlock,
                            a = l.nextBlock,
                            j = l.wasStartOfBlock,
                            h = l.wasEndOfBlock,
                            g;
                        if (a) g = a.getParent(), g.is("li") && (a.breakParent(g), a.move(a.getNext(), 1));
                        else if (d && (g = d.getParent()) && g.is("li")) d.breakParent(g), g = d.getNext(), b.moveToElementEditStart(g), d.move(d.getPrevious());
                        if (!j && !h) {
                            if (a.is("li")) {
                                var e = b.clone();
                                e.selectNodeContents(a);
                                e = new CKEDITOR.dom.walker(e);
                                e.evaluator = function(a) {
                                    return !(t(a) || s(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty))
                                };
                                (g = e.next()) && (g.type == CKEDITOR.NODE_ELEMENT && g.is("ul", "ol")) && (CKEDITOR.env.ie ? f.createText(" ") : f.createElement("br")).insertBefore(g)
                            }
                            a && b.moveToElementEditStart(a)
                        } else {
                            var k;
                            if (d) {
                                if (d.is("li") || !q.test(d.getName()) && !d.is("pre")) e = d.clone()
                            } else a && (e = a.clone());
                            e ? i && !e.is("li") && e.renameNode(c) : g && g.is("li") ? e = g : (e = f.createElement(c), d && (k = d.getDirection()) && e.setAttribute("dir", k));
                            if (f = l.elementPath) {
                                i = 0;
                                for (g = f.elements.length; i < g; i++) {
                                    k = f.elements[i];
                                    if (k.equals(f.block) || k.equals(f.blockLimit)) break;
                                    CKEDITOR.dtd.$removeEmpty[k.getName()] && (k = k.clone(), e.moveChildren(k), e.append(k))
                                }
                            }
                            CKEDITOR.env.ie || e.appendBogus();
                            e.getParent() || b.insertNode(e);
                            e.is("li") && e.removeAttribute("value");
                            if (CKEDITOR.env.ie && j && (!h || !d.getChildCount())) b.moveToElementEditStart(h ? d : e), b.select();
                            b.moveToElementEditStart(j && !h ? a : e)
                        }
                        b.select();
                        b.scrollIntoView()
                    }
                }
            },
            enterBr: function(a, d, b, i) {
                if (b = b || p(a)) {
                    var f = b.document,
                        j = b.checkEndOfBlock(),
                        h = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()),
                        c = h.block,
                        h = c && h.block.getName();
                    !i && "li" == h ? o(a, d, b, i) : (!i && j && q.test(h) ? (j = c.getDirection()) ? (f = f.createElement("div"), f.setAttribute("dir", j), f.insertAfter(c), b.setStart(f, 0)) : (f.createElement("br").insertAfter(c), CKEDITOR.env.gecko && f.createText("").insertAfter(c), b.setStartAt(c.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (c = "pre" == h && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? f.createText("\r") : f.createElement("br"), b.deleteContents(), b.insertNode(c), CKEDITOR.env.ie ? b.setStartAt(c, CKEDITOR.POSITION_AFTER_END) : (f.createText("﻿").insertAfter(c), j && c.getParent().appendBogus(), c.getNext().$.nodeValue = "", b.setStartAt(c.getNext(), CKEDITOR.POSITION_AFTER_START))), b.collapse(!0), b.select(), b.scrollIntoView())
                }
            }
        };
        var r = CKEDITOR.plugins.enterkey,
            n = r.enterBr,
            o = r.enterBlock,
            q = /^h[1-6]$/
    })();
    (function() {
        function j(a, b) {
            var d = {},
                e = [],
                f = {
                    nbsp: " ",
                    shy: "­",
                    gt: ">",
                    lt: "<",
                    amp: "&",
                    apos: "'",
                    quot: '"'
                },
                a = a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function(a, h) {
                    var c = b ? "&" + h + ";" : f[h];
                    d[c] = b ? f[h] : "&" + h + ";";
                    e.push(c);
                    return ""
                });
            if (!b && a) {
                var a = a.split(","),
                    c = document.createElement("div"),
                    g;
                c.innerHTML = "&" + a.join(";&") + ";";
                g = c.innerHTML;
                c = null;
                for (c = 0; c < g.length; c++) {
                    var i = g.charAt(c);
                    d[i] = "&" + a[c] + ";";
                    e.push(i)
                }
            }
            d.regex = e.join(b ? "|" : "");
            return d
        }
        CKEDITOR.plugins.add("entities", {
            afterInit: function(a) {
                var b = a.config;
                if (a = (a = a.dataProcessor) && a.htmlFilter) {
                    var d = [];
                    !1 !== b.basicEntities && d.push("nbsp,gt,lt,amp");
                    b.entities && (d.length && d.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"), b.entities_latin && d.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), b.entities_greek && d.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"), b.entities_additional && d.push(b.entities_additional));
                    var e = j(d.join(",")),
                        f = e.regex ? "[" + e.regex + "]" : "a^";
                    delete e.regex;
                    b.entities && b.entities_processNumerical && (f = "[^ -~]|" + f);
                    var f = RegExp(f, "g"),
                        c = function(a) {
                            return b.entities_processNumerical == "force" || !e[a] ? "&#" + a.charCodeAt(0) + ";" : e[a]
                        },
                        g = j("nbsp,gt,lt,amp,shy", !0),
                        i = RegExp(g.regex, "g"),
                        k = function(a) {
                            return g[a]
                        };
                    a.addRules({
                        text: function(a) {
                            return a.replace(i, k).replace(f, c)
                        }
                    })
                }
            }
        })
    })();
    CKEDITOR.config.basicEntities = !0;
    CKEDITOR.config.entities = !0;
    CKEDITOR.config.entities_latin = !0;
    CKEDITOR.config.entities_greek = !0;
    CKEDITOR.config.entities_additional = "#39";
    (function() {
        function t(a) {
            var e = "left" == a ? "pageXOffset" : "pageYOffset";
            return e in g.$ ? g.$[e] : CKEDITOR.document.$.documentElement["left" == a ? "scrollLeft" : "scrollTop"]
        }
        function p(a) {
            var e, f = a.config,
                p = f.floatSpaceDockedOffsetX || 0,
                o = f.floatSpaceDockedOffsetY || 0,
                u = f.floatSpacePinnedOffsetX || 0,
                q = f.floatSpacePinnedOffsetY || 0,
                i = function(c) {
                    function f(a, c, b) {
                        d.setStyle(c, s(b));
                        d.setStyle("position", a)
                    }
                    function j(a) {
                        var c = r.getDocumentPosition();
                        switch (a) {
                        case "top":
                            f("absolute", "top", c.y - l - o);
                            break;
                        case "pin":
                            f("fixed", "top", q);
                            break;
                        case "bottom":
                            f("absolute", "top", c.y + (b.height || b.bottom - b.top) + o)
                        }
                        e = a
                    }
                    var r = a.editable();
                    if (r) {
                        "focus" == c.name && d.show();
                        d.removeStyle("left");
                        d.removeStyle("right");
                        var k = d.getClientRect(),
                            b = r.getClientRect(),
                            l = k.height,
                            n = t("left");
                        if (e) {
                            "top" == e && k.top < q ? j("pin") : "pin" == e ? b.top > o + l ? j("top") : b.bottom - k.bottom < l && j("bottom") : "bottom" == e && (b.top > o + l ? j("top") : b.bottom > 2 * l + q && j("pin"));
                            var c = g.getViewPaneSize(),
                                h = c.width / 2,
                                h = 0 < b.left && b.right < c.width && b.width > k.width ? "rtl" == a.config.contentsLangDirection ? "right" : "left" : h - b.left > b.right - h ? "left" : "right",
                                m;
                            k.width > c.width ? (h = "left", m = 0) : (m = "left" == h ? 0 < b.left ? b.left : 0 : b.right < c.width ? c.width - b.right : 0, m + k.width > c.width && (h = "left" == h ? "right" : "left", m = 0));
                            d.setStyle(h, s(("pin" == e ? u : p) + m + ("pin" == e ? 0 : "left" == h ? n : -n)))
                        } else e = "pin", j("pin"), i(c)
                    }
                },
                f = CKEDITOR.document.getBody(),
                v = {
                    id: a.id,
                    name: a.name,
                    langDir: a.lang.dir,
                    langCode: a.langCode
                },
                n = a.fire("uiSpace", {
                    space: "top",
                    html: ""
                }).html;
            if (n) {
                var d = f.append(CKEDITOR.dom.element.createFromHtml(w.output(CKEDITOR.tools.extend({
                    topId: a.ui.spaceId("top"),
                    content: n,
                    style: "display:none;z-index:" + (a.config.baseFloatZIndex - 1)
                }, v))));
                d.unselectable();
                d.on("mousedown", function(a) {
                    a = a.data;
                    a.getTarget().hasAscendant("a", 1) || a.preventDefault()
                });
                a.on("focus", function(a) {
                    i(a);
                    g.on("scroll", i);
                    g.on("resize", i)
                });
                a.on("blur", function() {
                    d.hide();
                    g.removeListener("scroll", i);
                    g.removeListener("resize", i)
                });
                a.on("destroy", function() {
                    g.removeListener("scroll", i);
                    g.removeListener("resize", i);
                    d.clearCustomData();
                    d.remove()
                });
                a.focusManager.hasFocus && d.show();
                a.focusManager.add(d, 1)
            }
        }
        var w = CKEDITOR.addTemplate("floatcontainer", '<div id="cke_{name}" class="cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir="{langDir}" title="' + (CKEDITOR.env.gecko ? " " : "") + '" lang="{langCode}" role="application" style="{style}"><div class="cke_inner"><div id="{topId}" class="cke_top" role="presentation">{content}</div></div></div>');
        CKEDITOR.plugins.add("floatingspace", {
            init: function(a) {
                a.on("loaded", function() {
                    p(a)
                }, null, null, 20)
            }
        });
        var g = CKEDITOR.document.getWindow(),
            s = CKEDITOR.tools.cssLength
    })();
    (function() {
        function l(a) {
            var d = this.editor,
                b = a.document,
                c = b.body;
            (a = b.getElementById("cke_actscrpt")) && a.parentNode.removeChild(a);
            (a = b.getElementById("cke_shimscrpt")) && a.parentNode.removeChild(a);
            CKEDITOR.env.gecko && (c.contentEditable = !1, 2E4 > CKEDITOR.env.version && (c.innerHTML = c.innerHTML.replace(/^.*<\!-- cke-content-start --\>/, ""), setTimeout(function() {
                var a = new CKEDITOR.dom.range(new CKEDITOR.dom.document(b));
                a.setStart(new CKEDITOR.dom.node(c), 0);
                d.getSelection().selectRanges([a])
            }, 0)));
            c.contentEditable = !0;
            CKEDITOR.env.ie && (c.hideFocus = !0, c.disabled = !0, c.removeAttribute("disabled"));
            delete this._.isLoadingData;
            this.$ = c;
            b = new CKEDITOR.dom.document(b);
            this.setup();
            CKEDITOR.env.ie && (b.getDocumentElement().addClass(b.$.compatMode), d.config.enterMode != CKEDITOR.ENTER_P && b.on("selectionchange", function() {
                var a = b.getBody(),
                    c = d.getSelection(),
                    e = c && c.getRanges()[0];
                e && (a.getHtml().match(/^<p>&nbsp;<\/p>$/i) && e.startContainer.equals(a)) && setTimeout(function() {
                    e = d.getSelection().getRanges()[0];
                    if (!e.startContainer.equals("body")) {
                        a.getFirst().remove(1);
                        e.moveToElementEditEnd(a);
                        e.select()
                    }
                }, 0)
            }));
            CKEDITOR.env.gecko && CKEDITOR.tools.setTimeout(m, 0, this, d);
            try {
                d.document.$.execCommand("2D-position", !1, !0)
            } catch (e) {}
            try {
                d.document.$.execCommand("enableInlineTableEditing", !1, !d.config.disableNativeTableHandles)
            } catch (f) {}
            if (d.config.disableObjectResizing) try {
                this.getDocument().$.execCommand("enableObjectResizing", !1, !1)
            } catch (g) {
                this.attachListener(this, CKEDITOR.env.ie ? "resizestart" : "resize", function(a) {
                    a.data.preventDefault()
                })
            }(CKEDITOR.env.gecko || CKEDITOR.env.ie && "CSS1Compat" == d.document.$.compatMode) && this.attachListener(this, "keydown", function(a) {
                var b = a.data.getKeystroke();
                if (b == 33 || b == 34) if (CKEDITOR.env.ie) setTimeout(function() {
                    d.getSelection().scrollIntoView()
                }, 0);
                else if (d.window.$.innerHeight > this.$.offsetHeight) {
                    var c = d.createRange();
                    c[b == 33 ? "moveToElementEditStart" : "moveToElementEditEnd"](this);
                    c.select();
                    a.data.preventDefault()
                }
            });
            CKEDITOR.env.ie && this.attachListener(b, "blur", function() {
                try {
                    b.$.selection.empty()
                } catch (a) {}
            });
            d.document.getElementsByTag("title").getItem(0).data("cke-title", d.document.$.title);
            CKEDITOR.env.ie && (d.document.$.title = this._.docTitle);
            CKEDITOR.tools.setTimeout(function() {
                d.fire("contentDom");
                if (this._.isPendingFocus) {
                    d.focus();
                    this._.isPendingFocus = false
                }
                setTimeout(function() {
                    d.fire("dataReady")
                }, 0);
                CKEDITOR.env.ie && setTimeout(function() {
                    if (d.document) {
                        var a = d.document.$.body;
                        a.runtimeStyle.marginBottom = "0px";
                        a.runtimeStyle.marginBottom = ""
                    }
                }, 1E3)
            }, 0, this)
        }
        function n(a) {
            a.checkDirty() || setTimeout(function() {
                a.resetDirty()
            }, 0)
        }
        function m(a) {
            if (!a.readOnly) {
                var d = a.window,
                    b = a.document,
                    c = b.getBody(),
                    e = c.getFirst(),
                    f = c.getChildren().count();
                if (!f || 1 == f && e.type == CKEDITOR.NODE_ELEMENT && e.hasAttribute("_moz_editor_bogus_node")) {
                    n(a);
                    var e = CKEDITOR.document,
                        g = e.getDocumentElement(),
                        h = g.$.scrollTop,
                        i = g.$.scrollLeft,
                        j = b.$.createEvent("KeyEvents");
                    j.initKeyEvent("keypress", !0, !0, d.$, !1, !1, !1, !1, 0, 32);
                    b.$.dispatchEvent(j);
                    (h != g.$.scrollTop || i != g.$.scrollLeft) && e.getWindow().$.scrollTo(i, h);
                    f && c.getFirst().remove();
                    b.getBody().appendBogus();
                    a = a.createRange();
                    a.setStartAt(c, CKEDITOR.POSITION_AFTER_START);
                    a.select()
                }
            }
        }
        function o() {
            var a = [];
            if (8 <= CKEDITOR.document.$.documentMode) {
                a.push("html.CSS1Compat [contenteditable=false]{min-height:0 !important}");
                var d = [],
                    b;
                for (b in CKEDITOR.dtd.$removeEmpty) d.push("html.CSS1Compat " + b + "[contenteditable=false]");
                a.push(d.join(",") + "{display:inline-block}")
            } else CKEDITOR.env.gecko && (a.push("html{height:100% !important}"), a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));
            a.push("html{cursor:text;*cursor:auto}");
            a.push("img,input,textarea{cursor:default}");
            return a.join("\n")
        }
        CKEDITOR.plugins.add("wysiwygarea", {
            init: function(a) {
                a.config.fullPage && a.addFeature({
                    allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]",
                    requiredContent: "body"
                });
                a.addMode("wysiwyg", function(d) {
                    function b(b) {
                        b && b.removeListener();
                        a.editable(new k(a, e.$.contentWindow.document.body));
                        a.setData(a.getData(1), d)
                    }
                    var c = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();",
                        c = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent(c) + "}())" : "",
                        e = CKEDITOR.dom.element.createFromHtml('<iframe src="' + c + '" frameBorder="0"></iframe>');
                    e.setStyles({
                        width: "100%",
                        height: "100%"
                    });
                    e.addClass("cke_wysiwyg_frame cke_reset");
                    var f = a.ui.space("contents");
                    f.append(e);
                    if (c = CKEDITOR.env.ie || CKEDITOR.env.gecko) e.on("load", b);
                    var g = [a.lang.editor, a.name].join(),
                        h = a.lang.common.editorHelp;
                    CKEDITOR.env.ie && (g += ", " + h);
                    var i = CKEDITOR.tools.getNextId(),
                        j = CKEDITOR.dom.element.createFromHtml('<span id="' + i + '" class="cke_voice_label">' + h + "</span>");
                    f.append(j, 1);
                    a.on("beforeModeUnload", function(a) {
                        a.removeListener();
                        j.remove()
                    });
                    e.setAttributes({
                        "aria-describedby": i,
                        title: g,
                        tabIndex: a.tabIndex,
                        allowTransparency: "true"
                    });
                    !c && b();
                    CKEDITOR.env.webkit && (c = function() {
                        f.setStyle("width", "100%");
                        e.hide();
                        e.setSize("width", f.getSize("width"));
                        f.removeStyle("width");
                        e.show()
                    }, e.setCustomData("onResize", c), CKEDITOR.document.getWindow().on("resize", c));
                    a.fire("ariaWidget", e)
                })
            }
        });
        var k = CKEDITOR.tools.createClass({
            $: function(a) {
                this.base.apply(this, arguments);
                this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function(a) {
                    CKEDITOR.tools.setTimeout(l, 0, this, a)
                }, this);
                this._.docTitle = this.getWindow().getFrame().getAttribute("title")
            },
            base: CKEDITOR.editable,
            proto: {
                setData: function(a, d) {
                    var b = this.editor;
                    if (d) this.setHtml(a);
                    else {
                        this._.isLoadingData = !0;
                        b._.dataStore = {
                            id: 1
                        };
                        var c = b.config,
                            e = c.fullPage,
                            f = c.docType,
                            g = CKEDITOR.tools.buildStyleHtml(o()).replace(/<style>/, '<style data-cke-temp="1">');
                        e || (g += CKEDITOR.tools.buildStyleHtml(b.config.contentsCss));
                        var h = c.baseHref ? '<base href="' + c.baseHref + '" data-cke-temp="1" />' : "";
                        e && (a = a.replace(/<!DOCTYPE[^>]*>/i, function(a) {
                            b.docType = f = a;
                            return ""
                        }).replace(/<\?xml\s[^\?]*\?>/i, function(a) {
                            b.xmlDeclaration = a;
                            return ""
                        }));
                        b.dataProcessor && (a = b.dataProcessor.toHtml(a));
                        e ? (/<body[\s|>]/.test(a) || (a = "<body>" + a), /<html[\s|>]/.test(a) || (a = "<html>" + a + "</html>"), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$&<title></title>")) : a = a.replace(/<html[^>]*>/, "$&<head><title></title></head>"), h && (a = a.replace(/<head>/, "$&" + h)), a = a.replace(/<\/head\s*>/, g + "$&"), a = f + a) : a = c.docType + '<html dir="' + c.contentsLangDirection + '" lang="' + (c.contentsLanguage || b.langCode) + '"><head><title>' + this._.docTitle + "</title>" + h + g + "</head><body" + (c.bodyId ? ' id="' + c.bodyId + '"' : "") + (c.bodyClass ? ' class="' + c.bodyClass + '"' : "") + ">" + a + "</body></html>";
                        CKEDITOR.env.gecko && (a = a.replace(/<body/, '<body contenteditable="true" '), 2E4 > CKEDITOR.env.version && (a = a.replace(/<body[^>]*>/, "$&<\!-- cke-content-start --\>")));
                        c = '<script id="cke_actscrpt" type="text/javascript"' + (CKEDITOR.env.ie ? ' defer="defer" ' : "") + ">var wasLoaded=0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded=1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "<\/script>";
                        CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (c += '<script id="cke_shimscrpt">(function(){var e="abbr,article,aside,audio,bdi,canvas,data,datalist,details,figcaption,figure,footer,header,hgroup,mark,meter,nav,output,progress,section,summary,time,video".split(","),i=e.length;while(i--){document.createElement(e[i])}})()<\/script>');
                        a = a.replace(/(?=\s*<\/(:?head)>)/, c);
                        this.clearCustomData();
                        this.clearListeners();
                        b.fire("contentDomUnload");
                        var i = this.getDocument();
                        try {
                            i.write(a)
                        } catch (j) {
                            setTimeout(function() {
                                i.write(a)
                            }, 0)
                        }
                    }
                },
                getData: function(a) {
                    if (a) return this.getHtml();
                    var a = this.editor,
                        d = a.config,
                        b = d.fullPage,
                        c = b && a.docType,
                        e = b && a.xmlDeclaration,
                        f = this.getDocument(),
                        b = b ? f.getDocumentElement().getOuterHtml() : f.getBody().getHtml();
                    CKEDITOR.env.gecko && d.enterMode != CKEDITOR.ENTER_BR && (b = b.replace(/<br>(?=\s*(:?$|<\/body>))/, ""));
                    a.dataProcessor && (b = a.dataProcessor.toDataFormat(b));
                    e && (b = e + "\n" + b);
                    c && (b = c + "\n" + b);
                    return b
                },
                focus: function() {
                    this._.isLoadingData ? this._.isPendingFocus = !0 : k.baseProto.focus.call(this)
                },
                detach: function() {
                    var a = this.editor,
                        d = a.document,
                        b = a.window.getFrame();
                    k.baseProto.detach.call(this);
                    this.clearCustomData();
                    d.getDocumentElement().clearCustomData();
                    b.clearCustomData();
                    CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);
                    (d = b.removeCustomData("onResize")) && d.removeListener();
                    a.fire("contentDomUnload");
                    b.remove()
                }
            }
        })
    })();
    CKEDITOR.config.disableObjectResizing = !1;
    CKEDITOR.config.disableNativeTableHandles = !0;
    CKEDITOR.config.disableNativeSpellChecker = !0;
    CKEDITOR.config.contentsCss = CKEDITOR.basePath + "contents.css";
    (function() {
        function g(a, b) {
            var c = j.exec(a),
                d = j.exec(b);
            if (c) {
                if (!c[2] && "px" == d[2]) return d[1];
                if ("px" == c[2] && !d[2]) return d[1] + "px"
            }
            return b
        }
        var i = CKEDITOR.htmlParser.cssStyle,
            h = CKEDITOR.tools.cssLength,
            j = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,
            l = {
                elements: {
                    $: function(a) {
                        var b = a.attributes;
                        if ((b = (b = (b = b && b["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(b))) && b.children[0]) && a.attributes["data-cke-resizable"]) {
                            var c = (new i(a)).rules,
                                a = b.attributes,
                                d = c.width,
                                c = c.height;
                            d && (a.width = g(a.width, d));
                            c && (a.height = g(a.height, c))
                        }
                        return b
                    }
                }
            },
            k = CKEDITOR.plugins.add("fakeobjects", {
                afterInit: function(a) {
                    (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(l)
                }
            });
        CKEDITOR.editor.prototype.createFakeElement = function(a, b, c, d) {
            var e = this.lang.fakeobjects,
                e = e[c] || e.unknown,
                b = {
                    "class": b,
                    "data-cke-realelement": encodeURIComponent(a.getOuterHtml()),
                    "data-cke-real-node-type": a.type,
                    alt: e,
                    title: e,
                    align: a.getAttribute("align") || ""
                };
            CKEDITOR.env.hc || (b.src = CKEDITOR.getUrl(k.path + "images/spacer.gif"));
            c && (b["data-cke-real-element-type"] = c);
            d && (b["data-cke-resizable"] = d, c = new i, d = a.getAttribute("width"), a = a.getAttribute("height"), d && (c.rules.width = h(d)), a && (c.rules.height = h(a)), c.populate(b));
            return this.document.createElement("img", {
                attributes: b
            })
        };
        CKEDITOR.editor.prototype.createFakeParserElement = function(a, b, c, d) {
            var e = this.lang.fakeobjects,
                e = e[c] || e.unknown,
                f;
            f = new CKEDITOR.htmlParser.basicWriter;
            a.writeHtml(f);
            f = f.getHtml();
            b = {
                "class": b,
                "data-cke-realelement": encodeURIComponent(f),
                "data-cke-real-node-type": a.type,
                alt: e,
                title: e,
                align: a.attributes.align || ""
            };
            CKEDITOR.env.hc || (b.src = CKEDITOR.getUrl(k.path + "images/spacer.gif"));
            c && (b["data-cke-real-element-type"] = c);
            d && (b["data-cke-resizable"] = d, d = a.attributes, a = new i, c = d.width, d = d.height, void 0 != c && (a.rules.width = h(c)), void 0 != d && (a.rules.height = h(d)), a.populate(b));
            return new CKEDITOR.htmlParser.element("img", b)
        };
        CKEDITOR.editor.prototype.restoreRealElement = function(a) {
            if (a.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null;
            var b = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(a.data("cke-realelement")), this.document);
            if (a.data("cke-resizable")) {
                var c = a.getStyle("width"),
                    a = a.getStyle("height");
                c && b.setAttribute("width", g(b.getAttribute("width"), c));
                a && b.setAttribute("height", g(b.getAttribute("height"), a))
            }
            return b
        }
    })();
    CKEDITOR.plugins.add("link", {
        requires: "dialog,fakeobjects",
        onLoad: function() {
            function b(b) {
                return d.replace(/%1/g, "rtl" == b ? "right" : "left").replace(/%2/g, "cke_contents_" + b)
            }
            var a = "background:url(" + CKEDITOR.getUrl(this.path + "images/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;",
                d = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + a + "padding-%1:18px;cursor:auto;}" + (CKEDITOR.env.ie ? "a.cke_anchor_empty{display:inline-block;}" : "") + ".%2 img.cke_anchor{" + a + "width:16px;min-height:15px;height:1.15em;vertical-align:" + (CKEDITOR.env.opera ? "middle" : "text-bottom") + ";}";
            CKEDITOR.addCss(b("ltr") + b("rtl"))
        },
        init: function(b) {
            var a = "a[!href]";
            CKEDITOR.dialog.isTabEnabled(b, "link", "advanced") && (a = a.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type]{*}(*)"));
            CKEDITOR.dialog.isTabEnabled(b, "link", "target") && (a = a.replace("]", ",target,onclick]"));
            b.addCommand("link", new CKEDITOR.dialogCommand("link", {
                allowedContent: a,
                requiredContent: "a[href]"
            }));
            b.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", {
                allowedContent: "a[!name,id]",
                requiredContent: "a[name]"
            }));
            b.addCommand("unlink", new CKEDITOR.unlinkCommand);
            b.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand);
            b.setKeystroke(CKEDITOR.CTRL + 76, "link");
            b.ui.addButton && (b.ui.addButton("Link", {
                label: b.lang.link.toolbar,
                command: "link",
                toolbar: "links,10"
            }), b.ui.addButton("Unlink", {
                label: b.lang.link.unlink,
                command: "unlink",
                toolbar: "links,20"
            }), b.ui.addButton("Anchor", {
                label: b.lang.link.anchor.toolbar,
                command: "anchor",
                toolbar: "links,30"
            }));
            CKEDITOR.dialog.add("link", this.path + "dialogs/link.js");
            CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js");
            b.on("doubleclick", function(a) {
                var c = CKEDITOR.plugins.link.getSelectedLink(b) || a.data.element;
                if (!c.isReadOnly()) if (c.is("a")) {
                    a.data.dialog = c.getAttribute("name") && (!c.getAttribute("href") || !c.getChildCount()) ? "anchor" : "link";
                    b.getSelection().selectElement(c)
                } else if (CKEDITOR.plugins.link.tryRestoreFakeAnchor(b, c)) a.data.dialog = "anchor"
            });
            b.addMenuItems && b.addMenuItems({
                anchor: {
                    label: b.lang.link.anchor.menu,
                    command: "anchor",
                    group: "anchor",
                    order: 1
                },
                removeAnchor: {
                    label: b.lang.link.anchor.remove,
                    command: "removeAnchor",
                    group: "anchor",
                    order: 5
                },
                link: {
                    label: b.lang.link.menu,
                    command: "link",
                    group: "link",
                    order: 1
                },
                unlink: {
                    label: b.lang.link.unlink,
                    command: "unlink",
                    group: "link",
                    order: 5
                }
            });
            b.contextMenu && b.contextMenu.addListener(function(a) {
                if (!a || a.isReadOnly()) return null;
                a = CKEDITOR.plugins.link.tryRestoreFakeAnchor(b, a);
                if (!a && !(a = CKEDITOR.plugins.link.getSelectedLink(b))) return null;
                var c = {};
                a.getAttribute("href") && a.getChildCount() && (c = {
                    link: CKEDITOR.TRISTATE_OFF,
                    unlink: CKEDITOR.TRISTATE_OFF
                });
                if (a && a.hasAttribute("name")) c.anchor = c.removeAnchor = CKEDITOR.TRISTATE_OFF;
                return c
            })
        },
        afterInit: function(b) {
            var a = b.dataProcessor,
                d = a && a.dataFilter,
                a = a && a.htmlFilter,
                c = b._.elementsPath && b._.elementsPath.filters;
            d && d.addRules({
                elements: {
                    a: function(a) {
                        var c = a.attributes;
                        if (!c.name) return null;
                        var d = !a.children.length;
                        if (CKEDITOR.plugins.link.synAnchorSelector) {
                            var a = d ? "cke_anchor_empty" : "cke_anchor",
                                e = c["class"];
                            if (c.name && (!e || 0 > e.indexOf(a))) c["class"] = (e || "") + " " + a;
                            d && CKEDITOR.plugins.link.emptyAnchorFix && (c.contenteditable = "false", c["data-cke-editable"] = 1)
                        } else if (CKEDITOR.plugins.link.fakeAnchor && d) return b.createFakeParserElement(a, "cke_anchor", "anchor");
                        return null
                    }
                }
            });
            CKEDITOR.plugins.link.emptyAnchorFix && a && a.addRules({
                elements: {
                    a: function(a) {
                        delete a.attributes.contenteditable
                    }
                }
            });
            c && c.push(function(a, c) {
                if ("a" == c && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(b, a) || a.getAttribute("name") && (!a.getAttribute("href") || !a.getChildCount()))) return "anchor"
            })
        }
    });
    CKEDITOR.plugins.link = {
        getSelectedLink: function(b) {
            var a = b.getSelection(),
                d = a.getSelectedElement();
            return d && d.is("a") ? d : (a = a.getRanges(!0)[0]) ? (a.shrink(CKEDITOR.SHRINK_TEXT), b.elementPath(a.getCommonAncestor()).contains("a", 1)) : null
        },
        fakeAnchor: CKEDITOR.env.opera || CKEDITOR.env.webkit,
        synAnchorSelector: CKEDITOR.env.ie,
        emptyAnchorFix: CKEDITOR.env.ie && 8 > CKEDITOR.env.version,
        tryRestoreFakeAnchor: function(b, a) {
            if (a && a.data("cke-real-element-type") && "anchor" == a.data("cke-real-element-type")) {
                var d = b.restoreRealElement(a);
                if (d.data("cke-saved-name")) return d
            }
        }
    };
    CKEDITOR.unlinkCommand = function() {};
    CKEDITOR.unlinkCommand.prototype = {
        exec: function(b) {
            var a = new CKEDITOR.style({
                element: "a",
                type: CKEDITOR.STYLE_INLINE,
                alwaysRemoveElement: 1
            });
            b.removeStyle(a)
        },
        refresh: function(b, a) {
            var d = a.lastElement && a.lastElement.getAscendant("a", !0);
            d && "a" == d.getName() && d.getAttribute("href") && d.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
        },
        contextSensitive: 1,
        startDisabled: 1,
        requiredContent: "a[href]"
    };
    CKEDITOR.removeAnchorCommand = function() {};
    CKEDITOR.removeAnchorCommand.prototype = {
        exec: function(b) {
            var a = b.getSelection(),
                d = a.createBookmarks(),
                c;
            if (a && (c = a.getSelectedElement()) && (CKEDITOR.plugins.link.fakeAnchor && !c.getChildCount() ? CKEDITOR.plugins.link.tryRestoreFakeAnchor(b, c) : c.is("a"))) c.remove(1);
            else if (c = CKEDITOR.plugins.link.getSelectedLink(b)) c.hasAttribute("href") ? (c.removeAttributes({
                name: 1,
                "data-cke-saved-name": 1
            }), c.removeClass("cke_anchor")) : c.remove(1);
            a.selectBookmarks(d)
        },
        requiredContent: "a[name]"
    };
    CKEDITOR.tools.extend(CKEDITOR.config, {
        linkShowAdvancedTab: !0,
        linkShowTargetTab: !0
    });
    (function() {
        function i(a) {
            this.editor = a;
            this.reset()
        }
        CKEDITOR.plugins.add("undo", {
            init: function(a) {
                function c(a) {
                    b.enabled && !1 !== a.data.command.canUndo && b.save()
                }
                function d() {
                    b.enabled = a.readOnly ? !1 : "wysiwyg" == a.mode;
                    b.onChange()
                }
                var b = new i(a),
                    e = a.addCommand("undo", {
                        exec: function() {
                            b.undo() && (a.selectionChange(), this.fire("afterUndo"))
                        },
                        state: CKEDITOR.TRISTATE_DISABLED,
                        canUndo: !1
                    }),
                    f = a.addCommand("redo", {
                        exec: function() {
                            b.redo() && (a.selectionChange(), this.fire("afterRedo"))
                        },
                        state: CKEDITOR.TRISTATE_DISABLED,
                        canUndo: !1
                    });
                a.setKeystroke([
                    [CKEDITOR.CTRL + 90, "undo"],
                    [CKEDITOR.CTRL + 89, "redo"],
                    [CKEDITOR.CTRL + CKEDITOR.SHIFT + 90, "redo"]
                ]);
                b.onChange = function() {
                    e.setState(b.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                    f.setState(b.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                };
                a.on("beforeCommandExec", c);
                a.on("afterCommandExec", c);
                a.on("saveSnapshot", function(a) {
                    b.save(a.data && a.data.contentOnly)
                });
                a.on("contentDom", function() {
                    a.editable().on("keydown", function(a) {
                        !a.data.$.ctrlKey && !a.data.$.metaKey && b.type(a)
                    })
                });
                a.on("beforeModeUnload", function() {
                    "wysiwyg" == a.mode && b.save(!0)
                });
                a.on("mode", d);
                a.on("readOnly", d);
                a.ui.addButton && (a.ui.addButton("Undo", {
                    label: a.lang.undo.undo,
                    command: "undo",
                    toolbar: "undo,10"
                }), a.ui.addButton("Redo", {
                    label: a.lang.undo.redo,
                    command: "redo",
                    toolbar: "undo,20"
                }));
                a.resetUndo = function() {
                    b.reset();
                    a.fire("saveSnapshot")
                };
                a.on("updateSnapshot", function() {
                    b.currentImage && b.update()
                });
                a.on("lockSnapshot", b.lock, b);
                a.on("unlockSnapshot", b.unlock, b)
            }
        });
        CKEDITOR.plugins.undo = {};
        var h = CKEDITOR.plugins.undo.Image = function(a) {
                this.editor = a;
                a.fire("beforeUndoImage");
                var c = a.getSnapshot(),
                    d = c && a.getSelection();
                CKEDITOR.env.ie && c && (c = c.replace(/\s+data-cke-expando=".*?"/g, ""));
                this.contents = c;
                this.bookmarks = d && d.createBookmarks2(!0);
                a.fire("afterUndoImage")
            },
            j = /\b(?:href|src|name)="[^"]*?"/gi;
        h.prototype = {
            equals: function(a, c) {
                var d = this.contents,
                    b = a.contents;
                if (CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat)) d = d.replace(j, ""), b = b.replace(j, "");
                if (d != b) return !1;
                if (c) return !0;
                d = this.bookmarks;
                b = a.bookmarks;
                if (d || b) {
                    if (!d || !b || d.length != b.length) return !1;
                    for (var e = 0; e < d.length; e++) {
                        var f = d[e],
                            g = b[e];
                        if (f.startOffset != g.startOffset || f.endOffset != g.endOffset || !CKEDITOR.tools.arrayCompare(f.start, g.start) || !CKEDITOR.tools.arrayCompare(f.end, g.end)) return !1
                    }
                }
                return !0
            }
        };
        var k = {
            8: 1,
            46: 1
        },
            m = {
                16: 1,
                17: 1,
                18: 1
            },
            l = {
                37: 1,
                38: 1,
                39: 1,
                40: 1
            };
        i.prototype = {
            type: function(a) {
                var a = a && a.data.getKey(),
                    c = a in k,
                    d = this.lastKeystroke in k,
                    b = c && a == this.lastKeystroke,
                    e = a in l,
                    f = this.lastKeystroke in l;
                if (!(a in m || this.typing) || !c && !e && (d || f) || c && !b) {
                    var g = new h(this.editor),
                        i = this.snapshots.length;
                    CKEDITOR.tools.setTimeout(function() {
                        var a = this.editor.getSnapshot();
                        CKEDITOR.env.ie && (a = a.replace(/\s+data-cke-expando=".*?"/g, ""));
                        g.contents != a && i == this.snapshots.length && (this.typing = !0, this.save(!1, g, !1) || this.snapshots.splice(this.index + 1, this.snapshots.length - this.index - 1), this.hasUndo = !0, this.hasRedo = !1, this.modifiersCount = this.typesCount = 1, this.onChange())
                    }, 0, this)
                }
                this.lastKeystroke = a;
                c ? (this.typesCount = 0, this.modifiersCount++, 25 < this.modifiersCount && (this.save(!1, null, !1), this.modifiersCount = 1)) : e || (this.modifiersCount = 0, this.typesCount++, 25 < this.typesCount && (this.save(!1, null, !1), this.typesCount = 1))
            },
            reset: function() {
                this.lastKeystroke = 0;
                this.snapshots = [];
                this.index = -1;
                this.limit = this.editor.config.undoStackSize || 20;
                this.currentImage = null;
                this.hasRedo = this.hasUndo = !1;
                this.locked = null;
                this.resetType()
            },
            resetType: function() {
                this.typing = !1;
                delete this.lastKeystroke;
                this.modifiersCount = this.typesCount = 0
            },
            fireChange: function() {
                this.hasUndo = !! this.getNextImage(!0);
                this.hasRedo = !! this.getNextImage(!1);
                this.resetType();
                this.onChange()
            },
            save: function(a, c, d) {
                if (this.locked) return !1;
                var b = this.snapshots;
                c || (c = new h(this.editor));
                if (!1 === c.contents || this.currentImage && c.equals(this.currentImage, a)) return !1;
                b.splice(this.index + 1, b.length - this.index - 1);
                b.length == this.limit && b.shift();
                this.index = b.push(c) - 1;
                this.currentImage = c;
                !1 !== d && this.fireChange();
                return !0
            },
            restoreImage: function(a) {
                var c = this.editor,
                    d;
                a.bookmarks && (c.focus(), d = c.getSelection());
                this.locked = 1;
                this.editor.loadSnapshot(a.contents);
                a.bookmarks ? d.selectBookmarks(a.bookmarks) : CKEDITOR.env.ie && (c = this.editor.document.getBody().$.createTextRange(), c.collapse(!0), c.select());
                this.locked = 0;
                this.index = a.index;
                this.update();
                this.fireChange()
            },
            getNextImage: function(a) {
                var c = this.snapshots,
                    d = this.currentImage,
                    b;
                if (d) if (a) for (b = this.index - 1; 0 <= b; b--) {
                    if (a = c[b], !d.equals(a, !0)) return a.index = b, a
                } else for (b = this.index + 1; b < c.length; b++) if (a = c[b], !d.equals(a, !0)) return a.index = b, a;
                return null
            },
            redoable: function() {
                return this.enabled && this.hasRedo
            },
            undoable: function() {
                return this.enabled && this.hasUndo
            },
            undo: function() {
                if (this.undoable()) {
                    this.save(!0);
                    var a = this.getNextImage(!0);
                    if (a) return this.restoreImage(a), !0
                }
                return !1
            },
            redo: function() {
                if (this.redoable() && (this.save(!0), this.redoable())) {
                    var a = this.getNextImage(!1);
                    if (a) return this.restoreImage(a), !0
                }
                return !1
            },
            update: function() {
                this.locked || this.snapshots.splice(this.index, 1, this.currentImage = new h(this.editor))
            },
            lock: function() {
                if (this.locked) this.locked.level++;
                else {
                    var a = new h(this.editor);
                    this.locked = {
                        update: this.currentImage && this.currentImage.equals(a, !0) ? a : null,
                        level: 1
                    }
                }
            },
            unlock: function() {
                if (this.locked && !--this.locked.level) {
                    var a = this.locked.update;
                    this.locked = null;
                    a && !a.equals(new h(this.editor), !0) && this.update()
                }
            }
        }
    })();
    CKEDITOR.config.plugins = 'dialogui,dialog,about,basicstyles,clipboard,button,toolbar,list,indent,enterkey,entities,floatingspace,wysiwygarea,fakeobjects,link,undo';
    CKEDITOR.config.skin = 'moono';
    (function() {
        var icons = ('about,0,bold,32,italic,64,strike,96,subscript,128,superscript,160,underline,192,copy-rtl,224,copy,256,cut-rtl,288,cut,320,paste-rtl,352,paste,384,bulletedlist-rtl,416,bulletedlist,448,numberedlist-rtl,480,numberedlist,512,indent-rtl,544,indent,576,outdent-rtl,608,outdent,640,anchor-rtl,672,anchor,704,link,736,unlink,768,redo-rtl,800,redo,832,undo-rtl,864,undo,896'),
            path = CKEDITOR.getUrl('plugins/icons.png'),
            icons = icons.split(',');
        for (var i = 0; i < icons.length; i++) CKEDITOR.skin.icons[icons[i]] = {
            path: path,
            offset: -icons[++i]
        };
    })();
    CKEDITOR.lang.languages = {
        "af": 1,
        "sq": 1,
        "ar": 1,
        "eu": 1,
        "bn": 1,
        "bs": 1,
        "bg": 1,
        "ca": 1,
        "zh-cn": 1,
        "zh": 1,
        "hr": 1,
        "cs": 1,
        "da": 1,
        "nl": 1,
        "en": 1,
        "en-au": 1,
        "en-ca": 1,
        "en-gb": 1,
        "eo": 1,
        "et": 1,
        "fo": 1,
        "fi": 1,
        "fr": 1,
        "fr-ca": 1,
        "gl": 1,
        "ka": 1,
        "de": 1,
        "el": 1,
        "gu": 1,
        "he": 1,
        "hi": 1,
        "hu": 1,
        "is": 1,
        "it": 1,
        "ja": 1,
        "km": 1,
        "ko": 1,
        "ku": 1,
        "lv": 1,
        "lt": 1,
        "mk": 1,
        "ms": 1,
        "mn": 1,
        "no": 1,
        "nb": 1,
        "fa": 1,
        "pl": 1,
        "pt-br": 1,
        "pt": 1,
        "ro": 1,
        "ru": 1,
        "sr": 1,
        "sr-latn": 1,
        "si": 1,
        "sk": 1,
        "sl": 1,
        "es": 1,
        "sv": 1,
        "th": 1,
        "tr": 1,
        "ug": 1,
        "uk": 1,
        "vi": 1,
        "cy": 1
    };
}());