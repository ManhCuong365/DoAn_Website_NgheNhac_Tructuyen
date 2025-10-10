import db from '../models/index.js';
import USERService from '../services/USERservice.js';
import SONGService from '../services/SONGService.js';
import ALBUMService from '../services/ALBUMService.js';
import ARTISTService from '../services/ARTISTService.js';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let getHomePage = async (req, res) => {
    let songs = await db.Song.findAll({ raw: true });
    let albums = await db.Albums.findAll({ raw: true });
    songs = shuffleArray(songs).slice(0, 18);
    albums = shuffleArray(albums).slice(0, 18);
    if (req.session.user) {
        return res.render("homepage.ejs", { user: req.session.user, songs, albums });
    } else {
        return res.render("homepage.ejs", { user: null, songs, albums });
    }
}

let getProfilePage = (req, res) => {
    return res.render("profile.ejs");
}
let getAlbumPage = async (req, res) => {
    let albums = await ALBUMService.getAllAlbums();
    return res.render("album_page.ejs",{albums, user: req.session.user || null});
}
let getAllPlaylistPage = async (req, res) => {
    let songs = await SONGService.getAllSongs();
    songs = shuffleArray(songs).slice(0, 18);
    return res.render("all_playlist.ejs", { songs, user: req.session.user || null });
}
let getArtistPage = async (req, res) => {
    let artists = await db.Artists.findAll();
    artists = shuffleArray(artists).slice(0, 18);
    return res.render("artist.ejs", {artists, user: req.session.user || null });
}

let getAdminPage = (req, res) => {
    return res.render("admin_page.ejs");
}
// Sign up zone
let getSighUpPage = (req, res) => {
    return res.render("sighup.ejs");
}

let postUserSighup = async (req, res) => {
    try {
        let existed = await db.User.findOne({ where: { email: req.body.email }, raw: true });
        if (existed) {
            return res.render("sighup.ejs", { message: "Email đã tồn tại!" });
        }
        let user = await db.User.create(req.body);
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        let albums = await ALBUMService.getAllAlbums();
        let songs = await SONGService.getAllSongs();
        return res.render("homepage.ejs", {
            user: req.session.user,
            albums,
            songs,
        });
    } catch (error) {
        return res.render("sighup.ejs",);
    }
}

let logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

let displayAllUsers = async (req, res) => {
    let users = await USERService.getAllUsers();
    return res.render("displayAllUser.ejs", { dataTable: users });
}

let getEditUser = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await USERService.getUserById(userId);
        return res.render("editUser.ejs", { user: userData });
    }
    else {
        return res.send("User not found!");
    }
}
let getCreateUser = (req, res) => {
    return res.render("createUser.ejs");
}
let postUser = async (req, res) => {
    let { username, email, password } = req.body;

    await USERService.createNewUser({
        username,
        email,
        password,
    })
    return res.redirect('/display-alluser');
}
let putUser = async (req, res) => {
    let data = req.body;
    let allUser = await USERService.updateUserData(data);
    return res.render('displayAllUser.ejs', {
        dataTable: allUser,
    })
}

let deteleUser = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await USERService.deteleUserById(id);
        return res.redirect('/display-alluser');
    }
    else {
        return res.send("User not found!");
    }
}

//Login zone
let getLoginPage = (req, res) => {
    return res.render("login.ejs");
}

let postLoginPage = async (req, res) => {
    let { email, password } = req.body;
    let user = await USERService.checkLogin(email, password);
    if (user) {
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        console.log('User logged in successful:', req.session.user);
        return res.redirect('/home');
    } else {
        console.log('Login failed for email:', email);
        return res.render("login.ejs");
    }
};
//Artist zone
let displayAllArtist = async (req, res) => {
    let artists = await ARTISTService.getAllArtists();
    return res.render('displayAllArtist.ejs', { dataTable: artists });
}

let getCreateArtistPage = (req, res) => {
    return res.render('createArtist.ejs');
}

let postArtist = async (req, res) => {
    let imgArtistFile = req.file;
    let { name } = req.body;
    let photo_url = imgArtistFile ? imgArtistFile.filename : null;
    await ARTISTService.createNewArtist({
        name,
        photo_url,
    });
    return res.redirect('/display-allartist');
}

let putArtist = async (req, res) => {
    let imgArtistFile = req.file;
    let { name } = req.body;
    let photo_url = imgArtistFile ? imgArtistFile.filename : null;
    await ARTISTService.upadateArtistById({
        name,
        photo_url,
    });
    return res.redirect('/display-allartist');
}

//Album zone
let displayAllAlbum = async (req, res) => {
    let albums = await ALBUMService.getAllAlbums();
    return res.render('displayAllAlbum.ejs', { dataTable: albums });
}

let getDetailAlbumPage = async (req, res) => {
    let id = req.query.id;
    let album = await db.Albums.findOne({ where: { id: id }, raw: true });
    let songs = await db.Song.findAll({
        where: { album_id: id },
        include: [{
            model: db.Artists,
            as: 'Artist',
            attributes: ['id', 'name']
        }]
    });
    let artist = album.artist_id ? await db.Artists.findOne({ where: { id: album.artist_id }, raw: true }) : null;
    res.render('detailAlbum.ejs', {
        album,
        artist, 
        songs,
        user: req.session.user||null
    });
}

