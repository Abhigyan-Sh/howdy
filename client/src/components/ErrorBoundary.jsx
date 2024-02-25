import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError (error) {
    return {hasError: true}
  }
  componentDidCatch (error, info) {
    console.log(error, info)
  }
  render () {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops, there&apos;s an Error</h2>
          <button 
            type="button" 
            onClick= {this.setState({ hasError: false })}>
              Try Again ?
          </button>
        </div>
      )
    }
    /* otherwise return children component */
    return this.props.children
  }
}

export default ErrorBoundary
