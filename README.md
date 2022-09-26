oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g wallyget
$ wallyget COMMAND
running command...
$ wallyget (--version)
wallyget/0.0.1 linux-x64 node-v16.17.0
$ wallyget --help [COMMAND]
USAGE
  $ wallyget COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`wallyget help [COMMAND]`](#wallyget-help-command)
* [`wallyget wallabyss CATEGORY`](#wallyget-wallabyss-category)
* [`wallyget wallabyss categories`](#wallyget-wallabyss-categories)

## `wallyget help [COMMAND]`

Display help for wallyget.

```
USAGE
  $ wallyget help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for wallyget.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `wallyget wallabyss CATEGORY`

Download wallpapers from wall.alphacoders.com

```
USAGE
  $ wallyget wallabyss [CATEGORY] [-c]

ARGUMENTS
  CATEGORY  Wallaper Category

FLAGS
  -c, --collection  Download several wallpapers at the same time and save them in the Fetched folder

DESCRIPTION
  Download wallpapers from wall.alphacoders.com

EXAMPLES
  $ wallyget wallabyss [CATEGORY CODE]
          🔎 I found this wallpaper
  		🖇 ID: "Wallpaper_ID"
  		🌄 Name: "Wallpaper_Name"
  		🌐 Link:  "Wallpaper_Link"
  		🌐 Download Link:  "Wallpaper_Download_Link"
```

_See code: [dist/commands/wallabyss/index.ts](https://github.com/Apps/hello-world/blob/v0.0.1/dist/commands/wallabyss/index.ts)_

## `wallyget wallabyss categories`

Show all available categories for Wallpapers Abyss

```
USAGE
  $ wallyget wallabyss categories

DESCRIPTION
  Show all available categories for Wallpapers Abyss
```
<!-- commandsstop -->
