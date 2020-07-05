import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const isCorrectType = this.transactionsRepository.compareType(type);
    const isValidTransation = this.transactionsRepository.invalidTransation(
      value,
      type,
    );

    if (isCorrectType === false) {
      throw Error('Incorrect type. Must be income or outcome');
    }

    if (isValidTransation === null) {
      throw Error('Invalid transation');
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
