//ready on load
(function(){
    //assign HTML elements into constant variables
    const searchForm = document.getElementById('search-form');
    const searchBox = document.getElementById('search-box');
    const searchResult = document.getElementById('search-result');
    const btnShowMore = document.getElementById('show-more-btn');

    let keyword = "";
    let page = 1;
    let accessKey = "1R_Dx7GyindQEmmpXb3oi84tJbeX-YdO95SBVhobCjQ";  //obtain from unsplash.com website w/ developer registration
    
    async function searchImage(){
        //assign input from iniput box
        keyword = searchBox.value;
        //assign page number, keyword and api
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
        //responses from unsplash website api call
        const response = await fetch(url);
        //the url fetch returns a lot. Take them as json.
        const data = await response.json();

        //clear the page if there are images
        if(page===1){
            searchResult.innerHTML = '';
        }
        //data.results => results from the json object, responded from the API 
        const results = data.results;
        //loop the results to get the elements inthe result out. 
        results.map((result) => {
            //create a new element img
            const image = document.createElement('img');
            //add url src - comes from json obj's result's urls' small => check Json codes for better reference
            image.src = result.urls.small;
            //create a new link element
            const imageLink = document.createElement('a');
            //check Json codes for better reference
            imageLink.href = result.links.html;
            //setting target _blank to open it in a new tab
            imageLink.target = "_blank";
            //append img tag into a tag
            imageLink.appendChild(image);
            //append a tag into search-result div
            searchResult.appendChild(imageLink);
        });
        //reveal the hidden show more button
        btnShowMore.style.display = 'block';
    }

    searchForm.addEventListener('submit', (e) => {
        //to prevent double loads and whatnot
        e.preventDefault();
        page = 1;
        searchImage();
    });

    btnShowMore.addEventListener('click', (e) =>{
        page++;
        searchImage();
    });
})();

/* 
    copyright free images for website development
    https://unsplash.com/
    Developers/API => Register as Developer


    API access key =  1R_Dx7GyindQEmmpXb3oi84tJbeX-YdO95SBVhobCjQ
    App => Copy API key above => Go to Documentation

    https://api.unsplash.com/search/photos?page=1&query=office
    Copy and paste the API link provided => Will show authentication error

    add &client_id= + API access key
*/