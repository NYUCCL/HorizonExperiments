/*global $, window, d3, _, console, PsiTurk, uniqueId, adServerLoc, mode, condition, counterbalance, setTimeout*/

var psiTurk = PsiTurk(uniqueId, adServerLoc, mode);


var skipInstructions = false;
var instructionpages;
var pages = [
    "quiz.html",
    "restart.html",
    "instruct1.html",
    "instruct2.html",
    "instruct2-fullinfo.html",
    "instruct3.html",
    "stage.html",
    "postquestionnaire.html"
];

psiTurk.preloadPages(pages);

if (condition === "1") {
    instructionpages = [
        "instruct1.html",
        "instruct2-fullinfo.html",
        "instruct3.html"
    ];
} else {
    instructionpages = [
        "instruct1.html",
        "instruct2.html",
        "instruct3.html"
    ];
}

//parameters for representing mushroom outcomes
var badColor = "rgb(255,0,0)";
var goodColor = "rgb(0,255,0)";
var avoidColor = "rgb(128,128,128)";
var avoidBadColor = "rgb(178,88,88)";
var avoidGoodColor = "rgb(88,178,88)";
var colors = [avoidColor, avoidBadColor, badColor, avoidGoodColor, goodColor, "white"];
var symbolTypes = [0, 4, 4, 5, 5, 0];
var symbolSizes = [286, 208, 208, 208, 208, 286];
var foci = [{x:350, y:225}, {x:350, y:275}, {x:350, y:375}, {x:350, y:175}, {x:350, y:75}, {x:580, y:225}];

var startingbonus = 0.25;
// money per point
var mpp = 0.02;


var listening, currentview;


var mushrooms = [
    {   image: 'mushroom-species_01.png',
        id: 'm1',
        _width: 96,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "A. capestris"
    },
    {   image: 'mushroom-species_02.png',
        id: 'm2',
        _width: 107,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "A. ponderosa"
    },
    {   image: 'mushroom-species_03.png',
        id: 'm3',
        _width: 89,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "L. fragilis"
    },
    {   image: 'mushroom-species_04.png',
        id: 'm4',
        _width: 84,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "L. manzanitae"
    },
    {   image: 'mushroom-species_05.png',
        id: 'm5',
        _width: 99,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "L. molybdites"
    },
    {   image: 'mushroom-species_06.png',
        id: 'm6',
        _width: 102,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "T. magnivelare"
    },
    {   image: 'mushroom-species_07.png',
        id: 'm7',
        _width: 101,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "P. aurivella"
    },
    {   image: 'mushroom-species_08.png',
        id: 'm8',
        _width: 98,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "M. conica"
    },
    {   image: 'mushroom-species_09.png',
        id: 'm9',
        _width: 76,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "L. rhacodes"
    },
    {
        image: 'mushroom-species_10.png',
        id: 'm10',
        _width: 108,
        _height: 139,
        _x: 0,
        _y: 0,
        //possibly made up name
        _name: "C. cibarius"
    },
    {
        image: 'mushroom-species_11.png',
        id: 'm11',
        _width: 90,
        _height: 140,
        _x: 0,
        _y: 0,
        //possibly made up name
        _name: "C. cornucopioides"
    },
    {
        image: 'mushroom-species_12.png',
        id: 'm12',
        _width: 93,
        _height: 117,
        _x: 0,
        _y: 0,
        _name: "H. psittacinus"
    },
    {
        image: 'mushroom-species_13.png',
        id: 'm13',
        _width: 104,
        _height: 159,
        _x: 0,
        _y: 0,
        _name: "A. virosa"
    },
    {
        image: 'mushroom-species_14.png',
        id: 'm14',
        _width: 103,
        _height: 141,
        _x: 0,
        _y: 0,
        _name: "C. praestans"
    },
    {
        image: 'mushroom-species_15.png',
        id: 'm15',
        _width: 94,
        _height: 123,
        _x: 0,
        _y: 0,
        _name: "B. satanas"
    },
    {
        image: 'mushroom-species_16.png',
        id: 'm16',
        _width: 102,
        _height: 154,
        _x: 0,
        _y: 0,
        _name: "L. procera"
    },
    {
        image: 'mushroom-species_17.png',
        id: 'm17',
        _width: 100,
        _height: 118,
        _x: 0,
        _y: 0,
        _name: "P. ostraetus"
    },
    {
        image: 'mushroom-species_18.png',
        id: 'm18',
        _width: 96,
        _height: 114,
        _x: 0,
        _y: 0,
        _name: "A. angerita"
    },
    {
        image: 'mushroom-species_19.png',
        id: 'm19',
        _width: 97,
        _height: 141,
        _x: 0,
        _y: 0,
        _name: "L. deliciosus"

    },
    {
        image: 'mushroom-species_20.png',
        id: 'm20',
        _width: 103,
        _height: 129,
        _x: 0,
        _y: 0,
        _name: "E. clypeatum"
    },
    {
        image: 'mushroom-species_21.png',
        id: 'm21',
        _width: 98,
        _height: 130,
        _x: 0,
        _y: 0,
        _name: "C. nebularis"
    },
    {
        image: 'mushroom-species_22.png',
        id: 'm22',
        _width: 98,
        _height: 148,
        _x: 0,
        _y: 0,
        _name: "P. arvensis"
    },
    {
        image: 'mushroom-species_23.png',
        id: 'm23',
        _width: 102,
        _height: 146,
        _x: 0,
        _y: 0,
        _name: "V. volvacea"
    },
    {
        image: 'mushroom-species_24.png',
        id: 'm24',
        _width: 104,
        _height: 130,
        _x: 0,
        _y: 0,
        _name: "R. nudus"
    }
];


