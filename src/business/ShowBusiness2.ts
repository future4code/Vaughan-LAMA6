
import { ShowDatabase } from "../data/ShowDatabase2";
import { Show, ShowInputDTO, ShowDB } from "../model/Show";
import { CustomError } from "../error/CustomError";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";


export class ShowBusiness {

  static getShowByWeekDay(arg0: string) {
      throw new Error("Method not implemented.");
  }

  public async createShow(
    input: ShowInputDTO, token: string
) {
    try {
      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();

        const authenticator = new Authenticator();
        const user = authenticator.getData(token);

        

        if (!input.band_id || !input.week_day || !input.start_time) {
            throw new CustomError(422, "Missing properties")
        }
        if (user.role !== "ADMIN") {
            throw new CustomError(401, "Not authorized")
        }

        if (
            input.start_time > input.end_time ||
            input.start_time < 8 ||
            input.end_time > 23 ||
            !Number.isInteger(input.start_time) ||
            !Number.isInteger(input.end_time)
        ) {
            throw new CustomError(400, "Selected time is invalid")
        }

        const showDatabase = new ShowDatabase();
        const showSchedule = await showDatabase.getShowByDate(
            input.week_day,
            input.start_time,
            input.end_time
        )

        const isValid = showSchedule.find(
            (item: ShowDB) => item.band_id === input.band_id
        )

        if (!isValid) {
            throw new CustomError(400, "Show already scheduled at this time")
        }

        const newShow: ShowDB = {
          id: id,
          week_day: Show.stringToWeekDay(input.week_day),
          start_time: input.start_time,
          end_time: input.end_time,
          band_id: input.band_id
      }

        await showDatabase.createShow(newShow);
    } catch (error:any) {
        throw new CustomError(error.statusCode, error.message);
    }
}

  public async getShowByDay(day: string): Promise<any> {
  try {
      if (!day) {
          throw new CustomError(422, "Invalid day")
      }
      const showDatabase = new ShowDatabase();
      const queryData = await showDatabase.getShowByDay(
          Show.stringToWeekDay(day)
      )

      const showSchedule = queryData.map((item: ShowDB) => {
          return {
              id: item.id,
              weekDay: item.week_day,
              startTime: item.start_time,
              endTime: item.end_time,
              bandId: item.band_id
          }
      })

      return showSchedule
  } catch (error:any) {
      throw new CustomError(error.statusCode, error.message);
  }
}
}