let getCreateAlbumPage = async (req, res) => {
    let artists = await ARTISTService.getAllArtists();
    return res.render('createAlbum.ejs', { dataTable1: artists });
}

let editAlbum = async (req, res) => {
    let albumId = req.query.id;
    if (albumId) {
        let albumData = await ALBUMService.getAlbumById(albumId);
        return res.render("editAlbum.ejs", { album: albumData });
    }
}

let postAlbum = async (req, res) => {
    let imgAlbumsFile = req.file;
    let { title, release_date, artist_id } = req.body;
    let img = imgAlbumsFile ? imgAlbumsFile.filename : null;

    await ALBUMService.createNewAlbum({
        title,
        img,
        release_date,
        artist_id,
    });
    return res.redirect('/display-allalbum');
}

let putAlbum = async (req, res) => {
    let imgAlbumsFile = req.file;
    let { id, title, release_date, artist_id } = req.body;
    let img = imgAlbumsFile ? imgAlbumsFile.filename : null;

    await ALBUMService.updateAlbumById({
        id,
        title,
        img,
        release_date,
        artist_id,
    });
    return res.redirect('/display-allalbum');
}


let deteleAlbum = async (req, res) => {
    let id = req.query.id;
    await ALBUMService.deteleAlbum(id);
    return res.redirect('/display-allalbum');
}

//Song zone
let displayAllSong = async (req, res) => {
    let songs = await SONGService.getAllSongs();
    return res.render('displayAllSong.ejs', { dataTable: songs });
}

let getCreateSongPage = async (req, res) => {
    let albums = await ALBUMService.getAllAlbums();
    let artists = await ARTISTService.getAllArtists();
    res.render('createSong.ejs', { dataTable: albums, dataTable1: artists });
};

let postSong = async (req, res) => {
    let imgFile = req.files && req.files['imgFile'] ? req.files['imgFile'][0] : null;
    let songFile = req.files && req.files['file_url'] ? req.files['file_url'][0] : null;
    let { title, imgUrl, release_date, album_id, artist_id } = req.body;
    let img = imgFile ? imgFile.filename : (imgUrl || null);

    await SONGService.createNewSong({
        title,
        img,
        release_date,
        file_url: songFile ? songFile.filename : null,
        album_id,
        artist_id,
    });
    return res.redirect('/display-allsong');
}

let getEditSong = async (req, res) => {
    let songId = req.query.id;
    if (songId) {
        let songData = await SONGService.getSongById(songId);
        let albums = await ALBUMService.getAllAlbums();
        return res.render("editSong.ejs", { song: songData, dataTable: albums });
    }
    else {
        return res.send("Song not found!");
    }
}

let putSong = async (req, res) => {
    let imgFile = req.files && req.files['imgFile'] ? req.files['imgFile'][0] : null;
    let songFile = req.files && req.files['file_url'] ? req.files['file_url'][0] : null;
    let { id, title, imgUrl, release_date, album_id, artist_id } = req.body;
    let img = imgFile ? imgFile.filename : (imgUrl || null);

    await SONGService.updateSongById({
        id,
        title,
        img,
        release_date,
        file_url: songFile ? songFile.filename : null,
        album_id,
        artist_id,
    });
    return res.redirect('/display-allsong');
}
let deleteSong = async (req, res) => {
    let id = req.query.id;
    await SONGService.deleteSong(id);
    return res.redirect('/display-allsong');
}

export default {
    getHomePage: getHomePage,
    getProfilePage: getProfilePage,
    getAlbumPage: getAlbumPage,
    getAllPlaylistPage: getAllPlaylistPage,
    getArtistPage: getArtistPage,
    getAdminPage: getAdminPage,
    getLoginPage: getLoginPage,
    getSighUpPage: getSighUpPage,
    logout: logout,

    displayAllUsers: displayAllUsers,
    postUserSighup: postUserSighup,
    getEditUser: getEditUser,
    getCreateUser: getCreateUser,
    postUser: postUser,
    putUser: putUser,
    deteleUser: deteleUser,
    postLoginPage: postLoginPage,

    displayAllArtist: displayAllArtist,
    getCreateArtistPage: getCreateArtistPage,
    postArtist: postArtist,
    putArtist: putArtist,

    displayAllAlbum: displayAllAlbum,
    getCreateAlbumPage: getCreateAlbumPage,
    postAlbum: postAlbum,
    putAlbum: putAlbum,
    editAlbum: editAlbum,
    deteleAlbum: deteleAlbum,

    displayAllSong: displayAllSong,
    getCreateSongPage: getCreateSongPage,
    postSong: postSong,
    getEditSong: getEditSong,
    putSong: putSong,
    deleteSong: deleteSong,
    getDetailAlbumPage: getDetailAlbumPage,
}