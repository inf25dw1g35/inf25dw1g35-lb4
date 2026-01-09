import { Entity, model, property, hasMany } from '@loopback/repository';
import { Films } from './films.model';
import { Filmsactors } from './filmsactors.model';

@model({
	settings: {
		mysql: { table: 'actors' }
	}
})
export class Actors extends Entity {
	@property({
		type: 'number',
		id: true,
		generated: true,
	})
	id?: number;

	@property({
		type: 'string',
		required: true,
	})
	name: string;

	@property({
		type: 'string',
	})
	birthdate?: string;

	@property({
		type: 'string',
	})
	country?: string;

	@hasMany(() => Films, { through: { model: () => Filmsactors } })
	films: Films[];

	constructor(data?: Partial<Actors>) {
		super(data);
	}
}

export interface ActorsRelations {
	// describe navigational properties here
}

export type ActorsWithRelations = Actors & ActorsRelations;
