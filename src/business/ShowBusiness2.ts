import { BandDatabase } from "../data/BandDatabase";
import { ShowDatabase } from "../data/ShowDatabase2";
import { Show } from "../model/Show2";


export class ShowBusiness {

  async getShowByWeekDay(info: string): Promise<Show> {
    console.log(info)
    const ShowDatabase = new ShowDatabase();
    

    try {

      if (!info) {
        throw new Error("Information not found");
      }
      const result = await ShowDatabase.getShowByWeekDay(info);

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
    
    }
}


