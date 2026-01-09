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
Actors,
Filmsactors,
Films,
} from '../models';
import {ActorsRepository} from '../repositories';

export class ActorsFilmsController {
  constructor(
    @repository(ActorsRepository) protected actorsRepository: ActorsRepository,
  ) { }

  @get('/actors/{id}/films', {
    responses: {
      '200': {
        description: 'Array of Actors has many Films through Filmsactors',
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
    return this.actorsRepository.films(id).find(filter);
  }

  @post('/actors/{id}/films', {
    responses: {
      '200': {
        description: 'create a Films model instance',
        content: {'application/json': {schema: getModelSchemaRef(Films)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Actors.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Films, {
            title: 'NewFilmsInActors',
            exclude: ['id'],
          }),
        },
      },
    }) films: Omit<Films, 'id'>,
  ): Promise<Films> {
    return this.actorsRepository.films(id).create(films);
  }

  @patch('/actors/{id}/films', {
    responses: {
      '200': {
        description: 'Actors.Films PATCH success count',
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
    return this.actorsRepository.films(id).patch(films, where);
  }

  @del('/actors/{id}/films', {
    responses: {
      '200': {
        description: 'Actors.Films DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Films)) where?: Where<Films>,
  ): Promise<Count> {
    return this.actorsRepository.films(id).delete(where);
  }
}
