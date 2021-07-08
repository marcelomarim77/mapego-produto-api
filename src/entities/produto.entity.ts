import {Entity, Column } from "typeorm";

@Entity({
    name: 'produto'
})
export class Produto {

    @Column({
        name: 'id_empresa',
        type: 'int',
    })
    idEmpresa: number;

    @Column({
        primary: true,
        generated: 'increment',
        name: 'id_produto',
        type: 'int',
    })
    idProduto: number;

    @Column({
        name: 'codigo',
        type: 'char',
        length: 20,
    })
    codigo: string;

    @Column({
        name: 'descricao',
        type: 'char',
        length: 30,
    })
    descricao: string;

    @Column({
        name: 'id_tipo_produto',
        type: 'int',
    })
    idTipoProduto: number;

    @Column({
        name: 'id_unidade_medida',
        type: 'int',
    })
    idUnidadeMedida: number;

    @Column({
        name: 'estoque_minimo',
        type: 'int',
    })
    estoqueMinimo: number;

    @Column({
        name: 'controla_estoque',
        type: 'bool',
    })
    controlaEstoque: boolean;

    @Column({
        name: 'custo_produto',
        type: 'decimal',
        precision: 18,
        scale: 2,
    })
    custoProduto: number;

    @Column({
        name: 'preco_venda',
        type: 'decimal',
        precision: 18,
        scale: 2,
    })
    precoVenda: number;

    @Column({
        name: 'margem',
        type: 'decimal',
        precision: 18,
        scale: 2,
    })
    margem: number;
}
