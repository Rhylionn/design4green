#!/bin/bash
echo "Starting copy script..."

echo "Copying dist files into server..."
scp -r /home/rhylionn/Documents/Dev/design4green/client/dist/ debian@151.80.61.105:/home/debian/prod/

echo "Copying server files into server..."
scp -r /home/rhylionn/Documents/Dev/design4green/server/ debian@151.80.61.105:/home/debian/prod/

echo "Done."
