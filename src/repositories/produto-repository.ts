import { EntityRepository, Repository, getConnection } from 'typeorm';

import { Produto } from '../entities/produto.entity';

@EntityRepository(Produto)
export class ProdutoRepository extends Repository<Produto> {
    async findProdutosByIdEmpresa(idEmpresaParam: number) {
        return await getConnection()
            .getRepository(Produto)
            .createQueryBuilder("produto")
            .select("pr")
            .from(Produto, "pr")
            .leftJoinAndSelect("pr.tipoProduto", "tipo_produto")
            .leftJoinAndSelect("pr.unidadeMedida", "unidade_medida")
            .where("pr.id_empresa = :idEmpresa", { idEmpresa: idEmpresaParam })
            .getMany();
    }

    async findProdutoById(id: number) {
        return await getConnection()
            .createQueryBuilder()
            .select("pr")
            .from(Produto, "pr")
            .leftJoinAndSelect("pr.tipoProduto", "tipo_produto")
            .leftJoinAndSelect("pr.unidadeMedida", "unidade_medida")
            .where("pr.id_produto = :id", { id: id })
            .getOne();
    };

    async updateProduto(produto: Produto) {
        return await getConnection()
                .createQueryBuilder()
                .update(Produto)
                .set({
                    codigo: produto.codigo,
                    descricao: produto.descricao,
                    idTipoProduto: produto.idTipoProduto,
                    idUnidadeMedida: produto.idUnidadeMedida,
                    estoqueMinimo: produto.estoqueMinimo,
                    controlaEstoque: produto.controlaEstoque,
                    custoProduto: produto.custoProduto,
                    precoVenda: produto.precoVenda,
                    margem: produto.margem
                })
                .where("idProduto = :id", { id: produto.idProduto })
                .execute();
    };

    async createProduto(produto: Produto) {
        return await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Produto)
                .values([{
                    idEmpresa: produto.idEmpresa,
                    codigo: produto.codigo,
                    descricao: produto.descricao,
                    idTipoProduto: produto.idTipoProduto,
                    idUnidadeMedida: produto.idUnidadeMedida,
                    estoqueMinimo: produto.estoqueMinimo,
                    controlaEstoque: produto.controlaEstoque,
                    custoProduto: produto.custoProduto,
                    precoVenda: produto.precoVenda,
                    margem: produto.margem
                }])
                .execute();
    };

    async deleteProduto(id: number) {
        let produto = await this.findOne({ idProduto: id });
        return await this.remove(produto);
    };
}
