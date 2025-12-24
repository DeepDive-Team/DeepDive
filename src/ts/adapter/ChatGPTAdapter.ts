import { AbstractAdapter } from './AbstractAdapter';


export class ChatGPTAdapter extends AbstractAdapter {
    protected handleMutation(element: Element): void {
        if (!element.classList.contains('markdown')) {
            return;
        }

        if (!(element.classList.contains('streaming-animation') || element.classList.contains('result-thinking'))) {

            if (element.hasAttribute('deepdive-processed')) {
                return;
            }

            element.setAttribute('deepdive-processed', "")
            const responseLines = element.querySelectorAll('p');
            const response = [...responseLines].map(p => p.innerText).join('\n');
            this.handleUserResponse(element, response)
        }
    }



}
