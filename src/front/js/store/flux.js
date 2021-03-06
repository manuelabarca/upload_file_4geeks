const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			api: "https://3001-green-marsupial-7x8xtwuv.ws-us16.gitpod.io"
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			uploadFile: formData => {
				const store = getStore();

				fetch(`${store.api}/upload/profile`, {
					method: "POST",
					headers: {
						"Content-Type": "multipart/form-data"
					},
					body: formData
				})
					.then(resp => {
						console.log("respuesta", resp);
						if (resp.ok) {
							return resp.json();
						}
					})
					.then(data => {
						console.log("data", data);
					})
					.catch(error => console.log("[ERROR TO UPLOADO FILE]", error));
			}
		}
	};
};

export default getState;
