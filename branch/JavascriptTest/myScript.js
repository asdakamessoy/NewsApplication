

const GET_BASE_URL    = "https://newsapi.org/v1/sources?";
const PARAM_LANG      = "language=";
const PARAM_CATEGORY  = "&category=";
const PARAM_COUNTRY   = "&country=";

var vuePosts = new Vue({
          el: '.vue-test',
          data: {
              posts: [],
               categories : [
                   { cat: 'business' },
                   { cat: 'entertainment' },
                   { cat: 'gaming' },
                   { cat: 'general' },
                   { cat: 'music' },
                   { cat: 'politics' },
                   { cat: 'science-and-nature' },
                   { cat: 'sport' },
                   { cat: 'technology' }
               ],
               languages : [ 
                   { code: 'en' },
                   { code: 'de' },
                   { code: 'fr' }  
               ],
               countries : [  
                   { countryCode: 'au' },
                   { countryCode: 'de' },
                   { countryCode: 'gb' },
                   { countryCode: 'in' },
                   { countryCode: 'it' },
                   { countryCode: 'us' }  
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



