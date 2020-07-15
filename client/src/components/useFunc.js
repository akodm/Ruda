export default function useFunc(props) {
    this.stateSet = (component, state, value) => {
        component.setState({ [state] : value });
    }
}