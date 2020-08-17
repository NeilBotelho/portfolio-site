---
title: 'Webcomic Scraper'
description: "Writing a webcomic scraper in python and POSIX compliant shell"
date: '18 August 2020'
projectUrl: 'https://github.com/NeilBotelho/Webcomic-Scraper'
---

A few months ago, I was looking for a program that would display a new xkcd comic every time I woke my computer from sleep. But I couldn't find one that worked exactly how I wanted it to work or one that integrated into my window manager well(I wanted it to display the comic in a fixed size window.) So I decided to write my own. At the time I had just rewritten all my custom bash script to be POSIX shell compliant because that little bit of performance boost makes a big difference on a laptop as slow as mine and I thought that writing the scraper in POSIX compliant shell would be an interesting challenge. 


The first thing I did was design the structure of how I wanted to store the comics on disk. I didn't want to delete the comics after displaying because then if I lost internet connection I could just display a random comic that I'd already downloaded.  The file structure I came up with was:  

```
comic
|── xkcd
    ├── archive
    │   ├── file1.png
    │   ├── file2.png
    │   ├── file3.png
    └── prevComic
```  

The prevComic file would hold the post number of the most recent comic. That way you can automatically check if new comics have been released. I used curl to download the webpage, then used grep to get the comic url and finally used curl again to download just the comic. The default function that ran checked whether there was  new comic released and if there was it displayed it. 

I also wrote a function getN. If the user passed the flag -n with a number(say num) getN would run and it would download xkcd comic number num and display it. 
