// This file is licensed under the terms of the GNU General Public Licence 3.0, or later versions.
// See the LICENSE file in the project's root directory for more details.
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {

    chrome.tabs.sendMessage(tabs[0].id, {"text": "simple-rss-extractor-get-feeds"}, response => {
        if (response != null) {
            const feed_list = JSON.parse(response);
            if (feed_list.length != 0) {
                document.getElementById("rss-header").innerText = "Found:";
                for (const feed of feed_list) {
                    let li = document.createElement("li");
                    let a = document.createElement("a");
                    a.href = feed["href"];
                    a.innerText = feed["title"];
                    li.append(a);

                    let button = document.createElement("button");
                    button.title = feed["title"];
                    button.value = feed["href"];
                    button.innerText = "Copy";
                    button.addEventListener("click", event => {
                        navigator.clipboard.writeText(event.target.value);
                    });
                    li.append(button);

                    document.getElementById("rss-list").append(li);
                }
            }
        }
    });
});
