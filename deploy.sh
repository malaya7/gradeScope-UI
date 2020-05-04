#!/bin/bash

npm run build 

aws s3 sync --delete ./build s3://ics53