/*************************
* INSTRUCTIONS
*************************/
var loop = 1;
var quiz = function(complete_fn) {
    function record_responses() {
        var allRight = true;
        $('select').each( function(i, val) {
            psiTurk.recordTrialData({'phase':"INSTRUCTQUIZ", 'question':this.id, 'answer':this.value});
            if(this.id==='healthyPoisonous' && this.value !== 'sometimes'){
                allRight = false;
            }else if(this.id==='poison' && this.value !== 'red'){
                allRight = false;
            }else if(this.id==='health' && this.value !== 'green'){
                allRight = false;
            }else if(this.id==='typeProp' && this.value !== 'equal'){
                allRight = false;
            }else if(this.id==='avoidInfo' && condition === "0" && this.value !== 'noInfo'){
                allRight = false;
            }else if(this.id==='avoidInfo' && condition === "1" && this.value !== 'healthInfo'){
                allRight = false;
            }else if(this.id==='frequency' && this.value !== 'unequal'){
                allRight = false;
            }
        });
        return allRight
    };

    psiTurk.showPage('quiz.html');
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
                    function () {
                        quiz(function(){
                            currentview = new HabitatPlanner();
                        });
                    });
            });
        }
    });
};

/******************************
* TallyDisplay
******************************/
// this is the main display object that makes all the mushrooms and observations
// appear on the screen
var TallyDisplay = function(thestage, observed, encounteredObserved, numTrials) {
    var svg = thestage.append("g");
    // all mushrooms, even those still not yet encountered
    var data = observed;
    // just the mushrooms that have already been decided on. this will grow as
    // the user clicks through. Helps to keep track of this for making the
    // outcome text pop up
    var encounteredData = encounteredObserved;
    var force;
    var nodeSymbols;
    var labels;
    var categories;
    var nodes;
    var observationMade;

    /* intialize */
    this.init = function () {

        // put lines and labels on the screen as
        // visual reminders of what each type of dot is
        if (condition === "1") {
            svg.append("text")
                .text("eaten good")
                .attr("class", "legend")
                .attr("x", "150")
                .attr("y", "75");
            svg.append("svg:path")
                .attr("d", "M150 125 L400 125")
                .style("stroke-dasharray", "10,10")
                .style("stoke-width", 2)
                .style("stroke", "black");
            svg.append("text")
                .text("tested good")
                .attr("class", "legend")
                .attr("x", "150")
                .attr("y", "175");
            svg.append("svg:path")
                .attr("d", "M150 225 L400 225")
                .style("stroke-dasharray", "10,10")
                .style("stoke-width", 2)
                .style("stroke", "black");
            svg.append("text")
                .text("tested bad")
                .attr("class", "legend")
                .attr("x", "150")
                .attr("y", "275");
            svg.append("svg:path")
                .attr("d", "M150 325 L400 325")
                .style("stroke-dasharray", "10,10")
                .style("stoke-width", 2)
                .style("stroke", "black");
            svg.append("text")
                .text("eaten bad")
                .attr("class", "legend")
                .attr("x", "150")
                .attr("y", "375");
        } else {
            svg.append("text")
                .text("eaten good")
                .attr("class", "legend")
                .attr("x", "150")
                .attr("y", "75");
            svg.append("svg:path")
                .attr("d", "M150 150 L400 150")
                .style("stroke-dasharray", "10,10")
                .style("stoke-width", 2)
                .style("stroke", "black");
            svg.append("text")
                .text("not eaten")
                .attr("class", "legend")
                .attr("x", "150")
                .attr("y", "225");
            svg.append("svg:path")
                .attr("d", "M150 300 L400 300")
                .style("stroke-dasharray", "10,10")
                .style("stoke-width", 2)
                .style("stroke", "black");
            svg.append("text")
                .text("eaten bad")
                .attr("class", "legend")
                .attr("x", "150")
                .attr("y", "375");
        }
        svg.append("text")
            .text("not yet encountered")
            .attr("class", "legend")
            .attr("x", 520)
            .attr("y", 120);

        svg.append("text")
            .text("Species can be")
            .attr("class", "legend")
            .attr("x", 520)
            .attr("y", 340);
        svg.append("text")
            .text("2/3 healthy or")
            .attr("class", "legend")
            .attr("x", 520)
            .attr("y", 355);
        svg.append("text")
            .text("2/3 poisonous")
            .attr("class", "legend")
            .attr("x", 520)
            .attr("y", 370);

        //svg group for mushroom symbol and observations
        categories = svg.selectAll(".cat")
            .data([data.species])
            .enter()
            .append("g")
            .attr("id", function(d) { return d.id })
                .attr("class", "cat");

        // append bucket to hold the circles
        categories.append("g")
                  .attr("class", "bucket");

        // append icon
        categories.append("g")
            .attr("class", "icon")
          .append("image") // append image
            .attr("xlink:href", function(d) { return '/static/images/' + d.image; })
            .attr("y", 120)
            .attr("width", function(d) { return d._width; })
            .attr("height", function(d) { return d._height; })

        // append species label?
        categories.append("text")
            .attr("class","speciesname")
            .attr("x", function(d) { return d._width/2.0-30; })
            .attr("y", 285)
            .attr("fill", "black")
            .text(function(d) { return d._name});

        // create force layout to manage position of observations. This will
        // change around the x/y coordinates on each "tick" to move the
        // observations around towards their respective foci
        nodes = data.hist;
        force = d3.layout.force()
            .nodes(nodes)
            .links([])
            .gravity(0)
            .charge(-12)
            .size([500, 500])
            .on("tick", tick);

        nodeSymbols = categories.selectAll(".node");
        labels = categories.selectAll(".label");

        function tick(e){
            var k = 0.05 * e.alpha;
            // Push nodes toward their designated focus.
            nodes.forEach(function(o, i) {
                o.y += (foci[o.outcome].y - o.y) * k;
                o.x += (foci[o.outcome].x - o.x) * k;
            });
            // move the actual symbols on the screen
            nodeSymbols.attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
            // move the labels for gain/loss - should only be
            // for outcomes that just happened
            labels.attr("x", function (d) {return  "" + (d.x + 10)});
            labels.attr("y", function (d) {return "" + d.y});
        };

        nodeSymbols = nodeSymbols.data(nodes);
        force.start();
        nodeSymbols.enter().append("path")
            .attr("class", "node")
            .attr("d", d3.svg.symbol()
                  .type( function (d) {
                      return d3.svg.symbolTypes[symbolTypes[d.outcome]];
                  })
                  .size (function (d)
                         {
                             return symbolSizes[d.outcome];
                         }))
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .style("fill", function(d){ return colors[d.outcome];})
            .style("stroke", "black")
            .style("stroke-width", 1);
    };


    this.getAll = function(){
        return svg;
    };

    /* update the display */
    //updates UI following addition of new trial data
    this.update = function(scoreChangeString) {
        force.start();
        labels = labels.data(encounteredData);
        //add label for money gained from new outcome
        labels.enter().append("text").text(scoreChangeString).attr("class", "label")
            .attr("x", function(d) {return "" + d.x})
            .attr("y", function(d) {return "" + d.y})
            .style("fill", function(d){
                return colors[d.outcome];
            })
            .attr("opacity", 1)
            .style("font", "bold 24px monospace")
            .transition()
            .delay(750)
            .duration(750)
            .attr("opacity", 0)
            .remove();
        nodeSymbols.attr("d", d3.svg.symbol()
                  .type( function (d) {
                      return d3.svg.symbolTypes[symbolTypes[d.outcome]];
                  })
                  .size( function (d)
                         {
                             return symbolSizes[d.outcome];
                         }))
            .style("fill", function(d){ return colors[d.outcome]; });
    };
};


