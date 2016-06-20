var psiTurk = PsiTurk(uniqueId, adServerLoc);

var pages = [
    "quiz.html",
    "restart.html",
    "instruct2.html",
    "instruct.html",
    "instruct3.html",
    "instruct4.html",
    "instruct5.html",
    "stage.html",
    "postquestionnaire.html"
];

psiTurk.preloadPages(pages);

var instructionpages = [
    "instruct.html",
    "instruct2.html",
    "instruct3.html",
    "instruct4.html",
    "instruct5.html"
];

//info for outcomes
var goodColor = "lime";
var badColor = "red";
var avoidColor = "gray";
var colors = ["white", avoidColor, badColor, goodColor];

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
    },
    {
        image: 'mushroom-species_10.png',
        id: 'm10',
        _width: 108,
        _height: 139,
        _x: 0,
        _y: 0,
        //possibly made up name
        _name: "C. cibarius",
        hist: []
    },
    {
        image: 'mushroom-species_11.png',
        id: 'm11',
        _width: 90,
        _height: 140,
        _x: 0,
        _y: 0,
        //possibly made up name
        _name: "C. cornucopioides",
        hist: []
    },
    {
        image: 'mushroom-species_12.png',
        id: 'm12',
        _width: 93,
        _height: 117,
        _x: 0,
        _y: 0,
        _name: "H. psittacinus",
        hist: []

    },
    {
        image: 'mushroom-species_13.png',
        id: 'm13',
        _width: 104,
        _height: 159,
        _x: 0,
        _y: 0,
        _name: "A. virosa",
        hist: []

    },
    {
        image: 'mushroom-species_14.png',
        id: 'm14',
        _width: 103,
        _height: 141,
        _x: 0,
        _y: 0,
        _name: "C. praestans",
        hist: []

    },
    {
        image: 'mushroom-species_15.png',
        id: 'm15',
        _width: 94,
        _height: 123,
        _x: 0,
        _y: 0,
        _name: "B. satanas",
        hist: []

    },
    {
        image: 'mushroom-species_16.png',
        id: 'm16',
        _width: 102,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "L. procera",
        hist: []

    },
    {
        image: 'mushroom-species_17.png',
        id: 'm17',
        _width: 100,
        _height: 118,
        _x: 0,
        _y: 0,
        _name: "P. ostraetus",
        hist: []

    },
    {
        image: 'mushroom-species_18.png',
        id: 'm18',
        _width: 96,
        _height: 114,
        _x: 0,
        _y: 0,
        _name: "A. angerita",
        hist: []

    },
    {
        image: 'mushroom-species_19.png',
        id: 'm19',
        _width: 97,
        _height: 141,
        _x: 0,
        _y: 0,
        _name: "L. deliciosus",
        hist: []

    },
    {
        image: 'mushroom-species_20.png',
        id: 'm20',
        _width: 103,
        _height: 129,
        _x: 0,
        _y: 0,
        _name: "E. clypeatum",
        hist: []
    },
    {
        image: 'mushroom-species_21.png',
        id: 'm21',
        _width: 98,
        _height: 130,
        _x: 0,
        _y: 0,
        _name: "C. nebularis",
        hist: []
    },
    {
        image: 'mushroom-species_22.png',
        id: 'm22',
        _width: 98,
        _height: 148,
        _x: 0,
        _y: 0,
        _name: "P. arvensis",
        hist: []
    },
    {
        image: 'mushroom-species_23.png',
        id: 'm23',
        _width: 102,
        _height: 146,
        _x: 0,
        _y: 0,
        _name: "V. volvacea",
        hist: []
    },
    {
        image: 'mushroom-species_24.png',
        id: 'm24',
        _width: 104,
        _height: 130,
        _x: 0,
        _y: 0,
        _name: "R. nudus",
        hist: []
    },
]

var listening, currentview;

/*************************
* INSTRUCTIONS
*************************/
var loop = 1;
var quiz = function(complete_fn) {
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
        return allRight
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
            psiTurk.showPage('restart.html');
            $('.continue').click(function() {
                psiTurk.doInstructions(
                    instructionpages,
                    function () {quiz(function(){currentview = new HabitatPlanner()})});
            });
        }
    });
};

