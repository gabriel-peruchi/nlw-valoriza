import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { getCustomRepository, Repository } from 'typeorm'
import { User } from '../entities/User'
import { UserRepository } from '../repositories/UserRepository'

const SECRET_KEY = '7a86bb2f1c32fa4345c1f0e6ce44f5ed'

class AuthenticateUserService {
  private userRepository: Repository<User>

  async execute(email: string, password: string) {
    const user = await this.userRepository.findOne({ email })

    if (!user) {
      throw new Error('Email/Password incorrect')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Email/Password incorrect')
    }

    const token = sign(
      {
        email: user.email
      },
      SECRET_KEY,
      {
        subject: user.id,
        expiresIn: '1d'
      }
    )

    return token
  }

  constructor() {
    this.userRepository = getCustomRepository(UserRepository)
  }
}

export { AuthenticateUserService }

