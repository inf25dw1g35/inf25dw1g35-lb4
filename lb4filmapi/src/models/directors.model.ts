import { Entity, model, property, hasMany } from '@loopback/repository';
import { Films } from './films.model';

@model({
	settings: {
		mysql: { table: 'directors' }
	}
})
export class Directors extends Entity {
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

	@hasMany(() => Films)
	films: Films[];

	constructor(data?: Partial<Directors>) {
		super(data);
	}
}

export interface DirectorsRelations {
	// describe navigational properties here
}

export type DirectorsWithRelations = Directors & DirectorsRelations;
