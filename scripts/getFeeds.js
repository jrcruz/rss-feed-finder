// This file is licensed under the terms of the GNU General Public Licence 3.0, or later versions.
// See the LICENSE file in the project's root directory for more details.
const types = [
    'application/rss+xml',  'text/rss+xml',
    'application/atom+xml', 'text/atom+xml',
    'application/rdf+xml',  'text/rdf+xml',
    'application/rss',  'text/rss',
    'application/atom', 'text/atom',
    'application/rdf',  'text/rdf'
];


function pageGetFeeds()
{
    let found_links = [];
    for (const link of document.getElementsByTagName("link")) {
        if (link["type"] && link["href"] && types.includes(link["type"].toLowerCase())) {
           found_links.push({
                "href": link["href"],
                "title": link["title"] || link["href"]
           });
        }
    }
    return found_links;
}


function pageHasFeeds()
{
    for (const link of document.getElementsByTagName("link")) {
        if (link["type"] && link["href"] && types.includes(link["type"].toLowerCase())) {
            return {"exists": "found"};
        }
    }
    return {"exists": "not found"};
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request["text"] == "simple-rss-extractor-get-feeds") {
        sendResponse(JSON.stringify(pageGetFeeds()));
    }
    else if (request["text"] == "simple-rss-extractor-set-icon") {
        sendResponse(JSON.stringify(pageHasFeeds()));
    }
});
