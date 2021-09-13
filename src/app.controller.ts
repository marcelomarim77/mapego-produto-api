import { Controller, Get, Param, Delete, Put, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Produto } from './entities/produto.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

    @Get('/idEmpresa/:id')
    async getProdutosByIdEmpresa(@Param('id') id: number) {
        return this.appService.getProdutosByIdEmpresa(id);
    }

    @Get('/id/:id')
    async getProdutoById(@Param('id') id: number) {
        return this.appService.getProdutoById(id);
    }

    @Get('/codigo/:codigo')
    async getProdutoByCodigo(@Param('codigo') codigo: string) {
        return this.appService.getProdutoByCodigo(codigo);
    }

    @Get('/materia-prima/:idEmpresa/idProduto/:idProduto')
    async getMateriaPrima(@Param('idEmpresa') idEmpresa: number, @Param('idProduto') idProduto: number) {
        return this.appService.getMateriaPrima(idEmpresa, idProduto);
    }

    @Put('/id/:id')
    async updateProduto(@Param('id') id: number, @Body() produto: Produto) {
        produto.idProduto = id;
        return this.appService.updateProduto(produto);
    }

    @Post('/id/0')
    async createProduto(@Body() produto: Produto) {
        return this.appService.createProduto(produto);
    }

    @Delete('/id/:id')
    async deleteProduto(@Param('id') id: number) {
      return this.appService.deleteProduto(id);
    }
}
