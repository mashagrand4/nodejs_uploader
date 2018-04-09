import mongoose from 'mongoose';
import userData from './config';

mongoose.connect(`mongodb://${userData.username}:${userData.password}@${userData.host}:${userData.port}/${userData.database}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connection succeeded.');
});

export default db;
