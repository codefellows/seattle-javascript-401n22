## useContext

### notes from reading

- the context is the wrapper - parent defines it
- consumer uses the context values
- Provider:
  - higher up in the tree
  - holder of the data?
- consumers
  - can "consume the data"
  - below provider in the tree

### what?

- a react hook that allows you to store values that can be requested at any child node of the component you create the context on (and wrap)
- context is a step in between state (local - useState) and a store or redux system (global state management)

### how

- you define or create the context at the parent node (context is named with a Capital letter) and assign it createContext()

## what if we want to change it?

- combining a useState at the definition level of the context and pass it as context value

- useState - local state specific to that component
- information from parent to child can be passed to children as props

- context when state needs to be available to many children downstream
