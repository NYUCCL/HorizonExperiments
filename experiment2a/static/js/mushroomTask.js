var psiTurk = PsiTurk();

var pages = [
    "instruct.html",
    "quiz.html",
    "restart.html",
    "instruct1.html",
    "instruct2.html",
    "instruct3b.html",
    "instruct4b.html",
    "instruct5.html",
    "instruct6.html",
    "stage.html",
    "postquestionnaire.html",
    "transition.html"
];

psiTurk.preloadPages(pages);

var instructionpages = [
    "instruct.html",
    "instruct1.html",
    "instruct2.html",
    "instruct3b.html",
    "instruct5.html",
    "instruct4b.html"
];

//info for outcomes
var goodColor = "lime";
var badColor = "red";
var avoidColor = "gray";

var startingEnergy = 0.50;

//location parameters
var width = 1000;
var height = 660;
var topMargin = "10px";
var stimLocation = [width/2, height/5];
var categoryHeight = 580;
var catOffset = -40;
var catScale = [0.4,0.4];


var habitats = [
    {   image: 'artictundra.jpg',
        id: "h1",
        _width: 600,
        _height: 400,
        _x: 0,
        _y: 0,
        _name: "Artic Tundra",
        _desc: "Description of this habitat goes here"
    },
    {   image: 'newenglandforest.jpg',
        id: 'h2',
        _width: 600,
        _height: 400,
        _x: 0,
        _y: 0,
        _name: "New England Forest",
        _desc: "Description of this habitat goes here"
    },
    {   image: 'temperaterainforest.jpg',
        id: 'h3',
        _width: 600,
        _height: 400,
        _x: 0,
        _y: 0,
        _name: "Temperate Rainforest",
        _desc: "Description of this habitat goes here"
    },
    {   image: 'equatorialjungle.jpg',
        id: 'h4',
        _width: 600,
        _height: 400,
        _x: 0,
        _y: 0,
        _name: "Equatorial Jungle",
        _desc: "Description of this habitat goes here"
    }
]


var mushrooms = [
    {   image: 'mushroom-species_01.png',
        id: 'm1',
        _width: 96,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "A. capestris",
        hist: []
    },
    {   image: 'mushroom-species_02.png',
        id: 'm2',
        _width: 107,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "A. ponderosa",
        hist: []
    },
    {   image: 'mushroom-species_03.png',
        id: 'm3',
        _width: 89,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "L. fragilis",
        hist: []
    },
    {   image: 'mushroom-species_04.png',
        id: 'm4',
        _width: 84,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "L. manzanitae",
        hist: []
    },
    {   image: 'mushroom-species_05.png',
        id: 'm5',
        _width: 99,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "L. molybdites",
        hist: []
    },
    {   image: 'mushroom-species_06.png',
        id: 'm6',
        _width: 102,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "T. magnivelare",
        hist: []
    },
    {   image: 'mushroom-species_07.png',
        id: 'm7',
        _width: 101,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "P. aurivella",
        hist: []
    },
    {   image: 'mushroom-species_08.png',
        id: 'm8',
        _width: 98,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "M. conica",
        hist: []
    },
    {   image: 'mushroom-species_09.png',
        id: 'm9',
        _width: 76,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "L. rhacodes",
        hist: []
    }
]

