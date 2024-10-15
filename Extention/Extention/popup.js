document.getElementById("replaceDomain").addEventListener("click", () => {
    const selectedDomain = document.querySelector('input[name="domain"]:checked').value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentUrl = new URL(tabs[0].url);
        const newUrl = currentUrl.href.replace(currentUrl.host, selectedDomain);

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: (url) => { window.location.href = url; },
            args: [newUrl]
        });
    });
});
