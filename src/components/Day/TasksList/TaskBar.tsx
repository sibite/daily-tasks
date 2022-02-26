import React from 'react';
import { TaskUnit } from '../../../store/tasks/tasks-types';
import classes from './Task.module.scss';

interface TaskBarProps {
  current: number;
  max: number;
  color: string;
  unit: TaskUnit;
}

const getTimeString = (timestamp: number) => {
  const time = new Date(timestamp);
  const overHours = Math.floor(timestamp / 86400e3) * 24;
  const hours = time.getUTCHours() + overHours;
  let hoursString = '';
  if (hours > 0) hoursString += `${hours} h `;
  return `${hoursString}${time.getUTCMinutes()} min`;
};

const TaskBar: React.FC<TaskBarProps> = ({
  current, max, color, unit,
}) => {
  const width = `${100 * (current / max)}%`;
  let currentString = `${current} ${current !== 1 ? 'times' : 'time'}`;
  let maxString = `${max} ${max !== 1 ? 'times' : 'time'}`;

  if (unit === TaskUnit.Timestamp) {
    currentString = getTimeString(current);
    maxString = getTimeString(max);
  }

  return (
    <div className={classes['task__bar-container']}>
      <div className={classes['task__bar-label-container']}>
        <span className={classes['task__bar-label']}>
          Done:
          <b>
            {' '}
            {currentString}
          </b>
        </span>
        <span className={classes['task__bar-label']}>
          Target:
          <b>
            {' '}
            {maxString}
          </b>
        </span>
      </div>
      <div className={classes.task__bar}>
        <div
          className={classes['task__bar-fill']}
          style={{ width, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default TaskBar;
