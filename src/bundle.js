(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    
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

},{}],2:[function(require,module,exports){
    
/** @app it-szk0la-hack (browser)
 ** @desc Hack for solving it-szkola.edu.pl courses 
 ** @file main.js
 ** @author PsychoX
 ** @version v0.3.1
 ** @date 2017-06-09
 **/

(function(){
    // Requirements 
    const enchconout = require('./enchconout.js')();
    // Includes 
    const Solver = require('./solver.js');
    const Worker = require('./worker.js');
    // Config
    var config   = {}; //include('config.json');
    var database = ithackdb || {}; //include('database.json');
    // Variables
    var solver = null;
    var login = '';
    var courses = null;
    
    
    
    //// Main functions
    function run() {
        console.debug('run!'); // @debug
        
        // Parse options
        {
            var inputs = document.getElementById('hack_options').getElementsByTagName('input');
            for(let i = 0; i < inputs.length; i++) {
                if(inputs[i].type == 'checkbox') {
                    options[input[i].name] = !!(input[i].checked);
                } else
                if(inputs[i].type == 'number') {
                    options[input[i].name] = parseInt(input[i].value);
                } else
                if(inputs[i].type == 'text') {
                    options[input[i].name] = parseInt(input[i].value);
                }
            }
        }
        
        // Push the tests data
        {
            for(let a, i = 0; i < courses.length; i++) {
                if((a = courses[i].getElementsByTagName('input')) && (a = a[0]) && a.checked) {
                    a = courses[this.current].getElementsByTagName('a')[0];
                    solver.next({
                        cid: a.href.substring(a.href.lastIndexOf(',')), // @info There is aslo commented id by itself, but it's commented, so maybe will be deprecated
                        ctx: a.innerText.trim(),
                        url: a.href
                    });
                }
            }
        }
    }
    function done(result, data) {
        // Find and update the test in the table
        {
            for(let a, i = 0; i < courses.length; i++) {
                if((a = courses[i].getElementsByTagName('input')) && (a = a[0]) && a.checked) {
                    if(courses[this.current].getElementsByTagName('a')[0].href.substring(a.href.lastIndexOf(',')) == data.cid) {
                        // Work here done - uncheck it
                        a.checked = false;
                        
                        // Update the percent result
                        if(Number.isInteger(result.percent)) {
                            a = courses[i].getElementByTagName('i')[0];
                            a.innerText = result.percent;
                            if(result.percent > config.options['targetresult']) {
                                a.style.color = '#844';
                            } else {
                                a.style.color = '#484';
                            }
                        }
                    }
                }
            }
        }
    }
    
    
    
    //// Init
    (function(){
        // Run conditions
        {
            // Wants list of all courses 
            if(!~(location.href.indexOf('https://it-szkola.edu.pl/kursyu'))) {
                location.href = 'https://it-szkola.edu.pl/kursyu#kid0';
                alert('Użyj na stronie z listą kursów!');
                return false;
            }
            
            // Make sure user is logged in
            login = document.getElementsByClassName('UserLoginName');
            if(login) {
                login = login[0].innerText;
            } else {
                alert('Musisz być zalogowany!');
                window.open('https://it-szkola.edu.pl/usr');
                setTimeout(function() {
                    location.reload();
                }, 5000);
                return false;
            }
            
            // Hello, database?
            if(!database) {
                alert('Przed użyciem wklej kod bazy danych!');
                location.reload();
                return false;
            }
        }
        
        // Interface
        {
            // Variables for the courses list
            let page = document.getElementById('katBText');
            courses = (function() {
                let table = page.getElementsByClassName('kursListTable')[0];
                if(table.childElementCount == 1) {
                    table = table.firstElementChild;
                }
                return table;
            }()).getElementsByTagName('tr');
            
            // Informations
            {
                // Move current text behind the "wiecej" button
                var detailBox = page.getElementsByClassName('detailBox')[0];
                detailBox.getElementsByTagName('a')[0].innerText = 'Original tests information';
                var detailContent = detailBox.getElementsByClassName('detail')[0];
                let p = page.getElementsByTagName('p');
                for(let i = p.length - 1; i >= 0; i--) {
                    if(p[i].parentElement == page) {
                        detailContent.insertBefore(p[i], detailContent.firstElementChild);
                    }
                }
                
                // Add our title, contact and readme
                let d = document.createElement('div'); 
                    d.id = 'hack_info'
                    d.innerHTML = '<h2>' + title + '</h2><i>' + contact + '</i><br/><br/>' + readme + '<br/><br/>';
                page.insertBefore(d, page.firstElementChild);
            }
            
            // Options
            {
                let d = document.createElement('div');
                    d.id = 'hack_options';
                    d.innerHTML = '<b> Opcje: </b>';
                    d.innerHTML += '<div><input name="visitrelated" type="checkbox" checked> Visit all related content </div>';
                    d.innerHTML += '<div><input name="omitincomplete" type="checkbox" checked> Omit if incomplete data </div>';
                    d.innerHTML += '<div><input name="safedelays" type="checkbox" checked> Use safe actions delays </div>';
                    d.innerHTML += '<div><input name="numberofworkers" type="number" min="1" max="4" value="1" style="width:40px"> Number of workers </div>';
                    d.innerHTML += '<div><input name="targetpercent" type="number" min="0" max="100" step="5" value="100" style="width:40px"> Max test result percent </div>';
                    d.innerHTML += '<br/>';
                page.insertBefore(d, page.firstElementChild.nextSibling);
            }
            
            // Adding checkboxes for individual courses
            {
                for(let i = 2; i < courses.length; i++) {
                    let a = courses[i].getElementsByTagName('a');
                    if(a && (a = a[0]) && a.href && a.href.indexOf('kkurs,kurs')) {
                        let c = document.createElement('input');
                            c.setAttribute('type', 'checkbox');
                            c.checked = false;
                        courses[i].firstElementChild.insertBefore(c, courses[i].firstElementChild.firstElementChild);
                    }
                }
            }
            
            // Adding checkbox for filter-by selection
            {
                let t = courses[0].getElementsByTagName('th');
                let c = document.createElement('input');
                    c.setAttribute('type', 'checkbox');
                    c.onclick = function() {
                        // Function for mark whole selection 
                        for(let i = 1; i < courses.length; i++) {
                            if(courses[i].style.display != 'none') {
                                let c = courses[i].getElementsByTagName('input');
                                if(c && (c = c[0])) {
                                    c.checked = this.checked;
                                }
                            }
                        }
                    };
                    c.checked = false;
                t[0].insertBefore(c, t[0].firstElementChild);
            }
            
            // Adding progress for individual courses
            {
                courses[0].getElementsByTagName('th')[0].setAttribute('colspan', 
                    '' + (parseInt(courses[0].getElementsByTagName('th')[0].getAttribute('colspan')) + 1));
                let t = document.createElement('th');
                    t.style.width = '16px';
                courses[1].insertBefore(t, courses[1].lastElementChild);
                for(let i = 2; i < courses.length; i++) {
                    let a = courses[i].getElementsByTagName('a');
                    if(a && (a = a[0]) && a.href && a.href.indexOf('kkurs,kurs')) {
                        let p = document.createElement('i');
                            p.style.color = '#888';
                            p.innerText = '??%';
                        let d = document.createElement('td');
                            d.appendChild(p);
                        courses[i].insertBefore(d, courses[i].lastElementChild);
                    }
                }
            }
            
            // Adding overall progress information
            /*{
                let t = courses[0].getElementsByTagName('th');
                let p = document.createElement('i');
                    p.style.color = '#888';
                    p.innerText = '??%';
                t[0].insertBefore(p, t[0].getElementsByTagName('span')[1]);
            }*/
            
            // Start button
            {
                let t = courses[0].getElementsByTagName('th');
                let i = document.createElement('input');
                    i.setAttribute('type', 'button');
                    i.onclick = function() {
                        if(pasue) {
                            pasue = false;
                            this.value = 'Zatrzymaj';
                        } else {
                            pasue = true;
                            this.value = 'Kontynuuj'
                            run();
                        }
                    };
                    i.disabled = false;
                    i.value = 'Wykonaj';
                t[0].insertBefore(i, t[0].getElementsByTagName('i')[1]);
                button = i;
            }
        }
        
        // Solver
        {
            solver = new Solver(config.options, database, config.timeout);
            solver.ondone = done;
        }
    }());
}());

},{"./enchconout.js":1,"./solver.js":3,"./worker.js":4}],3:[function(require,module,exports){

/** @file solver.js
 ** @desc Cointains whole solver class functions
 ** @author PsychoX
 ** @version v0.3.1
 ** @date 2017-06-09
 **/

/** Manages workers to solve the tests
 **/
function Solver() {
    this.workers = [];          // Array of the workers
    this.tests   = [];          // Array for tests queue
    
    this.ondone  = null;        // Callback on test done
};

/** Init function, invoke when the solver is created
 **/
Solver.prototype.init = function(options, database, timeout) {
    console.debug('Solver.init!', this.id(), arguments); // @debug
    
    // Courses solver workers common informations
    this.options  = options  || this.options;
    this.database = database || this.database;
    this.timeout  = timeout  || this.timeout;
    
    // Init the workers
    this.limitworkers();
    
    // On done function for the workers
    let that = this;
    function ondoneworker(result, worker) {
        that.done(result, worker);
    }
    
    // Return itself
    return this;
}
/** Kill function, invoke when the solver is relased
 **/
Solver.prototype.kill = function(force) {
    console.debug('Solver.kill!', this.id(), arguments); // @debug
    
    // Courses solver workers common informations
    this.options  = null;
    this.database = null;
    this.timeout  = null;
    
    // Kill the workers
    this.limitworkers(0, force);
    
    // Return null;
    return null;
}

/** Recives the test data to solve and push it on queue
 **/
Solver.prototype.next = function(data) {
    console.debug('Solver.next!', this.id(), arguments); // @debug
    
    // Save the data to the queue
    if(data) {
        this.tests.push(data); // @todo maybe some ondone callback for single test?
    }
    
    // Test if some worker had done job
    for(let i = 0; i < this.workers.length; i++) {
        if(!~this.workers[i].current) {
            this.workers[i].next(this.tests.shift());
        }
    }
}

/** Invoked when some worker has done last step
 **/
Solver.prototype.done = function(result, worker) {
    console.debug('Solver.done!', this.id(), arguments); // @debug
    
    // Use our ondone callback
    if(typeof(this.ondone) == 'function') {
        this.ondone(result, {cid: worker.cid, ctx: worker.ctx, url: worker.url}); // @warn nie za duzo zwraca info? ps: to jest caly data
    }
    
    // Try to give worker some job
    if(~this.workers.indexOf(worker)) {
        worker.next(this.tests.shift());
    } else {
        this.next(false);
    }
}

/** Limits the workers by init new or killing redundant
 **/
Solver.prototype.limitworkers = function(number, force) {
    console.debug('Solver.limitworkers!', this.id(), arguments, this.workers.length); // @debug
    
    // Default limit from options
    number = number || this.options['numberofworkers'];
    
    if(this.workers.length < number) {
        // Init missing workers
        for(let i = this.workers.length - 1; i < number; i++) {
            this.workers[i] = new Worker().init(this.options, this.database, this.timeout);
            this.workers[i].ondone = ondoneworker;
        }
    } else
    if(this.workers.length > number) {
        // Kill redundant workers
        for(let i = number; this.workers[i]; i++) {
            if(this.workers[i].kill) {
                this.workers[i].kill(force);
            }
            this.workers[i] = null;
        }
        
        // Remove killed from the array
        this.workers.splice(number);
    }
}



/* Exports */
module.exports = Solver;

},{}],4:[function(require,module,exports){

/** @file worker.js
 ** @desc Cointains whole worker class functions
 ** @author PsychoX
 ** @version v0.3.1
 ** @date 2017-06-09
 **/

/** A worker can solve the tests
 **/
function Worker() {
    this.frame    = null;       // Frame for worker
    
    this.current  = -1;         // Current step counter
    this.result   = {};         // Result which will be returned for ondone
    
    this.ondone   = null;       // Callback on test done
    
    this.options  = null;       // Options for the script
    this.database = null;       // The test data 
    this.timeout  = null;       // Function returns timeout stamps
    
    this.qid = null;            // Variables for the test solving
    this.qtx = null;            // naming: question/answer/course, id/text
    this.aid = null;
    this.atx = null;
    this.cid = null;
    this.ctx = null;
    
    this.url      = '';         // URL to the course main page
}

/** Init function, invoke when the worker is created
 **/
Worker.prototype.init = function(options, database, timeout) {
    console.debug('Worker.init!', this.id(), arguments); // @debug
    
    // Courses solver workers common informations
    this.options  = options  || this.options;
    this.database = database || this.database;
    this.timeout  = timeout  || this.timeout;
    
    // Create the frame
    this.frame = document.createElement('iframe');
    this.frame.style.display = 'none';
    document.body.appendChild(this.frame);
    
    // Return itself
    return this;
}
/** Kill function, invoke when the worker is relased
 **/
Worker.prototype.kill = function(force) {
    console.debug('Worker.kill!', this.id(), arguments); // @debug
    
    // Trying to wait for worker job to be done
    if(!~this.current || force) {
        // Courses solver workers common informations
        this.options  = null;
        this.database = null;
        this.timeout  = null;
        
        // Remove the frame
        this.frame.parentNode.removeChild(this.frame);
        this.frame = null;
        
        // Return null
        return null;
    } else {
        // Waiting for the job to be done
        let that = this;
        setTimeout(function() {
            that.kill();
        }, 0xFF);
    }
}

/** Recives the test data to solve
 **/
Worker.prototype.next = function(data) {
    console.debug('Worker.next!', this.id(), arguments); // @debug
    
    // Make sure we have the test data
    if(!data) {
        return undefined;
    }
    
    // Reset workdata and use recived one
    this.qid = null;
    this.qtx = null;
    this.aid = null;
    this.atx = null;
    this.cid = data.cid;
    this.ctx = data.ctx;
    this.url = data.url;
    this.result = {};
    
    // Go to first step
    this.current = -1;
    this.step();
}

/** Invoked by last step 
 **/
Worker.prototype.done = function() {
    console.debug('Worker.done!', this.id(), arguments, this.result); // @debug
    
    // Set current to -1 for indicate that job is done
    this.current = -1;
    
    // Use our ondone callback
    if(typeof(this.ondone) == 'function') {
        this.ondone(this.result, this);
    }
    
    console.log('['+this.id()+']' + 'Test ' + this.cid + ' (' + this.ctx + ') done with result ' + this.result);
}

/** Goes to next step of work
 **/
Worker.prototype.step = function() {
    console.debug('Worker.step!', this.id(), arguments, this.current + 1); // @debug
    
    // Call next step
    this.current += 1;
    if(this._steps[this.current]) {
        this._steps[this.current].call(this);
    }
}

//{ Step functions
Worker.prototype._steps = {
    // Step 0: Go to the course page
    0: function() {
        let that = this;
        setTimeout(function() {
            that.frame.onload = function() {that.step()};
            that.frame.src = that.url;
        }, this.timeout());
    },
    
    // Step 1: Visiting all related materials (optional)
    1: function() {
        // So it's optional...
        if(!this.options['visitrelated']) {
            this.step();
        }
        
        // Get all related materials links
        let relatedlinks = this.frame.contentDocument.getElementById('kkursList').getElementsByTagName('a');
        
        // Open first link (via following substep)
        substep(0);
        
        // The substep for visiting single
        let that = this;
        function substep(i) {
            if(relatedlinks[i]) {
                that.frame.onload = function() {
                    setTimeout(function() {
                        substep.call(that, relatedlinks, i + 1);
                    }, that.timeout());
                }
                that.frame.src = relatedlinks[i].href;
            } else {
                that.step();
            }
        }
    },
    
    // Step 2: Go to the test page
    2: function() {
        let that = this;
        setTimeout(function() {
            that.frame.onload = function() {that.step()};
            that.frame.src = that.url + ',test';
        }, this.timeout());
    },
    
    // Step 3: Answers
    3: function() {
        // Get only content of the test
        var content = this.frame.contentDocument.getElementById('testContent');
        
        // It checks is the test already solved
        if(content) {
            // For each question
            var questions = content.getElementById('testPytList').getElementsByClassName('testPyt');
            for(let i = 0; i < questions.length; i++) {
                // Target percent limiting
                if(this.options['targetresult'] != 100) {
                    if(Math.floor(i / question.length * 100) > options['targetpercent']) {
                        break;
                    }
                }
                
                // Get question hash/id
                this.qtx = questions[i].getElementsByTagName('that')[0].lastElementChild.innerText.trim();
                this.qid = md5(this.qtx, false, true);
                
                // Test if in the database
                if(this.database[this.qid] == undefined) {
                    // No data for this question
                    console.warn('No data for question: ' + this.qid + ' ("' + this.qtx + '")');
                    
                    // Break by options when incomplete
                    if(this.options['omitincomplete']) {
                        content = false;
                        i = I; break;
                    }
                    
                    // Pick random answer for this question
                    var answers = questions[i].getElementsByTagName('tr');
                    answers[Math.floor(Math.random() * answers.length)].getElementsByTagName('input')[0].checked = true;
                    i = I; break;
                }
                
                // For each answer
                var answers = questions[i].getElementsByTagName('tr');
                for(let j = 0; j < answers.length; j++) {
                    // Get answer hash/id
                    this.atx = answers[j].getElementsByTagName('label')[0].innerText.trim();
                    this.aid = md5(this.atx, false, true);
                    
                    // Test if in the database
                    if(this.database[this.qid][this.aid] == undefined) {
                        // Incomplete data for this answer
                        if(!this.database[this.qid][0]) {
                            console.warn('['+this.id()+']' + 'Incomplete data for question: ' + this.qid + ' ("' + this.qtx + '")');
                            this.database[this.qid][0] = true; // showing this warn only once
                        }
                        console.warn('['+this.id()+']' + '  Unknown answer: ' + this.aid + ' ("' + this.atx + '")');
                        
                        // Break by options when incomplete
                        if(options['omitincomplete']) {
                            content = false;
                            i = I; j = J; break;
                        }
                    }
                    
                    // Check up if it's valid answer
                    if(this.database[this.qid][this.aid]) {
                        answers[j].getElementsByTagName('input')[0].checked = true;
                    } /*else {
                        answers[j].getElementsByTagName('input')[0].checked = false;
                    }*/
                }
            }
        }
        
        // Omitting?
        if(content) {
            // Click the test finish button
            let that = this;
            setTimeout(function() {
                that.frame.onload = function() {that.step()};
                content.getElementById('testSendButton').click();
            }, this.timeout() + 0xFF); // @warn Added some miliseconds because of AJAX instead of redirect for results
        } else {
            // Just solved or omitting, anyways, it's done
            this.done();
        }
    },
    
    // Step 4: Read the results
    4: function() {
        // Try find a mark percent
        let percent = '??';
        try {
            percent = parseInt(this.frame.contentDocument.getElementById('kursContent').getElementsByTagName('b')[0].innerText);
        } catch(e) {}
        
        // If we have the percent
        if(Number.isInteger(percent)) {
            // Warn if data failed
            if(options['targetresult'] > percent) {
                console.warn('['+this.id()+']' + 'The data failed for test: ' + this.cid + ' ("' + this.ctx + '")');
            }
        }
        
        // Save the percent to the results
        this.result = {percent: percent};
        
        // Go to next step
        let that = this;
        setTimeout(function() {
            that.step();
        }, this.timeout());
    },
    
    // Step 5: Done!
    5: function() {
        this.done();
    }
};



/* Exports */
module.exports = Worker;

},{}]},{},[2]);
