import { getCustomRepository, Repository } from 'typeorm'
import { User } from '../entities/User'
import { UserRepository } from '../repositories/UserRepository'

class FindByIdUserService {
  private userRepository: Repository<User>

  async execute(id: string) {
    return await this.userRepository.findOne(id)
  }

  constructor() {
    this.userRepository = getCustomRepository(UserRepository)
  }
}

export { FindByIdUserService }

