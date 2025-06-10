const express = require('express');
const db = require('../utils/db');
const router = express.Router();

/**
 * @swagger
 * /iot:
 *   get:
 *     summary: Récupérer les IoT avec la dernier donnée
 *     parameters:
 *       - in: query
 *         name: last_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID de départ pour récupérer les 20 enregistrements suivants (par ID croissant)
 *     responses:
 *       200:
 *         description: Liste des données IoT
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Info'
 */

router.get('/', (req, res) => {
  let sql = `
        SELECT i.device_id, i.temperature, i.humidity, i.timestamp, i.type
        FROM infos i
        INNER JOIN (
            SELECT device_id, MAX(timestamp) AS max_timestamp
            FROM infos
            GROUP BY device_id
        ) latest ON i.device_id = latest.device_id AND i.timestamp = latest.max_timestamp
		ORDER BY 1;
    `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

/**
 * @swagger
 * /iot/data:
 *   get:
 *     summary: Récupérer les données par IoT 
 *     parameters:
 *       - in: query
 *         name: last_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID de départ pour récupérer les 20 enregistrements suivants (par ID croissant)
 *       - in: query
 *         name: device_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du device
 *     responses:
 *       200:
 *         description: Liste des données IoT
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Info'
 */
router.get('/data', (req, res) => {
  const device_id = req.query.device_id;
  const lastId = req.query.last_id;

  // Vérifie que device_id est fourni
  if (!device_id) {
    return res.status(400).json({ error: 'Paramètre \'device_id\' obligatoire.' });
  }

  let sql;
  let params = [device_id];

  if (lastId) {
    sql = 'SELECT * FROM infos WHERE device_id = ? AND id < ? ORDER BY timestamp DESC LIMIT 20';
    params.push(lastId);
  } else {
    sql = 'SELECT * FROM infos WHERE device_id = ? ORDER BY timestamp DESC LIMIT 20';
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;