/*************************
* GENERATE STIMULI
*************************/
var ExperimentGenerator = function(numTrialsObservation, numTrialsApAv, frequenciesObservation, frequenciesApAv, rewardProbs, healthyPayoff, poisonousPayoff, avoidPayoff, testKnowledge) {
    //expDefinition contains dictionaries with the following entries: mode, trial, cat, value, apPayoff, avPayoff
    var expDefinition = [];
    var numSpecies = frequenciesApAv.length;
    if(rewardProbs.length != numSpecies || frequenciesApAv.length != numSpecies){
        console.log("Number of frequency values and reward values don't match!");
    }
    var outcomes = [];
    var trialsBoth = [];
    var frequenciesBoth = [frequenciesObservation, frequenciesApAv];

    var numTrialsBoth = [numTrialsObservation, numTrialsApAv];
    //generate categories for all observation and approach/avoid trials
    for(var i=0; i<2; i++){
        var trials = [];
        var frequencies = frequenciesBoth[i];
        var numTrials = numTrialsBoth[i];
        //change frequencies to counts. Make sure we end up with the right number of trials,
        //matching frequency proportions as closely as possible.
        var cumulativeFreqs = [frequencies[0]];
        var cumulativeCounts = [Math.round(cumulativeFreqs[0]*numTrials)];
        var counts = [cumulativeCounts[0]];
        for(var j = 1; j < numSpecies; j++){
            cumulativeFreqs.push(cumulativeFreqs[j-1]+frequencies[j]);
            cumulativeCounts.push(Math.round(cumulativeFreqs[j]*numTrials));
            counts.push(cumulativeCounts[j]-cumulativeCounts[j-1]);
        }
        //generate sequence of trials from counts
        for(var j = 0; j < numSpecies; j++){
            for(var k = 0; k < counts[j]; k++){
                trials.push(j);
            }
        }
        trials = _.shuffle(trials);
        if(trials.length != numTrials){
            console.log('Number of trials wrong. Check that frequencies add to 1')
        }
        trialsBoth.push(trials);
        //generate outcomes for the approach/avoid trials
        if(i){
            for(var j = 0; j < numSpecies; j++){
                outcomes.push([]);
                var numGood = Math.round(counts[j]*rewardProbs[j]);
                for(var k = 0; k < counts[j]; k++){
                    if(k < numGood){
                        outcomes[j].push(1);
                    }else{
                        outcomes[j].push(0);
                    }
                }
                outcomes[j] = _.shuffle(outcomes[j]);
            }
        }
    }
    var trialsObservation = trialsBoth[0];
    var trialsApAv = trialsBoth[1];
    var trialNum = 0;
    //push observation trials into expDefinition
    for(var i = 0; i < numTrialsObservation; i++){
        var category = trialsObservation.shift();
        expDefinition.push({mode: 'obs', trial: trialNum++, proportion: frequenciesObservation[category], probGood: rewardProbs[category], cat: category, value: null, apPayoff: null, avPayoff: null});
    }
    //push quiz trials
    if(testKnowledge){
        var shuffledCats = _.shuffle(_.range(numSpecies));
        for(var i = 0; i < numSpecies; i++){
            var whichCat = shuffledCats[i];
            //assuming question of form "is this species more rare or more common than the average species?"
            expDefinition.push({mode: 'knowTest', trial: trialNum++, cat: whichCat, proportion: frequenciesObservation[whichCat]});
        }
    }

    //push approach/avoid trials into expDefinition
    for(var i=0; i < numTrialsApAv; i++){
        var category = trialsApAv.shift();
        var theOutcome = outcomes[category].shift();
        var approachPayoff;
        if(theOutcome){
            approachPayoff = healthyPayoff;
        }else{
            approachPayoff = poisonousPayoff;
        }
        expDefinition.push({mode: 'apav', trial: trialNum++, proportion: frequenciesApAv[category], probGood: rewardProbs[category], cat: category, value: theOutcome, apPayoff: approachPayoff, avPayoff: avoidPayoff});
    }
    return expDefinition;
}

var InitializeObserved = function(speciesList){
    var newObserved = [];
    for(var i=0;i< speciesList.length;i++){
        newObserved.push({species: speciesList[i], hist: []});
    }
    //counterbalance observed so location of mushrooms are counterbalanced
    return newObserved;
}


//returns the data structure corresponding to the given stimulus color
function getCurrentCat(observed, species) {
    var currentCatArray = $.grep(observed, function(e){return e.species === species});
    if(currentCatArray.length==0){
        return null;
    } else{
        return currentCatArray[0];
    }
}




var listening, currentview;

