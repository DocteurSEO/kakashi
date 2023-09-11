// Pour un code serveur, la "vue" serait plus axée sur les réponses HTTP
export function postResponse(keyFromUrl, key) {
    const message = keyFromUrl ? "Value stored successfully" : key;
    return new Response(message, { status: 200 });
}

export function getResponse(value) {
    const isString = typeof value === "string";

    return new Response(isString ? value : JSON.stringify(value));
}

export function errorResponse() {
    return new Response("Internal Server Error", { status: 500 });
}

export function notFoundResponse() {
    return new Response("Not found", { status: 404 });
}
