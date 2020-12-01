import React from 'react';
import './SearchBar.css'

export class SearchBar extends React.Components {
  constructor(props){
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  handleTermChange(e){
    this.setState({searchInput: e.target.value});
  }

  search(){
    this.props.onSearch(this.state.searchInput);
  }

  render(){
    //search function should be added in this section so each time add new input the search result updates
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <button className="SearchButton">SEARCH</button>

      </div>
    )
  }
}
