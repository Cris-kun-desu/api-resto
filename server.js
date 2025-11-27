require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db.js");

const app = express();
const PORT = process.env.PORT || 3300;

app.use(cors());
app.use(express.json());

// routes
app.get("/status", (req, res) => {
  res.json({ ok: true, service: "resto-api" });
});

// route get
app.get("/resto", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM resto ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// route get/id
app.get("/resto/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query("SELECT * FROM resto WHERE id = $1", [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// route post
app.post("/resto", async (req, res) => {
  try {
    const { details, pricing, stock } = req.body;
    if (!details || !pricing || !stock) {
      return res.status(400).json({ error: "Data tidak lengkap" });
    }
    const result = await db.query(
      "INSERT INTO resto (details, pricing, stock) VALUES ($1, $2, $3) RETURNING *",
      [details, pricing, stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// route put/id
app.put("/resto/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { details, pricing, stock } = req.body;

    if (!details || !pricing || !stock) {
      return res
        .status(400)
        .json({ error: "details, pricing, dan stock wajib diisi" });
    }

    const check = await db.query("SELECT * FROM resto WHERE id = $1", [id]);

    if (check.rowCount === 0) {
      return res.status(404).json({ error: "Item tidak ditemukan" });
    }

    const result = await db.query(
      "UPDATE resto SET details = $1, pricing = $2, stock = $3 WHERE id = $4 RETURNING *",
      [details, pricing, stock, id]
    );

    res.json({
      message: "Item berhasil diupdate",
      Item: result.rows[0],
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Gagal mengupdate item" });
  }
});

// route delete/id
app.delete("/resto/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query(
      "DELETE FROM resto WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item tidak ditemukan" });
    }
    res.json({
      message: "Item berhasil dihapus",
      id: result.rows[0].id,
      details: result.rows[0].details,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// fallback dan error handling
app.use((req, res) => {
  res.status(404).json({ error: "Rute tidak ditemukan" });
});

app.use((err, req, res, next) => {
  console.error(err); // tampilkan error asli
  res.status(500).json({
    error: err.message,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
