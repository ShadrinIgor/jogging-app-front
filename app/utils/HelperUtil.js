'use strict';

export const getSpeed = (distance, time) => {
  let speed = 0;
  const newDistance = (distance / 1000),
    newTime = (time / 60);

  if (distance && time) {
    speed = (newDistance / newTime).toFixed(2);
  }
  return speed;
}