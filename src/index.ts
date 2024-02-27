import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import UserRoutes from './routes/user.routes'
import ProductRoutes from './routes/product.routes'
import saleRoutes from './routes/sale.routes'


import 'dotenv/config'

class Server {
  private app: express.Application

  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  routes() {
    this.app.use('/user', UserRoutes)
    this.app.use('/product', ProductRoutes)
    this.app.use('/sale', saleRoutes)
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(helmet())
  }

  start() {
    this.app.listen(process.env.PORT, () => {
      console.log('Server is running on port 4000')
    })
  }
}


const server = new Server()
server.start()

