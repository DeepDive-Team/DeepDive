import { ChatGPTAdapter } from "./adapter/ChatGPTAdapter";
import { AbstractAdapter } from "./adapter/AbstractAdapter";
import { injectAnalyzeButton } from "./ui/analysisbutton/InjectButton";

class DeepDive {
    public init(): void {
        const deepDiveParam = "deepdive"
        
        const hostname = window.location.hostname;
        
        let adapter: AbstractAdapter | null = null;

        if (hostname.match('chatgpt.com')) {
            console.log("DeepDive: Matched adapter for " + hostname)
            adapter = new ChatGPTAdapter();
        }

        if (adapter) {
            adapter.start();
            return;
        } else {
            console.log("DeepDive: No adapter found for " + hostname);
        }
        
        const parameters = new URLSearchParams(window.location.href)
        if (hostname.match('google.com') && parameters.has(deepDiveParam)) {
            console.log("DeepDive: Referred from the extension")
            injectAnalyzeButton();
        }

    }
}

const deepDive = new DeepDive();
deepDive.init();