import moment from 'moment';

export const getOfferTimeStr = (createdAt) => {
  const { days, hours } = moment.duration(
    moment().diff(moment(createdAt))
  )._data;

  return days
    ? `${days}d ${hours}h`
    : hours
    ? `${hours}h`
    : 'less than one hour';
};

export const getMessageTimeStr = (createdAt) => {
  const messageTime = moment(createdAt);
  const currentTime = moment();

  if (currentTime.isSame(messageTime, 'day')) {
    return messageTime.format('HH:mm');
  } else if (currentTime.isSame(messageTime, 'week')) {
    return messageTime.format('dddd');
  } else if (currentTime.isSame(messageTime, 'year')) {
    return messageTime.format('MM DD');
  }

  return messageTime.format('MMMM DD, YYYY');
};
