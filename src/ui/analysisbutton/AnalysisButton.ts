import * as analysisButtonCss from "./analysisbutton.module.css";
import { playIntroAnimation } from "../analysis/AnalysisIntro";
import { analyzeResults } from "../../analysis/AnalyzeResults";

export function injectAnalyzeButton(): void {
    // const googleBar = document.getElementById('searchform');
    const searchBar = document.getElementById('searchform');
    const barContentsContainer = searchBar?.firstChild;
    
    const settingsBar = barContentsContainer?.lastChild;

    const firstItem = settingsBar?.firstChild;

    if (firstItem == null || settingsBar == null) {
        return;
    }

    const analyzeButton = document.createElement('button');
    analyzeButton.textContent = "DeepDive Analysis"
    analyzeButton.classList.add(analysisButtonCss.deepDiveAnalysisButton);

    settingsBar.insertBefore(analyzeButton, firstItem);

    analyzeButton.addEventListener('click', (event: MouseEvent) => {
        playIntroAnimation();
        analyzeButton.disabled = true;
        analyzeButton.classList.add(analysisButtonCss.disappear);

        analyzeButton.addEventListener('animationend', () => {
            analyzeButton.remove();
        });

        analyzeResults();
    })
}   