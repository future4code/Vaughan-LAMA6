import { Show } from "../model/Show2";
import { BaseDatabase } from "./BaseDatabase";


export class ShowDatabase extends BaseDatabase {
    private static TABLE_NAME = "NOME_TABELA_SHOWS";

   public async getShowByWeekDay(info:string): Promise<any> {
    try{
        const result = await this.getConnection()
        .select("*")
        .from(ShowDatabase.TABLE_NAME)
        .where("name", info)
        .orWhere("id", info);

        return Show.toShowModel(result[0]);
    }catch(error:any){
        throw new Error(error.sqlMessage || error.message);
    }
}
}



