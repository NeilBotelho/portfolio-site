---
title: 'Webcomic Scraper'
description: "Writing a webcomic scraper in Python and POSIX compliant shell"
date: '18 August 2020'
projectUrl: 'https://github.com/NeilBotelho/Webcomic-Scraper'
---

A few months ago, I was looking for a program that would display a new xkcd comic every time I woke my computer from sleep. But I couldn't find one that worked exactly how I wanted it to work or one that integrated into my tiling window manager well. My requirements were:
1. It should download and display new xkcd comics on launch
1. It should store the comics on disk after display
1. I should be able to set a custom size for the image viewer
1. I should be able to set a custom name for the image viewer  
<br/> 

So I decided to write my own program. At the time I had just rewritten all my custom bash script to be POSIX shell compliant because that little bit of performance boost makes a big difference on a laptop as slow as mine and I thought that writing the scraper in POSIX compliant shell would be an interesting challenge.  
<br/>

 Another reason I used shell was because it would be easier to open the image in my image viewer of choice(SXIV) so I would be able to choose the size of window and name of the window. 
<br/>  

# The POSIX Shell Version  
<br/>

The first thing I did was design the structure of how I wanted to store the comics on disk. I didn't want to delete the comics after displaying because then if I lost internet connection I could just display a random comic that I'd already downloaded.  The file structure I came up with was:  
<br/>

```
comic
└── xkcd
    ├── archive
    │   ├── file1.png
    │   ├── file2.png
    │   ├── file3.png
    └── prevComic
```  
<br/>

The prevComic file would hold the post number of the most recent comic. That way you can automatically check if new comics have been released. I used curl to download the webpage, then used grep to get the comic url and finally used curl again to download just the comic. The default function that ran checked whether there was a new comic released and if there was it displayed it.  
<br/> 

I also wrote a function getN. If the user passed the flag -n with a number(say num) getN would run and it would download xkcd comic number num and display it. This was written in case I ever wanted to see a paticular comic.  There were various helper functions as well to try to reconnect to the internet in case I lost connection or to kill the process in case another one was already running(to prevent weird race conditions like overwriting of the prevComic file before archiving).  
<br/>


Once I had completed the program in shell I wanted to extend the functionality to include other webcomics. But I soon realised that it isn't really practical to do so in shell mainly because of how awkward arrays and array operations are in shell. So I wrote another version of the same program in Python. But this time I wanted it to be able to handle more than 1 webcomic at a time.   
<br/>

# The Python Version  
<br/>

I had written web scrappers in Python before so the scraping bit didn't take very long to write. The bit that took the longest time was the design of the program. I wanted to write it so that adding more webcomics would be as easy as possible. In the end the way I did it was, I stored most of the information needed to scrape the webcomic in a dictionary called COMIC. The only other thing that would need to be modified to add another comic would be the getImageUrl function to specifically find the comic's img tag from the page.   
<br/>

Displaying the image in a fixed size window with a custom name was a little more awkward in Python but it was simple enough. The file structure changed a little as well to accomodate different comics. The final file structure can be seen below:  
<br/>

```
base_dir
├── comic_1
│    ├── archive
│    │   ├── file1.png
│    │   ├── file2.png
│    │   ├── file3.png
│    └── prevComic
└── comic_2
    ├── archive
    │   ├── file1.png
    │   ├── file2.png
    │   ├── file3.png
    └── prevComic
```
<br/>