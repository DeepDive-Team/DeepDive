import { SearchRanking } from "../../impl/SearchRanking";
import { SearchResult } from "../../impl/SearchResult";

const API_BASE_URL: string = 'http://localhost:5000/api/'
const API_QUERY_SEND_URL: string = API_BASE_URL + "queries/send"; 
const API_RANK_RESULTS_URL: string = API_BASE_URL + "queries/rank"; 

export async function fetchSearchQueries(input: string): Promise<QueryCategorization> {
    const data = {"input": input};

    const request = await fetch(API_QUERY_SEND_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!request.ok) {
        throw new Error("DeepDive: Backend request failed")
    }

    const response = await request.json() as QueryCategorization;
    return response;
}

export async function fetchResultRankings(searchResults: SearchResult[]) {
    const data = {"searches": searchResults}

    const request = await fetch(API_RANK_RESULTS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!request.ok) {
        throw new Error("DeepDive: Backend request failed")
    }

    const response = (await request.json()) as SearchRanking[];
}