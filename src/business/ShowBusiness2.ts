
import { ShowDatabase } from "../data/ShowDatabase2";
import { Show } from "../model/Show2";


export class ShowBusiness {
  static getShowByWeekDay(arg0: string) {
      throw new Error("Method not implemented.");
  }

  async getShowByWeekDay(info: string): Promise<Show> {
    console.log(info)
    const showDatabase = new ShowDatabase();
    

    try {

      if (!info) {
        throw new Error("Information not found");
      }
      const result = await ShowDatabase.getShowByWeekDay(info);

      return Show.toShowModel(result);
    } catch (error: any) {
      throw new Error(error.message);
    }
    
    }
}