/******************************
* Score
******************************/
// keep track of and display current score
var Score = function(stage, start, x, y){
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
        .text("$" + start.toFixed(2))
        .attr("x", 32)
        .attr("y", 102)
        .style("fill", "black")
        .style("font", "bold 68px monospace");
    this.update = function(score){
        scoreText.text("$" + score.toFixed(2))
    };
};

/*******************************
* Controls (eat/avoid buttons)
*******************************/
var Controls = function(responseFn, stage, x, y){
    var svg = stage;
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

    var avoidPic;

    var avoidGroup = svg.insert("g")
        .attr("transform", "translate(550, 30)")
    if (condition === "1"){
        avoidPic = avoidGroup.insert("image")
            .attr("class", "choiceButton")
            .attr("xlink:href", "static/images/avoidtestsign.png")
            .attr("x", -5)
            .attr("y", 25)
            .attr("width", 177)
            .attr("height", 100)
            .style("opacity", 0.5);
    } else {
        avoidPic = avoidGroup.insert("image")
            .attr("class", "choiceButton")
            .attr("xlink:href", "static/images/avoidsign.png")
            .attr("x", 10)
            .attr("y", 10)
            .attr("width", 100)
            .attr("height", 132)
            .style("opacity", 0.5);
    }
    avoidGroup.append("text")
        .style("font", "bold 18px monospace")
        .attr("x", 15)
        .attr("y", 150)
        .attr("fill", "black")
        .text("don't eat");

    //variables to keep track of where the mouse is so opacity updating can happen
    //properly even when the mouseover and mousout functions change.
    var eatIn = false;
    var avoidIn = false;
    this.setButtonState = function(state){
        if(state === "off"){
            approachGroup.style("visibility", "hidden");
            avoidGroup.style("visibility", "hidden");
            approachPic.on("mouseover", function(){eatIn = true; })
                .on("mouseout", function(){eatIn = false; })
                .on("click", function(){});
            avoidPic.on("mouseover", function(){avoidIn = true; })
                .on("mouseout", function(){avoidIn = false; })
                .on("click", function(){});

        }else if(state === "on"){
            approachGroup.style("visibility", "visible");
            avoidGroup.style("visibility", "visible");
            approachPic.on("click", function(){responseFn(1); })
                .on("mouseover", function(){d3.select(this).style("opacity", 1); eatIn = true; })
                .on("mouseout", function(){d3.select(this).style("opacity", 0.5); eatIn = false; });

            avoidPic.on("click", function(){responseFn(0); })
                .on("mouseover", function(){d3.select(this).style("opacity", 1); avoidIn = true; })
                .on("mouseout", function(){d3.select(this).style("opacity", 0.5); avoidIn = false; });

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
        }else if(state === "dim"){
            approachGroup.style("visibility", "visible");
            approachPic.style("opacity", 0.5);
            avoidGroup.style("visibility", "visible");
            avoidPic.style("opacity", 0.5);
            approachPic.on("mouseover", function(){eatIn = true; })
                .on("mouseout", function(){eatIn = false; })
                .on("click", function(){});
            avoidPic.on("mouseover", function(){avoidIn = true; })
                .on("mouseout", function(){avoidIn = false; })
                .on("click", function(){});
        }
    };
};

