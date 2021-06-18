
//character count
// const charCount = (str) =>{
//     //make object to return at the end
//     let result = {};
//     //loop over string, for each character
//     for(let i=0;i<str.length;i++){
//         let char= str[i].toLowerCase();
//         // use regexp to test if char is alphanumeric
//         if(/[a-z0-9]/.test(char)){

//         // if the char is a number/etter and is a key in object, add one to count
//         if(result[char]>0){
//             result[char]++;
//         }
//         // if the char is a number/letter and not in the object, add it to the object and set the value to 1
//         else{
//             result[char]=1;
//         }
//     }
//         //if the character is something else(space,period,etc.) don't do anything
//     }
//     // return object
// return result;
// }

//refactored
const charCount = (str) =>{
    //make object to return at the end
    let result = {};
    //loop over string, for each character using 'for of' loop.
    for(let char of str){
        // use regexp to test if char is alphanumeric
        // regexp time complexity might have issues
        // if(/[a-z0-9]/.test(char))
        // better to use char code comparison
        if(isAlphaNumeric(char)){
            char.toLowerCase();
            //truthy or falsy conditional 
            // if there's a value in obj[char] add 1 obj[char]=++obj[char]
            //if there's nothing in there, a falsy, set it to 1 obj[char]=1 
            result[char]=++result[char]||1;
    }
        //if the character is something else(space,period,etc.) don't do anything
    }
    // return object
return result;
}

const isAlphaNumeric = (char) =>{
    let code =char.charCodeAt(0)
    if(!(code>47 &&code<58)&& //(0-9)
    !(code>64&&code<91)&& //(A-Z)
    !(code>96&&code<123)){ // (a-z)
     return false
    }
    else{
       return true
} 
    }
//////////////////////////////////////////////////////////////////////////////////////////

//array that has square of element in second array. must have same frequency
//simple 0(n^2) quadratic approach
//avoid nested loops whenever possible
// const same= (arr1,arr2) =>{
//     // if the arrays don't equal in length then frequency is not the same and you return false
//     if(arr1.length!==arr2.length){
//         return false;
//     }
// //if the lengths are the same you loop through the first array
// for(let i=0;i<arr1.length;i++){
//     //determine the indexOf the square of arr1[i] in arr2
//     let correctIndex = arr2.indexOf(arr1[i]**2)
//     //if it doesn't exist then you exit by returning false
//     if(correctIndex===-1){
//         return false;
//     }
//     //if it exist you remove the element from arr2
//     arr2.splice(correctIndex,1)
// }
// //if all the square of element in arr1 is equal to the frequency of that number in 2 then you return true
// return true;
// } 

//0(n) approach by using the frequency counter pattern
const same= (arr1,arr2) =>{
    // if the arrays don't equal in length then frequency is not the same and you return false
    if(arr1.length!==arr2.length){
        return false;
    }
    //create objects to store each array in 
    let frequencyCounter1={};
    let frequencyCounter2={}; 
//instead of checking for each element in the first array by looping through the second array everytime
//you loop through both separately one time only
//use 'for of' loop instead of standard 'for' loop for coding readability
for(let val of arr1){
    // for current val assign frequencyCounter1[val] the current count +1 if it exist or 0 +1 if it doesn't
    frequencyCounter1[val]=(frequencyCounter1[val]||0)+1;
}
for(let val of arr2){
    frequencyCounter2[val]=(frequencyCounter2[val]||0)+1;
}
// iterates over the key in frequencyCounter1. for each one
for(let key in frequencyCounter1){
    //The in operator returns true if the specified property is in the specified object or its prototype chain.
    // if key^2 is not in frequency counter2 return false 
    if(!(key**2 in frequencyCounter2)){
        return false
    }
    // if the number of key^2 in frequencycounter2 doesn't equal the number of key in frequencycounter1 return false
    if(frequencyCounter2[key**2]!==frequencyCounter1[key]){
        return false
    }
}
//outside of the for loop if both arrays pass both conditions return true
return true;
} 

/////////////////////////////////////////////////////////////////////////////////

//Given two strings, write a function to determine if the second string is an anagram of the first
// const validAnagram = (str1,str2) =>{

