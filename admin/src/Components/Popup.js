import React from 'react';    


const PopupH = (props) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

const PopupBody = (props) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

const PopupButtons = (props) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

class Popup extends React.Component {  
  render() {  
		return (  
            (this.props.show)?
		<div className='popup'>  
			<div className='popupInner'>  
                {this.props.children}
			</div>  
		</div>  
            :
            null
		);  
	}  
}  

export {
    Popup,
    PopupBody,
    PopupH,
    PopupButtons
}