/**********************************
* Decision (Approach Avoid) Phase *
**********************************/
var DecidePhase = function(species, stimuli, startingScore, complete_fn) {
    var currentSpecies = species;
    var observed = {species: species, hist: []};
    var encounteredObserved = [];
    //fill observed with not-yet-eaten mushrooms
    for(var i=1; i<=stimuli.length; i++){
        //5 is code for not-encountered-yet
        observed.hist.push({trial: i, outcome: 5})
    }
    psiTurk.showPage('stage.html');
    var thestage =  d3.select("body").select("svg");
    var display, successes, failures, totalGoods, totalBads, stim, stimOn, scoreKeeper, bottomMessage, mushroomsRemainingText, nonMushroomVisuals, controls, statusVisuals;
    var score = startingScore;
    var next = function() {
        var nLeft = stimuli.length;
        if(nLeft === 1){
            mushroomsRemainingText.html("Last mushroom in this patch!");
        } else if(nLeft > 1){
            mushroomsRemainingText.html("" + nLeft + " mushrooms remaining in this patch");
        }
        if(nLeft === 0){
            mushroomsRemainingText.html("Moving to next patch...");
            setTimeout(function(){finish(); }, 500);
        }
        else{
            stim = stimuli.shift();
            showStim();
        }
    };

    var showStim = function() {
        stimOn = new Date().getTime();
        controls.setButtonState("on");
        bottomMessage.html("Click either \"eat\" or \"don't eat\".");
    };

    var responseHandler = function(approached) {
        //Useful note - stim has these fields: mode, trial, cat, value, apPayoff, avPayoff
        var rt = new Date().getTime() - stimOn;
        controls.setButtonState("dim");
        var successesBefore = successes;
        var failuresBefore = failures;
        var totalGoodsBefore = totalGoods;
        var totalBadsBefore = totalBads;
        var scoreBefore = score;
        var scoreChangeString = "";
        if (stim.value) {
            totalGoods += 1;
        } else {
            totalBads += 1;
        }
        if(approached){
            if(stim.apPayoff < 0){
                scoreChangeString += "-";
            }
            scoreChangeString += "$" + Math.abs((stim.apPayoff * mpp).toFixed(2));
            score = score + stim.apPayoff;
            observed.hist[stim.catTrial - 1].outcome = 2 + 2 * stim.value;
            if(stim.value){
                successes++;
            }
            else{
                failures++;
            }
        }else{
            if(stim.avPayoff < 0){
                scoreChangeString += "-";
            }
            scoreChangeString += "$" + Math.abs((stim.avPayoff * mpp).toFixed(2));
            score = score + stim.avPayoff;
            if (condition === "0"){
                observed.hist[stim.catTrial - 1].outcome = 0;
            }
            else {
                observed.hist[stim.catTrial - 1].outcome = 1 + 2 * stim.value;
            }

        }
        scoreKeeper.update(score * mpp + startingbonus);
        encounteredObserved.push(observed.hist[stim.catTrial - 1]);
        display.update(scoreChangeString);
        psiTurk.recordTrialData({'phase': 'apav',
                                 'condition': condition,
                                 'patchNum': stim.patchNum,
                                 'globalTrial': stim.globalTrial,
                                 'catTrial': stim.catTrial,
                                 'catTrialsLeft': stim.catTrialsLeft,
                                 'patchLength': stim.patchLength,
                                 'species': currentSpecies._name,
                                 'value': stim.value,
                                 'probGood': stim.probGood,
                                 'response': approached,
                                 'apPayoff': stim.apPayoff,
                                 'avPayoff': stim.avPayoff,
                                 'successes': successesBefore,
                                 'failures': failuresBefore,
                                 'goods': totalGoodsBefore,
                                 'bads': totalBadsBefore,
                                 'score': scoreBefore,
                                 'scoreAfter': score,
                                 'successesAfter': successes,
                                 'failuresAfter': failures,
                                 'goodsAfter': totalGoods,
                                 'badsAfter': totalBads,
                                 'rt': rt});

        setTimeout(next, 700);
    };

    var initializeGame = function(){
        thestage.attr("height", "650");

        display = new TallyDisplay(thestage, observed, encounteredObserved, stimuli.length);
        display.init();
        //have display zoom in from the right
        display.getAll().attr("transform", "translate(850, 0)")
          .transition()
            .duration(1500)
            .attr("transform", "translate(100, 0)");

        successes = 0;
        failures = 0;
        totalGoods = 0;
        totalBads = 0;
        scoreKeeper = new Score(thestage, score * mpp + startingbonus, 10, 40);
        mushroomsRemainingText = d3.select(".aboveStage").append("h1");

        nonMushroomVisuals = thestage.insert("g")
            .attr("transform", "translate(0, 450)");
        controls = new Controls(responseHandler, nonMushroomVisuals, 0, 0);


        statusVisuals = nonMushroomVisuals.insert("g");

        //magic from Mike Bostock to add score to this group after it exits
        statusVisuals.select(function(){ return this.appendChild(document.getElementById("scoreDisplay"));});

        bottomMessage = d3.select(".belowStage")
          .insert("p")
        .style("text-align", "center");

        next();
    }

    var finish = function() {
        display.getAll().transition()
            .duration(1500)
            .attr("transform", "translate(-900, 0)")
        d3.select(".belowStage").select("p").html('<b>Click "Continue" to move on to the next mushroom patch</b> <br\><br\>')
            .append("input")
            .attr("type", "button")
            .attr("value", "Continue")
            .attr("id", "continue")
            .attr("class", "btn btn-warning btn-lg")
            .style("text-align", "center")
            .on("click", function() {
                complete_fn(score);
            });
    };
    initializeGame();
};





