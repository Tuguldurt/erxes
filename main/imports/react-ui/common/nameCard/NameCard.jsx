import React, { PropTypes } from 'react';
import Avatar from './Avatar.jsx';


const propTypes = {
  user: PropTypes.object,
  customer: PropTypes.object,
  singleLine: PropTypes.bool,
  firstLine: PropTypes.node,
  secondLine: PropTypes.node,
  avatarSize: PropTypes.number,
};

function NameCard({ user, customer, firstLine, secondLine, singleLine, avatarSize }) {
  let first;
  let second;

  if (user || firstLine || secondLine) {
    first = firstLine || user.details && user.details.fullName;
    second = !singleLine && (secondLine || `@${user.username}`);
  } else if (customer) {
    first = firstLine || customer.name;
    second = !singleLine && (secondLine || customer.email);
  }

  return (
    <div className="name-card">
      <Avatar user={user} customer={customer} size={avatarSize} />
      <div className="text" style={{ marginLeft: `${avatarSize + 10}px` }}>
        <a href="#" className="first-line">{first}</a>
        <div className="second-line">{second}</div>
      </div>
    </div>
  );
}

NameCard.propTypes = propTypes;
NameCard.Avatar = Avatar;

export default NameCard;
