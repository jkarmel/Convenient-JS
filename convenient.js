var dictionary = function(spec) {
    var that = {}; 
    var my = {};
    
    my.dict = spec;
    
    that.length = 0;
    
    that.set = function(key, value) {
        that.length++;
        my.dict[key] = value;
    }
    
    that.get = function(key) {
        return my.dict[key];
    }
    
    that.map = function(funct) {
        var result = [];
        for (var key in my.dict) {
            var value = my.dict[key];
            result.push(funct(key,value));
        }
        return result;
    }
    
    // that.reduce = function(funct) {
    //     var result;
    //     var firstLoop = true;
    //     for (var key in my.dict) {
    //         if (firstLoop) {
    //             result = key;
    //             firstLoop == false;
    //         } else {
    //             result = funct(result, key);
    //         }
    //     }
    //     return result;
    // }
    
    that.keys = function() {
        var result = [];
        for (var key in my.dict) {
            result.push(key);
        }
        return result;
    }
    
    that.values = function() {
        var result = [];
        for (var key in my.dict) {
            var value =  my.dict[key];
            result.push(value);
        }
        return result;
    }
    
    that.hasKey = function(target) {
        that.map(function(key, value) {
            if (target === key) {
                return true;
            }
        });
        return false;
    }
    
    that.hasValue = function(target) {
        that.map(function(key, value) {
            if (target === value) {
                return true;
            }
        });
        return false;
    }
    
    return that;
}

var primes = function() {
    var that = {};
    var my   = {};
    
    my.primesSoFar = [2,3];
    
    that.factorize = function(num) {
        if (isValueInArray(my.primesSoFar, num)) {
            return [num];
        }
        var sqrtNum = Math.floor(Math.sqrt(num));
        if (num % sqrtNum === 0) {
            var factorization = that.factorize(sqrtNum).concat(that.factorize(num/sqrtNum));
            return factorization;
        }
        var i = 0;
        while (true) {
            var high = sqrtNum + i;
            var low  = sqrtNum - i;
            if (num % low === 0 && low > 1) {
                var factorization =  that.factorize(low).concat(that.factorize(num/low));
                return factorization;
            } else if (num % high === 0 && high < Math.ceil(num/2)) {
                var factorization = that.factorize(high).concat(that.factorize(num/high));
                return factorization;
            }
            if (high > Math.ceil(num/2) && low <= Math.ceil(num/2)) {
                break;
            }
            i++;
        }
        my.primesSoFar.push(num);
        return [num];
    }
   
    return that;
}

var factorizer = function() {
    var that = {};
    that.factorizationsSoFar = dictionary({2:[2]});
    
    that.factorize = function(num) {
        if (that.factorizationsSoFar.get(num)) {
            return that.factorizationsSoFar.get(num);
        }
        var factorization;
        for (var i = 2; i < Math.sqrt(num); i++) {
            if (num % i == 0) {
                factorization = that.factorize(i)
                    .concat(that.factorize(num / i));
                that.factorizationsSoFar.set(num,factorization);
                return factorization;
            }
        }
        that.factorizationsSoFar.set(num,[num]);
        return [num];
    }
    
    that.numFactors = function(primeFactorization) {
        var counts = getCounts(primeFactorization);
        var mapped = map(counts, function(key,value) {
            return value + 1;
        });
        console.log(counts,mapped);
        var reduced = mapped.reduce(function(x,y) {
            return x*y;
        });
        return reduced;
    }
    
    return that;
}

var map = function(object, funct) {
    var result = [];
    for (var key in object) {
        var value = object[key];
        result.push(funct(key,value));
    }
    return result;
}

var reduce = function(array, funct) {
    var result = array[0];
    for (var i = 1; i < array.length; i++) {
        result = funct(result, array[i]);
    }
    return result;
}

var sum = function(array) {
    return array.reduce(function (x,y) {return x + y});
}

var arrayComprehension = function(min, max, funct) {
    funct = funct || function(x) {return x};
    var array = [];
    for (var i = min; i <= max; i++) {
        array.push(funct(i));
    }
    return array;
};

var arrComp = arrayComprehension;

Array.comp = arrayComprehension;

var getCounts= function(nums) {
    var counts = {};
    nums.map(function(num) {
        if (num in counts) {
            counts[num] += 1;
        } else {
            counts[num]  = 1;
        }
    });
    return counts;
};

