"use strict"

/**
 * Message class.
 */
exports.Message = function (author, receiver, content, date) {
    this.author = author;
    this.receiver = receiver;
    this.content = content;
    this.date = date;
};