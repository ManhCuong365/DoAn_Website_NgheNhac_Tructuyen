import express from 'express';
import homeController from '../controllers/homeController.js';
import multer from 'multer';
import path from 'path';

let router = express.Router();
let UploadAlbums = multer({ dest: path.join(process.cwd(), 'uploads', 'albums') });
let UploadSongs = multer({ dest: path.join(process.cwd(), 'uploads', 'songs') });
let UploadArtists = multer({ dest: path.join(process.cwd(), 'uploads', 'artists') });

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/home', homeController.getHomePage);
    router.get('/profile', homeController.getProfilePage);
    router.get('/album', homeController.getAlbumPage);
    router.get('/all_playlist', homeController.getAllPlaylistPage);
    router.get('/artist', homeController.getArtistPage);
    router.get('/admin', homeController.getAdminPage);
    router.get('/detail-album', homeController.getDetailAlbumPage);

    router.get('/login', homeController.getLoginPage);
    router.post('/post-loginuser', homeController.postLoginPage);
    router.get('/logout', homeController.logout);

    router.get('/display-alluser', homeController.displayAllUsers);
    router.get('/edit-user', homeController.getEditUser);
    router.get('/create-user', homeController.getCreateUser);
    router.post('/post-user', homeController.postUser);
    router.post('/put-user', homeController.putUser);
    router.get('/delete-user', homeController.deteleUser);

    router.get('/create-account', homeController.getSighUpPage);
    router.post('/post-usersighup', homeController.postUserSighup);

    router.get('/display-allartist', homeController.displayAllArtist);
    router.get('/detail-artist', homeController.getDetailArtistPage);
    router.get('/create-page-artist', homeController.getCreateArtistPage);
    router.post('/post-artist', UploadArtists.single('imgArtistFile'), homeController.postArtist);
    router.post('/put-artist', UploadArtists.single('imgArtistFile'), homeController.putArtist);

    router.get('/display-allalbum', homeController.displayAllAlbum);
    router.get('/create-page-album', homeController.getCreateAlbumPage);
    router.post('/post-album', UploadAlbums.single('imgAlbumsFile'), homeController.postAlbum);
    router.get('/edit-albums', homeController.editAlbum);
    router.post('/put-album', UploadAlbums.single('imgAlbumsFile'), homeController.putAlbum);
    router.get('/detele-albums', homeController.deteleAlbum);

    router.get('/display-allsong', homeController.displayAllSong);
    router.get('/create-page-song', homeController.getCreateSongPage);

    router.post('/post-song', UploadSongs.fields([
        { name: 'imgFile', maxCount: 1 },
        { name: 'file_url', maxCount: 1 }
    ]), homeController.postSong);

    router.get('/edit-song', homeController.getEditSong);
    router.post('/put-song', UploadSongs.fields([
        { name: 'imgFile', maxCount: 1 },
        { name: 'file_url', maxCount: 1 }
    ]), homeController.putSong);

    router.get('/delete-song', homeController.deleteSong);

    router.post('/album/favorite/add-all', homeController.addAlbumToFavAll);
    router.post('/album/favorite/remove-all', homeController.removeAlbumFromFavAll);

    router.post('/song/favorite/add-all', homeController.addSongToFavAll);
    router.post('/song/favorite/remove-all', homeController.removeSongFromFavAll);

    return app.use('/', router);
}

export default initWebRoutes;