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
import { Films } from '../models';
import { FilmsRepository } from '../repositories';


export class FilmsController {
	constructor(
		@repository(FilmsRepository)
		public filmsRepository: FilmsRepository,
	) { }

	@post('/films')
	@response(200, {
		description: 'Films model instance',
		content: { 'application/json': { schema: getModelSchemaRef(Films) } },
	})
	async create(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Films, {
						title: 'NewFilms',
						exclude: ['id'],
					}),
				},
			},
		})
		films: Omit<Films, 'id'>,
	): Promise<Films> {
		return this.filmsRepository.create(films);
	}

	@get('/films/count')
	@response(200, {
		description: 'Films model count',
		content: { 'application/json': { schema: CountSchema } },
	})
	async count(
		@param.where(Films) where?: Where<Films>,
	): Promise<Count> {
		return this.filmsRepository.count(where);
	}

	@get('/films')
	@response(200, {
		description: 'Array of Films model instances',
		content: {
			'application/json': {
				schema: {
					type: 'array',
					items: getModelSchemaRef(Films, { includeRelations: true }),
				},
			},
		},
	})
	async find(
		@param.filter(Films) filter?: Filter<Films>,
	): Promise<Films[]> {
		return this.filmsRepository.find(filter);
	}



	@patch('/films')
	@response(200, {
		description: 'Films PATCH success count',
		content: { 'application/json': { schema: CountSchema } },
	})
	async updateAll(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Films, { partial: true }),
				},
			},
		})
		films: Films,
		@param.where(Films) where?: Where<Films>,
	): Promise<Count> {
		return this.filmsRepository.updateAll(films, where);
	}

	@get('/films/{id}')
	@response(200, {
		description: 'Films model instance',
		content: {
			'application/json': {
				schema: getModelSchemaRef(Films, { includeRelations: true }),
			},
		},
	})
	async findById(
		@param.path.number('id') id: number,
		@param.filter(Films, { exclude: 'where' }) filter?: FilterExcludingWhere<Films>
	): Promise<Films> {
		return this.filmsRepository.findById(id, filter);
	}

	@patch('/films/{id}')
	@response(204, {
		description: 'Films PATCH success',
	})
	async updateById(
		@param.path.number('id') id: number,
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Films, { partial: true }),
				},
			},
		})
		films: Films,
	): Promise<void> {
		await this.filmsRepository.updateById(id, films);
	}

	@put('/films/{id}')
	@response(204, {
		description: 'Films PUT success',
	})
	async replaceById(
		@param.path.number('id') id: number,
		@requestBody() films: Films,
	): Promise<void> {
		await this.filmsRepository.replaceById(id, films);
	}

	@del('/films/{id}')
	@response(204, {
		description: 'Films DELETE success',
	})
	async deleteById(@param.path.number('id') id: number): Promise<void> {
		await this.filmsRepository.deleteById(id);
	}


}
