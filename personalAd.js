var content = document.querySelector(".modal-content");

// We render our posts to the UI in this block
var markup = `<h3 class="title">Search a Subreddit...</h3>`;
content.insertAdjacentHTML('afterbegin',markup);

let form = document.querySelector(".form")
form.addEventListener("submit", function(e) {
    e.preventDefault();
    let searchData = document.querySelector(".search");
    let mySearch = searchData.value.replace(/\s/g, '')
    let url = `https://www.reddit.com/r/${mySearch}/.json?sort=new`;

    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(res => {
            
            
            // The array that contains our posts
            const postsArr = res.data.children;

            // Add a header based on post type
            markup = `<h3 class="title">posts from r/${mySearch}</h3>`;
            let currPost;
            // Iterate through our posts array and chain
            // the markup based on our HTML structure
            for (let i = 0; i < postsArr.length; i++) {
                currPost = postsArr[i].data;   // a single post object
                markup += `
                    <div class="card">
                        <img class="card-img-top" src=${currPost.url} alt="img">
                        <div class="card-body">
                            <a class="post" href="https://reddit.com${currPost.permalink}" target="_blank">        
                                <div class="title"> ${currPost.title}</div>
                                <div class="content">${currPost.selftext}</div>
                                <div class="author"> Posted by ${currPost.author}</div>
                            </a>
                        </div>
                    </div>
                `;
            }
            
            // Insert the markup HTML to our container
            while (content.firstChild) {
                content.removeChild(content.lastChild);
              }
            content.insertAdjacentHTML('afterbegin',markup);
        })
        .catch((error) => {
            markup = `<h3 class="title">Subreddit not found.😞</h3>`
            while (content.firstChild) {
                content.removeChild(content.lastChild);
              }
            content.insertAdjacentHTML('afterbegin',markup);          });
})

    
    

    

   