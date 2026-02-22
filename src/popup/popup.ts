const checkbox = document.querySelector("input") as HTMLInputElement;

checkbox.checked = await isExtensionEnabled();

checkbox.addEventListener('change', (event: Event) => {
    if (checkbox.checked) {
        enableExtension();
    }
    else {
        disableExtension();
    }
})


// StateManager cannot be imported since it is within a different module
// TODO: Find a more graceful way to handle this

export async function isExtensionEnabled(): Promise<boolean> {
    const result = await chrome.storage.local.get("enabled");

    if (result.enabled == undefined) {
        chrome.storage.local.set({enabled: true});
        return true;
    }
    else {
        return result.enabled;
    }

}

export function enableExtension() {
    chrome.storage.local.set({enabled: true});
}

export function disableExtension() {
    chrome.storage.local.set({enabled: false});
}
