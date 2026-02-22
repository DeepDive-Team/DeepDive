import { SearchRanking } from "../../impl/SearchRanking";
import { getPreferredTheme } from "../../util/ThemeUtil";
import infoHtml from "./searchresultinfo.html?raw";
import * as infoCss from "./searchresultinfo.module.css";

export function addResultInfo(parent: HTMLElement, ranking: SearchRanking): void {
    parent.style.display = 'flex';
    parent.style.marginRight = '25px';
    parent.style.alignItems = 'center';
    const info_bubble = document.createElement('div')
    parent.append(info_bubble);

    info_bubble.innerHTML = infoHtml;
    
    info_bubble.classList.add(infoCss.deepDiveRankings);
    const title_container = info_bubble.firstChild as HTMLElement;
    title_container.classList.add(infoCss.titleContainer);


    const information_button = title_container.querySelector("h1");
    information_button?.setAttribute("title", ranking.reason);

    const scoreElement = info_bubble.querySelector("strong");
    if (scoreElement == null) {
        return;
    }
    scoreElement.innerText = ranking.score.toString();

    const preferredColorScheme: string = getPreferredTheme();
    if (preferredColorScheme == "dark") {   
        info_bubble.classList.add(infoCss.darkText);
    }
    else {
        info_bubble.classList.add(infoCss.lightText);
    }

    const color_configurations: Record<string, Record<string, string>> = {
        "dark": {
            "good": infoCss.rankingGoodDark,
            "neutral": infoCss.rankingNeutralDark,
            "bad": infoCss.rankingBadDark
        },
        "light": {
            "good": infoCss.rankingGood,
            "neutral": infoCss.rankingNeutral,
            "bad": infoCss.rankingBad
        }
    }

    if (ranking.score >= 8) {
        info_bubble.classList.add(color_configurations[preferredColorScheme]["good"]);
    }
    else if (ranking.score >= 4) {
        info_bubble.classList.add(color_configurations[preferredColorScheme]["neutral"]);
    }
    else {
        info_bubble.classList.add(color_configurations[preferredColorScheme]["bad"]);
    }


    info_bubble.classList.add(infoCss.fadeIn);
    requestAnimationFrame(() => {
        info_bubble.classList.add(infoCss.visible);
    });
    
}