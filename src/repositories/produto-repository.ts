import { EntityRepository, Repository, getConnection } from 'typeorm';

import { Produto } from '../entities/produto.entity';
import { ComposicaoProduto } from '../entities/composicao-produto.entity';

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

    async findProdutoByCodigo(codigo: string) {
        return await getConnection()
            .createQueryBuilder()
            .select("pr")
            .from(Produto, "pr")
            .leftJoinAndSelect("pr.tipoProduto", "tipo_produto")
            .leftJoinAndSelect("pr.unidadeMedida", "unidade_medida")
            .where("pr.codigo = :id", { codigo: codigo })
            .getOne();
    };

    async findMateriaPrima(idEmpresa: number, idProduto: number) {

        // pesquisa quais produtos já fazem parte da composição para ignorar no momento de retornar a relação de matérias-primas disponíveis
        const queryNotIn = getConnection()
            .createQueryBuilder()
            .select("cp.id_materia_prima")
            .from(ComposicaoProduto, "cp")
            .where("cp.id_empresa = :idEmpresa", { idEmpresa: idEmpresa })
            .andWhere("cp.id_produto = :idProduto", { idProduto: idProduto });

        // retorna apenas os produtos do tipo matéria-prima (produtoAcabado = false) que ainda não fazem parte da composição do produto
        return await getConnection()
            .getRepository(Produto)
            .createQueryBuilder("produto")
            .select("pr")
            .from(Produto, "pr")
            .leftJoinAndSelect("pr.tipoProduto", "tipo_produto")
            .leftJoinAndSelect("pr.unidadeMedida", "unidade_medida")
            .where("pr.id_empresa = :idEmpresa", { idEmpresa: idEmpresa })
            .andWhere("tipo_produto.produto_acabado = :produtoAcabado", { produtoAcabado: false })
            .andWhere("pr.id_produto NOT IN (" + queryNotIn.getQuery() + ")")
            .setParameters(queryNotIn.getParameters())
            .getMany();
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
