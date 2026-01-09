import { Entity, model, property, belongsTo, hasMany } from '@loopback/repository';
import { Directors } from './directors.model';
import { Genres } from './genres.model';
import { Actors } from './actors.model';
import { Filmsactors } from './filmsactors.model';

@model({
	settings: {
		mysql: { table: 'films' }
	}
})
export class Films extends Entity {
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
	title: string;

	@property({
		type: 'number',
	})
	year?: number;

	@belongsTo(() => Directors)
	directorsId: number;

	@belongsTo(() => Genres)
	genresId: number;

	@hasMany(() => Actors, { through: { model: () => Filmsactors } })
	actors: Actors[];

	constructor(data?: Partial<Films>) {
		super(data);
	}
}

export interface FilmsRelations {
	// describe navigational properties here
}

export type FilmsWithRelations = Films & FilmsRelations;
