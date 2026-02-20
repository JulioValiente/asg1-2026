const path = require("path");
const express = require("express");

const sqlite3 = require("sqlite3").verbose();
const DB_PATH = path.join(__dirname, "data/songs-2026.db");
const db = new sqlite3.Database(DB_PATH);
const app = express();

app.get("/api/artists", (req, resp) => {
 let  sql = "SELECT a.artist_id, a.artist_name, t.type_name AS types, a.artist_image_url, a.spotify_url, a.spotify_desc FROM artists a JOIN types t ON a.artist_type_id = t.type_id ORDER BY a.artist_name;";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
 
    resp.send(rows);
    db.close;
  });
});

app.get("/api/artists/:artId", (req, resp) => {
 let  sql = "SELECT a.artist_id, a.artist_name, t.type_name AS types, a.artist_image_url, a.spotify_url, a.spotify_desc FROM artists a JOIN types t ON a.artist_type_id = t.type_id WHERE a.artist_id = ?;";
  db.all(sql, [req.params.artId], (err, rows) => {
    if (err) {
      throw err;
    }
 
    resp.send(rows);
    db.close;
  });
});

app.get("/api/artists/averages/:artId", (req, resp) => {
 let  sql = "SELECT AVG(bpm) AS avg_bpm, AVG(energy) AS avg_energy, AVG(danceability) AS avg_danceability, AVG(loudness) AS avg_loudness, AVG(liveness) AS avg_liveness, AVG(valence) AS avg_valence, AVG(duration) AS avg_duration, AVG(acousticness) AS avg_acousticness, AVG(speechiness) AS avg_speechiness, AVG(popularity) AS avg_popularity FROM songs WHERE artist_id = ?;";
  db.all(sql, [req.params.artId], (err, rows) => {
    if (err) {
      throw err;
    }
 
    resp.send(rows);
    db.close;
  });
});

app.get("/api/genres", (req, resp) => {
 let  sql = "SELECT * FROM genres";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
 
    resp.send(rows);
    db.close;
  });
});

app.get("/api/songs", (req, resp) => {
 let  sql = "SELECT s.song_id, s.title, a.artist_id, a.artist_name, g.genre_id, g.genre_name, s.year, s.bpm, s.energy, s.danceability, s.loudness, s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity FROM songs s JOIN artists a ON s.artist_id = a.artist_id JOIN genres g ON s.genre_id = g.genre_id ORDER BY s.title;";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
 
    resp.send(rows);
    db.close;
  });
});

app.get("/api/songs/sort/:order", (req, resp) => {
 let  sql = "SELECT s.song_id, s.title, a.artist_id, a.artist_name, g.genre_id, g.genre_name, s.year, s.bpm, s.energy, s.danceability, s.loudness, s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity FROM songs s JOIN artists a ON s.artist_id = a.artist_id JOIN genres g ON s.genre_id = g.genre_id ORDER BY CASE WHEN ? = 'id' THEN s.song_id WHEN ? = 'title' THEN s.title WHEN ? = 'artist' THEN a.artist_name WHEN ? = 'genre' THEN g.genre_name WHEN ? = 'year' THEN s.year WHEN ? = 'duration' THEN s.duration END;";
  db.all(sql, [req.params.order], (err, rows) => {
    if (err) {
      throw err;
    }
 
    resp.send(rows);
    db.close;
  });
});

app.get("/api/songs/:songRef", (req, resp) => {
 let  sql = "SELECT s.song_id, s.title, a.artist_id, a.artist_name, g.genre_id, g.genre_name, s.year, s.bpm, s.energy, s.danceability, s.loudness, s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity FROM songs s JOIN artists a ON s.artist_id = a.artist_id JOIN genres g ON s.genre_id = g.genre_id WHERE s.song_id = ?;";
  db.all(sql, [req.params.songRef], (err, rows) => {
    if (err) {
      throw err;
    }
 
    resp.send(rows);
    db.close;
  });
});

app.get("/api/songs/search/begin/:subs", (req, resp) => {
 let  sql = "SELECT s.song_id, s.title, a.artist_id, a.artist_name, g.genre_id, g.genre_name, s.year, s.bpm, s.energy, s.danceability, s.loudness, s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity FROM songs s JOIN artists a ON s.artist_id = a.artist_id JOIN genres g ON s.genre_id = g.genre_id WHERE LOWER(s.title) LIKE LOWER(? || '%') ORDER BY s.title;";
  db.all(sql, [req.params.subs], (err, rows) => {
    if (err) {
      throw err;
    }
 
    resp.send(rows);
    db.close;
  });
});

app.get("/api/songs/search/any/:substring", (req, resp) => {
 let  sql = "SELECT s.song_id, s.title, a.artist_id, a.artist_name, g.genre_id, g.genre_name, s.year, s.bpm, s.energy, s.danceability, s.loudness, s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity FROM songs s JOIN artists a ON s.artist_id = a.artist_id JOIN genres g ON s.genre_id = g.genre_id WHERE LOWER(s.title) LIKE LOWER('%'|| ? ||'%') ORDER BY s.title;";
  db.all(sql, [req.params.substring], (err, rows) => {
    if (err) {
      throw err;
    }
 
    resp.send(rows);
    db.close;
  });
});

