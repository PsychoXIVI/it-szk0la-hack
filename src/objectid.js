    
/** @module ObjectID
 ** @version v0.1.1
 ** @file objectid.js 
 ** @author PsychoX
 ** @desc Provides unique object identifing
 **/

// Works with CommonJS, RequireJS/AMD and Globals
(function(name, context, definition) {
    if(typeof module != 'undefined' && module.exports) {
        module.exports = definition();
    } else
    if(typeof define == 'function' && define.amd) {
        define(name, definition);
    } else
    if(typeof context != 'undefined') {
        context[name] = definition();
    }
}('ObjectID', this, function() {
    return function() {
        var id = 0;
        Object.prototype.id = function() {
            if(typeof this.__id__ == 'undefined') {
                Object.defineProperty(this, '__id__', {
                    configurable: false,
                    enumerable: false,
                    get: (function(__id__) {
                        return function() {
                            return __id__;
                        }
                    }(++id)),
                    set: function(value) {
                        return value;
                    }
                });
            }
            return this.__id__;
        }
    };
}));
