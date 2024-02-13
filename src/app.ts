import express from 'express';
import { Request,Response } from 'express';
import { env } from './config/config';
import { connect } from './utils/Database/db';
import { routes } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { deserializeToken } from './middleware/token.middleware';

const PORT = env.PORT;

const app = express();
app.use(express.json());

app.use(deserializeToken);
routes(app);
app.use(errorHandler);


app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`);
    connect();
})



