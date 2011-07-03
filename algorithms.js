require(["convenient"], function() {
//This function is called when scripts/helper/util.js is loaded.
require.ready(function() {
//This function is called when the page is loaded
//(the DOMContentLoaded event) and when all required
//scripts are loaded.

var findMajority = function(arr) {
    var findMajorityIfMajorityExists = function(array) {
        var id = null;
        var count = 0;
    
        for (var i = 0; i < array.length; i++) {
            if (id === null) id = array[i];
            if (id === array[i]) count++;
            if (id !== array[i]) {
                count--;
                if (count === 0) {
                    id = null;
                }
            }
        }
        return id;
    }

    var isMarjority = function(array, candidate) {
        var count = 0;
        for (var i = 0; i < array.length; i++) {
            if (candidate == array[i]) count++;
        }
        if (count > array.length / 2) return true;
        return false;
    }
    
    var possibleMajority = findMajorityIfMajorityExists(arr);
    return isMarjority(arr,possibleMajority) ? possibleMajority : null;
}

var findMajority = function(arr) {
    
    var findMajorityIfMajorityExists = function(array) {
        return array.map(function(element) {
            //This map transorms each element into a counter
            var counter = {};
            counter.el = element;
            counter.count = 1;
            return counter;
            
        }).reduce(function(counter1, counter2) {
            // This reduce combines counters with the same ids adding thier counts 
            // and subtracts the counts from elements with different ids 
            // the id of the remaining counter must be the majority! 
            
            if (counter1.el === null) return counter2;
            if (counter2.el === null) return counter1;
        
            if (counter1.el === counter2.el) 
                return {el: counter1.el, count: counter1.count + counter2.count};
        
            if (counter1.count > counter2.count) 
                return {el: counter1.el, count :counter1.count - counter2.count};
                
            if (counter1.count < counter2.count) 
                return {el: counter2.el, count :counter2.count - counter1.count};
                
            if (counter1.count === counter2.count) 
                return {el : null, count: 0};
                
        }).el;
    }
    
    var isMarjority = function(array, candidate) {
        var count = 0;
        for (var i = 0; i < array.length; i++) {
            if (candidate == array[i]) count++;
        }
        if (count > array.length / 2) return true;
        return false;
    }

    var possibleMajority = findMajorityIfMajorityExists(arr);
    return isMarjority(arr,possibleMajority) ? possibleMajority : null;
}


Array.prototype.selectKthSmallest= function(k) {
    var array = this;
    if (k >   array.length) throw new Error("cannot look for kth largest element with k > array size"); 
    if (k === array.length) throw new Error("the smallest kth element is the 1st kth element (not the 0th smallest element");
    if ()
    
    var partitionElement = array[0];

    var partitions = splitByTestResults(array, function(x) {
        // console.log(array);
        if (x >  partitionElement)   return "greater";
        if (x <  partitionElement)   return "lesser";
        if (x == partitionElement)   return "same";
    });
    if (!partitions.greater) partitions.greater = [];
    if (!partitions.lesser)  partitions.lesser  = [];
    
    if (partitions.lesser.length === k - 1) 
        return partitionElement;
        
    if (partitions.lesser.length >   k - 1) 
        return partitions.lesser
            .selectKthSmallest(k);
            
    if (partitions.lesser.length <   k - 1) 
        return partitions.greater
            .selectKthSmallest(k - partitions.lesser.length - 1);
        
}

console.log(1,2,3);

});
});