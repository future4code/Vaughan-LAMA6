import { ShowBusiness } from "../business/ShowBusiness2";
import { BaseDatabase } from "../data/BaseDatabase";
import { Request, Response } from "express";


export class ShowController {

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
