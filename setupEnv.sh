# run initialize script ensuring dependencies
./initialize.sh


# setup environment variables
# Create databases
echo "Initializing Content Database:"
read -p "Enter DB Host (localhost): " CONTENT_DB_HOST && CONTENT_DB_HOST=${CONTENT_DB_HOST:-localhost} && echo "CONTENT_DB_HOST=$CONTENT_DB_HOST" > .env;
read -p "Enter DB Port (5432): " CONTENT_DB_PORT && CONTENT_DB_PORT=${CONTENT_DB_PORT:-5432} && echo "CONTENT_DB_PORT=$CONTENT_DB_PORT" >> .env
read -p "Enter DB User (manga_reader): " CONTENT_DB_USER && CONTENT_DB_USER=${CONTENT_DB_USER:-"manga_reader"} && echo "CONTENT_DB_USER=$CONTENT_DB_USER" >> .env
read -p "Enter DB Pass (password): " CONTENT_DB_PASS && CONTENT_DB_PASS=${CONTENT_DB_PASS:-"password"} && echo "CONTENT_DB_PASS=$CONTENT_DB_PASS" >> .env
read -p "Enter DB Name (manga_reader): " CONTENT_DB_NAME && CONTENT_DB_NAME=${CONTENT_DB_NAME:-"manga_reader"} && echo "CONTENT_DB_NAME=$CONTENT_DB_NAME"  >> .env



echo "Initializing the Authorization Database"
read -p "Enter DB Host (localhost): " AUTH_DB_HOST && AUTH_DB_HOST=${AUTH_DB_HOST:-localhost} && echo "AUTH_DB_HOST=$AUTH_DB_HOST" >> .env;
read -p "Enter DB Port (5432): " AUTH_DB_PORT && AUTH_DB_PORT=${AUTH_DB_PORT:-5432} && echo "AUTH_DB_PORT=$AUTH_DB_PORT" >> .env
read -p "Enter DB User (manga_reader_auth): " AUTH_DB_USER && AUTH_DB_USER=${AUTH_DB_USER:-"manga_reader"} && echo "AUTH_DB_USER=$AUTH_DB_USER" >> .env
read -p "Enter DB Pass (password): " AUTH_DB_PASS && AUTH_DB_PASS=${AUTH_DB_PASS:-"password"} && echo "AUTH_DB_PASS=$AUTH_DB_PASS" >> .env
read -p "Enter DB Name (manga_reader_auth): " AUTH_DB_NAME && AUTH_DB_NAME=${AUTH_DB_NAME:-"manga_reader"} && echo "AUTH_DB_NAME=$AUTH_DB_NAME"  >> .env
echo "Generating Databases and roles"

sudo -u postgres psql -c "CREATE DATABASE $CONTENT_DB_NAME;"
sudo -u postgres psql -c "CREATE USER $CONTENT_DB_USER WITH LOGIN;"
sudo -u postgres psql -c "ALTER USER $CONTENT_DB_USER WITH PASSWORD '$CONTENT_DB_PASS';"
sudo -u postgres psql -d $CONTENT_DB_NAME -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $CONTENT_DB_USER;"
sudo -u postgres psql -d $CONTENT_DB_NAME -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'



sudo -u postgres psql -c "CREATE DATABASE $AUTH_DB_NAME;"
sudo -u postgres psql -c "CREATE USER $AUTH_DB_USER WITH LOGIN;"
sudo -u postgres psql -c "ALTER USER $AUTH_DB_USER WITH PASSWORD '$AUTH_DB_PASS';"
sudo -u postgres psql -d $AUTH_DB_NAME -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $AUTH_DB_USER;"
sudo -u postgres psql -d $AUTH_DB_NAME -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'

echo "Generating JWT Secret"

JWT_SECRET="$(tr -dc A-Za-z0-9 < /dev/urandom | head -c 64)"
echo "JWT_SECRET=$JWT_SECRET" >> .env

echo "Setting MyAnimeList Variables (Optional for OAUTH Support)"

read -p "Enter your MAL Client ID: " MAL_CLIENT_ID && echo MAL_CLIENT_ID=$MAL_CLIENT_ID >> .env

read -p "Enter your MAL Secret ID: " MAL_SECRET_ID && echo MAL_SECRET_ID=$MAL_SECRET_ID >> .env

echo "Generating MAL Challenge Code: "
CODE_CHALLENGE="$(tr -dc A-Za-z0-9 < /dev/urandom | head -c 64)"
echo "CODE_CHALLENGE=$CODE_CHALLENGE" >> .env