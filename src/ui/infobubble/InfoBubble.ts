import { sendSurveyResults } from "../../api/ApiRequest";
import { getPreferredTheme } from "../../util/ThemeUtil";
import infoBubbleHtml from "./infobubble.html?raw";
import * as infoBubbleCss from "./infobubble.module.css";

let thumbsUpButton: HTMLImageElement;
let thumbsDownButton: HTMLImageElement;

let thumbsUpListener: (event: PointerEvent) => void;
let thumbsDownListener: (event: PointerEvent) => void;

function handleClick(clickedResourceLocation: string, helpfulResponse: boolean, responseId: number) {
    if (helpfulResponse) {
        thumbsUpButton.src = clickedResourceLocation;
    }
    else {
        thumbsDownButton.src = clickedResourceLocation;
    }

    thumbsUpButton.removeEventListener('click', thumbsUpListener);
    thumbsDownButton.removeEventListener('click', thumbsDownListener);

    thumbsUpButton.style.removeProperty('cursor');
    thumbsDownButton.style.removeProperty('cursor');

    sendSurveyResults(helpfulResponse, responseId);
}

function addSurveyButton(parent: HTMLElement, startResourceLocation: string, clickedResourceLocation: string, helpfulResponse: boolean, responseId: number) {
    const surveyButton = document.createElement('img');

    surveyButton.classList.add(infoBubbleCss.survey);
    surveyButton.style.all = 'unset';
    surveyButton.style.cursor = 'pointer';
    surveyButton.src = startResourceLocation;
    parent.appendChild(surveyButton);

    if (helpfulResponse) {
        thumbsUpButton = surveyButton;
        thumbsUpListener = () => handleClick(clickedResourceLocation, helpfulResponse, responseId);
        surveyButton.addEventListener('click', thumbsUpListener);
    }
    else {
        thumbsDownButton = surveyButton;
        thumbsDownListener = () => handleClick(clickedResourceLocation, helpfulResponse, responseId);
        surveyButton.addEventListener('click', thumbsDownListener);
    }

}

export function addInfoBubble(parent: Element, searchQueries: string[], responseId: number): void {
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


    if (responseId > -1) {
        const surveyContainer = document.createElement('div');
        surveyContainer.classList.add(infoBubbleCss.survey);
        info_bubble.appendChild(surveyContainer);

        const helpfulTitle: HTMLParagraphElement = document.createElement('p');
        helpfulTitle.textContent = "Was this helpful?";
        surveyContainer.appendChild(helpfulTitle);

        const thumbsUpResource = chrome.runtime.getURL("src/assets/thumbs_up.svg");
        const thumbsUpFilledResource = chrome.runtime.getURL("src/assets/thumbs_up_filled.svg");

        addSurveyButton(surveyContainer, thumbsUpResource, thumbsUpFilledResource, true, responseId);

        const thumbsDownResource = chrome.runtime.getURL("src/assets/thumbs_down.svg");
        const thumbsDownFilledResource = chrome.runtime.getURL("src/assets/thumbs_down_filled.svg");

        addSurveyButton(surveyContainer, thumbsDownResource, thumbsDownFilledResource, false, responseId);

 

        

    }

}