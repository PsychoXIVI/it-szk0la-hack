    
/** @app it-szk0la-hack (browser)
 ** @desc Hack for solving it-szkola.edu.pl courses 
 ** @file main.js
 ** @author PsychoX
 ** @version v0.3.1
 ** @date 2017-06-09
 **/

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
