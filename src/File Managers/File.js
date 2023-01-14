import React, { useMemo, useState, useEffect } from "react";
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
import Progress from "./Progress";
// import "./style.css";
import Circular from "./Circular";
import { AiOutlineCloudUpload } from "react-icons/ai";


const File = (e) => {
	const [file, setFile] = useState(null);
	const [fileList, setFileList] = useState([]);
	const {
		acceptedFiles,
		getRootProps,
		getInputProps,
		isFocused,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: "files/*",
		onDrop: (acceptedFiles) => {
			setFile(acceptedFiles[0]);
			console.log(acceptedFiles);
		},
	});

	const [progress, setProgress] = useState(0);

	const fileListRef = ref(storage, "files/");
	const Uploadfile = () => {
		if (file == null) return;

		const fileRef = ref(storage, `files/${v4() + file.name}`);
		const uploadTask = uploadBytesResumable(fileRef, file);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress1 =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProgress(() => Math.round(progress1));
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					setFileList((pre) => [...pre, url]);
				});
			}
		);
	};

	// useEffect(() => {
	// 	listAll(fileListRef).then((response) => {
	// 		response.items.forEach((item) => {
	// 			getDownloadURL(item).then((url) => {
	// 				setFileList((pre) => [...pre, url]);
	// 			});
	// 		});
	// 	});
	// }, []);

	// const files = acceptedFiles.map(file => (
	//   <li key={file.path}>
	//     {file.path} - {file.size} bytes
	//   </li>
	// ));

	const baseStyle = {
		// flex: 1,
		// display: "flex",
		// flexDirection: "column",
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

	return (
		<>
			<div className="file">
				<div>

				<div className="dropArea"{...getRootProps({ style })}>
					<input
						{...getInputProps()}
						onChange={(e) => {
							setFile(e.target.files[0]);
						}}
						/>
					<p className="text"><AiOutlineCloudUpload style={{height: "100px", width:"100px"}}/>
			</p>
					<header className="btn">Drag & Drop to Upload File</header>
		<br />
				{progress > 0 && <Circular progress={progress} />}
				</div>
				<div className="btn">

		
			{file && <button onClick={Uploadfile} className="btn btn-outline-dark"  style={{marginLeft:250, margin:50}}>
						Upload File
					</button>}
				</div>
						</div>

			</div>
			{/* {JSON.stringify(file)} */}

			<div>
				{/* { fileList.map((url) => {
          return <img src= {url}/>
        })} */}
			</div>
		</>
	);
};

export default File;
