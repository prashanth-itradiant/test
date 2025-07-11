#!/bin/bash

for user in A B C D E F G H I J
do
  curl -X POST "http://localhost:3000/book?user=$user" &
done

wait
