'use strict';

module.exports = {
  DEFAULT_COMMAND: `--help`,
  USER_ARGV_INDEX: 2,
  MOCK_FILE_NAME: `mocks.json`,
  ExitCode: {
    error: 1,
    success: 0,
  }
};

module.exports.HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};