/*************************
* INSTRUCTIONS
*************************/
var Instructions = function(pages, complete_fn) {

    var currentscreen = 0,timestamp;

    var instruction_pages = pages;
    var loop = 1;
    var next = function() {
        psiTurk.showPage(instruction_pages[currentscreen]);
        $('.continue').click(function() {
            buttonPress();
        });
        currentscreen = currentscreen + 1;
        // Record the time that an instructions page is presented
        timestamp = new Date().getTime();
    };

    var buttonPress = function() {
        // Record the response time
        var rt = (new Date().getTime()) - timestamp;
        psiTurk.recordTrialData({'phase':"INSTRUCTIONS",'screen':currentscreen, 'rt':rt});
        if (currentscreen == instruction_pages.length) {
            finish();
        } else {
            next();
        }
    };

    var finish = function() {
	function record_responses() {
	    var allRight = true;
	    $('select').each( function(i, val) {
		psiTurk.recordTrialData({'phase':"INSTRUCTQUIZ", 'question':this.id, 'answer':this.value});
		if(this.id==='healthyPoisonous' && this.value != 'sometimes'){
		    allRight = false;
		}else if(this.id==='poison' && this.value != 'red'){
		    allRight = false;
		}else if(this.id==='health' && this.value !='green'){
		    allRight = false;
		}else if(this.id==='avoid' && this.value !='gray'){
		    allRight = false;
		}else if(this.id==='avoidInfo' && this.value !='noInfo'){
		    allRight = false;
		}else if(this.id==='frequency' && this.value !='unequal'){
		    allRight = false;
		}
	    });
	    return allRight;
	};
	psiTurk.showPage('quiz.html')
	$('#continue').click(function () {
	    if(record_responses()){
		// Record that the user has finished the instructions and
		// moved on to the experiment. This changes their status code
		// in the database.
		psiTurk.recordUnstructuredData('instructionloops', loop);
		psiTurk.finishInstructions();
		// Move on to the experiment
                complete_fn();
	    }else{
		loop++;
		currentscreen = 0;
		psiTurk.showPage('restart.html');
		$('.continue').click(function() {
		    buttonPress();
		});
	    }
	});
    };
    next();
};

