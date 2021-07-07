import { Injectable } from '@nestjs/common';

import { ProdutoRepository } from './repositories/produto-repository';
import { Produto } from './entities/produto.entity';

@Injectable()
export class AppService {

    constructor(private readonly produtoRepository: ProdutoRepository) {}

    async getProdutosByIdEmpresa(idEmpresa: number) {
        const result = await this.produtoRepository.findProdutosByIdEmpresa(idEmpresa);
        return result;
    };

    async getProdutoById(id: number) {
        const result = await this.produtoRepository.findProdutoById(id);
        return result;
    };

/*
    async deleteCliente(id: number) {
        const result = await this.clienteRepository.deleteCliente(id);
        return result;
    };

    async updateCliente(cliente: Cliente) {
        const result = await this.clienteRepository.updateCliente(cliente);
        return result;
    };

    async createCliente(cliente: Cliente) {
        const result = await this.clienteRepository.createCliente(cliente);
        return result;
    };
*/
}
