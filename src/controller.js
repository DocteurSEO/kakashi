import { storeData, listData, generateRandomKey, getData } from './model.js';
import { postResponse, getResponse, errorResponse, notFoundResponse } from './view.js';

export async function handleRequest(request) {
    try {
        const urlParams = new URL(request.url).searchParams;
        const keyFromUrl = urlParams.get("key");
        const key = keyFromUrl || generateRandomKey();

        if (request.method === "POST") {
            const value = await request.text();
            const options = keyFromUrl ? undefined : { expirationTtl: 18000 };
            await storeData(key, value, options);
            return postResponse(keyFromUrl, key);
        } else if (request.method === "GET") {
          
            if(keyFromUrl){
                const value = await getData(key);
                return getResponse(value);
            }
        
            const filter = urlParams.get("filter");
            const listOptions = filter ? { prefix: filter, limit: 30 } : { limit: 30 };
            const listValue = await listData(listOptions);
            return getResponse(listValue);
            
            

            
        }
    } catch (error) {
        console.error("Failed to handle request:", error);
        return errorResponse();
    }
    return notFoundResponse();
}
