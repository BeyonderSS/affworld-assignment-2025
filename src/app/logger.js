/**
 * logger.js
 * 
 * A utility function for logging messages to the console with a custom logo.
 * This function is designed to provide a quick and consistent way to display
 * messages in the console, enhancing visibility during development.
 * A simple Personal Touch by BeyonderSS
 */

"use client"
import React, { useEffect } from 'react'
import config from '../../public/config.json'

/**
 * Logger function to display a logo and message in the console.
 * 
 * @param {string} message - The message to be logged to the console.
 * @param {string} [logo] - Optional logo string to display alongside the message.
 */
function Logger() {
    useEffect(() => {
        console.info(
          `${config.ascii}\n`,
          `Taking a peek huh? Check out the source code: ${config.repo}\n\n`
        );
      }, []);
  
}

export default Logger