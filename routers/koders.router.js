import express from 'express'

const router = express.Router()

router.use((request, response, next) => {
    console.log('Este es un middleware a nivel de router');
    next()
})

router.get('/',(request, response, next) => {
    console.log('Este es un middleware del endpoint GET/ koders');
next()
}
, (request, response) => {
    response.json({
        mesage: 'Aqui estarán todos los koders'
    })
})

router.post ('/', (request, response) => {
    response.json({
        mesage: 'Aqui se crearán koders'
    })
})

export default router