//Trapping rainwater
function rainWater(arr){
	let left = [], right = [], output = 0;
  let n = arr.length;
  left[0] = arr[0];
  right[n-1] = arr[n-1];
  for(let i = 1; i < n; i++){
  	left[i] = max(left[i-1], arr[i])
  }
  for(let i = n - 2; i >= 0; i--){
  	right[i] = max(right[i+1], arr[i])
  }
  console.log(left, right)
  for(let j = 1; j < n -1; j++){
  	if(arr[j] < min(left[j-1], right[j+1])){
    	output+= min(left[j-1], right[j+1]) - arr[j];
    }
  }
  console.log(output)
  return;
}

//Subarray that has given Sum
function subArraySum(arr, sum){
	let n = arr.length;
	let start = 0, currentSum = arr[0], i;
  for(i = 1; i <= n; i++){
  	while(currentSum > sum && start < arr[i-1]){
    	currentSum -= arr[start]
      start++;
    }
  	if(currentSum === sum){
    	console.log("Indexes are", start, " and ", i-1)
      return;
    }
    if(i < n)
    	currentSum += arr[i]
  }
  console.log("No subarray")
  return
}

//Largest sum subarray and its indexes - Kadane's Algo
function largestSumSubarray(arr){
	let n = arr.length;
  let max_so_far = Number.NEGATIVE_INFINITY, max_ending_here = 0, start = 0, s = 0, end;
  
  for(let i = 0; i< n; i++){
  	max_ending_here += arr[i]
  	if(max_ending_here > max_so_far){
    	max_so_far = max_ending_here
      end = i
    }
    if(max_ending_here < 0){
    	max_ending_here = 0
      start = i+1
    }
  }
  console.log(max_so_far, start, end)
  return
}

//1768. Merge Strings Alternately
var mergeAlternately = function(word1, word2) {
    let output = []
    const arr1 = word1.split("")
    const arr2 = word2.split("")
    let j = 0, k = 0
    for(let i = 0; i < 2 * Math.min(arr1.length, arr2. length); i++){
        if(i % 2 === 0){
            output.push(arr1[j])
            j++;
        }
        else{
            output.push(arr2[k])
            k++;
        }
    }
    if(j === arr1.length){
        for(; k < arr2.length; k++)
            output.push(arr2[k])
    }else{
        for(; j < arr1.length; j++)
            output.push(arr1[j])
    }
    return output.join("")
};

//Reverse Linked List
reverseList(head)
    {
        //your code here
        var prev = null
        var next = null
        var curr = head
        
        while(curr !== null){
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        
        head = prev;
        return head
    }
