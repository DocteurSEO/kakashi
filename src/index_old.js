addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
	const keyFromUrl = new URL(request.url).searchParams.get("key");
	// Determine the key to use (either from URL or a random one)
	const key = keyFromUrl || Math.random().toString(36).substring(7);
	try {
	  if (request.method === "POST") {

		const value = await request.text();
  
		
  
		const options = keyFromUrl ? undefined : { expirationTtl: 18000 };
  
		await SHARINGAN.put(key, value, options);
  
		const message = keyFromUrl ? "Value stored successfully" : key;
		return new Response(message, { status: 200 });
	  }
	} catch (error) {
	  console.error("Failed to handle request:", error);
	  return new Response("Internal Server Error", { status: 500 });
	}

	if(request.method === "GET") {
		const filter = new URL(request.url).searchParams.get("filter");
		 ;
		const value = filter ? await SHARINGAN.list({ prefix: filter, limit: 30}) : await SHARINGAN.list({ limit: 30});
		return new Response(JSON.stringify(value.keys));

	}
  
	return new Response("Not found", { status: 404 });
  }
  