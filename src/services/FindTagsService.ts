import { getCustomRepository, Repository } from 'typeorm'
import { Tag } from '../entities/Tag'
import { TagRepository } from '../repositories/TagRepository'
import { classToPlain } from 'class-transformer'

class FindTagsService {
  private tagRepository: Repository<Tag>

  async execute() {
    const tags = await this.tagRepository.find()

    return classToPlain(tags)
  }

  constructor() {
    this.tagRepository = getCustomRepository(TagRepository)
  }
}

export { FindTagsService }