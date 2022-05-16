export enum WEEK_DAY{
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY",
}

export interface ShowInputDTO{
    band_id: string;
    week_day: WEEK_DAY;
    start_time: number;
    end_time: number;
}

export interface ShowDB {
    id: string;
    week_day: string;
    start_time: number;
    end_time: number;
    band_id: string;
}

export class Show{
    constructor(
        private id: string,
        private week_day: string,
        private start_time: number,
        private end_time: number,
        private band_id: string,
    ){}


    getId(){
    return this.id;
}

    getWeekDay(){
    return this.week_day;
}
    getStartTime(){
    return this.start_time;
}

    getEndTime(){
    return this.end_time;
}

    getBandId(){
    return this.band_id;
}

    static stringToWeekDay(input: string): WEEK_DAY{
        switch (input) {
            case "FRIDAY":
                return WEEK_DAY.FRIDAY;
            case "SATURDAY":
                return WEEK_DAY.SATURDAY;
            case "SUNDAY":
                return WEEK_DAY.SUNDAY;
            default:
                throw new Error("Invalid week day");
        }
    }

    static toShowModel(input:any): Show{
        return new Show(
            input.id,
            input.week_day,
            input.start_time,
            input.end_time,
            input.band_id,
        )
    }
}