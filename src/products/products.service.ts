import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepository:Repository<Product>,
              @InjectRepository(User) private userRepository:Repository<User>){}
  
  create(createProductDto: CreateProductDto) {
    const newProduto = this.productRepository.create({
      ...createProductDto,
    });
    this.productRepository.save(newProduto);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOneBy({id})
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update({id}, {...updateProductDto});
  }

  remove(id: number) {
    return this.productRepository.delete({id});
  }
}
