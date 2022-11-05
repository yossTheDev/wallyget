---
sidebar_position: 1
---

# Getting Started

## What is WallyGet?

**WallyGet** is a console-based wallpaper downloader for Linux. Allows you to download wallpapers from different sources like:

* Wallpaper Abyss
* Bing
* NASA Astronomic Picture of The Day
* More sources coming soon. Check the [Roadmap](/docs/roadmap.md)

## Installing WallyGet

``` bash
npm install -g wallyget
```

## Downloading wallpapers

You can download individual wallpapers:

``` bash
wallyget wallabyss videogames
```

Or collections with the flag:

``` bash
wallyget wallabyss videogames -c
```

All downloaded wallpapers are saved in the **Fetched** folder, to find out the location of this folder, type:

``` bash
wallyget fetched
```
