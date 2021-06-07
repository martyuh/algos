
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
document.querySelector('.algo').innerHTML=JSON.stringify(collectOdds([1,2,3,4,5]))
