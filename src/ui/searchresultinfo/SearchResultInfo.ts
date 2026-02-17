import infoHtml from "./searchresultinfo.html?raw";
import * as infoCss from "./searchresultinfo.module.css";

export function addResultInfo(parent: HTMLElement): void {
    parent.style.display = 'flex';
    parent.style.marginRight = '15px';
    const info_bubble = document.createElement('div')
    parent.append(info_bubble);

    info_bubble.innerHTML = infoHtml;
    
    info_bubble.classList.add(infoCss.deepDiveRankings);
}