/**
* An attempt to make a js extendable framework...
* @namespace window.Objectified
*/

// change how this is defined
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
            return console && console.log(arguments);
        */
        return '';

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

    function ObjectifiedInstanceConstructor(objectifiedInstancePropertyObject){

        var objectified_self = this,
            instanceObj = objectifiedInstancePropertyObject || {
                'modulePropertiesObject' : objectifiedInstancePropertyObject.modulePropertiesObject || {}
            };

        objectified_self.instancePropertyObject = {
            'modulePropertiesObject' : instanceObj.modulePropertiesObject || {}
        };

        return /* just */ objectified_self;

    }

    // This is what initializes an Objectified instance...
    ObjectifiedInstanceConstructor.init = function(objectifiedInstancePropertyObject){

        return new ObjectifiedInstanceConstructor(objectifiedInstancePropertyObject || {});

    };

    // Objectified Utils setup...
    ObjectifiedInstanceConstructor.prototype.UTILS = {
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
                return objectifiedLog.apply(ObjectifiedSelf, arguments);
            };
        }.call(ObjectifiedInstanceConstructor)
    };

    // Objectified itselfs properties...
    ObjectifiedInstanceConstructor.prototype.objectifiedProperties = {
        'version':'0.1.0'
    };

    // Do AMD and CJS work
    // just attach to the root object like window
    globalRoot.Objectified = ObjectifiedInstanceConstructor;

    return ObjectifiedInstanceConstructor;

}).call( this );
