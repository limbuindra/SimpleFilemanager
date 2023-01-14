import React, { useMemo, useState, useEffect } from "react";
import { storage } from "./firebase";
import {
	ref,
	uploadBytesResumable,
	listAll,
	getDownloadURL,
	getStorage,
} from "firebase/storage";
import { v4 } from "uuid";
import { useDropzone } from "react-dropzone";
import Circular from "./Circular";
import "react-circular-progressbar/dist/styles.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
// import "./style.css";

const Video = () => {
	const [video, setVideo] = useState(null);
	const [videoList, setVideoList] = useState([]);
	const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
		useDropzone({
			accept: "video/*",
			onDrop: (acceptedfiles) => {
				setVideo(acceptedfiles[0]);
				// console.log(acceptedfiles)
			},
		});
	// console.log(video);
	const [progress, setProgress] = useState(0);
	// const videoListRef = ref(storage, "videos/");
	const Uploadvideo = () => {
		if (video == null) return;
		const videoRef = ref(storage, `videos/${v4() + video.name}`);
		const uploadTask = uploadBytesResumable(videoRef, video);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress1 =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProgress(() => Math.round(progress1));

				// console.log("upload is" + progress1 + "% done");
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					// alert("Video upload");
					setVideoList((pre) => [...pre, url]);

					console.log("File available at", url);
				});
			}
		);
	};

	const baseStyle = {
		alignItems: "center",
		padding: "70px",
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
	// useEffect(() => {
	// 	setProgress(() => {
	// 	  if (progress < 100) {
	// 		setProgress(progress + 1);
	// 	  }
	// 	}, 5000);
	//   }, []);

	// useEffect(() => {
	// 	listAll(videoListRef).then((response) => {
	// 		response.items.forEach((item) => {
	// 			getDownloadURL(item).then((url) => {
	// 				setVideoList((pre) => [...pre, url]);
	// 			});
	// 		});
	// 	});
	// }, []);

	return (
<>
<div className="file">
			<div>
				<div className="dropArea" {...getRootProps({ style })}>
					<input
						{...getInputProps()}
						onChange={(e) => {
							e.preventDefault();
							setVideo(e.target.files[0]);
						}}
						/>
					<p className="text">
						<AiOutlineCloudUpload  style={{ height: "100px", width: "100px" }} />
					</p>
				<header className="btn">Drag & Drop to Upload</header> 
				<br />
				{progress > 0 && <Circular progress={progress} />} 
						
				</div>
				<div className="btn">
					{video && <button onClick={Uploadvideo} className="btn btn-outline-dark" style={{marginLeft:250, margin:50}}>
						Upload Video
					</button>}
				</div>
			</div>
				</div>
			{/* {JSON.stringify(video)} */}

			{/* <br /> */}
			
			
					</>
	);
};

export default Video;
