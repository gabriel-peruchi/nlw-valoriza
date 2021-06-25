import { getCustomRepository, Repository } from 'typeorm'
import { Compliment } from '../entities/Compliment'
import { ComplimentRepository } from '../repositories/ComplimentRepository'

class FindUserReceiverComplimentsService {
  private complimentRepository: Repository<Compliment>

  async execute(userReceiverId: string) {
    const compliments = await this.complimentRepository.find({
      where: {
        userReceiverId
      },
      relations: ['userSender', 'userReceiver', 'tag']
    })

    return compliments
  }

  constructor() {
    this.complimentRepository = getCustomRepository(ComplimentRepository)
  }
}

export { FindUserReceiverComplimentsService }