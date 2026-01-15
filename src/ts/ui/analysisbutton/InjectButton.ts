import * as analysisButtonCss from "./analysisbutton.module.css";

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
        console.log("click");
        // analyzeButton.classList.add(analysisButtonCss.animate);
    })
}   