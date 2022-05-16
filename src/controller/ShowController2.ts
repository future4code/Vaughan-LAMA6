import { ShowBusiness } from "../business/ShowBusiness2";
import { BaseDatabase } from "../data/BaseDatabase";
import { Request, Response } from "express";
import { ShowInputDTO } from "../model/Show";


export class ShowController {

    public createShow = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string;

            const input: ShowInputDTO = {
                band_id: req.body.bandId,
                week_day: req.body.weekDay,
                start_time: req.body.startTime,
                end_time: req.body.endTime
            }

            const showBusiness = new ShowBusiness();
            await showBusiness.createShow(input, token);

            res.status(201).send({ message: "Show created" })
        }catch (error) {
                if(error instanceof Error){
                    res.status(400).send({ error: error.message });
                }
                else{
                    res.status(400).send({ error: error });
                }
            }
        
            await BaseDatabase.destroyConnection();
        }


  async getShowByWeekDay(req: Request, res: Response):Promise<void> {
    try {
        const showBusiness = new ShowBusiness();
       
        const info = req.query.name

        const result = await ShowBusiness.getShowByWeekDay(String(info));

        res.status(200).send(result);
    } catch (error) {
        if(error instanceof Error){
            res.status(400).send({ error: error.message });
        }
        else{
            res.status(400).send({ error: error });
        }
    }

    await BaseDatabase.destroyConnection();
}

}
