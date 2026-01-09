import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Actors, ActorsRelations, Films, Filmsactors} from '../models';
import {FilmsactorsRepository} from './filmsactors.repository';
import {FilmsRepository} from './films.repository';

export class ActorsRepository extends DefaultCrudRepository<
  Actors,
  typeof Actors.prototype.id,
  ActorsRelations
> {

  public readonly films: HasManyThroughRepositoryFactory<Films, typeof Films.prototype.id,
          Filmsactors,
          typeof Actors.prototype.id
        >;


  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('FilmsactorsRepository') protected filmsactorsRepositoryGetter: Getter<FilmsactorsRepository>, @repository.getter('FilmsRepository') protected filmsRepositoryGetter: Getter<FilmsRepository>,
  ) {
    super(Actors, dataSource);
    this.films = this.createHasManyThroughRepositoryFactoryFor('films', filmsRepositoryGetter, filmsactorsRepositoryGetter,);
    this.registerInclusionResolver('films', this.films.inclusionResolver);
  }
}
