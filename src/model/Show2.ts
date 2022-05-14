export enum WEEK_DAY{
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
    
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

    getStart_time(){
        return this.start_time;
    }

    getEnd_time(){
        return this.end_time;
    }

    getBand_id(){
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
                throw new Error("Invalid music genre");
        }
    }

    static toShowModel(input: any): Show{
        return new Show(
            input.id,
            input.week_day,
            input.start_time,
            input.end_time,
            input.band_id,
        );
    }
}
