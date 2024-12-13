const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();
    
    // Register service worker
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();

        // Check if the URL is valid
        if (!isUrl(url)) {
            // If not a valid URL, do a Google search
            url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
        } else {
            // If valid, check and prepend protocol if missing
            if (!(url.startsWith('https://') || url.startsWith('http://'))) {
                url = 'http://' + url; // Default to http if no protocol
            }
        }

        // Redirect to the encoded URL using the proxy
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

function isUrl(val = '') {
    // Regex to test if it's a valid URL (with protocol or domain)
    return /^(https?:\/\/)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,})/.test(val);
}

function quickLink(url1) {
    // Redirect directly to the encoded URL
    window.location.href = __uv$config.prefix + url1;
}
