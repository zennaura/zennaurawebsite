const express = require('express');
const Coupon = require('../model/Coupon');
const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { code, discount, expiryDate, oneTimePerUser, minCartValue } = req.body;


    if (!code || !discount || !expiryDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if coupon code already exists
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(409).json({ message: "Coupon code already exists" });
    }

    const coupon = new Coupon({
      code,
      discount,
      expiryDate,
      oneTimePerUser: oneTimePerUser || false,
      minCartValue: minCartValue || 0
    });

    const savedCoupon = await coupon.save();
    res.status(201).json({ message: "Coupon created successfully", coupon: savedCoupon });
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/allcoupons', async (req, res) => {
  try {
    const currentDate = new Date();
    const coupons = await Coupon.find({ expiryDate: { $gt: currentDate } })
      .sort({ createdAt: -1 });
    res.status(200).json(coupons);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search and validate coupon
router.get('/searchcoupon', async (req, res) => {
  try {
    const { code, userId, cartValue } = req.query;

    if (!code) {
      return res.status(400).json({ message: 'Coupon code is required' });
    }

    if (!userId) {
      return res.status(400).json({ 
        message: 'You need to be logged in to use coupons',
        requiresLogin: true
      });
    }

    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    // Check if coupon is expired
    const currentDate = new Date();
    const isExpired = currentDate > coupon.expiryDate;

    if (!coupon.isActive || isExpired) {
      return res.status(400).json({ 
        message: isExpired ? 'Coupon has expired' : 'Coupon is not active',
        isActive: false
      });
    }

    // Check if user has already used this coupon
    let alreadyUsed = false;
    if (coupon.oneTimePerUser) {
      alreadyUsed = coupon.usedByUsers?.includes(userId);
    }

    // Check minCartValue
    if (typeof coupon.minCartValue === 'number' && Number(cartValue) < coupon.minCartValue) {
      return res.status(400).json({
        message: `Cart value must be at least ${coupon.minCartValue} to use this coupon`,
        minCartValue: coupon.minCartValue,
        isValid: false
      });
    }

    res.status(200).json({
      code: coupon.code,
      discount: coupon.discount,
      maxDiscount: coupon.maxDiscount,
      minOrder: coupon.minOrder,
      expiryDate: coupon.expiryDate,
      isActive: coupon.isActive,
      alreadyUsed,
      isValid: true
    });

  } catch (error) {
    console.error('Error searching coupon:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark a coupon as used by a user
router.put('/use', async (req, res) => {
  try {
    const { code, userId } = req.body;

    if (!code || !userId) {
      return res.status(400).json({ message: 'Coupon code and userId are required' });
    }

    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    // Check if already used by this user
    if (coupon.oneTimePerUser && coupon.usedByUsers?.includes(userId)) {
      return res.status(400).json({ message: 'Coupon already used by this user' });
    }

    // Check if coupon is active and not expired
    const currentDate = new Date();
    const isExpired = currentDate > coupon.expiryDate;

    if (!coupon.isActive || isExpired) {
      return res.status(400).json({
        message: isExpired ? 'Coupon has expired' : 'Coupon is not active',
        isActive: false
      });
    }

    // Add userId to usedByUsers
    if (coupon.oneTimePerUser) {
      coupon.usedByUsers.push(userId);
    }
    await coupon.save();

    res.status(200).json({ 
      success: true,
      message: 'Coupon marked as used', 
      coupon 
    });

  } catch (error) {
    console.error('Error updating coupon usage:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.patch('/toggle/:id', async (req, res) => {
  try {
    const couponId = req.params.id;
    const { isActive } = req.body;

    const coupon = await Coupon.findByIdAndUpdate(
      couponId,
      { isActive },
      { new: true }
    );

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json(coupon);
  } catch (error) {
    console.error('Error toggling coupon status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/update/:id', async (req, res) => {
  try {
    const couponId = req.params.id;
    const updates = req.body;

    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json(updatedCoupon);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const couponId = req.params.id;
    const updates = req.body;

    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json(updatedCoupon);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/delete/:id', async (req, res) => {
  const couponId = req.params.id;

  try {
    // Find the coupon by ID and remove it from the database
    const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

    if (!deletedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    // Respond with success
    res.status(200).json({ message: 'Coupon deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;


