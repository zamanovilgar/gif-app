const gifDetail = document.querySelector("#gifDetail");
const gifSearch = document.querySelector("#gifSearch");

gifSearch.addEventListener("keydown", async function (e) {
  if (e.key === "Enter") {
    const gifTitle = this.value;
    await renderGifs(gifTitle);
    this.value = "";
  }
});

async function getGif(title) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=TW7H910zTazo1cy8sfulDEwtb5bteotb&q=${title}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function renderGifs(title) {
  try {
    const gifElement = gifDetail;
    const data1 = await getGif(title);

    const content = data1
      .map((gif) => {
        return `<div class="w-25">
                <img src="${gif.images.fixed_height.url}" class="card-img-top">
               
            </div>`;
      })
      .join("");

    gifElement.innerHTML = content;
  } catch (err) {
    console.err("error");
  }
}
