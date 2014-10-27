(function(window) {
    var resRand = {
	sourceList: [],
	workingList: [],
	rules: [],
	import: function(userArray)
	{
	    this.sourceList = userArray;
	    this.workingList = userArray.slice();
	},
	addRule: function(func, rangeInt, inclusive)
	{
	    var inclusion = (inclusive === undefined || inclusive === true) ? true : false;
	    var newRule = {
		callback: func,
		range: rangeInt,
		inclusive: inclusion
	    };
	    this.rules.push(newRule);
	},
	randomise: function()
	{
	    this.workingList = [];
	    var input = this.sourceList;
	    var output = this.workingList;
	    var sourceNumbers = [];
	    var inputLength = input.length;
	    for (var i = 0; i < inputLength; i++)
	    {
		sourceNumbers.push(i);
	    }
	    for (var i = 0; i < inputLength; i++)
	    {
		var potentialEntry = Math.floor(Math.random() * sourceNumbers.length);
		var targetEntry = input[sourceNumbers[potentialEntry]];
		sourceNumbers.splice(potentialEntry, 1);
		output.push(targetEntry);
	    }
	},
	checkElementAgainstPosition: function(element, position)
	{
	    var rules = this.rules;
	    var rulesLength = this.rules.length;
	    var input = this.workingList;

	    for (var rule = 0; rule < rulesLength; rule++)
	    {
		var ruleRange = rules[rule].range;
		var isRuleBroken = false;
		for (var currentRange = 0; currentRange < ruleRange; currentRange++)
		{
		    var distance = currentRange + 1;

		    if (distance <= position && rules[rule].callback(element, input[position - distance], distance) ||
		    (input.length - position) > currentRange && rules[rule].callback(element, input[position + currentRange], distance))
		    {
			//console.log("found position conflict");
			isRuleBroken = true;


		    } else {
			if (true)//rules[rule].inclusive)
			{
			    isRuleBroken = false;
			    if (rules[rule].inclusive)
			    {
				break;
			    }
			}

		    }


		}
		if (isRuleBroken)
		{
		    return true;
		}

	    }
	    //console.log("everything is fine");
	    return false;
	},
	applyRules: function()
	{
	    var input = this.workingList;
	    var rules = this.rules;
	    var inputLength = this.workingList.length;
	    var rulesLength = this.rules.length;

	    for (var i = 0; i < inputLength; i++)
	    {
		//console.log("Checking index " + i + ".");
		var hasFault = false;

		for (var rule = 0; rule < rulesLength; rule++)
		{
		    var ruleRange = rules[rule].range;
		    var ruleIsBroken = false;
		    for (var currentRange = 0; currentRange < ruleRange; currentRange++)
		    {

			var distance = currentRange + 1;
			if (i >= distance)
			{
			    var matches = rules[rule].callback(input[i], input[i - distance], distance);
			}

			if (matches)
			{
			    ruleIsBroken = true;
			    //console.log("Found rule-breaking match at index " + i + ".");
			} else {
			    if (rules[rule].inclusive)
			    {
				ruleIsBroken = false;
				break;
			    }
			}

		    }
		    if (ruleIsBroken)
		    {
			hasFault = true;
		    }

		}
		var randomElementNumber = Math.floor(Math.random() * inputLength);

		var startingNumber = randomElementNumber;
		while (hasFault)
		{

		    //console.log("Checking " + input[i] + " against alement " + randomElementNumber);
		    if (randomElementNumber !== i && !this.checkElementAgainstPosition(input[i], randomElementNumber))
		    {
			var movingElement = input.splice(i, 1);
			input.splice(randomElementNumber, 0, movingElement[0]);

			//i -= 1;
			i = 0;

			hasFault = false;
		    }
		    randomElementNumber++;
		    if (randomElementNumber > inputLength)
		    {
			randomElementNumber = 0;
		    }
		    if (randomElementNumber === startingNumber && hasFault)
		    {
			console.log("Cannot sort list. Please try again, or apply less restrictive rules.");
			return false;
		    }
		}
		//console.log(this.workingList);

	    }
	    //document.write("Sorted! Final configuration:");
	    //document.write(this.workingList.toString().replace(/,/g, "<br>"));
	},
	go: function(randomise)
	{
	    if (randomise === undefined || randomise === true)
	    {
		this.randomise();
	    }
	    this.applyRules();
	    return this.workingList.slice();
	},
	export: function()
	{
	    return this.workingList.slice();
	},
	getResult: function()
	{
	    return this.export();
	},
	printTable: function(targetDOMElement)
	{
	    var DOMSpace = targetDOMElement || document.body;
	    var htmlString ="<table border = 1>";
	    var listLength = this.workingList.length;
	    for (var i = 0; i < listLength; i++)
	    {
		htmlString += "<tr><td>" + this.workingList[i] + "</td></tr>";
	    }
	    htmlString += "</table>";
	    DOMSpace.innerHTML += htmlString;
	},
	printCustom: function(targetDOMElement,callback,header,footer)
	{
	    var DOMSpace = targetDOMElement || document.body;
	    var htmlString =header;
	    var listLength = this.workingList.length;
	    for (var i = 0; i < listLength; i++)
	    {
		htmlString += callback(this.workingList[i]);
	    }
	    htmlString += footer;
	    DOMSpace.innerHTML += htmlString;
	},
	printToConsole: function()
	{
	    var listLength = this.workingList.length;
	    for (var i = 0; i < listLength; i++)
	    {
		console.log(this.workingList[i]);
	    }
	}

    };
    window["resRand"] = resRand;
})(window);