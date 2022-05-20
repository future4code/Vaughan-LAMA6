export enum MusicGenre{
    ROCK = "Rock",
    POP = "Pop",
    PUNK = "Punk",
    JAZZ = "Jazz",
    CLASSIC = "Classic",
    REGGAE = "Reggae",
    BLUES = "Blues",
    COUNTRY = "Country",
    HIPHOP = "HipHop",
    OTHER = "Other"
}

export interface BandInputDTO{
    name: string;
    genre: MusicGenre;
    responsible: string;
}

export class Band{
    constructor(
        private id: string,
        private name: string,
        private music_genre: string,
        private responsible: string,
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name
    }

    getMusicGenre(){
        return this.music_genre;
    }

    getResponsible(){
        return this.responsible;
    }

    static stringToMusicGenre(input: string): MusicGenre{
        switch (input) {
            case "POP":
                return MusicGenre.POP;
            case "ROCK":
                return MusicGenre.ROCK;
            case "CLASSIC":
                return MusicGenre.CLASSIC;
            case "JAZZ":
                return MusicGenre.JAZZ;
            case "REGGAE":
                return MusicGenre.REGGAE;
            case "BLUES":
                return MusicGenre.BLUES;
            case "COUNTRY":
                return MusicGenre.COUNTRY;
            case "HIPHOP":
                return MusicGenre.HIPHOP;
            case "PUNK":
                return MusicGenre.PUNK;
            case "OTHER":
                return MusicGenre.OTHER;
            default:
                throw new Error("Invalid music genre");
        }
    }

    static toBandModel(input: any): Band{
        return new Band(
            input.id,
            input.name,
            input.music_genre,
            input.responsible
        );
    }
}

    