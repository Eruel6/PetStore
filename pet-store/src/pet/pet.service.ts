import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Especies, Pet } from './schemas/pet.schema';
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

    async buscaDataNascimento(dataDeNascimento: Date): Promise<Pet[]>{

        const startOfDay = new Date(dataDeNascimento);
        startOfDay.setUTCHours(0, 0, 0, 0);  // Começo do dia
    
        const endOfDay = new Date(dataDeNascimento);
        endOfDay.setUTCHours(23, 59, 59, 999);  // Fim do dia

        const pets = await this.petModel.find({dataDeNascimento: {$gte: startOfDay, $lte:endOfDay}}).lean();
        return pets;
    }

    async buscaEspecie(especie: Especies): Promise<Pet[]>{
        const pets = await this.petModel.find({especie}).lean();
        return pets;
    }

    async buscaNomeTutor(nomeTutor: string): Promise<Pet[]>{
        const pets = await this.petModel.find({nomeTutor}).lean();
        return pets;
    }

    async buscaEspecifico(nome: string, dataDeNascimento: Date, especie: Especies, nomeTutor: string): Promise<Pet>{
        return await this.petModel.findOne({nome, dataDeNascimento,especie, nomeTutor}).lean();
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

    async deletaPorNome(nome: string, dataDeNascimento: Date, nomeTutor: string): Promise<Pet>{
        return await this.petModel.findOneAndDelete({nome, dataDeNascimento, nomeTutor}).lean();
    }
    
}
