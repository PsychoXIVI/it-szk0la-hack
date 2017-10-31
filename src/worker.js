
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
