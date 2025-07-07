import * as express from 'express';
import * as morgan from "morgan";
import { PORT } from '../config';
import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';
import userRoutes from './routes/user.routes';

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth',authRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/user',userRoutes);

app.get('/', (_req, res) => {
    res.send('API BlogEspel funcionando');
});

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});