function isValueInArray(arr, val) {
	inArray = false;
	for (i = 0; i < arr.length; i++)
		if (val == arr[i])
			inArray = true;
	return inArray;
}

var multiMap = function(arr, funct) {
    // This function is very cool but could use some rewriting
    // The eval statement is an eyesore, and it makes the operation of 
    // this function much less clear. It does cool things though! :)
    var result = [];
    var numFunctionArgs = funct.length;
    for (var i = 0; i <= arr.length - numFunctionArgs; i++) {
        var functionArgs = arr.slice(i, i + numFunctionArgs);
        var stringToEval = "var partialResult = funct(";
        for (var argNum = 0; argNum < functionArgs.length; argNum++) {
            stringToEval += functionArgs[argNum] + ","
        }
        stringToEval = stringToEval.slice(0,-1);
        stringToEval += ")";
        eval(stringToEval);
        result.push(partialResult);
    }
    return result;
}

var factorial = function(n) {
    if ((n == 0) || (n == 1)) {
        return 1;
    } else {
        return (n * factorial(n-1));
   }
};

var filter = function(array, test) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        if (test(array[i])) result.push(array[i]);
    }
    return result;
} 

var growArray = function(seed, length, funct) {
    var recent = seed;
    result = arrayComprehension(0,length - 1, function(x) {
        var now = funct(recent, x);
        recent = now;
        return recent;
    });
    result = [seed].concat(result)
    return result;
}

Array.grow = growArray;

var reverse = function(array) {
    var reversedArray = array.map(function(x) {return x});
    return reversedArray.reverse();
}

var pluck = function (array, test) {
    var result = [];
    array.map(function(x) {
        if (test(x)) result.push(x);
    })
    return result;
}

Array.prototype.mapSlice = function(start, end, funct) {
    return result = this.slice(0,start)
        .concat(this.slice(start, end).map(funct))
        .concat(this.slice(end))
}

Array.prototype.runningReduce = function(funct) {
    var result  = [this[0]];
    for (var i = 1; i < this.length; i++) {
        result.push(funct(result[i - 1], this[i]));
    }
    return result;
}

Array.prototype.runningSum = function() {
    return this.runningReduce(function(x,y) {
        return x + y;
    })
}

Array.prototype.remove = function(elToRemove){
	for (i=0; i < this.length; i++){
		if (elToRemove == this[i]) this.splice(i, 1);
	}
	return this;
}

Array.prototype.removeAll = function(arrElsToRemove) {
    return pluck(this, function(el1) {
        return pluck(arrElsToRemove, function(el2) {
            return el1 === el2;
        }).length === 0;
    })
}

Array.prototype.inArray = function(element) {
    return this.indexOf(element) !== -1;
}

Array.prototype.matching = function(array) {
    var matching = pluck(this, function(el1) {
    return pluck(array, function(el2) {
            return el1 === el2;
        }).length !== 0;
    })
    return matching;
}

Array.prototype.containsElPassingTest = function(funct) {
    for (var i = 0; i < this.length; i++) {
        if (funct(this[i])) return true;
    }
    return false;
}

Array.prototype.elementsPassTest = function(funct) {
    for (var i = 0; i < this.length; i++) {
        if (!funct(this[i])) return false;
    }
    return true;
}

Array.prototype.last = function() {
    return this[this.length - 1];
}

var Network = function(spec) {
    var that = {};
    
    that.nodes    = spec.nodes;
    that.numNodes = that.nodes.length;
    if (spec.edges) {
        that.edges = spec.edges;
    } else {
        that.edges = Matrix.comp({width:  that.numNodes, 
                                  height: that.numNodes,
                                  funct: function() {return 0}});
    }
    
    that.isConnected = function(nodePos1, nodePos2) {
        return that.edges.matrix[nodePos1][nodePos2] === 1 ? true : false;
    } 
    
    that.connect    = function(nodePos1, nodePos2) {
        that.edges.matrix[nodePos1][nodePos2] = 1;
    }
    
    that.disconnect = function(nodePos1, nodePos2) {
        that.edges.matrix[nodePos1][nodePos2] = 0;
    }
    
    
    return that;
}


var repeatsInArray = function(array) {
    var repeats = 0;
    array.map(function(x) {
        array.map(function(y) {
            if (x === y) repeats++; 
        })
    })
    return repeats !== array.length;
}

