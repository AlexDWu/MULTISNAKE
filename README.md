# MULTISNAKE

a multiplayer snake game. deployed at http://limitless-ocean.herokuapp.com/

## How to run
```
npm install
npm start
```

## How to Play

- Click `connect`
- Wait for others to connect
- Click `ready` when ready
- Game will start when everyone is ready
- Use arrow keys to change direction
- Eat black dots to grow
- Don't hit the wall, yourself, or other snakes

## Issues

- Player must click on the disconnect button to disconnect, otherwise the slot that he/she is occupying will never free up.
- The fact that the client is polling for information is terrible.
