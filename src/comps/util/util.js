/**
 * 小工具。   兼容commonJS amd cmd
 * 会将 util 注册到全局。   （util，tool都是工具） util 是和业务无关的，可以在其他地方使用，tool是和业务有关的， *
 * @since 2019-02-15
 * @version 1.0
 */

let global = this || {};

((function(global) {
    var _util = global._util || {};

    // 添加到全局。
    var Utils = {
        /**
         * 解决 util 冲突处理。
         * 返回小工具对象，由开发人员自己处理。
         *
         * @method
         * @return {Object}
         */
        conflict: function() {
            window._util = _util;
            return Utils;
        },

        /**
         * 变量的类型。
         * @param {String} oData
         */
        typeOf: function(oData) {
            return Object.prototype.toString.apply(oData).
                match(/\[object (.*?)\]/)[1].toLowerCase();
        },
        isString(o) { //是否字符串
            return Utils.typeOf(o) === 'string';
        },
        isNumber(o) { //是否数字
            return Utils.typeOf(o) === 'number';
        },
        isBoolean(o) { //是否boolean
            return Utils.typeOf(obj) === 'boolean';
        },
        isFunction(o) { //是否函数
            return Utils.typeOf(o) === 'function';
        },
        isNull(o) { //是否为null
            return Utils.typeOf(o) === 'null';
        },
        isUndefined(o) { //是否undefined
            return Utils.typeOf(o) === 'undefined';
        },
        isDate(o) { //是否时间
            return Utils.typeOf(o) === 'date';
        },
        isArray(o) { //是否数组
            return Utils.typeOf(o) === 'array';
        },
        /*是否是空数组*/
        isNonEmptyArray(obj = []) {
            return obj && obj.length > 0 && Array.isArray(obj) &&
                typeof obj !== 'undefined';
        },

        /*是否是对象*/
        isObject(item) {
            return (item && typeof item === 'object' && !Array.isArray(item));
        },
        /*是否是空对象*/
        isEmptyObject(obj) {
            return Object.keys(obj).length === 0 && obj.constructor === Object;
        },

        /*是否是纯粹的对象*/
        isPlainObject(obj) {
            //判断是否非window和DOM对象的对象，
            if (!obj || obj.toString() !== '[object Object]' || obj.nodeType ||
                obj.setInterval) {
                return false;
            }
            //constructor是对创建对象的函数的引用（指针）。对于 Object 对象，该指针指向原始的 Object() 函数
            //判断obj是否具有isPrototypeOf属性，isPrototypeOf是挂在Object.prototype上的。通过字面量或自定义类（构造器）创建的对象都会继承该属性方法
            if (obj.constructor && !obj.hasOwnProperty('constructor') &&
                !obj.constructor.prototype.hasOwnProperty('isPrototypeOf')) {
                return false;
            }

            var key;
            for (key in obj) {
                break;
            }
            return key === undefined || obj.hasOwnProperty(key);
        },

        //对象是否包含某属性
        hasAttr(obj, attr) {
            //判断是否有该键值
            if (obj && obj.hasOwnProperty(attr)) {
                //如果有返回true
                return true;
            }
            return false;
        },

        merge(target, source, overwrite) {
            // We should escapse that source is string
            // and enter for ... in ...
            if (!isObject(source) || !isObject(target)) {
                return overwrite ? clone(source) : target;
            }

            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    var targetProp = target[key];
                    var sourceProp = source[key];

                    if (isObject(sourceProp)
                        && isObject(targetProp)
                        && !isArray(sourceProp)
                        && !isArray(targetProp)
                        && !isDom(targetProp)
                        && !isBuiltInObject(sourceProp)
                        && !isBuiltInObject(targetProp)
                        && !isPrimitive(sourceProp)
                        && !isPrimitive(targetProp)
                    ) {
                        // 如果需要递归覆盖，就递归调用merge
                        merge(targetProp, sourceProp, overwrite);
                    }
                    else if (overwrite || !(key in target)) {
                        // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
                        // NOTE，在 target[key] 不存在的时候也是直接覆盖
                        target[key] = clone(source[key], true);
                    }
                }
            }

            return target;
        },
        mergeAll(targetAndSources, overwrite) {
            var result = targetAndSources[0];
            for (var i = 1, len = targetAndSources.length; i < len; i++) {
                result = merge(result, targetAndSources[i], overwrite);
            }
            return result;
        },

        /*深拷贝*/
        mergeDeep(target) {
            let tempObj = Array.isArray(target) ? [] : {};
            for (let key in target) {
                tempObj[key] = Utils.isObject(target[key]) ? Util.mergeDeep(
                    target[key]) : target[key];
            }
            return tempObj;
        },

        extend(target, source) {
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
            return target;
        },

        clone (obj) {
            return JSON.parse(JSON.stringify(obj));
        },

        /**
         * 构造类继承关系
         * @memberOf module:zrender/core/util
         * @param {Function} clazz 源类
         * @param {Function} baseClazz 基类
         */
        inherits(clazz, baseClazz) {
            var clazzPrototype = clazz.prototype;

            function F() {
            }

            F.prototype = baseClazz.prototype;
            clazz.prototype = new F();

            for (var prop in clazzPrototype) {
                clazz.prototype.constructor = clazz;
                clazz.superClass = baseClazz;
            }
        },

        // mixin(target, source, overlay) {
        // 	target = 'prototype' in target ? target.prototype : target;
        // 	source = 'prototype' in source ? source.prototype : source;
        //
        // 	defaults(target, source, overlay);
        // },

        /**
         * 指定延迟时间后执行的动作。
         *
         * @param {Number} nTimeout 单位毫秒。
         * @param {Function} fnTodo 函数句柄。
         * @return {Number} setTimeout 的定时器。
         */
        timeout: function(nTimeout, fnTodo) {
            return setTimeout(fnTodo, nTimeout);
        },

    };

    var paramUtil = {
        // 操作  Url  param

        /**
         * 获取指定 URL 的参数。
         */
        getParam: function(sParamName, sUrl = location.href) {
            return this.getParams(sUrl)[sParamName];
        },
        /**
         * 获取 URL 中所有参数信息。
         */
        getParams: function(sUrl = location.href) {
            // 过滤后面的锚点。
            sUrl = sUrl.replace(/#.*/g, '');
            // 取出 ? 后面的参数串。
            sUrl = sUrl.split('?')[1] || '';

            var oParam = {};
            sUrl.split('&').forEach(function(sItem) {
                var asParam = sItem.split('=');
                if (asParam[0]) {
                    oParam[asParam[0]] = decodeURIComponent(asParam[1]);
                }
            });

            return oParam;
        },

        /**
         * 返回指定 URL 中是否包含指定参数。
         */
        hasParam: function(sParamName, sUrl = location.href) {
            return this.getParam(sParamName, sUrl) !== undefined;
        },
        /**
         * 添加指定参数到指定 URL。
         */
        setParam: function(sParamName, sValue, sUrl = location.href) {
            let oData = {};
            oData[sParamName] = sValue;

            return this.setParams(oData, sUrl);
        },
        /**
         * 添加多个参数到指定 URL。
         */
        setParams: function(oParams, sUrl = location.href) {
            console.log(this)
            let _this = this,
                sUri = sUrl.split('?')[0],
                oParamData = _this.getParams(sUrl)
            ;

            // 合并。
            Object.assign(oParamData, oParams);
            // 重新转换回来。
            let sParams = _this.objToParams(oParamData);

            if (sParams) {
                return sUri + '?' + sParams;
            } else {
                return sUri;
            }
        },
        /**
         * 删除指定的参数。
         */
        removeParam: function(sParamName, sUrl = window.locaiton.href) {
            var REMOVE_VALUE = 'remove';

            return this.setParam(sParamName, REMOVE_VALUE, sUrl).
                replace(new RegExp(
                        '([\?&]?)' + sParamName + '=' + REMOVE_VALUE + '[&]?', 'g'),
                    '$1') // 过滤对应的参数项。
                .replace(/&$/, '') // 过滤最后一个多的 & 符号。
                ;
        },

        /**
         * 删除多个 URL 参数。
         */
        removeParams: function(asParamNames, sUrl = location.href) {
            var _this = this,
                _url = sUrl
            ;

            asParamNames.forEach((sParam) => {
                _url = _this.removeParam(sParam, _url);
            });

            return _url;
        },

        /**
         * 将对象转换成 URL 参数，并对字符进行转义。
         *  @param isEncodeURIComponent 是否编码，默认不编码
         */

        objToParams(obj, isEncodeURIComponent = false) {
            let str = '';
            for (let key in obj) {
                if (str !== '') {
                    str += '&';
                }
                str += key + '=' + (isEncodeURIComponent
                        ? encodeURIComponent(obj[key])
                        : obj[key]);
            }
            return str;
        },
        /*
         * 转换 url params参数为obj
         * @param str 传入url参数字符串
         * @param isDecodeURI 是否解码，默认不解码
         * @returns {Object}
         * eg. paramsToObj('http://www.cctv.com?name=大佬&age=18')
         */
        paramsToObj(str, isDecodeURI = false) {
            let obj = {};
            str = str.substring(str.indexOf('?') + 1);
            try {
                obj = JSON.parse('{"' +
                    (isDecodeURI ? decodeURI(str) : str).replace(/"/g, '\\"').
                        replace(/&/g, '","').
                        replace(/=/g, '":"') + '"}');
            } catch (e) {
                console.log(e);
            }
            return obj;
        },
    };
    var cookieUtil = {

        /**
         * 获取指定名称的 Cookie 值。
         *
         * @param {String} sName
         * @return {String}
         */
        getCookie: function(sName) {
            var sCookie = document.cookie;

            if (sCookie) {
                // 分割出所有 Cookie 项。
                var asCookies = sCookie.split(';');
                var asItem;

                // 遍历逐一找指定名称的那个项。
                for (var i = 0, l = asCookies.length; i < l; i++) {
                    // 将当前项名称和值分割。
                    asItem = asCookies[i].trim().split('=');

                    // 名称匹配检测。
                    if (asItem[0] == sName) {
                        return decodeURIComponent(asItem[1]);
                    }
                }
            }

            return '';
        },

        /**
         * 写入或删除 Cookie 值。
         *
         * @param {String} sName
         * @param {String} sValue
         * @param {Object} oOptions
         */
        setCookie: function(sName, sValue, oOptions) {
            if (!oOptions) {
                oOptions = {};
            }

            // 假如要设置的值为 null，则作删除操作。
            if (sValue === null || sValue === undefined || sValue === '') {
                sValue = '';
                oOptions.expires = -1;	// 设置过去的时间，以使 cookie 马上过期。
            }

            // 根据参数判断过期时间。
            var sExpires = oOptions.expires;

            // 如果过期时间未设置，默认一年后过期。
            if (!sExpires) {
                sExpires = 365;
            }

            // 检测参数类型。
            var sArgumentType = (typeof sExpires).toLowerCase();
            if (sArgumentType == 'number') {
                // 数字型。

                // 添加天数。
                var dDate = new Date();
                dDate.setTime(
                    dDate.getTime() + (sExpires * 24 * 60 * 60 * 1000));

                sExpires = dDate.toUTCString();
            } else if (sArgumentType == 'date') {
                // 日期型。

                sExpires = sExpires.toUTCString();
            }

            // 过期时间。
            sExpires = '; expires=' + sExpires;
            // 路径。
            var sPath = oOptions.path ? '; path=' + (oOptions.path) : '';
            // 域。
            var sDomain = oOptions.domain
                ? '; domain=' + (oOptions.domain)
                : '';
            // 加密。
            var sSecure = oOptions.secure ? '; secure' : '';

            // 写入到 Cookie。
            document.cookie = [
                sName, '=', encodeURIComponent(sValue), sExpires,
                sPath, sDomain, sSecure].join('');
        },

        /**
         * 删除指定 Cookie。
         *
         * @param {String} sName
         * @param {Object|undefined} oOPtions
         * returnl {void}
         */
        removeCookie: function(sName, oOptions) {
            this.setCookie(sName, null, oOptions);
        },


        //存储
        set(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        //取出数据
        get(key) {
            return JSON.parse(localStorage.getItem(key));
        },

        // 删除数据
        remove(key) {
            localStorage.removeItem(key);
        }

    };
    var dataUtil = {

        /**
         * 将字符串时间转换成时间对象。
         *
         * @param {String|Date|Number} sDateTime
         *  字符串类型参数，支持格式如下：
         *  UTC 标准时间
         *
         *  yyyy-MM-dd hh:mm:ss
         *    yyyy-MM-dd
         *
         *  MM-dd hh:mm
         *
         *  hh:mm:ss
         *
         *  MM-dd
         *  hh:mm
         *
         *  yy-MM-dd hh:mm:ss
         *  yy-MM-dd
         *
         * @return {Date}
         */
        parseDate: function(sDateTime) {
            var dDate = null,
                sDateType = this.typeOf(sDateTime)
            ;

            // 检测参数类型。
            if (sDateType == 'Date') {
                // 日期对象型。

                dDate = sDateTime;
            } else if (sDateType == 'Number') {
                // 毫秒值类型。

                dDate = new Date(Number(sDateTime));
            } else if (sDateType == 'String') {
                // 字数串类型。
                sDateTime = sDateTime.replace(/-/g, '/');
                // 首先使用标准日期格式来实例化。
                dDate = new Date(sDateTime);

                /*
                 * 如果是无效的日期，则再进一步分析，否则可直接使用。
                 * 或者是非 yy-MM-dd 的三段日期，两段的也不行。
                 */
                if (dDate.toString() == 'Invalid Date' ||
                    sDateTime.split('/').length < 3) {
                    var asDate = [],
                        asTime = []
                    ;

                    // 分割日期与时间。
                    var asDateTime = sDateTime.split(' ');
                    var sSplitedDate = asDateTime[0];

                    // 检测分割结果段数。
                    if (asDateTime.length == 2) {
                        // 有两段，则参数包括日期和时间。

                        asDate = sSplitedDate.split('/');
                        asTime = sDateTime[1].split(':');
                    } else {
                        // 不是两段，当作只有日期或时间来处理。

                        // 检测分割后的日期里，是否有(-)符号，如果有则表示这段是日期的，否则为时间的。
                        if (sSplitedDate.indexOf('/') > -1) {
                            // 日期型。

                            asDate = sSplitedDate.split('/');
                        } else {
                            // 时间型。

                            asTime = sSplitedDate.split(':');
                        }
                    }

                    var nNow = new Date(),

                        // 日期段没传则使用当天。
                        nYear = nNow.getFullYear(),
                        nMonth = nNow.getMonth(),
                        nDay = nNow.getDate(),

                        // 时间段没传则使用零点。
                        nHours = 0,
                        nMinutes = 0,
                        nSeconds = 0
                    ;

                    // 检测分割后的日期段，是否有值。
                    if (asDate.length) {
                        if (asDate.length == 3) {
                            // 三段式日期。

                            nYear = asDate[0] >> 0;
                            nMonth = asDate[1] >> 0;
                            nDay = asDate[2] >> 0;
                        } else {
                            // 两段式日期。

                            nMonth = asDate[0] >> 0;
                            nDay = asDate[1] >> 0;
                        }

                        // 如果参数传的年是两位数，则换算成四位整年。
                        if (nYear < 1900) {
                            nYear += 1900;
                        }

                        // 月份要减一。
                        nMonth--;
                    }

                    // 检测分割后的时间段，是否有值。
                    if (asTime.length) {
                        nHours = asTime[0] >> 0;
                        nMinutes = asTime[1] >> 0;

                        // 三段式的值，表示包括毫秒。
                        if (asTime.length == 3) {
                            nSeconds = asTime[2] >> 0;
                        }
                    }

                    // 实例段日期对象。
                    dDate = new Date(nYear, nMonth, nDay, nHours, nMinutes,
                        nSeconds);
                }
            }

            return dDate;
        },

        /**
         * 格式化日期时间。
         * 如 yyyy-MM-dd、yyyy-MM-dd hh:mm:ss
         *
         * @param {String|Date|Number} dDate 要格式化的日期对象。
         * @param {String} sTemplate 要模式化的模板。
         *  y 年
         *  M 月
         *  d 日
         *  h 时
         *  m 分
         *  s 秒
         *  S 毫秒
         *  q 季
         *  w 周
         * @return {String}
         */
        formatDate: function(dDate, sTemplate = 'yyyy-MM-dd hh:mm:ss') {
            var _this = this;

            // 先解析一下日期参数。
            dDate = _this.parseDate(dDate);

            // 检测解析有效性。
            if (!dDate) {
                return '';
            }

            var
                nFullYear = dDate.getFullYear(),	// 四位整年。
                nYear = nFullYear.toString().substring(2), // 两位年。
                nMonth = dDate.getMonth() + 1,	// 月份。
                nDay = dDate.getDate(),	// 日。

                nHours = dDate.getHours(),	// 时。
                nMinutes = dDate.getMinutes(),	// 分。
                nSeconds = dDate.getSeconds(),	// 秒。

                nMilliseconds = dDate.getMilliseconds(),	// 毫秒。
                nQuarter = Math.floor((nMonth + 3) / 3),	// 季。
                nWeek = _iso8601Week(dDate), // 周

                fix = _this.fix
            ;

            var oFullFlags = {
                yyyy: nFullYear,	// 年。
                MM: fix(nMonth),	// 月。
                dd: fix(nDay),	// 日。
                hh: fix(nHours),	// 时。
                mm: fix(nMinutes),	// 分。
                ss: fix(nSeconds),	// 秒。
                S: nMilliseconds,	// 毫秒。
                q: nQuarter,	// 季。
                w: nWeek,
            };

            var oFlags = {
                yy: nYear,	// 年。
                M: nMonth,	// 月。
                d: nDay,	// 日。
                h: nHours,	// 时。
                m: nMinutes,	// 分。
                s: nSeconds	// 秒。
            };

            // 逐一替换各属性。
            var sDate = sTemplate;
            var p;

            // 先替换多位的。
            for (p in oFullFlags) {
                sDate = sDate.replace(p, oFullFlags[p]);
            }

            // 再替换单位的。
            for (p in oFlags) {
                sDate = sDate.replace(p, oFlags[p]);
            }

            return sDate;

            /**
             * 计算当前日期为当年的第几周
             *
             * @param {Date} date
             * @return {Number}
             */
            function _iso8601Week(date) {
                var time, checkDate = new Date(date.getTime());

                // Find Thursday of this week starting on Monday
                checkDate.setDate(
                    checkDate.getDate() + 4 - (checkDate.getDay() || 7));

                time = checkDate.getTime();
                checkDate.setMonth(0); // Compare with Jan 1
                checkDate.setDate(1);
                return Math.floor(
                        Math.round((time - checkDate) / 86400000) / 7) + 1;
            }
        },

        /**
         * @param  {s} 秒数
         * @return {String} 字符串
         *
         * @example formatHMS(3610) // -> 1h0m10s
         */
        formatHMS(s) {
            var str = '';
            if (s > 3600) {
                str = Math.floor(s / 3600) + 'h' + Math.floor(s % 3600 / 60) +
                    'm' + s % 60 + 's';
            } else if (s > 60) {
                str = Math.floor(s / 60) + 'm' + s % 60 + 's';
            } else {
                str = s % 60 + 's';
            }
            return str;
        },

        /*时间格式化*/
        formatTime(obj, format) {
            if (format) {
                var date;
                if (obj instanceof Date) {
                    date = obj;
                } else {
                    date = new Date(obj);
                }
                var dayNames = [
                    '星期一',
                    '星期二',
                    '星期三',
                    '星期四',
                    '星期五',
                    '星期六',
                    '星期日',];

                var o = {
                    'M+': date.getMonth() < 9
                        ? '0' + (date.getMonth() + 1)
                        : (date.getMonth() + 1), // 月份
                    'd+': date.getDate() < 10
                        ? '0' + date.getDate()
                        : date.getDate(), // 日
                    'h+': date.getHours(), // 小时
                    'm+': date.getMinutes(), // 分
                    's+': date.getSeconds() < 10
                        ? '0' + date.getSeconds()
                        : date.getSeconds(), // 秒
                    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
                    'S+': date.getMilliseconds(), // 毫秒
                    'D+': dayNames[date.getDay()], //星期
                };

                if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
                    (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
                for (var k in o) {
                    if (new RegExp(`(${k})`).test(format)) {
                        format = format.replace(RegExp.$1,
                            (RegExp.$1.length === 1)
                                ? (o[k])
                                : ((`00${o[k]}`).substr((`${o[k]}`).length)));
                    }
                }
                return format;
            } else {
                let date = new Date(obj);
                let _year = date.getFullYear(),
                    _month = (date.getMonth() + 1) > 9
                        ? (date.getMonth() + 1)
                        : '0' + (date.getMonth() + 1),
                    _date = date.getDate(),
                    _hour = date.getHours(),
                    _minute = date.getMinutes(),
                    _second = date.getSeconds();
                return _year + '-' + _month + '-' + _date + ' ' + _hour + ':' +
                    _minute + ':' + _second;
            }
        },
        //根据月份获取起止时间戳
        getTimeFromMonth(year, month) {
            return [
                new Date(year, month - 1, 1).getTime() / 1000,
                new Date(year, month, 0).getTime() / 1000,
            ];
        },
//根据日期获取一天起止时间戳
        getTimeFromDay(year, month, day) {
            return [
                new Date(year, month - 1, day).getTime() / 1000,
                new Date(year, month - 1, (day + 1)).getTime() / 1000,
            ];
        },

        /**
         * 计算目标时间与起始时间的时间差，反按指定模板格式返回。
         *
         * @param {Date} dTargetDate
         * @param {Date|undefined} sBeginDate
         * @param {String|undefined} sTemplate
         * @return {String}
         */
        dateOffset: function(
            dTargetDate, dBeginDate = new Date(),
            sTemplate = '剩余时间:{d}天{h}小时{m}分钟{s}秒') {
            var _this = this,
                t = _this.parseDate(dTargetDate).getTime() -
                    _this.parseDate(dBeginDate).getTime(), //时间差的毫秒数
                d = 0,
                h = 0,
                m = 0,
                s = 0
            ;

            if (t >= 0) {
                d = Math.floor(t / 1000 / 3600 / 24);
                h = Math.floor(t / 1000 / 60 / 60 % 24);
                m = Math.floor(t / 1000 / 60 % 60);
                s = Math.floor(t / 1000 % 60);
            }

            return _this.substitute(sTemplate, {
                d, h, m, s,
            });
        },

        /**
         * 将秒时间格式化成上级单位的便于可读的时间串。
         *
         * @param {Number} nSeconds 秒值
         * @param {String|undefine} sTemplate 输出模板
         * @param {Object|undefined} oUnit 后缀单位
         */
        formatSeconds: function(
            nSeconds, sTemplate = '{d} {h} {m} {s}', oUnit = {
                d: ' 天',
                h: ' 时',
                m: ' 分',
                s: ' 秒',
            }) {
            var t = nSeconds;
            var d, h, m, s;

            if (t >= 0) {
                d = Math.floor(t / 60 / 60 / 24);
                h = Math.floor(t / 60 / 60);
                m = Math.floor(t / 60);
                s = Math.floor(t % 60);
            }

            return this.substitute(sTemplate, {
                d: d > 0 ? d + oUnit.d : '',
                h: h > 0 ? h + oUnit.h : '',
                m: m > 0 ? m + oUnit.m : '',
                s: s + oUnit.s,
            });
        },

        /**
         * 过去了的时间。
         *
         * @param {Date|Number|String} dDate
         * @return {String}
         */
        timeAgo: function(dDate) {
            //dateStr格式：2017-08-17 10:39:27
            //转换成时间戳
            var _this = this;
            dDate = _this.parseDate(dDate);

            var sDate = _this.formatDate(dDate);
            var dateTimeStamp = dDate.getTime();
            var minute = 1000 * 60;
            var hour = minute * 60;
            var day = hour * 24;
            var month = day * 30;
            var now = new Date().getTime();
            var diffValue = now - dateTimeStamp;
            if (diffValue < 0) {
                return;
            }
            var monthC = diffValue / month;
            var dayC = diffValue / day;
            var hourC = diffValue / hour;
            var minC = diffValue / minute;
            var result;
            if (monthC >= 12) {
                result = sDate;
            }
            else if (monthC >= 1) {
                result = '' + parseInt(monthC) + '个月前';
            }
            else if (dayC >= 1) {
                result = '' + parseInt(dayC) + '天前';
            }
            else if (hourC >= 1) {
                result = '' + parseInt(hourC) + '小时前';
            }
            else if (minC >= 1) {
                result = '' + parseInt(minC) + '分钟前';
            } else if (minC < 1) {
                result = '刚刚';
            }
            return result;
        },

    };
    var numberUtil = {

        /**
         * 生成一个 [min, max] 之间的值。
         *
         * @param {Number} nMin 最小时，包含。
         * @param {Number} nMax 最大值，包含。
         * @return {Number}
         */
        random: function(nMin, nMax) {
            return Math.round(Math.random() * (nMax - nMin) + nMin);
        },

        //格式化价格，12345.1  =》 12,345.10
        formatePrice(value) {
            value = (value + '').replace(/\.\d{2}(\d*)/,
                (match, $1) => match.replace($1, ''));//强制截取两位小数
            if (isNaN(value)) {
                return '';
            } else {
                //补0
                var s = value.toString();
                var rs = s.indexOf('.');
                if (rs < 0) {
                    rs = s.length;
                    s += '.';
                }
                while (s.length <= rs + 2) {
                    s += '0';
                }
            }
            //千分位打逗号
            return (s + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
        },

        /*
         *保留n位小数
         *@param num {Number|String} 原数字 1.33或者'1.33'
         *@returns {String} 返回字符串
         */
        toThousands(num, n) {
            return parseFloat(num).
                toFixed(n).
                replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, '$1,');
        },

        //float偏移处理 eg.  1.67*100结果会偏移，使用mul(1.67*100)
        mul(a, b) {
            let c = 0,
                d = a.toString().replace(',', ''),
                e = b.toString();
            try {
                c += d.split('.')[1].length;
            } catch (f) {
            }
            try {
                c += e.split('.')[1].length;
            } catch (f) {
            }
            return Number(d.replace('.', '')) * Number(e.replace('.', '')) /
                Math.pow(10, c);
        },

    };
    var stringUtil = {

        /*去掉首尾空格*/
        trimStr(str) {
            return str.replace(/(^\s*)|(\s*$)/g, '');
        },
        /**
         * 检测内容是否是指定类型的。
         * @param {String} sContent
         * @param {String} type email、phone、tel、number、english、text、chinese、lower、upper
         */
        checkStrType(str, type) {
            switch (type) {
                case 'phone':   //手机号码
                    return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
                case 'tel':     //座机
                    return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
                case 'card':    //身份证
                    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
                case 'pwd':     //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
                    return /^[a-zA-Z]\w{5,17}$/.test(str);
                case 'postal':  //邮政编码
                    return /[1-9]\d{5}(?!\d)/.test(str);
                case 'QQ':      //QQ号
                    return /^[1-9][0-9]{4,9}$/.test(str);
                case 'email':   //邮箱
                    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
                case 'money':   //金额(小数点2位)
                    return /^\d*(?:\.\d{0,2})?$/.test(str);
                case 'URL':     //网址
                    return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
                        str);
                case 'IP':      //IP
                    return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(
                        str);
                case 'date':    //日期时间
                    return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(
                            str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str);
                case 'number':  //数字
                    return /^[0-9]$/.test(str);
                case 'positiveInteger':  //正整数
                    return /^[1-9]\d*$/.test(str);
                case 'price':  //价格
                    return /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/.test(
                        str);//价格非0则去掉'?'
                case 'english': //英文
                    return /^[a-zA-Z]+$/.test(str);
                case 'chinese': //中文
                    return /^[\u4E00-\u9FA5]+$/.test(str);
                case 'lower':   //小写
                    return /^[a-z]+$/.test(str);
                case 'upper':   //大写
                    return /^[A-Z]+$/.test(str);
                case 'HTML':    //HTML标记
                    return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
                default:
                    return true;
            }
        },

        //字符串首字母变大写
        changeIndexToUpperCase(str) {
            return str.replace(/\b\w+\b/g, function(word) {
                return word.substring(0, 1).toUpperCase() +
                    word.substring(1).toLowerCase();
            });
        },
        //emoji判断
        isEmojiCharacter(substring) {
            for (var i = 0; i < substring.length; i++) {
                var hs = substring.charCodeAt(i);
                if (0xd800 <= hs && hs <= 0xdbff) {
                    if (substring.length > 1) {
                        var ls = substring.charCodeAt(i + 1);
                        var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) +
                            0x10000;
                        if (0x1d000 <= uc && uc <= 0x1f77f) {
                            return true;
                        }
                    }
                } else if (substring.length > 1) {
                    var ls = substring.charCodeAt(i + 1);
                    if (ls == 0x20e3) {
                        return true;
                    }
                } else {
                    if (0x2100 <= hs && hs <= 0x27ff) {
                        return true;
                    } else if (0x2B05 <= hs && hs <= 0x2b07) {
                        return true;
                    } else if (0x2934 <= hs && hs <= 0x2935) {
                        return true;
                    } else if (0x3297 <= hs && hs <= 0x3299) {
                        return true;
                    } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d ||
                        hs == 0x3030
                        || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                        || hs == 0x2b50) {
                        return true;
                    }
                }
            }
        },
    };
    var arrayUtil = {
        // 数组操作。

        /*数组删除指定元素*/
        remove(arr, ele) {
            var index = arr.indexOf(ele);
            if (index > -1) {
                arr.splice(index, 1);
            }
            return arr;
        },
        // 数组求并集
        union(a, b) {
            return [...new Set([...a, ...b])];
        },
        // 数组求交集
        intersect(a, b) {
            return [...new Set([...a].filter(x => b.includes(x)))];
        },
        //数组求差集
        difference(a, b) {
            return [...new Set([...a].filter(x => !b.includes(x)))];
        },
        //数组内部交换
        internalExchange(n, m, arr) {
            [arr[n], arr[m]] = [arr[m], arr[n]];
        },
        //数组去重
        noRepeat(arr) {
            return [...new Set([...arr])];
        },
        /*数组最大值*/
        max(arr) {
            return Math.max.apply(null, arr);
        },
        /*数组最小值*/
        min(arr) {
            return Math.min.apply(null, arr);
        },
        /*数组最小值*/
        oneOf(value, arr) {
            return arr.indexOf(value) > -1;
        },

        randomItem(arr, percentArry = []) {

            var arr2 = this.clone(percentArry);

            if(arr2.length === 0){
                arr2 = arr.map(()=>1)
            }

            while(arr2.length < arr.length){
                arr2.push(0);
            }

            let sum = 0;
            let last = 0;
            arr2.forEach(function(v) {
                sum = sum + (v ? v : 0);
            });

            for (var i = 0; i < arr.length; i++) {
                sum = sum- last;
                var random = Math.random();
                if (random <= (arr2[i] || 0) / sum) {
                    return arr[i];
                }
                last = arr2[i] || 0;
            }
        }

    };
    var gidUtil = {

        /**
         * 使用 MD5 进行加密。
         * 依赖 md5.min.js
         *
         * @param {String} sValue
         * @param {String|undefined} sKey
         * @param {Boolean|undefined} bRaw
         * @return{String}
         */
        md5: function(sValue, sKey, bRaw) {
            return window.md5 && window.md5(sValue, sKey, bRaw).toUpperCase() ||
                null;
        },
        encode: function(sValue) {
            return btoa(encodeURIComponent(sValue).replace(/%([0-9A-F]{2})/g,
                function toSolidBytes(match, p1) {
                    return String.fromCharCode('0x' + p1);
                }));
        },
        decode: function(sCode) {
            return decodeURIComponent(atob(sCode).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        },

        /**
         * 生成一个 32 位的 id。
         * 依赖 md5.min.js
         */
        gid: function() {
            let _this = this;

            return _this.md5(new Date + ',' + _this.random(1000, 9999)) ||
                _this.gsid(32);
        },

        /**
         * 生成一个 16 位的 id。
         * 依赖 md5.min.js
         *
         * @return {String}
         */
        gid16: function() {
            return this.gid().substr(8, 24);
        },

        /**
         * 随机生成一个[a-zA-Z0-9]的编码，默认返回8位。
         *
         * @method
         * @param {Number|undefined} nSize
         * @return {String}
         */
        gsid: function(nSize = 8) {
            var asBase = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(
                ''),
                nLength = asBase.length,
                asId = []
            ;

            while (nSize-- > 0) {
                asId.push(asBase[Math.floor(Math.random() * nLength)]);
            }

            return asId.join('');
        },

        /**
         * 设置数量显示位，不足指定位用前面用零填充。
         *
         * @method fix
         * @param {Number} nValue 数值。
         * @param {Number|undefined} nSize 显示的数位。(2)
         * @return {String}
         */
        fix: function(nValue, nSize = 2) {
            let nOffset = nSize - String(nValue).length;
            if (nOffset < 0) {
                nOffset = 0;
            }

            return '0'.repeat(nOffset) + nValue;
        },

    };
    var colorUtil = {

        /**
         * 生成一个随机的颜色值。
         * 如 #ABC123
         *
         * @return {String}
         */
        randomColor(){
            let asColors = [];
            for (let i = 0; i < 6; i++) {
                asColors.push(
                    '0123456789abcdef'[Math.floor(Math.random() * 16)],
                );
            }
            return '#' + asColors.join('').toUpperCase();
        },

        /**
         * 16进制 颜色 转化为 Rgb颜色。
         * @param {Object} sHex
         * @return {String} sColor
         */
        colorRgb: function(sHex) {
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            var sColor = sHex.toLowerCase();
            var i = 0;

            if (sColor && reg.test(sColor)) {
                if (sColor.length === 4) {
                    var sColorNew = '#';
                    for (i = 1; i < 4; i += 1) {
                        sColorNew += sColor.slice(i, i + 1).
                            concat(sColor.slice(i, i + 1));
                    }
                    sColor = sColorNew;
                }

                //处理六位的颜色值
                var sColorChange = [];
                for (i = 1; i < 7; i += 2) {
                    sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
                }
                return 'rgb(' + sColorChange.join(',') + ')';
            } else {
                return sColor;
            }
        },

        /**
         * Rgb 颜色 转化为 16进制颜色。
         * @param {Object} sRgb
         * @return {String} strHex
         */
        colorHex: function(sRgb) {
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            var that = sRgb;
            var i;

            if (/^(rgb|RGB)/.test(that)) {
                var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
                var strHex = '#';
                for (i = 0; i < aColor.length; i++) {
                    var hex = Number(aColor[i]).toString(16);
                    if (hex === '0') {
                        hex += hex;
                    }
                    strHex += hex;
                }
                if (strHex.length !== 7) {
                    strHex = that;
                }
                return strHex;
            } else if (reg.test(that)) {
                var aNum = that.replace(/#/, '').split('');
                if (aNum.length === 6) {
                    return that;
                } else if (aNum.length === 3) {
                    var numHex = '#';
                    for (i = 0; i < aNum.length; i += 1) {
                        numHex += (aNum[i] + aNum[i]);
                    }
                    return numHex;
                }
            } else {
                return that;
            }
        },

        /**
         * 将 px 类型的数值单位解析成整形数据。
         *
         * @param {String} sValue px 单位值，如 10px 0 null undefined
         * @return {Number}
         */
        parsePxValue(sValue) {
            return parseInt((sValue || '').replace('px', ''), 10);
        },
    };

    Utils.extend(Utils, paramUtil);
    Utils.extend(Utils, cookieUtil);
    Utils.extend(Utils, dataUtil);
    Utils.extend(Utils, numberUtil);
    Utils.extend(Utils, stringUtil);
    Utils.extend(Utils, arrayUtil);
    Utils.extend(Utils, gidUtil);
    Utils.extend(Utils, colorUtil);

    if (typeof module !== 'undefined' && module.exports) module.exports = Utils;
    if (typeof define === 'function') define(function() { return Utils; });
    if (global) global._util = Utils;

}))(global);

export default global._util;





