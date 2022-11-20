# ctjambot

The Official Custom Track Jams Bot

### To-Do List:

#### Main

- [x] Picking Teams for the Jelly
- [x] Messaging users their randomly selected partner
- [ ] Selecting groups of 3, 2 or 1 based on specific circumstances
  - i.e if a group has only 1 user or if there's not an even amount of people in a group

#### Other options for teams command:

- [ ] Reset groups option
- [ ] Reset groups upon pick? (probably bad idea if it messes up)
- [ ] Set datetime in command (remove hardcode)

#### Pick interaction options:

- [ ] Are you sure? button?
- [ ] Reset groups on pick

#### Other

- [ ] Other commands (maybe showing the schedule for the upcoming/ongoing season (these will be thought of at a later time))
- [ ] Suggestions from the CT Jams Team

### Logic stuff

- team up everyone into teams of 2
- everyone remaining (maximum 1 of each group) get moved to mixed
- team up mixed into teams of 2
- if someone remains in mixed, move them back to their original group, and join a random team (to make a trio)