/******************************
* TallyDisplay
******************************/
var TallyDisplay = function(thestage, observed) {
    var svg = thestage.append("g");
    var data = observed;
    var species = [];
    //extract species from observed (which could be empty of observations at this point)
    for(var i = 0; i<observed.length; i++){
        species.push(observed[i].species)
    }

    /* intialize */
    this.init = function (decisionPhase) {
        // calculate spacing  (assumes that width of display > total width of all the species )
        var totalwidth = 800-110;
        var imgwidth = 0;
        for(var i=0; i<species.length; i++) {
            imgwidth += species[i]._width;
        }
        var spacer = (totalwidth-imgwidth)/(species.length-1+2); // divides by columns, plus two edges

        var offset = 0;
        for(var i=0; i<species.length; i++) {
            offset+=spacer;
            if (i>0) { offset += species[i-1]._width; }
            species[i]._x = offset;
            species[i]._y = 250;
            // add species names here?
        }

        //svg groups for the categories
        var categories = svg.selectAll(".cat")
            .data(species)
            .enter()
            .append("g")
            .attr("id", function(d) { return d.id })
            .attr("class", "cat")
            .attr("transform", function(d) { return "translate(" + d._x + "," + 0 + ")";});

        // append bucket to hold the dots
        categories.append("g")
                  .attr("class", "bucket");

        // append icon
        categories.append("g")
            .attr("class", "icon")
          .append("image") // append image
            .attr("xlink:href", function(d) { return '/static/images/' + d.image; })
            .attr("y", function(d) { return d._y; })
            .attr("width", function(d) { return d._width; })
            .attr("height", function(d) { return d._height; })

        // append the arrow reminding logic
        if(!decisionPhase){
            svg.append("image")
                .attr("xlink:href", '/static/images/moredot_morecommon.png')
                .attr("y", 150)
                .attr("x", 690)
                .attr("width", 112)
                .attr("height", 188);
        }

        // append species label?
        categories.append("text")
                  .attr("class","speciesname")
                  .attr("x", function(d) { return d._width/2.0-30; })
                  .attr("y", 450-35)
                  .attr("fill", "black")
                  .text(function(d) { return d._name});
    }

    this.getAll = function(){
        return svg;
    }

    this.addHighlight = function(speciesId, time){
        for (var i=0; i<species.length; i++) {
            if (species[i].id!=speciesId) {
                svg.select("#"+species[i].id).transition()
                    .duration(time)
                    .style("opacity", 0.1);
            }   else {
                svg.select("#"+species[i].id).transition()
                    .duration(time)
                    .style("opacity", 1.0);
            }
        }
    }

    this.removeHighlight = function(time){
        for (var i=0; i<species.length; i++) {
            svg.select("#"+species[i].id).transition()
                .duration(time)
                .style("opacity", 1.0);
        }
    }
    this.lowlight = function(time){
        for (var i=0; i<species.length; i++) {
            svg.select("#"+species[i].id).transition()
                .duration(time)
                .style("opacity", 0.1);
        }
    }

    /* update the display */
    //updates UI following addition of new trial data
    this.update = function(time, decisionPhase, amountString) {

        //svg groups for the categories
        var categories = svg.selectAll(".cat").data(data);

        //attach data to circles
        var hist = categories.select(".bucket")
                             .selectAll("g")
                             .data(function(d,i){ return d.hist;});

        //add new trial data
        if(decisionPhase){
            var circleGroup = hist.enter().append("g")

            circleGroup.append("circle")
                .attr("r", 12)
                .attr("cy", function(d,i) { return 230-14*Math.floor(i/6);})
                .style("fill", function(d){
                    if(d.outcome==0) { return avoidColor; }
                    else if(d.outcome==1) { return badColor; }
                    else { return goodColor; }
                })
                .attr("cx", function(d,i){
                    return 14*(i%6)+14;
                });

            circleGroup.append("text")
                .attr("x", 25)
                .attr("y", function(d, i){return 210-14*Math.floor(i/6);})
                .style("fill", function(d){
                    if(d.outcome==0) { return avoidColor; }
                    else if(d.outcome==1) { return badColor; }
                    else { return goodColor; }
                })
                .style("font", "bold 18px monospace")
                .text(amountString);

            //sort circles and original data so that greens, reds, and grays are grouped together
            hist.sort(histSorter);
            for(var i=0;i<data.length;i++){
                data[i].hist.sort(histSorter);
            }

            //reorder
            setTimeout(function(){
                hist.select("text").transition()
                    .duration(time/2)
                    .style("opacity", 0)
                    .remove()
                hist.select("circle").transition()
                    .duration(time/2)
                    .attr("cy", function(d,i){ return 250-14*Math.floor(i/6);})
                    .attr("cx", function(d,i){ return 14*(i%6)+14; })
                    .attr("r", 6);
            }, time/2);
        } else{
            hist.enter().append("g")
              .append("circle")
                .attr("class", "dot")
                .attr("r", 6)
                .attr("cy", function(d,i){ return 250-14*Math.floor(i/6);})
                .attr("cx", function(d,i){ return 14*(i%6)+14; })
                .style("fill", function(d){
                    if(d.outcome==0) { return avoidColor; }
                    else if(d.outcome==1) { return badColor; }
                    else { return goodColor; }
                });

            //sort circles and original data so that greens, reds, and grays are grouped together
            hist.sort(histSorter);
            for(var i=0;i<data.length;i++){
                data[i].hist.sort(histSorter);
            }

        }
        //sorts trials first by outcome, then by trial number
        function histSorter(a,b) {
            if (a.outcome > b.outcome) { return 1; }
            else if (a.outcome < b.outcome) { return -1; }
            else if (a.trial > b.trial) { return 1; }
            else if (a.trial < b.trial) { return -1 }
            else { return 0; }
        }
    }
}

/******************************
* Score
******************************/
var Score = function(stage, start, x, y){
    var score = start;
    var svg = stage;
    var scoreDisplay = svg.append("g")
        .attr("id", "scoreDisplay")
        .attr("transform", "translate(" + x + ", " + y + ")");

    var aboveScore = scoreDisplay.append("text")
        .text("Potential Bonus:")
        .attr("x", 32)
        .attr("y", 32)
        .style("fill", "black")
        .style("font", "bold 28px monospace");
    var scoreText = scoreDisplay.append("text")
        .text("$" + score.toFixed(2))
        .attr("x", 32)
        .attr("y", 102)
        .style("fill", "black")
        .style("font", "bold 68px monospace");

    this.update = function(change, color){
        score += change
        scoreText.text("$" + score.toFixed(2))
    }
    this.get = function(){
        return score;
    }
}