//     if(str1.length!==str2.length){
//         return false;
//     }
//     const arr1 = str1.split('');
//     const arr2 = str2.split('');
//     const frequencyCounter1={};
//     const frequencyCounter2={};

//     for(let char in arr1){
//         frequencyCounter1[char]=(frequencyCounter1[char]||0)+1;
//     }
//     for(let char in arr2){
//         frequencyCounter2[char]=(frequencyCounter2[char]||0)+1;
//     }

//     for(let key in frequencyCounter1 ){
//         if(!(key in frequencyCounter2)){
//             return false;
//         }
//         if(frequencyCounter2[key]!==frequencyCounter1[key]){
//             return false;
//         }
//     }
//     return true;
// }

//refactored validanagram algo
const validAnagram = (first, second) =>{
    if(first.length !== second.length){
        return false;
    }

    const lookUp = {}

    for(let i=0;i<first.length;i++){
        let letter = first[i]
        //if letter exists,increment,otherwise set to 1
        lookUp[letter]?lookUp=+1:lookUp=1;
    }
    for(let i=0;i<second.length;i++){
        let letter = second[i]
        //can't find letter or letter is zero then it's not an anagram
        if(!lookUp[letter]){
            return false
        }
        else{
            // remove one count of the letter from the lookUp object if it is found
            lookUp[letter]-=1
        }
    }
    //if for loop completes and every letter matches return true
    return true
}

/////////////////////////////////////////////////////////////////////////////////

//first pair that sums up to zero for sorted array of integers
//use multiple pointers approach for 0(n) linear time complexity
//constant space complexity of 0(1)
const sumZero = (arr) =>{
//initialize index on left
    let left = 0;
    //initialize index on right
    let right = arr.length -1;
    // while the left index is smaller than the right loop through the array using pointers on both
    //ends converging on the middle
    //this will only run when left is smaller than right or else you might get a false positive if 
    //left equals right
    while(left<right){
        // add the left element to the right element
        let sum = arr[left] + arr[right];
        // if they add up to 0 return the elements
        if(sum===0){
            return[arr[left],arr[right]]
        }
        //if they add up greater than zero that means that the right number is too big and the next element down
        //needs to be pointed to, so you reduce the index by one
        else if(sum>0){
            right--;
        }
        //if they add up smaller than zero that means that the left number is too small and needs to be bigger in value
        //so you increase the index by one.
        else{
            left++;
        }
    }
    //if the left or right index overtake each other return no pair
    return 'No pair found to sum up to zero'
}

///////////////////////////////////////////////////////////////////////////////////

//implement a function called countUniqueValues, which accepts a sorted array and counts the unique values in the array.
//There can be negative numbers in the array, but it will be sorted
//multiple pointer algo has a time complexity of o(n)
const countUniqueValues = (arr) =>{
    // empty array
    if(!arr.length){
        return 0
    }
    // first pointer will sit on the index until the second pointer encounters a new unique value
    // when that happens you increase the first pointers index by one and assign the unique value to that new spot
    // this will consequently track the number of unique elements when you add one to the index at the end 
    let first = 0;
    // 2nd pointer will start off by pointing to the index one ahead of the first pointer 
    for(let sec=1; sec<arr.length; sec++){
        // if the elements are not equal you increase first by one and assign the element at the second to it
        // and the second pointer index automatically moves up by one in the loop
        if(arr[first] !== arr[sec]){
            first++;
            arr[first] =arr[sec];
        }
    }
    // add one to the index to indicate the number of unique values
    return first+1

}
///////////////////////////////////////////////////////////////////////////////////
//Write a function called maxSubarraySum which accpts an array of integers and a number called n. The function
//should calculate the maximum sum of n consecutive elements in the array.

// bad quadratic time complexity of 0(n^2)
// const maxSubarraySum = (arr,num) =>{
//     if(num>arr.length){
//         return null
//     }
//     let max = -Infinity;
//     for(let i =0; i<arr.length-num+1;i++){
//         temp=0;
//         for(let j=0; j<num;j++){
//             temp += arr[i+j];
//         }
//         if(temp>max){
//             max=temp
//         }
//         console.log(temp,max)
//     }
//     return max
// }

