const {and} = require('./combinators/and')
const {is}  = require('./combinators/is')

const has = field => obj => typeof obj[field] !== 'undefined'
const contains = e => a => a.indexOf(e) > -1
const equals = a => b => a === b
const gt = m => n => n > m

const propSatisfies = (field, p) => obj => p(obj[field])
const propEq = (field, value) => propSatisfies(field, equals(value))
const propTypeof = (field, type) => propSatisfies(field, value => typeof value === type)

const isArray     = a => Array.isArray(a)
const isDefined   = a => typeof a !== 'undefined'
const isUndefined = a => typeof a === 'undefined'
const isTrue      = a => a === true

const isEmpty     = and(has('length'), propEq('length', 0))
const isNotEmpty  = and(has('length'), propSatisfies('length', gt(0)))
const isSingleton = and(has('length'), propEq('length', 1))
const isMultiton  = and(has('length'), propSatisfies('length', gt(1)))

const Variadic  = {types: isUndefined}
const Typed     = {types: and(isArray, isNotEmpty)}
const Singleton = {types: and(isArray, isSingleton)}
const Multiton  = {types: and(isArray, isMultiton)}

const Unnamed = {
  key: isUndefined
}

const Rest = {
  ...Unnamed,
  values: and(isArray, isSingleton, propTypeof(0, 'string'))
}

const Variable = {
  key: isDefined
}

const VariadicVariable = {
  ...Variable,
  ...Variadic
}

const TypedVariable = {
  ...Variable,
  ...Typed
}

const PrimitiveVariable = {
  ...Variable,
  ...Singleton
}

const ArrayVariable = {
  ...Variable,
  ...Multiton
}

const Option = {
  ...Variable,
  args: isArray
}

const VariadicOption = {
  ...Option,
  ...Variadic
}

const CommandOption = {
  ...VariadicOption,
  opts: isArray
}

const FlagOption = {
  ...Option,
  types: and(isArray, isEmpty)
}

const TypedOption = {
  ...Option,
  ...Typed
}

const PrimitiveOption = {
  ...Option,
  ...Singleton
}

const ArrayOption = {
  ...Option,
  ...Multiton
}

const PosArg = {
  ...Variable,
  args: isUndefined
}

const VariadicPosArg = {
  ...PosArg,
  ...Variadic
}

const TypedPosArg = {
  ...PosArg,
  ...Typed
}

const PrimitivePosArg = {
  ...PosArg,
  ...Singleton
}

const ArrayPosArg = {
  ...PosArg,
  ...Multiton
}

const Contradicts   = {contradicts: isDefined}
const Implies       = {implies: isDefined}
const Required      = {required: isTrue}
const Only          = {only: isArray}
const Reverse       = {reverse: isTrue}
const Rules         = {rules: isDefined}
const Values        = {values: isArray}
const DefaultValues = {defaultValues: isArray}
const Bool          = {types: contains('bool')}

const ValidValuesTypes = {
  values: (values, obj) => (
    is(Values)(obj) && (
      values.length === obj.types.length ||
      (obj.types.length === 0 && values.length === 1)
    )
  )
}

module.exports = {
  ArrayOption,
  ArrayPosArg,
  ArrayVariable,
  Bool,
  CommandOption,
  Contradicts,
  DefaultValues,
  FlagOption,
  Implies,
  Only,
  Option,
  PosArg,
  PrimitiveOption,
  PrimitivePosArg,
  PrimitiveVariable,
  Required,
  Rest,
  Reverse,
  Rules,
  TypedOption,
  TypedPosArg,
  TypedVariable,
  Unnamed,
  ValidValuesTypes,
  Values,
  Variable,
  Variadic,
  VariadicOption,
  VariadicPosArg,
  VariadicVariable
}