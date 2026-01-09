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
Films,
Filmsactors,
Actors,
} from '../models';
import {FilmsRepository} from '../repositories';

export class FilmsActorsController {
  constructor(
    @repository(FilmsRepository) protected filmsRepository: FilmsRepository,
  ) { }

  @get('/films/{id}/actors', {
    responses: {
      '200': {
        description: 'Array of Films has many Actors through Filmsactors',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Actors)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Actors>,
  ): Promise<Actors[]> {
    return this.filmsRepository.actors(id).find(filter);
  }

  @post('/films/{id}/actors', {
    responses: {
      '200': {
        description: 'create a Actors model instance',
        content: {'application/json': {schema: getModelSchemaRef(Actors)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Films.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actors, {
            title: 'NewActorsInFilms',
            exclude: ['id'],
          }),
        },
      },
    }) actors: Omit<Actors, 'id'>,
  ): Promise<Actors> {
    return this.filmsRepository.actors(id).create(actors);
  }

  @patch('/films/{id}/actors', {
    responses: {
      '200': {
        description: 'Films.Actors PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actors, {partial: true}),
        },
      },
    })
    actors: Partial<Actors>,
    @param.query.object('where', getWhereSchemaFor(Actors)) where?: Where<Actors>,
  ): Promise<Count> {
    return this.filmsRepository.actors(id).patch(actors, where);
  }

  @del('/films/{id}/actors', {
    responses: {
      '200': {
        description: 'Films.Actors DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Actors)) where?: Where<Actors>,
  ): Promise<Count> {
    return this.filmsRepository.actors(id).delete(where);
  }
}
