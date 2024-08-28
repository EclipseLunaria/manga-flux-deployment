# Initialize git submodules
git submodule init
git submodule update
ls services | xargs -I {} bash -c 'SDIR={};cd services/$SDIR; git submodule init; git submodule update;'

#install backend dependencies
npm 'install'
npm run 'install-deps'
