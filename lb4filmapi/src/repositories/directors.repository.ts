import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Directors, DirectorsRelations, Films} from '../models';
import {FilmsRepository} from './films.repository';

export class DirectorsRepository extends DefaultCrudRepository<
  Directors,
  typeof Directors.prototype.id,
  DirectorsRelations
> {

  public readonly films: HasManyRepositoryFactory<Films, typeof Directors.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('FilmsRepository') protected filmsRepositoryGetter: Getter<FilmsRepository>,
  ) {
    super(Directors, dataSource);
    this.films = this.createHasManyRepositoryFactoryFor('films', filmsRepositoryGetter,);
    this.registerInclusionResolver('films', this.films.inclusionResolver);
  }
}
