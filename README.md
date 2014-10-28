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
###Importing your list of items
###Creating and applying sorting rules
###Retrieving your randomised list
##API
###Methods
---
####.addRule(...)
#####Summary
The `.addRule(...)` method adds a sorting rule to resRand's randomisation process.
#####Syntax
```javascript
resRand.addRule(function : rule[, int : range, bool : isInclusive])
```
#####Parameters
- **rule**  - *Required.* A function which takes two arguments and returns a boolean.  This function should compare aspects of its two arguments and return `true` if the comparison passes and `false` if the comparison fails. 
- **range** - *Optional.* An integer which specifies the distance from an element to which the rule should be applied. Default value is `1`. 
- **isInclusive** - *Optional.* A boolean which specifies whether the rule should be inclusive with `true` or exclusive with `false`.  An inclusive rule with a range of 2 will ensure that no more than two matching elements will exist in a row, while an exclusive rule will ensure that two matching elemnts will have at least 2 non-matching elements between them.  With range set to 1, inclusive and exclusive rules are identical.  Default value is `true`.

#####Example
```javascript
var myFirstRule = function(element1, element2)
{
  var isMatching = element1.substr(2,1) === element2.substr(2,1); 
  // Comparing the 3rd character in each element 
  return isMatching; 
  // Returning the result of the comparison
};

var mySecondRule = function(element1, element2)
{
  return (element1.split("_")[1] === element2.split("_")[1]); 
  // Returning the result of comparing the characters between the first and second underscore 
};

var myLastRule = function(element1, element2)
{
  return (element1.toneContour === element2.toneContour); 
  // Returning the result of comparing the .toneContour properties of the elements
};

resRand.addRule(myFirstRule); // Ensures that no elements with matching 3rd characters will be touching
resRand.addRule(myFirstRule, 3); // Ensures that no more than 3 matching elements will exist in a row
resRand.addRule(myFirstRule, 3, false); // Ensures that matching elements will be at least 3 spaces apart
```
---

####.applyRules()
####.checkElementAgainstPosition(...)
####.export()
####.getResult()
####.go(...)
####.import(...)
####.printCustom(...)
####.printTable(...)
####.printToConsole()
####.randomise()
###Properties
####.length
####.rules
####.sourceList
####.workingList

##JavaScript Quick Reference

JavaScript can be run in all modern web browsers without additional software installation.

You should be familiar with the following JavaScript types.

---
###Variable [[?]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
  A variable is a named container that holds any type of value or object.  Variables are declared using the keyword `var`.  It is important to remember that variable names are case-sensitive; `myVar` is not the same as `MyVar`.  Variable names are conventionally type in camelCase, but this is not a requirement of the language.  A variable declared inside a function is locally scoped; this means the variable will only be available from with the function.
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
Comparisons are used to compare values with eachother.  The return type of a comparison is a boolean (`true` or `false`).

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
An array is an ordered list of elements, enclosed with square brackets, seperated by commas.  These elements can be anything from numbers or strings to objects or more arrays.  An element can be accessed by entering the number in square brackets after the array name.  JavaScript supports arrays with multiple element types.
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
