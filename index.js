const main__input = document.querySelector('.main__input');
const main__button = document.querySelector('.main__button');
const alert = document.querySelector('.alert');
const rover__position = document.querySelector('.rover__position');

const roverCoords = { x: 1, y: 1, facingPosition: 'south' };

rover__position.textContent = `Rover is at position ${
  roverCoords.x + roverCoords.y * 100
} and is facing ${roverCoords.facingPosition}`;

main__button.addEventListener('click', (e) => {
  e.preventDefault();
  executeMarsRoverCommand(main__input.value);
  main__input.value = '';
});

function checkSouthParimeter(num, axis) {
  const math = roverCoords[axis] + num;
  if (math <= 99) {
    return true;
  } else alert.innerText = 'Halted, you can not go over the parimeter';
}

function checkNorthParimeter(num, axis) {
  const math = roverCoords[axis] - num;
  if (math > 0) {
    return true;
  } else alert.innerText = 'Halted, you can not go over the parimeter';
}

function checkEastParimeter(num, axis) {
  const math = roverCoords[axis] + num;
  if (math <= 100) {
    return true;
  } else alert.innerText = 'Halted, you can not go over the parimeter';
}

function checkWestParimeter(num, axis) {
  const math = roverCoords[axis] - num;
  if (math > 0) {
    return true;
  } else alert.innerText = 'Halted, you can not go over the parimeter';
}

function alterPosition(command) {
  switch (true) {
    case roverCoords.facingPosition === 'north' && command === 'left':
      roverCoords.facingPosition = 'west';
      break;
    case roverCoords.facingPosition === 'north' && command === 'right':
      roverCoords.facingPosition = 'east';
      break;
    case roverCoords.facingPosition === 'south' && command === 'left':
      roverCoords.facingPosition = 'east';
      break;
    case roverCoords.facingPosition === 'south' && command === 'right':
      roverCoords.facingPosition = 'west';
      break;
    case roverCoords.facingPosition === 'east' && command === 'left':
      roverCoords.facingPosition = 'north';
      break;
    case roverCoords.facingPosition === 'east' && command === 'right':
      roverCoords.facingPosition = 'south';
      break;
    case roverCoords.facingPosition === 'west' && command === 'left':
      roverCoords.facingPosition = 'south';
      break;
    case roverCoords.facingPosition === 'west' && command === 'right':
      roverCoords.facingPosition = 'north';
      break;
  }
}

function alterDistance(numberInCommand, arr) {
  switch (true) {
    case roverCoords.facingPosition === 'south':
      const checkSouth = checkSouthParimeter(numberInCommand - 1, 'y');
      if (checkSouth) {
        roverCoords.y += numberInCommand - 1;
      } else arr.length = 0;

      break;
    case roverCoords.facingPosition === 'north':
      const checkNorth = checkNorthParimeter(numberInCommand, 'y');
      if (checkNorth) {
        roverCoords.y -= numberInCommand;
      } else arr.length = 0;
      break;
    case roverCoords.facingPosition === 'east':
      const checkEast = checkEastParimeter(numberInCommand, 'x');
      if (checkEast) {
        roverCoords.x += numberInCommand;
      } else arr.length = 0;
      break;
    case roverCoords.facingPosition === 'west':
      const checkWest = checkWestParimeter(numberInCommand, 'x');
      if (checkWest) {
        roverCoords.x -= numberInCommand;
      } else arr.length = 0;
      break;
  }
}

function executeMarsRoverCommand(commands) {
  const individualCommands = commands.toLowerCase().split(' ');

  if (individualCommands.length > 5) {
    alert.textContent = 'Halted, you gave me to many commands :(';
    return;
  }

  individualCommands.forEach((command) => {
    if (command.match(/[m]/g)) {
      const numberInCommand = +command.split('m')[0];
      alterDistance(numberInCommand, individualCommands);
    } else {
      alterPosition(command);
    }
  });

  rover__position.textContent = `Rover is at position ${
    roverCoords.x + roverCoords.y * 100
  } and is facing ${roverCoords.facingPosition}`;

  // return `Rover is at position ${
  //   roverCoords.x + roverCoords.y * 100
  // } and is facing ${roverCoords.facingPosition}`;
}
