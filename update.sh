#!/bin/bash

git add --all 

dtm=`date +"%H:%M %d-%b-%y"`

git commit -m "Update on ${dtm}"
git push -u origin master
