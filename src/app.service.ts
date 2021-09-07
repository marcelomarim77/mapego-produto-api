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

    async getProdutoByCodigo(codigo: string) {
        const result = await this.produtoRepository.findProdutoByCodigo(codigo);
        return result;
    };

    async getMateriaPrima(idEmpresa: number) {
        const result = await this.produtoRepository.findMateriaPrima(idEmpresa);
        return result;
    };

    async updateProduto(produto: Produto) {
        const result = await this.produtoRepository.updateProduto(produto);
        return result;
    };

    async createProduto(produto: Produto) {
        const result = await this.produtoRepository.createProduto(produto);
        return result;
    };

    async deleteProduto(id: number) {
        const result = await this.produtoRepository.deleteProduto(id);
        return result;
    };
}
