const Booking = require('../models/booking');

exports.createBooking = async (req, res) => {
  const { userId, vehicleId, serviceId, appointmentDate } = req.body;

  try {
    const newBooking = new Booking({
      userId,
      vehicleId,
      serviceId,
      appointmentDate,
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: 'Error creating booking', error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId vehicleId serviceId');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving bookings', error: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('userId vehicleId serviceId');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving booking', error: err.message });
  }
};

exports.updateBooking = async (req, res) => {
  const { status } = req.body;

  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking updated', booking });
  } catch (err) {
    res.status(500).json({ message: 'Error updating booking', error: err.message });
  }
};
