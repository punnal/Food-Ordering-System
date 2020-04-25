import React from 'react';    

class Popup extends React.Component {  
  render() {  
		return (  
            (this.props.show)?
		<div className='popup'>  
			<div className='popupInner'>  
				<h1>{this.props.text}</h1>  
				<button onClick={this.props.onClose}>Close</button>
			</div>  
		</div>  
            :
            null
		);  
	}  
}  

export default Popup;