/*******************************
*  Observational Learning Phase *
********************************/
var ObservePhase = function(species, stimuli, habitat, habitatNum, complete_fn) {
    psiTurk.showPage('stage.html');

    var thestage =  d3.select("body").select("svg");

    //reshuffle species so display order doesn't reflect abstract numbering of categories
    var reshuffledSpecies = _.shuffle(species);
    var observed = InitializeObserved(reshuffledSpecies);
    var disp = new TallyDisplay(thestage, observed);


    var showHabitat = function() {

        d3.select("body").select("h1").text("Welcome to the " + habitat._name + " ecosystem");
        d3.select("body").select(".aboveStage").append("p").html("This ecosystem is home to mushroom species found nowhere else in the world. All mushroom species in this area could be healthy or poisonous.");
        // show image for habitat
        thestage.append("image")
                .attr("class","habitat")
                .attr("xlink:href", '/static/images/' + habitat.image)
                .attr("y", 10)
                .attr("x", 100)
                .attr("width", 600)
                .attr("height", 400);
        d3.select("body")
          .select(".belowStage")
          .append("input")
          .attr("type","button")
          .attr("class","continue")
          .attr("id","Next")
          .attr("value","Next");
        $('.continue').click(function() {
            beginObserve();
        });
    }

    var beginObserve = function() {
        d3.select(".habitat").remove();
        d3.select(".continue").remove();
        d3.select(".aboveStage").selectAll("p").remove();
        // set the title
        d3.select("body").select("h1").text("Your field log for the " + habitat._name);

        // test
        d3.select("body").select(".aboveStage").insert("p").html("You are counting species growing in the <strong>" + habitat._name +"</strong>.  Each dot represents a individual mushroom you have encountered in your field work.");
        disp.init(false);
        setTimeout( function() { accumulateObservations(); }, 2000);
    }


    var accumulateObservations = function (){
        if (stimuli[0].mode != 'obs') {
            disp.update(0, false, "");
            setTimeout( function(){ finish(); }, 2000);
        } else {
            var stim = stimuli.shift();
            var currentSpecies = species[stim.cat];
            getCurrentCat(observed, currentSpecies).hist.push({trial: stim.trial, outcome: 0});
            disp.update(0, false, "");

            setTimeout( function() { accumulateObservations(); }, 30);
        }
    }

    var finish = function() {
        d3.select("body").select("h1").text("Click next to continue.");
        d3.select("body")
          .select(".belowStage")
          .append("input")
          .attr("type","button")
          .attr("class","continue")
          .attr("id","Next")
          .attr("value","Next");
        $('.continue').click(function() {
            complete_fn(observed);
        });
    }

    showHabitat();

}

/**********************************
* Quiz on Mushroom Frequency      *
**********************************/
var FrequencyQuizPhase = function(observed, species, stimuli, habitat, habitatNum, complete_fn) {
    psiTurk.showPage('stage.html');
    var thestage =  d3.select("body").select("svg");
    var display = new TallyDisplay(thestage, observed);
    display.init(false);
    display.update(0, false, "");
    var stim, currentSpecies;
    var aboveStage = d3.select("body").select(".aboveStage");
    var belowStage = d3.select("body").select(".belowStage");
    d3.select("body").select("h1").text("" + habitat._name + " field report");

    var nextQuestion= function() {
        if(stimuli[0].mode != 'knowTest'){
            finish();
        }
        else{
            stim = stimuli.shift();
            currentSpecies = species[stim.cat];
            askQuestion();
        }
    }

    var askQuestion = function() {
        var stimOn = new Date().getTime();
        aboveStage.selectAll("p").remove();
        belowStage.selectAll("p").remove();
        aboveStage.append("p")
            .html("It's time to send a field report back to the lab. Answer the following questions about your observations:")
        belowStage.append("p")
            .html("If you saw <strong>10 mushrooms</strong> on your hike back through the " + habitat._name + ", how many would you expect to be from the species <strong>" + currentSpecies._name + "</strong>? <strong>Use the drop-down menu to make your selection</strong>.")
        var dropDown = belowStage.append("select")
            .attr("id", "freqSelect")
            .style("margin-right", "50px")

        for(var i = 0; i < 11; i++){
            dropDown.append("option")
                .attr("value", i)
                .html(i);
        }
        var nextButton = belowStage.append("input")
            .attr("type", "button")
            .attr("value", "next")
            .attr("id", "next")
        display.addHighlight(currentSpecies.id, 500);
        $('#next').click(function() {
            var rt = new Date().getTime() - stimOn;
            psiTurk.recordTrialData({'cond': condition,
                                     'habitat': habitat._name,
                                     'habitatNum': habitatNum,
                                     'trial': stim.trial,
                                     'phase': stim.mode,
                                     'category': stim.cat,
                                     'species': currentSpecies._name,
                                     'freq': stim.proportion,
                                     'response': $("#freqSelect").val(),
                                     'rt': rt});
            dropDown.remove()
            nextButton.remove();
            display.lowlight(500);
            setTimeout(function(){nextQuestion();}, 500);
        });
    }


    var finish = function() {
        complete_fn(observed);
    }

    nextQuestion();

}


