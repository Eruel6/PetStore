import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { PetService } from './pet.service';
import { Pet } from './schemas/pet.schema';
import { createPetDto } from './dto/createPetDto';

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
                throw new NotFoundException('Pet não enconrtado, confira o nome!')
            }

            return pets;
    }

    @Post()
    async createPet( @Body()Pet:createPetDto ): Promise<Pet>{
        return this.petService.create(Pet);
    }

    
}
