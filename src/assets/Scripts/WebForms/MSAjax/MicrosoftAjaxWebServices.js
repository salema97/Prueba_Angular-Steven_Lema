//CdnPath=http://ajax.aspnetcdn.com/ajax/4.5.1/1/MicrosoftAjaxWebServices.js
//----------------------------------------------------------
// Copyright (C) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------
// MicrosoftAjaxWebServices.js
Type._registerScript('MicrosoftAjaxWebServices.js', [
  'MicrosoftAjaxNetwork.js',
]);
Type.registerNamespace('Sys.Net');
Sys.Net.WebServiceProxy = function () {};
Sys.Net.WebServiceProxy.prototype = {
  get_timeout: function () {
    return this._timeout || 0;
  },
  set_timeout: function (a) {
    if (a < 0)
      throw Error.argumentOutOfRange('value', a, Sys.Res.invalidTimeout);
    this._timeout = a;
  },
  get_defaultUserContext: function () {
    return typeof this._userContext === 'undefined' ? null : this._userContext;
  },
  set_defaultUserContext: function (a) {
    this._userContext = a;
  },
  get_defaultSucceededCallback: function () {
    return this._succeeded || null;
  },
  set_defaultSucceededCallback: function (a) {
    this._succeeded = a;
  },
  get_defaultFailedCallback: function () {
    return this._failed || null;
  },
  set_defaultFailedCallback: function (a) {
    this._failed = a;
  },
  get_enableJsonp: function () {
    return !!this._jsonp;
  },
  set_enableJsonp: function (a) {
    this._jsonp = a;
  },
  get_path: function () {
    return this._path || null;
  },
  set_path: function (a) {
    this._path = a;
  },
  get_jsonpCallbackParameter: function () {
    return this._callbackParameter || 'callback';
  },
  set_jsonpCallbackParameter: function (a) {
    this._callbackParameter = a;
  },
  _invoke: function (d, e, g, f, c, b, a) {
    c = c || this.get_defaultSucceededCallback();
    b = b || this.get_defaultFailedCallback();
    if (a === null || typeof a === 'undefined')
      a = this.get_defaultUserContext();
    return Sys.Net.WebServiceProxy.invoke(
      d,
      e,
      g,
      f,
      c,
      b,
      a,
      this.get_timeout(),
      this.get_enableJsonp(),
      this.get_jsonpCallbackParameter()
    );
  },
};
Sys.Net.WebServiceProxy.registerClass('Sys.Net.WebServiceProxy');
Sys.Net.WebServiceProxy.invoke = function (q, a, m, l, j, b, g, e, w, p) {
  var i = w !== false ? Sys.Net.WebServiceProxy._xdomain.exec(q) : null,
    c,
    n =
      i &&
      i.length === 3 &&
      (i[1] !== location.protocol || i[2] !== location.host);
  m = n || m;
  if (n) {
    p = p || 'callback';
    c = '_jsonp' + Sys._jsonp++;
  }
  if (!l) l = {};
  var r = l;
  if (!m || !r) r = {};
  var s,
    h,
    f = null,
    k,
    o = null,
    u = Sys.Net.WebRequest._createUrl(
      a ? q + '/' + encodeURIComponent(a) : q,
      r,
      n ? p + '=Sys.' + c : null
    );
  if (n) {
    s = document.createElement('script');
    s.src = u;
    k = new Sys._ScriptLoaderTask(s, function (d, b) {
      if (!b || c)
        t({ Message: String.format(Sys.Res.webServiceFailedNoMsg, a) }, -1);
    });
    function v() {
      if (f === null) return;
      f = null;
      h = new Sys.Net.WebServiceError(
        true,
        String.format(Sys.Res.webServiceTimedOut, a)
      );
      k.dispose();
      delete Sys[c];
      if (b) b(h, g, a);
    }
    function t(d, e) {
      if (f !== null) {
        window.clearTimeout(f);
        f = null;
      }
      k.dispose();
      delete Sys[c];
      c = null;
      if (typeof e !== 'undefined' && e !== 200) {
        if (b) {
          h = new Sys.Net.WebServiceError(
            false,
            d.Message || String.format(Sys.Res.webServiceFailedNoMsg, a),
            d.StackTrace || null,
            d.ExceptionType || null,
            d
          );
          h._statusCode = e;
          b(h, g, a);
        }
      } else if (j) j(d, g, a);
    }
    Sys[c] = t;
    e = e || Sys.Net.WebRequestManager.get_defaultTimeout();
    if (e > 0) f = window.setTimeout(v, e);
    k.execute();
    return null;
  }
  var d = new Sys.Net.WebRequest();
  d.set_url(u);
  d.get_headers()['Content-Type'] = 'application/json; charset=utf-8';
  if (!m) {
    o = Sys.Serialization.JavaScriptSerializer.serialize(l);
    if (o === '{}') o = '';
  }
  d.set_body(o);
  d.add_completed(x);
  if (e && e > 0) d.set_timeout(e);
  d.invoke();
  function x(d) {
    if (d.get_responseAvailable()) {
      var f = d.get_statusCode(),
        c = null;
      try {
        var e = d.getResponseHeader('Content-Type');
        if (e.startsWith('application/json')) c = d.get_object();
        else if (e.startsWith('text/xml')) c = d.get_xml();
        else c = d.get_responseData();
      } catch (m) {}
      var k = d.getResponseHeader('jsonerror'),
        h = k === 'true';
      if (h) {
        if (c)
          c = new Sys.Net.WebServiceError(
            false,
            c.Message,
            c.StackTrace,
            c.ExceptionType,
            c
          );
      } else if (e.startsWith('application/json'))
        c = !c || typeof c.d === 'undefined' ? c : c.d;
      if (f < 200 || f >= 300 || h) {
        if (b) {
          if (!c || !h)
            c = new Sys.Net.WebServiceError(
              false,
              String.format(Sys.Res.webServiceFailedNoMsg, a)
            );
          c._statusCode = f;
          b(c, g, a);
        }
      } else if (j) j(c, g, a);
    } else {
      var i;
      if (d.get_timedOut()) i = String.format(Sys.Res.webServiceTimedOut, a);
      else i = String.format(Sys.Res.webServiceFailedNoMsg, a);
      if (b) b(new Sys.Net.WebServiceError(d.get_timedOut(), i, '', ''), g, a);
    }
  }
  return d;
};
Sys.Net.WebServiceProxy._generateTypedConstructor = function (a) {
  return function (b) {
    if (b) for (var c in b) this[c] = b[c];
    this.__type = a;
  };
};
Sys._jsonp = 0;
Sys.Net.WebServiceProxy._xdomain = /^\s*([a-zA-Z0-9\+\-\.]+\:)\/\/([^?#\/]+)/;
Sys.Net.WebServiceError = function (d, e, c, a, b) {
  this._timedOut = d;
  this._message = e;
  this._stackTrace = c;
  this._exceptionType = a;
  this._errorObject = b;
  this._statusCode = -1;
};
Sys.Net.WebServiceError.prototype = {
  get_timedOut: function () {
    return this._timedOut;
  },
  get_statusCode: function () {
    return this._statusCode;
  },
  get_message: function () {
    return this._message;
  },
  get_stackTrace: function () {
    return this._stackTrace || '';
  },
  get_exceptionType: function () {
    return this._exceptionType || '';
  },
  get_errorObject: function () {
    return this._errorObject || null;
  },
};
Sys.Net.WebServiceError.registerClass('Sys.Net.WebServiceError');
