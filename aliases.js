import path from 'path';
import moduleAlias from 'module-alias';

const paths = {
  '@root': path.resolve(__dirname, '.'),
  '@pages': path.resolve(__dirname, 'src/backend/views'),
  '@frontend': path.resolve(__dirname, 'src/frontend'),
  '@backend': path.resolve(__dirname, 'src/backend'),
};

moduleAlias.addAlias(paths);

export default paths;