/******************************
* TallyDisplay
******************************/
var TallyDisplay = function(thestage, observed, numTrials) {
    var svg = thestage.append("g")
    var data = observed;
    var species = [observed[0].species];
    var force
    var node
    var nodes
    var foci

    /* intialize */
    this.init = function () {
        // calculate spacing  (assumes that width of display > total width of all the species )
        var totalwidth = 800-110;
        var imgwidth = 0;

        //using 0 index from species array since there's just one species in this version
        species[0]._x = 100;
        species[0]._y = 100;

        //svg groups for the categories
        var categories = svg.selectAll(".cat")
            .data(species)
            .enter()
            .append("g")
            .attr("id", function(d) { return d.id })
            .attr("class", "cat")
            .attr("transform", function(d) { return "translate(" + d._x + "," + d._y + ")";});

        // append bucket to hold the circles
        categories.append("g")
                  .attr("class", "bucket");

        // append icon
        categories.append("g")
            .attr("class", "icon")
          .append("image") // append image
            .attr("xlink:href", function(d) { return '/static/images/' + d.image; })
            .attr("y", 250)
            .attr("width", function(d) { return d._width; })
            .attr("height", function(d) { return d._height; })

        // append species label?
        categories.append("text")
            .attr("class","speciesname")
            .attr("x", function(d) { return d._width/2.0-30; })
            .attr("y", 450-35)
            .attr("fill", "black")
            .text(function(d) { return d._name});

        foci = [{x: 500, y:300}, {x:250,y:300}, {x:250, y:200}, {x:250, y:400}]
        nodes = data[0].hist
        //nodes.forEach(function(d){d.x=Math.random()*500; d.y=Math.random()*500});
        force = d3.layout.force()
            .nodes(nodes)
            .links([])
            .gravity(0)
            .charge(-40)
            .size([500, 500])
            .on("tick", tick);

        node = categories.selectAll("circle");

        function tick(e){
            var k = 0.1 * e.alpha;
            // Push nodes toward their designated focus.
            //console.log(nodes)
            nodes.forEach(function(o, i) {
                o.y += (foci[o.outcome+1].y - o.y) * k;
                o.x += (foci[o.outcome+1].x - o.x) * k;
            })
            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        };

        // //add outlines of the observation circles
        // range = []
        // for(var i = 0; i<numTrials; i++){
        //     range.push(i);
        // }

        force.start();
        node = node.data(nodes);
        node.enter().append("circle")
            .attr("class", "node")
            .attr("cx", function (d) {return d.x;})
            .attr("cy", function (d) {return d.y;})
            .attr("r", 12)
            .style("fill", function(d){ return colors[d.outcome+1]})
            .style("stroke", "black")
            .style("stroke-width", 2);


         var outcomeText = categories.append("text")
             .attr("id", "outcomeText")
             .attr("y", 445)
             .attr("x", 450)
             .style("font", "bold 38px monospace")
    }


    this.getAll = function(){
        return svg;
    }

    /* update the display */
    //updates UI following addition of new trial data
    this.update = function(time, scoreChangeString, color) {
        force.start();
        node.transition()
          .duration(time)
            .style("fill", function(d){ return colors[d.outcome+1]});
        var outcomeText = svg.select("#outcomeText")
        outcomeText.text(scoreChangeString)
            .style("fill", color)
        outcomeText.transition()
            .duration(0)
            .style("opacity", 1)
            .each("end", function(){
                outcomeText.transition()
                    .duration(1000)
                    .style("opacity", 0)});
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
        .style("font", "bold 80px monospace");
    this.update = function(change){
        score += change
        scoreText.text("$" + score.toFixed(2))
    }
    this.get = function(){
        return score;
    }
    this.lowlight = function(){
        scoreText.transition()
            .duration(1000)
            .style("font", "bold 68px monospace");

    }
    this.highlight = function(){
        scoreText.transition()
            .duration(1000)
            .style("font", "bold 80px monospace");
    }
}

/*******************************
* Controls (eat/avoid buttons)
*******************************/
var Controls = function(responseFn, stage, x, y){
    var svg = stage
    var approachGroup = svg.insert("g")
        .attr("transform", "translate(350, 50)");
    var approachPic = approachGroup.insert("image")
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

    var avoidGroup = svg.insert("g")
        .attr("transform", "translate(550, 30)")
    var avoidPic = avoidGroup.insert("image")
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

    //variables to keep track of where the mouse is so opacity updating can happen
    //properly even when the mouseover and mousout functions change.
    var eatIn = false;
    var avoidIn = false;
    this.setButtonState = function(state){
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
            approachPic.on("click", function(){responseFn(1);})
                .on("mouseover", function(){d3.select(this).style("opacity", 1); eatIn = true;})
                .on("mouseout", function(){d3.select(this).style("opacity", 0.5); eatIn = false;});

            avoidPic.on("click", function(){responseFn(0);})
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
        }else if(state=="dim"){
            approachGroup.style("visibility", "visible");
            approachPic.style("opacity", 0.5);
            avoidGroup.style("visibility", "visible");
            avoidPic.style("opacity", 0.5);
            approachPic.on("mouseover", function(){eatIn = true;})
                .on("mouseout", function(){eatIn = false;})
                .on("click", function(){})
            avoidPic.on("mouseover", function(){avoidIn = true;})
                .on("mouseout", function(){avoidIn = false;})
                .on("click", function(){});

        }

    }
}

