import { PaginatedResourceType } from '../domain';
import { PaginatedResourcePresenter } from './paginated-resource.precenter';
export const paginatedResourceHelper = <T, P>(
  paginatedResource: PaginatedResourceType<T>,
  Presenter: new (resource: T) => P,
): PaginatedResourcePresenter<P> => {
  return new PaginatedResourcePresenter<P>({
    ...paginatedResource,
    items: paginatedResource.items.map((resource) => new Presenter(resource)),
  });
};