/****************
 * Questionnaire *
****************/
var Questionnaire = function(lastScore) {
    var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

    psiTurk.recordUnstructuredData("finalBonus", lastScore * mpp + startingbonus);
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
    var shuffledMushrooms = _.shuffle(mushrooms);
    var self = this;
    //variable to hold all stimuli
    var blocks;
    //get stimuli and start experiment
    $.ajax({
        dataType: "json",
        url: "/get_stims",
        success: function(data){
            blocks = data.results;
            self.runNext(0);
        }
    });



    this.transitionToNext = function(){
        psiTurk.showPage('transition.html');
        setTimeout(function(){self.runNext(); }, 2000);
    };


    this.runNext = function(lastScore){
        var apAvCompleteFn;
        if(blocks.length === 1){
            apAvCompleteFn = function(score) { currentview = new Questionnaire(score); };
        } else{
            apAvCompleteFn = function(score) { self.runNext(score); };
        }
        var stimuli = blocks.shift();
        currentview = new DecidePhase(shuffledMushrooms.shift(), stimuli, lastScore, apAvCompleteFn);
    };
};

/*******************
 * Run Task
 ******************/
$(window).load( function(){
    if (skipInstructions) {
        currentview = new HabitatPlanner();
    } else {
        psiTurk.doInstructions(
            instructionpages,
            function () {quiz(function () {currentview = new HabitatPlanner(); }); });
    }
});

// vi: noexpandtab tabstop=4 shiftwidth=4
