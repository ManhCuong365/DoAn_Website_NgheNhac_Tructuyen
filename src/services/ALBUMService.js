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

let getAllAlbums = async () => {
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
        return albums;
    } catch (error) {
        throw error;
    }
}

let getAlbumById = async (albumId) => {
    try {
        let album = await db.Albums.findOne({
            where: { id: albumId },
            raw: true,
        })
        if (album) {
            return album;
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
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
    try {
        let album = await db.Albums.findOne({
            where: { id: albumId }
        })
        if (album) {
            await album.destroy();
        }
        return;
    } catch (error) {
        console.log('Error to detele album!', error);
        throw error;
    }
}
export default {
    createNewAlbum: createNewAlbum,
    getAllAlbums: getAllAlbums,
    getAlbumById: getAlbumById,
    updateAlbumById: updateAlbumById,
    deteleAlbum: deteleAlbum,
}