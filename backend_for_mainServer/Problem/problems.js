const Problems  = [
    {
      problemId: "1",
      title: "401. Bitwise AND of Numbers Range",
      difficulty: "Medium",
      acceptance: "42%",
      description:
        "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
      exampleIn: "left = 5, right = 7",
      exampleOut: "4",
      testCases: {
        Cases: [
          { input: '5 7', expectedOutput: '4' },
          { input: '10 20', expectedOutput: '0' },
          { input: '-2 7', expectedOutput: '0' },
          { input: '12345 67890', expectedOutput: '67840'},
        ],
      }
    },
    {
      problemId: "2",
      title: "205. Add two numbers",
      difficulty: "Medium",
      acceptance: "41%",
      description:
        "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
      exampleIn: "a = 100 , b = 200",
      exampleOut: "300",
      testCases: {
        Cases: [
          { input: '3 5', expectedOutput: '8' },
          { input: '10 20', expectedOutput: '30' },
          { input: '-2 7', expectedOutput: '5' },
        ],
      }
    },
    {
      problemId: "3",
      title: "202. Happy Number",
      difficulty: "Easy",
      acceptance: "54.9%",
      description: "Write an algorithm to determine if a number n is happy.",
      exampleIn: "n = 19",
      exampleOut: "true",
      testCases: {
        Cases: [
          { input: '3', expectedOutput: 'true' },
          { input: '5', expectedOutput: 'false' },
          { input: '8', expectedOutput: 'true' },
          { input: '10', expectedOutput: 'true' },
          { input: '20', expectedOutput: 'false' },
          { input: '-2', expectedOutput: 'false' },
          { input: '7', expectedOutput: 'true' },
        ],
      }
    },
    {
      problemId: "4",
      title: "203. Remove Linked List Elements",
      difficulty: "Hard",
      acceptance: "42%",
      description: "Given number k , removed kth element",
      exampleIn: "list: 1->2->3 , k=2",
      exampleOut: "1->3",
      testCases: {
        Cases: [
          { input: '1 2 3 \n 2', expectedOutput: '1 3' },
          { input: '10 20 30 40 \n 3', expectedOutput: '10 20 40' },
          { input: '-2 0 2 4 6 \n 3', expectedOutput: '-2 0 4 6' },
          { input: '5 \n 0', expectedOutput: '5' },
          { input: '7 8 9 \n 2', expectedOutput: '7 9'},
        ],
      }
    },
    {
      problemId: "5",
      title: "201. Bitwise AND of Numbers Range",
      difficulty: "Medium",
      acceptance: "42%",
      description:
        "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
      exampleIn: "left = 5, right = 7",
      exampleOut: "4",
    },
    {
      problemId: "6",
      title: "205. Add two numbers",
      difficulty: "Medium",
      acceptance: "41%",
      description:
        "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
      exampleIn: "a = 100 , b = 200",
      exampleOut: "300",
    },
    {
      problemId: "7",
      title: "202. Happy Number",
      difficulty: "Easy",
      acceptance: "54.9%",
      description: "Write an algorithm to determine if a number n is happy.",
      exampleIn: "n = 19",
      exampleOut: "true",
    },
    {
      problemId: "8",
      title: "203. Remove Linked List Elements",
      difficulty: "Hard",
      acceptance: "42%",
      description: "Given number k , removed kth element",
      exampleIn: "list: 1->2->3 , k=2",
      exampleOut: "1->3",
    },
  ];


module.exports = {
  Problems 
}