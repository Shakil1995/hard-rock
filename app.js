const searchSong= ()=>{
    const searchText=document.getElementById('search-fieldID').value;
    // console.log(searchText);
     const url=`https://api.lyrics.ovh/suggest/${searchText}`;
  //  const res=await fetch(url);
  //  const data=await res.json();
  //   displaySongs(data.data);

    fetch(url)
    .then(res => res.json())
    .then(data =>displaySongs(data.data))
    .catch(error => displayError('something went wrong ! Plz Try agin'));
}

const displaySongs = songs =>{
const songContainer=document.getElementById('song-container');
songContainer.innerHTML='';
 songs.forEach(song => {
  // console.log(songs);
 const songDiv=document.createElement('div');
 songDiv.className='single-result row align-items-center my-3 p-3';
 songDiv.innerHTML=`
      <div class="col-md-9">
      <h3 class="lyrics-name">${song.title}</h3>
      <p class="author lead">Album by <span>${song.artist.name}</span></p>
       <audio controls>
         <source src=" ${song.preview}" type="audio/mpeg">
       </audio>
      </div>
      
      <div class="col-md-3 text-md-right text-center">
      <button  onClick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
      </div>

 `

 ;


songContainer.appendChild(songDiv);
 
 })

  }



  const getLyrics = async (artist,title) =>{
    const url=`https://api.lyrics.ovh/v1/${artist}/${title}`;

    try{
      const res=await fetch(url);
      const data= await res.json();
     displayLyrics(data.lyrics);
    }catch(error){
      displayError('sorry ! I failed to load lyrics, Please try again');
    }

  }

// const getLyrics =  (artist,title) =>{
//   const url=`https://api.lyrics.ovh/v1/${artist}/${title}`;
//   console.log(url);
//  fetch(url)
//   .then(res => res.json())
//   .then(data =>displayLyrics(data.lyrics))


// }

  const displayLyrics =lyrics =>{
 const lyricsDiv =document.getElementById('displayLyrics');
 lyricsDiv.innerText=lyrics;
  }


  const displayError = error  => {
    const errorTag=document.getElementById('error-message');
    errorTag.innerText=error;
  };