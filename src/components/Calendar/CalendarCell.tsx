import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Card from '../UI/Card';
import classes from './Calendar.module.scss';

interface PropsType {
  fill: number;
  label: string;
  linkTo?: string;
  isSelected?: boolean;
}

const defaultProps = {
  linkTo: '',
  isSelected: false,
};

const CalendarCell: React.FC<PropsType> = ({
  fill, label, isSelected, linkTo,
}) => (
  <td
    className={`${classes.calendar__cell} ${isSelected ? classes['calendar__cell--selected'] : ''}`}
    style={{ '--fill': fill } as CSSProperties}
  >
    <Link to={linkTo ?? ''} style={{ all: 'unset', cursor: linkTo ? 'pointer' : 'auto' }}>
      <Card className={`${classes['calendar__cell-card']} ${!label ? classes['calendar__cell-card--empty'] : ''}`}>
        <div className={classes['calendar__cell-bg']} />
        {label.length > 0 && <span className={classes['calendar__cell-label']}>{label}</span>}
      </Card>
    </Link>
  </td>
);

CalendarCell.defaultProps = defaultProps;

export default CalendarCell;
