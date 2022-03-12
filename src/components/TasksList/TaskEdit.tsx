import React, { useEffect, useReducer } from 'react';
import { TaskUnit } from '../../store/tasks/tasks-types';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Input from '../UI/Input';
import InputToolbar from '../UI/InputToolbar';
import Select from '../UI/Select';
import classes from './Task.module.scss';

interface TaskEditProps {
  name: string;
  unit: TaskUnit;
  count: number;
  timestamp: number;
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

const countReducer: React.Reducer<StateType<number>, number> = (_state, newValue) => ({
  value: newValue,
  isValid: newValue > 0,
});

interface TimeState {
  hours: number;
  minutes: number;
  isValid?: boolean;
}

const timeReducer: React.Reducer<TimeState, {
  type: 'SET_HOURS' | 'SET_MINUTES' | 'REFRESH',
  value: number,
}> = (state, action) => {
  let newState: TimeState = { ...state };
  if (action.type === 'SET_HOURS') {
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

  newState.isValid = newState.hours !== undefined && newState.minutes !== undefined
  && (newState.minutes ?? 0) >= 0 && (newState.minutes ?? 0) < 60
  && ((newState.hours >= 0 && newState.hours < 24)
  || (newState.hours === 0 && newState.minutes > 0));

  return newState;
};

const TaskEdit: React.FC<TaskEditProps> = ({
  name: initialName,
  unit: initialUnit,
  count: initialCount,
  timestamp: initialTimestamp,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useReducer(nameReducer, { value: initialName, isValid: true });
  const [unit, setUnit] = useReducer(unitReducer, { value: initialUnit, isValid: true });
  const [count, setCount] = useReducer(countReducer, { value: initialCount, isValid: true });
  const [time, dispatchTime] = useReducer(timeReducer, {
    hours: Math.floor((initialTimestamp / 86400e3)) * 24 + new Date(initialTimestamp).getUTCHours(),
    minutes: new Date(initialTimestamp).getUTCMinutes(),
    isValid: true,
  });

  useEffect(() => {
    setName(initialName);
    setUnit(initialUnit);
    dispatchTime({ type: 'REFRESH', value: 0 });
  }, [initialName, initialUnit]);

  const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const changeTargetHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(+event.currentTarget.value);
  };

  const changeHoursHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchTime({ type: 'SET_HOURS', value: +event.currentTarget.value });
  };

  const changeMinutesHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchTime({ type: 'SET_MINUTES', value: +event.currentTarget.value });
  };

  const changeUnitHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(+event.currentTarget.value);
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const isFormValid = count.isValid && time.isValid && unit.isValid && name.isValid;
    let outputTarget: number;
    if (!isFormValid) return;

    if (unit.value === TaskUnit.Count) {
      outputTarget = count.value;
    } else if (unit.value === TaskUnit.Timestamp) {
      outputTarget = time.hours * 3600e3 + time.minutes * 60e3;
    } else return;
    onSave(name.value, outputTarget, unit.value);
  };

  return (
    <Card>
      <form onSubmit={submitFormHandler}>
        <Input type="text" id="task-edit-name" label="Name" value={name.value} onChange={changeNameHandler} onBlur={() => true} />
        <Select label="Unit" id="task-edit-unit" value={unit.value} onChange={changeUnitHandler}>
          <option value={TaskUnit.Count}>Count</option>
          <option value={TaskUnit.Timestamp}>Time</option>
        </Select>
        {unit.value === TaskUnit.Count && (
          <Input type="number" id="task-edit-target" label="Target" value={count.value} onChange={changeTargetHandler} onBlur={() => true} />
        )}
        {unit.value === TaskUnit.Timestamp && (
        <InputToolbar>
          <Input type="number" id="task-edit-target-h" label="Hours" value={time.hours} onChange={changeHoursHandler} onBlur={() => true} />
          <Input type="number" id="task-edit-target-m" label="Minutes" value={time.minutes} onChange={changeMinutesHandler} onBlur={() => true} />
        </InputToolbar>
        )}
        <div className={classes['task__edit-buttonbar']}>
          <Button icon={false} onClick={onCancel}>Cancel</Button>
          <Button icon={false} submit>Save</Button>
        </div>
      </form>
    </Card>
  );
};

export default TaskEdit;