var end;

var splitByTestResults = function(array, test) {
    var results = {};
    array.map(function(x) {
        var testOutcome = test(x);
        if (testOutcome in results) {
            results[testOutcome].push(x);
        } else {
            results[testOutcome] = [x];
        }
    })
    return results;
}

var digitizer = function() {
    var that = {};
    that.getDigits = function(num) {
        var stringRepresentation = num.toString();
        var digits = arrayComprehension(0, stringRepresentation.length -1,
            function(i) {return parseInt(stringRepresentation[i])});
        return digits;
    }
    that.digitsToNum = function(digits) {
        // digits = digits.reverse();
        result = 0;
        for (var i = 0; i < digits.length; i++) {
            result = result * 10;
            result += digits[i];
        }
        return result;
    }

    that.sumDigits = function(num) {
        var digits = getDigits(num);
        return digits.reduce(function(x,y) {return x + y});
    }

    that.digitsMult = function(digits, mult) {
        var tmp = reverse(digits).map(function(digit) {
           return digit*mult;
        });
        var last = 0;
        tmp = tmp.map(function(digit) {
            digit += last;
            var thisDigits = that.getDigits(digit);
            if (thisDigits.length == 1) {
                last = 0;
                return digit;
            } 
            last = thisDigits[0];
            return thisDigits[1];
        })
        if (last != 0) tmp.push(last);
        return tmp.reverse();
    }

    that.add = function(x1,y1) {
        var x = reverse(x1);
        var y = reverse(y1);
        var carry = 0;
        var result = [];
        for (var i = 0; i < Math.max(x.length,y.length); i++) {
            x[i] = x[i] || 0;
            y[i] = y[i] || 0;
            var z = that.getDigits(x[i] + y[i]).reverse();
            result.push(z[0] + carry);
            carry = z[1] || 0;
        }
        if (carry != 0) result.push(carry);
        return result.reverse();
    }

    that.multiplyDigitsArray = function(x,y) {
        var result = y.map(function(digit) {
            return that.digitsMult(x, digit);
        });
        result = reduce(result, function(entry1, entry2) {
            entry1.push(0);
            return add(entry1,entry2);
        });    
        return result;
    }
    return that;
}

var sieve = function(max) {
    var nums = arrayComprehension(0,max);
    var primes = nums.map(function(x) {
        if (x == 0 || x == 1)  {
            nums[x] = false;
            return;
        }
        nums = nums.mapSlice(Math.pow(x,2),nums.length,function(y) {
                return y % x === 0 && y > x ? false : y;
        })
    })
    return pluck(nums, function(x) {return x});
}

var reduceSlices = function(array, sliceSize, funct) {
    return arrayComprehension(0,array.length - sliceSize, function(x) {
        return array.slice(x, x + sliceSize).reduce(funct);
    })
}

Array.prototype.divide = function(numDivisions, size) {
    var result = [];
    var divisionSize = this.length / numDivisions || size;
    for (var i = 0; i < numDivisions; i++) {
        result = result
            .concat([this.slice(i * divisionSize, i * divisionSize +  divisionSize)]);
    } 
    return result;
}
// var reduceChunks = function(array, chunkSize, funct) {
//     var subArrays = array.divide(,chunkSize);
//     return subArrays.map(function(sub) {
//         sub.reduce(funct);
//     })
// }


