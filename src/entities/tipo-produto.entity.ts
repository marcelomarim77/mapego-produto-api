import {Entity, Column } from "typeorm";

@Entity({
    name: 'tipo_produto'
})
export class TipoProduto {

    @Column({
        name: 'id_empresa',
        type: 'int',
    })
    idEmpresa: number;

    @Column({
        primary: true,
        generated: 'increment',
        name: 'id_tipo',
        type: 'int',
    })
    idTipo: number;

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
