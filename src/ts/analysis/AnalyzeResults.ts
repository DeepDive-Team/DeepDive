export function analyzeResults() {
    // the class of search results
    const results: HTMLCollection = document.getElementsByClassName('MjjYud');

    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.childElementCount == 0) {
            continue;
        }
        
        // the class of the site url div
        const titleElement = result.getElementsByClassName("yuRUbf")[0];
        const linkElement: HTMLAnchorElement = titleElement.querySelector('a') as HTMLAnchorElement;

        const url = linkElement.href
        const title = (linkElement.querySelector('h3') as HTMLHeadingElement).textContent;

        let description;

        try {
            const descriptionDiv =  result.firstChild?.firstChild?.childNodes[1] as HTMLElement;
            const descriptionSpan = (descriptionDiv.querySelector('span') as HTMLSpanElement);

            // Sometimes the span seems to be missing?
            // Weird fix but it works.
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
        // Some results do not have a description
        } catch (error) {
            description = "<no description>";
        }
 

        console.log(url);
        console.log(title);
        console.log(description);

        // the class of the site title div

        // console.log(result);
    }
}