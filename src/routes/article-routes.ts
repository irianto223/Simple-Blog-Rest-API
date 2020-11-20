import articleController from '../controllers/article-controller';
import BaseRoutes from './base-routes';
import { auth } from '../middlewares/auth-middleware';

class ArticleRoutes extends BaseRoutes {
  routes(): void {
    this.router.get('/', auth, articleController.list);
    this.router.get('/:id', articleController.detail);
    this.router.post('/', articleController.create);
    this.router.put('/:id', articleController.update);
    this.router.delete('/:id', articleController.delete);
  }
}

export default new ArticleRoutes().router;
