import express from 'express'
import { StatusHttp } from './errorCustom.js'
import kodersRouter from './routers/koders.router.js'

const server = express()

//middlewares
function validOrange (request, response, next){
    console.log('Este es un middleware de aplicaión');
    request.isGoodOrange = true
    if(request.isGoodOrange){
        next()
        return
    }
    response.status(400).json({
        message: 'Ohh no, las naranjas estan muy mal >=|'
    })
     //pasa al siguiente middleware y si no hay al endpoint 
}


server.use(validOrange)


server.use( (request, response, next) => { //el request pasa por todos los middlewares
    console.log('Este es el 2do middleware de aplicaión');
    next()
})

//Routers
server.use('/koders', kodersRouter) 


//Endpoint
server.get('/', (request, response) => {
    try{
        throw new StatusHttp('Ocurrió un error', 500)
        console.log('Desde: GET/');
        console.log(request.oranges);
        response.json({
            message: 'Middlewares en express'
        })
    }catch(error){
        response.status(error.status).json({
            success:false,
            message:error.message
        })
    }
    
})

server.get('/hola', (request, response, next) => {
    try{
        response.json({
            message:'Hola desde express'
        })
    } catch(error){
        /* response.status(400).json({
            success:false,
            message:error.message
        }) */
        next((error))
    }
    
})

function handleErrors (error, request, response){ //en este caso next ya no es necesario ya que se ejecuta después del endpoint 
    response.status(error.status).json({
        succes: false,
        message: 'Server internal error'
    })
}

server.use(handleErrors)

/* 
Un middleware es una función
(request, response, next) => {}
3 niveles de middleware:
1-. Nivel de aplicación o servidor
2-. Nivelde Router
3-. Nivel de endpoint 

nivel app -> server.use(middleware)

*/

//para levantar el servidor
server.listen(8080, () => {
    console.log('Server listening on port 8080');
})