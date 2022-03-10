import React, { CSSProperties } from 'react';
import Card from '../UI/Card';
import classes from './Calendar.module.scss';

interface PropsType {
  fill: number;
  label: string;
}

const CalendarCell: React.FC<PropsType> = ({
  fill, label,
}) => (
  <td
    className={`${classes.calendar__cell}`}
    style={{ '--fill': fill } as CSSProperties}
  >
    <Card className={`${classes['calendar__cell-card']} ${label || classes['calendar__cell-card--empty']}`}>
      <div className={classes['calendar__cell-bg']} />
      {label.length > 0 && <span className={classes['calendar__cell-label']}>{label}</span>}
    </Card>
  </td>
);

export default CalendarCell;
