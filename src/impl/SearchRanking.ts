export type SearchRanking = {
    url: string;
    reason: string;
    score: number;
}

export type SearchRankingResponse = {
    rankings: SearchRanking[];
}