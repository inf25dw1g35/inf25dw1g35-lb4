import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Genres, GenresRelations, Films} from '../models';
import {FilmsRepository} from './films.repository';

export class GenresRepository extends DefaultCrudRepository<
  Genres,
  typeof Genres.prototype.id,
  GenresRelations
> {

  public readonly films: HasManyRepositoryFactory<Films, typeof Genres.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('FilmsRepository') protected filmsRepositoryGetter: Getter<FilmsRepository>,
  ) {
    super(Genres, dataSource);
    this.films = this.createHasManyRepositoryFactoryFor('films', filmsRepositoryGetter,);
    this.registerInclusionResolver('films', this.films.inclusionResolver);
  }
}
