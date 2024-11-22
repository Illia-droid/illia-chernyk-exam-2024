import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import {
  changeChatFavorite,
  changeChatBlock,
} from '../../../store/slices/chatSlice';
const FavBlockIcons = ({ userId, chatData }) => {
  
  const dispatch = useDispatch();
  const { favoriteList, participants, blackList } = chatData;

  const changeFavorite = (data, event) => {
    dispatch(changeChatFavorite(data));
    event.stopPropagation();
  };

  const changeBlackList = (data, event) => {
    dispatch(changeChatBlock(data));
    event.stopPropagation();
  };

  const isFavorite = (userId) => favoriteList[participants.indexOf(userId)];
  const isBlocked = (userId) => blackList[participants.indexOf(userId)];

  return (
    <>
      <i
        onClick={(event) =>
          changeFavorite(
            {
              participants,
              favoriteFlag: !isFavorite(userId),
            },
            event
          )
        }
        className={classNames(
          isFavorite(userId) ? 'fas fa-heart' : 'far fa-heart'
        )}
      />
      <i
        onClick={(event) =>
          changeBlackList(
            {
              participants,
              blackListFlag: !isBlocked(userId),
            },
            event
          )
        }
        className={classNames(
          isBlocked(userId) ? 'fas fa-unlock' : 'fas fa-user-lock'
        )}
      />
    </>
  );
};

export default FavBlockIcons;
