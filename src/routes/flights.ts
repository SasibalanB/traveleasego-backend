import { Router } from "express";

const router = Router();

/**
 * GET /api/flights/search
 * Query params:
 *  - origin
 *  - destination
 *  - date (ISO string)
 *  - passengers
 */
router.get("/search", async (req, res) => {
  const { origin, destination, date, passengers } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({
      message: "origin and destination are required",
    });
  }

  // Normalize inputs
  const from = String(origin).toUpperCase();
  const to = String(destination).toUpperCase();
  const pax = passengers ? Number(passengers) : 1;

  // (Mock logic for now – real APIs later)
  const baseFlights = [
    { airline: "IndiGo", price: 5200 },
    { airline: "Air India", price: 6100 },
    { airline: "Vistara", price: 6900 },
  ];

  // Simple pricing logic
  const flights = baseFlights.map((f, index) => ({
    id: index + 1,
    origin: from,
    destination: to,
    airline: f.airline,
    price: f.price * pax,
    date: date || new Date().toISOString(),
  }));

  return res.json({ flights });
});

export default router;
