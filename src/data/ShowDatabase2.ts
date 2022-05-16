import { Show, WEEK_DAY, ShowDB } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../error/CustomError";


export class ShowDatabase extends BaseDatabase {

  private static TABLE_NAME = "NOME_TABELA_SHOWS";

  public async createShow(
    newShow: ShowDB
  ): Promise<void> {
    try {

      await this.getConnection()
        .insert({
          id: newShow.id,
          band_id: newShow.band_id,
          week_day: newShow.week_day,
          start_time: newShow.start_time,
          end_time: newShow.end_time
        })
        .into(ShowDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }


  public async getShowByDate(
    weekDay: string,
    startTime: number,
    endTime: number
  ): Promise<any> {
    try {
      const show = this.getConnection()
      .select("*")
      .from(ShowDatabase.TABLE_NAME)
      .where('week_day', weekDay)
      .andWhere('start_time', startTime)
      .andWhere('end_time', endTime)
      .first()


      return show[0]

    } catch (error:any) {
      throw new CustomError(error.statusCode, error.sqlMessage)
    }
  }

  public async getShowByDay(day: WEEK_DAY): Promise<any> {
    try {
      const show = this.getConnection()
      .select("*")
      .from(ShowDatabase.TABLE_NAME)
      .where('week_day', day)
      .first()


      return show[0]
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}



