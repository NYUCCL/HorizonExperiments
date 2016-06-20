/*global $, jQuery, d3, _, console, PsiTurk, uniqueId, adServerLoc, mode, condition, counterbalance, setTimeout*/

var psiTurk = PsiTurk(uniqueId, adServerLoc, mode);
var skipInstructions = false;
var instructionpages;

var pages = [
    "quiz.html",
    "restart.html",
    "instruct1.html",
    "instruct2.html",
    "instruct3.html",
    "instruct3-fullinfo.html",
    "instruct4.html",
    "instruct4-fullinfo.html",
    "instruct5.html",
    "instruct6.html",
    "stage.html",
    "postquestionnaire.html",
    "transition.html"
];

psiTurk.preloadPages(pages);

if (condition === "1") {
    instructionpages = [
        "instruct1.html",
        "instruct2.html",
        "instruct3-fullinfo.html",
        "instruct4-fullinfo.html",
        "instruct5.html",
        "instruct6.html",
    ];
} else {
    instructionpages = [
        "instruct1.html",
        "instruct2.html",
        "instruct3.html",
        "instruct4.html",
        "instruct5.html",
        "instruct6.html"
    ];
}

//parameters for representing mushroom outcomes
var badColor = "rgb(255,0,0)";
var goodColor = "rgb(0,255,0)";
var avoidColor = "rgb(128,128,128)";
var avoidBadColor = "rgb(178,88,88)";
var avoidGoodColor = "rgb(98,168,98)";
var colors = [avoidColor, avoidBadColor, badColor, avoidGoodColor, goodColor, "white"];
var symbolTypes = [0, 4, 4, 5, 5, 0];
var symbolSizes = [286, 208, 208, 208, 208, 286];
var foci = [{x:450, y:225}, {x:450, y:275}, {x:450, y:375}, {x:450, y:175}, {x:450, y:75}, {x:50, y:300}];

var listening, currentview;

var startingbonus = 0.25;
// money per point
var mpp = .02;

var habitats = [
    {   image: 'arctictundra.jpg',
        id: "h1",
        _width: 600,
        _height: 400,
        _x: 0,
        _y: 0,
        _name: "Arctic Tundra",
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
];


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
    },
];

var InitializeObserved = function(speciesList){
    var newObserved = [];
    for(var i=0;i< speciesList.length;i++){
        newObserved.push({cat: i, species: speciesList[i], hist: []});
        speciesList[i].id="m" + i;
    }
    //counterbalance observed so location of mushrooms are counterbalanced
    return _.shuffle(newObserved);
};


