"use strict";
let $rt_seed = 2463534242,
$rt_nextId = () => {
    let x = $rt_seed;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
},
$rt_wrapFunction0 = f => function() {
    return f(this);
},
$rt_wrapFunction1 = f => function(p1) {
    return f(this, p1);
},
$rt_wrapFunction2 = f => function(p1, p2) {
    return f(this, p1, p2);
},
$rt_wrapFunction3 = f => function(p1, p2, p3) {
    return f(this, p1, p2, p3);
},
$rt_wrapFunction4 = f => function(p1, p2, p3, p4) {
    return f(this, p1, p2, p3, p4);
},
$rt_mainStarter = f => (args, callback) => {
    if (!args) {
        args = [];
    }
    let javaArgs = $rt_createArray($rt_objcls(), args.length);
    for (let i = 0;i < args.length;++i) {
        javaArgs.data[i] = $rt_str(args[i]);
    }
    $rt_startThread(() => {
        f.call(null, javaArgs);
    }, callback);
},
$rt_eraseClinit = target => target.$clinit = () => {
},
$dbg_class = obj => {
    let cls = obj.constructor;
    let arrayDegree = 0;
    while (cls[$rt_meta] && cls[$rt_meta].item) {
        ++arrayDegree;
        cls = cls[$rt_meta].item;
    }
    let clsName = "";
    if (cls[$rt_meta].primitiveKind !== 0) {
        clsName = cls[$rt_meta].name;
    } else {
        clsName = cls[$rt_meta] ? cls[$rt_meta].name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
},
$rt_classWithoutFields = superclass => {
    if (superclass === 0) {
        return function() {
        };
    }
    if (superclass === void 0) {
        superclass = $rt_objcls();
    }
    return function() {
        superclass.call(this);
    };
},
$rt_meta = Symbol("teavm_meta"),
$rt_cls = cls => {
    if (cls[$rt_meta].classObject === null) {
        cls[$rt_meta].classObject = jl_Class_createClass(cls);
    }
    return cls[$rt_meta].classObject;
},
$rt_objcls = () => jl_Object,
$rt_newClassMetadata = source => {
    return Object.assign({ name : null, binaryName : null, parent : null, superinterfaces : [], modifiers : 0, primitiveKind : 0, itemType : null, arrayType : null, enclosingClass : null, declaringClass : null, simpleName : null, clinit : () => {
    }, constructor : null, enumConstants : () => null, resolvedEnumConstants : null, reflection : null, classObject : null, assignableCache : null, valueToObject : o => o, objectToValue : o => o }, source || {  });
},
$rt_createPrimitiveCls = (name, binaryName, kind, config) => {
    let cls = () => {
    };
    let meta = $rt_newClassMetadata({ name : name, binaryName : binaryName, modifiers : 1 | 1 << 4, primitiveKind : kind });
    cls[$rt_meta] = meta;
    if (typeof config === 'function') {
        config(meta);
    }
    return cls;
},
$rt_booleancls = $rt_createPrimitiveCls("boolean", "Z", 1, meta => {
}),
$rt_bytecls = $rt_createPrimitiveCls("byte", "B", 2, meta => {
}),
$rt_shortcls = $rt_createPrimitiveCls("short", "S", 3, meta => {
}),
$rt_charcls = $rt_createPrimitiveCls("char", "C", 4, meta => {
}),
$rt_intcls = $rt_createPrimitiveCls("int", "I", 5, meta => {
}),
$rt_longcls = $rt_createPrimitiveCls("long", "J", 6, meta => {
}),
$rt_doublecls = $rt_createPrimitiveCls("double", "D", 8, meta => {
    {
        meta.valueToObject = o => jl_Double_valueOf(o);
    }
}),
$rt_voidcls = $rt_createPrimitiveCls("void", "V", 9),
$rt_numberConversionBuffer = new ArrayBuffer(16),
$rt_numberConversionDoubleArray = new Float64Array($rt_numberConversionBuffer),
$rt_numberConversionLongArray = new BigInt64Array($rt_numberConversionBuffer),
$rt_doubleToRawLongBits = n => {
    $rt_numberConversionDoubleArray[0] = n;
    return $rt_numberConversionLongArray[0];
},
$rt_longBitsToDouble = n => {
    $rt_numberConversionLongArray[0] = n;
    return $rt_numberConversionDoubleArray[0];
},
$rt_compare = (a, b) => a === b ? 0 : a < b ?  -1 : 1,
$rt_compare_less = (a, b) => a === b ? 0 : a > b ? 1 :  -1,
$rt_imul = Math.imul || function(a, b) {
    let ah = a >>> 16 & 0xFFFF;
    let al = a & 0xFFFF;
    let bh = b >>> 16 & 0xFFFF;
    let bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
},
$rt_udiv = (a, b) => (a >>> 0) / (b >>> 0) >>> 0,
$rt_umod = (a, b) => (a >>> 0) % (b >>> 0) >>> 0,
$rt_ucmp = (a, b) => {
    a >>>= 0;
    b >>>= 0;
    return a < b ?  -1 : a > b ? 1 : 0;
},
Long_ZERO = BigInt(0),
Long_create = (lo, hi) => BigInt.asIntN(64, BigInt.asUintN(64, BigInt(lo)) | BigInt.asUintN(64, BigInt(hi) << BigInt(32))),
Long_fromInt = val => BigInt.asIntN(64, BigInt(val | 0)),
Long_fromNumber = val => BigInt.asIntN(64, BigInt(val >= 0 ? Math.floor(val) : Math.ceil(val))),
Long_toNumber = val => Number(val),
Long_lo = val => Number(BigInt.asIntN(32, val)) | 0,
Long_eq = (a, b) => a === b,
Long_ne = (a, b) => a !== b,
Long_gt = (a, b) => a > b,
Long_le = (a, b) => a <= b,
Long_add = (a, b) => BigInt.asIntN(64, a + b),
Long_sub = (a, b) => BigInt.asIntN(64, a - b),
Long_ucompare = (a, b) => {
    a = BigInt.asUintN(64, a);
    b = BigInt.asUintN(64, b);
    return a < b ?  -1 : a > b ? 1 : 0;
},
Long_mul = (a, b) => BigInt.asIntN(64, a * b),
Long_div = (a, b) => BigInt.asIntN(64, a / b);
let Long_udiv = (a, b) => BigInt.asIntN(64, BigInt.asUintN(64, a) / BigInt.asUintN(64, b)),
Long_rem = (a, b) => BigInt.asIntN(64, a % b),
Long_and = (a, b) => BigInt.asIntN(64, a & b),
Long_or = (a, b) => BigInt.asIntN(64, a | b),
Long_xor = (a, b) => BigInt.asIntN(64, a ^ b),
Long_shl = (a, b) => BigInt.asIntN(64, a << BigInt(b & 63)),
Long_shr = (a, b) => BigInt.asIntN(64, a >> BigInt(b & 63)),
Long_shru = (a, b) => BigInt.asIntN(64, BigInt.asUintN(64, a) >> BigInt(b & 63)),
$rt_createArray = (cls, sz) => {
    let data = new Array(sz);
    data.fill(null);
    return new ($rt_arraycls(cls))(data);
},
$rt_createUnfilledArray = (cls, sz) => new ($rt_arraycls(cls))(new Array(sz)),
$rt_createLongArrayFromData = data => {
    let buffer = new BigInt64Array(data.length);
    buffer.set(data);
    return new $rt_longArrayCls(buffer);
},
$rt_createCharArray = sz => new $rt_charArrayCls(new Uint16Array(sz)),
$rt_createByteArray = sz => new $rt_byteArrayCls(new Int8Array(sz)),
$rt_createShortArrayFromData = data => {
    let buffer = new Int16Array(data.length);
    buffer.set(data);
    return new $rt_shortArrayCls(buffer);
},
$rt_createIntArray = sz => new $rt_intArrayCls(new Int32Array(sz)),
$rt_createIntArrayFromData = data => {
    let buffer = new Int32Array(data.length);
    buffer.set(data);
    return new $rt_intArrayCls(buffer);
},
$rt_createBooleanArray = sz => new $rt_booleanArrayCls(new Int8Array(sz)),
$rt_createDoubleArray = sz => new $rt_doubleArrayCls(new Float64Array(sz)),
$rt_arraycls = cls => {
    let result = cls[$rt_meta].arrayType;
    if (result === null) {
        function JavaArray(data) {
            ($rt_objcls()).call(this);
            this.data = data;
        }
        JavaArray.prototype = Object.create(($rt_objcls()).prototype);
        JavaArray.prototype.type = cls;
        JavaArray.prototype.constructor = JavaArray;
        JavaArray.prototype.toString = function() {
            let str = "[";
            for (let i = 0;i < this.data.length;++i) {
                if (i > 0) {
                    str += ", ";
                }
                str += this.data[i].toString();
            }
            str += "]";
            return str;
        };
        JavaArray.prototype.$clone0 = function() {
            let dataCopy;
            if ('slice' in this.data) {
                dataCopy = this.data.slice();
            } else {
                dataCopy = new this.data.constructor(this.data.length);
                for (let i = 0;i < dataCopy.length;++i) {
                    dataCopy[i] = this.data[i];
                }
            }
            return new ($rt_arraycls(this.type))(dataCopy);
        };
        let name = "[" + cls[$rt_meta].binaryName;
        JavaArray[$rt_meta] = $rt_newClassMetadata({ name : name, binaryName : name, parent : $rt_objcls(), itemType : cls });
        result = JavaArray;
        cls[$rt_meta].arrayType = JavaArray;
    }
    return result;
},
$rt_createMultiArray = (cls, dimensions) => {
    let first = 0;
    for (let i = dimensions.length - 1;i >= 0;i = i - 1 | 0) {
        if (dimensions[i] === 0) {
            first = i;
            break;
        }
    }
    if (first > 0) {
        for (let i = 0;i < first;i = i + 1 | 0) {
            cls = $rt_arraycls(cls);
        }
        if (first === dimensions.length - 1) {
            return $rt_createArray(cls, dimensions[first]);
        }
    }
    let arrays = new Array($rt_primitiveArrayCount(dimensions, first));
    let firstDim = dimensions[first] | 0;
    for (let i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createArray(cls, firstDim);
    }
    return $rt_createMultiArrayImpl(cls, arrays, dimensions, first, 0);
},
$rt_createDoubleMultiArray = dimensions => {
    let arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_doublecls, dimensions);
    }
    let firstDim = dimensions[0] | 0;
    for (let i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createDoubleArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_doublecls, arrays, dimensions, 0);
},
$rt_primitiveArrayCount = (dimensions, start) => {
    let val = dimensions[start + 1] | 0;
    for (let i = start + 2;i < dimensions.length;i = i + 1 | 0) {
        val = val * (dimensions[i] | 0) | 0;
        if (val === 0) {
            break;
        }
    }
    return val;
},
$rt_createMultiArrayImpl = (cls, arrays, dimensions, start) => {
    let limit = arrays.length;
    for (let i = start + 1 | 0;i < dimensions.length;i = i + 1 | 0) {
        cls = $rt_arraycls(cls);
        let dim = dimensions[i];
        let index = 0;
        let packedIndex = 0;
        while (index < limit) {
            let arr = $rt_createUnfilledArray(cls, dim);
            for (let j = 0;j < dim;j = j + 1 | 0) {
                arr.data[j] = arrays[index];
                index = index + 1 | 0;
            }
            arrays[packedIndex] = arr;
            packedIndex = packedIndex + 1 | 0;
        }
        limit = packedIndex;
    }
    return arrays[0];
};
function $rt_arrayLength(array) {
    return array.data.length;
}
let $rt_stringPool_instance,
$rt_stringPool = strings => {
    $rt_stringClassInit();
    $rt_stringPool_instance = new Array(strings.length);
    for (let i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
},
$rt_s = index => $rt_stringPool_instance[index],
$rt_charArrayToString = (array, offset, count) => {
    let result = "";
    let limit = offset + count;
    for (let i = offset;i < limit;i = i + 1024 | 0) {
        let next = Math.min(limit, i + 1024 | 0);
        result += String.fromCharCode.apply(null, array.subarray(i, next));
    }
    return result;
},
$rt_fullArrayToString = array => $rt_charArrayToString(array, 0, array.length),
$rt_str = str => str === null ? null : jl_String__init_1(str),
$rt_ustr = str => str === null ? null : str.$nativeString,
$rt_stringClassInit = () => jl_String_$callClinit(),
$rt_intern;
{
    $rt_intern = str => str;
}
let $rt_isInstance = (obj, cls) => obj instanceof $rt_objcls() && !!obj.constructor[$rt_meta] && $rt_isAssignable(obj.constructor, cls),
$rt_isAssignable = (from, to) => {
    if (from === to) {
        return true;
    }
    let map = from[$rt_meta].assignableCache;
    if (map === null) {
        map = new Map();
        from[$rt_meta].assignableCache = map;
    }
    let cachedResult = map.get(to);
    if (typeof cachedResult !== 'undefined') {
        return cachedResult;
    }
    if (to[$rt_meta].itemType !== null) {
        let result = from[$rt_meta].itemType !== null && $rt_isAssignable(from[$rt_meta].itemType, to[$rt_meta].itemType);
        map.set(to, result);
        return result;
    }
    let parent = from[$rt_meta].parent;
    if (parent !== null && parent !== from) {
        if ($rt_isAssignable(parent, to)) {
            map.set(to, true);
            return true;
        }
    }
    let superinterfaces = from[$rt_meta].superinterfaces;
    for (let i = 0;i < superinterfaces.length;i = i + 1 | 0) {
        if ($rt_isAssignable(superinterfaces[i], to)) {
            map.set(to, true);
            return true;
        }
    }
    map.set(to, false);
    return false;
},
$rt_throw = ex => {
    throw $rt_exception(ex);
},
$rt_javaExceptionProp = Symbol("javaException"),
$rt_exception = ex => {
    if (!ex.$jsException) {
        $rt_fillNativeException(ex);
    }
    return ex.$jsException;
},
$rt_fillNativeException = ex => {
    let javaCause = $rt_throwableCause(ex);
    let jsCause = javaCause !== null ? javaCause.$jsException : void 0;
    let cause = typeof jsCause === "object" ? { cause : jsCause } : void 0;
    let err = new JavaError("Java exception thrown", cause);
    if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(err);
    }
    err[$rt_javaExceptionProp] = ex;
    ex.$jsException = err;
    $rt_fillStack(err, ex);
},
$rt_fillStack = (err, ex) => {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        let stack = $rt_decodeStack(err.stack);
        let javaStack = $rt_createArray($rt_stecls(), stack.length);
        let elem;
        let noStack = false;
        for (let i = 0;i < stack.length;++i) {
            let element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
},
JavaError;
if (typeof Reflect === 'object') {
    let defaultMessage = Symbol("defaultMessage");
    JavaError = function JavaError(message, cause) {
        let self = Reflect.construct(Error, [void 0, cause], JavaError);
        Object.setPrototypeOf(self, JavaError.prototype);
        self[defaultMessage] = message;
        return self;
    }
    ;
    JavaError.prototype = Object.create(Error.prototype, { constructor : { configurable : true, writable : true, value : JavaError }, message : { get() {
        try {
            let javaException = this[$rt_javaExceptionProp];
            if (typeof javaException === 'object') {
                let javaMessage = $rt_throwableMessage(javaException);
                if (typeof javaMessage === "object") {
                    return javaMessage !== null ? javaMessage.toString() : null;
                }
            }
            return this[defaultMessage];
        } catch (e){
            return "Exception occurred trying to extract Java exception message: " + e;
        }
    } } });
} else {
    JavaError = Error;
}
let $rt_javaException = e => e instanceof Error && typeof e[$rt_javaExceptionProp] === 'object' ? e[$rt_javaExceptionProp] : null,
$rt_wrapException = err => {
    let ex = err[$rt_javaExceptionProp];
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
},
$rt_createException = message => jl_RuntimeException__init_0(message),
$rt_throwableMessage = t => jl_Throwable_getMessage(t),
$rt_throwableCause = t => jl_Throwable_getCause(t),
$rt_stecls = () => $rt_objcls(),
$rt_createStackElement = (className, methodName, fileName, lineNumber) => {
    {
        return null;
    }
},
$rt_setStack = (e, stack) => {
},
$rt_packageData = null,
$rt_packages = data => {
    let i = 0;
    let packages = new Array(data.length);
    for (let j = 0;j < data.length;++j) {
        let prefixIndex = data[i++];
        let prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
},
$rt_allClasses = [],
$rt_metadata = data => {
    let packages = $rt_packageData;
    let i = 0;
    while (i < data.length) {
        let cls = data[i++];
        $rt_allClasses.push(cls);
        let m = $rt_newClassMetadata();
        cls[$rt_meta] = m;
        let className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            let packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        let superclass = data[i++];
        m.parent = superclass !== 0 ? superclass : null;
        m.superinterfaces = data[i++];
        if (m.parent) {
            cls.prototype = Object.create(m.parent.prototype);
        } else {
            cls.prototype = {  };
        }
        cls.prototype.constructor = cls;
        m.modifiers = data[i++];
        m.primitiveKind = 0;
        let innerClassInfo = data[i++];
        if (innerClassInfo !== 0) {
            let enclosingClass = innerClassInfo[0];
            m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
            let declaringClass = innerClassInfo[1];
            m.declaringClass = declaringClass !== 0 ? declaringClass : null;
            let simpleName = innerClassInfo[2];
            m.simpleName = simpleName !== 0 ? simpleName : null;
        }
        let clinit = data[i++];
        m.clinit = clinit !== 0 ? () => {
            m.clinit = () => {
            };
            clinit();
        } : () => {
        };
        let virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (let j = 0;j < virtualMethods.length;j += 2) {
                let name = virtualMethods[j];
                let func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (let k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
    }
},
$rt_startThread = (runner, callback) => {
    let result;
    try {
        result = runner();
    } catch (e){
        result = e;
    }
    if (typeof callback !== 'undefined') {
        callback(result);
    } else if (result instanceof Error) {
        throw result;
    }
};
function jl_Object() {
    this.$id$ = 0;
}
let jl_Object_getClass = $this => {
    return $rt_cls(jl_Object_getClassInfo($this));
},
jl_Object_getClassInfo = var$0 => {
    return var$0.constructor;
},
jl_Object_toString = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10;
    var$1 = jl_Class_getName(jl_Object_getClass(var$0));
    var$2 = var$0;
    if (!var$2.$id$)
        var$2.$id$ = $rt_nextId();
    var$3 = var$0.$id$;
    jl_Integer_$callClinit();
    if (!var$3)
        var$4 = $rt_s(0);
    else {
        var$5 = (((32 - jl_Integer_numberOfLeadingZeros(var$3) | 0) + 4 | 0) - 1 | 0) / 4 | 0;
        var$6 = $rt_createCharArray(var$5);
        var$7 = var$6.data;
        var$8 = (var$5 - 1 | 0) * 4 | 0;
        var$9 = 0;
        while (var$8 >= 0) {
            var$10 = var$9 + 1 | 0;
            var$7[var$9] = jl_Character_forDigit((var$3 >>> var$8 | 0) & 15, 16);
            var$8 = var$8 - 4 | 0;
            var$9 = var$10;
        }
        var$4 = jl_String__init_(var$6);
    }
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    var$1 = jl_StringBuilder_append(var$2, var$1);
    jl_AbstractStringBuilder_append(var$1, 64);
    jl_StringBuilder_append(var$1, var$4);
    return jl_AbstractStringBuilder_toString(var$2);
},
jl_Object_clone = $this => {
    let $cls, $result, var$3;
    $cls = (jl_Object_getClass($this)).$classInfo;
    if (!$rt_isInstance($this, jl_Cloneable) && $cls[$rt_meta].itemType === null) {
        $cls = new jl_CloneNotSupportedException;
        jl_Exception__init_($cls);
        $rt_throw($cls);
    }
    $result = otp_Platform_clone($this);
    $cls = $result;
    var$3 = $rt_nextId();
    $cls.$id$ = var$3;
    return $result;
},
ji_Serializable = $rt_classWithoutFields(0),
jl_Comparable = $rt_classWithoutFields(0),
jl_CharSequence = $rt_classWithoutFields(0);
function jl_String() {
    jl_Object.call(this);
    this.$hashCode0 = 0;
}
let jl_String_EMPTY_CHARS = null,
jl_String_EMPTY = null,
jl_String_CASE_INSENSITIVE_ORDER = null,
jl_String_$callClinit = () => {
    jl_String_$callClinit = $rt_eraseClinit(jl_String);
    jl_String__clinit_();
},
jl_String__init_5 = $this => {
    jl_String_$callClinit();
    $this.$nativeString = "";
},
jl_String__init_3 = () => {
    let var_0 = new jl_String();
    jl_String__init_5(var_0);
    return var_0;
},
jl_String__init_2 = ($this, $characters) => {
    jl_String_$callClinit();
    $this.$nativeString = $rt_charArrayToString($characters.data, 0, $characters.data.length);
},
jl_String__init_ = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_2(var_1, var_0);
    return var_1;
},
jl_String__init_6 = (var$0, var$1) => {
    var$0.$nativeString = var$1;
},
jl_String__init_1 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_6(var_1, var_0);
    return var_1;
},
jl_String__init_4 = (var$0, var$1, $offset, $count) => {
    let var$4, var$5;
    jl_String_$callClinit();
    var$4 = var$1.data.length;
    if ($offset >= 0 && $count >= 0 && $count <= (var$4 - $offset | 0)) {
        var$0.$nativeString = $rt_charArrayToString(var$1.data, $offset, $count);
        return;
    }
    var$5 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_(var$5);
    $rt_throw(var$5);
},
jl_String__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jl_String();
    jl_String__init_4(var_3, var_0, var_1, var_2);
    return var_3;
},
jl_String_charAt = ($this, $index) => {
    let var$2;
    if ($index >= 0 && $index < $this.$nativeString.length)
        return $this.$nativeString.charCodeAt($index);
    var$2 = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_(var$2);
    $rt_throw(var$2);
},
jl_String_length = $this => {
    return $this.$nativeString.length;
},
jl_String_isEmpty = $this => {
    return $this.$nativeString.length ? 0 : 1;
},
jl_String_isBlank = $this => {
    let $i;
    $i = 0;
    while ($i < $this.$nativeString.length) {
        if ($this.$nativeString.charCodeAt($i) != 32)
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
},
jl_String_compareTo = ($this, $anotherString) => {
    let $l, $i, $a;
    if ($this === $anotherString)
        return 0;
    $l = jl_Math_min($this.$nativeString.length, $anotherString.$nativeString.length);
    $i = 0;
    while (true) {
        if ($i >= $l)
            return $this.$nativeString.length - $anotherString.$nativeString.length | 0;
        $a = jl_String_charAt($this, $i) - jl_String_charAt($anotherString, $i) | 0;
        if ($a)
            break;
        $i = $i + 1 | 0;
    }
    return $a;
},
jl_String_startsWith0 = ($this, $prefix, $toffset) => {
    let $i, var$4, var$5;
    if (($toffset + $prefix.$nativeString.length | 0) > $this.$nativeString.length)
        return 0;
    $i = 0;
    while ($i < $prefix.$nativeString.length) {
        var$4 = jl_String_charAt($prefix, $i);
        var$5 = $toffset + 1 | 0;
        if (var$4 != jl_String_charAt($this, $toffset))
            return 0;
        $i = $i + 1 | 0;
        $toffset = var$5;
    }
    return 1;
},
jl_String_startsWith = ($this, $prefix) => {
    if ($this === $prefix)
        return 1;
    return jl_String_startsWith0($this, $prefix, 0);
},
jl_String_regionMatches = ($this, $ignoreCase, $toffset, $other, $ooffset, $len) => {
    let $i, var$7, $a, var$9, $b;
    if ($toffset >= 0 && $ooffset >= 0 && ($toffset + $len | 0) <= $this.$nativeString.length && ($ooffset + $len | 0) <= $other.$nativeString.length) {
        $i = 0;
        while ($i < $len) {
            var$7 = $toffset + 1 | 0;
            $a = jl_String_charAt($this, $toffset);
            var$9 = $ooffset + 1 | 0;
            $b = jl_String_charAt($other, $ooffset);
            if ($ignoreCase) {
                $a = jl_Character_toLowerCase($a);
                $b = jl_Character_toLowerCase($b);
            }
            if ($a != $b)
                return 0;
            $i = $i + 1 | 0;
            $toffset = var$7;
            $ooffset = var$9;
        }
        return 1;
    }
    return 0;
},
jl_String_indexOf = ($this, $ch, $fromIndex) => {
    let $i, $bmpChar, $hi, $lo;
    $i = jl_Math_max(0, $fromIndex);
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            if ($i >= $this.$nativeString.length)
                return (-1);
            if ($this.$nativeString.charCodeAt($i) == $bmpChar)
                break;
            $i = $i + 1 | 0;
        }
        return $i;
    }
    $hi = jl_Character_highSurrogate($ch);
    $lo = jl_Character_lowSurrogate($ch);
    while (true) {
        if ($i >= ($this.$nativeString.length - 1 | 0))
            return (-1);
        if ($this.$nativeString.charCodeAt($i) == $hi && $this.$nativeString.charCodeAt(($i + 1 | 0)) == $lo)
            break;
        $i = $i + 1 | 0;
    }
    return $i;
},
jl_String_lastIndexOf = ($this, $ch, $fromIndex) => {
    let $i, $bmpChar, $hi, $lo;
    $i = jl_Math_min($fromIndex, $this.$nativeString.length - 1 | 0);
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            if ($i < 0)
                return (-1);
            if ($this.$nativeString.charCodeAt($i) == $bmpChar)
                break;
            $i = $i + (-1) | 0;
        }
        return $i;
    }
    $hi = jl_Character_highSurrogate($ch);
    $lo = jl_Character_lowSurrogate($ch);
    while (true) {
        if ($i < 1)
            return (-1);
        if ($this.$nativeString.charCodeAt($i) == $lo) {
            $fromIndex = $i - 1 | 0;
            if ($this.$nativeString.charCodeAt($fromIndex) == $hi)
                break;
        }
        $i = $i + (-1) | 0;
    }
    return $fromIndex;
},
jl_String_lastIndexOf0 = ($this, $ch) => {
    return jl_String_lastIndexOf($this, $ch, $this.$nativeString.length - 1 | 0);
},
jl_String_indexOf0 = ($this, $str, $fromIndex) => {
    let $i, $toIndex, $j;
    $i = jl_Math_max(0, $fromIndex);
    $toIndex = $this.$nativeString.length - $str.$nativeString.length | 0;
    a: while (true) {
        if ($i > $toIndex)
            return (-1);
        $j = 0;
        while (true) {
            if ($j >= $str.$nativeString.length)
                break a;
            if (jl_String_charAt($this, $i + $j | 0) != jl_String_charAt($str, $j))
                break;
            $j = $j + 1 | 0;
        }
        $i = $i + 1 | 0;
    }
    return $i;
},
jl_String_substring = ($this, $beginIndex, $endIndex) => {
    let $length, var$4, var$5;
    $length = $this.$nativeString.length;
    var$4 = $rt_compare($beginIndex, $endIndex);
    if (!var$4)
        return jl_String_EMPTY;
    if (!$beginIndex && $endIndex == $length)
        return $this;
    if ($beginIndex >= 0 && var$4 <= 0 && $endIndex <= $length)
        return jl_String__init_1($this.$nativeString.substring($beginIndex, $endIndex));
    var$5 = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_(var$5);
    $rt_throw(var$5);
},
jl_String_substring0 = ($this, $beginIndex) => {
    return jl_String_substring($this, $beginIndex, $this.$nativeString.length);
},
jl_String_contains = ($this, $s) => {
    let $i, $sz, $j;
    $i = $this.$nativeString.length;
    $s = $s;
    $sz = $i - $s.$nativeString.length | 0;
    $i = 0;
    while ($i <= $sz) {
        $j = 0;
        while (true) {
            if ($j >= $s.$nativeString.length)
                return 1;
            if (jl_String_charAt($this, $i + $j | 0) != jl_String_charAt($s, $j))
                break;
            $j = $j + 1 | 0;
        }
        $i = $i + 1 | 0;
    }
    return 0;
},
jl_String_replace = ($this, $target, $replacement) => {
    let $sb, $i, $sz, var$6, var$7, $i_0, $j;
    if ($target === $replacement)
        return $this;
    $target = $target;
    if (jl_String_isEmpty($target)) {
        $sb = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($sb);
        $i = 0;
        while ($i < $this.$nativeString.length) {
            jl_StringBuilder_append($sb, $replacement);
            jl_AbstractStringBuilder_append($sb, jl_String_charAt($this, $i));
            $i = $i + 1 | 0;
        }
        jl_StringBuilder_append($sb, $replacement);
        return jl_AbstractStringBuilder_toString($sb);
    }
    if ($target.$nativeString.length == 1) {
        $sb = $replacement;
        if ($sb.$nativeString.length == 1) {
            $i = jl_String_charAt($target, 0);
            $sz = jl_String_charAt($sb, 0);
            if ($i != $sz) {
                var$6 = $rt_createCharArray($this.$nativeString.length);
                var$7 = var$6.data;
                $i_0 = 0;
                while ($i_0 < $this.$nativeString.length) {
                    var$7[$i_0] = jl_String_charAt($this, $i_0) != $i ? jl_String_charAt($this, $i_0) : $sz;
                    $i_0 = $i_0 + 1 | 0;
                }
                $this = jl_String__init_3();
                $this.$nativeString = $rt_fullArrayToString(var$6.data);
            }
            return $this;
        }
    }
    $sb = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($sb);
    $sz = $this.$nativeString.length - $target.$nativeString.length | 0;
    $i_0 = 0;
    while ($i_0 <= $sz) {
        $j = 0;
        a: {
            while (true) {
                if ($j >= $target.$nativeString.length) {
                    jl_StringBuilder_append($sb, $replacement);
                    $i_0 = $i_0 + ($target.$nativeString.length - 1 | 0) | 0;
                    break a;
                }
                if (jl_String_charAt($this, $i_0 + $j | 0) != jl_String_charAt($target, $j))
                    break;
                $j = $j + 1 | 0;
            }
            jl_AbstractStringBuilder_append($sb, jl_String_charAt($this, $i_0));
        }
        $i_0 = $i_0 + 1 | 0;
    }
    jl_StringBuilder_append($sb, jl_String_substring0($this, $i_0));
    return jl_AbstractStringBuilder_toString($sb);
},
jl_String_toString = $this => {
    return $this;
},
jl_String_toCharArray = $this => {
    let $array, var$2, $i, var$4;
    $array = $rt_createCharArray($this.$nativeString.length);
    var$2 = $array.data;
    $i = 0;
    var$4 = var$2.length;
    while ($i < var$4) {
        var$2[$i] = jl_String_charAt($this, $i);
        $i = $i + 1 | 0;
    }
    return $array;
},
jl_String_valueOf = $obj => {
    jl_String_$callClinit();
    return $obj === null ? $rt_s(1) : $obj.$toString();
},
jl_String_valueOf0 = $i => {
    let var$2;
    jl_String_$callClinit();
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    return jl_AbstractStringBuilder_toString(jl_StringBuilder_append0(var$2, $i));
},
jl_String_equals = ($this, $other) => {
    let $str;
    if ($this === $other)
        return 1;
    if (!($other instanceof jl_String))
        return 0;
    $str = $other;
    return $this.$nativeString !== $str.$nativeString ? 0 : 1;
},
jl_String_hashCode = $this => {
    let $i;
    a: {
        if (!$this.$hashCode0) {
            $i = 0;
            while (true) {
                if ($i >= $this.$nativeString.length)
                    break a;
                $this.$hashCode0 = (31 * $this.$hashCode0 | 0) + $this.$nativeString.charCodeAt($i) | 0;
                $i = $i + 1 | 0;
            }
        }
    }
    return $this.$hashCode0;
},
jl_String_split = ($this, $regex) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    $regex = jur_Pattern_compile($regex);
    var$2 = $this;
    var$3 = ju_ArrayList__init_();
    $regex = jur_Pattern_matcher($regex, var$2);
    var$4 = 0;
    var$5 = 0;
    var$2 = var$2;
    if (!var$2.$nativeString.length) {
        var$6 = $rt_createArray(jl_String, 1);
        var$6.data[0] = $rt_s(2);
    } else {
        while (jur_Matcher_find($regex)) {
            var$4 = var$4 + 1 | 0;
            ju_ArrayList_add(var$3, jl_String_substring(var$2, var$5, jur_Matcher_start($regex)));
            var$5 = jur_Matcher_end($regex);
        }
        ju_ArrayList_add(var$3, jl_String_substring(var$2, var$5, var$2.$nativeString.length));
        var$7 = var$4 + 1 | 0;
        while (true) {
            var$7 = var$7 + (-1) | 0;
            if (var$7 < 0)
                break;
            if ((ju_ArrayList_get(var$3, var$7)).$nativeString.length)
                break;
            ju_ArrayList_remove(var$3, var$7);
        }
        if (var$7 < 0)
            var$7 = 0;
        var$6 = $rt_createArray(jl_String, var$7);
        var$8 = var$6.data;
        $regex = var$3;
        var$5 = $regex.$size;
        var$7 = var$8.length;
        if (var$7 < var$5)
            var$6 = jlr_Array_newInstance(jl_Class_getComponentType(jl_Object_getClass(var$6)), var$5);
        else
            while (var$5 < var$7) {
                var$8[var$5] = null;
                var$5 = var$5 + 1 | 0;
            }
        var$7 = 0;
        var$3 = ju_AbstractList_iterator($regex);
        while (ju_AbstractList$1_hasNext(var$3)) {
            var$8 = var$6.data;
            var$4 = var$7 + 1 | 0;
            var$8[var$7] = ju_AbstractList$1_next(var$3);
            var$7 = var$4;
        }
        var$6 = var$6;
    }
    return var$6;
},
jl_String__clinit_ = () => {
    jl_String_EMPTY_CHARS = $rt_createCharArray(0);
    jl_String_EMPTY = jl_String__init_3();
    jl_String_CASE_INSENSITIVE_ORDER = new jl_String$_clinit_$lambda$_118_0;
},
jlr_AnnotatedElement = $rt_classWithoutFields(0),
jlr_GenericDeclaration = $rt_classWithoutFields(0),
jlr_Type = $rt_classWithoutFields(0);
function jl_Class() {
    let a = this; jl_Object.call(a);
    a.$flags1 = 0;
    a.$classInfo = null;
    a.$name0 = null;
    a.$simpleName = null;
}
let jl_Class_createClass = $classInfo => {
    let var$2;
    var$2 = new jl_Class;
    var$2.$classInfo = $classInfo;
    return var$2;
},
jl_Class_getName = $this => {
    let var$1, $metadataName, $result, $itemType, $itemName;
    var$1 = $this.$flags1;
    if (!(var$1 & 1)) {
        $this.$flags1 = var$1 | 1;
        $metadataName = $this.$classInfo[$rt_meta].name;
        $result = $metadataName === null ? null : $rt_str($metadataName);
        if ($result === null) {
            $itemType = $this.$classInfo[$rt_meta].itemType;
            if ($itemType !== null) {
                $itemName = jl_Class_getName($rt_cls($itemType));
                if ($itemName !== null) {
                    if ($itemType[$rt_meta].itemType !== null) {
                        $metadataName = new jl_StringBuilder;
                        jl_AbstractStringBuilder__init_($metadataName);
                        jl_AbstractStringBuilder_append($metadataName, 91);
                        jl_StringBuilder_append($metadataName, $itemName);
                        $result = jl_AbstractStringBuilder_toString($metadataName);
                    } else {
                        $metadataName = new jl_StringBuilder;
                        jl_AbstractStringBuilder__init_($metadataName);
                        jl_AbstractStringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($metadataName, $rt_s(3)), $itemName), 59);
                        $result = jl_AbstractStringBuilder_toString($metadataName);
                    }
                }
            }
        }
        $this.$name0 = $result;
    }
    return $this.$name0;
},
jl_Class_getSimpleName = $this => {
    let $lastDot, $metadataName, $result, $lastDollar;
    $lastDot = $this.$flags1;
    if (!($lastDot & 2)) {
        $this.$flags1 = $lastDot | 2;
        $metadataName = $this.$classInfo[$rt_meta].simpleName;
        $result = $metadataName === null ? null : $rt_str($metadataName);
        if ($result === null) {
            if ($this.$classInfo[$rt_meta].itemType !== null) {
                $metadataName = jl_Class_getSimpleName($rt_cls($this.$classInfo[$rt_meta].itemType));
                $result = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_($result);
                jl_StringBuilder_append(jl_StringBuilder_append($result, $metadataName), $rt_s(4));
                $result = jl_AbstractStringBuilder_toString($result);
            } else {
                $metadataName = $this.$classInfo[$rt_meta].enclosingClass;
                if (($metadataName === null ? null : $rt_cls($metadataName)) !== null)
                    $result = $rt_s(2);
                else {
                    $result = jl_Class_getName($this);
                    $lastDollar = jl_String_lastIndexOf0($result, 36);
                    if ($lastDollar == (-1)) {
                        $lastDot = jl_String_lastIndexOf0($result, 46);
                        if ($lastDot != (-1))
                            $result = jl_String_substring0($result, $lastDot + 1 | 0);
                    } else {
                        $result = jl_String_substring0($result, $lastDollar + 1 | 0);
                        if (jl_String_charAt($result, 0) >= 48 && jl_String_charAt($result, 0) <= 57)
                            $result = $rt_s(2);
                    }
                }
            }
        }
        $this.$simpleName = $result;
    }
    return $this.$simpleName;
},
jl_Class_isPrimitive = $this => {
    return !$this.$classInfo[$rt_meta].primitiveKind ? 0 : 1;
},
jl_Class_getComponentType = $this => {
    let $itemTypeInfo;
    $itemTypeInfo = $this.$classInfo[$rt_meta].itemType;
    return $itemTypeInfo === null ? null : $rt_cls($itemTypeInfo);
},
jl_Number = $rt_classWithoutFields();
function jl_Integer() {
    jl_Number.call(this);
    this.$value9 = 0;
}
let jl_Integer_TYPE = null,
jl_Integer_integerCache = null,
jl_Integer_$callClinit = () => {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
},
jl_Integer__init_0 = ($this, $value) => {
    jl_Integer_$callClinit();
    $this.$value9 = $value;
},
jl_Integer__init_ = var_0 => {
    let var_1 = new jl_Integer();
    jl_Integer__init_0(var_1, var_0);
    return var_1;
},
jl_Integer_toString = $i => {
    jl_Integer_$callClinit();
    return (jl_AbstractStringBuilder_append2(jl_AbstractStringBuilder__init_1(20), $i, 10)).$toString();
},
jl_Integer_parseInt = ($s, $radix) => {
    jl_Integer_$callClinit();
    if ($s !== null)
        return jl_Integer_parseIntImpl($s, 0, $s.$nativeString.length, $radix);
    $s = new jl_NumberFormatException;
    jl_Exception__init_0($s, $rt_s(5));
    $rt_throw($s);
},
jl_Integer_parseIntImpl = ($s, $beginIndex, $endIndex, $radix) => {
    let $negative, var$6, $value, $maxValue, var$9, $digit, var$11, var$12;
    jl_Integer_$callClinit();
    if ($beginIndex == $endIndex) {
        $s = new jl_NumberFormatException;
        jl_Exception__init_0($s, $rt_s(6));
        $rt_throw($s);
    }
    if ($radix >= 2 && $radix <= 36) {
        a: {
            $negative = 0;
            $s = $s;
            switch (jl_String_charAt($s, $beginIndex)) {
                case 43:
                    var$6 = $beginIndex + 1 | 0;
                    break a;
                case 45:
                    $negative = 1;
                    var$6 = $beginIndex + 1 | 0;
                    break a;
                default:
            }
            var$6 = $beginIndex;
        }
        $value = 0;
        $maxValue = 1 + (2147483647 / $radix | 0) | 0;
        if (var$6 == $endIndex) {
            $s = new jl_NumberFormatException;
            jl_Exception__init_($s);
            $rt_throw($s);
        }
        while (var$6 < $endIndex) {
            var$9 = var$6 + 1 | 0;
            $digit = jl_String_charAt($s, var$6);
            $digit = $digit >= 48 && $digit <= 57 ? $digit - 48 | 0 : $digit >= 97 && $digit <= 122 ? ($digit - 97 | 0) + 10 | 0 : $digit >= 65 && $digit <= 90 ? ($digit - 65 | 0) + 10 | 0 : (-1);
            if ($digit < 0) {
                var$11 = new jl_NumberFormatException;
                $s = jl_String_valueOf(jl_String_substring($s, $beginIndex, $endIndex));
                var$12 = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_(var$12);
                jl_StringBuilder_append(jl_StringBuilder_append(var$12, $rt_s(7)), $s);
                jl_Exception__init_0(var$11, jl_AbstractStringBuilder_toString(var$12));
                $rt_throw(var$11);
            }
            if ($digit >= $radix) {
                var$11 = new jl_NumberFormatException;
                $s = jl_String_valueOf(jl_String_substring($s, $beginIndex, $endIndex));
                var$12 = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_(var$12);
                jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$12, $rt_s(8)), $radix), $rt_s(9)), $s);
                jl_Exception__init_0(var$11, jl_AbstractStringBuilder_toString(var$12));
                $rt_throw(var$11);
            }
            if ($value > $maxValue) {
                $s = new jl_NumberFormatException;
                jl_Exception__init_0($s, $rt_s(10));
                $rt_throw($s);
            }
            $value = $rt_imul($radix, $value) + $digit | 0;
            if ($value < 0) {
                if (var$9 == $endIndex && $value == (-2147483648) && $negative)
                    return (-2147483648);
                var$11 = new jl_NumberFormatException;
                $s = jl_String_valueOf(jl_String_substring($s, $beginIndex, $endIndex));
                var$12 = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_(var$12);
                jl_StringBuilder_append(jl_StringBuilder_append(var$12, $rt_s(11)), $s);
                jl_Exception__init_0(var$11, jl_AbstractStringBuilder_toString(var$12));
                $rt_throw(var$11);
            }
            var$6 = var$9;
        }
        if ($negative)
            $value =  -$value | 0;
        return $value;
    }
    $s = new jl_NumberFormatException;
    var$11 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$11);
    jl_StringBuilder_append0(jl_StringBuilder_append(var$11, $rt_s(12)), $radix);
    jl_Exception__init_0($s, jl_AbstractStringBuilder_toString(var$11));
    $rt_throw($s);
},
jl_Integer_parseInt0 = $s => {
    jl_Integer_$callClinit();
    return jl_Integer_parseInt($s, 10);
},
jl_Integer_numberOfLeadingZeros = $i => {
    let $n, var$3;
    jl_Integer_$callClinit();
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i >>> 16 | 0;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    $i = var$3 >>> 8 | 0;
    if (!$i)
        $i = var$3;
    else
        $n = $n | 8;
    var$3 = $i >>> 4 | 0;
    if (!var$3)
        var$3 = $i;
    else
        $n = $n | 4;
    $i = var$3 >>> 2 | 0;
    if (!$i)
        $i = var$3;
    else
        $n = $n | 2;
    if ($i >>> 1 | 0)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
},
jl_Integer_numberOfTrailingZeros = $i => {
    let $n, var$3;
    jl_Integer_$callClinit();
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i << 16;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    $i = var$3 << 8;
    if (!$i)
        $i = var$3;
    else
        $n = $n | 8;
    var$3 = $i << 4;
    if (!var$3)
        var$3 = $i;
    else
        $n = $n | 4;
    $i = var$3 << 2;
    if (!$i)
        $i = var$3;
    else
        $n = $n | 2;
    if ($i << 1)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
},
jl_Integer__clinit_ = () => {
    jl_Integer_TYPE = $rt_cls($rt_intcls);
};
function jl_AbstractStringBuilder() {
    let a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length0 = 0;
}
let jl_AbstractStringBuilder__init_ = $this => {
    jl_AbstractStringBuilder__init_0($this, 16);
},
jl_AbstractStringBuilder__init_2 = () => {
    let var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_(var_0);
    return var_0;
},
jl_AbstractStringBuilder__init_0 = ($this, $capacity) => {
    $this.$buffer = $rt_createCharArray($capacity);
},
jl_AbstractStringBuilder__init_1 = var_0 => {
    let var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_1, var_0);
    return var_1;
},
jl_AbstractStringBuilder_append0 = ($this, $string) => {
    return $this.$insert($this.$length0, $string);
},
jl_AbstractStringBuilder_insert = ($this, $index, $string) => {
    let $i, $i_0, var$5, var$6;
    if ($index >= 0 && $index <= $this.$length0) {
        if ($string === null)
            $string = $rt_s(1);
        else if (jl_String_isEmpty($string))
            return $this;
        $this.$ensureCapacity($this.$length0 + $string.$nativeString.length | 0);
        $i = $this.$length0 - 1 | 0;
        while ($i >= $index) {
            $this.$buffer.data[$i + $string.$nativeString.length | 0] = $this.$buffer.data[$i];
            $i = $i + (-1) | 0;
        }
        $this.$length0 = $this.$length0 + $string.$nativeString.length | 0;
        $i_0 = 0;
        while ($i_0 < $string.$nativeString.length) {
            var$5 = $this.$buffer.data;
            var$6 = $index + 1 | 0;
            var$5[$index] = jl_String_charAt($string, $i_0);
            $i_0 = $i_0 + 1 | 0;
            $index = var$6;
        }
        return $this;
    }
    $string = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_($string);
    $rt_throw($string);
},
jl_AbstractStringBuilder_append2 = ($this, $value, $radix) => {
    return jl_AbstractStringBuilder_insert3($this, $this.$length0, $value, $radix);
},
jl_AbstractStringBuilder_insert3 = ($this, $target, $value, $radix) => {
    let $positive, var$5, var$6, $pos, $sz, $posLimit, var$10;
    $positive = 1;
    if ($value < 0) {
        $positive = 0;
        $value =  -$value | 0;
    }
    a: {
        if ($rt_ucmp($value, $radix) < 0) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$5 = $this.$buffer.data;
                var$6 = $target + 1 | 0;
                var$5[$target] = 45;
                $target = var$6;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit($value, $radix);
        } else {
            $pos = 1;
            $sz = 1;
            $posLimit = $rt_udiv((-1), $radix);
            b: {
                while (true) {
                    var$10 = $rt_imul($pos, $radix);
                    if ($rt_ucmp(var$10, $value) > 0) {
                        var$10 = $pos;
                        break b;
                    }
                    $sz = $sz + 1 | 0;
                    if ($rt_ucmp(var$10, $posLimit) > 0)
                        break;
                    $pos = var$10;
                }
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                $positive = $target;
            else {
                var$5 = $this.$buffer.data;
                $positive = $target + 1 | 0;
                var$5[$target] = 45;
            }
            while (true) {
                if (!var$10)
                    break a;
                var$5 = $this.$buffer.data;
                $target = $positive + 1 | 0;
                var$5[$positive] = jl_Character_forDigit($rt_udiv($value, var$10), $radix);
                $value = $rt_umod($value, var$10);
                var$10 = $rt_udiv(var$10, $radix);
                $positive = $target;
            }
        }
    }
    return $this;
},
jl_AbstractStringBuilder_insert2 = ($this, $target, $value) => {
    let $intDigit, var$4, $number, $mantissa, $exp, $negative, $intPart, $sz, $digits, $zeros, $leadingZeros, $leadingZero, $pos, $i;
    $intDigit = $rt_compare_less($value, 0.0);
    if (!$intDigit) {
        if (1.0 / $value === Infinity) {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
            var$4 = $this.$buffer.data;
            $intDigit = $target + 1 | 0;
            var$4[$target] = 48;
            $target = $intDigit + 1 | 0;
            var$4[$intDigit] = 46;
            var$4[$target] = 48;
            return $this;
        }
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 4 | 0);
        var$4 = $this.$buffer.data;
        $intDigit = $target + 1 | 0;
        var$4[$target] = 45;
        $target = $intDigit + 1 | 0;
        var$4[$intDigit] = 48;
        $intDigit = $target + 1 | 0;
        var$4[$target] = 46;
        var$4[$intDigit] = 48;
        return $this;
    }
    if (isNaN($value) ? 1 : 0) {
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
        var$4 = $this.$buffer.data;
        $intDigit = $target + 1 | 0;
        var$4[$target] = 78;
        $target = $intDigit + 1 | 0;
        var$4[$intDigit] = 97;
        var$4[$target] = 78;
        return $this;
    }
    if (jl_Double_isInfinite($value)) {
        if ($intDigit > 0) {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 8 | 0);
            $intDigit = $target;
        } else {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 9 | 0);
            var$4 = $this.$buffer.data;
            $intDigit = $target + 1 | 0;
            var$4[$target] = 45;
        }
        var$4 = $this.$buffer.data;
        $target = $intDigit + 1 | 0;
        var$4[$intDigit] = 73;
        $intDigit = $target + 1 | 0;
        var$4[$target] = 110;
        $target = $intDigit + 1 | 0;
        var$4[$intDigit] = 102;
        $intDigit = $target + 1 | 0;
        var$4[$target] = 105;
        $target = $intDigit + 1 | 0;
        var$4[$intDigit] = 110;
        $intDigit = $target + 1 | 0;
        var$4[$target] = 105;
        $target = $intDigit + 1 | 0;
        var$4[$intDigit] = 116;
        var$4[$target] = 121;
        return $this;
    }
    jl_AbstractStringBuilder$Constants_$callClinit();
    $number = jl_AbstractStringBuilder$Constants_doubleAnalysisResult;
    otcit_DoubleAnalyzer_analyze($value, $number);
    $mantissa = $number.$mantissa;
    $exp = $number.$exponent;
    $negative = $number.$sign0;
    $intPart = 1;
    $sz = 1;
    if ($negative)
        $sz = 2;
    $digits = 18;
    $zeros = jl_AbstractStringBuilder_trailingDecimalZeros($mantissa);
    if ($zeros > 0)
        $digits = $digits - $zeros | 0;
    $leadingZeros = 0;
    $leadingZero = 0;
    if ($exp < 7 && $exp >= (-3)) {
        if ($exp >= 0) {
            $intPart = $exp + 1 | 0;
            $digits = jl_Math_max($digits, $intPart + 1 | 0);
            $exp = 0;
        } else {
            $intPart = 0;
            $leadingZeros = ( -$exp | 0) - 1 | 0;
            $leadingZero = 1;
            $sz = $sz + 1 | 0;
            $exp = 0;
        }
    }
    if ($exp) {
        $sz = $sz + 2 | 0;
        if (!($exp > (-10) && $exp < 10))
            $sz = $sz + 1 | 0;
        if (!($exp > (-100) && $exp < 100))
            $sz = $sz + 1 | 0;
        if ($exp < 0)
            $sz = $sz + 1 | 0;
    }
    if ($exp && $digits == $intPart)
        $digits = $digits + 1 | 0;
    jl_AbstractStringBuilder_insertSpace($this, $target, $target + ($sz + ($digits + $leadingZeros | 0) | 0) | 0);
    if (!$negative)
        $negative = $target;
    else {
        var$4 = $this.$buffer.data;
        $negative = $target + 1 | 0;
        var$4[$target] = 45;
    }
    $pos = Long_create(1569325056, 23283064);
    if ($leadingZero) {
        var$4 = $this.$buffer.data;
        $target = $negative + 1 | 0;
        var$4[$negative] = 48;
        $negative = $target + 1 | 0;
        var$4[$target] = 46;
        while (true) {
            $target = $leadingZeros + (-1) | 0;
            if ($leadingZeros <= 0)
                break;
            $intDigit = $negative + 1 | 0;
            var$4[$negative] = 48;
            $leadingZeros = $target;
            $negative = $intDigit;
        }
    }
    $i = 0;
    while ($i < $digits) {
        if (Long_le($pos, Long_ZERO))
            $intDigit = 0;
        else {
            $intDigit = Long_lo(Long_div($mantissa, $pos));
            $mantissa = Long_rem($mantissa, $pos);
        }
        var$4 = $this.$buffer.data;
        $target = $negative + 1 | 0;
        var$4[$negative] = (48 + $intDigit | 0) & 65535;
        $intPart = $intPart + (-1) | 0;
        if ($intPart)
            $negative = $target;
        else {
            $negative = $target + 1 | 0;
            var$4[$target] = 46;
        }
        $pos = Long_div($pos, Long_fromInt(10));
        $i = $i + 1 | 0;
    }
    if ($exp) {
        var$4 = $this.$buffer.data;
        $intDigit = $negative + 1 | 0;
        var$4[$negative] = 69;
        if ($exp >= 0)
            $intPart = $intDigit;
        else {
            $exp =  -$exp | 0;
            $intPart = $intDigit + 1 | 0;
            var$4[$intDigit] = 45;
        }
        if ($exp >= 100) {
            $target = $intPart + 1 | 0;
            var$4[$intPart] = (48 + ($exp / 100 | 0) | 0) & 65535;
            $exp = $exp % 100 | 0;
            $intDigit = $target + 1 | 0;
            var$4[$target] = (48 + ($exp / 10 | 0) | 0) & 65535;
        } else if ($exp < 10)
            $intDigit = $intPart;
        else {
            $intDigit = $intPart + 1 | 0;
            var$4[$intPart] = (48 + ($exp / 10 | 0) | 0) & 65535;
        }
        var$4[$intDigit] = (48 + ($exp % 10 | 0) | 0) & 65535;
    }
    return $this;
},
jl_AbstractStringBuilder_trailingDecimalZeros = $n => {
    let $zeros, $result, $bit, var$5, $i;
    $zeros = Long_fromInt(1);
    $result = 0;
    $bit = 16;
    jl_AbstractStringBuilder$Constants_$callClinit();
    var$5 = jl_AbstractStringBuilder$Constants_longLogPowersOfTen.data;
    $i = var$5.length - 1 | 0;
    while ($i >= 0) {
        if (Long_eq(Long_rem($n, Long_mul($zeros, var$5[$i])), Long_ZERO)) {
            $result = $result | $bit;
            $zeros = Long_mul($zeros, var$5[$i]);
        }
        $bit = $bit >>> 1 | 0;
        $i = $i + (-1) | 0;
    }
    return $result;
},
jl_AbstractStringBuilder_append = ($this, $c) => {
    return $this.$insert1($this.$length0, $c);
},
jl_AbstractStringBuilder_insert1 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + 1 | 0);
    $this.$buffer.data[$index] = $c;
    return $this;
},
jl_AbstractStringBuilder_ensureCapacity = ($this, $capacity) => {
    let var$2, $newLength, var$4, var$5, var$6;
    var$2 = $this.$buffer.data.length;
    if (var$2 >= $capacity)
        return;
    $newLength = var$2 >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max(var$2 * 2 | 0, 5));
    var$4 = $this.$buffer.data;
    var$5 = $rt_createCharArray($newLength);
    var$6 = var$5.data;
    $capacity = jl_Math_min($newLength, var$4.length);
    var$2 = 0;
    while (var$2 < $capacity) {
        var$6[var$2] = var$4[var$2];
        var$2 = var$2 + 1 | 0;
    }
    $this.$buffer = var$5;
},
jl_AbstractStringBuilder_toString = $this => {
    return jl_String__init_0($this.$buffer, 0, $this.$length0);
},
jl_AbstractStringBuilder_append3 = ($this, $chars, $offset, $len) => {
    return $this.$insert2($this.$length0, $chars, $offset, $len);
},
jl_AbstractStringBuilder_insert0 = ($this, $index, $chars, $offset, $len) => {
    let var$5, var$6, var$7, var$8;
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + $len | 0);
    var$5 = $len + $offset | 0;
    while ($offset < var$5) {
        var$6 = $chars.data;
        var$7 = $this.$buffer.data;
        $len = $index + 1 | 0;
        var$8 = $offset + 1 | 0;
        var$7[$index] = var$6[$offset];
        $index = $len;
        $offset = var$8;
    }
    return $this;
},
jl_AbstractStringBuilder_append1 = ($this, $chars) => {
    return $this.$append3($chars, 0, $chars.data.length);
},
jl_AbstractStringBuilder_insertSpace = ($this, $start, $end) => {
    let var$3, $sz, $i, var$6;
    var$3 = $this.$length0;
    $sz = var$3 - $start | 0;
    $this.$ensureCapacity((var$3 + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        var$6 = $this.$buffer.data;
        var$6[$end + $i | 0] = var$6[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length0 = $this.$length0 + ($end - $start | 0) | 0;
},
jl_Appendable = $rt_classWithoutFields(0),
jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuilder__init_0 = $this => {
    jl_AbstractStringBuilder__init_($this);
},
jl_StringBuilder__init_ = () => {
    let var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_0(var_0);
    return var_0;
},
jl_StringBuilder_append = ($this, $obj) => {
    let var$2, var$3;
    var$2 = $this.$length0;
    var$3 = $this;
    $obj = $obj === null ? $rt_s(1) : $obj.$toString();
    jl_AbstractStringBuilder_insert(var$3, var$2, $obj);
    return $this;
},
jl_StringBuilder_append3 = ($this, $string) => {
    jl_AbstractStringBuilder_append0($this, $string);
    return $this;
},
jl_StringBuilder_append0 = ($this, $value) => {
    jl_AbstractStringBuilder_append2($this, $value, 10);
    return $this;
},
jl_StringBuilder_append1 = ($this, $value) => {
    let var$2;
    var$2 = $this.$length0;
    jl_AbstractStringBuilder_insert2($this, var$2, $value);
    return $this;
},
jl_StringBuilder_append2 = ($this, $c) => {
    jl_AbstractStringBuilder_append($this, $c);
    return $this;
},
jl_StringBuilder_delete = ($this, $start, $end) => {
    let var$3, var$4, var$5, var$6, var$7, var$8;
    if ($start >= 0) {
        var$3 = $rt_compare($start, $end);
        if (var$3 <= 0) {
            var$4 = $this.$length0;
            if ($start <= var$4) {
                if (var$3) {
                    if ($end > var$4)
                        $end = var$4;
                    var$5 = var$4 - $end | 0;
                    $this.$length0 = var$4 - ($end - $start | 0) | 0;
                    var$4 = 0;
                    while (var$4 < var$5) {
                        var$6 = $this.$buffer.data;
                        var$3 = $start + 1 | 0;
                        var$7 = $end + 1 | 0;
                        var$6[$start] = var$6[$end];
                        var$4 = var$4 + 1 | 0;
                        $start = var$3;
                        $end = var$7;
                    }
                }
                return $this;
            }
        }
    }
    var$8 = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_(var$8);
    $rt_throw(var$8);
},
jl_StringBuilder_deleteCharAt = ($this, $index) => {
    let var$2, var$3, var$4, var$5;
    if ($index >= 0) {
        var$2 = $this.$length0;
        if ($index < var$2) {
            var$2 = var$2 - 1 | 0;
            $this.$length0 = var$2;
            while ($index < var$2) {
                var$3 = $this.$buffer.data;
                var$4 = $index + 1 | 0;
                var$3[$index] = var$3[var$4];
                $index = var$4;
            }
            return $this;
        }
    }
    var$5 = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_(var$5);
    $rt_throw(var$5);
},
jl_StringBuilder_subSequence = ($this, var$1, var$2) => {
    let var$3;
    var$3 = $this;
    if (var$1 <= var$2 && var$1 >= 0 && var$2 <= var$3.$length0)
        return jl_String__init_0(var$3.$buffer, var$1, var$2 - var$1 | 0);
    var$3 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_(var$3);
    $rt_throw(var$3);
},
jl_StringBuilder_insert0 = ($this, var$1, var$2, var$3, var$4) => {
    jl_AbstractStringBuilder_insert0($this, var$1, var$2, var$3, var$4);
    return $this;
},
jl_StringBuilder_append4 = ($this, var$1, var$2, var$3) => {
    jl_AbstractStringBuilder_append3($this, var$1, var$2, var$3);
    return $this;
},
jl_StringBuilder_length = $this => {
    return $this.$length0;
},
jl_StringBuilder_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuilder_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuilder_insert = ($this, var$1, var$2) => {
    jl_AbstractStringBuilder_insert1($this, var$1, var$2);
    return $this;
},
jl_StringBuilder_insert1 = ($this, var$1, var$2) => {
    jl_AbstractStringBuilder_insert($this, var$1, var$2);
    return $this;
};
function jl_Throwable() {
    let a = this; jl_Object.call(a);
    a.$message = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
}
let jl_Throwable_fillInStackTrace = $this => {
    return $this;
},
jl_Throwable_initNativeException = $this => {
    $rt_fillNativeException($this);
},
jl_Throwable_getMessage = $this => {
    return $this.$message;
},
jl_Throwable_getCause = $this => {
    let var$1;
    var$1 = $this.$cause;
    if (var$1 === $this)
        var$1 = null;
    return var$1;
},
jl_Exception = $rt_classWithoutFields(jl_Throwable),
jl_Exception__init_ = $this => {
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
},
jl_Exception__init_1 = () => {
    let var_0 = new jl_Exception();
    jl_Exception__init_(var_0);
    return var_0;
},
jl_Exception__init_0 = ($this, $message) => {
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$message = $message;
},
jl_Exception__init_2 = var_0 => {
    let var_1 = new jl_Exception();
    jl_Exception__init_0(var_1, var_0);
    return var_1;
},
jl_RuntimeException = $rt_classWithoutFields(jl_Exception),
jl_RuntimeException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_RuntimeException__init_2 = () => {
    let var_0 = new jl_RuntimeException();
    jl_RuntimeException__init_(var_0);
    return var_0;
},
jl_RuntimeException__init_1 = ($this, $message) => {
    jl_Exception__init_0($this, $message);
},
jl_RuntimeException__init_0 = var_0 => {
    let var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_1(var_1, var_0);
    return var_1;
},
otrr_ReflectionInfo = $rt_classWithoutFields(),
otrr_ClassInfo = $rt_classWithoutFields(otrr_ReflectionInfo),
otrr_ClassInfo_newArrayInstance = (var$0, var$1) => {
    switch (var$0.primitiveKind) {
        default: return $rt_createArray(var$0, var$1);
    }
},
otr_StringInfo = $rt_classWithoutFields(otrr_ReflectionInfo),
aw_ReplBridge = $rt_classWithoutFields(),
aw_ReplBridge_INTERPRETER = null,
aw_ReplBridge_$callClinit = () => {
    aw_ReplBridge_$callClinit = $rt_eraseClinit(aw_ReplBridge);
    aw_ReplBridge__clinit_();
},
aw_ReplBridge_main = var$1 => {
    aw_ReplBridge_$callClinit();
},
aw_ReplBridge__clinit_ = () => {
    let var$1, var$2;
    var$1 = new c_Interpreter;
    var$2 = new c_Lexer;
    c_Lexer_$callClinit();
    var$1.$lexer = var$2;
    var$2 = new c_Context;
    var$2.$variables = ju_HashMap__init_0();
    var$1.$ctx = var$2;
    aw_ReplBridge_INTERPRETER = var$1;
},
aw_ReplBridge_evaluate$exported$0 = var$1 => {
    let var$2, var$3, $$je;
    aw_ReplBridge_$callClinit();
    var$1 = $rt_str(var$1);
    a: {
        if (var$1 === null)
            var$1 = $rt_s(2);
        else {
            b: {
                try {
                    c: {
                        try {
                            var$1 = c_Interpreter_eval(aw_ReplBridge_INTERPRETER, var$1);
                            var$1 = var$1 !== null ? var$1.$toString() : $rt_s(2);
                            break a;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof ceu_CommandException) {
                                var$1 = $$je;
                                break c;
                            } else {
                                throw $$e;
                            }
                        }
                    }
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                        var$1 = $$je;
                        break b;
                    } else {
                        throw $$e;
                    }
                }
                var$2 = var$1.$message;
                var$1 = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_(var$1);
                jl_StringBuilder_append(jl_StringBuilder_append(var$1, $rt_s(13)), var$2);
                var$1 = jl_AbstractStringBuilder_toString(var$1);
                break a;
            }
            var$3 = jl_Class_getSimpleName(jl_Object_getClass(var$1));
            var$1 = var$1.$getMessage();
            var$2 = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_(var$2);
            jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(13)), var$3), $rt_s(9)), var$1);
            var$1 = jl_AbstractStringBuilder_toString(var$2);
        }
    }
    return $rt_ustr(var$1);
},
aw_ReplBridge_help$exported$1 = () => {
    aw_ReplBridge_$callClinit();
    return "SimpleAlgebra – verfuegbare Befehle:\n\n1. Lineare Gleichungssysteme loesen:\n   A = [[3,11,10,9000], [6,2,2,5000], [150,220,120,194000]]\n   solve(A)\n\n2. Determinante berechnen:\n   A = [[1,2], [3,4]]\n   det(A)\n\n3. Beliebige R- oder R^nxm-Ausdruecke auswerten:\n   2 + 3 * 4              // Arithmetik\n   A = [[1, 2], [3, 4]]   // 2x2 Matrix definieren\n   B = [[5, 6], [7, 8]]   // weitere Matrix\n   A + B                  // elementweise Addition\n   A * B                  // Matrixmultiplikation\n\nUI-Befehle (nur im Browser): clear, help\n";
},
aw_ReplBridge_reset$exported$2 = () => {
    aw_ReplBridge_$callClinit();
},
jl_ClassCastException = $rt_classWithoutFields(jl_RuntimeException),
otp_Platform = $rt_classWithoutFields(),
otp_Platform_clone = var$1 => {
    let copy = new var$1.constructor();
    for (let field in var$1) {
        if (var$1.hasOwnProperty(field)) {
            copy[field] = var$1[field];
        }
    }
    return copy;
},
otji_JS = $rt_classWithoutFields(),
otci_IntegerUtil = $rt_classWithoutFields(),
ju_Comparator = $rt_classWithoutFields(0),
jl_String$_clinit_$lambda$_118_0 = $rt_classWithoutFields();
function jl_Character() {
    jl_Object.call(this);
    this.$value4 = 0;
}
let jl_Character_TYPE = null,
jl_Character_digitMapping = null,
jl_Character_upperCaseMapping = null,
jl_Character_lowerCaseMapping = null,
jl_Character_classMapping = null,
jl_Character_characterCache = null,
jl_Character_$$metadata$$0 = null,
jl_Character_$$metadata$$1 = null,
jl_Character_$$metadata$$3 = null,
jl_Character_$$metadata$$4 = null,
jl_Character_$callClinit = () => {
    jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
    jl_Character__clinit_();
},
jl_Character__init_0 = ($this, var$1) => {
    jl_Character_$callClinit();
    $this.$value4 = var$1;
},
jl_Character__init_ = var_0 => {
    let var_1 = new jl_Character();
    jl_Character__init_0(var_1, var_0);
    return var_1;
},
jl_Character_toString0 = $this => {
    return jl_Character_toString($this.$value4);
},
jl_Character_toString = $c => {
    let var$2, var$3;
    jl_Character_$callClinit();
    var$2 = new jl_String;
    var$3 = $rt_createCharArray(1);
    var$3.data[0] = $c;
    jl_String__init_2(var$2, var$3);
    return var$2;
},
jl_Character_isSupplementaryCodePoint = $codePoint => {
    jl_Character_$callClinit();
    return $codePoint >= 65536 && $codePoint <= 1114111 ? 1 : 0;
},
jl_Character_isHighSurrogate = $ch => {
    jl_Character_$callClinit();
    return ($ch & 64512) != 55296 ? 0 : 1;
},
jl_Character_isLowSurrogate = $ch => {
    jl_Character_$callClinit();
    return ($ch & 64512) != 56320 ? 0 : 1;
},
jl_Character_isSurrogatePair = ($high, $low) => {
    jl_Character_$callClinit();
    return jl_Character_isHighSurrogate($high) && jl_Character_isLowSurrogate($low) ? 1 : 0;
},
jl_Character_toCodePoint = ($high, $low) => {
    jl_Character_$callClinit();
    return (($high & 1023) << 10 | $low & 1023) + 65536 | 0;
},
jl_Character_highSurrogate = $codePoint => {
    jl_Character_$callClinit();
    return (55296 | ($codePoint - 65536 | 0) >> 10 & 1023) & 65535;
},
jl_Character_lowSurrogate = $codePoint => {
    jl_Character_$callClinit();
    return (56320 | $codePoint & 1023) & 65535;
},
jl_Character_toLowerCase = $ch => {
    jl_Character_$callClinit();
    return jl_Character_toLowerCase0($ch) & 65535;
},
jl_Character_toLowerCase0 = $ch => {
    jl_Character_$callClinit();
    if (jl_Character_lowerCaseMapping === null) {
        if (jl_Character_$$metadata$$0 === null)
            jl_Character_$$metadata$$0 = jl_Character_acquireLowerCaseMapping$$create();
        jl_Character_lowerCaseMapping = otciu_UnicodeHelper_createCharMapping(otciu_UnicodeHelper_decodeCaseMapping((jl_Character_$$metadata$$0.value !== null ? $rt_str(jl_Character_$$metadata$$0.value) : null)));
    }
    return jl_Character_mapChar(jl_Character_lowerCaseMapping, $ch);
},
jl_Character_toUpperCase = $ch => {
    jl_Character_$callClinit();
    return jl_Character_toUpperCase0($ch) & 65535;
},
jl_Character_toUpperCase0 = $codePoint => {
    jl_Character_$callClinit();
    if (jl_Character_upperCaseMapping === null) {
        if (jl_Character_$$metadata$$1 === null)
            jl_Character_$$metadata$$1 = jl_Character_acquireUpperCaseMapping$$create();
        jl_Character_upperCaseMapping = otciu_UnicodeHelper_createCharMapping(otciu_UnicodeHelper_decodeCaseMapping((jl_Character_$$metadata$$1.value !== null ? $rt_str(jl_Character_$$metadata$$1.value) : null)));
    }
    return jl_Character_mapChar(jl_Character_upperCaseMapping, $codePoint);
},
jl_Character_mapChar = ($table, $codePoint) => {
    let $binSearchTable, var$4, var$5, var$6, $index, var$8;
    jl_Character_$callClinit();
    $binSearchTable = $table.$fastTable.data;
    if ($codePoint < $binSearchTable.length)
        return $codePoint + $binSearchTable[$codePoint] | 0;
    $binSearchTable = $table.$binarySearchTable.data;
    var$4 = 0;
    var$5 = $binSearchTable.length;
    var$6 = (var$5 / 2 | 0) - 1 | 0;
    a: {
        while (true) {
            $index = (var$4 + var$6 | 0) / 2 | 0;
            var$8 = $rt_compare($binSearchTable[$index * 2 | 0], $codePoint);
            if (!var$8)
                break;
            if (var$8 <= 0) {
                var$4 = $index + 1 | 0;
                if (var$4 > var$6)
                    break a;
            } else {
                $index = $index - 1 | 0;
                if ($index < var$4)
                    break a;
                var$6 = $index;
            }
        }
    }
    if ($index >= 0) {
        $index = $index * 2 | 0;
        if ($index < var$5)
            return $codePoint + $binSearchTable[$index + 1 | 0] | 0;
    }
    return 0;
},
jl_Character_digit = ($ch, $radix) => {
    let var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12;
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36) {
        if (jl_Character_digitMapping === null) {
            if (jl_Character_$$metadata$$3 === null)
                jl_Character_$$metadata$$3 = jl_Character_obtainDigitMapping$$create();
            var$3 = (jl_Character_$$metadata$$3.value !== null ? $rt_str(jl_Character_$$metadata$$3.value) : null);
            var$4 = otci_CharFlow__init_(jl_String_toCharArray(var$3));
            var$5 = otci_Base46_decodeUnsigned(var$4);
            var$6 = $rt_createIntArray(var$5 * 2 | 0);
            var$7 = var$6.data;
            var$8 = 0;
            var$9 = 0;
            var$10 = 0;
            var$11 = 0;
            while (var$11 < var$5) {
                var$9 = var$9 + otci_Base46_decode(var$4) | 0;
                var$10 = var$10 + otci_Base46_decode(var$4) | 0;
                var$12 = var$8 + 1 | 0;
                var$7[var$8] = var$9;
                var$8 = var$12 + 1 | 0;
                var$7[var$12] = var$10;
                var$11 = var$11 + 1 | 0;
            }
            jl_Character_digitMapping = var$6;
        }
        var$6 = jl_Character_digitMapping.data;
        var$8 = 0;
        var$9 = (var$6.length / 2 | 0) - 1 | 0;
        a: {
            while (var$9 >= var$8) {
                var$10 = (var$8 + var$9 | 0) / 2 | 0;
                var$11 = var$10 * 2 | 0;
                var$5 = $rt_compare($ch, var$6[var$11]);
                if (var$5 > 0)
                    var$8 = var$10 + 1 | 0;
                else {
                    if (var$5 >= 0) {
                        $ch = var$6[var$11 + 1 | 0];
                        break a;
                    }
                    var$9 = var$10 - 1 | 0;
                }
            }
            $ch = (-1);
        }
        if ($ch >= $radix)
            $ch = (-1);
    } else
        $ch = (-1);
    return $ch;
},
jl_Character_forDigit = ($digit, $radix) => {
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36 && $digit >= 0 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
},
jl_Character_isDigit = $codePoint => {
    jl_Character_$callClinit();
    return jl_Character_getType($codePoint) != 9 ? 0 : 1;
},
jl_Character_toChars = $codePoint => {
    let var$2, var$3, var$4;
    jl_Character_$callClinit();
    if (!($codePoint >= 0 && $codePoint <= 1114111 ? 1 : 0)) {
        var$2 = new jl_IllegalArgumentException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    if ($codePoint < 65536) {
        var$3 = $rt_createCharArray(1);
        var$3.data[0] = $codePoint & 65535;
        return var$3;
    }
    var$3 = $rt_createCharArray(2);
    var$4 = var$3.data;
    var$4[0] = jl_Character_highSurrogate($codePoint);
    var$4[1] = jl_Character_lowSurrogate($codePoint);
    return var$3;
},
jl_Character_getType0 = $c => {
    jl_Character_$callClinit();
    return jl_Character_getType($c);
},
jl_Character_getType = $codePoint => {
    let $u, $classes, $l, $i, $range;
    jl_Character_$callClinit();
    if ($codePoint > 0 && $codePoint <= 65535 ? 1 : 0) {
        $u = $codePoint & 65535;
        if (!jl_Character_isHighSurrogate($u) && !jl_Character_isLowSurrogate($u) ? 0 : 1)
            return 19;
    }
    if (jl_Character_classMapping === null) {
        if (jl_Character_$$metadata$$4 === null)
            jl_Character_$$metadata$$4 = jl_Character_obtainClasses$$create();
        jl_Character_classMapping = otciu_UnicodeHelper_extractRle((jl_Character_$$metadata$$4.value !== null ? $rt_str(jl_Character_$$metadata$$4.value) : null));
    }
    $classes = jl_Character_classMapping.data;
    $l = 0;
    $u = $classes.length - 1 | 0;
    while ($l <= $u) {
        $i = ($l + $u | 0) / 2 | 0;
        $range = $classes[$i];
        if ($codePoint >= $range.$end2)
            $l = $i + 1 | 0;
        else {
            $u = $range.$start3;
            if ($codePoint >= $u)
                return $range.$data1.data[$codePoint - $u | 0];
            $u = $i - 1 | 0;
        }
    }
    return 0;
},
jl_Character_isLetterOrDigit0 = $ch => {
    jl_Character_$callClinit();
    return jl_Character_isLetterOrDigit($ch);
},
jl_Character_isLetterOrDigit = $codePoint => {
    jl_Character_$callClinit();
    a: {
        switch (jl_Character_getType($codePoint)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 9:
                break;
            case 6:
            case 7:
            case 8:
                break a;
            default:
                break a;
        }
        return 1;
    }
    return 0;
},
jl_Character_isIdentifierIgnorable = $codePoint => {
    jl_Character_$callClinit();
    a: {
        if (!($codePoint >= 0 && $codePoint <= 8) && !($codePoint >= 14 && $codePoint <= 27)) {
            if ($codePoint < 127)
                break a;
            if ($codePoint > 159)
                break a;
        }
        return 1;
    }
    return jl_Character_getType($codePoint) != 16 ? 0 : 1;
},
jl_Character_isSpaceChar = $codePoint => {
    jl_Character_$callClinit();
    switch (jl_Character_getType($codePoint)) {
        case 12:
        case 13:
        case 14:
            break;
        default:
            return 0;
    }
    return 1;
},
jl_Character_isWhitespace = $codePoint => {
    jl_Character_$callClinit();
    switch ($codePoint) {
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 28:
        case 29:
        case 30:
        case 31:
            break;
        case 160:
        case 8199:
        case 8239:
            return 0;
        default:
            return jl_Character_isSpaceChar($codePoint);
    }
    return 1;
},
jl_Character__clinit_ = () => {
    jl_Character_TYPE = $rt_cls($rt_charcls);
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
},
jl_Character_acquireLowerCaseMapping$$create = () => {
    return {"value" : "NY  H#F#U 4%F#O #F#/ d%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #a1# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #<+#%# #%# #%# \'.3#%# #%# #{1#%# #w1%%# %J\'#k1#o1#%# #w1#!3# #23#*3#%# \'23#:3# #>3#%# #%# #%# #N3#%# #N3# %%# #N3#%# #J3%%# #%# #R3#%# \'%# /)#%# #)#%# #)#%# #%# #%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# #%# %)#%# #%# #8)#L%#%# #%# #%# #"
    + "%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #a+# #%# #%# #%# #%# #%# #%# #%# #%# #%# /B45#%# #,/#645# %%# #P1#!\'#*\'#%# #%# #%# #%# #%# <-%# #%# \'%# 1&++ %_## #Z#)k%%g%% #F#W hA# 1%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# +]%# %%# #?#%# %a+\'N\'AF#b &#%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #^#%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%"
    + "# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# %*%p kB#oq-&# _?gejg#A1 a$#%# -mo%&# {-%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3,4/# #%# #%"
    + "# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3C1 1C1 1C1 1C1 1C1 3C/ 1C1 QC1 1C1 1C1 1C%8\'%G# 7i\')G# 7C%D)\' 7C%u)%?# 7X+%P+%G# L-q*/# \'Pw/#8m/# -6## |bA G%# kC.#U !r*%&# &#%# #,05#qX\'#H.5# %%# #%# #%# #e25#D05#q25#m25# #%# %%# 1865%%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# "
    + "#%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 1%# #%# )%# (a=%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# G%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# y%%# #%# #%# #%# #%# #%# #%# \'%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 5%# #%# #4Fd#%# #%# #%# #%# #%# )%# #<{p# %%# #%# \'%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #P}p#}}p#m}p#D}p#P}p# #@yp#D{p#Lyp#Br#%# #%# #%"
    + "# #%# #%# #%# #%# #%# #,%#L}p#LJd#%# #%# #$$r#%# #%# #%# #%# #%# #%# #%# #%# #P6r#}!rI )%# :GL#) i,5F#U TUg#r {%g#r >\'c#p Lnk%F# .\'F#S HB#F#b o@5F#b F#2#W 4Z;%# /%# #%# %%# \'%# M%# #%# #%# #%# \'%# #%# #%# #%# #%# #%# #%# u.#N#f "};
},
jl_Character_acquireUpperCaseMapping$$create = () => {
    return {"value" : "L[  ,%H#U :#>b# vH#O #H#/:+# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #,5# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'#(;#N1# %\'# #\'# %\'# \'\'# +\'# %6)# \'\'#*/#N6r# %_+# %\'# #\'# #\'# %\'# )\'# %\'# \'\'# #\'# %\'# \'\'# #J%# +\'#+# #\'#+# #\'#+# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#L\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'#+# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#"
    + " #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 1\'# %665% #\'# )\'# #\'# #\'# #\'# #\'#o25#c25#k25#03#}1# #y1% #m1# #q1#{}p# \'y1#k}p# #$3#!$r#:{p#N}p# #,3#43#N}p#*05#B}p# %43# #B05#<3# %@3# #{!r# ){!r#F.5# %P3# #J}p#P3# \'B{p#P3#$\'#L3%,\'# +T3# 5Jyp#>yp# Z\'_\'# x\'# #\'# \'\'\' #_+\' !#a##]#\' #H#CD##H#3m%#i%% #e%#P%# \'(%#D%#C# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#i\'#P\'#=#(+# #4)# %\'# %\'# .#H#bP\'A #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 3\'# #\'# #\'# #\'# #\'# #\'# "
    + "#\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'#`# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'% &#,%n mB#ko%x %ko%\' RAC1 >$#yu+#uu+#Pu+#Hu+%Lu+#0u+#io+#>@d# #\'- (+2Fd# \'oX\'# AJJd# N%\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #"
    + "\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# +X%# +\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#A1 1A1 1A1 1A1 1A1 3A# #A# #A# #A% /A1 16\'%g\')B)%V+%s)%N+)A1 1A1 1A1 1A% #E# 5<m-# )E# 9A% =A% \'=# ;E# R/8## ddA )\'# @E0#U Nr,%&# #\'# \'D4"
    + "5#845# #\'# #\'# #\'# -\'# %\'# 5\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 1\'# #\'# )\'- /qq-&# i]=\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# G\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# y%\'# #\'# #\'# #\'# #\'# #\'# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#"
    + " #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 5\'# #\'# %\'# #\'# #\'# #\'# #\'# )\'# )\'# #\'#*%# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 7\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# )\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# U\'# REJ#% -Dr# Yiejg# e*5H#U eUi#r {%i#r <\'e#t {nm%:# V%H#^ >B#H#b o@5H#b <#4#P# eV;\'# /\'# #\'# %\'# \'\'# M\'# #\'# #\'# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# Z0#P#f "};
},
jl_Character_obtainDigitMapping$$create = () => {
    return {"value" : "6G*% %%%%%%%%%%%%%%%%%%A%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=,#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%_H#T#%%%%%%%%%%%%%%%%%%s+G%%%%%%%%%%%%%%%%%%_1G%%%%%%%%%%%%%%%%%%{CG%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%6)G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%.9G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%!i#G"
    + "%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%*;G%%%%%%%%%%%%%%%%%%Z+G%%%%%%%%%%%%%%%%%%:/G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%{/G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%s+G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%R@dG%%%%%%%%%%%%%%%%%%R[G%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%_1G%%%%%%%%%%%%%%%%%%!#G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%cCG%%%%%%%%%%%%%%%%%%o*IG%%%%%%%%%%%%%%%%%%A%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=,#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%c:#T#%%%%%%%%%%%%%%%%%%w&%G%%%%%"
    + "%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%_fG%%%%%%%%%%%%%%%%%%Z+G%%%%%%%%%%%%%%%%%%_%G%%%%%%%%%%%%%%%%%%>-G%%%%%%%%%%%%%%%%%%.9G%%%%%%%%%%%%%%%%%%w=G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%>AG%%%%%%%%%%%%%%%%%%N)G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%B\'G%%%%%%%%%%%%%%%%%%FEG%%%%%%%%%%%%%%%%%%N)G%%%%%%%%%%%%%%%%%%oYG%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%g5G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%F%G%%%%%%%%%%%%%%%%%%Z?G%%%%%%%%%%%%%%%%%%ow?G%%%%%%%%%%%%%%%%%%s4%G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%"
    + "%%%%s+G%%%%%%%%%%%%%%%%%%:OG%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%N&OG%%%%%%%%%%%%%%%%%%VZ%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%!8%G%%%%%%%%%%%%%%%%%%FEG%%%%%%%%%%%%%%%%%%sKG%%%%%%%%%%%%%%%%%%k5G%%%%%%%%%%%%%%%%%%.lG%%%%%%%%%%%%%%%%%%wN)G%%%%%%%%%%%%%%%%%%"};
},
jl_Character_obtainClasses$$create = () => {
    return {"value" : "PA-Y$;Y$679:95Y#J+Y#Z$Y#B;697<8<C;6:7:PB-9[%=9<=&>:1=<=:L#<#Y#<,&?L$9B8:B(C9:C)!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#B##!#!C$B##!#B##B$C#B%#B##B$C$B##B##!#!#B##!C#!#B##B$#!#B#C#&!C$F%!$#!$#!$#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!C#!$#!#B$#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C(B##B#C#!#B%#!#!#!#!CgF#C;E3]%E-]/E&](%<%]2b\'Q! !#!#%<!#A#%C$9!A%]#!9B$ ! B##B2 B*CD!C#B$C$!#!#!#!#!#!#!#!#!#!#!#!C&!#:!#B#C#BTCQ!#!#!#!"
    + "#!#!#!#!#!#!#!#!#!#!#!#!#!#=G&H#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#B##!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!# BG E#Y\'CJ95E#^#; GN5\'9G#9G#9G$A\'F<A%F%Y#A,Q\'Z$Y#;Y#^#G,91Y$FA%F+G6J+Y%F#\'b&D! 9&G(1=G\'E#G#=G%F#J+F$^#&Y/ 1&\'F?G<A#b&:! G,&A/J+FBG*E#=Y$%A#\'[#F7G%%G*%G$%G&A#Y0 F:G$A#9 F,A&F9<F(Q#A&G*FJ%G91GA)FW\')\'&I$G)I%\'I#&G(F+G#Y#J+9%F0\'I#\'F)A#F#A#F7 F( &A$F%A#\'&I$G%A#I#A#I#\'&A))A%F# F$G#A#J+F#[#L\'=;&9\'& G#) F\'A%F#A#F7 F( F# F"
    + "# F#A#\' I$G#A%G#A#G$A$\'A(F% &A(J+G#F$\'9A+G#) F* F$ F7 F( F# F&A#\'&I$G& G#) I#\'A#&A0F#G#A#J+9;A(&G\' \'I# F)A#F#A#F7 F( F# F&A#\'&)\')G%A#I#A#I#\'A&G%)A%F# F$G#A#J+=&L\'A+\'& F\'A$F$ F%A$F# & F#A$F#A$F$A$F-A%I#\'I#A$I$ I$\'A#&A\')A/J+L$^\';=A&\'I$\'F) F$ F8 F1A#\'&G$I% G$ G%A(G# F$ F#A#F#G#A#J+A(9L(=&\'I#9F) F$ F8 F+ F&A#\'&)\'I& \'I# I#G#A(I#A&F$ F#G#A#J+ F#)A-G#I#F* F$ FJG#&I$G% I$ I$\'&=A%F$)L(F$G#A#J+L*=F\' \'I# F3A$F9 F* &A#F(A$\'A%I$G$ \' I)A\'J+A#I#9A-FQ\'F#G(A%;F\'%G)9J+Y#AFF# & F& F9 & F+\'F#G*&A#F& % G( J+A#F%AA&^$Y0=9^$G#^\'J"
    + "+L+=\'=\'=\'6767I#F) FEA%G/)G&9G#F&G, GE ^)\'^\' ^#Y&^%Y#AFFLI#G%)G\')G#I#G#&J+Y\'F\'I#G#F%G$&I$F#I(F$G%F.\'I#G#I\'\'&)J+I$\'^#BG !A&!A#CL9%C$b&*&  F%A#F( & F%A#FJ F%A#FB F%A#F( & F%A#F0 FZ F%A#FeA#G$Y*L5A$F1^+A\'b!7! A#C\'A#5b&M* =9F2-F;67A$FmY$K$F)A(F3G$)A*F4G#)Y#A*F3G#A-F. F$ G#A-FUG#)G(I)\'I#G,Y$%Y$;&\'A#J+A\'L+A\'Y\'5Y%G$1\'J+A\'FD%FWA\'F&G#FC\'&A&FhA+F@ G$I%G#I$A%I#\'I\'G$A%=A$Y#J+F?A#F&A,FMA%F;A\'J+,A$^CF8G#I#\'A#Y#FV)\')G( \')\'I#G)I\'G+A#\'J+A\'J+A\'Y(%Y\'A#G/(GSA0G%)FP\')G&)\'I&\'I#F) Y#J+Y(^+G*^*Y$G#)F?)G%I#G#)G$F#J+FM\')G#I$\')G$I#A)Y"
    + "%FEI)G)I#G#A$Y&J+A$F$J+F?E\'Y#C*!#A&BLA#B$Y)A)G$9G.)G(F%\'F\'\'F#)G#&A&CMEaC.%CCEFGb!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C*!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C*B)C\'A#B\'A#C)B)C)B)C\'A#B\'A#C) ! ! ! !C)B)C/A#C)D)C)D)C)D)C& C#B%$<#]$C$ C#B%$]$C%A#C#B% ]$C)B&]$A#C$ C#B%$]# M,Q&U\'Y#>?6_#?6>Y)./Q&-Y*>?Y%X#Y$:67Y,:98Y+-Q& Q+,%A#L\'Z$67%L+Z$67E2[FA,G."
    + "H%\'H$G-A0^#!^%!^##B$C#B$#=!^#:B&^\'!=!=!=B%=#B%#F%#^#C#B#Z&!C%=:^##=L1KD!#K%,^#A%Z&^&Z#^%:^#:^#:^(:^@Z#^#:=:^@b:-% ^)6767^5Z#^(67b=2! :^?Z:^IZ\'^jA7^,A6L^^pL7b=X# :^*:^WZ)b=P! :b=Y$ 67676767676767L?^MZ&67Z@6767676767Z1b= % b:$# 6767676767676767676767Za6767ZA67b:#% ^QZ6^#Z\'^HA#b=+# BQCQ!#B$C#!#!#!#B%#!C#!C\'E#B$#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C#^\'!#!#G$!#A&Y%,Y#CG #A&#A#FYA(%9A/\'F8A*F( F( F( F( F( F( F( F( GAY#>?>?Y$>?9>?Y*5Y#59>?Y#>?67676767Y&%Y"
    + "+U#Y%596Y.^#Y$676767675A#Y#67A=^; b=:! A-b=7$ A;^1-Y$=%&+6767676767^#6767676756W#=K*G%I#5E&^#K$%&9^# b&7! A#G#]#E#&5b&;! 9E$&A&FL b&?!  ^#L%^+FA^GA*=F1^@ L+^?L)=L0^AL+^HL0b= & b& H!^bb&  %b&6)!%b&X2 A$^XA*FIE\'Y#b&-% %Y$F1J+F#A5!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#&\'H$9G+9%!#!#!#!#!#!#!#!#!#!#!#!#!#!#E#G#FhK+G#Y\'A)]8E*]#!#!#!#!#!#!#!C$!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#%C)!#!#B##!#!#!#!#%]#!#!#&!#!C$!#!#!#!#!#!#!#!#!#!#B&#B&#!#!#!#!#!#!#!#B%#!#B##!#!#!#!#!#!#!#B#A%!A/E%!#&"
    + "E##F(\'F$\'F%\'F8I#G#)^%\'A$L\'^#;=A\'FUY%A)I#FSI1G#A)Y#J+A\'G3F\'Y$&9F#\'J+F=G)Y#F8G,I#A,9F>A$G$)FP\'I#G%I#G#I$Y. %J+A%Y#F&\'%F*J+F& FJG\'I#G#I#G#A*F$\'F)\')A#J+A#Y%F1%F\'^$&)\')FS\'&G$F#G#F&G#&\'&A9F#%Y#F,)G#I#Y#&E#)\'A+F\'A#F\'A#F\'A*F( F( CL<E%C*%]#B#A#b#1! FDI#\'I#\'I#9)\'A#J+A\'b&EO#A-F8A%FRA%b4 A b3 E!b&O& A#b&K! AGC(A-C&A&&\'F+:F. F& & F# F# b&M! ]2^1b&L& 76^1Fb^#FW^)AAF-;^$G1Y(679A\'G19U#X#6767676767676767Y#67Y%X$Y$ Y%5676767Y$:5Z$ 9;Y#A%F& b&(# A#1 Y$;Y$679:95Y#J+Y#Z$Y#B;697<8<C;6:7:67967Y#F+%FNE#F@A$F\'A#F\'A#F\'A#F$A$[#:<=[# "
    + "=Z%^#A+Q$^#A#F- F; F4 F# F0A#F/ACb&]! A&Y$A%LNA$^*KVL%^2L#^$ ^.A$=AP^N\'b ## F>A$FRA0\'L<A%FAL%A*F5+F)+A&FGG&A&F? 9FEA%F)9K&AKBICIFpA#J+A\'BEA%CEA%FIA)FUA,9B, B0 B( B# C, C0 C( C#A$FUA-b&X% A*F7A+F)A9E\' EK E/AbF\'A#& FM F#A$&A#F8 9L)F8^#L(F@A)L*AQF4 F#A&L&F7L\'A$9F;A&9F;AGFYA%L#F#L1A#LO&G$ G#A&G%F% F$ F>A#G$A%\'L*A(Y*A(F>L#9F>L$AAF)=F=G#A%L&Y(A*FWA$Y(F7A#L)F4A&L)F3A(Y%A-L(b 1! FkAXBTA.CTA(L\'FEG%A)J+A\'J+F%%&B7A$G&5%C7A)Z#b 1$ L@ FK G#5A#F#A1F$%F# ]#G&9^)F7 G1F>L+&A)F7G,L%Y&A7F3G%Y%AGF6L(A5F8A*)\')FVG0Y(A%L5J+\'F#G#&"
    + "A*G$)FNI$G%I#G#Y#1Y%\'A+1A#F:A(J+A\'G$FEG&)G) J+Y%&I#&A)FD\'Y#&A*G#)FQI$G*I#F%Y%G%9)\'J+&9&Y$ L5A,F3 F:I$G$I#\')G#Y\'\'F#\'A`F( & F% F0 F+9A\'FP\'I$G)A&J+A\'G#I# F)A#F#A#F7 F( F# F& G#&I#\'I%A#I#A#I$A#&A\')A&F&I#A#G(A$G&A,F+ &A#& FG &I$G\' )A#) I% I#\')\'&\'&Y# Y#A)G#A>FVI$G)I#G$)\'F%Y&J+Y# 9\'F$A?FQI$G\')\'I%G#)G#F#9&A)J+b G# FPI$G%A#I%G#)G#Y8F%G#ACFQI$G)I#\')G#Y$&A,J+A\'Y.A4FL\')\'I#G\')\'&9A\'J+A\'J5A=F<A#\')\'I#G%)G&A%J+L#Y$=F(b Z# FMI$G*)G#9b E! BACAJ+L*A-F)A#&A#F) F# F9I\' I#A#G#)\'&)&)\'Y$A*J+AhF)A#FHI$G%A#G#I%\'&9&)A<&G+FIG\')&G%Y)\'A)"
    + "&G\'I#G$FOG.)G#Y$&Y&A.FkA(Y+&b 6! \')G$)\')b 9! FB9A/J+A\'F* FF)G( G\')\'&Y&A+J+L4A$Y#F?A#G7 )G()G#)G#AkF( F# FGG\'A$\' G# G(&\'A)J+A\'F\' F# FAI& G# I#\')\'&A(J+A\'FJ%F#A%J+b W$ F4G#I#Y#A(G#&)F. FCI#G&A$I#\')\'Y.J+\'b 6! &A0L6^)[%^2A.9b&;/ b G! b+Q! Y&K,b&%$ A-b+X% b *E b&B! Y#A.b&Q1 Q1\'F\'G0A+b&<` A&b&(* b ZK!F?G-I$G$J+b \'< b&Z) A(F@ J+A%Y#Fq J+A\'F?A#G&9A+FQG(Y&^%E%9=A+J+ L( F6A&F4b Q\' E$FIE#Y$J+A\'F9\'F%\'A#J+b 7# BACAL8Y%A&B:A#C:AMFmA%\'&IXA(G%E.AbE#9%\'A,I#E#K$A*b&<T!AEFCb @! b&T! A.b&3/ A/FTb >Y!E% E( E# b&J% A*&A>F$A#&A/F&"
    + "A(b&-\' b %E b&L! A&F.A$F*A(F+A#=G#9Q%b =_ b=Q$ J+^$A$b=U\' A\'^8 ^$A)Z$^1Z/A#GOA#G8A*b=U! A^b=W$ A+^HG#^^I#G$^$I\'Q)G)^#G(^?G%b=5# G$=A+I$^)G#^#)^AI#A`L5A-L5A-b=8! A*L:b (# B;C;B;C( C3B;C;! B#A#!A#B#A#B% B)C% # C( C,B;C;B# B%A#B) B( C;B# B% B& !A$B( C;B;C;B;C;B;C;B;C;B;C;B;C> B::C::C\'B::C::C\'B::C::C\'B::C::C\'B::C::C\'!#A#JSb= ) GX^%GS^)\'^/\'^#Y&A0G& G0b 1! Z>b D0 C+&CV!C(!#!C#!C$!C7!#!#!#!C$!#!#!#!#!#!#!#F#A/C(AWETG( G2A#G( G# G&A&E`AB\'b Q! FNA$G(E(A#J+A%&=b  & F?\'A2FMG%J+A&;b 1( F<%G%J+b 7$ F?G#&J+A%9b  $ F@ F$\'"
    + "F#\'F(G#F&\'A)&%b A$ F( F% F# F0 b&&$ A#L*G(AJBCCCG(%A%J+A%Y#b 2- L]=L$;L%AnLN=L0b #$ F% F< F# &A#& F+ F% & &A\'&A%& & & F$ F# &A#& & & & & F# &A#F% F( F% F% & F+ F2A&F$ F& F2AUZ#b /% ^MA%b=E! A-^0A#^0 ^0 ^FA+L.b=C# AX^>A.^MA%^*A(^#A/^\'b ;# b=]$ ]&b=;, A#^2A$^.A$b==$ A%^-A%^=A%^YA)^+A\'^IA)^?A#^-A%^#A/Z*AHb=9& A)^/A#^.A$^i =A$^3 ^.A$^-A&b=4#  b==! J+=b &1 b&  %b&  %b&A<#AAb&@%! b&/;!A#b&RU!A0b&O* b CG b&?) b C8 b&,.!A&b&K%#b   %b   %b \'O!b& R#b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   "
    + "%b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b !0 1A?b1A! b  # b\'Q$ b   %b   %b   %b 1Y$b3  %b3  %b3  %b3`a$A#b3  %b3  %b3  %b3`a$"};
};
function c_Interpreter() {
    let a = this; jl_Object.call(a);
    a.$lexer = null;
    a.$ctx = null;
}
let c_Interpreter_eval = ($this, $input) => {
    let $tokens, $parser, $ast, var$5;
    $tokens = c_Lexer_tokenize($this.$lexer, $input);
    $parser = new c_Parser;
    $parser.$pos = 0;
    $parser.$tokens = $tokens;
    $tokens = c_Parser_peek($parser);
    $ast = $tokens.$type;
    ct_TokenType_$callClinit();
    if ($ast === ct_TokenType_IDENT && (c_Parser_peekNext($parser)).$type === ct_TokenType_LPAR) {
        c_Parser_peek($parser);
        $input = (c_Parser_peek($parser)).$text;
        ca_FunctionType_$callClinit();
        $tokens = ju_Arrays_stream(ca_FunctionType_values());
        $ast = new ca_FunctionType$fromIdentifier$lambda$_3_0;
        $ast.$_01 = $input;
        $input = (jusi_SimpleStreamImpl_findFirst(jusi_SimpleStreamImpl_filter($tokens, $ast))).$value5;
        if ($input !== null ? 0 : 1) {
            $input = new ceu_ParseException;
            $tokens = (c_Parser_peek($parser)).$text;
            $parser = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_($parser);
            jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($parser, $rt_s(14)), $tokens), $rt_s(15));
            jl_Exception__init_0($input, jl_AbstractStringBuilder_toString($parser));
            $rt_throw($input);
        }
        if ($input === null) {
            $input = new ju_NoSuchElementException;
            jl_Exception__init_($input);
            $rt_throw($input);
        }
        var$5 = $input;
        c_Parser_consume($parser, ct_TokenType_IDENT);
        c_Parser_consume($parser, ct_TokenType_LPAR);
        if (!((c_Parser_peek($parser)).$type !== ct_TokenType_IDENT && (c_Parser_peek($parser)).$type !== ct_TokenType_LBRACK ? 0 : 1)) {
            $tokens = new ceu_ParseException;
            jl_Exception__init_0($tokens, $rt_s(16));
            $rt_throw($tokens);
        }
        $input = c_Parser_parseExpression($parser);
        c_Parser_consume($parser, ct_TokenType_RPAR);
        $ast = new ca_MonoFunctionNode;
        $ast.$functionType = var$5;
        $ast.$argument = $input;
    } else if ($tokens.$type === ct_TokenType_IDENT && (c_Parser_peekNext($parser)).$type === ct_TokenType_EQUAL) {
        $input = c_Parser_consume($parser, ct_TokenType_IDENT);
        c_Parser_consume($parser, ct_TokenType_EQUAL);
        if ((c_Parser_peek($parser)).$type === ct_TokenType_LBRACK)
            $tokens = c_Parser_parseMatrix($parser);
        else {
            if ((c_Parser_peek($parser)).$type !== ct_TokenType_IDENT && (c_Parser_peek($parser)).$type !== ct_TokenType_NUMBER && (c_Parser_peek($parser)).$type !== ct_TokenType_LPAR) {
                $input = new ceu_ParseException;
                $tokens = (c_Parser_peek($parser)).$text;
                $parser = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_($parser);
                jl_StringBuilder_append(jl_StringBuilder_append($parser, $rt_s(17)), $tokens);
                jl_Exception__init_0($input, jl_AbstractStringBuilder_toString($parser));
                $rt_throw($input);
            }
            $tokens = c_Parser_parseExpression($parser);
        }
        $ast = new ca_AssignNode;
        $ast.$name1 = $input.$text;
        $ast.$value7 = $tokens;
    } else {
        $input = $tokens.$type;
        if ($input !== ct_TokenType_NUMBER && $input !== ct_TokenType_LPAR && $input !== ct_TokenType_IDENT && $input !== ct_TokenType_LBRACK) {
            $input = new ceu_ParseException;
            $tokens = (c_Parser_peek($parser)).$text;
            $parser = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_($parser);
            jl_StringBuilder_append(jl_StringBuilder_append($parser, $rt_s(18)), $tokens);
            jl_Exception__init_0($input, jl_AbstractStringBuilder_toString($parser));
            $rt_throw($input);
        }
        $ast = c_Parser_parseExpression($parser);
    }
    c_Parser_expect($parser, ct_TokenType_EOF);
    return $ast.$execute($this.$ctx);
},
ju_Objects = $rt_classWithoutFields(),
ju_Objects_requireNonNull = $obj => {
    if ($obj !== null)
        return $obj;
    $obj = new jl_NullPointerException;
    jl_Exception__init_0($obj, $rt_s(2));
    $rt_throw($obj);
},
otji_JSWrapper = $rt_classWithoutFields(),
ceu_CommandException = $rt_classWithoutFields(jl_RuntimeException),
c_Lexer = $rt_classWithoutFields(),
c_Lexer_TOKEN_PATTERN = null,
c_Lexer_$callClinit = () => {
    c_Lexer_$callClinit = $rt_eraseClinit(c_Lexer);
    c_Lexer__clinit_();
},
c_Lexer_tokenize = ($this, $input) => {
    let $tokens, var$3, var$4, var$5, var$6, $m;
    $tokens = ju_ArrayList__init_();
    $input = jur_Pattern_matcher(jur_Pattern_compile($rt_s(19)), $input);
    var$3 = new jl_StringBuffer;
    jl_AbstractStringBuilder__init_(var$3);
    $input.$leftBound0 = 0;
    var$4 = $input.$string0.$nativeString.length;
    $input.$rightBound0 = var$4;
    jur_MatchResultImpl_reset($input.$matchResult, $input.$string0, $input.$leftBound0, var$4);
    $input.$appendPos = 0;
    $input.$replacement = null;
    $input.$matchResult.$previousMatch = (-1);
    while (jur_Matcher_find($input)) {
        $input.$processedRepl = jur_Matcher_processReplacement($input, $rt_s(2));
        var$5 = $input.$string0;
        var$6 = $input.$appendPos;
        var$4 = jur_Matcher_start($input);
        jl_StringBuffer_append(var$3, jl_String_substring(var$5, var$6, var$4));
        jl_AbstractStringBuilder_append0(var$3, $input.$processedRepl);
        $input.$appendPos = jur_Matcher_end($input);
    }
    $m = $input.$string0;
    var$6 = $input.$appendPos;
    $input = $m;
    $m = jl_AbstractStringBuilder_toString(jl_StringBuffer_append(var$3, jl_String_substring($input, var$6, $input.$nativeString.length)));
    c_Lexer_$callClinit();
    $m = jur_Pattern_matcher(c_Lexer_TOKEN_PATTERN, $m);
    while (jur_Matcher_find($m)) {
        if (jur_Matcher_group($m, 1) !== null) {
            $input = new ct_Token;
            ct_TokenType_$callClinit();
            ct_Token__init_($input, ct_TokenType_NUMBER, jur_Matcher_group($m, 1));
            ju_ArrayList_add($tokens, $input);
            continue;
        }
        if (jur_Matcher_group($m, 2) !== null) {
            $input = new ct_Token;
            ct_TokenType_$callClinit();
            ct_Token__init_($input, ct_TokenType_IDENT, jur_Matcher_group($m, 2));
            ju_ArrayList_add($tokens, $input);
            continue;
        }
        if (jur_Matcher_group($m, 3) !== null) {
            $input = new ct_Token;
            ct_TokenType_$callClinit();
            ct_Token__init_($input, ct_TokenType_LPAR, $rt_s(20));
            ju_ArrayList_add($tokens, $input);
            continue;
        }
        if (jur_Matcher_group($m, 4) !== null) {
            $input = new ct_Token;
            ct_TokenType_$callClinit();
            ct_Token__init_($input, ct_TokenType_RPAR, $rt_s(21));
            ju_ArrayList_add($tokens, $input);
            continue;
        }
        if (jur_Matcher_group($m, 5) !== null) {
            $input = new ct_Token;
            ct_TokenType_$callClinit();
            ct_Token__init_($input, ct_TokenType_LBRACK, $rt_s(22));
            ju_ArrayList_add($tokens, $input);
            continue;
        }
        if (jur_Matcher_group($m, 6) !== null) {
            $input = new ct_Token;
            ct_TokenType_$callClinit();
            ct_Token__init_($input, ct_TokenType_RBRACK, $rt_s(23));
            ju_ArrayList_add($tokens, $input);
            continue;
        }
        if (jur_Matcher_group($m, 7) !== null) {
            $input = new ct_Token;
            ct_TokenType_$callClinit();
            ct_Token__init_($input, ct_TokenType_COMMA, $rt_s(24));
            ju_ArrayList_add($tokens, $input);
            continue;
        }
        if (jur_Matcher_group($m, 8) !== null) {
            $input = new ct_Token;
            ct_TokenType_$callClinit();
            ct_Token__init_($input, ct_TokenType_EQUAL, $rt_s(25));
            ju_ArrayList_add($tokens, $input);
            continue;
        }
        if (jur_Matcher_group($m, 9) !== null) {
            $input = new ct_Token;
            ct_TokenType_$callClinit();
            ct_Token__init_($input, ct_TokenType_PLUS, $rt_s(26));
            ju_ArrayList_add($tokens, $input);
            continue;
        }
        if (jur_Matcher_group($m, 10) !== null) {
            $input = new ct_Token;
            ct_TokenType_$callClinit();
            ct_Token__init_($input, ct_TokenType_MINUS, $rt_s(27));
            ju_ArrayList_add($tokens, $input);
            continue;
        }
        if (jur_Matcher_group($m, 11) !== null) {
            $input = new ct_Token;
            ct_TokenType_$callClinit();
            ct_Token__init_($input, ct_TokenType_MULT, $rt_s(28));
            ju_ArrayList_add($tokens, $input);
            continue;
        }
        if (jur_Matcher_group($m, 12) === null)
            continue;
        $input = new ct_Token;
        ct_TokenType_$callClinit();
        ct_Token__init_($input, ct_TokenType_DIV, $rt_s(29));
        ju_ArrayList_add($tokens, $input);
    }
    var$3 = new ct_Token;
    ct_TokenType_$callClinit();
    ct_Token__init_(var$3, ct_TokenType_EOF, $rt_s(2));
    ju_ArrayList_add($tokens, var$3);
    return $tokens;
},
c_Lexer__clinit_ = () => {
    c_Lexer_TOKEN_PATTERN = jur_Pattern_compile($rt_s(30));
};
function c_Context() {
    jl_Object.call(this);
    this.$variables = null;
}
let jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException),
ju_Map = $rt_classWithoutFields(0),
ju_Map_replace = ($this, $key, $value) => {
    let var$3;
    var$3 = $this;
    if (!(ju_TreeMap_findExact(var$3, $key) === null ? 0 : 1))
        return null;
    return ju_TreeMap_put(var$3, $key, $value);
},
ju_Map_merge = ($this, $key, $newValue, $remappingFunction) => {
    let var$4, $oldValue;
    ju_Objects_requireNonNull($remappingFunction);
    var$4 = $this;
    $oldValue = ju_TreeMap_findExact(var$4, $key);
    $oldValue = $oldValue === null ? null : $oldValue.$value1;
    if ($oldValue !== null)
        $newValue = $remappingFunction.$apply($oldValue, $newValue);
    if ($newValue !== null)
        ju_TreeMap_put(var$4, $key, $newValue);
    else if (ju_TreeMap_findExact(var$4, $key) !== null) {
        var$4.$root = ju_TreeMap_deleteNode(var$4, var$4.$root, $key);
        var$4.$modCount0 = var$4.$modCount0 + 1 | 0;
    }
    return $newValue;
},
ju_Map_forEach = ($this, $action) => {
    let var$2, $iterator;
    ju_Objects_requireNonNull($action);
    var$2 = ju_TreeMap$EntrySet_iterator(ju_TreeMap_entrySet($this));
    while (ju_TreeMap$EntryIterator_hasNext(var$2)) {
        $iterator = ju_TreeMap$EntryIterator_next(var$2);
        $action.$accept($iterator.$key, $iterator.$value1);
    }
},
ju_AbstractMap = $rt_classWithoutFields(),
ju_AbstractMap_put = ($this, $key, $value) => {
    $key = new jl_UnsupportedOperationException;
    jl_Exception__init_($key);
    $rt_throw($key);
},
ju_AbstractMap_putAll = ($this, $m) => {
    let $iter, var$3, $entry;
    $iter = ju_TreeMap$EntrySet_iterator(ju_TreeMap_entrySet($m));
    while (ju_TreeMap$EntryIterator_hasNext($iter)) {
        $m = ju_TreeMap$EntryIterator_next($iter);
        var$3 = $m.$key;
        $entry = $m.$value1;
        ju_TreeMap_put($this, var$3, $entry);
    }
},
jl_Cloneable = $rt_classWithoutFields(0);
function ju_HashMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$elementCount = 0;
    a.$elementData = null;
    a.$modCount1 = 0;
    a.$loadFactor = 0.0;
    a.$threshold = 0;
}
let ju_HashMap_newElementArray = ($this, $s) => {
    return $rt_createArray(ju_HashMap$HashEntry, $s);
},
ju_HashMap__init_ = $this => {
    let var$1;
    var$1 = ju_HashMap_calculateCapacity(16);
    $this.$elementCount = 0;
    $this.$elementData = $this.$newElementArray(var$1);
    $this.$loadFactor = 0.75;
    ju_HashMap_computeThreshold($this);
},
ju_HashMap__init_0 = () => {
    let var_0 = new ju_HashMap();
    ju_HashMap__init_(var_0);
    return var_0;
},
ju_HashMap_calculateCapacity = $x => {
    let var$2;
    if ($x >= 1073741824)
        return 1073741824;
    if (!$x)
        return 16;
    var$2 = $x - 1 | 0;
    $x = var$2 | var$2 >> 1;
    $x = $x | $x >> 2;
    $x = $x | $x >> 4;
    $x = $x | $x >> 8;
    return ($x | $x >> 16) + 1 | 0;
},
ju_HashMap_computeThreshold = $this => {
    $this.$threshold = $this.$elementData.data.length * $this.$loadFactor | 0;
},
ju_HashMap_entryByKey = ($this, $key) => {
    let $m, $hash;
    if ($key === null)
        $m = ju_HashMap_findNullKeyEntry($this);
    else {
        $hash = jl_String_hashCode($key);
        $m = ju_HashMap_findNonNullKeyEntry($this, $key, $hash & ($this.$elementData.data.length - 1 | 0), $hash);
    }
    return $m;
},
ju_HashMap_findNonNullKeyEntry = ($this, $key, $index, $keyHash) => {
    let $m, var$5;
    $m = $this.$elementData.data[$index];
    while ($m !== null) {
        if ($m.$origKeyHash == $keyHash) {
            var$5 = $m.$key1;
            if ($key !== var$5 && !jl_String_equals($key, var$5) ? 0 : 1)
                break;
        }
        $m = $m.$next4;
    }
    return $m;
},
ju_HashMap_findNullKeyEntry = $this => {
    let $m;
    $m = $this.$elementData.data[0];
    while ($m !== null && $m.$key1 !== null) {
        $m = $m.$next4;
    }
    return $m;
},
ju_HashMap_createHashedEntry = ($this, $key, $index, $hash) => {
    let $entry, var$5;
    $entry = ju_HashMap$HashEntry__init_0($key, $hash);
    var$5 = $this.$elementData.data;
    $entry.$next4 = var$5[$index];
    var$5[$index] = $entry;
    return $entry;
},
ju_HashMap_rehash0 = ($this, $capacity) => {
    let $length, $newData, $i, var$5, $entry, $index, $next;
    $length = ju_HashMap_calculateCapacity(!$capacity ? 1 : $capacity << 1);
    $newData = $this.$newElementArray($length);
    $i = 0;
    $length = $length - 1 | 0;
    while (true) {
        var$5 = $this.$elementData.data;
        if ($i >= var$5.length)
            break;
        $entry = var$5[$i];
        var$5[$i] = null;
        while ($entry !== null) {
            var$5 = $newData.data;
            $index = $entry.$origKeyHash & $length;
            $next = $entry.$next4;
            $entry.$next4 = var$5[$index];
            var$5[$index] = $entry;
            $entry = $next;
        }
        $i = $i + 1 | 0;
    }
    $this.$elementData = $newData;
    ju_HashMap_computeThreshold($this);
},
ju_HashMap_rehash = $this => {
    ju_HashMap_rehash0($this, $this.$elementData.data.length);
};
function jur_Pattern() {
    let a = this; jl_Object.call(a);
    a.$lexemes = null;
    a.$flags = 0;
    a.$backRefs = null;
    a.$needsBackRefReplacement = 0;
    a.$globalGroupIndex = 0;
    a.$compCount = 0;
    a.$consCount = 0;
    a.$start1 = null;
    a.$namedGroups = null;
}
let jur_Pattern_matcher = ($this, $input) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10;
    var$2 = new jur_Matcher;
    var$2.$leftBound0 = (-1);
    var$2.$rightBound0 = (-1);
    var$2.$pat = $this;
    var$2.$start2 = $this.$start1;
    var$2.$string0 = $input;
    var$2.$leftBound0 = 0;
    var$3 = $input.$nativeString.length;
    var$2.$rightBound0 = var$3;
    var$4 = new jur_MatchResultImpl;
    var$5 = var$2.$leftBound0;
    var$6 = $this.$globalGroupIndex;
    var$7 = $this.$compCount + 1 | 0;
    var$8 = $this.$consCount + 1 | 0;
    var$9 = $this.$namedGroups;
    var$4.$previousMatch = (-1);
    var$6 = var$6 + 1 | 0;
    var$4.$groupCount = var$6;
    var$4.$groupBounds = $rt_createIntArray(var$6 * 2 | 0);
    var$4.$namedGroups0 = var$9;
    var$10 = $rt_createIntArray(var$8);
    var$4.$consumers = var$10;
    ju_Arrays_fill(var$10, (-1));
    if (var$7 > 0)
        var$4.$compQuantCounters = $rt_createIntArray(var$7);
    ju_Arrays_fill(var$4.$groupBounds, (-1));
    jur_MatchResultImpl_reset(var$4, $input, var$5, var$3);
    var$2.$matchResult = var$4;
    var$4.$anchoringBounds = 1;
    return var$2;
},
jur_Pattern_pattern = $this => {
    return $this.$lexemes.$orig;
},
jur_Pattern_processExpression = ($this, $ch, $newFlags, $last) => {
    let $children, $saveFlags, $saveChangedFlags, $fSet, $child, var$9, var$10, var$11, var$12;
    $children = ju_ArrayList__init_();
    $saveFlags = $this.$flags;
    $saveChangedFlags = 0;
    if ($newFlags != $saveFlags)
        $this.$flags = $newFlags;
    a: {
        switch ($ch) {
            case -1073741784:
                $fSet = new jur_NonCapFSet;
                $newFlags = $this.$consCount + 1 | 0;
                $this.$consCount = $newFlags;
                jur_FSet__init_($fSet, $newFlags);
                break a;
            case -536870872:
            case -268435416:
                break;
            case -134217688:
            case -67108824:
                $fSet = new jur_BehindFSet;
                $newFlags = $this.$consCount + 1 | 0;
                $this.$consCount = $newFlags;
                jur_FSet__init_($fSet, $newFlags);
                break a;
            case -33554392:
                $fSet = new jur_AtomicFSet;
                $newFlags = $this.$consCount + 1 | 0;
                $this.$consCount = $newFlags;
                jur_FSet__init_($fSet, $newFlags);
                break a;
            default:
                $newFlags = $this.$globalGroupIndex + 1 | 0;
                $this.$globalGroupIndex = $newFlags;
                if ($last === null) {
                    $fSet = new jur_FinalSet;
                    jur_FSet__init_($fSet, 0);
                    $saveChangedFlags = 1;
                } else {
                    $fSet = jur_FSet__init_0($newFlags);
                    if ($ch == (-2130706392)) {
                        if ($this.$namedGroups === null) {
                            $child = new ju_LinkedHashMap;
                            ju_HashMap__init_($child);
                            $child.$accessOrder = 0;
                            $child.$head = null;
                            $this.$namedGroups = $child;
                        }
                        $child = $this.$namedGroups;
                        var$9 = $this.$lexemes.$groupName;
                        var$10 = $this.$globalGroupIndex;
                        jl_Integer_$callClinit();
                        if (var$10 >= (-128) && var$10 <= 127) {
                            b: {
                                if (jl_Integer_integerCache === null) {
                                    jl_Integer_integerCache = $rt_createArray(jl_Integer, 256);
                                    var$11 = 0;
                                    while (true) {
                                        var$12 = jl_Integer_integerCache.data;
                                        if (var$11 >= var$12.length)
                                            break b;
                                        var$12[var$11] = jl_Integer__init_(var$11 - 128 | 0);
                                        var$11 = var$11 + 1 | 0;
                                    }
                                }
                            }
                            $last = jl_Integer_integerCache.data[var$10 + 128 | 0];
                        } else
                            $last = jl_Integer__init_(var$10);
                        $child.$put(var$9, $last);
                    }
                }
                var$10 = $this.$globalGroupIndex;
                if (var$10 <= (-1))
                    break a;
                if (var$10 >= 10)
                    break a;
                $this.$backRefs.data[var$10] = $fSet;
                break a;
        }
        $fSet = new jur_AheadFSet;
        jur_FSet__init_($fSet, (-1));
    }
    while (true) {
        if (jur_Lexer_isLetter($this.$lexemes) && $this.$lexemes.$lookAhead == (-536870788)) {
            $last = jur_CharClass__init_0(jur_Pattern_hasFlag($this, 2), jur_Pattern_hasFlag($this, 64));
            while (!jur_Lexer_isEmpty($this.$lexemes) && jur_Lexer_isLetter($this.$lexemes)) {
                $child = $this.$lexemes;
                var$10 = $child.$lookAhead;
                if (var$10 && var$10 != (-536870788) && var$10 != (-536870871))
                    break;
                jur_CharClass_add0($last, jur_Lexer_next($child));
                $child = $this.$lexemes;
                if ($child.$ch != (-536870788))
                    continue;
                jur_Lexer_next($child);
            }
            $child = jur_Pattern_processRangeSet($this, $last);
            $child.$setNext($fSet);
        } else if ($this.$lexemes.$ch == (-536870788)) {
            $child = jur_EmptySet__init_($fSet);
            jur_Lexer_next($this.$lexemes);
        } else {
            $child = jur_Pattern_processSubExpression($this, $fSet);
            $last = $this.$lexemes;
            if ($last.$ch == (-536870788))
                jur_Lexer_next($last);
        }
        if ($child !== null)
            ju_ArrayList_add($children, $child);
        if (jur_Lexer_isEmpty($this.$lexemes))
            break;
        if ($this.$lexemes.$ch == (-536870871))
            break;
    }
    if ($this.$lexemes.$lookBack == (-536870788))
        ju_ArrayList_add($children, jur_EmptySet__init_($fSet));
    if ($this.$flags != $saveFlags && !$saveChangedFlags) {
        $this.$flags = $saveFlags;
        $last = $this.$lexemes;
        $last.$flags0 = $saveFlags;
        $last.$lookAhead = $last.$ch;
        $last.$lookAheadST = $last.$curST;
        $saveChangedFlags = $last.$curToc;
        $last.$index = $saveChangedFlags + 1 | 0;
        $last.$lookAheadToc = $saveChangedFlags;
        jur_Lexer_movePointer($last);
    }
    switch ($ch) {
        case -1073741784:
            break;
        case -536870872:
            $last = new jur_PositiveLookAhead;
            jur_JointSet__init_($last, $children, $fSet);
            return $last;
        case -268435416:
            $last = new jur_NegativeLookAhead;
            jur_JointSet__init_($last, $children, $fSet);
            return $last;
        case -134217688:
            $last = new jur_PositiveLookBehind;
            jur_JointSet__init_($last, $children, $fSet);
            return $last;
        case -67108824:
            $last = new jur_NegativeLookBehind;
            jur_JointSet__init_($last, $children, $fSet);
            return $last;
        case -33554392:
            $last = new jur_AtomicJointSet;
            jur_JointSet__init_($last, $children, $fSet);
            return $last;
        default:
            switch ($children.$size) {
                case 0:
                    break;
                case 1:
                    return jur_SingleSet__init_0(ju_ArrayList_get($children, 0), $fSet);
                default:
                    return jur_JointSet__init_0($children, $fSet);
            }
            return jur_EmptySet__init_($fSet);
    }
    $last = new jur_NonCapJointSet;
    jur_JointSet__init_($last, $children, $fSet);
    return $last;
},
jur_Pattern_processDecomposedChar = $this => {
    let $codePoints, $curSymb, $curSymbIndex, $codePointsHangul, var$5, var$6, $readCodePoints;
    $codePoints = $rt_createIntArray(4);
    $curSymb = (-1);
    $curSymbIndex = (-1);
    if (!jur_Lexer_isEmpty($this.$lexemes) && jur_Lexer_isLetter($this.$lexemes)) {
        $codePointsHangul = $codePoints.data;
        $curSymb = jur_Lexer_next($this.$lexemes);
        $codePointsHangul[0] = $curSymb;
        $curSymbIndex = $curSymb - 4352 | 0;
    }
    if ($curSymbIndex >= 0 && $curSymbIndex < 19) {
        $codePointsHangul = $rt_createCharArray(3);
        $codePoints = $codePointsHangul.data;
        $codePoints[0] = $curSymb & 65535;
        var$5 = $this.$lexemes;
        var$6 = var$5.$ch;
        $readCodePoints = var$6 - 4449 | 0;
        if ($readCodePoints >= 0 && $readCodePoints < 21) {
            $codePoints[1] = var$6 & 65535;
            jur_Lexer_next(var$5);
            var$5 = $this.$lexemes;
            var$6 = var$5.$ch;
            $curSymb = var$6 - 4519 | 0;
            if ($curSymb >= 0 && $curSymb < 28) {
                $codePoints[2] = var$6 & 65535;
                jur_Lexer_next(var$5);
                return jur_HangulDecomposedCharSet__init_($codePointsHangul, 3);
            }
            return jur_HangulDecomposedCharSet__init_($codePointsHangul, 2);
        }
        if (!jur_Pattern_hasFlag($this, 2))
            return jur_CharSet__init_($codePoints[0]);
        if (jur_Pattern_hasFlag($this, 64))
            return jur_UCICharSet__init_($codePoints[0]);
        return jur_CICharSet__init_($codePoints[0]);
    }
    $codePointsHangul = $codePoints.data;
    $curSymb = 1;
    while ($curSymb < 4 && !jur_Lexer_isEmpty($this.$lexemes) && jur_Lexer_isLetter($this.$lexemes)) {
        $readCodePoints = $curSymb + 1 | 0;
        $codePointsHangul[$curSymb] = jur_Lexer_next($this.$lexemes);
        $curSymb = $readCodePoints;
    }
    if ($curSymb == 1) {
        $readCodePoints = $codePointsHangul[0];
        if (!(jur_Lexer_singleDecompTable.$get0($readCodePoints) == jur_Lexer_singleDecompTableSize ? 0 : 1))
            return jur_Pattern_processCharSet($this, $codePointsHangul[0]);
    }
    if (!jur_Pattern_hasFlag($this, 2))
        return jur_DecomposedCharSet__init_0($codePoints, $curSymb);
    if (jur_Pattern_hasFlag($this, 64)) {
        var$5 = new jur_UCIDecomposedCharSet;
        jur_DecomposedCharSet__init_(var$5, $codePoints, $curSymb);
        return var$5;
    }
    var$5 = new jur_CIDecomposedCharSet;
    jur_DecomposedCharSet__init_(var$5, $codePoints, $curSymb);
    return var$5;
},
jur_Pattern_processSubExpression = ($this, $last) => {
    let $cur, $term, var$4, var$5, var$6, $next, var$8;
    if (jur_Lexer_isLetter($this.$lexemes) && !jur_Lexer_isNextSpecial($this.$lexemes) && jur_Lexer_isLetter0($this.$lexemes.$lookAhead)) {
        if (jur_Pattern_hasFlag($this, 128)) {
            $cur = jur_Pattern_processDecomposedChar($this);
            if (!jur_Lexer_isEmpty($this.$lexemes)) {
                $term = $this.$lexemes;
                var$4 = $term.$ch;
                if (!(var$4 == (-536870871) && !($last instanceof jur_FinalSet)) && var$4 != (-536870788) && !jur_Lexer_isLetter($term))
                    $cur = jur_Pattern_processQuantifier($this, $last, $cur);
            }
        } else if (!jur_Lexer_isHighSurrogate0($this.$lexemes) && !jur_Lexer_isLowSurrogate0($this.$lexemes)) {
            $term = new jl_StringBuffer;
            jl_AbstractStringBuilder__init_($term);
            while (!jur_Lexer_isEmpty($this.$lexemes) && jur_Lexer_isLetter($this.$lexemes) && !jur_Lexer_isHighSurrogate0($this.$lexemes) && !jur_Lexer_isLowSurrogate0($this.$lexemes)) {
                if (!(!jur_Lexer_isNextSpecial($this.$lexemes) && !$this.$lexemes.$lookAhead) && !(!jur_Lexer_isNextSpecial($this.$lexemes) && jur_Lexer_isLetter0($this.$lexemes.$lookAhead))) {
                    var$5 = $this.$lexemes.$lookAhead;
                    if (var$5 != (-536870871) && (var$5 & (-2147418113)) != (-2147483608) && var$5 != (-536870788) && var$5 != (-536870876))
                        break;
                }
                var$4 = jur_Lexer_next($this.$lexemes);
                if (!jl_Character_isSupplementaryCodePoint(var$4))
                    jl_AbstractStringBuilder_append($term, var$4 & 65535);
                else
                    jl_AbstractStringBuilder_append1($term, jl_Character_toChars(var$4));
            }
            if (!jur_Pattern_hasFlag($this, 2)) {
                $cur = new jur_SequenceSet;
                jur_LeafSet__init_($cur);
                $cur.$string = jl_AbstractStringBuilder_toString($term);
                var$4 = $term.$length0;
                $cur.$charCount0 = var$4;
                $cur.$leftToRight = jur_SequenceSet$IntHash__init_(var$4);
                $cur.$rightToLeft = jur_SequenceSet$IntHash__init_($cur.$charCount0);
                var$6 = 0;
                while (var$6 < ($cur.$charCount0 - 1 | 0)) {
                    jur_SequenceSet$IntHash_put($cur.$leftToRight, jl_String_charAt($cur.$string, var$6), ($cur.$charCount0 - var$6 | 0) - 1 | 0);
                    jur_SequenceSet$IntHash_put($cur.$rightToLeft, jl_String_charAt($cur.$string, ($cur.$charCount0 - var$6 | 0) - 1 | 0), ($cur.$charCount0 - var$6 | 0) - 1 | 0);
                    var$6 = var$6 + 1 | 0;
                }
            } else
                $cur = jur_Pattern_hasFlag($this, 64) ? jur_UCISequenceSet__init_0($term) : jur_CISequenceSet__init_0($term);
        } else
            $cur = jur_Pattern_processQuantifier($this, $last, jur_Pattern_processTerminal($this, $last));
    } else {
        $term = $this.$lexemes;
        if ($term.$ch != (-536870871))
            $cur = jur_Pattern_processQuantifier($this, $last, jur_Pattern_processTerminal($this, $last));
        else {
            if ($last instanceof jur_FinalSet)
                $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $term.$orig, $term.$curToc));
            $cur = jur_EmptySet__init_($last);
        }
    }
    a: {
        if (!jur_Lexer_isEmpty($this.$lexemes)) {
            var$4 = $this.$lexemes.$ch;
            if (!(var$4 == (-536870871) && !($last instanceof jur_FinalSet)) && var$4 != (-536870788)) {
                $next = jur_Pattern_processSubExpression($this, $last);
                if ($cur instanceof jur_LeafQuantifierSet && !($cur instanceof jur_CompositeQuantifierSet) && !($cur instanceof jur_GroupQuantifierSet) && !($cur instanceof jur_AltQuantifierSet)) {
                    var$8 = $cur;
                    $term = var$8;
                    if (!$next.$first($term.$innerSet)) {
                        $cur = new jur_UnifiedQuantifierSet;
                        $term = $term.$innerSet;
                        var$8 = var$8;
                        jur_LeafQuantifierSet__init_($cur, $term, var$8.$next3, var$8.$type0);
                        $cur.$innerSet.$setNext($cur);
                    }
                }
                if (($next.$getType0() & 65535) != 43)
                    $cur.$setNext($next);
                else
                    $cur.$setNext($next.$innerSet);
                break a;
            }
        }
        if ($cur === null)
            return null;
        $cur.$setNext($last);
    }
    if (($cur.$getType0() & 65535) != 43)
        return $cur;
    return $cur.$innerSet;
},
jur_Pattern_processQuantifier = ($this, $last, $term) => {
    let $q, $quant, $q_0, var$6, $leaf;
    $q = $this.$lexemes;
    $quant = $q.$ch;
    if ($term !== null && !($term instanceof jur_LeafSet)) {
        switch ($quant) {
            case -2147483606:
                jur_Lexer_next($q);
                $q = new jur_PossessiveGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, $quant);
                jur_FSet_$callClinit();
                $term.$setNext(jur_FSet_posFSet);
                return $q;
            case -2147483605:
                jur_Lexer_next($q);
                $q = new jur_PosPlusGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, (-2147483606));
                jur_FSet_$callClinit();
                $term.$setNext(jur_FSet_posFSet);
                return $q;
            case -2147483585:
                jur_Lexer_next($q);
                $q = new jur_PosAltGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, (-536870849));
                jur_FSet_$callClinit();
                $term.$setNext(jur_FSet_posFSet);
                return $q;
            case -2147483525:
                $q_0 = new jur_PosCompositeGroupQuantifierSet;
                $q = jur_Lexer_nextSpecial($q);
                var$6 = $this.$compCount + 1 | 0;
                $this.$compCount = var$6;
                jur_CompositeGroupQuantifierSet__init_($q_0, $q, $term, $last, (-536870849), var$6);
                jur_FSet_$callClinit();
                $term.$setNext(jur_FSet_posFSet);
                return $q_0;
            case -1073741782:
            case -1073741781:
                jur_Lexer_next($q);
                $q = new jur_ReluctantGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, $quant);
                $term.$setNext($q);
                return $q;
            case -1073741761:
                jur_Lexer_next($q);
                $q = new jur_RelAltGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, (-536870849));
                $term.$setNext($last);
                return $q;
            case -1073741701:
                $q_0 = new jur_RelCompositeGroupQuantifierSet;
                $q = jur_Lexer_nextSpecial($q);
                $quant = $this.$compCount + 1 | 0;
                $this.$compCount = $quant;
                jur_CompositeGroupQuantifierSet__init_($q_0, $q, $term, $last, (-536870849), $quant);
                $term.$setNext($q_0);
                return $q_0;
            case -536870870:
            case -536870869:
                jur_Lexer_next($q);
                if ($term.$getType0() != (-2147483602)) {
                    $q = new jur_GroupQuantifierSet;
                    jur_QuantifierSet__init_($q, $term, $last, $quant);
                } else if (jur_Pattern_hasFlag($this, 32)) {
                    $q = new jur_DotAllQuantifierSet;
                    jur_QuantifierSet__init_($q, $term, $last, $quant);
                } else {
                    $q = new jur_DotQuantifierSet;
                    $q_0 = jur_AbstractLineTerminator_getInstance($this.$flags);
                    jur_QuantifierSet__init_($q, $term, $last, $quant);
                    $q.$lt = $q_0;
                }
                $term.$setNext($q);
                return $q;
            case -536870849:
                jur_Lexer_next($q);
                $q = new jur_AltGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, (-536870849));
                $term.$setNext($last);
                return $q;
            case -536870789:
                $q_0 = new jur_CompositeGroupQuantifierSet;
                $q = jur_Lexer_nextSpecial($q);
                $quant = $this.$compCount + 1 | 0;
                $this.$compCount = $quant;
                jur_CompositeGroupQuantifierSet__init_($q_0, $q, $term, $last, (-536870849), $quant);
                $term.$setNext($q_0);
                return $q_0;
            default:
        }
        return $term;
    }
    $leaf = null;
    if ($term !== null)
        $leaf = $term;
    switch ($quant) {
        case -2147483606:
        case -2147483605:
            jur_Lexer_next($q);
            $q = new jur_PossessiveQuantifierSet;
            jur_LeafQuantifierSet__init_($q, $leaf, $last, $quant);
            $leaf.$next3 = $q;
            return $q;
        case -2147483585:
            jur_Lexer_next($q);
            $term = new jur_PossessiveAltQuantifierSet;
            jur_LeafQuantifierSet__init_($term, $leaf, $last, (-2147483585));
            return $term;
        case -2147483525:
            $term = new jur_PossessiveCompositeQuantifierSet;
            jur_CompositeQuantifierSet__init_($term, jur_Lexer_nextSpecial($q), $leaf, $last, (-2147483525));
            return $term;
        case -1073741782:
        case -1073741781:
            jur_Lexer_next($q);
            $q = new jur_ReluctantQuantifierSet;
            jur_LeafQuantifierSet__init_($q, $leaf, $last, $quant);
            $leaf.$next3 = $q;
            return $q;
        case -1073741761:
            jur_Lexer_next($q);
            $term = new jur_ReluctantAltQuantifierSet;
            jur_LeafQuantifierSet__init_($term, $leaf, $last, (-1073741761));
            return $term;
        case -1073741701:
            $term = new jur_ReluctantCompositeQuantifierSet;
            jur_CompositeQuantifierSet__init_($term, jur_Lexer_nextSpecial($q), $leaf, $last, (-1073741701));
            return $term;
        case -536870870:
        case -536870869:
            jur_Lexer_next($q);
            $q = jur_LeafQuantifierSet__init_0($leaf, $last, $quant);
            $leaf.$next3 = $q;
            return $q;
        case -536870849:
            jur_Lexer_next($q);
            $term = new jur_AltQuantifierSet;
            jur_LeafQuantifierSet__init_($term, $leaf, $last, (-536870849));
            return $term;
        case -536870789:
            return jur_CompositeQuantifierSet__init_0(jur_Lexer_nextSpecial($q), $leaf, $last, (-536870789));
        default:
    }
    return $term;
},
jur_Pattern_processTerminal = ($this, $last) => {
    let $term, var$3, var$4, $ch, $newFlags, $number, $negative, $cc;
    $term = null;
    var$3 = $last instanceof jur_FinalSet;
    while (true) {
        a: {
            var$4 = $this.$lexemes;
            $ch = var$4.$ch;
            if (($ch & (-2147418113)) == (-2147483608)) {
                jur_Lexer_next(var$4);
                $newFlags = ($ch & 16711680) >> 16;
                $ch = $ch & (-16711681);
                if ($ch == (-16777176))
                    $this.$flags = $newFlags;
                else {
                    if ($ch != (-1073741784))
                        $newFlags = $this.$flags;
                    $term = jur_Pattern_processExpression($this, $ch, $newFlags, $last);
                    var$4 = $this.$lexemes;
                    if (var$4.$ch != (-536870871))
                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), var$4.$orig, var$4.$curToc));
                    jur_Lexer_next(var$4);
                }
            } else {
                b: {
                    c: {
                        switch ($ch) {
                            case -2147483599:
                            case -2147483598:
                            case -2147483597:
                            case -2147483596:
                            case -2147483595:
                            case -2147483594:
                            case -2147483593:
                            case -2147483592:
                            case -2147483591:
                                break c;
                            case -2147483583:
                                break;
                            case -2147483582:
                                jur_Lexer_next(var$4);
                                $term = jur_WordBoundary__init_(0);
                                break a;
                            case -2147483577:
                                jur_Lexer_next(var$4);
                                $term = new jur_PreviousMatch;
                                jur_AbstractSet__init_($term);
                                break a;
                            case -2147483558:
                                jur_Lexer_next(var$4);
                                $term = new jur_EOLSet;
                                $number = $this.$consCount + 1 | 0;
                                $this.$consCount = $number;
                                jur_EOLSet__init_($term, $number);
                                break a;
                            case -2147483550:
                                jur_Lexer_next(var$4);
                                $term = jur_WordBoundary__init_(1);
                                break a;
                            case -2147483526:
                                jur_Lexer_next(var$4);
                                $term = new jur_EOISet;
                                jur_AbstractSet__init_($term);
                                break a;
                            case -536870876:
                                jur_Lexer_next(var$4);
                                $this.$consCount = $this.$consCount + 1 | 0;
                                if (jur_Pattern_hasFlag($this, 8)) {
                                    if (jur_Pattern_hasFlag($this, 1)) {
                                        $term = jur_UMultiLineEOLSet__init_0($this.$consCount);
                                        break a;
                                    }
                                    $term = jur_MultiLineEOLSet__init_($this.$consCount);
                                    break a;
                                }
                                if (jur_Pattern_hasFlag($this, 1)) {
                                    $term = jur_UEOLSet__init_($this.$consCount);
                                    break a;
                                }
                                $term = jur_EOLSet__init_0($this.$consCount);
                                break a;
                            case -536870866:
                                jur_Lexer_next(var$4);
                                if (jur_Pattern_hasFlag($this, 32)) {
                                    $term = jur_DotAllSet__init_0();
                                    break a;
                                }
                                $term = jur_DotSet__init_0(jur_AbstractLineTerminator_getInstance($this.$flags));
                                break a;
                            case -536870821:
                                jur_Lexer_next(var$4);
                                $negative = 0;
                                $term = $this.$lexemes;
                                if ($term.$ch == (-536870818)) {
                                    $negative = 1;
                                    jur_Lexer_next($term);
                                }
                                $term = jur_Pattern_processRangeSet($this, jur_Pattern_processRangeExpression($this, $negative));
                                $term.$setNext($last);
                                var$4 = $this.$lexemes;
                                if (var$4.$ch != (-536870819))
                                    $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), var$4.$orig, var$4.$curToc));
                                jur_Lexer_setMode(var$4, 1);
                                jur_Lexer_next($this.$lexemes);
                                break a;
                            case -536870818:
                                jur_Lexer_next(var$4);
                                $this.$consCount = $this.$consCount + 1 | 0;
                                if (!jur_Pattern_hasFlag($this, 8)) {
                                    $term = new jur_SOLSet;
                                    jur_AbstractSet__init_($term);
                                    break a;
                                }
                                $term = new jur_MultiLineSOLSet;
                                var$4 = jur_AbstractLineTerminator_getInstance($this.$flags);
                                jur_AbstractSet__init_($term);
                                $term.$lt1 = var$4;
                                break a;
                            case 0:
                                $cc = var$4.$curST;
                                if ($cc !== null)
                                    $term = jur_Pattern_processRangeSet($this, $cc);
                                else {
                                    if (jur_Lexer_isEmpty(var$4)) {
                                        $term = jur_EmptySet__init_($last);
                                        break a;
                                    }
                                    $term = jur_CharSet__init_($ch & 65535);
                                }
                                jur_Lexer_next($this.$lexemes);
                                break a;
                            default:
                                break b;
                        }
                        jur_Lexer_next(var$4);
                        $term = new jur_SOLSet;
                        jur_AbstractSet__init_($term);
                        break a;
                    }
                    $number = ($ch & 2147483647) - 48 | 0;
                    if ($this.$globalGroupIndex < $number)
                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Lexer_toString(var$4), jur_Lexer_getIndex($this.$lexemes)));
                    jur_Lexer_next(var$4);
                    $this.$consCount = $this.$consCount + 1 | 0;
                    $term = !jur_Pattern_hasFlag($this, 2) ? jur_BackReferenceSet__init_($number, $this.$consCount) : jur_Pattern_hasFlag($this, 64) ? jur_UCIBackReferenceSet__init_0($number, $this.$consCount) : jur_CIBackReferenceSet__init_0($number, $this.$consCount);
                    $this.$backRefs.data[$number].$isBackReferenced = 1;
                    $this.$needsBackRefReplacement = 1;
                    break a;
                }
                if ($ch >= 0 && !jur_Lexer_isSpecial(var$4)) {
                    $term = jur_Pattern_processCharSet($this, $ch);
                    jur_Lexer_next($this.$lexemes);
                } else if ($ch == (-536870788))
                    $term = jur_EmptySet__init_($last);
                else {
                    if ($ch != (-536870871)) {
                        $last = new jur_PatternSyntaxException;
                        $term = !jur_Lexer_isSpecial($this.$lexemes) ? jl_Character_toString($ch & 65535) : $this.$lexemes.$curST.$toString();
                        var$4 = $this.$lexemes;
                        jur_PatternSyntaxException__init_0($last, $term, var$4.$orig, var$4.$curToc);
                        $rt_throw($last);
                    }
                    if (var$3) {
                        $last = new jur_PatternSyntaxException;
                        var$4 = $this.$lexemes;
                        jur_PatternSyntaxException__init_0($last, $rt_s(2), var$4.$orig, var$4.$curToc);
                        $rt_throw($last);
                    }
                    $term = jur_EmptySet__init_($last);
                }
            }
        }
        if ($ch != (-16777176))
            break;
    }
    return $term;
},
jur_Pattern_processRangeExpression = ($this, $alt) => {
    let $res, $buffer, $intersection, $notClosed, $firstInClass, $cs, $cur, $negative, $$je;
    $res = jur_CharClass__init_0(jur_Pattern_hasFlag($this, 2), jur_Pattern_hasFlag($this, 64));
    jur_AbstractCharClass_setNegative($res, $alt);
    $buffer = (-1);
    $intersection = 0;
    $notClosed = 0;
    $firstInClass = 1;
    a: {
        b: {
            c: while (true) {
                if (jur_Lexer_isEmpty($this.$lexemes))
                    break a;
                $cs = $this.$lexemes;
                $alt = $cs.$ch;
                $notClosed = $alt == (-536870819) && !$firstInClass ? 0 : 1;
                if (!$notClosed)
                    break a;
                d: {
                    switch ($alt) {
                        case -536870874:
                            if ($buffer >= 0)
                                jur_CharClass_add0($res, $buffer);
                            $buffer = jur_Lexer_next($this.$lexemes);
                            $cs = $this.$lexemes;
                            if ($cs.$ch != (-536870874)) {
                                $buffer = 38;
                                break d;
                            }
                            if ($cs.$lookAhead == (-536870821)) {
                                jur_Lexer_next($cs);
                                $intersection = 1;
                                $buffer = (-1);
                                break d;
                            }
                            jur_Lexer_next($cs);
                            if ($firstInClass) {
                                $res = jur_Pattern_processRangeExpression($this, 0);
                                break d;
                            }
                            if ($this.$lexemes.$ch == (-536870819))
                                break d;
                            jur_CharClass_intersection($res, jur_Pattern_processRangeExpression($this, 0));
                            break d;
                        case -536870867:
                            if (!$firstInClass) {
                                $alt = $cs.$lookAhead;
                                if ($alt != (-536870819) && $alt != (-536870821) && $buffer >= 0) {
                                    jur_Lexer_next($cs);
                                    $cs = $this.$lexemes;
                                    $cur = $cs.$ch;
                                    if (jur_Lexer_isSpecial($cs))
                                        break c;
                                    if ($cur < 0) {
                                        $negative = $this.$lexemes.$lookAhead;
                                        if ($negative != (-536870819) && $negative != (-536870821) && $buffer >= 0)
                                            break c;
                                    }
                                    e: {
                                        try {
                                            if (jur_Lexer_isLetter0($cur))
                                                break e;
                                            $cur = $cur & 65535;
                                            break e;
                                        } catch ($$e) {
                                            $$je = $rt_wrapException($$e);
                                            if ($$je instanceof jl_Exception) {
                                                break b;
                                            } else {
                                                throw $$e;
                                            }
                                        }
                                    }
                                    try {
                                        jur_CharClass_add($res, $buffer, $cur);
                                    } catch ($$e) {
                                        $$je = $rt_wrapException($$e);
                                        if ($$je instanceof jl_Exception) {
                                            break b;
                                        } else {
                                            throw $$e;
                                        }
                                    }
                                    jur_Lexer_next($this.$lexemes);
                                    $buffer = (-1);
                                    break d;
                                }
                            }
                            if ($buffer >= 0)
                                jur_CharClass_add0($res, $buffer);
                            $buffer = 45;
                            jur_Lexer_next($this.$lexemes);
                            break d;
                        case -536870821:
                            if ($buffer >= 0) {
                                jur_CharClass_add0($res, $buffer);
                                $buffer = (-1);
                            }
                            jur_Lexer_next($this.$lexemes);
                            $negative = 0;
                            $cs = $this.$lexemes;
                            if ($cs.$ch == (-536870818)) {
                                jur_Lexer_next($cs);
                                $negative = 1;
                            }
                            if (!$intersection)
                                jur_CharClass_union($res, jur_Pattern_processRangeExpression($this, $negative));
                            else
                                jur_CharClass_intersection($res, jur_Pattern_processRangeExpression($this, $negative));
                            $intersection = 0;
                            jur_Lexer_next($this.$lexemes);
                            break d;
                        case -536870819:
                            if ($buffer >= 0)
                                jur_CharClass_add0($res, $buffer);
                            $buffer = 93;
                            jur_Lexer_next($this.$lexemes);
                            break d;
                        case -536870818:
                            if ($buffer >= 0)
                                jur_CharClass_add0($res, $buffer);
                            $buffer = 94;
                            jur_Lexer_next($this.$lexemes);
                            break d;
                        case 0:
                            if ($buffer >= 0)
                                jur_CharClass_add0($res, $buffer);
                            $cs = $this.$lexemes.$curST;
                            if ($cs === null)
                                $buffer = 0;
                            else {
                                jur_CharClass_add1($res, $cs);
                                $buffer = (-1);
                            }
                            jur_Lexer_next($this.$lexemes);
                            break d;
                        default:
                    }
                    if ($buffer >= 0)
                        jur_CharClass_add0($res, $buffer);
                    $buffer = jur_Lexer_next($this.$lexemes);
                }
                $firstInClass = 0;
            }
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Pattern_pattern($this), $this.$lexemes.$curToc));
        }
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Pattern_pattern($this), $this.$lexemes.$curToc));
    }
    if (!$notClosed) {
        if ($buffer >= 0)
            jur_CharClass_add0($res, $buffer);
        return $res;
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Pattern_pattern($this), $this.$lexemes.$curToc - 1 | 0));
},
jur_Pattern_processCharSet = ($this, $ch) => {
    let $isSupplCodePoint, var$3, var$4;
    $isSupplCodePoint = jl_Character_isSupplementaryCodePoint($ch);
    if (jur_Pattern_hasFlag($this, 2)) {
        a: {
            if (!($ch >= 97 && $ch <= 122)) {
                if ($ch < 65)
                    break a;
                if ($ch > 90)
                    break a;
            }
            return jur_CICharSet__init_($ch & 65535);
        }
        if (jur_Pattern_hasFlag($this, 64) && $ch > 128) {
            if ($isSupplCodePoint) {
                var$3 = new jur_UCISupplCharSet;
                jur_LeafSet__init_(var$3);
                var$3.$charCount0 = 2;
                var$3.$ch4 = jl_Character_toLowerCase0(jl_Character_toUpperCase0($ch));
                return var$3;
            }
            if (jur_Lexer_isLowSurrogate($ch))
                return jur_LowSurrogateCharSet__init_($ch & 65535);
            if (!jur_Lexer_isHighSurrogate($ch))
                return jur_UCICharSet__init_($ch & 65535);
            return jur_HighSurrogateCharSet__init_($ch & 65535);
        }
    }
    if (!$isSupplCodePoint) {
        if (jur_Lexer_isLowSurrogate($ch))
            return jur_LowSurrogateCharSet__init_($ch & 65535);
        if (!jur_Lexer_isHighSurrogate($ch))
            return jur_CharSet__init_($ch & 65535);
        return jur_HighSurrogateCharSet__init_($ch & 65535);
    }
    var$3 = new jur_SupplCharSet;
    jur_LeafSet__init_(var$3);
    var$3.$charCount0 = 2;
    var$3.$ch1 = $ch;
    var$4 = (jl_Character_toChars($ch)).data;
    var$3.$high0 = var$4[0];
    var$3.$low0 = var$4[1];
    return var$3;
},
jur_Pattern_processRangeSet = ($this, $charClass) => {
    let $surrogates, $lowHighSurrRangeSet, var$4;
    if (!jur_AbstractCharClass_hasLowHighSurrogates($charClass)) {
        if (!$charClass.$mayContainSupplCodepoints) {
            if ($charClass.$hasUCI())
                return jur_UCIRangeSet__init_($charClass);
            return jur_RangeSet__init_($charClass);
        }
        if (!$charClass.$hasUCI())
            return jur_SupplRangeSet__init_0($charClass);
        $surrogates = new jur_UCISupplRangeSet;
        jur_SupplRangeSet__init_($surrogates, $charClass);
        return $surrogates;
    }
    $surrogates = jur_AbstractCharClass_getSurrogates($charClass);
    $lowHighSurrRangeSet = new jur_LowHighSurrogateRangeSet;
    jur_AbstractSet__init_($lowHighSurrRangeSet);
    $lowHighSurrRangeSet.$surrChars = $surrogates;
    $lowHighSurrRangeSet.$alt1 = $surrogates.$alt;
    if (!$charClass.$mayContainSupplCodepoints) {
        if ($charClass.$hasUCI())
            return jur_CompositeRangeSet__init_(jur_UCIRangeSet__init_(jur_AbstractCharClass_getWithoutSurrogates($charClass)), $lowHighSurrRangeSet);
        return jur_CompositeRangeSet__init_(jur_RangeSet__init_(jur_AbstractCharClass_getWithoutSurrogates($charClass)), $lowHighSurrRangeSet);
    }
    if (!$charClass.$hasUCI())
        return jur_CompositeRangeSet__init_(jur_SupplRangeSet__init_0(jur_AbstractCharClass_getWithoutSurrogates($charClass)), $lowHighSurrRangeSet);
    $surrogates = new jur_CompositeRangeSet;
    var$4 = new jur_UCISupplRangeSet;
    jur_SupplRangeSet__init_(var$4, jur_AbstractCharClass_getWithoutSurrogates($charClass));
    jur_CompositeRangeSet__init_0($surrogates, var$4, $lowHighSurrRangeSet);
    return $surrogates;
},
jur_Pattern_compile = $pattern => {
    let var$2, var$3, var$4, var$5;
    if ($pattern === null) {
        $pattern = new jl_NullPointerException;
        jl_Exception__init_0($pattern, $rt_s(31));
        $rt_throw($pattern);
    }
    jur_AbstractSet_$callClinit();
    jur_AbstractSet_counter = 1;
    var$2 = new jur_Pattern;
    var$2.$backRefs = $rt_createArray(jur_FSet, 10);
    var$2.$globalGroupIndex = (-1);
    var$2.$compCount = (-1);
    var$2.$consCount = (-1);
    var$3 = new jur_Lexer;
    var$3.$mode = 1;
    var$3.$orig = $pattern;
    var$3.$pattern0 = $rt_createCharArray($pattern.$nativeString.length + 2 | 0);
    jl_System_fastArraycopy(jl_String_toCharArray($pattern), 0, var$3.$pattern0, 0, $pattern.$nativeString.length);
    var$4 = var$3.$pattern0.data;
    var$5 = var$4.length;
    var$4[var$5 - 1 | 0] = 0;
    var$4[var$5 - 2 | 0] = 0;
    var$3.$patternFullLength = var$5;
    var$3.$flags0 = 0;
    jur_Lexer_movePointer(var$3);
    jur_Lexer_movePointer(var$3);
    var$2.$lexemes = var$3;
    var$2.$flags = 0;
    var$2.$start1 = jur_Pattern_processExpression(var$2, (-1), 0, null);
    if (!jur_Lexer_isEmpty(var$2.$lexemes)) {
        $pattern = new jur_PatternSyntaxException;
        var$2 = var$2.$lexemes;
        jur_PatternSyntaxException__init_0($pattern, $rt_s(2), var$2.$orig, var$2.$curToc);
        $rt_throw($pattern);
    }
    if (var$2.$needsBackRefReplacement)
        var$2.$start1.$processSecondPass();
    $pattern = var$2.$namedGroups;
    if ($pattern === null) {
        ju_Collections_$callClinit();
        var$2.$namedGroups = ju_Collections_EMPTY_MAP;
    } else {
        ju_Collections_$callClinit();
        ju_Objects_requireNonNull($pattern);
        var$3 = new ju_Collections$13;
        var$3.$val$m = $pattern;
        var$2.$namedGroups = var$3;
    }
    return var$2;
},
jur_Pattern_getSupplement = $ch => {
    if ($ch >= 97 && $ch <= 122)
        $ch = ($ch - 32 | 0) & 65535;
    else if ($ch >= 65 && $ch <= 90)
        $ch = ($ch + 32 | 0) & 65535;
    return $ch;
},
jur_Pattern_hasFlag = ($this, $flag) => {
    return ($this.$flags & $flag) != $flag ? 0 : 1;
},
jl_NullPointerException = $rt_classWithoutFields(jl_RuntimeException);
function jur_AbstractSet() {
    let a = this; jl_Object.call(a);
    a.$next3 = null;
    a.$isSecondPassVisited = 0;
    a.$index5 = null;
    a.$type0 = 0;
}
let jur_AbstractSet_counter = 0,
jur_AbstractSet_$callClinit = () => {
    jur_AbstractSet_$callClinit = $rt_eraseClinit(jur_AbstractSet);
    jur_AbstractSet__clinit_();
},
jur_AbstractSet__init_ = $this => {
    let var$1;
    jur_AbstractSet_$callClinit();
    var$1 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$1 + 1 | 0;
    $this.$index5 = jl_Integer_toString(var$1);
},
jur_AbstractSet__init_0 = ($this, $n) => {
    let var$2;
    jur_AbstractSet_$callClinit();
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    $this.$index5 = jl_Integer_toString(var$2);
    $this.$next3 = $n;
},
jur_AbstractSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $length;
    $length = $matchResult.$rightBound;
    while (true) {
        if ($stringIndex > $length)
            return (-1);
        if ($this.$matches($stringIndex, $testString, $matchResult) >= 0)
            break;
        $stringIndex = $stringIndex + 1 | 0;
    }
    return $stringIndex;
},
jur_AbstractSet_findBack = ($this, $stringIndex, $startSearch, $testString, $matchResult) => {
    while (true) {
        if ($startSearch < $stringIndex)
            return (-1);
        if ($this.$matches($startSearch, $testString, $matchResult) >= 0)
            break;
        $startSearch = $startSearch + (-1) | 0;
    }
    return $startSearch;
},
jur_AbstractSet_setType = ($this, $type) => {
    $this.$type0 = $type;
},
jur_AbstractSet_getType = $this => {
    return $this.$type0;
},
jur_AbstractSet_getQualifiedName = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$index5;
    var$2 = $this.$getName();
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_AbstractStringBuilder_append(var$3, 60);
    var$1 = jl_StringBuilder_append(var$3, var$1);
    jl_AbstractStringBuilder_append(var$1, 58);
    jl_AbstractStringBuilder_append(jl_StringBuilder_append(var$1, var$2), 62);
    return jl_AbstractStringBuilder_toString(var$3);
},
jur_AbstractSet_toString = $this => {
    return jur_AbstractSet_getQualifiedName($this);
},
jur_AbstractSet_getNext = $this => {
    return $this.$next3;
},
jur_AbstractSet_setNext = ($this, $next) => {
    $this.$next3 = $next;
},
jur_AbstractSet_first = ($this, $set) => {
    return 1;
},
jur_AbstractSet_processBackRefReplacement = $this => {
    return null;
},
jur_AbstractSet_processSecondPass = $this => {
    let $set;
    $this.$isSecondPassVisited = 1;
    $set = $this.$next3;
    if ($set !== null) {
        if (!$set.$isSecondPassVisited) {
            $set = $set.$processBackRefReplacement();
            if ($set !== null) {
                $this.$next3.$isSecondPassVisited = 1;
                $this.$next3 = $set;
            }
            $this.$next3.$processSecondPass();
        } else if ($set instanceof jur_SingleSet && $set.$fSet.$isBackReferenced)
            $this.$next3 = $set.$next3;
    }
},
jur_AbstractSet__clinit_ = () => {
    jur_AbstractSet_counter = 1;
},
jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException);
function jur_FSet() {
    let a = this; jur_AbstractSet.call(a);
    a.$isBackReferenced = 0;
    a.$groupIndex0 = 0;
}
let jur_FSet_posFSet = null,
jur_FSet_$callClinit = () => {
    jur_FSet_$callClinit = $rt_eraseClinit(jur_FSet);
    jur_FSet__clinit_();
},
jur_FSet__init_ = ($this, $groupIndex) => {
    jur_FSet_$callClinit();
    jur_AbstractSet__init_($this);
    $this.$groupIndex0 = $groupIndex;
},
jur_FSet__init_0 = var_0 => {
    let var_1 = new jur_FSet();
    jur_FSet__init_(var_1, var_0);
    return var_1;
},
jur_FSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $end, $shift;
    $end = jur_MatchResultImpl_getEnd($matchResult, $this.$groupIndex0);
    jur_MatchResultImpl_setEnd($matchResult, $this.$groupIndex0, $stringIndex);
    $shift = $this.$next3.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        jur_MatchResultImpl_setEnd($matchResult, $this.$groupIndex0, $end);
    return $shift;
},
jur_FSet_getGroupIndex = $this => {
    return $this.$groupIndex0;
},
jur_FSet_getName = $this => {
    return $rt_s(32);
},
jur_FSet_hasConsumed = ($this, $mr) => {
    return 0;
},
jur_FSet__clinit_ = () => {
    let var$1;
    var$1 = new jur_FSet$PossessiveFSet;
    jur_AbstractSet__init_(var$1);
    jur_FSet_posFSet = var$1;
};
function jur_Lexer() {
    let a = this; jl_Object.call(a);
    a.$pattern0 = null;
    a.$flags0 = 0;
    a.$mode = 0;
    a.$savedMode = 0;
    a.$lookBack = 0;
    a.$ch = 0;
    a.$lookAhead = 0;
    a.$groupName = null;
    a.$patternFullLength = 0;
    a.$curST = null;
    a.$lookAheadST = null;
    a.$index = 0;
    a.$prevNW = 0;
    a.$curToc = 0;
    a.$lookAheadToc = 0;
    a.$orig = null;
}
let jur_Lexer_decompTable = null,
jur_Lexer_singleDecompTable = null,
jur_Lexer_singleDecompTableSize = 0,
jur_Lexer_setMode = ($this, $mode) => {
    if ($mode > 0 && $mode < 3)
        $this.$mode = $mode;
    if ($mode == 1) {
        $this.$lookAhead = $this.$ch;
        $this.$lookAheadST = $this.$curST;
        $this.$index = $this.$lookAheadToc;
        $this.$lookAheadToc = $this.$curToc;
        jur_Lexer_movePointer($this);
    }
},
jur_Lexer_isSpecial = $this => {
    return $this.$curST === null ? 0 : 1;
},
jur_Lexer_isNextSpecial = $this => {
    return $this.$lookAheadST === null ? 0 : 1;
},
jur_Lexer_next = $this => {
    jur_Lexer_movePointer($this);
    return $this.$lookBack;
},
jur_Lexer_nextSpecial = $this => {
    let $res;
    $res = $this.$curST;
    jur_Lexer_movePointer($this);
    return $res;
},
jur_Lexer_movePointer = $this => {
    let $reread, $nonCap, var$3, $cs, $negative, $behindOrNamed, $nameBuilder, $mod, $$je;
    $this.$lookBack = $this.$ch;
    $this.$ch = $this.$lookAhead;
    $this.$curST = $this.$lookAheadST;
    $this.$curToc = $this.$lookAheadToc;
    $this.$lookAheadToc = $this.$index;
    a: {
        while (true) {
            $reread = 0;
            $nonCap = $this.$index >= $this.$pattern0.data.length ? 0 : jur_Lexer_nextCodePoint($this);
            $this.$lookAhead = $nonCap;
            $this.$lookAheadST = null;
            if ($this.$mode == 4) {
                if ($nonCap != 92)
                    return;
                $nonCap = $this.$index;
                var$3 = $this.$pattern0.data;
                $nonCap = $nonCap >= var$3.length ? 0 : var$3[jur_Lexer_nextIndex($this)];
                $this.$lookAhead = $nonCap;
                switch ($nonCap) {
                    case 69:
                        break;
                    default:
                        $this.$lookAhead = 92;
                        $this.$index = $this.$prevNW;
                        return;
                }
                $this.$mode = $this.$savedMode;
                $this.$lookAhead = $this.$index > ($this.$pattern0.data.length - 2 | 0) ? 0 : jur_Lexer_nextCodePoint($this);
            }
            b: {
                $nonCap = $this.$lookAhead;
                if ($nonCap == 92) {
                    $nonCap = $this.$index >= ($this.$pattern0.data.length - 2 | 0) ? (-1) : jur_Lexer_nextCodePoint($this);
                    c: {
                        $this.$lookAhead = $nonCap;
                        switch ($nonCap) {
                            case -1:
                                $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Lexer_toString($this), $this.$index));
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                            case 12:
                            case 13:
                            case 14:
                            case 15:
                            case 16:
                            case 17:
                            case 18:
                            case 19:
                            case 20:
                            case 21:
                            case 22:
                            case 23:
                            case 24:
                            case 25:
                            case 26:
                            case 27:
                            case 28:
                            case 29:
                            case 30:
                            case 31:
                            case 32:
                            case 33:
                            case 34:
                            case 35:
                            case 36:
                            case 37:
                            case 38:
                            case 39:
                            case 40:
                            case 41:
                            case 42:
                            case 43:
                            case 44:
                            case 45:
                            case 46:
                            case 47:
                            case 58:
                            case 59:
                            case 60:
                            case 61:
                            case 62:
                            case 63:
                            case 64:
                            case 91:
                            case 92:
                            case 93:
                            case 94:
                            case 95:
                            case 96:
                            case 118:
                                break;
                            case 48:
                                $this.$lookAhead = jur_Lexer_readOctals($this);
                                break b;
                            case 49:
                            case 50:
                            case 51:
                            case 52:
                            case 53:
                            case 54:
                            case 55:
                            case 56:
                            case 57:
                                if ($this.$mode != 1)
                                    break b;
                                $this.$lookAhead = (-2147483648) | $nonCap;
                                break b;
                            case 65:
                                $this.$lookAhead = (-2147483583);
                                break b;
                            case 66:
                                $this.$lookAhead = (-2147483582);
                                break b;
                            case 67:
                            case 69:
                            case 70:
                            case 72:
                            case 73:
                            case 74:
                            case 75:
                            case 76:
                            case 77:
                            case 78:
                            case 79:
                            case 82:
                            case 84:
                            case 85:
                            case 86:
                            case 88:
                            case 89:
                            case 103:
                            case 104:
                            case 105:
                            case 106:
                            case 107:
                            case 108:
                            case 109:
                            case 111:
                            case 113:
                            case 121:
                                $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Lexer_toString($this), $this.$index));
                            case 68:
                            case 83:
                            case 87:
                            case 100:
                            case 115:
                            case 119:
                                $this.$lookAheadST = jur_AbstractCharClass_getPredefinedClass(jl_String__init_0($this.$pattern0, $this.$prevNW, 1), 0);
                                $this.$lookAhead = 0;
                                break b;
                            case 71:
                                $this.$lookAhead = (-2147483577);
                                break b;
                            case 80:
                            case 112:
                                break c;
                            case 81:
                                $this.$savedMode = $this.$mode;
                                $this.$mode = 4;
                                $reread = 1;
                                break b;
                            case 90:
                                $this.$lookAhead = (-2147483558);
                                break b;
                            case 97:
                                $this.$lookAhead = 7;
                                break b;
                            case 98:
                                $this.$lookAhead = (-2147483550);
                                break b;
                            case 99:
                                $nonCap = $this.$index;
                                var$3 = $this.$pattern0.data;
                                if ($nonCap >= (var$3.length - 2 | 0))
                                    $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Lexer_toString($this), $this.$index));
                                $this.$lookAhead = var$3[jur_Lexer_nextIndex($this)] & 31;
                                break b;
                            case 101:
                                $this.$lookAhead = 27;
                                break b;
                            case 102:
                                $this.$lookAhead = 12;
                                break b;
                            case 110:
                                $this.$lookAhead = 10;
                                break b;
                            case 114:
                                $this.$lookAhead = 13;
                                break b;
                            case 116:
                                $this.$lookAhead = 9;
                                break b;
                            case 117:
                                $this.$lookAhead = jur_Lexer_readHex($this, 4);
                                break b;
                            case 120:
                                $this.$lookAhead = jur_Lexer_readHex($this, 2);
                                break b;
                            case 122:
                                $this.$lookAhead = (-2147483526);
                                break b;
                            default:
                        }
                        break b;
                    }
                    $cs = jur_Lexer_parseCharClassName($this);
                    $negative = 0;
                    if ($this.$lookAhead == 80)
                        $negative = 1;
                    try {
                        $this.$lookAheadST = jur_AbstractCharClass_getPredefinedClass($cs, $negative);
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof ju_MissingResourceException) {
                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Lexer_toString($this), $this.$index));
                        } else {
                            throw $$e;
                        }
                    }
                    $this.$lookAhead = 0;
                } else {
                    $behindOrNamed = $this.$mode;
                    if ($behindOrNamed == 1)
                        switch ($nonCap) {
                            case 36:
                                $this.$lookAhead = (-536870876);
                                break b;
                            case 40:
                                if ($this.$pattern0.data[$this.$index] != 63) {
                                    $this.$lookAhead = (-2147483608);
                                    break b;
                                }
                                jur_Lexer_nextIndex($this);
                                $nonCap = $this.$pattern0.data[$this.$index];
                                $behindOrNamed = 0;
                                $nameBuilder = null;
                                while (true) {
                                    d: {
                                        if (!$behindOrNamed) {
                                            switch ($nonCap) {
                                                case 33:
                                                    break;
                                                case 60:
                                                    jur_Lexer_nextIndex($this);
                                                    $nonCap = $this.$pattern0.data[$this.$index];
                                                    $behindOrNamed = 1;
                                                    break d;
                                                case 61:
                                                    $this.$lookAhead = (-536870872);
                                                    jur_Lexer_nextIndex($this);
                                                    break d;
                                                case 62:
                                                    $this.$lookAhead = (-33554392);
                                                    jur_Lexer_nextIndex($this);
                                                    break d;
                                                default:
                                                    $mod = jur_Lexer_readFlags($this);
                                                    $this.$lookAhead = $mod;
                                                    if ($mod < 256) {
                                                        $this.$flags0 = $mod;
                                                        $mod = $mod << 16;
                                                        $this.$lookAhead = $mod;
                                                        $this.$lookAhead = (-1073741784) | $mod;
                                                        break d;
                                                    }
                                                    $mod = $mod & 255;
                                                    $this.$lookAhead = $mod;
                                                    $this.$flags0 = $mod;
                                                    $mod = $mod << 16;
                                                    $this.$lookAhead = $mod;
                                                    $this.$lookAhead = (-16777176) | $mod;
                                                    break d;
                                            }
                                            $this.$lookAhead = (-268435416);
                                            jur_Lexer_nextIndex($this);
                                        } else {
                                            e: {
                                                switch ($nonCap) {
                                                    case 33:
                                                        break;
                                                    case 61:
                                                        $behindOrNamed = 0;
                                                        $this.$lookAhead = (-134217688);
                                                        jur_Lexer_nextIndex($this);
                                                        break d;
                                                    case 62:
                                                        if ($nameBuilder === null)
                                                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Lexer_toString($this), $this.$index));
                                                        $this.$groupName = jl_StringBuilder_toString($nameBuilder);
                                                        jur_Lexer_nextIndex($this);
                                                        $nameBuilder = null;
                                                        $behindOrNamed = 0;
                                                        $this.$lookAhead = (-2130706392);
                                                        break d;
                                                    default:
                                                        break e;
                                                }
                                                $behindOrNamed = 0;
                                                $this.$lookAhead = (-67108824);
                                                jur_Lexer_nextIndex($this);
                                                break d;
                                            }
                                            f: {
                                                if (!($nonCap >= 65 && $nonCap <= 90)) {
                                                    if ($nonCap < 97)
                                                        break f;
                                                    if ($nonCap > 122)
                                                        break f;
                                                }
                                                if ($nameBuilder === null)
                                                    $nameBuilder = jl_StringBuilder__init_();
                                                jl_StringBuilder_append2($nameBuilder, $nonCap);
                                                jur_Lexer_nextIndex($this);
                                                $nonCap = $this.$pattern0.data[$this.$index];
                                                break d;
                                            }
                                            if ($nonCap < 48)
                                                break a;
                                            if ($nonCap > 57)
                                                break a;
                                            if ($nameBuilder === null)
                                                $rt_throw(jur_PatternSyntaxException__init_($rt_s(33), jur_Lexer_toString($this), $this.$index));
                                            jl_StringBuilder_append2($nameBuilder, $nonCap);
                                            jur_Lexer_nextIndex($this);
                                            $nonCap = $this.$pattern0.data[$this.$index];
                                        }
                                    }
                                    if (!$behindOrNamed)
                                        break;
                                }
                                break b;
                            case 41:
                                $this.$lookAhead = (-536870871);
                                break b;
                            case 42:
                            case 43:
                            case 63:
                                $behindOrNamed = $this.$index;
                                var$3 = $this.$pattern0.data;
                                switch ($behindOrNamed >= var$3.length ? 42 : var$3[$behindOrNamed]) {
                                    case 43:
                                        $this.$lookAhead = $nonCap | (-2147483648);
                                        jur_Lexer_nextIndex($this);
                                        break b;
                                    case 63:
                                        $this.$lookAhead = $nonCap | (-1073741824);
                                        jur_Lexer_nextIndex($this);
                                        break b;
                                    default:
                                }
                                $this.$lookAhead = $nonCap | (-536870912);
                                break b;
                            case 46:
                                $this.$lookAhead = (-536870866);
                                break b;
                            case 91:
                                $this.$lookAhead = (-536870821);
                                jur_Lexer_setMode($this, 2);
                                break b;
                            case 93:
                                if ($behindOrNamed != 2)
                                    break b;
                                $this.$lookAhead = (-536870819);
                                break b;
                            case 94:
                                $this.$lookAhead = (-536870818);
                                break b;
                            case 123:
                                $this.$lookAheadST = jur_Lexer_processQuantifier($this, $nonCap);
                                break b;
                            case 124:
                                $this.$lookAhead = (-536870788);
                                break b;
                            default:
                        }
                    else if ($behindOrNamed == 2)
                        switch ($nonCap) {
                            case 38:
                                $this.$lookAhead = (-536870874);
                                break b;
                            case 45:
                                $this.$lookAhead = (-536870867);
                                break b;
                            case 91:
                                $this.$lookAhead = (-536870821);
                                break b;
                            case 93:
                                $this.$lookAhead = (-536870819);
                                break b;
                            case 94:
                                $this.$lookAhead = (-536870818);
                                break b;
                            default:
                        }
                }
            }
            if ($reread)
                continue;
            else
                break;
        }
        return;
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Lexer_toString($this), $this.$index));
},
jur_Lexer_parseCharClassName = $this => {
    let $sb, $ch, var$3, var$4, $res, var$6;
    $sb = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_0($sb, 10);
    $ch = $this.$index;
    var$3 = $this.$pattern0;
    var$4 = var$3.data;
    if ($ch < (var$4.length - 2 | 0)) {
        if (var$4[$ch] != 123) {
            $sb = jl_String__init_0(var$3, jur_Lexer_nextIndex($this), 1);
            $res = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_($res);
            jl_StringBuilder_append(jl_StringBuilder_append($res, $rt_s(34)), $sb);
            return jl_AbstractStringBuilder_toString($res);
        }
        jur_Lexer_nextIndex($this);
        $ch = 0;
        a: {
            while (true) {
                var$6 = $this.$index;
                var$3 = $this.$pattern0.data;
                if (var$6 >= (var$3.length - 2 | 0))
                    break;
                $ch = var$3[jur_Lexer_nextIndex($this)];
                if ($ch == 125)
                    break a;
                jl_AbstractStringBuilder_append($sb, $ch);
            }
        }
        if ($ch != 125)
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
    }
    if (!$sb.$length0)
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
    $res = jl_AbstractStringBuilder_toString($sb);
    if ($res.$nativeString.length == 1) {
        $sb = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($sb);
        jl_StringBuilder_append(jl_StringBuilder_append($sb, $rt_s(34)), $res);
        return jl_AbstractStringBuilder_toString($sb);
    }
    b: {
        c: {
            if ($res.$nativeString.length > 3) {
                if (jl_String_startsWith($res, $rt_s(34)))
                    break c;
                if (jl_String_startsWith($res, $rt_s(35)))
                    break c;
            }
            break b;
        }
        $res = jl_String_substring0($res, 2);
    }
    return $res;
},
jur_Lexer_processQuantifier = ($this, $ch) => {
    let $sb, $min, $max, $mod, var$6, $$je;
    $sb = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_0($sb, 4);
    $min = (-1);
    $max = 2147483647;
    a: {
        while (true) {
            $mod = $this.$index;
            var$6 = $this.$pattern0.data;
            if ($mod >= var$6.length)
                break a;
            $ch = var$6[jur_Lexer_nextIndex($this)];
            if ($ch == 125)
                break a;
            if ($ch == 44 && $min < 0)
                try {
                    $min = jl_Integer_parseInt(jl_StringBuilder_toString($sb), 10);
                    jl_StringBuilder_delete($sb, 0, jl_StringBuilder_length($sb));
                    continue;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_NumberFormatException) {
                        break;
                    } else {
                        throw $$e;
                    }
                }
            jl_AbstractStringBuilder_append($sb, $ch & 65535);
        }
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
    }
    if ($ch != 125)
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
    if ($sb.$length0 > 0)
        b: {
            try {
                $max = jl_Integer_parseInt(jl_StringBuilder_toString($sb), 10);
                if ($min >= 0)
                    break b;
                $min = $max;
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_NumberFormatException) {
                    $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
                } else {
                    throw $$e;
                }
            }
        }
    else if ($min < 0)
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
    if (($min | $max | ($max - $min | 0)) < 0)
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
    $ch = $this.$index;
    var$6 = $this.$pattern0.data;
    $mod = $ch >= var$6.length ? 42 : var$6[$ch];
    c: {
        switch ($mod) {
            case 43:
                $this.$lookAhead = (-2147483525);
                jur_Lexer_nextIndex($this);
                break c;
            case 63:
                $this.$lookAhead = (-1073741701);
                jur_Lexer_nextIndex($this);
                break c;
            default:
        }
        $this.$lookAhead = (-536870789);
    }
    $sb = new jur_Quantifier;
    $sb.$min0 = $min;
    $sb.$max0 = $max;
    return $sb;
},
jur_Lexer_toString = $this => {
    return $this.$orig;
},
jur_Lexer_isEmpty = $this => {
    return !$this.$ch && !$this.$lookAhead && $this.$index == $this.$patternFullLength && !jur_Lexer_isSpecial($this) ? 1 : 0;
},
jur_Lexer_isLetter0 = $ch => {
    return $ch < 0 ? 0 : 1;
},
jur_Lexer_isLetter = $this => {
    return !jur_Lexer_isEmpty($this) && !jur_Lexer_isSpecial($this) && jur_Lexer_isLetter0($this.$ch) ? 1 : 0;
},
jur_Lexer_isHighSurrogate0 = $this => {
    let var$1;
    var$1 = $this.$ch;
    return var$1 <= 56319 && var$1 >= 55296 ? 1 : 0;
},
jur_Lexer_isLowSurrogate0 = $this => {
    let var$1;
    var$1 = $this.$ch;
    return var$1 <= 57343 && var$1 >= 56320 ? 1 : 0;
},
jur_Lexer_isHighSurrogate = $ch => {
    return $ch <= 56319 && $ch >= 55296 ? 1 : 0;
},
jur_Lexer_isLowSurrogate = $ch => {
    return $ch <= 57343 && $ch >= 56320 ? 1 : 0;
},
jur_Lexer_readHex = ($this, $max) => {
    let $st, $length, $i, var$5, $$je;
    $st = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_0($st, $max);
    $length = $this.$pattern0.data.length - 2 | 0;
    $i = 0;
    while (true) {
        var$5 = $rt_compare($i, $max);
        if (var$5 >= 0)
            break;
        if ($this.$index >= $length)
            break;
        jl_AbstractStringBuilder_append($st, $this.$pattern0.data[jur_Lexer_nextIndex($this)]);
        $i = $i + 1 | 0;
    }
    if (!var$5)
        a: {
            try {
                $max = jl_Integer_parseInt(jl_StringBuilder_toString($st), 16);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_NumberFormatException) {
                    break a;
                } else {
                    throw $$e;
                }
            }
            return $max;
        }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
},
jur_Lexer_readOctals = $this => {
    let $max, $i, var$3, $length, $res, var$6;
    $max = 3;
    $i = 1;
    var$3 = $this.$pattern0.data;
    $length = var$3.length - 2 | 0;
    $res = jl_Character_digit(var$3[$this.$index], 8);
    switch ($res) {
        case -1:
            break;
        default:
            if ($res > 3)
                $max = 2;
            jur_Lexer_nextIndex($this);
            a: {
                while (true) {
                    if ($i >= $max)
                        break a;
                    var$6 = $this.$index;
                    if (var$6 >= $length)
                        break a;
                    var$6 = jl_Character_digit($this.$pattern0.data[var$6], 8);
                    if (var$6 < 0)
                        break;
                    $res = ($res * 8 | 0) + var$6 | 0;
                    jur_Lexer_nextIndex($this);
                    $i = $i + 1 | 0;
                }
            }
            return $res;
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
},
jur_Lexer_readFlags = $this => {
    let $pos, $res, var$3, var$4;
    $pos = 1;
    $res = $this.$flags0;
    a: while (true) {
        var$3 = $this.$index;
        var$4 = $this.$pattern0.data;
        if (var$3 >= var$4.length)
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, var$3));
        b: {
            c: {
                switch (var$4[var$3]) {
                    case 41:
                        jur_Lexer_nextIndex($this);
                        return $res | 256;
                    case 45:
                        if (!$pos)
                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, var$3));
                        $pos = 0;
                        break b;
                    case 58:
                        break a;
                    case 100:
                        break c;
                    case 105:
                        $res = $pos ? $res | 2 : ($res ^ 2) & $res;
                        break b;
                    case 109:
                        $res = $pos ? $res | 8 : ($res ^ 8) & $res;
                        break b;
                    case 115:
                        $res = $pos ? $res | 32 : ($res ^ 32) & $res;
                        break b;
                    case 117:
                        $res = $pos ? $res | 64 : ($res ^ 64) & $res;
                        break b;
                    case 120:
                        $res = $pos ? $res | 4 : ($res ^ 4) & $res;
                        break b;
                    default:
                }
                break b;
            }
            $res = $pos ? $res | 1 : ($res ^ 1) & $res;
        }
        jur_Lexer_nextIndex($this);
    }
    jur_Lexer_nextIndex($this);
    return $res;
},
jur_Lexer_nextIndex = $this => {
    let var$1, var$2, var$3, var$4, var$5;
    var$1 = $this.$index;
    $this.$prevNW = var$1;
    if (!($this.$flags0 & 4))
        $this.$index = var$1 + 1 | 0;
    else {
        var$2 = $this.$pattern0.data.length - 2 | 0;
        $this.$index = var$1 + 1 | 0;
        a: while (true) {
            var$3 = $this.$index;
            if (var$3 < var$2) {
                var$3 = $this.$pattern0.data[var$3];
                jl_Character_$callClinit();
                if (jl_Character_isWhitespace(var$3)) {
                    $this.$index = $this.$index + 1 | 0;
                    continue;
                }
            }
            var$3 = $this.$index;
            if (var$3 >= var$2)
                break;
            var$4 = $this.$pattern0.data;
            if (var$4[var$3] != 35)
                break;
            $this.$index = var$3 + 1 | 0;
            while (true) {
                var$5 = $this.$index;
                if (var$5 >= var$2)
                    continue a;
                var$1 = var$4[var$5];
                if (var$1 != 10 && var$1 != 13 && var$1 != 133 && (var$1 | 1) != 8233 ? 0 : 1)
                    continue a;
                $this.$index = var$5 + 1 | 0;
            }
        }
    }
    return $this.$prevNW;
},
jur_Lexer_getDecomposition = $ch => {
    return jur_Lexer_decompTable.$get1($ch);
},
jur_Lexer_nextCodePoint = $this => {
    let $high, $lowExpectedIndex, var$3, $low;
    $high = $this.$pattern0.data[jur_Lexer_nextIndex($this)];
    if (jl_Character_isHighSurrogate($high)) {
        $lowExpectedIndex = $this.$prevNW + 1 | 0;
        var$3 = $this.$pattern0.data;
        if ($lowExpectedIndex < var$3.length) {
            $low = var$3[$lowExpectedIndex];
            if (jl_Character_isLowSurrogate($low)) {
                jur_Lexer_nextIndex($this);
                return jl_Character_toCodePoint($high, $low);
            }
        }
    }
    return $high;
},
jur_Lexer_getIndex = $this => {
    return $this.$curToc;
};
function jur_PatternSyntaxException() {
    let a = this; jl_IllegalArgumentException.call(a);
    a.$desc = null;
    a.$pattern1 = null;
    a.$index3 = 0;
}
let jur_PatternSyntaxException__init_0 = ($this, $description, $pattern, $index) => {
    jl_Exception__init_($this);
    $this.$index3 = (-1);
    $this.$desc = $description;
    $this.$pattern1 = $pattern;
    $this.$index3 = $index;
},
jur_PatternSyntaxException__init_ = (var_0, var_1, var_2) => {
    let var_3 = new jur_PatternSyntaxException();
    jur_PatternSyntaxException__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_PatternSyntaxException_getMessage = $this => {
    let $filler, var$2, $temp, var$4, var$5, var$6, var$7, var$8, var$9, var$10;
    $filler = $rt_s(2);
    var$2 = $this.$index3;
    if (var$2 >= 1) {
        $temp = $rt_createCharArray(var$2);
        var$4 = $temp.data;
        var$2 = 0;
        var$5 = var$4.length;
        if (var$2 > var$5) {
            $filler = new jl_IllegalArgumentException;
            jl_Exception__init_($filler);
            $rt_throw($filler);
        }
        while (var$2 < var$5) {
            var$6 = var$2 + 1 | 0;
            var$4[var$2] = 32;
            var$2 = var$6;
        }
        $filler = jl_String__init_($temp);
    }
    var$7 = $this.$desc;
    var$8 = $this.$pattern1;
    if (var$8 !== null && var$8.$nativeString.length) {
        var$9 = $this.$index3;
        var$8 = $this.$pattern1;
        var$10 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$10);
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(var$10, var$9), $rt_s(36)), var$8), $rt_s(36)), $filler);
        $filler = jl_AbstractStringBuilder_toString(var$10);
    } else
        $filler = $rt_s(2);
    var$8 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$8);
    jl_StringBuilder_append(jl_StringBuilder_append(var$8, var$7), $filler);
    return jl_AbstractStringBuilder_toString(var$8);
},
jl_System = $rt_classWithoutFields(),
jl_System_arraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    let $srcType, $targetType, $srcArray, $i, var$10, var$11, var$12, $elem;
    if ($src !== null && $dest !== null) {
        if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src) && ($destPos + $length | 0) <= jlr_Array_getLength($dest)) {
            a: {
                b: {
                    if ($src !== $dest) {
                        $srcType = jl_Class_getComponentType(jl_Object_getClass($src));
                        $targetType = jl_Class_getComponentType(jl_Object_getClass($dest));
                        if ($srcType !== null && $targetType !== null) {
                            if ($srcType === $targetType)
                                break b;
                            if (!jl_Class_isPrimitive($srcType) && !jl_Class_isPrimitive($targetType)) {
                                $srcArray = $src;
                                $i = 0;
                                var$10 = $srcPos;
                                while ($i < $length) {
                                    c: {
                                        var$11 = $srcArray.data;
                                        var$12 = var$10 + 1 | 0;
                                        $elem = var$11[var$10];
                                        if ($elem !== null) {
                                            $elem = jl_Object_getClass($elem);
                                            if ($rt_isAssignable($elem.$classInfo, $targetType.$classInfo)) {
                                                var$10 = 1;
                                                break c;
                                            }
                                        }
                                        var$10 = 0;
                                    }
                                    if (!var$10) {
                                        jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $i);
                                        $src = new jl_ArrayStoreException;
                                        jl_Exception__init_($src);
                                        $rt_throw($src);
                                    }
                                    $i = $i + 1 | 0;
                                    var$10 = var$12;
                                }
                                jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                                return;
                            }
                            if (!jl_Class_isPrimitive($srcType))
                                break a;
                            if (jl_Class_isPrimitive($targetType))
                                break b;
                            else
                                break a;
                        }
                        $src = new jl_ArrayStoreException;
                        jl_Exception__init_($src);
                        $rt_throw($src);
                    }
                }
                jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                return;
            }
            $src = new jl_ArrayStoreException;
            jl_Exception__init_($src);
            $rt_throw($src);
        }
        $src = new jl_IndexOutOfBoundsException;
        jl_Exception__init_($src);
        $rt_throw($src);
    }
    $dest = new jl_NullPointerException;
    jl_Exception__init_0($dest, $rt_s(37));
    $rt_throw($dest);
},
jl_System_fastArraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src) && ($destPos + $length | 0) <= jlr_Array_getLength($dest)) {
        jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
        return;
    }
    $src = new jl_IndexOutOfBoundsException;
    jl_Exception__init_($src);
    $rt_throw($src);
},
jl_System_doArrayCopy = (var$1, var$2, var$3, var$4, var$5) => {
    if (var$5 !== 0) {
        if (typeof var$1.data.buffer !== 'undefined') {
            var$3.data.set(var$1.data.subarray(var$2, var$2 + var$5), var$4);
        } else if (var$1 !== var$3 || var$4 < var$2) {
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[var$4++] = var$1.data[var$2++];
            }
        } else {
            var$2 = var$2 + var$5 | 0;
            var$4 = var$4 + var$5 | 0;
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[ --var$4] = var$1.data[ --var$2];
            }
        }
    }
},
jl_Iterable = $rt_classWithoutFields(0),
ju_Collection = $rt_classWithoutFields(0),
ju_Collection_stream = $this => {
    let var$1, var$2;
    var$1 = new jusi_StreamOverSpliterator;
    var$2 = new jusi_SpliteratorOverCollection;
    var$2.$collection = $this;
    var$1.$spliterator = var$2;
    return var$1;
},
ju_AbstractCollection = $rt_classWithoutFields(),
ju_SequencedCollection = $rt_classWithoutFields(0),
ju_List = $rt_classWithoutFields(0);
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount = 0;
}
let ju_AbstractList_iterator = $this => {
    let var$1;
    var$1 = new ju_AbstractList$1;
    var$1.$this$03 = $this;
    var$1.$modCount3 = $this.$modCount;
    var$1.$size1 = $this.$size;
    var$1.$removeIndex = (-1);
    return var$1;
},
ju_RandomAccess = $rt_classWithoutFields(0);
function ju_ArrayList() {
    let a = this; ju_AbstractList.call(a);
    a.$array = null;
    a.$size = 0;
}
let ju_ArrayList__init_0 = $this => {
    $this.$array = $rt_createArray(jl_Object, 10);
},
ju_ArrayList__init_ = () => {
    let var_0 = new ju_ArrayList();
    ju_ArrayList__init_0(var_0);
    return var_0;
},
ju_ArrayList_ensureCapacity = ($this, $minCapacity) => {
    let var$2, $newLength;
    var$2 = $this.$array.data.length;
    if (var$2 < $minCapacity) {
        $newLength = var$2 >= 1073741823 ? 2147483647 : jl_Math_max($minCapacity, jl_Math_max(var$2 * 2 | 0, 5));
        $this.$array = ju_Arrays_copyOf($this.$array, $newLength);
    }
},
ju_ArrayList_get = ($this, $index) => {
    ju_ArrayList_checkIndex($this, $index);
    return $this.$array.data[$index];
},
ju_ArrayList_add = ($this, $element) => {
    let var$2, var$3;
    ju_ArrayList_ensureCapacity($this, $this.$size + 1 | 0);
    var$2 = $this.$array.data;
    var$3 = $this.$size;
    $this.$size = var$3 + 1 | 0;
    var$2[var$3] = $element;
    $this.$modCount = $this.$modCount + 1 | 0;
    return 1;
},
ju_ArrayList_add0 = ($this, $index, $element) => {
    let var$3, var$4, $i, var$6;
    if ($index >= 0) {
        var$3 = $this.$size;
        if ($index <= var$3) {
            ju_ArrayList_ensureCapacity($this, var$3 + 1 | 0);
            var$4 = $this.$size;
            $i = var$4;
            while ($i > $index) {
                var$6 = $this.$array.data;
                var$6[$i] = var$6[$i - 1 | 0];
                $i = $i + (-1) | 0;
            }
            $this.$array.data[$index] = $element;
            $this.$size = var$4 + 1 | 0;
            $this.$modCount = $this.$modCount + 1 | 0;
            return;
        }
    }
    $element = new jl_IndexOutOfBoundsException;
    jl_Exception__init_($element);
    $rt_throw($element);
},
ju_ArrayList_addFirst = ($this, $element) => {
    ju_ArrayList_add0($this, 0, $element);
},
ju_ArrayList_remove = ($this, $i) => {
    let var$2, $old, var$4, $i_0;
    ju_ArrayList_checkIndex($this, $i);
    var$2 = $this.$array.data;
    $old = var$2[$i];
    var$4 = $this.$size - 1 | 0;
    $this.$size = var$4;
    while ($i < var$4) {
        $i_0 = $i + 1 | 0;
        var$2[$i] = var$2[$i_0];
        $i = $i_0;
    }
    var$2[var$4] = null;
    $this.$modCount = $this.$modCount + 1 | 0;
    return $old;
},
ju_ArrayList_checkIndex = ($this, $index) => {
    let var$2;
    if ($index >= 0 && $index < $this.$size)
        return;
    var$2 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_(var$2);
    $rt_throw(var$2);
},
ju_ArrayList_toString = $this => {
    let $i, $length, $buffer, var$4;
    $i = $this.$size;
    if (!$i)
        return $rt_s(4);
    $length = $i - 1 | 0;
    $buffer = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_0($buffer, $i * 16 | 0);
    jl_AbstractStringBuilder_append($buffer, 91);
    $i = 0;
    while ($i < $length) {
        var$4 = $this.$array.data;
        jl_AbstractStringBuilder_append0(jl_StringBuilder_append($buffer, var$4[$i] !== $this ? var$4[$i] : $rt_s(38)), $rt_s(36));
        $i = $i + 1 | 0;
    }
    var$4 = $this.$array.data;
    jl_StringBuilder_append($buffer, var$4[$length] !== $this ? var$4[$length] : $rt_s(38));
    jl_AbstractStringBuilder_append($buffer, 93);
    return jl_AbstractStringBuilder_toString($buffer);
},
jur_NonCapFSet = $rt_classWithoutFields(jur_FSet),
jur_NonCapFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $gr;
    $gr = $this.$groupIndex0;
    jur_MatchResultImpl_setConsumed($matchResult, $gr, $stringIndex - jur_MatchResultImpl_getConsumed($matchResult, $gr) | 0);
    return $this.$next3.$matches($stringIndex, $testString, $matchResult);
},
jur_NonCapFSet_getName = $this => {
    return $rt_s(39);
},
jur_NonCapFSet_hasConsumed = ($this, $mr) => {
    return 0;
},
jur_AheadFSet = $rt_classWithoutFields(jur_FSet),
jur_AheadFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    return $stringIndex;
},
jur_AheadFSet_getName = $this => {
    return $rt_s(40);
},
jur_BehindFSet = $rt_classWithoutFields(jur_FSet),
jur_BehindFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    if (jur_MatchResultImpl_getConsumed($matchResult, $this.$groupIndex0) != $stringIndex)
        $stringIndex = (-1);
    return $stringIndex;
},
jur_BehindFSet_getName = $this => {
    return $rt_s(41);
};
function jur_AtomicFSet() {
    jur_FSet.call(this);
    this.$index8 = 0;
}
let jur_AtomicFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $gr;
    $gr = $this.$groupIndex0;
    jur_MatchResultImpl_setConsumed($matchResult, $gr, $stringIndex - jur_MatchResultImpl_getConsumed($matchResult, $gr) | 0);
    $this.$index8 = $stringIndex;
    return $stringIndex;
},
jur_AtomicFSet_getName = $this => {
    return $rt_s(42);
},
jur_AtomicFSet_hasConsumed = ($this, $mr) => {
    return 0;
},
jur_FinalSet = $rt_classWithoutFields(jur_FSet),
jur_FinalSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    if ($matchResult.$mode0 != 1 && $stringIndex != $matchResult.$rightBound)
        return (-1);
    $matchResult.$valid = 1;
    jur_MatchResultImpl_setEnd($matchResult, 0, $stringIndex);
    return $stringIndex;
},
jur_FinalSet_getName = $this => {
    return $rt_s(43);
};
function jur_LeafSet() {
    jur_AbstractSet.call(this);
    this.$charCount0 = 0;
}
let jur_LeafSet__init_ = $this => {
    jur_AbstractSet__init_($this);
    $this.$charCount0 = 1;
},
jur_LeafSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift;
    if (($stringIndex + $this.$charCount() | 0) > $matchResult.$rightBound) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    $shift = $this.$accepts($stringIndex, $testString);
    if ($shift < 0)
        return (-1);
    return $this.$next3.$matches($stringIndex + $shift | 0, $testString, $matchResult);
},
jur_LeafSet_charCount = $this => {
    return $this.$charCount0;
},
jur_LeafSet_hasConsumed = ($this, $mr) => {
    return 1;
},
jur_EmptySet = $rt_classWithoutFields(jur_LeafSet),
jur_EmptySet__init_0 = ($this, $next) => {
    jur_AbstractSet__init_0($this, $next);
    $this.$charCount0 = 1;
    $this.$type0 = 1;
    $this.$charCount0 = 0;
},
jur_EmptySet__init_ = var_0 => {
    let var_1 = new jur_EmptySet();
    jur_EmptySet__init_0(var_1, var_0);
    return var_1;
},
jur_EmptySet_accepts = ($this, $stringIndex, $testString) => {
    return 0;
},
jur_EmptySet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $startStr, $high, var$7;
    $strLength = $matchResult.$rightBound;
    $startStr = $matchResult.$leftBound;
    while (true) {
        $high = $rt_compare($stringIndex, $strLength);
        if ($high > 0)
            return (-1);
        if ($high < 0) {
            var$7 = $testString;
            if (jl_Character_isLowSurrogate(jl_String_charAt(var$7, $stringIndex)) && $stringIndex > $startStr && jl_Character_isHighSurrogate(jl_String_charAt(var$7, $stringIndex - 1 | 0))) {
                $stringIndex = $stringIndex + 1 | 0;
                continue;
            }
        }
        if ($this.$next3.$matches($stringIndex, $testString, $matchResult) >= 0)
            break;
        $stringIndex = $stringIndex + 1 | 0;
    }
    return $stringIndex;
},
jur_EmptySet_findBack = ($this, $stringIndex, $startSearch, $testString, $matchResult) => {
    let $strLength, $startStr, var$7;
    $strLength = $matchResult.$rightBound;
    $startStr = $matchResult.$leftBound;
    while (true) {
        if ($startSearch < $stringIndex)
            return (-1);
        if ($startSearch < $strLength) {
            var$7 = $testString;
            if (jl_Character_isLowSurrogate(jl_String_charAt(var$7, $startSearch)) && $startSearch > $startStr && jl_Character_isHighSurrogate(jl_String_charAt(var$7, $startSearch - 1 | 0))) {
                $startSearch = $startSearch + (-1) | 0;
                continue;
            }
        }
        if ($this.$next3.$matches($startSearch, $testString, $matchResult) >= 0)
            break;
        $startSearch = $startSearch + (-1) | 0;
    }
    return $startSearch;
},
jur_EmptySet_getName = $this => {
    return $rt_s(44);
},
jur_EmptySet_hasConsumed = ($this, $mr) => {
    return 0;
};
function jur_JointSet() {
    let a = this; jur_AbstractSet.call(a);
    a.$children = null;
    a.$fSet = null;
    a.$groupIndex = 0;
}
let jur_JointSet__init_ = ($this, $children, $fSet) => {
    jur_AbstractSet__init_($this);
    $this.$children = $children;
    $this.$fSet = $fSet;
    $this.$groupIndex = $fSet.$groupIndex0;
},
jur_JointSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_JointSet();
    jur_JointSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_JointSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $size, $i, $shift;
    if ($this.$children === null)
        return (-1);
    $start = jur_MatchResultImpl_getStart($matchResult, $this.$groupIndex);
    jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $stringIndex);
    $size = $this.$children.$size;
    $i = 0;
    while (true) {
        if ($i >= $size) {
            jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $start);
            return (-1);
        }
        $shift = (ju_ArrayList_get($this.$children, $i)).$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return $shift;
},
jur_JointSet_setNext = ($this, $next) => {
    $this.$fSet.$next3 = $next;
},
jur_JointSet_getName = $this => {
    return $rt_s(45);
},
jur_JointSet_first = ($this, $set) => {
    let $i, var$3;
    a: {
        $i = $this.$children;
        if ($i !== null) {
            var$3 = ju_AbstractList_iterator($i);
            while (true) {
                if (!ju_AbstractList$1_hasNext(var$3))
                    break a;
                if (!(ju_AbstractList$1_next(var$3)).$first($set))
                    continue;
                else
                    return 1;
            }
        }
    }
    return 0;
},
jur_JointSet_hasConsumed = ($this, $matchResult) => {
    return jur_MatchResultImpl_getEnd($matchResult, $this.$groupIndex) >= 0 && jur_MatchResultImpl_getStart($matchResult, $this.$groupIndex) == jur_MatchResultImpl_getEnd($matchResult, $this.$groupIndex) ? 0 : 1;
},
jur_JointSet_processSecondPass = $this => {
    let $child, $childrenSize, $i, $set;
    $this.$isSecondPassVisited = 1;
    $child = $this.$fSet;
    if ($child !== null && !$child.$isSecondPassVisited)
        jur_AbstractSet_processSecondPass($child);
    a: {
        $child = $this.$children;
        if ($child !== null) {
            $childrenSize = $child.$size;
            $i = 0;
            while (true) {
                if ($i >= $childrenSize)
                    break a;
                $child = ju_ArrayList_get($this.$children, $i);
                $set = $child.$processBackRefReplacement();
                if ($set === null)
                    $set = $child;
                else {
                    $child.$isSecondPassVisited = 1;
                    ju_ArrayList_remove($this.$children, $i);
                    ju_ArrayList_add0($this.$children, $i, $set);
                }
                if (!$set.$isSecondPassVisited)
                    $set.$processSecondPass();
                $i = $i + 1 | 0;
            }
        }
    }
    if ($this.$next3 !== null)
        jur_AbstractSet_processSecondPass($this);
},
jur_NonCapJointSet = $rt_classWithoutFields(jur_JointSet),
jur_NonCapJointSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $size, $i, $shift;
    $start = jur_MatchResultImpl_getConsumed($matchResult, $this.$groupIndex);
    jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $stringIndex);
    $size = $this.$children.$size;
    $i = 0;
    while (true) {
        if ($i >= $size) {
            jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $start);
            return (-1);
        }
        $shift = (ju_ArrayList_get($this.$children, $i)).$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return $shift;
},
jur_NonCapJointSet_getName = $this => {
    return $rt_s(46);
},
jur_NonCapJointSet_hasConsumed = ($this, $matchResult) => {
    return !jur_MatchResultImpl_getConsumed($matchResult, $this.$groupIndex) ? 0 : 1;
},
jur_AtomicJointSet = $rt_classWithoutFields(jur_NonCapJointSet),
jur_AtomicJointSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $size, $i;
    $start = jur_MatchResultImpl_getConsumed($matchResult, $this.$groupIndex);
    jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $stringIndex);
    $size = $this.$children.$size;
    $i = 0;
    while ($i < $size) {
        if ((ju_ArrayList_get($this.$children, $i)).$matches($stringIndex, $testString, $matchResult) >= 0)
            return $this.$next3.$matches($this.$fSet.$index8, $testString, $matchResult);
        $i = $i + 1 | 0;
    }
    jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $start);
    return (-1);
},
jur_AtomicJointSet_setNext = ($this, $next) => {
    $this.$next3 = $next;
},
jur_AtomicJointSet_getName = $this => {
    return $rt_s(46);
},
jur_PositiveLookAhead = $rt_classWithoutFields(jur_AtomicJointSet),
jur_PositiveLookAhead_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $i;
    $size = $this.$children.$size;
    $i = 0;
    while ($i < $size) {
        if ((ju_ArrayList_get($this.$children, $i)).$matches($stringIndex, $testString, $matchResult) >= 0)
            return $this.$next3.$matches($stringIndex, $testString, $matchResult);
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_PositiveLookAhead_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_PositiveLookAhead_getName = $this => {
    return $rt_s(47);
},
jur_NegativeLookAhead = $rt_classWithoutFields(jur_AtomicJointSet),
jur_NegativeLookAhead_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $i;
    $size = $this.$children.$size;
    $i = 0;
    while (true) {
        if ($i >= $size)
            return $this.$next3.$matches($stringIndex, $testString, $matchResult);
        if ((ju_ArrayList_get($this.$children, $i)).$matches($stringIndex, $testString, $matchResult) >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_NegativeLookAhead_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_NegativeLookAhead_getName = $this => {
    return $rt_s(48);
},
jur_PositiveLookBehind = $rt_classWithoutFields(jur_AtomicJointSet),
jur_PositiveLookBehind_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $leftBound, $shift, $i;
    $size = $this.$children.$size;
    $leftBound = $matchResult.$transparentBounds ? 0 : $matchResult.$leftBound;
    a: {
        $shift = $this.$next3.$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0) {
            jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $stringIndex);
            $i = 0;
            while (true) {
                if ($i >= $size)
                    break a;
                if ((ju_ArrayList_get($this.$children, $i)).$findBack($leftBound, $stringIndex, $testString, $matchResult) >= 0) {
                    jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, (-1));
                    return $shift;
                }
                $i = $i + 1 | 0;
            }
        }
    }
    return (-1);
},
jur_PositiveLookBehind_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_PositiveLookBehind_getName = $this => {
    return $rt_s(49);
},
jur_NegativeLookBehind = $rt_classWithoutFields(jur_AtomicJointSet),
jur_NegativeLookBehind_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $i;
    $size = $this.$children.$size;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $stringIndex);
    $i = 0;
    while (true) {
        if ($i >= $size)
            return $this.$next3.$matches($stringIndex, $testString, $matchResult);
        if ((ju_ArrayList_get($this.$children, $i)).$findBack(0, $stringIndex, $testString, $matchResult) >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_NegativeLookBehind_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_NegativeLookBehind_getName = $this => {
    return $rt_s(50);
};
function jur_SingleSet() {
    jur_JointSet.call(this);
    this.$kid = null;
}
let jur_SingleSet__init_ = ($this, $child, $fSet) => {
    jur_AbstractSet__init_($this);
    $this.$kid = $child;
    $this.$fSet = $fSet;
    $this.$groupIndex = $fSet.$groupIndex0;
},
jur_SingleSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_SingleSet();
    jur_SingleSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_SingleSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $shift;
    $start = jur_MatchResultImpl_getStart($matchResult, $this.$groupIndex);
    jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $stringIndex);
    $shift = $this.$kid.$matches($stringIndex, $testString, $matchResult);
    if ($shift >= 0)
        return $shift;
    jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $start);
    return (-1);
},
jur_SingleSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $res;
    $res = $this.$kid.$find0($stringIndex, $testString, $matchResult);
    if ($res >= 0)
        jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $res);
    return $res;
},
jur_SingleSet_findBack = ($this, $stringIndex, $lastIndex, $testString, $matchResult) => {
    let $res;
    $res = $this.$kid.$findBack($stringIndex, $lastIndex, $testString, $matchResult);
    if ($res >= 0)
        jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $res);
    return $res;
},
jur_SingleSet_first = ($this, $set) => {
    return $this.$kid.$first($set);
},
jur_SingleSet_processBackRefReplacement = $this => {
    let $set;
    $set = new jur_BackReferencedSingleSet;
    jur_SingleSet__init_($set, $this.$kid, $this.$fSet);
    $this.$next3 = $set;
    return $set;
},
jur_SingleSet_processSecondPass = $this => {
    let $set;
    $this.$isSecondPassVisited = 1;
    $set = $this.$fSet;
    if ($set !== null && !$set.$isSecondPassVisited)
        jur_AbstractSet_processSecondPass($set);
    $set = $this.$kid;
    if ($set !== null && !$set.$isSecondPassVisited) {
        $set = $set.$processBackRefReplacement();
        if ($set !== null) {
            $this.$kid.$isSecondPassVisited = 1;
            $this.$kid = $set;
        }
        $this.$kid.$processSecondPass();
    }
},
ju_SequencedMap = $rt_classWithoutFields(0);
function ju_LinkedHashMap() {
    let a = this; ju_HashMap.call(a);
    a.$accessOrder = 0;
    a.$head = null;
    a.$tail = null;
}
let ju_LinkedHashMap_newElementArray = ($this, $s) => {
    return $rt_createArray(ju_LinkedHashMap$LinkedHashMapEntry, $s);
},
ju_LinkedHashMap_put = ($this, $key, $value) => {
    let var$3, $oldSize, var$5, var$6, var$7, var$8, var$9, $existing, var$11;
    var$3 = $this;
    $oldSize = var$3.$elementCount;
    var$5 = $this.$accessOrder;
    if (!$this.$elementCount) {
        $this.$head = null;
        $this.$tail = null;
    }
    var$6 = $key === null ? 0 : jl_String_hashCode($key);
    var$7 = var$6 & 2147483647;
    var$8 = var$7 % $this.$elementData.data.length | 0;
    var$9 = $key === null ? ju_HashMap_findNullKeyEntry($this) : ju_HashMap_findNonNullKeyEntry($this, $key, var$8, var$6);
    if (var$9 === null) {
        $this.$modCount1 = $this.$modCount1 + 1 | 0;
        var$5 = $this.$elementCount + 1 | 0;
        $this.$elementCount = var$5;
        if (var$5 > $this.$threshold) {
            ju_HashMap_rehash(var$3);
            var$8 = var$7 % $this.$elementData.data.length | 0;
        }
        $existing = new ju_LinkedHashMap$LinkedHashMapEntry;
        ju_HashMap$HashEntry__init_($existing, $key, var$6);
        $existing.$chainForward = null;
        $existing.$chainBackward = null;
        var$11 = $this.$elementData.data;
        $existing.$next4 = var$11[var$8];
        var$11[var$8] = $existing;
        $key = $this.$tail;
        if ($key === null)
            $this.$head = $existing;
        else
            $key.$chainForward = $existing;
        $existing.$chainBackward = $key;
        $this.$tail = $existing;
        var$9 = $existing;
    } else if (var$5) {
        $key = var$9.$chainForward;
        if ($key !== null) {
            $existing = var$9.$chainBackward;
            if ($existing === null)
                $this.$head = $key;
            else
                $existing.$chainForward = $key;
            $key.$chainBackward = $existing;
            $key = $this.$tail;
            if ($key !== null)
                $key.$chainForward = var$9;
            var$9.$chainBackward = $key;
            var$9.$chainForward = null;
            $this.$tail = var$9;
        }
    }
    $existing = var$9.$value2;
    var$9.$value2 = $value;
    return $existing;
},
ju_Collections = $rt_classWithoutFields(),
ju_Collections_EMPTY_SET = null,
ju_Collections_EMPTY_MAP = null,
ju_Collections_EMPTY_LIST = null,
ju_Collections_EMPTY_ITERATOR = null,
ju_Collections_EMPTY_LIST_ITERATOR = null,
ju_Collections_reverseOrder = null,
ju_Collections_$callClinit = () => {
    ju_Collections_$callClinit = $rt_eraseClinit(ju_Collections);
    ju_Collections__clinit_();
},
ju_Collections__clinit_ = () => {
    ju_Collections_EMPTY_SET = new ju_Collections$1;
    ju_Collections_EMPTY_MAP = new ju_Collections$2;
    ju_Collections_EMPTY_LIST = new ju_Collections$3;
    ju_Collections_EMPTY_ITERATOR = new ju_Collections$4;
    ju_Collections_EMPTY_LIST_ITERATOR = new ju_Collections$5;
    ju_Collections_reverseOrder = new ju_Collections$_clinit_$lambda$_59_0;
},
jlr_Array = $rt_classWithoutFields(),
jlr_Array_getLength = $array => {
    let $cls;
    $cls = (jl_Object_getClass($array)).$classInfo;
    if ($cls[$rt_meta].itemType !== null)
        return $rt_arrayLength($array);
    $array = new jl_IllegalArgumentException;
    jl_Exception__init_($array);
    $rt_throw($array);
},
jlr_Array_newInstance = ($componentType, $length) => {
    if ($componentType === null) {
        $componentType = new jl_NullPointerException;
        jl_Exception__init_($componentType);
        $rt_throw($componentType);
    }
    if ($componentType === $rt_cls($rt_voidcls)) {
        $componentType = new jl_IllegalArgumentException;
        jl_Exception__init_($componentType);
        $rt_throw($componentType);
    }
    if ($length < 0) {
        $componentType = new jl_NegativeArraySizeException;
        jl_Exception__init_($componentType);
        $rt_throw($componentType);
    }
    return otrr_ClassInfo_newArrayInstance($componentType.$classInfo, $length);
},
jl_ArrayStoreException = $rt_classWithoutFields(jl_RuntimeException),
jur_SpecialToken = $rt_classWithoutFields();
function jur_AbstractCharClass() {
    let a = this; jur_SpecialToken.call(a);
    a.$alt = 0;
    a.$altSurrogates = 0;
    a.$lowHighSurrogates = null;
    a.$charClassWithoutSurrogates = null;
    a.$charClassWithSurrogates = null;
    a.$mayContainSupplCodepoints = 0;
}
let jur_AbstractCharClass_charClasses = null,
jur_AbstractCharClass_$callClinit = () => {
    jur_AbstractCharClass_$callClinit = $rt_eraseClinit(jur_AbstractCharClass);
    jur_AbstractCharClass__clinit_();
},
jur_AbstractCharClass__init_ = $this => {
    let var$1;
    jur_AbstractCharClass_$callClinit();
    var$1 = new ju_BitSet;
    var$1.$data = $rt_createIntArray(64);
    $this.$lowHighSurrogates = var$1;
},
jur_AbstractCharClass_getBits = $this => {
    return null;
},
jur_AbstractCharClass_getLowHighSurrogates = $this => {
    return $this.$lowHighSurrogates;
},
jur_AbstractCharClass_hasLowHighSurrogates = $this => {
    let var$1, var$2, var$3, var$4, var$5;
    if (!$this.$altSurrogates)
        var$1 = ju_BitSet_nextSetBit($this.$lowHighSurrogates, 0) >= 2048 ? 0 : 1;
    else {
        a: {
            var$2 = $this.$lowHighSurrogates;
            var$1 = 0;
            var$3 = var$2.$length1;
            if (var$1 < var$3) {
                var$4 = var$2.$data.data;
                var$5 = (var$4[0] ^ (-1)) >>> 0 | 0;
                if (var$5)
                    var$1 = jl_Integer_numberOfTrailingZeros(var$5) + var$1 | 0;
                else {
                    var$1 = (var$3 + 31 | 0) / 32 | 0;
                    var$5 = 1;
                    while (var$5 < var$1) {
                        if (var$4[var$5] != (-1)) {
                            var$1 = (var$5 * 32 | 0) + jl_Integer_numberOfTrailingZeros(var$4[var$5] ^ (-1)) | 0;
                            break a;
                        }
                        var$5 = var$5 + 1 | 0;
                    }
                    var$1 = var$3;
                }
            }
        }
        var$1 = var$1 >= 2048 ? 0 : 1;
    }
    return var$1;
},
jur_AbstractCharClass_mayContainSupplCodepoints = $this => {
    return $this.$mayContainSupplCodepoints;
},
jur_AbstractCharClass_getInstance = $this => {
    return $this;
},
jur_AbstractCharClass_getSurrogates = $this => {
    let $lHS, var$2;
    if ($this.$charClassWithSurrogates === null) {
        $lHS = $this.$getLowHighSurrogates();
        var$2 = new jur_AbstractCharClass$1;
        var$2.$this$026 = $this;
        var$2.$val$lHS = $lHS;
        jur_AbstractCharClass__init_(var$2);
        $this.$charClassWithSurrogates = var$2;
        jur_AbstractCharClass_setNegative(var$2, $this.$altSurrogates);
    }
    return $this.$charClassWithSurrogates;
},
jur_AbstractCharClass_getWithoutSurrogates = $this => {
    let $lHS, var$2;
    if ($this.$charClassWithoutSurrogates === null) {
        $lHS = $this.$getLowHighSurrogates();
        var$2 = new jur_AbstractCharClass$2;
        var$2.$this$017 = $this;
        var$2.$val$lHS0 = $lHS;
        var$2.$val$thisClass = $this;
        jur_AbstractCharClass__init_(var$2);
        $this.$charClassWithoutSurrogates = var$2;
        jur_AbstractCharClass_setNegative(var$2, $this.$alt);
        $this.$charClassWithoutSurrogates.$mayContainSupplCodepoints = $this.$mayContainSupplCodepoints;
    }
    return $this.$charClassWithoutSurrogates;
},
jur_AbstractCharClass_hasUCI = $this => {
    return 0;
},
jur_AbstractCharClass_setNegative = ($this, $value) => {
    let var$2;
    var$2 = $this.$alt;
    if (var$2 ^ $value) {
        $this.$alt = var$2 ? 0 : 1;
        $this.$altSurrogates = $this.$altSurrogates ? 0 : 1;
    }
    if (!$this.$mayContainSupplCodepoints)
        $this.$mayContainSupplCodepoints = 1;
    return $this;
},
jur_AbstractCharClass_isNegative = $this => {
    return $this.$alt;
},
jur_AbstractCharClass_intersects0 = ($cc, $ch) => {
    jur_AbstractCharClass_$callClinit();
    return $cc.$contains($ch);
},
jur_AbstractCharClass_intersects = ($cc1, $cc2) => {
    let var$3, var$4;
    jur_AbstractCharClass_$callClinit();
    if ($cc1.$getBits() !== null && $cc2.$getBits() !== null) {
        $cc1 = $cc1.$getBits();
        $cc2 = $cc2.$getBits();
        var$3 = jl_Math_min($cc1.$data.data.length, $cc2.$data.data.length);
        var$4 = 0;
        a: {
            while (var$4 < var$3) {
                if ($cc1.$data.data[var$4] & $cc2.$data.data[var$4]) {
                    var$3 = 1;
                    break a;
                }
                var$4 = var$4 + 1 | 0;
            }
            var$3 = 0;
        }
        return var$3;
    }
    return 1;
},
jur_AbstractCharClass_getPredefinedClass = ($name, $negative) => {
    let var$3, var$4, var$5;
    jur_AbstractCharClass_$callClinit();
    var$3 = 0;
    while (true) {
        jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit();
        var$4 = jur_AbstractCharClass$PredefinedCharacterClasses_contents.data;
        if (var$3 >= var$4.length) {
            var$5 = new ju_MissingResourceException;
            jl_Exception__init_0(var$5, $rt_s(2));
            var$5.$className = $rt_s(2);
            var$5.$key2 = $name;
            $rt_throw(var$5);
        }
        var$4 = var$4[var$3].data;
        if (jl_String_equals($name, var$4[0]))
            break;
        var$3 = var$3 + 1 | 0;
    }
    return jur_AbstractCharClass$LazyCharClass_getValue(var$4[1], $negative);
},
jur_AbstractCharClass__clinit_ = () => {
    let var$1;
    var$1 = new jur_AbstractCharClass$PredefinedCharacterClasses;
    jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit();
    jur_AbstractCharClass_charClasses = var$1;
};
function ju_MissingResourceException() {
    let a = this; jl_RuntimeException.call(a);
    a.$className = null;
    a.$key2 = null;
}
function jur_CharClass() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$ci = 0;
    a.$uci = 0;
    a.$hasUCI0 = 0;
    a.$invertedSurrogates = 0;
    a.$inverted = 0;
    a.$hideBits = 0;
    a.$bits = null;
    a.$nonBitSet = null;
}
let jur_CharClass__init_2 = $this => {
    jur_AbstractCharClass__init_($this);
    $this.$bits = ju_BitSet__init_();
},
jur_CharClass__init_ = () => {
    let var_0 = new jur_CharClass();
    jur_CharClass__init_2(var_0);
    return var_0;
},
jur_CharClass__init_1 = ($this, $ci, $uci) => {
    jur_AbstractCharClass__init_($this);
    $this.$bits = ju_BitSet__init_();
    $this.$ci = $ci;
    $this.$uci = $uci;
},
jur_CharClass__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CharClass();
    jur_CharClass__init_1(var_2, var_0, var_1);
    return var_2;
},
jur_CharClass_add0 = ($this, $ch) => {
    a: {
        if ($this.$ci) {
            b: {
                if (!($ch >= 97 && $ch <= 122)) {
                    if ($ch < 65)
                        break b;
                    if ($ch > 90)
                        break b;
                }
                if ($this.$inverted) {
                    ju_BitSet_clear($this.$bits, jur_Pattern_getSupplement($ch & 65535));
                    break a;
                }
                ju_BitSet_set0($this.$bits, jur_Pattern_getSupplement($ch & 65535));
                break a;
            }
            if ($this.$uci && $ch > 128) {
                $this.$hasUCI0 = 1;
                $ch = jl_Character_toLowerCase0(jl_Character_toUpperCase0($ch));
            }
        }
    }
    if (!(!jur_Lexer_isHighSurrogate($ch) && !jur_Lexer_isLowSurrogate($ch))) {
        if ($this.$invertedSurrogates)
            ju_BitSet_clear($this.$lowHighSurrogates, $ch - 55296 | 0);
        else
            ju_BitSet_set0($this.$lowHighSurrogates, $ch - 55296 | 0);
    }
    if ($this.$inverted)
        ju_BitSet_clear($this.$bits, $ch);
    else
        ju_BitSet_set0($this.$bits, $ch);
    if (!$this.$mayContainSupplCodepoints && jl_Character_isSupplementaryCodePoint($ch))
        $this.$mayContainSupplCodepoints = 1;
    return $this;
},
jur_CharClass_add1 = ($this, $cc) => {
    let $curAlt, $nb, var$4;
    if (!$this.$mayContainSupplCodepoints && $cc.$mayContainSupplCodepoints)
        $this.$mayContainSupplCodepoints = 1;
    if ($this.$invertedSurrogates) {
        if (!$cc.$altSurrogates)
            ju_BitSet_andNot($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
        else
            ju_BitSet_and($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
    } else if (!$cc.$altSurrogates)
        ju_BitSet_or($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
    else {
        ju_BitSet_xor($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
        ju_BitSet_and($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
        $this.$altSurrogates = $this.$altSurrogates ? 0 : 1;
        $this.$invertedSurrogates = 1;
    }
    if (!$this.$hideBits && $cc.$getBits() !== null) {
        if ($this.$inverted) {
            if (!$cc.$alt)
                ju_BitSet_andNot($this.$bits, $cc.$getBits());
            else
                ju_BitSet_and($this.$bits, $cc.$getBits());
        } else if (!$cc.$alt)
            ju_BitSet_or($this.$bits, $cc.$getBits());
        else {
            ju_BitSet_xor($this.$bits, $cc.$getBits());
            ju_BitSet_and($this.$bits, $cc.$getBits());
            $this.$alt = $this.$alt ? 0 : 1;
            $this.$inverted = 1;
        }
    } else {
        $curAlt = $this.$alt;
        $nb = $this.$nonBitSet;
        if ($nb !== null) {
            if (!$curAlt) {
                var$4 = new jur_CharClass$5;
                var$4.$this$018 = $this;
                var$4.$val$curAlt7 = $curAlt;
                var$4.$val$nb3 = $nb;
                var$4.$val$cc0 = $cc;
                jur_AbstractCharClass__init_(var$4);
                $this.$nonBitSet = var$4;
            } else {
                var$4 = new jur_CharClass$4;
                var$4.$this$032 = $this;
                var$4.$val$curAlt9 = $curAlt;
                var$4.$val$nb4 = $nb;
                var$4.$val$cc2 = $cc;
                jur_AbstractCharClass__init_(var$4);
                $this.$nonBitSet = var$4;
            }
        } else {
            if ($curAlt && !$this.$inverted && ju_BitSet_isEmpty($this.$bits)) {
                $nb = new jur_CharClass$1;
                $nb.$this$08 = $this;
                $nb.$val$cc3 = $cc;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            } else if (!$curAlt) {
                $nb = new jur_CharClass$3;
                $nb.$this$00 = $this;
                $nb.$val$curAlt = $curAlt;
                $nb.$val$cc = $cc;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            } else {
                $nb = new jur_CharClass$2;
                $nb.$this$0 = $this;
                $nb.$val$curAlt0 = $curAlt;
                $nb.$val$cc1 = $cc;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            }
            $this.$hideBits = 1;
        }
    }
    return $this;
},
jur_CharClass_add = ($this, $i, $end) => {
    let var$3, var$4, var$5, var$6, var$7;
    if ($i > $end) {
        var$3 = new jl_IllegalArgumentException;
        jl_Exception__init_(var$3);
        $rt_throw(var$3);
    }
    a: {
        b: {
            if (!$this.$ci) {
                if ($end < 55296)
                    break b;
                if ($i > 57343)
                    break b;
            }
            $end = $end + 1 | 0;
            while (true) {
                if ($i >= $end)
                    break a;
                jur_CharClass_add0($this, $i);
                $i = $i + 1 | 0;
            }
        }
        if (!$this.$inverted)
            ju_BitSet_set($this.$bits, $i, $end + 1 | 0);
        else {
            var$3 = $this.$bits;
            $end = $end + 1 | 0;
            if ($i >= 0 && $i <= $end) {
                var$4 = var$3.$length1;
                if ($i < var$4) {
                    var$5 = jl_Math_min(var$4, $end);
                    if ($i != var$5) {
                        var$6 = $i / 32 | 0;
                        $end = var$5 / 32 | 0;
                        if (var$6 == $end) {
                            var$7 = var$3.$data.data;
                            var$7[var$6] = var$7[var$6] & (ju_BitSet_trailingOneBits(var$3, $i) | ju_BitSet_trailingZeroBits(var$3, var$5));
                        } else {
                            var$7 = var$3.$data.data;
                            var$7[var$6] = var$7[var$6] & ju_BitSet_trailingOneBits(var$3, $i);
                            var$4 = var$6 + 1 | 0;
                            while (var$4 < $end) {
                                var$3.$data.data[var$4] = 0;
                                var$4 = var$4 + 1 | 0;
                            }
                            if (var$5 & 31) {
                                var$7 = var$3.$data.data;
                                var$7[$end] = var$7[$end] & ju_BitSet_trailingZeroBits(var$3, var$5);
                            }
                        }
                        ju_BitSet_recalculateLength(var$3);
                    }
                }
            } else {
                var$3 = new jl_IndexOutOfBoundsException;
                jl_Exception__init_(var$3);
                $rt_throw(var$3);
            }
        }
    }
    return $this;
},
jur_CharClass_union = ($this, $clazz) => {
    let var$2, $curAlt, $nb;
    if (!$this.$mayContainSupplCodepoints && $clazz.$mayContainSupplCodepoints)
        $this.$mayContainSupplCodepoints = 1;
    var$2 = $clazz;
    if (var$2.$hasUCI0)
        $this.$hasUCI0 = 1;
    $curAlt = $this.$altSurrogates;
    if (!($curAlt ^ $clazz.$altSurrogates)) {
        if (!$curAlt)
            ju_BitSet_or($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        else
            ju_BitSet_and($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
    } else if ($curAlt)
        ju_BitSet_andNot($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
    else {
        ju_BitSet_xor($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        ju_BitSet_and($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        $this.$altSurrogates = 1;
    }
    if (!$this.$hideBits && jur_CharClass_getBits(var$2) !== null) {
        $curAlt = $this.$alt;
        if (!($curAlt ^ $clazz.$alt)) {
            if (!$curAlt)
                ju_BitSet_or($this.$bits, jur_CharClass_getBits(var$2));
            else
                ju_BitSet_and($this.$bits, jur_CharClass_getBits(var$2));
        } else if ($curAlt)
            ju_BitSet_andNot($this.$bits, jur_CharClass_getBits(var$2));
        else {
            ju_BitSet_xor($this.$bits, jur_CharClass_getBits(var$2));
            ju_BitSet_and($this.$bits, jur_CharClass_getBits(var$2));
            $this.$alt = 1;
        }
    } else {
        $curAlt = $this.$alt;
        $nb = $this.$nonBitSet;
        if ($nb !== null) {
            if (!$curAlt) {
                var$2 = new jur_CharClass$11;
                var$2.$this$012 = $this;
                var$2.$val$curAlt4 = $curAlt;
                var$2.$val$nb2 = $nb;
                var$2.$val$clazz8 = $clazz;
                jur_AbstractCharClass__init_(var$2);
                $this.$nonBitSet = var$2;
            } else {
                var$2 = new jur_CharClass$10;
                var$2.$this$019 = $this;
                var$2.$val$curAlt6 = $curAlt;
                var$2.$val$nb0 = $nb;
                var$2.$val$clazz0 = $clazz;
                jur_AbstractCharClass__init_(var$2);
                $this.$nonBitSet = var$2;
            }
        } else {
            if (!$this.$inverted && ju_BitSet_isEmpty($this.$bits)) {
                if (!$curAlt) {
                    $nb = new jur_CharClass$7;
                    $nb.$this$033 = $this;
                    $nb.$val$clazz7 = $clazz;
                    jur_AbstractCharClass__init_($nb);
                    $this.$nonBitSet = $nb;
                } else {
                    $nb = new jur_CharClass$6;
                    $nb.$this$020 = $this;
                    $nb.$val$clazz6 = $clazz;
                    jur_AbstractCharClass__init_($nb);
                    $this.$nonBitSet = $nb;
                }
            } else if (!$curAlt) {
                $nb = new jur_CharClass$9;
                $nb.$this$04 = $this;
                $nb.$val$clazz = $clazz;
                $nb.$val$curAlt8 = $curAlt;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            } else {
                $nb = new jur_CharClass$8;
                $nb.$this$01 = $this;
                $nb.$val$clazz1 = $clazz;
                $nb.$val$curAlt2 = $curAlt;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            }
            $this.$hideBits = 1;
        }
    }
},
jur_CharClass_intersection = ($this, $clazz) => {
    let var$2, $curAlt, $nb;
    if (!$this.$mayContainSupplCodepoints && $clazz.$mayContainSupplCodepoints)
        $this.$mayContainSupplCodepoints = 1;
    var$2 = $clazz;
    if (var$2.$hasUCI0)
        $this.$hasUCI0 = 1;
    $curAlt = $this.$altSurrogates;
    if (!($curAlt ^ $clazz.$altSurrogates)) {
        if (!$curAlt)
            ju_BitSet_and($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        else
            ju_BitSet_or($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
    } else if (!$curAlt)
        ju_BitSet_andNot($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
    else {
        ju_BitSet_xor($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        ju_BitSet_and($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        $this.$altSurrogates = 0;
    }
    if (!$this.$hideBits && jur_CharClass_getBits(var$2) !== null) {
        $curAlt = $this.$alt;
        if (!($curAlt ^ $clazz.$alt)) {
            if (!$curAlt)
                ju_BitSet_and($this.$bits, jur_CharClass_getBits(var$2));
            else
                ju_BitSet_or($this.$bits, jur_CharClass_getBits(var$2));
        } else if (!$curAlt)
            ju_BitSet_andNot($this.$bits, jur_CharClass_getBits(var$2));
        else {
            ju_BitSet_xor($this.$bits, jur_CharClass_getBits(var$2));
            ju_BitSet_and($this.$bits, jur_CharClass_getBits(var$2));
            $this.$alt = 0;
        }
    } else {
        $curAlt = $this.$alt;
        $nb = $this.$nonBitSet;
        if ($nb !== null) {
            if (!$curAlt) {
                var$2 = new jur_CharClass$17;
                var$2.$this$016 = $this;
                var$2.$val$curAlt5 = $curAlt;
                var$2.$val$nb1 = $nb;
                var$2.$val$clazz10 = $clazz;
                jur_AbstractCharClass__init_(var$2);
                $this.$nonBitSet = var$2;
            } else {
                var$2 = new jur_CharClass$16;
                var$2.$this$023 = $this;
                var$2.$val$curAlt3 = $curAlt;
                var$2.$val$nb = $nb;
                var$2.$val$clazz3 = $clazz;
                jur_AbstractCharClass__init_(var$2);
                $this.$nonBitSet = var$2;
            }
        } else {
            if (!$this.$inverted && ju_BitSet_isEmpty($this.$bits)) {
                if (!$curAlt) {
                    $nb = new jur_CharClass$13;
                    $nb.$this$021 = $this;
                    $nb.$val$clazz4 = $clazz;
                    jur_AbstractCharClass__init_($nb);
                    $this.$nonBitSet = $nb;
                } else {
                    $nb = new jur_CharClass$12;
                    $nb.$this$031 = $this;
                    $nb.$val$clazz5 = $clazz;
                    jur_AbstractCharClass__init_($nb);
                    $this.$nonBitSet = $nb;
                }
            } else if (!$curAlt) {
                $nb = new jur_CharClass$15;
                $nb.$this$06 = $this;
                $nb.$val$clazz9 = $clazz;
                $nb.$val$curAlt1 = $curAlt;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            } else {
                $nb = new jur_CharClass$14;
                $nb.$this$02 = $this;
                $nb.$val$clazz2 = $clazz;
                $nb.$val$curAlt10 = $curAlt;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            }
            $this.$hideBits = 1;
        }
    }
},
jur_CharClass_contains = ($this, $ch) => {
    let var$2;
    var$2 = $this.$nonBitSet;
    if (var$2 !== null)
        return $this.$alt ^ var$2.$contains($ch);
    return $this.$alt ^ ju_BitSet_get($this.$bits, $ch);
},
jur_CharClass_getBits = $this => {
    if (!$this.$hideBits)
        return $this.$bits;
    return null;
},
jur_CharClass_getLowHighSurrogates = $this => {
    return $this.$lowHighSurrogates;
},
jur_CharClass_getInstance = $this => {
    let $bs, $res;
    if ($this.$nonBitSet !== null)
        return $this;
    $bs = jur_CharClass_getBits($this);
    $res = new jur_CharClass$18;
    $res.$this$011 = $this;
    $res.$val$bs = $bs;
    jur_AbstractCharClass__init_($res);
    return jur_AbstractCharClass_setNegative($res, $this.$alt);
},
jur_CharClass_toString = $this => {
    let $temp, $i, var$3;
    $temp = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($temp);
    $i = ju_BitSet_nextSetBit($this.$bits, 0);
    while ($i >= 0) {
        jl_AbstractStringBuilder_append1($temp, jl_Character_toChars($i));
        jl_AbstractStringBuilder_append($temp, 124);
        $i = ju_BitSet_nextSetBit($this.$bits, $i + 1 | 0);
    }
    var$3 = $temp.$length0;
    if (var$3 > 0)
        jl_StringBuilder_deleteCharAt($temp, var$3 - 1 | 0);
    return jl_AbstractStringBuilder_toString($temp);
},
jur_CharClass_hasUCI = $this => {
    return $this.$hasUCI0;
};
function jur_QuantifierSet() {
    jur_AbstractSet.call(this);
    this.$innerSet = null;
}
let jur_QuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_AbstractSet__init_0($this, $next);
    $this.$innerSet = $innerSet;
    $this.$type0 = $type;
},
jur_QuantifierSet_getInnerSet = $this => {
    return $this.$innerSet;
},
jur_QuantifierSet_first = ($this, $set) => {
    return !$this.$innerSet.$first($set) && !$this.$next3.$first($set) ? 0 : 1;
},
jur_QuantifierSet_hasConsumed = ($this, $mr) => {
    return 1;
},
jur_QuantifierSet_processSecondPass = $this => {
    let $set;
    $this.$isSecondPassVisited = 1;
    $set = $this.$next3;
    if ($set !== null && !$set.$isSecondPassVisited) {
        $set = $set.$processBackRefReplacement();
        if ($set !== null) {
            $this.$next3.$isSecondPassVisited = 1;
            $this.$next3 = $set;
        }
        $this.$next3.$processSecondPass();
    }
    $set = $this.$innerSet;
    if ($set !== null) {
        if (!$set.$isSecondPassVisited) {
            $set = $set.$processBackRefReplacement();
            if ($set !== null) {
                $this.$innerSet.$isSecondPassVisited = 1;
                $this.$innerSet = $set;
            }
            $this.$innerSet.$processSecondPass();
        } else if ($set instanceof jur_SingleSet && $set.$fSet.$isBackReferenced)
            $this.$innerSet = $set.$next3;
    }
};
function jur_LeafQuantifierSet() {
    jur_QuantifierSet.call(this);
    this.$leaf = null;
}
let jur_LeafQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_QuantifierSet__init_($this, $innerSet, $next, $type);
    $this.$leaf = $innerSet;
},
jur_LeafQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_LeafQuantifierSet();
    jur_LeafQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_LeafQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $i, var$5;
    $i = 0;
    a: {
        while (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$rightBound) {
            var$5 = $this.$leaf.$accepts($stringIndex, $testString);
            if (var$5 <= 0)
                break a;
            $stringIndex = $stringIndex + var$5 | 0;
            $i = $i + 1 | 0;
        }
    }
    while (true) {
        if ($i < 0)
            return (-1);
        var$5 = $this.$next3.$matches($stringIndex, $testString, $matchResult);
        if (var$5 >= 0)
            break;
        $stringIndex = $stringIndex - $this.$leaf.$charCount() | 0;
        $i = $i + (-1) | 0;
    }
    return var$5;
},
jur_LeafQuantifierSet_getName = $this => {
    return $rt_s(51);
};
function jur_CompositeQuantifierSet() {
    jur_LeafQuantifierSet.call(this);
    this.$quantifier0 = null;
}
let jur_CompositeQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type) => {
    jur_LeafQuantifierSet__init_($this, $innerSet, $next, $type);
    $this.$quantifier0 = $quant;
},
jur_CompositeQuantifierSet__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_CompositeQuantifierSet();
    jur_CompositeQuantifierSet__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_CompositeQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4, $min, $max, $i, $shift;
    var$4 = $this.$quantifier0;
    $min = var$4.$min0;
    $max = var$4.$max0;
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                while ($i < $max) {
                    if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound)
                        break a;
                    $shift = $this.$leaf.$accepts($stringIndex, $testString);
                    if ($shift < 1)
                        break a;
                    $stringIndex = $stringIndex + $shift | 0;
                    $i = $i + 1 | 0;
                }
            }
            while (true) {
                if ($i < $min)
                    return (-1);
                $shift = $this.$next3.$matches($stringIndex, $testString, $matchResult);
                if ($shift >= 0)
                    break;
                $stringIndex = $stringIndex - $this.$leaf.$charCount() | 0;
                $i = $i + (-1) | 0;
            }
            return $shift;
        }
        if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        $shift = $this.$leaf.$accepts($stringIndex, $testString);
        if ($shift < 1)
            break;
        $stringIndex = $stringIndex + $shift | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_CompositeQuantifierSet_getName = $this => {
    return jur_Quantifier_toString($this.$quantifier0);
},
jur_GroupQuantifierSet = $rt_classWithoutFields(jur_QuantifierSet),
jur_GroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next3.$matches($stringIndex, $testString, $matchResult);
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex >= 0)
        return $nextIndex;
    return $this.$next3.$matches($stringIndex, $testString, $matchResult);
},
jur_GroupQuantifierSet_getName = $this => {
    return $rt_s(52);
},
jur_AltQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_AltQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift;
    $shift = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        $shift = $this.$next3.$matches($stringIndex, $testString, $matchResult);
    return $shift;
},
jur_AltQuantifierSet_setNext = ($this, $next) => {
    $this.$next3 = $next;
    $this.$innerSet.$setNext($next);
},
jur_UnifiedQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_UnifiedQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    while (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$rightBound && $this.$leaf.$accepts($stringIndex, $testString) > 0) {
        $stringIndex = $stringIndex + $this.$leaf.$charCount() | 0;
    }
    return $this.$next3.$matches($stringIndex, $testString, $matchResult);
},
jur_UnifiedQuantifierSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $startSearch, $newSearch, $newSearch_0;
    $startSearch = $this.$next3.$find0($stringIndex, $testString, $matchResult);
    if ($startSearch < 0)
        return (-1);
    $newSearch = $startSearch - $this.$leaf.$charCount() | 0;
    while ($newSearch >= $stringIndex && $this.$leaf.$accepts($newSearch, $testString) > 0) {
        $newSearch_0 = $newSearch - $this.$leaf.$charCount() | 0;
        $startSearch = $newSearch;
        $newSearch = $newSearch_0;
    }
    return $startSearch;
};
function ju_Collections$13() {
    ju_AbstractMap.call(this);
    this.$val$m = null;
}
let jur_AbstractCharClass$PredefinedCharacterClasses = $rt_classWithoutFields(),
jur_AbstractCharClass$PredefinedCharacterClasses_space = null,
jur_AbstractCharClass$PredefinedCharacterClasses_digit = null,
jur_AbstractCharClass$PredefinedCharacterClasses_contents = null,
jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit = () => {
    jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit = $rt_eraseClinit(jur_AbstractCharClass$PredefinedCharacterClasses);
    jur_AbstractCharClass$PredefinedCharacterClasses__clinit_();
},
jur_AbstractCharClass$PredefinedCharacterClasses__clinit_ = () => {
    let var$1, var$2, var$3, var$4;
    jur_AbstractCharClass$PredefinedCharacterClasses_space = jur_AbstractCharClass$LazySpace__init_();
    jur_AbstractCharClass$PredefinedCharacterClasses_digit = jur_AbstractCharClass$LazyDigit__init_0();
    var$1 = $rt_createArray($rt_arraycls(jl_Object), 194);
    var$2 = var$1.data;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(53);
    var$4[1] = jur_AbstractCharClass$LazyLower__init_0();
    var$2[0] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(54);
    var$4[1] = jur_AbstractCharClass$LazyUpper__init_();
    var$2[1] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(55);
    var$4[1] = jur_AbstractCharClass$LazyASCII__init_0();
    var$2[2] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(56);
    var$4[1] = jur_AbstractCharClass$LazyAlpha__init_0();
    var$2[3] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(57);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_digit;
    var$2[4] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(58);
    var$4[1] = jur_AbstractCharClass$LazyAlnum__init_();
    var$2[5] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(59);
    var$4[1] = jur_AbstractCharClass$LazyPunct__init_0();
    var$2[6] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(60);
    var$4[1] = jur_AbstractCharClass$LazyGraph__init_();
    var$2[7] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(61);
    var$4[1] = jur_AbstractCharClass$LazyPrint__init_();
    var$2[8] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(62);
    var$4[1] = jur_AbstractCharClass$LazyBlank__init_();
    var$2[9] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(63);
    var$4[1] = jur_AbstractCharClass$LazyCntrl__init_();
    var$2[10] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(64);
    var$4[1] = jur_AbstractCharClass$LazyXDigit__init_();
    var$2[11] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(65);
    var$4[1] = jur_AbstractCharClass$LazyJavaLowerCase__init_0();
    var$2[12] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(66);
    var$4[1] = jur_AbstractCharClass$LazyJavaUpperCase__init_();
    var$2[13] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(67);
    var$4[1] = jur_AbstractCharClass$LazyJavaWhitespace__init_0();
    var$2[14] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(68);
    var$4[1] = jur_AbstractCharClass$LazyJavaMirrored__init_0();
    var$2[15] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(69);
    var$4[1] = jur_AbstractCharClass$LazyJavaDefined__init_();
    var$2[16] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(70);
    var$4[1] = jur_AbstractCharClass$LazyJavaDigit__init_0();
    var$2[17] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(71);
    var$4[1] = jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_0();
    var$2[18] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(72);
    var$4[1] = jur_AbstractCharClass$LazyJavaISOControl__init_0();
    var$2[19] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(73);
    var$4[1] = jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_0();
    var$2[20] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(74);
    var$4[1] = jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_0();
    var$2[21] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(75);
    var$4[1] = jur_AbstractCharClass$LazyJavaLetter__init_();
    var$2[22] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(76);
    var$4[1] = jur_AbstractCharClass$LazyJavaLetterOrDigit__init_();
    var$2[23] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(77);
    var$4[1] = jur_AbstractCharClass$LazyJavaSpaceChar__init_0();
    var$2[24] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(78);
    var$4[1] = jur_AbstractCharClass$LazyJavaTitleCase__init_0();
    var$2[25] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(79);
    var$4[1] = jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_();
    var$2[26] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(80);
    var$4[1] = jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_();
    var$2[27] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(81);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_space;
    var$2[28] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(82);
    var$4[1] = jur_AbstractCharClass$LazyWord__init_();
    var$2[29] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(83);
    var$4[1] = jur_AbstractCharClass$LazyNonWord__init_();
    var$2[30] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(84);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_space;
    var$2[31] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(85);
    var$4[1] = jur_AbstractCharClass$LazyNonSpace__init_();
    var$2[32] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(86);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_digit;
    var$2[33] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(87);
    var$4[1] = jur_AbstractCharClass$LazyNonDigit__init_();
    var$2[34] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(88);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(0, 127);
    var$2[35] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(89);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(128, 255);
    var$2[36] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(90);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(256, 383);
    var$2[37] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(91);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(384, 591);
    var$2[38] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(92);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(592, 687);
    var$2[39] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(93);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(688, 767);
    var$2[40] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(94);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(768, 879);
    var$2[41] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(95);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(880, 1023);
    var$2[42] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(96);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1024, 1279);
    var$2[43] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(97);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1280, 1327);
    var$2[44] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(98);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1328, 1423);
    var$2[45] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(99);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1424, 1535);
    var$2[46] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(100);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1536, 1791);
    var$2[47] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(101);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1792, 1871);
    var$2[48] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(102);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1872, 1919);
    var$2[49] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(103);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1920, 1983);
    var$2[50] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(104);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2304, 2431);
    var$2[51] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(105);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2432, 2559);
    var$2[52] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(106);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2560, 2687);
    var$2[53] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(107);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2688, 2815);
    var$2[54] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(108);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2816, 2943);
    var$2[55] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(109);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2944, 3071);
    var$2[56] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(110);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3072, 3199);
    var$2[57] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(111);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3200, 3327);
    var$2[58] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(112);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3328, 3455);
    var$2[59] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(113);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3456, 3583);
    var$2[60] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(114);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3584, 3711);
    var$2[61] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(115);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3712, 3839);
    var$2[62] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(116);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3840, 4095);
    var$2[63] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(117);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4096, 4255);
    var$2[64] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(118);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4256, 4351);
    var$2[65] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(119);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4352, 4607);
    var$2[66] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(120);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4608, 4991);
    var$2[67] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(121);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4992, 5023);
    var$2[68] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(122);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5024, 5119);
    var$2[69] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(123);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5120, 5759);
    var$2[70] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(124);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5760, 5791);
    var$2[71] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(125);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5792, 5887);
    var$2[72] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(126);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5888, 5919);
    var$2[73] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(127);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5920, 5951);
    var$2[74] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(128);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5952, 5983);
    var$2[75] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(129);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5984, 6015);
    var$2[76] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(130);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6016, 6143);
    var$2[77] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(131);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6144, 6319);
    var$2[78] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(132);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6400, 6479);
    var$2[79] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(133);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6480, 6527);
    var$2[80] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(134);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6528, 6623);
    var$2[81] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(135);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6624, 6655);
    var$2[82] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(136);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6656, 6687);
    var$2[83] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(137);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7424, 7551);
    var$2[84] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(138);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7552, 7615);
    var$2[85] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(139);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7616, 7679);
    var$2[86] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(140);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7680, 7935);
    var$2[87] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(141);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7936, 8191);
    var$2[88] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(142);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8192, 8303);
    var$2[89] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(143);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8304, 8351);
    var$2[90] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(144);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8352, 8399);
    var$2[91] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(145);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8400, 8447);
    var$2[92] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(146);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8448, 8527);
    var$2[93] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(147);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8528, 8591);
    var$2[94] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(148);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8592, 8703);
    var$2[95] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(149);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8704, 8959);
    var$2[96] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(150);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8960, 9215);
    var$2[97] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(151);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9216, 9279);
    var$2[98] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(152);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9280, 9311);
    var$2[99] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(153);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9312, 9471);
    var$2[100] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(154);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9472, 9599);
    var$2[101] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(155);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9600, 9631);
    var$2[102] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(156);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9632, 9727);
    var$2[103] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(157);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9728, 9983);
    var$2[104] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(158);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9984, 10175);
    var$2[105] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(159);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10176, 10223);
    var$2[106] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(160);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10224, 10239);
    var$2[107] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(161);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10240, 10495);
    var$2[108] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(162);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10496, 10623);
    var$2[109] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(163);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10624, 10751);
    var$2[110] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(164);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10752, 11007);
    var$2[111] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(165);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11008, 11263);
    var$2[112] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(166);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11264, 11359);
    var$2[113] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(167);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11392, 11519);
    var$2[114] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(168);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11520, 11567);
    var$2[115] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(169);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11568, 11647);
    var$2[116] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(170);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11648, 11743);
    var$2[117] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(171);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11776, 11903);
    var$2[118] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(172);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11904, 12031);
    var$2[119] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(173);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12032, 12255);
    var$2[120] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(174);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12272, 12287);
    var$2[121] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(175);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12288, 12351);
    var$2[122] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(176);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12352, 12447);
    var$2[123] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(177);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12448, 12543);
    var$2[124] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(178);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12544, 12591);
    var$2[125] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(179);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12592, 12687);
    var$2[126] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(180);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12688, 12703);
    var$2[127] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(181);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12704, 12735);
    var$2[128] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(182);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12736, 12783);
    var$2[129] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(183);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12784, 12799);
    var$2[130] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(184);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12800, 13055);
    var$2[131] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(185);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(13056, 13311);
    var$2[132] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(186);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(13312, 19893);
    var$2[133] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(187);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(19904, 19967);
    var$2[134] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(188);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(19968, 40959);
    var$2[135] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(189);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(40960, 42127);
    var$2[136] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(190);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(42128, 42191);
    var$2[137] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(191);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(42752, 42783);
    var$2[138] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(192);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(43008, 43055);
    var$2[139] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(193);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(44032, 55203);
    var$2[140] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(194);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(55296, 56191);
    var$2[141] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(195);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(56192, 56319);
    var$2[142] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(196);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(56320, 57343);
    var$2[143] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(197);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(57344, 63743);
    var$2[144] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(198);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(63744, 64255);
    var$2[145] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(199);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(64256, 64335);
    var$2[146] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(200);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(64336, 65023);
    var$2[147] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(201);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65024, 65039);
    var$2[148] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(202);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65040, 65055);
    var$2[149] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(203);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65056, 65071);
    var$2[150] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(204);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65072, 65103);
    var$2[151] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(205);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65104, 65135);
    var$2[152] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(206);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65136, 65279);
    var$2[153] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(207);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65280, 65519);
    var$2[154] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(208);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(0, 1114111);
    var$2[155] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(209);
    var$4[1] = jur_AbstractCharClass$LazySpecialsBlock__init_();
    var$2[156] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(210);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(0, 1);
    var$2[157] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(211);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(62, 1);
    var$2[158] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(212);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(1, 1);
    var$2[159] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(213);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(2, 1);
    var$2[160] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(214);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(3, 0);
    var$2[161] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(215);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(4, 0);
    var$2[162] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(216);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(5, 1);
    var$2[163] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(217);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(448, 1);
    var$2[164] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(218);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(6, 1);
    var$2[165] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(219);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(7, 0);
    var$2[166] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(220);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(8, 1);
    var$2[167] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(221);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(3584, 1);
    var$2[168] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(222);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(9, 1);
    var$2[169] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(223);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(10, 1);
    var$2[170] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(224);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(11, 1);
    var$2[171] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(225);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(28672, 0);
    var$2[172] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(226);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(12, 0);
    var$2[173] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(227);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(13, 0);
    var$2[174] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(228);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(14, 0);
    var$2[175] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(229);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_2(983040, 1, 1);
    var$2[176] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(230);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(15, 0);
    var$2[177] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(231);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(16, 1);
    var$2[178] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(232);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(18, 1);
    var$2[179] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(233);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_2(19, 0, 1);
    var$2[180] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(234);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(1643118592, 1);
    var$2[181] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(235);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(20, 0);
    var$2[182] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(236);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(21, 0);
    var$2[183] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(237);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(22, 0);
    var$2[184] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(238);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(23, 0);
    var$2[185] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(239);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(24, 1);
    var$2[186] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(240);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(2113929216, 1);
    var$2[187] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(241);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(25, 1);
    var$2[188] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(242);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(26, 0);
    var$2[189] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(243);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(27, 0);
    var$2[190] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(244);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(28, 1);
    var$2[191] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(245);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(29, 0);
    var$2[192] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(246);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(30, 0);
    var$2[193] = var$3;
    jur_AbstractCharClass$PredefinedCharacterClasses_contents = var$1;
};
function jur_AbstractCharClass$LazyCharClass() {
    let a = this; jl_Object.call(a);
    a.$posValue = null;
    a.$negValue = null;
}
let jur_AbstractCharClass$LazyCharClass_getValue = ($this, $negative) => {
    if (!$negative && $this.$posValue === null)
        $this.$posValue = $this.$computeValue();
    else if ($negative && $this.$negValue === null)
        $this.$negValue = jur_AbstractCharClass_setNegative($this.$computeValue(), 1);
    if ($negative)
        return $this.$negValue;
    return $this.$posValue;
},
jl_NumberFormatException = $rt_classWithoutFields(jl_IllegalArgumentException),
jl_NumberFormatException__init_0 = $this => {
    jl_Exception__init_($this);
},
jl_NumberFormatException__init_ = () => {
    let var_0 = new jl_NumberFormatException();
    jl_NumberFormatException__init_0(var_0);
    return var_0;
};
function jur_Quantifier() {
    let a = this; jur_SpecialToken.call(a);
    a.$min0 = 0;
    a.$max0 = 0;
}
let jur_Quantifier_toString = $this => {
    let var$1, var$2, var$3, var$4, var$5;
    var$1 = $this.$min0;
    var$2 = $this.$max0;
    var$3 = var$2 != 2147483647 ? jl_Integer_toString(var$2) : $rt_s(2);
    var$4 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$4);
    jl_AbstractStringBuilder_append(var$4, 123);
    var$5 = jl_StringBuilder_append0(var$4, var$1);
    jl_AbstractStringBuilder_append(var$5, 44);
    jl_AbstractStringBuilder_append(jl_StringBuilder_append(var$5, var$3), 125);
    return jl_AbstractStringBuilder_toString(var$4);
},
jur_FSet$PossessiveFSet = $rt_classWithoutFields(jur_AbstractSet),
jur_FSet$PossessiveFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    return $stringIndex;
},
jur_FSet$PossessiveFSet_getName = $this => {
    return $rt_s(247);
},
jur_FSet$PossessiveFSet_hasConsumed = ($this, $mr) => {
    return 0;
};
function ju_BitSet() {
    let a = this; jl_Object.call(a);
    a.$data = null;
    a.$length1 = 0;
}
let ju_BitSet__init_0 = $this => {
    $this.$data = $rt_createIntArray(2);
},
ju_BitSet__init_ = () => {
    let var_0 = new ju_BitSet();
    ju_BitSet__init_0(var_0);
    return var_0;
},
ju_BitSet_set0 = ($this, $bitIndex) => {
    let var$2, $index, var$4;
    if ($bitIndex < 0) {
        var$2 = new jl_IndexOutOfBoundsException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    $index = $bitIndex / 32 | 0;
    if ($bitIndex >= $this.$length1) {
        ju_BitSet_ensureCapacity($this, $index + 1 | 0);
        $this.$length1 = $bitIndex + 1 | 0;
    }
    var$4 = $this.$data.data;
    var$4[$index] = var$4[$index] | 1 << ($bitIndex % 32 | 0);
},
ju_BitSet_set = ($this, $fromIndex, $toIndex) => {
    let $fromDataIndex, $toDataIndex, var$5, $i, var$7;
    if ($fromIndex >= 0) {
        $fromDataIndex = $rt_compare($fromIndex, $toIndex);
        if ($fromDataIndex <= 0) {
            if (!$fromDataIndex)
                return;
            $fromDataIndex = $fromIndex / 32 | 0;
            $toDataIndex = $toIndex / 32 | 0;
            if ($toIndex > $this.$length1) {
                ju_BitSet_ensureCapacity($this, $toDataIndex + 1 | 0);
                $this.$length1 = $toIndex;
            }
            if ($fromDataIndex == $toDataIndex) {
                var$5 = $this.$data.data;
                var$5[$fromDataIndex] = var$5[$fromDataIndex] | ju_BitSet_trailingZeroBits($this, $fromIndex) & ju_BitSet_trailingOneBits($this, $toIndex);
            } else {
                var$5 = $this.$data.data;
                var$5[$fromDataIndex] = var$5[$fromDataIndex] | ju_BitSet_trailingZeroBits($this, $fromIndex);
                $i = $fromDataIndex + 1 | 0;
                while ($i < $toDataIndex) {
                    $this.$data.data[$i] = (-1);
                    $i = $i + 1 | 0;
                }
                if ($toIndex & 31) {
                    var$5 = $this.$data.data;
                    var$5[$toDataIndex] = var$5[$toDataIndex] | ju_BitSet_trailingOneBits($this, $toIndex);
                }
            }
            return;
        }
    }
    var$7 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_(var$7);
    $rt_throw(var$7);
},
ju_BitSet_trailingZeroBits = ($this, $num) => {
    return (-1) << ($num % 32 | 0);
},
ju_BitSet_trailingOneBits = ($this, $num) => {
    $num = $num % 32 | 0;
    return !$num ? 0 : (-1) >>> (32 - $num | 0) | 0;
},
ju_BitSet_clear = ($this, $bitIndex) => {
    let var$2, $index, var$4, var$5, var$6, var$7;
    if ($bitIndex < 0) {
        var$2 = new jl_IndexOutOfBoundsException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    $index = $bitIndex / 32 | 0;
    var$4 = $this.$data.data;
    if ($index < var$4.length) {
        var$5 = var$4[$index];
        var$6 = $bitIndex % 32 | 0;
        jl_Integer_$callClinit();
        var$7 = var$6 & 31;
        var$4[$index] = var$5 & ((-2) << var$7 | ((-2) >>> (32 - var$7 | 0) | 0));
        if ($bitIndex == ($this.$length1 - 1 | 0))
            ju_BitSet_recalculateLength($this);
    }
},
ju_BitSet_get = ($this, $bitIndex) => {
    let var$2, $index, var$4;
    if ($bitIndex < 0) {
        var$2 = new jl_IndexOutOfBoundsException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    $index = $bitIndex / 32 | 0;
    var$4 = $this.$data.data;
    return $index < var$4.length && var$4[$index] & 1 << ($bitIndex % 32 | 0) ? 1 : 0;
},
ju_BitSet_nextSetBit = ($this, $fromIndex) => {
    let var$2, $top, $index, var$5, $i;
    if ($fromIndex < 0) {
        var$2 = new jl_IndexOutOfBoundsException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    $top = $this.$length1;
    if ($fromIndex >= $top)
        return (-1);
    $index = $fromIndex / 32 | 0;
    var$5 = $this.$data.data;
    $i = var$5[$index] >>> ($fromIndex % 32 | 0) | 0;
    if ($i)
        return jl_Integer_numberOfTrailingZeros($i) + $fromIndex | 0;
    $top = ($top + 31 | 0) / 32 | 0;
    $i = $index + 1 | 0;
    while ($i < $top) {
        if (var$5[$i])
            return ($i * 32 | 0) + jl_Integer_numberOfTrailingZeros(var$5[$i]) | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
},
ju_BitSet_ensureCapacity = ($this, $capacity) => {
    let $newArrayLength, var$3, var$4, var$5;
    $newArrayLength = $this.$data.data.length;
    if ($newArrayLength >= $capacity)
        return;
    $newArrayLength = jl_Math_max(($capacity * 3 | 0) / 2 | 0, ($newArrayLength * 2 | 0) + 1 | 0);
    var$3 = $this.$data.data;
    var$4 = $rt_createIntArray($newArrayLength);
    var$5 = var$4.data;
    $capacity = jl_Math_min($newArrayLength, var$3.length);
    $newArrayLength = 0;
    while ($newArrayLength < $capacity) {
        var$5[$newArrayLength] = var$3[$newArrayLength];
        $newArrayLength = $newArrayLength + 1 | 0;
    }
    $this.$data = var$4;
},
ju_BitSet_recalculateLength = $this => {
    let $top, $i, $sz;
    $top = ($this.$length1 + 31 | 0) / 32 | 0;
    $this.$length1 = $top * 32 | 0;
    $i = $top - 1 | 0;
    a: {
        while (true) {
            if ($i < 0)
                break a;
            $sz = jl_Integer_numberOfLeadingZeros($this.$data.data[$i]);
            if ($sz < 32)
                break;
            $i = $i + (-1) | 0;
            $this.$length1 = $this.$length1 - 32 | 0;
        }
        $this.$length1 = $this.$length1 - $sz | 0;
    }
},
ju_BitSet_and = ($this, $set) => {
    let $i, $i_0, var$4, var$5;
    $i = jl_Math_min($this.$data.data.length, $set.$data.data.length);
    $i_0 = 0;
    while ($i_0 < $i) {
        var$4 = $this.$data.data;
        var$4[$i_0] = var$4[$i_0] & $set.$data.data[$i_0];
        $i_0 = $i_0 + 1 | 0;
    }
    while (true) {
        var$5 = $this.$data.data;
        if ($i >= var$5.length)
            break;
        var$5[$i] = 0;
        $i = $i + 1 | 0;
    }
    $this.$length1 = jl_Math_min($this.$length1, $set.$length1);
    ju_BitSet_recalculateLength($this);
},
ju_BitSet_andNot = ($this, $set) => {
    let $sz, $i, var$4;
    $sz = jl_Math_min($this.$data.data.length, $set.$data.data.length);
    $i = 0;
    while ($i < $sz) {
        var$4 = $this.$data.data;
        var$4[$i] = var$4[$i] & ($set.$data.data[$i] ^ (-1));
        $i = $i + 1 | 0;
    }
    ju_BitSet_recalculateLength($this);
},
ju_BitSet_or = ($this, $set) => {
    let $sz, $i, var$4;
    $sz = jl_Math_max($this.$length1, $set.$length1);
    $this.$length1 = $sz;
    ju_BitSet_ensureCapacity($this, ($sz + 31 | 0) / 32 | 0);
    $sz = jl_Math_min($this.$data.data.length, $set.$data.data.length);
    $i = 0;
    while ($i < $sz) {
        var$4 = $this.$data.data;
        var$4[$i] = var$4[$i] | $set.$data.data[$i];
        $i = $i + 1 | 0;
    }
},
ju_BitSet_xor = ($this, $set) => {
    let $sz, $i, var$4;
    $sz = jl_Math_max($this.$length1, $set.$length1);
    $this.$length1 = $sz;
    ju_BitSet_ensureCapacity($this, ($sz + 31 | 0) / 32 | 0);
    $sz = jl_Math_min($this.$data.data.length, $set.$data.data.length);
    $i = 0;
    while ($i < $sz) {
        var$4 = $this.$data.data;
        var$4[$i] = var$4[$i] ^ $set.$data.data[$i];
        $i = $i + 1 | 0;
    }
    ju_BitSet_recalculateLength($this);
},
ju_BitSet_isEmpty = $this => {
    return $this.$length1 ? 0 : 1;
};
function jur_LowHighSurrogateRangeSet() {
    let a = this; jur_JointSet.call(a);
    a.$surrChars = null;
    a.$alt1 = 0;
}
let jur_LowHighSurrogateRangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = !$this.$alt1 ? $rt_s(19) : $rt_s(248);
    var$2 = $this.$surrChars.$toString();
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(249)), var$1), var$2);
    return jl_AbstractStringBuilder_toString(var$3);
};
function jur_CompositeRangeSet() {
    let a = this; jur_JointSet.call(a);
    a.$withoutSurrogates = null;
    a.$withSurrogates = null;
}
let jur_CompositeRangeSet__init_0 = ($this, $withoutSurrogates, $withSurrogates) => {
    jur_AbstractSet__init_($this);
    $this.$withoutSurrogates = $withoutSurrogates;
    $this.$withSurrogates = $withSurrogates;
},
jur_CompositeRangeSet__init_ = (var_0, var_1) => {
    let var_2 = new jur_CompositeRangeSet();
    jur_CompositeRangeSet__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_CompositeRangeSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift, var$5, var$6, var$7, var$8, var$9;
    $shift = $this.$withoutSurrogates.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        a: {
            var$5 = $this.$withSurrogates;
            var$6 = $matchResult.$leftBound;
            $shift = $matchResult.$rightBound;
            var$7 = $stringIndex + 1 | 0;
            $shift = $rt_compare(var$7, $shift);
            if ($shift > 0) {
                $matchResult.$hitEnd = 1;
                $shift = (-1);
            } else {
                var$8 = $testString;
                var$9 = jl_String_charAt(var$8, $stringIndex);
                if (!var$5.$surrChars.$contains(var$9))
                    $shift = (-1);
                else {
                    if (jl_Character_isHighSurrogate(var$9)) {
                        if ($shift < 0 && jl_Character_isLowSurrogate(jl_String_charAt(var$8, var$7))) {
                            $shift = (-1);
                            break a;
                        }
                    } else if (jl_Character_isLowSurrogate(var$9) && $stringIndex > var$6 && jl_Character_isHighSurrogate(jl_String_charAt(var$8, $stringIndex - 1 | 0))) {
                        $shift = (-1);
                        break a;
                    }
                    $shift = var$5.$next3.$matches(var$7, $testString, $matchResult);
                }
            }
        }
    if ($shift >= 0)
        return $shift;
    return (-1);
},
jur_CompositeRangeSet_setNext = ($this, $next) => {
    $this.$next3 = $next;
    $this.$withSurrogates.$next3 = $next;
    $this.$withoutSurrogates.$setNext($next);
},
jur_CompositeRangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = jl_String_valueOf($this.$withoutSurrogates);
    var$2 = jl_String_valueOf($this.$withSurrogates);
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(250)), var$1), $rt_s(251)), var$2);
    return jl_AbstractStringBuilder_toString(var$3);
},
jur_CompositeRangeSet_hasConsumed = ($this, $matchResult) => {
    return 1;
},
jur_CompositeRangeSet_first = ($this, $set) => {
    return 1;
};
function jur_SupplRangeSet() {
    let a = this; jur_JointSet.call(a);
    a.$chars = null;
    a.$alt0 = 0;
}
let jur_SupplRangeSet__init_ = ($this, $cc) => {
    jur_AbstractSet__init_($this);
    $this.$chars = $cc.$getInstance0();
    $this.$alt0 = $cc.$alt;
},
jur_SupplRangeSet__init_0 = var_0 => {
    let var_1 = new jur_SupplRangeSet();
    jur_SupplRangeSet__init_(var_1, var_0);
    return var_1;
},
jur_SupplRangeSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $low, var$6, $high, $offset;
    $strLength = $matchResult.$rightBound;
    if ($stringIndex < $strLength) {
        $low = $stringIndex + 1 | 0;
        var$6 = $testString;
        $high = jl_String_charAt(var$6, $stringIndex);
        if ($this.$contains($high)) {
            $offset = $this.$next3.$matches($low, $testString, $matchResult);
            if ($offset > 0)
                return $offset;
        }
        if ($low < $strLength) {
            $stringIndex = $low + 1 | 0;
            $low = jl_String_charAt(var$6, $low);
            if (jl_Character_isSurrogatePair($high, $low) && $this.$contains(jl_Character_toCodePoint($high, $low)))
                return $this.$next3.$matches($stringIndex, $testString, $matchResult);
        }
    }
    return (-1);
},
jur_SupplRangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = !$this.$alt0 ? $rt_s(19) : $rt_s(248);
    var$2 = $this.$chars.$toString();
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(249)), var$1), var$2);
    return jl_AbstractStringBuilder_toString(var$3);
},
jur_SupplRangeSet_contains = ($this, $ch) => {
    return $this.$chars.$contains($ch);
},
jur_SupplRangeSet_first = ($this, $set) => {
    if ($set instanceof jur_SupplCharSet)
        return jur_AbstractCharClass_intersects0($this.$chars, $set.$ch1);
    if ($set instanceof jur_CharSet)
        return jur_AbstractCharClass_intersects0($this.$chars, $set.$ch0);
    if ($set instanceof jur_SupplRangeSet)
        return jur_AbstractCharClass_intersects($this.$chars, $set.$chars);
    if (!($set instanceof jur_RangeSet))
        return 1;
    return jur_AbstractCharClass_intersects($this.$chars, $set.$chars0);
},
jur_SupplRangeSet_getChars = $this => {
    return $this.$chars;
},
jur_SupplRangeSet_setNext = ($this, $next) => {
    $this.$next3 = $next;
},
jur_SupplRangeSet_hasConsumed = ($this, $mr) => {
    return 1;
},
jur_UCISupplRangeSet = $rt_classWithoutFields(jur_SupplRangeSet),
jur_UCISupplRangeSet_contains = ($this, $ch) => {
    return $this.$chars.$contains(jl_Character_toLowerCase0(jl_Character_toUpperCase0($ch)));
},
jur_UCISupplRangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = !$this.$alt0 ? $rt_s(19) : $rt_s(248);
    var$2 = $this.$chars.$toString();
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(252)), var$1), var$2);
    return jl_AbstractStringBuilder_toString(var$3);
};
function jur_UCIRangeSet() {
    let a = this; jur_LeafSet.call(a);
    a.$chars1 = null;
    a.$alt3 = 0;
}
let jur_UCIRangeSet__init_0 = ($this, $cc) => {
    jur_LeafSet__init_($this);
    $this.$chars1 = $cc.$getInstance0();
    $this.$alt3 = $cc.$alt;
},
jur_UCIRangeSet__init_ = var_0 => {
    let var_1 = new jur_UCIRangeSet();
    jur_UCIRangeSet__init_0(var_1, var_0);
    return var_1;
},
jur_UCIRangeSet_accepts = ($this, $strIndex, $testString) => {
    return !$this.$chars1.$contains(jl_Character_toLowerCase(jl_Character_toUpperCase(jl_String_charAt($testString, $strIndex)))) ? (-1) : 1;
},
jur_UCIRangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = !$this.$alt3 ? $rt_s(19) : $rt_s(248);
    var$2 = $this.$chars1.$toString();
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(252)), var$1), var$2);
    return jl_AbstractStringBuilder_toString(var$3);
};
function jur_RangeSet() {
    let a = this; jur_LeafSet.call(a);
    a.$chars0 = null;
    a.$alt2 = 0;
}
let jur_RangeSet__init_0 = ($this, $cc) => {
    jur_LeafSet__init_($this);
    $this.$chars0 = $cc.$getInstance0();
    $this.$alt2 = $cc.$alt;
},
jur_RangeSet__init_ = var_0 => {
    let var_1 = new jur_RangeSet();
    jur_RangeSet__init_0(var_1, var_0);
    return var_1;
},
jur_RangeSet_accepts = ($this, $strIndex, $testString) => {
    return !$this.$chars0.$contains(jl_String_charAt($testString, $strIndex)) ? (-1) : 1;
},
jur_RangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = !$this.$alt2 ? $rt_s(19) : $rt_s(248);
    var$2 = $this.$chars0.$toString();
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(249)), var$1), var$2);
    return jl_AbstractStringBuilder_toString(var$3);
},
jur_RangeSet_first = ($this, $set) => {
    if ($set instanceof jur_CharSet)
        return jur_AbstractCharClass_intersects0($this.$chars0, $set.$ch0);
    if ($set instanceof jur_RangeSet)
        return jur_AbstractCharClass_intersects($this.$chars0, $set.$chars0);
    if (!($set instanceof jur_SupplRangeSet)) {
        if (!($set instanceof jur_SupplCharSet))
            return 1;
        return 0;
    }
    return jur_AbstractCharClass_intersects($this.$chars0, $set.$chars);
};
function jur_HangulDecomposedCharSet() {
    let a = this; jur_JointSet.call(a);
    a.$decomposedChar = null;
    a.$decomposedCharUTF16 = null;
    a.$decomposedCharLength = 0;
}
let jur_HangulDecomposedCharSet__init_0 = ($this, $decomposedChar, $decomposedCharLength) => {
    jur_AbstractSet__init_($this);
    $this.$decomposedChar = $decomposedChar;
    $this.$decomposedCharLength = $decomposedCharLength;
},
jur_HangulDecomposedCharSet__init_ = (var_0, var_1) => {
    let var_2 = new jur_HangulDecomposedCharSet();
    jur_HangulDecomposedCharSet__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_HangulDecomposedCharSet_setNext = ($this, $next) => {
    $this.$next3 = $next;
},
jur_HangulDecomposedCharSet_getDecomposedChar = $this => {
    if ($this.$decomposedCharUTF16 === null)
        $this.$decomposedCharUTF16 = jl_String__init_($this.$decomposedChar);
    return $this.$decomposedCharUTF16;
},
jur_HangulDecomposedCharSet_getName = $this => {
    let var$1, var$2;
    var$1 = jur_HangulDecomposedCharSet_getDecomposedChar($this);
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(253)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
},
jur_HangulDecomposedCharSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $rightBound, $decompSyllable, $vIndex, $tIndex, var$8, var$9, $curSymb, $i, var$12, $lIndex, $decompCurSymb, var$15, $syllIndex;
    $rightBound = $matchResult.$rightBound;
    $decompSyllable = $rt_createIntArray(3);
    $vIndex = (-1);
    $tIndex = (-1);
    if ($strIndex >= $rightBound)
        return (-1);
    var$8 = $strIndex + 1 | 0;
    var$9 = $testString;
    $curSymb = jl_String_charAt(var$9, $strIndex);
    $i = $curSymb - 44032 | 0;
    if ($i >= 0 && $i < 11172) {
        var$12 = 4352 + ($i / 588 | 0) | 0;
        $lIndex = 4449 + (($i % 588 | 0) / 28 | 0) | 0;
        $strIndex = $i % 28 | 0;
        $decompCurSymb = !$strIndex ? $rt_createIntArrayFromData([var$12, $lIndex]) : $rt_createIntArrayFromData([var$12, $lIndex, 4519 + $strIndex | 0]);
    } else
        $decompCurSymb = null;
    if ($decompCurSymb !== null) {
        var$15 = $decompCurSymb.data;
        $i = 0;
        $strIndex = var$15.length;
        $syllIndex = $this.$decomposedCharLength;
        if ($strIndex != $syllIndex)
            return (-1);
        while (true) {
            if ($i >= $syllIndex)
                return $this.$next3.$matches(var$8, $testString, $matchResult);
            if (var$15[$i] != $this.$decomposedChar.data[$i])
                break;
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    $decompSyllable = $decompSyllable.data;
    $decompSyllable[0] = $curSymb;
    $lIndex = $curSymb - 4352 | 0;
    if ($lIndex >= 0 && $lIndex < 19) {
        if (var$8 < $rightBound) {
            $curSymb = jl_String_charAt(var$9, var$8);
            $vIndex = $curSymb - 4449 | 0;
        }
        if ($vIndex >= 0 && $vIndex < 21) {
            $lIndex = var$8 + 1 | 0;
            $decompSyllable[1] = $curSymb;
            if ($lIndex < $rightBound) {
                $curSymb = jl_String_charAt(var$9, $lIndex);
                $tIndex = $curSymb - 4519 | 0;
            }
            if ($tIndex >= 0 && $tIndex < 28) {
                a: {
                    $strIndex = $lIndex + 1 | 0;
                    $decompSyllable[2] = $curSymb;
                    if ($this.$decomposedCharLength == 3) {
                        $lIndex = $decompSyllable[0];
                        var$15 = $this.$decomposedChar.data;
                        if ($lIndex == var$15[0] && $decompSyllable[1] == var$15[1] && $decompSyllable[2] == var$15[2]) {
                            $strIndex = $this.$next3.$matches($strIndex, $testString, $matchResult);
                            break a;
                        }
                    }
                    $strIndex = (-1);
                }
                return $strIndex;
            }
            b: {
                if ($this.$decomposedCharLength == 2) {
                    $syllIndex = $decompSyllable[0];
                    var$15 = $this.$decomposedChar.data;
                    if ($syllIndex == var$15[0] && $decompSyllable[1] == var$15[1]) {
                        $strIndex = $this.$next3.$matches($lIndex, $testString, $matchResult);
                        break b;
                    }
                }
                $strIndex = (-1);
            }
            return $strIndex;
        }
        return (-1);
    }
    return (-1);
},
jur_HangulDecomposedCharSet_first = ($this, $set) => {
    return $set instanceof jur_HangulDecomposedCharSet && !jl_String_equals(jur_HangulDecomposedCharSet_getDecomposedChar($set), jur_HangulDecomposedCharSet_getDecomposedChar($this)) ? 0 : 1;
},
jur_HangulDecomposedCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_CharSet() {
    jur_LeafSet.call(this);
    this.$ch0 = 0;
}
let jur_CharSet__init_0 = ($this, $ch) => {
    jur_LeafSet__init_($this);
    $this.$ch0 = $ch;
},
jur_CharSet__init_ = var_0 => {
    let var_1 = new jur_CharSet();
    jur_CharSet__init_0(var_1, var_0);
    return var_1;
},
jur_CharSet_charCount = $this => {
    return 1;
},
jur_CharSet_accepts = ($this, $strIndex, $testString) => {
    return $this.$ch0 != jl_String_charAt($testString, $strIndex) ? (-1) : 1;
},
jur_CharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $strLength, var$6, var$7;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
    $testStr = $testString;
    $strLength = $matchResult.$rightBound;
    while (true) {
        if ($strIndex >= $strLength)
            return (-1);
        var$6 = jl_String_indexOf($testStr, $this.$ch0, $strIndex);
        if (var$6 < 0)
            return (-1);
        var$7 = $this.$next3;
        $strIndex = var$6 + 1 | 0;
        if (var$7.$matches($strIndex, $testString, $matchResult) >= 0)
            break;
    }
    return var$6;
},
jur_CharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $testStr, var$6;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
    $testStr = $testString;
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            var$6 = jl_String_lastIndexOf($testStr, $this.$ch0, $lastIndex);
            if (var$6 < 0)
                break a;
            if (var$6 < $strIndex)
                break a;
            if ($this.$next3.$matches(var$6 + 1 | 0, $testString, $matchResult) >= 0)
                break;
            $lastIndex = var$6 + (-1) | 0;
        }
        return var$6;
    }
    return (-1);
},
jur_CharSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$ch0;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_AbstractStringBuilder_append(var$2, var$1);
    return jl_AbstractStringBuilder_toString(var$2);
},
jur_CharSet_first = ($this, $set) => {
    if ($set instanceof jur_CharSet)
        return $set.$ch0 != $this.$ch0 ? 0 : 1;
    if (!($set instanceof jur_RangeSet)) {
        if ($set instanceof jur_SupplRangeSet)
            return $set.$contains($this.$ch0);
        if (!($set instanceof jur_SupplCharSet))
            return 1;
        return 0;
    }
    return jur_RangeSet_accepts($set, 0, jl_Character_toString($this.$ch0)) <= 0 ? 0 : 1;
};
function jur_UCICharSet() {
    jur_LeafSet.call(this);
    this.$ch2 = 0;
}
let jur_UCICharSet__init_0 = ($this, $ch) => {
    jur_LeafSet__init_($this);
    $this.$ch2 = jl_Character_toLowerCase(jl_Character_toUpperCase($ch));
},
jur_UCICharSet__init_ = var_0 => {
    let var_1 = new jur_UCICharSet();
    jur_UCICharSet__init_0(var_1, var_0);
    return var_1;
},
jur_UCICharSet_accepts = ($this, $strIndex, $testString) => {
    return $this.$ch2 != jl_Character_toLowerCase(jl_Character_toUpperCase(jl_String_charAt($testString, $strIndex))) ? (-1) : 1;
},
jur_UCICharSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$ch2;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_AbstractStringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(254)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
};
function jur_CICharSet() {
    let a = this; jur_LeafSet.call(a);
    a.$ch3 = 0;
    a.$supplement = 0;
}
let jur_CICharSet__init_0 = ($this, $ch) => {
    jur_LeafSet__init_($this);
    $this.$ch3 = $ch;
    $this.$supplement = jur_Pattern_getSupplement($ch);
},
jur_CICharSet__init_ = var_0 => {
    let var_1 = new jur_CICharSet();
    jur_CICharSet__init_0(var_1, var_0);
    return var_1;
},
jur_CICharSet_accepts = ($this, $strIndex, $testString) => {
    let var$3;
    var$3 = $this.$ch3;
    $testString = $testString;
    return var$3 != jl_String_charAt($testString, $strIndex) && $this.$supplement != jl_String_charAt($testString, $strIndex) ? (-1) : 1;
},
jur_CICharSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$ch3;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_AbstractStringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(255)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
};
function jur_DecomposedCharSet() {
    let a = this; jur_JointSet.call(a);
    a.$readCharsForCodePoint = 0;
    a.$decomposedCharUTF160 = null;
    a.$decomposedChar0 = null;
    a.$decomposedCharLength0 = 0;
}
let jur_DecomposedCharSet__init_ = ($this, $decomposedChar, $decomposedCharLength) => {
    jur_AbstractSet__init_($this);
    $this.$readCharsForCodePoint = 1;
    $this.$decomposedChar0 = $decomposedChar;
    $this.$decomposedCharLength0 = $decomposedCharLength;
},
jur_DecomposedCharSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_DecomposedCharSet();
    jur_DecomposedCharSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_DecomposedCharSet_setNext = ($this, $next) => {
    $this.$next3 = $next;
},
jur_DecomposedCharSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $decCodePoint, $rightBound, $curChar, var$7, $decCurCodePoint, var$9, var$10, $readCodePoints;
    $decCodePoint = $rt_createIntArray(4);
    $rightBound = $matchResult.$rightBound;
    if ($strIndex >= $rightBound)
        return (-1);
    $curChar = jur_DecomposedCharSet_codePointAt($this, $strIndex, $testString, $rightBound);
    var$7 = $strIndex + $this.$readCharsForCodePoint | 0;
    $decCurCodePoint = jur_Lexer_getDecomposition($curChar);
    if ($decCurCodePoint === null) {
        $decCurCodePoint = $decCodePoint.data;
        $strIndex = 1;
        $decCurCodePoint[0] = $curChar;
    } else {
        $strIndex = $decCurCodePoint.data.length;
        jl_System_fastArraycopy($decCurCodePoint, 0, $decCodePoint, 0, $strIndex);
        $strIndex = 0 + $strIndex | 0;
    }
    a: {
        if (var$7 < $rightBound) {
            var$9 = $decCodePoint.data;
            $curChar = jur_DecomposedCharSet_codePointAt($this, var$7, $testString, $rightBound);
            while ($strIndex < 4) {
                if (!(($curChar != 832 ? 0 : 1) | ($curChar != 833 ? 0 : 1) | ($curChar != 835 ? 0 : 1) | ($curChar != 836 ? 0 : 1))) {
                    var$10 = $strIndex + 1 | 0;
                    var$9[$strIndex] = $curChar;
                } else {
                    $decCurCodePoint = (jur_Lexer_getDecomposition($curChar)).data;
                    if ($decCurCodePoint.length != 2) {
                        var$10 = $strIndex + 1 | 0;
                        var$9[$strIndex] = $decCurCodePoint[0];
                    } else {
                        $readCodePoints = $strIndex + 1 | 0;
                        var$9[$strIndex] = $decCurCodePoint[0];
                        var$10 = $readCodePoints + 1 | 0;
                        var$9[$readCodePoints] = $decCurCodePoint[1];
                    }
                }
                var$7 = var$7 + $this.$readCharsForCodePoint | 0;
                if (var$7 >= $rightBound) {
                    $strIndex = var$10;
                    break a;
                }
                $curChar = jur_DecomposedCharSet_codePointAt($this, var$7, $testString, $rightBound);
                $strIndex = var$10;
            }
        }
    }
    if ($strIndex != $this.$decomposedCharLength0)
        return (-1);
    $decCurCodePoint = $decCodePoint.data;
    $curChar = 0;
    while (true) {
        if ($curChar >= $strIndex)
            return $this.$next3.$matches(var$7, $testString, $matchResult);
        if ($decCurCodePoint[$curChar] != $this.$decomposedChar0.data[$curChar])
            break;
        $curChar = $curChar + 1 | 0;
    }
    return (-1);
},
jur_DecomposedCharSet_getDecomposedChar = $this => {
    let $strBuff, $i;
    if ($this.$decomposedCharUTF160 === null) {
        $strBuff = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($strBuff);
        $i = 0;
        while ($i < $this.$decomposedCharLength0) {
            jl_AbstractStringBuilder_append1($strBuff, jl_Character_toChars($this.$decomposedChar0.data[$i]));
            $i = $i + 1 | 0;
        }
        $this.$decomposedCharUTF160 = jl_AbstractStringBuilder_toString($strBuff);
    }
    return $this.$decomposedCharUTF160;
},
jur_DecomposedCharSet_getName = $this => {
    let var$1, var$2;
    var$1 = jur_DecomposedCharSet_getDecomposedChar($this);
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(256)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
},
jur_DecomposedCharSet_codePointAt = ($this, $strIndex, $testString, $rightBound) => {
    let $curChar, $low, $curCodePointUTF16;
    $this.$readCharsForCodePoint = 1;
    if ($strIndex >= ($rightBound - 1 | 0))
        $curChar = jl_String_charAt($testString, $strIndex);
    else {
        $rightBound = $strIndex + 1 | 0;
        $testString = $testString;
        $curChar = jl_String_charAt($testString, $strIndex);
        $low = jl_String_charAt($testString, $rightBound);
        if (jl_Character_isSurrogatePair($curChar, $low)) {
            $curCodePointUTF16 = $rt_createCharArray(2).data;
            $curCodePointUTF16[0] = $curChar;
            $curCodePointUTF16[1] = $low;
            $rightBound = $curCodePointUTF16.length;
            if (0 < $rightBound && $rightBound <= $rightBound) {
                $curChar = 0 < ($rightBound - 1 | 0) && jl_Character_isHighSurrogate($curCodePointUTF16[0]) && jl_Character_isLowSurrogate($curCodePointUTF16[1]) ? jl_Character_toCodePoint($curCodePointUTF16[0], $curCodePointUTF16[1]) : $curCodePointUTF16[0];
                $this.$readCharsForCodePoint = 2;
            } else {
                $testString = new jl_IndexOutOfBoundsException;
                jl_Exception__init_($testString);
                $rt_throw($testString);
            }
        }
    }
    return $curChar;
},
jur_DecomposedCharSet_first = ($this, $set) => {
    return $set instanceof jur_DecomposedCharSet && !jl_String_equals(jur_DecomposedCharSet_getDecomposedChar($set), jur_DecomposedCharSet_getDecomposedChar($this)) ? 0 : 1;
},
jur_DecomposedCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
},
jur_UCIDecomposedCharSet = $rt_classWithoutFields(jur_DecomposedCharSet),
jur_CIDecomposedCharSet = $rt_classWithoutFields(jur_DecomposedCharSet),
jur_PossessiveGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_PossessiveGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $stringIndex_0;
    while (true) {
        $stringIndex_0 = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
        if ($stringIndex_0 <= 0)
            break;
        $stringIndex = $stringIndex_0;
    }
    return $this.$next3.$matches($stringIndex, $testString, $matchResult);
},
jur_PosPlusGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_PosPlusGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex < 0)
        return (-1);
    if ($nextIndex > $stringIndex) {
        while (true) {
            $stringIndex = $this.$innerSet.$matches($nextIndex, $testString, $matchResult);
            if ($stringIndex <= $nextIndex)
                break;
            $nextIndex = $stringIndex;
        }
        $stringIndex = $nextIndex;
    }
    return $this.$next3.$matches($stringIndex, $testString, $matchResult);
},
jur_AltGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_AltGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next3.$matches($stringIndex, $testString, $matchResult);
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex >= 0)
        return $nextIndex;
    return $this.$next3.$matches($stringIndex, $testString, $matchResult);
},
jur_AltGroupQuantifierSet_setNext = ($this, $next) => {
    $this.$next3 = $next;
    $this.$innerSet.$setNext($next);
},
jur_PosAltGroupQuantifierSet = $rt_classWithoutFields(jur_AltGroupQuantifierSet),
jur_PosAltGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex <= 0)
        $nextIndex = $stringIndex;
    return $this.$next3.$matches($nextIndex, $testString, $matchResult);
},
jur_PosAltGroupQuantifierSet_setNext = ($this, $next) => {
    $this.$next3 = $next;
};
function jur_CompositeGroupQuantifierSet() {
    let a = this; jur_GroupQuantifierSet.call(a);
    a.$quantifier = null;
    a.$setCounter = 0;
}
let jur_CompositeGroupQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type, $setCounter) => {
    jur_QuantifierSet__init_($this, $innerSet, $next, $type);
    $this.$quantifier = $quant;
    $this.$setCounter = $setCounter;
},
jur_CompositeGroupQuantifierSet__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new jur_CompositeGroupQuantifierSet();
    jur_CompositeGroupQuantifierSet__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
jur_CompositeGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $enterCounter, $nextIndex;
    $enterCounter = jur_MatchResultImpl_getEnterCounter($matchResult, $this.$setCounter);
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next3.$matches($stringIndex, $testString, $matchResult);
    if ($enterCounter >= $this.$quantifier.$max0)
        return $this.$next3.$matches($stringIndex, $testString, $matchResult);
    $nextIndex = $this.$setCounter;
    $enterCounter = $enterCounter + 1 | 0;
    jur_MatchResultImpl_setEnterCounter($matchResult, $nextIndex, $enterCounter);
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex >= 0) {
        jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, 0);
        return $nextIndex;
    }
    $nextIndex = $this.$setCounter;
    $enterCounter = $enterCounter + (-1) | 0;
    jur_MatchResultImpl_setEnterCounter($matchResult, $nextIndex, $enterCounter);
    if ($enterCounter >= $this.$quantifier.$min0)
        return $this.$next3.$matches($stringIndex, $testString, $matchResult);
    jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, 0);
    return (-1);
},
jur_CompositeGroupQuantifierSet_getName = $this => {
    return jur_Quantifier_toString($this.$quantifier);
},
jur_PosCompositeGroupQuantifierSet = $rt_classWithoutFields(jur_CompositeGroupQuantifierSet),
jur_PosCompositeGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $counter, $max, $nextIndex;
    $counter = 0;
    $max = $this.$quantifier.$max0;
    a: {
        while (true) {
            $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
            if ($nextIndex <= $stringIndex)
                break a;
            if ($counter >= $max)
                break;
            $counter = $counter + 1 | 0;
            $stringIndex = $nextIndex;
        }
    }
    if ($nextIndex < 0 && $counter < $this.$quantifier.$min0)
        return (-1);
    return $this.$next3.$matches($stringIndex, $testString, $matchResult);
},
jur_ReluctantGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_ReluctantGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $res;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next3.$matches($stringIndex, $testString, $matchResult);
    $res = $this.$next3.$matches($stringIndex, $testString, $matchResult);
    if ($res >= 0)
        return $res;
    return $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
},
jur_RelAltGroupQuantifierSet = $rt_classWithoutFields(jur_AltGroupQuantifierSet),
jur_RelAltGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next3.$matches($stringIndex, $testString, $matchResult);
    $nextIndex = $this.$next3.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex < 0)
        $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    return $nextIndex;
},
jur_RelCompositeGroupQuantifierSet = $rt_classWithoutFields(jur_CompositeGroupQuantifierSet),
jur_RelCompositeGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $enterCounter, var$5, $nextIndex;
    $enterCounter = jur_MatchResultImpl_getEnterCounter($matchResult, $this.$setCounter);
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next3.$matches($stringIndex, $testString, $matchResult);
    var$5 = $this.$quantifier;
    if ($enterCounter >= var$5.$max0) {
        jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, 0);
        return $this.$next3.$matches($stringIndex, $testString, $matchResult);
    }
    if ($enterCounter < var$5.$min0) {
        jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, $enterCounter + 1 | 0);
        $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    } else {
        $nextIndex = $this.$next3.$matches($stringIndex, $testString, $matchResult);
        if ($nextIndex >= 0) {
            jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, 0);
            return $nextIndex;
        }
        jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, $enterCounter + 1 | 0);
        $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    }
    return $nextIndex;
},
jur_DotAllQuantifierSet = $rt_classWithoutFields(jur_QuantifierSet),
jur_DotAllQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength;
    $strLength = $matchResult.$rightBound;
    if ($strLength > $stringIndex)
        return $this.$next3.$findBack($stringIndex, $strLength, $testString, $matchResult);
    return $this.$next3.$matches($stringIndex, $testString, $matchResult);
},
jur_DotAllQuantifierSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength;
    $strLength = $matchResult.$rightBound;
    if ($this.$next3.$findBack($stringIndex, $strLength, $testString, $matchResult) >= 0)
        return $stringIndex;
    return (-1);
},
jur_DotAllQuantifierSet_getName = $this => {
    return $rt_s(257);
};
function jur_DotQuantifierSet() {
    jur_QuantifierSet.call(this);
    this.$lt = null;
}
let jur_DotQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $startSearch;
    $strLength = $matchResult.$rightBound;
    $startSearch = jur_DotQuantifierSet_findLineTerminator($this, $stringIndex, $strLength, $testString);
    if ($startSearch >= 0)
        $strLength = $startSearch;
    if ($strLength > $stringIndex)
        return $this.$next3.$findBack($stringIndex, $strLength, $testString, $matchResult);
    return $this.$next3.$matches($stringIndex, $testString, $matchResult);
},
jur_DotQuantifierSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $res, $nextSearch, $leftBound;
    $strLength = $matchResult.$rightBound;
    $res = $this.$next3.$find0($stringIndex, $testString, $matchResult);
    if ($res < 0)
        return (-1);
    $nextSearch = jur_DotQuantifierSet_findLineTerminator($this, $res, $strLength, $testString);
    if ($nextSearch >= 0)
        $strLength = $nextSearch;
    $nextSearch = jl_Math_max($res, $this.$next3.$findBack($res, $strLength, $testString, $matchResult));
    if ($nextSearch <= 0)
        $leftBound = $nextSearch ? (-1) : 0;
    else {
        $leftBound = $nextSearch - 1 | 0;
        a: {
            while (true) {
                if ($leftBound < $stringIndex) {
                    $leftBound = (-1);
                    break a;
                }
                if ($this.$lt.$isLineTerminator(jl_String_charAt($testString, $leftBound)))
                    break;
                $leftBound = $leftBound + (-1) | 0;
            }
        }
    }
    if ($leftBound >= $stringIndex)
        $stringIndex = $leftBound >= $nextSearch ? $leftBound : $leftBound + 1 | 0;
    return $stringIndex;
},
jur_DotQuantifierSet_findLineTerminator = ($this, $i, $to, $testString) => {
    while (true) {
        if ($i >= $to)
            return (-1);
        if ($this.$lt.$isLineTerminator(jl_String_charAt($testString, $i)))
            break;
        $i = $i + 1 | 0;
    }
    return $i;
},
jur_DotQuantifierSet_getName = $this => {
    return $rt_s(258);
},
jur_AbstractLineTerminator = $rt_classWithoutFields(),
jur_AbstractLineTerminator_unixLT = null,
jur_AbstractLineTerminator_unicodeLT = null,
jur_AbstractLineTerminator_getInstance = $flag => {
    let var$2;
    if (!($flag & 1)) {
        var$2 = jur_AbstractLineTerminator_unicodeLT;
        if (var$2 !== null)
            return var$2;
        var$2 = new jur_AbstractLineTerminator$2;
        jur_AbstractLineTerminator_unicodeLT = var$2;
        return var$2;
    }
    var$2 = jur_AbstractLineTerminator_unixLT;
    if (var$2 !== null)
        return var$2;
    var$2 = new jur_AbstractLineTerminator$1;
    jur_AbstractLineTerminator_unixLT = var$2;
    return var$2;
},
jur_PossessiveQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_PossessiveQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4;
    a: {
        while (true) {
            if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound)
                break a;
            var$4 = $this.$leaf.$accepts($stringIndex, $testString);
            if (var$4 < 1)
                break;
            $stringIndex = $stringIndex + var$4 | 0;
        }
    }
    return $this.$next3.$matches($stringIndex, $testString, $matchResult);
},
jur_PossessiveAltQuantifierSet = $rt_classWithoutFields(jur_AltQuantifierSet),
jur_PossessiveAltQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4;
    if (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$rightBound) {
        var$4 = $this.$leaf.$accepts($stringIndex, $testString);
        if (var$4 >= 1)
            $stringIndex = $stringIndex + var$4 | 0;
    }
    return $this.$next3.$matches($stringIndex, $testString, $matchResult);
},
jur_PossessiveCompositeQuantifierSet = $rt_classWithoutFields(jur_CompositeQuantifierSet),
jur_PossessiveCompositeQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4, $min, $max, $i, $shift;
    var$4 = $this.$quantifier0;
    $min = var$4.$min0;
    $max = var$4.$max0;
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                while (true) {
                    if ($i >= $max)
                        break a;
                    if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound)
                        break a;
                    $shift = $this.$leaf.$accepts($stringIndex, $testString);
                    if ($shift < 1)
                        break;
                    $stringIndex = $stringIndex + $shift | 0;
                    $i = $i + 1 | 0;
                }
            }
            return $this.$next3.$matches($stringIndex, $testString, $matchResult);
        }
        if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        $shift = $this.$leaf.$accepts($stringIndex, $testString);
        if ($shift < 1)
            break;
        $stringIndex = $stringIndex + $shift | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_ReluctantQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_ReluctantQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4;
    while (true) {
        var$4 = $this.$next3.$matches($stringIndex, $testString, $matchResult);
        if (var$4 >= 0)
            break;
        if (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$rightBound) {
            var$4 = $this.$leaf.$accepts($stringIndex, $testString);
            $stringIndex = $stringIndex + var$4 | 0;
        }
        if (var$4 < 1)
            return (-1);
    }
    return var$4;
},
jur_ReluctantAltQuantifierSet = $rt_classWithoutFields(jur_AltQuantifierSet),
jur_ReluctantAltQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift;
    $shift = $this.$next3.$matches($stringIndex, $testString, $matchResult);
    if ($shift >= 0)
        return $shift;
    return $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
},
jur_ReluctantCompositeQuantifierSet = $rt_classWithoutFields(jur_CompositeQuantifierSet),
jur_ReluctantCompositeQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4, $min, $max, $i, var$8, var$9;
    var$4 = $this.$quantifier0;
    $min = var$4.$min0;
    $max = var$4.$max0;
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                while (true) {
                    var$8 = $this.$next3.$matches($stringIndex, $testString, $matchResult);
                    if (var$8 >= 0)
                        break;
                    if (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$rightBound) {
                        var$8 = $this.$leaf.$accepts($stringIndex, $testString);
                        $stringIndex = $stringIndex + var$8 | 0;
                        $i = $i + 1 | 0;
                    }
                    if (var$8 < 1)
                        break a;
                    if ($i > $max)
                        break a;
                }
                return var$8;
            }
            return (-1);
        }
        if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        var$9 = $this.$leaf.$accepts($stringIndex, $testString);
        if (var$9 < 1)
            break;
        $stringIndex = $stringIndex + var$9 | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_SOLSet = $rt_classWithoutFields(jur_AbstractSet),
jur_SOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    if ($strIndex && !($matchResult.$anchoringBounds && $strIndex == $matchResult.$leftBound))
        return (-1);
    return $this.$next3.$matches($strIndex, $testString, $matchResult);
},
jur_SOLSet_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_SOLSet_getName = $this => {
    return $rt_s(259);
};
function jur_WordBoundary() {
    jur_AbstractSet.call(this);
    this.$positive = 0;
}
let jur_WordBoundary__init_0 = ($this, $positive) => {
    jur_AbstractSet__init_($this);
    $this.$positive = $positive;
},
jur_WordBoundary__init_ = var_0 => {
    let var_1 = new jur_WordBoundary();
    jur_WordBoundary__init_0(var_1, var_0);
    return var_1;
},
jur_WordBoundary_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $ch1, $ch2, $left, $leftBound;
    $ch1 = $stringIndex >= $matchResult.$rightBound ? 32 : jl_String_charAt($testString, $stringIndex);
    if (!$stringIndex)
        $ch2 = 32;
    else {
        $left = $stringIndex - 1 | 0;
        $ch2 = jl_String_charAt($testString, $left);
    }
    $leftBound = $matchResult.$transparentBounds ? 0 : $matchResult.$leftBound;
    return ($ch1 != 32 && !jur_WordBoundary_isSpace($this, $ch1, $stringIndex, $leftBound, $testString) ? 0 : 1) ^ ($ch2 != 32 && !jur_WordBoundary_isSpace($this, $ch2, $stringIndex - 1 | 0, $leftBound, $testString) ? 0 : 1) ^ $this.$positive ? (-1) : $this.$next3.$matches($stringIndex, $testString, $matchResult);
},
jur_WordBoundary_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_WordBoundary_getName = $this => {
    return $rt_s(260);
},
jur_WordBoundary_isSpace = ($this, $ch, $index, $leftBound, $testString) => {
    let var$5;
    if (!jl_Character_isLetterOrDigit0($ch) && $ch != 95) {
        a: {
            if (jl_Character_getType0($ch) == 6)
                while (true) {
                    $index = $index + (-1) | 0;
                    if ($index < $leftBound)
                        break a;
                    var$5 = jl_String_charAt($testString, $index);
                    if (jl_Character_isLetterOrDigit0(var$5))
                        return 0;
                    if (jl_Character_getType0(var$5) != 6)
                        return 1;
                }
        }
        return 1;
    }
    return 0;
},
jur_PreviousMatch = $rt_classWithoutFields(jur_AbstractSet),
jur_PreviousMatch_matches = ($this, $stringIndex, $testString, $matchResult) => {
    if ($stringIndex != $matchResult.$previousMatch)
        return (-1);
    return $this.$next3.$matches($stringIndex, $testString, $matchResult);
},
jur_PreviousMatch_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_PreviousMatch_getName = $this => {
    return $rt_s(261);
};
function jur_EOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter0 = 0;
}
let jur_EOLSet__init_ = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter0 = $counter;
},
jur_EOLSet__init_0 = var_0 => {
    let var_1 = new jur_EOLSet();
    jur_EOLSet__init_(var_1, var_0);
    return var_1;
},
jur_EOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $rightBound, var$5, var$6, $ch;
    $rightBound = $matchResult.$anchoringBounds ? $matchResult.$rightBound : $testString.$nativeString.length;
    if ($strIndex >= $rightBound) {
        jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter0, 0);
        return $this.$next3.$matches($strIndex, $testString, $matchResult);
    }
    var$5 = $rightBound - $strIndex | 0;
    if (var$5 == 2) {
        var$6 = $testString;
        if (jl_String_charAt(var$6, $strIndex) == 13 && jl_String_charAt(var$6, $strIndex + 1 | 0) == 10) {
            jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter0, 0);
            return $this.$next3.$matches($strIndex, $testString, $matchResult);
        }
    }
    a: {
        if (var$5 == 1) {
            $ch = jl_String_charAt($testString, $strIndex);
            if ($ch == 10)
                break a;
            if ($ch == 13)
                break a;
            if ($ch == 133)
                break a;
            if (($ch | 1) == 8233)
                break a;
        }
        return (-1);
    }
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter0, 0);
    return $this.$next3.$matches($strIndex, $testString, $matchResult);
},
jur_EOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !jur_MatchResultImpl_getConsumed($matchResult, $this.$consCounter0) ? 0 : 1;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter0, (-1));
    return $res;
},
jur_EOLSet_getName = $this => {
    return $rt_s(262);
},
jur_EOISet = $rt_classWithoutFields(jur_AbstractSet),
jur_EOISet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    if ($stringIndex < (!$matchResult.$transparentBounds ? $matchResult.$rightBound : $testString.$nativeString.length))
        return (-1);
    $matchResult.$hitEnd = 1;
    $matchResult.$requireEnd = 1;
    return $this.$next3.$matches($stringIndex, $testString, $matchResult);
},
jur_EOISet_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_EOISet_getName = $this => {
    return $rt_s(263);
};
function jur_MultiLineSOLSet() {
    jur_AbstractSet.call(this);
    this.$lt1 = null;
}
let jur_MultiLineSOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let var$4, var$5, var$6;
    a: {
        if ($strIndex != $matchResult.$rightBound) {
            if (!$strIndex)
                break a;
            if ($matchResult.$anchoringBounds && $strIndex == $matchResult.$leftBound)
                break a;
            var$4 = $this.$lt1;
            var$5 = $strIndex - 1 | 0;
            var$6 = $testString;
            if (var$4.$isAfterLineTerminator(jl_String_charAt(var$6, var$5), jl_String_charAt(var$6, $strIndex)))
                break a;
        }
        return (-1);
    }
    return $this.$next3.$matches($strIndex, $testString, $matchResult);
},
jur_MultiLineSOLSet_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_MultiLineSOLSet_getName = $this => {
    return $rt_s(264);
},
jur_DotAllSet = $rt_classWithoutFields(jur_JointSet),
jur_DotAllSet__init_ = $this => {
    jur_AbstractSet__init_($this);
},
jur_DotAllSet__init_0 = () => {
    let var_0 = new jur_DotAllSet();
    jur_DotAllSet__init_(var_0);
    return var_0;
},
jur_DotAllSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, var$5, var$6, $high;
    $strLength = $matchResult.$rightBound;
    var$5 = $stringIndex + 1 | 0;
    if (var$5 > $strLength) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    var$6 = $testString;
    $high = jl_String_charAt(var$6, $stringIndex);
    if (jl_Character_isHighSurrogate($high)) {
        $stringIndex = $stringIndex + 2 | 0;
        if ($stringIndex <= $strLength && jl_Character_isSurrogatePair($high, jl_String_charAt(var$6, var$5)))
            return $this.$next3.$matches($stringIndex, $testString, $matchResult);
    }
    return $this.$next3.$matches(var$5, $testString, $matchResult);
},
jur_DotAllSet_getName = $this => {
    return $rt_s(265);
},
jur_DotAllSet_setNext = ($this, $next) => {
    $this.$next3 = $next;
},
jur_DotAllSet_getType = $this => {
    return (-2147483602);
},
jur_DotAllSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_DotSet() {
    jur_JointSet.call(this);
    this.$lt0 = null;
}
let jur_DotSet__init_ = ($this, $lt) => {
    jur_AbstractSet__init_($this);
    $this.$lt0 = $lt;
},
jur_DotSet__init_0 = var_0 => {
    let var_1 = new jur_DotSet();
    jur_DotSet__init_(var_1, var_0);
    return var_1;
},
jur_DotSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, var$5, var$6, $high, $low;
    $strLength = $matchResult.$rightBound;
    var$5 = $stringIndex + 1 | 0;
    if (var$5 > $strLength) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    var$6 = $testString;
    $high = jl_String_charAt(var$6, $stringIndex);
    if (jl_Character_isHighSurrogate($high)) {
        $stringIndex = $stringIndex + 2 | 0;
        if ($stringIndex <= $strLength) {
            $low = jl_String_charAt(var$6, var$5);
            if (jl_Character_isSurrogatePair($high, $low))
                return $this.$lt0.$isLineTerminator(jl_Character_toCodePoint($high, $low)) ? (-1) : $this.$next3.$matches($stringIndex, $testString, $matchResult);
        }
    }
    return $this.$lt0.$isLineTerminator($high) ? (-1) : $this.$next3.$matches(var$5, $testString, $matchResult);
},
jur_DotSet_getName = $this => {
    return $rt_s(266);
},
jur_DotSet_setNext = ($this, $next) => {
    $this.$next3 = $next;
},
jur_DotSet_getType = $this => {
    return (-2147483602);
},
jur_DotSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_UEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter3 = 0;
}
let jur_UEOLSet__init_0 = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter3 = $counter;
},
jur_UEOLSet__init_ = var_0 => {
    let var_1 = new jur_UEOLSet();
    jur_UEOLSet__init_0(var_1, var_0);
    return var_1;
},
jur_UEOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $rightBound;
    $rightBound = $matchResult.$anchoringBounds ? $matchResult.$rightBound : $testString.$nativeString.length;
    if ($strIndex >= $rightBound) {
        jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter3, 0);
        return $this.$next3.$matches($strIndex, $testString, $matchResult);
    }
    if (($rightBound - $strIndex | 0) == 1 && jl_String_charAt($testString, $strIndex) == 10) {
        jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter3, 1);
        return $this.$next3.$matches($strIndex + 1 | 0, $testString, $matchResult);
    }
    return (-1);
},
jur_UEOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !jur_MatchResultImpl_getConsumed($matchResult, $this.$consCounter3) ? 0 : 1;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter3, (-1));
    return $res;
},
jur_UEOLSet_getName = $this => {
    return $rt_s(262);
};
function jur_UMultiLineEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter2 = 0;
}
let jur_UMultiLineEOLSet__init_ = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter2 = $counter;
},
jur_UMultiLineEOLSet__init_0 = var_0 => {
    let var_1 = new jur_UMultiLineEOLSet();
    jur_UMultiLineEOLSet__init_(var_1, var_0);
    return var_1;
},
jur_UMultiLineEOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    if (($matchResult.$anchoringBounds ? $matchResult.$rightBound - $strIndex | 0 : $testString.$nativeString.length - $strIndex | 0) <= 0) {
        jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter2, 0);
        return $this.$next3.$matches($strIndex, $testString, $matchResult);
    }
    if (jl_String_charAt($testString, $strIndex) != 10)
        return (-1);
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter2, 1);
    return $this.$next3.$matches($strIndex + 1 | 0, $testString, $matchResult);
},
jur_UMultiLineEOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !jur_MatchResultImpl_getConsumed($matchResult, $this.$consCounter2) ? 0 : 1;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter2, (-1));
    return $res;
},
jur_UMultiLineEOLSet_getName = $this => {
    return $rt_s(267);
};
function jur_MultiLineEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter = 0;
}
let jur_MultiLineEOLSet__init_0 = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter = $counter;
},
jur_MultiLineEOLSet__init_ = var_0 => {
    let var_1 = new jur_MultiLineEOLSet();
    jur_MultiLineEOLSet__init_0(var_1, var_0);
    return var_1;
},
jur_MultiLineEOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $strDif, $ch1, $ch2, var$7;
    $strDif = $matchResult.$anchoringBounds ? $matchResult.$rightBound - $strIndex | 0 : $testString.$nativeString.length - $strIndex | 0;
    if (!$strDif) {
        jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter, 0);
        return $this.$next3.$matches($strIndex, $testString, $matchResult);
    }
    if ($strDif < 2) {
        $ch1 = jl_String_charAt($testString, $strIndex);
        $ch2 = 97;
    } else {
        var$7 = $testString;
        $ch1 = jl_String_charAt(var$7, $strIndex);
        $ch2 = jl_String_charAt(var$7, $strIndex + 1 | 0);
    }
    switch ($ch1) {
        case 10:
        case 133:
        case 8232:
        case 8233:
            jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter, 0);
            return $this.$next3.$matches($strIndex, $testString, $matchResult);
        case 13:
            if ($ch2 != 10) {
                jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter, 0);
                return $this.$next3.$matches($strIndex, $testString, $matchResult);
            }
            jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter, 0);
            return $this.$next3.$matches($strIndex, $testString, $matchResult);
        default:
    }
    return (-1);
},
jur_MultiLineEOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !jur_MatchResultImpl_getConsumed($matchResult, $this.$consCounter) ? 0 : 1;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter, (-1));
    return $res;
},
jur_MultiLineEOLSet_getName = $this => {
    return $rt_s(268);
};
function jur_CIBackReferenceSet() {
    let a = this; jur_JointSet.call(a);
    a.$referencedGroup = 0;
    a.$consCounter1 = 0;
}
let jur_CIBackReferenceSet__init_ = ($this, $groupIndex, $consCounter) => {
    jur_AbstractSet__init_($this);
    $this.$referencedGroup = $groupIndex;
    $this.$consCounter1 = $consCounter;
},
jur_CIBackReferenceSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CIBackReferenceSet();
    jur_CIBackReferenceSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_CIBackReferenceSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $group, $i, var$6, var$7, var$8;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    if ($group !== null && ($stringIndex + $group.$nativeString.length | 0) <= $matchResult.$rightBound) {
        $i = 0;
        while (true) {
            if ($i >= $group.$nativeString.length) {
                jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter1, $group.$nativeString.length);
                return $this.$next3.$matches($stringIndex + $group.$nativeString.length | 0, $testString, $matchResult);
            }
            var$6 = jl_String_charAt($group, $i);
            var$7 = $stringIndex + $i | 0;
            var$8 = $testString;
            if (var$6 != jl_String_charAt(var$8, var$7) && jur_Pattern_getSupplement(jl_String_charAt($group, $i)) != jl_String_charAt(var$8, var$7))
                break;
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    return (-1);
},
jur_CIBackReferenceSet_setNext = ($this, $next) => {
    $this.$next3 = $next;
},
jur_CIBackReferenceSet_getString = ($this, $matchResult) => {
    let var$2, var$3;
    var$2 = $this.$referencedGroup;
    var$3 = jur_MatchResultImpl_getStart($matchResult, var$2);
    var$2 = jur_MatchResultImpl_getEnd($matchResult, var$2);
    return (var$2 | var$3 | (var$2 - var$3 | 0)) >= 0 && var$2 <= $matchResult.$string4.$nativeString.length ? jl_String_substring($matchResult.$string4, var$3, var$2) : null;
},
jur_CIBackReferenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$groupIndex;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append0(jl_StringBuilder_append(var$2, $rt_s(269)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
},
jur_CIBackReferenceSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !jur_MatchResultImpl_getConsumed($matchResult, $this.$consCounter1) ? 0 : 1;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter1, (-1));
    return $res;
},
jur_BackReferenceSet = $rt_classWithoutFields(jur_CIBackReferenceSet),
jur_BackReferenceSet__init_0 = ($this, $groupIndex, $consCounter) => {
    jur_CIBackReferenceSet__init_($this, $groupIndex, $consCounter);
},
jur_BackReferenceSet__init_ = (var_0, var_1) => {
    let var_2 = new jur_BackReferenceSet();
    jur_BackReferenceSet__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_BackReferenceSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $group, $shift;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    if ($group !== null && ($stringIndex + $group.$nativeString.length | 0) <= $matchResult.$rightBound) {
        $shift = !jl_String_startsWith0($testString, $group, $stringIndex) ? (-1) : $group.$nativeString.length;
        if ($shift < 0)
            return (-1);
        jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter1, $shift);
        return $this.$next3.$matches($stringIndex + $shift | 0, $testString, $matchResult);
    }
    return (-1);
},
jur_BackReferenceSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $group, $strLength, $testStr;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    $strLength = $matchResult.$leftBound;
    if ($group !== null && ($strIndex + $group.$nativeString.length | 0) <= $strLength) {
        $testStr = $testString;
        while (true) {
            if ($strIndex > $strLength)
                return (-1);
            $strIndex = jl_String_indexOf0($testStr, $group, $strIndex);
            if ($strIndex < 0)
                return (-1);
            if ($this.$next3.$matches($strIndex + $group.$nativeString.length | 0, $testString, $matchResult) >= 0)
                break;
            $strIndex = $strIndex + 1 | 0;
        }
        return $strIndex;
    }
    return (-1);
},
jur_BackReferenceSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $group, $testStr, var$7;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    if ($group === null)
        return (-1);
    $testStr = $testString;
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            $lastIndex = jl_Math_min($lastIndex, $testStr.$nativeString.length - $group.$nativeString.length | 0);
            b: {
                c: while (true) {
                    if ($lastIndex < 0) {
                        $lastIndex = (-1);
                        break b;
                    }
                    var$7 = 0;
                    while (true) {
                        if (var$7 >= $group.$nativeString.length)
                            break c;
                        if (jl_String_charAt($testStr, $lastIndex + var$7 | 0) != jl_String_charAt($group, var$7))
                            break;
                        var$7 = var$7 + 1 | 0;
                    }
                    $lastIndex = $lastIndex + (-1) | 0;
                }
            }
            if ($lastIndex < 0)
                break a;
            if ($lastIndex < $strIndex)
                break a;
            if ($this.$next3.$matches($lastIndex + $group.$nativeString.length | 0, $testString, $matchResult) >= 0)
                break;
            $lastIndex = $lastIndex + (-1) | 0;
        }
        return $lastIndex;
    }
    return (-1);
},
jur_BackReferenceSet_first = ($this, $set) => {
    return 1;
},
jur_BackReferenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$groupIndex;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append0(jl_StringBuilder_append(var$2, $rt_s(270)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
};
function jur_UCIBackReferenceSet() {
    jur_CIBackReferenceSet.call(this);
    this.$groupIndex1 = 0;
}
let jur_UCIBackReferenceSet__init_ = ($this, $groupIndex, $consCounter) => {
    jur_CIBackReferenceSet__init_($this, $groupIndex, $consCounter);
},
jur_UCIBackReferenceSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_UCIBackReferenceSet();
    jur_UCIBackReferenceSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_UCIBackReferenceSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $group, $i, var$6, var$7;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    if ($group !== null && ($stringIndex + $group.$nativeString.length | 0) <= $matchResult.$rightBound) {
        $i = 0;
        while (true) {
            if ($i >= $group.$nativeString.length) {
                jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter1, $group.$nativeString.length);
                return $this.$next3.$matches($stringIndex + $group.$nativeString.length | 0, $testString, $matchResult);
            }
            var$6 = jl_Character_toLowerCase(jl_Character_toUpperCase(jl_String_charAt($group, $i)));
            var$7 = $stringIndex + $i | 0;
            if (var$6 != jl_Character_toLowerCase(jl_Character_toUpperCase(jl_String_charAt($testString, var$7))))
                break;
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    return (-1);
},
jur_UCIBackReferenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$groupIndex1;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append0(jl_StringBuilder_append(var$2, $rt_s(271)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
},
jl_StringBuffer = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuffer_append = ($this, $s) => {
    let var$2, var$3, var$4, var$5, var$6, var$7;
    var$2 = 0;
    $s = $s;
    var$3 = $s.$nativeString.length;
    var$4 = $this;
    var$5 = var$4.$length0;
    var$4 = var$4;
    if (var$2 <= var$3 && var$3 <= $s.$nativeString.length) {
        jl_AbstractStringBuilder_insertSpace(var$4, var$5, (var$5 + var$3 | 0) - var$2 | 0);
        while (var$2 < var$3) {
            var$6 = var$4.$buffer.data;
            var$7 = var$5 + 1 | 0;
            var$6[var$5] = jl_String_charAt($s, var$2);
            var$2 = var$2 + 1 | 0;
            var$5 = var$7;
        }
        return $this;
    }
    $s = new jl_IndexOutOfBoundsException;
    jl_RuntimeException__init_($s);
    $rt_throw($s);
},
jl_StringBuffer_insert1 = ($this, var$1, var$2, var$3, var$4) => {
    jl_AbstractStringBuilder_insert0($this, var$1, var$2, var$3, var$4);
    return $this;
},
jl_StringBuffer_append0 = ($this, var$1, var$2, var$3) => {
    jl_AbstractStringBuilder_append3($this, var$1, var$2, var$3);
    return $this;
},
jl_StringBuffer_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuffer_insert0 = ($this, var$1, var$2) => {
    jl_AbstractStringBuilder_insert1($this, var$1, var$2);
    return $this;
},
jl_StringBuffer_insert = ($this, var$1, var$2) => {
    jl_AbstractStringBuilder_insert($this, var$1, var$2);
    return $this;
};
function jur_SequenceSet() {
    let a = this; jur_LeafSet.call(a);
    a.$string = null;
    a.$leftToRight = null;
    a.$rightToLeft = null;
}
let jur_SequenceSet_accepts = ($this, $strIndex, $testString) => {
    return !jur_SequenceSet_startsWith($this, $testString, $strIndex) ? (-1) : $this.$charCount0;
},
jur_SequenceSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $strLength, var$5, var$6;
    $strLength = $matchResult.$rightBound;
    while (true) {
        if ($strIndex > $strLength)
            return (-1);
        var$5 = jl_String_charAt($this.$string, $this.$charCount0 - 1 | 0);
        a: {
            while (true) {
                var$6 = $this.$charCount0;
                if ($strIndex > ($strLength - var$6 | 0)) {
                    $strIndex = (-1);
                    break a;
                }
                var$6 = ($strIndex + var$6 | 0) - 1 | 0;
                var$6 = jl_String_charAt($testString, var$6);
                if (var$6 == var$5 && jur_SequenceSet_startsWith($this, $testString, $strIndex))
                    break;
                $strIndex = $strIndex + jur_SequenceSet$IntHash_get($this.$leftToRight, var$6) | 0;
            }
        }
        if ($strIndex < 0)
            return (-1);
        if ($this.$next3.$matches($strIndex + $this.$charCount0 | 0, $testString, $matchResult) >= 0)
            break;
        $strIndex = $strIndex + 1 | 0;
    }
    return $strIndex;
},
jur_SequenceSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let var$5, var$6, var$7;
    while (true) {
        if ($lastIndex < $strIndex)
            return (-1);
        var$5 = jl_String_charAt($this.$string, 0);
        var$6 = $testString;
        var$7 = (var$6.$nativeString.length - $lastIndex | 0) - $this.$charCount0 | 0;
        if (var$7 <= 0)
            $lastIndex = $lastIndex + var$7 | 0;
        a: {
            while (true) {
                if ($lastIndex < $strIndex) {
                    $lastIndex = (-1);
                    break a;
                }
                var$7 = jl_String_charAt(var$6, $lastIndex);
                if (var$7 == var$5 && jur_SequenceSet_startsWith($this, $testString, $lastIndex))
                    break;
                $lastIndex = $lastIndex - jur_SequenceSet$IntHash_get($this.$rightToLeft, var$7) | 0;
            }
        }
        if ($lastIndex < 0)
            return (-1);
        if ($this.$next3.$matches($lastIndex + $this.$charCount0 | 0, $testString, $matchResult) >= 0)
            break;
        $lastIndex = $lastIndex + (-1) | 0;
    }
    return $lastIndex;
},
jur_SequenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$string;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(272)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
},
jur_SequenceSet_first = ($this, $set) => {
    let var$2;
    if ($set instanceof jur_CharSet)
        return $set.$ch0 != jl_String_charAt($this.$string, 0) ? 0 : 1;
    if ($set instanceof jur_RangeSet)
        return jur_RangeSet_accepts($set, 0, jl_String_substring($this.$string, 0, 1)) <= 0 ? 0 : 1;
    if (!($set instanceof jur_SupplRangeSet)) {
        if (!($set instanceof jur_SupplCharSet))
            return 1;
        return $this.$string.$nativeString.length > 1 && $set.$ch1 == jl_Character_toCodePoint(jl_String_charAt($this.$string, 0), jl_String_charAt($this.$string, 1)) ? 1 : 0;
    }
    a: {
        b: {
            $set = $set;
            if (!$set.$contains(jl_String_charAt($this.$string, 0))) {
                if ($this.$string.$nativeString.length <= 1)
                    break b;
                if (!$set.$contains(jl_Character_toCodePoint(jl_String_charAt($this.$string, 0), jl_String_charAt($this.$string, 1))))
                    break b;
            }
            var$2 = 1;
            break a;
        }
        var$2 = 0;
    }
    return var$2;
},
jur_SequenceSet_startsWith = ($this, $str, $from) => {
    let $i, var$4;
    $i = 0;
    while ($i < $this.$charCount0) {
        var$4 = $i + $from | 0;
        if (jl_String_charAt($str, var$4) != jl_String_charAt($this.$string, $i))
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
};
function jur_UCISequenceSet() {
    jur_LeafSet.call(this);
    this.$string2 = null;
}
let jur_UCISequenceSet__init_ = ($this, $substring) => {
    let $res, $i, var$4;
    jur_LeafSet__init_($this);
    $res = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($res);
    $i = 0;
    while (true) {
        var$4 = $rt_compare($i, $substring.$length0);
        if (var$4 >= 0) {
            $this.$string2 = jl_AbstractStringBuilder_toString($res);
            $this.$charCount0 = $res.$length0;
            return;
        }
        if ($i < 0)
            break;
        if (var$4 >= 0)
            break;
        jl_AbstractStringBuilder_append($res, jl_Character_toLowerCase(jl_Character_toUpperCase($substring.$buffer.data[$i])));
        $i = $i + 1 | 0;
    }
    $substring = new jl_IndexOutOfBoundsException;
    jl_Exception__init_($substring);
    $rt_throw($substring);
},
jur_UCISequenceSet__init_0 = var_0 => {
    let var_1 = new jur_UCISequenceSet();
    jur_UCISequenceSet__init_(var_1, var_0);
    return var_1;
},
jur_UCISequenceSet_accepts = ($this, $strIndex, $testString) => {
    let $i, var$4, var$5;
    $i = 0;
    while (true) {
        if ($i >= $this.$string2.$nativeString.length)
            return $this.$string2.$nativeString.length;
        var$4 = jl_String_charAt($this.$string2, $i);
        var$5 = $strIndex + $i | 0;
        if (var$4 != jl_Character_toLowerCase(jl_Character_toUpperCase(jl_String_charAt($testString, var$5))))
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_UCISequenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$string2;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(273)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
};
function jur_CISequenceSet() {
    jur_LeafSet.call(this);
    this.$string1 = null;
}
let jur_CISequenceSet__init_ = ($this, $substring) => {
    jur_LeafSet__init_($this);
    $this.$string1 = jl_AbstractStringBuilder_toString($substring);
    $this.$charCount0 = $substring.$length0;
},
jur_CISequenceSet__init_0 = var_0 => {
    let var_1 = new jur_CISequenceSet();
    jur_CISequenceSet__init_(var_1, var_0);
    return var_1;
},
jur_CISequenceSet_accepts = ($this, $strIndex, $testString) => {
    let $i, var$4, var$5, var$6;
    $i = 0;
    while (true) {
        if ($i >= $this.$string1.$nativeString.length)
            return $this.$string1.$nativeString.length;
        var$4 = jl_String_charAt($this.$string1, $i);
        var$5 = $strIndex + $i | 0;
        var$6 = $testString;
        if (var$4 != jl_String_charAt(var$6, var$5) && jur_Pattern_getSupplement(jl_String_charAt($this.$string1, $i)) != jl_String_charAt(var$6, var$5))
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_CISequenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$string1;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(274)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
},
ju_Set = $rt_classWithoutFields(0),
ju_AbstractSet = $rt_classWithoutFields(ju_AbstractCollection),
ju_TemplateCollections$AbstractImmutableSet = $rt_classWithoutFields(ju_AbstractSet),
ju_Collections$1 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableSet),
ju_TemplateCollections$AbstractImmutableMap = $rt_classWithoutFields(ju_AbstractMap),
ju_TemplateCollections$AbstractImmutableMap_put = ($this, $key, $value) => {
    $key = new jl_UnsupportedOperationException;
    jl_Exception__init_($key);
    $rt_throw($key);
},
ju_Collections$2 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableMap),
ju_TemplateCollections$AbstractImmutableList = $rt_classWithoutFields(ju_AbstractList),
ju_Collections$3 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableList),
ju_Iterator = $rt_classWithoutFields(0),
ju_Collections$4 = $rt_classWithoutFields(),
ju_ListIterator = $rt_classWithoutFields(0),
ju_Collections$5 = $rt_classWithoutFields(),
ju_Collections$_clinit_$lambda$_59_0 = $rt_classWithoutFields();
function jur_UCISupplCharSet() {
    jur_LeafSet.call(this);
    this.$ch4 = 0;
}
let jur_UCISupplCharSet_accepts = ($this, $strIndex, $testString) => {
    let $low, $high;
    $low = $strIndex + 1 | 0;
    $testString = $testString;
    $high = jl_String_charAt($testString, $strIndex);
    $low = jl_String_charAt($testString, $low);
    return $this.$ch4 != jl_Character_toLowerCase0(jl_Character_toUpperCase0(jl_Character_toCodePoint($high, $low))) ? (-1) : 2;
},
jur_UCISupplCharSet_getName = $this => {
    let var$1, var$2;
    var$1 = jl_String__init_(jl_Character_toChars($this.$ch4));
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(254)), var$1);
    return jl_AbstractStringBuilder_toString(var$2);
};
function jur_LowSurrogateCharSet() {
    jur_JointSet.call(this);
    this.$low = 0;
}
let jur_LowSurrogateCharSet__init_0 = ($this, $low) => {
    jur_AbstractSet__init_($this);
    $this.$low = $low;
},
jur_LowSurrogateCharSet__init_ = var_0 => {
    let var_1 = new jur_LowSurrogateCharSet();
    jur_LowSurrogateCharSet__init_0(var_1, var_0);
    return var_1;
},
jur_LowSurrogateCharSet_setNext = ($this, $next) => {
    $this.$next3 = $next;
},
jur_LowSurrogateCharSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4, var$5, $low;
    var$4 = $stringIndex + 1 | 0;
    if (var$4 > $matchResult.$rightBound) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    var$5 = $testString;
    $low = jl_String_charAt(var$5, $stringIndex);
    if ($stringIndex > $matchResult.$leftBound && jl_Character_isHighSurrogate(jl_String_charAt(var$5, $stringIndex - 1 | 0)))
        return (-1);
    if ($this.$low != $low)
        return (-1);
    return $this.$next3.$matches(var$4, $testString, $matchResult);
},
jur_LowSurrogateCharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $startStr, $strLength, var$7, var$8;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
    $testStr = $testString;
    $startStr = $matchResult.$leftBound;
    $strLength = $matchResult.$rightBound;
    while (true) {
        if ($strIndex >= $strLength)
            return (-1);
        var$7 = jl_String_indexOf($testStr, $this.$low, $strIndex);
        if (var$7 < 0)
            return (-1);
        if (var$7 > $startStr && jl_Character_isHighSurrogate(jl_String_charAt($testStr, var$7 - 1 | 0))) {
            $strIndex = var$7 + 1 | 0;
            continue;
        }
        var$8 = $this.$next3;
        $strIndex = var$7 + 1 | 0;
        if (var$8.$matches($strIndex, $testString, $matchResult) >= 0)
            break;
    }
    return var$7;
},
jur_LowSurrogateCharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $startStr, $testStr;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
    $startStr = $matchResult.$leftBound;
    $testStr = $testString;
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            $lastIndex = jl_String_lastIndexOf($testStr, $this.$low, $lastIndex);
            if ($lastIndex < 0)
                break a;
            if ($lastIndex < $strIndex)
                break a;
            if ($lastIndex > $startStr && jl_Character_isHighSurrogate(jl_String_charAt($testStr, $lastIndex - 1 | 0))) {
                $lastIndex = $lastIndex + (-2) | 0;
                continue;
            }
            if ($this.$next3.$matches($lastIndex + 1 | 0, $testString, $matchResult) >= 0)
                break;
            $lastIndex = $lastIndex + (-1) | 0;
        }
        return $lastIndex;
    }
    return (-1);
},
jur_LowSurrogateCharSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$low;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_AbstractStringBuilder_append(var$2, var$1);
    return jl_AbstractStringBuilder_toString(var$2);
},
jur_LowSurrogateCharSet_first = ($this, $set) => {
    if ($set instanceof jur_CharSet)
        return 0;
    if ($set instanceof jur_RangeSet)
        return 0;
    if ($set instanceof jur_SupplRangeSet)
        return 0;
    if ($set instanceof jur_SupplCharSet)
        return 0;
    if ($set instanceof jur_HighSurrogateCharSet)
        return 0;
    if (!($set instanceof jur_LowSurrogateCharSet))
        return 1;
    return $set.$low != $this.$low ? 0 : 1;
},
jur_LowSurrogateCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_HighSurrogateCharSet() {
    jur_JointSet.call(this);
    this.$high = 0;
}
let jur_HighSurrogateCharSet__init_0 = ($this, $high) => {
    jur_AbstractSet__init_($this);
    $this.$high = $high;
},
jur_HighSurrogateCharSet__init_ = var_0 => {
    let var_1 = new jur_HighSurrogateCharSet();
    jur_HighSurrogateCharSet__init_0(var_1, var_0);
    return var_1;
},
jur_HighSurrogateCharSet_setNext = ($this, $next) => {
    $this.$next3 = $next;
},
jur_HighSurrogateCharSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, var$5, $low, var$7, $high;
    $strLength = $matchResult.$rightBound;
    var$5 = $stringIndex + 1 | 0;
    $low = $rt_compare(var$5, $strLength);
    if ($low > 0) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    var$7 = $testString;
    $high = jl_String_charAt(var$7, $stringIndex);
    if ($low < 0 && jl_Character_isLowSurrogate(jl_String_charAt(var$7, var$5)))
        return (-1);
    if ($this.$high != $high)
        return (-1);
    return $this.$next3.$matches(var$5, $testString, $matchResult);
},
jur_HighSurrogateCharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $strLength, var$6;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
    $testStr = $testString;
    $strLength = $matchResult.$rightBound;
    while (true) {
        if ($strIndex >= $strLength)
            return (-1);
        var$6 = jl_String_indexOf($testStr, $this.$high, $strIndex);
        if (var$6 < 0)
            return (-1);
        $strIndex = var$6 + 1 | 0;
        if ($strIndex < $strLength && jl_Character_isLowSurrogate(jl_String_charAt($testStr, $strIndex))) {
            $strIndex = var$6 + 2 | 0;
            continue;
        }
        if ($this.$next3.$matches($strIndex, $testString, $matchResult) >= 0)
            break;
    }
    return var$6;
},
jur_HighSurrogateCharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $testStr, $strLength, var$7;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
    $testStr = $testString;
    $strLength = $matchResult.$rightBound;
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            $lastIndex = jl_String_lastIndexOf($testStr, $this.$high, $lastIndex);
            if ($lastIndex < 0)
                break a;
            if ($lastIndex < $strIndex)
                break a;
            var$7 = $lastIndex + 1 | 0;
            if (var$7 < $strLength && jl_Character_isLowSurrogate(jl_String_charAt($testStr, var$7))) {
                $lastIndex = $lastIndex + (-1) | 0;
                continue;
            }
            if ($this.$next3.$matches(var$7, $testString, $matchResult) >= 0)
                break;
            $lastIndex = $lastIndex + (-1) | 0;
        }
        return $lastIndex;
    }
    return (-1);
},
jur_HighSurrogateCharSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$high;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_AbstractStringBuilder_append(var$2, var$1);
    return jl_AbstractStringBuilder_toString(var$2);
},
jur_HighSurrogateCharSet_first = ($this, $set) => {
    if ($set instanceof jur_CharSet)
        return 0;
    if ($set instanceof jur_RangeSet)
        return 0;
    if ($set instanceof jur_SupplRangeSet)
        return 0;
    if ($set instanceof jur_SupplCharSet)
        return 0;
    if ($set instanceof jur_LowSurrogateCharSet)
        return 0;
    if (!($set instanceof jur_HighSurrogateCharSet))
        return 1;
    return $set.$high != $this.$high ? 0 : 1;
},
jur_HighSurrogateCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_SupplCharSet() {
    let a = this; jur_LeafSet.call(a);
    a.$high0 = 0;
    a.$low0 = 0;
    a.$ch1 = 0;
}
let jur_SupplCharSet_accepts = ($this, $strIndex, $testString) => {
    let $low, $high;
    $low = $strIndex + 1 | 0;
    $testString = $testString;
    $high = jl_String_charAt($testString, $strIndex);
    $low = jl_String_charAt($testString, $low);
    return $this.$high0 == $high && $this.$low0 == $low ? 2 : (-1);
},
jur_SupplCharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $strLength, $ch;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
    $testStr = $testString;
    $strLength = $matchResult.$rightBound;
    while ($strIndex < $strLength) {
        $strIndex = jl_String_indexOf($testStr, $this.$high0, $strIndex);
        if ($strIndex < 0)
            return (-1);
        $strIndex = $strIndex + 1 | 0;
        if ($strIndex >= $strLength)
            continue;
        $ch = jl_String_charAt($testStr, $strIndex);
        if ($this.$low0 == $ch && $this.$next3.$matches($strIndex + 1 | 0, $testString, $matchResult) >= 0)
            return $strIndex + (-1) | 0;
        $strIndex = $strIndex + 1 | 0;
    }
    return (-1);
},
jur_SupplCharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $testStr;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
    $testStr = $testString;
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            $lastIndex = jl_String_lastIndexOf($testStr, $this.$low0, $lastIndex) + (-1) | 0;
            if ($lastIndex < 0)
                break a;
            if ($lastIndex < $strIndex)
                break a;
            if ($this.$high0 == jl_String_charAt($testStr, $lastIndex) && $this.$next3.$matches($lastIndex + 2 | 0, $testString, $matchResult) >= 0)
                break;
            $lastIndex = $lastIndex + (-1) | 0;
        }
        return $lastIndex;
    }
    return (-1);
},
jur_SupplCharSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$high0;
    var$2 = $this.$low0;
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_AbstractStringBuilder_append(var$3, var$1);
    jl_AbstractStringBuilder_append(var$3, var$2);
    return jl_AbstractStringBuilder_toString(var$3);
},
jur_SupplCharSet_first = ($this, $set) => {
    if ($set instanceof jur_SupplCharSet)
        return $set.$ch1 != $this.$ch1 ? 0 : 1;
    if ($set instanceof jur_SupplRangeSet)
        return $set.$contains($this.$ch1);
    if ($set instanceof jur_CharSet)
        return 0;
    if (!($set instanceof jur_RangeSet))
        return 1;
    return 0;
},
jur_AbstractLineTerminator$1 = $rt_classWithoutFields(jur_AbstractLineTerminator),
jur_AbstractLineTerminator$1_isLineTerminator = ($this, $ch) => {
    return $ch != 10 ? 0 : 1;
},
jur_AbstractLineTerminator$1_isAfterLineTerminator = ($this, $ch, $ch2) => {
    return $ch != 10 ? 0 : 1;
},
jur_AbstractLineTerminator$2 = $rt_classWithoutFields(jur_AbstractLineTerminator),
jur_AbstractLineTerminator$2_isLineTerminator = ($this, $ch) => {
    return $ch != 10 && $ch != 13 && $ch != 133 && ($ch | 1) != 8233 ? 0 : 1;
},
jur_AbstractLineTerminator$2_isAfterLineTerminator = ($this, $ch, $ch2) => {
    a: {
        b: {
            if ($ch != 10 && $ch != 133 && ($ch | 1) != 8233) {
                if ($ch != 13)
                    break b;
                if ($ch2 == 10)
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = 0;
    }
    return $ch;
};
function jur_SequenceSet$IntHash() {
    let a = this; jl_Object.call(a);
    a.$table = null;
    a.$values0 = null;
    a.$mask = 0;
    a.$size2 = 0;
}
let jur_SequenceSet$IntHash__init_0 = ($this, $size) => {
    let var$2, var$3;
    while (true) {
        var$2 = $this.$mask;
        if ($size < var$2)
            break;
        $this.$mask = var$2 << 1 | 1;
    }
    var$3 = var$2 << 1 | 1;
    $this.$mask = var$3;
    var$3 = var$3 + 1 | 0;
    $this.$table = $rt_createIntArray(var$3);
    $this.$values0 = $rt_createIntArray(var$3);
    $this.$size2 = $size;
},
jur_SequenceSet$IntHash__init_ = var_0 => {
    let var_1 = new jur_SequenceSet$IntHash();
    jur_SequenceSet$IntHash__init_0(var_1, var_0);
    return var_1;
},
jur_SequenceSet$IntHash_put = ($this, $key, $value) => {
    let $i, var$4, $hashCode, var$6;
    $i = 0;
    var$4 = $this.$mask;
    $hashCode = $key & var$4;
    while (true) {
        var$6 = $this.$table.data;
        if (!var$6[$hashCode])
            break;
        if (var$6[$hashCode] == $key)
            break;
        $i = ($i + 1 | 0) & var$4;
        $hashCode = ($hashCode + $i | 0) & var$4;
    }
    var$6[$hashCode] = $key;
    $this.$values0.data[$hashCode] = $value;
},
jur_SequenceSet$IntHash_get = ($this, $key) => {
    let var$2, $hashCode, $i, $storedKey;
    var$2 = $this.$mask;
    $hashCode = $key & var$2;
    $i = 0;
    while (true) {
        $storedKey = $this.$table.data[$hashCode];
        if (!$storedKey)
            break;
        if ($storedKey == $key)
            return $this.$values0.data[$hashCode];
        $i = ($i + 1 | 0) & var$2;
        $hashCode = ($hashCode + $i | 0) & var$2;
    }
    return $this.$size2;
},
jur_AbstractCharClass$LazySpace = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazySpace__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazySpace__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazySpace();
    jur_AbstractCharClass$LazySpace__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazySpace_computeValue = $this => {
    return jur_CharClass_add0(jur_CharClass_add(jur_CharClass__init_(), 9, 13), 32);
},
jur_AbstractCharClass$LazyDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyDigit__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyDigit__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyDigit();
    jur_AbstractCharClass$LazyDigit__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyDigit_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass__init_(), 48, 57);
},
jur_AbstractCharClass$LazyLower = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyLower__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyLower__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyLower();
    jur_AbstractCharClass$LazyLower__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyLower_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass__init_(), 97, 122);
},
jur_AbstractCharClass$LazyUpper = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyUpper__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyUpper__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyUpper();
    jur_AbstractCharClass$LazyUpper__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyUpper_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass__init_(), 65, 90);
},
jur_AbstractCharClass$LazyASCII = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyASCII__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyASCII__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyASCII();
    jur_AbstractCharClass$LazyASCII__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyASCII_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass__init_(), 0, 127);
},
jur_AbstractCharClass$LazyAlpha = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyAlpha__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyAlpha__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyAlpha();
    jur_AbstractCharClass$LazyAlpha__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyAlpha_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass_add(jur_CharClass__init_(), 97, 122), 65, 90);
},
jur_AbstractCharClass$LazyAlnum = $rt_classWithoutFields(jur_AbstractCharClass$LazyAlpha),
jur_AbstractCharClass$LazyAlnum__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyAlnum__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyAlnum();
    jur_AbstractCharClass$LazyAlnum__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyAlnum_computeValue = $this => {
    return jur_CharClass_add(jur_AbstractCharClass$LazyAlpha_computeValue($this), 48, 57);
},
jur_AbstractCharClass$LazyPunct = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyPunct__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyPunct__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyPunct();
    jur_AbstractCharClass$LazyPunct__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyPunct_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass_add(jur_CharClass_add(jur_CharClass__init_(), 33, 64), 91, 96), 123, 126);
},
jur_AbstractCharClass$LazyGraph = $rt_classWithoutFields(jur_AbstractCharClass$LazyAlnum),
jur_AbstractCharClass$LazyGraph__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyGraph__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyGraph();
    jur_AbstractCharClass$LazyGraph__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyGraph_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass_add(jur_CharClass_add(jur_AbstractCharClass$LazyAlnum_computeValue($this), 33, 64), 91, 96), 123, 126);
},
jur_AbstractCharClass$LazyPrint = $rt_classWithoutFields(jur_AbstractCharClass$LazyGraph),
jur_AbstractCharClass$LazyPrint__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyPrint__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyPrint();
    jur_AbstractCharClass$LazyPrint__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyPrint_computeValue = $this => {
    return jur_CharClass_add0(jur_AbstractCharClass$LazyGraph_computeValue($this), 32);
},
jur_AbstractCharClass$LazyBlank = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyBlank__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyBlank__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyBlank();
    jur_AbstractCharClass$LazyBlank__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyBlank_computeValue = $this => {
    return jur_CharClass_add0(jur_CharClass_add0(jur_CharClass__init_(), 32), 9);
},
jur_AbstractCharClass$LazyCntrl = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyCntrl__init_0 = $this => {
    return;
};
let jur_AbstractCharClass$LazyCntrl__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyCntrl();
    jur_AbstractCharClass$LazyCntrl__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyCntrl_computeValue = $this => {
    return jur_CharClass_add0(jur_CharClass_add(jur_CharClass__init_(), 0, 31), 127);
},
jur_AbstractCharClass$LazyXDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyXDigit__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyXDigit__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyXDigit();
    jur_AbstractCharClass$LazyXDigit__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyXDigit_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass_add(jur_CharClass_add(jur_CharClass__init_(), 48, 57), 97, 102), 65, 70);
},
jur_AbstractCharClass$LazyJavaLowerCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaLowerCase__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaLowerCase__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaLowerCase();
    jur_AbstractCharClass$LazyJavaLowerCase__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaLowerCase_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaLowerCase$1;
    $chCl.$this$035 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaUpperCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaUpperCase__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaUpperCase__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaUpperCase();
    jur_AbstractCharClass$LazyJavaUpperCase__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaUpperCase_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaUpperCase$1;
    $chCl.$this$010 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaWhitespace = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaWhitespace__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaWhitespace__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaWhitespace();
    jur_AbstractCharClass$LazyJavaWhitespace__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaWhitespace_computeValue = $this => {
    let var$1;
    var$1 = new jur_AbstractCharClass$LazyJavaWhitespace$1;
    var$1.$this$027 = $this;
    jur_AbstractCharClass__init_(var$1);
    return var$1;
},
jur_AbstractCharClass$LazyJavaMirrored = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaMirrored__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaMirrored__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaMirrored();
    jur_AbstractCharClass$LazyJavaMirrored__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaMirrored_computeValue = $this => {
    let var$1;
    var$1 = new jur_AbstractCharClass$LazyJavaMirrored$1;
    var$1.$this$022 = $this;
    jur_AbstractCharClass__init_(var$1);
    return var$1;
},
jur_AbstractCharClass$LazyJavaDefined = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaDefined__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaDefined__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaDefined();
    jur_AbstractCharClass$LazyJavaDefined__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaDefined_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaDefined$1;
    $chCl.$this$025 = $this;
    jur_AbstractCharClass__init_($chCl);
    ju_BitSet_set($chCl.$lowHighSurrogates, 0, 2048);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaDigit__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaDigit__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaDigit();
    jur_AbstractCharClass$LazyJavaDigit__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaDigit_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaDigit$1;
    $chCl.$this$013 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaIdentifierIgnorable();
    jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1;
    $chCl.$this$030 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaISOControl = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaISOControl__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaISOControl__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaISOControl();
    jur_AbstractCharClass$LazyJavaISOControl__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaISOControl_computeValue = $this => {
    let var$1;
    var$1 = new jur_AbstractCharClass$LazyJavaISOControl$1;
    var$1.$this$036 = $this;
    jur_AbstractCharClass__init_(var$1);
    return var$1;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaJavaIdentifierPart();
    jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1;
    $chCl.$this$07 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaJavaIdentifierStart();
    jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1;
    $chCl.$this$014 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaLetter = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaLetter__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaLetter__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaLetter();
    jur_AbstractCharClass$LazyJavaLetter__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaLetter_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaLetter$1;
    $chCl.$this$024 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
};
let jur_AbstractCharClass$LazyJavaLetterOrDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaLetterOrDigit__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaLetterOrDigit__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaLetterOrDigit();
    jur_AbstractCharClass$LazyJavaLetterOrDigit__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaLetterOrDigit_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaLetterOrDigit$1;
    $chCl.$this$028 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaSpaceChar = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaSpaceChar__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaSpaceChar__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaSpaceChar();
    jur_AbstractCharClass$LazyJavaSpaceChar__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaSpaceChar_computeValue = $this => {
    let var$1;
    var$1 = new jur_AbstractCharClass$LazyJavaSpaceChar$1;
    var$1.$this$029 = $this;
    jur_AbstractCharClass__init_(var$1);
    return var$1;
},
jur_AbstractCharClass$LazyJavaTitleCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaTitleCase__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaTitleCase__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaTitleCase();
    jur_AbstractCharClass$LazyJavaTitleCase__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaTitleCase_computeValue = $this => {
    let var$1;
    var$1 = new jur_AbstractCharClass$LazyJavaTitleCase$1;
    var$1.$this$015 = $this;
    jur_AbstractCharClass__init_(var$1);
    return var$1;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart();
    jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1;
    $chCl.$this$09 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart();
    jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1;
    $chCl.$this$034 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyWord = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyWord__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyWord__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyWord();
    jur_AbstractCharClass$LazyWord__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyWord_computeValue = $this => {
    return jur_CharClass_add0(jur_CharClass_add(jur_CharClass_add(jur_CharClass_add(jur_CharClass__init_(), 97, 122), 65, 90), 48, 57), 95);
},
jur_AbstractCharClass$LazyNonWord = $rt_classWithoutFields(jur_AbstractCharClass$LazyWord),
jur_AbstractCharClass$LazyNonWord__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyNonWord__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyNonWord();
    jur_AbstractCharClass$LazyNonWord__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyNonWord_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass_setNegative(jur_AbstractCharClass$LazyWord_computeValue($this), 1);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyNonSpace = $rt_classWithoutFields(jur_AbstractCharClass$LazySpace),
jur_AbstractCharClass$LazyNonSpace__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyNonSpace__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyNonSpace();
    jur_AbstractCharClass$LazyNonSpace__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyNonSpace_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass_setNegative(jur_AbstractCharClass$LazySpace_computeValue($this), 1);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyNonDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyDigit),
jur_AbstractCharClass$LazyNonDigit__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyNonDigit__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyNonDigit();
    jur_AbstractCharClass$LazyNonDigit__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyNonDigit_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass_setNegative(jur_AbstractCharClass$LazyDigit_computeValue($this), 1);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
};
function jur_AbstractCharClass$LazyRange() {
    let a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$start4 = 0;
    a.$end4 = 0;
}
let jur_AbstractCharClass$LazyRange__init_0 = ($this, $start, $end) => {
    $this.$start4 = $start;
    $this.$end4 = $end;
},
jur_AbstractCharClass$LazyRange__init_ = (var_0, var_1) => {
    let var_2 = new jur_AbstractCharClass$LazyRange();
    jur_AbstractCharClass$LazyRange__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$LazyRange_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass__init_(), $this.$start4, $this.$end4);
},
jur_AbstractCharClass$LazySpecialsBlock = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazySpecialsBlock__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazySpecialsBlock__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazySpecialsBlock();
    jur_AbstractCharClass$LazySpecialsBlock__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazySpecialsBlock_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass_add(jur_CharClass__init_(), 65279, 65279), 65520, 65533);
};
function jur_AbstractCharClass$LazyCategory() {
    let a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$category1 = 0;
    a.$mayContainSupplCodepoints0 = 0;
    a.$containsAllSurrogates0 = 0;
}
let jur_AbstractCharClass$LazyCategory__init_0 = ($this, $cat, $mayContainSupplCodepoints) => {
    $this.$mayContainSupplCodepoints0 = $mayContainSupplCodepoints;
    $this.$category1 = $cat;
},
jur_AbstractCharClass$LazyCategory__init_ = (var_0, var_1) => {
    let var_2 = new jur_AbstractCharClass$LazyCategory();
    jur_AbstractCharClass$LazyCategory__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$LazyCategory__init_1 = ($this, $cat, $mayContainSupplCodepoints, $containsAllSurrogates) => {
    $this.$containsAllSurrogates0 = $containsAllSurrogates;
    $this.$mayContainSupplCodepoints0 = $mayContainSupplCodepoints;
    $this.$category1 = $cat;
},
jur_AbstractCharClass$LazyCategory__init_2 = (var_0, var_1, var_2) => {
    let var_3 = new jur_AbstractCharClass$LazyCategory();
    jur_AbstractCharClass$LazyCategory__init_1(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AbstractCharClass$LazyCategory_computeValue = $this => {
    let $chCl;
    $chCl = jur_UnicodeCategory__init_0($this.$category1);
    if ($this.$containsAllSurrogates0)
        ju_BitSet_set($chCl.$lowHighSurrogates, 0, 2048);
    $chCl.$mayContainSupplCodepoints = $this.$mayContainSupplCodepoints0;
    return $chCl;
};
function jur_AbstractCharClass$LazyCategoryScope() {
    let a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$category0 = 0;
    a.$mayContainSupplCodepoints1 = 0;
    a.$containsAllSurrogates = 0;
}
let jur_AbstractCharClass$LazyCategoryScope__init_1 = ($this, $cat, $mayContainSupplCodepoints) => {
    $this.$mayContainSupplCodepoints1 = $mayContainSupplCodepoints;
    $this.$category0 = $cat;
},
jur_AbstractCharClass$LazyCategoryScope__init_ = (var_0, var_1) => {
    let var_2 = new jur_AbstractCharClass$LazyCategoryScope();
    jur_AbstractCharClass$LazyCategoryScope__init_1(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$LazyCategoryScope__init_0 = ($this, $cat, $mayContainSupplCodepoints, $containsAllSurrogates) => {
    $this.$containsAllSurrogates = $containsAllSurrogates;
    $this.$mayContainSupplCodepoints1 = $mayContainSupplCodepoints;
    $this.$category0 = $cat;
},
jur_AbstractCharClass$LazyCategoryScope__init_2 = (var_0, var_1, var_2) => {
    let var_3 = new jur_AbstractCharClass$LazyCategoryScope();
    jur_AbstractCharClass$LazyCategoryScope__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AbstractCharClass$LazyCategoryScope_computeValue = $this => {
    let $chCl;
    $chCl = new jur_UnicodeCategoryScope;
    jur_UnicodeCategory__init_($chCl, $this.$category0);
    if ($this.$containsAllSurrogates)
        ju_BitSet_set($chCl.$lowHighSurrogates, 0, 2048);
    $chCl.$mayContainSupplCodepoints = $this.$mayContainSupplCodepoints1;
    return $chCl;
},
jl_NegativeArraySizeException = $rt_classWithoutFields(jl_RuntimeException),
jur_IntHash = $rt_classWithoutFields(),
otpp_ResourceAccessor = $rt_classWithoutFields(),
otciu_UnicodeHelper = $rt_classWithoutFields(),
otciu_UnicodeHelper_decodeCaseMapping = $text => {
    let $flow, $sz, $data, var$5, $last, $i, var$8;
    $flow = otci_CharFlow__init_(jl_String_toCharArray($text));
    $sz = otci_Base46_decodeUnsigned($flow);
    $data = $rt_createIntArray($sz * 2 | 0);
    var$5 = $data.data;
    $last = 0;
    $i = 0;
    while ($i < $sz) {
        $last = $last + otci_Base46_decodeUnsigned($flow) | 0;
        var$8 = $i * 2 | 0;
        var$5[var$8] = $last;
        var$5[var$8 + 1 | 0] = otci_Base46_decode($flow);
        $i = $i + 1 | 0;
    }
    return $data;
},
otciu_UnicodeHelper_createCharMapping = $data => {
    let $result, var$3, $last, $lastValue, $i, var$7, $key, $value, var$10, var$11;
    $result = $rt_createIntArray(65536);
    var$3 = $result.data;
    $last = 0;
    $lastValue = 0;
    $i = 0;
    a: {
        while (true) {
            var$7 = $data.data;
            if ($i >= var$7.length)
                break a;
            $key = var$7[$i];
            $value = var$7[$i + 1 | 0];
            var$10 = var$3.length;
            if ($key < var$10)
                var$10 = $key;
            else if ($key == $last)
                break;
            ju_Arrays_fill0($result, $last, var$10, $lastValue);
            $i = $i + 2 | 0;
            $last = var$10;
            $lastValue = $value;
        }
    }
    var$11 = new otciu_CharMapping;
    var$11.$binarySearchTable = $data;
    var$11.$fastTable = $result;
    return var$11;
},
otciu_UnicodeHelper_decodeByte = $c => {
    if ($c > 92)
        return (($c - 32 | 0) - 2 | 0) << 24 >> 24;
    if ($c <= 34)
        return ($c - 32 | 0) << 24 >> 24;
    return (($c - 32 | 0) - 1 | 0) << 24 >> 24;
},
otciu_UnicodeHelper_extractRle = $encoded => {
    let $ranges, var$3, $buffer, var$5, $index, $rangeIndex, $codePoint, $i, $pos, $b, $count, $j, $digit, var$15, $chunk;
    $ranges = $rt_createArray(otciu_UnicodeHelper$Range, 16384);
    var$3 = $ranges.data;
    $buffer = $rt_createByteArray(16384);
    var$5 = $buffer.data;
    $index = 0;
    $rangeIndex = 0;
    $codePoint = 0;
    $i = 0;
    a: while (true) {
        if ($i >= $encoded.$nativeString.length) {
            if ($index <= 0)
                $pos = $rangeIndex;
            else {
                $pos = $rangeIndex + 1 | 0;
                var$3[$rangeIndex] = otciu_UnicodeHelper$Range__init_0($codePoint, $codePoint + $index | 0, ju_Arrays_copyOf1($buffer, $index));
            }
            return ju_Arrays_copyOf($ranges, $pos);
        }
        $b = otciu_UnicodeHelper_decodeByte(jl_String_charAt($encoded, $i));
        if ($b == 64) {
            $i = $i + 1 | 0;
            $b = otciu_UnicodeHelper_decodeByte(jl_String_charAt($encoded, $i));
            $count = 0;
            $pos = 1;
            $j = 0;
            while ($j < 3) {
                $i = $i + 1 | 0;
                $count = $count | $rt_imul($pos, otciu_UnicodeHelper_decodeByte(jl_String_charAt($encoded, $i)));
                $pos = $pos * 64 | 0;
                $j = $j + 1 | 0;
            }
        } else if ($b < 32)
            $count = 1;
        else {
            $b = ($b - 32 | 0) << 24 >> 24;
            $i = $i + 1 | 0;
            $count = otciu_UnicodeHelper_decodeByte(jl_String_charAt($encoded, $i));
        }
        if (!$b && $count >= 128) {
            if ($index > 0) {
                $pos = $rangeIndex + 1 | 0;
                var$3[$rangeIndex] = otciu_UnicodeHelper$Range__init_0($codePoint, $codePoint + $index | 0, ju_Arrays_copyOf1($buffer, $index));
                $rangeIndex = $pos;
            }
            $codePoint = $codePoint + ($index + $count | 0) | 0;
            $index = 0;
        } else
            while ($count > 0) {
                $pos = var$5.length;
                if ($index != $pos) {
                    $j = $rangeIndex;
                    $digit = $codePoint;
                    $codePoint = $index;
                } else {
                    $j = $rangeIndex + 1 | 0;
                    var$15 = new otciu_UnicodeHelper$Range;
                    $digit = $codePoint + $index | 0;
                    otciu_UnicodeHelper$Range__init_(var$15, $codePoint, $digit, ju_Arrays_copyOf1($buffer, $index));
                    var$3[$rangeIndex] = var$15;
                    $codePoint = 0;
                }
                $chunk = jl_Math_min($count, $pos - $codePoint | 0);
                $index = $codePoint + $chunk | 0;
                if ($codePoint > $index)
                    break a;
                while ($codePoint < $index) {
                    $pos = $codePoint + 1 | 0;
                    var$5[$codePoint] = $b;
                    $codePoint = $pos;
                }
                $count = $count - $chunk | 0;
                $rangeIndex = $j;
                $codePoint = $digit;
            }
        $i = $i + 1 | 0;
    }
    $encoded = new jl_IllegalArgumentException;
    jl_Exception__init_($encoded);
    $rt_throw($encoded);
};
function otciu_CharMapping() {
    let a = this; jl_Object.call(a);
    a.$binarySearchTable = null;
    a.$fastTable = null;
}
function otciu_UnicodeHelper$Range() {
    let a = this; jl_Object.call(a);
    a.$start3 = 0;
    a.$end2 = 0;
    a.$data1 = null;
}
let otciu_UnicodeHelper$Range__init_ = ($this, $start, $end, $data) => {
    $this.$start3 = $start;
    $this.$end2 = $end;
    $this.$data1 = $data;
},
otciu_UnicodeHelper$Range__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new otciu_UnicodeHelper$Range();
    otciu_UnicodeHelper$Range__init_(var_3, var_0, var_1, var_2);
    return var_3;
};
function otci_CharFlow() {
    let a = this; jl_Object.call(a);
    a.$characters = null;
    a.$pointer = 0;
}
let otci_CharFlow__init_0 = ($this, $characters) => {
    $this.$characters = $characters;
},
otci_CharFlow__init_ = var_0 => {
    let var_1 = new otci_CharFlow();
    otci_CharFlow__init_0(var_1, var_0);
    return var_1;
},
otci_Base46 = $rt_classWithoutFields(),
otci_Base46_decodeUnsigned = $seq => {
    let $number, $pos, var$4, $hasMore, $digit;
    $number = 0;
    $pos = 1;
    while (true) {
        var$4 = $seq.$characters.data;
        $hasMore = $seq.$pointer;
        $seq.$pointer = $hasMore + 1 | 0;
        $digit = var$4[$hasMore];
        $digit = $digit < 34 ? $digit - 32 | 0 : $digit >= 92 ? ($digit - 32 | 0) - 2 | 0 : ($digit - 32 | 0) - 1 | 0;
        $hasMore = ($digit % 2 | 0) != 1 ? 0 : 1;
        $number = $number + $rt_imul($pos, $digit / 2 | 0) | 0;
        $pos = $pos * 46 | 0;
        if (!$hasMore)
            break;
    }
    return $number;
},
otci_Base46_decode = $seq => {
    let $number, $result;
    $number = otci_Base46_decodeUnsigned($seq);
    $result = $number / 2 | 0;
    if ($number % 2 | 0)
        $result =  -$result | 0;
    return $result;
},
ju_Arrays = $rt_classWithoutFields(),
ju_Arrays_copyOf1 = ($array, $length) => {
    let $result, var$4, $sz, $i;
    $array = $array.data;
    $result = $rt_createByteArray($length);
    var$4 = $result.data;
    $sz = jl_Math_min($length, $array.length);
    $i = 0;
    while ($i < $sz) {
        var$4[$i] = $array[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_copyOf0 = ($array, $length) => {
    let $result, var$4, $sz, $i;
    $array = $array.data;
    $result = $rt_createDoubleArray($length);
    var$4 = $result.data;
    $sz = jl_Math_min($length, $array.length);
    $i = 0;
    while ($i < $sz) {
        var$4[$i] = $array[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_copyOf = ($original, $newLength) => {
    let var$3, $result, $sz, $i;
    var$3 = $original.data;
    $result = jlr_Array_newInstance(jl_Class_getComponentType(jl_Object_getClass($original)), $newLength);
    $sz = jl_Math_min($newLength, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_fill0 = ($a, $fromIndex, $toIndex, $val) => {
    let var$5, var$6, var$7;
    if ($fromIndex > $toIndex) {
        var$5 = new jl_IllegalArgumentException;
        jl_Exception__init_(var$5);
        $rt_throw(var$5);
    }
    while ($fromIndex < $toIndex) {
        var$6 = $a.data;
        var$7 = $fromIndex + 1 | 0;
        var$6[$fromIndex] = $val;
        $fromIndex = var$7;
    }
},
ju_Arrays_fill = ($a, $val) => {
    ju_Arrays_fill0($a, 0, $a.data.length, $val);
},
ju_Arrays_stream = $array => {
    let var$2, var$3, var$4;
    var$2 = $array.data;
    var$3 = new jusi_ArrayStreamImpl;
    var$4 = var$2.length;
    var$3.$array3 = $array;
    var$3.$index1 = 0;
    var$3.$end1 = var$4;
    var$3.$size3 = var$4 - 0 | 0;
    return var$3;
},
jl_Math = $rt_classWithoutFields(),
jl_Math_pow = ($x, $y) => {
    return jl_Math_powImpl($x, $y);
},
jl_Math_powImpl = (var$1, var$2) => {
    return Math.pow(var$1, var$2);
},
jl_Math_min = (var$1, var$2) => {
    if (var$1 < var$2)
        var$2 = var$1;
    return var$2;
},
jl_Math_max = ($a, $b) => {
    if ($a > $b)
        $b = $a;
    return $b;
},
jl_Math_absImpl = var$1 => {
    return Math.abs(var$1);
},
jl_Math_abs = var$1 => {
    return jl_Math_absImpl(var$1);
},
jl_Math_sign = var$1 => {
    return Math.sign(var$1);
},
ju_Map$Entry = $rt_classWithoutFields(0);
function ju_MapEntry() {
    let a = this; jl_Object.call(a);
    a.$key1 = null;
    a.$value2 = null;
}
function ju_HashMap$HashEntry() {
    let a = this; ju_MapEntry.call(a);
    a.$origKeyHash = 0;
    a.$next4 = null;
}
let ju_HashMap$HashEntry__init_ = ($this, var$1, $hash) => {
    let var$3;
    var$3 = null;
    $this.$key1 = var$1;
    $this.$value2 = var$3;
    $this.$origKeyHash = $hash;
},
ju_HashMap$HashEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_HashMap$HashEntry();
    ju_HashMap$HashEntry__init_(var_2, var_0, var_1);
    return var_2;
};
function ju_LinkedHashMap$LinkedHashMapEntry() {
    let a = this; ju_HashMap$HashEntry.call(a);
    a.$chainForward = null;
    a.$chainBackward = null;
}
let jl_UnsupportedOperationException = $rt_classWithoutFields(jl_RuntimeException);
function c_Parser() {
    let a = this; jl_Object.call(a);
    a.$tokens = null;
    a.$pos = 0;
}
let c_Parser_peek = $this => {
    let var$1, var$2;
    var$1 = $this.$tokens;
    var$2 = $this.$pos;
    return ju_ArrayList_get(var$1, var$2);
},
c_Parser_peekNext = $this => {
    let var$1, var$2;
    var$1 = $this.$tokens;
    var$2 = $this.$pos + 1 | 0;
    return ju_ArrayList_get(var$1, var$2);
},
c_Parser_consume = ($this, $t) => {
    let $curr;
    $curr = c_Parser_peek($this);
    c_Parser_expect($this, $t);
    $this.$pos = $this.$pos + 1 | 0;
    return $curr;
},
c_Parser_expect = ($this, $t) => {
    let var$2, var$3, var$4;
    if ((c_Parser_peek($this)).$type === $t)
        return;
    var$2 = new ceu_ParseException;
    $t = jl_String_valueOf($t);
    var$3 = jl_String_valueOf((c_Parser_peek($this)).$type);
    var$4 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$4);
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$4, $rt_s(275)), $t), $rt_s(276)), var$3);
    jl_Exception__init_0(var$2, jl_AbstractStringBuilder_toString(var$4));
    $rt_throw(var$2);
},
c_Parser_parseExpression = $this => {
    let $left, $right, $op;
    $left = c_Parser_parseTerm($this);
    while (true) {
        $right = (c_Parser_peek($this)).$type;
        ct_TokenType_$callClinit();
        if ($right !== ct_TokenType_PLUS && (c_Parser_peek($this)).$type !== ct_TokenType_MINUS)
            break;
        $op = c_Parser_consume($this, (c_Parser_peek($this)).$type);
        $right = c_Parser_parseTerm($this);
        $left = ca_BinaryExpressionNode__init_($left, $op.$type, $right);
    }
    return $left;
},
c_Parser_parseTerm = $this => {
    let $left, $right, $op;
    $left = c_Parser_parseFactor($this);
    while (true) {
        $right = (c_Parser_peek($this)).$type;
        ct_TokenType_$callClinit();
        if ($right !== ct_TokenType_MULT && (c_Parser_peek($this)).$type !== ct_TokenType_DIV)
            break;
        $op = c_Parser_consume($this, (c_Parser_peek($this)).$type);
        $right = c_Parser_parseFactor($this);
        $left = ca_BinaryExpressionNode__init_($left, $op.$type, $right);
    }
    return $left;
},
c_Parser_parseFactor = $this => {
    let var$1, $e, var$3;
    var$1 = (c_Parser_peek($this)).$type;
    ct_TokenType_$callClinit();
    $e = ct_TokenType_NUMBER;
    if (var$1 === $e) {
        var$1 = new ca_NumberExpr;
        var$1.$value8 = jl_Double_parseDouble((c_Parser_consume($this, $e)).$text);
        return var$1;
    }
    $e = (c_Parser_peek($this)).$type;
    var$1 = ct_TokenType_IDENT;
    if ($e === var$1) {
        $e = new ca_VariableNode;
        $e.$identifier = (c_Parser_consume($this, var$1)).$text;
        return $e;
    }
    if ((c_Parser_peek($this)).$type === ct_TokenType_LBRACK)
        return c_Parser_parseMatrix($this);
    $e = (c_Parser_peek($this)).$type;
    var$1 = ct_TokenType_LPAR;
    if ($e === var$1) {
        c_Parser_consume($this, var$1);
        $e = c_Parser_parseExpression($this);
        c_Parser_consume($this, ct_TokenType_RPAR);
        return $e;
    }
    $e = new ceu_ParseException;
    var$1 = (c_Parser_peek($this)).$text;
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(277)), var$1);
    jl_Exception__init_0($e, jl_AbstractStringBuilder_toString(var$3));
    $rt_throw($e);
},
c_Parser_parseMatrix = $this => {
    let $rows, var$2, var$3, var$4;
    ct_TokenType_$callClinit();
    c_Parser_consume($this, ct_TokenType_LBRACK);
    $rows = ju_ArrayList__init_();
    var$2 = c_Parser_parseRow($this);
    var$3 = $rows;
    ju_ArrayList_add(var$3, var$2);
    while (true) {
        var$2 = (c_Parser_peek($this)).$type;
        var$4 = ct_TokenType_COMMA;
        if (var$2 !== var$4)
            break;
        c_Parser_consume($this, var$4);
        ju_ArrayList_add(var$3, c_Parser_parseRow($this));
    }
    c_Parser_consume($this, ct_TokenType_RBRACK);
    var$2 = new ca_MatrixNode;
    var$2.$values1 = $rows;
    return var$2;
},
c_Parser_parseRow = $this => {
    let $row, var$2, var$3, var$4;
    ct_TokenType_$callClinit();
    c_Parser_consume($this, ct_TokenType_LBRACK);
    $row = ju_ArrayList__init_();
    var$2 = c_Parser_parseNumber($this);
    var$3 = $row;
    ju_ArrayList_add(var$3, var$2);
    while (true) {
        var$2 = (c_Parser_peek($this)).$type;
        var$4 = ct_TokenType_RBRACK;
        if (var$2 === var$4)
            break;
        c_Parser_consume($this, ct_TokenType_COMMA);
        ju_ArrayList_add(var$3, c_Parser_parseNumber($this));
    }
    c_Parser_consume($this, var$4);
    return $row;
},
c_Parser_parseNumber = $this => {
    ct_TokenType_$callClinit();
    return jl_Double_valueOf(jl_Double_parseDouble((c_Parser_consume($this, ct_TokenType_NUMBER)).$text));
},
jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException);
function jur_AbstractCharClass$1() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$lHS = null;
    a.$this$026 = null;
}
let jur_AbstractCharClass$1_contains = ($this, $ch) => {
    let $index;
    $index = $ch - 55296 | 0;
    return $index >= 0 && $index < 2048 ? $this.$altSurrogates ^ ju_BitSet_get($this.$val$lHS, $index) : 0;
};
function jur_AbstractCharClass$2() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$lHS0 = null;
    a.$val$thisClass = null;
    a.$this$017 = null;
}
let jur_AbstractCharClass$2_contains = ($this, $ch) => {
    let $index, $containslHS;
    $index = $ch - 55296 | 0;
    $containslHS = $index >= 0 && $index < 2048 ? $this.$altSurrogates ^ ju_BitSet_get($this.$val$lHS0, $index) : 0;
    return $this.$val$thisClass.$contains($ch) && !$containslHS ? 1 : 0;
};
function jur_CharClass$18() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$bs = null;
    a.$this$011 = null;
}
let jur_CharClass$18_contains = ($this, $ch) => {
    return $this.$alt ^ ju_BitSet_get($this.$val$bs, $ch);
},
jur_CharClass$18_toString = $this => {
    let $temp, $i, var$3;
    $temp = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($temp);
    $i = ju_BitSet_nextSetBit($this.$val$bs, 0);
    while ($i >= 0) {
        jl_AbstractStringBuilder_append1($temp, jl_Character_toChars($i));
        jl_AbstractStringBuilder_append($temp, 124);
        $i = ju_BitSet_nextSetBit($this.$val$bs, $i + 1 | 0);
    }
    var$3 = $temp.$length0;
    if (var$3 > 0)
        jl_StringBuilder_deleteCharAt($temp, var$3 - 1 | 0);
    return jl_AbstractStringBuilder_toString($temp);
};
function jur_CharClass$1() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$cc3 = null;
    a.$this$08 = null;
}
let jur_CharClass$1_contains = ($this, $ch) => {
    return $this.$val$cc3.$contains($ch);
};
function jur_CharClass$3() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt = 0;
    a.$val$cc = null;
    a.$this$00 = null;
}
let jur_CharClass$3_contains = ($this, $ch) => {
    return !($this.$val$curAlt ^ ju_BitSet_get($this.$this$00.$bits, $ch)) && !($this.$val$curAlt ^ $this.$this$00.$inverted ^ $this.$val$cc.$contains($ch)) ? 0 : 1;
};
function jur_CharClass$2() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt0 = 0;
    a.$val$cc1 = null;
    a.$this$0 = null;
}
let jur_CharClass$2_contains = ($this, $ch) => {
    return !($this.$val$curAlt0 ^ ju_BitSet_get($this.$this$0.$bits, $ch)) && !($this.$val$curAlt0 ^ $this.$this$0.$inverted ^ $this.$val$cc1.$contains($ch)) ? 1 : 0;
};
function jur_CharClass$5() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt7 = 0;
    a.$val$nb3 = null;
    a.$val$cc0 = null;
    a.$this$018 = null;
}
let jur_CharClass$5_contains = ($this, $ch) => {
    return $this.$val$curAlt7 ^ (!$this.$val$nb3.$contains($ch) && !$this.$val$cc0.$contains($ch) ? 0 : 1);
};
function jur_CharClass$4() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt9 = 0;
    a.$val$nb4 = null;
    a.$val$cc2 = null;
    a.$this$032 = null;
}
let jur_CharClass$4_contains = ($this, $ch) => {
    return $this.$val$curAlt9 ^ (!$this.$val$nb4.$contains($ch) && !$this.$val$cc2.$contains($ch) ? 0 : 1) ? 0 : 1;
};
function jur_CharClass$7() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz7 = null;
    a.$this$033 = null;
}
let jur_CharClass$7_contains = ($this, $ch) => {
    return jur_CharClass_contains($this.$val$clazz7, $ch);
};
function jur_CharClass$6() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz6 = null;
    a.$this$020 = null;
}
let jur_CharClass$6_contains = ($this, $ch) => {
    return jur_CharClass_contains($this.$val$clazz6, $ch) ? 0 : 1;
};
function jur_CharClass$9() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz = null;
    a.$val$curAlt8 = 0;
    a.$this$04 = null;
}
let jur_CharClass$9_contains = ($this, $ch) => {
    return !jur_CharClass_contains($this.$val$clazz, $ch) && !($this.$val$curAlt8 ^ ju_BitSet_get($this.$this$04.$bits, $ch)) ? 0 : 1;
};
function jur_CharClass$8() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz1 = null;
    a.$val$curAlt2 = 0;
    a.$this$01 = null;
}
let jur_CharClass$8_contains = ($this, $ch) => {
    return !jur_CharClass_contains($this.$val$clazz1, $ch) && !($this.$val$curAlt2 ^ ju_BitSet_get($this.$this$01.$bits, $ch)) ? 1 : 0;
};
function jur_CharClass$11() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt4 = 0;
    a.$val$nb2 = null;
    a.$val$clazz8 = null;
    a.$this$012 = null;
}
let jur_CharClass$11_contains = ($this, $ch) => {
    return !($this.$val$curAlt4 ^ $this.$val$nb2.$contains($ch)) && !jur_CharClass_contains($this.$val$clazz8, $ch) ? 0 : 1;
};
function jur_CharClass$10() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt6 = 0;
    a.$val$nb0 = null;
    a.$val$clazz0 = null;
    a.$this$019 = null;
}
let jur_CharClass$10_contains = ($this, $ch) => {
    return !($this.$val$curAlt6 ^ $this.$val$nb0.$contains($ch)) && !jur_CharClass_contains($this.$val$clazz0, $ch) ? 1 : 0;
};
function jur_CharClass$13() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz4 = null;
    a.$this$021 = null;
}
let jur_CharClass$13_contains = ($this, $ch) => {
    return jur_CharClass_contains($this.$val$clazz4, $ch);
};
function jur_CharClass$12() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz5 = null;
    a.$this$031 = null;
}
let jur_CharClass$12_contains = ($this, $ch) => {
    return jur_CharClass_contains($this.$val$clazz5, $ch) ? 0 : 1;
};
function jur_CharClass$15() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz9 = null;
    a.$val$curAlt1 = 0;
    a.$this$06 = null;
}
let jur_CharClass$15_contains = ($this, $ch) => {
    return jur_CharClass_contains($this.$val$clazz9, $ch) && $this.$val$curAlt1 ^ ju_BitSet_get($this.$this$06.$bits, $ch) ? 1 : 0;
};
function jur_CharClass$14() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz2 = null;
    a.$val$curAlt10 = 0;
    a.$this$02 = null;
}
let jur_CharClass$14_contains = ($this, $ch) => {
    return jur_CharClass_contains($this.$val$clazz2, $ch) && $this.$val$curAlt10 ^ ju_BitSet_get($this.$this$02.$bits, $ch) ? 0 : 1;
};
function jur_CharClass$17() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt5 = 0;
    a.$val$nb1 = null;
    a.$val$clazz10 = null;
    a.$this$016 = null;
}
let jur_CharClass$17_contains = ($this, $ch) => {
    return $this.$val$curAlt5 ^ $this.$val$nb1.$contains($ch) && jur_CharClass_contains($this.$val$clazz10, $ch) ? 1 : 0;
};
function jur_CharClass$16() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt3 = 0;
    a.$val$nb = null;
    a.$val$clazz3 = null;
    a.$this$023 = null;
}
let jur_CharClass$16_contains = ($this, $ch) => {
    return $this.$val$curAlt3 ^ $this.$val$nb.$contains($ch) && jur_CharClass_contains($this.$val$clazz3, $ch) ? 0 : 1;
},
jur_BackReferencedSingleSet = $rt_classWithoutFields(jur_SingleSet),
jur_BackReferencedSingleSet_find = ($this, $startSearch, $testString, $matchResult) => {
    let $res, $lastIndex, $saveStart;
    $res = 0;
    $lastIndex = $matchResult.$rightBound;
    a: {
        while (true) {
            if ($startSearch > $lastIndex) {
                $startSearch = $res;
                break a;
            }
            $saveStart = jur_MatchResultImpl_getStart($matchResult, $this.$groupIndex);
            jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $startSearch);
            $res = $this.$kid.$matches($startSearch, $testString, $matchResult);
            if ($res >= 0)
                break;
            jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $saveStart);
            $startSearch = $startSearch + 1 | 0;
        }
    }
    return $startSearch;
},
jur_BackReferencedSingleSet_findBack = ($this, $stringIndex, $startSearch, $testString, $matchResult) => {
    let $res, $saveStart;
    $res = 0;
    a: {
        while (true) {
            if ($startSearch < $stringIndex) {
                $startSearch = $res;
                break a;
            }
            $saveStart = jur_MatchResultImpl_getStart($matchResult, $this.$groupIndex);
            jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $startSearch);
            $res = $this.$kid.$matches($startSearch, $testString, $matchResult);
            if ($res >= 0)
                break;
            jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $saveStart);
            $startSearch = $startSearch + (-1) | 0;
        }
    }
    return $startSearch;
},
jur_BackReferencedSingleSet_processBackRefReplacement = $this => {
    return null;
};
function jur_AbstractCharClass$LazyJavaLowerCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$035 = null;
}
let jur_AbstractCharClass$LazyJavaLowerCase$1_contains = ($this, $ch) => {
    jl_Character_$callClinit();
    return jl_Character_getType($ch) != 2 ? 0 : 1;
};
function jur_AbstractCharClass$LazyJavaUpperCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$010 = null;
}
let jur_AbstractCharClass$LazyJavaUpperCase$1_contains = ($this, $ch) => {
    jl_Character_$callClinit();
    return jl_Character_getType($ch) != 1 ? 0 : 1;
};
function jur_AbstractCharClass$LazyJavaWhitespace$1() {
    jur_AbstractCharClass.call(this);
    this.$this$027 = null;
}
let jur_AbstractCharClass$LazyJavaWhitespace$1_contains = ($this, $ch) => {
    return jl_Character_isWhitespace($ch);
};
function jur_AbstractCharClass$LazyJavaMirrored$1() {
    jur_AbstractCharClass.call(this);
    this.$this$022 = null;
}
let jur_AbstractCharClass$LazyJavaMirrored$1_contains = ($this, $ch) => {
    return 0;
};
function jur_AbstractCharClass$LazyJavaDefined$1() {
    jur_AbstractCharClass.call(this);
    this.$this$025 = null;
}
let jur_AbstractCharClass$LazyJavaDefined$1_contains = ($this, $ch) => {
    jl_Character_$callClinit();
    return !jl_Character_getType($ch) ? 0 : 1;
};
function jur_AbstractCharClass$LazyJavaDigit$1() {
    jur_AbstractCharClass.call(this);
    this.$this$013 = null;
}
let jur_AbstractCharClass$LazyJavaDigit$1_contains = ($this, $ch) => {
    return jl_Character_isDigit($ch);
};
function jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1() {
    jur_AbstractCharClass.call(this);
    this.$this$030 = null;
}
let jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1_contains = ($this, $ch) => {
    return jl_Character_isIdentifierIgnorable($ch);
};
function jur_AbstractCharClass$LazyJavaISOControl$1() {
    jur_AbstractCharClass.call(this);
    this.$this$036 = null;
}
let jur_AbstractCharClass$LazyJavaISOControl$1_contains = ($this, $ch) => {
    a: {
        b: {
            jl_Character_$callClinit();
            if (!($ch >= 0 && $ch <= 31)) {
                if ($ch < 127)
                    break b;
                if ($ch > 159)
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = 0;
    }
    return $ch;
};
function jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$07 = null;
}
let jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1_contains = ($this, $ch) => {
    a: {
        b: {
            jl_Character_$callClinit();
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 8:
                case 9:
                case 10:
                case 23:
                case 26:
                    break;
                case 7:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 24:
                case 25:
                    break b;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = jl_Character_isIdentifierIgnorable($ch);
    }
    return $ch;
};
function jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$014 = null;
}
let jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1_contains = ($this, $ch) => {
    a: {
        b: {
            jl_Character_$callClinit();
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 10:
                case 23:
                case 26:
                    break;
                case 6:
                case 7:
                case 8:
                case 9:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 24:
                case 25:
                    break b;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = jl_Character_isIdentifierIgnorable($ch);
    }
    return $ch;
};
function jur_AbstractCharClass$LazyJavaLetter$1() {
    jur_AbstractCharClass.call(this);
    this.$this$024 = null;
}
let jur_AbstractCharClass$LazyJavaLetter$1_contains = ($this, $ch) => {
    a: {
        jl_Character_$callClinit();
        switch (jl_Character_getType($ch)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                $ch = 0;
                break a;
        }
        $ch = 1;
    }
    return $ch;
};
function jur_AbstractCharClass$LazyJavaLetterOrDigit$1() {
    jur_AbstractCharClass.call(this);
    this.$this$028 = null;
}
let jur_AbstractCharClass$LazyJavaLetterOrDigit$1_contains = ($this, $ch) => {
    return jl_Character_isLetterOrDigit($ch);
};
function jur_AbstractCharClass$LazyJavaSpaceChar$1() {
    jur_AbstractCharClass.call(this);
    this.$this$029 = null;
}
let jur_AbstractCharClass$LazyJavaSpaceChar$1_contains = ($this, $ch) => {
    return jl_Character_isSpaceChar($ch);
};
function jur_AbstractCharClass$LazyJavaTitleCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$015 = null;
}
let jur_AbstractCharClass$LazyJavaTitleCase$1_contains = ($this, $ch) => {
    jl_Character_$callClinit();
    return jl_Character_getType($ch) != 3 ? 0 : 1;
};
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$09 = null;
}
let jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1_contains = ($this, $ch) => {
    a: {
        b: {
            jl_Character_$callClinit();
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 8:
                case 9:
                case 10:
                case 23:
                    break;
                case 7:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                    break b;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = jl_Character_isIdentifierIgnorable($ch);
    }
    return $ch;
};
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$034 = null;
}
let jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1_contains = ($this, $ch) => {
    a: {
        b: {
            jl_Character_$callClinit();
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 10:
                    break;
                case 6:
                case 7:
                case 8:
                case 9:
                    break b;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = jl_Character_isIdentifierIgnorable($ch);
    }
    return $ch;
};
function jur_UnicodeCategory() {
    jur_AbstractCharClass.call(this);
    this.$category = 0;
}
let jur_UnicodeCategory__init_ = ($this, $category) => {
    jur_AbstractCharClass__init_($this);
    $this.$category = $category;
},
jur_UnicodeCategory__init_0 = var_0 => {
    let var_1 = new jur_UnicodeCategory();
    jur_UnicodeCategory__init_(var_1, var_0);
    return var_1;
},
jur_UnicodeCategory_contains = ($this, $ch) => {
    return $this.$alt ^ ($this.$category != jl_Character_getType0($ch & 65535) ? 0 : 1);
},
jur_UnicodeCategoryScope = $rt_classWithoutFields(jur_UnicodeCategory),
jur_UnicodeCategoryScope_contains = ($this, $ch) => {
    return $this.$alt ^ (!($this.$category >> jl_Character_getType0($ch & 65535) & 1) ? 0 : 1);
};
function ju_AbstractList$1() {
    let a = this; jl_Object.call(a);
    a.$index7 = 0;
    a.$modCount3 = 0;
    a.$size1 = 0;
    a.$removeIndex = 0;
    a.$this$03 = null;
}
let ju_AbstractList$1_hasNext = $this => {
    return $this.$index7 >= $this.$size1 ? 0 : 1;
},
ju_AbstractList$1_next = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$modCount3;
    var$2 = $this.$this$03;
    if (var$1 != var$2.$modCount) {
        var$2 = new ju_ConcurrentModificationException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    var$3 = $this.$index7;
    $this.$removeIndex = var$3;
    $this.$index7 = var$3 + 1 | 0;
    return ju_ArrayList_get(var$2, var$3);
};
function ct_Token() {
    let a = this; jl_Object.call(a);
    a.$type = null;
    a.$text = null;
}
let ct_Token__init_ = ($this, $type, $text) => {
    $this.$type = $type;
    $this.$text = $text;
},
ct_Token__init_0 = (var_0, var_1) => {
    let var_2 = new ct_Token();
    ct_Token__init_(var_2, var_0, var_1);
    return var_2;
};
function jl_Enum() {
    let a = this; jl_Object.call(a);
    a.$name = null;
    a.$ordinal = 0;
}
let jl_Enum__init_ = ($this, $name, $ordinal) => {
    $this.$name = $name;
    $this.$ordinal = $ordinal;
},
jl_Enum_toString = $this => {
    return $this.$name;
},
ct_TokenType = $rt_classWithoutFields(jl_Enum),
ct_TokenType_IDENT = null,
ct_TokenType_LPAR = null,
ct_TokenType_RPAR = null,
ct_TokenType_LBRACK = null,
ct_TokenType_RBRACK = null,
ct_TokenType_COMMA = null,
ct_TokenType_NUMBER = null,
ct_TokenType_EQUAL = null,
ct_TokenType_PLUS = null,
ct_TokenType_MINUS = null,
ct_TokenType_MULT = null,
ct_TokenType_DIV = null,
ct_TokenType_EOF = null,
ct_TokenType_$VALUES = null,
ct_TokenType_$callClinit = () => {
    ct_TokenType_$callClinit = $rt_eraseClinit(ct_TokenType);
    ct_TokenType__clinit_();
},
ct_TokenType__init_0 = ($this, var$1, var$2) => {
    ct_TokenType_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
},
ct_TokenType__init_ = (var_0, var_1) => {
    let var_2 = new ct_TokenType();
    ct_TokenType__init_0(var_2, var_0, var_1);
    return var_2;
},
ct_TokenType__clinit_ = () => {
    let var$1, var$2, var$3;
    ct_TokenType_IDENT = ct_TokenType__init_($rt_s(278), 0);
    ct_TokenType_LPAR = ct_TokenType__init_($rt_s(279), 1);
    ct_TokenType_RPAR = ct_TokenType__init_($rt_s(280), 2);
    ct_TokenType_LBRACK = ct_TokenType__init_($rt_s(281), 3);
    ct_TokenType_RBRACK = ct_TokenType__init_($rt_s(282), 4);
    ct_TokenType_COMMA = ct_TokenType__init_($rt_s(283), 5);
    ct_TokenType_NUMBER = ct_TokenType__init_($rt_s(284), 6);
    ct_TokenType_EQUAL = ct_TokenType__init_($rt_s(285), 7);
    ct_TokenType_PLUS = ct_TokenType__init_($rt_s(286), 8);
    ct_TokenType_MINUS = ct_TokenType__init_($rt_s(287), 9);
    ct_TokenType_MULT = ct_TokenType__init_($rt_s(288), 10);
    ct_TokenType_DIV = ct_TokenType__init_($rt_s(289), 11);
    var$1 = ct_TokenType__init_($rt_s(290), 12);
    ct_TokenType_EOF = var$1;
    var$2 = $rt_createArray(ct_TokenType, 13);
    var$3 = var$2.data;
    var$3[0] = ct_TokenType_IDENT;
    var$3[1] = ct_TokenType_LPAR;
    var$3[2] = ct_TokenType_RPAR;
    var$3[3] = ct_TokenType_LBRACK;
    var$3[4] = ct_TokenType_RBRACK;
    var$3[5] = ct_TokenType_COMMA;
    var$3[6] = ct_TokenType_NUMBER;
    var$3[7] = ct_TokenType_EQUAL;
    var$3[8] = ct_TokenType_PLUS;
    var$3[9] = ct_TokenType_MINUS;
    var$3[10] = ct_TokenType_MULT;
    var$3[11] = ct_TokenType_DIV;
    var$3[12] = var$1;
    ct_TokenType_$VALUES = var$2;
},
jur_MatchResult = $rt_classWithoutFields(0);
function jur_Matcher() {
    let a = this; jl_Object.call(a);
    a.$pat = null;
    a.$start2 = null;
    a.$string0 = null;
    a.$matchResult = null;
    a.$leftBound0 = 0;
    a.$rightBound0 = 0;
    a.$appendPos = 0;
    a.$replacement = null;
    a.$processedRepl = null;
    a.$replacementParts = null;
}
let jur_Matcher_processReplacement = ($this, $replacement) => {
    let $res, $sb, $i, $repl, $index, $replacementPos, $nextBackSlashed, var$9, $gr, $group, $$je;
    $res = $this.$replacement;
    if ($res !== null && jl_String_equals($res, $replacement)) {
        if ($this.$replacementParts === null)
            return $this.$processedRepl;
        $sb = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($sb);
        $i = 0;
        while (true) {
            $replacement = $this.$replacementParts;
            if ($i >= $replacement.$size)
                break;
            jl_StringBuilder_append($sb, ju_ArrayList_get($replacement, $i));
            $i = $i + 1 | 0;
        }
        return jl_AbstractStringBuilder_toString($sb);
    }
    $this.$replacement = $replacement;
    $repl = jl_String_toCharArray($replacement);
    $res = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($res);
    $this.$replacementParts = null;
    $index = 0;
    $replacementPos = 0;
    $nextBackSlashed = 0;
    a: {
        b: while (true) {
            var$9 = $repl.data;
            $i = var$9.length;
            if ($index >= $i) {
                $replacement = $this.$replacementParts;
                if ($replacement !== null) {
                    $gr = $res.$length0;
                    if ($replacementPos != $gr)
                        ju_ArrayList_add($replacement, jl_StringBuilder_subSequence($res, $replacementPos, $gr));
                }
                return jl_AbstractStringBuilder_toString($res);
            }
            if (var$9[$index] == 92 && !$nextBackSlashed) {
                $nextBackSlashed = 1;
                $index = $index + 1 | 0;
            }
            c: {
                if ($nextBackSlashed) {
                    if ($index >= $i)
                        break b;
                    jl_AbstractStringBuilder_append($res, var$9[$index]);
                    $nextBackSlashed = 0;
                } else if (var$9[$index] != 36)
                    jl_AbstractStringBuilder_append($res, var$9[$index]);
                else {
                    if ($this.$replacementParts === null)
                        $this.$replacementParts = ju_ArrayList__init_();
                    d: {
                        try {
                            $replacement = new jl_String;
                            $index = $index + 1 | 0;
                            jl_String__init_4($replacement, $repl, $index, 1);
                            $gr = jl_Integer_parseInt0($replacement);
                            if ($replacementPos == jl_StringBuilder_length($res))
                                break d;
                            ju_ArrayList_add($this.$replacementParts, jl_StringBuilder_subSequence($res, $replacementPos, jl_StringBuilder_length($res)));
                            $replacementPos = jl_StringBuilder_length($res);
                            break d;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_Exception) {
                                break a;
                            } else {
                                throw $$e;
                            }
                        }
                    }
                    try {
                        ju_ArrayList_add($this.$replacementParts, jur_Matcher$1__init_($this, $gr));
                        $group = jur_Matcher_group($this, $gr);
                        $replacementPos = $replacementPos + jl_String_length($group) | 0;
                        jl_StringBuilder_append3($res, $group);
                        break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_Exception) {
                            break a;
                        } else {
                            throw $$e;
                        }
                    }
                }
            }
            $index = $index + 1 | 0;
        }
        $replacement = new jl_IndexOutOfBoundsException;
        jl_Exception__init_($replacement);
        $rt_throw($replacement);
    }
    $replacement = new jl_IllegalArgumentException;
    jl_Exception__init_0($replacement, $rt_s(2));
    $rt_throw($replacement);
},
jur_Matcher_group = ($this, $group) => {
    let var$2, var$3, var$4;
    var$2 = $this.$matchResult;
    if (jur_MatchResultImpl_start(var$2, $group) < 0)
        var$2 = null;
    else {
        var$3 = var$2.$string4;
        var$4 = jur_MatchResultImpl_start(var$2, $group);
        $group = jur_MatchResultImpl_end0(var$2, $group);
        var$2 = jl_String_substring(var$3, var$4, $group);
    }
    return var$2;
},
jur_Matcher_find0 = ($this, $start) => {
    let $stringLength, var$3;
    $stringLength = $this.$string0.$nativeString.length;
    if ($start >= 0 && $start <= $stringLength) {
        jur_MatchResultImpl_reset0($this.$matchResult);
        var$3 = $this.$matchResult;
        var$3.$mode0 = 1;
        jur_MatchResultImpl_setStartIndex(var$3, $start);
        $start = $this.$start2.$find0($start, $this.$string0, $this.$matchResult);
        if ($start == (-1))
            $this.$matchResult.$hitEnd = 1;
        if ($start >= 0) {
            var$3 = $this.$matchResult;
            if (var$3.$valid) {
                jur_MatchResultImpl_finalizeMatch(var$3);
                return 1;
            }
        }
        $this.$matchResult.$startIndex = (-1);
        return 0;
    }
    var$3 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_0(var$3, jl_String_valueOf0($start));
    $rt_throw(var$3);
},
jur_Matcher_find = $this => {
    let $length, var$2, var$3;
    $length = $this.$string0.$nativeString.length;
    var$2 = $this.$matchResult;
    if (!var$2.$transparentBounds)
        $length = $this.$rightBound0;
    if (var$2.$startIndex >= 0 && var$2.$mode0 == 1) {
        var$2.$startIndex = jur_MatchResultImpl_end(var$2);
        if (jur_MatchResultImpl_end($this.$matchResult) == jur_MatchResultImpl_start($this.$matchResult, 0)) {
            var$2 = $this.$matchResult;
            var$2.$startIndex = var$2.$startIndex + 1 | 0;
        }
        var$3 = $this.$matchResult.$startIndex;
        return var$3 <= $length && jur_Matcher_find0($this, var$3) ? 1 : 0;
    }
    return jur_Matcher_find0($this, $this.$leftBound0);
},
jur_Matcher_matches = $this => {
    let var$1, var$2, var$3, var$4;
    var$1 = $this.$leftBound0;
    jur_MatchResultImpl_reset0($this.$matchResult);
    var$2 = $this.$matchResult;
    var$2.$mode0 = 2;
    jur_MatchResultImpl_setStartIndex(var$2, var$1);
    var$2 = $this.$start2;
    var$3 = $this.$matchResult;
    if (var$2.$matches(var$1, $this.$string0, var$3) < 0)
        var$4 = 0;
    else {
        jur_MatchResultImpl_finalizeMatch(var$3);
        var$4 = 1;
    }
    return var$4;
},
jur_Matcher_start = $this => {
    return jur_MatchResultImpl_start($this.$matchResult, 0);
},
jur_Matcher_end = $this => {
    return jur_MatchResultImpl_end0($this.$matchResult, 0);
};
function jur_MatchResultImpl() {
    let a = this; jl_Object.call(a);
    a.$groupBounds = null;
    a.$consumers = null;
    a.$compQuantCounters = null;
    a.$string4 = null;
    a.$groupCount = 0;
    a.$valid = 0;
    a.$leftBound = 0;
    a.$rightBound = 0;
    a.$startIndex = 0;
    a.$transparentBounds = 0;
    a.$anchoringBounds = 0;
    a.$hitEnd = 0;
    a.$requireEnd = 0;
    a.$previousMatch = 0;
    a.$mode0 = 0;
    a.$namedGroups0 = null;
}
let jur_MatchResultImpl_setConsumed = ($this, $counter, $value) => {
    $this.$consumers.data[$counter] = $value;
},
jur_MatchResultImpl_getConsumed = ($this, $counter) => {
    return $this.$consumers.data[$counter];
},
jur_MatchResultImpl_end = $this => {
    return jur_MatchResultImpl_end0($this, 0);
},
jur_MatchResultImpl_end0 = ($this, $group) => {
    jur_MatchResultImpl_checkGroup($this, $group);
    return $this.$groupBounds.data[($group * 2 | 0) + 1 | 0];
},
jur_MatchResultImpl_setStart = ($this, $group, $offset) => {
    $this.$groupBounds.data[$group * 2 | 0] = $offset;
},
jur_MatchResultImpl_setEnd = ($this, $group, $offset) => {
    $this.$groupBounds.data[($group * 2 | 0) + 1 | 0] = $offset;
},
jur_MatchResultImpl_getStart = ($this, $group) => {
    return $this.$groupBounds.data[$group * 2 | 0];
},
jur_MatchResultImpl_getEnd = ($this, $group) => {
    return $this.$groupBounds.data[($group * 2 | 0) + 1 | 0];
},
jur_MatchResultImpl_start = ($this, $group) => {
    jur_MatchResultImpl_checkGroup($this, $group);
    return $this.$groupBounds.data[$group * 2 | 0];
},
jur_MatchResultImpl_finalizeMatch = $this => {
    let var$1, var$2;
    var$1 = $this.$groupBounds.data;
    if (var$1[0] == (-1)) {
        var$2 = $this.$startIndex;
        var$1[0] = var$2;
        var$1[1] = var$2;
    }
    $this.$previousMatch = jur_MatchResultImpl_end($this);
},
jur_MatchResultImpl_getEnterCounter = ($this, $setCounter) => {
    return $this.$compQuantCounters.data[$setCounter];
},
jur_MatchResultImpl_setEnterCounter = ($this, $setCounter, $value) => {
    $this.$compQuantCounters.data[$setCounter] = $value;
},
jur_MatchResultImpl_checkGroup = ($this, $group) => {
    let var$2;
    if (!$this.$valid) {
        var$2 = new jl_IllegalStateException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    if ($group >= 0 && $group < $this.$groupCount)
        return;
    var$2 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_0(var$2, jl_String_valueOf0($group));
    $rt_throw(var$2);
},
jur_MatchResultImpl_reset = ($this, $newSequence, $leftBound, $rightBound) => {
    $this.$valid = 0;
    $this.$mode0 = 2;
    ju_Arrays_fill($this.$groupBounds, (-1));
    ju_Arrays_fill($this.$consumers, (-1));
    if ($newSequence !== null)
        $this.$string4 = $newSequence;
    if ($leftBound >= 0) {
        $this.$leftBound = $leftBound;
        $this.$rightBound = $rightBound;
    }
    $this.$startIndex = $this.$leftBound;
},
jur_MatchResultImpl_reset0 = $this => {
    jur_MatchResultImpl_reset($this, null, (-1), (-1));
},
jur_MatchResultImpl_setStartIndex = ($this, $startIndex) => {
    let var$2;
    $this.$startIndex = $startIndex;
    var$2 = $this.$previousMatch;
    if (var$2 >= 0)
        $startIndex = var$2;
    $this.$previousMatch = $startIndex;
},
ceu_ParseException = $rt_classWithoutFields(ceu_CommandException),
ju_ConcurrentModificationException = $rt_classWithoutFields(jl_RuntimeException);
function jur_Matcher$1() {
    let a = this; jl_Object.call(a);
    a.$grN = 0;
    a.$val$gr = 0;
    a.$this$05 = null;
}
let jur_Matcher$1__init_0 = ($this, $this$0, var$2) => {
    $this.$this$05 = $this$0;
    $this.$val$gr = var$2;
    $this.$grN = var$2;
},
jur_Matcher$1__init_ = (var_0, var_1) => {
    let var_2 = new jur_Matcher$1();
    jur_Matcher$1__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_Matcher$1_toString = $this => {
    return jur_Matcher_group($this.$this$05, $this.$grN);
},
ca_AstNode = $rt_classWithoutFields(0);
function ca_MonoFunctionNode() {
    let a = this; jl_Object.call(a);
    a.$argument = null;
    a.$functionType = null;
}
let ca_MonoFunctionNode_execute = ($this, $ctx) => {
    let var$2, $$je;
    a: {
        ca_MonoFunctionNode$1_$callClinit();
        switch (ca_MonoFunctionNode$1_$SwitchMap$commandInterpreter$ast$FunctionType.data[$this.$functionType.$ordinal]) {
            case 1:
                var$2 = ca_MonoFunctionNode_requireMatrix($this.$argument.$execute($ctx));
                try {
                    $ctx = cav_SolutionValue__init_0(m_Matrix_linearSolve(var$2));
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof me_NoSolutionException) {
                        $ctx = new ceu_CommandExecutorException;
                        jl_Exception__init_0($ctx, $rt_s(291));
                        $rt_throw($ctx);
                    } else {
                        throw $$e;
                    }
                }
            case 2:
                var$2 = ca_MonoFunctionNode_requireMatrix($this.$argument.$execute($ctx));
                try {
                    $ctx = cav_NumberValue__init_(m_Matrix_laplaceExpansion(var$2));
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof me_DeterminantException) {
                        $ctx = new ceu_CommandExecutorException;
                        jl_Exception__init_0($ctx, $rt_s(292));
                        $rt_throw($ctx);
                    } else {
                        throw $$e;
                    }
                }
            case 3:
                var$2 = ca_MonoFunctionNode_requireMatrix($this.$argument.$execute($ctx));
                $ctx = cav_MatrixValue__init_(m_Matrix_gaussElimination(var$2));
                break a;
            default:
        }
        $rt_throw(jl_MatchException__init_(null, null));
    }
    return $ctx;
},
ca_MonoFunctionNode_requireMatrix = $v => {
    let var$2, $$je;
    if (!($v instanceof cav_MatrixValue)) {
        var$2 = new ceu_CommandExecutorException;
        jl_Exception__init_0(var$2, $rt_s(293));
        $rt_throw(var$2);
    }
    $v = $v;
    a: {
        try {
            $v = cav_MatrixValue_matrix($v);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Throwable) {
                $v = $$je;
                break a;
            } else {
                throw $$e;
            }
        }
        return $v;
    }
    $rt_throw(jl_MatchException__init_($v.$toString(), $v));
};
function ca_AssignNode() {
    let a = this; jl_Object.call(a);
    a.$name1 = null;
    a.$value7 = null;
}
let ca_AssignNode_execute = ($this, $ctx) => {
    let $excutedValue, var$3, var$4, var$5, var$6;
    $excutedValue = $this.$value7.$execute($ctx);
    var$3 = $this.$name1;
    $ctx = $ctx.$variables;
    if (var$3 === null) {
        var$4 = ju_HashMap_findNullKeyEntry($ctx);
        if (var$4 === null) {
            $ctx.$modCount1 = $ctx.$modCount1 + 1 | 0;
            var$4 = ju_HashMap_createHashedEntry($ctx, null, 0, 0);
            var$5 = $ctx.$elementCount + 1 | 0;
            $ctx.$elementCount = var$5;
            if (var$5 > $ctx.$threshold)
                ju_HashMap_rehash($ctx);
        }
    } else {
        var$6 = jl_String_hashCode(var$3);
        var$5 = var$6 & ($ctx.$elementData.data.length - 1 | 0);
        var$4 = ju_HashMap_findNonNullKeyEntry($ctx, var$3, var$5, var$6);
        if (var$4 === null) {
            $ctx.$modCount1 = $ctx.$modCount1 + 1 | 0;
            var$4 = ju_HashMap_createHashedEntry($ctx, var$3, var$5, var$6);
            var$5 = $ctx.$elementCount + 1 | 0;
            $ctx.$elementCount = var$5;
            if (var$5 > $ctx.$threshold)
                ju_HashMap_rehash($ctx);
        }
    }
    var$4.$value2 = $excutedValue;
    return $excutedValue;
};
function ca_BinaryExpressionNode() {
    let a = this; jl_Object.call(a);
    a.$left0 = null;
    a.$right0 = null;
    a.$op = null;
}
let ca_BinaryExpressionNode__init_0 = ($this, $left, $op, $right) => {
    $this.$left0 = $left;
    $this.$op = $op;
    $this.$right0 = $right;
},
ca_BinaryExpressionNode__init_ = (var_0, var_1, var_2) => {
    let var_3 = new ca_BinaryExpressionNode();
    ca_BinaryExpressionNode__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
ca_BinaryExpressionNode_execute = ($this, $ctx) => {
    let $operand1, $operand2, var$4, var$5, var$6, $$je;
    a: {
        $operand1 = $this.$left0.$execute($ctx);
        $operand2 = $this.$right0.$execute($ctx);
        ca_BinaryExpressionNode$1_$callClinit();
        var$4 = ca_BinaryExpressionNode$1_$SwitchMap$commandInterpreter$tokens$TokenType.data;
        $ctx = $this.$op;
        switch (var$4[$ctx.$ordinal]) {
            case 1:
                b: {
                    c: {
                        d: {
                            if ($operand1 instanceof cav_MatrixValue) {
                                $ctx = $operand1;
                                try {
                                    $ctx = cav_MatrixValue_matrix($ctx);
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    if ($$je instanceof jl_Throwable) {
                                        $ctx = $$je;
                                        break d;
                                    } else {
                                        throw $$e;
                                    }
                                }
                                if ($operand2 instanceof cav_MatrixValue) {
                                    $operand1 = $operand2;
                                    try {
                                        $operand2 = cav_MatrixValue_matrix($operand1);
                                    } catch ($$e) {
                                        $$je = $rt_wrapException($$e);
                                        if ($$je instanceof jl_Throwable) {
                                            $ctx = $$je;
                                            break d;
                                        } else {
                                            throw $$e;
                                        }
                                    }
                                    try {
                                        $operand1 = cav_MatrixValue__init_(m_Matrix_addMAtrix($ctx, $operand2));
                                        break b;
                                    } catch ($$e) {
                                        $$je = $rt_wrapException($$e);
                                        if ($$je instanceof me_MatrixArgumentException) {
                                            $ctx = $$je;
                                            $operand1 = new ceu_CommandExecutorException;
                                            jl_Exception__init_0($operand1, $ctx.$message);
                                            $rt_throw($operand1);
                                        } else {
                                            throw $$e;
                                        }
                                    }
                                }
                            }
                            if ($operand1 instanceof cav_NumberValue) {
                                $ctx = $operand1;
                                try {
                                    var$5 = cav_NumberValue_value($ctx);
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    if ($$je instanceof jl_Throwable) {
                                        $ctx = $$je;
                                        break d;
                                    } else {
                                        throw $$e;
                                    }
                                }
                                if ($operand2 instanceof cav_NumberValue) {
                                    $ctx = $operand2;
                                    try {
                                        var$6 = cav_NumberValue_value($ctx);
                                        break c;
                                    } catch ($$e) {
                                        $$je = $rt_wrapException($$e);
                                        if ($$je instanceof jl_Throwable) {
                                            $ctx = $$je;
                                            break d;
                                        } else {
                                            throw $$e;
                                        }
                                    }
                                }
                            }
                            $operand1 = new ceu_CommandExecutorException;
                            jl_Exception__init_0($operand1, $rt_s(294));
                            $rt_throw($operand1);
                        }
                        $rt_throw(jl_MatchException__init_($ctx.$toString(), $ctx));
                    }
                    $operand1 = cav_NumberValue__init_(var$5 + var$6);
                }
                break a;
            case 2:
                e: {
                    f: {
                        g: {
                            if ($operand1 instanceof cav_MatrixValue) {
                                $ctx = $operand1;
                                try {
                                    $ctx = cav_MatrixValue_matrix($ctx);
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    if ($$je instanceof jl_Throwable) {
                                        $ctx = $$je;
                                        break g;
                                    } else {
                                        throw $$e;
                                    }
                                }
                                if ($operand2 instanceof cav_MatrixValue) {
                                    $operand1 = $operand2;
                                    try {
                                        $operand2 = cav_MatrixValue_matrix($operand1);
                                    } catch ($$e) {
                                        $$je = $rt_wrapException($$e);
                                        if ($$je instanceof jl_Throwable) {
                                            $ctx = $$je;
                                            break g;
                                        } else {
                                            throw $$e;
                                        }
                                    }
                                    try {
                                        $operand1 = cav_MatrixValue__init_(m_Matrix_multiplyMatrix($ctx, $operand2));
                                        break e;
                                    } catch ($$e) {
                                        $$je = $rt_wrapException($$e);
                                        if ($$je instanceof me_MatrixArgumentException) {
                                            $ctx = $$je;
                                            $operand1 = new ceu_CommandExecutorException;
                                            jl_Exception__init_0($operand1, $ctx.$message);
                                            $rt_throw($operand1);
                                        } else {
                                            throw $$e;
                                        }
                                    }
                                }
                            }
                            if ($operand1 instanceof cav_NumberValue) {
                                $ctx = $operand1;
                                try {
                                    var$5 = cav_NumberValue_value($ctx);
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    if ($$je instanceof jl_Throwable) {
                                        $ctx = $$je;
                                        break g;
                                    } else {
                                        throw $$e;
                                    }
                                }
                                if ($operand2 instanceof cav_NumberValue) {
                                    $ctx = $operand2;
                                    try {
                                        var$6 = cav_NumberValue_value($ctx);
                                        break f;
                                    } catch ($$e) {
                                        $$je = $rt_wrapException($$e);
                                        if ($$je instanceof jl_Throwable) {
                                            $ctx = $$je;
                                            break g;
                                        } else {
                                            throw $$e;
                                        }
                                    }
                                }
                            }
                            $operand1 = new ceu_CommandExecutorException;
                            jl_Exception__init_0($operand1, $rt_s(295));
                            $rt_throw($operand1);
                        }
                        $rt_throw(jl_MatchException__init_($ctx.$toString(), $ctx));
                    }
                    $operand1 = cav_NumberValue__init_(var$5 * var$6);
                }
                break a;
            case 3:
                h: {
                    i: {
                        if ($operand1 instanceof cav_NumberValue) {
                            $ctx = $operand1;
                            try {
                                var$5 = cav_NumberValue_value($ctx);
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                if ($$je instanceof jl_Throwable) {
                                    $ctx = $$je;
                                    break i;
                                } else {
                                    throw $$e;
                                }
                            }
                            if ($operand2 instanceof cav_NumberValue) {
                                $ctx = $operand2;
                                try {
                                    var$6 = cav_NumberValue_value($ctx);
                                    break h;
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    if ($$je instanceof jl_Throwable) {
                                        $ctx = $$je;
                                        break i;
                                    } else {
                                        throw $$e;
                                    }
                                }
                            }
                        }
                        $operand1 = new ceu_CommandExecutorException;
                        jl_Exception__init_0($operand1, $rt_s(296));
                        $rt_throw($operand1);
                    }
                    $rt_throw(jl_MatchException__init_($ctx.$toString(), $ctx));
                }
                if (var$6 !== 0.0) {
                    $operand1 = cav_NumberValue__init_(var$5 / var$6);
                    break a;
                }
                $ctx = new ceu_CommandExecutorException;
                jl_Exception__init_0($ctx, $rt_s(297));
                $rt_throw($ctx);
            case 4:
                j: {
                    k: {
                        l: {
                            if ($operand1 instanceof cav_MatrixValue) {
                                $ctx = $operand1;
                                try {
                                    $ctx = cav_MatrixValue_matrix($ctx);
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    if ($$je instanceof jl_Throwable) {
                                        $ctx = $$je;
                                        break l;
                                    } else {
                                        throw $$e;
                                    }
                                }
                                if ($operand2 instanceof cav_MatrixValue) {
                                    $operand1 = $operand2;
                                    try {
                                        $operand2 = cav_MatrixValue_matrix($operand1);
                                    } catch ($$e) {
                                        $$je = $rt_wrapException($$e);
                                        if ($$je instanceof jl_Throwable) {
                                            $ctx = $$je;
                                            break l;
                                        } else {
                                            throw $$e;
                                        }
                                    }
                                    try {
                                        $operand1 = cav_MatrixValue__init_(m_Matrix_subtractMatrix($ctx, $operand2));
                                        break j;
                                    } catch ($$e) {
                                        $$je = $rt_wrapException($$e);
                                        if ($$je instanceof me_MatrixArgumentException) {
                                            $ctx = $$je;
                                            $operand1 = new ceu_CommandExecutorException;
                                            jl_Exception__init_0($operand1, $ctx.$message);
                                            $rt_throw($operand1);
                                        } else {
                                            throw $$e;
                                        }
                                    }
                                }
                            }
                            if ($operand1 instanceof cav_NumberValue) {
                                $ctx = $operand1;
                                try {
                                    var$5 = cav_NumberValue_value($ctx);
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    if ($$je instanceof jl_Throwable) {
                                        $ctx = $$je;
                                        break l;
                                    } else {
                                        throw $$e;
                                    }
                                }
                                if ($operand2 instanceof cav_NumberValue) {
                                    $ctx = $operand2;
                                    try {
                                        var$6 = cav_NumberValue_value($ctx);
                                        break k;
                                    } catch ($$e) {
                                        $$je = $rt_wrapException($$e);
                                        if ($$je instanceof jl_Throwable) {
                                            $ctx = $$je;
                                            break l;
                                        } else {
                                            throw $$e;
                                        }
                                    }
                                }
                            }
                            $operand1 = new ceu_CommandExecutorException;
                            jl_Exception__init_0($operand1, $rt_s(298));
                            $rt_throw($operand1);
                        }
                        $rt_throw(jl_MatchException__init_($ctx.$toString(), $ctx));
                    }
                    $operand1 = cav_NumberValue__init_(var$5 - var$6);
                }
                break a;
            default:
        }
        $operand1 = new ceu_CommandExecutorException;
        $ctx = jl_String_valueOf($ctx);
        $operand2 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($operand2);
        jl_StringBuilder_append(jl_StringBuilder_append($operand2, $rt_s(299)), $ctx);
        jl_Exception__init_0($operand1, jl_AbstractStringBuilder_toString($operand2));
        $rt_throw($operand1);
    }
    return $operand1;
},
jl_IllegalStateException = $rt_classWithoutFields(jl_RuntimeException);
function ca_FunctionType() {
    jl_Enum.call(this);
    this.$identifier0 = null;
}
let ca_FunctionType_SOLVE = null,
ca_FunctionType_DETERMINANT = null,
ca_FunctionType_GAUSS = null,
ca_FunctionType_$VALUES = null,
ca_FunctionType_$callClinit = () => {
    ca_FunctionType_$callClinit = $rt_eraseClinit(ca_FunctionType);
    ca_FunctionType__clinit_();
},
ca_FunctionType_values = () => {
    ca_FunctionType_$callClinit();
    return ca_FunctionType_$VALUES.$clone0();
},
ca_FunctionType__init_0 = ($this, var$1, var$2, $identifier) => {
    ca_FunctionType_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
    $this.$identifier0 = $identifier;
},
ca_FunctionType__init_ = (var_0, var_1, var_2) => {
    let var_3 = new ca_FunctionType();
    ca_FunctionType__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
ca_FunctionType__clinit_ = () => {
    let var$1, var$2, var$3;
    ca_FunctionType_SOLVE = ca_FunctionType__init_($rt_s(300), 0, $rt_s(301));
    ca_FunctionType_DETERMINANT = ca_FunctionType__init_($rt_s(302), 1, $rt_s(303));
    var$1 = ca_FunctionType__init_($rt_s(304), 2, $rt_s(305));
    ca_FunctionType_GAUSS = var$1;
    var$2 = $rt_createArray(ca_FunctionType, 3);
    var$3 = var$2.data;
    var$3[0] = ca_FunctionType_SOLVE;
    var$3[1] = ca_FunctionType_DETERMINANT;
    var$3[2] = var$1;
    ca_FunctionType_$VALUES = var$2;
};
function ju_Optional() {
    jl_Object.call(this);
    this.$value5 = null;
}
let ju_Optional_emptyInstance = null,
ju_Optional__init_0 = ($this, $value) => {
    $this.$value5 = $value;
},
ju_Optional__init_ = var_0 => {
    let var_1 = new ju_Optional();
    ju_Optional__init_0(var_1, var_0);
    return var_1;
},
juf_Predicate = $rt_classWithoutFields(0);
function ca_FunctionType$fromIdentifier$lambda$_3_0() {
    jl_Object.call(this);
    this.$_01 = null;
}
let ca_FunctionType$fromIdentifier$lambda$_3_0_test = (var$0, var$1) => {
    let var$2;
    var$1 = var$1;
    var$2 = var$0.$_01;
    ca_FunctionType_$callClinit();
    return jl_String_equals(var$1.$identifier0, var$2);
},
ju_NoSuchElementException = $rt_classWithoutFields(jl_RuntimeException),
jur_IntArrHash = $rt_classWithoutFields(),
jl_AutoCloseable = $rt_classWithoutFields(0),
jus_BaseStream = $rt_classWithoutFields(0),
jus_Stream = $rt_classWithoutFields(0),
jusi_SimpleStreamImpl = $rt_classWithoutFields(),
jusi_SimpleStreamImpl_filter = ($this, $predicate) => {
    let var$2;
    var$2 = new jusi_FilteringStreamImpl;
    jusi_WrappingStreamImpl__init_(var$2, $this);
    var$2.$filter0 = $predicate;
    return var$2;
},
jusi_SimpleStreamImpl_map = ($this, $mapper) => {
    let var$2;
    var$2 = new jusi_MappingStreamImpl;
    jusi_WrappingStreamImpl__init_(var$2, $this);
    var$2.$mapper = $mapper;
    return var$2;
},
jusi_SimpleStreamImpl_mapToDouble = ($this, $mapper) => {
    let var$2;
    var$2 = new jusi_MappingToDoubleStreamImpl;
    var$2.$source = $this;
    var$2.$mapper0 = $mapper;
    return var$2;
},
jusi_SimpleStreamImpl_forEachOrdered = ($this, $action) => {
    let var$2;
    while (true) {
        var$2 = new jusi_SimpleStreamImpl$forEachOrdered$lambda$_19_0;
        var$2.$_010 = $action;
        if (!$this.$next1(var$2))
            break;
    }
},
jusi_SimpleStreamImpl_toArray = ($this, $generator) => {
    let var$2, $estimatedSize, $array, $consumer, var$6, $list, $i;
    var$2 = $this;
    $estimatedSize = jusi_WrappingStreamImpl_estimateSize(var$2);
    if ($estimatedSize >= 0) {
        $array = $generator.$apply0($estimatedSize);
        $consumer = new jusi_SimpleStreamImpl$ArrayFillingConsumer;
        $consumer.$array1 = $array;
        while (jusi_WrappingStreamImpl_next(var$2, $consumer)) {
        }
        var$6 = $array.data;
        $estimatedSize = $consumer.$index6;
        if ($estimatedSize < var$6.length)
            $array = ju_Arrays_copyOf($array, $estimatedSize);
        return $array;
    }
    $list = ju_ArrayList__init_();
    while (true) {
        ju_Objects_requireNonNull($list);
        $consumer = new jusi_SimpleStreamImpl$toArray$lambda$_21_0;
        $consumer.$_09 = $list;
        if (!jusi_WrappingStreamImpl_next(var$2, $consumer))
            break;
    }
    $list = $list;
    $array = $generator.$apply0($list.$size);
    $i = 0;
    while (true) {
        var$6 = $array.data;
        if ($i >= var$6.length)
            break;
        var$6[$i] = ju_ArrayList_get($list, $i);
        $i = $i + 1 | 0;
    }
    return $array;
},
jusi_SimpleStreamImpl_findFirst = $this => {
    let $consumer, var$2;
    $consumer = new jusi_FindFirstConsumer;
    while ($consumer.$result === null && jusi_WrappingStreamImpl_next($this, $consumer)) {
    }
    $consumer = $consumer.$result;
    if ($consumer !== null)
        var$2 = ju_Optional__init_(ju_Objects_requireNonNull($consumer));
    else {
        if (ju_Optional_emptyInstance === null)
            ju_Optional_emptyInstance = ju_Optional__init_(null);
        var$2 = ju_Optional_emptyInstance;
    }
    return var$2;
};
function jusi_ArrayStreamImpl() {
    let a = this; jusi_SimpleStreamImpl.call(a);
    a.$array3 = null;
    a.$index1 = 0;
    a.$end1 = 0;
    a.$size3 = 0;
}
let jusi_ArrayStreamImpl_next = ($this, $consumer) => {
    let var$2, var$3;
    a: {
        while (true) {
            var$2 = $this.$index1;
            if (var$2 >= $this.$end1)
                break a;
            var$3 = $this.$array3.data;
            $this.$index1 = var$2 + 1 | 0;
            if ($consumer.$test(var$3[var$2]))
                continue;
            else
                break;
        }
    }
    return $this.$index1 >= $this.$end1 ? 0 : 1;
},
jusi_ArrayStreamImpl_estimateSize = $this => {
    return $this.$size3;
},
jl_CloneNotSupportedException = $rt_classWithoutFields(jl_Exception),
ca_MonoFunctionNode$1 = $rt_classWithoutFields(),
ca_MonoFunctionNode$1_$SwitchMap$commandInterpreter$ast$FunctionType = null,
ca_MonoFunctionNode$1_$callClinit = () => {
    ca_MonoFunctionNode$1_$callClinit = $rt_eraseClinit(ca_MonoFunctionNode$1);
    ca_MonoFunctionNode$1__clinit_();
},
ca_MonoFunctionNode$1__clinit_ = () => {
    let var$1, var$2;
    var$1 = $rt_createIntArray((ca_FunctionType_values()).data.length);
    var$2 = var$1.data;
    ca_MonoFunctionNode$1_$SwitchMap$commandInterpreter$ast$FunctionType = var$1;
    var$2[ca_FunctionType_SOLVE.$ordinal] = 1;
    var$2[ca_FunctionType_DETERMINANT.$ordinal] = 2;
    var$2[ca_FunctionType_GAUSS.$ordinal] = 3;
},
jl_MatchException = $rt_classWithoutFields(jl_RuntimeException),
jl_MatchException__init_0 = ($this, $message, $cause) => {
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    jl_Throwable_fillInStackTrace($this);
    $this.$message = $message;
    $this.$cause = $cause;
},
jl_MatchException__init_ = (var_0, var_1) => {
    let var_2 = new jl_MatchException();
    jl_MatchException__init_0(var_2, var_0, var_1);
    return var_2;
};
function jusi_WrappingStreamImpl() {
    jusi_SimpleStreamImpl.call(this);
    this.$sourceStream = null;
}
let jusi_WrappingStreamImpl__init_ = ($this, $sourceStream) => {
    $this.$sourceStream = $sourceStream;
},
jusi_WrappingStreamImpl_next = ($this, $consumer) => {
    return $this.$sourceStream.$next1($this.$wrap($consumer));
},
jusi_WrappingStreamImpl_estimateSize = $this => {
    return $this.$sourceStream.$estimateSize();
};
function jusi_FilteringStreamImpl() {
    jusi_WrappingStreamImpl.call(this);
    this.$filter0 = null;
}
let jusi_FilteringStreamImpl_wrap = ($this, $consumer) => {
    let var$2;
    var$2 = new jusi_FilteringStreamImpl$wrap$lambda$_1_0;
    var$2.$_04 = $this;
    var$2.$_13 = $consumer;
    return var$2;
},
ca_BinaryExpressionNode$1 = $rt_classWithoutFields(),
ca_BinaryExpressionNode$1_$SwitchMap$commandInterpreter$tokens$TokenType = null,
ca_BinaryExpressionNode$1_$callClinit = () => {
    ca_BinaryExpressionNode$1_$callClinit = $rt_eraseClinit(ca_BinaryExpressionNode$1);
    ca_BinaryExpressionNode$1__clinit_();
},
ca_BinaryExpressionNode$1__clinit_ = () => {
    let var$1, var$2;
    ct_TokenType_$callClinit();
    var$1 = $rt_createIntArray((ct_TokenType_$VALUES.$clone0()).data.length);
    var$2 = var$1.data;
    ca_BinaryExpressionNode$1_$SwitchMap$commandInterpreter$tokens$TokenType = var$1;
    var$2[ct_TokenType_PLUS.$ordinal] = 1;
    var$2[ct_TokenType_MULT.$ordinal] = 2;
    var$2[ct_TokenType_DIV.$ordinal] = 3;
    var$2[ct_TokenType_MINUS.$ordinal] = 4;
},
ceu_CommandExecutorException = $rt_classWithoutFields(ceu_CommandException);
function ca_MatrixNode() {
    jl_Object.call(this);
    this.$values1 = null;
}
let ca_MatrixNode_execute = ($this, $ctx) => {
    let var$2, $array;
    $ctx = ju_Collection_stream($this.$values1);
    var$2 = new ca_MatrixNode$execute$lambda$_1_0;
    $ctx = jusi_SimpleStreamImpl_map($ctx, var$2);
    var$2 = new ca_MatrixNode$execute$lambda$_1_1;
    $array = jusi_SimpleStreamImpl_toArray($ctx, var$2);
    return cav_MatrixValue__init_(m_Matrix__init_($array));
},
jl_Record = $rt_classWithoutFields(),
cav_Value = $rt_classWithoutFields(0);
function cav_SolutionValue() {
    jl_Record.call(this);
    this.$expressions = null;
}
let cav_SolutionValue__init_ = ($this, $expressions) => {
    $this.$expressions = $expressions;
},
cav_SolutionValue__init_0 = var_0 => {
    let var_1 = new cav_SolutionValue();
    cav_SolutionValue__init_(var_1, var_0);
    return var_1;
},
cav_SolutionValue_toString = $this => {
    let var$1, var$2, var$3, var$4;
    var$1 = $this.$expressions;
    if (var$1 === null)
        var$2 = $rt_s(1);
    else {
        var$2 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$2);
        jl_AbstractStringBuilder_append0(var$2, $rt_s(22));
        var$3 = 0;
        while (true) {
            var$4 = var$1.data;
            if (var$3 >= var$4.length)
                break;
            if (var$3 > 0)
                jl_AbstractStringBuilder_append0(var$2, $rt_s(36));
            jl_StringBuilder_append(var$2, var$4[var$3]);
            var$3 = var$3 + 1 | 0;
        }
        jl_AbstractStringBuilder_append0(var$2, $rt_s(23));
        var$2 = jl_AbstractStringBuilder_toString(var$2);
    }
    return var$2;
};
function me_MatrixArgumentException() {
    jl_Exception.call(this);
    this.$string8 = null;
}
let me_MatrixArgumentException__init_0 = ($this, $message) => {
    jl_Exception__init_0($this, $message);
    $this.$string8 = $message;
},
me_MatrixArgumentException__init_ = var_0 => {
    let var_1 = new me_MatrixArgumentException();
    me_MatrixArgumentException__init_0(var_1, var_0);
    return var_1;
};
function me_NoSolutionException() {
    me_MatrixArgumentException.call(this);
    this.$string7 = null;
}
function cav_NumberValue() {
    jl_Record.call(this);
    this.$value6 = 0.0;
}
let cav_NumberValue__init_0 = ($this, $value) => {
    $this.$value6 = $value;
},
cav_NumberValue__init_ = var_0 => {
    let var_1 = new cav_NumberValue();
    cav_NumberValue__init_0(var_1, var_0);
    return var_1;
},
cav_NumberValue_toString = $this => {
    return jl_Double_toString($this.$value6);
},
cav_NumberValue_value = $this => {
    return $this.$value6;
};
function me_DeterminantException() {
    me_MatrixArgumentException.call(this);
    this.$string5 = null;
}
function cav_MatrixValue() {
    jl_Record.call(this);
    this.$matrix0 = null;
}
let cav_MatrixValue__init_0 = ($this, $matrix) => {
    $this.$matrix0 = $matrix;
},
cav_MatrixValue__init_ = var_0 => {
    let var_1 = new cav_MatrixValue();
    cav_MatrixValue__init_0(var_1, var_0);
    return var_1;
},
cav_MatrixValue_toString = $this => {
    let var$1, var$2, var$3, var$4, var$5;
    var$1 = $this.$matrix0;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_AbstractStringBuilder_append0(var$2, $rt_s(22));
    jl_AbstractStringBuilder_append0(var$2, $rt_s(306));
    var$3 = 0;
    while (var$3 < var$1.$data0.data.length) {
        jl_AbstractStringBuilder_append0(var$2, $rt_s(307));
        jl_AbstractStringBuilder_append0(var$2, $rt_s(22));
        var$4 = 0;
        while (true) {
            var$5 = var$1.$data0.data;
            if (var$4 >= var$5[0].data.length)
                break;
            if (var$4 == (var$5[0].data.length - 1 | 0))
                jl_StringBuilder_append1(var$2, var$5[var$3].data[var$4]);
            else
                jl_AbstractStringBuilder_append0(jl_StringBuilder_append1(var$2, var$5[var$3].data[var$4]), $rt_s(36));
            var$4 = var$4 + 1 | 0;
        }
        if (var$3 != (var$5.length - 1 | 0))
            jl_AbstractStringBuilder_append0(var$2, $rt_s(308));
        else
            jl_AbstractStringBuilder_append0(var$2, $rt_s(23));
        jl_AbstractStringBuilder_append0(var$2, $rt_s(306));
        var$3 = var$3 + 1 | 0;
    }
    jl_AbstractStringBuilder_append0(var$2, $rt_s(23));
    return jl_AbstractStringBuilder_toString(var$2);
},
cav_MatrixValue_matrix = $this => {
    return $this.$matrix0;
};
function m_Matrix() {
    let a = this; jl_Object.call(a);
    a.$data0 = null;
    a.$rows = 0;
    a.$cols = 0;
}
let m_Matrix__init_0 = ($this, $matrixData) => {
    let $i, var$3, var$4;
    $matrixData = $matrixData.data;
    $i = $matrixData.length;
    if ($i && $matrixData[0].data.length) {
        $this.$rows = $i;
        var$3 = $matrixData[0].data.length;
        $this.$cols = var$3;
        $this.$data0 = $rt_createDoubleMultiArray([var$3, $i]);
        $i = 0;
        while ($i < $this.$rows) {
            $this.$data0.data[$i] = ju_Arrays_copyOf0($matrixData[$i], $this.$cols);
            $i = $i + 1 | 0;
        }
        return;
    }
    var$4 = new jl_IllegalArgumentException;
    jl_Exception__init_0(var$4, $rt_s(309));
    $rt_throw(var$4);
},
m_Matrix__init_ = var_0 => {
    let var_1 = new m_Matrix();
    m_Matrix__init_0(var_1, var_0);
    return var_1;
},
m_Matrix_multiplyMatrix = ($this, $b) => {
    let $a, var$3, var$4, var$5, $c, var$7, $i, $k, $j, $aMatrixData;
    $a = m_Matrix__init_(m_Matrix_copyData($this));
    var$3 = $a.$cols;
    if (var$3 != $b.$rows)
        $rt_throw(me_MatrixArgumentException__init_($rt_s(310)));
    var$4 = $a.$rows;
    var$5 = $b.$cols;
    $c = $rt_createDoubleMultiArray([var$5, var$4]);
    var$7 = $c.data;
    $i = 0;
    while ($i < var$4) {
        $k = 0;
        while ($k < var$5) {
            var$7[$i].data[$k] = 0.0;
            $j = 0;
            while ($j < var$3) {
                $aMatrixData = var$7[$i].data;
                $aMatrixData[$k] = $aMatrixData[$k] + $a.$data0.data[$i].data[$j] * $b.$data0.data[$j].data[$k];
                $j = $j + 1 | 0;
            }
            $k = $k + 1 | 0;
        }
        $i = $i + 1 | 0;
    }
    return m_Matrix__init_($c);
},
m_Matrix_addMAtrix = ($this, $b) => {
    let $a, var$3, var$4, $c, var$6, $i, $k;
    $a = m_Matrix__init_(m_Matrix_copyData($this));
    var$3 = $a.$cols;
    if (var$3 == $b.$cols) {
        var$4 = $a.$rows;
        if (var$4 == $b.$rows) {
            $c = $rt_createDoubleMultiArray([var$3, var$4]);
            var$6 = $c.data;
            $i = 0;
            while ($i < var$4) {
                $k = 0;
                while ($k < var$3) {
                    var$6[$i].data[$k] = $a.$data0.data[$i].data[$k] + $b.$data0.data[$i].data[$k];
                    $k = $k + 1 | 0;
                }
                $i = $i + 1 | 0;
            }
            return m_Matrix__init_($c);
        }
    }
    $rt_throw(me_MatrixArgumentException__init_($rt_s(310)));
},
m_Matrix_subtractMatrix = ($this, $b) => {
    let $a, var$3, var$4, $c, var$6, $i, $k;
    $a = m_Matrix__init_(m_Matrix_copyData($this));
    var$3 = $a.$cols;
    if (var$3 == $b.$cols) {
        var$4 = $a.$rows;
        if (var$4 == $b.$rows) {
            $c = $rt_createDoubleMultiArray([var$3, var$4]);
            var$6 = $c.data;
            $i = 0;
            while ($i < var$4) {
                $k = 0;
                while ($k < var$3) {
                    var$6[$i].data[$k] = $a.$data0.data[$i].data[$k] - $b.$data0.data[$i].data[$k];
                    $k = $k + 1 | 0;
                }
                $i = $i + 1 | 0;
            }
            return m_Matrix__init_($c);
        }
    }
    $rt_throw(me_MatrixArgumentException__init_($rt_s(310)));
},
m_Matrix_linearSolve = $this => {
    let $reducedMatrix, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17, var$18, var$19, var$20, var$21, var$22;
    $reducedMatrix = m_Matrix_gaussElimination($this);
    var$2 = $reducedMatrix.$cols - 1 | 0;
    var$3 = 0;
    a: {
        while (true) {
            var$4 = $reducedMatrix.$rows;
            if (var$3 >= var$4)
                break;
            var$5 = 1;
            var$6 = 0;
            b: {
                while (var$6 < var$2) {
                    if ($reducedMatrix.$data0.data[var$3].data[var$6] !== 0.0) {
                        var$5 = 0;
                        break b;
                    }
                    var$6 = var$6 + 1 | 0;
                }
            }
            if (var$5 && $reducedMatrix.$data0.data[var$3].data[var$2] !== 0.0) {
                var$3 = 0;
                break a;
            }
            var$3 = var$3 + 1 | 0;
        }
        var$3 = 1;
    }
    if (!var$3) {
        $reducedMatrix = new me_NoSolutionException;
        me_MatrixArgumentException__init_0($reducedMatrix, $rt_s(311));
        $reducedMatrix.$string7 = $rt_s(311);
        $rt_throw($reducedMatrix);
    }
    var$7 = $reducedMatrix.$data0;
    var$8 = $rt_createArray(m_LinearExpression, var$2);
    var$9 = var$8.data;
    var$10 = ju_ArrayList__init_();
    var$11 = var$2 - 1 | 0;
    var$12 = var$4 - 1 | 0;
    var$5 = var$12;
    while (var$5 >= 0) {
        var$13 = var$7.data;
        var$14 = var$13[var$5].data[var$2];
        $reducedMatrix = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($reducedMatrix);
        jl_StringBuilder_append1($reducedMatrix, var$14);
        $reducedMatrix = m_LinearExpression__init_(jl_AbstractStringBuilder_toString($reducedMatrix));
        var$15 = var$10;
        ju_ArrayList_addFirst(var$15, $reducedMatrix);
        var$4 = 0;
        c: {
            while (true) {
                if (var$4 >= var$13[0].data.length) {
                    var$4 = (-1);
                    break c;
                }
                if (var$13[var$5].data[var$4] !== 0.0)
                    break;
                var$4 = var$4 + 1 | 0;
            }
        }
        var$3 = var$11 - var$4 | 0;
        if (var$3 > 0) {
            var$6 = var$11;
            while (var$6 > var$4) {
                var$16 = ((var$6 % 26 | 0) + 97 | 0) & 65535;
                $reducedMatrix = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_($reducedMatrix);
                jl_AbstractStringBuilder_append(jl_StringBuilder_append($reducedMatrix, $rt_s(312)), var$16);
                var$9[var$6] = m_LinearExpression__init_(jl_AbstractStringBuilder_toString($reducedMatrix));
                var$6 = var$6 + (-1) | 0;
            }
        }
        if (!(var$5 >= var$12 && var$3 <= 0)) {
            var$3 = var$9.length - 1 | 0;
            while (var$3 > var$4) {
                var$14 = var$13[var$5].data[var$3];
                ju_ArrayList_addFirst(var$15, m_LinearExpression_multiplyConstant(var$9[var$3], var$14));
                var$3 = var$3 + (-1) | 0;
            }
        }
        var$14 = var$13[var$5].data[var$4];
        if (var$15.$size ? 0 : 1) {
            $reducedMatrix = new ju_NoSuchElementException;
            jl_Exception__init_($reducedMatrix);
            $rt_throw($reducedMatrix);
        }
        $reducedMatrix = ju_ArrayList_remove(var$15, var$15.$size - 1 | 0);
        var$17 = ju_AbstractList_iterator(var$10);
        while (ju_AbstractList$1_hasNext(var$17)) {
            var$18 = ju_AbstractList$1_next(var$17);
            var$19 = m_LinearExpression__init_($rt_s(2));
            var$20 = var$19.$expression;
            var$21 = $reducedMatrix.$expression;
            ju_AbstractMap_putAll(var$20, var$21);
            var$18 = var$18.$expression;
            var$20 = new m_LinearExpression$subtract$lambda$_4_0;
            var$20.$_0 = var$19;
            ju_Map_forEach(var$18, var$20);
            m_LinearExpression_removeZeroCoefficents($reducedMatrix, var$19);
            $reducedMatrix = var$19;
        }
        var$9[var$4] = m_LinearExpression_multiplyConstant($reducedMatrix, 1.0 / var$14);
        $reducedMatrix = var$9[var$4];
        var$18 = $reducedMatrix.$expression;
        var$17 = new m_LinearExpression$round$lambda$_7_0;
        var$17.$_07 = $reducedMatrix;
        var$17.$_14 = 4;
        ju_Map_forEach(var$18, var$17);
        var$22 = var$15.$array;
        var$3 = 0;
        var$6 = var$15.$size;
        $reducedMatrix = null;
        if (var$3 > var$6) {
            $reducedMatrix = new jl_IllegalArgumentException;
            jl_Exception__init_($reducedMatrix);
            $rt_throw($reducedMatrix);
        }
        while (var$3 < var$6) {
            var$13 = var$22.data;
            var$16 = var$3 + 1 | 0;
            var$13[var$3] = $reducedMatrix;
            var$3 = var$16;
        }
        var$15.$size = 0;
        var$15.$modCount = var$15.$modCount + 1 | 0;
        if (var$11 > 0)
            var$11 = var$4 - 1 | 0;
        var$5 = var$5 + (-1) | 0;
    }
    return var$8;
},
m_Matrix_gaussElimination = $this => {
    let $solutionMatrixData, $nonZeroSolution, var$3, $n, var$5, $colPivotIndex, var$7, var$8, var$9, $col, $row1, $row2, $m, $row1_0, var$15, var$16, var$17, var$18, $currCol, $pivotRow1, $pivotRow2;
    $solutionMatrixData = m_Matrix_copyData($this);
    $nonZeroSolution = $solutionMatrixData.data;
    var$3 = new m_Matrix$sortEquations$lambda$_15_0;
    var$3.$_05 = $solutionMatrixData;
    $n = $nonZeroSolution.length;
    if ($n) {
        var$5 = $rt_createArray(jl_Object, $n);
        $colPivotIndex = 1;
        var$7 = $solutionMatrixData;
        while ($colPivotIndex < $n) {
            var$8 = 0;
            while (true) {
                var$9 = var$7.data;
                $col = var$9.length;
                if (var$8 >= $col)
                    break;
                $row1 = jl_Math_min($col, var$8 + $colPivotIndex | 0);
                $row2 = var$8 + (2 * $colPivotIndex | 0) | 0;
                $m = jl_Math_min($col, $row2);
                $row1_0 = var$8;
                var$15 = $row1;
                a: {
                    b: {
                        while (var$8 != $row1) {
                            if (var$15 == $m)
                                break b;
                            var$16 = var$9[var$8];
                            var$17 = var$9[var$15];
                            if (var$3.$compare(var$16, var$17) > 0) {
                                var$18 = var$5.data;
                                $currCol = $row1_0 + 1 | 0;
                                var$18[$row1_0] = var$17;
                                var$15 = var$15 + 1 | 0;
                            } else {
                                var$18 = var$5.data;
                                $currCol = $row1_0 + 1 | 0;
                                var$18[$row1_0] = var$16;
                                var$8 = var$8 + 1 | 0;
                            }
                            $row1_0 = $currCol;
                        }
                        while (true) {
                            if (var$15 >= $m)
                                break a;
                            var$18 = var$5.data;
                            $currCol = $row1_0 + 1 | 0;
                            var$8 = var$15 + 1 | 0;
                            var$18[$row1_0] = var$9[var$15];
                            $row1_0 = $currCol;
                            var$15 = var$8;
                        }
                    }
                    while (true) {
                        if (var$8 >= $row1)
                            break a;
                        var$18 = var$5.data;
                        $currCol = $row1_0 + 1 | 0;
                        $col = var$8 + 1 | 0;
                        var$18[$row1_0] = var$9[var$8];
                        $row1_0 = $currCol;
                        var$8 = $col;
                    }
                }
                var$8 = $row2;
            }
            $colPivotIndex = $colPivotIndex * 2 | 0;
            var$9 = var$7;
            var$7 = var$5;
            var$5 = var$9;
        }
        c: {
            if (var$7 !== $solutionMatrixData) {
                $currCol = 0;
                while (true) {
                    var$9 = var$7.data;
                    if ($currCol >= var$9.length)
                        break c;
                    var$5.data[$currCol] = var$9[$currCol];
                    $currCol = $currCol + 1 | 0;
                }
            }
        }
    }
    $m = $nonZeroSolution[0].data.length;
    $row1_0 = 0;
    var$8 = $n - 1 | 0;
    while ($row1_0 < var$8) {
        $col = 0;
        d: {
            while (true) {
                if ($col >= $m) {
                    $col = (-1);
                    break d;
                }
                if ($nonZeroSolution[$row1_0].data[$col] !== 0.0)
                    break;
                $col = $col + 1 | 0;
            }
        }
        if ($col == (-1))
            return m_Matrix__init_(m_Matrix_getNonZeroSolution($solutionMatrixData, $n, $m));
        $row1 = $row1_0 + 1 | 0;
        $row2 = $row1;
        while ($row2 < $n) {
            e: {
                $pivotRow1 = $nonZeroSolution[$row1_0].data[$col];
                $pivotRow2 = $nonZeroSolution[$row2].data[$col];
                if ($nonZeroSolution[$row2].data[$col] !== 0.0) {
                    $currCol = $col;
                    while (true) {
                        if ($currCol >= $m)
                            break e;
                        $nonZeroSolution[$row2].data[$currCol] =  -$nonZeroSolution[$row1_0].data[$currCol] + $nonZeroSolution[$row2].data[$currCol] * $pivotRow1 / $pivotRow2;
                        $currCol = $currCol + 1 | 0;
                    }
                }
            }
            $row2 = $row2 + 1 | 0;
        }
        $row1_0 = $row1;
    }
    return m_Matrix__init_(m_Matrix_getNonZeroSolution($solutionMatrixData, $n, $m));
},
m_Matrix_getNonZeroSolution = ($solutionMatrixData, $n, $m) => {
    let var$4, var$5;
    var$4 = ju_Arrays_stream($solutionMatrixData);
    var$5 = new m_Matrix$getNonZeroSolution$lambda$_14_0;
    var$4 = jusi_SimpleStreamImpl_filter(var$4, var$5);
    var$5 = new m_Matrix$getNonZeroSolution$lambda$_14_1;
    var$5.$_08 = $m;
    var$4 = jusi_SimpleStreamImpl_map(var$4, var$5);
    var$5 = new m_Matrix$getNonZeroSolution$lambda$_14_2;
    return jusi_SimpleStreamImpl_toArray(var$4, var$5);
},
m_Matrix_laplaceExpansion = $this => {
    let $matrixData, $columnPermutation, var$3, var$4, $solutionList, $usedColumns, var$7;
    $matrixData = m_Matrix_copyData($this);
    $columnPermutation = $matrixData.data;
    var$3 = $columnPermutation[0].data.length;
    var$4 = $columnPermutation.length;
    if (var$3 != var$4) {
        $solutionList = new me_DeterminantException;
        me_MatrixArgumentException__init_0($solutionList, $rt_s(313));
        $solutionList.$string5 = $rt_s(313);
        $rt_throw($solutionList);
    }
    $columnPermutation = $rt_createIntArray(var$4);
    $usedColumns = $rt_createBooleanArray(var$4);
    $solutionList = ju_ArrayList__init_();
    m_Matrix_calcLaplaceExp($matrixData, 0, $solutionList, $columnPermutation, $usedColumns);
    $solutionList = ju_Collection_stream($solutionList);
    var$7 = new m_Matrix$laplaceExpansion$lambda$_16_0;
    $solutionList = jusi_SimpleStreamImpl_mapToDouble($solutionList, var$7);
    var$7 = new jusd_SumDoubleConsumer;
    $solutionList = $solutionList;
    while (jusi_MappingToDoubleStreamImpl_next($solutionList, var$7)) {
    }
    return var$7.$sum;
},
m_Matrix_calcLaplaceExp = ($matrixData, $currRow, $solutionList, $columnPermutation, $usedColumns) => {
    let var$6, $num, $n, var$9, var$10, var$11, $usedColumnIdx, var$13, var$14, var$15;
    var$6 = $matrixData.data;
    if ($currRow < var$6.length) {
        $num = 1;
        $n = $currRow + 1 | 0;
        while ($num <= var$6[0].data.length) {
            var$9 = $usedColumns.data;
            var$10 = $num - 1 | 0;
            if (!var$9[var$10]) {
                var$11 = $columnPermutation.data;
                if (var$11[$currRow])
                    var$9[var$11[$currRow] - 1 | 0] = 0;
                var$11[$currRow] = $num;
                var$9[var$10] = 1;
                m_Matrix_calcLaplaceExp($matrixData, $n, $solutionList, $columnPermutation, $usedColumns);
            }
            $num = $num + 1 | 0;
        }
        $matrixData = $columnPermutation.data;
        $usedColumns.data[$matrixData[$currRow] - 1 | 0] = 0;
        $matrixData[$currRow] = 0;
        return;
    }
    $currRow = 0;
    $n = 0;
    while (true) {
        $matrixData = $columnPermutation.data;
        $usedColumnIdx = $matrixData.length;
        if ($n >= $usedColumnIdx)
            break;
        var$13 = $n + 1 | 0;
        $num = var$13;
        while ($num < $usedColumnIdx) {
            if ($matrixData[$n] > $matrixData[$num])
                $currRow = $currRow + 1 | 0;
            $num = $num + 1 | 0;
        }
        $n = var$13;
    }
    var$13 = 1;
    if (($currRow % 2 | 0) == 1)
        var$13 = (-1);
    var$14 = 1.0;
    $currRow = 0;
    while ($currRow < $usedColumnIdx) {
        var$14 = var$14 * var$6[$currRow].data[$matrixData[$currRow] - 1 | 0];
        $currRow = $currRow + 1 | 0;
    }
    var$15 = jl_Double_valueOf(var$14 * var$13);
    ju_ArrayList_add($solutionList, var$15);
},
m_Matrix_copyData = $this => {
    let $i, $copiedData, var$3;
    $i = $this.$rows;
    $copiedData = $rt_createDoubleMultiArray([$this.$cols, $i]);
    var$3 = $copiedData.data;
    $i = 0;
    while ($i < $this.$rows) {
        var$3[$i] = ju_Arrays_copyOf0($this.$data0.data[$i], $this.$cols);
        $i = $i + 1 | 0;
    }
    return $copiedData;
};
function jusi_FindFirstConsumer() {
    jl_Object.call(this);
    this.$result = null;
}
let jusi_FindFirstConsumer_test = ($this, $t) => {
    $this.$result = $t;
    return 0;
};
function jl_Double() {
    jl_Number.call(this);
    this.$value0 = 0.0;
}
let jl_Double_TYPE = null,
jl_Double_$callClinit = () => {
    jl_Double_$callClinit = $rt_eraseClinit(jl_Double);
    jl_Double__clinit_();
},
jl_Double_valueOf = $d => {
    let var$2;
    jl_Double_$callClinit();
    var$2 = new jl_Double;
    var$2.$value0 = $d;
    return var$2;
},
jl_Double_toString = $d => {
    let var$2;
    jl_Double_$callClinit();
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    return jl_AbstractStringBuilder_toString(jl_StringBuilder_append1(var$2, $d));
},
jl_Double_parseDouble = $string => {
    let $start, $end, var$4, var$5, $negative, $c, $mantissa, $exp, $hasOneDigit, $mantissaPos, $negativeExp, $numExp;
    jl_Double_$callClinit();
    if (jl_String_isEmpty($string)) {
        $string = new jl_NumberFormatException;
        jl_Exception__init_($string);
        $rt_throw($string);
    }
    $start = 0;
    $end = $string.$nativeString.length;
    while (true) {
        if (jl_String_charAt($string, $start) > 32) {
            while (true) {
                var$4 = $end - 1 | 0;
                if (jl_String_charAt($string, var$4) > 32)
                    break;
                $end = $end + (-1) | 0;
            }
            var$5 = jl_String_charAt($string, var$4) != 102 && jl_String_charAt($string, var$4) != 70 && jl_String_charAt($string, var$4) != 100 && jl_String_charAt($string, var$4) != 68 ? $end : $end + (-1) | 0;
            $negative = 0;
            if (jl_String_charAt($string, $start) == 45) {
                $start = $start + 1 | 0;
                $negative = 1;
            } else if (jl_String_charAt($string, $start) == 43)
                $start = $start + 1 | 0;
            if ($start == var$5) {
                $string = new jl_NumberFormatException;
                jl_Exception__init_($string);
                $rt_throw($string);
            }
            a: {
                $c = jl_String_charAt($string, $start);
                $mantissa = Long_ZERO;
                $exp = (-1);
                $hasOneDigit = 0;
                $mantissaPos = Long_create(2808348672, 232830643);
                if ($c != 46) {
                    $hasOneDigit = 1;
                    if ($c >= 48 && $c <= 57) {
                        b: {
                            while ($start < var$5) {
                                if (jl_String_charAt($string, $start) != 48)
                                    break b;
                                $start = $start + 1 | 0;
                            }
                        }
                        while ($start < var$5) {
                            var$4 = jl_String_charAt($string, $start);
                            if (var$4 < 48)
                                break a;
                            if (var$4 > 57)
                                break a;
                            if (Long_gt($mantissaPos, Long_ZERO)) {
                                $mantissa = Long_add($mantissa, Long_mul($mantissaPos, Long_fromInt(var$4 - 48 | 0)));
                                $mantissaPos = jl_Long_divideUnsigned($mantissaPos, Long_fromInt(10));
                            }
                            $exp = $exp + 1 | 0;
                            $start = $start + 1 | 0;
                        }
                    } else {
                        if ($c == 73 && ($end - $start | 0) == 8 && jl_String_regionMatches($string, 0, $start, $rt_s(314), 0, 8))
                            return !$negative ? Infinity : (-Infinity);
                        if ($c == 78 && ($end - $start | 0) == 3 && jl_String_regionMatches($string, 0, $start, $rt_s(315), 0, 3))
                            return NaN;
                        $string = new jl_NumberFormatException;
                        jl_Exception__init_($string);
                        $rt_throw($string);
                    }
                }
            }
            if ($start < var$5 && jl_String_charAt($string, $start) == 46) {
                $start = $start + 1 | 0;
                c: {
                    while (true) {
                        if ($start >= var$5)
                            break c;
                        $end = jl_String_charAt($string, $start);
                        var$4 = $rt_compare($end, 48);
                        if (var$4 < 0)
                            break c;
                        if ($end > 57)
                            break;
                        if (Long_eq($mantissa, Long_ZERO) && !var$4)
                            $exp = $exp + (-1) | 0;
                        else if (Long_gt($mantissaPos, Long_ZERO)) {
                            $mantissa = Long_add($mantissa, Long_mul($mantissaPos, Long_fromInt($end - 48 | 0)));
                            $mantissaPos = jl_Long_divideUnsigned($mantissaPos, Long_fromInt(10));
                        }
                        $start = $start + 1 | 0;
                        $hasOneDigit = 1;
                    }
                }
                if (!$hasOneDigit) {
                    $string = new jl_NumberFormatException;
                    jl_Exception__init_($string);
                    $rt_throw($string);
                }
            }
            if ($start < var$5) {
                $end = jl_String_charAt($string, $start);
                if ($end != 101 && $end != 69) {
                    $string = new jl_NumberFormatException;
                    jl_RuntimeException__init_($string);
                    $rt_throw($string);
                }
                $end = $start + 1 | 0;
                $negativeExp = 0;
                if ($end == var$5)
                    $rt_throw(jl_NumberFormatException__init_());
                if (jl_String_charAt($string, $end) == 45) {
                    $end = $end + 1 | 0;
                    $negativeExp = 1;
                } else if (jl_String_charAt($string, $end) == 43)
                    $end = $end + 1 | 0;
                $numExp = 0;
                $start = 0;
                d: {
                    while (true) {
                        if ($end >= var$5)
                            break d;
                        $c = jl_String_charAt($string, $end);
                        if ($c < 48)
                            break d;
                        if ($c > 57)
                            break;
                        $numExp = (10 * $numExp | 0) + ($c - 48 | 0) | 0;
                        $start = 1;
                        $end = $end + 1 | 0;
                    }
                }
                if (!$start)
                    $rt_throw(jl_NumberFormatException__init_());
                if ($negativeExp)
                    $numExp =  -$numExp | 0;
                $exp = $exp + $numExp | 0;
            }
            return otcit_DoubleSynthesizer_synthesizeDouble($mantissa, $exp, $negative);
        }
        $start = $start + 1 | 0;
        if ($start == $end)
            break;
    }
    $string = new jl_NumberFormatException;
    jl_Exception__init_($string);
    $rt_throw($string);
},
jl_Double_toString0 = $this => {
    return jl_Double_toString($this.$value0);
},
jl_Double_isInfinite = $v => {
    jl_Double_$callClinit();
    return !(isFinite($v) ? 1 : 0) && !(isNaN($v) ? 1 : 0) ? 1 : 0;
},
jl_Double__clinit_ = () => {
    jl_Double_TYPE = $rt_cls($rt_doublecls);
},
juf_Function = $rt_classWithoutFields(0),
ca_MatrixNode$execute$lambda$_1_0 = $rt_classWithoutFields(),
ca_MatrixNode$execute$lambda$_1_0_apply = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7;
    var$1 = ju_Collection_stream(var$1);
    var$2 = new ca_MatrixNode$lambda$execute$0$lambda$_3_0;
    var$2 = jusi_SimpleStreamImpl_mapToDouble(var$1, var$2);
    var$3 = jusi_StreamOverSpliterator_estimateSize(var$2.$source);
    if (var$3 >= 0) {
        var$4 = $rt_createDoubleArray(var$3);
        var$1 = new jusd_SimpleDoubleStreamImpl$ArrayFillingConsumer;
        var$1.$array0 = var$4;
        while (jusi_MappingToDoubleStreamImpl_next(var$2, var$1)) {
        }
        var$5 = var$4.data;
        var$3 = var$1.$index4;
        if (var$3 < var$5.length)
            var$4 = ju_Arrays_copyOf0(var$4, var$3);
    } else {
        var$1 = ju_ArrayList__init_();
        while (true) {
            ju_Objects_requireNonNull(var$1);
            var$6 = new jusd_SimpleDoubleStreamImpl$toArray$lambda$_16_0;
            var$6.$_011 = var$1;
            if (!jusi_MappingToDoubleStreamImpl_next(var$2, var$6))
                break;
        }
        var$2 = var$1;
        var$4 = $rt_createDoubleArray(var$2.$size);
        var$5 = var$4.data;
        var$3 = 0;
        var$7 = var$5.length;
        while (var$3 < var$7) {
            var$5[var$3] = (ju_ArrayList_get(var$2, var$3)).$value0;
            var$3 = var$3 + 1 | 0;
        }
    }
    return var$4;
},
juf_IntFunction = $rt_classWithoutFields(0),
ca_MatrixNode$execute$lambda$_1_1 = $rt_classWithoutFields(),
ca_MatrixNode$execute$lambda$_1_1_apply = (var$0, var$1) => {
    return $rt_createArray($rt_arraycls($rt_doublecls), var$1);
};
function ca_NumberExpr() {
    jl_Object.call(this);
    this.$value8 = 0.0;
}
let ca_NumberExpr_execute = ($this, $ctx) => {
    return cav_NumberValue__init_($this.$value8);
};
function ca_VariableNode() {
    jl_Object.call(this);
    this.$identifier = null;
}
let ca_VariableNode_execute = ($this, $ctx) => {
    let var$2, var$3;
    var$2 = $this.$identifier;
    if (ju_HashMap_entryByKey($ctx.$variables, var$2) === null ? 0 : 1) {
        $ctx = ju_HashMap_entryByKey($ctx.$variables, var$2);
        return $ctx === null ? null : $ctx.$value2;
    }
    $ctx = new ceu_ContextNotFoundException;
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    jl_AbstractStringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(316)), var$2), 39);
    var$2 = jl_AbstractStringBuilder_toString(var$3);
    jl_Exception__init_0($ctx, var$2);
    $ctx.$string6 = var$2;
    $rt_throw($ctx);
},
otcit_DoubleSynthesizer = $rt_classWithoutFields(),
otcit_DoubleSynthesizer_mantissa10Table = null,
otcit_DoubleSynthesizer_exp10Table = null,
otcit_DoubleSynthesizer_$callClinit = () => {
    otcit_DoubleSynthesizer_$callClinit = $rt_eraseClinit(otcit_DoubleSynthesizer);
    otcit_DoubleSynthesizer__clinit_();
},
otcit_DoubleSynthesizer_synthesizeDouble = ($mantissa, $exp, $negative) => {
    let $indexInTable, var$5, $binMantissa, $binExp, $binMantissaShift, $low, $iee754, $binMantissaWithoutError, $error, $correction, $cmp;
    otcit_DoubleSynthesizer_$callClinit();
    $indexInTable = 330 + $exp | 0;
    if (Long_ne($mantissa, Long_ZERO) && $indexInTable >= 0) {
        var$5 = otcit_DoubleSynthesizer_mantissa10Table.data;
        if ($indexInTable >= var$5.length)
            return !$negative ? Infinity : (-Infinity);
        $binMantissa = otcit_DoubleAnalyzer_mulAndShiftRight($mantissa, var$5[$indexInTable], 0);
        $binExp = otcit_DoubleSynthesizer_exp10Table.data[$indexInTable];
        jl_Long_$callClinit();
        if (Long_eq($binMantissa, Long_ZERO))
            $exp = 64;
        else {
            $binMantissaShift = 0;
            $low = Long_shru($binMantissa, 32);
            if (Long_ne($low, Long_ZERO))
                $binMantissaShift = 32;
            else
                $low = $binMantissa;
            $iee754 = Long_shru($low, 16);
            if (Long_eq($iee754, Long_ZERO))
                $iee754 = $low;
            else
                $binMantissaShift = $binMantissaShift | 16;
            $binMantissaWithoutError = Long_shru($iee754, 8);
            if (Long_eq($binMantissaWithoutError, Long_ZERO))
                $binMantissaWithoutError = $iee754;
            else
                $binMantissaShift = $binMantissaShift | 8;
            $iee754 = Long_shru($binMantissaWithoutError, 4);
            if (Long_eq($iee754, Long_ZERO))
                $iee754 = $binMantissaWithoutError;
            else
                $binMantissaShift = $binMantissaShift | 4;
            $binMantissaWithoutError = Long_shru($iee754, 2);
            if (Long_eq($binMantissaWithoutError, Long_ZERO))
                $binMantissaWithoutError = $iee754;
            else
                $binMantissaShift = $binMantissaShift | 2;
            if (Long_ne(Long_shru($binMantissaWithoutError, 1), Long_ZERO))
                $binMantissaShift = $binMantissaShift | 1;
            $exp = (64 - $binMantissaShift | 0) - 1 | 0;
        }
        $binMantissaShift = (64 - $exp | 0) - 58 | 0;
        $iee754 = $binMantissaShift >= 0 ? Long_shru($binMantissa, $binMantissaShift) : Long_shl($binMantissa,  -$binMantissaShift | 0);
        $exp = $binExp + $binMantissaShift | 0;
        if ($exp >= 2047)
            return !$negative ? Infinity : (-Infinity);
        $error = Long_lo(Long_and($iee754, Long_fromInt(31)));
        $correction = 16;
        $binMantissaShift = $error - 16 | 0;
        if ($binMantissaShift < 0)
            $binMantissaShift =  -$binMantissaShift | 0;
        if ($binMantissaShift <= 1) {
            $binMantissaWithoutError = Long_and($iee754, Long_fromInt(-32));
            $cmp = jl_Long_compareUnsigned(Long_sub($mantissa, otcit_DoubleSynthesizer_calcDecMantissa($binMantissaWithoutError, 32, $indexInTable, $exp)), Long_sub(otcit_DoubleSynthesizer_calcDecMantissa(Long_add($binMantissaWithoutError, Long_fromInt(32)), 32, $indexInTable, $exp), $mantissa));
            if ($cmp < 0)
                $correction =  -$error | 0;
            else if ($cmp > 0)
                $correction = 32 - $error | 0;
        }
        $mantissa = Long_add($iee754, Long_fromInt($correction));
        if (Long_ne(Long_and($mantissa, Long_create(0, 4227858432)), Long_ZERO)) {
            $mantissa = Long_shru($mantissa, 1);
            $exp = $exp + 1 | 0;
        }
        if ($exp <= 0) {
            $mantissa = Long_shr($mantissa, jl_Math_min(( -$exp | 0) + 1 | 0, 64));
            $exp = 0;
        }
        $iee754 = Long_or(Long_and(Long_shru($mantissa, 5), Long_create(4294967295, 1048575)), Long_shl(Long_fromInt($exp), 52));
        if ($negative)
            $iee754 = Long_xor($iee754, Long_create(0, 2147483648));
        return $rt_longBitsToDouble($iee754);
    }
    return $rt_longBitsToDouble((!$negative ? Long_ZERO : Long_create(0, 2147483648)));
},
otcit_DoubleSynthesizer_calcDecMantissa = ($mantissa, $lowerBit, $indexInTable, $binExp) => {
    let $half, $shift, $decMantissa, $lowerPos, $decMantissaHi, $upperPos, $posCmp;
    otcit_DoubleSynthesizer_$callClinit();
    $half = $lowerBit >>> 1 | 0;
    otcit_DoubleAnalyzer_$callClinit();
    $shift = 7 - (otcit_DoubleAnalyzer_exp10Table.data[$indexInTable] - $binExp | 0) | 0;
    $decMantissa = otcit_DoubleAnalyzer_mulAndShiftRight($mantissa, otcit_DoubleAnalyzer_mantissa10Table.data[$indexInTable], $shift);
    $lowerPos = Long_fromInt($half);
    $decMantissaHi = otcit_DoubleAnalyzer_mulAndShiftRight(Long_add($mantissa, $lowerPos), otcit_DoubleAnalyzer_mantissa10Table.data[$indexInTable], $shift);
    $lowerPos = otcit_DoubleAnalyzer_findLowerDistance($decMantissa, otcit_DoubleAnalyzer_mulAndShiftRight(Long_sub($mantissa, $lowerPos), otcit_DoubleAnalyzer_mantissa10Table.data[$indexInTable], $shift));
    $upperPos = otcit_DoubleAnalyzer_findUpperDistance($decMantissa, $decMantissaHi);
    $posCmp = jl_Long_compareUnsigned($lowerPos, $upperPos);
    return $posCmp > 0 ? Long_mul(jl_Long_divideUnsigned($decMantissa, $lowerPos), $lowerPos) : $posCmp < 0 ? Long_add(Long_mul(jl_Long_divideUnsigned($decMantissa, $upperPos), $upperPos), $upperPos) : Long_mul(jl_Long_divideUnsigned(Long_add($decMantissa, Long_div($upperPos, Long_fromInt(2))), $upperPos), $upperPos);
},
otcit_DoubleSynthesizer__clinit_ = () => {
    otcit_DoubleSynthesizer_mantissa10Table = $rt_createLongArrayFromData([Long_create(136053384, 4203730336), Long_create(85033365, 2627331460), Long_create(106291706, 3284164325), Long_create(1206606457, 4105205406), Long_create(3975354508, 2565753378), Long_create(2821709486, 3207191723), Long_create(2453395034, 4008989654), Long_create(459630072, 2505618534), Long_create(2722021238, 3132023167), Long_create(2328784724, 3915028959), Long_create(3066103188, 2446893099), Long_create(2758887162, 3058616374),
    Long_create(1301125304, 3823270468), Long_create(2960686963, 2389544042), Long_create(1553375056, 2986930053), Long_create(3015460644, 3733662566), Long_create(810921078, 2333539104), Long_create(1013651348, 2916923880), Long_create(1267064185, 3646154850), Long_create(1865656940, 2278846781), Long_create(3405812998, 2848558476), Long_create(4257266248, 3560698095), Long_create(4271404141, 2225436309), Long_create(2118029704, 2781795387), Long_create(1573795306, 3477244234), Long_create(2057363890, 2173277646),
    Long_create(424221215, 2716597058), Long_create(2677760167, 3395746322), Long_create(1199716561, 4244682903), Long_create(2360435586, 2652926814), Long_create(803060835, 3316158518), Long_create(3151309692, 4145198147), Long_create(1432697645, 2590748842), Long_create(3938355705, 3238436052), Long_create(627977335, 4048045066), Long_create(1466227658, 2530028166), Long_create(3980268221, 3162535207), Long_create(3901593452, 3953169009), Long_create(827883171, 2470730631), Long_create(4256079436, 3088413288),
    Long_create(1025131999, 3860516611), Long_create(103836588, 2412822882), Long_create(2277279383, 3016028602), Long_create(699115580, 3770035753), Long_create(3121301798, 2356272345), Long_create(680401775, 2945340432), Long_create(850502219, 3681675540), Long_create(2679047535, 2301047212), Long_create(3348809418, 2876309015), Long_create(3112269949, 3595386269), Long_create(2482039630, 2247116418), Long_create(955065890, 2808895523), Long_create(120090538, 3511119404), Long_create(2222540234, 2194449627),
    Long_create(1704433469, 2743062034), Long_create(4278025484, 3428827542), Long_create(3200048207, 4286034428), Long_create(4147513777, 2678771517), Long_create(1963166750, 3348464397), Long_create(3527700261, 4185580496), Long_create(2204812663, 2615987810), Long_create(608532181, 3269984763), Long_create(3981890698, 4087480953), Long_create(878068951, 2554675596), Long_create(1097586188, 3193344495), Long_create(298240911, 3991680619), Long_create(3944496953, 2494800386), Long_create(2783137544, 3118500483),
    Long_create(2405180106, 3898125604), Long_create(3650721214, 2436328502), Long_create(2415917870, 3045410628), Long_create(3019897337, 3806763285), Long_create(2424306748, 2379227053), Long_create(4104125259, 2974033816), Long_create(835189277, 3717542271), Long_create(2132606034, 2323463919), Long_create(1592015719, 2904329899), Long_create(916277825, 3630412374), Long_create(3793899112, 2269007733), Long_create(1521148418, 2836259667), Long_create(827693699, 3545324584), Long_create(517308562, 2215827865),
    Long_create(1720377526, 2769784831), Long_create(1076730084, 3462231039), Long_create(2283569038, 2163894399), Long_create(1780719474, 2704867999), Long_create(1152157519, 3381084999), Long_create(366455074, 4226356249), Long_create(2913388981, 2641472655), Long_create(2567994403, 3301840819), Long_create(2136251179, 4127301024), Long_create(1335156987, 2579563140), Long_create(1668946234, 3224453925), Long_create(3159924616, 4030567406), Long_create(901211061, 2519104629), Long_create(2200255651, 3148880786),
    Long_create(602835915, 3936100983), Long_create(1987385183, 2460063114), Long_create(336747831, 3075078893), Long_create(1494676613, 3843848616), Long_create(934172883, 2402405385), Long_create(2241457928, 3003006731), Long_create(1728080585, 3753758414), Long_create(6308542, 2346099009), Long_create(1081627501, 2932623761), Long_create(2425776201, 3665779701), Long_create(2052981037, 2291112313), Long_create(3639968121, 2863890391), Long_create(3476218327, 3579862989), Long_create(2709507366, 2237414368),
    Long_create(3386884208, 2796767960), Long_create(4233605260, 3495959950), Long_create(1572261463, 2184974969), Long_create(3039068653, 2731218711), Long_create(2725093993, 3414023389), Long_create(185142019, 4267529237), Long_create(652584674, 2667205773), Long_create(1889472666, 3334007216), Long_create(2361840833, 4167509020), Long_create(3623634168, 2604693137), Long_create(1308317239, 3255866422), Long_create(3782880196, 4069833027), Long_create(1827429211, 2543645642), Long_create(136802865, 3179557053),
    Long_create(1244745406, 3974446316), Long_create(2925449527, 2484028947), Long_create(2583070084, 3105036184), Long_create(3228837605, 3881295230), Long_create(944281679, 2425809519), Long_create(106610275, 3032261899), Long_create(3354488316, 3790327373), Long_create(2633426109, 2368954608), Long_create(3291782637, 2961193260), Long_create(4114728296, 3701491575), Long_create(4182317921, 2313432234), Long_create(3080413753, 2891790293), Long_create(629291719, 3614737867), Long_create(4151403709, 2259211166),
    Long_create(3041770988, 2824013958), Long_create(1654730087, 3530017448), Long_create(1034206304, 2206260905), Long_create(2366499704, 2757826131), Long_create(1884382806, 3447282664), Long_create(1177739254, 2154551665), Long_create(2545915892, 2693189581), Long_create(4256136688, 3366486976), Long_create(1025203564, 4208108721), Long_create(3325106788, 2630067950), Long_create(2008899837, 3287584938), Long_create(363641148, 4109481173), Long_create(764146629, 2568425733), Long_create(2028925111, 3210532166),
    Long_create(388672741, 4013165208), Long_create(242920463, 2508228255), Long_create(3524876051, 3135285318), Long_create(2258611415, 3919106648), Long_create(1411632134, 2449441655), Long_create(690798344, 3061802069), Long_create(1937239754, 3827252586), Long_create(2284516670, 2392032866), Long_create(708162190, 2990041083), Long_create(4106428209, 3737551353), Long_create(955904895, 2335969596), Long_create(1194881119, 2919961995), Long_create(419859574, 3649952494), Long_create(3483637706, 2281220308),
    Long_create(59579836, 2851525386), Long_create(2221958443, 3564406732), Long_create(3536207675, 2227754207), Long_create(3346517770, 2784692759), Long_create(3109405388, 3480865949), Long_create(2480249280, 2175541218), Long_create(952827952, 2719426523), Long_create(117293116, 3399283154), Long_create(2294100043, 4249103942), Long_create(360070703, 2655689964), Long_create(450088378, 3319612455), Long_create(3783835945, 4149515568), Long_create(2364897466, 2593447230), Long_create(808638184, 3241809038),
    Long_create(3158281378, 4052261297), Long_create(363313125, 2532663311), Long_create(3675366878, 3165829138), Long_create(2446724950, 3957286423), Long_create(3139815830, 2473304014), Long_create(1777286139, 3091630018), Long_create(74124026, 3864537523), Long_create(3804423900, 2415335951), Long_create(3681788051, 3019169939), Long_create(3528493240, 3773962424), Long_create(2205308275, 2358726515), Long_create(1682893520, 2948408144), Long_create(2103616900, 3685510180), Long_create(3462244210, 2303443862),
    Long_create(2180321615, 2879304828), Long_create(2725402019, 3599131035), Long_create(1166505350, 2249456897), Long_create(2531873511, 2811821121), Long_create(4238583713, 3514776401), Long_create(1038502085, 2196735251), Long_create(224385782, 2745919064), Long_create(280482227, 3432398830), Long_create(2498086432, 4290498537), Long_create(4245658580, 2681561585), Long_create(2085847753, 3351951982), Long_create(459826043, 4189939978), Long_create(1361133101, 2618712486), Long_create(3848900024, 3273390607),
    Long_create(3737383206, 4091738259), Long_create(1798993592, 2557336412), Long_create(2248741990, 3196670515), Long_create(1737185663, 3995838144), Long_create(1085741040, 2497398840), Long_create(1357176300, 3121748550), Long_create(3843954022, 3902185687), Long_create(4013084000, 2438866054), Long_create(2868871352, 3048582568), Long_create(3586089190, 3810728210), Long_create(3315047568, 2381705131), Long_create(3070067636, 2977131414), Long_create(1690100897, 3721414268), Long_create(3203796708, 2325883917),
    Long_create(783520414, 2907354897), Long_create(2053142341, 3634193621), Long_create(1820084875, 2271371013), Long_create(3348847918, 2839213766), Long_create(2038576249, 3549017208), Long_create(1274110156, 2218135755), Long_create(518895871, 2772669694), Long_create(2796103486, 3465837117), Long_create(2284435591, 2166148198), Long_create(708060841, 2707685248), Long_create(885076051, 3384606560), Long_create(1106345064, 4230758200), Long_create(691465665, 2644223875), Long_create(4085557553, 3305279843),
    Long_create(4033205117, 4131599804), Long_create(373269550, 2582249878), Long_create(2614070586, 3227812347), Long_create(2193846408, 4034765434), Long_create(2444895829, 2521728396), Long_create(3056119787, 3152160495), Long_create(2746407909, 3940200619), Long_create(1179634031, 2462625387), Long_create(400800715, 3078281734), Long_create(2648484542, 3847852167), Long_create(3265915575, 2404907604), Long_create(4082394468, 3006134505), Long_create(1881767613, 3757668132), Long_create(3323588406, 2348542582),
    Long_create(2007001860, 2935678228), Long_create(2508752325, 3669597785), Long_create(4252324763, 2293498615), Long_create(4241664130, 2866873269), Long_create(2080854690, 3583591587), Long_create(763663269, 2239744742), Long_create(3102062735, 2799680927), Long_create(2803836594, 3499601159), Long_create(3363010608, 2187250724), Long_create(4203763259, 2734063405), Long_create(2033478602, 3417579257), Long_create(3615590077, 4271974071), Long_create(3870356534, 2669983794), Long_create(2690462020, 3337479743),
    Long_create(2289335700, 4171849679), Long_create(3041447549, 2607406049), Long_create(580583964, 3259257562), Long_create(2873213603, 4074071952), Long_create(1795758502, 2546294970), Long_create(97214479, 3182868713), Long_create(1195259923, 3978585891), Long_create(210166540, 2486616182), Long_create(2410191823, 3108270227), Long_create(1938997955, 3885337784), Long_create(1211873722, 2428336115), Long_create(441100328, 3035420144), Long_create(551375410, 3794275180), Long_create(2492093279, 2371421987),
    Long_create(2041374775, 2964277484), Long_create(2551718469, 3705346855), Long_create(3205436779, 2315841784), Long_create(4006795974, 2894802230), Long_create(2861011319, 3618502788), Long_create(3935615723, 2261564242), Long_create(2772036005, 2826955303), Long_create(2391303183, 3533694129), Long_create(4178919049, 2208558830), Long_create(3076165163, 2760698538), Long_create(1697722806, 3450873173), Long_create(1597947666, 2156795733), Long_create(3071176406, 2695994666), Long_create(1691486860, 3369993333),
    Long_create(3188100399, 4212491666), Long_create(3066304573, 2632807291), Long_create(2759138893, 3291009114), Long_create(1301439968, 4113761393), Long_create(3497754540, 2571100870), Long_create(2224709527, 3213876088), Long_create(2780886909, 4017345110), Long_create(664312494, 2510840694), Long_create(2977874265, 3138550867), Long_create(2648601008, 3923188584), Long_create(1655375630, 2451992865), Long_create(3142961361, 3064991081), Long_create(707476230, 3831238852), Long_create(2589656291, 2394524282),
    Long_create(1089586716, 2993155353), Long_create(2435725219, 3741444191), Long_create(3132940998, 2338402619), Long_create(2842434424, 2923003274), Long_create(1405559382, 3653754093), Long_create(1415345525, 2283596308), Long_create(1769181907, 2854495385), Long_create(3285219208, 3568119231), Long_create(3663874741, 2230074519), Long_create(3506101602, 2787593149), Long_create(1161401530, 3484491437), Long_create(1262746869, 2177807148), Long_create(1578433586, 2722258935), Long_create(899300158, 3402823669),
    Long_create(2197867022, 4253529586), Long_create(2447408712, 2658455991), Long_create(1985519067, 3323069989), Long_create(3555640657, 4153837486), Long_create(1148533587, 2596148429), Long_create(2509408807, 3245185536), Long_create(3136761009, 4056481920), Long_create(1960475631, 2535301200), Long_create(2450594539, 3169126500), Long_create(3063243173, 3961408125), Long_create(2451397895, 2475880078), Long_create(916763721, 3094850098), Long_create(3293438299, 3868562622), Long_create(984657113, 2417851639),
    Long_create(157079567, 3022314549), Long_create(1270091283, 3777893186), Long_create(1867548876, 2361183241), Long_create(3408177919, 2951479051), Long_create(3186480575, 3689348814), Long_create(917808535, 2305843009), Long_create(2221002493, 2882303761), Long_create(3849994940, 3602879701), Long_create(2943117750, 2251799813), Long_create(457671715, 2814749767), Long_create(3793315116, 3518437208), Long_create(2370821947, 2199023255), Long_create(1889785610, 2748779069), Long_create(3435973837, 3435973836),
    Long_create(0, 2147483648), Long_create(0, 2684354560), Long_create(0, 3355443200), Long_create(0, 4194304000), Long_create(0, 2621440000), Long_create(0, 3276800000), Long_create(0, 4096000000), Long_create(0, 2560000000), Long_create(0, 3200000000), Long_create(0, 4000000000), Long_create(0, 2500000000), Long_create(0, 3125000000), Long_create(0, 3906250000), Long_create(0, 2441406250), Long_create(2147483648, 3051757812), Long_create(2684354560, 3814697265), Long_create(67108864, 2384185791), Long_create(3305111552, 2980232238),
    Long_create(1983905792, 3725290298), Long_create(2313682944, 2328306436), Long_create(2892103680, 2910383045), Long_create(393904128, 3637978807), Long_create(1856802816, 2273736754), Long_create(173519872, 2842170943), Long_create(3438125312, 3552713678), Long_create(1075086496, 2220446049), Long_create(2417599944, 2775557561), Long_create(4095741754, 3469446951), Long_create(4170451332, 2168404344), Long_create(918096869, 2710505431), Long_create(73879263, 3388131789), Long_create(1166090902, 4235164736),
    Long_create(728806814, 2646977960), Long_create(911008517, 3308722450), Long_create(3286244295, 4135903062), Long_create(980160860, 2584939414), Long_create(3372684723, 3231174267), Long_create(3142114080, 4038967834), Long_create(3037563124, 2524354896), Long_create(3796953905, 3155443620), Long_create(451225085, 3944304526), Long_create(3503241150, 2465190328), Long_create(84084142, 3081487911), Long_create(3326330649, 3851859888), Long_create(2078956656, 2407412430), Long_create(451212172, 3009265538),
    Long_create(2711498863, 3761581922), Long_create(2768428613, 2350988701), Long_create(239310295, 2938735877), Long_create(1372879692, 3673419846), Long_create(4079275280, 2295887403), Long_create(4025352276, 2869859254), Long_create(2884206696, 3587324068), Long_create(3950112833, 2242077542), Long_create(2790157394, 2802596928), Long_create(3487696742, 3503246160), Long_create(2179810464, 2189528850), Long_create(577279432, 2736911063), Long_create(3942824762, 3421138828), Long_create(633563656, 4276423536),
    Long_create(395977285, 2672764710), Long_create(2642455254, 3340955887), Long_create(2229327244, 4176194859), Long_create(856458615, 2610121787), Long_create(4291798741, 3262652233), Long_create(2143522955, 4078315292), Long_create(3487185495, 2548947057), Long_create(1137756396, 3186183822), Long_create(3569679143, 3982729777), Long_create(620436729, 2489206111), Long_create(3996771383, 3111507638), Long_create(2848480580, 3889384548), Long_create(3927784011, 2430865342), Long_create(2762246365, 3038581678),
    Long_create(1305324309, 3798227098), Long_create(1889569517, 2373891936), Long_create(2361961896, 2967364920), Long_create(2952452370, 3709206150), Long_create(771540907, 2318253844), Long_create(964426134, 2897817305), Long_create(2279274492, 3622271631), Long_create(3035159293, 2263919769), Long_create(572723645, 2829899712), Long_create(715904556, 3537374640), Long_create(447440347, 2210859150), Long_create(2706784082, 2763573937), Long_create(162254631, 3454467422), Long_create(3322634616, 2159042138),
    Long_create(2005809622, 2698802673), Long_create(3581003852, 3373503341), Long_create(1255029343, 4216879177), Long_create(3468747899, 2635549485), Long_create(1114709402, 3294436857), Long_create(2467128577, 4118046071), Long_create(3152568096, 2573778794), Long_create(1793226473, 3217223493), Long_create(3315274915, 4021529366), Long_create(998304998, 2513455854), Long_create(3395364895, 3141819817), Long_create(1022980647, 3927274772), Long_create(2786846552, 2454546732), Long_create(3483558190, 3068183415),
    Long_create(3280705914, 3835229269), Long_create(2587312108, 2397018293), Long_create(12914663, 2996272867), Long_create(3237368801, 3745341083), Long_create(1486484589, 2340838177), Long_create(2931847560, 2926047721), Long_create(443583978, 3657559652), Long_create(2424723634, 2285974782), Long_create(883420895, 2857468478), Long_create(3251759766, 3571835597), Long_create(2569220766, 2232397248), Long_create(3211525958, 2790496560), Long_create(4014407447, 3488120700), Long_create(361521006, 2180075438),
    Long_create(2599384906, 2725094297), Long_create(28005660, 3406367872), Long_create(35007075, 4257959840), Long_create(21879422, 2661224900), Long_create(27349278, 3326531125), Long_create(1107928421, 4158163906), Long_create(1766197087, 2598852441), Long_create(3281488183, 3248565551), Long_create(3028118405, 4060706939), Long_create(1355703091, 2537941837), Long_create(2768370688, 3172427296), Long_create(3460463360, 3965534120), Long_create(2162789600, 2478458825), Long_create(3777228824, 3098073531),
    Long_create(3647794206, 3872591914), Long_create(3353613203, 2420369946), Long_create(2044532855, 3025462433), Long_create(3629407893, 3781828041), Long_create(657767197, 2363642526), Long_create(2969692644, 2954553157), Long_create(490890333, 3693191447), Long_create(1917419194, 2308244654), Long_create(249290345, 2885305818), Long_create(2459096579, 3606632272), Long_create(1536935362, 2254145170), Long_create(4068652851, 2817681462), Long_create(2938332415, 3522101828), Long_create(3983941407, 2201313642),
    Long_create(2832443111, 2751642053), Long_create(319328417, 3439552567), Long_create(1810192997, 2149720354), Long_create(115257598, 2687150443), Long_create(3365297469, 3358938053), Long_create(985396365, 4198672567), Long_create(2226485464, 2624170354), Long_create(635623182, 3280212943), Long_create(4015754449, 4100266178), Long_create(3583588355, 2562666361), Long_create(1258259972, 3203332952), Long_create(1572824965, 4004166190), Long_create(4204241075, 2502603868), Long_create(960334048, 3128254836),
    Long_create(1200417559, 3910318545), Long_create(3434615535, 2443949090), Long_create(2145785770, 3054936363), Long_create(1608490389, 3818670454), Long_create(4226531965, 2386669033), Long_create(2061939484, 2983336292), Long_create(2577424355, 3729170365), Long_create(2147761134, 2330731478), Long_create(537217770, 2913414348), Long_create(671522212, 3641767935), Long_create(2030314119, 2276104959), Long_create(1464150824, 2845131199), Long_create(756446706, 3556413999), Long_create(2083391927, 2222758749),
    Long_create(3677981733, 2778448436), Long_create(302509871, 3473060546), Long_create(1262810493, 2170662841), Long_create(2652254940, 2713328551), Long_create(2241576851, 3391660689), Long_create(3875712888, 4239575861), Long_create(2959191467, 2649734913), Long_create(477763862, 3312168642), Long_create(2744688476, 4140210802), Long_create(2789172121, 2587631751), Long_create(2412723328, 3234539689), Long_create(4089645983, 4043174611), Long_create(2019157828, 2526984132), Long_create(2523947285, 3158730165),
    Long_create(4228675930, 3948412706), Long_create(3716664280, 2467757941), Long_create(1424604878, 3084697427), Long_create(707014274, 3855871784), Long_create(441883921, 2409919865), Long_create(1626096725, 3012399831), Long_create(958879083, 3765499789), Long_create(1136170339, 2353437368), Long_create(1420212923, 2941796710), Long_create(3922749802, 3677245887), Long_create(4062331362, 2298278679), Long_create(4004172379, 2872848349), Long_create(1783990002, 3591060437), Long_create(1651864663, 2244412773),
    Long_create(3138572653, 2805515966), Long_create(1775732168, 3506894958), Long_create(36090781, 2191809349), Long_create(1118855300, 2739761686), Long_create(3546052773, 3424702107), Long_create(3358824142, 4280877634), Long_create(3173006913, 2675548521), Long_create(745033169, 3344435652), Long_create(931291462, 4180544565), Long_create(1118928076, 2612840353), Long_create(2472401918, 3266050441), Long_create(4164244222, 4082563051), Long_create(2065781727, 2551601907), Long_create(1508485334, 3189502384),
    Long_create(1885606668, 3986877980), Long_create(3325987816, 2491798737), Long_create(936259297, 3114748422), Long_create(3317807770, 3893435527), Long_create(3684242592, 2433397204), Long_create(310335944, 3041746506), Long_create(2535403578, 3802183132), Long_create(3732110884, 2376364457), Long_create(1443913133, 2970455572), Long_create(1804891417, 3713069465), Long_create(3812411696, 2320668415), Long_create(3691772795, 2900835519), Long_create(3540974170, 3626044399), Long_create(3823721592, 2266277749),
    Long_create(1558426518, 2832847187), Long_create(874291324, 3541058984), Long_create(546432078, 2213161865), Long_create(1756781921, 2766452331), Long_create(1122235577, 3458065414), Long_create(3922622708, 2161290883), Long_create(3829536561, 2701613604), Long_create(491953405, 3377017006), Long_create(2762425404, 4221271257), Long_create(115903142, 2638294536), Long_create(144878927, 3297868170), Long_create(2328582307, 4122335212), Long_create(3602847590, 2576459507), Long_create(3429817663, 3220574384),
    Long_create(4287272079, 4025717980), Long_create(532061401, 2516073738), Long_create(2812560400, 3145092172), Long_create(3515700500, 3931365215), Long_create(3807925548, 2457103259), Long_create(3686165111, 3071379074), Long_create(2460222741, 3839223843), Long_create(1000768301, 2399514902), Long_create(3398444024, 2999393627), Long_create(3174313207, 3749242034), Long_create(3057687578, 2343276271), Long_create(2748367649, 2929095339), Long_create(2361717737, 3661369174), Long_create(402331761, 2288355734),
    Long_create(2650398350, 2860444667), Long_create(2239256113, 3575555834), Long_create(2473276895, 2234722396), Long_create(3091596119, 2793402995), Long_create(2790753324, 3491753744), Long_create(1744220828, 2182346090), Long_create(32792387, 2727932613), Long_create(1114732307, 3409915766), Long_create(3540899032, 4262394707), Long_create(1676190983, 2663996692), Long_create(2095238729, 3329995865), Long_create(3692790235, 4162494831), Long_create(3918606633, 2601559269), Long_create(1677032819, 3251949087),
    Long_create(1022549200, 4064936359), Long_create(2249705986, 2540585224), Long_create(2812132482, 3175731530), Long_create(1367681955, 3969664413), Long_create(1391672134, 2481040258), Long_create(3887073815, 3101300322), Long_create(2711358621, 3876625403), Long_create(1157728226, 2422890877), Long_create(2520902107, 3028613596), Long_create(3151127633, 3785766995), Long_create(1432583859, 2366104372), Long_create(1790729824, 2957630465), Long_create(3312154103, 3697038081), Long_create(459483579, 2310648801),
    Long_create(1648096297, 2888311001), Long_create(3133862196, 3610388751), Long_create(3569276608, 2256492969), Long_create(1240370288, 2820616212), Long_create(1550462860, 3525770265), Long_create(3653393848, 2203606415), Long_create(3493000486, 2754508019), Long_create(3292508783, 3443135024), Long_create(2057817989, 2151959390), Long_create(424788839, 2689949238), Long_create(2678469697, 3362436547), Long_create(2274345297, 4203045684), Long_create(3568949458, 2626903552), Long_create(166219527, 3283629441),
    Long_create(1281516233, 4104536801), Long_create(3485302206, 2565335500), Long_create(61660461, 3206669376), Long_create(77075576, 4008336720), Long_create(48172235, 2505210450), Long_create(2207698942, 3131513062), Long_create(612140029, 3914391328), Long_create(382587518, 2446494580), Long_create(478234398, 3058118225), Long_create(1671534821, 3822647781), Long_create(1581580175, 2389154863), Long_create(903233395, 2986443579), Long_create(55299920, 3733054474), Long_create(1108304274, 2333159046)]);
    otcit_DoubleSynthesizer_exp10Table = $rt_createShortArrayFromData([(-76), (-72), (-69), (-66), (-62), (-59), (-56), (-52), (-49), (-46), (-42), (-39), (-36), (-32), (-29), (-26), (-22), (-19), (-16), (-12), (-9), (-6), (-2), 1, 4, 8, 11, 14, 17, 21, 24, 27, 31, 34, 37, 41, 44, 47, 51, 54, 57, 61, 64, 67, 71, 74, 77, 81, 84, 87, 91, 94, 97, 101, 104, 107, 110, 114, 117, 120, 124, 127, 130, 134, 137, 140, 144, 147, 150, 154, 157, 160, 164, 167, 170, 174, 177, 180, 184, 187, 190, 194, 197, 200, 204, 207, 210,
    213, 217, 220, 223, 227, 230, 233, 237, 240, 243, 247, 250, 253, 257, 260, 263, 267, 270, 273, 277, 280, 283, 287, 290, 293, 297, 300, 303, 306, 310, 313, 316, 320, 323, 326, 330, 333, 336, 340, 343, 346, 350, 353, 356, 360, 363, 366, 370, 373, 376, 380, 383, 386, 390, 393, 396, 400, 403, 406, 409, 413, 416, 419, 423, 426, 429, 433, 436, 439, 443, 446, 449, 453, 456, 459, 463, 466, 469, 473, 476, 479, 483, 486, 489, 493, 496, 499, 502, 506, 509, 512, 516, 519, 522, 526, 529, 532, 536, 539, 542, 546, 549,
    552, 556, 559, 562, 566, 569, 572, 576, 579, 582, 586, 589, 592, 595, 599, 602, 605, 609, 612, 615, 619, 622, 625, 629, 632, 635, 639, 642, 645, 649, 652, 655, 659, 662, 665, 669, 672, 675, 679, 682, 685, 689, 692, 695, 698, 702, 705, 708, 712, 715, 718, 722, 725, 728, 732, 735, 738, 742, 745, 748, 752, 755, 758, 762, 765, 768, 772, 775, 778, 782, 785, 788, 791, 795, 798, 801, 805, 808, 811, 815, 818, 821, 825, 828, 831, 835, 838, 841, 845, 848, 851, 855, 858, 861, 865, 868, 871, 875, 878, 881, 885, 888,
    891, 894, 898, 901, 904, 908, 911, 914, 918, 921, 924, 928, 931, 934, 938, 941, 944, 948, 951, 954, 958, 961, 964, 968, 971, 974, 978, 981, 984, 987, 991, 994, 997, 1001, 1004, 1007, 1011, 1014, 1017, 1021, 1024, 1027, 1031, 1034, 1037, 1041, 1044, 1047, 1051, 1054, 1057, 1061, 1064, 1067, 1071, 1074, 1077, 1081, 1084, 1087, 1090, 1094, 1097, 1100, 1104, 1107, 1110, 1114, 1117, 1120, 1124, 1127, 1130, 1134, 1137, 1140, 1144, 1147, 1150, 1154, 1157, 1160, 1164, 1167, 1170, 1174, 1177, 1180, 1183, 1187, 1190,
    1193, 1197, 1200, 1203, 1207, 1210, 1213, 1217, 1220, 1223, 1227, 1230, 1233, 1237, 1240, 1243, 1247, 1250, 1253, 1257, 1260, 1263, 1267, 1270, 1273, 1276, 1280, 1283, 1286, 1290, 1293, 1296, 1300, 1303, 1306, 1310, 1313, 1316, 1320, 1323, 1326, 1330, 1333, 1336, 1340, 1343, 1346, 1350, 1353, 1356, 1360, 1363, 1366, 1370, 1373, 1376, 1379, 1383, 1386, 1389, 1393, 1396, 1399, 1403, 1406, 1409, 1413, 1416, 1419, 1423, 1426, 1429, 1433, 1436, 1439, 1443, 1446, 1449, 1453, 1456, 1459, 1463, 1466, 1469, 1472,
    1476, 1479, 1482, 1486, 1489, 1492, 1496, 1499, 1502, 1506, 1509, 1512, 1516, 1519, 1522, 1526, 1529, 1532, 1536, 1539, 1542, 1546, 1549, 1552, 1556, 1559, 1562, 1566, 1569, 1572, 1575, 1579, 1582, 1585, 1589, 1592, 1595, 1599, 1602, 1605, 1609, 1612, 1615, 1619, 1622, 1625, 1629, 1632, 1635, 1639, 1642, 1645, 1649, 1652, 1655, 1659, 1662, 1665, 1668, 1672, 1675, 1678, 1682, 1685, 1688, 1692, 1695, 1698, 1702, 1705, 1708, 1712, 1715, 1718, 1722, 1725, 1728, 1732, 1735, 1738, 1742, 1745, 1748, 1752, 1755,
    1758, 1761, 1765, 1768, 1771, 1775, 1778, 1781, 1785, 1788, 1791, 1795, 1798, 1801, 1805, 1808, 1811, 1815, 1818, 1821, 1825, 1828, 1831, 1835, 1838, 1841, 1845, 1848, 1851, 1855, 1858, 1861, 1864, 1868, 1871, 1874, 1878, 1881, 1884, 1888, 1891, 1894, 1898, 1901, 1904, 1908, 1911, 1914, 1918, 1921, 1924, 1928, 1931, 1934, 1938, 1941, 1944, 1948, 1951, 1954, 1957, 1961, 1964, 1967, 1971, 1974, 1977, 1981, 1984, 1987, 1991, 1994, 1997, 2001, 2004, 2007, 2011, 2014, 2017, 2021, 2024, 2027, 2031, 2034, 2037,
    2041, 2044, 2047, 2051, 2054, 2057, 2060, 2064, 2067, 2070, 2074, 2077, 2080, 2084, 2087, 2090, 2094, 2097, 2100, 2104, 2107, 2110, 2114]);
},
jl_Long = $rt_classWithoutFields(jl_Number),
jl_Long_TYPE = null,
jl_Long_$callClinit = () => {
    jl_Long_$callClinit = $rt_eraseClinit(jl_Long);
    jl_Long__clinit_();
},
jl_Long_divideUnsigned = (var$1, var$2) => {
    return Long_udiv(var$1, var$2);
},
jl_Long_compareUnsigned = (var$1, var$2) => {
    return Long_ucompare(var$1, var$2);
},
jl_Long__clinit_ = () => {
    jl_Long_TYPE = $rt_cls($rt_longcls);
},
otcit_DoubleAnalyzer = $rt_classWithoutFields(),
otcit_DoubleAnalyzer_MAX_MANTISSA = Long_ZERO,
otcit_DoubleAnalyzer_resultForLog10 = null,
otcit_DoubleAnalyzer_mantissa10Table = null,
otcit_DoubleAnalyzer_exp10Table = null,
otcit_DoubleAnalyzer_$callClinit = () => {
    otcit_DoubleAnalyzer_$callClinit = $rt_eraseClinit(otcit_DoubleAnalyzer);
    otcit_DoubleAnalyzer__clinit_();
},
otcit_DoubleAnalyzer_analyze = ($d, $result) => {
    let $bits, $mantissa, $exponent, var$6, $binExponentCorrection, $mantissaShift, $decExponent, $posCmp, var$11, $decMantissa, $decMantissaHi, $lowerPos, $upperPos;
    otcit_DoubleAnalyzer_$callClinit();
    jl_Double_$callClinit();
    $bits = !(isNaN($d) ? 1 : 0) ? $rt_doubleToRawLongBits($d) : Long_create(0, 2146959360);
    $result.$sign0 = Long_eq(Long_and($bits, Long_create(0, 2147483648)), Long_ZERO) ? 0 : 1;
    $mantissa = Long_and($bits, Long_create(4294967295, 1048575));
    $exponent = Long_lo(Long_shr($bits, 52)) & 2047;
    if (Long_eq($mantissa, Long_ZERO) && !$exponent) {
        $result.$mantissa = Long_ZERO;
        $result.$exponent = 0;
        return;
    }
    if ($exponent)
        $mantissa = Long_or($mantissa, Long_create(0, 1048576));
    else {
        $mantissa = Long_shl($mantissa, 1);
        while (Long_eq(Long_and($mantissa, Long_create(0, 1048576)), Long_ZERO)) {
            $mantissa = Long_shl($mantissa, 1);
            $exponent = $exponent + (-1) | 0;
        }
    }
    var$6 = otcit_DoubleAnalyzer_exp10Table.data;
    $binExponentCorrection = $exponent << 16 >> 16;
    $mantissaShift = 0;
    $decExponent = var$6.length;
    if ($mantissaShift > $decExponent) {
        $result = new jl_IllegalArgumentException;
        jl_Exception__init_($result);
        $rt_throw($result);
    }
    $posCmp = $decExponent - 1 | 0;
    a: {
        while (true) {
            if ($mantissaShift > $posCmp) {
                $decExponent = ( -$mantissaShift | 0) - 1 | 0;
                break a;
            }
            $decExponent = ($mantissaShift + $posCmp | 0) / 2 | 0;
            var$11 = $rt_compare(var$6[$decExponent], $binExponentCorrection);
            if (!var$11)
                break;
            if (var$11 <= 0)
                $mantissaShift = $decExponent + 1 | 0;
            else
                $posCmp = $decExponent - 1 | 0;
        }
    }
    if ($decExponent < 0)
        $decExponent =  -$decExponent | 0;
    $posCmp = $decExponent + 1 | 0;
    $mantissaShift = 12 + ($exponent - var$6[$posCmp] | 0) | 0;
    $decMantissa = otcit_DoubleAnalyzer_mulAndShiftRight($mantissa, otcit_DoubleAnalyzer_mantissa10Table.data[$posCmp], $mantissaShift);
    if (Long_le($decMantissa, otcit_DoubleAnalyzer_MAX_MANTISSA)) {
        while (jl_Long_compareUnsigned($decMantissa, otcit_DoubleAnalyzer_MAX_MANTISSA) <= 0) {
            $decExponent = $decExponent + (-1) | 0;
            $decMantissa = Long_add(Long_mul($decMantissa, Long_fromInt(10)), Long_fromInt(9));
        }
        var$6 = otcit_DoubleAnalyzer_exp10Table.data;
        $binExponentCorrection = $decExponent + 1 | 0;
        $mantissaShift = 12 + ($exponent - var$6[$binExponentCorrection] | 0) | 0;
        $decMantissa = otcit_DoubleAnalyzer_mulAndShiftRight($mantissa, otcit_DoubleAnalyzer_mantissa10Table.data[$binExponentCorrection], $mantissaShift);
    }
    $mantissa = Long_shl($mantissa, 1);
    $bits = Long_add($mantissa, Long_fromInt(1));
    var$6 = otcit_DoubleAnalyzer_mantissa10Table.data;
    $binExponentCorrection = $decExponent + 1 | 0;
    $decMantissaHi = var$6[$binExponentCorrection];
    $exponent = $mantissaShift - 1 | 0;
    $decMantissaHi = otcit_DoubleAnalyzer_mulAndShiftRight($bits, $decMantissaHi, $exponent);
    $lowerPos = otcit_DoubleAnalyzer_findLowerDistance($decMantissa, otcit_DoubleAnalyzer_mulAndShiftRight(Long_sub($mantissa, Long_fromInt(1)), otcit_DoubleAnalyzer_mantissa10Table.data[$binExponentCorrection], $exponent));
    $upperPos = otcit_DoubleAnalyzer_findUpperDistance($decMantissa, $decMantissaHi);
    $posCmp = jl_Long_compareUnsigned($lowerPos, $upperPos);
    $mantissa = $posCmp > 0 ? Long_mul(jl_Long_divideUnsigned($decMantissa, $lowerPos), $lowerPos) : $posCmp < 0 ? Long_add(Long_mul(jl_Long_divideUnsigned($decMantissa, $upperPos), $upperPos), $upperPos) : Long_mul(jl_Long_divideUnsigned(Long_add($decMantissa, Long_div($upperPos, Long_fromInt(2))), $upperPos), $upperPos);
    if (jl_Long_compareUnsigned($mantissa, Long_create(2808348672, 232830643)) >= 0)
        while (true) {
            $decExponent = $decExponent + 1 | 0;
            $mantissa = jl_Long_divideUnsigned($mantissa, Long_fromInt(10));
            if (jl_Long_compareUnsigned($mantissa, Long_create(2808348672, 232830643)) < 0)
                break;
        }
    else if (jl_Long_compareUnsigned($mantissa, Long_create(1569325056, 23283064)) < 0) {
        $decExponent = $decExponent + (-1) | 0;
        $mantissa = Long_mul($mantissa, Long_fromInt(10));
    }
    $result.$mantissa = $mantissa;
    $result.$exponent = $decExponent - 330 | 0;
},
otcit_DoubleAnalyzer_findLowerDistance = ($mantissa, $lower) => {
    let $pos, $pos_0;
    otcit_DoubleAnalyzer_$callClinit();
    $pos = Long_fromInt(1);
    while (true) {
        $pos_0 = Long_mul($pos, Long_fromInt(10));
        if (jl_Long_compareUnsigned(jl_Long_divideUnsigned($mantissa, $pos_0), jl_Long_divideUnsigned($lower, $pos_0)) <= 0)
            break;
        $pos = $pos_0;
    }
    return $pos;
},
otcit_DoubleAnalyzer_findUpperDistance = ($mantissa, $upper) => {
    let $pos, $pos_0;
    otcit_DoubleAnalyzer_$callClinit();
    $pos = Long_fromInt(1);
    while (true) {
        $pos_0 = Long_mul($pos, Long_fromInt(10));
        if (jl_Long_compareUnsigned(jl_Long_divideUnsigned($mantissa, $pos_0), jl_Long_divideUnsigned($upper, $pos_0)) >= 0)
            break;
        $pos = $pos_0;
    }
    return $pos;
},
otcit_DoubleAnalyzer_mulAndShiftRight = ($a, $b, $shift) => {
    let $a1, $a2, $a3, $a4, $b1, $b2, $b3, $b4;
    otcit_DoubleAnalyzer_$callClinit();
    $a1 = Long_and($a, Long_fromInt(65535));
    $a2 = Long_and(Long_shru($a, 16), Long_fromInt(65535));
    $a3 = Long_and(Long_shru($a, 32), Long_fromInt(65535));
    $a4 = Long_and(Long_shru($a, 48), Long_fromInt(65535));
    $b1 = Long_and($b, Long_fromInt(65535));
    $b2 = Long_and(Long_shru($b, 16), Long_fromInt(65535));
    $b3 = Long_and(Long_shru($b, 32), Long_fromInt(65535));
    $b4 = Long_and(Long_shru($b, 48), Long_fromInt(65535));
    return Long_add(Long_add(Long_add(Long_shl(Long_mul($b4, $a4), 32 + $shift | 0), Long_shl(Long_add(Long_mul($b4, $a3), Long_mul($b3, $a4)), 16 + $shift | 0)), Long_shl(Long_add(Long_add(Long_mul($b4, $a2), Long_mul($b3, $a3)), Long_mul($b2, $a4)), $shift)), Long_shru(Long_add(Long_add(Long_add(Long_mul($b3, $a1), Long_mul($b2, $a2)), Long_mul($b1, $a3)), Long_shl(Long_add(Long_add(Long_add(Long_mul($b4, $a1), Long_mul($b3, $a2)), Long_mul($b2, $a3)), Long_mul($b1, $a4)), 16)), 32 - $shift | 0));
},
otcit_DoubleAnalyzer__clinit_ = () => {
    otcit_DoubleAnalyzer_MAX_MANTISSA = jl_Long_divideUnsigned(Long_fromInt(-1), Long_fromInt(10));
    otcit_DoubleAnalyzer_resultForLog10 = otcit_DoubleAnalyzer$Result__init_();
    otcit_DoubleAnalyzer_mantissa10Table = $rt_createLongArrayFromData([Long_create(3251292512, 2194092222), Long_create(1766094183, 3510547556), Long_create(553881887, 2808438045), Long_create(443105509, 2246750436), Long_create(3285949193, 3594800697), Long_create(910772436, 2875840558), Long_create(2446604867, 2300672446), Long_create(2196580869, 3681075914), Long_create(2616258154, 2944860731), Long_create(1234013064, 2355888585), Long_create(1974420903, 3769421736), Long_create(720543263, 3015537389), Long_create(1435428070, 2412429911),
    Long_create(578697993, 3859887858), Long_create(2180945313, 3087910286), Long_create(885762791, 2470328229), Long_create(3135207384, 3952525166), Long_create(1649172448, 3162020133), Long_create(3037324877, 2529616106), Long_create(3141732885, 4047385770), Long_create(2513386308, 3237908616), Long_create(1151715587, 2590326893), Long_create(983751480, 4144523029), Long_create(1645994643, 3315618423), Long_create(3034782633, 2652494738), Long_create(3996658754, 4243991581), Long_create(2338333544, 3395193265),
    Long_create(1870666835, 2716154612), Long_create(4073513845, 2172923689), Long_create(3940641775, 3476677903), Long_create(575533043, 2781342323), Long_create(2178413352, 2225073858), Long_create(2626467905, 3560118173), Long_create(3819161242, 2848094538), Long_create(478348616, 2278475631), Long_create(3342338164, 3645561009), Long_create(3532863990, 2916448807), Long_create(1108304273, 2333159046), Long_create(55299919, 3733054474), Long_create(903233395, 2986443579), Long_create(1581580175, 2389154863),
    Long_create(1671534821, 3822647781), Long_create(478234397, 3058118225), Long_create(382587518, 2446494580), Long_create(612140029, 3914391328), Long_create(2207698941, 3131513062), Long_create(48172235, 2505210450), Long_create(77075576, 4008336720), Long_create(61660460, 3206669376), Long_create(3485302205, 2565335500), Long_create(1281516232, 4104536801), Long_create(166219527, 3283629441), Long_create(3568949458, 2626903552), Long_create(2274345296, 4203045684), Long_create(2678469696, 3362436547), Long_create(424788838, 2689949238),
    Long_create(2057817989, 2151959390), Long_create(3292508783, 3443135024), Long_create(3493000485, 2754508019), Long_create(3653393847, 2203606415), Long_create(1550462860, 3525770265), Long_create(1240370288, 2820616212), Long_create(3569276608, 2256492969), Long_create(3133862195, 3610388751), Long_create(1648096297, 2888311001), Long_create(459483578, 2310648801), Long_create(3312154103, 3697038081), Long_create(1790729823, 2957630465), Long_create(1432583858, 2366104372), Long_create(3151127633, 3785766995),
    Long_create(2520902106, 3028613596), Long_create(1157728226, 2422890877), Long_create(2711358621, 3876625403), Long_create(3887073815, 3101300322), Long_create(1391672133, 2481040258), Long_create(1367681954, 3969664413), Long_create(2812132482, 3175731530), Long_create(2249705985, 2540585224), Long_create(1022549199, 4064936359), Long_create(1677032818, 3251949087), Long_create(3918606632, 2601559269), Long_create(3692790234, 4162494831), Long_create(2095238728, 3329995865), Long_create(1676190982, 2663996692),
    Long_create(3540899031, 4262394707), Long_create(1114732307, 3409915766), Long_create(32792386, 2727932613), Long_create(1744220827, 2182346090), Long_create(2790753324, 3491753744), Long_create(3091596118, 2793402995), Long_create(2473276894, 2234722396), Long_create(2239256113, 3575555834), Long_create(2650398349, 2860444667), Long_create(402331761, 2288355734), Long_create(2361717736, 3661369174), Long_create(2748367648, 2929095339), Long_create(3057687578, 2343276271), Long_create(3174313206, 3749242034),
    Long_create(3398444024, 2999393627), Long_create(1000768301, 2399514902), Long_create(2460222741, 3839223843), Long_create(3686165111, 3071379074), Long_create(3807925548, 2457103259), Long_create(3515700499, 3931365215), Long_create(2812560399, 3145092172), Long_create(532061401, 2516073738), Long_create(4287272078, 4025717980), Long_create(3429817663, 3220574384), Long_create(3602847589, 2576459507), Long_create(2328582306, 4122335212), Long_create(144878926, 3297868170), Long_create(115903141, 2638294536),
    Long_create(2762425404, 4221271257), Long_create(491953404, 3377017006), Long_create(3829536560, 2701613604), Long_create(3922622707, 2161290883), Long_create(1122235577, 3458065414), Long_create(1756781920, 2766452331), Long_create(546432077, 2213161865), Long_create(874291324, 3541058984), Long_create(1558426518, 2832847187), Long_create(3823721592, 2266277749), Long_create(3540974170, 3626044399), Long_create(3691772795, 2900835519), Long_create(3812411695, 2320668415), Long_create(1804891416, 3713069465),
    Long_create(1443913133, 2970455572), Long_create(3732110884, 2376364457), Long_create(2535403578, 3802183132), Long_create(310335944, 3041746506), Long_create(3684242592, 2433397204), Long_create(3317807769, 3893435527), Long_create(936259297, 3114748422), Long_create(3325987815, 2491798737), Long_create(1885606668, 3986877980), Long_create(1508485334, 3189502384), Long_create(2065781726, 2551601907), Long_create(4164244222, 4082563051), Long_create(2472401918, 3266050441), Long_create(1118928075, 2612840353),
    Long_create(931291461, 4180544565), Long_create(745033169, 3344435652), Long_create(3173006913, 2675548521), Long_create(3358824142, 4280877634), Long_create(3546052773, 3424702107), Long_create(1118855300, 2739761686), Long_create(36090780, 2191809349), Long_create(1775732167, 3506894958), Long_create(3138572652, 2805515966), Long_create(1651864662, 2244412773), Long_create(1783990001, 3591060437), Long_create(4004172378, 2872848349), Long_create(4062331362, 2298278679), Long_create(3922749802, 3677245887),
    Long_create(1420212923, 2941796710), Long_create(1136170338, 2353437368), Long_create(958879082, 3765499789), Long_create(1626096725, 3012399831), Long_create(441883920, 2409919865), Long_create(707014273, 3855871784), Long_create(1424604878, 3084697427), Long_create(3716664280, 2467757941), Long_create(4228675929, 3948412706), Long_create(2523947284, 3158730165), Long_create(2019157827, 2526984132), Long_create(4089645983, 4043174611), Long_create(2412723327, 3234539689), Long_create(2789172121, 2587631751),
    Long_create(2744688475, 4140210802), Long_create(477763862, 3312168642), Long_create(2959191467, 2649734913), Long_create(3875712888, 4239575861), Long_create(2241576851, 3391660689), Long_create(2652254940, 2713328551), Long_create(1262810493, 2170662841), Long_create(302509870, 3473060546), Long_create(3677981733, 2778448436), Long_create(2083391927, 2222758749), Long_create(756446706, 3556413999), Long_create(1464150824, 2845131199), Long_create(2030314118, 2276104959), Long_create(671522212, 3641767935),
    Long_create(537217769, 2913414348), Long_create(2147761134, 2330731478), Long_create(2577424355, 3729170365), Long_create(2061939484, 2983336292), Long_create(4226531965, 2386669033), Long_create(1608490388, 3818670454), Long_create(2145785770, 3054936363), Long_create(3434615534, 2443949090), Long_create(1200417559, 3910318545), Long_create(960334047, 3128254836), Long_create(4204241074, 2502603868), Long_create(1572824964, 4004166190), Long_create(1258259971, 3203332952), Long_create(3583588354, 2562666361),
    Long_create(4015754449, 4100266178), Long_create(635623181, 3280212943), Long_create(2226485463, 2624170354), Long_create(985396364, 4198672567), Long_create(3365297469, 3358938053), Long_create(115257597, 2687150443), Long_create(1810192996, 2149720354), Long_create(319328417, 3439552567), Long_create(2832443111, 2751642053), Long_create(3983941407, 2201313642), Long_create(2938332415, 3522101828), Long_create(4068652850, 2817681462), Long_create(1536935362, 2254145170), Long_create(2459096579, 3606632272),
    Long_create(249290345, 2885305818), Long_create(1917419194, 2308244654), Long_create(490890333, 3693191447), Long_create(2969692644, 2954553157), Long_create(657767197, 2363642526), Long_create(3629407892, 3781828041), Long_create(2044532855, 3025462433), Long_create(3353613202, 2420369946), Long_create(3647794205, 3872591914), Long_create(3777228823, 3098073531), Long_create(2162789599, 2478458825), Long_create(3460463359, 3965534120), Long_create(2768370687, 3172427296), Long_create(1355703090, 2537941837),
    Long_create(3028118404, 4060706939), Long_create(3281488183, 3248565551), Long_create(1766197087, 2598852441), Long_create(1107928421, 4158163906), Long_create(27349277, 3326531125), Long_create(21879422, 2661224900), Long_create(35007075, 4257959840), Long_create(28005660, 3406367872), Long_create(2599384905, 2725094297), Long_create(361521006, 2180075438), Long_create(4014407446, 3488120700), Long_create(3211525957, 2790496560), Long_create(2569220766, 2232397248), Long_create(3251759766, 3571835597),
    Long_create(883420894, 2857468478), Long_create(2424723634, 2285974782), Long_create(443583977, 3657559652), Long_create(2931847559, 2926047721), Long_create(1486484588, 2340838177), Long_create(3237368801, 3745341083), Long_create(12914663, 2996272867), Long_create(2587312108, 2397018293), Long_create(3280705914, 3835229269), Long_create(3483558190, 3068183415), Long_create(2786846552, 2454546732), Long_create(1022980646, 3927274772), Long_create(3395364895, 3141819817), Long_create(998304997, 2513455854),
    Long_create(3315274914, 4021529366), Long_create(1793226472, 3217223493), Long_create(3152568096, 2573778794), Long_create(2467128576, 4118046071), Long_create(1114709402, 3294436857), Long_create(3468747899, 2635549485), Long_create(1255029343, 4216879177), Long_create(3581003852, 3373503341), Long_create(2005809622, 2698802673), Long_create(3322634616, 2159042138), Long_create(162254630, 3454467422), Long_create(2706784082, 2763573937), Long_create(447440347, 2210859150), Long_create(715904555, 3537374640),
    Long_create(572723644, 2829899712), Long_create(3035159293, 2263919769), Long_create(2279274491, 3622271631), Long_create(964426134, 2897817305), Long_create(771540907, 2318253844), Long_create(2952452370, 3709206150), Long_create(2361961896, 2967364920), Long_create(1889569516, 2373891936), Long_create(1305324308, 3798227098), Long_create(2762246365, 3038581678), Long_create(3927784010, 2430865342), Long_create(2848480580, 3889384548), Long_create(3996771382, 3111507638), Long_create(620436728, 2489206111),
    Long_create(3569679143, 3982729777), Long_create(1137756396, 3186183822), Long_create(3487185494, 2548947057), Long_create(2143522954, 4078315292), Long_create(4291798741, 3262652233), Long_create(856458615, 2610121787), Long_create(2229327243, 4176194859), Long_create(2642455254, 3340955887), Long_create(395977285, 2672764710), Long_create(633563656, 4276423536), Long_create(3942824761, 3421138828), Long_create(577279431, 2736911063), Long_create(2179810463, 2189528850), Long_create(3487696741, 3503246160),
    Long_create(2790157393, 2802596928), Long_create(3950112833, 2242077542), Long_create(2884206696, 3587324068), Long_create(4025352275, 2869859254), Long_create(4079275279, 2295887403), Long_create(1372879692, 3673419846), Long_create(239310294, 2938735877), Long_create(2768428613, 2350988701), Long_create(2711498862, 3761581922), Long_create(451212171, 3009265538), Long_create(2078956655, 2407412430), Long_create(3326330649, 3851859888), Long_create(84084141, 3081487911), Long_create(3503241150, 2465190328),
    Long_create(451225085, 3944304526), Long_create(3796953905, 3155443620), Long_create(3037563124, 2524354896), Long_create(3142114080, 4038967834), Long_create(3372684723, 3231174267), Long_create(980160860, 2584939414), Long_create(3286244294, 4135903062), Long_create(911008517, 3308722450), Long_create(728806813, 2646977960), Long_create(1166090902, 4235164736), Long_create(73879262, 3388131789), Long_create(918096869, 2710505431), Long_create(4170451332, 2168404344), Long_create(4095741754, 3469446951),
    Long_create(2417599944, 2775557561), Long_create(1075086496, 2220446049), Long_create(3438125312, 3552713678), Long_create(173519872, 2842170943), Long_create(1856802816, 2273736754), Long_create(393904128, 3637978807), Long_create(2892103680, 2910383045), Long_create(2313682944, 2328306436), Long_create(1983905792, 3725290298), Long_create(3305111552, 2980232238), Long_create(67108864, 2384185791), Long_create(2684354560, 3814697265), Long_create(2147483648, 3051757812), Long_create(0, 2441406250), Long_create(0, 3906250000),
    Long_create(0, 3125000000), Long_create(0, 2500000000), Long_create(0, 4000000000), Long_create(0, 3200000000), Long_create(0, 2560000000), Long_create(0, 4096000000), Long_create(0, 3276800000), Long_create(0, 2621440000), Long_create(0, 4194304000), Long_create(0, 3355443200), Long_create(0, 2684354560), Long_create(0, 2147483648), Long_create(3435973836, 3435973836), Long_create(1889785610, 2748779069), Long_create(2370821947, 2199023255), Long_create(3793315115, 3518437208), Long_create(457671715, 2814749767),
    Long_create(2943117749, 2251799813), Long_create(3849994940, 3602879701), Long_create(2221002492, 2882303761), Long_create(917808535, 2305843009), Long_create(3186480574, 3689348814), Long_create(3408177918, 2951479051), Long_create(1867548875, 2361183241), Long_create(1270091283, 3777893186), Long_create(157079567, 3022314549), Long_create(984657113, 2417851639), Long_create(3293438299, 3868562622), Long_create(916763721, 3094850098), Long_create(2451397895, 2475880078), Long_create(3063243173, 3961408125),
    Long_create(2450594538, 3169126500), Long_create(1960475630, 2535301200), Long_create(3136761009, 4056481920), Long_create(2509408807, 3245185536), Long_create(1148533586, 2596148429), Long_create(3555640657, 4153837486), Long_create(1985519066, 3323069989), Long_create(2447408712, 2658455991), Long_create(2197867021, 4253529586), Long_create(899300158, 3402823669), Long_create(1578433585, 2722258935), Long_create(1262746868, 2177807148), Long_create(1161401530, 3484491437), Long_create(3506101601, 2787593149),
    Long_create(3663874740, 2230074519), Long_create(3285219207, 3568119231), Long_create(1769181906, 2854495385), Long_create(1415345525, 2283596308), Long_create(1405559381, 3653754093), Long_create(2842434423, 2923003274), Long_create(3132940998, 2338402619), Long_create(2435725219, 3741444191), Long_create(1089586716, 2993155353), Long_create(2589656291, 2394524282), Long_create(707476229, 3831238852), Long_create(3142961361, 3064991081), Long_create(1655375629, 2451992865), Long_create(2648601007, 3923188584),
    Long_create(2977874265, 3138550867), Long_create(664312493, 2510840694), Long_create(2780886908, 4017345110), Long_create(2224709526, 3213876088), Long_create(3497754539, 2571100870), Long_create(1301439967, 4113761393), Long_create(2759138892, 3291009114), Long_create(3066304573, 2632807291), Long_create(3188100398, 4212491666), Long_create(1691486859, 3369993333), Long_create(3071176406, 2695994666), Long_create(1597947665, 2156795733), Long_create(1697722806, 3450873173), Long_create(3076165163, 2760698538),
    Long_create(4178919049, 2208558830), Long_create(2391303182, 3533694129), Long_create(2772036005, 2826955303), Long_create(3935615722, 2261564242), Long_create(2861011319, 3618502788), Long_create(4006795973, 2894802230), Long_create(3205436779, 2315841784), Long_create(2551718468, 3705346855), Long_create(2041374775, 2964277484), Long_create(2492093279, 2371421987), Long_create(551375410, 3794275180), Long_create(441100328, 3035420144), Long_create(1211873721, 2428336115), Long_create(1938997954, 3885337784),
    Long_create(2410191822, 3108270227), Long_create(210166539, 2486616182), Long_create(1195259923, 3978585891), Long_create(97214479, 3182868713), Long_create(1795758501, 2546294970), Long_create(2873213602, 4074071952), Long_create(580583963, 3259257562), Long_create(3041447548, 2607406049), Long_create(2289335700, 4171849679), Long_create(2690462019, 3337479743), Long_create(3870356534, 2669983794), Long_create(3615590076, 4271974071), Long_create(2033478602, 3417579257), Long_create(4203763259, 2734063405),
    Long_create(3363010607, 2187250724), Long_create(2803836594, 3499601159), Long_create(3102062734, 2799680927), Long_create(763663269, 2239744742), Long_create(2080854690, 3583591587), Long_create(4241664129, 2866873269), Long_create(4252324763, 2293498615), Long_create(2508752324, 3669597785), Long_create(2007001859, 2935678228), Long_create(3323588406, 2348542582), Long_create(1881767613, 3757668132), Long_create(4082394468, 3006134505), Long_create(3265915574, 2404907604), Long_create(2648484541, 3847852167),
    Long_create(400800715, 3078281734), Long_create(1179634031, 2462625387), Long_create(2746407909, 3940200619), Long_create(3056119786, 3152160495), Long_create(2444895829, 2521728396), Long_create(2193846408, 4034765434), Long_create(2614070585, 3227812347), Long_create(373269550, 2582249878), Long_create(4033205117, 4131599804), Long_create(4085557553, 3305279843), Long_create(691465664, 2644223875), Long_create(1106345063, 4230758200), Long_create(885076050, 3384606560), Long_create(708060840, 2707685248),
    Long_create(2284435591, 2166148198), Long_create(2796103486, 3465837117), Long_create(518895870, 2772669694), Long_create(1274110155, 2218135755), Long_create(2038576249, 3549017208), Long_create(3348847917, 2839213766), Long_create(1820084875, 2271371013), Long_create(2053142340, 3634193621), Long_create(783520413, 2907354897), Long_create(3203796708, 2325883917), Long_create(1690100896, 3721414268), Long_create(3070067635, 2977131414), Long_create(3315047567, 2381705131), Long_create(3586089190, 3810728210),
    Long_create(2868871352, 3048582568), Long_create(4013084000, 2438866054), Long_create(3843954022, 3902185687), Long_create(1357176299, 3121748550), Long_create(1085741039, 2497398840), Long_create(1737185663, 3995838144), Long_create(2248741989, 3196670515), Long_create(1798993591, 2557336412), Long_create(3737383206, 4091738259), Long_create(3848900024, 3273390607), Long_create(1361133101, 2618712486), Long_create(459826043, 4189939978), Long_create(2085847752, 3351951982), Long_create(4245658579, 2681561585),
    Long_create(2498086431, 4290498537), Long_create(280482227, 3432398830), Long_create(224385781, 2745919064), Long_create(1038502084, 2196735251), Long_create(4238583712, 3514776401), Long_create(2531873511, 2811821121), Long_create(1166505349, 2249456897), Long_create(2725402018, 3599131035), Long_create(2180321615, 2879304828), Long_create(3462244210, 2303443862), Long_create(2103616899, 3685510180), Long_create(1682893519, 2948408144), Long_create(2205308275, 2358726515), Long_create(3528493240, 3773962424),
    Long_create(3681788051, 3019169939), Long_create(3804423900, 2415335951), Long_create(74124026, 3864537523), Long_create(1777286139, 3091630018), Long_create(3139815829, 2473304014), Long_create(2446724950, 3957286423), Long_create(3675366878, 3165829138), Long_create(363313125, 2532663311), Long_create(3158281377, 4052261297), Long_create(808638183, 3241809038), Long_create(2364897465, 2593447230), Long_create(3783835944, 4149515568), Long_create(450088378, 3319612455), Long_create(360070702, 2655689964),
    Long_create(2294100042, 4249103942), Long_create(117293115, 3399283154), Long_create(952827951, 2719426523), Long_create(2480249279, 2175541218), Long_create(3109405388, 3480865949), Long_create(3346517769, 2784692759), Long_create(3536207675, 2227754207), Long_create(2221958443, 3564406732), Long_create(59579836, 2851525386), Long_create(3483637705, 2281220308), Long_create(419859574, 3649952494), Long_create(1194881118, 2919961995), Long_create(955904894, 2335969596), Long_create(4106428209, 3737551353),
    Long_create(708162189, 2990041083), Long_create(2284516670, 2392032866), Long_create(1937239754, 3827252586), Long_create(690798344, 3061802069), Long_create(1411632134, 2449441655), Long_create(2258611415, 3919106648), Long_create(3524876050, 3135285318), Long_create(242920462, 2508228255), Long_create(388672740, 4013165208), Long_create(2028925110, 3210532166), Long_create(764146629, 2568425733), Long_create(363641147, 4109481173), Long_create(2008899836, 3287584938), Long_create(3325106787, 2630067950),
    Long_create(1025203564, 4208108721), Long_create(4256136688, 3366486976), Long_create(2545915891, 2693189581), Long_create(1177739254, 2154551665), Long_create(1884382806, 3447282664), Long_create(2366499704, 2757826131), Long_create(1034206304, 2206260905), Long_create(1654730086, 3530017448), Long_create(3041770987, 2824013958), Long_create(4151403708, 2259211166), Long_create(629291719, 3614737867), Long_create(3080413753, 2891790293), Long_create(4182317920, 2313432234), Long_create(4114728295, 3701491575),
    Long_create(3291782636, 2961193260), Long_create(2633426109, 2368954608), Long_create(3354488315, 3790327373), Long_create(106610275, 3032261899), Long_create(944281679, 2425809519), Long_create(3228837605, 3881295230), Long_create(2583070084, 3105036184), Long_create(2925449526, 2484028947), Long_create(1244745405, 3974446316), Long_create(136802865, 3179557053), Long_create(1827429210, 2543645642), Long_create(3782880196, 4069833027), Long_create(1308317238, 3255866422), Long_create(3623634168, 2604693137),
    Long_create(2361840832, 4167509020), Long_create(1889472666, 3334007216), Long_create(652584673, 2667205773), Long_create(185142018, 4267529237), Long_create(2725093992, 3414023389), Long_create(3039068653, 2731218711), Long_create(1572261463, 2184974969), Long_create(4233605259, 3495959950), Long_create(3386884207, 2796767960), Long_create(2709507366, 2237414368), Long_create(3476218326, 3579862989), Long_create(3639968120, 2863890391), Long_create(2052981037, 2291112313), Long_create(2425776200, 3665779701),
    Long_create(1081627501, 2932623761), Long_create(6308541, 2346099009), Long_create(1728080585, 3753758414), Long_create(2241457927, 3003006731), Long_create(934172882, 2402405385), Long_create(1494676612, 3843848616), Long_create(336747830, 3075078893), Long_create(1987385183, 2460063114), Long_create(602835915, 3936100983), Long_create(2200255650, 3148880786), Long_create(901211061, 2519104629), Long_create(3159924616, 4030567406), Long_create(1668946233, 3224453925), Long_create(1335156987, 2579563140),
    Long_create(2136251179, 4127301024), Long_create(2567994402, 3301840819), Long_create(2913388981, 2641472655), Long_create(366455074, 4226356249), Long_create(1152157518, 3381084999), Long_create(1780719474, 2704867999), Long_create(2283569038, 2163894399), Long_create(1076730083, 3462231039), Long_create(1720377526, 2769784831), Long_create(517308561, 2215827865), Long_create(827693699, 3545324584), Long_create(1521148418, 2836259667), Long_create(3793899112, 2269007733), Long_create(916277824, 3630412374),
    Long_create(1592015718, 2904329899), Long_create(2132606034, 2323463919), Long_create(835189277, 3717542271), Long_create(4104125258, 2974033816), Long_create(2424306747, 2379227053), Long_create(3019897337, 3806763285), Long_create(2415917869, 3045410628), Long_create(3650721214, 2436328502), Long_create(2405180105, 3898125604), Long_create(2783137543, 3118500483), Long_create(3944496953, 2494800386), Long_create(298240911, 3991680619), Long_create(1097586188, 3193344495), Long_create(878068950, 2554675596),
    Long_create(3981890698, 4087480953), Long_create(608532181, 3269984763), Long_create(2204812663, 2615987810), Long_create(3527700261, 4185580496), Long_create(1963166749, 3348464397), Long_create(4147513777, 2678771517), Long_create(3200048207, 4286034428), Long_create(4278025484, 3428827542), Long_create(1704433468, 2743062034), Long_create(2222540234, 2194449627), Long_create(120090538, 3511119404), Long_create(955065889, 2808895523), Long_create(2482039630, 2247116418), Long_create(3112269949, 3595386269),
    Long_create(3348809418, 2876309015), Long_create(2679047534, 2301047212), Long_create(850502218, 3681675540), Long_create(680401775, 2945340432), Long_create(3121301797, 2356272345), Long_create(699115580, 3770035753), Long_create(2277279382, 3016028602), Long_create(103836587, 2412822882), Long_create(1025131999, 3860516611), Long_create(4256079436, 3088413288), Long_create(827883168, 2470730631), Long_create(3901593088, 3953169009)]);
    otcit_DoubleAnalyzer_exp10Table = $rt_createShortArrayFromData([(-70), (-66), (-63), (-60), (-56), (-53), (-50), (-46), (-43), (-40), (-36), (-33), (-30), (-26), (-23), (-20), (-16), (-13), (-10), (-6), (-3), 0, 4, 7, 10, 14, 17, 20, 23, 27, 30, 33, 37, 40, 43, 47, 50, 53, 57, 60, 63, 67, 70, 73, 77, 80, 83, 87, 90, 93, 97, 100, 103, 107, 110, 113, 116, 120, 123, 126, 130, 133, 136, 140, 143, 146, 150, 153, 156, 160, 163, 166, 170, 173, 176, 180, 183, 186, 190, 193, 196, 200, 203, 206, 210, 213, 216, 219,
    223, 226, 229, 233, 236, 239, 243, 246, 249, 253, 256, 259, 263, 266, 269, 273, 276, 279, 283, 286, 289, 293, 296, 299, 303, 306, 309, 312, 316, 319, 322, 326, 329, 332, 336, 339, 342, 346, 349, 352, 356, 359, 362, 366, 369, 372, 376, 379, 382, 386, 389, 392, 396, 399, 402, 406, 409, 412, 415, 419, 422, 425, 429, 432, 435, 439, 442, 445, 449, 452, 455, 459, 462, 465, 469, 472, 475, 479, 482, 485, 489, 492, 495, 499, 502, 505, 508, 512, 515, 518, 522, 525, 528, 532, 535, 538, 542, 545, 548, 552, 555, 558,
    562, 565, 568, 572, 575, 578, 582, 585, 588, 592, 595, 598, 601, 605, 608, 611, 615, 618, 621, 625, 628, 631, 635, 638, 641, 645, 648, 651, 655, 658, 661, 665, 668, 671, 675, 678, 681, 685, 688, 691, 695, 698, 701, 704, 708, 711, 714, 718, 721, 724, 728, 731, 734, 738, 741, 744, 748, 751, 754, 758, 761, 764, 768, 771, 774, 778, 781, 784, 788, 791, 794, 797, 801, 804, 807, 811, 814, 817, 821, 824, 827, 831, 834, 837, 841, 844, 847, 851, 854, 857, 861, 864, 867, 871, 874, 877, 881, 884, 887, 891, 894, 897,
    900, 904, 907, 910, 914, 917, 920, 924, 927, 930, 934, 937, 940, 944, 947, 950, 954, 957, 960, 964, 967, 970, 974, 977, 980, 984, 987, 990, 993, 997, 1000, 1003, 1007, 1010, 1013, 1017, 1020, 1023, 1027, 1030, 1033, 1037, 1040, 1043, 1047, 1050, 1053, 1057, 1060, 1063, 1067, 1070, 1073, 1077, 1080, 1083, 1086, 1090, 1093, 1096, 1100, 1103, 1106, 1110, 1113, 1116, 1120, 1123, 1126, 1130, 1133, 1136, 1140, 1143, 1146, 1150, 1153, 1156, 1160, 1163, 1166, 1170, 1173, 1176, 1180, 1183, 1186, 1189, 1193, 1196,
    1199, 1203, 1206, 1209, 1213, 1216, 1219, 1223, 1226, 1229, 1233, 1236, 1239, 1243, 1246, 1249, 1253, 1256, 1259, 1263, 1266, 1269, 1273, 1276, 1279, 1282, 1286, 1289, 1292, 1296, 1299, 1302, 1306, 1309, 1312, 1316, 1319, 1322, 1326, 1329, 1332, 1336, 1339, 1342, 1346, 1349, 1352, 1356, 1359, 1362, 1366, 1369, 1372, 1376, 1379, 1382, 1385, 1389, 1392, 1395, 1399, 1402, 1405, 1409, 1412, 1415, 1419, 1422, 1425, 1429, 1432, 1435, 1439, 1442, 1445, 1449, 1452, 1455, 1459, 1462, 1465, 1469, 1472, 1475, 1478,
    1482, 1485, 1488, 1492, 1495, 1498, 1502, 1505, 1508, 1512, 1515, 1518, 1522, 1525, 1528, 1532, 1535, 1538, 1542, 1545, 1548, 1552, 1555, 1558, 1562, 1565, 1568, 1572, 1575, 1578, 1581, 1585, 1588, 1591, 1595, 1598, 1601, 1605, 1608, 1611, 1615, 1618, 1621, 1625, 1628, 1631, 1635, 1638, 1641, 1645, 1648, 1651, 1655, 1658, 1661, 1665, 1668, 1671, 1674, 1678, 1681, 1684, 1688, 1691, 1694, 1698, 1701, 1704, 1708, 1711, 1714, 1718, 1721, 1724, 1728, 1731, 1734, 1738, 1741, 1744, 1748, 1751, 1754, 1758, 1761,
    1764, 1767, 1771, 1774, 1777, 1781, 1784, 1787, 1791, 1794, 1797, 1801, 1804, 1807, 1811, 1814, 1817, 1821, 1824, 1827, 1831, 1834, 1837, 1841, 1844, 1847, 1851, 1854, 1857, 1861, 1864, 1867, 1870, 1874, 1877, 1880, 1884, 1887, 1890, 1894, 1897, 1900, 1904, 1907, 1910, 1914, 1917, 1920, 1924, 1927, 1930, 1934, 1937, 1940, 1944, 1947, 1950, 1954, 1957, 1960, 1963, 1967, 1970, 1973, 1977, 1980, 1983, 1987, 1990, 1993, 1997, 2000, 2003, 2007, 2010, 2013, 2017, 2020, 2023, 2027, 2030, 2033, 2037, 2040, 2043,
    2047, 2050, 2053, 2057, 2060, 2063, 2066, 2070, 2073, 2076, 2080, 2083, 2086, 2090, 2093, 2096, 2100, 2103, 2106, 2110, 2113, 2116, 2120]);
};
function otcit_DoubleAnalyzer$Result() {
    let a = this; jl_Object.call(a);
    a.$mantissa = Long_ZERO;
    a.$exponent = 0;
    a.$sign0 = 0;
}
let otcit_DoubleAnalyzer$Result__init_0 = $this => {
    return;
},
otcit_DoubleAnalyzer$Result__init_ = () => {
    let var_0 = new otcit_DoubleAnalyzer$Result();
    otcit_DoubleAnalyzer$Result__init_0(var_0);
    return var_0;
},
juf_ToDoubleFunction = $rt_classWithoutFields(0),
m_Matrix$laplaceExpansion$lambda$_16_0 = $rt_classWithoutFields(),
m_Matrix$laplaceExpansion$lambda$_16_0_applyAsDouble = (var$0, var$1) => {
    return var$1.$value0;
};
function jusi_StreamOverSpliterator() {
    jusi_SimpleStreamImpl.call(this);
    this.$spliterator = null;
}
let jusi_StreamOverSpliterator_next = ($this, $consumer) => {
    let $action, var$3, var$4;
    $action = new jusi_StreamOverSpliterator$AdapterAction;
    $action.$consumer = $consumer;
    while (true) {
        $consumer = $this.$spliterator;
        if ($consumer.$iterator0 === null)
            $consumer.$iterator0 = ju_AbstractList_iterator($consumer.$collection);
        if (!ju_AbstractList$1_hasNext($consumer.$iterator0))
            var$3 = 0;
        else {
            $consumer = ju_AbstractList$1_next($consumer.$iterator0);
            var$4 = $action;
            var$4.$wantsMore = var$4.$consumer.$test($consumer);
            var$3 = 1;
        }
        if (!var$3)
            return 0;
        if ($action.$wantsMore)
            continue;
        else
            break;
    }
    return 1;
},
jusi_StreamOverSpliterator_estimateSize = $this => {
    return Long_lo(Long_fromInt($this.$spliterator.$collection.$size));
};
function m_LinearExpression() {
    jl_Object.call(this);
    this.$expression = null;
}
let m_LinearExpression__init_0 = ($this, $inputStr) => {
    let $normalizedString, var$3, var$4, $terms, var$6, var$7, var$8, var$9, var$10, var$11, var$12, $$je;
    $normalizedString = new ju_TreeMap;
    var$3 = new m_LinearExpression$_init_$lambda$_0_0;
    $normalizedString.$originalComparator = var$3;
    $normalizedString.$comparator = var$3;
    $this.$expression = $normalizedString;
    if (jl_String_isBlank($inputStr))
        return;
    $normalizedString = jl_String_replace($inputStr, $rt_s(19), $rt_s(2));
    m_LinearExpression$LinearExpressionValidator_$callClinit();
    if (jl_String_isEmpty($normalizedString)) {
        $inputStr = new jl_IllegalArgumentException;
        jl_Exception__init_0($inputStr, $rt_s(317));
        $rt_throw($inputStr);
    }
    if (jl_String_charAt($normalizedString, 0) == 43) {
        $inputStr = new jl_IllegalArgumentException;
        jl_Exception__init_0($inputStr, $rt_s(318));
        $rt_throw($inputStr);
    }
    if (!jl_String_contains($normalizedString, $rt_s(319)) && !jl_String_contains($normalizedString, $rt_s(320)) && !jl_String_contains($normalizedString, $rt_s(321))) {
        if (jl_String_contains($normalizedString, $rt_s(25))) {
            $inputStr = new jl_IllegalArgumentException;
            jl_Exception__init_0($inputStr, $rt_s(322));
            $rt_throw($inputStr);
        }
        var$3 = new jusi_StringCharsStream;
        var$3.$string3 = $normalizedString;
        $inputStr = new m_LinearExpression$LinearExpressionValidator$validate$lambda$_1_0;
        var$3 = var$3;
        var$4 = new jusi_MappingToObjStreamImpl;
        var$4.$source0 = var$3;
        var$4.$mapper1 = $inputStr;
        $inputStr = new m_LinearExpression$LinearExpressionValidator$validate$lambda$_1_1;
        jusi_SimpleStreamImpl_forEachOrdered(var$4, $inputStr);
        $inputStr = ju_Arrays_stream(m_LinearExpression_getTerms($normalizedString));
        var$3 = new m_LinearExpression$LinearExpressionValidator$validate$lambda$_1_2;
        jusi_SimpleStreamImpl_forEachOrdered($inputStr, var$3);
        $terms = (m_LinearExpression_getTerms($normalizedString)).data;
        var$6 = $terms.length;
        var$7 = 0;
        while (var$7 < var$6) {
            $inputStr = $terms[var$7];
            if (!jl_String_isBlank($inputStr)) {
                var$8 = 1.0;
                $normalizedString = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_($normalizedString);
                var$9 = (jl_String_split($inputStr, $rt_s(323))).data;
                var$10 = var$9.length;
                var$11 = 0;
                while (var$11 < var$10) {
                    a: {
                        $inputStr = var$9[var$11];
                        if (!jl_String_isBlank($inputStr))
                            try {
                                var$12 = var$8;
                                var$8 = var$8 * jl_Double_parseDouble($inputStr);
                                var$12 = var$8;
                                break a;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                if ($$je instanceof jl_NumberFormatException) {
                                    jl_AbstractStringBuilder_append0($normalizedString, $inputStr);
                                    var$8 = var$12;
                                    break a;
                                } else {
                                    throw $$e;
                                }
                            }
                    }
                    var$11 = var$11 + 1 | 0;
                }
                $inputStr = ($normalizedString.$length0 ? 0 : 1) ? $rt_s(324) : jl_AbstractStringBuilder_toString($normalizedString);
                ju_Map_merge($this.$expression, $inputStr, jl_Double_valueOf(var$8), new m_LinearExpression$convertToExpression$lambda$_2_0);
            }
            var$7 = var$7 + 1 | 0;
        }
        return;
    }
    $normalizedString = new jl_IllegalArgumentException;
    jl_Exception__init_0($normalizedString, $rt_s(325));
    $rt_throw($normalizedString);
},
m_LinearExpression__init_ = var_0 => {
    let var_1 = new m_LinearExpression();
    m_LinearExpression__init_0(var_1, var_0);
    return var_1;
},
m_LinearExpression_getTerms = $normalizedString => {
    let $replacedString;
    $replacedString = jl_String_replace($normalizedString, $rt_s(27), $rt_s(326));
    if (jl_String_charAt($replacedString, 0) == 43)
        $replacedString = jl_String_substring0($replacedString, 1);
    return jl_String_split($replacedString, $rt_s(327));
},
m_LinearExpression_multiplyConstant = ($this, $c) => {
    let $result, var$3, var$4;
    $result = m_LinearExpression__init_($rt_s(2));
    var$3 = $result.$expression;
    var$4 = $this.$expression;
    ju_AbstractMap_putAll(var$3, var$4);
    var$3 = $result.$expression;
    var$4 = new m_LinearExpression$multiplyConstant$lambda$_5_0;
    var$4.$_06 = $result;
    var$4.$_15 = $c;
    ju_Map_forEach(var$3, var$4);
    m_LinearExpression_removeZeroCoefficents($this, $result);
    return $result;
},
m_LinearExpression_removeZeroCoefficents = ($this, $result) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    var$2 = ju_TreeMap$EntrySet_iterator(ju_TreeMap_entrySet($result.$expression));
    while (ju_TreeMap$EntryIterator_hasNext(var$2)) {
        if ((ju_TreeMap$EntryIterator_next(var$2)).$value1.$value0 !== 0.0 ? 0 : 1) {
            var$3 = var$2.$modCount2;
            $result = var$2.$owner0;
            if (var$3 != $result.$modCount0) {
                $result = new ju_ConcurrentModificationException;
                jl_Exception__init_($result);
                $rt_throw($result);
            }
            var$4 = var$2.$last;
            if (var$4 === null) {
                $result = new jl_IllegalStateException;
                jl_Exception__init_($result);
                $rt_throw($result);
            }
            $result.$root = ju_TreeMap_deleteNode($result, $result.$root, var$4.$key);
            var$5 = ju_TreeMap_pathToNext(var$2.$owner0, var$2.$last.$key, var$2.$reverse);
            var$6 = var$5.data;
            var$7 = var$2.$path;
            var$8 = var$6.length;
            jl_System_fastArraycopy(var$5, 0, var$7, 0, var$8);
            var$2.$depth = var$8;
            $result = var$2.$owner0;
            var$3 = $result.$modCount0 + 1 | 0;
            $result.$modCount0 = var$3;
            var$2.$modCount2 = var$3;
            var$2.$last = null;
        }
    }
},
m_LinearExpression_toString = $this => {
    let $expressionString, $counter, var$3, var$4;
    if ($this.$expression.$root !== null ? 0 : 1)
        return $rt_s(0);
    m_LinearExpression_removeZeroCoefficents($this, $this);
    $expressionString = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($expressionString);
    $counter = new juca_AtomicInteger;
    $counter.$value3 = 1;
    var$3 = $this.$expression;
    var$4 = new m_LinearExpression$toString$lambda$_8_0;
    var$4.$_012 = $this;
    var$4.$_1 = $counter;
    var$4.$_2 = $expressionString;
    ju_Map_forEach(var$3, var$4);
    var$3 = jl_AbstractStringBuilder_toString($expressionString);
    $expressionString = var$3.$nativeString.trim();
    if ($expressionString !== var$3.$nativeString)
        var$3 = jl_String__init_1($expressionString);
    return var$3;
};
function m_Matrix$sortEquations$lambda$_15_0() {
    jl_Object.call(this);
    this.$_05 = null;
}
let m_Matrix$sortEquations$lambda$_15_0_compare = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13;
    var$3 = var$1;
    var$4 = var$2;
    var$5 = var$0.$_05;
    var$6 = 0;
    a: {
        while (true) {
            if (var$6 >= var$5.data[0].data.length) {
                var$7 = 0;
                break a;
            }
            var$8 = var$4.data;
            var$9 = var$3.data;
            var$10 = jl_Math_abs(var$8[var$6]);
            var$11 = jl_Math_abs(var$9[var$6]);
            jl_Double_$callClinit();
            var$7 = (!(var$10 > var$11) ? 0 : 1) - (!(var$11 > var$10) ? 0 : 1) | 0;
            if (!var$7) {
                var$12 = 1.0 / var$10;
                var$13 = 1.0 / var$11;
                var$7 = (((!(var$12 > var$13) ? 0 : 1) - (!(var$13 > var$12) ? 0 : 1) | 0) + (var$11 !== var$11 ? 0 : 1) | 0) - (var$10 !== var$10 ? 0 : 1) | 0;
            }
            if (var$7)
                break;
            var$6 = var$6 + 1 | 0;
        }
    }
    return var$7;
},
m_Matrix$getNonZeroSolution$lambda$_14_0 = $rt_classWithoutFields(),
m_Matrix$getNonZeroSolution$lambda$_14_0_test = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10;
    var$2 = var$1;
    var$3 = var$2.data;
    var$1 = new jusd_ArrayDoubleStreamImpl;
    var$4 = var$3.length;
    var$1.$array2 = var$2;
    var$1.$index0 = 0;
    var$1.$end3 = var$4;
    var$1.$size4 = var$4 - 0 | 0;
    var$5 = new m_Matrix$lambda$getNonZeroSolution$0$lambda$_26_0;
    var$1 = var$1;
    var$6 = new jusd_AnyMatchConsumer;
    var$6.$predicate = var$5;
    while (!var$6.$matched) {
        var$5 = var$1;
        a: {
            while (true) {
                var$4 = var$5.$index0;
                var$7 = var$5.$end3;
                if (var$4 >= var$7)
                    break a;
                var$2 = var$5.$array2.data;
                var$5.$index0 = var$4 + 1 | 0;
                var$8 = var$2[var$4];
                var$9 = var$6;
                var$10 = var$8 === 0.0 ? 0 : 1;
                var$9.$matched = var$10;
                if (var$10 ? 0 : 1)
                    continue;
                else
                    break;
            }
        }
        if (!(var$5.$index0 >= var$7 ? 0 : 1))
            break;
    }
    return var$6.$matched;
};
function m_Matrix$getNonZeroSolution$lambda$_14_1() {
    jl_Object.call(this);
    this.$_08 = 0;
}
let m_Matrix$getNonZeroSolution$lambda$_14_1_apply = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7;
    var$2 = var$1;
    var$3 = var$0.$_08;
    var$4 = $rt_createDoubleArray(var$3 - 0 | 0);
    var$5 = var$4.data;
    var$6 = 0;
    while (var$6 < var$3) {
        var$7 = var$2.data;
        var$5[var$6 - 0 | 0] = var$7[var$6];
        var$6 = var$6 + 1 | 0;
    }
    return var$4;
},
m_Matrix$getNonZeroSolution$lambda$_14_2 = $rt_classWithoutFields(),
m_Matrix$getNonZeroSolution$lambda$_14_2_apply = (var$0, var$1) => {
    return $rt_createArray($rt_arraycls($rt_doublecls), var$1);
},
ju_Comparator$NaturalOrder = $rt_classWithoutFields(),
ju_Comparator$NaturalOrder_INSTANCE = null,
ju_Comparator$NaturalOrder_$callClinit = () => {
    ju_Comparator$NaturalOrder_$callClinit = $rt_eraseClinit(ju_Comparator$NaturalOrder);
    ju_Comparator$NaturalOrder__clinit_();
},
ju_Comparator$NaturalOrder_compare = ($this, $o1, $o2) => {
    return jl_String_compareTo($o1, $o2);
},
ju_Comparator$NaturalOrder_instance = () => {
    ju_Comparator$NaturalOrder_$callClinit();
    return ju_Comparator$NaturalOrder_INSTANCE;
},
ju_Comparator$NaturalOrder__clinit_ = () => {
    let var$1;
    var$1 = new ju_Comparator$NaturalOrder;
    ju_Comparator$NaturalOrder_$callClinit();
    ju_Comparator$NaturalOrder_INSTANCE = var$1;
},
ju_SortedMap = $rt_classWithoutFields(0),
ju_NavigableMap = $rt_classWithoutFields(0);
function ju_TreeMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$root = null;
    a.$comparator = null;
    a.$originalComparator = null;
    a.$modCount0 = 0;
    a.$cachedEntrySet = null;
}
let ju_TreeMap_put = ($this, $key, $value) => {
    let $old;
    $this.$root = ju_TreeMap_getOrCreateNode($this, $this.$root, $key);
    $key = ju_TreeMap_findExact($this, $key);
    $old = ju_AbstractMap$SimpleEntry_setValue($key, $value);
    ju_AbstractMap$SimpleEntry_setValue($key, $value);
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
    return $old;
},
ju_TreeMap_findExact = ($this, $key) => {
    let $node, $cmp;
    $node = $this.$root;
    $this.$comparator.$compare($key, $key);
    while (true) {
        if ($node === null)
            return null;
        $cmp = $this.$comparator.$compare($key, $node.$key);
        if (!$cmp)
            break;
        $node = $cmp >= 0 ? $node.$right : $node.$left;
    }
    return $node;
},
ju_TreeMap_pathToExactOrNext = ($this, $key, $reverse) => {
    let $path, var$4, $depth, $node, $cmp;
    $path = $rt_createArray(ju_TreeMap$TreeNode, ju_TreeMap_height($this));
    var$4 = $path.data;
    $depth = 0;
    $node = $this.$root;
    a: {
        while ($node !== null) {
            $cmp = $this.$comparator.$compare($key, $node.$key);
            if ($reverse)
                $cmp =  -$cmp | 0;
            if (!$cmp) {
                $reverse = $depth + 1 | 0;
                var$4[$depth] = $node;
                break a;
            }
            if ($cmp >= 0)
                $node = ju_TreeMap$TreeNode_down($node, $reverse);
            else {
                $cmp = $depth + 1 | 0;
                var$4[$depth] = $node;
                $node = ju_TreeMap$TreeNode_forward($node, $reverse);
                $depth = $cmp;
            }
        }
        $reverse = $depth;
    }
    return ju_Arrays_copyOf($path, $reverse);
},
ju_TreeMap_pathToNext = ($this, $key, $reverse) => {
    let $path, var$4, $depth, $node, $cmp;
    $path = $rt_createArray(ju_TreeMap$TreeNode, ju_TreeMap_height($this));
    var$4 = $path.data;
    $depth = 0;
    $node = $this.$root;
    while ($node !== null) {
        $cmp = $this.$comparator.$compare($key, $node.$key);
        if ($reverse)
            $cmp =  -$cmp | 0;
        if ($cmp >= 0)
            $node = ju_TreeMap$TreeNode_down($node, $reverse);
        else {
            $cmp = $depth + 1 | 0;
            var$4[$depth] = $node;
            $node = ju_TreeMap$TreeNode_forward($node, $reverse);
            $depth = $cmp;
        }
    }
    return ju_Arrays_copyOf($path, $depth);
},
ju_TreeMap_pathToFirst = ($this, $reverse) => {
    let $path, var$3, $depth, $node, var$6;
    $path = $rt_createArray(ju_TreeMap$TreeNode, ju_TreeMap_height($this));
    var$3 = $path.data;
    $depth = 0;
    $node = $this.$root;
    while ($node !== null) {
        var$6 = $depth + 1 | 0;
        var$3[$depth] = $node;
        $node = ju_TreeMap$TreeNode_forward($node, $reverse);
        $depth = var$6;
    }
    return ju_Arrays_copyOf($path, $depth);
},
ju_TreeMap_getOrCreateNode = ($this, $root, $key) => {
    let var$3, $cmp;
    if ($root === null) {
        $root = new ju_TreeMap$TreeNode;
        var$3 = null;
        $root.$key = $key;
        $root.$value1 = var$3;
        $root.$height0 = 1;
        $root.$size0 = 1;
        return $root;
    }
    $cmp = $this.$comparator.$compare($key, $root.$key);
    if (!$cmp)
        return $root;
    if ($cmp >= 0)
        $root.$right = ju_TreeMap_getOrCreateNode($this, $root.$right, $key);
    else
        $root.$left = ju_TreeMap_getOrCreateNode($this, $root.$left, $key);
    ju_TreeMap$TreeNode_fix($root);
    return ju_TreeMap$TreeNode_balance($root);
},
ju_TreeMap_deleteNode = ($this, $root, $key) => {
    let $cmp, $right, $left, $pathToMin, $minDepth, $minDepth_0, $node;
    if ($root === null)
        return null;
    $cmp = $this.$comparator.$compare($key, $root.$key);
    if ($cmp < 0)
        $root.$left = ju_TreeMap_deleteNode($this, $root.$left, $key);
    else if ($cmp > 0)
        $root.$right = ju_TreeMap_deleteNode($this, $root.$right, $key);
    else {
        $right = $root.$right;
        if ($right === null)
            return $root.$left;
        $left = $root.$left;
        $pathToMin = $rt_createArray(ju_TreeMap$TreeNode, $right.$height0).data;
        $minDepth = 0;
        while (true) {
            $root = $right.$left;
            if ($root === null)
                break;
            $minDepth_0 = $minDepth + 1 | 0;
            $pathToMin[$minDepth] = $right;
            $minDepth = $minDepth_0;
            $right = $root;
        }
        $root = $right.$right;
        while ($minDepth > 0) {
            $minDepth = $minDepth + (-1) | 0;
            $node = $pathToMin[$minDepth];
            $node.$left = $root;
            ju_TreeMap$TreeNode_fix($node);
            $root = ju_TreeMap$TreeNode_balance($node);
        }
        $right.$right = $root;
        $right.$left = $left;
        ju_TreeMap$TreeNode_fix($right);
        $root = $right;
    }
    ju_TreeMap$TreeNode_fix($root);
    return ju_TreeMap$TreeNode_balance($root);
},
ju_TreeMap_entrySet = $this => {
    let var$1, var$2, var$3;
    if ($this.$cachedEntrySet === null) {
        var$1 = new ju_TreeMap$EntrySet;
        var$2 = null;
        var$3 = null;
        var$1.$modCount4 = (-1);
        var$1.$owner = $this;
        var$1.$from = var$2;
        var$1.$fromIncluded = 1;
        var$1.$fromChecked = 0;
        var$1.$to = var$3;
        var$1.$toIncluded = 1;
        var$1.$toChecked = 0;
        var$1.$reverse0 = 0;
        $this.$cachedEntrySet = var$1;
    }
    return $this.$cachedEntrySet;
},
ju_TreeMap_height = $this => {
    let var$1;
    var$1 = $this.$root;
    return var$1 === null ? 0 : var$1.$height0;
},
m_LinearExpression$_init_$lambda$_0_0 = $rt_classWithoutFields(),
m_LinearExpression$_init_$lambda$_0_0_compare = (var$0, var$1, var$2) => {
    var$1 = var$1;
    var$2 = var$2;
    return var$1.$nativeString.length == var$2.$nativeString.length ? jl_String_compareTo(var$1, var$2) : var$1.$nativeString.length - var$2.$nativeString.length | 0;
},
m_LinearExpression$LinearExpressionValidator = $rt_classWithoutFields(),
m_LinearExpression$LinearExpressionValidator_NUMBER = null,
m_LinearExpression$LinearExpressionValidator_VARIABLE = null,
m_LinearExpression$LinearExpressionValidator_$callClinit = () => {
    m_LinearExpression$LinearExpressionValidator_$callClinit = $rt_eraseClinit(m_LinearExpression$LinearExpressionValidator);
    m_LinearExpression$LinearExpressionValidator__clinit_();
},
m_LinearExpression$LinearExpressionValidator__clinit_ = () => {
    m_LinearExpression$LinearExpressionValidator_NUMBER = jur_Pattern_compile($rt_s(328));
    m_LinearExpression$LinearExpressionValidator_VARIABLE = jur_Pattern_compile($rt_s(329));
},
m_LinearExpression$LinearExpressionValidator$validate$lambda$_1_0 = $rt_classWithoutFields(),
juf_Consumer = $rt_classWithoutFields(0),
m_LinearExpression$LinearExpressionValidator$validate$lambda$_1_1 = $rt_classWithoutFields(),
m_LinearExpression$LinearExpressionValidator$validate$lambda$_1_1_accept = (var$0, var$1) => {
    let var$2, var$3, var$4;
    var$1 = var$1;
    m_LinearExpression$LinearExpressionValidator_$callClinit();
    var$2 = var$1.$value4;
    jl_Character_$callClinit();
    if (!jl_Character_isDigit(var$2) && !(var$2 >= 97 && var$2 <= 122) && var$2 != 43 && var$2 != 45 && var$2 != 42 && var$2 != 46 && var$2 != 69 ? 0 : 1)
        return;
    var$3 = new jl_IllegalArgumentException;
    var$4 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$4);
    jl_AbstractStringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$4, $rt_s(330)), var$1), 39);
    jl_Exception__init_0(var$3, jl_AbstractStringBuilder_toString(var$4));
    $rt_throw(var$3);
},
m_LinearExpression$LinearExpressionValidator$validate$lambda$_1_2 = $rt_classWithoutFields(),
m_LinearExpression$LinearExpressionValidator$validate$lambda$_1_2_accept = (var$0, var$1) => {
    let var$2, var$3, var$4;
    var$1 = var$1;
    m_LinearExpression$LinearExpressionValidator_$callClinit();
    var$2 = !jl_String_startsWith(var$1, $rt_s(26)) && !jl_String_startsWith(var$1, $rt_s(27)) ? var$1 : jl_String_substring0(var$1, 1);
    var$2 = ju_Arrays_stream(jl_String_split(var$2, $rt_s(323)));
    var$3 = new m_LinearExpression$LinearExpressionValidator$validateTerm$lambda$_2_0;
    var$3 = jusi_SimpleStreamImpl_findFirst(jusi_SimpleStreamImpl_filter(var$2, var$3));
    var$2 = new m_LinearExpression$LinearExpressionValidator$validateTerm$lambda$_2_1;
    var$2.$_02 = var$1;
    var$1 = var$3.$value5;
    if (var$1 === null)
        return;
    var$2 = var$2;
    var$1 = var$1;
    var$2 = var$2.$_02;
    var$3 = new jl_IllegalArgumentException;
    var$4 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$4);
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$4, $rt_s(331)), var$1), $rt_s(332)), var$2);
    jl_Exception__init_0(var$3, jl_AbstractStringBuilder_toString(var$4));
    $rt_throw(var$3);
},
juf_BiFunction = $rt_classWithoutFields(0),
m_LinearExpression$convertToExpression$lambda$_2_0 = $rt_classWithoutFields(),
m_LinearExpression$convertToExpression$lambda$_2_0_apply = (var$0, var$1, var$2) => {
    var$1 = var$1;
    var$2 = var$2;
    return jl_Double_valueOf(var$1.$value0 + var$2.$value0);
};
function jusi_MappingStreamImpl() {
    jusi_WrappingStreamImpl.call(this);
    this.$mapper = null;
}
let jusi_MappingStreamImpl_wrap = ($this, $consumer) => {
    let var$2;
    var$2 = new jusi_MappingStreamImpl$wrap$lambda$_1_0;
    var$2.$_03 = $this;
    var$2.$_12 = $consumer;
    return var$2;
},
juf_BiConsumer = $rt_classWithoutFields(0);
function m_LinearExpression$round$lambda$_7_0() {
    let a = this; jl_Object.call(a);
    a.$_07 = null;
    a.$_14 = 0;
}
let m_LinearExpression$round$lambda$_7_0_accept = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6, var$7;
    var$1 = var$1;
    var$2 = var$2;
    var$3 = var$0.$_07;
    var$4 = var$0.$_14;
    var$5 = var$2.$value0;
    var$6 = var$4;
    var$7 = var$5 * jl_Math_pow(10.0, var$6);
    var$7 = Long_toNumber(Long_fromNumber(var$7 + jl_Math_sign(var$7) * 0.5)) / jl_Math_pow(10.0, var$6);
    ju_Map_replace(var$3.$expression, var$1, jl_Double_valueOf(var$7));
};
function m_LinearExpression$multiplyConstant$lambda$_5_0() {
    let a = this; jl_Object.call(a);
    a.$_06 = null;
    a.$_15 = 0.0;
}
let m_LinearExpression$multiplyConstant$lambda$_5_0_accept = (var$0, var$1, var$2) => {
    let var$3, var$4;
    var$1 = var$1;
    var$2 = var$2;
    var$3 = var$0.$_06;
    var$4 = var$0.$_15;
    ju_Map_replace(var$3.$expression, var$1, jl_Double_valueOf(var$2.$value0 * var$4));
};
function juca_AtomicInteger() {
    let a = this; jl_Number.call(a);
    a.$value3 = 0;
    a.$version = 0;
}
function m_LinearExpression$toString$lambda$_8_0() {
    let a = this; jl_Object.call(a);
    a.$_012 = null;
    a.$_1 = null;
    a.$_2 = null;
}
let m_LinearExpression$toString$lambda$_8_0_accept = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    var$1 = var$1;
    var$2 = var$2;
    var$3 = var$0.$_1;
    var$4 = var$0.$_2;
    var$5 = new m_LinearExpression$TermComponent;
    var$6 = jl_Double_toString0(var$2);
    var$5.$multiplier = $rt_s(28);
    var$7 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$7);
    var$5.$termRep = var$7;
    var$5.$operator = $rt_s(2);
    var$5.$multiplier = $rt_s(28);
    var$5.$isFirst = 0;
    var$5.$coefficientString = var$6;
    var$5.$key0 = var$1;
    if (var$3.$value3 == 1)
        var$5.$isFirst = 1;
    if (jl_String_equals(var$1, $rt_s(324))) {
        var$5.$key0 = $rt_s(2);
        var$5.$multiplier = $rt_s(2);
    }
    var$8 = var$2.$value0;
    if (var$8 < 0.0) {
        var$5.$operator = $rt_s(27);
        var$5.$coefficientString = jl_String_substring0(var$5.$coefficientString, 1);
    } else if (var$8 > 0.0)
        var$5.$operator = $rt_s(26);
    if (!var$5.$isFirst) {
        var$1 = var$5.$operator;
        var$2 = var$5.$coefficientString;
        var$7 = var$5.$multiplier;
        var$6 = var$5.$key0;
        var$9 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$9);
        jl_AbstractStringBuilder_append(var$9, 32);
        var$1 = jl_StringBuilder_append(var$9, var$1);
        jl_AbstractStringBuilder_append(var$1, 32);
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$1, var$2), var$7), var$6);
        m_LinearExpression$TermComponent_append(var$5, jl_AbstractStringBuilder_toString(var$9));
    } else if (!jl_String_equals(var$5.$operator, $rt_s(27))) {
        var$1 = var$5.$coefficientString;
        var$2 = var$5.$multiplier;
        var$7 = var$5.$key0;
        var$6 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$6);
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$6, var$1), var$2), var$7);
        m_LinearExpression$TermComponent_append(var$5, jl_AbstractStringBuilder_toString(var$6));
    } else {
        var$1 = var$5.$operator;
        var$2 = var$5.$coefficientString;
        var$7 = var$5.$multiplier;
        var$6 = var$5.$key0;
        var$9 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$9);
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$9, var$1), var$2), var$7), var$6);
        m_LinearExpression$TermComponent_append(var$5, jl_AbstractStringBuilder_toString(var$9));
    }
    jl_AbstractStringBuilder_append0(var$4, jl_AbstractStringBuilder_toString(var$5.$termRep));
    var$3.$version = var$3.$version + 1 | 0;
    var$3.$value3 = var$3.$value3 + 1 | 0;
},
jus_DoubleStream = $rt_classWithoutFields(0),
jusd_SimpleDoubleStreamImpl = $rt_classWithoutFields();
function jusi_MappingToDoubleStreamImpl() {
    let a = this; jusd_SimpleDoubleStreamImpl.call(a);
    a.$source = null;
    a.$mapper0 = null;
}
let jusi_MappingToDoubleStreamImpl_next = ($this, $consumer) => {
    let var$2, var$3;
    var$2 = $this.$source;
    var$3 = new jusi_MappingToDoubleStreamImpl$next$lambda$_1_0;
    var$3.$_00 = $this;
    var$3.$_10 = $consumer;
    return jusi_StreamOverSpliterator_next(var$2, var$3);
};
function ceu_ContextNotFoundException() {
    ceu_CommandException.call(this);
    this.$string6 = null;
}
function jusi_FilteringStreamImpl$wrap$lambda$_1_0() {
    let a = this; jl_Object.call(a);
    a.$_04 = null;
    a.$_13 = null;
}
let jusi_FilteringStreamImpl$wrap$lambda$_1_0_test = (var$0, var$1) => {
    let var$2, var$3;
    var$2 = var$0.$_04;
    var$3 = var$0.$_13;
    return var$2.$filter0.$test(var$1) ? var$3.$test(var$1) : 1;
},
ju_Spliterator = $rt_classWithoutFields(0);
function jusi_SpliteratorOverCollection() {
    let a = this; jl_Object.call(a);
    a.$collection = null;
    a.$iterator0 = null;
}
let m_LinearExpression$removeZeroCoefficents$lambda$_6_0 = $rt_classWithoutFields();
function jusi_SimpleStreamImpl$ArrayFillingConsumer() {
    let a = this; jl_Object.call(a);
    a.$array1 = null;
    a.$index6 = 0;
}
let jusi_SimpleStreamImpl$ArrayFillingConsumer_test = ($this, $t) => {
    let var$2, var$3;
    var$2 = $this.$array1.data;
    var$3 = $this.$index6;
    $this.$index6 = var$3 + 1 | 0;
    var$2[var$3] = $t;
    return 1;
};
function jusi_SimpleStreamImpl$toArray$lambda$_21_0() {
    jl_Object.call(this);
    this.$_09 = null;
}
let jusi_SimpleStreamImpl$toArray$lambda$_21_0_test = (var$0, var$1) => {
    return ju_ArrayList_add(var$0.$_09, var$1);
},
juf_DoublePredicate = $rt_classWithoutFields(0);
function jusd_SumDoubleConsumer() {
    jl_Object.call(this);
    this.$sum = 0.0;
}
let jusd_SumDoubleConsumer_test = ($this, $t) => {
    $this.$sum = $this.$sum + $t;
    return 1;
},
jus_IntStream = $rt_classWithoutFields(0),
jusi_SimpleIntStreamImpl = $rt_classWithoutFields();
function jusi_StringCharsStream() {
    let a = this; jusi_SimpleIntStreamImpl.call(a);
    a.$string3 = null;
    a.$index2 = 0;
}
function jusi_StreamOverSpliterator$AdapterAction() {
    let a = this; jl_Object.call(a);
    a.$consumer = null;
    a.$wantsMore = 0;
}
function jusi_SimpleStreamImpl$forEachOrdered$lambda$_19_0() {
    jl_Object.call(this);
    this.$_010 = null;
}
let jusi_SimpleStreamImpl$forEachOrdered$lambda$_19_0_test = (var$0, var$1) => {
    var$0.$_010.$accept0(var$1);
    return 1;
};
function m_LinearExpression$subtract$lambda$_4_0() {
    jl_Object.call(this);
    this.$_0 = null;
}
let m_LinearExpression$subtract$lambda$_4_0_accept = (var$0, var$1, var$2) => {
    var$1 = var$1;
    var$2 = var$2;
    ju_Map_merge(var$0.$_0.$expression, var$1, jl_Double_valueOf( -var$2.$value0), new m_LinearExpression$lambda$subtract$0$lambda$_16_0);
},
jl_AbstractStringBuilder$Constants = $rt_classWithoutFields(),
jl_AbstractStringBuilder$Constants_longLogPowersOfTen = null,
jl_AbstractStringBuilder$Constants_doubleAnalysisResult = null,
jl_AbstractStringBuilder$Constants_floatAnalysisResult = null,
jl_AbstractStringBuilder$Constants_$callClinit = () => {
    jl_AbstractStringBuilder$Constants_$callClinit = $rt_eraseClinit(jl_AbstractStringBuilder$Constants);
    jl_AbstractStringBuilder$Constants__clinit_();
},
jl_AbstractStringBuilder$Constants__clinit_ = () => {
    jl_AbstractStringBuilder$Constants_longLogPowersOfTen = $rt_createLongArrayFromData([Long_fromInt(1), Long_fromInt(10), Long_fromInt(100), Long_fromInt(10000), Long_fromInt(100000000), Long_create(1874919424, 2328306)]);
    jl_AbstractStringBuilder$Constants_doubleAnalysisResult = new otcit_DoubleAnalyzer$Result;
    jl_AbstractStringBuilder$Constants_floatAnalysisResult = new otcit_FloatAnalyzer$Result;
};
function ju_AbstractMap$SimpleEntry() {
    let a = this; jl_Object.call(a);
    a.$key = null;
    a.$value1 = null;
}
let ju_AbstractMap$SimpleEntry_setValue = ($this, $value) => {
    let $old;
    $old = $this.$value1;
    $this.$value1 = $value;
    return $old;
},
ju_AbstractMap$SimpleEntry_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = jl_String_valueOf($this.$key);
    var$2 = jl_String_valueOf($this.$value1);
    var$3 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$3);
    var$1 = jl_StringBuilder_append(var$3, var$1);
    jl_AbstractStringBuilder_append(var$1, 61);
    jl_StringBuilder_append(var$1, var$2);
    return jl_AbstractStringBuilder_toString(var$3);
};
function ju_TreeMap$TreeNode() {
    let a = this; ju_AbstractMap$SimpleEntry.call(a);
    a.$left = null;
    a.$right = null;
    a.$height0 = 0;
    a.$size0 = 0;
}
let ju_TreeMap$TreeNode_balance = $this => {
    let $factor;
    $factor = ju_TreeMap$TreeNode_factor($this);
    if ($factor == 2) {
        if (ju_TreeMap$TreeNode_factor($this.$right) < 0)
            $this.$right = ju_TreeMap$TreeNode_rotateRight($this.$right);
        return ju_TreeMap$TreeNode_rotateLeft($this);
    }
    if ($factor != (-2))
        return $this;
    if (ju_TreeMap$TreeNode_factor($this.$left) > 0)
        $this.$left = ju_TreeMap$TreeNode_rotateLeft($this.$left);
    return ju_TreeMap$TreeNode_rotateRight($this);
},
ju_TreeMap$TreeNode_factor = $this => {
    let var$1, var$2;
    var$1 = $this.$right;
    var$2 = var$1 === null ? 0 : var$1.$height0;
    var$1 = $this.$left;
    return var$2 - (var$1 === null ? 0 : var$1.$height0) | 0;
},
ju_TreeMap$TreeNode_rotateRight = $this => {
    let $left;
    $left = $this.$left;
    $this.$left = $left.$right;
    $left.$right = $this;
    ju_TreeMap$TreeNode_fix($this);
    ju_TreeMap$TreeNode_fix($left);
    return $left;
},
ju_TreeMap$TreeNode_rotateLeft = $this => {
    let $right;
    $right = $this.$right;
    $this.$right = $right.$left;
    $right.$left = $this;
    ju_TreeMap$TreeNode_fix($this);
    ju_TreeMap$TreeNode_fix($right);
    return $right;
},
ju_TreeMap$TreeNode_fix = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$right;
    var$2 = var$1 === null ? 0 : var$1.$height0;
    var$1 = $this.$left;
    var$3 = var$1 === null ? 0 : var$1.$height0;
    $this.$height0 = jl_Math_max(var$2, var$3) + 1 | 0;
    $this.$size0 = 1;
    var$1 = $this.$left;
    if (var$1 !== null)
        $this.$size0 = 1 + var$1.$size0 | 0;
    var$1 = $this.$right;
    if (var$1 !== null)
        $this.$size0 = $this.$size0 + var$1.$size0 | 0;
},
ju_TreeMap$TreeNode_forward = ($this, $reverse) => {
    return $reverse ? $this.$right : $this.$left;
},
ju_TreeMap$TreeNode_down = ($this, $reverse) => {
    return $reverse ? $this.$left : $this.$right;
},
otcit_FloatAnalyzer$Result = $rt_classWithoutFields();
function jusi_MappingToObjStreamImpl() {
    let a = this; jusi_SimpleStreamImpl.call(a);
    a.$source0 = null;
    a.$mapper1 = null;
}
let jusi_MappingToObjStreamImpl_next = ($this, $consumer) => {
    let var$2, var$3, var$4, var$5, var$6, var$7;
    var$2 = $this.$source0;
    var$3 = new jusi_MappingToObjStreamImpl$next$lambda$_1_0;
    var$3.$_013 = $this;
    var$3.$_11 = $consumer;
    $consumer = var$2;
    a: {
        while (true) {
            if ($consumer.$index2 >= $consumer.$string3.$nativeString.length)
                break a;
            var$2 = $consumer.$string3;
            var$4 = $consumer.$index2;
            $consumer.$index2 = var$4 + 1 | 0;
            var$5 = jl_String_charAt(var$2, var$4);
            var$2 = var$3.$_11;
            m_LinearExpression$LinearExpressionValidator_$callClinit();
            var$5 = var$5 & 65535;
            jl_Character_$callClinit();
            var$6 = jl_Character_characterCache.data;
            if (var$5 >= var$6.length)
                var$7 = jl_Character__init_(var$5);
            else {
                var$7 = var$6[var$5];
                if (var$7 === null) {
                    var$7 = jl_Character__init_(var$5);
                    jl_Character_characterCache.data[var$5] = var$7;
                }
            }
            if (jusi_SimpleStreamImpl$forEachOrdered$lambda$_19_0_test(var$2, var$7))
                continue;
            else
                break;
        }
    }
    return $consumer.$index2 >= $consumer.$string3.$nativeString.length ? 0 : 1;
};
function jusi_MappingStreamImpl$wrap$lambda$_1_0() {
    let a = this; jl_Object.call(a);
    a.$_03 = null;
    a.$_12 = null;
}
let jusi_MappingStreamImpl$wrap$lambda$_1_0_test = (var$0, var$1) => {
    let var$2;
    var$2 = var$0.$_03;
    return var$0.$_12.$test(var$2.$mapper.$apply1(var$1));
};
function jusi_MappingToDoubleStreamImpl$next$lambda$_1_0() {
    let a = this; jl_Object.call(a);
    a.$_00 = null;
    a.$_10 = null;
}
let jusi_MappingToDoubleStreamImpl$next$lambda$_1_0_test = (var$0, var$1) => {
    let var$2;
    var$2 = var$0.$_00;
    return var$0.$_10.$test0(var$2.$mapper0.$applyAsDouble(var$1));
},
ju_SequencedSet = $rt_classWithoutFields(0);
function ju_TreeMap$EntrySet() {
    let a = this; ju_AbstractSet.call(a);
    a.$modCount4 = 0;
    a.$owner = null;
    a.$from = null;
    a.$fromIncluded = 0;
    a.$fromChecked = 0;
    a.$to = null;
    a.$toIncluded = 0;
    a.$toChecked = 0;
    a.$reverse0 = 0;
}
let ju_TreeMap$EntrySet_iterator = $this => {
    let var$1, var$2;
    if ($this.$reverse0) {
        var$1 = !$this.$toChecked ? ju_TreeMap_pathToFirst($this.$owner, 1) : !$this.$toIncluded ? ju_TreeMap_pathToNext($this.$owner, $this.$to, 1) : ju_TreeMap_pathToExactOrNext($this.$owner, $this.$to, 1);
        var$2 = ju_TreeMap$EntryIterator__init_($this.$owner, var$1, $this.$from, $this.$fromChecked, $this.$fromIncluded, 1);
    } else {
        var$1 = !$this.$fromChecked ? ju_TreeMap_pathToFirst($this.$owner, 0) : !$this.$fromIncluded ? ju_TreeMap_pathToNext($this.$owner, $this.$from, 0) : ju_TreeMap_pathToExactOrNext($this.$owner, $this.$from, 0);
        var$2 = ju_TreeMap$EntryIterator__init_($this.$owner, var$1, $this.$to, $this.$toChecked, $this.$toIncluded, 0);
    }
    return var$2;
};
function m_LinearExpression$TermComponent() {
    let a = this; jl_Object.call(a);
    a.$operator = null;
    a.$coefficientString = null;
    a.$key0 = null;
    a.$isFirst = 0;
    a.$multiplier = null;
    a.$termRep = null;
}
let m_LinearExpression$TermComponent_append = ($this, $str) => {
    jl_AbstractStringBuilder_append0($this.$termRep, $str);
},
m_LinearExpression$lambda$subtract$0$lambda$_16_0 = $rt_classWithoutFields(),
m_LinearExpression$lambda$subtract$0$lambda$_16_0_apply = (var$0, var$1, var$2) => {
    var$1 = var$1;
    var$2 = var$2;
    return jl_Double_valueOf(var$1.$value0 + var$2.$value0);
},
m_Matrix$lambda$getNonZeroSolution$0$lambda$_26_0 = $rt_classWithoutFields();
function jusd_ArrayDoubleStreamImpl() {
    let a = this; jusd_SimpleDoubleStreamImpl.call(a);
    a.$array2 = null;
    a.$index0 = 0;
    a.$end3 = 0;
    a.$size4 = 0;
}
let juf_IntPredicate = $rt_classWithoutFields(0);
function jusi_MappingToObjStreamImpl$next$lambda$_1_0() {
    let a = this; jl_Object.call(a);
    a.$_013 = null;
    a.$_11 = null;
}
function jusd_AnyMatchConsumer() {
    let a = this; jl_Object.call(a);
    a.$matched = 0;
    a.$predicate = null;
}
function ju_TreeMap$EntryIterator() {
    let a = this; jl_Object.call(a);
    a.$modCount2 = 0;
    a.$owner0 = null;
    a.$path = null;
    a.$last = null;
    a.$to0 = null;
    a.$toChecked0 = 0;
    a.$toIncluded0 = 0;
    a.$depth = 0;
    a.$reverse = 0;
}
let ju_TreeMap$EntryIterator__init_0 = ($this, $owner, $path, $to, $toChecked, $toIncluded, $reverse) => {
    let var$7, var$8;
    $this.$owner0 = $owner;
    $this.$modCount2 = $owner.$modCount0;
    $owner = $owner.$root;
    var$7 = $owner !== null ? $owner.$height0 : 0;
    var$8 = $path.data;
    $this.$path = ju_Arrays_copyOf($path, var$7);
    $this.$depth = var$8.length;
    $this.$to0 = $to;
    $this.$toChecked0 = $toChecked;
    $this.$toIncluded0 = $toIncluded;
    $this.$reverse = $reverse;
    ju_TreeMap$EntryIterator_checkFinished($this);
},
ju_TreeMap$EntryIterator__init_ = (var_0, var_1, var_2, var_3, var_4, var_5) => {
    let var_6 = new ju_TreeMap$EntryIterator();
    ju_TreeMap$EntryIterator__init_0(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
    return var_6;
},
ju_TreeMap$EntryIterator_hasNext = $this => {
    return $this.$depth <= 0 ? 0 : 1;
},
ju_TreeMap$EntryIterator_checkFinished = $this => {
    let var$1, $cmp;
    if ($this.$toChecked0) {
        var$1 = $this.$depth;
        if (var$1) {
            $cmp = $this.$owner0.$comparator.$compare($this.$path.data[var$1 - 1 | 0].$key, $this.$to0);
            if ($this.$reverse)
                $cmp =  -$cmp | 0;
            if (!$this.$toIncluded0) {
                if ($cmp >= 0)
                    $this.$depth = 0;
            } else if ($cmp > 0)
                $this.$depth = 0;
            return;
        }
    }
},
ju_TreeMap$EntryIterator_next = $this => {
    let var$1, var$2, var$3, var$4;
    if ($this.$modCount2 != $this.$owner0.$modCount0) {
        var$1 = new ju_ConcurrentModificationException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    var$2 = $this.$depth;
    if (!var$2) {
        var$1 = new ju_NoSuchElementException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    a: {
        var$3 = $this.$path.data;
        var$4 = var$2 - 1 | 0;
        $this.$depth = var$4;
        var$1 = var$3[var$4];
        $this.$last = var$1;
        var$1 = ju_TreeMap$TreeNode_down(var$1, $this.$reverse);
        if (var$1 !== null)
            while (true) {
                if (var$1 === null)
                    break a;
                var$3 = $this.$path.data;
                var$2 = $this.$depth;
                $this.$depth = var$2 + 1 | 0;
                var$3[var$2] = var$1;
                var$1 = ju_TreeMap$TreeNode_forward(var$1, $this.$reverse);
            }
    }
    ju_TreeMap$EntryIterator_checkFinished($this);
    return $this.$last;
},
m_LinearExpression$LinearExpressionValidator$validateTerm$lambda$_2_0 = $rt_classWithoutFields(),
m_LinearExpression$LinearExpressionValidator$validateTerm$lambda$_2_0_test = (var$0, var$1) => {
    var$1 = var$1;
    m_LinearExpression$LinearExpressionValidator_$callClinit();
    return (!jur_Matcher_matches(jur_Pattern_matcher(m_LinearExpression$LinearExpressionValidator_NUMBER, var$1)) && !jur_Matcher_matches(jur_Pattern_matcher(m_LinearExpression$LinearExpressionValidator_VARIABLE, var$1)) ? 0 : 1) ? 0 : 1;
};
function m_LinearExpression$LinearExpressionValidator$validateTerm$lambda$_2_1() {
    jl_Object.call(this);
    this.$_02 = null;
}
let ca_MatrixNode$lambda$execute$0$lambda$_3_0 = $rt_classWithoutFields(),
ca_MatrixNode$lambda$execute$0$lambda$_3_0_applyAsDouble = (var$0, var$1) => {
    return var$1.$value0;
};
function jusd_SimpleDoubleStreamImpl$ArrayFillingConsumer() {
    let a = this; jl_Object.call(a);
    a.$array0 = null;
    a.$index4 = 0;
}
let jusd_SimpleDoubleStreamImpl$ArrayFillingConsumer_test = ($this, $t) => {
    let var$2, var$3;
    var$2 = $this.$array0.data;
    var$3 = $this.$index4;
    $this.$index4 = var$3 + 1 | 0;
    var$2[var$3] = $t;
    return 1;
};
function jusd_SimpleDoubleStreamImpl$toArray$lambda$_16_0() {
    jl_Object.call(this);
    this.$_011 = null;
}
let jusd_SimpleDoubleStreamImpl$toArray$lambda$_16_0_test = (var$0, var$1) => {
    let var$2, var$3;
    var$2 = var$0.$_011;
    var$3 = jl_Double_valueOf(var$1);
    return ju_ArrayList_add(var$2, var$3);
};
$rt_packages([-1, "commandInterpreter", 0, "ast", 0, "tokens", -1, "java", 3, "util", 4, "regex", 3, "lang", -1, "org", 7, "teavm", 8, "classlib", 9, "impl", 10, "unicode", -1, "mathlib"
]);
$rt_metadata([jl_Object, "Object", 6, 0, [], 1, 0, 0, ["$toString", $rt_wrapFunction0(jl_Object_toString)],
ji_Serializable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Comparable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_CharSequence, 0, jl_Object, [], 1537, 0, 0, 0,
jl_String, "String", 6, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 1, 0, jl_String_$callClinit, ["$toString", $rt_wrapFunction0(jl_String_toString)],
jlr_AnnotatedElement, 0, jl_Object, [], 1537, 0, 0, 0,
jlr_GenericDeclaration, 0, jl_Object, [jlr_AnnotatedElement], 1537, 0, 0, 0,
jlr_Type, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Class, 0, jl_Object, [jlr_GenericDeclaration, jlr_Type], 17, 0, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1025, 0, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 1, 0, jl_Integer_$callClinit, 0,
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, ["$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity), "$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString)],
jl_Appendable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 1, 0, 0, ["$insert2", $rt_wrapFunction4(jl_StringBuilder_insert0), "$append3", $rt_wrapFunction3(jl_StringBuilder_append4), "$toString", $rt_wrapFunction0(jl_StringBuilder_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert1", $rt_wrapFunction2(jl_StringBuilder_insert), "$insert", $rt_wrapFunction2(jl_StringBuilder_insert1)],
jl_Throwable, 0, jl_Object, [], 1, 0, 0, ["$getMessage", $rt_wrapFunction0(jl_Throwable_getMessage)],
jl_Exception, 0, jl_Throwable, [], 1, 0, 0, 0,
jl_RuntimeException, 0, jl_Exception, [], 1, 0, 0, 0,
otrr_ReflectionInfo, 0, jl_Object, [], 1025, 0, 0, 0,
otrr_ClassInfo, 0, otrr_ReflectionInfo, [], 17, 0, 0, 0,
otr_StringInfo, 0, otrr_ReflectionInfo, [], 17, 0, 0, 0,
aw_ReplBridge, 0, jl_Object, [], 1, 0, aw_ReplBridge_$callClinit, 0,
jl_ClassCastException, "ClassCastException", 6, jl_RuntimeException, [], 1, [0,0,0], 0, 0,
otp_Platform, 0, jl_Object, [], 17, 0, 0, 0,
otji_JS, 0, jl_Object, [], 17, 0, 0, 0,
otci_IntegerUtil, 0, jl_Object, [], 17, 0, 0, 0,
ju_Comparator, 0, jl_Object, [], 1537, 0, 0, 0,
jl_String$_clinit_$lambda$_118_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, 0,
jl_Character, "Character", 6, jl_Object, [jl_Comparable], 1, 0, jl_Character_$callClinit, ["$toString", $rt_wrapFunction0(jl_Character_toString0)],
c_Interpreter, 0, jl_Object, [], 1, 0, 0, 0,
ju_Objects, 0, jl_Object, [], 17, 0, 0, 0,
otji_JSWrapper, 0, jl_Object, [], 17, 0, 0, 0,
ceu_CommandException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
c_Lexer, 0, jl_Object, [], 1, 0, c_Lexer_$callClinit, 0,
c_Context, 0, jl_Object, [], 1, 0, 0, 0,
jl_IndexOutOfBoundsException, "IndexOutOfBoundsException", 6, jl_RuntimeException, [], 1, [0,0,0], 0, 0,
ju_Map, 0, jl_Object, [], 1537, 0, 0, 0,
ju_AbstractMap, 0, jl_Object, [ju_Map], 1025, 0, 0, ["$put", $rt_wrapFunction2(ju_AbstractMap_put)],
jl_Cloneable, 0, jl_Object, [], 1537, 0, 0, 0,
ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 1, 0, 0, ["$newElementArray", $rt_wrapFunction1(ju_HashMap_newElementArray)],
jur_Pattern, 0, jl_Object, [ji_Serializable], 17, 0, 0, 0,
jl_NullPointerException, "NullPointerException", 6, jl_RuntimeException, [], 1, [0,0,0], 0, 0,
jur_AbstractSet, 0, jl_Object, [], 1024, 0, jur_AbstractSet_$callClinit, ["$find0", $rt_wrapFunction3(jur_AbstractSet_find), "$findBack", $rt_wrapFunction4(jur_AbstractSet_findBack), "$getType0", $rt_wrapFunction0(jur_AbstractSet_getType), "$toString", $rt_wrapFunction0(jur_AbstractSet_toString), "$setNext", $rt_wrapFunction1(jur_AbstractSet_setNext), "$first", $rt_wrapFunction1(jur_AbstractSet_first), "$processBackRefReplacement", $rt_wrapFunction0(jur_AbstractSet_processBackRefReplacement), "$processSecondPass",
$rt_wrapFunction0(jur_AbstractSet_processSecondPass)],
jl_IllegalArgumentException, "IllegalArgumentException", 6, jl_RuntimeException, [], 1, [0,0,0], 0, 0,
jur_FSet, "FSet", 5, jur_AbstractSet, [], 0, 0, jur_FSet_$callClinit, ["$matches", $rt_wrapFunction3(jur_FSet_matches), "$getName", $rt_wrapFunction0(jur_FSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_FSet_hasConsumed)],
jur_Lexer, 0, jl_Object, [], 0, 0, 0, 0,
jur_PatternSyntaxException, "PatternSyntaxException", 5, jl_IllegalArgumentException, [], 1, [0,0,0], 0, ["$getMessage", $rt_wrapFunction0(jur_PatternSyntaxException_getMessage)],
jl_System, 0, jl_Object, [], 17, 0, 0, 0,
jl_Iterable, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Collection, 0, jl_Object, [jl_Iterable], 1537, 0, 0, 0,
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1025, 0, 0, 0]);
$rt_metadata([ju_SequencedCollection, 0, jl_Object, [ju_Collection], 1537, 0, 0, 0,
ju_List, 0, jl_Object, [ju_SequencedCollection], 1537, 0, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1025, 0, 0, 0,
ju_RandomAccess, 0, jl_Object, [], 1537, 0, 0, 0,
ju_ArrayList, "ArrayList", 4, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 1, 0, 0, ["$toString", $rt_wrapFunction0(ju_ArrayList_toString)],
jur_NonCapFSet, "NonCapFSet", 5, jur_FSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_NonCapFSet_matches), "$getName", $rt_wrapFunction0(jur_NonCapFSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_NonCapFSet_hasConsumed)],
jur_AheadFSet, "AheadFSet", 5, jur_FSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AheadFSet_matches), "$getName", $rt_wrapFunction0(jur_AheadFSet_getName)],
jur_BehindFSet, "BehindFSet", 5, jur_FSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_BehindFSet_matches), "$getName", $rt_wrapFunction0(jur_BehindFSet_getName)],
jur_AtomicFSet, "AtomicFSet", 5, jur_FSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AtomicFSet_matches), "$getName", $rt_wrapFunction0(jur_AtomicFSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_AtomicFSet_hasConsumed)],
jur_FinalSet, "FinalSet", 5, jur_FSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_FinalSet_matches), "$getName", $rt_wrapFunction0(jur_FinalSet_getName)],
jur_LeafSet, 0, jur_AbstractSet, [], 1024, 0, 0, ["$matches", $rt_wrapFunction3(jur_LeafSet_matches), "$charCount", $rt_wrapFunction0(jur_LeafSet_charCount), "$hasConsumed", $rt_wrapFunction1(jur_LeafSet_hasConsumed)],
jur_EmptySet, "EmptySet", 5, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_EmptySet_accepts), "$find0", $rt_wrapFunction3(jur_EmptySet_find), "$findBack", $rt_wrapFunction4(jur_EmptySet_findBack), "$getName", $rt_wrapFunction0(jur_EmptySet_getName), "$hasConsumed", $rt_wrapFunction1(jur_EmptySet_hasConsumed)],
jur_JointSet, "JointSet", 5, jur_AbstractSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_JointSet_matches), "$setNext", $rt_wrapFunction1(jur_JointSet_setNext), "$getName", $rt_wrapFunction0(jur_JointSet_getName), "$first", $rt_wrapFunction1(jur_JointSet_first), "$hasConsumed", $rt_wrapFunction1(jur_JointSet_hasConsumed), "$processSecondPass", $rt_wrapFunction0(jur_JointSet_processSecondPass)],
jur_NonCapJointSet, "NonCapJointSet", 5, jur_JointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_NonCapJointSet_matches), "$getName", $rt_wrapFunction0(jur_NonCapJointSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_NonCapJointSet_hasConsumed)],
jur_AtomicJointSet, "AtomicJointSet", 5, jur_NonCapJointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AtomicJointSet_matches), "$setNext", $rt_wrapFunction1(jur_AtomicJointSet_setNext), "$getName", $rt_wrapFunction0(jur_AtomicJointSet_getName)],
jur_PositiveLookAhead, "PositiveLookAhead", 5, jur_AtomicJointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PositiveLookAhead_matches), "$hasConsumed", $rt_wrapFunction1(jur_PositiveLookAhead_hasConsumed), "$getName", $rt_wrapFunction0(jur_PositiveLookAhead_getName)],
jur_NegativeLookAhead, "NegativeLookAhead", 5, jur_AtomicJointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_NegativeLookAhead_matches), "$hasConsumed", $rt_wrapFunction1(jur_NegativeLookAhead_hasConsumed), "$getName", $rt_wrapFunction0(jur_NegativeLookAhead_getName)],
jur_PositiveLookBehind, "PositiveLookBehind", 5, jur_AtomicJointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PositiveLookBehind_matches), "$hasConsumed", $rt_wrapFunction1(jur_PositiveLookBehind_hasConsumed), "$getName", $rt_wrapFunction0(jur_PositiveLookBehind_getName)],
jur_NegativeLookBehind, "NegativeLookBehind", 5, jur_AtomicJointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_NegativeLookBehind_matches), "$hasConsumed", $rt_wrapFunction1(jur_NegativeLookBehind_hasConsumed), "$getName", $rt_wrapFunction0(jur_NegativeLookBehind_getName)],
jur_SingleSet, "SingleSet", 5, jur_JointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_SingleSet_matches), "$find0", $rt_wrapFunction3(jur_SingleSet_find), "$findBack", $rt_wrapFunction4(jur_SingleSet_findBack), "$first", $rt_wrapFunction1(jur_SingleSet_first), "$processBackRefReplacement", $rt_wrapFunction0(jur_SingleSet_processBackRefReplacement), "$processSecondPass", $rt_wrapFunction0(jur_SingleSet_processSecondPass)],
ju_SequencedMap, 0, jl_Object, [ju_Map], 1537, 0, 0, 0,
ju_LinkedHashMap, 0, ju_HashMap, [ju_SequencedMap], 1, 0, 0, ["$newElementArray", $rt_wrapFunction1(ju_LinkedHashMap_newElementArray), "$put", $rt_wrapFunction2(ju_LinkedHashMap_put)],
ju_Collections, 0, jl_Object, [], 17, 0, ju_Collections_$callClinit, 0,
jlr_Array, 0, jl_Object, [], 17, 0, 0, 0,
jl_ArrayStoreException, "ArrayStoreException", 6, jl_RuntimeException, [], 1, [0,0,0], 0, 0,
jur_SpecialToken, 0, jl_Object, [], 1024, 0, 0, 0,
jur_AbstractCharClass, 0, jur_SpecialToken, [], 1024, 0, jur_AbstractCharClass_$callClinit, ["$getBits", $rt_wrapFunction0(jur_AbstractCharClass_getBits), "$getLowHighSurrogates", $rt_wrapFunction0(jur_AbstractCharClass_getLowHighSurrogates), "$getInstance0", $rt_wrapFunction0(jur_AbstractCharClass_getInstance), "$hasUCI", $rt_wrapFunction0(jur_AbstractCharClass_hasUCI)],
ju_MissingResourceException, "MissingResourceException", 4, jl_RuntimeException, [], 1, [0,0,0], 0, 0,
jur_CharClass, "CharClass", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass_contains), "$getBits", $rt_wrapFunction0(jur_CharClass_getBits), "$getLowHighSurrogates", $rt_wrapFunction0(jur_CharClass_getLowHighSurrogates), "$getInstance0", $rt_wrapFunction0(jur_CharClass_getInstance), "$toString", $rt_wrapFunction0(jur_CharClass_toString), "$hasUCI", $rt_wrapFunction0(jur_CharClass_hasUCI)],
jur_QuantifierSet, 0, jur_AbstractSet, [], 1024, 0, 0, ["$first", $rt_wrapFunction1(jur_QuantifierSet_first), "$hasConsumed", $rt_wrapFunction1(jur_QuantifierSet_hasConsumed), "$processSecondPass", $rt_wrapFunction0(jur_QuantifierSet_processSecondPass)],
jur_LeafQuantifierSet, "LeafQuantifierSet", 5, jur_QuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_LeafQuantifierSet_matches), "$getName", $rt_wrapFunction0(jur_LeafQuantifierSet_getName)],
jur_CompositeQuantifierSet, "CompositeQuantifierSet", 5, jur_LeafQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_CompositeQuantifierSet_matches), "$getName", $rt_wrapFunction0(jur_CompositeQuantifierSet_getName)],
jur_GroupQuantifierSet, "GroupQuantifierSet", 5, jur_QuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_GroupQuantifierSet_matches), "$getName", $rt_wrapFunction0(jur_GroupQuantifierSet_getName)],
jur_AltQuantifierSet, "AltQuantifierSet", 5, jur_LeafQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AltQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_AltQuantifierSet_setNext)],
jur_UnifiedQuantifierSet, "UnifiedQuantifierSet", 5, jur_LeafQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_UnifiedQuantifierSet_matches), "$find0", $rt_wrapFunction3(jur_UnifiedQuantifierSet_find)],
ju_Collections$13, 0, ju_AbstractMap, [], 0, 0, 0, 0,
jur_AbstractCharClass$PredefinedCharacterClasses, 0, jl_Object, [], 16, 0, jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit, 0,
jur_AbstractCharClass$LazyCharClass, 0, jl_Object, [], 1024, 0, 0, 0,
jl_NumberFormatException, "NumberFormatException", 6, jl_IllegalArgumentException, [], 1, [0,0,0], 0, 0,
jur_Quantifier, "Quantifier", 5, jur_SpecialToken, [jl_Cloneable], 0, 0, 0, ["$toString", $rt_wrapFunction0(jur_Quantifier_toString)],
jur_FSet$PossessiveFSet, "FSet$PossessiveFSet", 5, jur_AbstractSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_FSet$PossessiveFSet_matches), "$getName", $rt_wrapFunction0(jur_FSet$PossessiveFSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_FSet$PossessiveFSet_hasConsumed)],
ju_BitSet, 0, jl_Object, [jl_Cloneable, ji_Serializable], 1, 0, 0, 0,
jur_LowHighSurrogateRangeSet, 0, jur_JointSet, [], 0, 0, 0, ["$getName", $rt_wrapFunction0(jur_LowHighSurrogateRangeSet_getName)],
jur_CompositeRangeSet, "CompositeRangeSet", 5, jur_JointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_CompositeRangeSet_matches), "$setNext", $rt_wrapFunction1(jur_CompositeRangeSet_setNext), "$getName", $rt_wrapFunction0(jur_CompositeRangeSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_CompositeRangeSet_hasConsumed), "$first", $rt_wrapFunction1(jur_CompositeRangeSet_first)],
jur_SupplRangeSet, "SupplRangeSet", 5, jur_JointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_SupplRangeSet_matches), "$getName", $rt_wrapFunction0(jur_SupplRangeSet_getName), "$contains", $rt_wrapFunction1(jur_SupplRangeSet_contains), "$first", $rt_wrapFunction1(jur_SupplRangeSet_first), "$setNext", $rt_wrapFunction1(jur_SupplRangeSet_setNext), "$hasConsumed", $rt_wrapFunction1(jur_SupplRangeSet_hasConsumed)],
jur_UCISupplRangeSet, "UCISupplRangeSet", 5, jur_SupplRangeSet, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_UCISupplRangeSet_contains), "$getName", $rt_wrapFunction0(jur_UCISupplRangeSet_getName)],
jur_UCIRangeSet, "UCIRangeSet", 5, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_UCIRangeSet_accepts), "$getName", $rt_wrapFunction0(jur_UCIRangeSet_getName)],
jur_RangeSet, "RangeSet", 5, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_RangeSet_accepts), "$getName", $rt_wrapFunction0(jur_RangeSet_getName), "$first", $rt_wrapFunction1(jur_RangeSet_first)],
jur_HangulDecomposedCharSet, "HangulDecomposedCharSet", 5, jur_JointSet, [], 0, 0, 0, ["$setNext", $rt_wrapFunction1(jur_HangulDecomposedCharSet_setNext), "$getName", $rt_wrapFunction0(jur_HangulDecomposedCharSet_getName), "$matches", $rt_wrapFunction3(jur_HangulDecomposedCharSet_matches), "$first", $rt_wrapFunction1(jur_HangulDecomposedCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_HangulDecomposedCharSet_hasConsumed)],
jur_CharSet, "CharSet", 5, jur_LeafSet, [], 0, 0, 0, ["$charCount", $rt_wrapFunction0(jur_CharSet_charCount), "$accepts", $rt_wrapFunction2(jur_CharSet_accepts), "$find0", $rt_wrapFunction3(jur_CharSet_find), "$findBack", $rt_wrapFunction4(jur_CharSet_findBack), "$getName", $rt_wrapFunction0(jur_CharSet_getName), "$first", $rt_wrapFunction1(jur_CharSet_first)]]);
$rt_metadata([jur_UCICharSet, "UCICharSet", 5, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_UCICharSet_accepts), "$getName", $rt_wrapFunction0(jur_UCICharSet_getName)],
jur_CICharSet, "CICharSet", 5, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_CICharSet_accepts), "$getName", $rt_wrapFunction0(jur_CICharSet_getName)],
jur_DecomposedCharSet, "DecomposedCharSet", 5, jur_JointSet, [], 0, 0, 0, ["$setNext", $rt_wrapFunction1(jur_DecomposedCharSet_setNext), "$matches", $rt_wrapFunction3(jur_DecomposedCharSet_matches), "$getName", $rt_wrapFunction0(jur_DecomposedCharSet_getName), "$first", $rt_wrapFunction1(jur_DecomposedCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_DecomposedCharSet_hasConsumed)],
jur_UCIDecomposedCharSet, "UCIDecomposedCharSet", 5, jur_DecomposedCharSet, [], 0, 0, 0, 0,
jur_CIDecomposedCharSet, "CIDecomposedCharSet", 5, jur_DecomposedCharSet, [], 0, 0, 0, 0,
jur_PossessiveGroupQuantifierSet, "PossessiveGroupQuantifierSet", 5, jur_GroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PossessiveGroupQuantifierSet_matches)],
jur_PosPlusGroupQuantifierSet, "PosPlusGroupQuantifierSet", 5, jur_GroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PosPlusGroupQuantifierSet_matches)],
jur_AltGroupQuantifierSet, "AltGroupQuantifierSet", 5, jur_GroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AltGroupQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_AltGroupQuantifierSet_setNext)],
jur_PosAltGroupQuantifierSet, "PosAltGroupQuantifierSet", 5, jur_AltGroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PosAltGroupQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_PosAltGroupQuantifierSet_setNext)],
jur_CompositeGroupQuantifierSet, "CompositeGroupQuantifierSet", 5, jur_GroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_CompositeGroupQuantifierSet_matches), "$getName", $rt_wrapFunction0(jur_CompositeGroupQuantifierSet_getName)],
jur_PosCompositeGroupQuantifierSet, "PosCompositeGroupQuantifierSet", 5, jur_CompositeGroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PosCompositeGroupQuantifierSet_matches)],
jur_ReluctantGroupQuantifierSet, "ReluctantGroupQuantifierSet", 5, jur_GroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_ReluctantGroupQuantifierSet_matches)],
jur_RelAltGroupQuantifierSet, "RelAltGroupQuantifierSet", 5, jur_AltGroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_RelAltGroupQuantifierSet_matches)],
jur_RelCompositeGroupQuantifierSet, "RelCompositeGroupQuantifierSet", 5, jur_CompositeGroupQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_RelCompositeGroupQuantifierSet_matches)],
jur_DotAllQuantifierSet, "DotAllQuantifierSet", 5, jur_QuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_DotAllQuantifierSet_matches), "$find0", $rt_wrapFunction3(jur_DotAllQuantifierSet_find), "$getName", $rt_wrapFunction0(jur_DotAllQuantifierSet_getName)],
jur_DotQuantifierSet, "DotQuantifierSet", 5, jur_QuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_DotQuantifierSet_matches), "$find0", $rt_wrapFunction3(jur_DotQuantifierSet_find), "$getName", $rt_wrapFunction0(jur_DotQuantifierSet_getName)],
jur_AbstractLineTerminator, 0, jl_Object, [], 1024, 0, 0, 0,
jur_PossessiveQuantifierSet, "PossessiveQuantifierSet", 5, jur_LeafQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PossessiveQuantifierSet_matches)],
jur_PossessiveAltQuantifierSet, "PossessiveAltQuantifierSet", 5, jur_AltQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PossessiveAltQuantifierSet_matches)],
jur_PossessiveCompositeQuantifierSet, "PossessiveCompositeQuantifierSet", 5, jur_CompositeQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PossessiveCompositeQuantifierSet_matches)],
jur_ReluctantQuantifierSet, "ReluctantQuantifierSet", 5, jur_LeafQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_ReluctantQuantifierSet_matches)],
jur_ReluctantAltQuantifierSet, "ReluctantAltQuantifierSet", 5, jur_AltQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_ReluctantAltQuantifierSet_matches)],
jur_ReluctantCompositeQuantifierSet, "ReluctantCompositeQuantifierSet", 5, jur_CompositeQuantifierSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_ReluctantCompositeQuantifierSet_matches)],
jur_SOLSet, "SOLSet", 5, jur_AbstractSet, [], 16, 0, 0, ["$matches", $rt_wrapFunction3(jur_SOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_SOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_SOLSet_getName)],
jur_WordBoundary, "WordBoundary", 5, jur_AbstractSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_WordBoundary_matches), "$hasConsumed", $rt_wrapFunction1(jur_WordBoundary_hasConsumed), "$getName", $rt_wrapFunction0(jur_WordBoundary_getName)],
jur_PreviousMatch, "PreviousMatch", 5, jur_AbstractSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PreviousMatch_matches), "$hasConsumed", $rt_wrapFunction1(jur_PreviousMatch_hasConsumed), "$getName", $rt_wrapFunction0(jur_PreviousMatch_getName)],
jur_EOLSet, "EOLSet", 5, jur_AbstractSet, [], 16, 0, 0, ["$matches", $rt_wrapFunction3(jur_EOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_EOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_EOLSet_getName)],
jur_EOISet, "EOISet", 5, jur_AbstractSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_EOISet_matches), "$hasConsumed", $rt_wrapFunction1(jur_EOISet_hasConsumed), "$getName", $rt_wrapFunction0(jur_EOISet_getName)],
jur_MultiLineSOLSet, "MultiLineSOLSet", 5, jur_AbstractSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_MultiLineSOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_MultiLineSOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_MultiLineSOLSet_getName)],
jur_DotAllSet, "DotAllSet", 5, jur_JointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_DotAllSet_matches), "$getName", $rt_wrapFunction0(jur_DotAllSet_getName), "$setNext", $rt_wrapFunction1(jur_DotAllSet_setNext), "$getType0", $rt_wrapFunction0(jur_DotAllSet_getType), "$hasConsumed", $rt_wrapFunction1(jur_DotAllSet_hasConsumed)],
jur_DotSet, "DotSet", 5, jur_JointSet, [], 16, 0, 0, ["$matches", $rt_wrapFunction3(jur_DotSet_matches), "$getName", $rt_wrapFunction0(jur_DotSet_getName), "$setNext", $rt_wrapFunction1(jur_DotSet_setNext), "$getType0", $rt_wrapFunction0(jur_DotSet_getType), "$hasConsumed", $rt_wrapFunction1(jur_DotSet_hasConsumed)],
jur_UEOLSet, "UEOLSet", 5, jur_AbstractSet, [], 16, 0, 0, ["$matches", $rt_wrapFunction3(jur_UEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_UEOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_UEOLSet_getName)],
jur_UMultiLineEOLSet, "UMultiLineEOLSet", 5, jur_AbstractSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_UMultiLineEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_UMultiLineEOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_UMultiLineEOLSet_getName)],
jur_MultiLineEOLSet, "MultiLineEOLSet", 5, jur_AbstractSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_MultiLineEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_MultiLineEOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_MultiLineEOLSet_getName)],
jur_CIBackReferenceSet, "CIBackReferenceSet", 5, jur_JointSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_CIBackReferenceSet_matches), "$setNext", $rt_wrapFunction1(jur_CIBackReferenceSet_setNext), "$getName", $rt_wrapFunction0(jur_CIBackReferenceSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_CIBackReferenceSet_hasConsumed)],
jur_BackReferenceSet, "BackReferenceSet", 5, jur_CIBackReferenceSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_BackReferenceSet_matches), "$find0", $rt_wrapFunction3(jur_BackReferenceSet_find), "$findBack", $rt_wrapFunction4(jur_BackReferenceSet_findBack), "$first", $rt_wrapFunction1(jur_BackReferenceSet_first), "$getName", $rt_wrapFunction0(jur_BackReferenceSet_getName)],
jur_UCIBackReferenceSet, "UCIBackReferenceSet", 5, jur_CIBackReferenceSet, [], 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_UCIBackReferenceSet_matches), "$getName", $rt_wrapFunction0(jur_UCIBackReferenceSet_getName)],
jl_StringBuffer, 0, jl_AbstractStringBuilder, [jl_Appendable], 1, 0, 0, ["$insert2", $rt_wrapFunction4(jl_StringBuffer_insert1), "$append3", $rt_wrapFunction3(jl_StringBuffer_append0), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuffer_ensureCapacity), "$insert1", $rt_wrapFunction2(jl_StringBuffer_insert0), "$insert", $rt_wrapFunction2(jl_StringBuffer_insert)],
jur_SequenceSet, "SequenceSet", 5, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_SequenceSet_accepts), "$find0", $rt_wrapFunction3(jur_SequenceSet_find), "$findBack", $rt_wrapFunction4(jur_SequenceSet_findBack), "$getName", $rt_wrapFunction0(jur_SequenceSet_getName), "$first", $rt_wrapFunction1(jur_SequenceSet_first)],
jur_UCISequenceSet, "UCISequenceSet", 5, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_UCISequenceSet_accepts), "$getName", $rt_wrapFunction0(jur_UCISequenceSet_getName)],
jur_CISequenceSet, "CISequenceSet", 5, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_CISequenceSet_accepts), "$getName", $rt_wrapFunction0(jur_CISequenceSet_getName)],
ju_Set, 0, jl_Object, [ju_Collection], 1537, 0, 0, 0,
ju_AbstractSet, 0, ju_AbstractCollection, [ju_Set], 1025, 0, 0, 0,
ju_TemplateCollections$AbstractImmutableSet, 0, ju_AbstractSet, [], 1024, 0, 0, 0,
ju_Collections$1, 0, ju_TemplateCollections$AbstractImmutableSet, [], 0, 0, 0, 0,
ju_TemplateCollections$AbstractImmutableMap, 0, ju_AbstractMap, [], 1024, 0, 0, ["$put", $rt_wrapFunction2(ju_TemplateCollections$AbstractImmutableMap_put)],
ju_Collections$2, 0, ju_TemplateCollections$AbstractImmutableMap, [], 0, 0, 0, 0,
ju_TemplateCollections$AbstractImmutableList, 0, ju_AbstractList, [ju_RandomAccess], 1024, 0, 0, 0,
ju_Collections$3, 0, ju_TemplateCollections$AbstractImmutableList, [], 0, 0, 0, 0,
ju_Iterator, 0, jl_Object, [], 1537, 0, 0, 0]);
$rt_metadata([ju_Collections$4, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0,
ju_ListIterator, 0, jl_Object, [ju_Iterator], 1537, 0, 0, 0,
ju_Collections$5, 0, jl_Object, [ju_ListIterator], 0, 0, 0, 0,
ju_Collections$_clinit_$lambda$_59_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, 0,
jur_UCISupplCharSet, "UCISupplCharSet", 5, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_UCISupplCharSet_accepts), "$getName", $rt_wrapFunction0(jur_UCISupplCharSet_getName)],
jur_LowSurrogateCharSet, "LowSurrogateCharSet", 5, jur_JointSet, [], 0, 0, 0, ["$setNext", $rt_wrapFunction1(jur_LowSurrogateCharSet_setNext), "$matches", $rt_wrapFunction3(jur_LowSurrogateCharSet_matches), "$find0", $rt_wrapFunction3(jur_LowSurrogateCharSet_find), "$findBack", $rt_wrapFunction4(jur_LowSurrogateCharSet_findBack), "$getName", $rt_wrapFunction0(jur_LowSurrogateCharSet_getName), "$first", $rt_wrapFunction1(jur_LowSurrogateCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_LowSurrogateCharSet_hasConsumed)],
jur_HighSurrogateCharSet, "HighSurrogateCharSet", 5, jur_JointSet, [], 0, 0, 0, ["$setNext", $rt_wrapFunction1(jur_HighSurrogateCharSet_setNext), "$matches", $rt_wrapFunction3(jur_HighSurrogateCharSet_matches), "$find0", $rt_wrapFunction3(jur_HighSurrogateCharSet_find), "$findBack", $rt_wrapFunction4(jur_HighSurrogateCharSet_findBack), "$getName", $rt_wrapFunction0(jur_HighSurrogateCharSet_getName), "$first", $rt_wrapFunction1(jur_HighSurrogateCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_HighSurrogateCharSet_hasConsumed)],
jur_SupplCharSet, "SupplCharSet", 5, jur_LeafSet, [], 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_SupplCharSet_accepts), "$find0", $rt_wrapFunction3(jur_SupplCharSet_find), "$findBack", $rt_wrapFunction4(jur_SupplCharSet_findBack), "$getName", $rt_wrapFunction0(jur_SupplCharSet_getName), "$first", $rt_wrapFunction1(jur_SupplCharSet_first)],
jur_AbstractLineTerminator$1, 0, jur_AbstractLineTerminator, [], 0, 0, 0, ["$isLineTerminator", $rt_wrapFunction1(jur_AbstractLineTerminator$1_isLineTerminator), "$isAfterLineTerminator", $rt_wrapFunction2(jur_AbstractLineTerminator$1_isAfterLineTerminator)],
jur_AbstractLineTerminator$2, 0, jur_AbstractLineTerminator, [], 0, 0, 0, ["$isLineTerminator", $rt_wrapFunction1(jur_AbstractLineTerminator$2_isLineTerminator), "$isAfterLineTerminator", $rt_wrapFunction2(jur_AbstractLineTerminator$2_isAfterLineTerminator)],
jur_SequenceSet$IntHash, 0, jl_Object, [], 0, 0, 0, 0,
jur_AbstractCharClass$LazySpace, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazySpace_computeValue)],
jur_AbstractCharClass$LazyDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyDigit_computeValue)],
jur_AbstractCharClass$LazyLower, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyLower_computeValue)],
jur_AbstractCharClass$LazyUpper, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyUpper_computeValue)],
jur_AbstractCharClass$LazyASCII, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyASCII_computeValue)],
jur_AbstractCharClass$LazyAlpha, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyAlpha_computeValue)],
jur_AbstractCharClass$LazyAlnum, 0, jur_AbstractCharClass$LazyAlpha, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyAlnum_computeValue)],
jur_AbstractCharClass$LazyPunct, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyPunct_computeValue)],
jur_AbstractCharClass$LazyGraph, 0, jur_AbstractCharClass$LazyAlnum, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyGraph_computeValue)],
jur_AbstractCharClass$LazyPrint, 0, jur_AbstractCharClass$LazyGraph, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyPrint_computeValue)],
jur_AbstractCharClass$LazyBlank, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyBlank_computeValue)],
jur_AbstractCharClass$LazyCntrl, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCntrl_computeValue)],
jur_AbstractCharClass$LazyXDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyXDigit_computeValue)],
jur_AbstractCharClass$LazyJavaLowerCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLowerCase_computeValue)],
jur_AbstractCharClass$LazyJavaUpperCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUpperCase_computeValue)],
jur_AbstractCharClass$LazyJavaWhitespace, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaWhitespace_computeValue)],
jur_AbstractCharClass$LazyJavaMirrored, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaMirrored_computeValue)],
jur_AbstractCharClass$LazyJavaDefined, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaDefined_computeValue)],
jur_AbstractCharClass$LazyJavaDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaDigit_computeValue)],
jur_AbstractCharClass$LazyJavaIdentifierIgnorable, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaIdentifierIgnorable_computeValue)],
jur_AbstractCharClass$LazyJavaISOControl, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaISOControl_computeValue)],
jur_AbstractCharClass$LazyJavaJavaIdentifierPart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaJavaIdentifierPart_computeValue)],
jur_AbstractCharClass$LazyJavaJavaIdentifierStart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaJavaIdentifierStart_computeValue)],
jur_AbstractCharClass$LazyJavaLetter, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLetter_computeValue)],
jur_AbstractCharClass$LazyJavaLetterOrDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLetterOrDigit_computeValue)],
jur_AbstractCharClass$LazyJavaSpaceChar, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaSpaceChar_computeValue)],
jur_AbstractCharClass$LazyJavaTitleCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaTitleCase_computeValue)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart_computeValue)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart_computeValue)],
jur_AbstractCharClass$LazyWord, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyWord_computeValue)],
jur_AbstractCharClass$LazyNonWord, 0, jur_AbstractCharClass$LazyWord, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonWord_computeValue)],
jur_AbstractCharClass$LazyNonSpace, 0, jur_AbstractCharClass$LazySpace, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonSpace_computeValue)],
jur_AbstractCharClass$LazyNonDigit, 0, jur_AbstractCharClass$LazyDigit, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonDigit_computeValue)],
jur_AbstractCharClass$LazyRange, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyRange_computeValue)],
jur_AbstractCharClass$LazySpecialsBlock, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazySpecialsBlock_computeValue)],
jur_AbstractCharClass$LazyCategory, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCategory_computeValue)],
jur_AbstractCharClass$LazyCategoryScope, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCategoryScope_computeValue)],
jl_NegativeArraySizeException, "NegativeArraySizeException", 6, jl_RuntimeException, [], 1, [0,0,0], 0, 0,
jur_IntHash, 0, jl_Object, [], 0, 0, 0, 0]);
$rt_metadata([otpp_ResourceAccessor, 0, jl_Object, [], 16, 0, 0, 0,
otciu_UnicodeHelper, 0, jl_Object, [], 17, 0, 0, 0,
otciu_CharMapping, 0, jl_Object, [], 1, 0, 0, 0,
otciu_UnicodeHelper$Range, "UnicodeHelper$Range", 11, jl_Object, [], 1, 0, 0, 0,
otci_CharFlow, 0, jl_Object, [], 1, 0, 0, 0,
otci_Base46, 0, jl_Object, [], 17, 0, 0, 0,
ju_Arrays, 0, jl_Object, [], 1, 0, 0, 0,
jl_Math, 0, jl_Object, [], 17, 0, 0, 0,
ju_Map$Entry, 0, jl_Object, [], 1537, 0, 0, 0,
ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0,
ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0,
ju_LinkedHashMap$LinkedHashMapEntry, 0, ju_HashMap$HashEntry, [], 16, 0, 0, 0,
jl_UnsupportedOperationException, "UnsupportedOperationException", 6, jl_RuntimeException, [], 1, [0,0,0], 0, 0,
c_Parser, 0, jl_Object, [], 1, 0, 0, 0,
jl_StringIndexOutOfBoundsException, "StringIndexOutOfBoundsException", 6, jl_IndexOutOfBoundsException, [], 1, [0,0,0], 0, 0,
jur_AbstractCharClass$1, "AbstractCharClass$1", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$1_contains)],
jur_AbstractCharClass$2, "AbstractCharClass$2", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$2_contains)],
jur_CharClass$18, "CharClass$18", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$18_contains), "$toString", $rt_wrapFunction0(jur_CharClass$18_toString)],
jur_CharClass$1, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$1_contains)],
jur_CharClass$3, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$3_contains)],
jur_CharClass$2, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$2_contains)],
jur_CharClass$5, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$5_contains)],
jur_CharClass$4, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$4_contains)],
jur_CharClass$7, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$7_contains)],
jur_CharClass$6, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$6_contains)],
jur_CharClass$9, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$9_contains)],
jur_CharClass$8, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$8_contains)],
jur_CharClass$11, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$11_contains)],
jur_CharClass$10, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$10_contains)],
jur_CharClass$13, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$13_contains)],
jur_CharClass$12, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$12_contains)],
jur_CharClass$15, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$15_contains)],
jur_CharClass$14, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$14_contains)],
jur_CharClass$17, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$17_contains)],
jur_CharClass$16, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_CharClass$16_contains)],
jur_BackReferencedSingleSet, "BackReferencedSingleSet", 5, jur_SingleSet, [], 0, 0, 0, ["$find0", $rt_wrapFunction3(jur_BackReferencedSingleSet_find), "$findBack", $rt_wrapFunction4(jur_BackReferencedSingleSet_findBack), "$processBackRefReplacement", $rt_wrapFunction0(jur_BackReferencedSingleSet_processBackRefReplacement)],
jur_AbstractCharClass$LazyJavaLowerCase$1, "AbstractCharClass$LazyJavaLowerCase$1", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLowerCase$1_contains)],
jur_AbstractCharClass$LazyJavaUpperCase$1, "AbstractCharClass$LazyJavaUpperCase$1", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUpperCase$1_contains)],
jur_AbstractCharClass$LazyJavaWhitespace$1, "AbstractCharClass$LazyJavaWhitespace$1", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaWhitespace$1_contains)],
jur_AbstractCharClass$LazyJavaMirrored$1, "AbstractCharClass$LazyJavaMirrored$1", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaMirrored$1_contains)],
jur_AbstractCharClass$LazyJavaDefined$1, "AbstractCharClass$LazyJavaDefined$1", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaDefined$1_contains)],
jur_AbstractCharClass$LazyJavaDigit$1, "AbstractCharClass$LazyJavaDigit$1", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaDigit$1_contains)],
jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1, "AbstractCharClass$LazyJavaIdentifierIgnorable$1", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1_contains)],
jur_AbstractCharClass$LazyJavaISOControl$1, "AbstractCharClass$LazyJavaISOControl$1", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaISOControl$1_contains)],
jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1, "AbstractCharClass$LazyJavaJavaIdentifierPart$1", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1_contains)],
jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1, "AbstractCharClass$LazyJavaJavaIdentifierStart$1", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1_contains)],
jur_AbstractCharClass$LazyJavaLetter$1, "AbstractCharClass$LazyJavaLetter$1", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLetter$1_contains)],
jur_AbstractCharClass$LazyJavaLetterOrDigit$1, "AbstractCharClass$LazyJavaLetterOrDigit$1", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLetterOrDigit$1_contains)],
jur_AbstractCharClass$LazyJavaSpaceChar$1, "AbstractCharClass$LazyJavaSpaceChar$1", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaSpaceChar$1_contains)],
jur_AbstractCharClass$LazyJavaTitleCase$1, "AbstractCharClass$LazyJavaTitleCase$1", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaTitleCase$1_contains)]]);
$rt_metadata([jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1, "AbstractCharClass$LazyJavaUnicodeIdentifierPart$1", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1_contains)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1, "AbstractCharClass$LazyJavaUnicodeIdentifierStart$1", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1_contains)],
jur_UnicodeCategory, "UnicodeCategory", 5, jur_AbstractCharClass, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_UnicodeCategory_contains)],
jur_UnicodeCategoryScope, "UnicodeCategoryScope", 5, jur_UnicodeCategory, [], 0, 0, 0, ["$contains", $rt_wrapFunction1(jur_UnicodeCategoryScope_contains)],
ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0,
ct_Token, "Token", 2, jl_Object, [], 1, 0, 0, 0,
jl_Enum, 0, jl_Object, [jl_Comparable, ji_Serializable], 1025, 0, 0, ["$toString", $rt_wrapFunction0(jl_Enum_toString)],
ct_TokenType, 0, jl_Enum, [], 65553, 0, ct_TokenType_$callClinit, 0,
jur_MatchResult, 0, jl_Object, [], 1537, 0, 0, 0,
jur_Matcher, 0, jl_Object, [jur_MatchResult], 17, 0, 0, 0,
jur_MatchResultImpl, 0, jl_Object, [jur_MatchResult], 0, 0, 0, 0,
ceu_ParseException, 0, ceu_CommandException, [], 1, 0, 0, 0,
ju_ConcurrentModificationException, "ConcurrentModificationException", 4, jl_RuntimeException, [], 1, [0,0,0], 0, 0,
jur_Matcher$1, "Matcher$1", 5, jl_Object, [], 0, 0, 0, ["$toString", $rt_wrapFunction0(jur_Matcher$1_toString)],
ca_AstNode, 0, jl_Object, [], 1537, 0, 0, 0,
ca_MonoFunctionNode, 0, jl_Object, [ca_AstNode], 1, 0, 0, ["$execute", $rt_wrapFunction1(ca_MonoFunctionNode_execute)],
ca_AssignNode, 0, jl_Object, [ca_AstNode], 1, 0, 0, ["$execute", $rt_wrapFunction1(ca_AssignNode_execute)],
ca_BinaryExpressionNode, 0, jl_Object, [ca_AstNode], 1, 0, 0, ["$execute", $rt_wrapFunction1(ca_BinaryExpressionNode_execute)],
jl_IllegalStateException, "IllegalStateException", 6, jl_RuntimeException, [], 1, [0,0,0], 0, 0,
ca_FunctionType, "FunctionType", 1, jl_Enum, [], 65553, 0, ca_FunctionType_$callClinit, 0,
ju_Optional, 0, jl_Object, [], 17, 0, 0, 0,
juf_Predicate, 0, jl_Object, [], 1537, 0, 0, 0,
ca_FunctionType$fromIdentifier$lambda$_3_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(ca_FunctionType$fromIdentifier$lambda$_3_0_test)],
ju_NoSuchElementException, "NoSuchElementException", 4, jl_RuntimeException, [], 1, [0,0,0], 0, 0,
jur_IntArrHash, 0, jl_Object, [], 0, 0, 0, 0,
jl_AutoCloseable, 0, jl_Object, [], 1537, 0, 0, 0,
jus_BaseStream, 0, jl_Object, [jl_AutoCloseable], 1537, 0, 0, 0,
jus_Stream, 0, jl_Object, [jus_BaseStream], 1537, 0, 0, 0,
jusi_SimpleStreamImpl, 0, jl_Object, [jus_Stream], 1025, 0, 0, 0,
jusi_ArrayStreamImpl, 0, jusi_SimpleStreamImpl, [], 1, 0, 0, ["$next1", $rt_wrapFunction1(jusi_ArrayStreamImpl_next), "$estimateSize", $rt_wrapFunction0(jusi_ArrayStreamImpl_estimateSize)],
jl_CloneNotSupportedException, 0, jl_Exception, [], 1, 0, 0, 0,
ca_MonoFunctionNode$1, 0, jl_Object, [], 32768, 0, ca_MonoFunctionNode$1_$callClinit, 0,
jl_MatchException, "MatchException", 6, jl_RuntimeException, [], 17, [0,0,0], 0, 0,
jusi_WrappingStreamImpl, 0, jusi_SimpleStreamImpl, [], 1025, 0, 0, ["$next1", $rt_wrapFunction1(jusi_WrappingStreamImpl_next), "$estimateSize", $rt_wrapFunction0(jusi_WrappingStreamImpl_estimateSize)],
jusi_FilteringStreamImpl, 0, jusi_WrappingStreamImpl, [], 1, 0, 0, ["$wrap", $rt_wrapFunction1(jusi_FilteringStreamImpl_wrap)],
ca_BinaryExpressionNode$1, 0, jl_Object, [], 32768, 0, ca_BinaryExpressionNode$1_$callClinit, 0,
ceu_CommandExecutorException, 0, ceu_CommandException, [], 1, 0, 0, 0,
ca_MatrixNode, 0, jl_Object, [ca_AstNode], 1, 0, 0, ["$execute", $rt_wrapFunction1(ca_MatrixNode_execute)],
jl_Record, 0, jl_Object, [], 1025, 0, 0, 0,
cav_Value, 0, jl_Object, [], 1537, 0, 0, 0,
cav_SolutionValue, 0, jl_Record, [cav_Value], 17, 0, 0, ["$toString", $rt_wrapFunction0(cav_SolutionValue_toString)],
me_MatrixArgumentException, 0, jl_Exception, [], 1, 0, 0, 0,
me_NoSolutionException, 0, me_MatrixArgumentException, [], 1, 0, 0, 0,
cav_NumberValue, 0, jl_Record, [cav_Value], 17, 0, 0, ["$toString", $rt_wrapFunction0(cav_NumberValue_toString)],
me_DeterminantException, 0, me_MatrixArgumentException, [], 1, 0, 0, 0,
cav_MatrixValue, 0, jl_Record, [cav_Value], 17, 0, 0, ["$toString", $rt_wrapFunction0(cav_MatrixValue_toString)],
m_Matrix, 0, jl_Object, [], 1, 0, 0, 0,
jusi_FindFirstConsumer, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_FindFirstConsumer_test)],
jl_Double, "Double", 6, jl_Number, [jl_Comparable], 1, 0, jl_Double_$callClinit, ["$toString", $rt_wrapFunction0(jl_Double_toString0)],
juf_Function, 0, jl_Object, [], 1537, 0, 0, 0]);
$rt_metadata([ca_MatrixNode$execute$lambda$_1_0, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply1", $rt_wrapFunction1(ca_MatrixNode$execute$lambda$_1_0_apply)],
juf_IntFunction, 0, jl_Object, [], 1537, 0, 0, 0,
ca_MatrixNode$execute$lambda$_1_1, 0, jl_Object, [juf_IntFunction], 1, 0, 0, ["$apply0", $rt_wrapFunction1(ca_MatrixNode$execute$lambda$_1_1_apply)],
ca_NumberExpr, 0, jl_Object, [ca_AstNode], 1, 0, 0, ["$execute", $rt_wrapFunction1(ca_NumberExpr_execute)],
ca_VariableNode, 0, jl_Object, [ca_AstNode], 1, 0, 0, ["$execute", $rt_wrapFunction1(ca_VariableNode_execute)],
otcit_DoubleSynthesizer, 0, jl_Object, [], 17, 0, otcit_DoubleSynthesizer_$callClinit, 0,
jl_Long, 0, jl_Number, [jl_Comparable], 1, 0, jl_Long_$callClinit, 0,
otcit_DoubleAnalyzer, 0, jl_Object, [], 17, 0, otcit_DoubleAnalyzer_$callClinit, 0,
otcit_DoubleAnalyzer$Result, 0, jl_Object, [], 1, 0, 0, 0,
juf_ToDoubleFunction, 0, jl_Object, [], 1537, 0, 0, 0,
m_Matrix$laplaceExpansion$lambda$_16_0, 0, jl_Object, [juf_ToDoubleFunction], 1, 0, 0, ["$applyAsDouble", $rt_wrapFunction1(m_Matrix$laplaceExpansion$lambda$_16_0_applyAsDouble)],
jusi_StreamOverSpliterator, 0, jusi_SimpleStreamImpl, [], 1, 0, 0, ["$next1", $rt_wrapFunction1(jusi_StreamOverSpliterator_next), "$estimateSize", $rt_wrapFunction0(jusi_StreamOverSpliterator_estimateSize)],
m_LinearExpression, "LinearExpression", 12, jl_Object, [], 1, 0, 0, ["$toString", $rt_wrapFunction0(m_LinearExpression_toString)],
m_Matrix$sortEquations$lambda$_15_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, ["$compare", $rt_wrapFunction2(m_Matrix$sortEquations$lambda$_15_0_compare)],
m_Matrix$getNonZeroSolution$lambda$_14_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(m_Matrix$getNonZeroSolution$lambda$_14_0_test)],
m_Matrix$getNonZeroSolution$lambda$_14_1, 0, jl_Object, [juf_Function], 1, 0, 0, ["$apply1", $rt_wrapFunction1(m_Matrix$getNonZeroSolution$lambda$_14_1_apply)],
m_Matrix$getNonZeroSolution$lambda$_14_2, 0, jl_Object, [juf_IntFunction], 1, 0, 0, ["$apply0", $rt_wrapFunction1(m_Matrix$getNonZeroSolution$lambda$_14_2_apply)],
ju_Comparator$NaturalOrder, 0, jl_Object, [ju_Comparator], 1, 0, ju_Comparator$NaturalOrder_$callClinit, ["$compare", $rt_wrapFunction2(ju_Comparator$NaturalOrder_compare)],
ju_SortedMap, 0, jl_Object, [ju_SequencedMap], 1537, 0, 0, 0,
ju_NavigableMap, 0, jl_Object, [ju_SortedMap], 1537, 0, 0, 0,
ju_TreeMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable, ju_NavigableMap], 1, 0, 0, 0,
m_LinearExpression$_init_$lambda$_0_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, ["$compare", $rt_wrapFunction2(m_LinearExpression$_init_$lambda$_0_0_compare)],
m_LinearExpression$LinearExpressionValidator, 0, jl_Object, [], 1, 0, m_LinearExpression$LinearExpressionValidator_$callClinit, 0,
m_LinearExpression$LinearExpressionValidator$validate$lambda$_1_0, 0, jl_Object, [juf_IntFunction], 1, 0, 0, 0,
juf_Consumer, 0, jl_Object, [], 1537, 0, 0, 0,
m_LinearExpression$LinearExpressionValidator$validate$lambda$_1_1, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept0", $rt_wrapFunction1(m_LinearExpression$LinearExpressionValidator$validate$lambda$_1_1_accept)],
m_LinearExpression$LinearExpressionValidator$validate$lambda$_1_2, 0, jl_Object, [juf_Consumer], 1, 0, 0, ["$accept0", $rt_wrapFunction1(m_LinearExpression$LinearExpressionValidator$validate$lambda$_1_2_accept)],
juf_BiFunction, 0, jl_Object, [], 1537, 0, 0, 0,
m_LinearExpression$convertToExpression$lambda$_2_0, 0, jl_Object, [juf_BiFunction], 1, 0, 0, ["$apply", $rt_wrapFunction2(m_LinearExpression$convertToExpression$lambda$_2_0_apply)],
jusi_MappingStreamImpl, 0, jusi_WrappingStreamImpl, [], 1, 0, 0, ["$wrap", $rt_wrapFunction1(jusi_MappingStreamImpl_wrap)],
juf_BiConsumer, 0, jl_Object, [], 1537, 0, 0, 0,
m_LinearExpression$round$lambda$_7_0, 0, jl_Object, [juf_BiConsumer], 1, 0, 0, ["$accept", $rt_wrapFunction2(m_LinearExpression$round$lambda$_7_0_accept)],
m_LinearExpression$multiplyConstant$lambda$_5_0, 0, jl_Object, [juf_BiConsumer], 1, 0, 0, ["$accept", $rt_wrapFunction2(m_LinearExpression$multiplyConstant$lambda$_5_0_accept)],
juca_AtomicInteger, 0, jl_Number, [ji_Serializable], 1, 0, 0, 0,
m_LinearExpression$toString$lambda$_8_0, 0, jl_Object, [juf_BiConsumer], 1, 0, 0, ["$accept", $rt_wrapFunction2(m_LinearExpression$toString$lambda$_8_0_accept)],
jus_DoubleStream, 0, jl_Object, [jus_BaseStream], 1537, 0, 0, 0,
jusd_SimpleDoubleStreamImpl, 0, jl_Object, [jus_DoubleStream], 1025, 0, 0, 0,
jusi_MappingToDoubleStreamImpl, 0, jusd_SimpleDoubleStreamImpl, [], 1, 0, 0, 0,
ceu_ContextNotFoundException, 0, ceu_CommandException, [], 1, 0, 0, 0,
jusi_FilteringStreamImpl$wrap$lambda$_1_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_FilteringStreamImpl$wrap$lambda$_1_0_test)],
ju_Spliterator, 0, jl_Object, [], 1537, 0, 0, 0,
jusi_SpliteratorOverCollection, 0, jl_Object, [ju_Spliterator], 1, 0, 0, 0,
m_LinearExpression$removeZeroCoefficents$lambda$_6_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, 0,
jusi_SimpleStreamImpl$ArrayFillingConsumer, 0, jl_Object, [juf_Predicate], 0, 0, 0, ["$test", $rt_wrapFunction1(jusi_SimpleStreamImpl$ArrayFillingConsumer_test)],
jusi_SimpleStreamImpl$toArray$lambda$_21_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_SimpleStreamImpl$toArray$lambda$_21_0_test)],
juf_DoublePredicate, 0, jl_Object, [], 1537, 0, 0, 0,
jusd_SumDoubleConsumer, 0, jl_Object, [juf_DoublePredicate], 1, 0, 0, ["$test0", $rt_wrapFunction1(jusd_SumDoubleConsumer_test)],
jus_IntStream, 0, jl_Object, [jus_BaseStream], 1537, 0, 0, 0,
jusi_SimpleIntStreamImpl, 0, jl_Object, [jus_IntStream], 1025, 0, 0, 0,
jusi_StringCharsStream, 0, jusi_SimpleIntStreamImpl, [], 1, 0, 0, 0]);
$rt_metadata([jusi_StreamOverSpliterator$AdapterAction, 0, jl_Object, [juf_Consumer], 0, 0, 0, 0,
jusi_SimpleStreamImpl$forEachOrdered$lambda$_19_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_SimpleStreamImpl$forEachOrdered$lambda$_19_0_test)],
m_LinearExpression$subtract$lambda$_4_0, 0, jl_Object, [juf_BiConsumer], 1, 0, 0, ["$accept", $rt_wrapFunction2(m_LinearExpression$subtract$lambda$_4_0_accept)],
jl_AbstractStringBuilder$Constants, 0, jl_Object, [], 0, 0, jl_AbstractStringBuilder$Constants_$callClinit, 0,
ju_AbstractMap$SimpleEntry, 0, jl_Object, [ju_Map$Entry, ji_Serializable], 1, 0, 0, ["$toString", $rt_wrapFunction0(ju_AbstractMap$SimpleEntry_toString)],
ju_TreeMap$TreeNode, "TreeMap$TreeNode", 4, ju_AbstractMap$SimpleEntry, [], 0, 0, 0, 0,
otcit_FloatAnalyzer$Result, 0, jl_Object, [], 1, 0, 0, 0,
jusi_MappingToObjStreamImpl, 0, jusi_SimpleStreamImpl, [], 1, 0, 0, ["$next1", $rt_wrapFunction1(jusi_MappingToObjStreamImpl_next)],
jusi_MappingStreamImpl$wrap$lambda$_1_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_MappingStreamImpl$wrap$lambda$_1_0_test)],
jusi_MappingToDoubleStreamImpl$next$lambda$_1_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(jusi_MappingToDoubleStreamImpl$next$lambda$_1_0_test)],
ju_SequencedSet, 0, jl_Object, [ju_SequencedCollection, ju_Set], 1537, 0, 0, 0,
ju_TreeMap$EntrySet, 0, ju_AbstractSet, [ju_SequencedSet], 0, 0, 0, 0,
m_LinearExpression$TermComponent, 0, jl_Object, [], 0, 0, 0, 0,
m_LinearExpression$lambda$subtract$0$lambda$_16_0, 0, jl_Object, [juf_BiFunction], 1, 0, 0, ["$apply", $rt_wrapFunction2(m_LinearExpression$lambda$subtract$0$lambda$_16_0_apply)],
m_Matrix$lambda$getNonZeroSolution$0$lambda$_26_0, 0, jl_Object, [juf_DoublePredicate], 1, 0, 0, 0,
jusd_ArrayDoubleStreamImpl, 0, jusd_SimpleDoubleStreamImpl, [], 1, 0, 0, 0,
juf_IntPredicate, 0, jl_Object, [], 1537, 0, 0, 0,
jusi_MappingToObjStreamImpl$next$lambda$_1_0, 0, jl_Object, [juf_IntPredicate], 1, 0, 0, 0,
jusd_AnyMatchConsumer, 0, jl_Object, [juf_DoublePredicate], 1, 0, 0, 0,
ju_TreeMap$EntryIterator, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0,
m_LinearExpression$LinearExpressionValidator$validateTerm$lambda$_2_0, 0, jl_Object, [juf_Predicate], 1, 0, 0, ["$test", $rt_wrapFunction1(m_LinearExpression$LinearExpressionValidator$validateTerm$lambda$_2_0_test)],
m_LinearExpression$LinearExpressionValidator$validateTerm$lambda$_2_1, 0, jl_Object, [juf_Consumer], 1, 0, 0, 0,
ca_MatrixNode$lambda$execute$0$lambda$_3_0, 0, jl_Object, [juf_ToDoubleFunction], 1, 0, 0, ["$applyAsDouble", $rt_wrapFunction1(ca_MatrixNode$lambda$execute$0$lambda$_3_0_applyAsDouble)],
jusd_SimpleDoubleStreamImpl$ArrayFillingConsumer, 0, jl_Object, [juf_DoublePredicate], 0, 0, 0, ["$test0", $rt_wrapFunction1(jusd_SimpleDoubleStreamImpl$ArrayFillingConsumer_test)],
jusd_SimpleDoubleStreamImpl$toArray$lambda$_16_0, 0, jl_Object, [juf_DoublePredicate], 1, 0, 0, ["$test0", $rt_wrapFunction1(jusd_SimpleDoubleStreamImpl$toArray$lambda$_16_0_test)]]);
let $rt_booleanArrayCls = $rt_arraycls($rt_booleancls),
$rt_charArrayCls = $rt_arraycls($rt_charcls),
$rt_byteArrayCls = $rt_arraycls($rt_bytecls),
$rt_shortArrayCls = $rt_arraycls($rt_shortcls),
$rt_intArrayCls = $rt_arraycls($rt_intcls),
$rt_longArrayCls = $rt_arraycls($rt_longcls),
$rt_doubleArrayCls = $rt_arraycls($rt_doublecls);
$rt_stringPool(["0", "null", "", "[L", "[]", "String is null", "String is empty", "String contains invalid digits: ", "String contains digits out of radix ", ": ", "The value is too big for integer type", "The value is too big for int type: ", "Illegal radix: ", "Error: ", "Function with name\'", "\' not found", "Expected a variable or a matrix as argument", "Not a correct symbol in command ", "Not a correct Symbol to begin your Statement ", " ", "(", ")", "[", "]", ",", "=", "+", "-", "*", "/", "\\s*(?:(-?\\d+(?:\\.\\d+)?)|([a-zA-Z_][a-zA-Z0-9_]*)|(\\()|(\\))|(\\[)|(\\])|(,)|(=)|(\\+)|(-)|(\\*)|(/))",
"Patter is null", "fSet", "Name capturing group should start with letter", "Is", "In", ", ", "Either src or dest is null", "(this Collection)", "NonCapFSet", "AheadFSet", "BehindFSet", "AtomicFSet", "FinalSet", "<Empty set>", "JointSet", "NonCapJointSet", "PosLookaheadJointSet", "NegLookaheadJointSet", "PosBehindJointSet", "NegBehindJointSet", "<Quant>", "<GroupQuant>", "Lower", "Upper", "ASCII", "Alpha", "Digit", "Alnum", "Punct", "Graph", "Print", "Blank", "Cntrl", "XDigit", "javaLowerCase", "javaUpperCase",
"javaWhitespace", "javaMirrored", "javaDefined", "javaDigit", "javaIdentifierIgnorable", "javaISOControl", "javaJavaIdentifierPart", "javaJavaIdentifierStart", "javaLetter", "javaLetterOrDigit", "javaSpaceChar", "javaTitleCase", "javaUnicodeIdentifierPart", "javaUnicodeIdentifierStart", "Space", "w", "W", "s", "S", "d", "D", "BasicLatin", "Latin-1Supplement", "LatinExtended-A", "LatinExtended-B", "IPAExtensions", "SpacingModifierLetters", "CombiningDiacriticalMarks", "Greek", "Cyrillic", "CyrillicSupplement",
"Armenian", "Hebrew", "Arabic", "Syriac", "ArabicSupplement", "Thaana", "Devanagari", "Bengali", "Gurmukhi", "Gujarati", "Oriya", "Tamil", "Telugu", "Kannada", "Malayalam", "Sinhala", "Thai", "Lao", "Tibetan", "Myanmar", "Georgian", "HangulJamo", "Ethiopic", "EthiopicSupplement", "Cherokee", "UnifiedCanadianAboriginalSyllabics", "Ogham", "Runic", "Tagalog", "Hanunoo", "Buhid", "Tagbanwa", "Khmer", "Mongolian", "Limbu", "TaiLe", "NewTaiLue", "KhmerSymbols", "Buginese", "PhoneticExtensions", "PhoneticExtensionsSupplement",
"CombiningDiacriticalMarksSupplement", "LatinExtendedAdditional", "GreekExtended", "GeneralPunctuation", "SuperscriptsandSubscripts", "CurrencySymbols", "CombiningMarksforSymbols", "LetterlikeSymbols", "NumberForms", "Arrows", "MathematicalOperators", "MiscellaneousTechnical", "ControlPictures", "OpticalCharacterRecognition", "EnclosedAlphanumerics", "BoxDrawing", "BlockElements", "GeometricShapes", "MiscellaneousSymbols", "Dingbats", "MiscellaneousMathematicalSymbols-A", "SupplementalArrows-A", "BraillePatterns",
"SupplementalArrows-B", "MiscellaneousMathematicalSymbols-B", "SupplementalMathematicalOperators", "MiscellaneousSymbolsandArrows", "Glagolitic", "Coptic", "GeorgianSupplement", "Tifinagh", "EthiopicExtended", "SupplementalPunctuation", "CJKRadicalsSupplement", "KangxiRadicals", "IdeographicDescriptionCharacters", "CJKSymbolsandPunctuation", "Hiragana", "Katakana", "Bopomofo", "HangulCompatibilityJamo", "Kanbun", "BopomofoExtended", "CJKStrokes", "KatakanaPhoneticExtensions", "EnclosedCJKLettersandMonths", "CJKCompatibility",
"CJKUnifiedIdeographsExtensionA", "YijingHexagramSymbols", "CJKUnifiedIdeographs", "YiSyllables", "YiRadicals", "ModifierToneLetters", "SylotiNagri", "HangulSyllables", "HighSurrogates", "HighPrivateUseSurrogates", "LowSurrogates", "PrivateUseArea", "CJKCompatibilityIdeographs", "AlphabeticPresentationForms", "ArabicPresentationForms-A", "VariationSelectors", "VerticalForms", "CombiningHalfMarks", "CJKCompatibilityForms", "SmallFormVariants", "ArabicPresentationForms-B", "HalfwidthandFullwidthForms", "all",
"Specials", "Cn", "IsL", "Lu", "Ll", "Lt", "Lm", "Lo", "IsM", "Mn", "Me", "Mc", "N", "Nd", "Nl", "No", "IsZ", "Zs", "Zl", "Zp", "IsC", "Cc", "Cf", "Co", "Cs", "IsP", "Pd", "Ps", "Pe", "Pc", "Po", "IsS", "Sm", "Sc", "Sk", "So", "Pi", "Pf", "posFSet", "^ ", "range:", "CompositeRangeSet:  <nonsurrogate> ", " <surrogate> ", "UCI range:", "decomposed Hangul syllable:", "UCI ", "CI ", "decomposed char:", "<DotAllQuant>", "<DotQuant>", "<SOL>", "WordBoundary", "PreviousMatch", "<EOL>", "EOI", "^", "DotAll", ".", "<Unix MultiLine $>",
"<MultiLine $>", "CI back reference: ", "back reference: ", "UCI back reference: ", "sequence: ", "UCI sequence: ", "CI sequence: ", "Expected: ", " but found: ", "Not a correct symbol in expression ", "IDENT", "LPAR", "RPAR", "LBRACK", "RBRACK", "COMMA", "NUMBER", "EQUAL", "PLUS", "MINUS", "MULT", "DIV", "EOF", "There is no solution for the linear system", "Determinant can only be calculated for square matrices", "Argument is not a matrix", "Cannot perform Addition with given operands", "Cannot perform Multiplication with given operands",
"Cannot perform Division with given operands", "Division by zero", "Cannot perform Subtraction with given operands", "Unsupported operator: ", "SOLVE", "solve", "DETERMINANT", "det", "GAUSS", "gauss", "\n", "  ", "],", "Matrix must not be empty", "structures.Matrix does not have the same number of columns and rows", "LinSystem as coefficient Matrix is not solvable", "1 *", "You need a quadratic matrix with the same number of rows and columns", "Infinity", "NaN", "Could not find variable \'", "Expression cannot be empty",
"Unnecessary \'+\' at start in LinExp", "--", "++", "**", "Linear expressions must not contain \'=\'", "\\*", "num", "Too many signs in LinExp", "+-", "\\+", "[-]?(\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?", "[a-z]", "Invalid character \'", "Invalid factor \'", "\' in term: "]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
let $rt_export_main = $rt_mainStarter(aw_ReplBridge_main);
$rt_export_main.javaException = $rt_javaException;
let $rt_jso_marker = Symbol('jsoClass');
(() => {
    let c;
})();
export { $rt_export_main as main, aw_ReplBridge_evaluate$exported$0 as evaluate, aw_ReplBridge_help$exported$1 as help, aw_ReplBridge_reset$exported$2 as reset };

//# sourceMappingURL=classes.js.map