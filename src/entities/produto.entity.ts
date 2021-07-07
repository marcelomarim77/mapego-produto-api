import {Entity, Column, OneToOne, JoinColumn } from "typeorm";

import { TipoProduto } from "./tipo-produto.entity";
import { UnidadeMedida } from "./unidade-medida.entity";

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

    @OneToOne(() => TipoProduto)
    @JoinColumn({ name: 'id_tipo_produto' })
    tipoProduto: TipoProduto;

    @OneToOne(() => UnidadeMedida)
    @JoinColumn({ name: 'id_unidade_medida' })
    unidadeMedida: UnidadeMedida;
}
