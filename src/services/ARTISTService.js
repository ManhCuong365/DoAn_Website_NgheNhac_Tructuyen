import db from '../models/index.js';

let createNewArtist = async (data) => {
    try {
        let artist = await db.Artists.create({
            name: data.name,
            photo_url: data.photo_url,
        });
        console.log('Create artist successfully');
        return artist;
    } catch (error) {
        console.log('Error to create artist', error);
        return null;
    }
}

let getAllArtists = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let artists = await db.Artists.findAll({
                include: [
                    {
                        model: db.Albums,
                        attributes: ['id', 'title', 'img', 'release_date'],
                        as: 'Albums'
                    }
                ],
                raw: false,
            });
            resolve(artists);
        } catch (error) {
            reject(error);
        }
    })
}
let updateArtistData = async (data) => {
    return new Promise(async (resolve, reject)=> {
        try {
            let artist = await db.Artists.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (artist) {
                artist.name = data.name;
                artist.photo_url = data.photo_url;
                await artist.save();
                resolve();
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAlbumByArtistId = (artistId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let albums = await db.Albums.findAll({
                where: { artist_id: artistId },
                raw: true,
            })
            if (albums) {
                resolve(albums);
            } else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    })
}
let getSongByArtistId = (artistId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let songs = await db.Songs.findAll({
                where: { artist_id: artistId },
                raw: true,
            })
            if (songs) {
                resolve(songs);
            } else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    })
}


export default {
    createNewArtist: createNewArtist,
    getAllArtists: getAllArtists,
    updateArtistData: updateArtistData,

    getAlbumByArtistId: getAlbumByArtistId,
    getSongByArtistId: getSongByArtistId,
}