import { fetchSearchQueries } from "../api/ApiRequest";
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



    protected async handleChatResponse(element: Element | undefined, input: string): Promise<void> {
        const { categorization, search_queries: searchQueries } = await fetchSearchQueries(input);
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