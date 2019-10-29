import { useKoaServer } from 'routing-controllers';
import { join } from 'path';

export function initializeRouter(app) {
  useKoaServer(app, {
    routePrefix: '/api',
    defaultErrorHandler: true,
    validation: { validationError: { target: false } },
    controllers: [join(__dirname, '../controllers/**/*.ts')],
  });
}
