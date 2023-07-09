const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  problemId: {
    type: String,
    required: true,
    unique: true,
  },
  testCases: [
    {
      input: String,
      expectedOutput: String,
    }
  ],
  code: String,
  language: String,
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;