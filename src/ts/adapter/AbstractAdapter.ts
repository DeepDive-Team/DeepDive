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

    protected async fetchQueries(input: string): Promise<ApiResponse> {
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

        const { categorization, search_queries} = await request.json();
        return {
            categorization: categorization,
            search_queries: search_queries
        } satisfies ApiResponse;

    }

    protected async handleUserResponse(element: Element | undefined, input: string): Promise<void> {
        const { categorization, search_queries: searchQueries } = await this.fetchQueries(input);
        console.log(categorization, searchQueries);
        
        const messageContainer = element?.parentElement?.parentElement;

        if (messageContainer) {
            this.addDeepDiveBubble(messageContainer, searchQueries);
        }
        
    }

    private addDeepDiveBubble(element: HTMLElement, queries: string[]): void {
        addInfoBubble(element, queries);
    }



}