import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PetService } from './pet.service';
import { Especies, Pet } from './schemas/pet.schema';
import { createPetDto } from './dto/create-pet.dto';
import { updatePetDto } from './dto/update-pet.dto';

@Controller('pets')
export class PetController {

    constructor(private petService: PetService){}

    @Get()
    async retornaTodosPets(): Promise<Pet[]>{
            return this.petService.buscaTodos();
    }

    @Get(':nome')
    async filtraPetNome(@Param('nome')nome: string): Promise<Pet[]>{
            const pets = await this.petService.buscaNome(nome);
            
            if(pets.length === 0){
                throw new NotFoundException('Pet não encontrado, confira o nome!')
            }

            return pets;
    }

    @Get('detalhes/:nome')
    async filtraPetEspecifico(@Param('nome')nome: string,
        @Body()paramsToSearch: {dataDeNascimento: Date, especie: Especies, nomeTutor: string}): Promise<Pet>{
            const pets = await this.petService.buscaEspecifico(nome,paramsToSearch.dataDeNascimento,paramsToSearch.especie,paramsToSearch.nomeTutor);

            return pets;
    }

    @Post()
    async createPet( @Body()Pet:createPetDto ): Promise<Pet>{
        return this.petService.create(Pet);
    }

    @Put(':nome')
    async updatePet (
        @Param('nome') nome: string,

        @Body()Pet:updatePetDto ): Promise<Pet>{

        return this.petService.atualizaPorNome(nome, Pet);
    }

    @Delete(':nome')
    async deletePet (
        @Param('nome') nome: string,

        @Body()ParamsToDelete:{dataDeNascimento:Date,nomeTutor:string} ): Promise<Pet>{

        return this.petService.deletaPorNome(nome,ParamsToDelete.dataDeNascimento,ParamsToDelete.nomeTutor);
    }

    
}
