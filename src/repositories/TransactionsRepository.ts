/* eslint-disable no-return-assign */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  // eslint-disable-next-line class-methods-use-this
  public compareType(type: string): string | false {
    if (type === 'income' || type === 'outcome') {
      return type;
    }
    return false;
  }

  public getBalance(): Balance {
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    this.transactions.reduce((accumulator, object) => {
      if (object.type === 'income') {
        // eslint-disable-next-line no-param-reassign
        return (balance.income += object.value);
      }
      if (object.type === 'outcome') {
        return (balance.outcome += object.value);
      }
      return accumulator;
    }, 0);

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public invalidTransation(value: number, type: string): number | null {
    const balance = this.getBalance();

    if (value > balance.total && type === 'outcome') {
      return null;
    }
    return value;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
