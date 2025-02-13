import React from 'react';
import { toast } from 'react-hot-toast';
import WebSocket from './WebSocket';
import Notification from '../../../components/Notification';

class NotificationSocket extends WebSocket {
  //eslint-disable-next-line
  constructor(dispatch, getState, room) {
    super(dispatch, getState, room);
  }

  anotherSubscribes = () => {
    this.onEntryCreated();
    this.onChangeMark();
    this.onChangeOfferStatus();
  };

  onChangeMark = () => {
    this.socket.on('changeMark', () => {
      toast.success('Someone liked your offer');
    });
  };

  onChangeOfferStatus = () => {
    this.socket.on('changeOfferStatus', (message) => {
      toast.success(
        <Notification message={message.message} contestId={message.contestId} />
      );
    });
  };

  onEntryCreated = () => {
    this.socket.on('onEntryCreated', () => {
      toast.success('New Entry');
    });
  };

  subscribe = (id) => {
    this.socket.emit('subscribe', id);
  };

  unsubsctibe = (id) => {
    this.socket.emit('unsubscribe', id);
  };
}

export default NotificationSocket;
