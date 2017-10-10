'use strict';

export const getSpeed = (distance, time) => {
  let speed = 0;
  const newDistance = (distance / 1000),
    newTime = (time / 60);

  if (distance && time) {
    speed = (newDistance / newTime).toFixed(2);
  }
  return speed;
};

export const getOrderIco = (sort, field) => {
  let style = 'glyphicon';
  if(sort.field === field){
    console.log();
    style += sort.type === 'asc' ? ' glyphicon-sort-by-attributes' : ' glyphicon-sort-by-attributes-alt'
  } else {
    style += ' glyphicon-sort';
  }

  return style;
};