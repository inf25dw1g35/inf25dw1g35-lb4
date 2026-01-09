import { Entity, model, property } from '@loopback/repository';

@model({
	settings: {
		mysql: { table: 'film_actors' },
		idInjection: false,
	},
})
export class Filmsactors extends Entity {

	@property({
		type: 'number',
		id: true,
		required: true,
	})
	actorsId?: number;

	@property({
		type: 'number',
		id: true,
		required: true,
	})
	filmsId?: number;

	constructor(data?: Partial<Filmsactors>) {
		super(data);
	}
}

export interface FilmsactorsRelations {
	// describe navigational properties here
}

export type FilmsactorsWithRelations = Filmsactors & FilmsactorsRelations;
