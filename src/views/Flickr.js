import Superagent from 'superagent';
import React from "react";
import ComponentGallery from "react-component-gallery";
import Transmit from "react-transmit"
const key='a46d5e2d2faa9d03173217d56cf66f56';
const base = `https://api.flickr.com/services/rest/?api_key=${key}&format=rest&format=json&nojsoncallback=1`;
var Home= React.createClass ({

  handleSearchFlickr() {

    let searchText = this.refs.search.getDOMNode().value;
    var url=`${base}&method=flickr.photos.search&text=${searchText}&per_page=10&page=1`;
    console.log(url);
    
    Superagent
      .get(url)
      .end(function(err,res){
        console.log(res);
        if (res.status === 200 && res.body.photos ) {
          this.setState({
            photos: res.body.photos.photo.map(this.getFlickrPhotoUrl)
          });

          console.log(this.state.photos);
        };
      }.bind(this))
    },
    
    
  
 


    
    
  
  getFlickrPhotoUrl(image) {
    return `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
  },

  getInitialState() {
      return {
        photos: []
    };
  },
   render: function() {console.log(this.state.photos);
 
    var photos=this.state.photos;
    
    
  
    return (
      <div>
        <input ref="search" placeholder="Enter your search" ></input>
        <button onClick={this.handleSearchFlickr}> Search </button>
        <ComponentGallery>
        {photos.map(function(photo){
      return <img src={photo}/>;
    })}
        </ComponentGallery>
      </div>


     
    );
  }
})

export default Transmit.createContainer(Home);