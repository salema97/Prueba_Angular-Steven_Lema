//CdnPath=http://ajax.aspnetcdn.com/ajax/4.5.1/1/MicrosoftAjaxSerialization.js
//----------------------------------------------------------
// Copyright (C) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------
// MicrosoftAjaxSerialization.js
Type._registerScript('MicrosoftAjaxSerialization.js', ['MicrosoftAjaxCore.js']);
Type.registerNamespace('Sys.Serialization');
Sys.Serialization.JavaScriptSerializer = function () {};
Sys.Serialization.JavaScriptSerializer.registerClass(
  'Sys.Serialization.JavaScriptSerializer'
);
Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs = [];
Sys.Serialization.JavaScriptSerializer._charsToEscape = [];
Sys.Serialization.JavaScriptSerializer._dateRegEx = new RegExp(
  '(^|[^\\\\])\\"\\\\/Date\\((-?[0-9]+)(?:[a-zA-Z]|(?:\\+|-)[0-9]{4})?\\)\\\\/\\"',
  'g'
);
Sys.Serialization.JavaScriptSerializer._escapeChars = {};
Sys.Serialization.JavaScriptSerializer._escapeRegEx = new RegExp(
  '["\\\\\\x00-\\x1F]',
  'i'
);
Sys.Serialization.JavaScriptSerializer._escapeRegExGlobal = new RegExp(
  '["\\\\\\x00-\\x1F]',
  'g'
);
Sys.Serialization.JavaScriptSerializer._jsonRegEx = new RegExp(
  '[^,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t]',
  'g'
);
Sys.Serialization.JavaScriptSerializer._jsonStringRegEx = new RegExp(
  '"(\\\\.|[^"\\\\])*"',
  'g'
);
Sys.Serialization.JavaScriptSerializer._serverTypeFieldName = '__type';
Sys.Serialization.JavaScriptSerializer._init = function () {
  var c = [
    '\\u0000',
    '\\u0001',
    '\\u0002',
    '\\u0003',
    '\\u0004',
    '\\u0005',
    '\\u0006',
    '\\u0007',
    '\\b',
    '\\t',
    '\\n',
    '\\u000b',
    '\\f',
    '\\r',
    '\\u000e',
    '\\u000f',
    '\\u0010',
    '\\u0011',
    '\\u0012',
    '\\u0013',
    '\\u0014',
    '\\u0015',
    '\\u0016',
    '\\u0017',
    '\\u0018',
    '\\u0019',
    '\\u001a',
    '\\u001b',
    '\\u001c',
    '\\u001d',
    '\\u001e',
    '\\u001f',
  ];
  Sys.Serialization.JavaScriptSerializer._charsToEscape[0] = '\\';
  Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs['\\'] =
    new RegExp('\\\\', 'g');
  Sys.Serialization.JavaScriptSerializer._escapeChars['\\'] = '\\\\';
  Sys.Serialization.JavaScriptSerializer._charsToEscape[1] = '"';
  Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs['"'] = new RegExp(
    '"',
    'g'
  );
  Sys.Serialization.JavaScriptSerializer._escapeChars['"'] = '\\"';
  for (var a = 0; a < 32; a++) {
    var b = String.fromCharCode(a);
    Sys.Serialization.JavaScriptSerializer._charsToEscape[a + 2] = b;
    Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs[b] = new RegExp(
      b,
      'g'
    );
    Sys.Serialization.JavaScriptSerializer._escapeChars[b] = c[a];
  }
};
Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder = function (
  b,
  a
) {
  a.append(b.toString());
};
Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder = function (
  a,
  b
) {
  if (isFinite(a)) b.append(String(a));
  else throw Error.invalidOperation(Sys.Res.cannotSerializeNonFiniteNumbers);
};
Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder = function (
  a,
  c
) {
  c.append('"');
  if (Sys.Serialization.JavaScriptSerializer._escapeRegEx.test(a)) {
    if (Sys.Serialization.JavaScriptSerializer._charsToEscape.length === 0)
      Sys.Serialization.JavaScriptSerializer._init();
    if (a.length < 128)
      a = a.replace(
        Sys.Serialization.JavaScriptSerializer._escapeRegExGlobal,
        function (a) {
          return Sys.Serialization.JavaScriptSerializer._escapeChars[a];
        }
      );
    else
      for (var d = 0; d < 34; d++) {
        var b = Sys.Serialization.JavaScriptSerializer._charsToEscape[d];
        if (a.indexOf(b) !== -1)
          if (
            Sys.Browser.agent === Sys.Browser.Opera ||
            Sys.Browser.agent === Sys.Browser.FireFox
          )
            a = a
              .split(b)
              .join(Sys.Serialization.JavaScriptSerializer._escapeChars[b]);
          else
            a = a.replace(
              Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs[b],
              Sys.Serialization.JavaScriptSerializer._escapeChars[b]
            );
      }
  }
  c.append(a);
  c.append('"');
};
Sys.Serialization.JavaScriptSerializer._serializeWithBuilder = function (
  b,
  a,
  i,
  g
) {
  var c;
  switch (typeof b) {
    case 'object':
      if (b)
        if (Number.isInstanceOfType(b))
          Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder(
            b,
            a
          );
        else if (Boolean.isInstanceOfType(b))
          Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder(
            b,
            a
          );
        else if (String.isInstanceOfType(b))
          Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder(
            b,
            a
          );
        else if (Array.isInstanceOfType(b)) {
          a.append('[');
          for (c = 0; c < b.length; ++c) {
            if (c > 0) a.append(',');
            Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(
              b[c],
              a,
              false,
              g
            );
          }
          a.append(']');
        } else {
          if (Date.isInstanceOfType(b)) {
            a.append('"\\/Date(');
            a.append(b.getTime());
            a.append(')\\/"');
            break;
          }
          var d = [],
            f = 0;
          for (var e in b) {
            if (e.startsWith('$')) continue;
            if (
              e ===
                Sys.Serialization.JavaScriptSerializer._serverTypeFieldName &&
              f !== 0
            ) {
              d[f++] = d[0];
              d[0] = e;
            } else d[f++] = e;
          }
          if (i) d.sort();
          a.append('{');
          var j = false;
          for (c = 0; c < f; c++) {
            var h = b[d[c]];
            if (typeof h !== 'undefined' && typeof h !== 'function') {
              if (j) a.append(',');
              else j = true;
              Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(
                d[c],
                a,
                i,
                g
              );
              a.append(':');
              Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(
                h,
                a,
                i,
                g
              );
            }
          }
          a.append('}');
        }
      else a.append('null');
      break;
    case 'number':
      Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder(b, a);
      break;
    case 'string':
      Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder(b, a);
      break;
    case 'boolean':
      Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder(b, a);
      break;
    default:
      a.append('null');
  }
};
Sys.Serialization.JavaScriptSerializer.serialize = function (b) {
  var a = new Sys.StringBuilder();
  Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(b, a, false);
  return a.toString();
};
Sys.Serialization.JavaScriptSerializer.deserialize = function (data, secure) {
  if (data.length === 0)
    throw Error.argument('data', Sys.Res.cannotDeserializeEmptyString);
  try {
    var exp = data.replace(
      Sys.Serialization.JavaScriptSerializer._dateRegEx,
      '$1new Date($2)'
    );
    if (
      secure &&
      Sys.Serialization.JavaScriptSerializer._jsonRegEx.test(
        exp.replace(Sys.Serialization.JavaScriptSerializer._jsonStringRegEx, '')
      )
    )
      throw null;
    return eval('(' + exp + ')');
  } catch (a) {
    throw Error.argument('data', Sys.Res.cannotDeserializeInvalidJson);
  }
};
