/**
 * @typedef {Object} Entry
 * @property {number} id - Entry ID
 * @property {string} title - Entry title
 * @property {boolean} completed - Entry completion status
 * @property {number} userId - User ID
 */

/**
 * @typedef {Object} CreateEntryDTO
 * @property {string} title - Entry title
 * @property {boolean} completed - Entry completion status
 */

/**
 * @typedef {Object} UpdateEntryDTO
 * @property {string} [title] - Entry title
 * @property {boolean} [completed] - Entry completion status
 */