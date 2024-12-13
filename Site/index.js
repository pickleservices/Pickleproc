const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();

    // Register service worker
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();

        // Debugging step: Output the URL that is being processed
        console.log("Raw URL input:", url);

        // Check if the URL is valid
        if (!isUrl(url)) {
            console.log("URL is invalid. Defaulting to Google search.");
            // If not a valid URL, do a Google search
            url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
        } else {
            // If valid, check and prepend protocol if missing
            if (!(url.startsWith('https://') || url.startsWith('http://'))) {
                console.log("No protocol found. Adding 'http://'");
                url = 'http://' + url; // Default to http if no protocol
            }
        }

        // Debugging step: Output the final URL being used
        console.log("Final URL:", url);

        // Redirect to the encoded URL using the proxy
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

// Refined URL validation function
function isUrl(val = '') {
    // Test if it matches a URL pattern or contains a valid domain
    return /^(https?:\/\/)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,})/.test(val);
}

function quickLink(url1) {
    // Redirect directly to the encoded URL
    window.location.href = __uv$config.prefix + url1;
}

