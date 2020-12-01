import React from 'react';
import {SearchResults} from '../SearchResults/SearchResults.js';
import {SearchBar} from '../SearchBar/SearchBar.js';
import {Playlist} from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';


class App extends React.Components {
  constructor(props){
    super(props);
    this.state.searchResults = [{
        name:'dariush',
        artist: 'dariun',
        album:'darya',
        id:23

    }];
    this.state.playlistName = 'yak';
    this.state.playlistTracks = [{
        name:'bahram',
        artist: 'bahr',
        album:'24-saat',
        id:24

    }];
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }

  search(response){
    console.log(response);
    Spotify.search(response)
    .then(trackArray => {
        this.setState({searchResults: trackArray});
    })

  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => {
      return track.uri ;
    })
    Spotify.savePlayList(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []

    })
    //should i return trackURIs ?
  }

  updatePlaylistName(newName){
    this.setState({playlistName: newName});
  }


  removeTrack(track){
    this.state.playlistTracks.forEach((tr, index)=> {
      if (tr.id === track.id){
        this.state.playlistTracks.splice(index, 1);
        this.setState();
        return ;
      }
    })

  }


  addTrack(newTrack){
    const checkDuplicate = this.state.playlistTracks.find(track => {
      return track.id === newTrack.id ;
    })
    if (!checkDuplicate){
    this.state.playlistTracks.push(newTrack);
    this.setState();
  }
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">

            <SearchResults
               onAdd={this.addTrack}
               searchResults={this.state.searchResults} />
            <Playlist
              onSave = {this.savePlaylist}
              onNameChange= {this.updatePlaylistName}
              onRemove={this.removeTrack}
              playlistTracks={this.state.playlistTracks}
              playlistName={this.state.playlistName}  />
          </div>
        </div>
      </div>
    )
  }
}
export default App ;
