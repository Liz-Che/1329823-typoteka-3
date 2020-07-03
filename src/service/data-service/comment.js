'use strict';

const {getNewId} = require(`../cli/utils`);

class CommentService {
  create(offer, comment) {
    const newComment = Object.assign(
        {
          id: getNewId(),
        },
        comment
    );
    offer.comments.push(newComment);
    return newComment;
  }

  drop(offer, commentId) {
    const dropComment = offer.comments.find((item) => item.id === commentId);
    if (!dropComment) {
      return null;
    }
    offer.comments = offer.comments.filter((item) => item.id !== commentId);
    return dropComment;
  }
  findAll(offer) {
    return offer.comments;
  }
}

module.exports = CommentService;
