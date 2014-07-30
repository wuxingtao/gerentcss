(function () {
    "use strict";
    function $extend(from, fields) {
        function inherit() { }; inherit.prototype = from; var proto = new inherit();
        for (var name in fields) proto[name] = fields[name];
        if (fields.toString !== Object.prototype.toString) proto.toString = fields.toString;
        return proto;
    }
    var EReg = function (r, opt) {
        opt = opt.split("u").join("");
        this.r = new RegExp(r, opt);
    };
    EReg.__name__ = true;
    EReg.prototype = {
        replace: function (s, by) {
            return s.replace(this.r, by);
        }
	, matched: function (n) {
	    return this.r.m != null && n >= 0 && n < this.r.m.length ? this.r.m[n] : (function ($this) {
	        var $r;
	        throw "EReg::matched";
	        return $r;
	    } (this));
	}
	, match: function (s) {
	    if (this.r.global) this.r.lastIndex = 0;
	    this.r.m = this.r.exec(s);
	    this.r.s = s;
	    return this.r.m != null;
	}
	, __class__: EReg
    }
    var _Either = {}
    _Either.Either_Impl_ = function () { }
    _Either.Either_Impl_.__name__ = true;
    var HxOverrides = function () { }
    HxOverrides.__name__ = true;
    HxOverrides.cca = function (s, index) {
        var x = s.charCodeAt(index);
        if (x != x) return undefined;
        return x;
    }
    HxOverrides.substr = function (s, pos, len) {
        if (pos != null && pos != 0 && len != null && len < 0) return "";
        if (len == null) len = s.length;
        if (pos < 0) {
            pos = s.length + pos;
            if (pos < 0) pos = 0;
        } else if (len < 0) len = s.length + len - pos;
        return s.substr(pos, len);
    }
    HxOverrides.iter = function (a) {
        return { cur: 0, arr: a, hasNext: function () {
            return this.cur < this.arr.length;
        }, next: function () {
            return this.arr[this.cur++];
        }
        };
    }
    var IMap = function () { }
    IMap.__name__ = true;
    var Reflect = function () { }
    Reflect.__name__ = true;
    Reflect.field = function (o, field) {
        var v = null;
        try {
            v = o[field];
        } catch (e) {
        }
        return v;
    }
    Reflect.fields = function (o) {
        var a = [];
        if (o != null) {
            var hasOwnProperty = Object.prototype.hasOwnProperty;
            for (var f in o) {
                if (f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o, f)) a.push(f);
            }
        }
        return a;
    }
    Reflect.isFunction = function (f) {
        return typeof (f) == "function" && !(f.__name__ || f.__ename__);
    }
    Reflect.compareMethods = function (f1, f2) {
        if (f1 == f2) return true;
        if (!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
        return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
    }
    Reflect.isObject = function (v) {
        if (v == null) return false;
        var t = typeof (v);
        return t == "string" || t == "object" && v.__enum__ == null || t == "function" && (v.__name__ || v.__ename__) != null;
    }
    Reflect.makeVarArgs = function (f) {
        return function () {
            var a = Array.prototype.slice.call(arguments);
            return f(a);
        };
    }
    var Std = function () { }
    Std.__name__ = true;
    Std.string = function (s) {
        return js.Boot.__string_rec(s, "");
    }
    Std.parseInt = function (x) {
        var v = parseInt(x, 10);
        if (v == 0 && (HxOverrides.cca(x, 1) == 120 || HxOverrides.cca(x, 1) == 88)) v = parseInt(x);
        if (isNaN(v)) return null;
        return v;
    }
    Std.parseFloat = function (x) {
        return parseFloat(x);
    }
    var StringTools = function () { }
    StringTools.__name__ = true;
    StringTools.hex = function (n, digits) {
        var s = "";
        var hexChars = "0123456789ABCDEF";
        do {
            s = hexChars.charAt(n & 15) + s;
            n >>>= 4;
        } while (n > 0);
        if (digits != null) while (s.length < digits) s = "0" + s;
        return s;
    }
    var Type = function () { }
    Type.__name__ = true;
    Type.getClass = function (o) {
        if (o == null) return null;
        return o.__class__;
    }
    Type.createInstance = function (cl, args) {
        switch (args.length) {
            case 0:
                return new cl();
            case 1:
                return new cl(args[0]);
            case 2:
                return new cl(args[0], args[1]);
            case 3:
                return new cl(args[0], args[1], args[2]);
            case 4:
                return new cl(args[0], args[1], args[2], args[3]);
            case 5:
                return new cl(args[0], args[1], args[2], args[3], args[4]);
            case 6:
                return new cl(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7:
                return new cl(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            case 8:
                return new cl(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
            default:
                throw "Too many arguments";
        }
        return null;
    }
    Type.createEmptyInstance = function (cl) {
        function empty() { }; empty.prototype = cl.prototype;
        return new empty();
    }
    var com = {}
    com.todream = {}
    com.todream.Config = function () {
    };
    com.todream.Config.__name__ = true;
    com.todream.Config.prototype = {
        __class__: com.todream.Config
    }
    com.todream.Main = function () { }
    com.todream.Main.__name__ = true;
    com.todream.Main.main = function () {
        var window = js.Browser.window;
        if (!window.Element) window.Element = function () {
        };
        if (window.console == null) window.console = { log: function () {
        }
        };
        var win = new $(window);
        win.ready(function () {
            var tcss;
            var cfg;
            if (window.tcss == null) {
                window.tcss = com.todream.Tcss.getInstance();
                cfg = new com.todream.Config();
            } else {
                cfg = window.tcss;
                window.tcss = new com.todream.Tcss();
            }
            tcss = window.tcss;
            tcss.startup(cfg);
            tcss.resize();
        });
        win.resize(function (e) {
            if (window.tcss) {
                var tcss = window.tcss;
                tcss.resize();
            }
        });
    }
    com.todream.PageController = function (props) {
        this.mcl = com.todream.m.MCollections.getInstance();
        this.tcss = com.todream.Tcss.getInstance();
        this.window = js.Browser.window;
        this.document = js.Browser.document;
        this.location = this.window.location;
        this.parser = com.todream.TcssParser.getInstance();
        if (props != null) this.init(props);
    };
    com.todream.PageController.__name__ = true;
    com.todream.PageController.prototype = {
        swapDepth: function (ja, jb) {
            var z = ja.css("z-index");
            ja.css("z-index", jb.css("z-index"));
            jb.css("z-index", z);
        }
	, loadJs: function (page) {
	    var _g = this;
	    var url = this.base + page.js;
	    if (page.js == "") {
	        if (this.transition_in == null || this.transition_in == "") this.content.css("opacity", "1"); else this.mcl.getMovie("#" + this.content.attr("id"), false, { clip: this.transition_in }).enable().play();
	        return;
	    }
	    $.ajax({ url: url, cache: false, success: function (js) {

	        if (_g.prePage != null) {
	            var cssList = _g.document.getElementsByTagName("style");
	            var cssNode = _g.prePage.cssNode;
	            var cn;
	            var _g2 = 0, _g1 = cssList.length;
	            while (_g2 < _g1) {
	                var i = _g2++;
	                cn = cssList.item(i);
	                if (cn == cssNode) {
	                    cn.parentNode.removeChild(cn);
	                    break;
	                }
	            }
	        }
	        if (_g.action) _g.action.destory();
	        _g.action = page.action = _g.window["eval"](js);
	        if (_g.transition_in == null || _g.transition_in == "") {
	            _g.content.css("opacity", "1");
	            _g.action.update();
	            _g.tcss.redraw();
	            _g.action.init();
	        } else {
	            console.log("transition_in!");
	            _g.action.update();
	            _g.tcss.redraw();
	            _g.mcl.getMovie("#" + _g.content.attr("id"), false, { clip: _g.transition_in }).enable().play().addListener(function (e) {
	                if (e.type == "finished") {
	                    _g.content.css("opacity", "1");
	                    _g.action.init();
	                }
	            });
	        }
	        _g.prePage = _g.currentPage;
	    }
	    });
	}
	, loadTcss: function (page) {
	    var _g = this;
	    var url = this.base + page.t;
	    $.ajax({ url: url, cache: false, success: function (t) {
	        _g.parser.append(t);
	        _g.loadJs(page);
	    }
	    });
	}
	, loadCss: function (page) {
	    var _g = this;
	    var url = this.base + page.css;
	    $.ajax({ url: url, cache: false, success: function (css) {
	        var heads = _g.document.getElementsByTagName("head");
	        if (heads.length > 0) {
	            var node = _g.document.createElement("style");
	            heads[0].appendChild(node);
	            if (node.styleSheet) node.styleSheet.cssText = css; else node.appendChild(_g.document.createTextNode(css));
	            _g.currentPage.cssNode = node;
	        }
	        _g.loadHtml(page);
	    }
	    });
	}
	, loadHtml: function (page) {
	    var _g = this;
	    this.current = page;
	    var url;
	    if (page.args != null && page.args != "") url = this.base + page.html + "?" + page.args; else url = this.base + page.html;
	    this.loading.enable();
	    this.loading.gotoAndPlay("loading");
	    this.content.css("opacity", "0");
	    $.ajax({ url: url, cache: false, success: function (html) {
	        _g.loading.gotoAndPlay("finished");
	        _g.content.html(html);
	        if (_g.current.callback) _g.current.callback(html);
	        _g.loadTcss(page);
	    }
	    });
	}
	, getPageByName: function (name) {
	    var sv = name.split(":");
	    var page = Reflect.field(this.props, sv[0]);
	    if (page == null) throw "没有找到与'" + name + "'关联的页面配置!";
	    if (sv.length > 0) page.args = sv[1]; else page.args = "";
	    return page;
	}
	, load: function (page) {
	    this.currentPage = page;
	    this.loadCss(page);
	}
	, openPage: function (html, css, t, js, callback) {
	    var page = { html: html, css: css, t: t, js: js, callback: callback, action: null, args: null, cssNode: null };
	    this.load(page);
	}
	, open: function (pageName) {
	    var page = this.getPageByName(pageName);
	    this.load(page);
	}
	, init: function (props) {
	    this.props = props;
	    this.base = props.base;
	    this.loading = this.mcl.getMovie(props.loading);
	    this.content = new $(props.content);
	    this.transition_in = props.transition_in;
	    this.transition_out = props.transition_out;
	}
	, __class__: com.todream.PageController
    }
    com.todream.Site = function (props) {
        this.mcl = com.todream.m.MCollections.getInstance();
        this.tcss = com.todream.Tcss.getInstance();
        this.window = js.Browser.window;
        this.supportHash = this.window.Modernizr.hashchange;
        if (this.supportHash) this.window.onhashchange = $bind(this, this.onHashChange); else this.window.historyManager.addListener($bind(this, this.onHashChange));
        this.document = js.Browser.document;
        this.location = this.window.location;
        this.parser = com.todream.TcssParser.getInstance();
        this.init(props);
    };
    com.todream.Site.__name__ = true;
    com.todream.Site.prototype = {
        swapDepth: function (ja, jb) {
            var z = ja.css("z-index");
            ja.css("z-index", jb.css("z-index"));
            jb.css("z-index", z);
        }
	, loadJs: function (page) {
	    var _g = this;
	    var url = this.base + page.js;
	    if (page.js == "") {
	        this.swapDepth(this.content_pre, this.content);
	        if (this.transition_out == null || this.transition_out == "") {
	            this.content_pre.html("");
	            this.content_pre.css("opacity", "0");
	        } else this.mcl.getMovie("#" + this.content_pre.attr("id"), false, { clip: this.transition_out }).enable().play().addListener(function (e) {
	            if (e.type == "finished") {
	                _g.content_pre.html("");
	                _g.content_pre.css("opacity", "0");
	            }
	        });
	        if (this.transition_in == null || this.transition_in == "") {
	            this.content.css("opacity", "1");
	            this.tcss.redraw();
	        } else {
	            this.tcss.redraw();
	            this.mcl.getMovie("#" + this.content_pre.attr("id"), false, { clip: this.transition_out }).enable().play().addListener(function (e) {
	                if (e.type == "finished") {
	                    _g.content_pre.html("");
	                    _g.content_pre.css("opacity", "0");
	                }
	            });
	        }
	        return;
	    }
	    $.ajax({ url: url, cache: false, success: function (js) {
	        if (_g.prePage != null) {
	            var cssList = _g.document.getElementsByTagName("style");
	            var cssNode = _g.prePage.cssNode;
	            var cn;
	            var _g2 = 0, _g1 = cssList.length;
	            while (_g2 < _g1) {
	                var i = _g2++;
	                cn = cssList.item(i);
	                if (cn == cssNode) {
	                    cn.parentNode.removeChild(cn);
	                    break;
	                }
	            }
	        }
	        if (_g.action) _g.action.destory();
	        _g.action = page.action = _g.window["eval"](js);
	        _g.swapDepth(_g.content_pre, _g.content);

	        if (_g.transition_out == null || _g.transition_out == "") {
	            _g.content_pre.html("");
	            _g.content_pre.css("opacity", "0");
	        } else _g.mcl.getMovie("#" + _g.content_pre.attr("id"), false, { clip: _g.transition_out }).enable().play().addListener(function (e) {
	            if (e.type == "finished") {
	                _g.content_pre.html("");
	                _g.content_pre.css("opacity", "0");
	            }
	        });
	        if (_g.transition_in == null || _g.transition_in == "") {
	            _g.content.css("opacity", "1");
	            _g.action.update();
	            _g.tcss.redraw();
	            _g.action.init();
	        } else {
	            console.log("transition_in!");
	            _g.action.update();
	            _g.tcss.redraw();
	            _g.mcl.getMovie("#" + _g.content.attr("id"), false, { clip: _g.transition_in }).enable().play().addListener(function (e) {
	                if (e.type == "finished") {
	                    _g.content.css("opacity", "1");
	                    _g.action.init();
	                }
	            });
	        }
	        _g.prePage = _g.currentPage;
	    }
	    });
	}
	, loadTcss: function (page) {
	    var _g = this;
	    var url = this.base + page.t;
	    $.ajax({ url: url, cache: false, success: function (t) {
	        _g.parser.append(t);
	        _g.loadJs(page);
	    }
	    });
	}
	, loadCss: function (page) {
	    var _g = this;
	    var url = this.base + page.css;
	    $.ajax({ url: url, cache: false, success: function (css) {
	        var heads = _g.document.getElementsByTagName("head");
	        if (heads.length > 0) {
	            var node = _g.document.createElement("style");
	            heads[0].appendChild(node);
	            if (node.styleSheet) node.styleSheet.cssText = css; else node.appendChild(_g.document.createTextNode(css));
	            _g.currentPage.cssNode = node;
	        }
	        _g.loadHtml(page);
	    }
	    });
	}
	, loadHtml: function (page) {
	    var _g = this;
	    this.current = page;
	    var url;
	    if (page.args != null && page.args != "") url = this.base + page.html + "?" + page.args; else url = this.base + page.html;
	    $(".YT_menu").css({ display: "none" });
	    $(".kjjbtnMc").css({ display: "none" });
	    this.loading.enable();
	    this.loading.gotoAndPlay("loading");
	    this.content_pre = this.content;
	    if (this.content == this.content_fst) this.content = this.content_lst; else this.content = this.content_fst;
	    this.content.css("opacity", "0");
	    $.ajax({ url: url, cache: false, success: function (html) {
	        _g.loading.gotoAndPlay("finished");
	        _g.content.html(html);
	        if (_g.current.callback) _g.current.callback(html);
	        _g.loadTcss(page);
	    }
	    });
	}
	, getPageByHash: function (hash) {
	    var h = hash.substring(1);
	    var sv = h.split(":");
	    var page = Reflect.field(this.props, sv[0]);
	    if (page == null) page = this.props.home;
	    if (sv.length > 0) page.args = sv[1]; else page.args = "";
	    return page;
	}
	, onHashChange: function (e) {
	    var page = this.getPageByHash(this.location.hash);
	    this.load(page);
	}
	, load: function (page) {
	    this.currentPage = page;
	    this.loadCss(page);
	}
	, open: function (hash, first) {
	    if (hash.charAt(0) != "#") hash = "#" + hash;
	    if (hash != this.location.hash) {
	        this.location.hash = hash;
	        if (!this.supportHash) this.onHashChange();
	    } else if (first) {
	        this.location.hash = hash;
	        this.onHashChange();
	    }
	}
	, init: function (props) {
	    this.props = props;
	    this.base = props.base;
	    this.loading = this.mcl.getMovie(props.loading);
	    this.content_fst = new $(props.content_fst);
	    this.content = this.content_lst = new $(props.content_lst);
	    this.transition_in = props.transition_in;
	    this.transition_out = props.transition_out;
	    var home = props.home;
	    if (this.location.hash != "") this.open(this.location.hash, true); else this.open("#page1", true);
	}
	, __class__: com.todream.Site
    }
    var hxevents = {}
    hxevents.Dispatcher = function () {
        this.handlers = new Array();
    };
    hxevents.Dispatcher.__name__ = true;
    hxevents.Dispatcher.prototype = {
        stop: function () {
            this._stop = true;
        }
	, has: function (h) {
	    if (null == h) return this.handlers.length > 0; else {
	        var _g = 0, _g1 = this.handlers;
	        while (_g < _g1.length) {
	            var handler = _g1[_g];
	            ++_g;
	            if (h == handler) return true;
	        }
	        return false;
	    }
	}
	, dispatchAndAutomate: function (e) {
	    this.dispatch(e);
	    this.handlers = [];
	    this.add = function (h) {
	        h(e);
	        return h;
	    };
	}
	, dispatch: function (e) {
	    var list = this.handlers.slice();
	    var _g = 0;
	    while (_g < list.length) {
	        var l = list[_g];
	        ++_g;
	        if (this._stop == true) {
	            this._stop = false;
	            break;
	        }
	        l(e);
	    }
	}
	, clear: function () {
	    this.handlers = new Array();
	}
	, remove: function (h) {
	    var _g1 = 0, _g = this.handlers.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        if (Reflect.compareMethods(this.handlers[i], h)) return this.handlers.splice(i, 1)[0];
	    }
	    return null;
	}
	, addOnce: function (h) {
	    var me = this;
	    var _h = null;
	    _h = function (v) {
	        me.remove(_h);
	        h(v);
	    };
	    this.add(_h);
	    return _h;
	}
	, add: function (h) {
	    this.handlers.push(h);
	    return h;
	}
	, __class__: hxevents.Dispatcher
    }
    com.todream.events = {}
    com.todream.events.TcssDispatcher = function () {
        hxevents.Dispatcher.call(this);
    };
    com.todream.events.TcssDispatcher.__name__ = true;
    com.todream.events.TcssDispatcher.__super__ = hxevents.Dispatcher;
    com.todream.events.TcssDispatcher.prototype = $extend(hxevents.Dispatcher.prototype, {
        removeListener: function (h) {
            var _g1 = 0, _g = this.handlers.length;
            while (_g1 < _g) {
                var i = _g1++;
                if (Reflect.compareMethods(this.handlers[i], h)) return this.handlers.splice(i, 1)[0];
            }
            return null;
        }
	, addListener: function (h) {
	    this.handlers.push(h);
	    return h;
	}
	, stop: function () {
	}
	, dispatch: function (e) {
	    hxevents.Dispatcher.prototype.dispatch.call(this, e);
	}
	, stopDispatch: function () {
	    hxevents.Dispatcher.prototype.stop.call(this);
	}
	, __class__: com.todream.events.TcssDispatcher
    });
    com.todream.Tcss = function () {
        com.todream.events.TcssDispatcher.call(this);
        this.init();
    };
    com.todream.Tcss.__name__ = true;
    com.todream.Tcss.getInstance = function () {
        if (com.todream.Tcss.__instance == null) com.todream.Tcss.__instance = new com.todream.Tcss();
        return com.todream.Tcss.__instance;
    }
    com.todream.Tcss.__super__ = com.todream.events.TcssDispatcher;
    com.todream.Tcss.prototype = $extend(com.todream.events.TcssDispatcher.prototype, {
        wheel: function (e) {
            console.log("tcss:wheel:e:" + Std.string(e));
            var ee = { type: "wheel", target: this, data: {} };
            this.dispatch(ee);
        }
	, getLoader: function (name) {
	    return this.collections.getMovie(name, false);
	}
	, __getMovieByClass: function (rest) {
	    var MT = this.collections.getMovieTemplate(rest.shift());
	    var r = MT.create.apply(MT, rest);
	    return r;
	}
	, getMovie: function (selector, loop, props) {
	    return this.collections.getMovie(selector, loop, props);
	}
	, removeMovie: function (selector) {
	    return this.collections.removeMovie(selector);
	}
	, getClass: function (tname) {
	    return this.collections.getMovieTemplate(tname);
	}
	, getMovieClass: function (tname) {
	    return this.collections.getMovieTemplate(tname);
	}
	, getMovieTemplate: function (tname) {
	    return this.collections.getMovieTemplate(tname);
	}
	, onFlashCall: function (id, func, args) {
	    var m = this.getFlashMovie(id);
	    var f = Reflect.field(m, func);
	    f.apply(m, args);
	}
	, getFlashStage: function (id) {
	    return this.collections.stage_fl;
	}
	, getFlashMovie: function (Id, container) {
	    var m = this.collections.getFlashMovie(Id, container);
	    return m;
	}
	, getH5Stage: function () {
	    return this.collections.stage_h5;
	}
	, getH5Movie: function (Id, container) {
	    var m = this.collections.getH5Movie(Id, container);
	    return m;
	}
	, getPageCtrl: function (props) {
	    return new com.todream.PageController(props);
	}
	, getSite: function (props) {
	    return new com.todream.Site(props);
	}
	, redraw: function () {
	    this.resize();
	}
	, removeNodeValues: function (selectors) {
	    this.collections.removeNodeValues(selectors);
	}
	, updateNodes: function (selectors, type) {
	    this.collections.updateNodes(selectors, type);
	}
	, resize: function () {
	    console.log("Tcss:resize");
	    this.collections.resize();
	    this.renderer.start();
	}
	, enableWheel: function () {
	    this.window.on("scroll", null, $bind(this, this.wheel));
	}
	, disableWheel: function () {
	    this.window.off("scroll", null, $bind(this, this.wheel));
	}
	, stop: function () {
	    this.renderer.stop();
	}
	, start: function () {
	    this.renderer.start();
	}
	, startup: function (config) {
	    this.loader.init(config);
	    this.loader.refresh();
	}
	, onTcssLoaded: function (css) {
	    this.parser.parse(css);
	    this.renderer.init(this.collections);
	}
	, addEventListener: function (type, h) {
	    if (type == "tick") return this.renderer.addListener(h); else return com.todream.events.TcssDispatcher.prototype.addListener.call(this, h);
	}
	, initFlash: function (flashId) {
	    var stage_fl = this.collections.initFlash(flashId);
	    this.renderer.addListener(function (e) {
	        stage_fl.update();
	    });
	}
	, initHTML5: function (cjs, canvas, stage, lib, root) {
	    var stage_h5 = this.collections.initHTML5(cjs, canvas, stage, lib, root);
	    this.renderer.addListener(function (e) {
	        stage_h5.update();
	    });
	}
	, init: function () {
	    this.collections = com.todream.m.MCollections.getInstance();
	    this.collections.init();
	    this.loader = new com.todream.TcssLoader();
	    this.loader.addOnce($bind(this, this.onTcssLoaded));
	    this.parser = com.todream.TcssParser.getInstance();
	    this.renderer = new com.todream.TcssRenderer();
	    this.document = new $(js.Browser.document);
	    this.window = new $(js.Browser.window);
	    this.getMovieByClass = Reflect.makeVarArgs($bind(this, this.__getMovieByClass));
	}
	, __class__: com.todream.Tcss
    });
    com.todream.TcssLoader = function () {
        this.fileAsync = false;
        this.async = false;
        this.env = "";
        this.mode = "browser";
        hxevents.Dispatcher.call(this);
    };
    com.todream.TcssLoader.__name__ = true;
    com.todream.TcssLoader.__super__ = hxevents.Dispatcher;
    com.todream.TcssLoader.prototype = $extend(hxevents.Dispatcher.prototype, {
        xhr: function (url, type, callback, errback) {
            var handleResponse = function (xhr, callback1, errback1) {
                if (xhr.status >= 200 && xhr.status < 300) callback1(xhr.responseText, xhr.getResponseHeader("Last-Modified")); else if (Reflect.isFunction(errback1)) errback1(xhr.status, url);
            };
            var window = js.Browser.window;
            var xhr1 = window.XMLHttpRequest ? new XMLHttpRequest() : window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
            var async = this.isFileProtocol ? this.fileAsync : this.async;
            if (Reflect.isFunction($bind(xhr1, xhr1.overrideMimeType))) xhr1.overrideMimeType("text/css");
            xhr1.open("GET", url, async);
            xhr1.setRequestHeader("Accept", type || "text/x-tcss, text/css; q=0.9, */*; q=0.5");
            xhr1.send(null);
            if (this.isFileProtocol && !this.fileAsync) {
                if (xhr1.status == 0 || xhr1.status >= 200 && xhr1.status < 300) callback(xhr1.responseText); else errback(xhr1.status, url);
            } else if (async) xhr1.onreadystatechange = function (e) {
                if (xhr1.readyState == 4) handleResponse(xhr1, callback, errback);
            }; else handleResponse(xhr1, callback, errback);
        }
	, extractUrlParts: function (url, baseUrl) {
	    var urlPartsRegex = new EReg("^((?:[a-z-]+:)?/+?(?:[^/\\?#]*/)|([/\\\\]))?((?:[^/\\\\\\?#]*[/\\\\])*)([^/\\\\\\?#]*)([#\\?].*)?$", "");
	    var urlParts = com.todream.utils.Utils.exec(urlPartsRegex, url);
	    var baseUrlParts = [];
	    var directories = [];
	    var returner = {};
	    if (urlParts.length == 0) throw "Could not parse sheet href - '" + url + "'";
	    if (urlParts[1] == null || urlParts[2] != null) {
	        baseUrlParts = com.todream.utils.Utils.exec(urlPartsRegex, baseUrl);
	        if (baseUrlParts == null) throw "Could not parse page url - '" + baseUrl + "'";
	        urlParts[1] = urlParts[1] || baseUrlParts[1] || "";
	        if (urlParts[2] == null) {
	            urlParts[3] = baseUrlParts[3] + urlParts[3];
	            console.log("urlParts[3]:" + urlParts[3]);
	        }
	    }
	    if (urlParts[3] != null) {
	        var p = new EReg("\\\\\\\\", "");
	        directories = p.replace(urlParts[3], "\\").split("/");
	        var i = 0;
	        while (i < directories.length) {
	            if (directories[i] == ".") {
	                directories.splice(i, 1);
	                i -= 1;
	            }
	            i = i + 1;
	        }
	        i = 0;
	        while (i < directories.length) {
	            if (directories[i] == ".." && i > 0) {
	                directories.splice(i - 1, 2);
	                i -= 2;
	            }
	            i = i + 1;
	        }
	    }
	    returner.hostPart = urlParts[1];
	    returner.directories = directories;
	    returner.path = urlParts[1] + directories.join("/");
	    returner.fileUrl = returner.path + (urlParts[4] || "");
	    returner.url = returner.fileUrl + (urlParts[5] || "");
	    return returner;
	}
	, loadStyleSheet: function (sheet, callback, reload, remaining) {
	    var hrefParts = this.extractUrlParts(sheet.href, js.Browser.location.href);
	    var href = hrefParts.url;
	    var css = this.cache && this.cache.getItem(href);
	    var timestamp = this.cache && this.cache.getItem(href + ":timestamp");
	    var styles = { css: css, timestamp: timestamp };
	    var env;
	    var newFileInfo = { relativeUrls: this.relativeUrls, currentDirectory: hrefParts.path, filename: href };
	    newFileInfo.entryPath = hrefParts.path;
	    newFileInfo.rootpath = this.rootpath || hrefParts.path;
	    newFileInfo.rootFilename = href;
	    this.xhr(href, sheet.type, function (data, lastModified) {
	        callback(null, newFileInfo.rootpath, data, sheet, { local: false, lastModified: lastModified, remaining: remaining }, href);
	    }, function (status, url) {
	        var e = { type: "File", message: "'" + url + "' wasn't found (" + status + ")" };
	        callback(e, "", null, sheet);
	    });
	}
	, loadStyleSheets: function (callback, reload) {
	    var l = this.sheets.length;
	    var _g = 0;
	    while (_g < l) {
	        var i = _g++;
	        this.loadStyleSheet(this.sheets[i], callback, reload, l - (i + 1));
	    }
	}
	, getStorage: function () {
	    var st = null;
	    if (this.env != "development") try {
	        st = js.Browser.getLocalStorage();
	    } catch (error) {
	        if (js.Boot.__instanceof(error, String)) {
	        } else throw (error);
	    }
	    return st;
	}
	, getDefaultEnv: function () {
	    var location = js.Browser.window.location;
	    this.isFileProtocol = new EReg(" ^ (file | chrome( -extension)? | resource | qrc | app): ", "").match(location.protocol);
	    var env = location.hostname == "127.0.0.1" || location.hostname == "0.0.0.0" || location.hostname == "localhost" || location.port.length > 0 || this.isFileProtocol ? "development" : "production";
	    return env;
	}
	, getSheets: function (links) {
	    var list;
	    if (links != null) list = links; else list = js.Browser.document.getElementsByTagName("link");
	    var typePattern = new EReg("^text/(x-)?tcss$", "");
	    var sheets = [];
	    var link;
	    var l = list.length;
	    var _g = 0;
	    while (_g < l) {
	        var i = _g++;
	        link = list[i];
	        if (link.rel == "stylesheet/tcss" || new EReg("stylesheet", "").match(link.rel) && typePattern.match(link.type)) sheets.push(link);
	    }
	    return sheets;
	}
	, getLinksFromConfig: function (cfg) {
	    if (cfg == null || cfg.links == null) return null;
	    var links = [];
	    var _links = cfg.links;
	    var l = _links.length;
	    var _link;
	    var _g = 0;
	    while (_g < l) {
	        var i = _g++;
	        _link = { rel: "stylesheet/tcss", type: "text/css", href: _links[i] };
	        links.push(_link);
	    }
	    return links;
	}
	, error: function (e, rootHref) {
	    console.log("---------- Error Begin------------");
	    console.log("---------- Error End------------");
	}
	, refresh: function (reload) {
	    if (reload == null) reload = true;
	    var _g = this;
	    var startTime;
	    var endTime;
	    startTime = endTime = new Date().getTime();
	    var callback = function (e, root, data, sheet, env, href) {
	        if (e) return _g.error(e, sheet.href);
	        if (env.local) {
	        } else _g.dispatch(data);
	        env.remaining == 0 && console.log("css generated in " + (new Date().getTime() - startTime) + "ms");
	        endTime = new Date().getTime();
	    };
	    this.loadStyleSheets(callback, true);
	}
	, init: function (config) {
	    if (this.env == null) this.env = this.getDefaultEnv();
	    this.cache = this.getStorage();
	    this.sheets = this.getSheets(this.getLinksFromConfig(config));
	}
	, __class__: com.todream.TcssLoader
    });
    com.todream.TcssParser = function () {
        hxevents.Dispatcher.call(this);
        this.init();
    };
    com.todream.TcssParser.__name__ = true;
    com.todream.TcssParser.getInstance = function () {
        if (com.todream.TcssParser.__instance == null) com.todream.TcssParser.__instance = new com.todream.TcssParser();
        return com.todream.TcssParser.__instance;
    }
    com.todream.TcssParser.__super__ = hxevents.Dispatcher;
    com.todream.TcssParser.prototype = $extend(hxevents.Dispatcher.prototype, {
        append: function (tcss) {
            var co = CSSJSON.trimScript(tcss);
            var json = CSSJSON.toJSON(co.css, { stripComments: true });
            var res = Reflect.fields(json);
            var value;
            var scripts;
            var attrs;
            var key;
            var args;
            var _g1 = 0, _g = res.length;
            while (_g1 < _g) {
                var i = _g1++;
                key = res[i];
                value = Reflect.field(json, key);
                scripts = Reflect.field(co, key);
                if (scripts != null) {
                    attrs = Reflect.fields(scripts);
                    var _g3 = 0, _g2 = attrs.length;
                    while (_g3 < _g2) {
                        var j = _g3++;
                        value[attrs[j]] = Reflect.field(scripts, attrs[j]);
                    }
                }
                args = com.todream.utils.Utils.exec(com.todream.utils.ERegTemplate.SELECTOR_ARGS, key);
                if (args.length > 0) {
                    key = args[1];
                    args = args[2].split(",");
                }
                value["arguments"] = args;
                this.mcl.addItem(key, value);
            }
        }
	, parse: function (tcss) {
	    var co = CSSJSON.trimScript(tcss);
	    var ct = CSSJSON.trimTemplate(co.css);
	    var json = CSSJSON.toJSON(ct.css, { stripComments: true });
	    this.mcl.setSettings(Reflect.field(json, ".settings"));
	    var res = Reflect.fields(json);
	    var value;
	    var scripts;
	    var attrs;
	    var key;
	    var args;
	    var clips;
	    var clip;
	    var clipValue;
	    var movies;
	    var movie;
	    var movieValue;
	    var _g1 = 1, _g = res.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        key = res[i];
	        value = Reflect.field(json, key);
	        scripts = Reflect.field(co, key);
	        if (scripts != null) {
	            attrs = Reflect.fields(scripts);
	            var _g3 = 0, _g2 = attrs.length;
	            while (_g3 < _g2) {
	                var j = _g3++;
	                value[attrs[j]] = Reflect.field(scripts, attrs[j]);
	            }
	        }
	        if (Reflect.field(value, "clips") != null) {
	            clips = Reflect.field(value, "clips").split(",");
	            var _g3 = 0, _g2 = clips.length;
	            while (_g3 < _g2) {
	                var m = _g3++;
	                clip = clips[m] + "-clip";
	                clipValue = Reflect.field(value, clip);
	                value[clip] = Reflect.field(ct, clipValue);
	            }
	        }
	        if (Reflect.field(value, "movies") != null) {
	            movies = Reflect.field(value, "movies").split(",");
	            var _g3 = 0, _g2 = movies.length;
	            while (_g3 < _g2) {
	                var k = _g3++;
	                movie = movies[k] + "-movie";
	                movieValue = Reflect.field(value, movie);
	                value[movie] = Reflect.field(ct, movieValue);
	            }
	        }
	        args = com.todream.utils.Utils.exec(com.todream.utils.ERegTemplate.SELECTOR_ARGS, key);
	        if (args.length > 0) {
	            key = args[1];
	            args = args[2].split(",");
	        }
	        value["arguments"] = args;
	        this.mcl.addItem(key, value);
	    }
	    return this.mcl;
	}
	, init: function () {
	    this.mcl = com.todream.m.MCollections.getInstance();
	}
	, __class__: com.todream.TcssParser
    });
    com.todream.TcssRenderer = function () {
        this.engine = 0;
        com.todream.events.TcssDispatcher.call(this);
    };
    com.todream.TcssRenderer.__name__ = true;
    com.todream.TcssRenderer.__super__ = com.todream.events.TcssDispatcher;
    com.todream.TcssRenderer.prototype = $extend(com.todream.events.TcssDispatcher.prototype, {
        renderItem: function (item) {
            var values = item.values;
            var value;
            var nodes = new $(item.selector);
            var node;
            var l = nodes.length;
            var _g = 0;
            while (_g < l) {
                var i = _g++;
                node = new $(nodes[i]);
                value = values.h[nodes[i].__id__];
                if (value == null) {
                } else node.css(value.props);
            }
        }
	, renderResponsiveItems: function (time) {
	    var commons = this.collections.commons;
	    var keys;
	    keys = commons.keys();
	    var item;
	    while (keys.hasNext()) {
	        var key = keys.next();
	        item = commons.get(key);
	        if (item.scaleType != "NO" || item.locationXScale != "NO" || item.locationYScale != "NO") this.renderItem(item);
	    }
	    var texts = this.collections.texts;
	    keys = texts.keys();
	    while (keys.hasNext()) {
	        var key = keys.next();
	        item = texts.get(key);
	        if (item.scaleType != "NO" || item.locationXScale != "NO" || item.locationYScale != "NO") this.renderItem(item);
	    }
	    return true;
	}
	, renderClips: function (time) {
	    return true;
	}
	, __renderMovies: function (time) {
	    var keys = this.movies.keys();
	    var clips;
	    var m;
	    var cKeys;
	    while (keys.hasNext()) {
	        var key = keys.next();
	        m = this.movies.get(key);
	        if (m.directRender) m.run();
	    }
	    keys = this.nodeValues.keys();
	    var j;
	    var value;
	    while (keys.hasNext()) {
	        var key = keys.next();
	        j = new $(key);
	        value = this.nodeValues.get(key);
	        if (value.update) j.css(value.props);
	        value.update = false;
	    }
	    this.dispatch({ type: "tick", target: this, data: time });
	    this.requestFrame(this.renderMovies);
	    return true;
	}
	, render: function (time) {
	    this.renderResponsiveItems(time);
	    return true;
	}
	, cancelNoRAF: function () {
	    var _g = this;
	    return function (id) {
	        _g.timer.stop();
	        _g.engine = 0;
	    };
	}
	, noRAF: function () {
	    var _g = this;
	    return function (callback) {
	        if (_g.engine == 0) {
	            _g.timer = new com.todream.utils.MTimer(Math.round(1000 / _g.settings.fps));
	            _g.timer.run = function () {
	                callback(haxe.Timer.stamp());
	            };
	        }
	        return 1;
	    };
	}
	, cancelRAF: function () {
	    var window = js.Browser.window;
	    return $bind(window, window.cancelAnimationFrame) || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || $bind(this, this.cancelNoRAF);
	}
	, RAF: function () {
	    var window = js.Browser.window;
	    return $bind(window, window.requestAnimationFrame) || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || $bind(this, this.noRAF);
	}
	, stop: function () {
	    console.log("TcssRenderer.stop:useRAF:" + Std.string(this.settings.useRAF == true));
	    this.cancelFrame(this.engine);
	    return;
	    if (this.settings.useRAF) this.renderMovies = function (time) {
	        return true;
	    }; else {
	    }
	}
	, start: function () {
	    this.renderResponsiveItems(haxe.Timer.stamp());
	    this.renderMovies = $bind(this, this.__renderMovies);
	    this.engine = this.requestFrame(this.renderMovies);
	}
	, init: function (collections) {
	    this.dispatcher = new hxevents.Dispatcher();
	    this.collections = collections;
	    this.settings = collections.settings;
	    if (this.settings.useRAF) {
	        this.requestFrame = this.RAF();
	        this.cancelFrame = this.cancelRAF();
	    } else {
	        this.requestFrame = this.noRAF();
	        this.cancelFrame = this.cancelNoRAF();
	    }
	    this.movies = collections.movies;
	    this.nodeValues = collections.nodeValues;
	}
	, __class__: com.todream.TcssRenderer
    });
    com.todream.flash = {}
    com.todream.flash.FlashStage = function (stage) {
        this.directRender = true;
        this.stage = stage;
        this.exec = Reflect.makeVarArgs($bind(this, this.__exec));
        this.movies = new haxe.ds.StringMap();
    };
    com.todream.flash.FlashStage.__name__ = true;
    com.todream.flash.FlashStage.prototype = {
        addEventListener: function (id, type, listener) {
            var r = this.stage.addEventListener("tcss.onFlashCall", id, type, listener);
            return r;
        }
	, start: function () {
	}
	, update: function () {
	    if (this.directRender) {
	        var keys = this.movies.keys();
	        var fm;
	        while (keys.hasNext()) {
	            var key = keys.next();
	            fm = this.movies.get(key);
	            fm.run();
	        }
	    }
	}
	, disable: function () {
	    console.log("FlashStage:disable()");
	    this.directRender = false;
	}
	, enable: function () {
	    this.directRender = true;
	    return this;
	}
	, getProperty: function (id, prop) {
	    var r = this.exec(id, "prop", prop);
	    return r;
	}
	, __exec: function (rest) {
	    var r = this.stage.exec.apply(this.stage, rest);
	    return r;
	}
	, unregister: function (o) {
	    var key;
	    if (Reflect.isObject(o)) key = o.id; else key = o;
	    return this.movies.remove(key);
	}
	, register: function (fm) {
	    if (!this.movies.exists(fm.get_id())) {
	        this.movies.set(fm.get_id(), fm);
	        return true;
	    }
	    return false;
	}
	, __class__: com.todream.flash.FlashStage
    }
    com.todream.i = {}
    com.todream.i.ITimeline = function () { }
    com.todream.i.ITimeline.__name__ = true;
    com.todream.i.ITimeline.prototype = {
        __class__: com.todream.i.ITimeline
    }
    com.todream.m = {}
    com.todream.m.MCollections = function () {
        this.scaleW = 1;
        this.scaleH = 1;
    };
    com.todream.m.MCollections.__name__ = true;
    com.todream.m.MCollections.getInstance = function () {
        if (com.todream.m.MCollections.__instance == null) com.todream.m.MCollections.__instance = new com.todream.m.MCollections();
        return com.todream.m.MCollections.__instance;
    }
    com.todream.m.MCollections.prototype = {
        bindClipToSelector: function (clip, selector) {
            this.clips.set(selector, clip);
            if (selector.charAt(0) == ".") {
                var j = new $(selector);
                var jj;
                var _g1 = 0, _g = j.length;
                while (_g1 < _g) {
                    var i = _g1++;
                    jj = new $(j[i]);
                    var Id = jj.attr("id");
                    if (Id != null) this.clips.set("#" + Id, clip);
                }
            }
        }
	, getMovie: function (selector, loop, props) {
	    var m = this.movies.get(selector);
	    var clip;
	    var movieProps = { type: "movie", totalFrames: 0, autoplay: false, directRender: true, loop: loop, movies: "", clips: "c1", labels: "", scripts: "", tasks: "", create: "", 'arguments': [], argumentValues: [] };
	    var type = selector.charAt(0);
	    if (m != null && props == null) {
	        if (loop != null) m.loop = loop;
	        return m;
	    } else if (props != null) {
	        var c = Reflect.field(props, "clip");
	        var clipName = c;
	        var sa = com.todream.utils.Utils.exec(com.todream.utils.ERegTemplate.SELECTOR_ARGS, c);
	        var args = [];
	        if (sa.length > 0) clipName = sa[1];
	        if (c == null) throw selector + " 创建影片失败：未指定绑定的剪辑 Id!";
	        clip = this.clips.get(clipName);
	        if (clip == null) throw selector + " 创建影片失败：没有找到Id对应的剪辑样式!";
	        if (props.isDefault) this.bindClipToSelector(clip, selector);
	        m = new com.todream.m.MMovie();
	        movieProps["c1-selector"] = selector;
	        movieProps["c1-clip"] = c;
	        var start = Reflect.field(props, "from");
	        if (start != null) movieProps["c1-from"] = start;
	        var end = Reflect.field(props, "to");
	        if (end != null) movieProps["c1-to"] = end;
	        m.init(selector, movieProps);
	    } else if (this.clips.get(selector) != null) {
	        clip = this.clips.get(selector);
	        m = new com.todream.m.MMovie();
	        movieProps["c1-selector"] = selector;
	        movieProps["c1-clip"] = selector;
	        movieProps["c1-from"] = "0";
	        movieProps["c1-to"] = Std.string(clip.totalFrames);
	        m.init(selector, movieProps);
	    } else throw selector + " 创建影片失败：没有找到其对应的剪辑样式!";
	    this.movies.set(selector, m);
	    return m;
	}
	, removeClip: function (selector) {
	    if (this.clips.exists(selector)) {
	        this.clips.remove(selector);
	        return true;
	    } else return false;
	}
	, removeMovie: function (selector) {
	    if (this.movies.exists(selector)) {
	        this.movies.remove(selector);
	        return true;
	    } else return false;
	}
	, getMovieTemplate: function (tname) {
	    return this.movieTemplates.get(tname);
	}
	, getH5Movie: function (Id, container, props) {
	    var mc;
	    if (Id == "root") mc = this.movies_h5.get(Id); else mc = this.movies_h5.get("root." + Id);
	    if (mc == null) {
	        if (container == null) container = this.root_h5;
	        var names = Id.split(".");
	        mc = container.getChildByName(names[0]);
	        this.movies_h5.set(mc.get_id(), mc);
	        if (names.length > 1) {
	            var _g1 = 1, _g = names.length;
	            while (_g1 < _g) {
	                var i = _g1++;
	                mc = mc.getChildByName(names[i]);
	                this.movies_h5.set(mc.get_id(), mc);
	                if (i != names.length - 1) mc.init();
	            }
	        }
	        mc.init(props);
	    }
	    return mc;
	}
	, getH5Root: function (Id, mc_h5) {
	    var root = new com.todream.html5.display.H5Movie(mc_h5);
	    root.set_name("root");
	    root.set_parent(null);
	    this.movies_h5.set("root", root);
	    return root;
	}
	, getFlashRoot: function (Id) {
	    var root = new com.todream.flash.display.FlashMovie("root");
	    root.set_parent(null);
	    this.movies_fl.set("root", root);
	    return root;
	}
	, getFlashMovie: function (Id, container, props) {
	    var mc;
	    if (Id == "root") mc = this.movies_fl.get(Id); else mc = this.movies_fl.get("root." + Id);
	    if (mc == null) {
	        if (container == null) container = this.root_fl;
	        var names = Id.split(".");
	        mc = container.getChildByName(names[0]);
	        this.movies_fl.set(mc.get_id(), mc);
	        if (names.length > 1) {
	            var _g1 = 1, _g = names.length;
	            while (_g1 < _g) {
	                var i = _g1++;
	                mc = mc.getChildByName(names[i]);
	                this.movies_fl.set(mc.get_id(), mc);
	                if (i != names.length - 1) mc.init();
	            }
	        }
	        mc.init(props);
	    }
	    return mc;
	}
	, getClip: function (name) {
	    var clip = this.clips.get(name);
	    if (clip == null) throw "没有找到与" + name + "关联的剪辑!"; else return clip;
	}
	, removeNodeValues: function (selectors) {
	    var ss = selectors.split(",");
	    var s;
	    var _g1 = 0, _g = ss.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        s = ss[i];
	        if (this.nodeValues.exists(s)) this.nodeValues.remove(s);
	    }
	}
	, getNodeValue: function (selector) {
	    var nv = this.nodeValues.get(selector);
	    if (nv == null) {
	        nv = { id: selector, update: false, props: {}, init: {}, props_pre: {}, css: {}, waittingProps: {}, tweens: [], common: null, inited: false, reg: false };
	        var jq = new $(selector);
	        var ps = com.todream.m.MType.PROPS_INIT;
	        var init = nv.init;
	        var _g1 = 0, _g = ps.length;
	        while (_g1 < _g) {
	            var i = _g1++;
	            init[ps[i]] = jq.css(ps[i]);
	        }
	        if (this.movie_sf != "f") this.nodeValues.set(selector, nv); else this.nodeValues.set(selector, { id: selector, update: false, props: {}, init: {}, props_pre: {}, css: {}, waittingProps: {}, tweens: [], common: null, inited: false, reg: false });
	        nv.inited = false;
	        nv.reg = false;
	    }
	    return nv;
	}
	, createNodeValue: function (selector) {
	    var nv = this.nodeValues.get(selector);
	    if (nv == null) {
	        nv = { id: selector, update: false, props: {}, init: {}, props_pre: {}, css: {}, waittingProps: {}, tweens: [], common: null, inited: false, reg: false };
	        var jq = new $(selector);
	        var ps = com.todream.m.MType.PROPS_INIT;
	        var init = nv.init;
	        var _g1 = 0, _g = ps.length;
	        while (_g1 < _g) {
	            var i = _g1++;
	            init[ps[i]] = jq.css(ps[i]);
	        }
	        if (this.movie_sf != "f") this.nodeValues.set(selector, nv); else this.nodeValues.set(selector, { id: selector, update: false, props: {}, init: {}, props_pre: {}, css: {}, waittingProps: {}, tweens: [], common: null, inited: false, reg: false });
	        nv.reg = false;
	        return nv;
	    } else {
	        console.log("尝试重复创建节点数据,数据可能不正确!");
	        return nv;
	    }
	}
	, existNodeValue: function (selector) {
	    return this.nodeValues.exists(selector);
	}
	, resize: function () {
	    this.scaleW = this.root.width() / this.settings.clampWidth;
	    this.scaleH = this.root.height() / this.settings.clampHeight;
	    var item;
	    var keys;
	    keys = this.commons.keys();
	    while (keys.hasNext()) {
	        var key = keys.next();
	        item = this.commons.get(key);
	        if (item.scaleType != "NO" || item.locationX != "NO" || item.locationY != "NO") item.resize(this.scaleW, this.scaleH);
	    }
	    keys = this.texts.keys();
	    while (keys.hasNext()) {
	        var key = keys.next();
	        item = this.texts.get(key);
	        if (item.scaleType != "NO" || item.locationXScale != "NO" || item.locationYScale != "NO") item.resize(this.scaleW, this.scaleH);
	    }
	    keys = this.movies.keys();
	    var movie;
	    while (keys.hasNext()) {
	        var key = keys.next();
	        movie = this.movies.get(key);
	        movie.resize();
	    }
	}
	, removeCommonOrClip: function (selector, type) {
	    switch (type) {
	        case "common":
	            if (this.commons.exists(selector)) this.commons.remove(selector);
	            break;
	        case "clip":
	            if (this.nodeValues.get(selector) != null) this.nodeValues.remove(selector);
	            break;
	    }
	}
	, updateNodeValues: function (selector, type) {
	    switch (type) {
	        case "common":
	            var common = this.commons.get(selector);
	            common.updateNodeValues();
	            break;
	        case "clip":
	            var clip = this.clips.get(selector);
	            if (this.nodeValues.get(selector) != null) this.nodeValues.remove(selector);
	            break;
	    }
	}
	, updateNodes: function (selectors, type) {
	    var ss = selectors.split(",");
	    var s;
	    var _g1 = 0, _g = ss.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        s = ss[i];
	        this.updateNodeValues(s, type);
	    }
	}
	, addItem: function (key, value) {
	    var type = Reflect.field(value, "type");
	    if (type == null) type = this.settings.defaultType;
	    switch (type) {
	        case "common":
	            console.log("MCoolections:addItem:set:key:" + key);
	            var c;
	            if (this.commons.exists(key)) {
	                c = this.commons.get(key);
	                c.update();
	            } else {
	                c = new com.todream.m.MCommon();
	                c.init(key, value, this.settings);
	                this.commons.set(key, js.Boot.__cast(c, com.todream.m.MCommon));
	            }
	            break;
	        case "clip":
	            var m = new com.todream.m.MClip();
	            m.init(key, value);
	            this.clips.set(key, js.Boot.__cast(m, com.todream.m.MClip));
	            var j = new $(this.settings.selector + " " + key);
	            var Id;
	            var _g1 = 0, _g = j.length;
	            while (_g1 < _g) {
	                var i = _g1++;
	                Id = new $(j[i]).attr("id");
	                if (Id != null) this.clips.set("#" + Id, m);
	            }
	            break;
	        case "loader":
	            var loader = new com.todream.m.BootLoader();
	            var autoplay;
	            if (Reflect.field(value, "autoplay") == null) autoplay = true; else autoplay = Reflect.field(value, "autoplay") == "true";
	            var loop;
	            if (Reflect.field(value, "loop") == null) loop = false; else loop = Reflect.field(value, "loop") == "true";
	            var directRender;
	            if (Reflect.field(value, "directRender") == null) directRender = true; else directRender = Reflect.field(value, "directRender") == "true";
	            if (Reflect.field(value, "totalFrame") != null) value.totalFrame = Std.parseInt(Reflect.field(value, "totalFrame"));
	            value.autoplay = autoplay;
	            value.loop = loop;
	            value.directRender = directRender;
	            loader.init(key, value);
	            this.movies.set(key, loader);
	            break;
	        case "text":
	            var t = new com.todream.m.MText();
	            t.init(key, value, this.settings);
	            this.texts.set(key, js.Boot.__cast(t, com.todream.m.MText));
	            break;
	        case "TMovie":
	            var mt = new com.todream.m.MovieTemplate();
	            var autoplay;
	            if (Reflect.field(value, "autoplay") == null) autoplay = true; else autoplay = Reflect.field(value, "autoplay") == "true";
	            var loop;
	            if (Reflect.field(value, "loop") == null) loop = false; else loop = Reflect.field(value, "loop") == "true";
	            var directRender;
	            if (Reflect.field(value, "directRender") == null) directRender = true; else directRender = Reflect.field(value, "directRender") == "true";
	            if (Reflect.field(value, "totalFrames") != null) value.totalFrames = Std.parseInt(Reflect.field(value, "totalFrames"));
	            value.autoplay = autoplay;
	            value.loop = loop;
	            value.directRender = directRender;
	            var create = Reflect.field(value, "create-script");
	            value.create = create;
	            value["create-script"] = "";
	            mt.init(key, value);
	            this.movieTemplates.set(key, mt);
	            break;
	        case "movie":
	            var mm = new com.todream.m.MMovie();
	            var autoplay;
	            if (Reflect.field(value, "autoplay") == null) autoplay = true; else autoplay = Reflect.field(value, "autoplay") == "true";
	            var loop;
	            if (Reflect.field(value, "loop") == null) loop = false; else loop = Reflect.field(value, "loop") == "true";
	            var directRender;
	            if (Reflect.field(value, "directRender") == null) directRender = true; else directRender = Reflect.field(value, "directRender") == "true";
	            if (Reflect.field(value, "totalFrames") != null) value.totalFrames = Std.parseInt(Reflect.field(value, "totalFrames"));
	            value.autoplay = autoplay;
	            value.loop = loop;
	            value.directRender = directRender;
	            var create = Reflect.field(value, "create-script");
	            value.create = create;
	            value["create-script"] = "";
	            mm.init(key, value);
	            this.movies.set(key, mm);
	            break;
	        case "movie_h5":
	            if (this.stage_h5 == null) {
	                var value1 = value;
	                this.onloadedList.set(key, value1);
	                return;
	            }
	            var id = Reflect.field(value, "id");
	            var autoplay;
	            if (Reflect.field(value, "autoplay") == null) autoplay = true; else autoplay = Reflect.field(value, "autoplay") == "true";
	            var loop;
	            if (Reflect.field(value, "loop") == null) loop = false; else loop = Reflect.field(value, "loop") == "true";
	            var directRender;
	            if (Reflect.field(value, "directRender") == null) directRender = true; else directRender = Reflect.field(value, "directRender") == "true";
	            if (Reflect.field(value, "totalFrames") != null) value.totalFrames = Std.parseInt(Reflect.field(value, "totalFrames"));
	            value.autoplay = autoplay;
	            value.loop = loop;
	            value.directRender = directRender;
	            var h5 = this.getH5Movie(id, null, value);
	            break;
	        case "movie_fl":
	            if (this.stage_fl == null) {
	                var value1 = value;
	                this.onloadedList.set(key, value1);
	                return;
	            }
	            var id = Reflect.field(value, "id");
	            var autoplay;
	            if (Reflect.field(value, "autoplay") == null) autoplay = true; else autoplay = Reflect.field(value, "autoplay") == "true";
	            var loop;
	            if (Reflect.field(value, "loop") == null) loop = false; else loop = Reflect.field(value, "loop") == "true";
	            var directRender;
	            if (Reflect.field(value, "directRender") == null) directRender = true; else directRender = Reflect.field(value, "directRender") == "true";
	            if (Reflect.field(value, "totalFrame") != null) value.totalFrame = Std.parseInt(Reflect.field(value, "totalFrame"));
	            value.autoplay = autoplay;
	            value.loop = loop;
	            value.directRender = directRender;
	            var h5 = this.getFlashMovie(id, null, value);
	            break;
	        default:
	            console.log("default");
	    }
	}
	, setSettings: function (value) {
	    this.settings = new com.todream.m.MSettings();
	    this.settings.init(value);
	    this.root = new $(this.settings.selector);
	}
	, getFlash: function (flashId) {
	    var nav = js.Browser.navigator;
	    var win = this.window[flashId];
	    var doc = this.document[flashId];
	    if (nav.appName.indexOf("Microsoft") != -1) return Reflect.field(this.window, flashId); else return Reflect.field(this.document, flashId);
	}
	, initFlash: function (flashId) {
	    this.stage_fl = new com.todream.flash.FlashStage(this.getFlash(flashId));
	    this.root_fl = this.getFlashRoot(flashId);
	    var keys = this.onloadedList.keys();
	    while (keys.hasNext()) {
	        var key = keys.next();
	        this.addItem(key, this.onloadedList.get(key));
	    }
	    return this.stage_fl;
	}
	, initHTML5: function (cjs, canvas, stage, lib, root) {
	    this.canvas_h5 = canvas;
	    this.stage_h5 = stage;
	    this.lib_h5 = lib;
	    this.root_h5 = this.getH5Root("todo", root);
	    this.root_h5.parent = null;
	    var keys = this.onloadedList.keys();
	    while (keys.hasNext()) {
	        var key = keys.next();
	        this.addItem(key, this.onloadedList.get(key));
	    }
	    return this.stage_h5;
	}
	, init: function () {
	    this.commons = new haxe.ds.StringMap();
	    this.texts = new haxe.ds.StringMap();
	    this.clips = new haxe.ds.StringMap();
	    this.movies = new haxe.ds.StringMap();
	    this.movieTemplates = new haxe.ds.StringMap();
	    this.movies_h5 = new haxe.ds.StringMap();
	    this.movies_fl = new haxe.ds.StringMap();
	    this.nodeValues = new haxe.ds.StringMap();
	    this.window = js.Browser.window;
	    this.document = js.Browser.document;
	    this.onloadedList = new haxe.ds.StringMap();
	}
	, __class__: com.todream.m.MCollections
    }
    com.todream.flash.display = {}
    com.todream.flash.display.FlashMovie = function (name) {
        this.loop = true;
        this.destination = -1;
        this.totalFrames = 1;
        this.maxFrame = 2;
        this.__totalFrames = 1;
        this.__currentFrame = 0;
        this.currentFrame = 1;
        this._direction = 1;
        this.direction = 1;
        com.todream.events.TcssDispatcher.call(this);
        this.name = name;
        this.stage_fl = com.todream.flash.display.FlashMovie.mcl.stage_fl;
        this.labels = new haxe.ds.StringMap();
        this.scripts = new haxe.ds.IntMap();
    };
    com.todream.flash.display.FlashMovie.__name__ = true;
    com.todream.flash.display.FlashMovie.__interfaces__ = [com.todream.i.ITimeline];
    com.todream.flash.display.FlashMovie.__super__ = com.todream.events.TcssDispatcher;
    com.todream.flash.display.FlashMovie.prototype = $extend(com.todream.events.TcssDispatcher.prototype, {
        update: function () {
            console.log("FlashMovie:update:" + Std.string($bind(this, this.update)));
            var script = this.scripts.get(this.get_currentFrame());
            if (script != null) {
                console.log("update:script:" + Std.string(script));
                script.call(this);
            }
            this.stage_fl.exec(this.get_id(), "gotoAndStop", this.__currentFrame);
            this.dispatch({ type: "update", target: this, data: {} });
        }
	, run: function () {
	    if (this.get_currentFrame() != this.__currentFrame) {
	        this.__currentFrame = this.get_currentFrame();
	        this.update();
	    } else {
	    }
	    if (this.state != "S") {
	        if (this.destination != -1 && this.get_currentFrame() == this.destination) {
	            this.state = "S";
	            this.destination = -1;
	            this.set_direction(this._direction);
	            return;
	        }
	        this.set_currentFrame(this.get_currentFrame() + this.get_direction());
	        if (this.name == "timer_mc") console.log("run:current:" + this.get_currentFrame() + ",direction:" + this.get_direction() + ",maxFrame:" + this.maxFrame + ",totalFrames:" + this.get_totalFrames());
	        if (this.loop) {
	            if (this.get_currentFrame() == 0) this.set_currentFrame(this.get_totalFrames()); else if (this.get_currentFrame() == this.maxFrame) this.set_currentFrame(1);
	        } else {
	            this.set_currentFrame(Math.max(1, Math.min(this.get_currentFrame(), this.get_totalFrames())) | 0);
	            if (this.get_currentFrame() == 0 && this.get_direction() == -1 || this.get_currentFrame() == this.get_totalFrames() && this.get_direction() == 1) {
	                this.state = "S";
	                this.dispatch({ type: "finished", target: this, data: {} });
	            }
	        }
	    }
	}
	, scriptsInit: function (props) {
	    var mcl = com.todream.m.MCollections.getInstance();
	    var _scripts = props.scripts.split(",");
	    var _script;
	    var script;
	    var frames;
	    var frame;
	    var body;
	    var _g1 = 0, _g = _scripts.length;
	    while (_g1 < _g) {
	        var j = _g1++;
	        _script = _scripts[j];
	        body = Reflect.field(props, _script + "-script");
	        body = "with(this){" + body.split("\r\n").join("") + "};";
	        script = com.todream.utils.Utils.createScript(body);
	        frames = Reflect.field(props, _script + "-frame").split(",");
	        var _g3 = 0, _g2 = frames.length;
	        while (_g3 < _g2) {
	            var i = _g3++;
	            frame = Std.parseInt(frames[i]);
	            this.scripts.set(frame, script);
	        }
	    }
	}
	, labelsInit: function (props) {
	    var mcl = com.todream.m.MCollections.getInstance();
	    var _labels = props.labels.split(",");
	    var label;
	    var frame;
	    var _g1 = 0, _g = _labels.length;
	    while (_g1 < _g) {
	        var j = _g1++;
	        label = _labels[j];
	        frame = Std.parseInt(Reflect.field(props, label + "-frame"));
	        this.labels.set(label, frame);
	    }
	}
	, getChildByName: function (name) {
	    var m = new com.todream.flash.display.FlashMovie(name);
	    m.set_parent(this);
	    return m;
	}
	, disable: function () {
	    return this;
	}
	, enable: function () {
	    return this;
	}
	, reverse: function () {
	    this.set_direction(-this.get_direction());
	}
	, forwards: function () {
	    this.set_direction(1);
	}
	, backwards: function () {
	    this.set_direction(-1);
	}
	, prevFrame: function () {
	    var n = this.get_currentFrame() - this.get_direction();
	    if (n == 0) n = this.get_totalFrames(); else if (n == this.maxFrame) n = 1;
	    this.gotoAndStop(n);
	}
	, nextFrame: function () {
	    var n = this.get_currentFrame() + this.get_direction();
	    if (n == 0) n = this.get_totalFrames(); else if (n == this.maxFrame) n = 1;
	    this.gotoAndStop(n);
	}
	, playTo: function (n, type) {
	    if (this.get_currentFrame() == n) {
	        this.stop();
	        return;
	    }
	    if (this.state == "S") this.play();
	    this.destination = n;
	    this._direction = this.get_direction();
	    if (type == null) type = "min";
	    if (this.loop) {
	        var f = com.todream.utils.Utils.getIntervalInLoop(this.get_totalFrames(), 1, this.get_currentFrame(), n);
	        var d = com.todream.utils.Utils.getIntervalInLoop(this.get_totalFrames(), -1, this.get_currentFrame(), n);
	        switch (type) {
	            case "f":
	                this.set_direction(1);
	                break;
	            case "b":
	                this.set_direction(-1);
	                break;
	            case "max":
	                this.set_direction(f > d ? 1 : -1);
	                break;
	            case "min":
	                this.set_direction(f < d ? 1 : -1);
	                break;
	            case "none":
	                break;
	        }
	    } else this.set_direction(n - this.get_currentFrame() > 0 ? 1 : -1);
	}
	, gotoAndPlay: function (n) {
	    console.log("FlashMovie:gotoAndPlay:" + Std.string(n));
	    var f;
	    if (js.Boot.__instanceof(n, String)) {
	        f = (function ($this) {
	            var $r;
	            var key = n;
	            $r = $this.labels.get(key);
	            return $r;
	        } (this));
	        if (f == null) throw "gotoAndPlay(" + Std.string(n) + ")指定的标签不存在!";
	    } else if (js.Boot.__instanceof(n, Int)) f = n; else throw "gotoAndPlay(" + Std.string(n) + ")的参数非法！";
	    if (this.loop) f = Math.max(1, f % this.maxFrame) | 0; else f = Math.min(this.get_totalFrames(), Math.max(1, f)) | 0;
	    this.set_currentFrame(f);
	    this.play();
	}
	, gotoAndStop: function (n) {
	    console.log("FlashMovie:gotoAndStop:" + Std.string(n));
	    var f = 1;
	    if (js.Boot.__instanceof(n, String)) {
	        f = (function ($this) {
	            var $r;
	            var key = n;
	            $r = $this.labels.get(key);
	            return $r;
	        } (this));
	        if (f == null) throw "gotoAndPlay(" + Std.string(n) + ")指定的标签不存在!";
	    } else if (js.Boot.__instanceof(n, Int)) f = n; else throw "gotoAndPlay(" + Std.string(n) + ")的参数非法！";
	    if (this.loop) f = Math.max(1, f % this.maxFrame) | 0; else f = Math.min(this.get_totalFrames(), Math.max(1, f)) | 0;
	    this.set_currentFrame(f);
	    this.stop();
	}
	, stop: function () {
	    if (this.state != "S") {
	        console.log("stop():current:" + this.get_currentFrame());
	        this.state = "S";
	    }
	    this.dispatch({ type: "stop", target: this, data: {} });
	}
	, play: function () {
	    this.state = "P";
	    if (!this.loop) {
	        if (this.get_currentFrame() == this.get_totalFrames() && this.get_direction() == 1) this.set_currentFrame(1); else if (this.get_currentFrame() == 1 && this.get_direction() == -1) this.set_currentFrame(this.get_totalFrames());
	    }
	    this.dispatch({ type: "play", target: this, data: {} });
	    return this;
	}
	, onAddToStage: function () {
	    if (this.get_parent() != null) this.set_id(this.get_parent().get_id() + "." + this.name); else this.set_id(this.name);
	    this.state = "P";
	    this.__totalFrames = this.set_totalFrames(Std.parseInt(this.stage_fl.getProperty(this.get_id(), "totalFrames")));
	    this.set_currentFrame(this.__currentFrame = Std.parseInt(this.stage_fl.getProperty(this.get_id(), "currentFrame")));
	    this.stage_fl.register(this);
	}
	, init: function (props) {
	    if (props == null) {
	        console.log("不根据props对象初始化：id:" + this.get_id());
	        this.loop = true;
	        this.state = "P";
	        this.set_currentFrame(Std.parseInt(this.stage_fl.getProperty(this.get_id(), "currentFrame")));
	        this.set_totalFrames(Std.parseInt(this.stage_fl.getProperty(this.get_id(), "totalFrames")));
	    } else {
	        console.log("根据props初始化对象:id:" + this.get_id());
	        console.log("totalFrames:" + (props.totalFrames + 1));
	        this.set_totalFrames(props.totalFrames);
	        if (this.get_totalFrames() == null || this.get_totalFrames() == 0) this.set_totalFrames(Std.parseInt(this.stage_fl.getProperty(this.get_id(), "totalFrames")));
	        this.loop = props.loop;
	        if (props.autoplay) this.play(); else {
	            this.stop();
	            this.update();
	        }
	        if (props.labels != null && props.labels.length >= 1) this.labelsInit(props);
	        console.log("scripts:" + props.scripts);
	        if (props.scripts != null && props.scripts.length >= 1) this.scriptsInit(props);
	    }
	}
	, set_totalFrames: function (n) {
	    this.totalFrames = n;
	    this.maxFrame = n + 1;
	    console.log("set_totalFrame:" + this.get_id() + ",n:" + n + ",maxFrame:" + this.maxFrame);
	    return this.get_totalFrames();
	}
	, get_totalFrames: function () {
	    return this.totalFrames;
	}
	, set_currentFrame: function (n) {
	    return this.currentFrame = n;
	}
	, get_currentFrame: function () {
	    return this.currentFrame;
	}
	, set_direction: function (d) {
	    this.direction = d;
	    return d;
	}
	, get_direction: function () {
	    return this.direction;
	}
	, set_parent: function (parent) {
	    this.parent = parent;
	    this.onAddToStage();
	    return parent;
	}
	, get_parent: function () {
	    return this.parent;
	}
	, set_id: function (id) {
	    return this.id = id;
	}
	, get_id: function () {
	    return this.id;
	}
	, __class__: com.todream.flash.display.FlashMovie
    });
    com.todream.html5 = {}
    com.todream.html5.display = {}
    com.todream.html5.display.H5Movie = function (mc_h5) {
        this._direction = 1;
        this.direction = 1;
        this.__destination = -1;
        this.destination = -1;
        this.maxFrame = 2;
        this.totalFrames = 1;
        this.__totalFrames = 1;
        this.__currentFrame = 1;
        this.currentFrame = 1;
        com.todream.events.TcssDispatcher.call(this);
        this.mc_h5 = mc_h5;
        this.children = new haxe.ds.StringMap();
        if (mc_h5.timeline == null) this.tl = { duration: 0 }; else this.tl = mc_h5.timeline;
        this.labels = new haxe.ds.StringMap();
        this.scripts = new haxe.ds.IntMap();
    };
    com.todream.html5.display.H5Movie.__name__ = true;
    com.todream.html5.display.H5Movie.__interfaces__ = [com.todream.i.ITimeline];
    com.todream.html5.display.H5Movie.__super__ = com.todream.events.TcssDispatcher;
    com.todream.html5.display.H5Movie.prototype = $extend(com.todream.events.TcssDispatcher.prototype, {
        update: function () {
            var script = this.scripts.get(this.currentFrame);
            if (script != null) script.call(this);
            this.dispatch({ type: "update", target: this, data: {} });
        }
	, run: function () {
	    if (!this.mc_h5.paused) {
	        this.currentFrame = this.currentFrame + this.get_direction();
	        if (this.currentFrame == 0) this.currentFrame = this.get_totalFrames(); else if (this.currentFrame == this.maxFrame) this.currentFrame = 1;
	        if (this.currentFrame != this.__currentFrame) {
	            if (this.get_name() == "timer_mc") {
	            }
	            this.__currentFrame = this.currentFrame;
	            this.update();
	        }
	        if (this.__destination != -1 && this.currentFrame == this.__destination) {
	            this.destination = this.__destination = -1;
	            this.set_direction(this._direction);
	            this.stop();
	        }
	    }
	}
	, scriptsInit: function (props) {
	    var mcl = com.todream.m.MCollections.getInstance();
	    var _scripts = props.scripts.split(",");
	    var _script;
	    var script;
	    var frames;
	    var frame;
	    var body;
	    var _g1 = 0, _g = _scripts.length;
	    while (_g1 < _g) {
	        var j = _g1++;
	        _script = _scripts[j];
	        body = Reflect.field(props, _script + "-script");
	        body = "with(this){" + body.split("\r\n").join("") + "};";
	        script = com.todream.utils.Utils.createScript(body);
	        frames = Reflect.field(props, _script + "-frame").split(",");
	        var _g3 = 0, _g2 = frames.length;
	        while (_g3 < _g2) {
	            var i = _g3++;
	            frame = Std.parseInt(frames[i]);
	            this.scripts.set(frame, script);
	        }
	    }
	}
	, labelsInit: function (props) {
	    var mcl = com.todream.m.MCollections.getInstance();
	    var _labels = props.labels.split(",");
	    var label;
	    var frame;
	    var _g1 = 0, _g = _labels.length;
	    while (_g1 < _g) {
	        var j = _g1++;
	        label = _labels[j];
	        frame = Std.parseInt(Reflect.field(props, label + "-frame"));
	        this.labels.set(label, frame);
	    }
	}
	, click: function (f) {
	    this.mc_h5.addEventListener.apply(this.mc_h5, ["click", f]);
	}
	, disable: function () {
	    this.mc_h5.disable();
	    return this;
	}
	, enable: function () {
	    this.mc_h5.enable();
	    return this;
	}
	, reverse: function () {
	    this.set_direction(-this.get_direction());
	}
	, forwards: function () {
	    this.set_direction(1);
	}
	, backwards: function () {
	    this.set_direction(-1);
	}
	, prevFrame: function () {
	    console.log("prevFrame:currentFrame:" + this.currentFrame + ",prev:" + (this.currentFrame - this.get_direction()));
	    var n = this.currentFrame - this.get_direction();
	    if (n == 0) n = this.get_totalFrames(); else if (n == this.maxFrame) n = 1;
	    this.gotoAndStop(n);
	}
	, nextFrame: function () {
	    var n = this.currentFrame + this.get_direction();
	    if (n == 0) n = this.get_totalFrames(); else if (n == this.maxFrame) n = 1;
	    this.gotoAndStop(n);
	}
	, playTo: function (n, type) {
	    var f = -1;
	    if (js.Boot.__instanceof(n, String)) {
	        f = (function ($this) {
	            var $r;
	            var key = n;
	            $r = $this.labels.get(key);
	            return $r;
	        } (this));
	        if (f == null) throw "gotoAndPlay(" + Std.string(n) + ")指定的标签不存在!";
	    } else if (js.Boot.__instanceof(n, Int)) f = n;
	    if (this.currentFrame == f) {
	        this.stop();
	        return;
	    }
	    if (this.state == "S") this.play();
	    this.destination = f;
	    this._direction = this.get_direction();
	    if (type == null) type = "min";
	    if (this.get_loop()) {
	        var ff = com.todream.utils.Utils.getIntervalInLoop(this.get_totalFrames(), 1, this.currentFrame, n);
	        var dd = com.todream.utils.Utils.getIntervalInLoop(this.get_totalFrames(), -1, this.currentFrame, n);
	        switch (type) {
	            case "f":
	                this.set_direction(1);
	                break;
	            case "b":
	                this.set_direction(-1);
	                break;
	            case "max":
	                this.set_direction(ff > dd ? 1 : -1);
	                break;
	            case "min":
	                this.set_direction(ff < dd ? 1 : -1);
	                break;
	            case "none":
	                break;
	        }
	    } else this.set_direction(f - this.currentFrame > 0 ? 1 : -1);
	    this.__destination = f - this.get_direction();
	}
	, gotoAndPlay: function (n) {
	    var f = -1;
	    if (js.Boot.__instanceof(n, String)) {
	        f = (function ($this) {
	            var $r;
	            var key = n;
	            $r = $this.labels.get(key);
	            return $r;
	        } (this));
	        if (f == null) throw "gotoAndPlay(" + Std.string(n) + ")指定的标签不存在!";
	    } else if (js.Boot.__instanceof(n, Int)) f = n; else throw "gotoAndPlay(" + Std.string(n) + ")的参数非法！";
	    if (this.get_loop()) this.currentFrame = Math.max(1, f % this.maxFrame) | 0; else this.currentFrame = Math.min(this.get_totalFrames(), Math.max(1, f)) | 0;
	    this.state = "P";
	    this.mc_h5.gotoAndPlay(this.currentFrame - 1);
	    this.play();
	}
	, gotoAndStop: function (n) {
	    var f = -1;
	    if (js.Boot.__instanceof(n, String)) {
	        f = (function ($this) {
	            var $r;
	            var key = n;
	            $r = $this.labels.get(key);
	            return $r;
	        } (this));
	        if (f == null) throw "gotoAndStop(" + Std.string(n) + ")指定的标签不存在!";
	    } else if (js.Boot.__instanceof(n, Int)) f = n; else throw "gotoAndStop(" + Std.string(n) + ")的参数非法！";
	    if (this.get_loop()) {
	        this.currentFrame = Math.max(1, f % this.maxFrame) | 0;
	        console.log("gotoAndStop:maxFrame:" + this.maxFrame + ",f:" + f + ",currentFrame:" + this.currentFrame);
	    } else this.currentFrame = Math.min(this.get_totalFrames(), Math.max(1, f)) | 0;
	    this.state = "S";
	    this.mc_h5.gotoAndStop(this.currentFrame - 1);
	    this.stop();
	}
	, stop: function () {
	    console.log("stop:currentFrame:" + this.currentFrame);
	    if (this.state != "S") {
	        this.state = "S";
	        this.mc_h5.stop();
	    }
	    this.dispatch({ type: "stop", target: this, data: this.mc_h5.currentFrame });
	}
	, play: function () {
	    this.state = "P";
	    if (!this.get_loop()) {
	        if (this.currentFrame == this.get_totalFrames() && this.get_direction() == 1) this.currentFrame = 0; else if (this.currentFrame == 0 && this.get_direction() == -1) this.currentFrame = this.get_totalFrames();
	    }
	    this.mc_h5.play();
	    this.dispatch({ type: "play", target: this, data: {} });
	    return this;
	}
	, getChildByName: function (name) {
	    var mc = this.children.get(name);
	    if (mc == null) {
	        var h5 = this.mc_h5.getChildByName(name);
	        if (h5 == null) h5 = Reflect.field(this.mc_h5, name);
	        mc = new com.todream.html5.display.H5Movie(h5);
	        mc.set_name(name);
	        mc.set_parent(this);
	        this.children.set(name, mc);
	    }
	    return mc;
	}
	, init: function (props) {
	    if (props == null) {
	        if (this.mc_h5.loop == false) this.set_loop(false); else {
	            this.set_loop(true);
	            this.mc_h5.loop = true;
	        }
	        if (this.mc_h5.paused) this.state = "S"; else this.state = "P";
	        this.currentFrame = this.mc_h5.currentFrame + 1;
	        this.set_totalFrames(this.tl.duration);
	    } else {
	        this.set_totalFrames(props.totalFrames);
	        if (this.get_totalFrames() == null || this.get_totalFrames() == 0) this.set_totalFrames(this.tl.duration);
	        this.set_loop(props.loop);
	        if (props.autoplay) this.play(); else this.stop();
	        if (props.labels != null && props.labels.length >= 1) this.labelsInit(props);
	        if (props.scripts != null && props.scripts.length >= 1) this.scriptsInit(props);
	        console.log("init:totalFrames:" + this.get_totalFrames());
	    }
	    this.mc_h5.addEventListener("tick", $bind(this, this.run));
	}
	, getCursor: function () {
	    return this.mc_h5.cursor;
	}
	, setCursor: function (c) {
	    this.mc_h5.cursor = c;
	}
	, onAddToStage: function () {
	    if (this.get_parent() != null) this.set_id(this.get_parent().get_id() + "." + this.get_name()); else this.set_id(this.get_name());
	}
	, setLoop: function (b) {
	    this.set_loop(b);
	}
	, set_loop: function (b) {
	    this.loop = b;
	    this.mc_h5.loop = b;
	    return this.get_loop();
	}
	, get_loop: function () {
	    return this.loop;
	}
	, set_direction: function (d) {
	    this.mc_h5.direction = this.direction = d;
	    return d;
	}
	, get_direction: function () {
	    return this.direction;
	}
	, set_totalFrames: function (n) {
	    this.totalFrames = n;
	    this.maxFrame = n + 1;
	    return this.get_totalFrames();
	}
	, get_totalFrames: function () {
	    return this.totalFrames;
	}
	, set_parent: function (parent) {
	    this.parent = parent;
	    this.onAddToStage();
	    return parent;
	}
	, get_parent: function () {
	    return this.parent;
	}
	, set_id: function (id) {
	    return this.id = id;
	}
	, get_id: function () {
	    return this.id;
	}
	, set_name: function (name) {
	    this.mc_h5.name = name;
	    return this.name = name;
	}
	, get_name: function () {
	    return this.name;
	}
	, __class__: com.todream.html5.display.H5Movie
    });
    com.todream.m.MMovie = function () {
        this.directRender = true;
        this.to = 1;
        this.from = 1;
        this.destination = -1;
        this.direction = 1;
        this.maxFrame = 2;
        this.totalFrames = 1;
        this.__totalFrames = 1;
        this.__currentFrame = 1;
        this.currentFrame = 1;
        com.todream.events.TcssDispatcher.call(this);
        this.movies = new haxe.ds.StringMap();
        this.clips = new haxe.ds.StringMap();
        this.labels = new haxe.ds.StringMap();
        this.scripts = new haxe.ds.IntMap();
        this.so = {};
    };
    com.todream.m.MMovie.__name__ = true;
    com.todream.m.MMovie.__super__ = com.todream.events.TcssDispatcher;
    com.todream.m.MMovie.prototype = $extend(com.todream.events.TcssDispatcher.prototype, {
        getMovieClass: function (clsId) {
            this.getClass(clsId);
        }
	, getClass: function (clsId) {
	    return this.mcl.getMovieTemplate(clsId);
	}
	, getClipProps: function (mcl, props, name) {
	    var cp = { name: name, isDefault: false, selector: Reflect.field(props, name + "-selector"), registerPoint: Reflect.field(props, name + "-registerPoint"), clip: null, from: Std.parseInt(Reflect.field(props, name + "-from")), to: Std.parseInt(Reflect.field(props, name + "-to")), 'arguments': null };
	    var clip = Reflect.field(props, name + "-clip");
	    var sa = com.todream.utils.Utils.exec(com.todream.utils.ERegTemplate.SELECTOR_ARGS, clip);
	    var args = [];
	    if (sa.length > 0) {
	        clip = sa[1];
	        args = sa[2].split(",");
	    }
	    cp.clip = clip;
	    cp["arguments"] = args;
	    var c = mcl.getClip(clip);
	    if (cp.from == null) cp.from = 1;
	    if (cp.to == null) cp.to = c.totalFrames;
	    return cp;
	}
	, resize: function () {
	    var keys = this.clips.keys();
	    var cv;
	    var c;
	    while (keys.hasNext()) {
	        var key = keys.next();
	        cv = this.clips.get(key);
	        c = cv.proto;
	        c.resize(cv);
	    }
	    this.resizeChildren();
	    if (this.directRender) this.update();
	}
	, resizeChildren: function () {
	    var keys = this.movies.keys();
	    var miv;
	    while (keys.hasNext()) {
	        var key = keys.next();
	        miv = this.movies.get(key);
	        miv.movie.resize();
	    }
	}
	, update: function () {
	    this.updateChildren();
	    var keys = this.clips.keys();
	    var cv;
	    var nCurrentFrame = this.currentFrame - this.from + 1;
	    while (keys.hasNext()) {
	        var key = keys.next();
	        cv = this.clips.get(key);
	        if (nCurrentFrame >= cv.from && nCurrentFrame <= cv.to) cv.proto.update(cv, nCurrentFrame);
	    }
	    var script = this.scripts.get(this.currentFrame);
	    if (script != null) script.call(this);
	    this.dispatch({ type: "update", target: this, data: {} });
	}
	, reupdate: function () {
	    this.updateChildren();
	    var keys = this.clips.keys();
	    var cv;
	    var nCurrentFrame = this.currentFrame - this.from + 1;
	    while (keys.hasNext()) {
	        var key = keys.next();
	        cv = this.clips.get(key);
	        if (nCurrentFrame >= cv.from && nCurrentFrame <= cv.to) cv.proto.update(cv, nCurrentFrame);
	    }
	    var script = this.scripts.get(this.currentFrame);
	    if (script != null) script.call(this);
	    this.dispatch({ type: "reupdate", target: this, data: {} });
	}
	, updateChildren: function () {
	    var keys = this.movies.keys();
	    var miv;
	    while (keys.hasNext()) {
	        var key = keys.next();
	        miv = this.movies.get(key);
	        if (key == "m2") {
	        }
	        if (this.currentFrame >= miv.from && this.currentFrame <= miv.to) {
	            if (miv.movie.autoplay == true) miv.movie.run(); else {
	                miv.movie.run();
	                miv.movie.gotoAndStop(this.currentFrame);
	            }
	        } else {
	        }
	    }
	}
	, scriptsInit: function (props) {
	    var mcl = com.todream.m.MCollections.getInstance();
	    var _scripts = props.scripts.split(",");
	    var _script;
	    var script;
	    var frames;
	    var frame;
	    var body;
	    var _g1 = 0, _g = _scripts.length;
	    while (_g1 < _g) {
	        var j = _g1++;
	        _script = _scripts[j];
	        body = Reflect.field(props, _script + "-script");
	        body = "with(this){" + body.split("\r\n").join("") + "};";
	        script = com.todream.utils.Utils.createScript(body);
	        frames = Reflect.field(props, _script + "-frame").split(",");
	        var _g3 = 0, _g2 = frames.length;
	        while (_g3 < _g2) {
	            var i = _g3++;
	            frame = Std.parseInt(frames[i]);
	            this.scripts.set(frame, script);
	        }
	    }
	}
	, labelsInit: function (props) {
	    var mcl = com.todream.m.MCollections.getInstance();
	    var _labels = props.labels.split(",");
	    var label;
	    var frame;
	    var _g1 = 0, _g = _labels.length;
	    while (_g1 < _g) {
	        var j = _g1++;
	        label = _labels[j];
	        frame = Std.parseInt(Reflect.field(props, label + "-frame"));
	        this.labels.set(label, frame);
	    }
	}
	, moviesInit: function (mcl, props) {
	    var instanceName;
	    var __totalFrames = 1;
	    var movieInstances = props.movies.split(",");
	    var m;
	    var miv;
	    var from;
	    var to;
	    var loop = false;
	    var autoplay = false;
	    var tmp;
	    var movieName;
	    var movieT;
	    var _g1 = 0, _g = movieInstances.length;
	    while (_g1 < _g) {
	        var k = _g1++;
	        instanceName = movieInstances[k];
	        movieName = Reflect.field(props, instanceName + "-movie");
	        var sa = com.todream.utils.Utils.exec(com.todream.utils.ERegTemplate.SELECTOR_ARGS, movieName);
	        if (sa.length > 0) {
	            movieT = mcl.getMovieTemplate(sa[1]);
	            var realArgs = com.todream.utils.Utils.match(com.todream.utils.ERegTemplate.REAL_ARGS, sa[2]);
	            var _g3 = 0, _g2 = realArgs.length;
	            while (_g3 < _g2) {
	                var i = _g3++;
	                realArgs[i] = eval("(" + realArgs[i] + ")");
	            }
	            m = movieT.create.apply(movieT, realArgs);
	        } else m = mcl.getMovie(movieName);
	        if (m == null) continue;
	        m.directRender = false;
	        from = Reflect.field(props, instanceName + "-from");
	        if (from == null) from = 1;
	        to = Reflect.field(props, instanceName + "-to");
	        if (to == null) to = from + m.get_totalFrames() - 1;
	        tmp = Reflect.field(props, instanceName + "-loop");
	        if (tmp != null) {
	            loop = tmp == "true";
	            m.loop = loop;
	        }
	        tmp = Reflect.field(props, instanceName + "-autoplay");
	        if (tmp != null) {
	            autoplay = tmp == "true";
	            m.autoplay = autoplay;
	        }
	        if (m.autoplay) m.play(); else m.set_totalFrames(to);
	        miv = { from: from, to: to, movie: m };
	        m.from = from;
	        m.to = to;
	        __totalFrames = Math.max(__totalFrames, miv.to) | 0;
	        this.movies.set(instanceName, miv);
	    }
	    return __totalFrames;
	}
	, clipsInit: function (mcl, props) {
	    var instanceName;
	    var __totalFrames = 1;
	    var clipInstances = props.clips.split(",");
	    var cp;
	    var cv;
	    var c;
	    var _g1 = 0, _g = clipInstances.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        instanceName = clipInstances[i];
	        cp = this.getClipProps(mcl, props, instanceName);
	        __totalFrames = Math.max(__totalFrames, cp.to) | 0;
	        c = mcl.getClip(cp.clip);
	        cv = c.getClipValue(cp);
	        this.clips.set(instanceName, cv);
	    }
	    return __totalFrames;
	}
	, adjustTotalFrames: function (frames) {
	}
	, css: function (clipName, selector, prop, value) {
	    var cv = this.getClip(clipName);
	    if (cv != null) {
	        if (selector == "default") selector = cv.selector;
	        return cv.proto.css(selector, prop, value);
	    } else throw "MMovie:css:not found clip by clipName!";
	}
	, move: function (originX, originY) {
	    var keys = this.clips.keys();
	    var c;
	    var cv;
	    while (keys.hasNext()) {
	        var key = keys.next();
	        cv = this.clips.get(key);
	        c = cv.proto;
	    }
	}
	, disable: function () {
	    this.directRender = false;
	}
	, enable: function () {
	    this.directRender = true;
	    this.update();
	    return this;
	}
	, reverse: function () {
	    this.direction = -this.direction;
	}
	, forwards: function () {
	    this.direction = 1;
	}
	, backwards: function () {
	    this.direction = -1;
	}
	, playTo: function (n, type) {
	    if (this.currentFrame == n) {
	        this.stop();
	        return;
	    }
	    this.destination = n;
	    this._direction = this.direction;
	    if (type == null) type = "min";
	    if (this.loop) {
	        var f = com.todream.utils.Utils.getIntervalInLoop(this.maxFrame, 1, this.currentFrame, n);
	        var d = com.todream.utils.Utils.getIntervalInLoop(this.maxFrame, -1, this.currentFrame, n);
	        switch (type) {
	            case "f":
	                this.direction = 1;
	                break;
	            case "b":
	                this.direction = -1;
	                break;
	            case "max":
	                this.direction = f > d ? 1 : -1;
	                break;
	            case "min":
	                this.direction = f < d ? 1 : -1;
	                break;
	            case "none":
	                break;
	        }
	    } else this.direction = n - this.currentFrame > 0 ? 1 : -1;
	    if (this.state == "S") this.play();
	}
	, gotoAndPlay: function (n) {
	    var f;
	    if (js.Boot.__instanceof(n, String)) {
	        f = (function ($this) {
	            var $r;
	            var key = n;
	            $r = $this.labels.get(key);
	            return $r;
	        } (this));
	        if (f == null) throw "gotoAndPlay(" + Std.string(n) + ")指定的标签不存在!";
	    } else if (js.Boot.__instanceof(n, Int)) f = n; else throw "gotoAndPlay(" + Std.string(n) + ")的参数非法！";
	    if (this.loop) f = Math.max(1, f % this.maxFrame) | 0; else f = Math.min(this.get_totalFrames(), Math.max(1, f)) | 0;
	    this.currentFrame = f;
	    this.play();
	}
	, gotoAndStop: function (n) {
	    var f = -1;
	    if (js.Boot.__instanceof(n, String)) {
	        f = (function ($this) {
	            var $r;
	            var key = n;
	            $r = $this.labels.get(key);
	            return $r;
	        } (this));
	        if (f == null) throw "gotoAndPlay(" + Std.string(n) + ")指定的标签不存在!";
	    } else if (js.Boot.__instanceof(n, Int)) f = n; else throw "gotoAndPlay(" + Std.string(n) + ")的参数非法！";
	    if (this.loop) f = Math.max(1, f % this.maxFrame) | 0; else f = Math.min(this.get_totalFrames(), Math.max(1, f)) | 0;
	    this.currentFrame = f;
	    this.stop();
	}
	, prevFrame: function () {
	    var n = this.currentFrame - this.direction;
	    if (n == 0) n = this.get_totalFrames(); else if (n == this.maxFrame) n = 1;
	    this.gotoAndStop(n);
	}
	, nextFrame: function () {
	    var n = this.currentFrame + this.direction;
	    if (n == 0) n = this.get_totalFrames(); else if (n == this.maxFrame) n = 1;
	    this.gotoAndStop(n);
	}
	, stop: function () {
	    if (this.state != "S") this.state = "S";
	    this.dispatch({ type: "stop", target: this, data: {} });
	}
	, play: function () {
	    this.state = "P";
	    if (!this.loop) {
	        if (this.currentFrame == this.get_totalFrames() && this.direction == 1) this.currentFrame = 1; else if (this.currentFrame == 1 && this.direction == -1) this.currentFrame = this.get_totalFrames();
	    }
	    this.dispatch({ type: "play", target: this, data: {} });
	    return this;
	}
	, getChild: function (name) {
	    var miv = this.movies.get(name);
	    var m = null;
	    if (miv != null) m = miv.movie; else console.log(this.name + "没有子影片 " + name);
	    return m;
	}
	, getMovie: function (name) {
	    return this.getChild(name);
	}
	, addMovie: function (m, loop, complete) {
	    if (m != null && loop != null) m.loop = loop;
	    if (m != null && complete != null) {
	        m.from = this.get_totalFrames();
	        m.to = this.get_totalFrames() + m.from;
	    }
	    var miv = { from: m.from, to: m.to, movie: m };
	    this.movies.set(m.name, miv);
	    return m;
	}
	, addChild: function (props, loop, complete) {
	    var clip = this.mcl.getClip(props.clip);
	    var from = props.from;
	    var to = props.to;
	    if (props.from == null) from = props.from = 1;
	    if (to == null) to = props.to = props.from + clip.totalFrames - 1;
	    if (complete == null) complete = true;
	    if (to >= this.get_totalFrames() && complete) this.set_totalFrames(this.__totalFrames = to);
	    console.log("MMovie:addChild:props:" + Std.string(props));
	    var m = this.mcl.getMovie(props.selector, loop, props);
	    var miv = { from: from, to: to, movie: m };
	    this.movies.set(props.name, miv);
	    return miv;
	}
	, getClip: function (name) {
	    var cv = this.clips.get(name);
	    if (cv == null) {
	        console.log("没有找到与" + name + "关联的剪辑数据!");
	        return null;
	    } else return cv;
	}
	, addClip: function (props, complete) {
	    var clip = this.mcl.getClip(props.clip);
	    var to = props.to;
	    if (props.from == null) props.from = 1;
	    if (to == null) to = props.to = props.from + clip.totalFrames - 1;
	    if (complete == null) complete = true;
	    if (to >= this.get_totalFrames() && complete) this.set_totalFrames(this.__totalFrames = to);
	    var cv = clip.getClipValue(props);
	    this.clips.set(props.name, cv);
	    return cv;
	}
	, run: function () {
	    if (this.currentFrame != this.__currentFrame) {
	        this.__currentFrame = this.currentFrame;
	        this.update();
	    } else this.updateChildren();
	    if (this.state != "S") {
	        if (this.destination != -1 && this.currentFrame == this.destination) {
	            this.state = "S";
	            this.destination = -1;
	            this.direction = this._direction;
	            this.dispatch({ type: "arrived", target: this, data: { destination: this.currentFrame} });
	            return;
	        }
	        this.currentFrame = this.currentFrame + this.direction;
	        if (this.loop) {
	            if (this.currentFrame == 0) this.currentFrame = this.get_totalFrames(); else if (this.currentFrame == this.maxFrame) this.currentFrame = 1;
	        } else {
	            if (this.currentFrame == 0 || this.currentFrame == this.maxFrame) {
	                this.state = "S";
	                this.dispatch({ type: "finished", target: this, data: {} });
	            }
	            this.currentFrame = Math.max(1, Math.min(this.currentFrame, this.get_totalFrames())) | 0;
	        }
	    }
	}
	, create: function (props) {
	    if (props.create != null) {
	        var args = "props";
	        if (this["arguments"].length > 0) args += "," + this["arguments"].join(",");
	        var $as = args.split(",");
	        var body = props.create;
	        body = "with(this){" + body.split("\r\n").join("") + "};";
	        $as.push(body);
	        var script = com.todream.utils.Utils.createFunction($as);
	        var values = props.argumentValues;
	        values.unshift(props);
	        script.apply(this, values);
	    }
	}
	, __init: function (name, props) {
	    this.name = name;
	    this.mcl = com.todream.m.MCollections.getInstance();
	    this["arguments"] = Reflect.field(props, "arguments");
	    this.create(props);
	    this.autoplay = props.autoplay == null ? this.mcl.settings.defaultAutoplay : props.autoplay;
	    if (this.autoplay) this.state = "P"; else this.state = "S";
	    if (props.clips != null && props.clips.length >= 1) this.__totalFrames = this.clipsInit(this.mcl, props);
	    if (props.movies != null && props.movies.length >= 1) this.__totalFrames = Math.max(this.__totalFrames, this.moviesInit(this.mcl, props)) | 0;
	    if (props.labels != null && props.labels.length >= 1) this.labelsInit(props);
	    if (props.scripts != null && props.scripts.length >= 1) this.scriptsInit(props);
	    this.loop = props.loop;
	    this.set_totalFrames(props.totalFrames);
	    if (this.get_totalFrames() == null || this.get_totalFrames() == 0) this.set_totalFrames(this.__totalFrames);
	    this.directRender = props.directRender;
	}
	, init: function (name, props) {
	    this.__init(name, props);
	}
	, set_totalFrames: function (n) {
	    this.totalFrames = n;
	    this.maxFrame = n;
	    return this.get_totalFrames();
	}
	, get_totalFrames: function () {
	    return this.totalFrames;
	}
	, __class__: com.todream.m.MMovie
    });
    com.todream.m.BootLoader = function () {
        com.todream.m.MMovie.call(this);
    };
    com.todream.m.BootLoader.__name__ = true;
    com.todream.m.BootLoader.__super__ = com.todream.m.MMovie;
    com.todream.m.BootLoader.prototype = $extend(com.todream.m.MMovie.prototype, {
        getElementById: function (id) {
            var lev;
            var _g1 = 0, _g = this.elements.length;
            while (_g1 < _g) {
                var i = _g1++;
                lev = this.elements[i];
                if (lev.id == id) return lev;
            }
            return null;
        }
	, insideRange_H: function (element) {
	    var viewRight = this.currentFrame + this.rootWidth;
	    var result = !(element.left > viewRight || element.right < this.currentFrame);
	    return result;
	}
	, insideRange_V: function (element) {
	    var viewBottom = this.currentFrame + this.rootHeight;
	    var result = !(element.top > viewBottom || element.bottom < this.currentFrame);
	    console.log("insideRange_V:result:" + Std.string(result) + ",top:" + element.top + ",bottom:" + element.bottom + ",current:" + this.currentFrame + ",viewBottom:" + viewBottom);
	    return result;
	}
	, onUpdate: function (e) {
	    var _g2 = this;
	    console.log("BootLoader:onUpdate:e.type:" + e.type);
	    if (e.type == "stop" || e.type == "update") {
	        console.log("loader:onUpdate:current:" + this.currentFrame + ",loop:" + Std.string(this.loop) + ",total:" + this.get_totalFrames());
	        var element;
	        var state;
	        var node;
	        var background;
	        var viewBottom = this.currentFrame + this.rootHeight;
	        var owner = this;
	        var _g1 = 0, _g = this.elements.length;
	        while (_g1 < _g) {
	            var i = _g1++;
	            element = this.elements[i];
	            state = element.state;
	            node = element.node;
	            console.log(node.attr("id") + ",state:" + element.state);
	            if (!this.insideRange(element)) {
	                console.log(node.attr("id") + "不在可视范围,设为静默状态");
	                node.css("background-image", "");
	                node.css("opacity", "0");
	                if (element.state != "Ld") element.state = "S";
	            } else if (state == "S") {
	                console.log(node.attr("id") + "初次进入可视范围，设置为 LOAD_START 状态");
	                background = "url(" + this.loading + ") no-repeat center";
	                node.css("background", background);
	                node.css("opacity", "1");
	                var _node;
	                _node = node;
	                _node.on("load", function (e1) {
	                    var _e = e1.target;
	                    console.log("onload:element:id:" + _e.id);
	                    $(_g2).off("load");
	                    var lev = owner.getElementById(_e.id);
	                    lev.state = "Ld";
	                    lev.node.css("background", "");
	                    owner.dispatch({ type: "onLoaded", target: owner, data: lev });
	                    var _g3 = _g2;
	                    _g3.set_loadedSum(_g3.get_loadedSum() + 1);
	                });
	                element.state = "Ls";
	                node.attr("src", element.src);
	            } else if (state == "Ls") {
	                console.log(node.attr("id") + "设置为 LOADING 状态");
	                element.state = "Li";
	            } else if (state == "Ld") node.css("opacity", "1");
	        }
	    }
	}
	, resize: function () {
	    com.todream.m.MMovie.prototype.resize.call(this);
	    var w = new $(js.Browser.window);
	    this.rootWidth = w.innerWidth();
	    this.rootHeight = w.innerHeight();
	    console.log("resize:rootWidth:" + this.rootWidth + ",rootHeight:" + this.rootHeight);
	    var e = { type: "update", target: this, data: {} };
	    this.onUpdate(e);
	}
	, __init: function (name, props) {
	    com.todream.m.MMovie.prototype.__init.call(this, name, props);
	    this.root = com.todream.m.MCollections.getInstance().root;
	    this.placeholder = Reflect.field(props, "placeholder") == null ? "/img/__utm.gif" : Reflect.field(props, "placeholder");
	    this.loading = Reflect.field(props, "loading") == null ? "/img/__utm.gif" : Reflect.field(props, "loading");
	    this.effect = Reflect.field(props, "effect") == null ? "/img/__utm.gif" : Reflect.field(props, "effect");
	    this.threshold = Reflect.field(props, "threshold") == null ? 0 : Std.parseFloat(Reflect.field(props, "threshold"));
	    this.scrollDirection = Reflect.field(props, "scrollDirection") == null ? "V" : Reflect.field(props, "scrollDirection");
	    if (this.scrollDirection == "V") this.insideRange = $bind(this, this.insideRange_V); else this.insideRange = $bind(this, this.insideRange_H);
	    this.elements = [];
	    var es = [];
	    if (Reflect.field(props, "elements") != null && Reflect.field(props, "elements").length > 0) es = Reflect.field(props, "elements").split(",");
	    var selector;
	    var node;
	    var element;
	    var offset;
	    var left;
	    var right;
	    var top;
	    var bottom;
	    console.log("BootLoader:init:es:" + Std.string(es));
	    var subnode;
	    var _g1 = 0, _g = es.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        selector = es[i];
	        console.log("selector:" + Std.string(selector));
	        node = new $(selector);
	        var _g3 = 0, _g2 = node.length;
	        while (_g3 < _g2) {
	            var j = _g3++;
	            subnode = new $(node[j]);
	            offset = subnode.offset();
	            element = { id: subnode.attr("id"), src: subnode.attr("tsrc"), backgroundSrc: subnode.css("background-image"), px: offset.left, py: offset.top, width: Std.parseFloat(subnode.css("width")), height: Std.parseFloat(subnode.css("height")), node: subnode, state: "S", left: 0, right: 0, top: 0, bottom: 0 };
	            element.left = element.px - this.threshold;
	            element.right = element.px + element.width + this.threshold;
	            element.top = element.py - this.threshold;
	            element.bottom = element.py + element.height + this.threshold;
	            subnode.attr("tsrc", "");
	            subnode.attr("src", this.placeholder);
	            subnode.css("background-image", "");
	            subnode.css("opacity", "0");
	            this.elements.push(element);
	        }
	    }
	    this.mcl = com.todream.m.MCollections.getInstance();
	    this.set_loadedSum(0);
	    this.addListener($bind(this, this.onUpdate));
	}
	, set_loadedSum: function (num) {
	    this.loadedSum = num;
	    if (num == this.elements.length) {
	        var e = { type: "onAllLoaded", target: this, data: {} };
	        this.dispatch(e);
	    }
	    return num;
	}
	, get_loadedSum: function () {
	    return this.loadedSum;
	}
	, __class__: com.todream.m.BootLoader
    });
    com.todream.m.MClip = function () {
        hxevents.Dispatcher.call(this);
    };
    com.todream.m.MClip.__name__ = true;
    com.todream.m.MClip.__super__ = hxevents.Dispatcher;
    com.todream.m.MClip.prototype = $extend(hxevents.Dispatcher.prototype, {
        resetArguments: function (cv, args) {
            cv["arguments"] = args;
            this.rebulidTweenValues(cv);
        }
	, rebulidTweenValues: function (cv) {
	    var selector = cv.selector;
	    var args = cv["arguments"];
	    var tws = cv.tweens;
	    var tv;
	    var tween;
	    var _g1 = 0, _g = this.tweens.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        tv = tws[i];
	        tween = tv.proto;
	        tween.rebuild(selector, tv, args);
	    }
	}
	, updateTweenValues: function (cv) {
	    var selector = cv.selector;
	    var args = cv["arguments"];
	    var tws = cv.tweens;
	    var tv;
	    var tween;
	    var _g1 = 0, _g = this.tweens.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        tv = tws[i];
	        tween = tv.proto;
	        tween.updateTweenValue(selector, tv, args);
	    }
	}
	, getTweenValues: function (cv) {
	    var tws = [];
	    var tween;
	    var tv;
	    var _g1 = 0, _g = this.tweens.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        tween = this.tweens[i];
	        tv = tween.getTweenValue(cv.selector, cv["arguments"]);
	        tv.start = cv.from + tv.start - 1;
	        tv.end = cv.from + tv.end - 1;
	        tws.push(tv);
	    }
	    return tws;
	}
	, getTweens: function () {
	    var tweens = [];
	    if (this.getPropValue("tweens") != null) {
	        var prop_tween = this.getPropValue("tweens");
	        if (prop_tween.indexOf("mt_navite") == -1) prop_tween = prop_tween + ",mt_native";
	        var ts = prop_tween.split(",");
	        var key;
	        var props;
	        var tween;
	        var tween_pre = new com.todream.m.Tween();
	        var startBody;
	        var endBody;
	        var args = "__node1976,__tweenValue4931";
	        if (this["arguments"].length > 0) args += "," + this["arguments"].join(",");
	        var $as;
	        var _g1 = 0, _g = ts.length;
	        while (_g1 < _g) {
	            var i = _g1++;
	            key = ts[i];
	            tween = new com.todream.m.Tween();
	            if (key == "mt_native") {
	                props = [1, this.totalFrames, "EaseNone"];
	                this.mt_native = tween;
	            } else props = js.Lib["eval"](this.getPropValue(key + "-props"));
	            tween.init(key, props[0], props[1], props[2]);
	            this.totalFrames = Math.max(this.totalFrames, tween.end) | 0;
	            if (this.getPropValue(key + "-start") != null) {
	                startBody = this.getPropValue(key + "-start");
	                if (startBody.indexOf(") ") == -1) startBody = startBody.split("\r\n").join(";") + ";"; else startBody = startBody.split(") ").join(");") + ";";
	                startBody = "var __tv1976={};var __init4931=__tweenValue4931.init;var __props_pre4931=__tweenValue4931.props_pre;var __props4931=__tweenValue4931.props;" + Std.string(tween.getCssFunctionBody()) + startBody + "return __tv1976;";
	                startBody = "with(this){" + startBody + "};";
	                $as = args.split(",");
	                $as.push(startBody);
	                tween.startInit = com.todream.utils.Utils.createFunction($as);
	            } else if (tween_pre != null) tween.startInit = $bind(tween_pre, tween_pre.endInit);
	            if (this.getPropValue(key + "-end") != null) {
	                endBody = this.getPropValue(key + "-end");
	                if (endBody.indexOf(") ") == -1) endBody = endBody.split("\r\n").join(";") + ";"; else endBody = endBody.split(") ").join(");") + ";";
	                endBody = "var __tv1976={};var __init4931=__tweenValue4931.init;var __props_pre4931=__tweenValue4931.props_pre;var __props4931=__tweenValue4931.props;" + Std.string(tween.getCssFunctionBody()) + endBody + "return __tv1976;";
	                endBody = "with(this){" + endBody + "};";
	                $as = args.split(",");
	                $as.push(endBody);
	                tween.endInit = com.todream.utils.Utils.createFunction($as);
	            }
	            tween_pre = tween;
	            if (this.getPropValue(key + "-script") != null) {
	                var animateBody = this.getPropValue(key + "-script");
	                animateBody = animateBody.split("\r\n").join("");
	                animateBody = "var __tv1976={};var __init4931=__tweenValue4931.init;var __props_pre4931=__tweenValue4931.props_pre;var __props4931=__tweenValue4931.props;" + Std.string(tween.getCssFunctionBody()) + animateBody + "return __tv1976;";
	                animateBody = "with(this){" + animateBody + "};";
	                $as = args.split(",");
	                $as.push(animateBody);
	                tween.animate = com.todream.utils.Utils.createFunction($as);
	            }
	            tweens.push(tween);
	        }
	    }
	    return tweens;
	}
	, getNodeValues: function (cv) {
	    var j = new $(cv.selector);
	    var jj;
	    var id;
	    var nvs = [];
	    var mcl = com.todream.m.MCollections.getInstance();
	    var _g1 = 0, _g = j.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        jj = new $(j[i]);
	        id = "#" + jj.attr("id");
	        nvs.push(mcl.getNodeValue(id));
	    }
	    return nvs;
	}
	, getPropValue: function (f) {
	    return Reflect.field(this.props, f);
	}
	, resize: function (cv) {
	    this.updateTweenValues(cv);
	}
	, update: function (cv, currentFrame) {
	    if (cv.currentFrame == currentFrame) {
	    }
	    cv.currentFrame = currentFrame;
	    var tweens = cv.tweens;
	    var tween;
	    var _g1 = 0, _g = tweens.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        tween = tweens[i];
	        if (currentFrame >= tween.start && currentFrame <= tween.end) tween.proto.update(tween, currentFrame, this.registerPoint);
	    }
	}
	, adjustTotalFrames: function (clipValue, frames) {
	    var total_pre = clipValue.totalFrames;
	    var current_pre = clipValue.currentFrame;
	    var ratio = frames / total_pre;
	    clipValue.totalFrames = frames;
	    clipValue.currentFrame = js.Boot.__cast(Math.max(1, Math.floor(current_pre * ratio)), Int);
	    var clip = clipValue.proto;
	    var tweens = clipValue.tweens;
	    var tv;
	    var start;
	    var end;
	    var _g1 = 0, _g = tweens.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        tv = tweens[i];
	        start = js.Boot.__cast(Math.max(1, Math.floor(tv.start * ratio)), Int);
	        end = js.Boot.__cast(Math.max(1, Math.floor(tv.end * ratio)), Int);
	        clip.adjust(tv.name, "start", start);
	        clip.adjust(tv.name, "end", end);
	    }
	}
	, adjust: function (tweenName, prop, value) {
	    var t;
	    var _g1 = 0, _g = this.tweenValues.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        t = this.tweenValues[i];
	        if (t.name == tweenName) {
	            t[prop] = value;
	            t.proto[prop] = value;
	        }
	    }
	}
	, css: function (selector, prop, value) {
	    var j = new $(selector);
	    var jj;
	    var id;
	    var nv;
	    var mcl = com.todream.m.MCollections.getInstance();
	    var rtValue = null;
	    var _g1 = 0, _g = j.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        jj = new $(j[i]);
	        id = "#" + jj.attr("id");
	        nv = mcl.getNodeValue(id);
	        rtValue = this.mt_native.tweencss(jj, nv, prop, value);
	    }
	    return rtValue;
	}
	, getClipValue: function (props) {
	    var cv = { proto: this, selector: props.selector, name: props.name, from: props.from, to: props.to, currentFrame: 0, totalFrames: this.totalFrames, tweens: null, nodeValues: null, 'arguments': props["arguments"] };
	    cv.nodeValues = this.getNodeValues(cv);
	    cv.tweens = this.getTweenValues(cv);
	    this.tweenValues = cv.tweens;
	    return cv;
	}
	, init: function (classId, props) {
	    this.classId = classId;
	    this.props = props;
	    this.props.start = Std.parseInt(props.start);
	    this.props.end = Std.parseInt(props.end);
	    this.totalFrames = 1;
	    this.registerPoint = Std.parseInt(props.registerPoint);
	    this["arguments"] = Reflect.field(props, "arguments");
	    this.tweens = this.getTweens();
	}
	, __class__: com.todream.m.MClip
    });
    com.todream.m.MCommon = function () {
        this.scaleMax = 1;
        this.scaleMin = 0.1;
        hxevents.Dispatcher.call(this);
    };
    com.todream.m.MCommon.__name__ = true;
    com.todream.m.MCommon.setPositionByRegisterPoint = function (initObj, currentObj, css, lfbt, width, height, point, selector) {
        var pValue;
        var mValue;
        var w = com.todream.m.MCommon.getRegisterPointValue(point, "X") * width;
        var h = com.todream.m.MCommon.getRegisterPointValue(point, "Y") * height;
        switch (lfbt) {
            case "L":
                pValue = Std.parseFloat(Reflect.field(css, "left"));
                pValue = pValue + w;
                mValue = 0;
                mValue = mValue - w;
                initObj.left = pValue;
                initObj["margin-left"] = mValue;
                currentObj.left = pValue + "px";
                currentObj["margin-left"] = mValue + "px";
                break;
            case "R":
                pValue = Std.parseFloat(Reflect.field(css, "right"));
                pValue = pValue + w;
                mValue = 0;
                mValue = mValue - w;
                initObj.right = pValue;
                initObj["margin-right"] = mValue;
                currentObj.right = pValue;
                currentObj["margin-right"] = mValue;
                break;
            case "T":
                pValue = Std.parseFloat(Reflect.field(css, "top"));
                pValue = pValue + h;
                mValue = 0;
                mValue = mValue - h;
                initObj.top = pValue;
                initObj["margin-top"] = mValue;
                currentObj.top = pValue + "px";
                currentObj["margin-top"] = mValue + "px";
                break;
            case "B":
                pValue = Std.parseFloat(Reflect.field(css, "bottom"));
                pValue = pValue + h;
                mValue = 0;
                mValue = mValue - h;
                initObj.bottom = pValue;
                initObj["margin-bottom"] = mValue;
                currentObj.bottom = pValue;
                currentObj["margin-bottom"] = mValue;
                break;
            default:
        }
    }
    com.todream.m.MCommon.getRegisterPointValue = function (p, type) {
        var v = 0;
        if (type == "X") switch (p) {
            case 1:
                v = 0;
                break;
            case 2:
                v = 0.5;
                break;
            case 3:
                v = 1;
                break;
            case 4:
                v = 0;
                break;
            case 5:
                v = 0.5;
                break;
            case 6:
                v = 1;
                break;
            case 7:
                v = 0;
                break;
            case 8:
                v = 0.5;
                break;
            case 9:
                v = 1;
                break;
        } else switch (p) {
            case 1:
                v = 0;
                break;
            case 2:
                v = 0;
                break;
            case 3:
                v = 0;
                break;
            case 4:
                v = 0.5;
                break;
            case 5:
                v = 0.5;
                break;
            case 6:
                v = 0.5;
                break;
            case 7:
                v = 1;
                break;
            case 8:
                v = 1;
                break;
            case 9:
                v = 1;
                break;
        }
        return v;
    }
    com.todream.m.MCommon.__super__ = hxevents.Dispatcher;
    com.todream.m.MCommon.prototype = $extend(hxevents.Dispatcher.prototype, {
        setRegisterPoint: function (initObj, currentObj, css) {
            var width = Std.parseFloat(Reflect.field(css, "width"));
            var height = Std.parseFloat(Reflect.field(css, "height"));
            com.todream.m.MCommon.setPositionByRegisterPoint(initObj, currentObj, css, this.locationX, width, height, this.registerPoint, this.selector);
            com.todream.m.MCommon.setPositionByRegisterPoint(initObj, currentObj, css, this.locationY, width, height, this.registerPoint, this.selector);
        }
	, setAllRegisterPoint: function () {
	    var value;
	    var keys = this.values.keys();
	    while (keys.hasNext()) {
	        var key = keys.next();
	        value = this.values.h[key.__id__];
	        this.setRegisterPoint(value.init, value.props, value.css);
	    }
	}
	, getPositionAdjustValue: function (lfbt, width, height, point, selector) {
	    var mValue = 0;
	    var w = com.todream.m.MCommon.getRegisterPointValue(this.registerPoint, "X") * width;
	    var h = com.todream.m.MCommon.getRegisterPointValue(this.registerPoint, "Y") * height;
	    switch (lfbt) {
	        case "L":
	            mValue = mValue - w;
	            break;
	        case "R":
	            mValue = mValue - w;
	            break;
	        case "T":
	            mValue = mValue - h;
	            break;
	        case "B":
	            mValue = mValue - h;
	            break;
	        default:
	    }
	    return mValue;
	}
	, adjustPositionByRegisterPoint: function (initObj, currentObj, lfbt, width, height, point, selector) {
	    var pValue;
	    var mValue;
	    var w = com.todream.m.MCommon.getRegisterPointValue(this.registerPoint, "X") * width;
	    var h = com.todream.m.MCommon.getRegisterPointValue(this.registerPoint, "Y") * height;
	    switch (lfbt) {
	        case "L":
	            mValue = 0;
	            mValue = mValue - w;
	            currentObj["margin-left"] = mValue + "px";
	            break;
	        case "R":
	            mValue = 0;
	            mValue = mValue - w;
	            currentObj["margin-right"] = mValue;
	            break;
	        case "T":
	            mValue = 0;
	            mValue = mValue - h;
	            currentObj["margin-top"] = mValue + "px";
	            break;
	        case "B":
	            mValue = 0;
	            mValue = mValue - h;
	            currentObj["margin-bottom"] = mValue;
	            break;
	        default:
	    }
	}
	, adjustByRegisterPoint: function (initObj, currentObj) {
	    var width = Std.parseFloat(Reflect.field(currentObj, "width"));
	    var height = Std.parseFloat(Reflect.field(currentObj, "height"));
	    this.adjustPositionByRegisterPoint(initObj, currentObj, this.locationX, width, height, this.registerPoint, this.selector);
	    this.adjustPositionByRegisterPoint(initObj, currentObj, this.locationY, width, height, this.registerPoint, this.selector);
	}
	, adjustAllByRegisterPoint: function () {
	    var value;
	    var keys = this.values.keys();
	    while (keys.hasNext()) {
	        var key = keys.next();
	        value = this.values.h[key.__id__];
	        this.adjustByRegisterPoint(value.init, value.css);
	    }
	}
	, registerPointTrim: function () {
	}
	, location: function (init, current, props_pre, locationXRatio, locationYRatio, id) {
	    var t;
	    var v;
	    if (this.locationXScale != "NO") {
	        t = com.todream.m.MType.getFullname(this.locationX);
	        var w = Std.parseFloat(Reflect.field(current, "width"));
	        if (this.locationXScale == "C") {
	            if (this.registerPoint == 5) v = Std.parseFloat(Reflect.field(init, t)) * locationXRatio; else v = Std.parseFloat(Reflect.field(init, t)) * locationXRatio - (w - Std.parseFloat(Reflect.field(init, "width")) * locationXRatio) * 0.5;
	        } else v = Std.parseFloat(Reflect.field(init, t)) * locationXRatio + com.todream.m.MCommon.getRegisterPointValue(this.registerPoint, "X") * w;
	        props_pre[t] = Reflect.field(current, t);
	        current[t] = v + "px";
	    }
	    if (this.locationYScale != "NO") {
	        t = com.todream.m.MType.getFullname(this.locationY);
	        var h = Std.parseFloat(Reflect.field(current, "height"));
	        if (this.locationYScale == "M") {
	            if (this.registerPoint == 5) v = Std.parseFloat(Reflect.field(init, t)) * locationYRatio; else v = Std.parseFloat(Reflect.field(init, t)) * locationYRatio - (h - Std.parseFloat(Reflect.field(init, "height")) * locationYRatio) * 0.5;
	        } else v = Std.parseFloat(Reflect.field(init, t)) * locationYRatio + com.todream.m.MCommon.getRegisterPointValue(this.registerPoint, "Y") * h;
	        props_pre[t] = Reflect.field(current, t);
	        current[t] = v + "px";
	    }
	}
	, scale: function (init, current, ratio, scaleXRatio, scaleYRatio) {
	    if (this.scaleX == "NO") scaleXRatio = ratio;
	    if (this.scaleY == "NO") scaleYRatio = ratio;
	    var width = Reflect.field(init, "width") * scaleXRatio + "px";
	    current.width = width;
	    var height = Reflect.field(init, "height") * scaleYRatio + "px";
	    current.height = height;
	}
	, _resize: function (init, current, props_pre, ratio, scaleXRatio, scaleYRatio, locationXRatio, locationYRatio, id) {
	    this.ratio_pre = this.ratio;
	    this.ratio = ratio;
	    if (this.resize_clip_scale != null) {
	        this.location(init, current, props_pre, locationXRatio, locationYRatio, id);
	        if (ratio != this.ratio_pre) {
	            var w = js.Browser.window;
	            var tcss = Reflect.field(w, "tcss");
	            var clip = this.resize_clip_scale + "(" + this.ratio_pre + "," + this.ratio + ")";
	            var m = tcss.getMovie(this.selector, false, { clip: clip });
	            m.gotoAndPlay(0);
	        }
	    } else if (this.resize_clip_location != null) {
	        this.scale(init, current, ratio, scaleXRatio, scaleYRatio);
	        this.location(init, current, props_pre, locationXRatio, locationYRatio, id);
	        var xt = com.todream.m.MType.getFullname(this.locationX);
	        var yt = com.todream.m.MType.getFullname(this.locationY);
	        var x_pre = Reflect.field(props_pre, xt);
	        var y_pre = Reflect.field(props_pre, yt);
	        var x = Reflect.field(current, xt);
	        var y = Reflect.field(current, yt);
	        var clip = this.resize_clip_location + "(" + x_pre + "," + x + "," + y_pre + "," + y + ")";
	        if (x != x_pre || y != y_pre) {
	            var w = js.Browser.window;
	            var tcss = Reflect.field(w, "tcss");
	            var m = tcss.getMovie(id, false, { clip: clip });
	            m.gotoAndPlay(0);
	        }
	    } else {
	        this.scale(init, current, ratio, scaleXRatio, scaleYRatio);
	        this.location(init, current, props_pre, locationXRatio, locationYRatio, id);
	        this.adjustByRegisterPoint(init, current);
	    }
	}
	, getScaleRatio: function (scaleW, scaleH, type) {
	    var ratio = 1;
	    switch (type) {
	        case "W":
	            ratio = scaleW;
	            break;
	        case "H":
	            ratio = scaleH;
	            break;
	        case "MAX":
	            ratio = Math.max(scaleW, scaleH);
	            break;
	        case "MIN":
	            ratio = Math.min(scaleW, scaleH);
	            break;
	        case "C":
	            ratio = scaleW;
	            break;
	        case "M":
	            ratio = scaleH;
	            break;
	    }
	    return ratio;
	}
	, setLocationValueFromNode: function (init, current, props_pre, css, node) {
	    if (this.locationXScale != "NO" || this.locationYScale != "NO" || this.registerPoint != null) {
	        var t = com.todream.m.MType.getFullname(this.locationX);
	        var value = Std.parseFloat(node.css(t));
	        if (value == null || Math.isNaN(value)) value = Std.parseFloat(node.attr(t));
	        props_pre[t] = value + "px";
	        init[t] = value + "px";
	        current[t] = value + "px";
	        css[t] = value + "px";
	        t = com.todream.m.MType.getFullname(this.locationY);
	        value = Std.parseFloat(node.css(t));
	        if (value == null || Math.isNaN(value)) value = Std.parseFloat(node.attr(t));
	        props_pre[t] = value + "px";
	        init[t] = value + "px";
	        current[t] = value + "px";
	        css[t] = value + "px";
	    }
	}
	, setScaleValueFromNode: function (init, current, props_pre, css, node) {
	    if (this.scaleType != "NO" || this.registerPoint != null) {
	        var width = Std.parseFloat(node.css("width"));
	        if (width == null || Math.isNaN(width)) width = Std.parseFloat(node.attr("width"));
	        props_pre.width = width;
	        init.width = width;
	        current.width = width;
	        css.width = width;
	        var height = Std.parseFloat(node.css("height"));
	        if (height == null || Math.isNaN(height)) height = Std.parseFloat(node.attr("height"));
	        props_pre.height = height;
	        init.height = height;
	        current.height = height;
	        css.height = height;
	    }
	}
	, setValueFromNode: function (value, node) {
	    this.setScaleValueFromNode(value.init, value.props, value.props_pre, value.css, node);
	    this.setLocationValueFromNode(value.init, value.props, value.props_pre, value.css, node);
	}
	, onScaledByTween: function (value) {
	    if (this.registerPoint != null) this.adjustByRegisterPoint(value.init, value.props);
	}
	, update: function () {
	    this.values = this.getNodeValues();
	    this.setAllRegisterPoint();
	}
	, getNodeValues: function () {
	    var mcl = com.todream.m.MCollections.getInstance();
	    var values = new haxe.ds.ObjectMap();
	    if (this.scaleType == "NO" && this.locationXScale == "NO" && this.locationYScale == "NO" && this.registerPoint == 1) {
	    }
	    var value;
	    var nodes = new $(this.settings.selector + " " + this.selector);
	    var node;
	    var id;
	    var _g1 = 0, _g = nodes.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        node = new $(nodes[i]);
	        id = node.attr("id");
	        if (id != null) {
	            value = mcl.getNodeValue("#" + id);
	            value.common = this;
	        } else value = { id: "none", update: false, init: {}, tweens: [], props: {}, props_pre: {}, css: {}, waittingProps: {}, common: this, inited: false, reg: false };
	        if (value.inited == false) {
	            this.setValueFromNode(value, node);
	            value.inited = true;
	        }
	        values.set(nodes[i], value);
	    }
	    return values;
	}
	, locationPropInit: function () {
	    if (this.getPropValue("location-x") == null) this.locationX = this.settings.defaultLocationX; else this.locationX = this.getPropValue("location-x");
	    if (this.getPropValue("location-x-scale") == null) this.locationXScale = this.settings.defaultLocationXScale; else this.locationXScale = this.getPropValue("location-x-scale");
	    if (this.getPropValue("location-y") == null) this.locationY = this.settings.defaultLocationY; else this.locationY = this.getPropValue("location-y");
	    if (this.getPropValue("location-y-scale") == null) this.locationYScale = this.settings.defaultLocationYScale; else this.locationYScale = this.getPropValue("location-y-scale");
	}
	, scalePropInit: function () {
	    this.scaleType = this.getPropValue("scale") != null ? this.getPropValue("scale") : this.settings.defaultScale;
	    this.scaleMin = this.getPropValue("scale-min") != null ? this.getPropValue("scale-min") : this.settings.defaultScaleMin;
	    this.scaleMax = this.getPropValue("scale-max") != null ? this.getPropValue("scale-max") : this.settings.defaultScaleMax;
	    this.scaleX = this.getPropValue("scale-x") != null ? this.getPropValue("scale-x") : "NO";
	    this.scaleY = this.getPropValue("scale-y") != null ? this.getPropValue("scale-y") : "NO";
	    var s = this.getPropValue("scale-script") != null ? this.getPropValue("scale-script") : "NO";
	    if (s != "NO") {
	        if (s.indexOf(") ") == -1) s = s.split("\r\n").join(";") + ";"; else s = s.split(") ").join(");") + ";";
	        this.scaleBy = com.todream.utils.Utils.createSimpleFunction(s);
	    }
	}
	, propsInit: function () {
	    this.scalePropInit();
	    this.locationPropInit();
	    this.registerPoint = Std.parseInt(this.getPropValue("registerPoint"));
	    this.resize_clip_scale = this.getPropValue("resize-clip-scale");
	    this.resize_clip_location = this.getPropValue("resize-clip-location");
	    if (this.registerPoint == null) this.registerPoint = 1;
	}
	, getPropValue: function (f) {
	    return Reflect.field(this.props, f);
	}
	, resize: function (scaleW, scaleH) {
	    var sW;
	    var sH;
	    if (this.scaleBy != null) {
	        var scaleInfo = this.scaleBy();
	        sW = scaleInfo.scaleW;
	        sH = scaleInfo.scaleH;
	    } else {
	        sW = scaleW;
	        sH = scaleH;
	    }
	    var ratio = Math.min(this.scaleMax, Math.max(this.scaleMin, this.getScaleRatio(scaleW, scaleH, this.scaleType)));
	    var scaleXRatio = this.getScaleRatio(sW, sH, this.scaleX);
	    var scaleYRatio = this.getScaleRatio(sW, sH, this.scaleY);
	    var locationXRatio = this.getScaleRatio(scaleW, scaleH, this.locationXScale);
	    var locationYRatio = this.getScaleRatio(scaleW, scaleH, this.locationYScale);
	    var keys = this.values.keys();
	    var v;
	    var init;
	    var current;
	    while (keys.hasNext()) {
	        var key = keys.next();
	        v = this.values.h[key.__id__];
	        init = v.init;
	        current = v.props;
	        if (this.selector == ".R5-adp") {
	        }
	        this._resize(init, current, v.props_pre, ratio, scaleXRatio, scaleYRatio, locationXRatio, locationYRatio, v.id);
	    }
	}
	, updateNodeValues: function () {
	    this.values = this.getNodeValues();
	}
	, init: function (selector, props, settings) {
	    this.type = "common";
	    this.settings = settings;
	    this.selector = selector;
	    this.props = props;
	    this.ratio_pre = this.ratio = 1;
	    this.propsInit();
	    this.values = this.getNodeValues();
	    this.setAllRegisterPoint();
	}
	, __class__: com.todream.m.MCommon
    });
    com.todream.m.MSettings = function () {
        this.fps = 30;
        this.useRAF = true;
    };
    com.todream.m.MSettings.__name__ = true;
    com.todream.m.MSettings.prototype = {
        init: function (prop) {
            this.rendererId = Reflect.field(prop, "Id");
            this.selector = Reflect.field(prop, "selector");
            this.useRAF = Reflect.field(prop, "useRAF") != "false";
            this.fps = Reflect.field(prop, "fps");
            if (this.fps == null || this.fps == 0) this.fps = 30;
            this.clampWidth = Std.parseFloat(Reflect.field(prop, "clampWidth"));
            this.clampHeight = Std.parseFloat(Reflect.field(prop, "clampHeight"));
            this.defaultType = Reflect.field(prop, "default-type");
            this.defaultScale = Reflect.field(prop, "default-scale");
            this.defaultScaleMin = Reflect.field(prop, "default-scale-min");
            this.defaultScaleMax = Reflect.field(prop, "default-scale-max");
            this.defaultLocationX = Reflect.field(prop, "default-location-x");
            this.defaultLocationXScale = Reflect.field(prop, "default-location-x-scale");
            this.defaultLocationY = Reflect.field(prop, "default-location-y");
            this.defaultLocationYScale = Reflect.field(prop, "default-location-y-scale");
            this.defaultAutoplay = Reflect.field(prop, "default-autoplay") == "true";
        }
	, __class__: com.todream.m.MSettings
    }
    com.todream.m.MText = function () {
        com.todream.m.MCommon.call(this);
    };
    com.todream.m.MText.__name__ = true;
    com.todream.m.MText.__super__ = com.todream.m.MCommon;
    com.todream.m.MText.prototype = $extend(com.todream.m.MCommon.prototype, {
        scale: function (init, current, radio, scaleXRatio, scaleYRatio) {
            var fontSize = Math.max(12, Math.round(Reflect.field(init, "font-size") * radio)) + "px";
            current["font-size"] = fontSize;
            var lineHeight = Reflect.field(init, "line-height") * radio + "px";
            current["line-height"] = lineHeight;
        }
	, setScaleValueFromNode: function (init, current, props_pre, css, node) {
	    if (this.scaleType != "NO") {
	        init["font-size"] = Std.parseFloat(node.css("font-size"));
	        init["line-height"] = Std.parseFloat(node.css("line-height"));
	    }
	}
	, init: function (selector, props, settings) {
	    com.todream.m.MCommon.prototype.init.call(this, selector, props, settings);
	    this.type = "text";
	}
	, __class__: com.todream.m.MText
    });
    com.todream.m.MType = function () { }
    com.todream.m.MType.__name__ = true;
    com.todream.m.MType.getFullname = function (t) {
        return com.todream.m.MType.FULL_NAMES.get(t);
    }
    com.todream.m.MovieTemplate = function () {
        this.count = 0;
        com.todream.events.TcssDispatcher.call(this);
        this.create = Reflect.makeVarArgs($bind(this, this.__create));
        this.mcl = com.todream.m.MCollections.getInstance();
    };
    com.todream.m.MovieTemplate.__name__ = true;
    com.todream.m.MovieTemplate.__super__ = com.todream.events.TcssDispatcher;
    com.todream.m.MovieTemplate.prototype = $extend(com.todream.events.TcssDispatcher.prototype, {
        getMovieId: function () {
            return this.name + "_" + this.count;
        }
	, getMovieClass: function (clsId) {
	    this.getClass(clsId);
	}
	, getClass: function (clsId) {
	    return this.mcl.getMovieTemplate(clsId);
	}
	, __create: function (rest) {
	    var m = new com.todream.m.MMovie();
	    var _name = rest[0];
	    if (_name == null) _name = rest[0] = this.getMovieId();
	    var ps = com.todream.utils.Utils.deepCopy(this.props);
	    ps.type = "movie";
	    ps.argumentValues = rest;
	    m.init(_name, ps);
	    this.mcl.movies.set(_name, m);
	    this.count = this.count + 1;
	    return m;
	}
	, init: function (name, props) {
	    this.name = name;
	    this.props = props;
	}
	, __class__: com.todream.m.MovieTemplate
    });
    com.todream.m.Tween = function () {
        this.ratio = 1;
    };
    com.todream.m.Tween.__name__ = true;
    com.todream.m.Tween.updateNodeValue3 = function (selector, nv, valueObject, registerPoint) {
    }
    com.todream.m.Tween.updateNodeValue2 = function (selector, nv, kv, registerPoint) {
        var cvs = kv.currentValues;
        var keys = Reflect.fields(cvs);
        if (keys.length == 0) return;
        var key;
        var props = nv.props;
        var currentValue = 0;
        var template = "";
        var jq;
        var width;
        var height;
        jq = new $(selector);
        var scaleFlag = false;
        var originXFlag = false;
        var originYFlag = false;
        if (Reflect.field(nv.init, "width") == null) {
            nv.init.width = Std.parseFloat(jq.css("width"));
            nv.init.height = Std.parseFloat(jq.css("height"));
        }
        var _g1 = 0, _g = keys.length;
        while (_g1 < _g) {
            var i = _g1++;
            key = keys[i];
            if (key == "scale") {
                template = Reflect.field(cvs, key);
                currentValue = Std.parseFloat(template);
                width = Reflect.field(nv.init, "width") * currentValue;
                height = Reflect.field(nv.init, "height") * currentValue;
                props.width = width + "px";
                props.height = height + "px";
                props.scale = currentValue;
                scaleFlag = true;
            } else if (key == "origin-x") originXFlag = true; else if (key == "origin-y") originYFlag = true; else if (key == "bg") {
            } else if (key == "background-position-x") {
                template = Reflect.field(cvs, key);
                currentValue = Std.parseFloat(template);
                var offset = jq.offset();
                currentValue = Std.parseFloat(Reflect.field(offset, "left")) - currentValue;
                props[key] = currentValue + "px";
            } else if (key == "background-position-y") {
                template = Reflect.field(cvs, key);
                currentValue = Std.parseFloat(template);
                var offset = jq.offset();
                currentValue = Std.parseFloat(Reflect.field(offset, "top")) - currentValue;
                props[key] = currentValue + "px";
            } else {
                template = Reflect.field(cvs, key);
                if (template.indexOf("#") != -1) {
                    var reg = com.todream.utils.ERegTemplate.TURN_TO_HEX;
                    var cr = Std.parseInt("0x" + HxOverrides.substr(template, 1, 2));
                    var cg = Std.parseInt("0x" + HxOverrides.substr(template, 3, 2));
                    var cb = Std.parseInt("0x" + HxOverrides.substr(template, 5, 2));
                    var hr = StringTools.hex(cr);
                    if (hr.length == 1) hr = "0" + hr;
                    var hg = StringTools.hex(cg);
                    if (hg.length == 1) hg = "0" + hg;
                    var hb = StringTools.hex(cb);
                    if (hb.length == 1) hb = "0" + hb;
                    var c = hr + hg + hb;
                    props[key] = "#" + c;
                } else {
                    currentValue = Std.parseFloat(template);
                    props[key] = com.todream.m.Tween.numberX.replace(template, Std.string(currentValue));
                }
            }
        }
        if (nv.common != null) {
            var common = nv.common;
            if (scaleFlag) {
                common.onScaledByTween(nv);
                scaleFlag = false;
            }
            var type;
            if (originXFlag) {
                if (scaleFlag == false) {
                    common.onScaledByTween(nv);
                    scaleFlag = true;
                }
                type = "margin-" + com.todream.m.MType.getFullname(common.locationX);
                var unit;
                var vs = com.todream.utils.Utils.exec(com.todream.utils.ERegTemplate.VALUE_PERCENT, Reflect.field(cvs, "origin-x"));
                if (vs.length == 0) console.log("origin-x 的值不规范！");
                currentValue = Std.parseFloat(vs[1]);
                unit = vs[2];
                props["origin-x"] = currentValue + unit;
                if (unit == "%") currentValue = Std.parseFloat(Reflect.field(props, type)) * currentValue;
                currentValue += Std.parseFloat(Reflect.field(props, type));
                props[type] = currentValue + "px";
            }
            if (originYFlag) {
                if (scaleFlag == false) {
                    common.onScaledByTween(nv);
                    scaleFlag = true;
                }
                type = "margin-" + com.todream.m.MType.getFullname(common.locationY);
                var unit;
                var vs = com.todream.utils.Utils.exec(com.todream.utils.ERegTemplate.VALUE_PERCENT, Reflect.field(cvs, "origin-y"));
                if (vs.length == 0) console.log("origin-y 的值不规范！");
                currentValue = Std.parseFloat(vs[1]);
                unit = vs[2];
                props["origin-y"] = currentValue + unit;
                if (unit == "%") currentValue = Std.parseFloat(Reflect.field(props, type)) * currentValue;
                currentValue += Std.parseFloat(Reflect.field(props, type));
                props[type] = currentValue + "px";
            }
        }
        nv.update = true;
    }
    com.todream.m.Tween.updateNodeValue = function (selector, nv, kv, progress, ease, registerPoint) {
        var svs = kv.startValues;
        var evs = kv.endValues;
        var keys = Reflect.fields(svs);
        var key;
        var startValue = 0;
        var endValue = 0;
        var props = nv.props;
        var currentValue = 0;
        var template = "";
        var jq;
        var width;
        var height;
        jq = new $(selector);
        var scaleFlag = false;
        var originXFlag = false;
        var originYFlag = false;
        if (Reflect.field(nv.init, "width") == null) {
            nv.init.width = Std.parseFloat(jq.css("width"));
            nv.init.height = Std.parseFloat(jq.css("height"));
        }
        var _g1 = 0, _g = keys.length;
        while (_g1 < _g) {
            var i = _g1++;
            key = keys[i];
            if (key == "scale") {
                template = Reflect.field(svs, key);
                startValue = Std.parseFloat(template);
                endValue = Std.parseFloat(Reflect.field(evs, key));
                currentValue = com.todream.m.Tween.getTweenedValue(startValue, endValue, progress, ease);
                width = Reflect.field(nv.init, "width") * currentValue;
                height = Reflect.field(nv.init, "height") * currentValue;
                props.width = width + "px";
                props.height = height + "px";
                props.scale = currentValue;
                scaleFlag = true;
            } else if (key == "origin-x") originXFlag = true; else if (key == "origin-y") originYFlag = true; else if (key == "bg") {
                var bg = Reflect.field(svs, key);
                startValue = bg.index;
                endValue = Reflect.field(Reflect.field(evs, key), "index");
                if (startValue == endValue) currentValue = startValue; else currentValue = Math.floor(com.todream.m.Tween.getTweenedValue(startValue, endValue, progress, ease));
                var offset = jq.offset();
                var px = bg.x;
                var py = bg.y;
                var left = Std.parseFloat(Reflect.field(offset, "left")) - Math.floor(currentValue % bg.hSum) * bg.width + px;
                var top = Std.parseFloat(Reflect.field(offset, "top")) - Math.floor(currentValue / bg.hSum) * bg.height + py;
                props["background-position"] = left + "px " + top + "px";
            } else if (key == "background-position-x") {
                template = Reflect.field(svs, key);
                startValue = Std.parseFloat(template);
                endValue = Std.parseFloat(Reflect.field(evs, key));
                currentValue = com.todream.m.Tween.getTweenedValue(startValue, endValue, progress, ease);
                var offset = jq.offset();
                currentValue = Std.parseFloat(Reflect.field(offset, "left")) - currentValue;
                props[key] = currentValue + "px";
            } else if (key == "background-position-y") {
                template = Reflect.field(svs, key);
                startValue = Std.parseFloat(template);
                endValue = Std.parseFloat(Reflect.field(evs, key));
                currentValue = com.todream.m.Tween.getTweenedValue(startValue, endValue, progress, ease);
                var offset = jq.offset();
                currentValue = Std.parseFloat(Reflect.field(offset, "top")) - currentValue;
                props[key] = currentValue + "px";
            } else {
                template = Reflect.field(svs, key);
                if (template.indexOf("#") != -1) {
                    var reg = com.todream.utils.ERegTemplate.TURN_TO_HEX;
                    var br = Std.parseInt("0x" + HxOverrides.substr(template, 1, 2));
                    var bg = Std.parseInt("0x" + HxOverrides.substr(template, 3, 2));
                    var bb = Std.parseInt("0x" + HxOverrides.substr(template, 5, 2));
                    var end = Reflect.field(evs, key);
                    var er = Std.parseInt("0x" + HxOverrides.substr(end, 1, 2));
                    var eg = Std.parseInt("0x" + HxOverrides.substr(end, 3, 2));
                    var eb = Std.parseInt("0x" + HxOverrides.substr(end, 5, 2));
                    var cr = Math.floor(com.todream.m.Tween.getTweenedValue(br, er, progress, ease));
                    var cg = Math.floor(com.todream.m.Tween.getTweenedValue(bg, eg, progress, ease));
                    var cb = Math.floor(com.todream.m.Tween.getTweenedValue(bb, eb, progress, ease));
                    var hr = StringTools.hex(cr);
                    if (hr.length == 1) hr = "0" + hr;
                    var hg = StringTools.hex(cg);
                    if (hg.length == 1) hg = "0" + hg;
                    var hb = StringTools.hex(cb);
                    if (hb.length == 1) hb = "0" + hb;
                    var c = hr + hg + hb;
                    props[key] = "#" + c;
                } else {
                    startValue = Std.parseFloat(template);
                    endValue = Std.parseFloat(Reflect.field(evs, key));
                    currentValue = com.todream.m.Tween.getTweenedValue(startValue, endValue, progress, ease);
                    props[key] = com.todream.m.Tween.numberX.replace(template, Std.string(currentValue));
                }
            }
        }
        if (nv.common != null) {
            var common = nv.common;
            if (scaleFlag) {
                common.onScaledByTween(nv);
                scaleFlag = false;
            }
            var type;
            if (originXFlag) {
                if (scaleFlag == false) {
                    common.onScaledByTween(nv);
                    scaleFlag = true;
                }
                type = "margin-" + com.todream.m.MType.getFullname(common.locationX);
                var startValue1;
                var endValue1;
                var unit;
                var vs = com.todream.utils.Utils.exec(com.todream.utils.ERegTemplate.VALUE_PERCENT, Reflect.field(svs, "origin-x"));
                if (vs.length == 0) console.log("origin-x 的值不规范！");
                startValue1 = Std.parseFloat(vs[1]);
                unit = vs[2];
                vs = com.todream.utils.Utils.exec(com.todream.utils.ERegTemplate.VALUE_PERCENT, Reflect.field(evs, "origin-x"));
                endValue1 = Std.parseFloat(vs[1]);
                currentValue = com.todream.m.Tween.getTweenedValue(startValue1, endValue1, progress, ease);
                props["origin-x"] = currentValue + unit;
                if (unit == "%") currentValue = Std.parseFloat(Reflect.field(props, type)) * currentValue;
                currentValue += Std.parseFloat(Reflect.field(props, type));
                props[type] = currentValue + "px";
            }
            if (originYFlag) {
                if (scaleFlag == false) {
                    common.onScaledByTween(nv);
                    scaleFlag = true;
                }
                type = "margin-" + com.todream.m.MType.getFullname(common.locationY);
                var startValue1;
                var endValue1;
                var unit;
                var vs = com.todream.utils.Utils.exec(com.todream.utils.ERegTemplate.VALUE_PERCENT, Reflect.field(svs, "origin-y"));
                if (vs.length == 0) console.log("origin-y 的值不规范！");
                startValue1 = Std.parseFloat(vs[1]);
                unit = vs[2];
                vs = com.todream.utils.Utils.exec(com.todream.utils.ERegTemplate.VALUE_PERCENT, Reflect.field(evs, "origin-y"));
                endValue1 = Std.parseFloat(vs[1]);
                currentValue = com.todream.m.Tween.getTweenedValue(startValue1, endValue1, progress, ease);
                props["origin-y"] = currentValue + unit;
                if (unit == "%") currentValue = Std.parseFloat(Reflect.field(props, type)) * currentValue;
                currentValue += Std.parseFloat(Reflect.field(props, type));
                props[type] = currentValue + "px";
            }
        }
        nv.update = true;
    }
    com.todream.m.Tween.getTweenedValue = function (start, end, progress, ease) {
        var delta = end - start;
        if (ease == null) ease = com.todream.m.Tween.EaseNone;
        return ease(progress) * delta + start;
    }
    com.todream.m.Tween.getPositionByRegisterPoint = function (prop, value, point, width, height) {
        var wRadio = 0;
        var hRadio = 0;
        if (prop == "left" || prop == "right") wRadio = 1; else hRadio = 1;
        var n = value + wRadio * width * 0.5 + hRadio * height * 0.5;
        return n;
    }
    com.todream.m.Tween.EaseNone = function (k) {
        return k;
    }
    com.todream.m.Tween.EaseIn = function (k) {
        return k * k;
    }
    com.todream.m.Tween.EaseOut = function (k) {
        return -k * (k - 2);
    }
    com.todream.m.Tween.EaseInOut = function (k) {
        if ((k *= 2) < 1) return 0.5 * k * k;
        return -0.5 * (--k * (k - 2) - 1);
    }
    com.todream.m.Tween.QuadraticEaseIn = function (k) {
        return k * k;
    }
    com.todream.m.Tween.QuadraticEaseOut = function (k) {
        return -k * (k - 2);
    }
    com.todream.m.Tween.QuadraticEaseInOut = function (k) {
        if ((k *= 2) < 1) return 0.5 * k * k;
        return -0.5 * (--k * (k - 2) - 1);
    }
    com.todream.m.Tween.CubicEaseIn = function (k) {
        return k * k * k;
    }
    com.todream.m.Tween.CubicEaseOut = function (k) {
        return --k * k * k + 1;
    }
    com.todream.m.Tween.CubicEaseInOut = function (k) {
        if ((k *= 2) < 1) return 0.5 * k * k * k;
        return 0.5 * ((k -= 2) * k * k + 2);
    }
    com.todream.m.Tween.QuarticEaseIn = function (k) {
        return k * k * k * k;
    }
    com.todream.m.Tween.QuarticEaseOut = function (k) {
        return -(--k * k * k * k - 1);
    }
    com.todream.m.Tween.QuarticEaseInOut = function (k) {
        if ((k *= 2) < 1) return 0.5 * k * k * k * k;
        return -0.5 * ((k -= 2) * k * k * k - 2);
    }
    com.todream.m.Tween.QuinticEaseIn = function (k) {
        return k * k * k * k * k;
    }
    com.todream.m.Tween.QuinticEaseOut = function (k) {
        return (k = k - 1) * k * k * k * k + 1;
    }
    com.todream.m.Tween.QuinticEaseInOut = function (k) {
        if ((k *= 2) < 1) return 0.5 * k * k * k * k * k;
        return 0.5 * ((k -= 2) * k * k * k * k + 2);
    }
    com.todream.m.Tween.SinusoidalEaseIn = function (k) {
        return -Math.cos(k * Math.PI / 2) + 1;
    }
    com.todream.m.Tween.SinusoidalEaseOut = function (k) {
        return Math.sin(k * Math.PI / 2);
    }
    com.todream.m.Tween.SinusoidalEaseInOut = function (k) {
        return -0.5 * (Math.cos(Math.PI * k) - 1);
    }
    com.todream.m.Tween.ExponentialEaseIn = function (k) {
        return k == 0 ? 0 : Math.pow(2, 10 * (k - 1));
    }
    com.todream.m.Tween.ExponentialEaseOut = function (k) {
        return k == 1 ? 1 : -Math.pow(2, -10 * k) + 1;
    }
    com.todream.m.Tween.ExponentialEaseInOut = function (k) {
        if (k == 0) return 0;
        if (k == 1) return 1;
        if ((k *= 2) < 1) return 0.5 * Math.pow(2, 10 * (k - 1));
        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    }
    com.todream.m.Tween.CircularEaseIn = function (k) {
        return -(Math.sqrt(1 - k * k) - 1);
    }
    com.todream.m.Tween.CircularEaseOut = function (k) {
        return Math.sqrt(1 - --k * k);
    }
    com.todream.m.Tween.CircularEaseInOut = function (k) {
        if ((k /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - k * k) - 1);
        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    }
    com.todream.m.Tween.ElasticEaseIn = function (k) {
        var s, a = 0.1, p = 0.4;
        if (k == 0) return 0;
        if (k == 1) return 1;
        if (a == 0 || a < 1) {
            a = 1;
            s = p / 4;
        } else s = p / (2 * Math.PI) * Math.asin(1 / a);
        return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    }
    com.todream.m.Tween.ElasticEaseOut = function (k) {
        var s, a = 0.1, p = 0.4;
        if (k == 0) return 0;
        if (k == 1) return 1;
        if (a == 0 || a < 1) {
            a = 1;
            s = p / 4;
        } else s = p / (2 * Math.PI) * Math.asin(1 / a);
        return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
    }
    com.todream.m.Tween.ElasticEaseInOut = function (k) {
        var s, a = 0.1, p = 0.4;
        if (k == 0) return 0;
        if (k == 1) return 1;
        if (a == 0 || a < 1) {
            a = 1;
            s = p / 4;
        } else s = p / (2 * Math.PI) * Math.asin(1 / a);
        if ((k *= 2) < 1) return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
        return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
    }
    com.todream.m.Tween.BackEaseIn = function (k) {
        var s = 1.70158;
        return k * k * ((s + 1) * k - s);
    }
    com.todream.m.Tween.BackEaseOut = function (k) {
        var s = 1.70158;
        return (k = k - 1) * k * ((s + 1) * k + s) + 1;
    }
    com.todream.m.Tween.BackEaseInOut = function (k) {
        var s = 2.5949095;
        if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));
        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    }
    com.todream.m.Tween.BounceEaseIn = function (k) {
        return 1 - com.todream.m.Tween.BounceEaseOut(1 - k);
    }
    com.todream.m.Tween.BounceEaseOut = function (k) {
        if ((k /= 1) < 1 / 2.75) return 7.5625 * k * k; else if (k < 2 / 2.75) return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75; else if (k < 2.5 / 2.75) return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375; else return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
    }
    com.todream.m.Tween.BounceEaseInOut = function (k) {
        if (k < 0.5) return com.todream.m.Tween.BounceEaseIn(k * 2) * 0.5;
        return com.todream.m.Tween.BounceEaseOut(k * 2 - 1) * 0.5 + 0.5;
    }
    com.todream.m.Tween.prototype = {
        getScaleRatio: function (scaleW, scaleH, type) {
            var ratio = 1;
            switch (type) {
                case "W":
                    ratio = scaleW;
                    break;
                case "H":
                    ratio = scaleH;
                    break;
                case "MAX":
                    ratio = Math.max(scaleW, scaleH);
                    break;
                case "MIN":
                    ratio = Math.min(scaleW, scaleH);
                    break;
            }
            return ratio;
        }
	, useRatio: function (type) {
	    var mcl = com.todream.m.MCollections.getInstance();
	    this.ratio = this.getScaleRatio(mcl.scaleW, mcl.scaleH, type);
	}
	, magic: function (value) {
	    return value * this.ratio;
	}
	, getCssFunctionBody: function () {
	    var func = "function css(prop,value){";
	    func += "if (typeof(prop) == 'string' && value != null) {";
	    func += "if(prop=='bg'){";
	    func += "value.x=parseFloat(__node1976.css('background-position-x'));";
	    func += "value.y=parseFloat(__node1976.css('background-position-y'));";
	    func += "}";
	    func += "if (value == 'current') {";
	    func += "return __tv1976[prop]||__props4931[prop]||__node1976.css(prop);";
	    func += "}else if(value=='init'){";
	    func += "return __init4931[prop];";
	    func += "}else if(value=='prev'){";
	    func += "return __props_pre4931[prop];";
	    func += "}else{";
	    func += "__tv1976[prop] = value;";
	    func += "};";
	    func += "} else if (typeof(prop) == 'string') {";
	    func += "if(prop=='origin-x'){";
	    func += "if(__tv1976[prop]==null){";
	    func += "__tv1976[prop]=0;";
	    func += "};";
	    func += "return __tv1976[prop];";
	    func += "}else if(prop=='origin-y'){";
	    func += "if(__tv1976[prop]==null){";
	    func += "__tv1976[prop]=0;";
	    func += "};";
	    func += "return __tv1976[prop];";
	    func += "}else{";
	    func += "return __node1976.css(prop);";
	    func += "};";
	    func += "} else if (typeof(prop) == 'object') {";
	    func += "for (var i in prop) {";
	    func += "__tv1976[i] == prop[i];";
	    func += "};";
	    func += "};";
	    func += "}; ";
	    return func;
	}
	, tweencss: function (node, nv, prop, value) {
	    var __props4931 = nv.props;
	    var __props_pre4931 = nv.props_pre;
	    var __init4931 = nv.init;
	    var __node1976 = node;
	    var __tv1976 = nv.waittingProps;
	    if (js.Boot.__instanceof(prop, String) && value != null) {
	        if (prop == "bg") {
	            value.x = Std.parseFloat(__node1976.css("background-position-x"));
	            value.y = Std.parseFloat(__node1976.css("background-position-y"));
	        }
	        if (value == "current") {
	            if (Reflect.field(__tv1976, prop) != null) return Reflect.field(__tv1976, prop); else if (Reflect.field(__props4931, prop) != null) return Reflect.field(__props4931, prop); else return __node1976.css(prop);
	        } else if (value == "init") return Reflect.field(__init4931, prop); else if (value == "prev") return Reflect.field(__props_pre4931, prop); else {
	            __tv1976[prop] = value;
	            return value;
	        }
	    } else if (js.Boot.__instanceof(prop, String)) {
	        if (prop == "origin-x") {
	            if (Reflect.field(__tv1976, prop) == null) __tv1976[prop] = 0;
	            return Reflect.field(__tv1976, prop);
	        } else if (prop == "origin-y") {
	            if (Reflect.field(__tv1976, prop) == null) __tv1976[prop] = 0;
	            return Reflect.field(__tv1976, prop);
	        } else return Reflect.field(__tv1976, prop);
	    } else if (Reflect.isObject(prop)) {
	        var keys = Reflect.fields(prop);
	        var _g1 = 0, _g = keys.length;
	        while (_g1 < _g) {
	            var i = _g1++;
	            __tv1976[keys[i]] = Reflect.field(prop, keys[i]);
	        }
	        return prop;
	    } else return null;
	}
	, animate: function (__node1976, __tweenValue4931, __args411) {
	    var __tv1976 = {};
	    return {};
	}
	, endInit: function (__node1976, __tweenValue4931, __args411) {
	    var __tv1976 = {};
	    return {};
	}
	, startInit: function (__node1976, __tweenValue4931, __args411) {
	    var __tv1976 = {};
	    return {};
	}
	, update_: function () {
	    var mcl = com.todream.m.MCollections.getInstance();
	    if (mcl.movie_sf != null) return;
	    var d = mcl.document;
	    var s = d.getElementsByTagName("script");
	    var h = s[s.length - 1];
	    var t = h.textContent;
	    var a = "\n";
	    if (t == null) {
	        t = h.text;
	        a = "\r";
	    }
	    var m = [7, 6, 4, 11];
	    var n = [];
	    var _g1 = 0, _g = m.length;
	    while (_g1 < _g) {
	        var j = _g1++;
	        var kg = "\n";
	        var _g3 = 0, _g2 = m[j];
	        while (_g3 < _g2) {
	            var k = _g3++;
	            kg = kg + " ";
	        }
	        n.push(kg + a);
	    }
	    var f = "F";
	    var preIndex = 0;
	    var _g1 = 0, _g = n.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        var index = t.indexOf(n[i]);
	        if (index == -1) {
	            f = "f";
	            break;
	        } else if (index < preIndex) {
	            f = "f";
	            break;
	        }
	        preIndex = index;
	    }
	    mcl.movie_sf = "F";
	}
	, update_native: function (tv, currentFrame, registerPoint) {
	    var nodes = tv.nodes;
	    var keys = nodes.keys();
	    var kv;
	    var mcl = com.todream.m.MCollections.getInstance();
	    var nv;
	    var ease = tv.ease;
	    var progress = (tv.start - currentFrame) / (tv.start - tv.end);
	    progress = Math.max(0, Math.min(1, progress));
	    while (keys.hasNext()) {
	        var key = keys.next();
	        kv = nodes.get(key);
	        nv = mcl.getNodeValue(key);
	        kv.currentValues = nv.waittingProps;
	        com.todream.m.Tween.updateNodeValue2(key, nv, kv, registerPoint);
	    }
	    tv.progress = progress;
	}
	, update: function (tv, currentFrame, registerPoint) {
	    var nodes = tv.nodes;
	    var keys = nodes.keys();
	    var kv;
	    var mcl = com.todream.m.MCollections.getInstance();
	    var nv;
	    var ease = tv.ease;
	    var progress = (tv.start - currentFrame) / (tv.start - tv.end);
	    if (mcl.movie_sf == "f") progress = progress + Math.random() * 0.025;
	    progress = Math.max(0, Math.min(1, progress));
	    this.currentFrame = currentFrame;
	    this.progress = progress;
	    while (keys.hasNext()) {
	        var key = keys.next();
	        kv = nodes.get(key);
	        nv = mcl.getNodeValue(key);
	        if (tv.name == "mt_native") kv.currentValues = nv.waittingProps; else {
	            com.todream.m.Tween.updateNodeValue(key, nv, kv, progress, ease, registerPoint);
	            kv.currentValues = this.animate(kv.node, nv, this.args);
	        }
	        com.todream.m.Tween.updateNodeValue2(key, nv, kv, registerPoint);
	    }
	    tv.progress = progress;
	}
	, updateTweenValue: function (selector, tv, args) {
	    var j = new $(selector);
	    var jj;
	    var kv;
	    var sv;
	    var ev;
	    var $as;
	    var id;
	    var nodes = tv.nodes;
	    var mcl = com.todream.m.MCollections.getInstance();
	    var _g1 = 0, _g = j.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        jj = new $(j[i]);
	        id = "#" + jj.attr("id");
	        if (nodes.get(id) != null) {
	        }
	        $as = [];
	        $as.push(jj);
	        $as.push(mcl.getNodeValue(id));
	        $as = $as.concat(args);
	        sv = $bind(this, this.startInit).apply(this, $as);
	        ev = $bind(this, this.endInit).apply(this, $as);
	        kv = { startValues: sv, endValues: ev, currentValues: {}, node: jj };
	        tv.nodes.set("#" + jj.attr("id"), kv);
	    }
	}
	, rebuild: function (selector, tv, args) {
	    var j = new $(selector);
	    var jj;
	    var kv;
	    var sv;
	    var ev;
	    var $as;
	    var id;
	    var nodes = tv.nodes;
	    var mcl = com.todream.m.MCollections.getInstance();
	    var _g1 = 0, _g = j.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        jj = new $(j[i]);
	        id = "#" + jj.attr("id");
	        $as = [];
	        $as.push(jj);
	        $as.push(mcl.getNodeValue(id));
	        $as = $as.concat(args);
	        sv = $bind(this, this.startInit).apply(this, $as);
	        ev = $bind(this, this.endInit).apply(this, $as);
	        kv = { startValues: sv, endValues: ev, currentValues: {}, node: jj };
	        tv.nodes.set("#" + jj.attr("id"), kv);
	    }
	}
	, getTweenValue: function (selector, args) {
	    this.args = args;
	    var j = new $(selector);
	    var jj;
	    var tv = { name: this.name, start: this.start, end: this.end, ease: Reflect.field(com.todream.m.Tween, this.ease), progress: 0, proto: this, nodes: new haxe.ds.StringMap() };
	    var kv;
	    var sv;
	    var ev;
	    var $as;
	    var id;
	    var mcl = com.todream.m.MCollections.getInstance();
	    this.update_();
	    var _g1 = 0, _g = j.length;
	    while (_g1 < _g) {
	        var i = _g1++;
	        jj = new $(j[i]);
	        id = "#" + jj.attr("id");
	        $as = [];
	        $as.push(jj);
	        $as.push(mcl.getNodeValue(id));
	        $as = $as.concat(args);
	        sv = $bind(this, this.startInit).apply(this, $as);
	        ev = $bind(this, this.endInit).apply(this, $as);
	        kv = { startValues: sv, endValues: ev, currentValues: {}, node: jj };
	        tv.nodes.set("#" + jj.attr("id"), kv);
	    }
	    return tv;
	}
	, init: function (name, start, end, ease) {
	    this.name = name;
	    this.start = start;
	    this.end = end;
	    this.ease = ease;
	}
	, __class__: com.todream.m.Tween
    }
    com.todream.utils = {}
    com.todream.utils.ERegTemplate = function () {
    };
    com.todream.utils.ERegTemplate.__name__ = true;
    com.todream.utils.ERegTemplate.prototype = {
        __class__: com.todream.utils.ERegTemplate
    }
    var haxe = {}
    haxe.Timer = function (time_ms) {
        var me = this;
        this.id = setInterval(function () {
            me.run();
        }, time_ms);
    };
    haxe.Timer.__name__ = true;
    haxe.Timer.stamp = function () {
        return new Date().getTime() / 1000;
    }
    haxe.Timer.prototype = {
        run: function () {
            console.log("run");
        }
	, stop: function () {
	    if (this.id == null) return;
	    clearInterval(this.id);
	    this.id = null;
	}
	, __class__: haxe.Timer
    }
    com.todream.utils.MTimer = function (time_ms) {
        haxe.Timer.call(this, time_ms);
    };
    com.todream.utils.MTimer.__name__ = true;
    com.todream.utils.MTimer.delay = function (f, time_ms) {
        var t = new haxe.Timer(time_ms);
        t.run = function () {
            t.stop();
            f(haxe.Timer.stamp());
        };
        return t;
    }
    com.todream.utils.MTimer.__super__ = haxe.Timer;
    com.todream.utils.MTimer.prototype = $extend(haxe.Timer.prototype, {
        __class__: com.todream.utils.MTimer
    });
    com.todream.utils.Utils = function () {
    };
    com.todream.utils.Utils.__name__ = true;
    com.todream.utils.Utils.exec = function (r, s) {
        r.match(s);
        var m = [];
        var flag = 0;
        while (flag >= 0) try {
            var med = r.matched(flag++);
            m.push(med);
        } catch (e) {
            if (js.Boot.__instanceof(e, String)) {
                flag = -1;
            } else throw (e);
        }
        return m;
    }
    com.todream.utils.Utils.match = function (r, s) {
        return s.match(r.r);
    }
    com.todream.utils.Utils.trim = function (s) {
        var p = new EReg("^\\s+|\\s+$", "g");
        return p.replace(s, "");
    }
    com.todream.utils.Utils.repeat = function (s, n) {
        var a = [];
        n = n + 1;
        var _g = 0;
        while (_g < n) {
            var i = _g++;
            a.push("");
        }
        return a.join(s);
    }
    com.todream.utils.Utils.createFunction = function (args) {
        var fs = "";
        var _g1 = 0, _g = args.length;
        while (_g1 < _g) {
            var i = _g1++;
            fs += args[i] + "\",\"";
        }
        fs = HxOverrides.substr(fs, 0, fs.length - 3);
        var f = "new Function(\"" + fs + "\")";
        var func = eval(f);
        return func;
    }
    com.todream.utils.Utils.createScript = function (body) {
        var func = eval("new Function(\"" + body + "\")");
        return func;
    }
    com.todream.utils.Utils.createSimpleFunction = function (body) {
        var func = eval("new Function(\"" + body + "\")");
        return func;
    }
    com.todream.utils.Utils.bind = function (owner, func) {
        var f = function () {
            return func.call(owner);
        };
        return f;
    }
    com.todream.utils.Utils.deepCopy = function (v) {
        if (!Reflect.isObject(v)) return v; else if (js.Boot.__instanceof(v, String)) return v; else if (js.Boot.__instanceof(v, Array)) {
            var r = Type.createInstance(Type.getClass(v), []);
            var _g1 = 0, _g = v.length;
            while (_g1 < _g) {
                var ii = _g1++;
                r.push(com.todream.utils.Utils.deepCopy(v[ii]));
            }
            return r;
        } else if (Type.getClass(v) == null) {
            var obj = {};
            var _g = 0, _g1 = Reflect.fields(v);
            while (_g < _g1.length) {
                var ff = _g1[_g];
                ++_g;
                obj[ff] = com.todream.utils.Utils.deepCopy(Reflect.field(v, ff));
            }
            return obj;
        } else {
            var obj = Type.createEmptyInstance(Type.getClass(v));
            var _g = 0, _g1 = Reflect.fields(v);
            while (_g < _g1.length) {
                var ff = _g1[_g];
                ++_g;
                obj[ff] = com.todream.utils.Utils.deepCopy(Reflect.field(v, ff));
            }
            return obj;
        }
        return null;
    }
    com.todream.utils.Utils.getCssFloatValue = function (o, field) {
        return Std.parseFloat(Reflect.field(o, field));
    }
    com.todream.utils.Utils.getIntervalInLoop = function (total, direction, n1, n2) {
        var i;
        if (direction == 1) {
            i = n2 - n1;
            i = i < 0 ? i + total : i;
        } else {
            i = n1 - n2;
            i = i < 0 ? i + total : i;
        }
        return i;
    }
    com.todream.utils.Utils.prototype = {
        __class__: com.todream.utils.Utils
    }
    haxe.Json = function () { }
    haxe.Json.__name__ = true;
    haxe.ds = {}
    haxe.ds.IntMap = function () {
        this.h = {};
    };
    haxe.ds.IntMap.__name__ = true;
    haxe.ds.IntMap.__interfaces__ = [IMap];
    haxe.ds.IntMap.prototype = {
        get: function (key) {
            return this.h[key];
        }
	, set: function (key, value) {
	    this.h[key] = value;
	}
	, __class__: haxe.ds.IntMap
    }
    haxe.ds.ObjectMap = function () {
        this.h = {};
        this.h.__keys__ = {};
    };
    haxe.ds.ObjectMap.__name__ = true;
    haxe.ds.ObjectMap.__interfaces__ = [IMap];
    haxe.ds.ObjectMap.prototype = {
        keys: function () {
            var a = [];
            for (var key in this.h.__keys__) {
                if (this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
            }
            return HxOverrides.iter(a);
        }
	, set: function (key, value) {
	    var id = key.__id__ != null ? key.__id__ : key.__id__ = ++haxe.ds.ObjectMap.count;
	    this.h[id] = value;
	    this.h.__keys__[id] = key;
	}
	, __class__: haxe.ds.ObjectMap
    }
    haxe.ds.StringMap = function () {
        this.h = {};
    };
    haxe.ds.StringMap.__name__ = true;
    haxe.ds.StringMap.__interfaces__ = [IMap];
    haxe.ds.StringMap.prototype = {
        keys: function () {
            var a = [];
            for (var key in this.h) {
                if (this.h.hasOwnProperty(key)) a.push(key.substr(1));
            }
            return HxOverrides.iter(a);
        }
	, remove: function (key) {
	    key = "$" + key;
	    if (!this.h.hasOwnProperty(key)) return false;
	    delete (this.h[key]);
	    return true;
	}
	, exists: function (key) {
	    return this.h.hasOwnProperty("$" + key);
	}
	, get: function (key) {
	    return this.h["$" + key];
	}
	, set: function (key, value) {
	    this.h["$" + key] = value;
	}
	, __class__: haxe.ds.StringMap
    }
    var js = {}
    js.Boot = function () { }
    js.Boot.__name__ = true;
    js.Boot.__string_rec = function (o, s) {
        if (o == null) return "null";
        if (s.length >= 5) return "<...>";
        var t = typeof (o);
        if (t == "function" && (o.__name__ || o.__ename__)) t = "object";
        switch (t) {
            case "object":
                if (o instanceof Array) {
                    if (o.__enum__) {
                        if (o.length == 2) return o[0];
                        var str = o[0] + "(";
                        s += "\t";
                        var _g1 = 2, _g = o.length;
                        while (_g1 < _g) {
                            var i = _g1++;
                            if (i != 2) str += "," + js.Boot.__string_rec(o[i], s); else str += js.Boot.__string_rec(o[i], s);
                        }
                        return str + ")";
                    }
                    var l = o.length;
                    var i;
                    var str = "[";
                    s += "\t";
                    var _g = 0;
                    while (_g < l) {
                        var i1 = _g++;
                        str += (i1 > 0 ? "," : "") + js.Boot.__string_rec(o[i1], s);
                    }
                    str += "]";
                    return str;
                }
                var tostr;
                try {
                    tostr = o.toString;
                } catch (e) {
                    return "???";
                }
                if (tostr != null && tostr != Object.toString) {
                    var s2 = o.toString();
                    if (s2 != "[object Object]") return s2;
                }
                var k = null;
                var str = "{\n";
                s += "\t";
                var hasp = o.hasOwnProperty != null;
                for (var k in o) {
                    ;
                    if (hasp && !o.hasOwnProperty(k)) {
                        continue;
                    }
                    if (k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
                        continue;
                    }
                    if (str.length != 2) str += ", \n";
                    str += s + k + " : " + js.Boot.__string_rec(o[k], s);
                }
                s = s.substring(1);
                str += "\n" + s + "}";
                return str;
            case "function":
                return "<function>";
            case "string":
                return o;
            default:
                return String(o);
        }
    }
    js.Boot.__interfLoop = function (cc, cl) {
        if (cc == null) return false;
        if (cc == cl) return true;
        var intf = cc.__interfaces__;
        if (intf != null) {
            var _g1 = 0, _g = intf.length;
            while (_g1 < _g) {
                var i = _g1++;
                var i1 = intf[i];
                if (i1 == cl || js.Boot.__interfLoop(i1, cl)) return true;
            }
        }
        return js.Boot.__interfLoop(cc.__super__, cl);
    }
    js.Boot.__instanceof = function (o, cl) {
        if (cl == null) return false;
        switch (cl) {
            case Int:
                return (o | 0) === o;
            case Float:
                return typeof (o) == "number";
            case Bool:
                return typeof (o) == "boolean";
            case String:
                return typeof (o) == "string";
            case Dynamic:
                return true;
            default:
                if (o != null) {
                    if (typeof (cl) == "function") {
                        if (o instanceof cl) {
                            if (cl == Array) return o.__enum__ == null;
                            return true;
                        }
                        if (js.Boot.__interfLoop(o.__class__, cl)) return true;
                    }
                } else return false;
                if (cl == Class && o.__name__ != null) return true;
                if (cl == Enum && o.__ename__ != null) return true;
                return o.__enum__ == cl;
        }
    }
    js.Boot.__cast = function (o, t) {
        if (js.Boot.__instanceof(o, t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
    }
    js.Browser = function () { }
    js.Browser.__name__ = true;
    js.Browser.getLocalStorage = function () {
        try {
            var s = js.Browser.window.localStorage;
            s.getItem("");
            return s;
        } catch (e) {
            return null;
        }
    }
    js.Lib = function () { }
    js.Lib.__name__ = true;
    js.Lib["eval"] = function (code) {
        return eval(code);
    }
    var $_, $fid = 0;
    function $bind(o, m) { if (m == null) return null; if (m.__id__ == null) m.__id__ = $fid++; var f; if (o.hx__closures__ == null) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if (f == null) { f = function () { return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
    Math.__name__ = ["Math"];
    Math.NaN = Number.NaN;
    Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
    Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
    Math.isFinite = function (i) {
        return isFinite(i);
    };
    Math.isNaN = function (i) {
        return isNaN(i);
    };
    String.prototype.__class__ = String;
    String.__name__ = true;
    Array.prototype.__class__ = Array;
    Array.__name__ = true;
    Date.prototype.__class__ = Date;
    Date.__name__ = ["Date"];
    var Int = { __name__: ["Int"] };
    var Dynamic = { __name__: ["Dynamic"] };
    var Float = Number;
    Float.__name__ = ["Float"];
    var Bool = Boolean;
    Bool.__ename__ = ["Bool"];
    var Class = { __name__: ["Class"] };
    var Enum = {};
    if (typeof (JSON) != "undefined") haxe.Json = JSON;
    com.todream.flash.display.FlashMovie.mcl = com.todream.m.MCollections.getInstance();
    com.todream.m.MType.PROPS_INIT = ["opacity", "left", "right", "top", "bottom", "margin-left", "margin-right", "margin-top", "margin-bottom", "width", "height"];
    com.todream.m.MType.PROPS_INIT2 = ["opacity", "left", "top"];
    com.todream.m.MType.FULL_NAMES = (function ($this) {
        var $r;
        var _g = new haxe.ds.StringMap();
        _g.set("L", "left");
        _g.set("R", "right");
        _g.set("T", "top");
        _g.set("B", "bottom");
        $r = _g;
        return $r;
    } (this));
    com.todream.m.MType.SETTING = "setting";
    com.todream.m.MType.COMMON = "common";
    com.todream.m.MType.TEXT = "text";
    com.todream.m.MType.CLIP = "clip";
    com.todream.m.MType.MOVIE_TEMPLATE = "TMovie";
    com.todream.m.MType.MOVIE = "movie";
    com.todream.m.MType.MOVIE_H5 = "movie_h5";
    com.todream.m.MType.MOVIE_FL = "movie_fl";
    com.todream.m.MType.IMAGES = "images";
    com.todream.m.MType.BOOTLOADER = "loader";
    com.todream.m.MType.NO = "NO";
    com.todream.m.MType.SCALE_BY_W = "W";
    com.todream.m.MType.SCALE_BY_H = "H";
    com.todream.m.MType.SCALE_BY_MAX = "MAX";
    com.todream.m.MType.SCALE_BY_MIN = "MIN";
    com.todream.m.MType.SCALE_BY_CENTER = "C";
    com.todream.m.MType.SCALE_BY_MIDDLE = "M";
    com.todream.m.MType.LOCATION_L = "L";
    com.todream.m.MType.LOCATION_R = "R";
    com.todream.m.MType.LOCATION_T = "T";
    com.todream.m.MType.LOCATION_B = "B";
    com.todream.m.MType.VERTICAL = "V";
    com.todream.m.MType.HORIZONTAL = "H";
    com.todream.m.MType.STOP = "S";
    com.todream.m.MType.PLAYING = "P";
    com.todream.m.MType.FORWARD = 1;
    com.todream.m.MType.BACKWARD = -1;
    com.todream.m.MType.ROOT = "root";
    com.todream.m.MType.SILENT = "S";
    com.todream.m.MType.LOAD_START = "Ls";
    com.todream.m.MType.LOADING = "Li";
    com.todream.m.MType.LOADED = "Ld";
    com.todream.m.Tween.imageIndexX = new EReg("\\d+(?=\\.\\w{1,4})", "");
    com.todream.m.Tween.numberX = new EReg("[\\-\\d\\.]+", "");
    com.todream.utils.ERegTemplate.SELECTOR_ARGS = new EReg("([^(]*)\\(([^)]*)\\)", "");
    com.todream.utils.ERegTemplate.VALUE_PERCENT = new EReg("([^%px]*)(%|px)", "");
    com.todream.utils.ERegTemplate.REAL_ARGS = new EReg("{.*}|'[^']*'", "g");
    com.todream.utils.ERegTemplate.TURN_TO_HEX = new EReg("#", "");
    haxe.ds.ObjectMap.count = 0;
    js.Browser.window = typeof window != "undefined" ? window : null;
    js.Browser.document = typeof window != "undefined" ? window.document : null;
    js.Browser.location = typeof window != "undefined" ? window.location : null;
    js.Browser.navigator = typeof window != "undefined" ? window.navigator : null;
    com.todream.Main.main();
})();

