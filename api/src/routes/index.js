const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const country = require('./getCountryes')
const actividades = require('./postActiv')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', country)
router.use('/activity', actividades)

module.exports = router;