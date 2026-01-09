import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Films, FilmsRelations, Directors, Genres, Actors, Filmsactors } from '../models';
import { DirectorsRepository } from './directors.repository';
import { GenresRepository } from './genres.repository';
import { FilmsactorsRepository } from './filmsactors.repository';
import { ActorsRepository } from './actors.repository';

export class FilmsRepository extends DefaultCrudRepository<
	Films,
	typeof Films.prototype.id,
	FilmsRelations
> {

	public readonly directors: BelongsToAccessor<Directors, typeof Films.prototype.id>;

	public readonly genres: BelongsToAccessor<Genres, typeof Films.prototype.id>;

  public readonly actors: HasManyThroughRepositoryFactory<Actors, typeof Actors.prototype.id,
          Filmsactors,
          typeof Films.prototype.id
        >;

	constructor(
		@inject('datasources.db') dataSource: DbDataSource, @repository.getter('DirectorsRepository') protected directorsRepositoryGetter: Getter<DirectorsRepository>, @repository.getter('GenresRepository') protected genresRepositoryGetter: Getter<GenresRepository>, @repository.getter('FilmsactorsRepository') protected filmsactorsRepositoryGetter: Getter<FilmsactorsRepository>, @repository.getter('ActorsRepository') protected actorsRepositoryGetter: Getter<ActorsRepository>,
	) {
		super(Films, dataSource);
    this.actors = this.createHasManyThroughRepositoryFactoryFor('actors', actorsRepositoryGetter, filmsactorsRepositoryGetter,);
    this.registerInclusionResolver('actors', this.actors.inclusionResolver);
		this.genres = this.createBelongsToAccessorFor('genres', genresRepositoryGetter,);
		this.registerInclusionResolver('genres', this.genres.inclusionResolver);
		this.directors = this.createBelongsToAccessorFor('directors', directorsRepositoryGetter,);
		this.registerInclusionResolver('directors', this.directors.inclusionResolver);
	}
}
