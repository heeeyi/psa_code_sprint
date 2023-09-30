const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
const port = 3333;

// Adjust origin based on frontend port
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// get stations
app.get('/stations', (req, res) => {
    fs.readFile(path.join(__dirname, 'data/stations.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('An error occurred');
        }
        return res.json(JSON.parse(data));
    });
});

// get paths
app.get('/paths', (req, res) => {
    fs.readFile(path.join(__dirname, 'data/paths.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('An error occurred');
        }
        return res.json(JSON.parse(data));
    });
});

// add stations
app.post('/stations/add', (req, res) => {
    const newStation = req.body;
    console.log(newStation);
    const stations = JSON.parse(fs.readFileSync('data/stations.json', 'utf8'));

    // check valid data
    if (!newStation.name || typeof newStation.cargo_amount != 'number' || newStation.cargo_amount < 0) {
        return res.status(400).send("Invalid station data");
    }

    // check duplicate
    const duplicate = stations.some(
        station => station.name.toLowerCase() == newStation.name.toLowerCase()
    );
    if (duplicate) {
        return res.status(400).send("This station already exists");
    }

    stations.push(newStation);
    fs.writeFileSync('data/stations.json', JSON.stringify(stations, null, 2));
    res.status(200).send('New station added');
});

// add paths
app.post('/paths/add', (req, res) => {
    const newPath = req.body;
    const paths = JSON.parse(fs.readFileSync('data/paths.json', 'utf8'));
    const stations = JSON.parse(fs.readFileSync('data/stations.json', 'utf8'));

    if (!newPath.src || !newPath.dst || typeof newPath.distance != 'number' || newPath.distance < 0) {
        return res.status(400).send("Invalid path data");
    }

    // check validity
    const srcExists = stations.some(station => station.name === newPath.src);
    const dstExists = stations.some(station => station.name === newPath.dst);
    if (!srcExists || !dstExists) {
        return res.status(400).send('Invalid src or dst');
    }

    // check path duplicate
    const duplicate = paths.some(path =>
        (path.src === newPath.src && path.dst === newPath.dst) ||
        (path.src === newPath.dst && path.dst === newPath.src)
    );
    if (duplicate) {
        return res.status(400).send('Path already exists');
    }

    paths.push(newPath);
    fs.writeFileSync('data/paths.json', JSON.stringify(paths, null, 2));
    res.status(200).send('New path added');

});

// delete station
app.delete('/stations/delete', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send('No name provided');
    }

    const stations = JSON.parse(fs.readFileSync('data/stations.json', 'utf8'));
    const paths = JSON.parse(fs.readFileSync('data/paths.json', 'utf8'));

    // check existence
    const existence = stations.some(station => station.name === name);
    if (!existence) {
        return res.status(400).send('Station not found');
    }

    // check if in any path
    const isStationInPath = paths.some(path => path.src === name || path.dst === name);
    if (isStationInPath) {
        return res.status(400).send('Station cannot be deleted as it is part of a path');
    }

    const updatedStations = stations.filter(station => station.name !== name);
    fs.writeFileSync('data/stations.json', JSON.stringify(updatedStations, null, 2));
    res.status(200).send('Station deleted successfully');
});

// delete path
app.delete('/paths/delete', (req, res) => {
    console.log(req.body);
    const { src, dst } = req.body;
    if (!src || !dst) {
        return res.status(400).send('No name provided');
    }

    const paths = JSON.parse(fs.readFileSync('data/paths.json', 'utf8'));

    // check existence
    const existence = paths.some(
        path => (path.src == src && path.dst == dst) || (path.src == dst && path.dst == src)
    );
    if (!existence) {
        return res.status(400).send('Path not found');
    }

    // delete path
    const updatedPaths = paths.filter(
        path => !(path.src == src && path.dst == dst) && !(path.src == dst && path.dst == src)
    );
    fs.writeFileSync('data/paths.json', JSON.stringify(updatedPaths, null, 2));
    return res.status(200).send('Path deleted successfully');

});

// update station (ONLY cargo_amount)
app.put('/stations/update', (req, res) => {
    const newStation = req.body;

    if (typeof newStation.cargo_amount !== 'number' || newStation.cargo_amount < 0) {
        return res.status(400).send('Invalid cargo_amount provided');
    }

    const stations = JSON.parse(fs.readFileSync('data/stations.json', 'utf8'));
    const index = stations.findIndex(station => station.name == newStation.name);
    if (index != -1) {
        stations[index].cargo_amount = newStation.cargo_amount;
        fs.writeFileSync('data/stations.json', JSON.stringify(stations, null, 2));
        return res.status(200).send('Station updated successfully');
    } else {
        return res.status(400).send('Station not found');
    }
});

// update paths (Everything, but no duplicate)
app.put('/paths/update', (req, res) => {
    const { init_src, init_dst, distance, final_src, final_dst } = req.body;

    // check validity
    if (!init_src || !init_dst || !final_src || !final_dst) {
        return res.status(400).send('Missing field information');
    }
    if (typeof distance !== 'number' || distance < 0) {
        return res.status(400).send('Invalid distance provided');
    }

    const paths = JSON.parse(fs.readFileSync('data/paths.json', 'utf8'));
    const stations = JSON.parse(fs.readFileSync('data/stations.json', 'utf8'));

    // check if final src and dst in station
    const validStations =
        stations.some(station => station.name === final_src) &&
        stations.some(station => station.name === final_dst);
    if (!validStations) {
        return res.status(400).send('Final stations does not exist');
    }

    // check original path exists
    const index = paths.findIndex(
        path =>
            (path.src === init_src && path.dst === init_dst) ||
            (path.src === init_dst && path.dst === init_src)
    );
    if (index == -1) {
        return res.status(400).send('Path not found');
    }

    // check if final path is dupliate with some exisitng paths
    const duplicate = paths.some(path =>
        (path.src === final_src && path.dst === final_dst) ||
        (path.src === final_dst && path.dst === final_src)
    );
    if (duplicate) {
        return res.status(400).send('Updated path already exists');
    }

    // make the update
    paths[index].src = final_src;
    paths[index].dst = final_dst;
    paths[index].distance = distance;
    fs.writeFileSync('data/paths.json', JSON.stringify(paths, null, 2));
    return res.status(200).send('Path updated successfully');

});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});




