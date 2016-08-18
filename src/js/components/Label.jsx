var React = require('react');

var MyLabel = React.createClass({
    
  propTypes: {
    showLabel: React.PropTypes.bool,
  },

  getDefaultProps: function(){
    return{
      showLabel:true
    };
  },
  
  render: function() {

    if( this.props.showLabel === true ){

      return (
        <label htmlFor={ this.props.name }>{ this.props.title }</label>
      );
    }else{
      return null;
    }
  }
});

module.exports = MyLabel;