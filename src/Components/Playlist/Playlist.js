import React from 'react';
import './Playlist.css'
import {TrackList} from '../TrackList/TrackList.js'

export class Playlist extends React.Components {
  constructor(props){
    super(props);
    this.handleChangeName = this.handleChangeName.bind(this);
  }


  handleChangeName(e){
    this.props.onNameChange(e.target.value);
  }

  render(){


    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleChangeName}/>

        <TrackList
           isRemoval={true}
           onRemove={this.props.onRemove}
           tracks={this.props.playlistTracks} />


        <button className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</button>
      </div>
    )
  }
}
