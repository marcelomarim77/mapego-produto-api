import {Entity, Column } from "typeorm";

@Entity({
    name: 'tipo_produto'
})
export class TipoProduto {

    @Column({
        primary: true,
        generated: 'increment',
        name: 'id_tipo',
        type: 'int',
    })
    idTipoProduto: number;

    @Column({
        name: 'descricao',
        type: 'char',
        length: 30,
    })
    descricao: string;

    @Column({
        name: 'produto_acabado',
        type: 'bool'
    })
    produtoAcabado: boolean;
}
