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

    @Get('nome/:nome')
    async filtraPetNome(@Param('nome')nome: string): Promise<Pet[]>{
            const pets = await this.petService.buscaNome(nome);
            
            if(pets.length === 0){
                throw new NotFoundException('Pet não encontrado, confira o nome!')
            }

            return pets;
    }

    @Get('data/:dataDeNascimento')
    async filtraPetDataNascimento(@Param('dataDeNascimento')dataDeNascimento: string): Promise<Pet[]>{
            const data = new Date(dataDeNascimento);

            if (isNaN(data.getTime())) {
                throw new Error(`Data inválida fornecida: ${data}`);
            }

            const pets = await this.petService.buscaDataNascimento(data);
            
            if(pets.length === 0){
                throw new NotFoundException('Pet não encontrado, confira o nome!')
            }

            return pets;
    }

    @Get('especie/:especie')
        async filtraPetEspecie(@Param('especie')especie: Especies): Promise<Pet[]>{
                const pets = await this.petService.buscaEspecie(especie);
                
                if(pets.length === 0){
                    throw new NotFoundException('Pet não encontrado, confira o nome!')
                }

                return pets;
    }

    @Get('tutor/:nomeTutor')
    async filtraPetNomeTutor(@Param('nomeTutor')NomeTutor: string): Promise<Pet[]>{
            const pets = await this.petService.buscaNomeTutor(NomeTutor);
            
            if(pets.length === 0){
                throw new NotFoundException('Pet não encontrado, confira o nome!')
            }

            return pets;
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
