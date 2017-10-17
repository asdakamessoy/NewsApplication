

const GET_BASE_URL    = "https://newsapi.org/v1/sources?";
const PARAM_LANG      = "language=";
const PARAM_CATEGORY  = "&category=";
const PARAM_COUNTRY   = "&country=";

var vuePosts = new Vue({
          el: '.vue-test',
          data: {
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
                   { name : "sport" ,cat: 'sport' },
                   { name : "technology" ,cat: 'technology' }
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
                   { name : "USA" ,countryCode: 'us' }  
               ],
               selectedCategory : "",
               selectedLanguage : "",
               selectedCountry  : ""
            },
            methods: {
               getPosts: function() {
                      var that = this 
                      var urlString = GET_BASE_URL +  PARAM_LANG + this.selectedLanguage + PARAM_CATEGORY + this.selectedCategory + PARAM_COUNTRY + this.selectedCountry;
                      axios.get(urlString, {
                          // to do adding more params


                      })
                      .then(function (response) {
                        // to do success
                        if(response.data.sources) {
                            that.posts = response.data.sources;
                            console.log(response.data.sources);

                        } 
                      })
                      .catch(function (error) {
                        // to do failure
                        alert("category not valid");
                        console.log(error);
                      });

                },
                updatePostList: function() {
                   this.getPosts()
                }

                
              },
              mounted () {
                this.getPosts()
              }
    });



