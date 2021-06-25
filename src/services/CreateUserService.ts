import { getCustomRepository, Repository } from 'typeorm'
import { hash } from 'bcryptjs'
import { UserRepository } from '../repositories/UserRepository'
import { User } from '../entities/User'

interface IUser {
  name: string,
  email: string,
  password: string,
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

    const passwordHash = await hash(user.password, 8)

    const userSave = this.userRepository.create({
      name: user.name,
      email: user.email,
      password: passwordHash,
      admin: user.admin || false
    })

    await this.userRepository.save(userSave)

    return userSave
  }

  constructor() {
    this.userRepository = getCustomRepository(UserRepository)
  }
}

export { CreateUserService }
