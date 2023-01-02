# ctjambot

The Official Custom Track Jams Bot

### To-Do List:

#### Rotating channel system

- Automatically rotates channels 😱-one-word-stories, 🦧-language-of-the-gods and 🌶-hot-takes every week
- [ ] Command to start and stop the rotation
- [ ] Move one channel to and from the misc channels category to the public vault every week
- [ ] Change the accessibility of the channels on each rotation

#### Countdown command

- Allows a user to find the time left or until a Jam by running a command.
- [ ] Command for the host to start a countdown for the deadline with a UNIX timestamp
- [ ] Command for users to find the time left in a Jam
- [ ] Command for users to find the time until the next Jam
- [ ] Commands for Jams, Jellies and Turbo Jams

#### Submission System?

- Participants dm the bot an SZS file and their track name
- [ ] Create an event for when a user DMs an SZS file
- [ ] Store the download link of the SZS file
- [ ] Store the name given for the Track
- [ ] Store the track creators
- [ ] Input the data into a spreadsheet for the host

#### CT Jams Database

- Database containing data on all participants and tracks submitted, with scores and places for each Jam being able to be viewed with commands
- [ ] Data on participants
- [ ] Data on tracks
- [ ] Data on scores
- [ ] Data on places

#### Role assigner

- [x] Command for choosing certain roles (Track Creator, Blender, Sketchup, 3DS Max)
- [ ] Buttons instead of single-select drop down menu

#### Teams.js

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
