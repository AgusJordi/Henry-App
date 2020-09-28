import React from "react";
import "./chip.css";
import { connect } from "react-redux";

export class Chip extends React.Component {

  state = {
    items: [],
    value: "",
    error: null,
  };

  componentDidUpdate(prevProps) {
    if (this.props.estado !== prevProps.estado && this.props.estado===true) {
      this.setState({
        items:[]
      })
      this.props.borrar(false)
    }
  }

  handleKeyDown = evt => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.value.trim();

      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, this.state.value],
          value: ""
        }, ()=> this.props.onChange (this.state.items));
      }  
    }
  };

  handleChange = evt => {
    this.setState({
      value: evt.target.value,
      error: null
    });
    this.props.onChange (this.state.items)
  };

  handleDelete = item => {
    this.setState({
      items: this.state.items.filter(i => i !== item)
    },()=> this.props.onChange (this.state.items));
  };

  handlePaste = evt => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData("text");
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter(email => !this.isInList(email));

      this.setState({
        items: [...this.state.items, ...toBeAdded]
      },()=> this.props.onChange (this.state.items));
    }
  };

  isValid(email) {
    let error = null;

    if (this.isInList(email)) {
      error = `${email} ya fue añadido.`;
    }

    if (!this.isEmail(email)) {
      error = `${email} no es un email válido.`;
    }

    if (error) {
      this.setState({ error });

      return false;
    }

    return true;
  }

  isInList(email) {
    return this.state.items.includes(email);
  }

  isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  render() {
    return (
      <><div id="chips">
        {this.state.items.map(item => (
          <div className="tag-item" key={item}>
            {item}
            <button
              type="button"
              className="button"
              onClick={() => this.handleDelete(item)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

        <input
          className={"input " + (this.state.error && " has-error")}
          value={this.state.value}
          placeholder="Emails de los alumnos (podes copiar y pegar)"
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onPaste={this.handlePaste}
        />

        {this.state.error && <p className="error">{this.state.error}</p>}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    all_users: state.all_users,
  };
};

export default connect(mapStateToProps)(Chip);