var combine = function(a) {
    var fn = function(n, src, got, all) {
        if (n == 0) {
            if (got.length > 0) {
                all[all.length] = got;
            }
            return;
        }
        for (var j = 0; j < src.length; j++) {
            fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
    }
    var all = [];
    for (var i=0; i < a.length; i++) {
        fn(i, a, [], all);
    }
    all.push(a);
    return all;
}

var chooseK  = function (array, k) {
    return pluck(combine(array), function(x) {
        return x.length == k;
    })
}

var matrix = function(spec) {
    var that = {};
    
    that.height    = spec.height;
    that.width = spec.width;
    that.matrix     = []
    
    for (var i = 0; i < spec.height; i++) {
        that.matrix[i] = [];
    }
    
    

    for (var row = 0; row < that.height; row++) {
        for (var column = 0; column < that.width; column++) {
            if (spec.entries !== undefined) {
                that.matrix[row][column] = spec.entries[row * that.width + column];
            } else {
                that.matrix[row][column] = undefined;
            }
        }
    }
    
    that.row = function(i) {
        return that.matrix[i];
    }
    
    that.column = function(j) {
        var col = [];
        for (var i = 0; i < that.width; i++) {
            col.push(that.matrix[i][j]);
        }
        return col;
    }
    
    that.rows = function() {
        return Array.comp(0,that.height -1, function(index) {
            return that.row(index);
        })
    }
    
    that.columns = function() {
        return Array.comp(0,that.width -1, function(index) {
            return that.column(index);
        })
    }
    
    that.southEastDiagonal = function(d) {
        var diag = [];
        for (var i = 0; i < that.width; i++) {
            if (that.matrix[i][d - i]){
                diag.push(that.matrix[i][d - i]);
            }
        }
        return diag;
    }
    
    that.southWestDiagonal = function(d) {
        var diag = [];
        for (var i = 0; i < that.width; i++) {
            if (that.matrix[that.width - i - 1][d - i]){
                diag.push(that.matrix[that.width - i - 1][d - i]);
            }
        }
        return diag.reverse();
    }
    
    that.map = function(funct) {
        var result = matrix({height : that.height, width : that.width});
        result.matrix = that.matrix.map(function(row,rowIndex) {
            return row.map(function(elem,colIndex) {
                return funct(elem,rowIndex,colIndex);
            })
        })
        return result;
    }
    
    that.reduce = function(funct) {
        var result;
    }
    
    that.printMatrix = function() {
        that.matrix.map(function(x) {console.log(x)});
    }
    
    that.getSubMatrix = function(i1,j1,i2,j2) {
        var empty = matrix({height: i2 - i1 + 1, width: j2 -j1 + 1});
        return empty.map(function(elem, rowIndex, colIndex) {
            return that.matrix[rowIndex + i1][colIndex + j1];
        })
    }
    
    //el1, el2, rowIndex, colIndex
    that.reduce = function(funct) {
        var rowReductions = Array.comp(0, that.height - 1, function(rowIndex) {
            return that.row(rowIndex).reduce(function(el1,el2,columnIndex) {
                return funct(el1, el2, rowIndex, columnIndex);
            })
        });
        return rowReductions.reduce(funct); 
    }
    
    that.entriesArray = function() {
        var result = [];
        for (var i = 0; i < that.height ; i++) {
            result = result.concat(that.row(i));
        }
        return result;
    }
    
    // that.findMin = function(compFunct) {
    //     compFunct = compFunct || function(x,y) {return x < y};
    //     that.reduce(function(x,y) {
    //         return 
    //     }
    // }
    
    return that;
}

var Matrix = matrix;

matrix.comp = function(spec) {
    var empty = matrix({height: spec.height, width: spec.width});
    return empty.map(spec.funct);
}

Matrix.comp = matrix.comp;

Matrix.clone = function(matrix) {
    return  Matrix.comp({height: matrix.height, 
                 width:matrix.width, 
                 funct: function(x,rowI, colI) {
                     return matrix.matrix[rowI][colI];
                 }}) 
}

var isArray = function(obj) {
    return obj.constructor == Array;
}

Array.isArray = isArray;

function sameElements(array1, array2) {
   var temp = new Array();
   if ( (!array1[0]) || (!array2[0]) ) { // If either is not an array
      return false;
   }
   if (array1.length != array2.length) {
      return false;
   }
   // Put all the elements from array1 into a "tagged" array
   for (var i=0; i<array1.length; i++) {
      key = (typeof array1[i]) + "~" + array1[i];
   // Use "typeof" so a number 1 isn't equal to a string "1".
      if (temp[key]) { temp[key]++; } else { temp[key] = 1; }
   // temp[key] = # of occurrences of the value (so an element could 
   // appear multiple times)
   }
   // Go through array2 - if same tag missing in "tagged" array, not equal
   for (var i=0; i<array2.length; i++) {
      key = (typeof array2[i]) + "~" + array2[i];
      if (temp[key]) {
         if (temp[key] == 0) { return false; } else { temp[key]--; }
      // Subtract to keep track of # of appearances in array2
      } else { // Key didn't appear in array1, arrays are not equal.
         return false;
      }
   }
   
   // If we get to this point, then every generated key in array1 
   // showed up the exact same
   // number of times in array2, so the arrays are equal.
   return true;
}