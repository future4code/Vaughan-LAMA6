import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { BandDatabase } from "../data/BandDatabase";
import { BandInputDTO, Band } from "../model/Band";

export class BandBusiness {

    async createBand(input: BandInputDTO, token: string) {
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const authenticator = new Authenticator();
        const user = authenticator.getData(token);

        if(user.role !== "ADMIN"){
            throw new Error("You are not authorized to create a band!");
        }

        const bandDatabase = new BandDatabase();
        const band = await bandDatabase.createBand(id, input.name, input.genre, input.responsible);

        return band + " Created successfully!";
    }

    async getBandByIdOrName(name: string, id: string) {
        const bandDatabase = new BandDatabase();

        if(id && name){
            throw new Error("You can't search for a band by id and name at the same time!");
        }

        if(!id && !name){
            throw new Error("You must search for a band by id or name!");
        }

        if(!id){
            const band = await bandDatabase.getBandByName(name);
            return band;
        }

        if(!name){
            const band = await bandDatabase.getBandById(id);
            return band;
        }
    }
}


