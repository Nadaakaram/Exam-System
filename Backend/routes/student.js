const express = require('express');
const router = express.Router();
const Student = require('../models/User');
const ExamResult = require('../models/Result');

router.get('/students-with-exams', async (req, res) => {
  try {
    const students = await Student.find({});
    const results = await ExamResult.find({});

    const studentData = students.map(student => {
      const exams = results.filter(r => r.studentId.toString() === student._id.toString());
      return {
        ...student._doc,
        exams: exams.map(e => ({ name: e.examName, score: e.score }))
      };
    });

    res.json(studentData);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching student data' });
  }
});

module.exports = router;
