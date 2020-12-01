
const client_id = '' ;
const redirect_uri = 'http://localhost:3000/';
let UAT = '';
const Spotify = {

  getAccessToken() {
    if (UAT !== ''){
      return UAT ;
    }
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expireMatch = window.location.href.match(/expires_in=([^&]*)/);

    if(tokenMatch && expireMatch){
      UAT = tokenMatchl[1];
      const expireIn =  number(expireMatch[1]);
      //clear user access token and set the history of current page to '/' without reloading currnet page so this condition could not be executed
      window.setTimeOut(()=> UAT = '' , expireIn * 1000 );
      window.history.pushState('access token has removed', null , '/');
      return UAT ;

    }else if(UAT === '') {
      window.history = `https://accounts.spotify.com/authorize?client_id=${clieclient_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`
    }
  },
  search(searchInput){
    const baseURL = 'https://api.spotify.com/v1/search?q=';
    //this.getAccessToken()
    let url = `${baseURL}name:${searchInput}&type=track`;
    fetch(url , {
      //method:'GET',
      headers:{Authorization:`Bearer ${this.getAccessToken()}`}

    })
    .then(res => {
      if(res.ok){
        return res.json() ;
      }
      throw new Error('request failed ! ')
    }, rej => {
      console.log(rej.message);
    })
    .then(resJson => {
      if(!resJson.tracks){
        return [];
      }
      return resJson.tracks.items.map(track=>{
          return {
            id: track.id ,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri

          }
      })

    })




  },

  savePlayList(name, playlist){
    if(!name || !playlist){
      return ;
    }
    AccessToken = this.getAccessToken()



    let playlistId;
    let userID;
    let basePlaylistURL ;
    const baseProfileURL = 'https://api.spotify.com/v1/me'
      fetch(baseProfileURL, {
        headers: {Authorization:`Bearer ${AccessToken}`}
      })
      .then(resolve =>{
        return resolve.json()
      })
      .then(jsonResolve =>{
        userID = jsonResolve.id;
        return userID;
      })
      //user id has been received
      .then(uID => {
        baseCreatePlaylistURL = `https://api.spotify.com/v1/users/${uID}/playlists`;
        return fetch(baseCreatePlaylistURL , {
          headers: {
            Authorization:`Bearer ${this.getAccessToken()}` ,
            'Content-Type': 'application/json'
                 },
          body:
            //why we use json.stringigy when its already an javascript object ?
            json.stringify({'name':name})



        })
      }
    )
    .then(res => {
      res.json();
    })
    .then(jsonResolve =>{
      playlistId = jsonResolve.id
      return playlistId;
    })
    //the playlistid has been received;
    .then(playlistId => {
      baseAddPlaylist = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
      return fetch(baseAddPlaylist , {
        headers: {
          Authorization:`Bearer ${AccessToken}` ,
          'Content-Type': 'application/json'
               },
        body:
          JSON.stringify({"uris": playlist})





      })
      .then(obj => {
        return obj.json();
      })
      .then(jsonobj => {
        return playlistId = jsonobj.id ;

      })
    })

  }


}

export default Spotify ;
