import path from 'path';
import moduleAlias from 'module-alias';

export default {
  '@root': path.resolve(__dirname, '.'),
  '@pages': path.resolve(__dirname, 'src/backend/views'),
  '@frontend': path.resolve(__dirname, 'src/frontend'),
  '@backend': path.resolve(__dirname, 'src/backend'),
};

moduleAlias.addAlias({
  '@root': path.resolve(__dirname, '.'),
  '@pages': path.resolve(__dirname, 'src/backend/views'),
  '@frontend': path.resolve(__dirname, 'src/frontend'),
  '@backend': path.resolve(__dirname, 'src/backend'),
});
