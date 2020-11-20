import { Router } from 'express';
import userRoutes from './user-routes';
import authRoutes from './auth-routes';
import articleRoutes from './article-routes';

class IndexRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  protected routes(): void {
    this.router.use('/api/v1/auth', authRoutes);
    this.router.use('/api/v1/users', userRoutes);
    this.router.use('/api/v1/articles', articleRoutes);
  }
}

export default IndexRoutes
