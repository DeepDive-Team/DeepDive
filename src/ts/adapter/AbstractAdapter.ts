import { addInfoBubble } from "../ui/infobubble/InfoBubble";

export abstract class AbstractAdapter {

    private observer: MutationObserver;

    constructor() {
        this.observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {            
                const targetNode: Node = mutation.target;
                if (targetNode instanceof Element) {
                    this.handleMutation(targetNode);
                }
            }
        });
    }

    public start(): void {
        this.observer.observe(document.body, { 
            subtree: true,
            attributes: true,    
            attributeFilter: ['class']
        });
    }

    protected abstract handleMutation(element: Element): void;

    protected async fetchQueries(input: string): Promise<JSON> {
        const url = 'http://localhost:5000/api/request';  // Replace with your API URL
        const data = {"input": input};  // The data to send
    
        const request = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (!request.ok) {
            throw new Error("DeepDive: Backend request failed")
        }

        const response = await request.json();
        return response;

    }

    protected handleUserResponse(element: Element, input: string): void {
        this.fetchQueries(input)
        .then((apiData: JSON) => {
            const parsedData: ApiResponse = apiData as unknown as ApiResponse;

            console.log(parsedData.categorization);
            console.log(parsedData.search_queries);


            // responseLines.textContent += parsedData.search_queries[0];
            if (!(element instanceof HTMLElement)) {
                return;
            }

            const htmlElement = element as HTMLElement;
            const messageContainer = htmlElement.parentElement?.parentElement;

            if (messageContainer == null) {
                return;
            }

            this.addDeepDiveBubble(messageContainer, parsedData.search_queries);

        });
        
    }

    private addDeepDiveBubble(element: HTMLElement, queries: string[]): void {
        addInfoBubble(element, queries);
    }



}