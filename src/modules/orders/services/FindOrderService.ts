import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindOrderService {
  constructor(
<<<<<<< HEAD
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
=======
    private ordersRepository: IOrdersRepository,
    private productsRepository: IProductsRepository,
>>>>>>> 719090f97b56ae58647cbb75b5d08580ce556913
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Order | undefined> {
<<<<<<< HEAD
    const order = await this.ordersRepository.findById(id);

    return order;
=======
    // TODO
>>>>>>> 719090f97b56ae58647cbb75b5d08580ce556913
  }
}

export default FindOrderService;
