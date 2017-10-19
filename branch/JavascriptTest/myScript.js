
/* 
 *  Constants
*/
const GET_BASE_URL    = "https://newsapi.org/v1/sources?";
const PARAM_LANG      = "language=";
const PARAM_CATEGORY  = "&category=";
const PARAM_COUNTRY   = "&country=";

// Object for local storage
var localStorageObj   = window.localStorage;
// Object to store all posts locally 
var postsLocalStorage;

// Set local data to 'postsLocalStorage' if data was cached previously
if(readContentToLocalStorage()) {
    postsLocalStorage = readContentToLocalStorage(); 
}
 

// Vue Object 
var vuePosts = new Vue({
          el: '.vue-test',
          data: {
          	   // Defined variables 
               posts: [],
               categories : [
                   { name : "Select One" ,cat: '' },
                   { name : "business" ,cat: 'business' },
                   { name : "entertainment" ,cat: 'entertainment' },
                   { name : "gaming" ,cat: 'gaming' },
                   { name : "general" ,cat: 'general' },
                   { name : "music" ,cat: 'music' },
                   { name : "politics" ,cat: 'politics' },
                   { name : "science-and-nature" ,cat: 'science-and-nature' },
                   { name : "sport"       ,cat: 'sport' },
                   { name : "technology"  ,cat: 'technology' }
               ],
               languages : [ 
                   {  name : "Select One" ,code: '' },
                   {  name : "English"    ,code: 'en' },
                   {  name : "German"     ,code: 'de' },
                   {  name : "French"     ,code: 'fr' }  
               ],
               countries : [  
                   { name : "Select One" ,countryCode: '' },
                   { name : "Australia" ,countryCode: 'au' },
                   { name : "Germany" ,countryCode: 'de' },
                   { name : "United Kingdom" ,countryCode: 'gb' },
                   { name : "IN" ,countryCode: 'in' },
                   { name : "Italy" ,countryCode: 'it' },
                   { name : "USA"   ,countryCode: 'us' }  
               ],
               // filters
               selectedCategory : "",
               selectedLanguage : "",
               selectedCountry  : ""
            },
            methods: {
            	// function to get all the articles from 'newsapi.org' 
               getPosts: function() {
                      var that = this;
                      // appending filter parameters 
                      var urlString = GET_BASE_URL +  PARAM_LANG + this.selectedLanguage + PARAM_CATEGORY + this.selectedCategory + PARAM_COUNTRY + this.selectedCountry;
                      axios.get(urlString, {
                          // to do adding more params

                      })
                      .then(function (response) {
                        // Success
                        if(response.data.sources) {
                        	// if no filter is applied; store the list in the cache
                            if(isEmpty(this.selectedLanguage) && isEmpty(this.selectedCategory) && isEmpty(this.selectedCountry)) {
                                writeContentToLocalStorage(JSON.stringify(response.data.sources));
                            }
                            // place articles list to model
                            that.posts = response.data.sources;
                        } 
                      })
                      .catch(function (error) { 
                      	// Failure
                      	// On failure fetch aricles from cache
                        that.posts = getLocalFilteredList();

                      });

                },
                // update trigger; fired when any filter is changed
                updatePostList: function() {
                   this.getPosts();
                }

                
              },
              mounted () {
              	// show list of articles from cache   
                if(readContentToLocalStorage()) {
                    this.posts = readContentToLocalStorage();
                }
                // call webservice to get articles as per filters 
                this.getPosts();
              }
    });

/* 
 *  Function to write on local storage
 *  @param String 
 *  @return void
*/
function writeContentToLocalStorage(jsonString) {
    localStorageObj.setItem('myPosts', jsonString);
    postsLocalStorage = readContentToLocalStorage();
}


/* 
 *  Function get articles list from local storage 
 *  @param  nil 
 *  @return JSONObject
*/
function readContentToLocalStorage() {
    var myPosts = localStorageObj.getItem("myPosts");
    if(myPosts) {
        return JSON.parse(myPosts);
    }
    return null;
}


/* 
 *  Function to check if string is empty or nil
 *  @param  String 
 *  @return Boolean
*/
function isEmpty(str) {
    return (!str || 0 === str.length);
}

/* 
 *  Function to get filtered list while application is in Offline mode
 *  @param  nil 
 *  @return Array
*/
function getLocalFilteredList() {
    var filteredList = new Array() ;
    if(postsLocalStorage) {
    	// check any filter is applied
        if(!isEmpty(vuePosts.selectedLanguage) || !isEmpty(vuePosts.selectedCategory) || !isEmpty(vuePosts.selectedCountry)) {
        	// traverse cached objects
            for(var count = 0  ; count < postsLocalStorage.length; count++)  {
            	// get article object from the cache
                var post = postsLocalStorage[count];
                // check if post is according to the filters applied 
                if(isAccordingToFilters(post)) {
                	 // add to filtered list 
                    filteredList.push(post);
                } 
            }
        }
        else {
        	// since no filter is applied replace filtered list with all the artiles cached 
            filteredList =  postsLocalStorage;
        }
    }


    return filteredList;
}

/* 
 *  Function to decide if article is to be shown as per current filters while application is in Offline mode
 *  @param  JSONObject 
 *  @return Boolean
*/
function isAccordingToFilters(obj) {
	// check if article (obj) is not of the applied language filter 
    if(!isEmpty(vuePosts.selectedLanguage) && (obj.language != vuePosts.selectedLanguage)) {
        return false;
    }
    // check if article (obj) is not of the applied category filter 
    if(!isEmpty(vuePosts.selectedCategory) && (obj.category != vuePosts.selectedCategory)) {
        return false;
    }
    // check if article (obj) is not of the applied country filter 
    if(!isEmpty(vuePosts.selectedCountry) && (obj.country != vuePosts.selectedCountry)) {
        return false;
    }
    return true;
}


