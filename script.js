function isPrime(num) {
  if (num == 2) {
    return true
  }
  if (num % 2 == 0 || num == 1) {
    return false
  }
  for (let i = 3; i * i <= num; i += 2) {
    if (num % i == 0) {
      return false
    }
  }
  return true
}

function factorial(num) {
  return num ? num * factorial(num - 1) : 1
}

function fib(num) {
  return num <= 1 ? num : fib(num - 1) + fib(num - 2)
}

function isSorted(arr) {
  let origArr = arr.concat()
  arr.sort((a, b) => a - b)
  if (origArr.toString() === arr.toString()) {
    return true
  }
  return false
}

function reverse(str) {
  let strArr = str.split("")
  let result = ""
  for (let i = str.length - 1; i >= 0; --i) {
    result = result + strArr[i]
  }
  return result
}

function indexOf(arr, value) {
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] === value) {
      return i
    }
  }
  return -1
}

function isPalindrome(str) {
  let origStr = str
    .toLowerCase()
    .split(" ")
    .join("")
    .split("")
  let reverseStr = str
    .toLowerCase()
    .split(" ")
    .join("")
    .split("")
    .reverse()
  if (origStr.toString() === reverseStr.toString()) {
    return true
  }
  return false
}

function missing(arr) {
  let n = arr.length
  if (n === 0) {
    return
  }
  let totalSum = ((n + 1) * (n + 2)) / 2
  let arrSum = arr.reduce((sum, current) => sum + current)
  let result = totalSum - arrSum
  arr.sort((a, b) => a - b)
  if (result > arr[n - 1]) {
    return
  }
  return result
}

function isBalanced(str) {
  const open = "{"
  const close = "}"
  let calcOpen = 0
  let calcClose = 0
  for (item of str) {
    if (item === open) {
      if (calcClose > 0) {
        return false
      }
      ++calcOpen
    }
    if (item === close) {
      ++calcClose
    }
  }
  return calcOpen === calcClose
}
