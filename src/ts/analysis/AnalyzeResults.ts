import { SearchResult } from "../../impl/SearchResult";
import { fetchResultRankings } from "../api/ApiRequest";
import { playOutroAnimation } from "../ui/analysis/AnalysisIntro";

export async function analyzeResults() {
    // the class of search results
    const results: HTMLCollection = document.getElementsByClassName('MjjYud');

    const searchResults: Array<SearchResult> = new Array();

    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.childElementCount == 0) {
            continue;
        }
        
        // the class of the site url div
        const titleElement = result.getElementsByClassName("yuRUbf")[0];

        // An empty invisible result
        // Not sure when or why this happens
        if (titleElement == null) {
            continue;
        }

        const linkElement: HTMLAnchorElement = titleElement.querySelector('a') as HTMLAnchorElement;

        const url = linkElement.href
        const title = (linkElement.querySelector('h3') as HTMLHeadingElement).textContent;

        let description;

        try {

            // TODO: Fix results with a picture preview
            // They have a different class name for the description

            // const descriptionDiv =  result.firstChild?.firstChild?.childNodes[1] as HTMLElement;
            const descriptionDiv = result.querySelector<HTMLElement>('.kb0PBd.A9Y9g:not(.jGGQ5e)');

            if (descriptionDiv == null) {
                description = "<no description>"
            }
            else {
                const descriptionSpan = (descriptionDiv.querySelector('span') as HTMLSpanElement);

                // Sometimes the span seems to be missing?
                // Weird. but this fix works.
                if (descriptionSpan == null && descriptionDiv.textContent != null) {
                    description = descriptionDiv.textContent;
                }
                else {
                    // The first span may be a date instead of the description
                    if (descriptionSpan.classList.contains('YrbPuc')) {
                        // First child is the date, second is an em dash, third is the description
                        description = (descriptionDiv.querySelectorAll('span')[2] as HTMLSpanElement).textContent;
                    }
                    else {
                        description = descriptionSpan.textContent;
                    }
                }
            }


        // Some results do not have a description
        } catch (error) {
            description = "<no description>";
        }
 
        const searchResult: SearchResult = {
            "url": url,
            "title": title,
            "description": description
        };

        searchResults.push(searchResult);

    }

    await fetchResultRankings(searchResults);
    playOutroAnimation();

}