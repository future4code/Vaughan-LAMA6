import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";

export class BandDatabase extends BaseDatabase {
    private static TABLE_NAME = "NOME_TABELA_BANDAS";

    public async createBand(
        id: string,
        name: string,
        music_genre: string,
        responsible: string
    ): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id,
                    name,
                    music_genre,
                    responsible
                })
                .into(BandDatabase.TABLE_NAME);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getBandByIdOrName(info:string): Promise<any> {
        try{
            const result = await this.getConnection()
            .select("*")
            .from(BandDatabase.TABLE_NAME)
            .where("name", info)
            .orWhere("id", info);

            return Band.toBandModel(result[0]);
        }catch(error:any){
            throw new Error(error.sqlMessage || error.message);
        }
    }

}