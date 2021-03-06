(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] :(array.length>=n ? array.slice(array.length-n, array.length):array.slice(0, array.length));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    //collection.forEach(el => iterator(el));
    if (Array.isArray(collection)){
      for (let i = 0; i<collection.length; i++){
        iterator(collection[i], i, collection);
      }
    } else {
      for (let el in collection){
        iterator(collection[el], el, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
      const result = [];
      for (let el of collection){
        if (test(el)){
          result.push(el);
        }
      }
      return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    const result = [];
    for (let el of collection){
      if (!test(el)){
        result.push(el);
      }
    }
    return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    const mySet = new Set(array);
    return Array.from(mySet);
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    //collection.forEach(el => iterator(el));
      var result = [];
      for (let i = 0; i<collection.length; i++){
        result.push(iterator(collection[i], i, collection));
      }
      return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    /*
    if (Array.isArray(collection)){
      for (let i=0; i<collection.length; i++){
        if (accumulator === undefined){
          accumulator = iterator(collection[0], 0, collection);
        } else {
          accumulator = iterator(accumulator, collection[i], i, collection);
        }
      }
      return accumulator;
    } else {
      for (let el in collection){
        if (accumulator === undefined){
          accumulator = iterator(collection[el], el, collection);
        } else {
          accumulator = iterator(accumulator, collection[el], el, collection);
        }
      }
      return accumulator;
    }
    */

    // refactored
    _.each(collection, function(element, i) {
      if (accumulator === undefined && i === 0) {
        accumulator = element;
      } else {
        accumulator = iterator(accumulator, element)
      }
    }); return accumulator
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (iterator !== undefined){
      for (let i = 0; i<collection.length; i++){
          if (!iterator(collection[i], i, collection)){
            return false;
          }
      }
      return true;
    } else {
      for (let i = 0; i<collection.length; i++){
          if (!collection[i]){
            return false;
          }
      }
      return true;
    }

    // refactored
    //return collection.reduce((acc, el) => {return iterator === undefined ? (!el || !acc?false:acc):(!iterator(el) || !acc?false:acc);}, true);

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (iterator !== undefined){
      for (let i = 0; i<collection.length; i++){
          if (iterator(collection[i], i, collection)){
            return true;
          }
      }
      return false;
    } else {
      for (let i = 0; i<collection.length; i++){
          if (collection[i]){
            return true;
          }
      }
      return false;
    }
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for (let i = 1; i<arguments.length; i++){
  		//console.log(arguments[i]);
  		for (let el in arguments[i]){
  			obj[el] = arguments[i][el];
  			//console.log(el + ':' + arguments[i][el]);
  		}
  	}
  	return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (let i = 1; i<arguments.length; i++){
      //console.log(arguments[i]);
      for (let el in arguments[i]){
        if (obj[el] === undefined){
          obj[el] = arguments[i][el];
          //console.log(el + ':' + arguments[i][el]);
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    //var alreadyCalled = false;
    var result;
    var givenArguments = [];
    var resultArray = [];
    return function() {
      if (/*!alreadyCalled && */givenArguments.indexOf(JSON.stringify(arguments)) === -1) {
        result = func.apply(this, arguments);
        //alreadyCalled = true;
        givenArguments.push(JSON.stringify(arguments));
        resultArray.push(result);
      } else {
        result = resultArray[givenArguments.indexOf(JSON.stringify(arguments))];
      }
      return result;
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    //delete(arguments[0]);
    //delete(arguments[1]);
    //setTimeout(function(arguments[2], arguments[3]){return 0;}, wait);
    //setTimeout(func, wait);
    //function() { myFunc('one', 'two', 'three'); }, 1000
    //setTimeout(function() { func(1, 2); }, wait);
    const a = arguments[2];
    const b = arguments[3];
    setTimeout(function() { func(a, b); }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    const result = [];
    let randomIndex = 0;
    const arrayCopy = array.slice(0);
    let num = 0;
    while (arrayCopy.length>0){
      randomIndex = Math.floor(Math.random()*arrayCopy.length);
			num = arrayCopy.splice(randomIndex,1);
			result.push(num[0]);
    }
    return result;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var arr = []
    if (typeof(functionOrKey) === 'string' ){
      for (let i=0; i<collection.length; i++){
        arr.push(collection[i][functionOrKey]());
      }
    } else {
      for (let i=0; i<collection.length; i++){
        arr.push(functionOrKey.apply(collection[i]));
      }
    }
    return arr;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var sortedCollec = [];
    if (typeof(iterator) === 'string'){
      // implement a sort function using collection[iterator]
      sortedCollec = collection.sort(function(el1, el2){
        if (el1[iterator]>el2[iterator]) return 1;
      	else if (el2[iterator]>el1[iterator]) return -1;
      	else return 0;})
    } else {
      sortedCollec = collection.sort(function(el1, el2){
        if (iterator(el1)>iterator(el2)) return 1;
      	else if (iterator(el2)>iterator(el1)) return -1;
      	else return 0;})
      // implement a sort function using iterator(collection)
    }
    return sortedCollec;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {

    var result = [];
    var tempArr = [];
    var indexLongest = 0;

    // find longest element
    for (let i=1; i<arguments.length; i++){
      if (arguments[i]>arguments[indexLongest]){
        indexLongest = i;
      }
    }

    for (let i=0; i<=indexLongest; i++){
      tempArr = [];
      for (let y=0; y<arguments.length; y++){
        tempArr.push(arguments[y][i])
      }
      result.push(tempArr);
    }

    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var result = [];

    // recursive function
    var findEl = function(el){
      if (!Array.isArray(el)){
        result.push(el);
        return result;
      }
      else {
        for (let subEl of el){
          findEl(subEl);
        }
      }
    };

    // call of the recursive function for each element
    for (let el of nestedArray){
      findEl(el);
    }
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  function intersectionBy(arr1, arr2){
    const arr2Set = new Set(arr2);
    return _.filter(arr1, function(el){return arr2Set.has(el);});
    //return arr1.filter(el => arr2Set.has(el));
  }

  _.intersection = function() {
    var result = arguments[0];
    for (var i=1; i<arguments.length; i++){
    	result = intersectionBy(result, arguments[i]);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  function notIntersectionBy(arr1, arr2){
    const arr2Set = new Set(arr2);
    return _.filter(arr1, function(el){return !arr2Set.has(el);});
    //return arr1.filter(el => arr2Set.has(el));
  }

  _.difference = function(array) {
    for (var i=1; i<arguments.length; i++){
    	array = notIntersectionBy(array, arguments[i]);
    }
    return array;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    var triggeredAt = new Date(0);
    console.log('throttle call');
    return function(){
      var now = new Date();
      console.log('anonymous func call at:' + (now-triggeredAt));
      if( now - triggeredAt > wait ){
        console.log('return func and reset last call trigger');
        triggeredAt = now;
        return func();
      }
    };
  };

}());
