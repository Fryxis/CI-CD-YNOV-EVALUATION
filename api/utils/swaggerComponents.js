/**
 * @swagger
 * components:
 *   schemas:
 *     Info:
 *       type: object
 *       properties:
 *         device_id:
 *           type: string
 *         temperature:
 *           type: number
 *         humidity:
 *           type: number
 *         timestamp:
 *           type: string
 *           format: date-time
 *         type:
 *           type: string
 *       required:
 *         - device_id
 *         - temperature
 *         - humidity
 *         - timestamp
 *         - type
 */