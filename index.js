'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/**
 *	identity: Returns its input
 *	@param {any} value: Value to return
 *	@return {any}: The input value
*/

function identity(value){ return value; };

module.exports.identity = identity;

/**
 *	typeOf: Returns the data type of value (as a string)
 *	@param {any} value: value to find data type of
 *	@return {String}: String representation of data type of value
*/

function typeOf(value){
    if(Array.isArray(value)){
        return "array";
    }else if(value === null){
        return "null"
    }
    return typeof value;
}

module.exports.typeOf = typeOf;

/**
 *	first: Returns the first {number} elements of an array.
 *		 giving non-numbers for number is undefined
 *		 behavoir.
 *	@param {Array} array: the array to take from.
 * 	@param {Number} number: the number of elements to take.
 * 	@return {Array}: returns a preceding sub-array of array, length equal
 *			     to {number}
*/

function first(array, number = NaN){
    if(!Array.isArray(array)){
        return [];
    }else if(isNaN(number)){
        return array[0];
    }else if(number < 0){
        return [];
    }

    return array.slice(0, number);
};

module.exports.first = first;

/**
 *	last: Returns the final {number} elements of an array.
 *		 giving non-numbers for number is undefined
 *		 behavoir.
 *	@param {Array} array: the array to take from.
 * 	@param {Number} number: the number of elements to take.
 * 	@return {Array}: returns the last {number} elements of {array}
*/
function last(array, number){
    if(!Array.isArray(array)){
        return [];
    }else if(isNaN(number)){
        return array[array.length - 1];
    }else if(number < 0){
        return [];
    }

    if(array.length < number){
        number = array.length;
    }

    return array.slice(array.length - number, array.length);
};

module.exports.last = last;

/**
 *	indexOf: Returns the first index of {array} which contains
 *		{value}, or -1 if none do.
 *	@param {Array} array: the array to search.
 * 	@param {any} value: the value to search for
 * 	@return {Number}: the index found (or -1)
*/
function indexOf(array, value){
    for(var i = 0; i < array.length; i++){
        if(array[i] === value){
            return i;
        }
    }
    return -1;
}
module.exports.indexOf = indexOf;

/** contains: Determines whether an array contains a value
*   
*   @param {Array} array: The array which might contain the value
*   @param {any} value: The value being search for
*   @return {Boolean}: return whether the array contains the value.
*/
function contains(array, value){
    return indexOf(array,value) == -1 ? false : true;
}

module.exports.contains = contains;

/** unique: Accepts an array and returns a new array w/ all
*           duplicates removed.
*   
*   @param {Array} array: The array which might contain duplicates
*   @return {Array}: The input array, sans the duplicates.
*/
function unique(array){
    var results = [];

    for(var i = 0; i < array.length; i++){
        var value = array[i];
        if(indexOf(array, value) === i){
            results.push(value);
        }
    }
    return results;
}

module.exports.unique = unique;


/** filter: Remove all elements which do not pass a particular criteria
*           (represented by a boolean function) from an array. Returns
*           a new array.
*   
*   @param {Array} array: The array to filter
*   @param {Function} f: The function used to test the elements of the array
*                        must accept the array elements and return a boolean.
*   @return {Array}: A copy of the input array with all failing elements removed.
*/
function filter(array, f){
    var results = [];

    for(var i = 0; i < array.length; i++){
        var value = array[i];
        if(true === f(value, i, array)){
            results.push(value);
        }
    }

    return results;
}
module.exports.filter = filter;

/** reject: Remove all elements which do pass a particular criteria
*           (represented by a boolean function) from an array. Returns
*           a new array.
*   
*   @param {Array} array: The array to filter
*   @param {Function} f: The function used to test the elements of the array
*                        must accept the array elements and return a boolean.
*   @return {Array}: A copy of the input array with all passing elements removed.
*/
function reject(array, f){
    var g = (value, i, array) => !f(value, i, array);
    return filter(array, g);
}
module.exports.reject = reject;

