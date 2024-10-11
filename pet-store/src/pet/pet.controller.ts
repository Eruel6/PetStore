import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { PetService } from './pet.service';
import { Especies, Pet } from './schemas/pet.schema';
import { createPetDto } from './dto/create-pet.dto';
import { updatePetDto } from './dto/update-pet.dto';
import { query } from 'express';

@Controller('pets')
export class PetController {

    constructor(private petService: PetService){}

    @Get('busca')
    async buscaPets(
        @Query('q')q?: string,
        @Query('nome')nome?: string,
        @Query('dataDeNascimento')dataDeNascimento?: Date,
        @Query('especie')especie?: Especies,
        @Query('nomeTutor')nomeTutor?: string

    ): Promise<Pet[]>{
        
        const filtros: any = {};

        if (q) filtros.q=q;
        if (nome) filtros.nome = nome;
        if (dataDeNascimento) filtros.dataDeNascimento = new Date(dataDeNascimento);
        if (especie) filtros.especie = especie;
        if (nomeTutor) filtros.nomeTutor = nomeTutor;

        return this.petService.buscaPets(filtros);
        
    }

    @Get(':id')
    async filtraPetEspecifico(@Param('id')id: string,
        ): Promise<Pet>{
            const pets = await this.petService.buscaEspecifico(id);

            return pets;
    }

    @Post()
    async createPet( @Body()Pet:createPetDto ): Promise<Pet>{
        return this.petService.create(Pet);
    }

    @Put(':id')
    async updatePet (
        @Param('id') id: string,

        @Body()Pet: Partial<updatePetDto> ): Promise<Pet>{

        return this.petService.atualiza(id, Pet);
    }

    @Delete(':id')
    async deletePet (
        @Param('id') id: string): Promise<Pet>{

        return this.petService.deleta(id);
    }

    
}
