import React from 'react';
import PropTypes from 'prop-types';
import { statuses } from '../../constants';

export default function StatusElementComp({ status, changedTime, isInactive }) {
  const calculateColor = (studentStatus) => {
    if (studentStatus === 'NOT_STARTED') {
      return 'info';
    }
    if (isInactive) {
      return 'warning';
    }
    if (studentStatus === 'IN_PROGRESS') {
      return 'success';
    }
    if (studentStatus === 'PROBLEM') {
      return 'danger';
    }
    return 'secondary';
  };

  return (
    <div
      className={`btn-${calculateColor(
        status
      )} btn rounded-pill disabled w-100 font-weight-bold`}
    >
      {status === 'NOT_STARTED' ? 'NOT STARTED' : calculateTime(changedTime)}
    </div>
  );
}

StatusElementComp.propTypes = {
  status: PropTypes.oneOf(statuses).isRequired,
  isInactive: PropTypes.bool.isRequired,
  changedTime: PropTypes.instanceOf(Date).isRequired,
};

const calculateTime = (changedTime) => {
  const now = new Date();
  const diff = now.getTime() - changedTime.getTime();
  if (diff < 1000 * 60 * 60) {
    return `${Math.round(diff / (1000 * 60))} mins ago`;
  }
  if (diff < 1000 * 60 * 60 * 24) {
    return `${Math.round(diff / (1000 * 60 * 60))} hours ago`;
  }
  return `${Math.round(diff / (1000 * 60 * 60 * 24))} days ago`;
};
