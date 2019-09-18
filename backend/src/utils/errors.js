const combineMessage = (name, message) => {
  if (message) return `${name}: ${message}`;
  return name;
};

class InvalidParameterError extends Error {
  constructor (message) {
    super(message);
    this.name = 'InvalidParameterError';
    this.message = combineMessage(this.name, message);
    this.code = 1001;
  }
};

class NoSuchUserError extends Error {
  constructor (message) {
    super(message);
    this.name = 'NoSuchUserError';
    this.message = combineMessage(this.name, message);
    this.code = 2000;
  }
};

class IncorrectPasswordError extends Error {
  constructor (message) {
    super(message);
    this.name = 'IncorrectPasswordError';
    this.message = combineMessage(this.name, message);
    this.code = 2001;
  }
};

class NoAuthorizationError extends Error {
  constructor (message) {
    super(message);
    this.name = 'NoAuthorizationError';
    this.message = combineMessage(this.name, message);
    this.code = 2002;
  }
};

module.exports = {
  InvalidParameterError,
  NoSuchUserError,
  IncorrectPasswordError,
  NoAuthorizationError,
};