#!/bin/bash

# Clear the terminal
clear

# Terminate any existing processes
fuser -k 5432/tcp
fuser -k 3001/tcp

# Connect to the database via a proxy
flyctl proxy 5432 -a fso13-rr-db &

# Wait for the database connection
sleep 4

# Run the application locally
npm start
