(async function fetchWithApi() {
  async function fetchWithRetries(
    url,
    options = {},
    retries = 3,
    delay = 1000
  ) {
    try {
      const response = await fetch(url, options);

      if (!response.ok)
        throw new Error(`API failed with status ${response.status}`);

      return response;
    } catch (error) {
      if (retries != 0) {
        await new Promise((res) => setTimeout(res, delay));
        return fetchWithRetries(url, options, retries - 1, delay);
      } else {
        throw error;
      }
    }
  }

  // fetchWithRetries("https://official-joke-api.appspot.com/random_joke", {}, 3, 1000)
  //   .then(res => console.log("✅ Success", res))
  //   .catch(err => console.error("❌ Failed after retries:", err));

  const res = await fetchWithRetries(
    "https://official-joke-api.appspot.com/random_joke",
    {},
    3,
    1000
  );

  const output = await res.json();

  console.log(output);
})();
