import React, {
  useEffect, useReducer, useRef, useState,
} from 'react';
import { TaskUnit } from '../../../store/TasksContext';
import Card from '../../UI/Card';

interface TaskEditProps {
  name: string;
  unit: TaskUnit;
  target: number;
  onSave: (name: string, target: number, unit: TaskUnit) => void;
  onCancel: () => void;
}

interface StateType<T> {
  value: T;
  isValid?: boolean;
}

const nameReducer: React.Reducer<StateType<string>, string> = (_state, newValue) => ({
  value: newValue,
  isValid: newValue.length > 0,
});

const unitReducer: React.Reducer<StateType<TaskUnit>, TaskUnit> = (_state, newValue) => ({
  value: newValue,
  isValid: Object.values(TaskUnit).indexOf(newValue) !== -1,
});

interface TargetState {
  count?: number;
  hours?: number;
  minutes?: number;
  isValid?: boolean;
}

const targetReducer: React.Reducer<TargetState, {
  type: 'SET_COUNT' | 'SET_HOURS' | 'SET_MINUTES' | 'REFRESH',
  value: number,
}> = (state, action) => {
  let newState: TargetState = {};
  if (action.type === 'SET_COUNT') {
    newState = {
      count: action.value,
    };
  } else if (action.type === 'SET_HOURS') {
    newState = {
      hours: action.value,
      minutes: state.minutes,
    };
  } else if (action.type === 'SET_MINUTES') {
    newState = {
      hours: state.hours,
      minutes: action.value,
    };
  } else {
    newState = { ...state };
  }

  newState.isValid = (newState.hours !== undefined && newState.minutes !== undefined
  && newState.minutes >= 0 && newState.hours < 24
  && (newState.minutes ?? 0) > 0 && (newState.minutes ?? 0) < 60)
  || (newState.count !== undefined && newState.count > 0);

  return newState;
};

const TaskEdit: React.FC<TaskEditProps> = ({
  name: initialName, unit: initialUnit, target: initialTarget, onSave, onCancel,
}) => {
  const [name, setName] = useReducer(nameReducer, { value: initialName });
  const [unit, setUnit] = useReducer(unitReducer, { value: initialUnit });
  const [target, dispatchTarget] = useReducer(targetReducer, {
    count: initialUnit === TaskUnit.Count ? initialTarget : undefined,
    hours: initialUnit === TaskUnit.Timestamp
      ? Math.floor((initialTarget / 86400e3)) * 24 + new Date(initialTarget).getUTCHours()
      : undefined,
    minutes: initialUnit === TaskUnit.Timestamp ? new Date(initialTarget).getUTCMinutes()
      : undefined,
  });

  useEffect(() => {
    setName(initialName);
    setUnit(initialUnit);
    dispatchTarget({ type: 'REFRESH', value: 0 });
  }, [initialName, initialUnit]);

  const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const changeTargetHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchTarget({ type: 'SET_COUNT', value: +event.currentTarget.value });
  };

  const changeHoursHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchTarget({ type: 'SET_HOURS', value: +event.currentTarget.value });
  };

  const changeMinutesHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchTarget({ type: 'SET_MINUTES', value: +event.currentTarget.value });
  };

  const changeUnitHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = +event.currentTarget.value;
    setUnit(newUnit);
    if (newUnit === TaskUnit.Count) {
      dispatchTarget({ type: 'SET_COUNT', value: 1 });
    } else if (newUnit === TaskUnit.Timestamp) {
      dispatchTarget({ type: 'SET_HOURS', value: 0 });
      dispatchTarget({ type: 'SET_MINUTES', value: 10 });
    }
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const isFormValid = target.isValid && unit.isValid && name.isValid;
    console.log(target, unit, name);
    let outputTarget: number | false;
    if (!isFormValid) return;
    if (unit.value === TaskUnit.Count && target.count) {
      outputTarget = target.count;
    } else if (target.hours !== undefined && target.minutes !== undefined) {
      outputTarget = target.hours * 3600e3 + target.minutes * 60e3;
    } else outputTarget = false;
    if (outputTarget === false) return;
    onSave(name.value, outputTarget, unit.value);
  };

  return (
    <Card>
      <form onSubmit={submitFormHandler}>
        <label htmlFor="task-edit-name">
          <span>Name</span>
          <input type="text" id="task-edit-name" value={name.value} onChange={changeNameHandler} />
        </label>
        <label htmlFor="task-edit-target">
          <span>Target</span>
          {unit.value === TaskUnit.Count && (
          <input type="number" id="task-edit-target" value={target.count} onChange={changeTargetHandler} />
          )}
          {unit.value === TaskUnit.Timestamp && (
          <>
            <input type="number" id="task-edit-target-h" value={target.hours} onChange={changeHoursHandler} />
            <input type="number" id="task-edit-target-m" value={target.minutes} onChange={changeMinutesHandler} />
          </>
          )}
        </label>
        <label htmlFor="task-edit-unit">
          <select id="task-edit-unit" value={unit.value} onChange={changeUnitHandler}>
            <option value={TaskUnit.Count}>Count</option>
            <option value={TaskUnit.Timestamp}>Time</option>
          </select>
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </Card>
  );
};

export default TaskEdit;
