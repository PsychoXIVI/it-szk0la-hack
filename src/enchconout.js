    
/** @module EnchConOut
 ** @desc Enchanted Console Outputs!
 ** @file enchconout.js
 ** @author PsychoX
 ** @version v0.3.1
 ** @date 2017-05-19
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
}('EnchConOut', this, function() {
    // Default config
    var config = {
        enabled: true,
        overwrite: true,
        hey:   {show: true, prefix: '[~] \x1b[34m',     suffix: '\x1b[0m'},
        log:   {show: true, prefix: '[.] \x1b[22;37m',  suffix: '\x1b[0m'},
        info:  {show: true, prefix: '[+] \x1b[32m',     suffix: '\x1b[0m'},
        warn:  {show: true, prefix: '[-] \x1b[33m',     suffix: '\x1b[0m'},
        error: {show: true, prefix: '[!] \x1b[31m',     suffix: '\x1b[0m'},
        debug: {show: true, prefix: '[*] \x1b[36m',     suffix: '\x1b[0m'}
    };
    
    // If browser - do not use ASCII codes as defaults
    if(this.window && this.window.navigator) {
        Object.assign(config, {
            hey:   {show: true, prefix: '[~] ',         suffix: ''},
            log:   {show: true, prefix: '[.] ',         suffix: ''},
            info:  {show: true, prefix: '[+] ',         suffix: ''},
            warn:  {show: true, prefix: '[-] ',         suffix: ''},
            error: {show: true, prefix: '[!] ',         suffix: ''},
            debug: {show: true, prefix: '[*] ',         suffix: ''}
        });
    }
    
    // Original functions
    var original = {
        hey:   console.hey || console.log,
        log:   console.log,
        info:  console.info,
        warn:  console.warn,
        error: console.error,
        debug: console.debug || console.log
    };
    
    // Usage: EnchConOut(config);
    function EnchConOut(update) {
        // Config update on usage
        if(typeof update == 'object') {
            Object.assign(config, update);
        } else
        // On/Off by boolean
        if(typeof update == 'boolean') {
            config.enabled = update;
        }
        
        // Overwrite or return to normal
        if(config.overwrite) {
            console.hey   = EnchConOut.hey;
            console.log   = EnchConOut.log;
            console.info  = EnchConOut.info;
            console.warn  = EnchConOut.warn;
            console.error = EnchConOut.error;
            console.debug = EnchConOut.debug;
        } else {
            console.hey   = original.hey;
            console.log   = original.log;
            console.info  = original.info;
            console.warn  = original.warn;
            console.error = original.error;
            console.debug = original.debug;
        }
    };
    
    // Private helper function for arguments parsing
    var strArgs = function(arr) {
        var string = '';
        for(var i = 0, I = arr.length; i < I; i++) {
            string += (arr[i]).toString() + ' ';
        }
        return string.trim();
    }
    
    // The console output functions
    EnchConOut.hey = function() {
        if(config.enabled && config.hey.show) original.hey
            (config.hey.prefix + strArgs(arguments) + config.hey.suffix);
    };
    EnchConOut.log = function() {
        if(config.enabled && config.log.show) original.log
            (config.log.prefix + strArgs(arguments) + config.log.suffix);
    };
    EnchConOut.info = function() {
        if(config.enabled && config.info.show) original.info
            (config.info.prefix + strArgs(arguments) + config.info.suffix);
    };
    EnchConOut.warn = function() {
        if(config.enabled && config.warn.show) original.warn
            (config.warn.prefix + strArgs(arguments) + config.warn.suffix);
    };
    EnchConOut.error = function() {
        if(config.enabled && config.error.show) original.error
            (config.error.prefix + strArgs(arguments) + config.error.suffix);
    };
    EnchConOut.debug = function() {
        if(config.enabled && config.debug.show) original.debug
            (config.debug.prefix + strArgs(arguments) + config.debug.suffix);
    };
    
    return EnchConOut;
}));
