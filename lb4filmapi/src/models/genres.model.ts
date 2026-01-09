import { Entity, model, property, hasMany } from '@loopback/repository';
import { Films } from './films.model';

@model({
	settings: {
		mysql: { table: 'genres' }
	}
})
export class Genres extends Entity {
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

	@hasMany(() => Films)
	films: Films[];

	constructor(data?: Partial<Genres>) {
		super(data);
	}
}

export interface GenresRelations {
	// describe navigational properties here
}

export type GenresWithRelations = Genres & GenresRelations;