//returns the data structure corresponding to the given stimulus species
function getCurrentCat(observed, species) {
    var currentCatArray = $.grep(observed, function(e){
        return e.species._name === species._name;
    });
    if(currentCatArray.length==0){
        return null;
    } else{
        return currentCatArray[0];
    }
}


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
		}else if(condition === "0" && this.id==='avoidInfo' && this.value !='noInfo'){
		    allRight = false;
		}else if(condition === "1" && this.id==='avoidInfo' && this.value !='healthInfo'){
		    allRight = false;
		}else if(this.id==='habitatlength' && this.value !='variable'){
		    allRight = false;
		}
	    });
	    return allRight;
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
            $('.continue').click(function () {
                psiTurk.doInstructions(
                    instructionpages,
                    function () {
                        quiz(function () {
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
var TallyDisplay = function(thestage, observed, previouslyobserved) {
    var svg = thestage.append("g");
    // in decision phase, this holds observations from first phase. They're left
    // in the same relative x/y values as when the observation phase ended, and
    // used to make the little representations of previously observed mushrooms
    var olddata = previouslyobserved;
    // observed mushrooms for each species
    var data = observed;
    var force;
    var nodeSymbols;
    var nodes;
    var spinner;
    /* intialize */
    this.init = function (decisionPhase) {
        //species positioning, x value for observation phase, y value for
        //decision-making phase
        for(var i=0; i<data.length; i++) {
            data[i].species._x = i * 150 + 50;
        }

        for(var i=0; i<data.length; i++) {
            data[i].species._y = i * 125 + 17;
        }


        if (!decisionPhase) {
            //svg groups for the categories
            var categories = svg.selectAll(".cat")
                    .data(data)
                    .enter()
                    .append("g")
                    .attr("id", function(d) { return d.species.id })
                    .attr("class", "cat");
            categories.attr("transform", function(d) { return "translate(" + d.species._x + "," + 0 + ")";});
            // append space to hold the nodes
            categories.append("g")
                .attr("class", "nodespace")
                .attr("transform", "translate(0, -170)");

            // append species icon
            categories.append("g")
                .attr("class", "icon")
                .append("image") // append image
                .attr("xlink:href", function(d) { return '/static/images/' + d.species.image; })
                .attr("y", 250)
                .attr("x", 10)
                .attr("width", function(d) { return d.species._width; })
                .attr("height", function(d) { return d.species._height; });
            categories.select(".icon")
                .append("text")
                .attr("class","speciesname")
                .attr("x", function(d) { return d.species._width/2.0-30; })
                .attr("y", 450-35)
                .attr("fill", "black")
                .text(function(d) { return d.species._name});

            svg.append("image")
                .attr("xlink:href", '/static/images/moredot_morecommon.png')
                .attr("y", 150)
                .attr("x", 690)
                .attr("width", 112)
                .attr("height", 188);
        } else {
            //svg groups for the categories
            var categories = svg.selectAll(".cat")
                    .data(olddata)
                    .enter()
                    .append("g")
                    .attr("id", function(d) { return d.species.id })
                    .attr("class", "cat");

            //spinner to spin after each encounter and decide whether to leave
            //the environment
            spinner = svg.append("g")
                .attr("transform", "translate(710, 85) scale(0.7)");
            spinner.append("svg:image")
                .attr("xlink:href", '/static/images/spinner.svg')
                .attr("x", -60)
                .attr("y", -60)
                .attr("width", 120)
                .attr("height", 120);
            svg.append("text")
                .text("leave habitat?")
                .style("font", "15px monospace")
                .attr("x", 650)
                .attr("y", 15)
            svg.append("svg:path")
                .attr("d", "M0,0L20,0L10,15Z")
                .attr("fill", "black")
                .attr("stroke", "black")
                .attr("stroke-width", 4)
                .attr("transform", "translate(699, 25)");

            // append species icon
            categories.append("g")
                .attr("transform", function(d) { return "translate(" + 0 + "," + d.species._y + ")";})
                .attr("class", "icon");
            categories.select(".icon")
                .append("rect")
                .attr("width", 250)
                .attr("height", 120)
                .style("fill", "lightgray")
                .style("stroke-width", 0);
            categories.select(".icon")
                .append("image") // append image
                .attr("xlink:href", function(d) { return '/static/images/' + d.species.image; })
                .attr("x", 10)
                .attr("width", function(d) { return d.species._width * .7; })
                .attr("height", function(d) { return d.species._height * .7; });
            categories.select(".icon")
                .append("text")
                .attr("class","speciesname")
                .attr("x", function(d) { return d.species._width/2.0-30; })
                .attr("y", 115)
                .attr("fill", "black")
                .text(function(d) { return d.species._name; });
            categories.select(".icon")
                .append("g")
                .attr("class", "previous");
            // add old observation data, shrunk down and not in a force layout
            // any more
            svg.selectAll(".previous").data(olddata)
                .selectAll("g").data(function(d,i){return d.hist; })
                .enter()
                .append("g")
                .attr("transform", function(d) {
                    return "scale(0.6) translate(" + (d.x + 250)+ "," + (d.y - 2000*d.cat - 200) + ")";
                })
                .append("path")
                .attr("d", d3.svg.symbol()
                      .type( function(d) {
                          return d3.svg.symbolTypes[symbolTypes[d.outcome]];
                      })
                      .size( function (d) {
                          return symbolSizes[d.outcome];
                      })
                     )
                .style("fill", function(d){
                    return colors[d.outcome];
                })
                .style("stroke-width", 1)
                .style("stroke", "black");

            //gray shape that expands out when a mushroom is active, along with
            //the lines and text labeling the outcome types
            var expander = categories.append("g")
                    .attr("class", "expander")
                    .attr("opacity", 0);
            expander.append("path")
                .attr("d", function(d) {
                    return "M 250 " + d.species._y + " L350 17 L350 500 L250 " + (d.species._y + 120) + "Z";
                })
                .attr("fill", "lightgray")
                .attr("stroke-width", 1)
                .attr("stroke", "lightgray");
            expander.append("path")
                .attr("d", function(d) {
                    return "M 350 17 L630 17 L630 500 L350 500 Z";
                })
                .attr("fill", "lightgray")
                .attr("stroke-width", 1)
                .attr("stroke", "lightgray");


            //visual reminders of what each type of dot is
            if(condition === "1"){
                expander.append("text")
                    .text("eaten good")
                    .attr("class", "legend")
                    .attr("x", "550")
                    .attr("y", "75");
                expander.append("svg:path")
                    .attr("d", "M360 125 L600 125")
                    .style("stroke-dasharray", "10,10")
                    .style("stoke-width", 2)
                    .style("stroke", "black");
                expander.append("text")
                    .text("tested good")
                    .attr("class", "legend")
                    .attr("x", "550")
                    .attr("y", "175");
                expander.append("svg:path")
                    .attr("d", "M360 225 L600 225")
                    .style("stroke-dasharray", "10,10")
                    .style("stoke-width", 2)
                    .style("stroke", "black");
                expander.append("text")
                    .text("tested bad")
                    .attr("class", "legend")
                    .attr("x", "550")
                    .attr("y", "275");
                expander.append("svg:path")
                    .attr("d", "M360 325 L600 325")
                    .style("stroke-dasharray", "10,10")
                    .style("stoke-width", 2)
                    .style("stroke", "black");
                expander.append("text")
                    .text("eaten bad")
                    .attr("class", "legend")
                    .attr("x", "550")
                    .attr("y", "375");
            } else {
                expander.append("text")
                    .text("eaten good")
                    .attr("class", "legend")
                    .attr("x", "550")
                    .attr("y", "75");
                expander.append("svg:path")
                    .attr("d", "M360 150 L600 150")
                    .style("stroke-dasharray", "10,10")
                    .style("stoke-width", 2)
                    .style("stroke", "black");
                expander.append("text")
                    .text("not eaten")
                    .attr("class", "legend")
                    .attr("x", "550")
                    .attr("y", "225");
                expander.append("svg:path")
                    .attr("d", "M360 300 L600 300")
                    .style("stroke-dasharray", "10,10")
                    .style("stoke-width", 2)
                    .style("stroke", "black");
                expander.append("text")
                    .text("eaten bad")
                    .attr("class", "legend")
                    .attr("x", "550")
                    .attr("y", "375");
            }

            svg.append("text")
                .text("Observed earlier")
                .attr("class", "legend")
                .attr("x", "125")
                .attr("y", 13);

            svg.append("text")
                .text("Species can be")
                .attr("class", "legend")
                .attr("x", "660")
                .attr("y", "150");
            svg.append("text")
                .text("2/3 healthy or")
                .attr("class", "legend")
                .attr("x", "660")
                .attr("y", "165");
            svg.append("text")
                .text("2/3 poisonous")
                .attr("class", "legend")
                .attr("x", "660")
                .attr("y", "180");

            // append space to hold the nodes
            categories.append("g")
                .attr("class", "nodespace");
                // .attr("transform", "translate(200, -80)");


            svg.append("path")
                .attr("d", "M110 0 L110,515")
                .style("stroke", "white")
                .style("stroke-width", "5");

            categories.select(".nodespace").style("opacity", 0);
            categories.select(".icon").style("opacity", 0);


        }

        nodes = [];
        nodes = nodes.concat.apply(nodes, _.map(data, function(d){return d.hist; }));
        force = d3.layout.force()
            .nodes(nodes)
            .links([])
            .gravity(0)
            .charge(-12)
            .size([500, 500])
            .on("tick", tick);

        nodeSymbols = categories.select(".nodespace").selectAll("g").data(function(d,i){return d.hist; });

        function tick(e){
            var k = 0.05 * e.alpha;
            // Push nodes toward their designated focus. In order for the nodes
            // for the four different species to ignore each other even they're
            // in the same x/y position, the force layout is hacked to act like
            // each category's nodes are 2000px apart, but then the nodes are
            // shifted back for presentation
            nodes.forEach(function(o, i) {
                o.y += (foci[o.outcome].y + 2000*o.cat - o.y) * k;
                o.x += (foci[o.outcome].x - o.x) * k;
            });
            nodeSymbols.attr("transform", function(d) {
                return "translate(" + d.x + "," + (d.y - 2000*d.cat)+ ")";
            });
        };
        force.start();

    };

    this.getAll = function(){
        return svg;
    };

    this.addHighlight = function(speciesId, time, nodesamount, iconamount){
        for (var i=0; i<data.length; i++) {
            if (data[i].species.id!=speciesId) {
                svg.select("#"+data[i].species.id).select(".nodespace").transition()
                    .duration(time)
                    .style("opacity", nodesamount);
                svg.select("#"+data[i].species.id).selectAll(".expander").transition()
                    .duration(time)
                    .style("opacity", nodesamount);
                svg.select("#"+data[i].species.id).select(".icon").transition()
                    .duration(time)
                    .style("opacity", iconamount);
            }   else {
                svg.select("#"+data[i].species.id).select(".nodespace").transition()
                    .duration(time)
                    .style("opacity", 1.0);
                svg.select("#"+data[i].species.id).selectAll(".expander").transition()
                    .duration(time)
                    .style("opacity", 1.0);
                svg.select("#"+data[i].species.id).select(".icon").transition()
                    .duration(time)
                    .style("opacity", 1.0);
            }
        }
    };

    this.removeHighlight = function(time){
        for (var i=0; i<data.length; i++) {
            svg.select("#"+data[i].species.id).select(".nodespace").transition()
                .duration(time)
                .style("opacity", 1.0);
            svg.select("#"+data[i].species.id).selectAll(".expander").transition()
                .duration(time)
                .style("opacity", 1.0);
            svg.select("#"+data[i].species.id).select(".icon").transition()
                .duration(time)
                .style("opacity", 1.0);
        }
    };
    this.lowlight = function(time, nodesamount, iconamount){
        for (var i=0; i<data.length; i++) {
            svg.select("#"+data[i].species.id).select(".nodespace").transition()
                .duration(time)
                .style("opacity", nodesamount);
            svg.select("#"+data[i].species.id).selectAll(".expander").transition()
                .duration(time)
                .style("opacity", nodesamount);
            svg.select("#"+data[i].species.id).select(".icon").transition()
                .duration(time)
                .style("opacity", iconamount);
        }
    };

    this.spin = function (degrees) {
        spinner.attr("transform", "translate(710, 85) scale(.7)")
            .transition()
            .duration(1000)
            .attrTween("transform", function() {
                var i = d3.interpolate(0, degrees);
                return function(t){
                    return "translate(710, 85) rotate(" + i(t) + ") scale(0.7)";
                };
            });
    };

    /* update the display */
    //updates UI following addition of new trial data
    this.update = function(time, decisionPhase, amountString) {
        nodes = [];
        nodes = nodes.concat.apply(nodes, _.map(data, function(d){return d.hist; }));
        force.nodes(nodes);
        //svg groups for the categories
        var categories = svg.selectAll(".cat").data(data);
        //attach data to circles
        nodeSymbols = categories.select(".nodespace").selectAll("g").data(function(d,i){return d.hist});
        var circleGroup = nodeSymbols.enter().append("g");
        circleGroup.attr("transform", function(d) {
            return "translate(" + d.x + "," + (d.y-2000*d.cat) + ")";
        });
        circleGroup.append("path")
            .attr("class", "dot")
            .attr("d", d3.svg.symbol()
                  .type( function(d) {
                      return d3.svg.symbolTypes[symbolTypes[d.outcome]];
                  })
                  .size( function (d) {
                      return symbolSizes[d.outcome];
                  })
                 )
            .style("fill", function(d){
                return colors[d.outcome];
            })
            .style("stroke-width", 1)
            .style("stroke", "black");

        circleGroup.append("text")
            .attr("x", 10)
            .style("fill", function(d){
                return colors[d.outcome];
            })
            .style("font", "bold 24px monospace")
            .text(amountString);

        force.start();
        // fade out outcome value text after a little while
        if (decisionPhase) {
            setTimeout(function(){
                nodeSymbols.select("text").transition()
                    .duration(time/2)
                    .style("opacity", 0)
                    .remove();
            }, time/2);
        }
    };
};

/******************************
* Score
******************************/
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
        scoreText.text("$" + score.toFixed(2));
    };
};



/*******************************
*  Observational Learning Phase *
********************************/
var ObservePhase = function(species, habitat, habitatNum, complete_fn) {
    psiTurk.showPage('stage.html');

    var thestage =  d3.select("body").select("svg");

    var observed = InitializeObserved(species);
    var disp = new TallyDisplay(thestage, observed);
    var observedStim = [];


    var showHabitat = function() {

        d3.select("body").select("h1").text("Welcome to the " + habitat._name + " ecosystem");
        d3.select("body").select(".aboveStage").append("p").html("This ecosystem is home to mushroom species found nowhere else in the world. All mushroom species in this area could be mostly healthy or mostly poisonous.");
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
          .attr("class","continue btn btn-primary btn-lg")
          .attr("id","Next")
          .attr("value","Next");
        $('.continue').click(function() {
            beginObserve();
        });
    };

    var beginObserve = function() {
        var trial = -60,
            i;
        for (i = 0; i < 6; i++ ) {
            observedStim.push({cat: 0});
            observedStim.push({cat: 1});
        }
        for (i = 0; i < 24; i++ ) {
            observedStim.push({cat: 2});
            observedStim.push({cat: 3});
        }
        observedStim = _.shuffle(observedStim);
        for (i = 0; i < 60; i++) {
            observedStim[i].trial = -(60 - i);
        }

        d3.select(".habitat").remove();
        d3.select(".continue").remove();
        d3.select(".aboveStage").selectAll("p").remove();
        // set the title
        d3.select("body").select("h1").text("Your observations for the " + habitat._name);

        // test
        d3.select("body").select(".aboveStage").insert("p").html("You are counting species growing in the <strong>" + habitat._name +"</strong>.  Each dot represents an individual mushroom you have observed.");
        disp.init(false);
        setTimeout( function() { accumulateObservations(); }, 2000);
    };


    var accumulateObservations = function (){
        if (observedStim.length === 0) {
            disp.update(0, false, "");
            setTimeout( function(){ finish(); }, 1000);
        } else {
            var stim = observedStim.shift();
            var currentSpecies = species[stim.cat];
            // add a little randomness to where the observation appears
            // helps the observations not pile up in a line
            var startingx = foci[5].x -10 + 20*Math.random();
            var startingy = foci[5].y -10 + 2000*stim.cat + 20*Math.random();
            getCurrentCat(observed, currentSpecies).hist.push({trial: stim.trial, outcome: 5, cat: stim.cat,
                                                               x: startingx, y: startingy, px: startingx, py: startingy});
            disp.update(0, false, "");

            setTimeout( function() { accumulateObservations(); }, 50);
        }
    };

    var finish = function() {
        d3.select("body").select("h1").text("Click next to continue.");
        d3.select("body")
          .select(".belowStage")
          .append("input")
          .attr("type","button")
            .attr("class","continue btn btn-primary btn-lg")
          .attr("id","Next")
          .attr("value","Next");
        $('.continue').click(function() {
            complete_fn(observed);
        });
    };

    showHabitat();

};

/**********************************
* Quiz on Mushroom Frequency      *
**********************************/
var FrequencyQuizPhase = function(observed, species, habitat, habitatNum, complete_fn) {
    psiTurk.showPage('stage.html');
    var thestage =  d3.select("body").select("svg");
    var display = new TallyDisplay(thestage, observed);
    display.init(false);
    display.update(0, false, "");
    var stim, currentSpecies;
    var aboveStage = d3.select("body").select(".aboveStage");
    var belowStage = d3.select("body").select(".belowStage");
    d3.select("body").select("h1").text("" + habitat._name + " field report");
    var stimuli = [
        {cat: 0,
         freq: .1},
        {cat: 1,
         freq: .1},
        {cat: 2,
         freq: .4},
        {cat: 3,
         freq: .4}
    ];
    stimuli = _.shuffle(stimuli);

    var nextQuestion= function() {
        if(stimuli.length === 0) {
            finish();
        }
        else {
            stim = stimuli.shift();
            currentSpecies = species[stim.cat];
            askQuestion();
        }
    };

    var askQuestion = function() {
        var stimOn = new Date().getTime();
        aboveStage.selectAll("p").remove();
        belowStage.selectAll("p").remove();
        aboveStage.append("p")
            .html("It's time to send a field report back to the lab. Answer the following questions about your observations:");
        belowStage.append("p")
            .html("If you saw <strong>10 mushrooms</strong> on your hike through the " + habitat._name + ", how many would you expect to be from the species <strong>" + currentSpecies._name + "</strong>? <strong>Use the drop-down menu to make your selection</strong>.");
        var dropDown = belowStage.append("select")
            .attr("id", "freqSelect")
            .style("margin-right", "50px");

        for(var i = 0; i < 11; i++){
            dropDown.append("option")
                .attr("value", i)
                .style("font-size", "20px")
                .html(i);
        }
        var nextButton = belowStage.append("input")
            .attr("type", "button")
            .attr("class", "btn btn-primary btn-lg")
            .attr("value", "next")
            .attr("id", "next");
        display.addHighlight(currentSpecies.id, 500, .3, .3);
        $('#next').click(function() {
            var rt = new Date().getTime() - stimOn;
            psiTurk.recordTrialData({'condition': condition,
                                     'habitat': habitat._name,
                                     'habitatNum': habitatNum,
                                     'phase': "frequencyquiz",
                                     'category': stim.cat,
                                     'species': currentSpecies._name,
                                     'freq': stim.freq,
                                     'response': $("#freqSelect").val(),
                                     'rt': rt});
            dropDown.remove();
            nextButton.remove();
            display.lowlight(500, .3, .3);
            setTimeout(function(){nextQuestion();}, 500);
        });
    };


    var finish = function() {
        complete_fn(observed);
    };

    nextQuestion();

};


/**********************************
* Decision (Approach Avoid) Phase *
**********************************/
var DecidePhase = function(previouslyobserved, species, stimuli, habitat, habitatNum, startingScore, complete_fn) {
    psiTurk.showPage('stage.html');
    var observed = jQuery.extend(true, [], previouslyobserved);
    _.map(observed, function(d) {d.hist = [];});
    console.log(observed);
    var thestage =  d3.select("body").select("svg");
    var display, successes, failures, totalGoods, totalBads, approachPic, avoidPic, stim, currentSpecies, stimOn, scoreKeeper, bottomMessage, nonMushroomVisuals, approachGroup, avoidGroup, statusVisuals;
    var score = startingScore;
    var initializeGame = function(){
        thestage.attr("height", "650");
        //d3.select("body").select("h1").text(habitat._name + " mushroom challenge");

        display = new TallyDisplay(thestage, observed, previouslyobserved);
        display.init(true);
        display.update(0, false, "");
        // display.getAll().attr("transform", "translate(0,50)");

        successes = [];
        failures = [];
        totalGoods = [];
        totalBads = [];
        for(var i = 0; i < species.length; i++){
            successes.push(0);
            failures.push(0);
            totalGoods.push(0);
            totalBads.push(0);
        }
        scoreKeeper = new Score(thestage, score * mpp + startingbonus, 10, 40);
        //Useful note - stim has these fields: mode, trial, cat, value, apPayoff, avPayoff


        nonMushroomVisuals = thestage.insert("g")
            .attr("transform", "translate(20, 470), scale(.9)");

        statusVisuals = nonMushroomVisuals.insert("g");

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
            .style("opacity", 0.5);
        approachGroup.append("text")
            .style("font", "bold 18px monospace")
            .attr("x", 40)
            .attr("y", 130)
            .attr("fill", "black")
            .text("eat");

        avoidGroup = nonMushroomVisuals.insert("g")
            .attr("transform", "translate(550, 30)");
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

        bottomMessage = d3.select(".belowStage")
          .insert("p")
        .style("text-align", "center");

        next();
    };

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
                .on("click", function(){});
            avoidPic.on("mouseover", function(){avoidIn = true;})
                .on("mouseout", function(){avoidIn = false;})
                .on("click", function(){});

        }else if(state==="on"){
            approachGroup.style("visibility", "visible");
            avoidGroup.style("visibility", "visible");
            approachPic.on("click", function(){responseHandler(1); })
                .on("mouseover", function(){d3.select(this).style("opacity", 1); eatIn = true; })
                .on("mouseout", function(){d3.select(this).style("opacity", 0.5); eatIn = false; });

            avoidPic.on("click", function(){responseHandler(0); })
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
        }
    };

    var next = function() {
        var nLeft = stimuli.length;
        if(nLeft === 0){
            finish();
        }
        else{
            stim = stimuli.shift();
            currentSpecies = species[stim.cat];
            showStim();
        }
    };

    var showStim = function() {
        stimOn = new Date().getTime();
        display.addHighlight(currentSpecies.id, 500, 0, .3);
        setButtonState("on");
        bottomMessage.html("Click either \"eat\" or \"don't eat\".");
    };

    var responseHandler = function(approached) {
        var rt = new Date().getTime() - stimOn;
        var currentCatData = getCurrentCat(observed, currentSpecies);
        setButtonState("off");
        var successesBefore = successes[stim.cat];
        var failuresBefore = failures[stim.cat];
        var totalGoodsBefore = totalGoods[stim.cat];
        var totalBadsBefore = totalBads[stim.cat];
        var scoreBefore = score;
        var scoreChangeString = "";
        var startingx = foci[0].x - 10 + 20*Math.random();
        var startingy = foci[0].y - 10 + 2000*stim.cat + 20*Math.random();
        if (stim.value) {
            totalGoods[stim.cat] += 1;
        } else {
            totalBads[stim.cat] += 1;
        }
        if(approached){
            score += stim.apPayoff;
            if(stim.apPayoff < 0){
                scoreChangeString += "-";
            }
            scoreChangeString += "$" + Math.abs((stim.apPayoff * mpp).toFixed(2));
            currentCatData.hist.push({trial: stim.trial, outcome: stim.value * 2 + 2, cat: stim.cat,
                                      x: startingx, y: startingy, px: startingx, py: startingy});
            if(stim.value){
                successes[stim.cat]++;
            }
            else{
                failures[stim.cat]++;
            }
        }else{
            score += stim.avPayoff;
            if(stim.avPayoff < 0){
                scoreChangeString += "-";
            }
            scoreChangeString += "$" + Math.abs((stim.avPayoff * mpp).toFixed(2));
            if (condition === "1") {
                currentCatData.hist.push({trial: stim.trial, outcome: stim.value * 2 + 1, cat: stim.cat,
                                          x: startingx, y: startingy, px: startingx, py: startingy});
            } else {
                currentCatData.hist.push({trial: stim.trial, outcome: 0, cat: stim.cat,
                                          x: startingx, y: startingy, px: startingx, py: startingy});
            }
            // bottomMessage.html("<span style='color:gray'>You avoided this mushroom</span>")
        }
        scoreKeeper.update(score * mpp + startingbonus);

        display.update(1500, true, scoreChangeString);
        psiTurk.recordTrialData({'condition': condition,
                                 'habitat': habitat._name,
                                 'habitatNum': stim.habitatNum,
                                 'habitatLength': stim.habitatLength,
                                 'trial': stim.trial,
                                 'catTrial': stim.catTrial,
                                 'habitatTrial': stim.habitatTrial,
                                 'phase': "apav",
                                 'category': stim.cat,
                                 'species': currentSpecies._name,
                                 'value': stim.value,
                                 'freq': stim.freq,
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
                                 'successesAfter': successes[stim.cat],
                                 'failuresAfter': failures[stim.cat],
                                 'goodsAfter': totalGoods[stim.cat],
                                 'badsAfter': totalBads[stim.cat],
                                 'rt': rt});

        setTimeout(function(){display.lowlight(500, 0, 0.3);}, 1500);
        setTimeout(function(){display.spin(stim.degrees); }, 2000);
        setTimeout(function(){next(); }, 3000);
    };

    var finish = function() {
        setTimeout(function() {complete_fn(score);}, 1500);
    };

    var showHabitat = function() {
        thestage.attr("height", "450");
        d3.select("body").select("h1").text("Hike through the " + habitat._name + "");
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
          .attr("class","continue btn btn-primary btn-lg")
          .attr("id","Next")
          .attr("value","Next");
        $('.continue').click(function() {
            d3.select(".habitat").remove();
            $(this).remove();
            d3.select("p").remove();
            initializeGame();
        });
    };



    showHabitat();
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
        psiTurk.teardownTask();
        psiTurk.saveData({
            success: function(){
                psiTurk.computeBonus('compute_bonus', function(){finish()});
            },
            error: prompt_resubmit}
                        );
    });
};

