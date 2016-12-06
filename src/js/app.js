/**
 *
 * @file
 *     app.js
 * @description
 *     launch the modules and tests
 * @author
 *     marc charton
 *
 */

var app = (function (self){

    "use strict";

    // -- -- M O D U L E   S E T T I N G S -- --

        // Module Configuration
        var config = {

            flow : {
                quarter : 1,
                eighth : 2,
                triplet : 3,
                sixteenth : 4,
                quintuplet : 5,
                sextuplet : 6,
                thirtySecond : 8,
            },

            /*
                Liste des rudiments de la batterie
             */
            rudiment : {
                "singleStroke" : {
                    "fingering" : ["A"],
                },
                "doubleStroke" : {
                    "fingering" : ["A,A"],
                },
                "paradiddle" : {
                    "fingering" : ["A,B,A,A,B,A,B,B"],
                },
                "paradiddlediddle" : {
                    "fingering" : ["A,B,A,A,B,B"],
                },
                "paraparadiddle" : {
                    "fingering" : ["A,B,A,B,A,A,B,A,B,A,B,B"],
                },
            },

            /*
                Liste des types de frappe
            */
            note : {
                EMPTY : 0,
                NORMAL : 1,
                GHOST : 2,
                ACCENT : 3
            },
        };

        // Module name
        var _name = "App";

        // Module Method Exposition
        var app = {
            config : config,
            init : init
        };

    // -- -- P R I V A T E   P R O P E R T I E S -- --

    // -- -- P U B L I C   M E T H O D S -- --

        /*
            Initialisation du module
         */
        function init()
        {
            log("Initialisation");

            // Initialisation of modules
            DrumBlock.init();
            Transformation.init();
            Score.init();

            launchTest();
        };

    // -- -- P R I V A T E   M E T H O D S -- --


        /*
            Log d'un message avec le nom du module
         */
        function log (message) {
            console.log("["+_name+"] " + message);
        };

        /*
            Lancement des tests de développement en cours
         */
        function launchTest() {

            //addAccent();
            //getNoteFromBar();
            //conversion();
            ostinatiList();
        }

        function conversion() {
            // Launch tests
            var barBinary = new Bar([
                [0,1,2,3],
                [1,0,0,1],
                [1,0,0,1],
                [8,9,10,11]
            ]);
            DrumBlock.drawBar(barBinary);


            var ternaryBar = Transformation.convertBarFlow(
                barBinary,
                config.flow.sixteenth,
                config.flow.triplet,
                Transformation.config.fillGapMode.empty);
            DrumBlock.drawBar(ternaryBar, 0, 75);
        };

        function ostinatiList() {
            $.getJSON( "data/ostinati.binaire.json", function( ostinati ) {
                console.log("j'ai récupéré le json !!");
                DrumBlock.drawOstinatiList(ostinati);
            });
        };

        function getNoteFromBar() {
            console.log("============ GET NOTE FROM BAR ============");

            var bar = new Bar([
                [0,1,2,3],
                [1,0,0,1],
                [1,0,0,1],
                [8,9,10,11]
            ]);
            console.log("------ BAR ------");
            console.log(bar);


            console.log("------ Elements ------");
            for (var i = 0; i < 16; i++) {
                console.log("bar["+i+"] = " + bar.getNoteByIndex(i));
                console.log(bar.convertIndex2Coordinates(i));
                bar.setNoteByIndex(12, i);
            }
            console.log(bar);

            console.log("============ end of GET NOTE FROM BAR ============");
        }

        function addAccent() {
            var bar = new Bar([
                [0,1,2,3],
                [1,0,0,1],
                [1,0,0,1],
                [8,9,10,11]
            ]);
            var mask = new Bar([
                [0,0,0,1],
                [0,0,0,1],
                [0,0,0,1],
                [0,0,0,1]
            ]);

            console.log("==================================");

            console.log("Intial values :");
            console.log(bar.toString("bar"));
            console.log(mask.toString("mask"));

            Transformation.addAccent(bar, 5, false);
            console.log(bar.toString("bar (after accent on 5 [ghost=false])"));

            Transformation.addAccentFromMask(bar, mask);
            console.log(bar.toString("bar (after accent on mask [ghost=true])"));

            console.log("==================================");
        }


    return app;

})();
