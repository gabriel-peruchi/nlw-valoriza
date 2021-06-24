import { getCustomRepository, Repository } from 'typeorm'
import { Tag } from '../entities/Tag'
import { TagRepository } from '../repositories/TagRepository'

class CreateTagService {
  private tagRepository: Repository<Tag>

  async execute(name: string) {
    if (!name) {
      throw new Error('Name required')
    }

    const tagAlreadyExists = await this.tagRepository.findOne({ name })

    if (tagAlreadyExists) {
      throw new Error('Tag already exists')
    }

    const tag = this.tagRepository.create({ name })

    await this.tagRepository.save(tag)

    return tag
  }

  constructor() {
    this.tagRepository = getCustomRepository(TagRepository)
  }
}

export { CreateTagService }
