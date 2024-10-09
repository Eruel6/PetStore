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

    async  buscaPets(filtros: {nome?: string, dataDeNascimento?: Date, especie?: Especies, nomeTutor?: string}): Promise<Pet[]>{
        
        const query: any = {};

        if(filtros.nome){
            query.nome = filtros.nome;
        }
        if(filtros.dataDeNascimento){
            query.dataDeNascimento = filtros.dataDeNascimento;
        }
        if(filtros.especie){
            query.especie = filtros.especie;
        }
        if(filtros.nomeTutor){
            query.nomeTutor = filtros.nomeTutor;
        }

        return this.petModel.find(query).lean();
    }

    async buscaEspecifico(id: string): Promise<Pet>{
        return await this.petModel.findById(id).lean();
    }

    async atualiza(id: string, pet: Partial<Pet>): Promise<Pet>{
        return await this.petModel.findByIdAndUpdate(id, {$set: pet},{
            new: true,
            runValidators: true},
        ).lean();
        
    }

    async create(pet: Pet): Promise<Pet>{
        const res = await this.petModel.create(pet);
        return res;
    }

    async deleta(id: string): Promise<Pet>{
        return await this.petModel.findByIdAndDelete(id).lean();
    }
    
}
