import infoBubbleHtml from "./infobubble.html";
import * as infoBubbleCss from "./infobubble.module.css";

export function addInfoBubble(parent: Element, searchQueries: string[]): void {
    const infobubble = document.createElement('div')
    parent.append(infobubble);
    infobubble.innerHTML = infoBubbleHtml;
    // TODO: Use proper css class naming scheme
    infobubble.classList.add(infoBubbleCss.deepDiveResults);

    const queryList = infobubble.querySelector('ul');

    for (const query of searchQueries) {
        const listElement = document.createElement('li');

        const linkElement = document.createElement('a');
        const link: string = `https://www.google.com/search?q=${query}&udm=14&deepdive=1`
        linkElement.href = link;
        linkElement.target = '_blank';
        linkElement.textContent = query;

        listElement.appendChild(linkElement);
        queryList?.appendChild(listElement);
    }

}