/**********************************
* Decision (Approach Avoid) Phase *
**********************************/
var DecidePhase = function(observed, species, stimuli, habitat, habitatNum, countdownNum, complete_fn) {
    psiTurk.showPage('stage.html');
    var thestage =  d3.select("body").select("svg");
    var display, successes, failures, approachPic, avoidPic, stim, currentSpecies, stimOn, scoreKeeper, bottomMessage, approachGroup, avoidGroup;
    var initializeGame = function(){
        thestage.attr("height", "650");
        //d3.select("body").select("h1").text(habitat._name + " mushroom challenge");

        display = new TallyDisplay(thestage, observed);
        display.init(true);
        display.update(0, false, "");
        display.getAll().attr("transform", "translate(0,50)");

        successes = [];
        failures = [];
        for(var i = 0; i < species.length; i++){
            successes.push(0);
            failures.push(0);
        }
        scoreKeeper = new Score(thestage, startingEnergy, 10, 40);
        //Useful note - stim has these fields: mode, trial, cat, value, apPayoff, avPayoff


        nonMushroomVisuals = thestage.insert("g")
            .attr("transform", "translate(0, 450)");

        statusVisuals = nonMushroomVisuals.insert("g")

        //magic from Mike Bostock to add score to this group after it exits
        statusVisuals.select(function(){ return this.appendChild(document.getElementById("scoreDisplay"));});

        approachGroup = nonMushroomVisuals.insert("g")
            .attr("transform", "translate(350, 50)");
        approachPic = approachGroup.insert("image")
            .attr("class", "choiceButton")
            .attr("xlink:href", "static/images/approachMouth.png")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 110)
            .attr("height", 106)
            .style("opacity", 0.5)
        approachGroup.append("text")
            .style("font", "bold 18px monospace")
            .attr("x", 40)
            .attr("y", 130)
            .attr("fill", "black")
            .text("eat");

        avoidGroup = nonMushroomVisuals.insert("g")
            .attr("transform", "translate(550, 30)")
        avoidPic = avoidGroup.insert("image")
            .attr("class", "choiceButton")
            .attr("xlink:href", "static/images/avoidSkull.png")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 110)
            .attr("height", 142)
            .style("opacity", 0.5)
        avoidGroup.append("text")
            .style("font", "bold 18px monospace")
            .attr("x", 30)
            .attr("y", 150)
            .attr("fill", "black")
            .text("avoid");

        bottomMessage = d3.select(".belowStage")
          .insert("p")
        .style("text-align", "center");

        next();
    }

    //variables to keep track of where the mouse is so opacity updating can happen
    //properly even when the mouseover and mousout functions change.
    var eatIn = false;
    var avoidIn = false;
    var setButtonState = function(state){
        if(state==="off"){
            approachGroup.style("visibility", "hidden");
            avoidGroup.style("visibility", "hidden");
            approachPic.on("mouseover", function(){eatIn = true;})
                .on("mouseout", function(){eatIn = false;})
                .on("click", function(){})
            avoidPic.on("mouseover", function(){avoidIn = true;})
                .on("mouseout", function(){avoidIn = false;})
                .on("click", function(){});

        }else if(state==="on"){
            approachGroup.style("visibility", "visible");
            avoidGroup.style("visibility", "visible");
            approachPic.on("click", function(){responseHandler(1)})
                .on("mouseover", function(){d3.select(this).style("opacity", 1); eatIn = true;})
                .on("mouseout", function(){d3.select(this).style("opacity", 0.5); eatIn = false;});

            avoidPic.on("click", function(){responseHandler(0)})
                .on("mouseover", function(){d3.select(this).style("opacity", 1); avoidIn = true;})
                .on("mouseout", function(){d3.select(this).style("opacity", 0.5); avoidIn = false;});

            if(eatIn){
                approachPic.style("opacity", 1);
            } else{
                approachPic.style("opacity", 0.5);
            }
            if(avoidIn){
                avoidPic.style("opacity", 1);
            } else{
                avoidPic.style("opacity", 0.5);
            }
        }
    }

    var next = function() {
        var nLeft = stimuli.length;
        if(nLeft <= countdownNum){
            if(nLeft===1){
                d3.select("body").select("h1").text("Last mushroom!");
            } else{
                d3.select("body").select("h1").text(""+nLeft+" mushrooms left!");
            }
        }
        if(nLeft === 0){
            finish();
        }
        else{
            stim = stimuli.shift();
            currentSpecies = species[stim.cat];
            showStim();
        }
    }

    var showStim = function() {
        stimOn = new Date().getTime();
        display.addHighlight(currentSpecies.id, 500);
        setButtonState("on");
        bottomMessage.html("Click either 'eat' or 'avoid'.");
    }

    var responseHandler = function(approached) {
        //Useful note - stim has these fields: mode, trial, cat, value, apPayoff, avPayoff
        var rt = new Date().getTime() - stimOn;
        var currentCatData = getCurrentCat(observed, currentSpecies);
        setButtonState("off");
        var successesBefore = successes[stim.cat];
        var failuresBefore = failures[stim.cat];
        var scoreBefore = scoreKeeper.get();
        var scoreChangeString = "";
        if(approached){
            if(stim.apPayoff < 0){
                scoreChangeString += "-";
            }
            scoreChangeString += "$" + Math.abs(stim.apPayoff.toFixed(2));
            currentCatData.hist.push({trial: stim.trial, outcome: stim.value+1});
            if(stim.value){
                bottomMessage.html("<span style='color:green'>This mushroom was HEALTHY</span>")
                successes[stim.cat]++;
                scoreKeeper.update(stim.apPayoff, goodColor);

            }
            else{
                bottomMessage.html("<span style='color:red'>This mushroom was POISONOUS</span>")
                failures[stim.cat]++;
                scoreKeeper.update(stim.apPayoff, badColor);
            }
        }else{
            if(stim.avPayoff < 0){
                scoreChangeString += "-";
            }
            scoreChangeString += "$" + Math.abs(stim.avPayoff.toFixed(2));
            currentCatData.hist.push({trial: stim.trial, outcome: 0});
            scoreKeeper.update(stim.avPayoff, avoidColor);
            bottomMessage.html("<span style='color:gray'>You avoided this mushroom</span>")
        }

        display.update(1500, true, scoreChangeString);
        psiTurk.recordTrialData({'cond': condition,
                                 'habitat': habitat._name,
                                 'habitatNum': habitatNum,
                                 'trial': stim.trial,
                                 'phase': stim.mode,
                                 'category': stim.cat,
                                 'species': currentSpecies._name,
                                 'value': stim.value,
                                 'freq': stim.proportion,
                                 'probGood': stim.probGood,
                                 'response': approached,
                                 'successes': successesBefore,
                                 'failures': failuresBefore,
                                 'score': scoreBefore.toFixed(2),
                                 'scoreAfter': scoreKeeper.get().toFixed(2),
                                 'successesAfter': successes[stim.cat],
                                 'failuresAfter': failures[stim.cat],
                                 'rt': rt});

        setTimeout(function(){display.lowlight(500);}, 1500);
        setTimeout(function(){next();}, 2000);
    }

    var finish = function() {
        complete_fn();
    }

    var showHabitat = function() {
        thestage.attr("height", "450");
        d3.select("body").select("h1").text("Hike back through the " + habitat._name + "");
        // show image for habitat
        thestage.append("image")
                .attr("class","habitat")
                .attr("xlink:href", '/static/images/' + habitat.image)
                .attr("y", 10)
                .attr("x", 100)
                .attr("width", 600)
                .attr("height", 400);
        d3.select("body")
          .select(".belowStage")
          .append("input")
          .attr("type","button")
          .attr("class","continue")
          .attr("id","Next")
          .attr("value","Next");
        $('.continue').click(function() {
            d3.select(".habitat").remove();
            $(this).remove();
            d3.select("p").remove();
            initializeGame();
        });
    }



    showHabitat();
}





