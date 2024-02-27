//88. Merge Sorted Array
var merge = function(nums1, m, nums2, n) {
    let i, j = 0;
    for(i = 0; i < m+n; i++){
        while(nums1[i] >= nums2[j]){
            nums1.pop()
            nums1.splice(i, 0, nums2[j])
            j++;
            i++;
        }
    }
    i = m + j
    for(;j < n; j++){
        nums1.pop()
        nums1.splice(i, 0, nums2[j])
        i++
    }
    
};

//27. Remove Element
var removeElement = function(nums, val) {
    let count = 0, end;
    nums.sort(function(a, b){
        return a - b
    })
    for(let i = 0; i < nums.length; i++){
        if(nums[i] === val){
            count++;
            end = i
        }
    }
    nums.splice(end - count + 1, count)
};

//26. Remove Duplicates from Sorted Array
var removeDuplicates = function(nums) {
    let count = 1;
    for(let i = 1; i < nums.length; i++){
        if(nums[i] === nums[i-1]){
            nums.splice(i, 1)
            i--;
        }else {
            count++
        }
    }
};

//80. Remove Duplicates from Sorted Array II
var removeDuplicates = function(nums) {
    let count = 2
    for(let i = 1; i < nums.length - 1; i++){
        if(
            nums[i-1] === nums[i] && nums[i+1] !== nums[i] || 
            nums[i-1] !== nums[i] && nums[i+1] === nums[i]
        ){
            ++count;
        } else if(nums[i-1] === nums[i] && nums[i+1] === nums[i]) {
            nums.splice(i,1)
            i--
        } else {
            ++count
        }
    }
    return count
};

//169. Majority Element
var majorityElement = function(nums) {
    nums.sort(function(a,b){
        return(
            a- b
        )
    })
    let max_so_far = 1, max_ending_here = 1, max_value = nums[0]
    for(let i = 1; i < nums.length; i++){
        if(nums[i] === nums[i-1]){
            ++max_ending_here
        }else {
            max_ending_here = 1
        }
        if(max_ending_here > max_so_far){
            max_so_far = max_ending_here
            max_value = nums[i]
        }
  
    }
    return max_value  
};

//189. Rotate Array
var rotate = function(nums, k) {
    k = k % nums.length
    reverseArray(nums, 0, nums.length - 1)
    reverseArray(nums, 0, k - 1)
    reverseArray(nums, k, nums.length - 1)
};

function reverseArray(arr, left, right){
    let temp, i = left, j = right;
    for(; i <= j; i++, j--){
            temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
    }
    return arr
}

//121. Best Time to Buy and Sell Stock
var maxProfit = function(prices) {
    let minIdx = 0
    let maxProfit =  0
    for(let i = 1; i < prices.length; i++){
        if(maxProfit < prices[i] - prices[minIdx]){
            maxProfit = prices[i] - prices[minIdx]
        }

        if(prices[i] < prices[minIdx]){
            minIdx = i
        }
    }
    return maxProfit
};