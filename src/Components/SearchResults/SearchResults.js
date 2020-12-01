import React from 'react';
import './SearchResults.css';
import {TrackList} from '../TrackList/TrackList.js'


export class SearchResults extends React.Components {


  render(){
    (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList
          onAdd={this.props.onAdd}
          tracks={this.props.searchResults} />

      </div>
    )
  }
}
