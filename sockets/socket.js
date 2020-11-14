const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('RHCP'));
bands.addBand(new Band('La Vela Puerca'));
bands.addBand(new Band('Nirvana'));
bands.addBand(new Band('Ska-P'));



//Sockets message
io.on('connection', client => {
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {  });

    client.on('message', (payload) => {
        console.log('Mensaje!', payload);
        io.emit('server_emited_message', {admin: 'New Message'});
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        const newBand = new Band (payload.name)
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });


    // client.on('emit-message', (payload) => {
    //     // io.emit('new-flutter-message', payload); //emit for all
    //     client.broadcast.emit('new-flutter-message', payload); //emit for all, except itself
    // });


  });