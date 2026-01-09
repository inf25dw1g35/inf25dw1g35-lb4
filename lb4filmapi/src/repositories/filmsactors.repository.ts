import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Filmsactors, FilmsactorsRelations } from '../models';

export class FilmsactorsRepository extends DefaultCrudRepository<
	Filmsactors,
	any,
	FilmsactorsRelations
> {
	constructor(
		@inject('datasources.db') dataSource: DbDataSource,
	) {
		super(Filmsactors, dataSource);
	}
}
