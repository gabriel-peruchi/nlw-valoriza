import { getCustomRepository, Repository } from 'typeorm'
import { Compliment } from '../entities/Compliment'
import { User } from '../entities/User'
import { ComplimentRepository } from '../repositories/ComplimentRepository'
import { UserRepository } from '../repositories/UserRepository'

interface ICompliment {
  tagId: string,
  userSenderId: string,
  userReceiverId: string,
  message: string
}

class CreateComplimentService {
  private complimentRepository: Repository<Compliment>
  private userRepository: Repository<User>

  async execute(compliment: ICompliment) {
    if (compliment.userSenderId === compliment.userReceiverId) {
      throw new Error('Incorrect user receiver')
    }

    const userReceiverExists = await this.userRepository.findOne(compliment.userReceiverId)

    if (!userReceiverExists) {
      throw new Error('User receiver does not exists')
    }

    const complimentSave = this.complimentRepository.create({
      tagId: compliment.tagId,
      userSenderId: compliment.userSenderId,
      userReceiverId: compliment.userReceiverId,
      message: compliment.message,
    })

    await this.complimentRepository.save(complimentSave)

    return complimentSave
  }

  constructor() {
    this.complimentRepository = getCustomRepository(ComplimentRepository)
    this.userRepository = getCustomRepository(UserRepository)
  }
}

export { CreateComplimentService }
