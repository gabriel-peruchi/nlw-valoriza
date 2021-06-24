import { getCustomRepository, Repository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import { User } from '../entities/User'

interface IUser {
  name: string,
  email: string,
  admin?: boolean
}

class CreateUserService {
  private userRepository: Repository<User>

  async execute(user: IUser) {
    const userAlreadyExists = await this.userRepository.findOne({ email: user.email })

    if (!user.email) {
      throw new Error('Email required');
    }

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const userSave = this.userRepository.create({
      name: user.name,
      email: user.email,
      admin: user.admin
    })

    await this.userRepository.save(userSave)

    return userSave
  }

  constructor() {
    this.userRepository = getCustomRepository(UserRepository)
  }
}

export { CreateUserService }
