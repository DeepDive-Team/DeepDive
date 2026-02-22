import { getPreferredTheme } from "../../util/ThemeUtil";
import infoBubbleHtml from "./infobubble.html?raw";
import * as infoBubbleCss from "./infobubble.module.css";

export function addInfoBubble(parent: Element, searchQueries: string[]): void {
    const info_bubble = document.createElement('div')
    parent.append(info_bubble);
    info_bubble.innerHTML = infoBubbleHtml;
    
    // TODO: Use proper css class naming scheme
    info_bubble.classList.add(infoBubbleCss.deepDiveResults);

    // TODO: separate this out into a utility and an enum
    const preferredColorScheme = getPreferredTheme();
    if (preferredColorScheme == "dark") {
        info_bubble.classList.add(infoBubbleCss.dark);
    }
    else {
        info_bubble.classList.add(infoBubbleCss.light);
    }
    
    // const color_configurations: Record<string, Record<string, string>> = {
    //     "dark": {
    //         "good": infoCss.rankingGoodDark,
    //         "neutral": infoCss.rankingNeutralDark,
    //         "bad": infoCss.rankingBadDark
    //     },
    //     "light": {
    //         "good": infoCss.rankingGood,
    //         "neutral": infoCss.rankingNeutral,
    //         "bad": infoCss.rankingBad
    //     }
    // }

    const queryList = info_bubble.querySelector('ul');

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