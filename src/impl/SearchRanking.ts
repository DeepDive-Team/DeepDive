export type SearchRanking = {
    url: string;
    reason: string;
    score: number;
    index: number;
}

export type SearchRankingResponse = {
    rankings: SearchRanking[];
}