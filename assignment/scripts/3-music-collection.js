console.log('***** Music Collection *****')
// Safe Zone -- Write code below this line

// - Create an empty array named `myCollection`.

const myCollection = [];

// - Create a function named `addToCollection`. 
//   - Update the `addToCollection` function to also take an input parameter for the array of tracks.

function addToCollection(collection, title, artist, yearPublished, tracks) {
    let newAlbum = {
        title : title,
        artist : artist,
        yearPublished : yearPublished,
        tracks : tracks
    };

    collection.push(newAlbum);

    return newAlbum;
}

// - Use and Test the `addToCollection` function:
console.log("----TEST ADD TO COLLECTION-----")

console.log(addToCollection(myCollection, "Snooze", "SZA", 2020));
console.log(addToCollection(myCollection, "Fast Car", "Luke Combs", 2023));
console.log(addToCollection(myCollection, "Now and Then", "The Beatles", 2023));
console.log(addToCollection(myCollection, "Self Esteem", "The Offspring", 1994));
console.log(addToCollection(myCollection, "The Sign", "Ace of Base", 1994));
console.log(addToCollection(myCollection, "Smells Like Teen Spirit", "Nirvana", 1991));

// Test addToCollection function with tracks
let arrayOfTracks1 = [
    { name: "False Pretense", duration: "4:01" },
    { name: "Antehm for the Underdog", duration: "3:01" },
    { name: "Someday", duration: "3:57" },
]
console.log("----TEST TRACKS ADD TO COLLECTION-----")
console.log(addToCollection(myCollection, "Never Back Down", "Never Back Down Film", 2008, arrayOfTracks1));

console.log("Here is my collection of albums: ", myCollection);




// - Create a function named `showCollection`.
//   - Update the `showCollection` function to display the list of tracks for each album with its name and duration.
//   - ```
//     TITLE by ARTIST, published in YEAR:
//         1. NAME: DURATION
//         2. NAME: DURATION
//         3. NAME: DURATION 

function showCollection(collection) {
    for (let i = 0; i < collection.length; i++) {
        let record = collection[i];
        console.log(`${record.title} by ${record.artist}, published in ${record.yearPublished}`);
        if (record.tracks) {
            console.log("   Album Tracks: ")
            for (let j = 0; j < record.tracks.length; j++) {
                let track = record.tracks[j]
                
                console.log(`       ${j + 1}: ${track.name}: ${track.duration}`);
            }
        }
    }
}

// - Test the `showCollection` function.
console.log("----TEST SHOW COLLECTION WITH THE STRECHY GOAL OF TRACKS - LAST ITEM NEVER BACK DOWN SOUNDTRACK -----")
console.log("Here is my collection of albums");
showCollection(myCollection);


// - Add a function named `findByArtist`.
function findByArtist(collection, artist) {
    const artistArray = [];
    for (let i = 0; i < collection.length; i++) {
        let currentRecord = collection[i];
        if (currentRecord.artist === artist) {
            artistArray.push(currentRecord);
        }
    }
    return artistArray;
}

// - Test the `findByArtist` function. Make sure to test with an artist you know is in the collection, as well as an artist you know is not in your collection. Check that for artists with multiple matches, all are returned.
console.log("----TEST FIND BY ARTIST-----")
console.log("Searching for artist Nirvana: ", findByArtist(myCollection, "Nirvana"));



// ### Stretch Goal

// - Create a function called `search` that will allow for searching by `artist` **and** `year`.
// - Update `search` to allow an optional `trackName` search criteria. 
// - IF the search object has a `trackName` property, only search for that, *ignoring* any `artist` or `year` properties.


function search(collection, searchCriteria) {
    const searchResults = [];
    let { artist, yearPublished, trackName } = searchCriteria;
    
    // If there is a track in the search criteria
    if (trackName) {
        for (let currentRecord of collection) {
            if (currentRecord.tracks) {
                for (let track of currentRecord.tracks) {
                    if (trackName.toLowerCase() === track.name.toLowerCase()) {
                        searchResults.push(currentRecord);
                        break;
                    }
                }
            }
        }
    // If there is no track listed in the search criteria
    } else {
        if (!searchCriteria || Object.keys(searchCriteria).length === 0) {
            return collection;
        }

        // Search through the collection
        for (let currentRecord of collection) {
            let artistMatch = artist ? currentRecord.artist.toLowerCase() === artist.toLowerCase() : true;
            let yearMatch = yearPublished ? currentRecord.yearPublished === yearPublished : true;

            if (artistMatch && yearMatch) {
                searchResults.push(currentRecord);
            }
        }
    }

    return searchResults;
}

// Test Search criteria with tracks
let searchParameters = {
    artist : "Never BackDown",
    yearPublished: 2008,
    trackName: "False Pretense"
}

