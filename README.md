#resRand.js
resRand.js is an easy-to-use JavaScript object for restricted randomization of experimental stimuli, controlled trials, or your large collection of rare porcelain clowns.

###Contents
- [Overview]
- [Tutorial]
  1. Using the template file resRand.html
  2. Importing your list of items
  3. Creating and applying sorting rules
  4. Retrieving your randomised list
- [API]
  - Methods
    - .addRule(...)
    - .applyRules()
    - .checkElementAgainstPosition(...)
    - .export()
    - .getResult()
    - .go(...)
    - .import(...)
    - .printCustom(...)
    - .printTable(...)
    - .printToConsole()
    - .randomise()
  - Properties
    - .length
    - .rules
    - .sourceList
    - .workingList
- [JavaScript Quick Reference](#javascript-quick-reference)
  - [Variable](#variable)
  - [Comparison](#comparison)
  - [Logic](#logic)
  - [String](#string)
  - [Boolean](#boolean)
  - [Array](#array)
  - [Function](#function)



####Overview
####Tutorial
####API

####JavaScript Quick Reference

JavaScript can be run in all modern web browsers without additional software installation.

You should be familiar with the following JavaScript types.

---
#####Variable [[?]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
  A variable is a named container that holds any type of value or object.  Variables are declared using the keyword var.
```javascript
var myNumber = 2 + 3;
~ myNumber returns 5
```


---
#####Comparison [[?]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)
Comparisons are used to compare values with eachother.

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
#####Logic [[?]] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)
Logical operators determine logic between values.

Symbol | Meaning
:---:|---
`&&` | and
`||` | or
`!` | not
```javascript
~ true && false returns false
~ true || false returns true
~ !true returns false
```

---
#####String [[?]] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
A string is a sequence of characters enclosed in quotes, used for textual information.  String properties or methods you may need to use include .length, .split() or .substr().
```javascript
var myString = "Hello Worf!";
~ myString.length returns 11
~ myString.substr(0,4) returns "Hell"
~ myString.substr(2,5) returns "llo W"
~ myString.substr(2) returns "llo Worf!"
~ myString.split("o") returns ["Hell","W","rf!"]
```
---
#####Boolean [[?]](https://developer.mozilla.org/en-US/docs/Glossary/Boolean)
A boolean is a type that represents true or false.  Booleans are typed without quotes, and are the standard return type of comparisons.
```javascript
var isFourMoreThanThree = 4 > 3;
var canPigsSwim = true;
var canPigsFly = false;
var doPigsMakeGoodSeaplanes = canPigsFly && canPigsSwim;
~ isFourMoreThanThree returns true
~ doPigsMakeGoodSeaplanes returns false
```

---
#####Array [[?]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
An array is an ordered list of elements, enclosed with square brackets, seperated by commas.  These elements can be anything from numbers or strings to objects or more arrays.  JavaScript supports arrays with multiple lement types.
```javascript
var myArray = [1,2,"three",Math.PI,[true,false]]
~ myArray[0] returns 1
~ myArray[3] returns Math.PI
~ myArray[4][1] returns false
```

---
#####Function [[?]]https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions
A function is a named block of code that is only executed when called.  Variables can be passed into a function as arguments.  A function that belongs to an object is called a method.  Functions can be assigned to variable names using the function keyword to create a lambda function.  (There are a few ways to declare functions, but this method should be learned first.)
```javascript
var addToFive = function(x) {return x+5;}
var areEqual = function(x,y) {return x===y}
~ addToFive(11) returns 16
~ areEqual("blue","yellow") returns false
```
---

#####License

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
