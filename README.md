
# Bijou ![alt](https://travis-ci.org/kyleholliday/Bijou.svg?branch=master)

Bijou is live at http://bijou.surge.sh

Bijou is an Angular-based movie database app. Users can see what's playing now, upcoming movies, and staff picks. Users can also watch movie trailers, search for movies using the Film Finder feature, and see actor's and director's filmography

## Overview

### Key Features
- Now Playing, Upcoming, Movie Details, Film Finder Search, Similar Titles, Trailers, Actor and Director Filmography

### Languages and Libraries
- HTML, CSS, Javascript
- API from themoviedb.org
- Angular MVC framework

### General Architecture
- A single central model with four different views:
  - Main View that lists movies now playing, upcoming movies, and a Film Finder search feature
  - Film View that includes all movie info (director, cast, synopsis, etc) and similar titles
  - Search View that shows results for the Film Finder search
  - Filmography View that shows films that actors/directors have worked on
