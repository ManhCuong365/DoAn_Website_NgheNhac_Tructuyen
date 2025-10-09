import db from "../models/index.js";

let createNewAlbum = async (data) => {
    try {
        await db.Albums.create({
            title: data.title,
            img: data.img,
            release_date: data.release_date,
            artist_id: data.artist_id,
        }, {
            omitNull: true,
        });
        console.log('Create album successfully');
    } catch (error) {
        console.log('Error to create album', error);
    }
}

let getAllAlbums = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let albums = await db.Albums.findAll({
                include: [
                    {
                        model: db.Artists,
                        as: 'Artist',
                        attributes: ['name']
                    }
                ]
            });
            resolve(albums);
        } catch (error) {
            reject(error);
        }
    })
}

let getAlbumById = (albumId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let album = await db.Albums.findOne({
                where: { id: albumId },
                raw: true,
            })
            if (album) {
                resolve(album);
            } else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let updateAlbumById = async (data) => {
    await db.Albums.update({
        title: data.title,
        img: data.img,
        release_date: data.release_date,
        artist_id: data.artist_id,
    }, {
        where: { id: data.id }
    });
}

let deteleAlbum = async (albumId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let album = await db.Albums.findOne({
                where: { id: albumId }
            })
            if (album) {
                await album.destroy();
            }
            resolve();
        } catch (error) {
            reject(error);
            console.log('Error to detele album!', error);
        }
    })
}

let getSongByAlbumId = async (albumId) => {
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
    })
}


export default {
    createNewAlbum: createNewAlbum,
    getAllAlbums: getAllAlbums,
    getAlbumById: getAlbumById,
    updateAlbumById: updateAlbumById,
    getSongByAlbumId: getSongByAlbumId,
    deteleAlbum: deteleAlbum,
}