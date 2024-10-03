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
        const allPets = await this.petModel.find();
        return allPets;
    }

    async buscaNome(nome: string): Promise<Pet[]>{
        const pets = await this.petModel.find({nome}).lean();
        return pets;
    }

    async atualizaPorNome(nome: string, pet: Pet): Promise<Pet>{
        return await this.petModel.findOneAndUpdate({nome}, {$set: pet},{
            new: true,
            runValidators: true},
        ).lean();
        
    }

    async create(pet: Pet): Promise<Pet>{
        const res = await this.petModel.create(pet);
        return res;
    }

    async deletaPorNome(nome: string): Promise<Pet>{
        return await this.petModel.findOneAndDelete({nome}).lean();
    }
    
}