console.log("------ TESTING SEARCH CRITERIA WITH UPDATED STRETHCY STRECH GOALS ------");
let strechSearchResults = search(myCollection, searchParameters);
console.log(strechSearchResults);


// ----- SEE ABOVE FUNCTIONS FOR EXTRA STRETHCY STRECH GOALS -----



// ---------------------------------------------------------    Custom Javascript for added features    ---------------------------------------------------------    
// Added Stretch goals to implement all of the above into HTML ( aside from the stretchy strech goals) 
// Collects user input and then displays the results via a table format

const recordCollection = [];


// Reset and Acknowledge Records Added
function acknowledgeInput() {
    document.getElementById("addTitle").value = "";
    document.getElementById("addArtist").value = "";
    document.getElementById("addYear").value = "";

    alert("Record Added Successfully");
}

// Add a record to your collection
function addRecord() {
    let artistName = document.getElementById("addArtist").value;
    let songName = document.getElementById("addTitle").value;
    let yearPublished = document.getElementById("addYear").value;

    let record = {
        artist : artistName,
        title : songName,
        year : yearPublished
    }
    recordCollection.push(record);
    acknowledgeInput();
}

// Search a Record by Artist
function searchArtist() {
    let tbodyElement = document.getElementById("results");
    tbodyElement.innerHTML = "";

    let artistsName = document.getElementById("findArtist").value;

    let found = false; 
    if (artistsName) {
        for (let i = 0; i < recordCollection.length; i++) {
            let currentRecord = recordCollection[i];
            if (artistsName.toLowerCase() === currentRecord.artist.toLowerCase()) {
                let row = `<tr>
                            <td>${currentRecord.title}</td>
                            <td>${currentRecord.artist}</td>
                            <td>${currentRecord.year}</td>
                        </tr>`;
                tbodyElement.innerHTML += row;
                found = true;
            }
        }

        if (!found) {
            tbodyElement.innerHTML = "<tr><td colspan='3'>No records found for this artist.</td></tr>";
        }
    } else {
        tbodyElement.innerHTML = "<tr><td colspan='3'>Please enter an artist's name to search</td></tr>";
    }

    document.getElementById("findArtist").value = "";
}

// Find a Record by Artist and Year
function findArtistAndYear() {
    let artistName = document.getElementById("searchArtist").value;
    let year = document.getElementById("searchYear").value;
    let tbodyElement = document.getElementById("results");

    tbodyElement.innerHTML = "";

    let found = false;

    for (let i = 0; i < recordCollection.length; i++) {
        let currentRecord = recordCollection[i];
        if (artistName === currentRecord.artist && year === currentRecord.year) {
            let row = `<tr>
                        <td>${currentRecord.title}</td>
                        <td>${currentRecord.artist}</td>
                        <td>${currentRecord.year}</td>
                    </tr>`;
            tbodyElement.innerHTML += row;
            found = true;
        }
    }
    if (!found) {
        tbodyElement.innerHTML = "<tr><td colspan='3'>No records found for this artist.</td></tr>";
    }
    document.getElementById("searchArtist").value = "";
    document.getElementById("searchYear").value = "";
}

// Show All Records
function showRecords() {
    let resultsElement = document.getElementById("results")

    let tbodyElement = document.getElementById("results");
    tbodyElement.innerHTML = "";
    if (recordCollection.length > 0) {
        for (let i = 0; i < recordCollection.length; i++) {
            let currentRecord = recordCollection[i];
            let row = `<tr>
                            <td>${currentRecord.title}</td>
                            <td>${currentRecord.artist}</td>
                            <td>${currentRecord.year}</td>
                        </tr>`;
            tbodyElement.innerHTML += row;
        }
        resultsElement.style.textAlign = "center"
    } else {
        tbodyElement.innerHTML = "<tr><td colspan='3'>No Albums Currently Available in Your Collection.</td></tr>";
        tbodyElement.innerHTML += "<tr><td colspan='3'>Please Add Records to Your Collection.</td></tr>";
    }
}

// PLEASE DO NOT MODIFY THIS. Just leave it down here at the bottom. Think of it
// as a lil' chunk of friendly code that you don't need to understand right now.
// (It's used for automated testing.)
try {
    module.exports = {
        myCollection: typeof myCollection !== 'undefined' ? myCollection : undefined,
        addToCollection: typeof addToCollection !== 'undefined' ? addToCollection : undefined,
        showCollection: typeof showCollection !== 'undefined' ? showCollection : undefined,
        findByArtist: typeof findByArtist !== 'undefined' ? findByArtist : undefined,
        search: typeof search !== 'undefined' ? search : undefined,
    }
} catch (e) {
  // Do nothing
}
