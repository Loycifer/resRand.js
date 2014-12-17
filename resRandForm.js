(function(namespace){
	    var resRand = window.resRand;
	    var userInputArray = [];
	    var customRules = [];
	    var ruleUID = 1;
	    var goNow = function()
	    {
		resRand.import(userInputArray);
		resRand.rules = [];
		var rulesLength = customRules.length;
		for (var i = 0; i < rulesLength; i++)
		{
		    //alert(customRules[i].inclusive.toString());
		    var inFunction = generateFunction(customRules[i]);
		    resRand.addRule(inFunction, customRules[i].range, customRules[i].inclusive === 'true' ? true : false);
		}

		document.getElementById("resultsDiv").innerHTML = "";
		resRand.goPrint(document.getElementById("resultsDiv"));

	    };
	    var generateFunction = function(customRule)
	    {
		var type = "char";//customRule.type;
		var start = customRule.start;
		var length = customRule.length;
		var delimiter = customRule.delimiter;

		if (type === "char")
		{
		    var ruleFunction = function(x, y) {
			return (x.substr(start, length) === y.substr(start, length));
		    };
		    //s(ruleFunction.toString());
		    return ruleFunction;
		}
		if (type === "seg")
		{
		    var ruleFunction = function(x, y) {
			return (x.split(delimiter)[start] === y.split(delimiter)[start]);
		    };
		    //alert(ruleFunction.toString());
		    return ruleFunction;
		}
	    };
	    var updateRule = function(uid)
	    {
		//alert(uid);
		var rulesLength = customRules.length;
		for (var i = 0; i < rulesLength; i++)
		{
		    var currentRule = customRules[i];
		    if (currentRule.uid === uid)
		    {
			var targetRule = currentRule;
			break;
		    }
		}

		var form = document.getElementById(uid);
		var newType = document.getElementById("typeSelect:" + uid).value;
		var newStart = parseInt(form.elements["start"].value);
		var newLength = parseInt(form.elements["clength"].value);
		var newDelimiter = form.elements["delimiter"].value;
		var newRange = parseInt(form.elements["range"].value);
		var newInclusive = document.getElementById("inclusiveSelect:" + uid).value;



		targetRule.start = newStart;
		targetRule.length = newLength;
		targetRule.delimiter = newDelimiter;
		targetRule.range = newRange;
		targetRule.inclusive = newInclusive;
		if (targetRule.type !== newType)
		{
		    targetRule.type = newType;
		    switch (newType) {
			case "char":
			    document.getElementById("clength:" + uid).style.display = 'inline';
			    document.getElementById("delimiter:" + uid).style.display = 'none';
			    break;
			case "seg":
			    document.getElementById("clength:" + uid).style.display = 'none';
			    document.getElementById("delimiter:" + uid).style.display = 'inline';
			    break;
			default:
			    alert("Error in updateRule('" + uid + "')");
			    break;
		    }
		}

		var description = "";
		if (targetRule.range === 1)
		{
		    description = "Ensure that elements are not touching.";
		}
		else if (targetRule.inclusive === 'true')
		{
		    description = "Ensure that no more than "+targetRule.range+" matching elements occur in a row.";
		}
		else {
		    description = "Ensure that matching elements have at least "+targetRule.range+" spaces between them.";
		}
		document.getElementById("description:" + uid).innerHTML = description;

//HANDLE TYPE

		//alert(newInclusive);
		var previewCell = document.getElementById("Preview:" + uid);
		var sourceWord = userInputArray[0];
		var sampleWord = "";
		if (newType === 'char')
		{
		    sampleWord += "<span class='previewTextFalse'>";
		    sampleWord += sourceWord.substr(0, newStart);
		    sampleWord += "</span><span class='previewTextTrue'>";
		    sampleWord += sourceWord.substr(newStart, newLength);
		    sampleWord += "</span><span class='previewTextFalse'>";
		    sampleWord += sourceWord.substr(newStart + newLength);
		    sampleWord += "</span>";
		} else {
		    var explodedWord = sourceWord.split(newDelimiter);
		    var wordLength = explodedWord.length;
		    for (var i = 0; i < wordLength; i++)
		    {

			explodedWord[i] = "<span class='" + ((i === newStart) ? "previewTextTrue" : "previewTextFalse") +
			"'>" + explodedWord[i] + "</span>";

		    }
		    sampleWord = explodedWord.join("<span class='previewTextFalse'>" + newDelimiter + "</span>");

		}
		previewCell.innerHTML = sampleWord;
	    };
	    var addCustomRule = function()
	    {
		var uid = "Rule " + (ruleUID++);
		var newRule = {
		    uid: uid,
		    type: "char",
		    start: 0,
		    delimiter: "-",
		    length: 1,
		    range: 1,
		    inclusive: 'true'
		};
		customRules.push(newRule);
		var typeSelect = "<select onchange='updateRule(\"" + uid + "\")' id='typeSelect:" + uid + "'>\n\
	<option value='char'>characters</option>\n\
	<option value='seg'>segments</options>\n\
</select> ";
		var deleteButton = " <span title='Delete " + uid + "' style='cursor:pointer;color:red;font-size:4em;' onclick='deleteRule(\"" + uid + "\")'>X</span>";
		var charSelect = "Position  <input oninput='updateRule(\"" + uid + "\")' value='" + newRule.start + "' style='width:5em;' type='number' name='start' min='0'> \n\
	<span style='display:inline;' id='clength:" + uid + "'>Length <input oninput='updateRule(\"" + uid + "\")' name='clength' value='" + newRule.length + "' style='width:5em;' type='number' min='1'></span>\n\
	<span style='display:none;' id='delimiter:" + uid + "'>Delimiter<input  oninput='updateRule(\"" + uid + "\")' name='delimiter' style='width:5em;'  value='" + newRule.delimiter + "'></span>";
		var newHTML = "Compare " + typeSelect + charSelect + "<br>Range <input oninput='updateRule(\"" + uid + "\")' value='" + newRule.range + "' style='width:5em;' type='number' name='range' min='1'> Type <select onchange='updateRule(\"" + uid + "\")' id='inclusiveSelect:" + uid + "'>\n\
	<option value='true'>inclusive</option>\n\
	<option value='false'>exclusive</options>\n\
</select><br>\n\
<span id='description:" + uid + "'>Ensure that elements with matching characters 0 to 0 are not touching.</span>";
		var newForm = document.createElement("form");
		newForm.id = uid;
		var newTable = document.createElement("table");
		newTable.border = 2;
		var firstRow = document.createElement("tr");
		var tableHeader = document.createElement("th");
		tableHeader.colSpan = 3;
		tableHeader.innerHTML = uid;
		firstRow.appendChild(tableHeader);
		newTable.appendChild(firstRow);
		var secondRow = document.createElement("tr");
		var optionCell = document.createElement("td");
		optionCell.innerHTML = newHTML;
		var previewCell = document.createElement("td");
		previewCell.id = "Preview:" + uid;
		previewCell.innerHTML = "-";
		var deleteCell = document.createElement("td");
		deleteCell.innerHTML = deleteButton;
		secondRow.appendChild(optionCell);
		secondRow.appendChild(previewCell);
		secondRow.appendChild(deleteCell);
		newTable.appendChild(secondRow);
		newForm.appendChild(newTable);
		document.getElementById("customRules").appendChild(newForm);
		updateRule(uid);

	    };
	    var deleteRule = function(ruleUID)
	    {


		areYouSure = confirm("Are you sure you want to remove " + ruleUID + "?");
		if (areYouSure)
		{
		    var rulesLength = customRules.length;
		    for (var i = 0; i < rulesLength; i++)
		    {
			if (customRules[i].uid === ruleUID)
			{
			    customRules.splice(i, 1);
			    break;
			}
		    }
		    var child = document.getElementById(ruleUID);
		    child.parentNode.removeChild(child);
		}

	    };
	    var parseInput = function()
	    {
		var delimiter = document.getElementById("delimiterType").value;
		userInputArray = document.getElementById("userStimuli").value.split(delimiter === "newline" ? "\n" : delimiter);
		cleanWhitespace(userInputArray);
		var rulesLength = customRules.length;
		for (var i = 0; i < rulesLength; i++)
		{
		    updateRule(customRules[i].uid);
		}

		document.getElementById("itemCount").innerHTML = userInputArray.length;
		//document.getElementById("resultList").innerHTML = userInputArray.toString();
	    };
	    var cleanWhitespace = function(inArray)
	    {
		var arrayLength = inArray.length;

		for (var i = 0; i < arrayLength; i++)
		{
		    inArray[i] = inArray[i].trim();


		    if (inArray[i] === "")
		    {
			inArray.splice(i, 1);
			i -= 1;
			arrayLength -= 1;
		    }
		}


	    };
	    parseInput();

	    var addRefToNamespace = function(ref, refName)
	    {
		namespace[refName] = ref;
	    };
	    addRefToNamespace(parseInput, "parseInput");
	    addRefToNamespace(deleteRule, "deleteRule");
	    addRefToNamespace(addCustomRule, "addCustomRule");
	    addRefToNamespace(updateRule, "updateRule");
	    addRefToNamespace(goNow, "goNow");

	})(window);