/**********************************
* Decision (Approach Avoid) Phase *
**********************************/
var DecidePhase = function(species, stimuli, complete_fn) {
    var currentSpecies = species
    var observed = {species: species, hist: []}
    //fill observed with not-yet-eaten mushrooms
    for(var i=1; i<=stimuli.length; i++){
        //-2 is code for not-observed-yet
        observed.hist.push({trial: i, outcome: -1})
    }
    //-1 is code for current prospect
    psiTurk.showPage('stage.html');
    var thestage =  d3.select("body").select("svg");
    var display, successes, failures, stim, currentSpecies, stimOn, scoreKeeper, bottomMessage;
    var initializeGame = function(){
        thestage.attr("height", "650");

        display = new TallyDisplay(thestage, [observed], stimuli.length);
        display.init(true);
        display.update(500);
        display.getAll().attr("transform", "translate(750, -130)")
          .transition()
            .duration(1500)
            .attr("transform", "translate(0, -130)");

        successes = 0;
        failures = 0;
        scoreKeeper = new Score(thestage, startingBonus, 10, 40);
        scoreKeeper.lowlight()
        mushroomsRemainingText = thestage.append("text")
            .attr("x", 100)
            .attr("y", 20)
            .style("font", "bold 28px monospace")

        nonMushroomVisuals = thestage.insert("g")
            .attr("transform", "translate(0, 450)");
        controls = new Controls(responseHandler, nonMushroomVisuals, 0, 0);


        statusVisuals = nonMushroomVisuals.insert("g")

        //magic from Mike Bostock to add score to this group after it exits
        statusVisuals.select(function(){ return this.appendChild(document.getElementById("scoreDisplay"));});

        bottomMessage = d3.select(".belowStage")
          .insert("p")
        .style("text-align", "center");

        next();
    }

    var next = function() {
        var nLeft = stimuli.length;
        if(nLeft===1){
            mushroomsRemainingText.text("Last mushroom in this patch!")
        } else if(nLeft > 1){
            mushroomsRemainingText.text(""+nLeft+" mushrooms remaining in this patch")
        }
        if(nLeft === 0){
            mushroomsRemainingText.text("");
            setTimeout(function(){finish()}, 500);
        }
        else{
            stim = stimuli.shift();
            showStim();
        }
    }

    var showStim = function() {
        stimOn = new Date().getTime();
        controls.setButtonState("on");
        bottomMessage.html("Click either 'eat' or 'avoid'.");
    }

    var responseHandler = function(approached) {
        //Useful note - stim has these fields: mode, trial, cat, value, apPayoff, avPayoff
        var rt = new Date().getTime() - stimOn;
        controls.setButtonState("dim");
        var successesBefore = successes;
        var failuresBefore = failures;
        var scoreBefore = scoreKeeper.get();
        var scoreChangeString = "";
        var color;
        if(approached){
            if(stim.apPayoff < 0){
                scoreChangeString += "-";
            }
            scoreChangeString += "$" + Math.abs(stim.apPayoff.toFixed(2));
            observed.hist[stim.blockTrial-1].outcome = stim.value + 1
            if(stim.value){
                successes++;
                color = goodColor;
                scoreKeeper.update(stim.apPayoff, color);

            }
            else{
                failures++;
                color = badColor
                scoreKeeper.update(stim.apPayoff, color);
            }
        }else{
            if(stim.avPayoff < 0){
                scoreChangeString += "-";
            }
            scoreChangeString += "$" + Math.abs(stim.avPayoff.toFixed(2));
            observed.hist[stim.blockTrial-1].outcome=0

            color = avoidColor;
            scoreKeeper.update(stim.avPayoff, color);
        }
        display.update(500, scoreChangeString, color);
        psiTurk.recordTrialData({'phase': 'apavPhase',
                                 'patchNum': stim.patchNum,
                                 'globalTrial': stim.globalTrial,
                                 'blockTrial': stim.blockTrial,
                                 'blockTrialsLeft': stim.blockTrialsLeft,
                                 'patchLength': stim.patchLength,
                                 'species': currentSpecies._name,
                                 'value': stim.value,
                                 'probGood': stim.probGood,
                                 'response': approached,
                                 'successes': successesBefore,
                                 'failures': failuresBefore,
                                 'score': scoreBefore.toFixed(2),
                                 'scoreAfter': scoreKeeper.get().toFixed(2),
                                 'successesAfter': successes,
                                 'failuresAfter': failures,
                                 'rt': rt});

        next();
    }

    var finish = function() {
        display.getAll().transition()
            .duration(1500)
            .attr("transform", "translate(-1000, -130)")
        startingBonus = scoreKeeper.get()
        scoreKeeper.highlight();
        d3.select(".belowStage").select("p").html('<b>Click "Continue" to move on to the next mushroom patch</b> <br\><br\>')
            .append("input")
            .attr("type", "button")
            .attr("value", "Continue")
            .attr("id", "continue")
            .attr("class", "btn btn-warning btn-lg")
            .style("text-align", "center")
            .on("click", function() {
                complete_fn();
            });
    }
    initializeGame();
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
        psiTurk.completeHIT();
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
        psiTurk.saveData({
            success: function(){
                psiTurk.computeBonus('compute_bonus', function(){finish()});
            },
            error: prompt_resubmit}
                        );
    });
};


