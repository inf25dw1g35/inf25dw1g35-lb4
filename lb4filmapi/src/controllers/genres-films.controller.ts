import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Genres,
  Films,
} from '../models';
import {GenresRepository} from '../repositories';

export class GenresFilmsController {
  constructor(
    @repository(GenresRepository) protected genresRepository: GenresRepository,
  ) { }

  @get('/genres/{id}/films', {
    responses: {
      '200': {
        description: 'Array of Genres has many Films',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Films)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Films>,
  ): Promise<Films[]> {
    return this.genresRepository.films(id).find(filter);
  }

  @post('/genres/{id}/films', {
    responses: {
      '200': {
        description: 'Genres model instance',
        content: {'application/json': {schema: getModelSchemaRef(Films)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Genres.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Films, {
            title: 'NewFilmsInGenres',
            exclude: ['id'],
            optional: ['genresId']
          }),
        },
      },
    }) films: Omit<Films, 'id'>,
  ): Promise<Films> {
    return this.genresRepository.films(id).create(films);
  }

  @patch('/genres/{id}/films', {
    responses: {
      '200': {
        description: 'Genres.Films PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Films, {partial: true}),
        },
      },
    })
    films: Partial<Films>,
    @param.query.object('where', getWhereSchemaFor(Films)) where?: Where<Films>,
  ): Promise<Count> {
    return this.genresRepository.films(id).patch(films, where);
  }

  @del('/genres/{id}/films', {
    responses: {
      '200': {
        description: 'Genres.Films DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Films)) where?: Where<Films>,
  ): Promise<Count> {
    return this.genresRepository.films(id).delete(where);
  }
}
