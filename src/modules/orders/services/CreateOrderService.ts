import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
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

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
<<<<<<< HEAD
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    const findProducts = await this.productsRepository.findAllById(products);

    if (findProducts.length !== products.length) {
      throw new AppError('Product not found');
    }

    const formattedProducts = findProducts.map(product => {
      const getProductsIndex = products.findIndex(
        item => item.id === product.id,
      );

      const receivedProducts = products[getProductsIndex];

      if (receivedProducts.quantity > product.quantity) {
        throw new AppError('Insufficient stock availability');
      }

      return {
        product_id: product.id,
        price: product.price,
        quantity: receivedProducts.quantity,
      };
    });

    await this.productsRepository.updateQuantity(products);

    const order = await this.ordersRepository.create({
      customer,
      products: formattedProducts,
    });

    return order;
=======
    // TODO
>>>>>>> 719090f97b56ae58647cbb75b5d08580ce556913
  }
}

export default CreateOrderService;
