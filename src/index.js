import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import VideoList from './components/video_list';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
import YTSearch from 'youtube-api-search';
import _ from 'lodash'; 

const API_KEY = 'AIzaSyDYh0lxX-h4uxykAsJkDypcBzzi8r4ohhc';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo : null
    }
    this.videoSearch("");
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, videos => {
      console.log(videos);
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0]
       });
    })
  }

  render () {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('.container'));
