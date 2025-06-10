const request = require('supertest');
const express = require('express');
const router = require('../routes/infos.js'); // Importez le fichier des routes
const db = require('../utils/db.js'); // Mockez la base de données

jest.mock('../utils/db.js'); // Mock de la base de données

const app = express();
app.use(express.json());
app.use('/iot', router);

describe('Tests des routes /iot', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /iot - Récupérer les dernières données IoT', async () => {
    db.all.mockImplementation((sql, params, callback) => {
      callback(null, [
        { device_id: 1, temperature: 22, humidity: 50, timestamp: '2023-01-01T00:00:00Z', type: 'sensor' }
      ]);
    });

    const response = await request(app).get('/iot');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { device_id: 1, temperature: 22, humidity: 50, timestamp: '2023-01-01T00:00:00Z', type: 'sensor' }
    ]);
  });

  test('POST /iot - Ajouter des données IoT', async () => {
    db.run.mockImplementation((query, params, callback) => {
      callback(null);
    });

    const newData = {
      device_id: 1,
      temperature: 25,
      humidity: 60,
      timestamp: '2023-01-01T12:00:00Z',
      type: 'sensor'
    };

    const response = await request(app).post('/iot').send(newData);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newData);
  });

  test('GET /iot/data - Récupérer les données par device_id', async () => {
    db.all.mockImplementation((sql, params, callback) => {
      callback(null, [
        { id: 1, device_id: 1, temperature: 22, humidity: 50, timestamp: '2023-01-01T00:00:00Z', type: 'sensor' }
      ]);
    });

    const response = await request(app).get('/iot/data').query({ device_id: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, device_id: 1, temperature: 22, humidity: 50, timestamp: '2023-01-01T00:00:00Z', type: 'sensor' }
    ]);
  });

  test('GET /iot/data - Erreur si device_id manquant', async () => {
    const response = await request(app).get('/iot/data');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Paramètre \'device_id\' obligatoire.' });
  });
});