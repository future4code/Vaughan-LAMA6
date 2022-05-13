import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandBusiness } from "../business/BandBusiness";
import { BandInputDTO} from "../model/Band";

export class BandController {
    async registerBand(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const input: BandInputDTO = {
                name: req.body.name,
                genre: req.body.genre,
                responsible: req.body.responsible
            }

            const bandBusiness = new BandBusiness();

            const band = await bandBusiness.createBand(input, token);

            res.status(200).send(band);
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

    async getBandByIdOrName(req: Request, res: Response) {
        try {
            const bandBusiness = new BandBusiness();
           
            const name = req.query.name as string;
            const id = req.query.id as string;

            res.status(200).send(await bandBusiness.getBandByIdOrName(name, id));
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