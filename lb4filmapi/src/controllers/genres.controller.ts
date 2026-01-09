import {
	Count,
	CountSchema,
	Filter,
	FilterExcludingWhere,
	repository,
	Where,
} from '@loopback/repository';
import {
	post,
	param,
	get,
	getModelSchemaRef,
	patch,
	put,
	del,
	requestBody,
	response,
} from '@loopback/rest';
import { Genres } from '../models';
import { GenresRepository } from '../repositories';

export class GenresController {
	constructor(
		@repository(GenresRepository)
		public genresRepository: GenresRepository,
	) { }

	@post('/genres')
	@response(200, {
		description: 'Genres model instance',
		content: { 'application/json': { schema: getModelSchemaRef(Genres) } },
	})
	async create(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Genres, {
						title: 'NewGenres',
						exclude: ['id'],
					}),
				},
			},
		})
		genres: Omit<Genres, 'id'>,
	): Promise<Genres> {
		return this.genresRepository.create(genres);
	}

	@get('/genres/count')
	@response(200, {
		description: 'Genres model count',
		content: { 'application/json': { schema: CountSchema } },
	})
	async count(
		@param.where(Genres) where?: Where<Genres>,
	): Promise<Count> {
		return this.genresRepository.count(where);
	}

	@get('/genres')
	@response(200, {
		description: 'Array of Genres model instances',
		content: {
			'application/json': {
				schema: {
					type: 'array',
					items: getModelSchemaRef(Genres, { includeRelations: true }),
				},
			},
		},
	})
	async find(
		@param.filter(Genres) filter?: Filter<Genres>,
	): Promise<Genres[]> {
		return this.genresRepository.find(filter);
	}

	@patch('/genres')
	@response(200, {
		description: 'Genres PATCH success count',
		content: { 'application/json': { schema: CountSchema } },
	})
	async updateAll(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Genres, { partial: true }),
				},
			},
		})
		genres: Genres,
		@param.where(Genres) where?: Where<Genres>,
	): Promise<Count> {
		return this.genresRepository.updateAll(genres, where);
	}

	@get('/genres/{id}')
	@response(200, {
		description: 'Genres model instance',
		content: {
			'application/json': {
				schema: getModelSchemaRef(Genres, { includeRelations: true }),
			},
		},
	})
	async findById(
		@param.path.number('id') id: number,
		@param.filter(Genres, { exclude: 'where' }) filter?: FilterExcludingWhere<Genres>
	): Promise<Genres> {
		return this.genresRepository.findById(id, filter);
	}

	@patch('/genres/{id}')
	@response(204, {
		description: 'Genres PATCH success',
	})
	async updateById(
		@param.path.number('id') id: number,
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Genres, { partial: true }),
				},
			},
		})
		genres: Genres,
	): Promise<void> {
		await this.genresRepository.updateById(id, genres);
	}

	@put('/genres/{id}')
	@response(204, {
		description: 'Genres PUT success',
	})
	async replaceById(
		@param.path.number('id') id: number,
		@requestBody() genres: Genres,
	): Promise<void> {
		await this.genresRepository.replaceById(id, genres);
	}

	@del('/genres/{id}')
	@response(204, {
		description: 'Genres DELETE success',
	})
	async deleteById(@param.path.number('id') id: number): Promise<void> {
		await this.genresRepository.deleteById(id);
	}
}
