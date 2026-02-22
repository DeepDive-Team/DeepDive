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

