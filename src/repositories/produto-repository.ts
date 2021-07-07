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

/*
    async deleteCliente(id: number) {
        let cliente = await this.findOne({ idCliente: id });
        return await this.remove(cliente);
    };

    async updateCliente(cliente: Cliente) {
        return await this.update(cliente.idCliente, cliente);
    };

    async createCliente(cliente: Cliente) {
        return await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Cliente)
                .values([
                    { idEmpresa: cliente.idEmpresa,
                      pessoa: cliente.pessoa,
                      cpfCnpj: cliente.cpfCnpj,
                      rgIe: cliente.rgIe,
                      razaoSocial: cliente.razaoSocial,
                      nomeFantasia: cliente.nomeFantasia,
                      apelido: cliente.apelido,
                      cep: cliente.cep,
                      endereco: cliente.endereco,
                      numero: cliente.numero,
                      complemento: cliente.complemento,
                      bairro: cliente.bairro,
                      cidade: cliente.cidade,
                      uf: cliente.uf,
                      ibge: cliente.ibge,
                      contato: cliente.contato,
                      telefone: cliente.telefone,
                      celular: cliente.celular,
                      email: cliente.email,
                      dadosAdicionais: cliente.dadosAdicionais
                     }
                ])
                .execute();
    };
*/
}
