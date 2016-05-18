
# Bijou ![alt](https://travis-ci.org/kyleholliday/Bijou.svg?branch=master)
Bijou is an Angular-based movie database app. Users can see what's playing now, popular movies, staff picks, and classics, as well as watch movie trailers. Users can also search for movies using the Film Finder feature.

## Overview

### Key Features
- Now Playing, Upcoming, Movie Details, Film Finder Search, Similar Titles, Actor and Director Filmography

### Languages and Libraries
- HTML, CSS, Javascript
- APIs from themoviedb.org
- Angular MVC framework

### General Architecture
- A single central model with four different views:
  - Main View that lists movies now playing, upcoming movies, and a Film Finder search feature
  - Film View that includes all movie info (director, cast, synopsis, etc) and similar titles
  - Search View that shows results for the Film Finder search
