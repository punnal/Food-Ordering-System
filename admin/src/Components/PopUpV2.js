import React from 'react';    

class Popup extends React.Component {  
  render() {  
		return (  
		<div className='popup'>  
			<div className='popupInner'>  
				<h1>{this.props.text}</h1>  
				<button onClick={this.props.closePopup}>No(deletes though)</button>
				<button >Yes(Write onClick for this)</button>  
			</div>  
		</div>  
		);  
	}  
}  

export default Popup;