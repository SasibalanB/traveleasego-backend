import { Router } from "express";

const router = Router();

/**
 * GET /api/flights/search
 * Mock flight search
 */
router.get("/search", (req, res) => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ message: "Missing origin or destination" });
  }

  return res.json({
    flights: [
      {
        id: 1,
        origin,
        destination,
        airline: "IndiGo",
        price: 5200,
      },
      {
        id: 2,
        origin,
        destination,
        airline: "Air India",
        price: 6100,
      },
      {
        id: 3,
        origin,
        destination,
        airline: "Vistara",
        price: 6900,
      },
    ],
  });
});

export default router;
