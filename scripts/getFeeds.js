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

    // Special check for Reddit search pages: RSS feeds can be obtained by
    //  replacing 'search' by 'search.rss' in path. Keep query string.
    if (document.location.host.includes("reddit")) {
        const path = document.location.pathname.split('/');
        if (path[path.length - 1] === 'search') {
            found_links.push({
                "href": document.location.origin + document.location.pathname + ".rss" + document.location.search,
                "title": document.forms['search']['q'].value
           });
        }
    }

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


function pageHasFeeds(feed_list)
{
    if (feed_list.length > 0) {
        return {"exists": "found"};
    }
    else {
        return {"exists": "not found"};
    }
}


// Called on add-on load.
const feeds = pageGetFeeds();


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request["text"] == "simple-rss-extractor-get-feeds") {
        sendResponse(JSON.stringify(feeds));
    }
    else if (request["text"] == "simple-rss-extractor-set-icon") {
        sendResponse(JSON.stringify(pageHasFeeds(feeds)));
    }
});