app.get("/api/songs/search/year/:substring", (req, resp) => {
 let  sql = "SELECT s.song_id, s.title, a.artist_id, a.artist_name, g.genre_id, g.genre_name, s.year, s.bpm, s.energy, s.danceability, s.loudness, s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity FROM songs s JOIN artists a ON s.artist_id = a.artist_id JOIN genres g ON s.genre_id = g.genre_id WHERE s.year = ? ORDER BY s.title;";
  db.all(sql, [req.params.substring], (err, rows) => {
    if (err) {
      throw err;
    }
 
    resp.send(rows);
    db.close;
  });
});

app.get("/api/songs/artist/:ref", (req, resp) => {
 let  sql = "SELECT s.song_id, s.title, a.artist_id, a.artist_name, g.genre_id, g.genre_name, s.year, s.bpm, s.energy, s.danceability, s.loudness, s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity FROM songs s JOIN artists a ON s.artist_id = a.artist_id JOIN genres g ON s.genre_id = g.genre_id WHERE s.artist_id = ? ORDER BY s.title;";
  db.all(sql, [req.params.ref], (err, rows) => {
    if (err) {
      throw err;
    }
 
    resp.send(rows);
    db.close;
  });
});

app.get("/api/songs/genre/:ref", (req, resp) => {
 let  sql = "SELECT s.song_id, s.title, a.artist_id, a.artist_name, g.genre_id, g.genre_name, s.year, s.bpm, s.energy, s.danceability, s.loudness, s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity FROM songs s JOIN artists a ON s.artist_id = a.artist_id JOIN genres g ON s.genre_id = g.genre_id WHERE s.genre_id = ? ORDER BY s.title;";
  db.all(sql, [req.params.ref], (err, rows) => {
    if (err) {
      throw err;
    }
 
    resp.send(rows);
    db.close;
  });
});

app.get("/api/playlists/:ref", (req, resp) => {
 let  sql = "SELECT p.playlist_id AS playlist, s.song_id, s.title, a.artist_name, g.genre_name, s.year FROM playlists p JOIN songs s ON p.song_id = s.song_id JOIN artists a ON s.artist_id = a.artist_id JOIN genres g ON s.genre_id = g.genre_id WHERE p.playlist_id = ? ORDER BY s.title;";
  db.all(sql, [req.params.ref], (err, rows) => {
    if (err) {
      throw err;
    }
 
    resp.send(rows);
    db.close;
  });
});

app.get("/api/mood/dancing/:ref", (req, resp) => {
 let  sql = "SELECT s.song_id, s.title, a.artist_id, a.artist_name, g.genre_id, g.genre_name, s.year, s.bpm, s.energy, s.danceability, s.loudness, s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity FROM songs s JOIN artists a ON s.artist_id = a.artist_id JOIN genres g ON s.genre_id = g.genre_id ORDER BY s.danceability DESC LIMIT CASE WHEN ? BETWEEN 1 AND 20 THEN ? ELSE 20 END;";
  db.all(sql, [req.params.ref], (err, rows) => {
    if (err) {
      throw err;
    }
 
    resp.send(rows);
    db.close;
  });
});

app.get("/api/mood/happy/:ref", (req, resp) => {
 let  sql = "SELECT s.song_id, s.title, a.artist_id, a.artist_name, g.genre_id, g.genre_name, s.year, s.bpm, s.energy, s.danceability, s.loudness, s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity FROM songs s JOIN artists a ON s.artist_id = a.artist_id JOIN genres g ON s.genre_id = g.genre_id ORDER BY s.valence DESC LIMIT CASE WHEN ? BETWEEN 1 AND 20 THEN ? ELSE 20 END;";
  db.all(sql, [req.params.ref], (err, rows) => {
    if (err) {
      throw err;
    }
 
    resp.send(rows);
    db.close;
  });
});

app.get("/api/mood/coffee/:ref", (req, resp) => {
 let  sql = "SELECT s.song_id, s.title, a.artist_id, a.artist_name, g.genre_id, g.genre_name, s.year, s.bpm, s.energy, s.danceability, s.loudness, s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity FROM songs s JOIN artists a ON s.artist_id = a.artist_id JOIN genres g ON s.genre_id = g.genre_id ORDER BY (s.liveness / NULLIF(s.acousticness, 0)) DESC LIMIT CASE WHEN ? BETWEEN 1 AND 20 THEN ? ELSE 20 END;";
  db.all(sql, [req.params.ref], (err, rows) => {
    if (err) {
      throw err;
    }
 
    resp.send(rows);
    db.close;
  });
});

app.get("/api/mood/studying/:ref", (req, resp) => {
 let  sql = "SELECT s.song_id, s.title, a.artist_id, a.artist_name, g.genre_id, g.genre_name, s.year, s.bpm, s.energy, s.danceability, s.loudness, s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity FROM songs s JOIN artists a ON s.artist_id = a.artist_id JOIN genres g ON s.genre_id = g.genre_id ORDER BY (s.energy * s.speechiness) ASC LIMIT CASE WHEN ? BETWEEN 1 AND 20 THEN ? ELSE 20 END;";
  db.all(sql, [req.params.ref], (err, rows) => {
    if (err) {
      throw err;
    }
 
    resp.send(rows);
    db.close;
  });
});

app.listen(process.env.PORT||8080 , () => {
  console.log("listening on port 8080");
});
