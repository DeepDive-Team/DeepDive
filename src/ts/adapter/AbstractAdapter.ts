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
}