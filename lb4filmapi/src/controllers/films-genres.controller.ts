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
  Genres,
} from '../models';
import {FilmsRepository} from '../repositories';

export class FilmsGenresController {
  constructor(
    @repository(FilmsRepository)
    public filmsRepository: FilmsRepository,
  ) { }

  @get('/films/{id}/genres', {
    responses: {
      '200': {
        description: 'Genres belonging to Films',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Genres),
          },
        },
      },
    },
  })
  async getGenres(
    @param.path.number('id') id: typeof Films.prototype.id,
  ): Promise<Genres> {
    return this.filmsRepository.genres(id);
  }
}
