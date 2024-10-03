import { Especies } from "../schemas/pet.schema";


export class createPetDto{

    readonly nome: string;
    readonly dataDeNascimento: Date;
    readonly especie: Especies;
    readonly nomeTutor: string;

}