import db from '../models/index.js';
import USERService from '../services/USERservice.js';
import SONGService from '../services/SONGService.js';
import ALBUMService from '../services/ALBUMService.js';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let getHomePage = async (req, res) => {
    let songs = await SONGService.getAllSongs();
    let albums = await ALBUMService.getAllAlbums();
    songs = shuffleArray(songs).slice(0, 10);
    albums = shuffleArray(albums).slice(0, 10);
    res.render('homepage.ejs', { songs, albums });
};
let getProfilePage = (req, res) => {
    return res.render("profile.ejs");
}
let getGenresPage = (req, res) => {
    return res.render("genres.ejs");
}
let getAllPlaylistPage = async (req, res) => {
    let songs = await SONGService.getAllSongs();
    songs = shuffleArray(songs).slice(0, 18);
    return res.render("all_playlist.ejs", { songs });
}
let getArtistPage = (req, res) => {
    return res.render("artist.ejs");
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
        return res.render("homepage.ejs", { user: req.session.user });
    } catch (error) {
        return res.render("sighup.ejs");
    }
}

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
//Album zone
let displayAllAlbum = async (req, res) => {
    let albums = await ALBUMService.getAllAlbums();
    return res.render('displayAllAlbum.ejs', { dataTable: albums });
}

let getDetailAlbumPage = async (req, res) => {
    let id = req.query.id;
    let album = await db.Albums.findOne({ where: { id: id }, raw: true });
    let songs = await db.Song.findAll({ where: { album_id: id }, raw: true });
    res.render('detailAlbum.ejs', { album, songs });
}

let getCreateAlbumPage = (req, res) => {
    return res.render('createAlbum.ejs');
}

let editAlbum = async (req, res) => {
    let albumId = req.query.id;
    if (albumId) {
        let albumData = await ALBUMService.getAlbumById(albumId);
        return res.render("editAlbum.ejs", { album: albumData });
    }
}

let postAlbum = async (req, res) => {
    let imgAlbumsFile = req.file;s
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
    let {id, title, release_date, artist_id } = req.body;
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
    res.render('createSong.ejs', { dataTable: albums });
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
    getGenresPage: getGenresPage,
    getAllPlaylistPage: getAllPlaylistPage,
    getArtistPage: getArtistPage,
    getAdminPage: getAdminPage,

    getLoginPage: getLoginPage,
    getSighUpPage: getSighUpPage,

    displayAllUsers: displayAllUsers,
    postUserSighup: postUserSighup,
    getEditUser: getEditUser,
    putUser: putUser,
    deteleUser: deteleUser,
    postLoginPage: postLoginPage,

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