//refactored using sliding window approach ends up with 0(n) time complexity
// sliding window works by adding the next element at the end of the entire group of n number of elements that you
// want to add. you then subtract the first number in that group of n elements. you do this until you reach the end
// of the array, essentially sliding the group of elements/window up the array 
const maxSubarraySum = (arr,num) =>{
    let maxSum =0;
    let tempSum=0;
    // if the desired group is bigger than the array
    if(arr.length<num) return null;
    // iterate through the elements in the array until you reach num
    for(let i=0;i<num;i++){
        //add to the maxsum with each and every element until you reach num
        maxSum+=arr[i]
    }
    // assign maxSum to tempSum so that you can iterate through the ends of tempsum but at the same time
    //have maxSum as a constant variable that will be compared to the tempSum
    tempSum=maxSum;
    // iterate through the already set chunk by starting at the index of num which is one more than the element 
    //that the previous chunk finished at. 
    for(let i =num; i<arr.length;i++){
        //You then subtract the first index of the last chunk by subtracting num from i. Afterwards 
        // you add the element that is one more than the chunk. That element is the iterator.
        tempSum=tempSum-arr[i-num]+arr[i];
        // compare maxSum to tempSum after each iteration. which ever is bigger is assigned to maxSum
        maxSum=Math.max(maxSum,tempSum);
    }
    // maxSum is returned
    return maxSum;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
//recursive function to count down to zero
const countDown = (num) => {
    // base case 
    //if num equals zero the recursion function stops and returns 
    if(num<=0){
        console.log('All done')
        return 'Done';
    }
    // if the base case is not reached it will print out and reduce num by one before calling the function again
    console.log(num);
    // reduces num everytime function is called
    num--;
    // calls the function because base case is not reached
    countDown(num);
}

//iterative function
// const countDown = (num) =>{
//     for(let i = num; i>0;i--){
//         console.log(i)
//     }
//     console.log('All done')
// }

/////////////////////////////////////////////////////////////////////////////////
//recursive function to sum up range of numbers
const sumRange = (num) => {
    //base case
    //if after recursive calls num finally reaches 1, return 1
    if(num===1)return 1
    //if base case of num equaling 1 has not been reached continue to add num to the recursive call
    // of the function with num-1.
    return num+sumRange(num-1)
}
// sumrange(3) 6 is returned from sumrange(3) after the edge case is met and the returns make their way up the callstack
        //return 3 + sumrange(2) waits for sumbrange(2), 3 returns from sumrange(2), so 3+3 can be returned
                        //return 2 + sumrange(1) waits for sumrange(1), 1 returns from sumrange (1), so 2+1 can be returned
                                //edge case returns

//////////////////////////////////////////////////////////////////////////////////////
//factorial done iteratively
// const factorial = (num) =>{
//     let total = 1
//     for(let i =num; i>1; i--){
//         total *= i
//     }
//     return total
// }

//factorial done recursively
const factorial = (num) =>{
    //base case
    //if after recursive calls num finally reaches 1, return 1
    if(num===1) return 1
    //if base case of num equaling 1 has not been reached continue the recursive call
    // of the function with the argument minus one multiplied with the current argument 
    return num*factorial(num-1)
}
// factorial(3) 6 is returned from factorial(3) after the edge case is met and the returns make their way up the callstack
        //return 3 * factorial(2) waits for factorial(2), 2 returns from factorial(2), so 3*2 can be returned
                        //return 2 * factorial(1) waits for factorial(1), 1 returns from factorial(1), so 2*1 can be returned
                                // factorial(1) edge case returns 

//////////////////////////////////////////////////////////////////////////////////////
//recursive function to store odd numbers in an array using helper method recursion
// const collectOdds = (arr) => {

//     // store result outside of the helper method recursion so it doesn't get reset everytime
//     let result = []
//     //recursive helper method 
//     const helper = (helperInput) => {
//         //base case if the array is empty return to previous call 
//         if(helperInput.length===0){
//             return;
//         }
//         //if the element at index zero has a modulo of not zero it is then odd 
//         if(helperInput[0]%2!==0){
//             // if it is odd push it onto the results array
//             result.push(helperInput[0])
//         }
//         //recursively call this helper method again by passing in the sliced array with every element that comes after
//         //and including the indicated index.
//         //this is done until the array is empty
//         helper(helperInput.slice(1))
//     }
//     //calls the helper method so that it can recursively call itself to find the odd numbers in the array
//     helper(arr)
    
//     return result;

// }

//pure recursive approach to find odd elements in an array

const collectOdds = (arr) => {
    // array to store odd values only
    let newArr = [];

    //base case
    //after every slice the array shrinks by one element if the size of the array is at zero return the newArr
    if(arr.length === 0) return newArr
    //if the element does not have a mod of 0 at the index of 0 it is odd. if that is the case push that element onto
    //the newArr
    if(arr[0]%2!==0) newArr.push(arr[0])
    //so that the newArr isn't constantly reset when collectOdds is recursively called you essentially concat
    //another newArr to the current one. What happens when the base case is reach is that it concats up the
    // stack so the initial run gets conctanated last That is done recursively until the original is sliced 
    // all the way to zero length 
    newArr = newArr.concat(collectOdds(arr.slice(1)))
    //newArr is returned to the function that called it with 
    return newArr
    //sidenote, concating an empty with an array will just resolve to the array without the empty array
}            //waits for this
//[1].concat(collectOdds([2,3,4,5]))
                            //waits for this, once all is computed will concat to [1] which is is the final return value of [1,3,5]
                //[].concat(collectOdds([3,4,5]))
                                        //waits for this, once computed will concat to [] which is [3,5]
                            //[3].concat(collectOdds([4,5]))
                                                    //waits for this, once computed will concat to [3] which is [3,5]
                                        //[].concat(collectOdds([5]))
                                                                //waits for this, once computed will concat to [], which is [5]
                                                    //[5].concat(collectOdds([]))
                                                                    //returns newArr which will be an empty arr and concats to [5]
////////////////////////////////////////////////////////////////////////////////////////

//Simple linear search function similar to indexOf. Linear time commplexity of 0(n)
const linearSearch = (arr, val) =>{
 for(let i = 0; i<arr.length; i++){
     if(arr[i]===val) return i
 }
 return -1
}
/////////////////////////////////////////////////////////////////////////////////////////

//binary search algo
//pass in an array and the value to search for as arguments to the arr and val
//logarithmi time complexity of 0(logn) but best case can be contant time 0(1)
// log based time complexity is log base n to what power equals the number of elements every doubling of the number of
// elements is one extra step 
const binarySearch = (arr,val) => {
    // start and end are assigned the indexes to represent the beginning and end of the array
    // middle of the array needs to be determined by getting the average and setting that to math.floor
    let start = 0;
    let end = arr.length-1
    let middle = Math.floor((start+end)/2) 
    //the algo finds the value in the array by constantly finding the middle of the start and end points until the element
    //is found in the middle . So you run a while loop to run until this condition is met
    // to prevent an infinite loop you must make sure start is less than or equal to end also
    while(arr[middle]!==val&&start<=end){
        //if the value is smaller than the middle element then you move the end one below the middle
        //in this case start will not change but end does
        if(val<arr[middle]){
            // it's minus one because it's already established that the middle is not the number so you don't want to
            //evaluate the same element again
             end=middle-1;
        }
        else {
        //in this case end does not change but start does
        //establish a new start and add one to middle if the value is greater than the middle value
        start=middle+1
        }
        //after the start or end are reestablished, the middle must also be reestablished
        middle = Math.floor((start+end)/2) 
    }
    // return the middle because that will be the index of where the element is once the loop finishes
    // use ternary to determine if final pass reveals whether or not value is in array
    return arr[middle]!==val ? -1 : middle
} 
// when you round down with two numbers right next to each other,the start position ends up being the new middle
//that is how the value is found if it ends up being in the start position
//[2,5,6,9,13,15,28,30]
// s     m          e
//[2,5,6,9,13,15,28,30]
//         s  m     e
//[2,5,6,9,13,15,28,30]
//               sm  e

//////////////////////////////////////////////////////////////////////////////////////
//string search algo
const naiveSearch = (long, short) => {
    //number of matches
    let count = 0;
    //loop over the long string
    for(let i = 0; i<long.length; i++){
        // for each char in long string, loop over the short string
        for(let j=0;j<short.length;j++){
            // if there is a match, look ahead in the long string to look for match with next iteration within the loop
            //of the short string. if there isn't a match after looking ahead, break out of inner loop and proceed
            // to next iteration in long string.
            if(short[j]!==long[i+j]) break;
            //if j reaches the length of the short string and is a match and therefore hasn't broken out of the inner loop
            // then that means that there is a match of the short string in the long string and the count should be
            //incrementd
            if(j===short.length-1) count++;
        }
    }
 //after the long string has been looped through return count
 return count;
}

//////////////////////////////////////////////////////////////////////////////////////

//  //simple bubble sort algo
//  const bubbleSort = (arr) => {
// //outer loop indicates how many times the loop needs to run to sort the arr. it starts at the length of the arr and decreases
// //because the larger number bubbles up with every complete loop of the inner for loop you do not need to do any 
// //comparisons for that number once it's set at the end of the array. therefore you always go one less than the new length 
// // of the outer array.
// //i dictates how many times so it will run at run at 1 and not zero because it needs to run with one left and not with 
// // zero left
//      for(let i = arr.length; i>0; i--){
//          //allows you to iterate over the array to compare the current index to the subsequent index
//          //if the current index is bigger swap it with the subsequent one
//          //you want the loop to stop when j is smaller than i-1 because i-1 is the index where you don't want to reevaluate
//          //that's because j+1 should be the end of the elements that are evaluated when it reaches that conditional, 
//          //doing so will prevent j+1 from going beyond the number of elements

//          for(let j = 0; j<i-1; j++){
//              console.log(arr,arr[j],arr[j+1]);
//              if(arr[j]>arr[j+1]){
//                 // stores the current index of the inner loop in  temp
//                  let temp = arr[j];
//                  //if it's bigger store subsequent element in current element
//                  arr[j] = arr[j+1];
//                  //assign current element in subsequent one
//                  arr[j+1] = temp;
//              }
//          }
//      }
//     //after all the loop has completed return the sorted array
//      return arr;
//  }
// es15 method of bubbleSort algo
//bubble sort has a polynomial run time of 0(n^2) but can be a linear runtime of 0(n) if it starts out mostly sorted.
const bubbleSort = (arr) => {
    // create noSwaps variable to determine if there were any swaps during the inner loop
    let noSwaps;
    //function used to swap j and j+1 in the arr
    const swap = (arr, idx1, idx2) => {
        [arr[idx1],arr[idx2]] = [arr[idx2],arr[idx1]];
    };
    //setting i at arr.length allows for working down the array so that j does not count the most recently 
    // sorted element at the end, i is essentially the number of elements that need to be sorted 
    // when that counts down j knows not to count that most recently sorted number 
    for(let i=arr.length;i>0;i--){
        // set to true in case the array is completely sorted and the conditional below just needs to run once
        noSwaps=true
        // prevents count last sorted element, doing so also prevents the loop from going out of the array with j+1
        for(let j=0;j<i-1;j++){
           //if the current element is larger call the swap function to swap the two elements
            if(arr[j]>arr[j+1]){
                swap(arr,j,j+1);
                //set to false due to swap made after the inner loop finishes
                // if a swap is made continue the outer loop if not break below
                noSwaps=false;
            }
        }
        // if the array is mostly sorted you don't want the algo to run needlessly,
        //to prevent that, you determine if there were swaps the previous iteration in the outer loop. if that is the case that means that the array has been sorted, and the algo should end
        // this conditional runs after every iteration of the outer loop essentially
        if(noSwaps) break
    }
    return arr
}
//////////////////////////////////////////////////////////////////////////////////////

//selectionSort algo with quadratic time complexity of 0(n^2) 
//establishes the lowest as the initial index, then compares every other element iteratively and if a small value is found
//it will swap the values by referencing the indexes.
//the inner loop does not compare the previous or current index by adding one to i in the outer loop.
//i moves the comparison along and the inner loop does the comparing

const selectionSort = (arr) => {
    // create noSwaps variable to determine if there were any swaps during the inner loop
    let noSwaps;
    for(let i = 0; i<arr.length;i++){
        //store the index of the lowest element
        let lowest = i;
        //function used to swap i and lowest in the arr
        const swap = (arr, idx1, idx2) => {
        [arr[idx1],arr[idx2]] = [arr[idx2],arr[idx1]];
    };
        //i+1 because you don't want to compare i to itself or to what has already been sorted
        for(let j=i+1;j<arr.length;j++){
            // demonstrates that you compare each iteration in j to every one iteration of the outer loop i
            console.log(i,j)
            //compare arr at lowest to arr at j. if j is smaller you store index of j in lowest
            if(arr[j]<arr[lowest]) {
                //assign j to lowest
                lowest = j;

            }
        }
        //old way of swapping
        // let temp =arr[i];
        // arr[i]=arr[lowest];
        // arr[lowest] = temp;
        //after the completion of each inner loop you call swap function to assign the lowest number to the 
        // index at the current iteration of i
        //every pass will be a new iteration of i which will then store the new lowest number in that iteration of i
        // if the lower indexes in the array are presorted to prevent the lowest amount being equal to i and having a pointless swap 
        if(i!==lowest)swap(arr,i,lowest)

    }

    return arr;
}
////////////////////////////////////////////////////////////////////////////////////////
//insertion sort algo
//sort the left half as you iterate through with the current element
//essentially you compare the previous element with the current one.
//if it is bigger, you swap. do this until the previous element is smaller
//quadratic time complexity
const insertionSort = (arr) => {
    for(let i = 1; i<arr.length;i++){
        //keep track of the current element
        let currentVal = arr[i];
        // you want to compare i to the previous element so you start j at i-1
        //j will never start at zero because i starts at 1. it's ok to go to zero because the index starts there
        // and if arr[j] is greater than currentval, breaks out of loop if that is not the case
        //the currentVal is then inserted into j+1 if it breaks out of loop because it doesn't match that conditional
        //use var to get out of lexical scoping bound by let
        for(var j=i-1;j>=0&&arr[j]>currentVal;j--){
        //compare the current value of i to every value in j and do so till j reaches zero
        currentVal<arr[j]
        //if the value is of the element at j is greater you move it up to the current spot that j+1 is at in the iteration
        //because as you proceed down the iteration in the inner loop you are comparing every j element to the i element
        //which means that i is moving down the array but is being represented by j+1. and if it fits the conditional it
        //moves up to the j+1 spot. if not you insert arr[i] into that spot
        arr[j+1]=arr[j]
        }
        //if currentval is bigger it breaks out of the loop and is inserted into j+1
        arr[j+1]=currentVal
    }
    return arr;
}
///////////////////////////////////////////////////////////////////////////////////////
//mergeSort algo with a runtime of 0(nlogn) which is 2 to what power gives you the number of elements that you split
//into gives you log n decompositions
// n is the comparisons when merging with the merge algo
//has a space complexity of 0(n) because of the number of arrays that need to be stored
//works by breaking an array into individual elements in their own arrays
//the idea is that one or no elements in an array is sorted in itself
//you therefore merge these sorted arrays and sort them as you merge them back up to the original array
//when merging if the if the value in the first array is smaller than the one in the second push it onto the 
//new array and continue in the first array
//if the value is larger push the value in the second array into the new array and continue in the second array
//you essentially compare the value in array with the smaller value with the value in the other array. that value 
//is compared to until it is smaller, and you then flip to the other and so on.
//because of that approach you're constantly going about the arrays with the smaller side
// compare to the larger side. if you've exhausted one array, push the remaining values in the other array in the array
// that works because the side that is exhausted is smaller than the remaining sorted values on the other array
const mergeSort = (arr) =>{

    const merge = (arr1,arr2) =>{
        //sorted array
        let results = [];
        //pointers for the indexes of the arrays
        let i = 0;
        let j = 0;
        while(i<arr1.length && j<arr2.length){
            //if element in first array is smaller, push onto new array
            if(arr1[i]<arr2[j]){
                results.push(arr1[i]);
                //increase i and reenter while loop to compare again with previous j
                i++;
            }
            else{
                //else if element in second array is smaller, push onto new array
                results.push(arr2[j]);
                //increase j and reenter while loop to compare again with previous i
                j++;
            }
        }
        //if one loop has completed you must finish adding the other loop to the results array
        //this will run if i is less than the length of arr1
        while(i<arr1.length){
            results.push(arr1[i])
            i++
        }
        // this will run if j is less than the length of arr2
        while(j<arr2.length){
            results.push(arr2[j])
            j++
        }
        //return new array
        return results
    } 
    //edge case for this recursive function
    //if the array is less than or equal to 1, return the arr and the recursion will stop
    //the recursion works by having the left proceed all the way down till it reaches the edge case
    //right has to wait until the left returns an edge case before it can proceed,
    //once each returns an edge case merge(left, right)
    if(arr.length<=1) return arr;
    //find the midpoint of the array, and every subsequent array that is divided via recursion in this function 
    let mid = Math.floor(arr.length/2)
    //assign the left half
    // mergeSort(left) call recursively which divides it by two until you reach the edge case
    //left progresses all the way to the edge case until it returns something
    let left = mergeSort(arr.slice(0,mid));
    //assign the right half
    //mergeSort(right) call recursively which divids it by two until you reach the edge case
    //right recursion has to wait for left recursion to reach the edge case before it can proceed
    let right = mergeSort(arr.slice(mid));
    return merge(left,right)
}
    //RUN DOWN OF RECURSION
    //mergesort([10,24,76,73])
    //mid divides it into [10,24] and [76,73]
    //left= mergeSort[10,24] runs first, right waits with [76,73]
    //mid again divides into [10] and [24]
    //left =mergeSort([10]) right waits with [24]
    //edge case met and [10] returns and is assigned to left
    //right runs now
    // right = mergeSort([24])
    //edge case met and [24] returns and is assigned to the right
    //now left and right have finished their recursion and the func can proceed
    //now run the merge function on the two returned arrays merge([10],[24])
    // [10,24] is returned all the way back to the left that has left = mergeSort([10,24]) run and now assigned to left
    // now right side [76,73] of the initial mid can run
    //mid again divides it into [76] and [73]
    //left is run left=mereSort([76]) while right waits to run [73]
    // edge case is met and returns [76] and is assigned to the left
    //now right runs right = mergeSort([73])
    // edge case is met and returns [73] and is assigned to right
    // now left and right have finished their recursion and the func can proceed
    //now run the merge function on the two returned arrays merge([76,73])
    //[73,76] is returned all the way back to the right variable that has right = mergeSort([76,73])
    //now that the recursion has completed for both left and right
    //run the merge function on left and right merge([10,24],[73,76])
    //[10,24,73,76] is returned to mergeSort([10,24,76,73])
    
//////////////////////////////////////////////////////////////////////////////////////
// print object to dom
// document.querySelector('.algo').innerHTML=`The count is: ${JSON.stringify(charCount('Titan!!'))}`;
// docum ent.querySelector('.algo').innerHTML=same([1,2,3],[1,4,9,])
// document.querySelector('.algo').innerHTML=validAnagram('cinema','iceman')
// document.querySelector('.algo').innerHTML=sumZero([-4,-3,-2,1,0,1,2,3,10])
// document.querySelector('.algo').innerHTML=countUniqueValues([-4,-3,-2,-1,0,1,2,3,10])
// document.querySelector('.algo').innerHTML=maxSubarraySum([-4,-3,-2,-1,0,1,2,3,10],4)
// document.querySelector('.algo').innerHTML=maxSubarraySum([-4,-3,-2,-1,0,1,2,3,10],4)
// document.querySelector('.algo').innerHTML=countDown(5)
// document.querySelector('.algo').innerHTML=factorial(5)
// document.querySelector('.algo').innerHTML=JSON.stringify(collectOdds([1,2,3,4,5]))
// document.querySelector('.algo').innerHTML=binarySearch([2,5,6,9,13,15,28,30],2)
// document.querySelector('.algo').innerHTML=naiveSearch('lorie loled', 'lol')
// document.querySelector('.algo').innerHTML=JSON.stringify(bubbleSort([8,1,2,3,4,5,6,7]))
// document.querySelector('.algo').innerHTML=JSON.stringify(selectionSort([34,22,10,19,17]))
// document.querySelector('.algo').innerHTML=JSON.stringify(insertionSort([2,1,9,76,4]))
document.querySelector('.algo').innerHTML=JSON.stringify(mergeSort([10,24,76,73]))