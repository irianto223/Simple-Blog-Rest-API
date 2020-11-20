import articleController from '../controllers/article-controller';
import BaseRoutes from './base-routes';
import { auth, checkRoles, checkAccesses, articleOwnerOrArticleAdminUpdate } from '../middlewares/auth-middleware';
import { ACCESSES } from '../shared/constant';

class ArticleRoutes extends BaseRoutes {
  routes(): void {
    this.router.get('/', articleController.list);
    this.router.get('/:id', articleController.detail);
    this.router.post('/', auth, checkAccesses([ACCESSES.ArticleStore]), articleController.create);
    this.router.put('/:id', auth, checkAccesses([ACCESSES.ArticleOwnerUpdate, ACCESSES.ArticleAdminUpdate]), articleOwnerOrArticleAdminUpdate, articleController.update);
    this.router.delete('/:id', articleController.delete);
  }
}

export default new ArticleRoutes().router;
