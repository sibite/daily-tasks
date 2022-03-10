import React, { PointerEvent, useRef, useState } from 'react';
import { TaskUnit } from '../../store/tasks/tasks-types';
import classes from './Task.module.scss';

interface TaskBarProps {
  current: number;
  max: number;
  color: string;
  unit: TaskUnit;
  onUpdateProgress: (progress: number) => void;
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
  current, max, color, unit, onUpdateProgress,
}) => {
  const barRef = useRef<HTMLDivElement>(null);

  const [movedProgress, setDisplayedProgress] = useState(current);
  const [isMoved, setIsMoved] = useState(false);

  const displayedProgress = isMoved ? movedProgress : current;

  const width = `${100 * (displayedProgress / max)}%`;
  let currentString = `${displayedProgress} ${displayedProgress !== 1 ? 'times' : 'time'}`;
  let maxString = `${max} ${max !== 1 ? 'times' : 'time'}`;

  if (unit === TaskUnit.Timestamp) {
    currentString = getTimeString(displayedProgress);
    maxString = getTimeString(max);
  }

  const barHoldHandler = (event: PointerEvent) => {
    event.preventDefault();
    setIsMoved(true);
    if (!barRef.current) return;
    const updatedProgress = Math.round(
      max * (event.nativeEvent.offsetX / barRef.current.clientWidth),
    );
    setDisplayedProgress(updatedProgress);
  };

  const barMoveHandler = (event: PointerEvent) => {
    if (!isMoved) return;
    event.preventDefault();
    if (!barRef.current) return;
    const updatedProgress = Math.round(
      max * (event.nativeEvent.offsetX / barRef.current.clientWidth),
    );
    setDisplayedProgress(updatedProgress);
  };

  const barReleaseHandler = (event: PointerEvent) => {
    if (!isMoved) return;
    setIsMoved(false);
    if (!barRef.current) return;
    const updatedProgress = Math.round(
      max * (event.nativeEvent.offsetX / barRef.current.clientWidth),
    );
    onUpdateProgress(updatedProgress);
  };

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
      <div
        className={classes.task__bar}
        onPointerDown={barHoldHandler}
        onPointerMove={barMoveHandler}
        onPointerUp={barReleaseHandler}
        onPointerLeave={barReleaseHandler}
        ref={barRef}
      >
        <div
          className={classes['task__bar-fill']}
          style={{ width, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default TaskBar;