/** partition: Use a boolean-returning function to divide an array
*              into two more arrays
*   
*   @param {Array} array: The array to divide
*   @param {Function} f: The function used to test the elements of the array
*                        must accept the array elements and return a boolean.
*   @return {Array}: An array with two sub-arrays, the first with elements
*                     passing the test and the other with elements failing the test
*/
function partition(array, f){
    return [filter(array,f), reject(array,f)];
}
module.exports.partition = partition;

/** map: Apply a function to every element in a collection,
*        returning a new collection of all the functions results 
*   
*   @param {Array, Object} collection: The colleciton to transform
*   @param {Function} f: The function used to transform the elements of the collection.
*   @return {Array, Object}: A collection with the results of the function calls
*                            in the place of the input collection's elements.
*/
function map(collection, f){
    var result = [];
    if(Array.isArray(collection)){
        for(var i = 0; i < collection.length; i++){
          result.push(f(collection[i], i, collection));
        }
      
    }else{
        for(var key in collection){
            result.push(f(collection[key], key, collection));
          }
    }

    return result;
}
module.exports.map = map;

/** pluck: Using an array of objects, create an array
*          containing a specific property of each of thos objets
*   
*   @param {Array} array: The array of objects
*   @param {String} key: The key of the property to grab
*   @return {Array}: An array made of all the former properties.
*/
function pluck(array, key){
    var f = (object) => object[key]
    return map(array, f);
}

module.exports.pluck = pluck;

/** every: Accept a collection and function. Return true iff
*          every element of that collection causes the function
*          to return true. (return false otherwise)
*   
*   @param {Array, Object} collection: The colleciton to search for
                                       a failing element.
*   @param {Function} f: The function used to test the elements of the collection.
*                        Must accept the collection elements and return a boolean.
*   @return {Boolean}: Whether all elements pass the test from the input "f".
*/
function every(collection, f){
    if(f === undefined){
        f = identity;
    }
    var boolArray = map(collection,f);

    for(var i = 0; i < boolArray.length; i++){
        if(!boolArray[i]){
            return false;
        }
    }

    return true;
}

module.exports.every = every;

/** some: Accept a collection and function. Return false iff
*          every element of that collection causes the function
*          to return false. (return true otherwise)
*   
*   @param {Array, Object} collection: The colleciton to search for
                                       a passing element.
*   @param {Function} f: The function used to test the elements of the collection.
*                        Must accept the collection elements and return a boolean.
*   @return {Boolean}: Whether any elements pass the test from the input "f".
*/
function some(collection, f){
    if(f === undefined){
        f = identity;
    }
    var boolArray = map(collection,f);

    for(var i = 0; i < boolArray.length; i++){
        if(boolArray[i]){
            return true;
        }
    }

    return false;
}

module.exports.some = some;

/** reduce: Call function for every element in the array, passing
*           in the previous result for calling said function
*   
*   @param {Array} array: The elements which must be pass through the function
*   @param {Function} f: The function used to accumulate information from the
*                        the various elements of the array. Must accept an accumulator,
*                        value-form-array, and index. The return data type must be
*                        the same as the accumulator input.
*   @param {any} seed: An element to use as the first accumulator input before the first
*                      time f is called. Must be the same data type as the accumulator
*                      input of f.
*                         
*   @return {any}: The final result of f processing the elements of the array.
*/
function reduce(array, f, seed){
    var i = 0;

    if(seed === undefined){
        seed = array[0];
        i++;
    }

    for(; i < array.length; i++){
        seed = f(seed, array[i], i);
    }

    return seed;
}

module.exports.reduce = reduce;

/** extend: Add the properties of all objects except the first
*           in this function's arguments to the first object, then
*           return the first object.
*   
*   @param {Object} obj1: The Object to graft all these properties to.
*   @param {Object} (anon): The Object whose properties should be grafted
*                           to the first argument. Can have any number of 
*                           parameters here.
*                         
*   @return {Object}: obj1, after it has been modified.
*/
function extend(){
    var object = arguments[0];
    for(var i = 1; i < arguments.length; i++){
        var currentObject = arguments[i];
        for(var key in currentObject){
            object[key] = currentObject[key];
        }
    }

    return object;
}

module.exports.extend = extend;

