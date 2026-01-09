import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Films,
  Directors,
} from '../models';
import {FilmsRepository} from '../repositories';

export class FilmsDirectorsController {
  constructor(
    @repository(FilmsRepository)
    public filmsRepository: FilmsRepository,
  ) { }

  @get('/films/{id}/directors', {
    responses: {
      '200': {
        description: 'Directors belonging to Films',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Directors),
          },
        },
      },
    },
  })
  async getDirectors(
    @param.path.number('id') id: typeof Films.prototype.id,
  ): Promise<Directors> {
    return this.filmsRepository.directors(id);
  }
}
