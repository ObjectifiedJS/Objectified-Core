var assert = require("assert"),
	ObjectifiedCore = require("../dist/Objectified-Core.min.js"),
	publicMethodCount;

function toErIsHuman(){
	throw new Error();
}

// check if Objectified is an object
describe("Objectified-Core", function(){

	it("should return \"object\" on typeof of Objectified", function(){
		assert.equal("object", typeof Objectified);
	});

});

// make sure Objectified has only one public method...
describe("Objectified-Core", function(){
	var publicMethodCount = 0;
	for(var i in Objectified){
		if( typeof Objectified[i] === "function" ){
			console.log(i);
			publicMethodCount++;
		}
	}

	it("should return 1 since the only public method/function is init", function(){
		assert.equal(1, publicMethodCount);
	});
});
