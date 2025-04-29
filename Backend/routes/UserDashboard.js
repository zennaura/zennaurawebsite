const express = require("express");
const router = express.Router();
const User = require("../model/UserRegistration");


// In your backend routes
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const updatedUser = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json({ user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
// In your userDashboardRoutes.js
router.post('/:userId/address', async (req, res) => {
    try {
      const { userId } = req.params;
      const { address } = req.body;
  
      // Validate required fields
      if (!address.addressLine1) { // Make sure this matches your frontend field name
        return res.status(400).json({ message: 'Address Line 1 is required' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Create new address object
      const newAddress = {
        firstName: address.firstName,
        lastName: address.lastName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2 || '', // Handle optional field
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
        isDefault: address.isDefault || false
      };
  
      // If setting as default, update all others
      if (newAddress.isDefault) {
        user.Address.forEach(addr => { addr.isDefault = false; });
      }
  
      user.Address.push(newAddress);
      const updatedUser = await user.save();
  
      res.status(201).json({ 
        message: 'Address added successfully',
        user: updatedUser 
      });
  
    } catch (error) {
      console.error('Error adding address:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

  const bcrypt = require('bcryptjs');

router.put('/:userId/password', async (req, res) => {
    try {
        const { userId } = req.params;
        const { currentPassword, newPassword } = req.body;

        // Validate input
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Both current and new password are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        
        await user.save();
        
        res.json({ message: 'Password updated successfully' });

    } catch (error) {
        console.error('Password change error:', error);
        res.status(500).json({ 
            message: 'Error changing password',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
  module.exports = router;