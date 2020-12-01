
import React from 'react';
import './TrackList.css';
import {Track} from '../Track/Track.js'


export class TrackList extends React.Components {


  render(){
    (

      <div className="TrackList">
          {this.props.tracks.map(
            track =>{
              const key = track.id
              (<Track
                 isRemoval={this.props.isRemoval}
                 track={track}
                 onAdd={this.props.onAdd}
                 onRemove={this.props.onRemove}
                 />)
            }
           )}
      </div>
    )
  }
}
