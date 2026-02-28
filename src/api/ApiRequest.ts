import { SearchRanking, SearchRankingResponse } from "../impl/SearchRanking";
import { SearchResult } from "../impl/SearchResult";

const API_BASE_URL: string = 'https://deepdive-backend.vercel.app/api/'
// const API_BASE_URL: string = 'http://localhost:5000/api/'
const API_QUERY_SEND_URL: string = API_BASE_URL + "queries/send"; 
const API_RANK_RESULTS_URL: string = API_BASE_URL + "queries/rank"; 
const API_METRICS_URL: string = API_BASE_URL + "metrics"; 

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

export async function fetchResultRankings(query: string, searchResults: SearchResult[]) {
    const data = {
        "query": query,
        "results": searchResults
    };

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

    const response = (await request.json()) as SearchRankingResponse;
    return response;
}

export async function sendSurveyResults(responseHelpful: boolean, responseId: number): Promise<void> {
    const data = {
        "helpful": responseHelpful,
        "response_id": responseId
    }

    const request = await fetch(API_METRICS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!request.ok) {
        throw new Error("DeepDive: Backend request failed")
    }

}