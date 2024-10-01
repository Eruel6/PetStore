import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Especies {
    GATO = 'Gato',
    CACHORRO = 'Cachorro',
    AVE = 'Ave',
    EXOTICO = 'Exotico'
}

@Schema({
    timestamps: true,
})

export class Pet{

    @Prop()
    nome: string;

    @Prop()
    dataDeNascimento: Date;

    @Prop()
    especie: Especies;

    @Prop()
    nomeTutor: string;

}

export const PetSchema = SchemaFactory.createForClass(Pet)