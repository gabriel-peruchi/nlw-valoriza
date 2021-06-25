import { getCustomRepository, Repository } from 'typeorm'
import { Compliment } from '../entities/Compliment'
import { ComplimentRepository } from '../repositories/ComplimentRepository'

class FindUserSenderComplimentsService {
  private complimentRepository: Repository<Compliment>

  async execute(userSenderId: string) {
    const compliments = await this.complimentRepository.find({
      where: {
        userSenderId
      },
      relations: ['userSender', 'userReceiver', 'tag']
    })

    return compliments
  }

  constructor() {
    this.complimentRepository = getCustomRepository(ComplimentRepository)
  }
}

export { FindUserSenderComplimentsService }