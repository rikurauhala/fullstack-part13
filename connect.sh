#!/bin/bash

# Clear the terminal
clear

# Print status
echo "Connecting..."

# Connect to the database
flyctl postgres connect -a fso13-rr-db
