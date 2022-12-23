// This file is licensed under the terms of the GNU General Public Licence 3.0, or later versions.
// See the LICENSE file in the project's root directory for more details.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    chrome.tabs.sendMessage(tabId, {"text": "simple-rss-extractor-set-icon"}, response => {
        if (response != null) {
            const exists = JSON.parse(response);
            if (exists["exists"] === "found") {
                chrome.action.setIcon({path: {"32": "/images/rss-32.png"}, tabId: tabId});
            }
            else {
                chrome.action.setIcon({path: {"32": "/images/rss-32-gray.png"}, tabId: tabId});
            }
        }
    });
});
