import { Router } from "express";
router.get("/", (req, res) => {
  const flights = [
    {
      id: 1,
      origin: "DEL",
      destination: "BOM",
      airline: "IndiGo",
      stops: "Non-stop",
      price: 5200,
    },
    {
      id: 2,
      origin: "DEL",
      destination: "BOM",
      airline: "Air India",
      stops: "1 Stop",
      price: 6100,
    },
    {
      id: 3,
      origin: "DEL",
      destination: "BOM",
      airline: "Vistara",
      stops: "Non-stop",
      price: 6900,
    },
  ];

  res.json(flights);
});

const router = Router();

/**
 * GET /api/flights/search
 */
router.get("/search", (req, res) => {
  const {
    origin,
    destination,
    date,
    passengers,
    maxPrice,
    stops,
  } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({
      message: "origin and destination are required",
    });
  }

  const from = String(origin).toUpperCase();
  const to = String(destination).toUpperCase();
  const pax = passengers ? Number(passengers) : 1;

  const baseFlights = [
    { id: 1, airline: "IndiGo", price: 5200, stops: "Non-stop" },
    { id: 2, airline: "Air India", price: 6100, stops: "1 Stop" },
    { id: 3, airline: "Vistara", price: 6900, stops: "Non-stop" },
  ];
	
  let flights = baseFlights.map((f) => ({
    id: f.id,
    origin: from,
    destination: to,
    airline: f.airline,
    stops: f.stops,
    price: f.price * pax,
    date: date || new Date().toISOString(),
  }));

  if (stops) {
    flights = flights.filter((f) => f.stops === stops);
  }

  if (maxPrice) {
    flights = flights.filter(
      (f) => f.price <= Number(maxPrice)
    );
  }

  res.json({ flights });
});

export default router;
