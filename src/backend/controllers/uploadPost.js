import * as fs from 'fs';
import * as formidable from 'formidable';
import cookieConfig from './config';
import User from '../models/User';
import Images from '../models/Images';

export default (req, res) => {
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.parse(req, (err, fields, files) => {
    const userTable = User.find({ user_cookie: req.cookies[cookieConfig.cookieName] });
    if (files.files instanceof Array) {
      for (let i = 0; i < files.files.length; i += 1) {
        const newpath = `${__dirname}../../../../${files.files[i].name}`;
        const { name } = files.files[i].name;
        const old = files.files[i].path;
        fs.rename(old, newpath, () => {
          if (err) throw err;
          console.log(userTable);
          userTable.exec((user) => {
            const image = new Images({ path: name });
            image.save(() => {
              user.images.push(image);
              user.save(() => {});
            });
          });
        });
      }
    } else {
      const newpath = `${__dirname}../../../../${files.files.name}`;
      const { name } = files.files.name;
      const old = files.files.path;
      fs.rename(old, newpath, () => {
        if (err) throw err;
        userTable.exec((user) => {
          const image = new Images({ path: name });
          image.save(() => {
            user.images.push(image);
            user.save();
          });
        });
      });
    }
  });
  const html = fs.readFileSync('dist/index.html');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
};
