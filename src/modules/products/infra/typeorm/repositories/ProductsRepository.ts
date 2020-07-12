import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { name },
    });

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const arrayOfIds = products.map(product => product.id);

    const foundProducts = await this.ormRepository.find({
      where: {
        id: In(arrayOfIds),
      },
    });

    return foundProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    const productsFound = await this.findAllById(products);

    productsFound.forEach(async product => {
      const getProductIndex = products.findIndex(
        item => item.id === product.id,
      );

      const updatedQuantity =
        product.quantity - products[getProductIndex].quantity;

      Object.assign(product, { quantity: updatedQuantity });

      await this.ormRepository.save(product);
    });

    return productsFound;
  }
}

export default ProductsRepository;
