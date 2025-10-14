import db from '../models/index.js';

let AddToFavorite = async (user_id, song_id, album_id) => {
    let existingFavorite = await db.Favorite.findOne({
        where: { user_id: user_id, song_id: song_id, album_id: album_id }
    });
    if (existingFavorite) {
        return { success: false, message: 'This song is already in your favorites.' };
    }
    await db.Favorite.create({
        user_id: user_id,
        song_id: song_id,
        album_id: album_id
    });
    return { success: true, message: 'Song added to favorites successfully.' };
}

let RemoveFromFavorite = async (user_id, song_id, album_id) => {
    let existingFavorite = await db.Favorite.findOne({
        where: { user_id: user_id, song_id: song_id, album_id: album_id }
    });
    if (!existingFavorite) {
        return { success: false, message: 'This song is not in your favorites.' };
    }
    await db.Favorite.destroy({
        where: { user_id: user_id, song_id: song_id, album_id: album_id }
    });
    return { success: true, message: 'Song removed from favorites successfully.' };
}

let UserFavorites = async (user_id) => {
    let favorites = await db.Favorite.findAll({
        where: { user_id: user_id },
        include: [
            { model: db.Song, as: 'Song' },
            { model: db.Albums, as: 'Albums' }
        ]
    });
    return favorites;
}

let getFavoriteSongsById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let favorites = await db.Favorite.findAll({
                where: { user_id: userId },
                include: [
                    { model: db.Song, as: 'Song' },
                    { model: db.Albums, as: 'Albums' }
                ],
                raw: false,
            });
            resolve(favorites);
        } catch (error) {
            reject(error);
        }
    })
}


export default {
    AddToFavorite,
    RemoveFromFavorite,
    UserFavorites,
    getFavoriteSongsById
};