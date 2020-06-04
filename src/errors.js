const argumentIsNotABool = (info = {}) => {
  const {values, defaultValues, index, option} = info
  
  return {
    code: 'ArgumentIsNotABool',
    msg:  "The passed command line argument must either be 'true' or 'false'.",
    info: {values, defaultValues, index, option}
  }
}

const argumentIsNotANumber = (info = {}) => {
  const {values, defaultValues, index, option} = info
  
  return {
    code: 'ArgumentIsNotANumber',
    msg:  'The passed command line argument must be a number.',
    info: {values, defaultValues, index, option}
  }
}

const contradictionDetected = ({key, contradicts, option}) => ({
  code: 'ContradictionDetected',
  msg:  'Some given keys contradict each other.',
  info: {key, contradicts, option}
})

const didYouMean = ({argv, options}) => ({
  code: 'DidYouMean',
  msg:  'An unknown command-line argument was passed. Did you mean any of the following options?',
  info: {argv, options}
})

const falseArgsRules = ({rules, args}) => ({
  code: 'FalseArgsRules',
  msg:  'Your args rules returned false. Please abide to the rules defined in verifyArgs.',
  info: {rules, args}
})

const falseArgvRules = ({rules, argv}) => ({
  code: 'FalseArgvRules',
  msg:  'Your argv rules returned false. Please abide to the rules defined in verifyArgv.',
  info: {rules, argv}
})

const falseOptsRules = ({rules, options}) => ({
  code: 'FalseOptsRules',
  msg:  'Your opts rules returned false. Please abide to the rules defined in verifyOpts.',
  info: {rules, options}
})

const implicationViolated = ({key, implies, option}) => ({
  code: 'ImplicationViolated',
  msg:  'Some given keys that imply each other are not all defined.',
  info: {key, implies, option}
})

const incompatibleTypes = ({opts}) => ({
  code: 'IncompatibleTypes',
  msg:  'Repeated options must either both be variadic or both not.',
  info: {opts}
})

const invalidArity = (info = {}) => {
  const {option} = info
  
  return {
    code: 'InvalidArity',
    msg:  "An option's types arity does not match its values arity.",
    info: {option}
  }
}

const invalidBoolMapping = ({key, alt}) => ({
  code: 'InvalidBoolMapping',
  msg:  "The mapping provided to broadenBools must only map from 'true' or 'false' to a list of alternatives.",
  info: {key, alt}
})

const invalidRequiredPositionalArgument = ({positionalArguments}) => ({
  code: 'InvalidRequiredPositionalArgument',
  msg:  'If a positional argument is required, all previous positional arguments must be required as well. The required field must either be undefined, true or false.',
  info: {positionalArguments}
})

const invalidTypes = ({types, option}) => ({
  code: 'InvalidTypes',
  msg:  'Each argument must have a types key that must be null or an array',
  info: {types, option}
})

const invalidValues = (info = {}) => {
  const {values, defaultValues, option} = info
  
  return {
    code: 'InvalidValues',
    msg:  "An option's values field has an invalid type.",
    info: {values, defaultValues, option}
  }
}

const invalidVariadicPositionalArgument = ({positionalArguments}) => ({
  code: 'InvalidVariadicPositionalArgument',
  msg:  'Only the last positional argument may be variadic.',
  info: {positionalArguments}
})

const requiredOptionFormat = (info = {}) => {
  const {key, values, defaultValues, option} = info
  
  return {
    code: 'WrongFormatForRequiredOption',
    msg:  (
      'A required option has values or defaultValues in the wrong format. ' +
      'Default values are different depending on the command-line option type: ' +
      'Commands take objects, flags take counts, and other options take arrays of the correct length.'
    ),
    info: {key, values, defaultValues, option}
  }
}

const requiredOptionMissing = ({key, option}) => ({
  code: 'RequiredOptionMissing',
  msg:  'An option that is marked as required has not been provided.',
  info: {key, option}
})

const subcommandRequired = ({options}) => ({
  code: 'SubcommandRequired',
  msg:  'No subcommand found. Please use at least one subcommand!',
  info: {options}
})

const unexpectedArgument = ({argument}) => ({
  code: 'UnexpectedArgument',
  msg:  'An unexpected argument was used that has no option defined.',
  info: {argument}
})

const valueRestrictionsViolated = ({key, values, index, only, option}) => ({
  code: 'ValueRestrictionsViolated',
  msg:  'A value lies outside the allowed values of an option.',
  info: {key, values, index, only, option}
})

const wrongArgsRulesType = ({type, args}) => ({
  code: 'WrongArgsRulesType',
  msg:  'The args rules are of a wrong type, please provide a predicate with the following signature: (args) => boolean.',
  info: {type, args}
})

const wrongArgvRulesType = ({type, argv}) => ({
  code: 'WrongArgvRulesType',
  msg:  'The argv rules are of a wrong type, please provide a predicate with the following signature: (argv) => boolean.',
  info: {type, argv}
})

const wrongContradictsType = ({key, type, option}) => ({
  code: 'WrongContradictsType',
  msg:  'The contradicts field has the wrong type, please provide an array of command-line option keys.',
  info: {key, type, option}
})

const wrongImpliesType = ({key, type, option}) => ({
  code: 'WrongImpliesType',
  msg:  'The implies field has the wrong type, please provide an array of command-line option keys.',
  info: {key, type, option}
})

const wrongOptsRulesType = ({type, options}) => ({
  code: 'WrongOptsRulesType',
  msg:  'The opts rules are of a wrong type, please provide a predicate with the following signature: (options) => boolean.',
  info: {type, options}
})

module.exports = {
  argumentIsNotABool,
  argumentIsNotANumber,
  contradictionDetected,
  didYouMean,
  falseArgsRules,
  falseArgvRules,
  falseOptsRules,
  implicationViolated,
  incompatibleTypes,
  invalidArity,
  invalidBoolMapping,
  invalidRequiredPositionalArgument,
  invalidTypes,
  invalidValues,
  invalidVariadicPositionalArgument,
  requiredOptionFormat,
  requiredOptionMissing,
  subcommandRequired,
  unexpectedArgument,
  valueRestrictionsViolated,
  wrongArgsRulesType,
  wrongArgvRulesType,
  wrongContradictsType,
  wrongImpliesType,
  wrongOptsRulesType
}