/****************
 * Questionnaire *
****************/
var Questionnaire = function() {
    var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

    record_responses = function() {
	psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});
	$('textarea').each( function(i, val) {
	    psiTurk.recordUnstructuredData(this.id, this.value);
	});
	$('select').each( function(i, val) {
	    psiTurk.recordUnstructuredData(this.id, this.value);
	});
	$('input').each( function(i, val) {
	    psiTurk.recordUnstructuredData(this.id, this.value);
	});
    };

    finish = function() {
        completeHIT();
    };

    prompt_resubmit = function() {
    replaceBody(error_message);
    $("#resubmit").click(resubmit);
    };

    resubmit = function() {
        replaceBody("<h1>Trying to resubmit...</h1>");
        reprompt = setTimeout(prompt_resubmit, 10000);

        psiTurk.saveData({
            success: function() {
                clearInterval(reprompt);
                psiTurk.computeBonus('compute_bonus', function(){finish()});
            },
            error: prompt_resubmit}
                        );
    };

    // Load the questionnaire snippet
    psiTurk.showPage('postquestionnaire.html');
    psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});
    $("#continue").click(function () {
        record_responses();
        psiTurk.teardownTask();
        psiTurk.saveData({
            success: function(){
                psiTurk.computeBonus('compute_bonus', function(){finish()});
            },
            error: prompt_resubmit}
                        );
    });
};

