#resRand.js
resRand.js is an easy-to-use JavaScript object for restricted randomization of experimental stimuli, controlled trials, or your large collection of rare porcelain clowns.

##Contents
- [Overview](#overview)
- [Tutorial](#tutorial)
  1. [Using the template file resRand.html](#using-the-template-file-resrandhtml)
  2. [Importing your list of items](#importing-your-list-of-items)
  3. [Creating and applying sorting rules](#creating-and-applying-sorting-rules)
  4. [Retrieving your randomised list](#retrieving-your-randomised-list)
- [API](#api)
  - [Methods](#methods)
    - [.addRule(...)](#addrule)
    - [.applyRules()](#applyrules)
    - [.checkElementAgainstPosition(...)](#checkelementagainstposition)
    - [.export()](#export)
    - [.getResult()](#getresult)
    - [.go(...)](#go)
    - [.import(...)](#import)
    - [.printCustom(...)](#printcustom)
    - [.printTable(...)](#printtable)
    - [.printToConsole()](#printtoconsole)
    - [.randomise()](#randomise)
  - [Properties](#properties)
    - [.length](#length)
    - [.rules](#rules)
    - [.sourceList](#sourcelist)
    - [.workingList](#workinglist)
- [JavaScript Quick Reference](#javascript-quick-reference)
  - [Variable](#variable-)
  - [Comparison](#comparison-)
  - [Logic](#logic-)
  - [Boolean](#boolean-)
  - [If...else](#ifelse-)
  - [String](#string-)
  - [Array](#array-)
  - [Function](#function-)



##Overview
##Tutorial
###Using the template file resRand.html
Once you have downloaded the repository .zip file [master.zip](https://github.com/Loycifer/resRand.js/archive/master.zip) and extracted the folder "resRand.js-master", you should find a file within the folder called *resRand.html*.  This is the template file we will be working with.  To run the file, simply open it in your web browser.  Do so now, and you will see the test "Number of objects: 0".  To edit the file, you will need to open it in a JavaScript-enabled IDE or text editor. I recommend using [Notepad++](http://notepad-plus-plus.org/) for smaller projects and [NetBeans](https://netbeans.org/) for larger ones.  You could also use plain text editors like Windows Notepad, but you will have a much harder time managing your code and identifying errors.

Inside *resRand.html* you should find two `<script>` blocks: one at line 8 and one at line 9.  The first one loads the file *resRand.min.js*, which contains the resRand object in compressed JavaScript.  If you ever wish to make changes to the resRand.js source code, you will need to update this line to load *resRand.js*, but you can leave it alone for now.

The second `<scrip>` block is where you will be entering your code.  There is already a bit of code there to help highlight the structure of the script.  When you're ready to get your hands dirty, move on to the next part of the tutorial. And maybe clean your keyboard.

###Importing your list of items

```javascript
var resRand; //Do not change or remove this line.

var userArray = [
		// Fill this array with to be randomised numbers, strings, or objects, seperated by a comma.
	    ];
	    
resRand.import(userArray); // Import your array into the resRand object.
```

A variable called `userArray` has been declared to hold your array.  You can rename this variable to anything you want, as long as you also rename it in the `resRand.import()` function call.  This array can contain any kind of objects, separated by commas.  For example, if you have stimuli named SH01P01, SH01P02, and SH01P03, you would build an array of strings like so:

```javascript
var userArray = [
"SH01P01",
"SH01P02",
"SH01P03"
      ];
```
Of course, you'll probably have more than 3 stimuli, so this step may take long if you have no efficient way of generating this type of array syntax.  You also have to option of entering your stimuli in a single string and splitting it into an array by a delimiter like so:

```javascript
var userString = "SH01P01, SH01P02, SH01P03";
var userArray = userString.split(", "); // Note that the delimiter is a comma AND a space
```
When naming your stimuli, it's a good idea to pad your numbers with zeros.  For example, if you have 100 stimuli types numbered from 1 to 100, number one should be written as `001`, two as `002` and so on.  This makes the names easier for code to understand, and keeps them all at the same length.  Starting your numbers at 0 may also help keep names short; 1 to 100 would become 0 to 99, thus only requiring one zero in front of single-digit numbers.

You may also choose to separate segments in your stimuli names using a delimiter, such as SH-2-P-26.  This can also be easily parsed by JavaScript, and does not require any zero-padding.

Once you've entered all your values into the array, save and run *resRand.html*.  You should see your table of your items, randomised with no restrictions.  If you refresh the page, the list will randomise itself again.  Check the reported number of objects at the top of the page to make sure you've correctly entered the right amount of stimuli.  Once you've confirmed that your stimuli have been properly entered into the array, it is time to create sorting rules to restrict randomisation.






###Creating and applying sorting rules

```javascript
//Create sorting rules for your array

var myRule1 = function(element1, element2)
	{
		//This function should compare elements or parts of elements.  If the elements match, the rule is considered broken.  This function must RETURN the boolean result of this comparison: true if elements match, false if elements do not match.
		var letters1 = element1.substr(1, 2);
		var letters2 = element2.substr(1, 2);
		var matches = letters1 === letters2;
		return matches;
	};

var myRule2 = function(element1, element2)
	{
		//The previous rule can be shortened to the following code and still perform the same
		return (element1.substr(1, 2) === element2.substr(1, 2));
	};

//Once you've built all your rules, add them to the resRand object.

//resRand.addRule(myRule1, 2); //No more than two matching elements in a row
//resRand.addRule(myRule2, 2, false); //No less than 2 spaces between matching elements
```
There are two sample rule functions in the template, `myRule1` and `myRule2`.  These two functions produce identical results, but are written with different syntax.  You may delete them and make your own, or overwrite them as you see fit.  It is recommended to store your functions in variables so that they may be easily edited passed into `resRand.addRule()`.

A rule function must take two arguments.  The first argument, called `element1` in the sample functions, will be compared to the second argument, `element2`.  All your rule functions should begin like this:
```javascript
var someCreativeName = function(element1, element2) {

};
```

The body of the function contains the comparison logic.  In most cases, you will want to check aspects of stimuli names for equality.  Let's say you have stimuli named SH01P01 through to SH30P12, and you want to compare the numbers between SH and P.  Since the first character of a string is character 0, the numbers reside at characters 2 and 3.  You can extract those characters by using the [.substr()](#string-) method, passing in as arguments the position of the first character you wish to extract, and the number of characters you wish to extract.  Calling this method on you arguments and storing the results in variables would look like this:
```javascript
var someCreativeName = function(element1, element2) {
	var firstNumber = element1.substr(2,2);
	var secondNumber = element2.substr(2,2);
};
```
If, instead of zero-padding, you used delimiters in your stimuli names, you will want to use the [.split()](#string-) method.  If your stimuli have the structure SH-2-P-38, and you wish to compare the number between SH and P, you should split the string by the "-" character, and access element 1 (the second element) of the result.  
```javascript
var someCreativeName = function(element1, element2) {
	var firstBang = element1.split("-");
	var firstNumber = firstBang[1];
	var secondBang = element2.split("-");
	var secondNumber = firstBang[1];
};
```
This can also be written like so:

```javascript
var someCreativeName = function(element1, element2) {
	var firstNumber = element1.split("-")[1];
	var secondNumber = element2.split("-")[1];
};
```
If you're using an array of JavaScript objects as your input, you can extract their properties for comparison in much the same way:
```javascript
var someCreativeName = function(element1, element2) {
	var firstNumber = element1.waveForm;
	var secondNumber = element2.waveForm;
};
```
Once you've extracted the necessary information and stored them in variables, it is time to return the result.  In most cases, you will want to check if the extracted strings or numbers are identical.  Strict equality is checked in JavaScript using `===`.  Storing the comparison result in a variable and returning the variable would look like this:
```javascript
var someCreativeName = function(element1, element2) {
	var firstNumber = element1.substr(2,2);
	var secondNumber = element2.substr(2,2);
	var isMatching = firstNumber === secondNumber;
	return isMatching;
};
```
The function can also return the comparison without an intermediate variable:
```javascript
var someCreativeName = function(element1, element2) {
	var firstNumber = element1.substr(2,2);
	var secondNumber = element2.substr(2,2);
	return (firstNumber === secondNumber);
};
```
In fact, the function can even return the result of the process without using any intermediary variables:
```javascript
var someCreativeName = function(element1, element2) {
	return (element1.substr(2,2) === element2.substr(2,2));
};
```
You should do whatever you feel most comfortable doing.

Now you need to add the rule to the resRand object. You do this using the `resRand.addRule()` method.  This method takes three arguments: your rule function, an integer representing the range of the rule, and a boolean specifying whether or not the rule is inclusive.

If you just need the rule to make sure that no matching elements are touching each other, you can write:
```javascript
resRand.addRule(someCreatuveName);
```
You can also have a rule make sure that no more than a certain amount of matching element will appear in a row (inclusive rule), or that matching elements will have a certain minimum distance between them (exclusive rule).  To have no more than 4 matching elements in a row, you would use this:
```javascript
resRand.addRule(someCreatuveName,4);
```
or
```javascript
resRand.addRule(someCreatuveName,4,true);
```
To make sure that matching elements have at least 5 non-matching elements between them, use this:
```javascript
resRand.addRule(someCreatuveName,5,false);
```
You must call the `.addRule()` method after defining the rule function.  The structure should look something like this:
```javascript
var someCreativeName = function(element1, element2) {
	var firstNumber = element1.substr(2,2);
	var secondNumber = element2.substr(2,2);
	var isMatching = firstNumber === secondNumber;
	return isMatching;
};
resRand.addRule(someCreativeName, 2, true);
```
You can add as many rules as you need.  Different rules can have different ranges and be of different types, and resRand will try its hardest to randomise your list according to those rules.  Note that these rules are meant to help randomisation, and will not operate correctly if you try to intentionally group elements together by inverting the result of the comparison statements inside the rule functions.

If you think you've correctly set up you rule/rules, you can save and run *resRand.html* to check the results.  Now go take a little break. You did a lot I think.

###Retrieving your randomised list
```javascript
document.write("Number of objects: " + resRand.length);
resRand.goPrint();
```
If you're here, you've probably finished adding your rules to resRand, and seen the results of your labour.  If you've constructed your rules properly, the randomised list should be exactly as you need it.  You can copy the contents of your table into spreadsheet software like Microsoft Excel, and it will retain its structure.

Once you're certain that your code is working properly and your stimulus list is correct, you can comment out the line which reads `document.write("Number of objects: " + resRand.length);` by typing `//` before it.  This can make copying out the results easier by allowing the Ctrl+a shortcut for *select all* to work as desired.

If you want resRand to print 3 blocks at once, you can simply type `resRand.goPrint();` three times.  Currently, there is no rule-checking between the edges of blocks. This is a planned feature, however.

If you wish to do something with the result besides printing the table to the document, replace `resRand.goPrint();` with this:
```javascript
var myResults = resRand.go();
```
Now, the variable `myResults` contains the randomised array produced by resRand.

You can also specify a custom method of printing your results.  This way, you can have resRand print out a more complete table for use in your project. See the [.printCustom(...)](#printcustom) reference for information on how to do this.

Congratulations! You've made it! Now you may go spend weeks and weeks in the lab running your experiment.


##API
###Methods
---
####.addRule(...)
The `.addRule(...)` method adds a sorting rule to resRand's randomisation process.
#####Syntax
`resRand.addRule(function: rule[, int: range, bool: isInclusive]);`
#####Parameters
- **rule**  - *Required.* A function which takes two arguments and returns a boolean.  This function should compare aspects of its two arguments and return `true` if the comparison passes and `false` if the comparison fails. 
- **range** - *Optional.* An integer which specifies the distance from an element to which the rule should be applied. Default value is `1`. 
- **isInclusive** - *Optional.* A boolean which specifies whether the rule should be inclusive with `true` or exclusive with `false`.  An inclusive rule with a range of 2 will ensure that no more than two matching elements will exist in a row, while an exclusive rule will ensure that two matching elemnts will have at least 2 non-matching elements between them.  With range set to 1, inclusive and exclusive rules are identical.  Default value is `true`.

#####Example
```javascript
var myFirstRule = function(element1, element2)
{
  // Compare the 3rd character in each element 
  var isMatching = element1.substr(2,1) === element2.substr(2,1); 
  // Return the result of the comparison
  return isMatching; 
};

var mySecondRule = function(element1, element2)
{
  // Return the result of comparing the characters between the 
  // first and second underscore 
  return (element1.split("_")[1] === element2.split("_")[1]); 
};

var myLastRule = function(element1, element2)
{
  // Return the result of comparing the .toneContour properties of the elements
  return (element1.toneContour === element2.toneContour); 
};

// Ensure that no elements with matching 3rd characters will be touching
resRand.addRule(myFirstRule); 
// Ensure that no more than 3 elements with matching segments after the 
// first '_' will exist in a row
resRand.addRule(mySecondRule, 3); 
 // Ensure that elements with matching .toneContour properties will be at 
 // least 4 spaces apart
resRand.addRule(myLastRule, 4, false);
```
---

####.applyRules()
The `.applyRules()` method enforces all added rules, and reorganises elements if necessary.  This method is called during `.go()` and `.goPrint(...)`.  
#####Syntax
`resRand.applyRules();`

---
####.checkElementAgainstPosition(...)
*Does not need to be called by the user.* The `.checkElementAgainstPosition(...)` method checks if an element can occupy a position in the working list array without breaking any rules.
#####Syntax
`resRand.checkElementAgainstPosition(object: element, int: position);`
#####Parameters
- **element**  - *Required.* The contents of an array element.
- **position** - *Required.* An integer representing a position in the working list where the element will be projected.

---
####.export()
The `.export()` method returns an array containing the values of the randomised list.  If the `.go()` method has not yet been called, the returned list will not be randomised.  It is the same as `.getResult()`.
#####Syntax
`resRand.export();`
#####Example
```javascript
var myResults = resRand.export();
//myResults now contains a randomised array
```
---
####.getResult()
The `.getResult()` method returns an array containing the values of the randomised list.  If the `.go()` method has not yet been called, the returned list will not be randomised.  It is the same as `.export()`.
#####Syntax
`resRand.getResult();`
#####Example
```javascript
var myResults = resRand.getResult();
//myResults now contains a randomised array
```
---
####.go()
The `.go()` method runs the randomisation `.randomise()` and sorting `.applyRules()` processes on the imported array, and returns a copy of the randomised array.  This method should be called after adding rules to the object with `.addRule(...)`.
#####Syntax
`resRand.go();`
#####Example
```javascript
resRand.import(userArray);
resRand.addRule(myRule, 1);
var myResult = resRand.go();
// myResult contains a randomised copy of userArray which conforms to myRule
```
---
####.goPrint(...)
The `.goPrint(...)` combines the `.go()` method and the `.printTable(...)` method, and returns a copy of the randomised array.  This is the most straightforward method for executing and printing randomization.  This method should be called after adding rules to the object with `.addRule(...)`.
#####Syntax
`resRand.goPrint([node: targetDOMElement]);`
#####Parameters
- **targetDOMElement** - *Optional.* A DOM element in which the table should be printed.  The table appends itself to the innerHTML of the DOM element. The default value is `document.body`.

#####Example
```javascript
// Print table to document body
resRand.goPrint();

// Print table to a DOM element with id "ResultsDiv" and store the resulting array in myResult
var targetNode = document.getElementById("ResultsDiv");
var myResult = resRand.goPrint(targetNode);
```

---
####.import(...)
The `.import(...)` method takes a user-specified array and inserts it into the resRand object for randomisation.  
#####Syntax
`resRand.import(array: userArray);`
#####Parameters
- **userArray** - *Required.* An array containing numbers, strings, or objects.  Possibly a list of filenames, or codes representing stimuli or participants.

#####Example
```javascript
var stimulusList = ["SND01P00",
                    "SND01P01",
                    "SND01P02",
                    ...         // Shortened for readability
                    "SND08P62",
                    "SND08P63"];

resRand.import(stimulusList);
// The resRand object can now work with the user-provided list.

```
---
####.printCustom(...)
The `.printCustom(...)` method provides a more flexible means of displaying results than `.printTable(...)`.  This method requires a function that will run once per element.
#####Syntax
`resRand.printCustom(function: callback[, string: header, string: footer, node: targetDOMElement])`

#####Parameters
- **callback** - *Required.* A function which takes an array element as an argument, and returns a string containing the desired HTML code.
- **header** - *Optional.* A string which contains the HTML code to be printed before the array elements.  This string might contain an opening `<table>` tag and column headers. The default value is an empty string.
- **footer** - *Optional.* A string which contains the HTML code to be printed after the array elements. This string might contain a closing `</table>` tag. The default value is an empty string.
- **targetDOMElement** - *Optional.* A DOM element in which the result should be printed.  The result appends itself to the innerHTML of the DOM element. The default value is `document.body`.

#####Example
```javascript
var printFunction = function(element)
{
  var correctAnswer = element.substr(3,1) < 5;
  var thisLine = "<tr><td>" + element + "</td><td>" + correctAnswer + "</td></tr>";
  return thisLine;
};
var header = "<table>";
var footer = "</table>";
var targetNode = document.getElementById("tableDiv");

resRand.printCustom(printFunction, header, footer, targetNode);
```
---
####.printTable(...)
The `.printTable(...)` methods prints current array to the document as an HTML table.  Tables are parsed correctly when copied from the web page into spreadsheet software.
#####Syntax
`resRand.printTable([node: targetDOMElement]);`
#####Parameters
- **targetDOMElement** - *Optional.* A DOM element in which the table should be printed.  The table appends itself to the innerHTML of the DOM element. The default value is `document.body`.

#####Example
```javascript
// Print the table to the document body
resRand.printTable();
// Print the table to a DOM element with id "ResultsDiv"
var targetNode = document.getElementById("ResultsDiv");
resRand.printTable(targetNode);
```
---
####.printToConsole()
The `.printToConsole()` method outputs the contents of the current array to the JavaScript console.
#####Syntax
`resRand.printToConsole();`

---
####.randomise()
The `.randomise()` method randomises the current array without applying any rules.
#####Syntax
`resRand.randomise();`
#####Example
```javascript
resRand.import([1,2,3,4,5,6]);
resRand.randomise();
var myResult = resRand.export();
// myResult will contain somthing like [5.2.1.4.6.3]
```
---
###Properties
---
####.length
The `.length` property returns the length of the current array.  This property is read-only.
#####Syntax
`resRand.length;`
#####Example
```javascript
resRand.import([10,20,30]);
var listLength = resRand.legnth;
// listLength contains the number 3
```

---
####.rules
The `.rules` property returns the array of added rules.
#####Syntax
`resRand.rules;`

---
####.sourceList
The `.sourceList` property returns the unmodified imported array.
#####Syntax
`resRand.sourceList;`

---
####.workingList
The '.workingList` property returns the current array.  If no randomisation or rules have been applied, returns a copy of the unmodified imported array.
#####Syntax
`resRand.workingList;`

---

##JavaScript Quick Reference

JavaScript can be run in all modern web browsers without additional software installation.

You should be familiar with the following JavaScript types and concepts.  If you want more information on a concept, clicking the [[?]](#) icon will redirect you to a useful reference page at [mozilla.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript).

---
###Variable [[?]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
  A variable is a named container that holds any type of value or object.  Variables are declared using the keyword `var`.  It is important to remember that variable names are case-sensitive; `myVar` is not the same as `MyVar`.  Variable names are conventionally type in camelCase, but this is not a requirement of the language.  A variable declared inside a function is locally scoped; this means the variable will only be available from within its hosting function.
```javascript
var myNumber = 2 + 3;
var ten = 10;
var firstName = "Benjamin";
var lastName = "Dover";
~ myNumber returns 5
~ myNumber * ten returns 50
~ firstName + lastName returns "BenjaminDover"
```


---
###Comparison [[?]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)
Comparisons are used to compare values with each other.  The return type of a comparison is a boolean (`true` or `false`).

Symbol | Meaning
:----:|----
`==` | equal to
`===` | identical to
`!=` | not equal to
`!==` | not identical to
`<` | less than
`<=` | less than or equal to
`>` | greater than
`>=` | greater than or equal to
```javascript
~ 10 === 10 returns true  
~ 10 === "10" returns false
~ 10 == "10" returns true
~ "left" !== "right" returns true  
~ 9 <= 2 returns false  
~ 3 > 3 returns false   
~ 3 >= 3 returns true
```

---
###Logic [[?]] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)
Logical operators determine logic between values.  And-operators `&&` evaluate to true when all values equal true. Or-operators `||` evaluate to true when at least one of the values is true.  The not-operator `!` returns the opposite of its value.

Symbol | Meaning
:---:|---
`&&` | and
`||` | or
`!` | not
```javascript
~ true && true returns true
~ true && false returns false
~ false && false returns false
~ true || true returns true
~ true || false returns true
~ false || false returns false
~ !true returns false
```
---
###Boolean [[?]](https://developer.mozilla.org/en-US/docs/Glossary/Boolean)
A boolean is a type that represents `true` or `false`.  Booleans are typed without quotes, and are the standard return type of comparisons and logical evaluations.
```javascript
var isFourMoreThanThree = 4 > 3;
var canPigsSwim = true;
var canPigsFly = false;
var doPigsMakeGoodSeaplanes = canPigsFly && canPigsSwim;
~ isFourMoreThanThree returns true
~ doPigsMakeGoodSeaplanes returns false
```
---
###If...else [[?]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
`If...else` statements allow for conditional execution of code.  These statements are syntactically organized like this: `if(isRaining){bring umbrella;}else{wear shades;}`.  The `else {}` block is optional.  
```javascript
var x = 20;
if (x > 15)
{
  alert("That's a lot.");
} 
else
{
  alert("That's not much at all...");
}
~ will alert "That's a lot"

if (x < 15)
{
  alert("That's not much at all...");
}
~ will do nothing

```
---
###String [[?]] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
A string is a sequence of characters enclosed in quotes, used for textual information.  String properties or methods you may need to use include `.length`, `.split()` or `.substr()`. Strings can be concatenated using the `+` operator.
```javascript
var myString = "Hello Worf!";
~ myString.length returns 11
~ myString.substr(0,4) returns "Hell"
~ myString.substr(2,5) returns "llo W"
~ myString.substr(2) returns "llo Worf!"
~ myString.split(" ") returns ["Hello","Worf!"]
~ myString.split("o") returns ["Hell","W","rf!"]
```
---

###Array [[?]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
An array is an ordered list of elements, enclosed with square brackets, separated by commas.  These elements can be anything from numbers or strings to objects or more arrays.  An element can be accessed by entering the number in square brackets after the array name.  JavaScript supports arrays with multiple element types.
```javascript
var myArray = [1,2,"three",Math.PI,[true,false]]
~ myArray[0] returns 1
~ myArray[3] returns Math.PI
~ myArray[4][1] returns false
```

---
###Function [[?]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
A function is a named block of code that is only executed when called.  Variables can be passed into a function as arguments.  A function that belongs to an object is called a method.  Functions can be assigned to variable names using the `function` expression to create a lambda function.  (There are a few ways to declare functions, but this method should be learned first.)  The `return` keyword is used to specify what a function outputs when called.
```javascript
var addToFive = function(x) {return x+5;}
var areEqual = function(x,y) {return x===y;}
var doStuff = function(x) 
{
  var y = x * 2; 
  var z = y + 1; 
  return z;
}
~ addToFive(11) returns 16
~ areEqual("blue","yellow") returns false
~ doStuff(3) returns 7
```
---

###License

Copyright :copyright: 2014  Loy Clements

resRand.js is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>