var HabitatPlanner = function(){
    var score = 0;
    var allStimuli;
    habitats = _.shuffle(habitats);
    var shuffledMushrooms = _.shuffle(mushrooms);
    var numSpecies = 4;
    var mushroomSets = [];
    for(var i = 0; i < 4; i++){
        var usedMushrooms = [];
        for(var j = 0; j < numSpecies; j++){
            usedMushrooms.push(shuffledMushrooms.shift());
        }
        mushroomSets.push(usedMushrooms);
    }
    var habPlanner = this;

    this.transitionToNext = function(i, lastScore){
        score = lastScore;
        psiTurk.showPage('transition.html');
        $('.continue').click(function() {
            habPlanner.runNext(i, score);
        });
    };

    $.ajax({
        dataType: "json",
        url: "/get_stims",
        success: function(data){
            allStimuli = data.results;
            habPlanner.runNext(0, score);
        }
    });



    this.runNext = function(i, lastScore){
        var apAvCompleteFn;
        if(i === allStimuli.length - 1){
            apAvCompleteFn = function(lastScore) { currentview = new Questionnaire(lastScore); };
        } else{
            apAvCompleteFn = function(lastScore) { habPlanner.transitionToNext(i+1, lastScore); };
        }
        var stimuli = allStimuli[i];
        currentview = new ObservePhase(mushroomSets[i], habitats[i], i, function (observed) {
            currentview = new FrequencyQuizPhase(observed, mushroomSets[i], habitats[i], i, function (observed) {
                currentview = new DecidePhase(observed, mushroomSets[i], stimuli, habitats[i], i, lastScore, apAvCompleteFn);
            });
        });
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
            function () {
                quiz(function () {currentview = new HabitatPlanner(); });
            }
        );
    }
});

// vi: noexpandtab tabstop=4 shiftwidth=4
