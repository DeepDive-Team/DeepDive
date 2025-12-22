import { ChatGPTAdapter } from "./adapter/ChatGPTAdapter";
import { AbstractAdapter } from "./adapter/AbstractAdapter";

class DeepDive {
    public init(): void {
        const hostname = window.location.hostname;
        let adapter: ChatGPTAdapter | null = null;

        // Factory
        if (hostname.match('chatgpt.com')) {
            console.log("DeepDive: Matched adapter for " + hostname)
            adapter = new ChatGPTAdapter();
        }

        if (adapter) {
            adapter.start();
        } else {
            console.warn("DeepDive: No adapter found for " + hostname);
        }
    }
}

const deepDive = new DeepDive();
deepDive.init();