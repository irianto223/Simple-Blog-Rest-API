import { Router } from 'express';

interface IRoute {
  router: Router;
  routes(): void;
}

export default IRoute;
