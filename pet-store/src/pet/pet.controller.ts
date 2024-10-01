import { Body, Controller, Get, Post } from '@nestjs/common';
import { PetService } from './pet.service';
import { Pet } from './schemas/pet.schema';
import { createPetDto } from './dto/createPetDto';

@Controller('pets')
export class PetController {

    constructor(private petService: PetService){}

    @Get()
    async retornaTodosPets(): Promise<Pet[]>{
            return this.petService.buscaTodos()
    }

    @Post()
    async createPet( @Body()Pet:createPetDto ): Promise<Pet>{
        return this.petService.create(Pet)
    }
}
