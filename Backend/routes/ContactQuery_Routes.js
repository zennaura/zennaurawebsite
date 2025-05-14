const express = require('express');
const router = express.Router();
const ContactQuery = require('../model/ContactQuery');


router.post('/', async (req, res) => {
  try {
    const { firstname, lastname, email, phone, subject, message } = req.body;

    const newQuery = new ContactQuery({
      firstname,
      lastname,
      email,
      phone,
      subject,
      message,
    });

    await newQuery.save();

    res.status(201).json({ message: 'Query submitted successfully' });
  } catch (err) {
    console.error('Error saving contact query:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.get("/fetchqueries", async (req, res) => {
  const queries = await ContactQuery.find();
  res.json(queries);
});


router.get("/unreplied", async (req, res) => {
  try {
    const unrepliedQueries = await ContactQuery.find({ replied: false }).sort({ createdAt: -1 });
    res.json(unrepliedQueries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact queries", error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await ContactQuery.findByIdAndUpdate(
      req.params.id,
      { replied: req.body.replied },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});


module.exports = router;