var HabitatPlanner = function(){
    var healthGain = 0.02;
    var poisonCost = -0.02;
    var avoidCost = 0;
    var numPatches = 24;
    var habitatLengths = [1, 2, 4, 8, 16, 32, 1, 2, 4, 8, 16, 32, 1, 2, 4, 8, 16, 32, 1, 2, 4, 8, 16, 32];
    var blockLength = 6;
    var rewardProbabilities = []
    for(var i = 0; i< 3; i++){
        rewardProbabilities = rewardProbabilities.concat([0.125, 0.375, 0.625, 0.875, 0.375, 0.125, 0.875, 0.625]);
    }
    var shuffledMushrooms = _.shuffle(mushrooms);
    var self = this;
    //specification of the experiment parameters to be passed to python stim generator
    var specification = {counterbalance: counterbalance,
                         num_patches: numPatches,
                         habitat_lengths: habitatLengths,
                         reward_probs: rewardProbabilities,
                         health_gain: healthGain,
                         poison_cost: poisonCost,
                         avoid_cost: avoidCost,
                         block_length: blockLength}
    //variable to hold all stimuli
    var blocks
    //send specification, get back stimuli and start experiment
    $.ajax({
        dataType: "json",
        url: "/get_stims",
        data: specification,
        success: function(data){
            blocks = data.results;
            self.runNext();
        }
    });



    this.transitionToNext = function(){
        psiTurk.showPage('transition.html');
        setTimeout(function(){self.runNext();}, 2000);
    }


    this.runNext = function(){
        var apAvCompleteFn;
        if(blocks.length==1){
            apAvCompleteFn = function() { currentview = new Questionnaire(); };
        } else{
            apAvCompleteFn = function() { self.runNext(); };
        }
        var stimuli = blocks.shift();
        currentview = new DecidePhase(shuffledMushrooms.shift(), stimuli, apAvCompleteFn);
    }
}

var startingBonus = 0.25
/*******************
 * Run Task
 ******************/
$(window).load( function(){
    psiTurk.doInstructions(
        instructionpages,
        function () {quiz(function(){currentview = new HabitatPlanner()})});
});

// vi: noexpandtab tabstop=4 shiftwidth=4
