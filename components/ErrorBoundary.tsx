import React from 'react';

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = { hasError: false };
  }
  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.log({ error, errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button type='button' onClick={() => this.setState({ hasError: false })}>
            Try again?
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
