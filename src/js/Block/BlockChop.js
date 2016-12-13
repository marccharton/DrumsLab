/**
*
* @file
*     Block/BlockChop.js
* @description
*     Represent a chop within the block context
* @author
*     marc charton
*
*/

var BlockChop = function(richChop) {
    var _name = "BlockChop";
    var self = this;

    self.chop = chop;
    self.position = 0;

    /*
        Log d'un message avec le nom du module
    */
    self.log = function(message) {
        console.log("["+_name+"] " + message);
    };
};