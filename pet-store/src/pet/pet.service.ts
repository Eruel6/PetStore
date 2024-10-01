import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pet } from './schemas/pet.schema';
import * as mongoose from 'mongoose';
import { promises } from 'dns';

@Injectable()
export class PetService {
    constructor(
        @InjectModel(Pet.name)
        private petModel: mongoose.Model<Pet>
    ) {
 
    }

    async buscaTodos(): Promise<Pet[]>{
        const pets = await this.petModel.find();
        return pets;
    }

    async create(pet: Pet): Promise<Pet>{
        const res = await this.petModel.create(pet);
        return res;
    }
}
