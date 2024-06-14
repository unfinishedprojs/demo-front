# Demo-front

The web frontend for the demo-server project. 

## Features

- Login & Register
- Save token in local storage (v1)
- Load all available polls
- Allow you to vote
- Allow you to suggest new users

## Developing
- `npm i -g pnpm`
- `git clone https://github.com/unfinishedprojs/demo-front`
- `cd demo-front`
- `pnpm i`
- `pnpm dev` or `pnpm build` -> `pnpm serve`

## todo
- [X] registering users
  - [ ] printing out their toke
  - [X] saving token to localstorage upon registration
- [x] login with token
  - [x] saves token to localstorage
- [x] login with localStorage
- [x] clearing localStorage
- [X] only allow registering if you know the password for registeration
  - better yet, have to get a invite token or something from another user
  - so randoms can't sway the v
- [X] logout
- [X] vote ui
- [X] Create actual error alerts (Half done, missing voting page and suggestion page!)

## Updates

Check `UPDATES.md` for the list of updates.