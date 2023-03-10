#!/bin/bash

clear
fuser -k 5432/tcp
fuser -k 3001/tcp
flyctl proxy 5432 -a fso13-rr-db &
npm start
