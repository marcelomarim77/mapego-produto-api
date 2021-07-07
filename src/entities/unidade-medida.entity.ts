import {Entity, Column } from "typeorm";

@Entity({
    name: 'unidade_medida'
})
export class UnidadeMedida {

    @Column({
        primary: true,
        generated: 'increment',
        name: 'id_unidade',
        type: 'int',
    })
    idUnidade: number;

    @Column({
        name: 'codigo',
        type: 'char',
        length: 2,
    })
    codigo: string;

    @Column({
        name: 'descricao',
        type: 'char',
        length: 30,
    })
    descricao: string;
}
