import React, {Component} from 'react';

export default class FieldError extends Component {
  render() {
    const {errors} = this.props;
    if (errors) {
      return <div className="field-errors">
        {
          !Array.isArray(errors) && <span>{errors}</span>
        }
        {
          Array.isArray(errors) && errors.map(item => {
            const key = Math.random();
            return (
              <span key={key}>{item}</span>
            )
          })
        }
      </div>
    }
    return <div></div>
  }
}
