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

    if (user.role !== "ADMIN") {
      throw new Error("You are not authorized to create a band!");
    }

    const bandDatabase = new BandDatabase();
    await bandDatabase.createBand(
      id,
      input.name,
      input.genre,
      input.responsible
    );

    return "Band created successfully!";
  }

  async getBandByIdOrName(info: string): Promise<Band> {
    const bandDatabase = new BandDatabase();
    

    try {

      if (!info) {
        throw new Error("Information not found");
      }
      const result = await bandDatabase.getBandByIdOrName(info);

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
