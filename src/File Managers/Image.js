import React, { useMemo, useState, useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

import { storage } from "./firebase";
import {
	ref,
	uploadBytes,
	listAll,
	getDownloadURL,
	uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
import { useDropzone } from "react-dropzone";
import Circular from "./Circular";
import "react-circular-progressbar/dist/styles.css";

const Image = (e) => {
	const [image, setImage] = useState(null);
	const [imageList, setImageList] = useState([]);

	const {
		acceptedFiles,
		getRootProps,
		getInputProps,
		isFocused,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: "image/*",
		onDrop: (acceptedFiles) => {
			setImage(acceptedFiles[0]);
			console.log(acceptedFiles);
		},
	});
	const [progress, setProgress] = useState(0);

	const imageListRef = ref(storage, "images/");
	const UploadImage = () => {
		if (image == null) return;

		const imageRef = ref(storage, `images/${v4() + image.name}`);
		const uploadTask = uploadBytesResumable(imageRef, image);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress1 =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProgress(() => Math.round(progress1));
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					setImageList((pre) => [...pre, url]);
				});
			}
		);
	};
	// useEffect(() => {
	// 	listAll(imageListRef).then((response) => {
	// 		response.items.forEach((item) => {
	// 			getDownloadURL(item).then((url) => {
	// 				setImageList((pre) => [...pre, url]);
	// 			});
	// 		});
	// 	});
	// }, []);

	// useEffect(() => {
	// 	setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 1000);
	//   }, []);

	// const files = acceptedFiles.map(file => (
	//   <li key={file.path}>
	//     {file.path} - {file.size} bytes
	//   </li>
	// ));

	const baseStyle = {
		alignItems: "center",
		padding: "60px",
		borderWidth: 2,
		borderRadius: 2,
		borderColor: "blue",
		borderStyle: "dashed",
		backgroundColor: "#fafafa",
		color: "#bdbdbd",
		outline: "none",
		transition: "border .24s ease-in-out",
	};

	const focusedStyle = {
		borderColor: "#2196f3",
	};

	const acceptStyle = {
		borderColor: "#00e676",
	};

	const rejectStyle = {
		borderColor: "#ff1744",
	};

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isFocused ? focusedStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isFocused, isDragAccept, isDragReject]
	);

	// const options = {
	// 	onUploadProgress: (ProgressEvent) =>{
	// 		const {loaded, total} = ProgressEvent;
	// 		let percent = Math.floor((loaded * 100 )/ total)
	// 		console.log(`${loaded}kb of ${total}kb| ${percent}%`)
	// 	}
	// }
	// axios.post("https://www.mocky.io/v2/5cc8019d300000980a055e76", acceptedFiles, options).then(res => {
	//     console.log(res)
	//     setState({ avatar: res.data.url, uploadPercentage: 100 }, ()=>{
	//       setTimeout(() => {
	//         setState({ uploadPercentage: 0 })
	//       }, 1000);
	//     })
	// })

	return (
		<>
		<div className="file">
			<div>
				<div  className="dropArea" {...getRootProps({ style })}>
					<input
						{...getInputProps()}
						onChange={(e) => {
							setImage(e.target.files[0]);
						}}
						/>
					<div>

					<p className="text"><AiOutlineCloudUpload style={{height: "100px", width:"100px"}}/>
					
					</p>
					<header className="btn">Drag & Drop to Upload Image</header>
					<br />
			       
		  {progress > 0 && <Circular progress={progress}  />}
					</div>
				</div>
		
			<div className="btn">

			{image && <button onClick={UploadImage} className="btn btn-outline-dark" style={{marginLeft:250, margin:50}}>Upload Image</button>}
			</div>
			{/* {JSON.stringify(image)} */}
			</div>
		</div>
				</>
	);
};

export default Image;
