
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
