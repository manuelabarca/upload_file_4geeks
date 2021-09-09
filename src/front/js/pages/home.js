import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [file, setFile] = useState();
	const [selected, setSelected] = useState(false);

	const changeFile = event => {
		setFile(event.target.files[0]);
		setSelected(true);
	};

	const uploadFile = () => {
		const formData = new FormData();

		formData.append("File", file);

		actions.uploadFile(formData);
	};

	return (
		<div className="text-center mt-5">
			<input type="file" name="file" onChange={e => changeFile(e)} />
			<div>
				<button onClick={() => uploadFile()}>Subir</button>
			</div>
		</div>
	);
};
