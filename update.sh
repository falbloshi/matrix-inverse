#!/bin/bash

current_branch=$(git symbolic-ref --short HEAD)

git add --all 

dtm=`date +"%H:%M %d-%b-%y"`

git commit -m "Update on ${dtm}"
git push -u origin "${current_branch}"
