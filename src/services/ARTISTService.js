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
        return artists;
    } catch (error) {
        throw error;
    }
}

let updateArtistData = async (data) => {
    try {
        let artist = await db.Artists.findOne({
            where: { id: data.id },
            raw: false,
        })
        if (artist) {
            artist.name = data.name;
            artist.photo_url = data.photo_url;
            await artist.save();
            return;
        } else {
            return;
        }
    } catch (error) {
        throw error;
    }
}

let getAlbumByArtistId = async (artistId) => {
    try {
        let albums = await db.Albums.findAll({
            where: { id: artistId },
            raw: true,
        })
        if (albums) {
            return albums;
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
}

let getSongByArtistId = async (artistId) => {
    try {
        let songs = await db.Songs.findAll({
            where: { artist_id: artistId },
            raw: true,
        })
        if (songs) {
            return songs;
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
}

let deleteArtistById = async (artistId) => {
    try {
        let artist = await db.Artists.findOne({
            where: { id: artistId }
        })
        if (artist) {
            await artist.destroy();
        }
        return;
    } catch (error) {
        console.log('Error to delete artist!', error);
        throw error;
    }
}

export default {
    createNewArtist: createNewArtist,
    getAllArtists: getAllArtists,
    updateArtistData: updateArtistData,
    getAlbumByArtistId: getAlbumByArtistId,
    getSongByArtistId: getSongByArtistId,
    deleteArtistById: deleteArtistById,
}