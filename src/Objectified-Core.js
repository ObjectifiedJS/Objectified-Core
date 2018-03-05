/**
* An attempt to make an extendable js framework...
* @namespace window.Objectified
*/

;var Objectified = ( function( undefined ) {

    'use strict';

    var globalRoot = this;

    // this will be mapped to UTILS.error
    function throwOne(errorText){
        /*
            I want to catch errors internally and its a bad fail
            throw to the window... some how diff between a config
            failure and an actual failure
        */
        throw new Error(errorText);

    }

    // this will be mapped to UTILS.log
    function objectifiedLog(){
        /*
            I know it sounds crazy but i want an internal log
        */
        return this.internals.logArray.push(arguments);
    }

    // this will be mapped to UTILS.log
    function outputObjectifiedLog(){
        /*
            I know it sounds crazy but i want an internal log
        */
        return this.internals.logArray.push(arguments);
    }

    // this will be mapped to UTILS.extend
    function extend(extendingObjectifiedObject, extendingObjectifiedModuleObject){

        var _self = this;

        for(var moduleName in extendingObjectifiedObject){

            _self.prototype[moduleName] = returnModulePropertyObj(extendingObjectifiedObject,moduleName).call({
                'moduleObject' : extendingObjectifiedModuleObject,
                'oPrototype' : _self.prototype
            });

        }

        return _self;

    }

    function returnModulePropertyObj(extendingObjectifiedObject, moduleName){

        // return crazy here...
        return function(){

            // this is what the call is regarding
            var __module = this;

            return function(){

                // this is once its in the actual module itself..
                var constructorSelf = this;

                return extendingObjectifiedObject[moduleName].apply({
                    'moduleObject' : __module.moduleObject,
                    'instancePropertyModuleObject' : constructorSelf.instancePropertyObject.modulePropertiesObject[moduleName],
                    'oPrototype' : __module.oPrototype
                }, arguments);

            };

        };

    }

    function initNewObjectifiedInstance(objectifiedInstancePropertyObject){

        var objectified_self = this;

        objectified_self.objectifiedInstancePropertyObject = {};

        return /* just */ objectified_self;

    }

    function ObjectifiedInstanceConstructor(initializeObject){

        var objectified_self = this;

        objectified_self.instanceObject = {};

        if(
            initializeObject
        ){
            for(var instanceObjectProperty in initializeObject){
                objectified_self.instanceObject[instanceObjectProperty] = initializeObject[instanceObjectProperty];
            }
        }

        return /* just */ objectified_self;

    }

    // This is what initializes an Objectified instance...
    ObjectifiedInstanceConstructor.init = function(initializeObject){

        return new ObjectifiedInstanceConstructor( initializeObject );

    };

    // Objectified Internals...
    ObjectifiedInstanceConstructor.prototype.internals = {
        version:'0.1.0',

        outputLog : function(){
            var ObjectifiedSelf = this;

            for(var logItem=0;ObjectifiedSelf.logArray.length>logItem;logItem++){
                console.log.apply(null, ObjectifiedSelf.logArray[logItem] );
            }

            ObjectifiedSelf.internals.logArray = [];
        },

        logArray : [],

        extend : function(){
            var ObjectifiedSelf = this;
            return function(extendingObjectifiedObject, objectifiedModuleProperties){
                return extend.call(ObjectifiedSelf, extendingObjectifiedObject, objectifiedModuleProperties);
            };
        }.call(ObjectifiedInstanceConstructor),

        error : function(){
            var ObjectifiedSelf = this;
            return function(errorText){
                return throwOne.call(ObjectifiedSelf, errorText);
            };
        }.call(ObjectifiedInstanceConstructor),

        log : function(){
            var ObjectifiedSelf = this;
            return function(){
                return objectifiedLog.apply(ObjectifiedSelf.prototype, arguments);
            };
        }.call(ObjectifiedInstanceConstructor)
    };

    return ObjectifiedInstanceConstructor;

}).call( this );
