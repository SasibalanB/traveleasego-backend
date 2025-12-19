import { Router } from "express";
import prisma from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";

const router = Router();

/**
 * POST /api/bookings
 * Create a booking (auth required)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    // 🔒 HARD GUARD (fixes TypeScript + security)
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { airline, origin, destination, price, travelDate } = req.body;

    if (!airline || !origin || !destination || !price || !travelDate) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const booking = await prisma.booking.create({
      data: {
        userId, // ✅ now guaranteed string
        airline,
        origin,
        destination,
        price: Number(price),
        travelDate: new Date(travelDate),
      },
    });

    res.json({ success: true, booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Booking failed" });
  }
});

/**
 * GET /api/bookings
 * Get user bookings
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

export default router;
