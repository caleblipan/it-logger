import React, { useState, useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'

const AddLogModal = () => {
	const [message, setMessage] = useState('')
	const [attention, setAttention] = useState(false)
	const [tech, setTech] = useState('')
	const [availableTech, setAvailableTech] = useState([])	
	
	useEffect(() => {	
		getAvailableTechs()
	}, [])

	const getAvailableTechs = async () => {	
		const res = await fetch('/techs')
		const data = await res.json()

		setAvailableTech(data)
	}

	const onSubmit = () => {
		if (message === '' || tech === '') {
			M.toast({ html: 'Please enter a message and tech' })
		} else {
			console.log(message, tech, attention)
		}
	}

	return (
		<div id="add-log-modal" className="modal" style={modalStyle}>
			<div className="modal-content">
				<h4>Enter system log</h4>
				<div className="row">
					<div className="input-field">
						<input 
							type="text" 
							name="message" 
							value={message} 
							onChange={e => setMessage(e.target.value)} 
						/>
						<label htmlFor="message" className="active">
						Log Message
						</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field">
						<select
							name="tech"
							value={tech}
							className="browser-default"
							onChange={e => setTech(e.target.value)}>
							<option value="" disabled>Select Technician</option>
							{availableTech.map((technician, i) => (
								<option value={technician.firstName + technician.lastName} key={i}>{technician.firstName} {technician.lastName}</option>
							))}
						</select>
					</div>
				</div>
				<div className="row">
					<div className="input-field">
						<p>
							<label>
								<input type="checkbox" className="filled-in" checked={attention} value={attention} onChange={e => setAttention(!attention)} />
								<span>Needs Attention</span>
							</label>
						</p>
					</div>
				</div>
			</div>
			<div className="modal-footer">
				<a href="#!" onClick={onSubmit} className="modal-close waves-effect blue btn">Enter</a>
			</div>
		</div>
	)
}

const modalStyle = {
	width: '75%',
	height: '75%'
}

export default AddLogModal
