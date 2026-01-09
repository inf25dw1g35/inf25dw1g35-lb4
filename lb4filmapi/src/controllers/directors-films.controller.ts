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
  Directors,
  Films,
} from '../models';
import {DirectorsRepository} from '../repositories';

export class DirectorsFilmsController {
  constructor(
    @repository(DirectorsRepository) protected directorsRepository: DirectorsRepository,
  ) { }

  @get('/directors/{id}/films', {
    responses: {
      '200': {
        description: 'Array of Directors has many Films',
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
    return this.directorsRepository.films(id).find(filter);
  }

  @post('/directors/{id}/films', {
    responses: {
      '200': {
        description: 'Directors model instance',
        content: {'application/json': {schema: getModelSchemaRef(Films)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Directors.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Films, {
            title: 'NewFilmsInDirectors',
            exclude: ['id'],
            optional: ['directorsId']
          }),
        },
      },
    }) films: Omit<Films, 'id'>,
  ): Promise<Films> {
    return this.directorsRepository.films(id).create(films);
  }

  @patch('/directors/{id}/films', {
    responses: {
      '200': {
        description: 'Directors.Films PATCH success count',
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
    return this.directorsRepository.films(id).patch(films, where);
  }

  @del('/directors/{id}/films', {
    responses: {
      '200': {
        description: 'Directors.Films DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Films)) where?: Where<Films>,
  ): Promise<Count> {
    return this.directorsRepository.films(id).delete(where);
  }
}
