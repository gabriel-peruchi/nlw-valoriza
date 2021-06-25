import { getCustomRepository, Repository } from 'typeorm'
import { User } from '../entities/User'
import { UserRepository } from '../repositories/UserRepository'

class FindUsersService {
  private useRepository: Repository<User>

  async execute() {
    const users = await this.useRepository.find()

    return users
  }

  constructor() {
    this.useRepository = getCustomRepository(UserRepository)
  }
}

export { FindUsersService }