var completeHIT = function() {
    // save data one last time here?
    window.location= adServerLoc + "/complete?uniqueId=" + psiTurk.taskdata.id;
}


/*******************
 * Run Task
 ******************/
$(window).load( function(){

    currentview = new Instructions(instructionpages, function () {
        currentview = new HabitatPlanner()});
});

var HabitatPlanner = function(){
    var startCountdownAt = 5;
    var numHabitats = 2;
    var obsTrials = 120;
    var decisionTrials = 120;
    var healthGain = 0.05;
    var poisonCost = -0.05;
    var avoidCost = 0;
    var rewardProbabilities = [0.3, 0.7, 0.3, 0.7];
    var proportions = [0.11,0.09,0.41,0.39];
    habitats = _.shuffle(habitats);
    var shuffledMushrooms = _.shuffle(mushrooms);
    var numSpecies = 4;
    var mushroomSets = [];
    for(var i = 0; i < 2; i++){
        var usedMushrooms = [];
        for(var j = 0; j < numSpecies; j++){
            usedMushrooms.push(shuffledMushrooms.shift());
        }
        mushroomSets.push(usedMushrooms);
    }
    var habPlanner = this;

    this.transitionToNext = function(i){
        psiTurk.showPage('transition.html');
        $('.continue').click(function() {
            habPlanner.runNext(i);
        });
    }


    this.runNext = function(i){
        var apAvCompleteFn;
        if(i===numHabitats-1){
            apAvCompleteFn = function() { currentview = new Questionnaire(); };
        } else{
            apAvCompleteFn = function() { habPlanner.transitionToNext(i+1); };
        }
        var allStimuli = ExperimentGenerator(obsTrials, decisionTrials, proportions, proportions, rewardProbabilities, healthGain, poisonCost, avoidCost, true);
        currentview = new ObservePhase(mushroomSets[i], allStimuli, habitats[i], i, function (observed) {
            currentview = new FrequencyQuizPhase(observed, mushroomSets[i], allStimuli, habitats[i], i, function (observed) {
                currentview = new DecidePhase(observed, mushroomSets[i], allStimuli, habitats[i], i, startCountdownAt, apAvCompleteFn);
            });
        });

    }
    this.runNext(0);
}
// vi: noexpandtab tabstop=4 shiftwidth=4
