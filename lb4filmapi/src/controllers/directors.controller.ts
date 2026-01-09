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
import {Directors} from '../models';
import {DirectorsRepository} from '../repositories';

export class DirectorsController {
  constructor(
    @repository(DirectorsRepository)
    public directorsRepository : DirectorsRepository,
  ) {}

  @post('/directors')
  @response(200, {
    description: 'Directors model instance',
    content: {'application/json': {schema: getModelSchemaRef(Directors)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directors, {
            title: 'NewDirectors',
            exclude: ['id'],
          }),
        },
      },
    })
    directors: Omit<Directors, 'id'>,
  ): Promise<Directors> {
    return this.directorsRepository.create(directors);
  }

  @get('/directors/count')
  @response(200, {
    description: 'Directors model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Directors) where?: Where<Directors>,
  ): Promise<Count> {
    return this.directorsRepository.count(where);
  }

  @get('/directors')
  @response(200, {
    description: 'Array of Directors model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Directors, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Directors) filter?: Filter<Directors>,
  ): Promise<Directors[]> {
    return this.directorsRepository.find(filter);
  }

  @patch('/directors')
  @response(200, {
    description: 'Directors PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directors, {partial: true}),
        },
      },
    })
    directors: Directors,
    @param.where(Directors) where?: Where<Directors>,
  ): Promise<Count> {
    return this.directorsRepository.updateAll(directors, where);
  }

  @get('/directors/{id}')
  @response(200, {
    description: 'Directors model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Directors, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Directors, {exclude: 'where'}) filter?: FilterExcludingWhere<Directors>
  ): Promise<Directors> {
    return this.directorsRepository.findById(id, filter);
  }

  @patch('/directors/{id}')
  @response(204, {
    description: 'Directors PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directors, {partial: true}),
        },
      },
    })
    directors: Directors,
  ): Promise<void> {
    await this.directorsRepository.updateById(id, directors);
  }

  @put('/directors/{id}')
  @response(204, {
    description: 'Directors PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() directors: Directors,
  ): Promise<void> {
    await this.directorsRepository.replaceById(id, directors);
  }

  @del('/directors/{id}')
  @response(204, {
    description: 'Directors DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.directorsRepository.deleteById(id);
  }
}
