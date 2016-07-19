import escapeStringRegexp from 'escape-string-regexp';

/**
 * ParameterizedMatcher unwraps action and extracts single parameter from the action type
 * Foo.Bar.Baz with pattern Foo is unwrapped to Baz with parameter Bar
 */
export default pattern => {
  const regexp = new RegExp(`^${escapeStringRegexp(pattern)}\\.([^.]+)\\.(.+)`);

  return action => {
    const match = action.type.match(regexp);

    if (match) {
      return {
        unwrap: match[2],
        wrap: action.type.replace(match[2], ''),
        args: {
          param: match[1]
        }
      };
    } else {
      return false;
    }
  };
};

