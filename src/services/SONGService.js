import db from "../models/index.js";

let createNewSong = async (data) => {
    try {
        await db.Song.create({
            title: data.title,
            img: data.img,
            release_date: data.release_date,
            file_url: data.file_url,
            album_id: data.album_id,
            artist_id: data.artist_id,
        });
        console.log('Create song successfully');
    } catch (error) {
        console.log('Error to create song', error);
    }
}

let getAllSongs = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let songs = await db.Song.findAll({
                include: [
                    {
                        model: db.Albums,
                        as: 'Album',
                        attributes: ['title']
                    },
                    {
                        model: db.Artists,
                        as: 'Artist',
                        attributes: ['name']
                    }
                ],
                raw: false,
            });
            resolve(songs);
        } catch (error) {
            reject(error);
        }
    });
}

let getSongById = (songId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let song = await db.Song.findOne({
                where: { id: songId },
                raw: true,
            })
            if (song) {
                resolve(song);
            } else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let updateSongById = async (data) => {
    await db.Song.update({
        title: data.title,
        img: data.img,
        release_date: data.release_date,
        file_url: data.file_url,
        album_id: data.album_id,
        artist_id: data.artist_id,
    }, {
        where: { id: data.id }
    });
}

let deleteSong = async (songId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let song = await db.Song.findOne({
                where: { id: songId }
            })
            if (song) {
                await song.destroy();
            }

            resolve();
        } catch (error) {
            reject(error);
            console.log('Error to delete song!', error);
        }
    })
}

let getSongByAlbumId = (albumId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let songs = await db.Song.findAll({
                where: { album_id: albumId },
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
    });
}

export default {
    createNewSong: createNewSong,
    getAllSongs: getAllSongs,
    getSongById: getSongById,
    updateSongById: updateSongById,
    deleteSong: deleteSong,
    getSongByAlbumId: getSongByAlbumId,
}