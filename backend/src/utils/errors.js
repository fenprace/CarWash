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
    this.status = 400;
  }
}

class NoSuchUserError extends Error {
  constructor (message) {
    super(message);
    this.name = 'NoSuchUserError';
    this.message = combineMessage(this.name, message);
    this.code = 2000;
    this.status = 401;
  }
}

class IncorrectPasswordError extends Error {
  constructor (message) {
    super(message);
    this.name = 'IncorrectPasswordError';
    this.message = combineMessage(this.name, message);
    this.code = 2001;
    this.status = 401;
  }
}

class NotAuthenticatedError extends Error {
  constructor (message) {
    super(message);
    this.name = 'NotAuthenticatedError';
    this.message = combineMessage(this.name, message);
    this.code = 2002;
    this.status = 401;
  }
}

class PermissionDeniedError extends Error {
  constructor (message) {
    super(message);
    this.name = 'PermissionDeniedError';
    this.message = combineMessage(this.name, message);
    this.code = 2003;
    this.status = 403;
  }
}

class NotFoundError extends Error {
  constructor (message) {
    super(message);
    this.name = 'NotFoundError';
    this.message = combineMessage(this.name, message);
    this.status = 404;
  }
}

module.exports = {
  InvalidParameterError,
  NoSuchUserError,
  IncorrectPasswordError,
  NotAuthenticatedError,
  PermissionDeniedError,
  NotFoundError,
};