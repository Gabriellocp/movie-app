export enum MOVIE_STATUS {
    WATCHED = 'WATCHED',
    WATCH_LATER = 'WATCH_LATER',

}

export type MovieDb = {
    id: number;
    original_title: string;
    title: string;
    overview: string;
    genres: { name: string, id: number }[],
    poster_path: string
}

export type MovieApi = {
    id: string;
    externalId: string;
    folderId: string;
    status: MOVIE_STATUS;
    annotation: string;
    rate: number;
    createdAt: Date;

}

export type UserMovie = MovieApi & Pick<MovieDb, Exclude<keyof MovieDb, 'id'>>