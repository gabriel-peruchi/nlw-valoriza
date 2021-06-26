import { getCustomRepository, Repository } from 'typeorm'
import { Compliment } from '../entities/Compliment'
import { User } from '../entities/User'
import { ComplimentRepository } from '../repositories/ComplimentRepository'
import { UserRepository } from '../repositories/UserRepository'
import { SendEmailService } from './SendEmailService'

interface ICompliment {
  tagId: string,
  userSenderId: string,
  userReceiverId: string,
  message: string
}

class CreateComplimentService {
  private complimentRepository: Repository<Compliment>
  private userRepository: Repository<User>
  private sendEmailService: SendEmailService

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

    const userSender = await this.userRepository.findOne(compliment.userSenderId)

    const messageEmail = `
      ${userSender.name} elogiou você! <br>
      ${complimentSave.message}
    `

    this.sendEmailService.execute(
      userReceiverExists.email,
      messageEmail,
      'Você recebeu um elogio!'
    )

    return complimentSave
  }

  constructor() {
    this.complimentRepository = getCustomRepository(ComplimentRepository)
    this.userRepository = getCustomRepository(UserRepository)
    this.sendEmailService = new SendEmailService()
  }
}

export { CreateComplimentService }

